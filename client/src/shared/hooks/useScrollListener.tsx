import { useState, useLayoutEffect } from 'react';

export enum ScrollDirection {
  DOWN = 'down',
  UP = 'up'
}

export function useScrollDirection (): ScrollDirection {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.DOWN
  );

  useLayoutEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDirection = (): void => {
      const scrollY = window.scrollY;
      const direction =
        scrollY > lastScrollY ? ScrollDirection.UP : ScrollDirection.DOWN;
      if (
        direction !== scrollDirection &&
        Math.abs(scrollY - lastScrollY) > 20
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}
