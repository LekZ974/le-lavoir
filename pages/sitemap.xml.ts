import type { IncomingMessage } from "http";
import type { GetServerSideProps } from "next";

// Import i18n configuration to get locales and default locale
// next-i18next config is CommonJS, so use require to keep it simple in Node.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require("../next-i18next.config");

type LocaleConfig = {
  locales: string[];
  defaultLocale: string;
};

function getBaseUrl(req: IncomingMessage): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && /^https?:\/\//i.test(envUrl)) return envUrl.replace(/\/$/, "");

  const proto = (req.headers["x-forwarded-proto"] as string) || "https";
  const host =
    (req.headers["x-forwarded-host"] as string) || (req.headers.host as string);
  if (host) return `${proto}://${host}`.replace(/\/$/, "");
  return "http://localhost:3000";
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

function generateSitemapXml(
  baseUrl: string,
  routes: string[],
  { locales, defaultLocale }: LocaleConfig
): string {
  const lastmod = new Date().toISOString();

  const urlsXml = routes
    .map((routePath) => {
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

      return [
        "  <url>",
        `    <loc>${locDefault}</loc>`,
        alternates,
        `    <xhtml:link rel=\"alternate\" hreflang=\"x-default\" href=\"${xDefaultHref}\" />`,
        `    <lastmod>${lastmod}</lastmod>`,
        "    <changefreq>weekly</changefreq>",
        "    <priority>0.8</priority>",
        "  </url>",
      ].join("\n");
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

  // List of static routes to include in the sitemap. Add more routes here as needed.
  // Do not include API routes.
  const staticRoutes: string[] = [
    "", // homepage
    "blog",
  ];

  const locales: string[] = (i18n?.locales || ["fr", "en"]) as string[];
  const defaultLocale: string = (i18n?.defaultLocale || "fr") as string;

  const xml = generateSitemapXml(baseUrl, staticRoutes, {
    locales,
    defaultLocale,
  });

  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null;
}
