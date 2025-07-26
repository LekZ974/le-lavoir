import React from 'react';
import { AnimateOnScroll } from '../components/AnimateOnScroll';
import CardLinks from '../components/CardLinks';
import { Section } from '../components/Section';

export const SocialLinks: React.FC = () => {
  return (
    <Section animation={false} gradients fullWidth className="px-4 sm:px-12">
      <AnimateOnScroll animation={'fromDown'}>
        <CardLinks/>
      </AnimateOnScroll>
    </Section>
  );
};

export default SocialLinks;
