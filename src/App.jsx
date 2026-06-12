import { AnimatePresence } from 'motion/react';
import { useGameState } from './hooks/useGameState.js';
import { HomeScreen } from './screens/HomeScreen.jsx';
import { PlayersScreen } from './screens/PlayersScreen.jsx';
import { SettingsScreen } from './screens/SettingsScreen.jsx';
import { TurnScreen } from './screens/TurnScreen.jsx';
import { DiscussionScreen } from './screens/DiscussionScreen.jsx';

export function App() {
  const { state, actions } = useGameState();

  return (
    <main className="app-shell">
      <div className="grain" />
      <div className="vignette" />
      <AnimatePresence mode="wait">
        {state.screen === 'home' && <HomeScreen key="home" state={state} actions={actions} />}
        {state.screen === 'players' && <PlayersScreen key="players" state={state} actions={actions} />}
        {state.screen === 'settings' && <SettingsScreen key="settings" state={state} actions={actions} />}
        {state.screen === 'turn' && <TurnScreen key={`turn-${state.currentPlayerIndex}-${state.wordRevealed}`} state={state} actions={actions} />}
        {state.screen === 'discussion' && <DiscussionScreen key="discussion" state={state} actions={actions} />}
      </AnimatePresence>
    </main>
  );
}
