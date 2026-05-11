import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import type { LegalMentionsProps } from "../src/constants/legal";
import { getLegalMentionsProps } from "../src/constants/legal";
import { Section } from "../src/components/Section";
import { Title } from "../src/components/Title";
import { Footer, Header } from "../src/sections";

type PageProps = {
  legal: LegalMentionsProps;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export default function MentionsLegalesPage({
  legal,
  isDarkMode,
  toggleDarkMode,
}: PageProps) {
  const { t } = useTranslation();

  const siretPart = legal.siret
    ? t("legal.mentions.siret_done", { siret: legal.siret })
    : t("legal.mentions.siret_todo");

  return (
    <div className="overflow-hidden col text-strong">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <NextSeo
          title={t("legal.mentions.seo_title")}
          description={t("legal.mentions.seo_description")}
        />
        <Section className="flex flex-col py-24 px-6 mx-auto max-w-3xl">
          <Title size="extra-md" className="text-extra-strong mb-8">
            {t("legal.mentions.title")}
          </Title>
          <div className="space-y-6 text-left">
            <p className="text-sm leading-relaxed text-strong whitespace-pre-line">
              {t("legal.mentions.p1")}
            </p>
            <p className="text-sm leading-relaxed text-strong whitespace-pre-line">
              {t("legal.mentions.p2", {
                company: legal.companyName,
                legalForm: legal.legalForm,
                siretPart,
              })}
            </p>
            <p className="text-sm leading-relaxed text-strong whitespace-pre-line">
              {t("legal.mentions.p3", { address: legal.registeredAddress })}
            </p>
            <p className="text-sm leading-relaxed text-strong whitespace-pre-line">
              {t("legal.mentions.p4", { phone: legal.phoneDisplay })}
            </p>
            <p className="text-sm leading-relaxed text-strong whitespace-pre-line">
              {t("legal.mentions.p5", { director: legal.publicationDirector })}
            </p>
            <p className="text-sm leading-relaxed text-strong whitespace-pre-line">
              {t("legal.mentions.p6")}
            </p>
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
      legal: getLegalMentionsProps(locale || "fr"),
    },
  };
}
