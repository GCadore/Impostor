import { motion } from 'motion/react';

export function WaxSeal({ breaking, monogram, onBreak }) {
  return (
    <motion.button className="sealed-dossier" onClick={onBreak} whileTap={{ scale: 0.98 }}>
      <div className="kraft-band"><span>DOSSIÊ</span><span>LACRADO</span></div>
      <motion.div className="wax-seal" animate={{ scale: [1, 1.035, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}>
        <motion.div className="seal-half seal-left" animate={breaking ? { x: -36, y: 14, rotate: -34, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }} transition={{ duration: 0.45, ease: [0.5, 0, 0.4, 1] }} />
        <motion.div className="seal-half seal-right" animate={breaking ? { x: 36, y: 16, rotate: 36, opacity: 0 } : { x: 0, y: 0, rotate: 0, opacity: 1 }} transition={{ duration: 0.45, ease: [0.5, 0, 0.4, 1] }} />
        <motion.div className="seal-face" animate={breaking ? { opacity: 0, scale: 0.7 } : { opacity: 1, scale: 1 }}>
          <span>{monogram}</span>
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
