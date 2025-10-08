import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { urlFor } from "../../sanity/lib/client";
import { getAllPosts, getPostBySlug, Post } from "../../sanity/lib/queries";
import { PortableText } from "../../src/components/PortableText";
import { Section } from "../../src/components/Section";
import { Footer, Header } from "../../src/sections";

interface BlogPostProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  post: Post;
}

const BlogPost = ({ isDarkMode, toggleDarkMode, post }: BlogPostProps) => {
  const router = useRouter();
  const locale = (router.locale === "en" ? "en" : "fr") as "fr" | "en";
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || "https://lelavoir.re"
  ).replace(/\/$/, "");
  const canonical = `${siteUrl}${
    router.locale === (router.defaultLocale || "fr") ? "" : `/${router.locale}`
  }/blog/${post.slug.current}`;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const title = post.title[locale] || post.title.fr;
  const excerpt = post.excerpt?.[locale] || post.excerpt?.fr;
  const body = post.body[locale] || post.body.fr;

  return (
    <div className="overflow-hidden col text-strong">
      <NextSeo
        title={`${title} — Le lavoir de la passerelle`}
        description={excerpt || title}
        canonical={canonical}
        openGraph={{
          url: canonical,
          title: `${title} — Le lavoir de la passerelle`,
          description: excerpt || title,
          images: post.mainImage
            ? [
                {
                  url: urlFor(post.mainImage).width(1200).height(630).url(),
                  width: 1200,
                  height: 630,
                  alt: post.mainImage.alt?.[locale] || title,
                },
              ]
            : undefined,
          type: "article",
          article: {
            publishedTime: post.publishedAt,
            authors: post.author?.name ? [post.author.name] : undefined,
          },
        }}
      />
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <article>
          <Section className="container mx-auto px-4 py-24 sm:py-32 max-w-4xl">
            {/* Header */}
            <header className="mb-8">
              <div className="mb-4">
                <time className="text-sm text-extra-light">
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-extra-strong mb-4">
                {title}
              </h1>
              {excerpt && (
                <p className="text-xl text-extra-light leading-relaxed">
                  {excerpt}
                </p>
              )}
              {post.author && (
                <div className="flex items-center mt-6">
                  {post.author.image && (
                    <div className="relative w-32 h-32 mr-4">
                      <Image
                        src={urlFor(post.author.image)
                          .width(128)
                          .height(128)
                          .url()}
                        alt={post.author.name}
                        fill
                        className="rounded-full object-contain"
                      />
                    </div>
                  )}
                  <div className="bg-strong rounded-lg p-2">
                    <p className="font-medium text-strong">
                      {post.author.name}
                    </p>
                    {post.author.bio?.[locale] && (
                      <p className="text-sm text-medium">
                        {post.author.bio[locale]}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </header>

            {/* Main Image */}
            {post.mainImage && (
              <div className="mb-8 relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(600).url()}
                  alt={post.mainImage.alt?.[locale] || title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={body} />
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <span
                      key={category.title.fr}
                      className="px-3 py-1 bg-primary text-white rounded-full text-sm text-extra-light"
                    >
                      {category.title[locale] || category.title.fr}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const posts = await getAllPosts();

  const paths = posts.flatMap((post) =>
    (locales || ["fr", "en"]).map((locale) => ({
      params: { slug: post.slug.current },
      locale,
    }))
  );

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || "fr", ["common"])),
      post,
    },
    revalidate: 60,
  };
};

export default BlogPost;
