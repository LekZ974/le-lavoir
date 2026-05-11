import type { NextApiRequest } from "next";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const MEMORY_WINDOW_MS = 60 * 60 * 1000;
const MEMORY_MAX = 15;
const memoryBuckets = new Map<string, number[]>();

function getClientIp(req: NextApiRequest): string {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string") {
    const first = xf.split(",")[0]?.trim();
    if (first) return first;
  }
  if (Array.isArray(xf) && xf[0]) return xf[0];
  return req.socket?.remoteAddress || "unknown";
}

function allowMemory(ip: string): boolean {
  const now = Date.now();
  const prev = (memoryBuckets.get(ip) || []).filter(
    (t) => now - t < MEMORY_WINDOW_MS
  );
  if (prev.length >= MEMORY_MAX) return false;
  prev.push(now);
  memoryBuckets.set(ip, prev);
  return true;
}

const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

const redis =
  redisUrl && redisToken
    ? new Redis({ url: redisUrl, token: redisToken })
    : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(15, "1 h"),
      prefix: "lelavoir:contact",
    })
  : null;

/**
 * Returns true if the request is within limits.
 * Uses Upstash Redis when UPSTASH_* env vars are set; otherwise in-memory (best-effort on serverless).
 */
export async function allowContactSubmit(req: NextApiRequest): Promise<{
  ok: boolean;
  ip: string;
}> {
  const ip = getClientIp(req);

  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    return { ok: success, ip };
  }

  return { ok: allowMemory(ip), ip };
}
