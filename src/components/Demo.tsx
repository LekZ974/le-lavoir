import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { MacBar } from './MacBar';

type DemoProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  alt: string;
};

export const Demo = (props: DemoProps) => {
  const { alt, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={twMerge(
        'iframe relative col justify-center max-w-2xl overflow-hidden shadow-lg round-rect',
        divProps.className
      )}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.9574239881793!2d55.61372167481533!3d-21.375384780291927!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217873d67df963d5%3A0x4c5d6e0688534728!2s5%20Rue%20de%20l&#39;Amiral%20Lacaze%2C%2097480%20Saint-Joseph%2C%20R%C3%A9union!5e0!3m2!1sfr!2sfr!4v1708265791783!5m2!1sfr!2sfr"
        height="450" loading="lazy"></iframe>
    </div>
  );
};
