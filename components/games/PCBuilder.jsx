import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Cpu as CpuIcon, AlertCircle } from 'lucide-react';

const PARTS_DATA = [
  { 
    id: 'motherboard', 
    name: 'Placa Mãe', 
    img: `${import.meta.env.BASE_URL}pc_motherboard_clean_1778865173186.png`,
    pos: { top: '15%', left: '20%', width: '60%', height: '70%' },
    question: "A Placa Mãe é responsável por:",
    options: ["Gerar eletricidade", "Conectar todos os componentes entre si", "Aumentar o brilho da tela", "Armazenar o Windows"],
    correct: 1,
    requires: null
  },
  { 
    id: 'psu', 
    name: 'Fonte de Alimentação', 
    img: `${import.meta.env.BASE_URL}pc_psu_photo.png`,
    pos: { top: '75%', left: '10%', width: '25%', height: '20%' },
    question: "A principal função da Fonte (PSU) é:",
    options: ["Resfriar o processador", "Transformar e distribuir energia", "Conectar o Wi-Fi", "Processar textos"],
    correct: 1,
    requires: null
  },
  { 
    id: 'cpu', 
    name: 'CPU (Processador)', 
    img: `${import.meta.env.BASE_URL}pc_cpu_photo_1778865340517.png`,
    pos: { top: '35%', left: '44%', width: '12%', height: '12%' },
    question: "Onde o Processador deve ser encaixado?",
    options: ["No Slot PCI", "No Soquete da Placa Mãe", "Na entrada USB", "Direto na tomada"],
    correct: 1,
    requires: 'motherboard'
  },
  { 
    id: 'ram', 
    name: 'Memória RAM', 
    img: `${import.meta.env.BASE_URL}pc_ram_photo_1778865407685.png`,
    pos: { top: '25%', left: '58%', width: '3%', height: '25%' },
    question: "A Memória RAM é do tipo:",
    options: ["Permanente", "Volátil (temporária)", "Magnetizada", "Óptica"],
    correct: 1,
    requires: 'motherboard'
  },
  { 
    id: 'ssd', 
    name: 'SSD NVMe', 
    img: `${import.meta.env.BASE_URL}pc_ssd_photo_1778865468132.png`,
    pos: { top: '55%', left: '58%', width: '15%', height: '4%' },
    question: "O SSD armazena dados de forma:",
    options: ["Digital e permanente", "Analógica", "Temporária", "Por vapor"],
    correct: 0,
    requires: 'motherboard'
  },
  { 
    id: 'gpu', 
    name: 'Placa de Vídeo (GPU)', 
    img: `${import.meta.env.BASE_URL}pc_gpu_photo_1778865385654.png`,
    pos: { top: '65%', left: '25%', width: '45%', height: '12%' },
    question: "A GPU é especializada em:",
    options: ["Cálculos matemáticos simples", "Processamento gráfico intenso", "Impressão de documentos", "Gerenciar o mouse"],
    correct: 1,
    requires: 'motherboard'
  }
];

