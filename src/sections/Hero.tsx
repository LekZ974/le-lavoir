import { useTranslation } from 'react-i18next';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

import { ScatteredSpheres } from '../svg/ScatteredSpheres';
import { Title } from '../components/Title';
import { Details } from '../components/Details';
import { Demo } from '../components/Demo';
import { Section } from '../components/Section';
import { GradientText } from '../components/GradientText';
import { WaitlistForm } from '../components/WaitlistForm';
import Image from 'next/image';

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
          {t('hero.title')}
        </Title>
        <GradientText>{t('hero.subtitle')}</GradientText>
        <Details className="text-extra-light">
          {t('hero.text')}
        </Details>
      </div>
      {/* Image */}
      <Demo
        className={'md:w-[3000px]'}
        data-aos="fade-left"
        alt="localisation de la laverie"
      />
    </Section>
  );
};
