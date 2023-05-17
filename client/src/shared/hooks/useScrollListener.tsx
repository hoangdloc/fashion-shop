import { useState, useLayoutEffect } from 'react';

export enum ScrollDirection {
  DOWN = 'down',
  UP = 'up'
}

interface IUseScrollListener {
  scrollY: number
  scrollX: number
  scrollDirection: ScrollDirection
}

export function useScrollListener (): IUseScrollListener {
  const bodyOffset = document.body.getBoundingClientRect();
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(bodyOffset.top);
  const [scrollX, setScrollX] = useState<number>(bodyOffset.left);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.DOWN
  );

  useLayoutEffect(() => {
    const listener = (): void => {
      setScrollY(-bodyOffset.top);
      setScrollX(bodyOffset.left);
      setScrollDirection(
        lastScrollTop > -bodyOffset.top
          ? ScrollDirection.DOWN
          : ScrollDirection.UP
      );
      setLastScrollTop(-bodyOffset.top);
    };

    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollTop]);

  useLayoutEffect(() => {
    if (scrollY < 200) {
      setScrollDirection(ScrollDirection.DOWN);
    }
  }, [scrollY]);

  return {
    scrollY,
    scrollX,
    scrollDirection
  };
}
