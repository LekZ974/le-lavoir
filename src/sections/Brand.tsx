import { useTranslation } from "next-i18next";
import Image from "next/image";
import React from "react";
import { AnimateOnScroll } from "../components/AnimateOnScroll";
import { Section } from "../components/Section";

export const Brand: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Section
      animation={false}
      grayer
      gradients
      fullWidth
      className="items-center px-4 dark sm:px-12"
    >
      <AnimateOnScroll animation={"fromDown"}>
        <Image
          src="/images/logo.png"
          alt="Logo Le Lavoir de la Passerelle"
          height="300"
          width="300"
        />
      </AnimateOnScroll>
    </Section>
  );
};

export default Brand;
