import { useTranslation } from "next-i18next";

import { Demo } from "../components/Demo";
import { Details } from "../components/Details";
import { GradientText } from "../components/GradientText";
import { HeroLaundryCarousel } from "../components/HeroLaundryCarousel";
import { Section } from "../components/Section";
import { Title } from "../components/Title";

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <Section
      animation={false}
      gradients
      className="items-center justify-center min-h-screen 2xl:min-h-[1000px] h-fit gap-16 col"
    >
      <div className="2xl:min-h-[1000px] h-fit gap-16 col md:flex-row">
        {/* Text */}
        <div className="z-10 gap-4 py-28 text-center col md:text-left">
          <Title size="extra-lg" className="text-extra-strong">
            {t("hero.title")}
          </Title>
          <GradientText>{t("hero.subtitle")}</GradientText>
          <Details className="body-lg text-extra-light">
            {t("hero.text")}
          </Details>
        </div>
        {/* Photos + carte */}
        <div className="z-10 flex w-full max-w-2xl shrink-0 flex-col gap-6 md:w-auto md:max-w-none md:flex-[1.15]">
          <Demo
            className="w-full md:max-w-2xl md:self-end"
            alt="localisation de la laverie"
          />
        </div>
      </div>
      <HeroLaundryCarousel />
    </Section>
  );
};
