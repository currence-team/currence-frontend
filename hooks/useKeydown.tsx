import { useCallback, useEffect } from 'react';

export const useKeydown = (cb: (e: KeyboardEvent) => unknown) => {
  const _cb = useCallback(cb, []);

  useEffect(() => {
    document.addEventListener('keydown', _cb);
    return () => {
      document.removeEventListener('keydown', _cb);
    };
  }, [_cb]);
};
