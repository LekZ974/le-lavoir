import "aos/dist/aos.css";
import "../styles/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import AOS from "aos";
import { appWithTranslation } from "next-i18next";
import { NextSeo } from "next-seo";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDarkMode } from "usehooks-ts";
import SoonPage from "../src/components/SoonPage";

const siteTitle = "Le lavoir de la passerelle";
const siteDescription =
  "Laverie automatique à Saint-Joseph (974) : machines haute capacité, lessive écolo, séchage rapide. Accueil et services accessibles 7j/7.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Laundromat",
  name: "Le Lavoir de la Passerelle",
  "@id": "https://lelavoir.re",
  url: "https://lelavoir.re",
  image: "https://lelavoir.re/images/logo-og.jpg",
  telephone: "+262 692000000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "5c rue Amiral Lacaze",
    addressLocality: "Saint-Joseph",
    postalCode: "97480",
    addressCountry: "RE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -21.3763,
    longitude: 55.6152,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "22:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/tonlavoir",
    "https://www.instagram.com/tonlavoir",
  ],
  description:
    "Laverie automatique moderne à Saint-Joseph (974), ouverte 7j/7. Machines haute capacité, lessive écologique, séchage rapide et service pratique.",
  paymentAccepted: ["Cash", "Credit Card", "Mobile Payment"],
};

const App = ({ Component, pageProps }: AppProps) => {
  const { isDarkMode, toggle: toggleDarkMode } = useDarkMode();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://lelavoir.re"
  ).replace(/\/$/, "");

  const toOgLocale = (locale: string | undefined) =>
    locale === "fr" ? "fr_FR" : "en_GB";

  const stripLocaleFromPath = (inputPath: string): string => {
    const locales = router.locales || [];
    const defaultLocale = router.defaultLocale || "fr";
    for (const loc of locales) {
      if (loc === defaultLocale) continue;
      if (inputPath === `/${loc}`) return "/";
      if (inputPath.startsWith(`/${loc}/`))
        return inputPath.replace(`/${loc}`, "");
    }
    return inputPath;
  };

  const buildLocalizedUrl = (locale: string, path: string): string => {
    const defaultLocale = router.defaultLocale || "fr";
    const cleanPath = stripLocaleFromPath(path)
      .replace(/#.*/, "")
      .replace(/\?.*/, "");
    const normalized = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
    if (locale === defaultLocale) {
      return normalized === "/" ? `${siteUrl}/` : `${siteUrl}${normalized}`;
    }
    return normalized === "/"
      ? `${siteUrl}/${locale}`
      : `${siteUrl}/${locale}${normalized}`;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.setProperty("color-scheme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.setProperty("color-scheme", "light");
      }
    }
  }, [isDarkMode, isMounted]);

  useEffect(() => {
    if (isMounted) {
      AOS.init({
        once: true,
        disable: process.env.NODE_ENV === "development" ? true : "phone",
        duration: 700,
        easing: "ease-out-cubic",
      });
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      AOS.refresh();
    }
  }, [isMounted, router.asPath]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Le Lavoir de la Passerelle" />
        <meta name="theme-color" content={isDarkMode ? "#18181b" : "#fafafa"} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" href="/icons/favicon.ico" />

        <meta property="og:type" content="website" />
        <meta
          name="keywords"
          content="
              laundromat Reunion island,
               laverie,
                laverie Saint-Joseph,
                 laverie automatique,
                  lessive écologique Réunion,
                   laverie Réunion,
                    machines 8kg 14kg 20kg,
                     séchage rapide,
                      laverie 974,
                      laverie saint-joseph,
                       laverie automatique saint-joseph,
                        laverie 97480,
                         laverie de raphael babet,
                          laverie du sud,
                           machines à laver saint-joseph,
                            séchoirs saint-joseph,
                             laverie réunion,
                              laverie 7 jours sur 7 saint-joseph"
        />
        <meta
          name="facebook-domain-verification"
          content="hnwmdeubij0uobb9zgdvvwscvpcvk9"
        />
        <meta
          name="facebook-domain-verification"
          content="n18z4uwyk6vunr5lsqedi166ne74lu"
        />
        <meta
          name="facebook-domain-verification"
          content="7bj3zcildhfnpxli3wh5nuqdghnug1"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <NextSeo
        title={siteTitle}
        description={siteDescription}
        themeColor={isDarkMode ? "#18181b" : "#fafafa"}
        canonical={buildLocalizedUrl(
          router.locale || router.defaultLocale || "fr",
          router.asPath
        )}
        openGraph={{
          type: "website",
          locale: toOgLocale(router.locale || router.defaultLocale),
          url: buildLocalizedUrl(
            router.locale || router.defaultLocale || "fr",
            router.asPath
          ),
          siteName: siteTitle,
          title: siteTitle,
          description: siteDescription,
          images: [
            {
              url: "https://lelavoir.re/images/landing-page.png", // idéalement une image au format 1200x630
              width: 1200,
              height: 630,
              alt: siteTitle,
            },
          ],
        }}
        languageAlternates={(router.locales || [router.locale || "fr"])
          .map((lng) => ({
            hrefLang: lng,
            href: buildLocalizedUrl(lng, router.asPath),
          }))
          .concat([
            {
              hrefLang: "x-default",
              href: buildLocalizedUrl(
                router.defaultLocale || "fr",
                router.asPath
              ),
            },
          ])}
        twitter={{
          cardType: "summary_large_image",
          site: "@toncompte", // optionnel
          handle: "@toncompte", // optionnel
        }}
      />
      <Analytics />
      <SpeedInsights />
      {isMaintenanceMode && router.pathname !== "/blog" ? (
        <SoonPage />
      ) : (
        <Component
          {...pageProps}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
    </>
  );
};

export default appWithTranslation(App);
