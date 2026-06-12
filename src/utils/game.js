export const pinColors = ['#c0301f', '#2f6fb0', '#3d7a3d', '#c9a23a', '#8a4fb0', '#c97a2f', '#2f9b8a', '#b03a6a'];

export function makeCaseId() {
  const n = Math.floor(Math.random() * 9000) + 1000;
  const letter = 'ABCDEFGH'[Math.floor(Math.random() * 8)];
  return `${n}-${letter}`;
}

export function makeCaseDate() {
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const date = new Date();
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function mulberry(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seedFrom(str) {
  let seed = 0;
  for (let i = 0; i < str.length; i += 1) seed = (seed * 31 + str.charCodeAt(i)) | 0;
  return seed ^ 0x9e3779b9;
}

export function maxImpostors(playerCount) {
  return Math.max(1, Math.floor((playerCount - 1) / 2));
}

export function recommendedImpostors(playerCount) {
  if (playerCount >= 10) return 3;
  if (playerCount >= 7) return 2;
  return 1;
}

export function pairKey(category, pair) {
  return `${category}:${pair.w.join('|')}`;
}

export function pairMatchesDifficulty(pair, difficulty) {
  if (difficulty === 'misto') return true;
  if (difficulty === 'facil') return pair.s <= 3 || pair.d === 'f';
  return pair.s >= 4 || pair.d === 'd';
}

export function getPairsForDifficulty(bank, category, difficulty) {
  if (!category || !bank[category]) return [];
  return bank[category].filter((pair) => pairMatchesDifficulty(pair, difficulty));
}

export function getSetupStats(bank, category, difficulty, recentPairKeys = []) {
  const availablePairs = getPairsForDifficulty(bank, category, difficulty);
  const recentSet = new Set(recentPairKeys);
  const freshPairs = availablePairs.filter((pair) => !recentSet.has(pairKey(category, pair)));

  return {
    availableCount: availablePairs.length,
    freshCount: freshPairs.length,
    isLowStock: availablePairs.length > 0 && freshPairs.length <= Math.max(3, Math.ceil(availablePairs.length * 0.2)),
  };
}

export function createRound(state, bank) {
  if (state.players.length < 3 || !state.category) return state;

  const allPairs = bank[state.category];
  const filteredPairs = getPairsForDifficulty(bank, state.category, state.difficulty);
  const usablePairs = filteredPairs.length ? filteredPairs : allPairs;
  const recentPairKeys = Array.isArray(state.recentPairKeys) ? state.recentPairKeys : [];
  const recentSet = new Set(recentPairKeys);
  const freshPairs = usablePairs.filter((pair) => !recentSet.has(pairKey(state.category, pair)));
  const candidatePairs = freshPairs.length ? freshPairs : usablePairs;

  let selectedPair;
  do {
    selectedPair = candidatePairs[Math.floor(Math.random() * candidatePairs.length)];
  } while (candidatePairs.length > 1 && pairKey(state.category, selectedPair) === state.lastPairKey);

  const selectedPairKey = pairKey(state.category, selectedPair);

  const swapWords = Math.random() > 0.5;
  const citizenWord = swapWords ? selectedPair.w[1] : selectedPair.w[0];
  const similarWord = swapWords ? selectedPair.w[0] : selectedPair.w[1];
  const impostorWord = getImpostorWord(state.wordMode, state.category, similarWord);
  const shuffledPlayers = [...state.players].sort(() => Math.random() - 0.5);
  const impostorSet = new Set();

  while (impostorSet.size < Math.min(state.impostorCount, shuffledPlayers.length - 1)) {
    impostorSet.add(Math.floor(Math.random() * shuffledPlayers.length));
  }

  return {
    ...state,
    screen: 'turn',
    assignments: shuffledPlayers.map((name, index) => ({
      name,
      word: impostorSet.has(index) ? impostorWord : citizenWord,
      citizenWord,
      impostorWord,
      wordMode: state.wordMode || 'similar',
      isImpostor: impostorSet.has(index),
    })),
    currentPlayerIndex: 0,
    wordRevealed: false,
    breaking: false,
    lastPairKey: selectedPairKey,
    recentPairKeys: [selectedPairKey, ...recentPairKeys.filter((key) => key !== selectedPairKey)].slice(0, 18),
  };
}

function getImpostorWord(wordMode, category, similarWord) {
  if (wordMode === 'context') return `Tema: ${category}`;
  if (wordMode === 'blank') return 'Sem palavra';
  return similarWord;
}

export function buildBoard(assignments, caseId) {
  const rand = mulberry(seedFrom(caseId || 'x'));
  const colX = [6, 190];
  const rowH = 172;
  const cards = assignments.map((player, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const jx = Math.round(rand() * 16 - 8);
    const jy = Math.round(rand() * 18 - 9);
    const rot = Math.round(rand() * 12 - 6);
    const x = colX[col] + jx;
    const y = row * rowH + 18 + jy;
    return {
      name: player.name,
      code: `N${String(index + 1).padStart(2, '0')}`,
      x,
      y,
      rot,
      pinX: x + 70,
      pinY: y + 11,
      color: pinColors[index % pinColors.length],
    };
  });

  const edges = [];
  const has = new Set();
  const key = (a, b) => `${Math.min(a, b)}-${Math.max(a, b)}`;
  const order = [...Array(cards.length).keys()];
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }

  const deg = {};
  const connected = order.length ? [order[0]] : [];
  for (let k = 1; k < order.length; k += 1) {
    const node = order[k];
    const target = connected[Math.floor(rand() * connected.length)];
    edges.push([node, target]);
    has.add(key(node, target));
    deg[node] = (deg[node] || 0) + 1;
    deg[target] = (deg[target] || 0) + 1;
    connected.push(node);
  }

  const extra = Math.floor(cards.length * 0.7);
  let tries = 0;
  while (edges.length < cards.length - 1 + extra && tries < cards.length * 8) {
    tries += 1;
    const a = Math.floor(rand() * cards.length);
    const b = Math.floor(rand() * cards.length);
    if (a === b) continue;
    const edgeKey = key(a, b);
    if (has.has(edgeKey)) continue;
    if ((deg[a] || 0) >= 4 || (deg[b] || 0) >= 4) continue;
    edges.push([a, b]);
    has.add(edgeKey);
    deg[a] = (deg[a] || 0) + 1;
    deg[b] = (deg[b] || 0) + 1;
  }

  return { cards, edges, height: Math.ceil(cards.length / 2) * rowH + 30, width: 340 };
}
