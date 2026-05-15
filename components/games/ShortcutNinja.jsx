import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard, CheckCircle2, AlertTriangle, Trophy } from 'lucide-react';

const SHORTCUTS = [
  { q: "Qual o comando para COPIAR?", opts: ["Ctrl+X", "Ctrl+V", "Ctrl+C", "Alt+C"], ans: 2 },
  { q: "Qual o comando para COLAR?", opts: ["Ctrl+P", "Ctrl+V", "Shift+V", "Ctrl+C"], ans: 1 },
  { q: "Qual comando para DESFAZER?", opts: ["Ctrl+D", "Ctrl+Y", "Ctrl+Z", "Alt+Z"], ans: 2 },
  { q: "Como SALVAR um arquivo?", opts: ["Ctrl+S", "Ctrl+A", "Ctrl+G", "Alt+S"], ans: 0 },
  { q: "Como SELECIONAR TUDO?", opts: ["Ctrl+T", "Ctrl+S", "Ctrl+A", "Shift+A"], ans: 2 },
  { q: "Como LOCALIZAR algo (Find)?", opts: ["Ctrl+L", "Ctrl+F", "Ctrl+G", "Alt+F"], ans: 1 },
  { q: "Como FECHAR uma janela?", opts: ["Alt+F4", "Ctrl+W", "Ambas estão certas", "Nenhuma"], ans: 2 }
];

const ShortcutNinja = ({ onFinish, playerName, onCancel }) => {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleAns = (i) => {
    if (feedback || isFinished) return;

    const isCorrect = i === SHORTCUTS[idx].ans;
    let newScore = score;
    if (isCorrect) {
      newScore = score + 300;
      setScore(newScore);
      setFeedback({ correct: true });
    } else {
      setFeedback({ correct: false, correctAns: SHORTCUTS[idx].opts[SHORTCUTS[idx].ans] });
    }

    setTimeout(() => {
      setFeedback(null);
      if (idx + 1 < SHORTCUTS.length) {
        setIdx(idx + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  return (
    <div className="container">
      <div className="positivus-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="game-header" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '2px solid #000' }}>
              <Keyboard size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Mestre dos Atalhos</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 800 }}>PONTOS: {score}</span>
            <button className="btn-dark" style={{ padding: '0.5rem' }} onClick={onCancel}><X /></button>
          </div>
        </div>

        {!isFinished ? (
          <>
            <div className="badge">DESAFIO {idx + 1} DE {SHORTCUTS.length}</div>
            <h3 style={{ fontSize: '1.8rem', margin: '1rem 0 2.5rem', fontWeight: 900, lineHeight: 1.2 }}>{SHORTCUTS[idx].q}</h3>

            <div className="quiz-options">
              {SHORTCUTS[idx].opts.map((opt, i) => (
                <button 
                  key={i} 
                  className={`opt-btn ${feedback && i === SHORTCUTS[idx].ans ? 'success' : ''}`} 
                  onClick={() => handleAns(i)}
                  style={{
                    background: feedback ? (i === SHORTCUTS[idx].ans ? '#dcfce7' : '#fff') : '#fff',
                    borderColor: feedback ? (i === SHORTCUTS[idx].ans ? '#166534' : '#000') : '#000'
                  }}
                  disabled={!!feedback}
                >
                  {opt}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ 
                    marginTop: '2rem', 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    background: feedback.correct ? '#dcfce7' : '#fee2e2',
                    border: '2px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}
                >
                  {feedback.correct ? <CheckCircle2 color="#166534" /> : <AlertTriangle color="#991b1b" />}
                  <span style={{ fontWeight: 800, color: feedback.correct ? '#166534' : '#991b1b' }}>
                    {feedback.correct ? "+300 PONTOS!" : `ERRADO! A resposta era: ${feedback.correctAns}`}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '2rem 0' }}
          >
            <div style={{ 
              width: '80px', 
              height: '80px', 
              background: '#FFD700', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 2rem',
              border: '3px solid #000',
              boxShadow: '4px 4px 0px #000'
            }}>
              <Trophy size={40} color="#000" />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>TREINAMENTO CONCLUÍDO!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontWeight: 600 }}>Você dominou os atalhos essenciais.</p>
            
            <div style={{ background: '#f3f4f6', border: '2px solid #000', padding: '1.5rem', borderRadius: '16px', marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.6 }}>TOTAL CONQUISTADO:</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-color)' }}>{score} PONTOS</div>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '1.5rem', fontSize: '1.1rem' }}
              onClick={() => onFinish(score)}
            >
              Resgatar e Continuar
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShortcutNinja;
