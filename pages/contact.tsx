import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { ContactForm } from "../src/components/ContactForm";
import { Section } from "../src/components/Section";
import { Title } from "../src/components/Title";
import { Footer, Header } from "../src/sections";

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="overflow-hidden col text-strong">
      <Header isDarkMode={false} />
      <main>
        <NextSeo
          title={t("contact.seo.title")}
          description={t("contact.seo.description")}
        />
        <Section className="flex flex-col items-center justify-center py-48">
          <div className="text-center col items-center w-full max-w-xl">
            <Title size="extra-md" className="text-extra-strong">
              Contactez-nous
            </Title>
            <div className="mt-8 w-full">
              <ContactForm />
            </div>
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
