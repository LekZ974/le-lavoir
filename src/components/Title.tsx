import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const Title = (
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & { size: 'extra-lg' | 'extra-md' | 'lg' | 'md' }
) => {
  const { size, className = '', ...htmlProps } = props;

  const headingProps = {
    ...htmlProps,
    'data-aos': 'zoom-y-out'
  };

  if (size === 'extra-lg') {
    return <h1
      {...headingProps}
      className={twMerge(
        'font-bold leading-tight tracking-tighter title-extra-lg',
        className
      )}
    />;
  }

  if (size === 'extra-md') {
    return <h2
      {...headingProps}
      className={twMerge(
        'font-bold leading-tight tracking-tighter title-extra-md',
        className
      )}
    />;
  }

  return size === 'lg' ? (
    <h1
      {...headingProps}
      className={twMerge(
        'font-bold leading-tight tracking-tighter title-lg',
        className
      )}
    />
  ) : (
    <h2
      {...headingProps}
      className={twMerge(
        'font-bold leading-tight tracking-tighter title-md',
        className
      )}
    />
  );
};
