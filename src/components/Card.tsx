import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';

export const Card = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    grayer?: boolean;
  }
) => {
  const { t } = useTranslation('common');
  const { grayer = false, ...divProps } = props;

  return (
    <div


      {...divProps}
      className={twMerge(
        `relative card shadow-xl flex-1 border border-gray-300 rounded-lg dark:border-gray-600 ${
          grayer ? 'bg-strong' : 'bg-extra-strong'
        }`,
        props.className
      )}
    />
  );
};
