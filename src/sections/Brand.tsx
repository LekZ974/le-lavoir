import React from 'react';
import { AnimateOnScroll } from '../components/AnimateOnScroll';
import { Section } from '../components/Section';
import { Card } from '../components/Card';
import { useTranslation } from 'react-i18next';
import { GradientText } from '../components/GradientText';
import { Title } from '../components/Title';
import Image from 'next/image';

export const Brand: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Section animation={false} grayer gradients fullWidth className="items-center px-4 dark sm:px-12">
      <AnimateOnScroll animation={'fromDown'}>
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
