import { motion } from 'motion/react';
import { PrimaryButton, usePageMotion } from '../components/MotionPrimitives';
import { ScreenHeader, SectionLabel } from '../components/ScreenHeader';
import { CaseCover, CategorySelector, DifficultySelector, HapticsToggle, ImpostorCounter, WordModeSelector } from '../components/SettingsParts';
import { fadeLift, staggerContainer } from '../animations';
import type { ScreenProps } from '../types';

export function SettingsScreen({ state, actions }: ScreenProps) {
  const motionProps = usePageMotion();

  function startGame() {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    actions.startGame();
  }

  return (
    <motion.section className="screen settings-screen" {...motionProps}>
      <ScreenHeader className="settings-header" eyebrow="PASSO 02 / 02" title="Capa do Caso" onBack={actions.goBack} />

      <CaseCover caseId={state.caseId} caseDate={state.caseDate} playerCount={state.players.length} impostorCount={state.impostorCount} />

      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <motion.div variants={fadeLift}><SectionLabel>DOSSIÊ TEMÁTICO</SectionLabel></motion.div>
        <motion.div variants={fadeLift}><CategorySelector selectedCategory={state.category} onSelect={actions.setCategory} /></motion.div>

        <motion.div variants={fadeLift}><SectionLabel>NÍVEL DE DIFICULDADE</SectionLabel></motion.div>
        <motion.div variants={fadeLift}>
          <DifficultySelector
            selectedCategory={state.category}
            selectedDifficulty={state.difficulty}
            recentPairKeys={state.recentPairKeys}
            onSelect={actions.setDifficulty}
          />
        </motion.div>

        <motion.div variants={fadeLift}><SectionLabel>MODO DO IMPOSTOR</SectionLabel></motion.div>
        <motion.div variants={fadeLift}><WordModeSelector selectedMode={state.wordMode} onSelect={actions.setWordMode} /></motion.div>

        <motion.div variants={fadeLift}><SectionLabel>INFILTRADOS</SectionLabel></motion.div>
        <motion.div variants={fadeLift}>
          <ImpostorCounter
            impostorCount={state.impostorCount}
            playerCount={state.players.length}
            onDecrement={actions.decrementImpostor}
            onIncrement={actions.incrementImpostor}
            onApplySuggestion={actions.setImpostorCount}
          />
        </motion.div>

        <motion.div variants={fadeLift}><HapticsToggle enabled={state.haptics} onToggle={actions.toggleHaptics} /></motion.div>
      </motion.div>

      <div className="spacer" />
      {state.players.length >= 3 && state.category && (
        <motion.div variants={fadeLift} initial="hidden" animate="show">
          <PrimaryButton className="start-button" onClick={startGame}>Iniciar Missão</PrimaryButton>
        </motion.div>
      )}
    </motion.section>
  );
}
