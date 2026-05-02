import React, { useState, useEffect } from 'react';

const GameCard = ({ game, user, onGameUpdate, showToast }) => {
  const [userRating, setUserRating] = useState(game.userRating || 0);

  useEffect(() => {
    setUserRating(game.userRating || 0);
  }, [game.userRating]);

  const handleRate = async (rating) => {
    if (!user) {
      showToast("Тільки зареєстровані геймери можуть оцінювати ігри!", "error");
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      // Відправляємо запит на сервер для збереження рейтингу
      const response = await fetch(`http://localhost:5000/api/games/${game.id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Передаємо токен для перевірки
        },
        body: JSON.stringify({ value: rating })
      });

      if (!response.ok) {
        const error = await response.json();
        return showToast(error.message || "Помилка оцінювання", "error");
      }

      setUserRating(rating);
      showToast("Дякуємо за оцінку!", "success");
      onGameUpdate(); // Оновлюємо список, щоб підтягнувся новий середній рейтинг
    } catch (error) {
      showToast("Помилка з'єднання з сервером", "error");
    }
  };

  return (
    <article className="game-card">
      <img src={game.img} alt={game.name} />
      <h3>{game.name}</h3>
      <p><strong>Жанр:</strong> {game.genre}</p>
      {/* Виводимо середній рейтинг з БД */}
      <p><strong>Середній рейтинг:</strong> {game.rating > 0 ? game.rating : 'Ще немає оцінок'} / 5</p>
      
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
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Перевіряємо чи є юзер в localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchGames();
  }, []);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Функція для оновлення списку ігор після оцінювання
  const fetchGames = async () => {
    try {
      // Беремо токен з пам'яті браузера
      const token = localStorage.getItem('token');
      
      // Робимо запит і передаємо токен у заголовках
      const response = await fetch('http://localhost:5000/api/games', {
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error("Помилка завантаження ігор:", error);
    }
  };

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
      
      {games.length === 0 ? (
        <p style={{textAlign: 'center', marginTop: '20px'}}>База даних ігор порожня. Додайте ігри через Prisma Studio.</p>
      ) : (
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
      )}
    </section>
  );
}

export default Games;