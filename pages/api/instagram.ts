import type { NextApiRequest, NextApiResponse } from "next";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_url: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | string;
  permalink: string;
  thumbnail_url?: string;
  timestamp?: string;
  username?: string;
};

type InstagramResponse = {
  data: InstagramMedia[];
  error?: { message: string };
};

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 40;
const rateBuckets = new Map<string, number[]>();

function getClientIp(req: NextApiRequest): string {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string") {
    const first = xf.split(",")[0]?.trim();
    if (first) return first;
  }
  if (Array.isArray(xf) && xf[0]) return xf[0];
  return req.socket?.remoteAddress || "unknown";
}

function allowRate(ip: string): boolean {
  const now = Date.now();
  const prev = (rateBuckets.get(ip) || []).filter(
    (t) => now - t < RATE_WINDOW_MS
  );
  if (prev.length >= RATE_MAX) return false;
  prev.push(now);
  rateBuckets.set(ip, prev);
  return true;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InstagramResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      data: [],
      error: { message: "Method Not Allowed" },
    });
  }

  if (!allowRate(getClientIp(req))) {
    res.setHeader("Retry-After", "60");
    return res.status(429).json({
      data: [],
      error: { message: "Too many requests" },
    });
  }

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const limitParam = Array.isArray(req.query.limit)
    ? req.query.limit[0]
    : req.query.limit;
  const limit = Math.max(1, Math.min(Number(limitParam) || 9, 24));

  if (!accessToken) {
    return res.status(200).json({ data: [] });
  }

  try {
    const fields = [
      "id",
      "caption",
      "media_url",
      "permalink",
      "thumbnail_url",
      "media_type",
      "timestamp",
      "username",
    ].join(",");

    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${encodeURIComponent(
      accessToken
    )}&limit=${limit}`;

    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      const text = await response.text();
      return res.status(200).json({ data: [], error: { message: text } });
    }
    const json = (await response.json()) as { data?: InstagramMedia[] };
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );
    return res.status(200).json({ data: json.data || [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(200).json({ data: [], error: { message } });
  }
}
