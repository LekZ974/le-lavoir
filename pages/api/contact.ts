import formData from "form-data";
import Mailgun from "mailgun.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { allowContactSubmit } from "../../src/lib/contactRateLimit";
import {
  CONTACT_MAX_MESSAGE_LEN,
  CONTACT_MAX_NAME_LEN,
} from "../../src/constants/contact";

type ResponseBody = { message: string };

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot — must stay empty */
  website?: string;
};

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const MAX_NAME_LEN = CONTACT_MAX_NAME_LEN;
const MAX_MESSAGE_LEN = CONTACT_MAX_MESSAGE_LEN;

/** Strip C0 controls; optional newlines/tabs preserved for message body only */
function stripControlChars(input: string, opts: { allowNewlines?: boolean }) {
  if (opts.allowNewlines) {
    return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  }
  return input
    .replace(/[\x00-\x1F\x7F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message, website } = req.body as ContactPayload;

  if (website && String(website).trim() !== "") {
    return res.status(200).json({ message: "Email sent successfully" });
  }

  const rawName = typeof name === "string" ? name.trim() : "";
  const trimmedEmail = typeof email === "string" ? email.trim() : "";
  const rawMessage = typeof message === "string" ? message.trim() : "";

  if (!rawName || !trimmedEmail || !rawMessage) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (rawName.length > MAX_NAME_LEN || rawMessage.length > MAX_MESSAGE_LEN) {
    return res.status(400).json({ message: "Payload too large" });
  }

  const trimmedName = stripControlChars(rawName, {});
  const trimmedMessage = stripControlChars(rawMessage, {
    allowNewlines: true,
  });

  if (!trimmedName || !trimmedMessage) {
    return res.status(400).json({ message: "Missing fields" });
  }

  if (trimmedEmail.length > 254 || !EMAIL_RE.test(trimmedEmail)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const { ok } = await allowContactSubmit(req);
  if (!ok) {
    return res.status(429).json({ message: "Too many requests" });
  }

  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;

  if (!apiKey || !domain) {
    return res
      .status(500)
      .json({ message: "Email service not configured (env missing)." });
  }

  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: apiKey,
    url: "https://api.eu.mailgun.net",
  });

  const messageData = {
    from: `"Le Lavoir de la Passerelle" <contact@lelavoir.re>`,
    to: "contact@lelavoir.re",
    subject: `New Contact Form Submission from ${trimmedName}`.slice(0, 998),
    text: `
        Name: ${trimmedName}
        Email: ${trimmedEmail}
        Message: ${trimmedMessage}
      `,
  };

  try {
    await mg.messages.create(domain, messageData);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("Mailgun error:", msg);
    res.status(500).json({ message: "Error sending email" });
  }
}
