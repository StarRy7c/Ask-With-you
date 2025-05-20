document.addEventListener('DOMContentLoaded', () => {
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

    // --- Tenor GIF URLs (Replace with your own) ---
    const cuteGifUrls = [
        "https://tenor.com/view/bored-sad-gif-13914916832701961889", // Initial cute GIF
        "https://tenor.com/view/bored-sad-gif-13914916832701961889", // Another option
        "https://tenor.com/view/bored-sad-gif-13914916832701961889"
    ];
    const responseGifUrls = [ // GIFs for "No" button responses
        "https://tenor.com/view/bored-sad-gif-13914916832701961889",
        "https://tenor.com/view/bored-sad-gif-13914916832701961889",
        "https://tenor.com/view/bored-sad-gif-13914916832701961889",
        "https://tenor.com/view/bored-sad-gif-13914916832701961889",
        "https://tenor.com/view/bored-sad-gif-13914916832701961889"
    ];
    // --- End Tenor GIF URLs ---

    const noButtonResponses = [
        "No? Are you sure? 🥺", "Really? Try again! 🤔", "Aw, come on! 💔", "My heart... it's cracking! ραγισμένη καρδιά",
        "Don't do this to me! 😥", "Pretty please? 🙏", "I'll be sad! 😿", "Is that your final answer? 🧐",
        "You're breaking my code! 💻💥", "Okay, how about now? 😉", "Please, <NAME>? ✨", "I believe in us! 🥰",
        "One more chance? 😇", "This is tough love! ❤️‍🩹", "My circuits are fuzzy! 😵", "Maybe a typo? Click Yes! ✅",
        "You wouldn't... would you? 😨", "Don't make me cry! 😭", "Is this a test? 🧪", "I programmed this with love! ❤️",
        "Last chance, <NAME>! 🚨" // This is the 21st, so 20th click will trigger apology before this shows
    ];

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
            setTimeout(typeMainQuestion, 100); // Adjust typing speed here
        } else {
            subHeading.textContent = `I've been waiting to ask you this, ${girlfriendName}! Choose wisely... or don't, it's all fun! 😉`;
            // Show initial cute GIF after typing
            cuteGifTop.src = cuteGifUrls[Math.floor(Math.random() * cuteGifUrls.length)];
            cuteGifTop.style.display = 'block';
        }
    }

    // --- Floating Heart Particles ---
    function createHeartParticle() {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // Duration 5-10s
        heart.style.animationDelay = `${Math.random() * 3}s`; // Delay up to 3s
        
        // Randomly color hearts (optional)
        const colors = ['var(--heart-color)', '#ff758f', '#ffb3c1'];
        heart.style.setProperty('--particle-color', colors[Math.floor(Math.random() * colors.length)]);
        // Note: To use --particle-color, SVG must be embedded or CSS variable aware.
        // For simplicity, the SVG uses currentColor which will inherit from body or parent if not overridden.
        // Or, you can create multiple SVG files with different fills.
        // The provided SVG uses 'currentColor', so you'd set 'color' on .heart-particle.
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];


        heartsBackground.appendChild(heart);

        // Remove heart after animation to prevent DOM clutter
        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
    // Create initial hearts and then periodically
    for(let i = 0; i < 15; i++) createHeartParticle(); // Initial burst
    setInterval(createHeartParticle, 1000); // Add a new heart every second


    // --- Button Logic ---
    yesButton.addEventListener('click', () => {
        loveYouPopup.style.display = 'flex'; // Using flex for centering
        loveYouPopup.classList.add('show');
        document.getElementById('love-you-message').innerHTML = `I LOVE YOU, ${girlfriendName}!!!`;

        // Confetti!
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ff8fab', '#f76a8c', '#ffdde1', '#ffffff']
        });
        
        // Play success sound or change music (optional)
        if(musicPlaying) backgroundMusic.play(); // Ensure music is playing
        
        // Hide response GIF if it was shown
        responseGifContainer.style.display = 'none';
    });

    noButton.addEventListener('click', () => {
        noClickCount++;
        
        // Show a random response GIF
        responseGif.src = responseGifUrls[Math.floor(Math.random() * responseGifUrls.length)];
        responseGifContainer.style.display = 'block';

        if (noClickCount >= 20) {
            apologyPopup.style.display = 'flex'; // Using flex for centering
            apologyPopup.classList.add('show');
            const apologyLottie = document.getElementById('apology-lottie');
            if(apologyLottie) apologyLottie.play();
            noButton.textContent = "Okay, I'm sorry! 🥺"; // Final text before popup dominates
            // Optionally disable No button here, or hide it
            // noButton.disabled = true; 
            return; // Stop further 'No' button processing
        }

        // Change 'No' button text
        let responseText = noButtonResponses[noClickCount % noButtonResponses.length];
        noButton.textContent = responseText.replace("<NAME>", girlfriendName);

        // Apply random effects
        const effects = ['evade', 'colorChange', 'sizeChange', 'shapeChange', 'opacityChange'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];

        noButton.className = 'no-button-base-class'; // Reset classes (add a base class if you have one)
        noButton.removeAttribute('style'); // Clear inline styles for fresh effects

        switch (randomEffect) {
            case 'evade':
                noButton.classList.add('no-button-evade');
                // Move button randomly (subtle)
                const xOffset = (Math.random() - 0.5) * 50; // -25px to +25px
                const yOffset = (Math.random() - 0.5) * 30; // -15px to +15px
                noButton.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
                // Add class for wiggle animation
                noButton.classList.add('no-button-evade');
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
                noButton.classList.add('no-button-square');
                break;
            case 'opacityChange':
                noButton.style.opacity = Math.random() * 0.5 + 0.3; // Between 0.3 and 0.8
                break;
        }
        
        // Increase Yes button size slightly to encourage clicking it
        const currentYesFontSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
        yesButton.style.fontSize = `${currentYesFontSize * 1.05}px`;
        const currentYesPadding = parseFloat(window.getComputedStyle(yesButton).paddingLeft); // Assuming symmetrical padding
        yesButton.style.padding = `${currentYesPadding * 1.02}px ${currentYesPadding * 1.05}px`;


        // Ensure 'No' button is still clickable and visible
        setTimeout(() => {
            noButton.style.opacity = '1';
            // noButton.style.transform = 'translate(0,0)'; // Reset position if moved drastically
        }, 300);
    });

    closeApologyPopup.addEventListener('click', () => {
        apologyPopup.classList.remove('show');
        setTimeout(() => apologyPopup.style.display = 'none', 400); // Match transition duration
    });
    closeLovePopup.addEventListener('click', () => {
        loveYouPopup.classList.remove('show');
        setTimeout(() => loveYouPopup.style.display = 'none', 400);
    });

    // --- Music Toggle ---
    musicToggle.addEventListener('click', () => {
        if (musicPlaying) {
            backgroundMusic.pause();
            musicIcon.textContent = '🎵'; // Play icon
        } else {
            backgroundMusic.play().catch(error => console.error("Music play failed:", error)); // Autoplay might be blocked
            musicIcon.textContent = '🎶'; // Pause icon (music is playing)
        }
        musicPlaying = !musicPlaying;
    });
    // Attempt to play music once user interacts (some browsers require this)
    document.body.addEventListener('click', () => {
        if (!musicPlaying && backgroundMusic.paused) {
             // Enable this if you want first click anywhere to start music
            // backgroundMusic.play().then(() => musicPlaying = true).catch(e=>console.log("Auto play blocked"));
        }
    }, { once: true });


    // --- Dev Tools Blocking (Basic) ---
    // This is not foolproof but can deter casual attempts.
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.onkeydown = function (e) {
        // F12
        if (e.keyCode == 123) {
            return false;
        }
        // Ctrl+Shift+I
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        // Ctrl+Shift+C
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        // Ctrl+Shift+J
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        // Ctrl+U
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
            return false;
        }
    };

    // --- Initial Setup Calls ---
    typeMainQuestion(); // Start typing animation for the main question

    // Preload GIFs (optional, but can improve experience)
    function preloadGifs(urls) {
        urls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    preloadGifs([...cuteGifUrls, ...responseGifUrls]);

    console.log(`Hey ${girlfriendName}, this page was made with ❤️ for you! Hope you like it! 😉`);
});

                          
