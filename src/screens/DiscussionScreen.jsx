import { useMemo } from 'react';
import { motion } from 'motion/react';
import { AvatarIcon } from '../components/icons.jsx';
import { pageMotion, PrimaryButton, SecondaryButton } from '../components/MotionPrimitives.jsx';
import { buildBoard, mulberry, seedFrom } from '../utils/game.js';

export function DiscussionScreen({ state, actions }) {
  const board = useMemo(() => buildBoard(state.assignments, state.caseId), [state.assignments, state.caseId]);

  return (
    <motion.section className="screen discussion-screen" {...pageMotion}>
      <header className="board-header">
        <div>
          <div>CASO Nº {state.caseId}</div>
          <h2>Mural do Caso</h2>
        </div>
        <div className="open-stamp">EM ABERTO</div>
      </header>

      <div className="board" style={{ width: board.width, height: board.height }}>
        <BoardSvg board={board} caseId={state.caseId} layer="strings" />
        {board.cards.map((card, index) => (
          <motion.article
            className="board-card"
            key={`${card.name}-${index}`}
            style={{ left: card.x, top: card.y, rotate: card.rot }}
            initial={{ y: -14, scale: 0.85 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.03, ease: 'easeOut' }}
          >
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
        <BoardSvg board={board} caseId={state.caseId} layer="pins" />
      </div>

      <div className="discussion-note">Debatam, questionem e <strong>desmascarem o infiltrado.</strong></div>

      <div className="discussion-actions">
        <PrimaryButton onClick={actions.playAgain}>Nova Rodada</PrimaryButton>
        <SecondaryButton onClick={actions.newGame}>Encerrar Caso</SecondaryButton>
      </div>
    </motion.section>
  );
}

function BoardSvg({ board, caseId, layer }) {
  const rand = mulberry(seedFrom((caseId || 'x') + 'str'));

  return (
    <svg className={`board-svg board-svg-${layer}`} width={board.width} height={board.height} viewBox={`0 0 ${board.width} ${board.height}`} aria-hidden="true">
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
            <path key={`edge-${index}`} d={d} fill="none" stroke="#b02a1a" strokeWidth={1.2 + rand() * 0.8} opacity={0.82 + rand() * 0.14} />,
          ];
        })}

      {layer === 'pins' && board.cards.map((card, index) => (
          <g key={`pin-${index}`}>
            <circle cx={card.pinX + 0.5} cy={card.pinY + 1.5} r="7" fill="rgba(0,0,0,0.3)" />
            <circle cx={card.pinX} cy={card.pinY} r="7" fill={card.color} />
            <circle cx={card.pinX - 2} cy={card.pinY - 2} r="2.2" fill="rgba(255,255,255,0.55)" />
          </g>
        ))}
    </svg>
  );
}
