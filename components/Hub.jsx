import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Play, Cpu, Keyboard, Search, ShieldCheck, Star, Award } from 'lucide-react';
import { scoreService } from '../services/scoreService';

const Hub = ({ games, onPlay, onViewGlobal }) => {
  const [globalScores, setGlobalScores] = useState([]);

  useEffect(() => {
    setGlobalScores(scoreService.getGlobalRanking());
  }, []);

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav className="hub-nav">
        <div className="brand-area">
          <img src={`${import.meta.env.BASE_URL}project-logo-cpt.png`} alt="Logo CPT" className="project-logo" />
          <h1 className="brand-title">Computação para Todos <span style={{color: 'var(--primary-color)'}}>-- MINIGAMES--</span></h1>
        </div>
        <button className="btn-primary" onClick={onViewGlobal}>
          <Trophy size={18} />
          Placares Detalhados
        </button>
      </nav>

      <div className="hub-main-layout">
        <motion.div 
          className="games-section"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="game-grid">
            {games.map((game, index) => (
              <GameCard 
                key={game.id} 
                game={game} 
                index={index} 
                onClick={() => onPlay(game)} 
              />
            ))}
          </div>
        </motion.div>

        <motion.aside 
          className="podium-sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="positivus-card podium-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="podium-header">
              <div className="podium-icon">
                <Trophy size={24} />
              </div>
              <h3 style={{ fontWeight: 900 }}>Pódio Geral</h3>
            </div>
            
            <div className="ranking-compact" style={{ flex: 1 }}>
              {globalScores.length > 0 ? (
                globalScores.slice(0, 6).map((s, i) => (
                  <div key={i} className={`rank-item-mini ${i === 0 ? 'top-rank' : ''}`}>
                    <div className={`rank-number ${i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : ''}`}>
                      {i < 3 ? <Star size={12} fill="currentColor" /> : i + 1}
                    </div>
                    <div className="rank-info">
                      <span className="rank-name">{s.nome}</span>
                      <span className="rank-points">{s.pontuacao.toLocaleString()} <small>PTS</small></span>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem 0', opacity: 0.5 }}>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700 }}>Sem pontuações ainda</p>
                </div>
              )}
            </div>

            <button 
              className="btn-text-only" 
              onClick={onViewGlobal}
              style={{ 
                marginTop: '1.5rem', 
                width: '100%', 
                fontSize: '0.8rem', 
                fontWeight: 800,
                color: 'var(--primary-color)',
                cursor: 'pointer',
                border: 'none',
                background: 'transparent',
                textAlign: 'center'
              }}
            >
              VER RANKING COMPLETO →
            </button>
          </div>
        </motion.aside>
      </div>

      <footer className="hub-footer">
        <div className="footer-content">
          <p className="footer-label">REALIZAÇÃO</p>
          <div className="footer-logos">
            <img src={`${import.meta.env.BASE_URL}ufla_logo.gif`} alt="UFLA" className="footer-logo" />
            <img src={`${import.meta.env.BASE_URL}institutos_logo.jpg`} alt="Institutos" className="footer-logo" />
          </div>
        </div>
      </footer>
    </div>
  );
};

const GameCard = ({ game, index, onClick }) => {
  const getIcon = (id) => {
    switch(id) {
      case 'pc-builder': return <Cpu />;
      case 'atalhos': return <Keyboard />;
      case 'detetive': return <Search />;
      case 'cofre': return <ShieldCheck />;
      default: return null;
    }
  };

  return (
    <motion.div 
      className="positivus-card game-card"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="game-card-header">
        <div className="icon-box">
          {getIcon(game.id)}
        </div>
        <span className="badge">MÓDULO {index + 1}</span>
      </div>
      
      <div className="card-body" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{game.title}</h3>
        <p style={{ fontSize: '0.85rem', marginBottom: 0 }}>{game.description}</p>
      </div>

      <button className="btn-primary" onClick={onClick} style={{ width: '100%', marginTop: 'auto', padding: '0.8rem' }}>
        <Play size={16} fill="currentColor" />
        Iniciar Missão
      </button>
    </motion.div>
  );
};

export default Hub;
