import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { urlFor } from "../sanity/lib/client";
import { getAllPosts, Post } from "../sanity/lib/queries";
import { Details } from "../src/components/Details";
import { Section } from "../src/components/Section";
import { Title } from "../src/components/Title";
import { Footer, Header } from "../src/sections";
import { getSiteOrigin } from "../src/constants/site";

const Blog = ({
  isDarkMode,
  toggleDarkMode,
  posts,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  posts: Post[];
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const locale: "fr" | "en" = router.locale === "en" ? "en" : "fr";
  const siteUrl = getSiteOrigin();
  const canonical = `${siteUrl}${
    router.locale === (router.defaultLocale || "fr") ? "" : `/${router.locale}`
  }/blog`;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="overflow-hidden col text-strong">
      <NextSeo
        title={t("blog.seo.title")}
        description={t("blog.subtitle")}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title: t("blog.seo.title"),
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
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="block group"
              >
                <div
                  className="p-6 rounded-lg bg-strong shadow-lg hover:shadow-xl transition-shadow duration-300"
                  style={{ height: "100%" }}
                >
                  {post.mainImage && (
                    <div className="mb-4 relative w-full h-48 rounded-lg overflow-hidden">
                      <Image
                        src={urlFor(post.mainImage)
                          .width(600)
                          .height(300)
                          .url()}
                        alt={post.mainImage.alt?.[locale] || post.title[locale]}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-sm text-medium">
                    {formatDate(post.publishedAt)}
                  </p>
                  <p className="text-xl font-semibold text-strong group-hover:text-primary mt-2">
                    {post.title[locale] || post.title.fr}
                  </p>
                  {post.excerpt?.[locale] && (
                    <p className="mt-3 text-base text-medium">
                      {post.excerpt[locale]}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const posts = await getAllPosts();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      posts,
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default Blog;
