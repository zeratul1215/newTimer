import { useEffect, useState } from 'react';
import { debounce } from '@linktivity/link-utils';

export function useTitle(title: string) {
  useEffect(() => {
    if (title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
}

export function useBeforeUnload(enabled: boolean = false) {
  useEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [enabled]);
}

export function useWindowSize(debounceDelay: number = 100) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const debouncedSetWindowSize = debounce((width: number, height: number) => {
    setWindowSize({ width, height });
  }, debounceDelay);

  useEffect(() => {
    const handleResize = () => {
      debouncedSetWindowSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [debouncedSetWindowSize]);

  return windowSize;
}
