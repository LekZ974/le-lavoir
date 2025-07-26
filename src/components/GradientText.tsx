import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const GradientText = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
) => {
  return (
    <h3
      {...props}
      className={twMerge('md:text-6xl text-4xl text-medium pb-1', props.className)}
    />
  );
};
