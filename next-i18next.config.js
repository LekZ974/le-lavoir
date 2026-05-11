/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    /**
     * Disabled so URLs stay stable (/fr/..., /en/...) for SEO and analytics.
     * Users pick language explicitly via the switcher instead of Accept-Language redirects.
     */
    localeDetection: false,
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/locales",

  reloadOnPrerender: process.env.NODE_ENV === "development",
};
