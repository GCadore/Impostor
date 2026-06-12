import { useEffect, useMemo, useReducer } from 'react';
import { difficultyMeta, wordBank, wordModeMeta } from '../data/wordBank.js';
import { createRound, makeCaseDate, makeCaseId, maxImpostors } from '../utils/game.js';

const STORAGE_KEY = 'impostor_v1';

const initialState = {
  screen: 'home',
  players: [],
  newPlayerName: '',
  category: null,
  wordMode: 'similar',
  impostorCount: 1,
  difficulty: 'misto',
  haptics: true,
  currentPlayerIndex: 0,
  assignments: [],
  wordRevealed: false,
  breaking: false,
  lastPairKey: '',
  recentPairKeys: [],
  caseId: '0451-B',
  caseDate: '',
};

function cleanPlayers(players) {
  if (!Array.isArray(players)) return [];
  return players
    .filter((player) => typeof player === 'string')
    .map((player) => player.trim())
    .filter(Boolean)
    .slice(0, 30);
}

function cleanCategory(category) {
  return typeof category === 'string' && wordBank[category] ? category : null;
}

function cleanDifficulty(difficulty) {
  return difficultyMeta[difficulty] ? difficulty : initialState.difficulty;
}

function cleanWordMode(wordMode) {
  return wordModeMeta[wordMode] ? wordMode : initialState.wordMode;
}

function cleanImpostorCount(count, playerCount) {
  const parsed = Number(count);
  if (!Number.isFinite(parsed)) return initialState.impostorCount;
  return Math.min(maxImpostors(playerCount), Math.max(1, Math.floor(parsed)));
}

function cleanRecentPairKeys(keys) {
  if (!Array.isArray(keys)) return [];
  return keys.filter((key) => typeof key === 'string' && key.includes(':')).slice(0, 18);
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const players = cleanPlayers(saved.players);
    return {
      ...initialState,
      players,
      category: cleanCategory(saved.category),
      wordMode: cleanWordMode(saved.wordMode),
      impostorCount: cleanImpostorCount(saved.impostorCount, players.length),
      difficulty: cleanDifficulty(saved.difficulty),
      haptics: typeof saved.haptics === 'boolean' ? saved.haptics : true,
      caseId: typeof saved.caseId === 'string' && saved.caseId ? saved.caseId : '0451-B',
      caseDate: typeof saved.caseDate === 'string' ? saved.caseDate : '',
      recentPairKeys: cleanRecentPairKeys(saved.recentPairKeys),
    };
  } catch {
    return initialState;
  }
}

