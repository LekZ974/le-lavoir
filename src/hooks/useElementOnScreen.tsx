import { useEffect, useRef, useState, useCallback } from 'react';

type Options = {
  threshold: number;
  reappear?: boolean;
};

export const useElementOnScreen = (options: Options): [React.RefObject<HTMLDivElement>, boolean] => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Définir la callback d'observation avec useCallback pour éviter les recréations
  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (options.reappear) {
      setIsVisible(entry.isIntersecting);
    } else {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }
  }, [options.reappear]);

  useEffect(() => {
    // Si pas de fenêtre (SSR), ne pas créer d'observer
    if (typeof window === 'undefined' || !containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: options.threshold
    });

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [handleIntersect, options.threshold]);

  return [containerRef, isVisible];
};
