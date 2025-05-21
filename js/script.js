document.addEventListener('DOMContentLoaded', async () => { // Added async here
    const girlfriendNameElement = document.querySelectorAll('.girlfriend-name');
    const mainHeading = document.getElementById('main-heading');
    const subHeading = document.getElementById('sub-heading');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const apologyPopup = document.getElementById('apology-popup');
    const loveYouPopup = document.getElementById('love-you-popup');
    const closeApologyPopup = document.querySelector('.close-popup');
    const closeLovePopup = document.querySelector('.close-love-popup');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const backgroundMusic = document.getElementById('background-music');
    const heartsBackground = document.getElementById('hearts-background');
    const cuteGifTop = document.getElementById('cute-gif-top');
    const responseGifContainer = document.getElementById('response-gif-container');
    const responseGif = document.getElementById('response-gif');

    let girlfriendName = "My Love"; // Default name
    let noClickCount = 0;
    let musicPlaying = false;
    let noButtonResponses = []; // Initialize as empty, will be filled by fetch

    // --- URL for the specific "No" response GIF ---
    const specificNoResponseGifUrl = "......gif";

    // --- Tenor GIF URLs (For initial cute GIF) ---
    const cuteGifUrls = [
        "https://media3.giphy.com/media/qQdL532ZANbjy/giphy.gif?cid=6c09b952kak5o1f6oiwuigm2epv8u0dglgcauhcvj7atn0co&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g",
        "https://media3.giphy.com/media/qQdL532ZANbjy/giphy.gif?cid=6c09b952kak5o1f6oiwuigm2epv8u0dglgcauhcvj7atn0co&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g", // Example different cute gif
        "https://media3.giphy.com/media/qQdL532ZANbjy/giphy.gif?cid=6c09b952kak5o1f6oiwuigm2epv8u0dglgcauhcvj7atn0co&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" // Example different cute gif
    ];
    // --- End Tenor GIF URLs ---

    // Function to fetch quotes from JSON
    async function loadNoButtonResponses() {
        try {
            const response = await fetch('no_quotes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            noButtonResponses = await response.json();
            console.log("Successfully loaded 'No' button responses.");
        } catch (error) {
            console.error("Could not load 'No' button responses:", error);
            // Fallback responses if JSON loading fails
            noButtonResponses = [
                "No? Are you sure? 🥺 (Error loading quotes)",
                "Really? Try again! 🤔 (Error loading quotes)"
            ];
        }
    }

    await loadNoButtonResponses(); // Wait for quotes to be loaded

    // Get girlfriend's name from URL
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get('name');
    if (nameFromUrl) {
        girlfriendName = nameFromUrl.trim();
    }

    girlfriendNameElement.forEach(el => el.textContent = girlfriendName);
    document.title = `A Special Question For ${girlfriendName} ❤️`;

    // --- Typing Effect ---
    const mainQuestionText = `Will you be my Valentine, ${girlfriendName}?`;
    let charIndex = 0;
    function typeMainQuestion() {
        if (charIndex < mainQuestionText.length) {
            mainHeading.innerHTML += mainQuestionText.charAt(charIndex);
            charIndex++;
            setTimeout(typeMainQuestion, 100);
        } else {
            subHeading.textContent = `I've been waiting to ask you this, ${girlfriendName}! Choose wisely... or don't, it's all fun! 😉`;
            cuteGifTop.src = cuteGifUrls[Math.floor(Math.random() * cuteGifUrls.length)];
            cuteGifTop.style.display = 'block';
        }
    }

    // --- Floating Heart Particles ---
    function createHeartParticle() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
        heart.style.animationDelay = `${Math.random() * 3}s`;
        const colors = ['var(--heart-color)', '#ff758f', '#ffb3c1'];
        heart.style.setProperty('--particle-color', colors[Math.floor(Math.random() * colors.length)]);
        // heart.style.color = colors[Math.floor(Math.random() * colors.length)]; // Already set by --particle-color
        heartsBackground.appendChild(heart);
        heart.addEventListener('animationend', () => heart.remove());
    }
    for(let i = 0; i < 15; i++) createHeartParticle();
    setInterval(createHeartParticle, 1000);

    // --- Button Logic ---
    yesButton.addEventListener('click', () => {
        loveYouPopup.style.display = 'flex';
        loveYouPopup.classList.add('show');
        document.getElementById('love-you-message').innerHTML = `I LOVE YOU, ${girlfriendName}!!! ❤️❤️❤️`;
        confetti({
            particleCount: 250,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff8fab', '#f76a8c', '#ffdde1', '#ffffff', '#ffc0cb']
        });
        if(musicPlaying) backgroundMusic.play().catch(e => console.error("Error playing music on yes:", e));
        responseGifContainer.style.display = 'none'; // Hide "No" GIF container
    });

    noButton.addEventListener('click', () => {
        noClickCount++;

        // Use the specific GIF for "No" responses
        responseGif.src = specificNoResponseGifUrl;
        responseGifContainer.style.display = 'block';

        // Check if all quotes have been shown, then show apology.
        // The original (20 + 100) = 120. We can use noButtonResponses.length or a fixed number.
        // Let's use a fixed number as per your original logic for when the apology shows up.
        const apologyThreshold = 120; // Or use noButtonResponses.length if you want it after all unique quotes.

        if (noClickCount >= apologyThreshold && noButtonResponses.length > 0) { // Ensure responses are loaded
            apologyPopup.style.display = 'flex';
            apologyPopup.classList.add('show');
            const apologyLottie = document.getElementById('apology-lottie');
            if(apologyLottie && typeof apologyLottie.play === 'function') apologyLottie.play();
            noButton.textContent = "Okay, I'm sorry! 🥺";
            // noButton.disabled = true; // Optionally disable after apology
            return;
        }

        let responseText = "No? Really? 🥺"; // Default fallback
        if (noButtonResponses.length > 0) {
            // Cycle through the loaded responses
            responseText = noButtonResponses[(noClickCount -1) % noButtonResponses.length];
        }
        
        noButton.textContent = responseText.replace("<NAME>", girlfriendName);

        const effects = ['evade', 'colorChange', 'sizeChange', 'shapeChange', 'opacityChange'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];

        noButton.className = 'no-button-base-class'; // Reset classes
        noButton.removeAttribute('style'); // Reset inline styles

        switch (randomEffect) {
            case 'evade':
                noButton.classList.add('no-button-evade');
                const xOffset = (Math.random() - 0.5) * 60; // Increased evasion range
                const yOffset = (Math.random() - 0.5) * 40; // Increased evasion range
                noButton.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                setTimeout(() => noButton.classList.remove('no-button-evade'), 300);
                break;
            case 'colorChange':
                const randomHexColor = () => `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
                noButton.style.backgroundColor = randomHexColor();
                noButton.style.color = Math.random() > 0.5 ? 'white' : 'black';
                break;
            case 'sizeChange':
                const sizes = ['no-button-tiny', 'no-button-huge'];
                noButton.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
                break;
            case 'shapeChange':
                noButton.classList.add('no-button-square'); // Make it more distinct
                break;
            case 'opacityChange':
                noButton.style.opacity = Math.random() * 0.4 + 0.2; // Make it fainter
                break;
        }

        const currentYesFontSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
        yesButton.style.fontSize = `${Math.min(currentYesFontSize * 1.08, 60)}px`; // Cap max font size
        const currentYesPadding = parseFloat(window.getComputedStyle(yesButton).paddingLeft);
        yesButton.style.padding = `${Math.min(currentYesPadding * 1.03, 30)}px ${Math.min(currentYesPadding * 1.06, 45)}px`; // Cap padding

        setTimeout(() => {
            noButton.style.opacity = '1'; // Ensure it's visible after effects
        }, 300);
    });

    closeApologyPopup.addEventListener('click', () => {
        apologyPopup.classList.remove('show');
        setTimeout(() => apologyPopup.style.display = 'none', 400);
    });
    closeLovePopup.addEventListener('click', () => {
        loveYouPopup.classList.remove('show');
        setTimeout(() => loveYouPopup.style.display = 'none', 400);
    });

    // --- Music Toggle ---
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            backgroundMusic.pause();
            musicIcon.textContent = '🎵';
        } else {
            backgroundMusic.play().catch(error => console.error("Music play failed:", error));
            musicIcon.textContent = '🎶';
        }
        musicPlaying = !musicPlaying;
    });
    // Autoplay attempt for music on first interaction
    document.body.addEventListener('click', () => {
        if (!musicPlaying && backgroundMusic.paused) {
            // backgroundMusic.play().catch(error => console.error("Music autoplay on interaction failed:", error));
            // musicPlaying = true; // Let user control via toggle mostly
            // musicIcon.textContent = '🎶';
        }
    }, { once: true });

    // --- Dev Tools Blocking (Basic) ---
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.onkeydown = function (e) {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
            return false;
        }
    };

    // --- Initial Setup Calls ---
    typeMainQuestion();

    function preloadGifs(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    preloadGifs([...cuteGifUrls, specificNoResponseGifUrl]); // Preload the specific "no" GIF

    console.log(`Hey ${girlfriendName}, this page was made with ❤️ for you! Hope you like it! 😉`);
});

