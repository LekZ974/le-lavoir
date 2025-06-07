'use client';

import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useEffect,
  useState
} from 'react';
import { twMerge } from 'tailwind-merge';

type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type Props =
  | (LinkProps & { button?: undefined })
  | (ButtonProps & { button: true });

export const LinkButton = (props: Props & { onClick?: () => void }) => {
  const { button, className = '', ...htmlProps } = props;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const baseClass = 'text-sm p-2.5 rounded-lg';

  if (!isClient) {
    // Ne rend qu'un lien neutre côté serveur pour éviter les erreurs d'hydratation
    return (
      <a
        className={twMerge(baseClass, 'text-extra-light', className)}
        aria-hidden="true"
      >
      </a>
    );
  }

  if (button) {
    return (
      <button
        onClick={props.onClick}
        type="button"
        {...(htmlProps as ButtonProps)}
        className={twMerge(
          baseClass,
          'hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none text-extra-light',
          className
        )}
      />
    );
  }

  return (
    <a
      onClick={props.onClick}
      {...(htmlProps as LinkProps)}
      className={twMerge(
        baseClass,
        'text-extra-light hover:bg-gray-200 dark:hover:bg-gray-700',
        className
      )}
    />
  );
};
