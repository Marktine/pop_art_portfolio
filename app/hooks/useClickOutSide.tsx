import { useEffect, RefObject } from 'react';

// Define standard Mouse or Touch events for browser compatibility
type Event = MouseEvent | TouchEvent;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  callback: (event: Event) => void
): void {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const element = ref.current;

      // Do nothing if clicking the ref's element or its children
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      callback(event);
    };

    // Listen for both mouse clicks and touch taps
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]);
}

