import { motion, useReducedMotion } from 'motion/react';
import type { CSSProperties } from 'react';
import { CategoryIcon } from './icons';
import { categoryMeta, difficultyMeta, wordBank, wordModeMeta } from '../data/wordBank';
import { getSetupStats, recommendedImpostors } from '../utils/game';
import { documentDrop, easeOut } from '../animations';
import type { Difficulty, WordMode } from '../types';

export function CaseCover({ caseId, caseDate, playerCount, impostorCount }: { caseId: string; caseDate: string; playerCount: number; impostorCount: number }) {
  const reduceMotion = useReducedMotion() === true;

  return (
    <motion.article
      className="case-cover"
      variants={reduceMotion ? undefined : documentDrop}
      initial={reduceMotion ? { opacity: 0 } : 'hidden'}
      animate={reduceMotion ? { opacity: 1 } : 'show'}
      transition={{ duration: reduceMotion ? 0.18 : 0.42, ease: easeOut }}
    >
      <div className="coffee-stain cover-stain" />
      <div className="top-secret-stamp">TOP SECRET</div>
      <div className="cover-dept">DEPARTAMENTO DE INVESTIGAÇÃO</div>
      <div className="cover-line" />
      <div className="case-number-row">
        <span>CASO Nº</span>
        <strong>{caseId}</strong>
      </div>
      <div className="cover-stats">
        <div><span>ABERTURA</span><strong>{caseDate}</strong></div>
        <div><span>AGENTES</span><strong>{playerCount}</strong></div>
        <div><span>SIGILO</span><strong>{impostorCount >= 2 ? 'MÁXIMO' : 'ALTO'}</strong></div>
      </div>
    </motion.article>
  );
}

export function CategorySelector({ selectedCategory, onSelect }: { selectedCategory: string | null; onSelect: (category: string) => void }) {
  const reduceMotion = useReducedMotion() === true;
  const selectCategory = (category: string) => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    onSelect(category);
  };

  return (
    <div className="category-grid">
      {Object.keys(wordBank).map((category) => {
        const selected = category === selectedCategory;
        return (
          <motion.button
            className={`category-card ${selected ? 'selected' : ''}`}
            key={category}
            onClick={() => selectCategory(category)}
            style={{ '--accent': categoryMeta[category].color } as CSSProperties}
            whileHover={reduceMotion ? undefined : { borderColor: selected ? categoryMeta[category].color : '#6b6350', boxShadow: selected ? `0 0 0 1px ${categoryMeta[category].color}, 0 0 18px rgba(212, 50, 30, 0.12)` : '0 0 0 1px rgba(107, 99, 80, 0.18)' }}
            whileTap={{ scale: 0.97 }}
          >
            <CategoryIcon meta={categoryMeta[category]} active={selected} />
            <strong>{category}</strong>
            <span>{wordBank[category].length} casos</span>
            {selected && <motion.i initial={reduceMotion ? { opacity: 0 } : { scale: 0, rotate: -35 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.24, ease: easeOut }}>✓</motion.i>}
          </motion.button>
        );
      })}
    </div>
  );
}

export function DifficultySelector({
  selectedCategory,
  selectedDifficulty,
  recentPairKeys,
  onSelect,
}: {
  selectedCategory: string | null;
  selectedDifficulty: Difficulty;
  recentPairKeys: string[];
  onSelect: (difficulty: Difficulty) => void;
}) {
  const reduceMotion = useReducedMotion() === true;
  const stats = getSetupStats(wordBank, selectedCategory, selectedDifficulty, recentPairKeys);
  const selectDifficulty = (difficulty: Difficulty) => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    onSelect(difficulty);
  };

  return (
    <>
      <div className="difficulty-row">
        {(Object.entries(difficultyMeta) as [Difficulty, (typeof difficultyMeta)[Difficulty]][]).map(([key, meta]) => (
          <motion.button
            key={key}
            className={`difficulty-card ${selectedDifficulty === key ? 'selected' : ''}`}
            onClick={() => selectDifficulty(key)}
            whileHover={reduceMotion ? undefined : { borderColor: selectedDifficulty === key ? '#d4321e' : '#6b6350', boxShadow: '0 0 0 1px rgba(107, 99, 80, 0.12)' }}
            whileTap={{ scale: 0.97 }}
          >
            <strong>{meta.label}</strong>
            <span>{meta.hint}</span>
          </motion.button>
        ))}
      </div>
      <p className="settings-hint">{difficultyMeta[selectedDifficulty].info}</p>
      {selectedCategory && (
        <div className={`setup-stats ${stats.isLowStock ? 'warning' : ''}`}>
          <strong>{stats.availableCount}</strong> pares nesta dificuldade · <strong>{stats.freshCount}</strong> fora do histórico recente
          {stats.isLowStock && <span>Troque a dificuldade ou categoria para evitar repetições.</span>}
        </div>
      )}
    </>
  );
}

