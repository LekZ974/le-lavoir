import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { Details } from "../components/Details";
import { Section } from "../components/Section";
import { Title } from "../components/Title";

type Media = {
  id: string;
  caption?: string;
  media_url: string;
  media_type: string;
  permalink: string;
  thumbnail_url?: string;
};

export const InstagramFeed = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/instagram?limit=9`);
        const json = (await res.json()) as { data: Media[] };
        if (isMounted) setItems(json.data || []);
      } catch {
        if (isMounted) setItems([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    run();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!items.length && !isLoading) return null;

  return (
    <Section className="container mx-auto px-4">
      <div className="text-center mb-8">
        <Title size="md">{t("social.follow_us")}</Title>
        <Details className="text-extra-light">Instagram</Details>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {isLoading
          ? Array.from({ length: 9 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-square overflow-hidden round-rect bg-strong animate-pulse"
              />
            ))
          : items.map((item) => (
              <a
                key={item.id}
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="aspect-square overflow-hidden round-rect bg-strong">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      item.media_type === "VIDEO"
                        ? item.thumbnail_url ?? ""
                        : item.media_url ?? ""
                    }
                    alt={item.caption ?? "Instagram"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
              </a>
            ))}
      </div>
    </Section>
  );
};
