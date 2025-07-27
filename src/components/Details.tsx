import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

interface DetailsProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: ReactNode;
}

export const Details = ({
                          children,
                          ...props
                        }: DetailsProps) => {

  return (
    <p
      data-aos="zoom-y-out"
      data-aos-delay="150"
      className={twMerge('body-lg text-light', props.className)}
      {...props}
    >
      {children as string}
    </p>
  );
};
