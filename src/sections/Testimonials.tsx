import Image from 'next/image';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Quote } from '../svg/Quote';
import { Card } from '../components/Card';
import { Details } from '../components/Details';
import { Section } from '../components/Section';
import { Title } from '../components/Title';

const TestimonialImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="absolute mx-auto -top-10">
      <Quote/>
      <Image
        className="rounded-full"
        src={src}
        width="96"
        height="96"
        alt={alt}
      />
    </div>
  );
};

const TestimonialText = ({
                           quote,
                           name,
                           title
                         }: {
  quote: string;
  name?: string;
  title?: string;
}) => {
  return (
    <>
      <blockquote className="font-medium text-light">&quot;{quote}&quot;</blockquote>
      <div className="">
        <cite className="not-italic text-light font-bold">— {name}</cite>
        <div className="text-base text-light">{title}</div>

      </div>
    </>
  );
};

const Testimonial = ({ children }: { children: ReactNode }) => {
  return (
    <Card grayer className="items-center gap-6 p-12 pt-20 body-lg col text-medium">
      {children}
    </Card>
  );
};

export const Testimonials = () => {
  const { t } = useTranslation();
  return (
    <Section className="gap-24 text-center">
      {/* Header */}
      <div className="gap-4 col">
        <Title size="extra-md">
          {t('testimonial.title')}
        </Title>
        <Details className="text-extra-light">
          {t('testimonial.text')}</Details>
      </div>
      {/* Testimonials */}
      <div className="gap-20 md:gap-6 col md:row">
        {/* Testimonial 1 */}
        <Testimonial>
          <TestimonialImage src="/images/will.jpg" alt="Will Gao"/>
          <TestimonialText
            quote={t('testimonial.feedback1')}
          />
        </Testimonial>
        <Testimonial>
          <TestimonialImage src="/images/veljko.jpg" alt="Veljko Muratovic"/>
          <TestimonialText
            quote={t('testimonial.feedback2')}
          />
        </Testimonial>
        <Testimonial>
          <TestimonialImage src="/images/tejal.png" alt="Tejal Patwardhan"/>
          <TestimonialText
            quote={t('testimonial.feedback3')}
          />
        </Testimonial>
      </div>
    </Section>
  );
};
