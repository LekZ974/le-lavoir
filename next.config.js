const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
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
