'use client';

import { animate } from 'motion';
import { useEffect, useRef, type ReactNode } from 'react';

// Server-rendered content stays visible without JavaScript or with reduced motion.
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
    const emphasis = root.querySelector<HTMLElement>('[data-motion="emphasis"]');
    const shells = Array.from(root.querySelectorAll<HTMLElement>('[data-motion="brand"]'));
    const animations = new Map<HTMLElement, ReturnType<typeof animate>>();
    const visibleCards = new Map<HTMLElement, boolean>();
    let titleRevealed = false;

    const titleObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (preference.matches || titleRevealed || entry.intersectionRatio < 0.65) continue;
          const element = entry.target as HTMLElement;
          titleRevealed = true;
          titleObserver.unobserve(element);
          animations.set(
            element,
            animate(
              element,
              { opacity: [0.15, 1], scale: [0.86, 1] },
              {
                duration: 1.1,
                ease: [0.22, 1, 0.36, 1]
              }
            )
          );
        }
      },
      { threshold: 0.65, rootMargin: '0px 0px -64px 0px' }
    );

    // Observe the stationary list item; animate its inner card so transforms cannot
    // move the observed bounds across the trigger and repeatedly restart the motion.
    const cardObserver = new IntersectionObserver(
      (entries) => {
        if (preference.matches) return;
        for (const entry of entries) {
          const shell = entry.target as HTMLElement;
          const card = shell.querySelector<HTMLElement>('[data-brand-card]');
          if (!card) continue;
          const wasVisible = visibleCards.get(card) ?? false;
          const shouldEnter = entry.isIntersecting && entry.intersectionRatio >= 0.25;
          const shouldExit = !entry.isIntersecting || entry.intersectionRatio <= 0.05;
          if ((!shouldEnter || wasVisible) && (!shouldExit || !wasVisible)) continue;
          animations.get(card)?.stop();
          visibleCards.set(card, shouldEnter);
          animations.set(
            card,
            animate(
              card,
              { opacity: shouldEnter ? 1 : 0 },
              {
                duration: 0.35,
                ease: 'easeOut'
              }
            )
          );
        }
      },
      { threshold: [0, 0.05, 0.25] }
    );

    const reset = () => {
      animations.forEach((animation) => animation.stop());
      animations.clear();
      [
        emphasis,
        ...shells.map((shell) => shell.querySelector<HTMLElement>('[data-brand-card]'))
      ].forEach((element) => {
        element?.style.removeProperty('opacity');
        element?.style.removeProperty('transform');
      });
      visibleCards.clear();
    };
    const syncPreference = () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
      reset();
      if (preference.matches) return;
      if (emphasis && !titleRevealed) titleObserver.observe(emphasis);
      shells.forEach((shell) => {
        const card = shell.querySelector<HTMLElement>('[data-brand-card]');
        if (!card) return;
        const rect = shell.getBoundingClientRect();
        const visibleHeight = Math.max(
          0,
          Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0)
        );
        const alreadyVisible = visibleHeight >= rect.height * 0.25;
        visibleCards.set(card, alreadyVisible);
        if (!alreadyVisible) {
          card.style.opacity = '0';
          card.style.transform = `translateY(18px) scale(0.94) rotate(${Number(
            shell.dataset.tilt
          )}deg)`;
        }
        cardObserver.observe(shell);
      });
    };
    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
      reset();
      preference.removeEventListener('change', syncPreference);
    };
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
