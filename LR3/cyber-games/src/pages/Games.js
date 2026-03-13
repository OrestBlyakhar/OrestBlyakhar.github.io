import React, { useState } from 'react';

// Окремий компонент для картки гри
const GameCard = ({ game }) => {
  // Додаємо стан: чи додана гра в улюблені
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDoubleClick = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <article className={`game-card ${isFavorite ? 'favorite' : ''}`}>
      {/* Якщо isFavorite === true, додаємо клас 'favorite', який малює жовту рамку */}
      <img src={game.img} alt={game.name} />
      <h3>{game.name}</h3>
      <p><strong>Жанр:</strong> {game.genre}</p>
      <p><strong>Рейтинг:</strong> {game.rating}/10</p>
      
      <button 
        className="fav-btn" 
        onDoubleClick={handleDoubleClick}
        style={{ backgroundColor: isFavorite ? '#d4af37' : '#1f6feb' }}
      >
        {isFavorite ? '⭐ В улюблених' : 'Подвійний клік: Улюблена'}
      </button>
    </article>
  );
};

const initialGames = [
  { id: 1, name: "Dota 2", genre: "MOBA", rating: 9.5, img: "/img/dota2.jpg" },
  { id: 2, name: "Counter-Strike 2", genre: "Шутер", rating: 9.2, img: "/img/cs2.jpg" },
  { id: 3, name: "Squad", genre: "Тактичний шутер", rating: 9.0, img: "/img/squad.jpg" },
  { id: 4, name: "The Witcher 3", genre: "RPG", rating: 9.8, img: "/img/witcher3.jpg" },
  { id: 5, name: "Cyberpunk 2077", genre: "RPG", rating: 8.5, img: "/img/cyberpunk2077.jpg" },
  { id: 6, name: "Apex Legends", genre: "Королівська битва", rating: 8.8, img: "/img/Apex-Legends.jpg" }
];

function Games() {
  const [games, setGames] = useState(initialGames);

  // Функція сортування за рейтингом (від найбільшого до найменшого)
  const sortGamesByRating = () => {
    const sorted = [...games].sort((a, b) => b.rating - a.rating);
    setGames(sorted);
  };

  return (
    <section className="page-section active-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Доступні ігри</h2>
        <button onClick={sortGamesByRating} style={{ width: 'auto', marginTop: '0' }}>
          Сортувати за рейтингом ⭐
        </button>
      </div>
      
      <div className="grid-container">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </section>
  );
}

export default Games;