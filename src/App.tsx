import { AnimatePresence } from 'motion/react';
import { useGameState } from './hooks/useGameState';
import { HomeScreen } from './screens/HomeScreen';
import { PlayersScreen } from './screens/PlayersScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { TurnScreen } from './screens/TurnScreen';
import { DiscussionScreen } from './screens/DiscussionScreen';

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
