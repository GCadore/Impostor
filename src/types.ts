import type { ReactNode } from 'react';

export type ScreenName = 'home' | 'players' | 'settings' | 'turn' | 'discussion';
export type Difficulty = 'facil' | 'misto' | 'dificil';
export type WordMode = 'similar' | 'context' | 'blank';
export type DifficultyFlag = 'f' | 'd';

export type WordPair = {
  w: [string, string];
  s: number;
  d: DifficultyFlag;
};

export type WordBank = Record<string, WordPair[]>;

export type Assignment = {
  name: string;
  word: string;
  citizenWord: string;
  impostorWord: string;
  wordMode: WordMode;
  isImpostor: boolean;
};

export type GameState = {
  screen: ScreenName;
  players: string[];
  newPlayerName: string;
  category: string | null;
  wordMode: WordMode;
  impostorCount: number;
  difficulty: Difficulty;
  haptics: boolean;
  currentPlayerIndex: number;
  assignments: Assignment[];
  wordRevealed: boolean;
  breaking: boolean;
  passing: boolean;
  lastPairKey: string;
  recentPairKeys: string[];
  caseId: string;
  caseDate: string;
};

export type GameActions = {
  goPlayers: () => void;
  continueWithPlayers: () => void;
  goSettings: () => void;
  goBack: () => void;
  setNewPlayerName: (name: string) => void;
  addPlayer: () => void;
  removePlayer: (index: number) => void;
  setCategory: (category: string) => void;
  setWordMode: (wordMode: WordMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  decrementImpostor: () => void;
  incrementImpostor: () => void;
  setImpostorCount: (count: number) => void;
  toggleHaptics: () => void;
  startGame: () => void;
  breakSeal: () => void;
  nextPlayer: () => void;
  confirmPass: () => void;
  playAgain: () => void;
  newGame: () => void;
};

export type ScreenProps = {
  state: GameState;
  actions: GameActions;
};

export type WithChildren = {
  children: ReactNode;
};
