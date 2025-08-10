import { useTranslation } from "next-i18next";

import { Demo } from "../components/Demo";
import { Details } from "../components/Details";
import { GradientText } from "../components/GradientText";
import { Section } from "../components/Section";
import { Title } from "../components/Title";

export const Hero = () => {
  const { t } = useTranslation();
  return (
    <Section
      animation={false}
      gradients
      className="items-center justify-center min-h-screen 2xl:min-h-[1000px] h-fit gap-16 col md:flex-row"
    >
      {/* Text */}
      <div className="z-10 gap-4 py-28 text-center col md:text-left">
        <Title size="extra-lg" className="text-extra-strong">
          {t("hero.title")}
        </Title>
        <GradientText>{t("hero.subtitle")}</GradientText>
        <Details className="body-lg text-extra-light">{t("hero.text")}</Details>
      </div>
      {/* Image */}
      <Demo
        className={"md:w-[3000px]"}
        data-aos="fade-left"
        alt="localisation de la laverie"
      />
    </Section>
  );
};
