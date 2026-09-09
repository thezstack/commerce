'use client';

import { animate } from 'motion';
import { useEffect, useRef, type ReactNode } from 'react';

// Content is visible in the server render and when JavaScript or motion is unavailable.
export default function HomeMotion({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const revealed = new Set<Element>();
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    const reset = () => {
      animations.forEach((animation, element) => {
        animation.complete();
        element.style.removeProperty('opacity');
        element.style.removeProperty('transform');
      });
      animations.clear();
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting || preference.matches || revealed.has(target)) return;
          const element = target as HTMLElement;
          revealed.add(element);
          observer.unobserve(element);
          animations.set(
            element,
            animate(
              element,
              { opacity: [0.2, 1], y: [18, 0] },
              {
                duration: 0.55,
                delay: Number(element.dataset.reveal || 0) / 1000,
                ease: [0.22, 1, 0.36, 1]
              }
            )
          );
        });
      },
      { threshold: 0.12 }
    );
    const syncPreference = () => {
      observer.disconnect();
      reset();
      if (!preference.matches)
        elements.forEach((element) => {
          if (!revealed.has(element)) observer.observe(element);
        });
    };
    // Keyboard users should never have to wait for a focused control to appear.
    const revealFocused = (event: FocusEvent) => {
      const element = (event.target as HTMLElement).closest<HTMLElement>('[data-reveal]');
      if (!element) return;
      animations.get(element)?.complete();
      revealed.add(element);
      observer.unobserve(element);
    };
    syncPreference();
    preference.addEventListener('change', syncPreference);
    root.addEventListener('focusin', revealFocused);
    return () => {
      observer.disconnect();
      reset();
      preference.removeEventListener('change', syncPreference);
      root.removeEventListener('focusin', revealFocused);
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
