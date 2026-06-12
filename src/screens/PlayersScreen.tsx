import { useEffect, useRef, type FormEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PrimaryButton, usePageMotion } from '../components/MotionPrimitives';
import { fadeLift, staggerContainer } from '../animations';
import { AddPlayerForm, PlayerCard } from '../components/PlayerCard';
import { ScreenHeader } from '../components/ScreenHeader';
import type { ScreenProps } from '../types';

function closeKeyboard() {
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
}

function shouldRefocusInput() {
  return !window.matchMedia?.('(pointer: coarse)').matches;
}

export function PlayersScreen({ state, actions }: ScreenProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const reduceMotion = useReducedMotion() === true;
  const motionProps = usePageMotion();

  useEffect(() => {
    if (!shouldRefocusInput()) return undefined;
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  function submitPlayer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    actions.addPlayer();
    if (shouldRefocusInput()) setTimeout(() => inputRef.current?.focus(), 50);
    else closeKeyboard();
  }

  function goSettings() {
    closeKeyboard();
    actions.goSettings();
  }

  return (
    <motion.section className="screen players-screen" {...motionProps}>
      <ScreenHeader
        eyebrow={`PASSO 01 / 02 · CASO Nº ${state.caseId}`}
        title="Fichados"
        onBack={actions.goBack}
        aside={state.players.length > 0 ? (
          <motion.div
            className="count-badge"
            key={state.players.length}
            initial={reduceMotion ? { opacity: 0 } : { scale: 0.7, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.24 }}
          >
            {state.players.length}
          </motion.div>
        ) : null}
      />

      <div className="hairline" />

      <AddPlayerForm value={state.newPlayerName} onChange={actions.setNewPlayerName} onSubmit={submitPlayer} inputRef={inputRef} />

      <AnimatePresence>
        {state.players.length > 0 && state.players.length < 3 && (
          <motion.div className="min-warning" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            ⚠ Mínimo de 3 fichas para abrir o caso
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div className="player-list" variants={staggerContainer} initial="hidden" animate="show">
        <AnimatePresence initial={false}>
          {state.players.map((name, index) => (
            <PlayerCard
              key={`${name}-${index}`}
              name={name}
              index={index}
              caseId={state.caseId}
              onRemove={() => actions.removePlayer(index)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {state.players.length >= 3 && (
          <motion.div className="fixed-bottom" variants={fadeLift} initial="hidden" animate="show" exit={{ opacity: 0, y: 18 }}>
            <PrimaryButton onClick={goSettings}>Montar Caso →</PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
