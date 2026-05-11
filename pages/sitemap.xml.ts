import type { IncomingMessage } from "http";
import type { GetServerSideProps } from "next";
import { getAllPosts } from "../sanity/lib/queries";
import { getSiteOrigin } from "../src/constants/site";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require("../next-i18next.config");

type LocaleConfig = {
  locales: string[];
  defaultLocale: string;
};

type SitemapEntry = {
  path: string;
  /** ISO 8601; omit for routes without a reliable freshness signal */
  lastmod?: string;
};

function getBaseUrl(req: IncomingMessage): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && /^https?:\/\//i.test(envUrl)) return envUrl.replace(/\/$/, "");

  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const host =
    (req.headers["x-forwarded-host"] as string) || (req.headers.host as string);
  if (host) return `${proto}://${host}`.replace(/\/$/, "");
  return getSiteOrigin();
}

function buildUrl(
  baseUrl: string,
  path: string,
  locale: string,
  defaultLocale: string
): string {
  const normalizedPath = path.replace(/^\//, "");
  if (locale === defaultLocale) {
    return normalizedPath ? `${baseUrl}/${normalizedPath}` : `${baseUrl}/`;
  }
  return normalizedPath
    ? `${baseUrl}/${locale}/${normalizedPath}`
    : `${baseUrl}/${locale}`;
}

function normalizeLastmod(iso: string): string | undefined {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

function generateSitemapXml(
  baseUrl: string,
  entries: SitemapEntry[],
  { locales, defaultLocale }: LocaleConfig
): string {
  const urlsXml = entries
    .map(({ path: routePath, lastmod }) => {
      const locDefault = buildUrl(
        baseUrl,
        routePath,
        defaultLocale,
        defaultLocale
      );
      const alternates = locales
        .map((lng) => {
          const href = buildUrl(baseUrl, routePath, lng, defaultLocale);
          return `    <xhtml:link rel="alternate" hreflang="${lng}" href="${href}" />`;
        })
        .join("\n");

      const xDefaultHref = buildUrl(
        baseUrl,
        routePath,
        defaultLocale,
        defaultLocale
      );

      const rows = [
        "  <url>",
        `    <loc>${locDefault}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        alternates,
        `    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"${xDefaultHref}\" />`,
        "    <changefreq>weekly</changefreq>",
        "    <priority>0.8</priority>",
        "  </url>",
      ];
      return rows.join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    ">",
    urlsXml,
    "</urlset>",
  ].join("\n");
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const baseUrl = getBaseUrl(req);

  const posts = await getAllPosts();

  const latestBlogIso = posts.reduce<string | undefined>((best, p) => {
    const cur = normalizeLastmod(p.publishedAt);
    if (!cur) return best;
    if (!best || cur > best) return cur;
    return best;
  }, undefined);

  const postEntries: SitemapEntry[] = posts.map((p) => ({
    path: `blog/${p.slug.current}`,
    lastmod: normalizeLastmod(p.publishedAt),
  }));

  /** `/portail` is noindex — excluded from sitemap for crawl consistency */
  const staticEntries: SitemapEntry[] = [
    { path: "" },
    ...(latestBlogIso ? [{ path: "blog", lastmod: latestBlogIso }] : [{ path: "blog" }]),
    { path: "avis" },
    { path: "contact" },
    { path: "mentions-legales" },
    { path: "politique-confidentialite" },
  ];

  const xml = generateSitemapXml(baseUrl, [...staticEntries, ...postEntries], {
    locales: (i18n?.locales || ["fr", "en"]) as string[],
    defaultLocale: (i18n?.defaultLocale || "fr") as string,
  });

  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null;
}