const PCBuilder = ({ onFinish, playerName, onCancel }) => {
  const [placedParts, setPlacedParts] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [draggedId, setDraggedId] = useState(null);
  const [score, setScore] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const part = PARTS_DATA.find(p => p.id === draggedId);
    
    if (!part) return;

    // Verificar se a peça caiu no lugar certo
    if (draggedId !== targetId) {
      setScore(s => Math.max(0, s - 50));
      showError("Lugar incorreto! Tente observar onde essa peça se encaixa.");
      return;
    }

    // Verificar se já está colocada
    if (placedParts.includes(draggedId)) return;

    // Verificar dependência (ex: precisa da placa mãe antes)
    if (part.requires && !placedParts.includes(part.requires)) {
      setScore(s => Math.max(0, s - 50));
      showError(`Você precisa instalar a ${PARTS_DATA.find(p=>p.id===part.requires).name} primeiro!`);
      return;
    }

    setCurrentQuiz(part);
    setDraggedId(null);
  };

  const showError = (msg) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 3000);
  };

  const handleQuizAnswer = (index) => {
    if (index === currentQuiz.correct) {
      setPlacedParts(prev => [...prev, currentQuiz.id]);
      setScore(prev => prev + 400); // Balanceamento: 400 por peça
      setCurrentQuiz(null);
    } else {
      setScore(prev => Math.max(0, prev - 100));
      alert(`Resposta incorreta! A resposta correta era: ${currentQuiz.options[currentQuiz.correct]}`);
      setCurrentQuiz(null);
    }
  };

  const allPlaced = placedParts.length === PARTS_DATA.length;

  return (
    <div className="container" style={{ paddingTop: '1rem' }}>
      <div className="positivus-card">
        <div className="game-header" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Montagem de PC Profissional</h2>
            <p style={{ color: 'var(--text-muted)' }}>Primeiro a Placa Mãe e Fonte, depois o resto!</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div className="badge" style={{ background: '#000', color: '#fff', fontSize: '1.2rem', padding: '0.5rem 1rem' }}>
              SCORE: {score}
            </div>
            <button className="btn-dark" style={{ padding: '0.5rem' }} onClick={onCancel}><X /></button>
          </div>
        </div>

        <div className="pc-builder-container">
          <div className="motherboard-view" style={{ position: 'relative', background: '#e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
            {/* Imagem do GABINETE como fundo principal */}
            <img src={`${import.meta.env.BASE_URL}pc_case_interior.png`} className="motherboard-img" alt="Gabinete" style={{ opacity: 0.8 }} />
            
            {PARTS_DATA.map(part => (
              <div 
                key={part.id}
                className={`slot ${part.id} ${placedParts.includes(part.id) ? 'filled' : ''}`}
                style={{ 
                  top: part.pos.top, 
                  left: part.pos.left, 
                  width: part.pos.width, 
                  height: part.pos.height,
                  zIndex: part.id === 'motherboard' ? 1 : 2,
                  // Slot só fica visível se for o próximo passo ou se já estiver preenchido
                  opacity: (placedParts.includes(part.id) || draggedId === part.id) ? 1 : 0.1
                }}
                onDrop={(e) => handleDrop(e, part.id)}
                onDragOver={(e) => e.preventDefault()}
              >
                {placedParts.includes(part.id) && (
                  <img src={part.img} className="part-photo" alt={part.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                )}
              </div>
            ))}

            <AnimatePresence>
              {errorMsg && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    left: '20px', 
                    right: '20px', 
                    background: '#fee2e2', 
                    border: '2px solid #000', 
                    padding: '1rem', 
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    zIndex: 100,
                    color: '#991b1b',
                    fontWeight: 800
                  }}
                >
                  <AlertCircle /> {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="inventory-panel">
            <h3 style={{ marginBottom: '1rem', fontWeight: 800 }}>Componentes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
              {PARTS_DATA.filter(p => !placedParts.includes(p.id)).map(part => (
                <div 
                  key={part.id}
                  className="inventory-item"
                  draggable
                  onDragStart={() => setDraggedId(part.id)}
                  style={{ opacity: (part.requires && !placedParts.includes(part.requires)) ? 0.5 : 1 }}
                >
                  <img src={part.img} className="item-thumb" alt={part.name} />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{part.name}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>
                      {part.requires && !placedParts.includes(part.requires) ? `Precisa de: ${PARTS_DATA.find(p=>p.id===part.requires).name}` : 'Arraste para o lugar'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {allPlaced && (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="positivus-card" 
                style={{ background: '#dcfce7', borderColor: '#166534', padding: '1.5rem', textAlign: 'center', marginTop: '2rem' }}
              >
                <CheckCircle2 color="#166534" size={48} style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: '#166534', fontWeight: 900 }}>PC MONTADO COM SUCESSO!</p>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', marginTop: '1rem', background: '#166534' }}
                  onClick={() => onFinish(score)}
                >
                  Resgatar {score} Pontos
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {currentQuiz && (
          <div className="quiz-overlay" style={{ zIndex: 3000 }}>
            <motion.div 
              className="quiz-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '1.5rem', textAlign: 'center' }}>VALIDAÇÃO: {currentQuiz.name}</h3>
              <div style={{ background: '#f3f4f6', padding: '1.5rem', borderRadius: '16px', border: '2px solid #000', marginBottom: '1.5rem' }}>
                <p style={{ fontWeight: 700 }}>{currentQuiz.question}</p>
              </div>
              <div className="quiz-options">
                {currentQuiz.options.map((opt, i) => (
                  <button key={i} className="opt-btn" onClick={() => handleQuizAnswer(i)}>{opt}</button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PCBuilder;
