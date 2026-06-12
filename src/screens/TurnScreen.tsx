import { motion, useReducedMotion } from 'motion/react';
import type { CSSProperties } from 'react';
import { SecondaryButton } from '../components/MotionPrimitives';
import { WaxSeal } from '../components/WaxSeal';
import { easeOut, fadeLift, pageStagger, reducedPageStagger, stampHit } from '../animations';
import { useTypewriter } from '../hooks/useTypewriter';
import type { Assignment, GameActions, GameState, ScreenProps, WordMode } from '../types';

export function TurnScreen({ state, actions }: ScreenProps) {
  const assignment = state.assignments[state.currentPlayerIndex];
  const isLast = state.currentPlayerIndex >= state.assignments.length - 1;

  if (!assignment) return null;

  return state.wordRevealed
    ? <RevealedTurn state={state} actions={actions} assignment={assignment} isLast={isLast} />
    : <HiddenTurn state={state} actions={actions} assignment={assignment} />;
}

function HiddenTurn({ state, actions, assignment }: { state: GameState; actions: GameActions; assignment: Assignment }) {
  const { typedText, isTyping } = useTypewriter(assignment.name, `${state.currentPlayerIndex}-name`);
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.section className="screen turn-screen" variants={reduceMotion ? reducedPageStagger : pageStagger} initial="hidden" animate="show" exit="exit">
      <motion.div className="sigiloso-stamp" variants={fadeLift}>SIGILOSO</motion.div>
      <motion.div className="turn-progress" variants={fadeLift}>AGENTE {state.currentPlayerIndex + 1} / {state.assignments.length}</motion.div>
      <motion.div className="handoff-label" variants={fadeLift}>ENTREGUE O DOSSIÊ A</motion.div>
      <motion.h2 className="handoff-name" variants={fadeLift}>{typedText}{isTyping && <Caret />}</motion.h2>

      <motion.div variants={reduceMotion ? fadeLift : { hidden: { opacity: 0, y: 16, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: easeOut } } }}>
        <WaxSeal breaking={state.breaking} monogram={(state.caseId || 'X').split('-')[1] || 'X'} onBreak={actions.breakSeal} />
      </motion.div>

      <motion.div className="seal-instruction" variants={fadeLift}>TOQUE PARA ROMPER O LACRE</motion.div>
      <motion.div className="handoff-warning" variants={fadeLift}>SÓ ROMPA QUANDO {assignment.name.toUpperCase()} ESTIVER COM O CELULAR</motion.div>
    </motion.section>
  );
}

function RevealedTurn({ state, actions, assignment, isLast }: { state: GameState; actions: GameActions; assignment: Assignment; isLast: boolean }) {
  const { typedText, isTyping } = useTypewriter(assignment.word, `${state.currentPlayerIndex}-word-${state.wordRevealed}`);
  const reduceMotion = useReducedMotion() === true;
  const accent = assignment.isImpostor ? '#d4321e' : '#8fc04f';
  const wordLabel = assignment.isImpostor && assignment.wordMode === 'context' ? 'SUA PISTA' : 'SUA PALAVRA-CHAVE';

  return (
    <motion.section className="screen turn-screen revealed" variants={reduceMotion ? reducedPageStagger : pageStagger} initial="hidden" animate="show" exit="exit" style={{ '--accent': accent } as CSSProperties}>
      <motion.div
        className="reveal-flash"
        initial={{ opacity: reduceMotion ? 0 : 0.34 }}
        animate={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0.12 : 0.62, ease: easeOut }}
      />
      <div className="scan-wrap">
        {!reduceMotion && (
          <motion.div
            className="scan-line"
            animate={{ y: ['-100%', '2400%'], opacity: [0, 1, 0.25, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'linear', times: [0, 0.12, 0.78, 1] }}
          />
        )}
      </div>

      <motion.div className="dossier-owner" variants={fadeLift}>DOSSIÊ DE {assignment.name.toUpperCase()}</motion.div>
      <motion.div className={`role-stamp ${assignment.isImpostor ? 'impostor' : 'citizen'}`} variants={reduceMotion ? fadeLift : stampHit}>
        {assignment.isImpostor ? 'IMPOSTOR' : 'AGENTE'}
      </motion.div>

      <motion.div className="word-label" variants={fadeLift}>{wordLabel}</motion.div>
      <motion.h2 className="secret-word" variants={reduceMotion ? fadeLift : { hidden: { opacity: 0, y: 14, scale: 0.98, filter: 'blur(8px)' }, show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.44, ease: easeOut } } }}>
        {typedText}{isTyping && <Caret color={accent} />}
      </motion.h2>

      {assignment.isImpostor ? (
        <motion.p className="impostor-note" variants={fadeLift}>
          {impostorNote(assignment.wordMode)}
        </motion.p>
      ) : <div className="note-space" />}

      <motion.div variants={fadeLift} className="next-button-wrap">
        <SecondaryButton className="next-button" onClick={actions.nextPlayer}>
          {isLast ? 'Iniciar Interrogatório' : 'Próximo Agente →'}
        </SecondaryButton>
      </motion.div>
      <motion.div className="memorize" variants={fadeLift}>MEMORIZE E PASSE ADIANTE</motion.div>
    </motion.section>
  );
}

function impostorNote(wordMode: WordMode) {
  if (wordMode === 'context') return 'Você só conhece o tema. Observe as pistas e finja saber a palavra exata.';
  if (wordMode === 'blank') return 'Você não recebeu palavra. Blefe, escute os outros e tente sobreviver.';
  return 'Disfarce-se. Sua palavra é parecida - finja que tem a mesma de todos.';
}

function Caret({ color = '#d4321e' }: { color?: string }) {
  return (
    <motion.span className="caret" style={{ color }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity, times: [0, 0.5, 1] }}>
      ▌
    </motion.span>
  );
}
