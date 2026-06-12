import { motion, useReducedMotion } from 'motion/react';
import { easeOut, stampEase } from '../animations';

type WaxSealProps = {
  breaking: boolean;
  monogram: string;
  onBreak: () => void;
};

export function WaxSeal({ breaking, monogram, onBreak }: WaxSealProps) {
  const reduceMotion = useReducedMotion() === true;
  const idleSeal = reduceMotion
    ? { scale: 1 }
    : { scale: [1, 1.035, 0.992, 1.02, 1], rotate: [0, -0.7, 0.6, -0.25, 0] };
  const dossierBreak = reduceMotion
    ? { opacity: 0.72 }
    : { x: [0, -4, 5, -3, 0], rotate: [0, -0.7, 0.8, -0.4, 0] };

  return (
    <motion.button
      className="sealed-dossier"
      onClick={onBreak}
      animate={breaking ? dossierBreak : { x: 0, rotate: 0, opacity: 1 }}
      transition={{ duration: 0.24, ease: easeOut }}
      whileTap={reduceMotion ? { scale: 0.99 } : { scale: 0.975, rotate: -0.4 }}
    >
      <div className="kraft-band"><span>DOSSIÊ</span><span>LACRADO</span></div>
      <motion.div className="wax-seal" animate={breaking ? { scale: 1.08 } : idleSeal} transition={breaking ? { duration: 0.12 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
        <motion.div
          className="seal-half seal-left"
          animate={breaking ? { x: -46, y: 18, rotate: -42, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.18 : 0.5, ease: stampEase }}
        />
        <motion.div
          className="seal-half seal-right"
          animate={breaking ? { x: 46, y: 19, rotate: 43, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0.18 : 0.5, ease: stampEase }}
        />
        <motion.div className="seal-face" animate={breaking ? { opacity: 0, scale: 0.62, rotate: 8 } : { opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.24, ease: easeOut }}>
          <span>{monogram}</span>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
