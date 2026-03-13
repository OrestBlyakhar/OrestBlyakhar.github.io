import React, { useState } from 'react';

// Компонент картки турніру
const TournamentCard = ({ title, game, date, conditions, onOpenModal }) => {
  return (
    <article className="tournament-card">
      <h3>{title}</h3>
      <p className="game-tag">{game}</p>
      <p><strong>Дата:</strong> {date}</p>
      <p><strong>Умови участі:</strong> {conditions}</p>
      <button className="reg-btn" onClick={() => onOpenModal(game)}>Зареєструватися</button>
    </article>
  );
};

function Tournaments() {
  // Стан для видимості модального вікна
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Стан для запам'ятовування, на яку саме гру натиснув користувач
  const [selectedGame, setSelectedGame] = useState('');

  // Функція для відкриття вікна
  const openModal = (gameName) => {
    setSelectedGame(gameName);
    setIsModalOpen(true);
  };

  // Функція для закриття вікна
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Обробка відправки форми
  const handleSubmit = (e) => {
    e.preventDefault();
    const teamName = e.target['team-name'].value;
    alert(`Команда "${teamName}" успішно зареєстрована на турнір!`);
    closeModal(); // Закриваємо вікно після успішної реєстрації
  };

  return (
    <section className="page-section active-section">
      <h2>Майбутні турніри</h2>
      <div className="grid-container">
        <TournamentCard 
          title="Зимовий кубок 2026" 
          game="Counter-Strike 2" 
          date="15.02.2026 - 20.02.2026" 
          conditions="Допускаються лише команди з 5 гравців. Обов'язкова наявність прайм-статусу у всіх учасників."
          onOpenModal={openModal}
        />
        <TournamentCard 
          title="Весняний чемпіонат 2026" 
          game="Dota 2" 
          date="10.03.2026 - 15.03.2026" 
          conditions="Команди з 5 гравців. Кожен гравець повинен мати рейтинг не нижче 3000."
          onOpenModal={openModal}
        />
      </div>

      {/* Вікно малюється тільки якщо isModalOpen === true */}
      {isModalOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close-btn" onClick={closeModal}>&times;</span>
            <h2>Реєстрація на турнір</h2>
            <form id="tournament-form" onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="team-name">Назва команди:</label>
                <input type="text" id="team-name" placeholder="Наприклад: Natus Vincere" required />
              </div>

              <div className="form-group">
                <label htmlFor="game-select">Оберіть дисципліну:</label>
                <select 
                  id="game-select" 
                  required 
                  defaultValue={selectedGame === "Counter-Strike 2" ? "cs2" : selectedGame === "Dota 2" ? "dota2" : ""}
                >
                  <option value="" disabled>Оберіть гру...</option>
                  <option value="cs2">Counter-Strike 2</option>
                  <option value="dota2">Dota 2</option>
                  <option value="squad">Squad</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="captain-email">Email капітана:</label>
                <input type="email" id="captain-email" placeholder="captain@example.com" required />
              </div>

              <div className="form-group">
                <label htmlFor="discord-tag">Discord капітана:</label>
                <input type="text" id="discord-tag" placeholder="Наприклад: player#1234" required />
              </div>

              <div className="form-group">
                <label htmlFor="avg-rank">Середній рейтинг команди (MMR/Elo):</label>
                <input type="number" id="avg-rank" placeholder="Наприклад: 5000" min="0" max="15000" required />
              </div>

              <div className="form-checkbox">
                <input type="checkbox" id="rules-agree" required />
                <label htmlFor="rules-agree">Підтверджую, що всі учасники команди ознайомлені з правилами турніру.</label>
              </div>
              
              <button type="submit" className="submit-btn">Підтвердити участь</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Tournaments;