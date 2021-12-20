import { useEffect } from 'react';

export const useOnScroll = (cb: (y: number) => unknown) => {
  useEffect(() => {
    function onScroll() {
      requestAnimationFrame(() => {
        cb(window.scrollY);
      });
    }
    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);
};
