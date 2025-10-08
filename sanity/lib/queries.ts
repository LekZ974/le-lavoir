import { client } from "./client";

export interface Post {
  _id: string;
  title: {
    fr: string;
    en: string;
  };
  slug: {
    current: string;
  };
  author?: {
    name: string;
    image?: any;
    bio?: {
      fr?: string;
      en?: string;
    };
  };
  mainImage?: any;
  categories?: Array<{
    title: {
      fr: string;
      en: string;
    };
  }>;
  publishedAt: string;
  excerpt?: {
    fr?: string;
    en?: string;
  };
  body: {
    fr: any[];
    en: any[];
  };
}

export async function getAllPosts(): Promise<Post[]> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return [];
  }

  try {
    return await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        author->{
          name,
          image,
          bio
        },
        mainImage,
        categories[]->{
          title
        },
        publishedAt,
        excerpt,
        body
      }`
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return null;
  }

  try {
    return await client.fetch(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        author->{
          name,
          image,
          bio
        },
        mainImage,
        categories[]->{
          title
        },
        publishedAt,
        excerpt,
        body
      }`,
      { slug }
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}
