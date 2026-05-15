import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Unlock, Terminal, Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

const VaultHacker = ({ onFinish, playerName, onCancel }) => {
  const [password, setPassword] = useState('');
  const [isCracking, setIsCracking] = useState(false);
  const [result, setResult] = useState(null);
  const [displayAttempts, setDisplayAttempts] = useState(0);

  const calculateCrackTime = (p) => {
    if (!p) return null;
    
    let charsetSize = 0;
    if (/[a-z]/.test(p)) charsetSize += 26;
    if (/[A-Z]/.test(p)) charsetSize += 26;
    if (/[0-9]/.test(p)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(p)) charsetSize += 32;

    const combinations = Math.pow(charsetSize || 1, p.length);
    const hashesPerSecond = 50000; 
    const seconds = combinations / hashesPerSecond;

    let timeStr = "";
    let score = 0;

    if (seconds < 0.5) { timeStr = "Milissegundos (Extremamente Fraca)"; score = 100; }
    else if (seconds < 60) { timeStr = `${Math.floor(seconds)} segundos`; score = 500; }
    else if (seconds < 3600) { timeStr = `${Math.floor(seconds/60)} minutos`; score = 1000; }
    else if (seconds < 86400) { timeStr = `${Math.floor(seconds/3600)} horas`; score = 1500; }
    else if (seconds < 31536000) { timeStr = `${Math.floor(seconds/86400)} dias`; score = 2000; }
    else if (seconds < 3153600000) { timeStr = `${Math.floor(seconds/31536000)} anos`; score = 2500; }
    else { timeStr = "Séculos (Fortaleza Digital)"; score = 3000; }

    return { timeStr, combinations, score };
  };

  const startCrack = () => {
    if (!password) return;
    setIsCracking(true);
    setResult(null);
    setDisplayAttempts(0);
    
    let count = 0;
    const crackData = calculateCrackTime(password);
    const totalSteps = 30;
    
    const interval = setInterval(() => {
      count += 1;
      setDisplayAttempts(prev => {
        const target = crackData.combinations / (totalSteps - count + 1);
        return Math.min(crackData.combinations, prev + Math.floor(target / 10));
      });

      if (count >= totalSteps) {
        clearInterval(interval);
        setResult(crackData);
        setIsCracking(false);
      }
    }, 80);
  };

  return (
    <div className="container">
      <div className="positivus-card" style={{ maxWidth: '650px', margin: '0 auto' }}>
        <div className="game-header" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', background: '#000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00ff00', border: '2px solid #000' }}>
              <Terminal size={24} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Simulador de Invasão</h2>
          </div>
          <button className="btn-dark" style={{ padding: '0.5rem' }} onClick={onCancel}><X /></button>
        </div>

        <div style={{ background: '#f8f9fa', border: '2px solid #000', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
          <p style={{ fontWeight: 600, color: '#444' }}>
            O "Brute Force" testa todas as combinações possíveis. <br/>
            <strong>Quanto mais caracteres e símbolos, mais seguro você está!</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Digite uma senha para testar..."
              className="opt-btn"
              style={{ width: '100%', padding: '1.5rem', fontSize: '1.2rem', fontFamily: 'monospace', margin: 0 }}
              value={password}
              onChange={(e) => !isCracking && !result && setPassword(e.target.value)}
            />
          </div>
          <button 
            className="btn-primary" 
            style={{ padding: '0 2rem' }}
            onClick={startCrack}
            disabled={!password || isCracking || result}
          >
            EXECUTAR
          </button>
        </div>

        <AnimatePresence mode="wait">
          {isCracking ? (
            <motion.div 
              key="cracking"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{ background: '#000', color: '#00ff00', padding: '3rem', borderRadius: '24px', border: '4px solid #000', textAlign: 'center', boxShadow: '8px 8px 0px #000' }}
            >
              <Activity className="pulse" size={48} style={{ marginBottom: '1.5rem' }} />
              <div style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '4px', color: '#fff' }}>HACKING IN PROGRESS</div>
              <div style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.8, fontFamily: 'monospace' }}>
                {Math.floor(displayAttempts).toLocaleString()} combinações testadas...
              </div>
              <div style={{ width: '100%', height: '8px', background: '#222', borderRadius: '4px', marginTop: '2rem', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.4 }}
                  style={{ height: '100%', background: '#00ff00' }}
                />
              </div>
            </motion.div>
          ) : result ? (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                background: result.score > 1500 ? '#dcfce7' : '#fee2e2', 
                padding: '3rem', 
                borderRadius: '24px', 
                border: '3px solid #000', 
                textAlign: 'center',
                boxShadow: '8px 8px 0px #000'
              }}
            >
              <div style={{ marginBottom: '1.5rem' }}>
                {result.score > 1500 ? <CheckCircle2 size={60} color="#166534" /> : <ShieldAlert size={60} color="#991b1b" />}
              </div>
              
              <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: result.score > 1500 ? '#166534' : '#991b1b' }}>TEMPO DE QUEBRA:</h3>
              <div style={{ fontSize: '2rem', fontWeight: 900, margin: '1rem 0' }}>{result.timeStr}</div>
              
              <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, opacity: 0.6 }}>TOTAL DE COMBINAÇÕES:</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{result.combinations.toLocaleString()}</div>
              </div>

              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary-color)', marginBottom: '2rem' }}>+{result.score} PONTOS</div>
              
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '1.5rem', fontSize: '1.1rem' }}
                onClick={() => onFinish(result.score)}
              >
                Resgatar e Continuar
              </button>
            </motion.div>
          ) : (
            <div style={{ textAlign: 'center', opacity: 0.1, padding: '4rem' }}>
              <Lock size={80} style={{ margin: '0 auto' }} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VaultHacker;
