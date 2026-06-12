import { motion } from 'motion/react';
import { pageMotion, PrimaryButton } from '../components/MotionPrimitives.jsx';
import { ScreenHeader, SectionLabel } from '../components/ScreenHeader.jsx';
import { CaseCover, CategorySelector, DifficultySelector, HapticsToggle, ImpostorCounter, WordModeSelector } from '../components/SettingsParts.jsx';

export function SettingsScreen({ state, actions }) {
  function startGame() {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    actions.startGame();
  }

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

      <SectionLabel>MODO DO IMPOSTOR</SectionLabel>
      <WordModeSelector selectedMode={state.wordMode} onSelect={actions.setWordMode} />

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
      {state.players.length >= 3 && state.category && <PrimaryButton className="start-button" onClick={startGame}>Iniciar Missão</PrimaryButton>}
    </motion.section>
  );
}
