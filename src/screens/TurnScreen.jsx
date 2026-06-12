import { motion } from 'motion/react';
import { pageMotion, SecondaryButton } from '../components/MotionPrimitives.jsx';
import { WaxSeal } from '../components/WaxSeal.jsx';
import { useTypewriter } from '../hooks/useTypewriter.js';

export function TurnScreen({ state, actions }) {
  const assignment = state.assignments[state.currentPlayerIndex];
  const isLast = state.currentPlayerIndex >= state.assignments.length - 1;

  if (!assignment) return null;

  return state.wordRevealed
    ? <RevealedTurn state={state} actions={actions} assignment={assignment} isLast={isLast} />
    : <HiddenTurn state={state} actions={actions} assignment={assignment} />;
}

function HiddenTurn({ state, actions, assignment }) {
  const { typedText, isTyping } = useTypewriter(assignment.name, `${state.currentPlayerIndex}-name`);

  return (
    <motion.section className="screen turn-screen" {...pageMotion}>
      <div className="sigiloso-stamp">SIGILOSO</div>
      <div className="turn-progress">AGENTE {state.currentPlayerIndex + 1} / {state.assignments.length}</div>
      <div className="handoff-label">ENTREGUE O DOSSIÊ A</div>
      <h2 className="handoff-name">{typedText}{isTyping && <Caret />}</h2>

      <WaxSeal breaking={state.breaking} monogram={(state.caseId || 'X').split('-')[1] || 'X'} onBreak={actions.breakSeal} />

      <div className="seal-instruction">TOQUE PARA ROMPER O LACRE</div>
      <div className="handoff-warning">SÓ ROMPA QUANDO {assignment.name.toUpperCase()} ESTIVER COM O CELULAR</div>
    </motion.section>
  );
}

function RevealedTurn({ state, actions, assignment, isLast }) {
  const { typedText, isTyping } = useTypewriter(assignment.word, `${state.currentPlayerIndex}-word-${state.wordRevealed}`);
  const accent = assignment.isImpostor ? '#d4321e' : '#8fc04f';
  const wordLabel = assignment.isImpostor && assignment.wordMode === 'context' ? 'SUA PISTA' : 'SUA PALAVRA-CHAVE';

  return (
    <motion.section className="screen turn-screen revealed" {...pageMotion} style={{ '--accent': accent }}>
      <div className="scan-wrap">
        <motion.div className="scan-line" animate={{ y: ['-100%', '2400%'] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} />
      </div>

      <div className="dossier-owner">DOSSIÊ DE {assignment.name.toUpperCase()}</div>
      <motion.div className={`role-stamp ${assignment.isImpostor ? 'impostor' : 'citizen'}`} initial={{ scale: 1.9, rotate: -10 }} animate={{ scale: [1.9, 0.93, 1.05, 1], rotate: [-10, 3, -1, -3] }} transition={{ duration: 0.5 }}>
        {assignment.isImpostor ? 'IMPOSTOR' : 'AGENTE'}
      </motion.div>

      <div className="word-label">{wordLabel}</div>
      <h2 className="secret-word">{typedText}{isTyping && <Caret color={accent} />}</h2>

      {assignment.isImpostor ? (
        <motion.p className="impostor-note" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          {impostorNote(assignment.wordMode)}
        </motion.p>
      ) : <div className="note-space" />}

      <SecondaryButton className="next-button" onClick={actions.nextPlayer}>
        {isLast ? 'Iniciar Interrogatório' : 'Próximo Agente →'}
      </SecondaryButton>
      <div className="memorize">MEMORIZE E PASSE ADIANTE</div>
    </motion.section>
  );
}

function impostorNote(wordMode) {
  if (wordMode === 'context') return 'Você só conhece o tema. Observe as pistas e finja saber a palavra exata.';
  if (wordMode === 'blank') return 'Você não recebeu palavra. Blefe, escute os outros e tente sobreviver.';
  return 'Disfarce-se. Sua palavra é parecida - finja que tem a mesma de todos.';
}

function Caret({ color = '#d4321e' }) {
  return (
    <motion.span className="caret" style={{ color }} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity, times: [0, 0.5, 1] }}>
      ▌
    </motion.span>
  );
}
