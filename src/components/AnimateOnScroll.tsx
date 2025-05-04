import React, { useMemo } from 'react';
import { useElementOnScreen } from '../hooks/useElementOnScreen';
import { useIsMobile } from '../hooks/useIsMobile';

export const AnimateOnScroll = ({ children, animation, reappear, threshold = 0.5 }: {
  children: React.ReactNode,
  animation?: string,
  reappear?: boolean,
  threshold?: number
}) => {
  const [containerRef, isVisible] = useElementOnScreen({ threshold, reappear });
  const { isMobile, hydrated } = useIsMobile();

  const animationClass = useMemo(() => {
    if (!hydrated) {
      return '';
    }
    const base = 'transition duration-1000 ease-out motion-reduce:transition-none';
    const visible = 'opacity-100 blur-none';
    const hidden = 'opacity-0 blur-lg';

    if (!isVisible) {
      switch (animation) {
        case 'fromRight':
          return `${base} ${hidden} ${isMobile ? 'translate-y-20' : '-translate-x-20'}`;
        case 'fromLeft':
          return `${base} ${hidden} ${isMobile ? 'translate-y-20' : 'translate-x-20'}`;
        case 'fromDown':
          return `${base} ${hidden} translate-y-20`;
        default:
          return '';
      }
    }

    return `${base} ${visible} translate-x-0 translate-y-0`;
  }, [hydrated, isVisible, animation, isMobile]);

  return (
    <div ref={containerRef} className={animationClass}>
      {children}
    </div>
  );
};
