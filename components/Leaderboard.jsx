import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Home, Medal, Gamepad2, Award, Star, ChevronRight } from 'lucide-react';
import { scoreService } from '../services/scoreService';

const Leaderboard = ({ gameId, gameTitle, onBack, onRetry }) => {
  const [scores, setScores] = useState([]);
  const [activeTab, setActiveTab] = useState(gameId === 'global' ? 'podium' : 'by-game');
  const [selectedGame, setSelectedGame] = useState(gameId === 'global' ? 'pc-builder' : gameId);

  const games = [
    { id: 'pc-builder', title: 'PC Builder' },
    { id: 'atalhos', title: 'Ninja dos Atalhos' },
    { id: 'detetive', title: 'Detetive Digital' },
    { id: 'cofre', title: 'Hackeando o Cofre' }
  ];

  useEffect(() => {
    if (activeTab === 'podium') {
      setScores(scoreService.getGlobalRanking());
    } else {
      setScores(scoreService.getLeaderboard(selectedGame));
    }
  }, [activeTab, selectedGame]);

  return (
    <div className="container">
      <div className="positivus-card" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="leaderboard-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'var(--primary-color)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1rem',
            boxShadow: '4px 4px 0px #000',
            border: '2px solid #000',
            color: 'white'
          }}>
            <Trophy size={30} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>PLACARES E PÓDIO</h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Veja quem são os Agentes de elite da CPT</p>
        </div>

        <div className="leaderboard-tabs" style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', background: '#f3f4f6', padding: '0.4rem', borderRadius: '12px', border: '2px solid #000' }}>
          <button 
            className={`tab-btn-custom ${activeTab === 'podium' ? 'active' : ''}`}
            onClick={() => setActiveTab('podium')}
            style={{ flex: 1 }}
          >
            <Trophy size={18} /> Pódio Geral (Total)
          </button>
          <button 
            className={`tab-btn-custom ${activeTab === 'by-game' ? 'active' : ''}`}
            onClick={() => setActiveTab('by-game')}
            style={{ flex: 1 }}
          >
            <Gamepad2 size={18} /> Pontos por Jogo
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'by-game' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}
            >
              {games.map(g => (
                <button 
                  key={g.id}
                  onClick={() => setSelectedGame(g.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    border: '2px solid #000',
                    background: selectedGame === g.id ? '#000' : '#fff',
                    color: selectedGame === g.id ? '#fff' : '#000',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {g.title}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="ranking-list" style={{ minHeight: '400px' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {activeTab === 'podium' ? <Award /> : <Gamepad2 />}
            {activeTab === 'podium' ? 'Ranking Geral de Pontos' : `Top 10: ${games.find(g=>g.id===selectedGame)?.title}`}
          </h3>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + selectedGame}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              {scores.map((s, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    padding: '1.2rem', 
                    background: i === 0 ? 'rgba(0, 123, 255, 0.05)' : '#fff',
                    border: '2px solid #000',
                    borderRadius: '12px',
                    marginBottom: '0.75rem',
                    boxShadow: i === 0 ? '4px 4px 0px #000' : 'none'
                  }}
                >
                  <div style={{ 
                    width: '35px', 
                    height: '35px', 
                    borderRadius: '50%', 
                    background: i === 0 ? '#FFD700' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#f3f4f6',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 900,
                    border: '2px solid #000'
                  }}>
                    {i < 3 ? <Star size={14} fill="currentColor" /> : i + 1}
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: '1.1rem' }}>{s.nome}</div>
                    {activeTab === 'by-game' && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{s.tempo}</div>}
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary-color)' }}>
                      {s.pontuacao.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.6rem', fontWeight: 800, opacity: 0.5 }}>PONTOS</div>
                  </div>
                </div>
              ))}

              {scores.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem 0', opacity: 0.3 }}>
                  <Gamepad2 size={48} style={{ margin: '0 auto 1rem' }} />
                  <p style={{ fontWeight: 800 }}>NENHUM DADO NESTA CATEGORIA</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ marginTop: '3rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {onRetry && activeTab === 'by-game' && selectedGame === gameId && (
            <button className="btn-primary" onClick={onRetry} style={{ padding: '1rem 2rem' }}>Tentar Novamente</button>
          )}
          <button className="btn-dark" onClick={onBack} style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Home size={18} /> Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
