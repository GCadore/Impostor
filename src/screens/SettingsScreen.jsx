import { motion } from 'motion/react';
import { pageMotion, PrimaryButton } from '../components/MotionPrimitives.jsx';
import { ScreenHeader, SectionLabel } from '../components/ScreenHeader.jsx';
import { CaseCover, CategorySelector, DifficultySelector, HapticsToggle, ImpostorCounter } from '../components/SettingsParts.jsx';

export function SettingsScreen({ state, actions }) {
  return (
    <motion.section className="screen settings-screen" {...pageMotion}>
      <ScreenHeader className="settings-header" eyebrow="PASSO 02 / 02" title="Capa do Caso" onBack={actions.goBack} />

      <CaseCover caseId={state.caseId} caseDate={state.caseDate} playerCount={state.players.length} impostorCount={state.impostorCount} />

      <SectionLabel>DOSSIÊ TEMÁTICO</SectionLabel>
      <CategorySelector selectedCategory={state.category} onSelect={actions.setCategory} />

      <SectionLabel>NÍVEL DE DIFICULDADE</SectionLabel>
      <DifficultySelector
        selectedCategory={state.category}
        selectedDifficulty={state.difficulty}
        recentPairKeys={state.recentPairKeys}
        onSelect={actions.setDifficulty}
      />

      <SectionLabel>INFILTRADOS</SectionLabel>
      <ImpostorCounter
        impostorCount={state.impostorCount}
        playerCount={state.players.length}
        onDecrement={actions.decrementImpostor}
        onIncrement={actions.incrementImpostor}
        onApplySuggestion={actions.setImpostorCount}
      />

      <HapticsToggle enabled={state.haptics} onToggle={actions.toggleHaptics} />

      <div className="spacer" />
      {state.players.length >= 3 && state.category && <PrimaryButton className="start-button" onClick={actions.startGame}>Iniciar Missão</PrimaryButton>}
    </motion.section>
  );
}
