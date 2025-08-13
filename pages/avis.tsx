import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { Section } from "../src/components/Section";
import { Title } from "../src/components/Title";
import { Header } from "../src/sections";
import { Brand } from "../src/sections/Brand";

export default function Avis() {
  const { t } = useTranslation();
  return (
    <main>
      <NextSeo
        title={t("avis.seo.title")}
        description={t("avis.seo.description")}
      />
      <Header />
      <Section className="flex flex-col items-center justify-center py-48">
        <div className="text-center col items-center">
          <Title size="extra-md" className="text-extra-strong">
            {t("avis.title")}
          </Title>
          <div className="grid gap-4 w-full max-w-sm mx-auto mt-8">
            <a
              href="/portail"
              className="text-gray-50 font-bold bg-primary-600 rounded-lg hover:bg-primary-700 w-full px-4 py-3 text-center"
            >
              {t("avis.yes")}
            </a>
            <a
              href="/contact"
              className="text-gray-50 font-bold bg-primary-600 rounded-lg hover:bg-primary-700 w-full px-4 py-3 text-center"
            >
              {t("avis.no")}
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
