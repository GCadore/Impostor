import { motion, useReducedMotion } from 'motion/react';
import { PrimaryButton, SecondaryButton } from '../components/MotionPrimitives';
import { fadeLift, pageStagger, reducedPageStagger, stampHit, staggerContainer } from '../animations';
import type { ScreenProps } from '../types';

export function HomeScreen({ state, actions }: ScreenProps) {
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.section className="screen home-screen" variants={reduceMotion ? reducedPageStagger : pageStagger} initial="hidden" animate="show" exit="exit">
      <div className="coffee-stain home-stain" />
      <motion.div className="archived-stamp" variants={fadeLift}>ARQUIVADO</motion.div>

      <motion.div className="top-file-code" variants={fadeLift}>
        <span>DEPTO. DE INVESTIGAÇÃO</span>
        <motion.span className="rec" animate={reduceMotion ? { opacity: 1 } : { opacity: [1, 0.22, 1, 0.45, 1] }} transition={{ duration: 2.7, repeat: Infinity, times: [0, 0.33, 0.45, 0.72, 1] }}>● REC</motion.span>
      </motion.div>

      <motion.div
        className="classified-stamp"
        variants={reduceMotion ? fadeLift : stampHit}
      >
        CONFIDENCIAL
      </motion.div>

      <motion.h1 className="title home-title" variants={staggerContainer}>
        {['IMP', 'O', 'STOR'].map((part, index) => (
          <motion.span
            key={part}
            className={index === 1 ? 'title-red' : undefined}
            variants={reduceMotion ? fadeLift : { hidden: { opacity: 0, y: 28, rotate: index === 1 ? -4 : 0 }, show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.42, ease: 'easeOut' } } }}
          >
            {part}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div className="divider-title" variants={fadeLift}>
        <div />
        <span>QUEM É O INFILTRADO?</span>
        <div />
      </motion.div>

      <motion.div variants={fadeLift} className="home-button-row">
        <PrimaryButton onClick={actions.goPlayers}>Abrir Investigação</PrimaryButton>
      </motion.div>

      {state.players.length >= 3 && (
        <motion.div variants={fadeLift} className="home-button-row">
          <SecondaryButton className="continue-button" onClick={actions.continueWithPlayers}>
            Retomar com {state.players.length} fichas
          </SecondaryButton>
        </motion.div>
      )}
    </motion.section>
  );
}
