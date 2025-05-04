import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

import Image from 'next/image';
import { Quote } from '../svg/Quote';
import { Demo } from '../components/Demo';
import { Details } from '../components/Details';
import { GradientText } from '../components/GradientText';
import { Section } from '../components/Section';
import { Title } from '../components/Title';
import { Card } from '../components/Card';
import { AnimateOnScroll } from '../components/AnimateOnScroll';

const CardFeatureText = ({
                           name,
                           title
                         }: {
  name?: string;
  title: string;
}) => {
  return (
    <>
      <div className="items-center">
        <cite className="not-italic text-strong font-bold">{name}</cite>
        <div className="text-base text-light">{title}</div>
      </div>
    </>
  );
};

const CardFeature = ({ className, children }: { className?: string, children: ReactNode }) => {
  return (
    <Card grayer className={twMerge('items-center gap-6 p-12 pt-20 body-lg col text-medium', className)}>
      {children}
    </Card>
  );
};

const FeatureSection = ({
                          children,
                          grayer,
                          right,
                          center
                        }: {
  children: ReactNode;
  grayer?: boolean;
  right?: boolean;
  center?: boolean;
}) => (
  <Section
    grayer={grayer}
    className={`col gap-6 ${
      center ? '' : right ? 'md:flex-row-reverse' : 'md:flex-row'
    }`}
  >
    {children}
  </Section>
);

const FeatureDemo = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    webmSrc: string;
    mp4Src: string;
    bumpLeft?: boolean;
    center?: boolean;
    className: string;
    alt: string;
  }
) => {
  const { webmSrc, mp4Src, bumpLeft, center, alt, className, ...divProps } =
    props;
  return (
    <div
      {...divProps}
      className={twMerge(
        `w-5/6 md:w-1/2 p-4 md:p-12 bg-gradient-to-br rounded-xl ${
          center ? '' : bumpLeft ? 'md:-translate-x-14' : 'md:translate-x-14'
        }`,
        className
      )}
    >
      <Demo
        data-aos={`${
          center ? 'zoom-y-out' : bumpLeft ? 'fade-right' : 'fade-left'
        }`}
        data-aos-delay="300"
        alt={alt}
      />
    </div>
  );
};

const Text = ({
                children,
                center
              }: {
  children: ReactNode;
  center?: boolean;
}) => (
  <div
    className={`w-5/6 col gap-4 text-center mb-8 mx-auto ${
      center ? 'md:w-2/3' : 'md:w-4/3 md:text-left md:my-auto'
    }`}
  >
    {children}
  </div>
);

export const Features = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* Feature 1 */}
      <FeatureSection>
        <Text>
          <Title size="extra-md">
            {t('pricing.title')}<br/>
          </Title>
          <GradientText className="pure-stream">{t('pricing.subtitle')}</GradientText>
          <Details className="text-extra-light">
            {t('pricing.text')}</Details>
        </Text>
        <div className="col gap-6">
          <div className="gap-6 col md:row">
            <CardFeature>
              <CardFeatureText
                name={t('pricing.8kg.title')}
                title={t('pricing.8kg.text')}
              />
            </CardFeature>
            <CardFeature>
              <CardFeatureText
                name={t('pricing.14kg.title')}
                title={t('pricing.14kg.text')}
              />
            </CardFeature>
            <CardFeature>
              <CardFeatureText
                name={t('pricing.20kg.title')}
                title={t('pricing.20kg.text')}
              />
            </CardFeature>
          </div>
          <div className="gap-6 col md:row">
            <CardFeature>
              <CardFeatureText
                name={t('pricing.drying.title')}
                title={t('pricing.drying.text')}
              />
            </CardFeature>
            <CardFeature>
              <CardFeatureText
                name={t('pricing.detergent.title')}
                title={t('pricing.detergent.text')}
              />
            </CardFeature>
          </div>
        </div>
      </FeatureSection>
      {/* Feature 2 */}
      <FeatureSection grayer right>
        <Text>
          <Title size="md">
            {t('machines.title')}<br/>
          </Title>
          <GradientText
            className="reunion-terracotta">{t('machines.subtitle')}
          </GradientText>
          <Details>
            {t('machines.description')}
          </Details>
          <Details>
            {t('machines.maintenance')}
          </Details>
        </Text>
        <div className="flip-box col gap-6 md:w-1/3">
          <div className="flip-box-inner">
            <div className="flip-box-front">
              <AnimateOnScroll animation={'fromRight'}>
                <Image
                  className="image"
                  src="/images/lave-linge-electrolux.png"
                  alt="Lave linge electrolux"
                  height="400"
                  width="400"
                />
              </AnimateOnScroll>
            </div>
            <div className="flip-box-back">
              <div className="row gap-6 pt-6">
                <CardFeature className="p-6">
                  <CardFeatureText
                    title={t('machines.experience1')}
                  />
                </CardFeature>
                <CardFeature className="p-6">
                  <CardFeatureText
                    title={t('machines.experience2')}
                  />
                </CardFeature>
              </div>
              <div className="row gap-6 pt-6">
                <CardFeature className="p-6">
                  <CardFeatureText
                    title={t('machines.experience3')}
                  />
                </CardFeature>
                <CardFeature className="p-6">
                  <CardFeatureText
                    title={t('machines.experience4')}
                  />
                </CardFeature>
              </div>
            </div>
          </div>
        </div>
      </FeatureSection>
      <FeatureSection>
        <Text>
          <Title size="extra-md">
            {t('sustainable.title')}<br/>
          </Title>
          <GradientText className="pure-stream">{t('sustainable.subtitle')}
          </GradientText>
          <Details className="text-extra-light">
            {t('sustainable.text')}
          </Details>
        </Text>
        <div className="col gap-6 md:w-1/3 items-center"
             style={{ justifyContent: 'center' }}
        >
          <AnimateOnScroll animation={'fromLeft'}>
            <Image
              src="/images/eco-illu.png"
              alt="illustration ecologie"
              height="400"
              width="400"
            />
          </AnimateOnScroll>
        </div>
      </FeatureSection>
      <FeatureSection grayer right>
        <Text>
          <Title size="md">
            {t('hygien.title')}<br/>
          </Title>
          <GradientText className="reunion-terracotta">{t('hygien.subtitle')}
          </GradientText>
          <Details>
            {t('hygien.text')}
          </Details>
        </Text>
        <div className="col gap-6 md:w-1/3 items-center"
             style={{ justifyContent: 'center' }}
        >
          <AnimateOnScroll animation={'fromRight'}>
            <Image
              src="/images/hygiene-illu.png"
              alt="Hygiène"
              height="400"
              width="400"
            />
          </AnimateOnScroll>
        </div>
      </FeatureSection>
    </>
  );
};
