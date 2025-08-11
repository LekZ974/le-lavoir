import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { Section } from "../src/components/Section";
import { Title } from "../src/components/Title";
import { Header } from "../src/sections";
import Brand from "../src/sections/Brand";

type PageProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ||
  "https://www.facebook.com/profile.php?id=61577023506091";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
  "https://www.instagram.com/le_lavoir_de_la_passerelle/";

// Idéalement, remplacez par votre URL d'avis Google (Google Business) si disponible
const GOOGLE_REVIEWS_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ||
  "https://g.page/r/CTBsKC-8ckR-EBM/review";

const HOME_URL = "/";

export default function Portail({ isDarkMode, toggleDarkMode }: PageProps) {
  const { t } = useTranslation();
  return (
    <main>
      <NextSeo
        title={t("portail.seo.title")}
        description={t("portail.seo.description")}
      />
      <Header isDarkMode={false} />
      <Section className="flex flex-col items-center justify-center py-48">
        <div className="text-center col items-center">
          <Title size="extra-md" className="text-extra-strong">
            {t("portail.title")}
          </Title>
          <div className="grid gap-4 w-full max-w-md mx-auto mt-8">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-50 font-bold bg-primary-600 rounded-lg hover:bg-primary-700 w-full px-4 py-3 text-center"
            >
              {t("portail.google")}
            </a>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-50 font-bold bg-primary-600 rounded-lg hover:bg-primary-700 w-full px-4 py-3 text-center"
            >
              {t("portail.facebook")}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-50 font-bold bg-primary-600 rounded-lg hover:bg-primary-700 w-full px-4 py-3 text-center"
            >
              {t("portail.instagram")}
            </a>
            <a
              href={HOME_URL}
              className="text-gray-50 font-bold bg-primary-600 rounded-lg hover:bg-primary-700 w-full px-4 py-3 text-center"
            >
              {t("portail.home")}
            </a>
          </div>
        </div>
      </Section>
      <Brand />
    </main>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
