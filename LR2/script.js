const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active-section'));

        this.classList.add('active');
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).classList.add('active-section');

        if (targetId === 'profile') {
            animateProgress();
        }
    });
});


const allGames = [
    { name: "Cyberpunk 2077", genre: "RPG", img: "/img/cyberpunk2077.jpg" },
    { name: "Apex Legends", genre: "Королівська битва", img: "/img/Apex-Legends.jpg" },
    { name: "Elden Ring", genre: "Action RPG", img: "/img/Elden-Ring.jpg" },
    { name: "Overwatch 2", genre: "Геройський шутер", img: "/img/overwatch2.jpg" },
    { name: "The Witcher 3", genre: "RPG", img: "/img/witcher3.jpg" }
]

const recommendedContainer = document.getElementById('recommended-games');
let gamesGenerated = 0;
const gamesToGenerate = 3;

while (gamesGenerated < gamesToGenerate) {
    const randomIndex = Math.floor(Math.random() * allGames.length);
    const game = allGames[randomIndex];

    const article = document.createElement('article');
    article.className = 'game-card';
    article.innerHTML = `
        <img src="${game.img}" alt="${game.name}">
        <h3>${game.name}</h3>
        <p><strong>Жанр:</strong>${game.genre}</p>
        <button class="fav-btn">Подвійний клік: Улюблена</button>
    `;

    recommendedContainer.appendChild(article);

    allGames.splice(randomIndex, 1);
    gamesGenerated++;
}


const favButtons = document.querySelectorAll('.fav-btn');

favButtons.forEach(button => {
    button.addEventListener('dblclick', function() {
        const card = this.closest('.game-card');

        card.classList.toggle('favorite');

        if (card.classList.contains('favorite')) {
            this.textContent = '⭐ В улюблених';
            this.style.backgroundColor = '#d4af37';
        } else {
            this.textContent = 'Подвійний клік: Улюблена';
            this.style.backgroundColor = '#1f6feb';
        }
    });
});

function animateProgress() {
    const progressBar = document.getElementById('animated-progress');
    const targetPercentage = 80;
    let width = 0;

    progressBar.style.width = '0%';

    const interval = setInterval(() => {
        if (width >= targetPercentage) {
            clearInterval(interval);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 15);
}

const modal = document.getElementById('reg-modal');
const regButtons = document.querySelectorAll('.reg-btn');
const closeBtn = document.querySelector('.close-btn');
const form = document.getElementById('tournament-form');

regButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const teamName = document.getElementById('team-name').value;
    alert(`Команда "${teamName}" успішно зареєстрована!`);
    modal.style.display = 'none';
    form.reset();
});