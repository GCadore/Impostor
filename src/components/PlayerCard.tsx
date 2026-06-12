import { motion } from 'motion/react';
import type { FormEvent, RefObject } from 'react';
import { documentDrop, easeOut } from '../animations';
import { AvatarIcon, PaperclipIcon } from './icons';

type PlayerCardProps = {
  name: string;
  index: number;
  caseId: string;
  onRemove: () => void;
};

export function PlayerCard({ name, index, caseId, onRemove }: PlayerCardProps) {
  return (
    <motion.article
      className="suspect-card"
      variants={documentDrop}
      initial="hidden"
      animate={{ opacity: 1, y: 0, scale: 1, rotate: index % 2 === 0 ? -0.8 : 0.9 }}
      exit={{ opacity: 0, x: 24, scale: 0.92, rotate: 4 }}
      transition={{ duration: 0.32, ease: easeOut }}
    >
      <div className="paperclip"><PaperclipIcon /></div>
      <motion.button
        className="remove-stamp"
        onClick={onRemove}
        whileHover={{ borderColor: '#c0301f', color: '#c0301f', rotate: -2, scale: 1.04 }}
        whileTap={{ scale: 0.92 }}
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

type AddPlayerFormProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  inputRef: RefObject<HTMLInputElement | null>;
};

export function AddPlayerForm({ value, onChange, onSubmit, inputRef }: AddPlayerFormProps) {
  return (
    <form className="add-player-form" onSubmit={onSubmit}>
      <input
        ref={inputRef}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Registrar suspeito..."
        autoComplete="off"
        enterKeyHint="done"
      />
      <motion.button
        className="add-button"
        type="submit"
        whileHover={{ x: -2, y: -2, backgroundColor: '#36a847', boxShadow: '6px 6px 0 #14551d' }}
        whileTap={{ x: 2, y: 2, scale: 0.98, boxShadow: '1px 1px 0 #14551d' }}
        aria-label="Adicionar suspeito"
      >
        +
      </motion.button>
    </form>
  );
}
