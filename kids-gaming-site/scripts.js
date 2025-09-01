document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        fetch('data/branding.json').then(res => res.json()),
        fetch('data/theme.json').then(res => res.json()),
        fetch('data/games.json').then(res => res.json())
    ]).then(([brandingData, theme, gamesData]) => {
        const branding = brandingData.brand;
        const games = gamesData;

        // Apply Theme
        const root = document.documentElement;
        root.style.setProperty('--primary', theme.colors.primary);
        root.style.setProperty('--accent', theme.colors.accent);
        root.style.setProperty('--bg', theme.colors.background);
        root.style.setProperty('--text', theme.colors.text);
        root.style.setProperty('--font', theme.font);

        // Apply Branding
        document.querySelector('link[rel="icon"]').href = branding.logo.favicon;
        document.getElementById('logo').src = branding.logo.title;
        document.getElementById('tagline').textContent = games.tagline;
        
        const contactEmail = document.getElementById('contact-email');
        contactEmail.href = `mailto:${branding.email}`;
        contactEmail.textContent = branding.email;

        const socialMediaContainer = document.getElementById('social-media-links');
        for (const [key, value] of Object.entries(branding.socialMedia)) {
            const link = document.createElement('a');
            link.href = value;
            link.textContent = key;
            link.style.margin = '0 5px';
            socialMediaContainer.appendChild(link);
        }

        // Populate Games
        const gamesContainer = document.getElementById('games-container');
        games.games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.innerHTML = `
                <img src="${game.thumb}" alt="${game.name}">
                <h3>${game.name}</h3>
                <p>${game.description}</p>
                <p>Difficulty: ${game.difficulty}</p>
                <a href="${game.url}">Play Now</a>
            `;
            gamesContainer.appendChild(gameCard);
        });

        // Countdown Timer
        // TODO: student exercise - Implement the countdown timer logic
        const countdownElement = document.getElementById('countdown');
        const countdownTarget = new Date(games.countdown).getTime();

        setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownTarget - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }, 1000);
    });
});
