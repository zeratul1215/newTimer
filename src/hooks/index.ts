import { useEffect, useState, useCallback, useRef } from 'react';

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

// 防抖 Hook
export function useDebounce<T extends (...args: never[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<number>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}

export function useWindowSize(debounceDelay: number = 100) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const debouncedSetWindowSize = useDebounce(
    (width: number, height: number) => {
      setWindowSize({ width, height });
    },
    debounceDelay
  );

  useEffect(() => {
    const handleResize = () => {
      debouncedSetWindowSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [debouncedSetWindowSize]);

  return windowSize;
}
