import { motion, useReducedMotion } from 'motion/react';
import type { ComponentProps } from 'react';
import { buttonMotion, pageMotion as cinematicPageMotion, reducedPageMotion } from '../animations';

export const pageMotion = cinematicPageMotion;

export function usePageMotion() {
  return useReducedMotion() ? reducedPageMotion : cinematicPageMotion;
}

type MotionButtonProps = ComponentProps<typeof motion.button>;

export function PrimaryButton({ children, className = '', ...props }: MotionButtonProps) {
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.button
      className={`button primary ${className}`}
      whileHover={reduceMotion ? undefined : buttonMotion.hoverPrimary}
      whileTap={reduceMotion ? { scale: 0.99 } : buttonMotion.tapPrimary}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function SecondaryButton({ children, className = '', ...props }: MotionButtonProps) {
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.button
      className={`button secondary ${className}`}
      whileHover={reduceMotion ? undefined : buttonMotion.hoverSecondary}
      whileTap={reduceMotion ? { scale: 0.99 } : buttonMotion.tapSecondary}
      {...props}
    >
      {children}
    </motion.button>
  );
}
