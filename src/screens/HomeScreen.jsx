import { motion } from 'motion/react';
import { pageMotion, PrimaryButton, SecondaryButton } from '../components/MotionPrimitives.jsx';

export function HomeScreen({ state, actions }) {
  return (
    <motion.section className="screen home-screen" {...pageMotion}>
      <div className="coffee-stain home-stain" />
      <div className="archived-stamp">ARQUIVADO</div>

      <div className="top-file-code">
        <span>DEPTO. DE INVESTIGAÇÃO</span>
        <motion.span className="rec" animate={{ opacity: [1, 0.25, 1] }} transition={{ duration: 2, repeat: Infinity, times: [0, 0.5, 1] }}>● REC</motion.span>
      </div>

      <motion.div
        className="classified-stamp"
        initial={{ opacity: 0, scale: 1.9, rotate: -10 }}
        animate={{ opacity: 0.92, scale: 1, rotate: -4 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        CONFIDENCIAL
      </motion.div>

      <h1 className="title">IMP<span>O</span>STOR</h1>

      <div className="divider-title">
        <div />
        <span>QUEM É O INFILTRADO?</span>
        <div />
      </div>

      <PrimaryButton onClick={actions.goPlayers}>Abrir Investigação</PrimaryButton>

      {state.players.length >= 3 && (
        <SecondaryButton className="continue-button" onClick={actions.continueWithPlayers}>
          Retomar com {state.players.length} fichas
        </SecondaryButton>
      )}
    </motion.section>
  );
}
