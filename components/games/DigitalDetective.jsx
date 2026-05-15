import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, CheckCircle2, AlertTriangle, Trophy } from 'lucide-react';

const QUESTIONS = [
  { q: "Qual desses é o método mais seguro de login?", opts: ["Senha simples", "Data de nascimento", "Autenticação em 2 fatores (2FA)", "Nome do pet"], ans: 2 },
  { q: "O que é Phishing?", opts: ["Um tipo de antivírus", "E-mails falsos para roubar dados", "Uma rede social nova", "Um jogo de pesca"], ans: 1 },
  { q: "O que o 'S' em HTTPS significa?", opts: ["System", "Simple", "Secure (Seguro)", "Speed"], ans: 2 },
  { q: "O que você deve fazer ao receber um link estranho?", opts: ["Clicar para ver o que é", "Apagar e não clicar", "Enviar para os amigos", "Responder pedindo ajuda"], ans: 1 },
  { q: "Qual a função de um Firewall?", opts: ["Limpar o teclado", "Bloquear conexões perigosas", "Aumentar o brilho da tela", "Organizar arquivos"], ans: 1 }
];

const DigitalDetective = ({ onFinish, playerName, onCancel }) => {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  const handleAns = (i) => {
    if (feedback || isFinished) return;

    const isCorrect = i === QUESTIONS[idx].ans;
    let newScore = score;
    if (isCorrect) {
      newScore = score + 400;
      setScore(newScore);
      setFeedback({ correct: true });
    } else {
      setFeedback({ correct: false, correctAns: QUESTIONS[idx].opts[QUESTIONS[idx].ans] });
    }

    setTimeout(() => {
      setFeedback(null);
      if (idx + 1 < QUESTIONS.length) {
        setIdx(idx + 1);
      } else {
        setIsFinished(true);
      }
    }, 1500);
  };

  return (
    <div className="container">
      <div className="positivus-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div className="game-header" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--primary-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '2px solid #000' }}>
              <Shield size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Detetive Digital</h2>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontWeight: 800 }}>PONTOS: {score}</span>
            <button className="btn-dark" style={{ padding: '0.5rem' }} onClick={onCancel}><X /></button>
          </div>
        </div>

        {!isFinished ? (
          <>
            <div className="badge">CASO {idx + 1} DE {QUESTIONS.length}</div>
            <h3 style={{ fontSize: '1.8rem', margin: '1rem 0 2.5rem', fontWeight: 900, lineHeight: 1.3 }}>{QUESTIONS[idx].q}</h3>

            <div className="quiz-options" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {QUESTIONS[idx].opts.map((opt, i) => (
                <button 
                  key={i} 
                  className="opt-btn" 
                  onClick={() => handleAns(i)}
                  style={{
                    background: feedback ? (i === QUESTIONS[idx].ans ? '#dcfce7' : '#fff') : '#fff',
                    borderColor: feedback ? (i === QUESTIONS[idx].ans ? '#166534' : '#000') : '#000'
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ 
                    marginTop: '2rem', 
                    padding: '1.5rem', 
                    borderRadius: '16px', 
                    background: feedback.correct ? '#dcfce7' : '#fee2e2',
                    border: '2px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '4px 4px 0px #000'
                  }}
                >
                  {feedback.correct ? <CheckCircle2 color="#166534" size={32} /> : <AlertTriangle color="#991b1b" size={32} />}
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '1.1rem', color: feedback.correct ? '#166534' : '#991b1b' }}>
                      {feedback.correct ? "EXCELENTE, AGENTE!" : "AMEAÇA DETECTADA!"}
                    </div>
                    <div style={{ fontWeight: 600, color: feedback.correct ? '#166534' : '#991b1b' }}>
                      {feedback.correct ? "+400 Pontos de Experiência" : `Resposta Correta: ${feedback.correctAns}`}
                    </div>
                  </div>
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
              background: 'var(--primary-color)', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 2rem',
              border: '3px solid #000',
              boxShadow: '4px 4px 0px #000',
              color: '#fff'
            }}>
              <Shield size={40} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem' }}>SISTEMA PROTEGIDO!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontWeight: 600 }}>Suas habilidades de segurança são fundamentais.</p>
            
            <div style={{ background: '#f3f4f6', border: '2px solid #000', padding: '1.5rem', borderRadius: '16px', marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.6 }}>TOTAL DE PONTOS:</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-color)' }}>{score}</div>
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

export default DigitalDetective;
