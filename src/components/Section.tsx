import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { AnimateOnScroll } from './AnimateOnScroll';

export const Section = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    grayer?: boolean;
    fullWidth?: boolean;
    gradients?: boolean;
    animation?: boolean;
  }
) => {
  const { grayer, fullWidth, gradients, animation = true, ...divProps } = props;

  const NeonCircle = ({ className }: { className: string }) => (
    <div
      className={twMerge(
        'absolute opacity-60 dark:opacity-30 rounded-full w-96 h-96 md:w-[48rem] md:h-[48rem]',
        className
      )}
    />
  );

  const Gradients = () => (
    <>
      <div className="absolute inset-0 z-10 backdrop-blur-[200px]"/>
      <NeonCircle className="md:-left-[28rem] -left-40 -top-40 md:-top-[28rem] bg-neon-orange"/>
      <NeonCircle className="md:-right-[28rem] -right-40 -bottom-40 md:-bottom-[28rem] bg-neon-blue1"/>
    </>
  );

  return (
    <section
      className={`relative overflow-hidden ${
        grayer ? 'bg-strong' : 'bg-extra-strong'
      }`}
    >
      {animation ? <AnimateOnScroll animation={'fromDown'} threshold={0.1}>
        <div
          {...divProps}
          className={twMerge(
            `relative z-20 py-24 mx-auto col max-w-7xl ${
              fullWidth ? 'px-0' : 'px-12'
            }`,
            props.className
          )}
        />
      </AnimateOnScroll> : <div
        {...divProps}
        className={twMerge(
          `relative z-20 py-24 mx-auto col max-w-7xl ${
            fullWidth ? 'px-0' : 'px-12'
          }`,
          props.className
        )}
      />}
      {gradients ? <Gradients/> : null}
    </section>
  );
};
