import React, { useState, useEffect } from 'react';

function Profile() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Додали ім'я для реєстрації
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Стан користувача тепер беремо з пам'яті браузера
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  // Перевіряємо, чи юзер вже логінився раніше
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogout = () => {
    // Видаляємо токен і дані юзера при виході
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setEmail('');
    setPassword('');
  };

  const handleAuthAction = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return showToast('Введіть пошту та пароль!', 'error');
    }

    // Визначаємо кінцеву точку та дані для запиту в залежності від режиму (вхід чи реєстрація)
    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
    // Якщо реєстрація, передаємо ще й ім'я
    const bodyData = isLoginMode ? { email, password } : { email, password, name };

    try {
      // Відправляємо запит на сервер для входу або реєстрації
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });

      const data = await response.json();

      if (!response.ok) {
        // Якщо сервер повернув помилку, показуємо її в тості
        return showToast(data.message, 'error');
      }

      // Якщо все успішно, зберігаємо JWT токен та юзера в браузері
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      showToast(isLoginMode ? 'Успішний вхід!' : 'Реєстрація успішна!', 'success');
      
    } catch (err) {
      showToast('Помилка з\'єднання з сервером', 'error');
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

      <h2>Профіль гравця</h2>

      {user ? (
        <div className="profile-info">
          {/* Генеруємо першу літеру імені або пошти */}
          <div style={{ 
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            backgroundColor: '#58a6ff', 
            color: '#0d1117', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            fontSize: '36px', 
            fontWeight: 'bold', 
            margin: '0 auto 15px',
            textTransform: 'uppercase'
          }}>
            {(user.name || user.email).charAt(0)}
          </div>
          <h3>{user.name || user.email}</h3>
          <p>Email: {user.email}</p>
          <p>Статус: <span style={{ color: '#3fb950' }}>Авторизовано</span></p>
          <button onClick={handleLogout} className="submit-btn" style={{ backgroundColor: '#da3633', marginTop: '20px' }}>
            Вийти з акаунту
          </button>
        </div>
      ) : (
        <form onSubmit={handleAuthAction} className="auth-form" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h3>{isLoginMode ? 'Вхід в систему' : 'Реєстрація'}</h3>
          
          {!isLoginMode && (
            <div className="form-group">
              <label>Нікнейм:</label>
              <input 
                type="text" 
                placeholder="Gamer2026" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
              />
            </div>
          )}

          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              placeholder="gamer@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label>Пароль:</label>
            <input 
              type="password" 
              placeholder="Мінімум 6 символів" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button type="submit" className="submit-btn" style={{ width: '100%' }}>
            {isLoginMode ? 'Увійти' : 'Створити акаунт'}
          </button>
          
          <p style={{ marginTop: '15px', textAlign: 'center', cursor: 'pointer', color: '#58a6ff' }} onClick={() => setIsLoginMode(!isLoginMode)}>
            {isLoginMode ? 'Немає акаунту? Зареєструйтесь' : 'Вже є акаунт? Увійдіть'}
          </p>
        </form>
      )}
    </section>
  );
}

export default Profile;