'use client';

import { motion, type HTMLMotionProps } from 'motion/react';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

type AnimatedBlockProps = HTMLMotionProps<'div'> & {
  delay?: number;
  variant?: 'fade-in' | 'fade-up';
};

export function AnimatedBlock({
  children,
  delay = 0,
  variant = 'fade-up',
  ...props
}: AnimatedBlockProps) {
  return (
    <motion.div
      variants={variant === 'fade-in' ? fadeIn : fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedInView({ children, delay = 0, ...props }: AnimatedBlockProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
