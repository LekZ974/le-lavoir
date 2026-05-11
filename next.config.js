const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "lelavoir.re" }],
        destination: "https://www.lelavoir.re/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production";
    const scriptSrc = [
      "'self'",
      "'unsafe-inline'",
      ...(isProd ? [] : ["'unsafe-eval'"]),
      "https://vercel.live",
      "https://assets.vercel.com",
      "https://va.vercel-scripts.com",
    ].join(" ");
    const csp = [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.cdninstagram.com https://*.fbcdn.net https://*.googleusercontent.com https://maps.googleapis.com https://maps.gstatic.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "frame-src https://www.google.com https://maps.google.com https://www.youtube.com",
      "connect-src 'self' https://vitals.vercel-insights.com https://*.sanity.io",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; ");
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test && rule.test.test(".svg")
    );
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            titleProp: true,
            svgo: true,
            svgoConfig: {
              // Remove <style> blocks in SVGs so styles like .st0{fill:#000} don't override our CSS
              plugins: [
                { name: "removeStyleElement" },
                // Optionally remove class attributes to avoid lingering .st0 refs
                // { name: "removeAttrs", params: { attrs: "class" } },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
