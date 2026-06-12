import { motion } from 'motion/react';

export function ScreenHeader({ eyebrow, title, onBack, aside, className = '' }) {
  return (
    <header className={`screen-header ${className}`}>
      <motion.button
        className="back-button"
        onClick={onBack}
        whileHover={{ borderColor: '#6b6350', color: '#e8dfca' }}
        whileTap={{ scale: 0.96 }}
        aria-label="Voltar"
      >
        ←
      </motion.button>
      <div className="header-copy">
        <div>{eyebrow}</div>
        <h2>{title}</h2>
      </div>
      {aside}
    </header>
  );
}

export function SectionLabel({ children }) {
  return <div className="section-label">▸ {children}</div>;
}
