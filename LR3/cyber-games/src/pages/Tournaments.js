import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const TournamentCard = ({ title, game, date, conditions, onOpenModal }) => (
  <article className="tournament-card">
    <h3>{title}</h3>
    <p className="game-tag">{game}</p>
    <p><strong>Дата:</strong> {date}</p>
    <p><strong>Умови:</strong> {conditions}</p>
    <button className="reg-btn" onClick={() => onOpenModal(game)}>Зареєструватися</button>
  </article>
);

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState('');
  const [user] = useAuthState(auth);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000); // Зникає через 3 секунди
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const teamName = e.target['team-name'].value;
    showToast(`Успіх! Команда "${teamName}" зареєстрована!`); // Замість alert
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchTournaments = async () => {
      const querySnapshot = await getDocs(collection(db, "tournaments"));
      setTournaments(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchTournaments();
  }, []);

  const openModal = (gameName) => {
    if (!user) return showToast("Увійдіть у профіль, щоб подати заявку на турнір!", "error");
    setIsModalOpen(true);
  };

  return (
    <section className="page-section active-section">
      <h2>Майбутні турніри</h2>
      <div className="grid-container">
        {tournaments.map(t => (
          <TournamentCard key={t.id} {...t} onOpenModal={openModal} />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h2>Реєстрація на турнір</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Назва команди:</label>
                <input type="text" id="team-name" required />
              </div>
              <button type="submit" className="submit-btn">Підтвердити участь</button>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast-container">
          <div className={`toast-item ${toast.type}`}>
            <span>{toast.message}</span>
            <span className="toast-close-btn" onClick={() => setToast(null)}>&times;</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default Tournaments;