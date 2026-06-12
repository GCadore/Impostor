import { useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { MotionStyle } from 'motion/react';
import { AvatarIcon } from '../components/icons';
import { PrimaryButton, SecondaryButton, usePageMotion } from '../components/MotionPrimitives';
import { easeOut, fadeLift, staggerContainer } from '../animations';
import { buildBoard, mulberry, seedFrom, type BoardCard, type BoardEdge } from '../utils/game';
import type { ScreenProps } from '../types';

type Board = {
  cards: BoardCard[];
  edges: BoardEdge[];
  height: number;
  width: number;
};

const evidenceStamps = ['INTERROGAR', 'OBSERVAR', 'ALIBI?', 'SEM ALIBI'];
const cardShadow = [
  '0 13px 18px rgba(0,0,0,0.42), -3px 3px 0 rgba(62,42,24,0.12)',
  '0 11px 20px rgba(0,0,0,0.46), 3px 4px 0 rgba(62,42,24,0.1)',
  '0 15px 22px rgba(0,0,0,0.4), 0 5px 0 rgba(62,42,24,0.08)',
];

type BoardCardStyle = MotionStyle & {
  '--card-shadow': string;
};

export function DiscussionScreen({ state, actions }: ScreenProps) {
  const board = useMemo(() => buildBoard(state.assignments, state.caseId), [state.assignments, state.caseId]);
  const reduceMotion = useReducedMotion() === true;
  const motionProps = usePageMotion();
  const cardIntroDelay = reduceMotion ? 0 : 0.18;
  const cardsDoneAt = reduceMotion ? 0 : cardIntroDelay + Math.max(0, board.cards.length - 1) * 0.045 + 0.28;
  const stringsDelay = cardsDoneAt + 0.08;
  const pinsDelay = stringsDelay + Math.min(0.5, board.edges.length * 0.035 + 0.22);
  const stampDelay = pinsDelay + 0.28;

  return (
    <motion.section className="screen discussion-screen" {...motionProps}>
      <motion.header className="board-header" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.34, ease: easeOut }}>
        <div>
          <div>CASO Nº {state.caseId}</div>
          <h2>Mural do Caso</h2>
        </div>
        <motion.div className="open-stamp" initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.6, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 6 }} transition={{ delay: stampDelay, duration: 0.38, ease: easeOut }}>EM ABERTO</motion.div>
      </motion.header>

      <motion.div
        className="board"
        style={{ width: board.width, height: board.height }}
        variants={staggerContainer}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0.18 : 0.34, ease: easeOut }}
      >
        {board.cards.map((card, index) => (
          <motion.article
            className="board-card"
            key={`${card.name}-${index}`}
            style={{
              left: card.x,
              top: card.y,
              rotate: card.rot,
              '--card-shadow': cardShadow[index % cardShadow.length],
            } as BoardCardStyle}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -28, scale: 0.86, rotate: card.rot - 6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: card.rot }}
            transition={{ duration: reduceMotion ? 0.18 : 0.44, delay: reduceMotion ? 0 : cardIntroDelay + index * 0.045, ease: easeOut }}
          >
            {index % 2 === 0 && <div className="board-clue-stamp">{evidenceStamps[index % evidenceStamps.length]}</div>}
            {index % 3 === 1 && <div className="board-question-mark">?</div>}
            {index % 4 === 2 && <div className="board-scribble" />}
            <div className="board-card-body">
              <div className="board-photo"><AvatarIcon width={30} height={32} /></div>
              <div>
                <h3>{card.name}</h3>
                <p>SUSP. {card.code}</p>
                <p><span className="redacted small">█████</span></p>
              </div>
            </div>
            <div className="board-signature">{card.name}</div>
          </motion.article>
        ))}
        <BoardSvg board={board} caseId={state.caseId} layer="strings" reduced={reduceMotion} baseDelay={stringsDelay} />
        <BoardSvg board={board} caseId={state.caseId} layer="pins" reduced={reduceMotion} baseDelay={pinsDelay} />
      </motion.div>

      <motion.div className="discussion-note" variants={fadeLift} initial="hidden" animate="show" transition={{ delay: reduceMotion ? 0 : stampDelay + 0.1 }}>Debatam, questionem e <strong>desmascarem o infiltrado.</strong></motion.div>

      <motion.div className="discussion-actions" variants={staggerContainer} initial="hidden" animate="show" transition={{ delayChildren: reduceMotion ? 0 : stampDelay + 0.2, staggerChildren: 0.08 }}>
        <motion.div variants={fadeLift}>
          <PrimaryButton onClick={actions.playAgain}>Nova Rodada</PrimaryButton>
        </motion.div>
        <motion.div variants={fadeLift}>
          <SecondaryButton onClick={actions.newGame}>Encerrar Caso</SecondaryButton>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function BoardSvg({ board, caseId, layer, reduced, baseDelay }: { board: Board; caseId: string; layer: 'strings' | 'pins'; reduced: boolean; baseDelay: number }) {
  const rand = mulberry(seedFrom((caseId || 'x') + 'str'));

  return (
    <motion.svg
      className={`board-svg board-svg-${layer}`}
      width={board.width}
      height={board.height}
      viewBox={`0 0 ${board.width} ${board.height}`}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, delay: reduced ? 0 : baseDelay }}
    >
      {layer === 'strings' && board.edges.flatMap((edge, index) => {
          const a = board.cards[edge[0]];
          const b = board.cards[edge[1]];
          const mx = (a.pinX + b.pinX) / 2;
          const my = (a.pinY + b.pinY) / 2;
          const dist = Math.hypot(a.pinX - b.pinX, a.pinY - b.pinY);
          const sag = Math.min(38, dist * 0.17) + 5;
          const cx = mx + (rand() * 14 - 7);
          const cy = my + sag;
          const d = `M ${a.pinX} ${a.pinY} Q ${cx} ${cy} ${b.pinX} ${b.pinY}`;
          return [
            <path key={`shadow-${index}`} d={`M ${a.pinX + 1} ${a.pinY + 1.8} Q ${cx + 1} ${cy + 1.8} ${b.pinX + 1} ${b.pinY + 1.8}`} fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="2.4" />,
            <motion.path
              key={`edge-${index}`}
              d={d}
              fill="none"
              stroke="#b02a1a"
              strokeWidth={1.2 + rand() * 0.8}
              opacity={0.82 + rand() * 0.14}
              initial={reduced ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
              animate={reduced ? { opacity: 0.86 } : { pathLength: 1, opacity: 0.86 }}
              transition={{ duration: reduced ? 0.18 : 0.48, delay: reduced ? 0 : baseDelay + index * 0.035, ease: easeOut }}
            />,
          ];
        })}

      {layer === 'pins' && board.cards.map((card, index) => (
          <motion.g
            key={`pin-${index}`}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.45 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0.18 : 0.28, delay: reduced ? 0 : baseDelay + index * 0.035, ease: easeOut }}
            style={{ transformOrigin: `${card.pinX}px ${card.pinY}px` }}
          >
            <circle cx={card.pinX + 1.2} cy={card.pinY + 2.2} r="8.5" fill="rgba(0,0,0,0.34)" />
            <circle cx={card.pinX} cy={card.pinY} r="8" fill={card.color} stroke="rgba(50, 24, 12, 0.36)" strokeWidth="1.1" />
            <circle cx={card.pinX - 2.4} cy={card.pinY - 2.6} r="2.6" fill="rgba(255,255,255,0.58)" />
            <circle cx={card.pinX + 2.4} cy={card.pinY + 2.4} r="2.8" fill="rgba(0,0,0,0.12)" />
          </motion.g>
        ))}
    </motion.svg>
  );
}
