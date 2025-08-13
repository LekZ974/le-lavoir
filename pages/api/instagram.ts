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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InstagramResponse>
) {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const limitParam = Array.isArray(req.query.limit)
    ? req.query.limit[0]
    : req.query.limit;
  const limit = Math.max(1, Math.min(Number(limitParam) || 9, 24));

  if (!accessToken) {
    // No token configured: return empty feed gracefully
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
    return res.status(200).json({ data: json.data || [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(200).json({ data: [], error: { message } });
  }
}
