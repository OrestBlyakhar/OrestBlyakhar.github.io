import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

// Функція для відображення аватара
const UserAvatar = ({ user }) => {
  if (user.photoURL) {
    return <img src={user.photoURL} alt="Avatar" className="user-photo" style={{ display: 'block', margin: '0 auto 15px auto' }} />;
  }
  const initial = (user.displayName || user.email || "G")[0].toUpperCase();
  return (
    <div className="avatar-placeholder" style={{ margin: '0 auto 15px auto' }}>
      {initial}
    </div>
  );
};

// Функція для перекладу помилок Firebase
const getFriendlyErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-email': return 'Неправильний формат email-адреси.';
    case 'auth/user-not-found': return 'Користувача з такою поштою не знайдено.';
    case 'auth/wrong-password': return 'Неправильний пароль.';
    case 'auth/invalid-credential': return 'Неправильний email або пароль.';
    case 'auth/email-already-in-use': return 'Ця пошта вже зареєстрована в системі.';
    case 'auth/weak-password': return 'Пароль занадто легкий (мінімум 6 символів).';
    case 'auth/missing-password': return 'Будь ласка, введіть пароль.';
    default: return 'Сталася помилка. Перевірте дані та спробуйте ще раз.';
  }
};

function Profile() {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoginMode, setIsLoginMode] = useState(true); 
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogout = () => {
    signOut(auth);
    setEmail('');       // Видаляємо пошту з пам'яті
    setPassword('');    // Видаляємо пароль з пам'яті
    setErrorMsg('');    // Прибираємо помилки
  };

  // Обробник помилок для авторизації
  const handleAuthAction = () => {
    setErrorMsg(''); // Очищаємо попередню помилку перед новим запитом

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Будь ласка, обов\'язково введіть email та пароль.');
      return; // Зупиняємо функцію, щоб не відправляти пусті дані у Firebase
    }

    if (!isLoginMode && password.length < 6) {
      setErrorMsg('Для надійності пароль має містити мінімум 6 символів.');
      return;
    }

    if (isLoginMode) {
      // Логіка ВХОДУ
      signInWithEmailAndPassword(auth, email, password)
        .catch(err => setErrorMsg(getFriendlyErrorMessage(err.code)));
    } else {
      // Логіка РЕЄСТРАЦІЇ
      createUserWithEmailAndPassword(auth, email, password)
        .catch(err => setErrorMsg(getFriendlyErrorMessage(err.code)));
    }
  };

  const handleGoogleLogin = () => {
    setErrorMsg('');
    signInWithPopup(auth, googleProvider)
      .catch(err => setErrorMsg("Помилка входу через Google."));
  };

  // Якщо користувач АВТОРИЗОВАНИЙ (профіль)
  if (user) {
    return (
      <section className="page-section active-section">
        <h2>Мій профіль</h2>
        <div className="stats-card" style={{ maxWidth: '450px', margin: '0 auto', textAlign: 'center' }}>
          <UserAvatar user={user} />
          <h3>Привіт, {user.displayName || user.email.split('@')[0]}!</h3>
          <p style={{ color: '#8b949e' }}>Тепер ти можеш оцінювати ігри та реєструвати команди.</p>
          <button onClick={handleLogout} style={{ backgroundColor: '#da3633', marginTop: '20px' }}>Вийти з акаунту</button>
        </div>
      </section>
    );
  }

  // Якщо користувач ГІСТЬ (форма входу/реєстрації)
  return (
    <section className="page-section active-section">
      <div className="modal-content" style={{ maxWidth: '400px', margin: '40px auto', display: 'block' }}>
        
        {/* Динамічний заголовок */}
        <h2 style={{ textAlign: 'center', border: 'none', marginBottom: '20px' }}>
          {isLoginMode ? 'Вхід до системи' : 'Створення акаунту'}
        </h2>
        
        <button onClick={handleGoogleLogin} className="google-btn" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          {isLoginMode ? 'Увійти через Google' : 'Зареєструватися через Google'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#30363d' }}></div>
          <span style={{ margin: '0 10px', color: '#8b949e', fontSize: '12px' }}>АБО ПОШТОЮ</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#30363d' }}></div>
        </div>

        {/* Блок з помилкою (з'являється тільки якщо errorMsg не пустий) */}
        {errorMsg && (
          <div className="error-box">
            {errorMsg}
          </div>
        )}

        <div className="form-group">
          <label>Email:</label>
          <input type="email" placeholder="gamer@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label>Пароль:</label>
          <input type="password" placeholder="Мінімум 6 символів" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {/* Динамічна кнопка дії */}
        <button onClick={handleAuthAction} className="submit-btn" style={{ width: '100%', backgroundColor: isLoginMode ? '#238636' : '#1f6feb', margin: 0 }}>
          {isLoginMode ? 'Увійти' : 'Зареєструватися'}
        </button>

        {/* Перемикач режимів */}
        <p className="toggle-mode-text">
          {isLoginMode ? "Ще немає профілю? " : "Вже є акаунт? "}
          <span 
            className="toggle-mode-link" 
            onClick={() => {
              setIsLoginMode(!isLoginMode); // Змінюємо режим
              setErrorMsg(''); // Очищаємо помилки при перемиканні
            }}
          >
            {isLoginMode ? 'Створити акаунт' : 'Увійти'}
          </span>
        </p>

      </div>
    </section>
  );
}

export default Profile;