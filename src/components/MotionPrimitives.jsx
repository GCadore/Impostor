import { motion } from 'motion/react';

export const pageMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

export function PrimaryButton({ children, className = '', ...props }) {
  return (
    <motion.button
      className={`button primary ${className}`}
      whileHover={{ x: -2, y: -2, boxShadow: '6px 6px 0 #6b1208' }}
      whileTap={{ x: 2, y: 2, boxShadow: '1px 1px 0 #6b1208' }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function SecondaryButton({ children, className = '', ...props }) {
  return (
    <motion.button
      className={`button secondary ${className}`}
      whileHover={{ borderColor: '#6b6350', color: '#e8dfca' }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
