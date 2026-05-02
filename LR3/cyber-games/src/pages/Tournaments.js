import React, { useState, useEffect } from 'react';

const TournamentCard = ({ id, title, game, date, conditions, teams, onOpenModal }) => (
  <article className="tournament-card">
    <h3>{title}</h3>
    <p className="game-tag">{game}</p>
    <p><strong>Дата:</strong> {date}</p>
    <p><strong>Умови:</strong> {conditions}</p>
    <p style={{color: '#58a6ff', fontSize: '14px', margin: '10px 0'}}>
      Вже зареєстровано команд: {teams ? teams.length : 0}
    </p>
    <button className="reg-btn" onClick={() => onOpenModal(id, game)}>Зареєструватися</button>
  </article>
);

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [selectedTournamentId, setSelectedTournamentId] = useState(null);
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tournaments');
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const openModal = (tournamentId, gameName) => {
    if (!user) {
      return showToast("Увійдіть у профіль, щоб подати заявку на турнір!", "error");
    }
    setSelectedTournamentId(tournamentId);
    setSelectedGame(gameName);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamData = {
      name: e.target['team-name'].value,
      discord: e.target['discord'].value,
      rating: e.target['rating'].value
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/tournaments/${selectedTournamentId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(teamData)
      });

      if (response.ok) {
        showToast(`Успіх! Команду "${teamData.name}" зареєстровано!`, 'success');
        setIsModalOpen(false);
        fetchTournaments(); // Оновлюємо список, щоб змінилась кількість команд
      } else {
        showToast("Помилка реєстрації", "error");
      }
    } catch (err) {
      showToast("Помилка сервера", "error");
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

      <h2>Майбутні турніри</h2>
      {tournaments.length === 0 ? (
        <p style={{textAlign: 'center'}}>Турнірів поки немає. Додайте їх у Prisma Studio.</p>
      ) : (
        <div className="grid-container">
          {tournaments.map(t => (
            <TournamentCard key={t.id} {...t} onOpenModal={openModal} />
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content" style={{ maxWidth: '450px' }}>
            <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2 style={{ border: 'none', textAlign: 'center' }}>Заявка на турнір</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Назва команди:</label>
                <input type="text" id="team-name" required />
              </div>
              <div className="form-group">
                <label>Дисципліна:</label>
                <input type="text" value={selectedGame} disabled style={{opacity: 0.7}} />
              </div>
              <div className="form-group">
                <label>Discord капітана:</label>
                <input type="text" id="discord" required />
              </div>
              <div className="form-group">
                <label>Рейтинг команди:</label>
                <input type="number" id="rating" required />
              </div>
              <button type="submit" className="submit-btn" style={{ width: '100%', marginTop: '15px' }}>Відправити заявку</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Tournaments;