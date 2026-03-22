'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  threshold?: number;
};

export default function ScrollReveal({
  children,
  className = '',
  delayMs = 0,
  threshold = 0.15
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
      animate={
        reduceMotion || isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 24, scale: 0.985 }
      }
      transition={{
        duration: reduceMotion ? 0 : 0.65,
        delay: reduceMotion ? 0 : delayMs / 1000,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
