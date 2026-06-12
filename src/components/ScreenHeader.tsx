import { motion } from 'motion/react';
import type { ReactNode } from 'react';

type ScreenHeaderProps = {
  eyebrow: string;
  title: string;
  onBack: () => void;
  aside?: ReactNode;
  className?: string;
};

export function ScreenHeader({ eyebrow, title, onBack, aside, className = '' }: ScreenHeaderProps) {
  const goBack = () => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    onBack();
  };

  return (
    <header className={`screen-header ${className}`}>
      <motion.button
        className="back-button"
        onClick={goBack}
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

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="section-label">▸ {children}</div>;
}
