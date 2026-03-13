import React from 'react';

// Компонент блоку статистики
const StatsBlock = ({ wins, losses, mvp }) => {
  return (
    <div className="stats-card">
      <h3>Особиста статистика</h3>
      <p>🏆 {wins} перемог / 💀 {losses} поразок</p>
      <p>🏅 Персональні нагороди: {mvp}</p>
    </div>
  );
};

function Profile() {
  return (
    <section className="page-section active-section">
      <h2>Мій профіль: gamer123</h2>
      <div className="profile-content">
        <StatsBlock wins={150} losses={45} mvp="MVP Зимового кубку 2025" />
        
        <div className="progress-container">
          <h3>Прогрес до наступної нагороди</h3>
          <p id="progress-text">Залишилося 5 ігор...</p>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;