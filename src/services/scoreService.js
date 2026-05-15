const STORAGE_KEY = 'cyber_ufla_scores';

export const scoreService = {
  /**
   * Saves a score for a specific game.
   * @param {string} gameId 
   * @param {string} playerName 
   * @param {number} score 
   */
  saveScore: (gameId, playerName, score) => {
    const allScores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    
    if (!allScores[gameId]) {
      allScores[gameId] = [];
    }

    const existingIndex = allScores[gameId].findIndex(e => e.nome === playerName);

    if (existingIndex !== -1) {
      if (score > allScores[gameId][existingIndex].pontuacao) {
        allScores[gameId][existingIndex] = {
          nome: playerName,
          pontuacao: score,
          tempo: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
          timestamp: Date.now()
        };
      }
    } else {
      allScores[gameId].push({
        nome: playerName,
        pontuacao: score,
        tempo: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
        timestamp: Date.now()
      });
    }

    // Sort by score descending
    allScores[gameId].sort((a, b) => b.pontuacao - a.pontuacao);

    // Keep only top 10
    allScores[gameId] = allScores[gameId].slice(0, 10);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(allScores));
    return allScores[gameId].find(e => e.nome === playerName);
  },

  /**
   * Gets the leaderboard for a specific game.
   * @param {string} gameId 
   * @returns {Array}
   */
  getLeaderboard: (gameId) => {
    const allScores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return allScores[gameId] || [];
  },

  /**
   * Gets a global ranking by summing all scores of each player.
   * @returns {Array}
   */
  getGlobalRanking: () => {
    const allScores = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const totals = {};

    Object.keys(allScores).forEach(gameId => {
      allScores[gameId].forEach(entry => {
        if (!totals[entry.nome]) {
          totals[entry.nome] = 0;
        }
        totals[entry.nome] += entry.pontuacao;
      });
    });

    return Object.keys(totals)
      .map(nome => ({ nome, pontuacao: totals[nome] }))
      .sort((a, b) => b.pontuacao - a.pontuacao)
      .slice(0, 10);
  },

  /**
   * Gets all scores to create a global ranking if needed.
   * @returns {Object}
   */
  getAllScores: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  }
};
