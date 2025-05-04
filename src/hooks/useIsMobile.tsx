import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 600) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Code exécuté uniquement côté client
    if (window) {
      const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
      checkMobile(); // initialisation
      setHydrated(true);
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }
  }, [breakpoint]);

  return { isMobile, hydrated };
};
