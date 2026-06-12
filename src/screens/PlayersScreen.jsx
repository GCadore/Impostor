import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { pageMotion, PrimaryButton } from '../components/MotionPrimitives.jsx';
import { AddPlayerForm, PlayerCard } from '../components/PlayerCard.jsx';
import { ScreenHeader } from '../components/ScreenHeader.jsx';

export function PlayersScreen({ state, actions }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  function submitPlayer(event) {
    event?.preventDefault();
    actions.addPlayer();
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  return (
    <motion.section className="screen players-screen" {...pageMotion}>
      <ScreenHeader
        eyebrow={`PASSO 01 / 02 · CASO Nº ${state.caseId}`}
        title="Fichados"
        onBack={actions.goBack}
        aside={state.players.length > 0 ? <div className="count-badge">{state.players.length}</div> : null}
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

      <div className="player-list">
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
      </div>

      <AnimatePresence>
        {state.players.length >= 3 && (
          <motion.div className="fixed-bottom" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }}>
            <PrimaryButton onClick={actions.goSettings}>Montar Caso →</PrimaryButton>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
