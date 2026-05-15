import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Rocket } from 'lucide-react';

const NameModal = ({ onConfirm, onClose }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim());
    }
  };

  return (
    <AnimatePresence>
      <div className="quiz-overlay" onClick={onClose} style={{ zIndex: 2000 }}>
        <motion.div 
          className="positivus-card"
          style={{ maxWidth: '500px', width: '90%', position: 'relative' }}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ 
              width: '70px', 
              height: '70px', 
              background: 'var(--primary-color)', 
              borderRadius: '16px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              margin: '0 auto 1.5rem',
              color: 'white',
              boxShadow: '4px 4px 0px #000',
              border: '2px solid #000'
            }}>
              <Rocket size={32} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>BEM-VINDO!</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>
              Insira seu nome para iniciar sua jornada na <br/>
              <strong style={{ color: '#000' }}>Computação para Todos</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 800, fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Seu Nome ou Apelido</label>
              <input 
                type="text" 
                placeholder="Ex: Alan Turing"
                style={{ 
                  width: '100%', 
                  padding: '1.25rem', 
                  borderRadius: '12px', 
                  border: '2px solid #000', 
                  fontSize: '1.1rem', 
                  fontWeight: 600,
                  outline: 'none',
                  background: '#f8f9fa'
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', padding: '1.25rem' }} 
              disabled={!name.trim()}
            >
              Começar a Jogar
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NameModal;
