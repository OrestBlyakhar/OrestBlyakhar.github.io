const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Хостинг статичних файлів сайту
app.use(express.static(path.join(__dirname, 'public')));

// === Middleware для перевірки токена ===
const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Немає доступу. Будь ласка, увійдіть в акаунт.' });
  }
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Недійсний токен' });
  }
};



// 1. Реєстрація
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Ця пошта вже зареєстрована' });

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name: name || email.split('@')[0] }
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ token, user: { userId: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

// 2. Вхід
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Користувача не знайдено' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Неправильний пароль' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { userId: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Помилка сервера' });
  }
});



// Отримання всіх ігор разом із середнім рейтингом та оцінкою поточного юзера
// Отримання всіх ігор разом із середнім рейтингом та оцінкою поточного юзера
app.get('/api/games', async (req, res) => {
  try {
    // Читаємо токен, щоб безпечно ідентифікувати користувача
    let userId = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId; // Розшифровуємо id з токена
      } catch (err) {
        // Якщо токена немає або він недійсний — ігноруємо
      }
    }

    const games = await prisma.game.findMany({
      include: { ratings: true }
    });

    const gamesWithAverage = games.map(game => {
      const totalRatings = game.ratings.length;
      const sum = game.ratings.reduce((acc, curr) => acc + curr.value, 0);
      const average = totalRatings === 0 ? 0 : Math.round((sum / totalRatings) * 10) / 10;
      
      let currentUserRating = 0;
      // Якщо юзер залогінений, шукаємо його рейтинг для цієї гри
      if (userId) {
        const myRating = game.ratings.find(r => r.userId === userId);
        if (myRating) currentUserRating = myRating.value;
      }

      return {
        id: game.id,
        name: game.name,
        genre: game.genre,
        img: game.img,
        rating: average,
        userRating: currentUserRating, 
        totalVotes: totalRatings
      };
    });

    res.json(gamesWithAverage);
  } catch (err) {
    res.status(500).json({ message: 'Помилка отримання ігор' });
  }
});

// Додавання/оновлення рейтингу (тільки для авторизованих)
app.post('/api/games/:id/rate', authenticate, async (req, res) => {
  try {
    const gameId = parseInt(req.params.id);
    const { value } = req.body;
    const userId = req.userId;

    const rating = await prisma.rating.upsert({
      where: {
        userId_gameId: { userId, gameId }
      },
      update: { value }, 
      create: { value, userId, gameId } 
    });

    res.json({ message: 'Рейтинг успішно збережено!', rating });
  } catch (err) {
    res.status(500).json({ message: 'Помилка при збереженні рейтингу' });
  }
});

// Отримання турнірів
app.get('/api/tournaments', async (req, res) => {
  try {
    const tournaments = await prisma.tournament.findMany({
      include: { teams: true } // Підтягуємо зареєстровані команди
    });
    res.json(tournaments);
  } catch (err) {
    res.status(500).json({ message: 'Помилка завантаження турнірів' });
  }
});

// Реєстрація команди на турнір
app.post('/api/tournaments/:id/register', authenticate, async (req, res) => {
  try {
    const tournamentId = parseInt(req.params.id);
    const { name, discord, rating } = req.body;

    const newTeam = await prisma.team.create({
      data: { name, discord, rating: parseInt(rating), tournamentId }
    });

    res.status(201).json({ message: 'Команду успішно зареєстровано!', team: newTeam });
  } catch (err) {
    res.status(500).json({ message: 'Помилка реєстрації команди' });
  }
});

const PORT = process.env.PORT || 5000;

// SPA fallback – усі невідомі маршрути повертають index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Сервер працює на порту ${PORT}`));