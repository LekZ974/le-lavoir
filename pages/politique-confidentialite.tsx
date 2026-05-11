import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { Section } from "../src/components/Section";
import { Title } from "../src/components/Title";
import { Footer, Header } from "../src/sections";

const PARAGRAPH_KEYS = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"] as const;

export default function PolitiqueConfidentialitePage({
  isDarkMode,
  toggleDarkMode,
}: Readonly<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}>) {
  const { t } = useTranslation();

  return (
    <div className="overflow-hidden col text-strong">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <NextSeo
          title={t("legal.privacy.seo_title")}
          description={t("legal.privacy.seo_description")}
        />
        <Section className="flex flex-col py-24 px-6 mx-auto max-w-3xl">
          <Title size="extra-md" className="text-extra-strong mb-8">
            {t("legal.privacy.title")}
          </Title>
          <div className="space-y-6 text-left">
            {PARAGRAPH_KEYS.map((key) => (
              <p
                key={key}
                className="text-sm leading-relaxed text-strong whitespace-pre-line"
              >
                {t(`legal.privacy.${key}`)}
              </p>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