export function WordModeSelector({ selectedMode, onSelect }: { selectedMode: WordMode; onSelect: (wordMode: WordMode) => void }) {
  const reduceMotion = useReducedMotion() === true;
  const selectMode = (wordMode: WordMode) => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    onSelect(wordMode);
  };

  return (
    <>
      <div className="mode-grid">
        {(Object.entries(wordModeMeta) as [WordMode, (typeof wordModeMeta)[WordMode]][]).map(([key, meta]) => (
          <motion.button
            key={key}
            className={`mode-card ${selectedMode === key ? 'selected' : ''}`}
            onClick={() => selectMode(key)}
            whileHover={reduceMotion ? undefined : { borderColor: selectedMode === key ? '#d4321e' : '#6b6350', boxShadow: '0 0 0 1px rgba(107, 99, 80, 0.12)' }}
            whileTap={{ scale: 0.97 }}
          >
            <strong>{meta.label}</strong>
            <span>{meta.hint}</span>
          </motion.button>
        ))}
      </div>
      <p className="settings-hint mode-hint">{wordModeMeta[selectedMode].info}</p>
    </>
  );
}

export function ImpostorCounter({
  impostorCount,
  playerCount,
  onDecrement,
  onIncrement,
  onApplySuggestion,
}: {
  impostorCount: number;
  playerCount: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onApplySuggestion: (count: number) => void;
}) {
  const reduceMotion = useReducedMotion() === true;
  const impostorWord = impostorCount === 1 ? 'IMPOSTOR' : 'IMPOSTORES';
  const suggestion = recommendedImpostors(playerCount);
  const canApplySuggestion = suggestion !== impostorCount;

  return (
    <>
      <div className="impostor-counter">
        <motion.button onClick={onDecrement} whileHover={{ borderColor: '#6b6350' }} whileTap={{ scale: 0.9 }} aria-label="Diminuir impostores">−</motion.button>
        <div>
          <motion.strong
            key={impostorCount}
            initial={reduceMotion ? { opacity: 0 } : { scale: 0.72, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: easeOut }}
          >
            {impostorCount}
          </motion.strong>
          <span>{impostorWord}</span>
        </div>
        <motion.button onClick={onIncrement} whileHover={{ borderColor: '#6b6350' }} whileTap={{ scale: 0.9 }} aria-label="Aumentar impostores">+</motion.button>
      </div>
      <p className="counter-info">{impostorCount} de {playerCount} fichados estarão infiltrados</p>
      <div className="impostor-suggestion">
        Sugestão para {playerCount} jogadores: <strong>{suggestion}</strong> {suggestion === 1 ? 'impostor' : 'impostores'}
        {canApplySuggestion && (
          <motion.button onClick={() => onApplySuggestion(suggestion)} whileTap={{ scale: 0.97 }}>
            aplicar
          </motion.button>
        )}
      </div>
    </>
  );
}

export function HapticsToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <motion.button className="haptics-toggle" onClick={onToggle} whileHover={{ borderColor: '#3a3328', y: -1 }} whileTap={{ scale: 0.985, y: 1 }}>
      <span>
        <strong>Vibração ao revelar</strong>
        <small>Feedback tátil ao romper o lacre</small>
      </span>
      <motion.i className="toggle-track" data-on={enabled} animate={{ backgroundColor: enabled ? '#2a4a2c' : '#2a251c', borderColor: enabled ? '#3d6b40' : '#3a3328' }}>
        <motion.b animate={{ x: enabled ? 22 : 0, backgroundColor: enabled ? '#a9d4a0' : '#6b6350' }} />
      </motion.i>
    </motion.button>
  );
}
