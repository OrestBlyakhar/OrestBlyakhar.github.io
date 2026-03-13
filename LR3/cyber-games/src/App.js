import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Games from './pages/Games';
import Tournaments from './pages/Tournaments';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <header>
        <div className="header-content">
          <h1>Кіберспорт & Онлайн Ігри</h1>
          <nav>
            <ul id="nav-menu">
              <li><Link to="/" className="nav-link">Ігри</Link></li>
              <li><Link to="/tournaments" className="nav-link">Турніри</Link></li>
              <li><Link to="/profile" className="nav-link">Мій профіль</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Games />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <footer>
        <p>Контактна інформація:</p>
        <p>Адреса: вул. Мазепи, 10, м. Львів</p>
        <p>Телефон: +380 44 123 4567 | Електронна пошта: info@onlinegames.ua</p>
        <p>© 2026 Організація онлайн-ігор</p>
      </footer>
    </Router>
  );
}

export default App;