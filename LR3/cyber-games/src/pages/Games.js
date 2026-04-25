import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const GameCard = ({ game, user, onGameUpdate, showToast }) => {
  const [userRating, setUserRating] = useState(0);

  const handleRate = async (rating) => {
    if (!user) {
      showToast("Тільки зареєстровані геймери можуть оцінювати ігри!", "error");
      return;
    }
    setUserRating(rating);
    const gameRef = doc(db, 'games', game.id);
    const newRating = Math.round((game.rating + rating) / 2);
    await updateDoc(gameRef, { rating: newRating });
    onGameUpdate();
  };

  return (
    <article className="game-card">
      <img src={game.img} alt={game.name} />
      <h3>{game.name}</h3>
      <p><strong>Жанр:</strong> {game.genre}</p>
      <p><strong>Середній рейтинг:</strong> {game.rating}/5</p>
      
      <div style={{ marginTop: '15px', fontSize: '24px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star} 
            onClick={() => handleRate(star)}
            style={{ 
              cursor: user ? 'pointer' : 'not-allowed', 
              color: star <= userRating ? '#f8e82c' : '#8b949e',
              marginRight: '5px'
            }}
          >
            ★
          </span>
        ))}
      </div>
      {!user && <p style={{ fontSize: '12px', color: '#ff6347' }}>Увійдіть, щоб оцінити</p>}
    </article>
  );
};

function Games() {
  const [games, setGames] = useState([]);
  const [user] = useAuthState(auth);
  
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Зникає через 3 секунди
  };

  const fetchGames = async () => {
    const querySnapshot = await getDocs(collection(db, "games"));
    setGames(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <section className="page-section active-section">
      {toast && (
        <div className="toast-container">
          <div className={`toast-item ${toast.type}`}>
            <span>{toast.message}</span>
            <span className="toast-close-btn" onClick={() => setToast(null)}>&times;</span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Ігри</h2>
      </div>
      
      <div className="grid-container">
        {games.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            user={user} 
            onGameUpdate={fetchGames}
            showToast={showToast}
          />
        ))}
      </div>
    </section>
  );
}

export default Games;