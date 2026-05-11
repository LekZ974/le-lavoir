import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { HERO_LAUNDRY_PHOTOS } from "../constants/heroLaundryPhotos";

const AUTOPLAY_MS = 5500;

export const HeroLaundryCarousel = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = HERO_LAUNDRY_PHOTOS.length;

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % len);
  }, [len]);

  useEffect(() => {
    if (paused || len <= 1) return;
    const id = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, len, goNext]);

  return (
    <div
      className="relative w-full max-w-2xl overflow-hidden shadow-lg round-rect bg-strong"
      data-aos="fade-left"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] w-full">
        {HERO_LAUNDRY_PHOTOS.map((src, i) => (
          <div
            key={src}
            className={twMerge(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === index ? "z-[1] opacity-100" : "z-0 opacity-0 pointer-events-none"
            )}
            aria-hidden={i !== index}
          >
            <Image
              src={src}
              alt={t("hero.carousel.alt", { n: i + 1 })}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, min(672px, 45vw)"
              priority={i === 0}
            />
          </div>
        ))}

        {len > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-strong/80 p-2 text-strong shadow backdrop-blur-sm transition hover:bg-strong md:left-3"
              aria-label={t("hero.carousel.prev")}
            >
              <Chevron direction="left" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-strong/80 p-2 text-strong shadow backdrop-blur-sm transition hover:bg-strong md:right-3"
              aria-label={t("hero.carousel.next")}
            >
              <Chevron direction="right" />
            </button>

            <div
              className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2"
              role="tablist"
              aria-label={t("hero.carousel.dotsLabel")}
            >
              {HERO_LAUNDRY_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={t("hero.carousel.dotLabel", { n: i + 1 })}
                  className={twMerge(
                    "h-2 w-2 rounded-full shadow-sm transition focus-visible:ring-2 focus-visible:ring-primary",
                    i === index ? "scale-110 bg-primary" : "bg-white/55 hover:bg-white/85"
                  )}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="M15 18l-6-6 6-6" />
      ) : (
        <path d="M9 18l6-6-6-6" />
      )}
    </svg>
  );
}
