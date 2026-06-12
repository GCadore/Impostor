import type { Variants } from 'motion/react';

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const stampEase = [0.18, 0.9, 0.22, 1.25] as const;

export const pageMotion = {
  initial: { opacity: 0, y: 18, rotateX: 1.5 },
  animate: { opacity: 1, y: 0, rotateX: 0 },
  exit: { opacity: 0, y: -18, rotateX: -1.5 },
  transition: { duration: 0.42, ease: easeOut },
};

export const reducedPageMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.18 },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const pageStagger: Variants = {
  hidden: { opacity: 0, y: 18, rotateX: 1.5 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.42,
      ease: easeOut,
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
  exit: { opacity: 0, y: -18, rotateX: -1.5, transition: { duration: 0.24, ease: easeOut } },
};

export const reducedPageStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.18,
      staggerChildren: 0.03,
    },
  },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

export const fadeLift: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(3px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.38, ease: easeOut } },
};

export const documentDrop: Variants = {
  hidden: { opacity: 0, y: -22, rotate: -2.4, scale: 0.96 },
  show: { opacity: 1, y: 0, rotate: 0, scale: 1, transition: { duration: 0.42, ease: stampEase } },
  exit: { opacity: 0, y: 16, rotate: 1.6, scale: 0.96, transition: { duration: 0.2 } },
};

export const stampHit: Variants = {
  hidden: { opacity: 0.72, scale: 1.72, rotate: -10, filter: 'blur(1px)' },
  show: {
    opacity: 1,
    scale: [1.72, 0.92, 1.06, 1],
    rotate: [-10, 4, -1, -3],
    filter: 'blur(0px)',
    transition: { duration: 0.56, ease: easeOut, times: [0, 0.46, 0.76, 1] },
  },
};

export const buttonMotion = {
  hoverPrimary: { x: -2, y: -2, boxShadow: '6px 6px 0 #6b1208', filter: 'brightness(1.05)' },
  tapPrimary: { x: 2, y: 2, boxShadow: '1px 1px 0 #6b1208', scale: 0.99 },
  hoverSecondary: { y: -1, borderColor: '#6b6350', color: '#e8dfca', boxShadow: '0 6px 18px rgba(0,0,0,0.22)' },
  tapSecondary: { y: 1, scale: 0.98 },
};
