import React, { useState, useEffect } from 'react';
import Hub from './components/Hub';
import Leaderboard from './components/Leaderboard';
import NameModal from './components/NameModal';
import { scoreService } from './services/scoreService';

// Import Game Mocks
import PCBuilder from './components/games/PCBuilder';
import ShortcutNinja from './components/games/ShortcutNinja';
import DigitalDetective from './components/games/DigitalDetective';
import VaultHacker from './components/games/VaultHacker';

const GAMES = [
  {
    id: 'pc-builder',
    title: 'PC Builder',
    description: 'Monte o hardware perfeito para o laboratório.',
    icon: '💻',
    component: PCBuilder
  },
  {
    id: 'atalhos',
    title: 'Ninja dos Atalhos',
    description: 'Seja o mestre do teclado e da produtividade.',
    icon: '⌨️',
    component: ShortcutNinja
  },
  {
    id: 'detetive',
    title: 'Detetive Digital',
    description: 'Identifique fake news e proteja seus dados.',
    icon: '🔍',
    component: DigitalDetective
  },
  {
    id: 'cofre',
    title: 'Hackeando o Cofre',
    description: 'Crie senhas indestrutíveis e vença o sistema.',
    icon: '🔐',
    component: VaultHacker
  }
];

function App() {
  const [screen, setScreen] = useState('hub'); // hub, game, leaderboard
  const [activeGame, setActiveGame] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  const [lastGameResult, setLastGameResult] = useState(null);

  const handlePlayClick = (game) => {
    setActiveGame(game);
    setShowNameModal(true);
  };

  const handleStartGame = (name) => {
    setPlayerName(name);
    setShowNameModal(false);
    setScreen('game');
  };

  const handleGameFinish = (score) => {
    const result = scoreService.saveScore(activeGame.id, playerName, score);
    setLastGameResult({ ...result, gameId: activeGame.id });
    setScreen('leaderboard');
  };

  const backToHub = () => {
    setScreen('hub');
    setActiveGame(null);
    setLastGameResult(null);
  };

  const retryGame = () => {
    setScreen('game');
    setLastGameResult(null);
  };

  const viewGlobalLeaderboard = () => {
    setActiveGame({ id: 'global', title: 'Placares Gerais' });
    setScreen('leaderboard');
  };

  return (
    <div className="app-container">
      {screen === 'hub' && (
        <Hub 
          games={GAMES} 
          onPlay={handlePlayClick} 
          onViewGlobal={viewGlobalLeaderboard}
        />
      )}

      {screen === 'game' && activeGame && (
        <div className="game-screen-wrapper">
          <activeGame.component 
            onFinish={handleGameFinish} 
            playerName={playerName}
            onCancel={backToHub}
          />
        </div>
      )}

      {screen === 'leaderboard' && (
        <Leaderboard 
          gameId={activeGame?.id} 
          gameTitle={activeGame?.title}
          lastResult={lastGameResult}
          onBack={backToHub}
          onRetry={activeGame?.id !== 'global' ? retryGame : null}
        />
      )}

      {showNameModal && (
        <NameModal 
          onConfirm={handleStartGame} 
          onClose={() => setShowNameModal(false)} 
        />
      )}
    </div>
  );
}

export default App;