function persistedState(state) {
  return {
    players: state.players,
    category: state.category,
    wordMode: state.wordMode,
    impostorCount: state.impostorCount,
    difficulty: state.difficulty,
    haptics: state.haptics,
    caseId: state.caseId,
    caseDate: state.caseDate,
    recentPairKeys: state.recentPairKeys,
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'GO_PLAYERS':
      return {
        ...state,
        screen: 'players',
        players: [],
        newPlayerName: '',
        category: null,
        wordMode: 'similar',
        impostorCount: 1,
        difficulty: 'misto',
        assignments: [],
        currentPlayerIndex: 0,
        wordRevealed: false,
        breaking: false,
        lastPairKey: '',
        caseId: makeCaseId(),
        caseDate: makeCaseDate(),
      };
    case 'CONTINUE_WITH_PLAYERS':
      return {
        ...state,
        screen: 'settings',
        caseId: state.caseId || makeCaseId(),
        caseDate: state.caseDate || makeCaseDate(),
      };
    case 'GO_SETTINGS':
      return state.players.length >= 3 ? { ...state, screen: 'settings' } : state;
    case 'GO_BACK':
      if (state.screen === 'settings') return { ...state, screen: 'players' };
      if (state.screen === 'players') return { ...state, screen: 'home' };
      return state;
    case 'SET_NEW_PLAYER_NAME':
      return { ...state, newPlayerName: action.name };
    case 'ADD_PLAYER': {
      const name = state.newPlayerName.trim();
      if (!name) return state;
      return { ...state, players: [...state.players, name], newPlayerName: '' };
    }
    case 'REMOVE_PLAYER': {
      const players = state.players.filter((_, index) => index !== action.index);
      return { ...state, players, impostorCount: Math.min(state.impostorCount, maxImpostors(players.length)) };
    }
    case 'SET_CATEGORY':
      return { ...state, category: cleanCategory(action.category) };
    case 'SET_WORD_MODE':
      return { ...state, wordMode: cleanWordMode(action.wordMode) };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: cleanDifficulty(action.difficulty) };
    case 'DECREMENT_IMPOSTOR':
      return { ...state, impostorCount: Math.max(1, state.impostorCount - 1) };
    case 'INCREMENT_IMPOSTOR':
      return { ...state, impostorCount: Math.min(maxImpostors(state.players.length), state.impostorCount + 1) };
    case 'SET_IMPOSTOR_COUNT':
      return { ...state, impostorCount: Math.min(maxImpostors(state.players.length), Math.max(1, action.count)) };
    case 'TOGGLE_HAPTICS':
      return { ...state, haptics: !state.haptics };
    case 'START_ROUND':
      return createRound(state, wordBank);
    case 'BREAK_SEAL':
      return state.breaking ? state : { ...state, breaking: true };
    case 'REVEAL_WORD':
      return { ...state, wordRevealed: true, breaking: false };
    case 'NEXT_PLAYER': {
      const isLast = state.currentPlayerIndex >= state.assignments.length - 1;
      if (isLast) return { ...state, screen: 'discussion' };
      return {
        ...state,
        currentPlayerIndex: state.currentPlayerIndex + 1,
        wordRevealed: false,
        breaking: false,
      };
    }
    case 'NEW_GAME':
      return {
        ...state,
        screen: 'home',
        newPlayerName: '',
        category: null,
        wordMode: 'similar',
        impostorCount: 1,
        assignments: [],
        currentPlayerIndex: 0,
        wordRevealed: false,
        breaking: false,
      };
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, undefined, loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState(state)));
    } catch {
      // Persistence is optional in private browsing and restricted contexts.
    }
  }, [state.players, state.category, state.wordMode, state.impostorCount, state.difficulty, state.haptics, state.caseId, state.caseDate, state.recentPairKeys]);

  useEffect(() => {
    if (!state.breaking) return undefined;
    const timer = setTimeout(() => dispatch({ type: 'REVEAL_WORD' }), 440);
    return () => clearTimeout(timer);
  }, [state.breaking]);

  const actions = useMemo(() => ({
    goPlayers: () => dispatch({ type: 'GO_PLAYERS' }),
    continueWithPlayers: () => dispatch({ type: 'CONTINUE_WITH_PLAYERS' }),
    goSettings: () => dispatch({ type: 'GO_SETTINGS' }),
    goBack: () => dispatch({ type: 'GO_BACK' }),
    setNewPlayerName: (name) => dispatch({ type: 'SET_NEW_PLAYER_NAME', name }),
    addPlayer: () => dispatch({ type: 'ADD_PLAYER' }),
    removePlayer: (index) => dispatch({ type: 'REMOVE_PLAYER', index }),
    setCategory: (category) => dispatch({ type: 'SET_CATEGORY', category }),
    setWordMode: (wordMode) => dispatch({ type: 'SET_WORD_MODE', wordMode }),
    setDifficulty: (difficulty) => dispatch({ type: 'SET_DIFFICULTY', difficulty }),
    decrementImpostor: () => dispatch({ type: 'DECREMENT_IMPOSTOR' }),
    incrementImpostor: () => dispatch({ type: 'INCREMENT_IMPOSTOR' }),
    setImpostorCount: (count) => dispatch({ type: 'SET_IMPOSTOR_COUNT', count }),
    toggleHaptics: () => dispatch({ type: 'TOGGLE_HAPTICS' }),
    startGame: () => dispatch({ type: 'START_ROUND' }),
    breakSeal: () => {
      if (state.breaking) return;
      if (state.haptics && navigator.vibrate) {
        try {
          navigator.vibrate([0, 35, 25, 60]);
        } catch {
          // Ignore devices without vibration support.
        }
      }
      dispatch({ type: 'BREAK_SEAL' });
    },
    nextPlayer: () => dispatch({ type: 'NEXT_PLAYER' }),
    playAgain: () => dispatch({ type: 'START_ROUND' }),
    newGame: () => dispatch({ type: 'NEW_GAME' }),
  }), [state.breaking, state.haptics]);

  return { state, actions };
}
