import { motion } from 'motion/react';
import { CategoryIcon } from './icons.jsx';
import { categoryMeta, difficultyMeta, wordBank, wordModeMeta } from '../data/wordBank.js';
import { getSetupStats, recommendedImpostors } from '../utils/game.js';

export function CaseCover({ caseId, caseDate, playerCount, impostorCount }) {
  return (
    <motion.article className="case-cover" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
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

export function CategorySelector({ selectedCategory, onSelect }) {
  const selectCategory = (category) => {
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
            style={{ '--accent': categoryMeta[category].color }}
            whileHover={{ borderColor: selected ? categoryMeta[category].color : '#6b6350' }}
            whileTap={{ scale: 0.98 }}
          >
            <CategoryIcon meta={categoryMeta[category]} active={selected} />
            <strong>{category}</strong>
            <span>{wordBank[category].length} casos</span>
            {selected && <motion.i initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.i>}
          </motion.button>
        );
      })}
    </div>
  );
}

export function DifficultySelector({ selectedCategory, selectedDifficulty, recentPairKeys, onSelect }) {
  const stats = getSetupStats(wordBank, selectedCategory, selectedDifficulty, recentPairKeys);
  const selectDifficulty = (difficulty) => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    onSelect(difficulty);
  };

  return (
    <>
      <div className="difficulty-row">
        {Object.entries(difficultyMeta).map(([key, meta]) => (
          <motion.button
            key={key}
            className={`difficulty-card ${selectedDifficulty === key ? 'selected' : ''}`}
            onClick={() => selectDifficulty(key)}
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

export function WordModeSelector({ selectedMode, onSelect }) {
  const selectMode = (wordMode) => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    onSelect(wordMode);
  };

  return (
    <>
      <div className="mode-grid">
        {Object.entries(wordModeMeta).map(([key, meta]) => (
          <motion.button
            key={key}
            className={`mode-card ${selectedMode === key ? 'selected' : ''}`}
            onClick={() => selectMode(key)}
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

export function ImpostorCounter({ impostorCount, playerCount, onDecrement, onIncrement, onApplySuggestion }) {
  const impostorWord = impostorCount === 1 ? 'IMPOSTOR' : 'IMPOSTORES';
  const suggestion = recommendedImpostors(playerCount);
  const canApplySuggestion = suggestion !== impostorCount;

  return (
    <>
      <div className="impostor-counter">
        <motion.button onClick={onDecrement} whileHover={{ borderColor: '#6b6350' }} whileTap={{ scale: 0.9 }} aria-label="Diminuir impostores">−</motion.button>
        <div>
          <strong>{impostorCount}</strong>
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

export function HapticsToggle({ enabled, onToggle }) {
  return (
    <motion.button className="haptics-toggle" onClick={onToggle} whileHover={{ borderColor: '#3a3328' }}>
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
