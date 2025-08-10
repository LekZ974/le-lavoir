import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { Details } from "../src/components/Details";
import { Section } from "../src/components/Section";
import { Title } from "../src/components/Title";
import { Footer, Header } from "../src/sections";

const articles = [
  {
    title:
      "💡10 astuces pour une lessive plus efficace et économique au Lavoir de la Passerelle",
    description:
      "Faire sa lessive, ce n'est pas juste une question de lancer une machine. Avec quelques bonnes habitudes, vous pouvez gagner du temps, économiser de l'argent et mieux entretenir votre linge. Voici nos 10 meilleures astuces à appliquer lors de votre passage au Lavoir de la Passerelle !",
    url: "https://medium.com/@alexandre.hoareau/10-astuces-pour-une-lessive-plus-efficace-et-économique-au-lavoir-de-la-passerelle-441e15bd0d27",
    date: "07 Août 2025",
  },
];

const Blog = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://lelavoir.re"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}${
    router.locale === (router.defaultLocale || "fr") ? "" : `/${router.locale}`
  }/blog`;
  return (
    <div className="overflow-hidden col text-strong">
      <NextSeo
        title={`Blog — Le lavoir de la passerelle`}
        description={t("blog.subtitle")}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title: `Blog — Le lavoir de la passerelle`,
          description: t("blog.subtitle"),
        }}
      />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Section className="container mx-auto px-4 py-48 sm:py-48">
          <div className="text-center">
            <Title size="extra-lg">{t("blog.title")}</Title>
            <Details className="text-extra-light">{t("blog.subtitle")}</Details>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {articles.map((article) => (
              <a key={article.title} href={article.url} className="block group">
                <div className="p-6 rounded-lg bg-strong shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <p className="text-sm text-medium">{article.date}</p>
                  <p className="text-xl font-semibold text-strong group-hover:text-primary mt-2">
                    {article.title}
                  </p>
                  <p className="mt-3 text-base text-medium">
                    {article.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Blog;
