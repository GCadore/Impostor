import { motion } from 'motion/react';
import { AvatarIcon, PaperclipIcon } from './icons.jsx';

export function PlayerCard({ name, index, caseId, onRemove }) {
  return (
    <motion.article
      className="suspect-card"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -0.8 : 0.9 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.25 }}
    >
      <div className="paperclip"><PaperclipIcon /></div>
      <motion.button
        className="remove-stamp"
        onClick={onRemove}
        whileHover={{ borderColor: '#c0301f', color: '#c0301f' }}
        aria-label={`Remover ${name}`}
      >
        ✕
      </motion.button>

      <div className="proc-line">PROC. Nº {caseId}-{String(index + 1).padStart(3, '0')}</div>
      <div className="suspect-body">
        <div className="photo-placeholder">
          <AvatarIcon />
          <span>SEM FOTO</span>
        </div>
        <div className="suspect-info">
          <h3>{name}</h3>
          <p>ÚLT. VISTO: <span className="redacted">CLASSIFIC.</span></p>
          <p>STATUS: <strong>SOB SUSPEITA</strong></p>
          <div className="signature-row"><span>{name}</span></div>
          <div className="signature-label">ASSINATURA DO SUSPEITO</div>
        </div>
      </div>
    </motion.article>
  );
}

export function AddPlayerForm({ value, onChange, onSubmit, inputRef }) {
  return (
    <form className="add-player-form" onSubmit={onSubmit}>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Registrar suspeito..."
        autoComplete="off"
      />
      <motion.button
        className="add-button"
        type="submit"
        whileHover={{ backgroundColor: '#335a36' }}
        whileTap={{ scale: 0.93 }}
        aria-label="Adicionar suspeito"
      >
        +
      </motion.button>
    </form>
  );
}
