import { useEffect } from 'react';

export function useTitle(title: string) {
  useEffect(() => {
    if (title.trim().length > 0) {
      document.title = title.trim();
    }
  }, [title]);
}

export function useBeforeUnload() {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}
