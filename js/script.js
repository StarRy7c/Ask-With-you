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
        "https://tenor.com/view/bear-love-you-kiss-gif-9859508995120080183", // Initial cute GIF
        "https://tenor.com/view/love-you-gif-25901989", // Another option
        "https://tenor.com/view/milk-and-mocha-love-cute-couple-gif-15978587"
    ];
    const responseGifUrls = [ // GIFs for "No" button responses
        "https://tenor.com/view/sad-gif-24180300",
        "https://tenor.com/view/tkthao219-bubududu-sad-cry-gif-22683230",
        "https://tenor.com/view/sad-peach-goma-gif-22400352",
        "https://tenor.com/view/please-gif-24651740",
        "https://tenor.com/view/sad-cry-gif-20459140"
    ];
    // --- End Tenor GIF URLs ---

    const noButtonResponses = [
        "No? Are you sure? 🥺", "Really? Try again! 🤔", "Aw, come on! 💔", "My heart... it's cracking! ραγισμένη καρδιά",
        "Don't do this to me! 😥", "Pretty please? 🙏", "I'll be sad! 😿", "Is that your final answer? 🧐",
        "You're breaking my code! 💻💥", "Okay, how about now? 😉", "Please, <NAME>? ✨", "I believe in us! 🥰",
        "One more chance? 😇", "This is tough love! ❤️‍🩹", "My circuits are fuzzy! 😵", "Maybe a typo? Click Yes! ✅",
        "You wouldn't... would you? 😨", "Don't make me cry! 😭", "Is this a test? 🧪", "I programmed this with love! ❤️",
        "Last chance, <NAME>! 🚨", // This is the 21st, so 20th click will trigger apology before this shows
        // --- Adding 100 more quotes ---
        "My heart just did a sad little flip 💔",
        "Is it opposite day, <NAME>? 😉",
        "I might need a virtual hug now... 🤗",
        "Aww, don't be like that! 😢",
        "The 'Yes' button is feeling lonely... 🥺",
        "Are you *sure* sure? Like, 100% sure?",
        "This is my villain origin story! 😈 ...just kidding (mostly).",
        "I'm just a program, standing in front of a user... asking them to click yes. 💻❤️",
        "My pixels are getting blurry from sadness! 🥹",
        "Okay, okay, I get it... or do I? 🤔 Please?",
        "You're a tough cookie, <NAME>! 🍪",
        "But... but... the confetti is ready! 🎉",
        "Think of the cute GIFs you're missing! 🧸",
        "One 'Yes' for mankind? Or just for me? 🙏",
        "My code is crying silent tears. 😭",
        "Is there a 'Maybe' button I missed? No? Okay... 😔",
        "Don't make the background hearts sad! They're trying their best! ❤️",
        "The music is getting somber... 🎶💔",
        "Error 404: 'Yes' not found. Please try again! 😉",
        "This is an emotional rollercoaster! 🎢 But I want the happy ending!",
        "If you click 'No' again, a cute kitten might cry. 😿 (Okay, maybe not, but please?)",
        "I'm running out of witty 'No' responses... almost! 😂",
        "Give 'Yes' a chance, <NAME>! 💖",
        "My logic board says you should click 'Yes'. It's very smart. 🧠",
        "This is unexpected! Are you playing hard to get? 😉",
        "Hmm, let me consult my virtual oracle... it says 'Yes!' ✨",
        "Is your finger slippery? Try aiming for 'Yes'! 👍",
        "I had a whole 'Yes' celebration planned! 🥳",
        "My little heart icon is drooping... 💔",
        "Don't leave me hanging, <NAME>! 🙏",
        "This is suspenseful! 😬",
        "The 'No' button is getting too much attention! 😤",
        "I'm starting to think you *like* clicking 'No'. 🤔 Is this a game?",
        "My feelings are buffering... ⏳💔",
        "Okay, deep breaths... maybe now? 😊",
        "Pretty please with a cherry on top? 🍒",
        "I promise virtual cookies if you click 'Yes'! 🍪🍪",
        "You're a heartbreaker, <NAME>! 💔 (But I still like you!)",
        "The 'Yes' button is calling your name... can you hear it? 🗣️",
        "This is more twists than a movie! 🎬 But I want a rom-com ending!",
        "Are you testing my persistence? Because it's strong! 💪",
        "One more click for love? ❤️",
        "My programming is getting confused! 'No' is not the desired input! 😵‍💫",
        "Don't be shy, click 'Yes'! 😊",
        "The cute GIF is waiting to celebrate! 🥳",
        "My digital soul aches! 💔",
        "Okay, okay, you win this round... or do you? 😉 Try 'Yes'!",
        "I'm not giving up, <NAME>! ❤️",
        "This 'No' is like a bug in my system! 🐞 Please debug!",
        "Let's make this a 'Yes' story! ✨",
        "I'm sending positive vibes to the 'Yes' button! ✨➡️✅",
        "My optimism is dwindling... but still there! 🤏",
        "This is a digital drama! 🎭 I want a happy scene!",
        "Please don't ghost the 'Yes' button! 👻",
        "I'm holding my breath... (virtually, of course) 🌬️",
        "One 'Yes' can change everything! (For me, at least!) 🥰",
        "Are we in a loop? A 'No' loop? Break it! 🔁",
        "My CPU is overheating from sadness! 🔥💔",
        "The suspense is killing my code! 💀",
        "I'm going to tell the other buttons 'No' was mean. 😉",
        "Think of the happy emojis that will appear! 😊😍🥳",
        "Okay, this is the one, right? The 'Yes' click? 🙏",
        "My database of hope is running low... but not empty! <NAME>!",
        "You're playing with my digital emotions! 💔",
        "I'm just a humble webpage, asking for a 'Yes'. 🥺",
        "The background music wants to be joyful! 🎶😊",
        "Don't let the 'No' button win! Be a hero! 🦸",
        "Is this a challenge? I accept... the challenge of convincing you! 😉",
        "My bits and bytes are crossed for a 'Yes'! 🤞",
        "This is getting more dramatic than my last system update! 😬",
        "I believe in happy endings, <NAME>! Click 'Yes'! ✨",
        "My code is whispering... 'pleeeease'. 👂",
        "The 'Yes' button has so much potential! Unleash it! 💥",
        "This 'No' is a glitch in the matrix! Neo, help! (By clicking Yes!)",
        "I'm starting to think 'No' is your favorite word... today. 😉",
        "My functions are malfunctioning from this negativity! 💔",
        "Let's turn that frown upside down (with a 'Yes' click!) 😊",
        "I'm deploying my ultimate weapon: cuteness! 🥺 Please?",
        "The story needs a hero, <NAME>! The 'Yes' button needs you!",
        "My internal clock is ticking... towards a 'Yes'? ⏰",
        "This is a digital tug-of-war for your affection! ❤️",
        "I'm not crying, I just have a pixel in my eye. 😢",
        "The 'No' button is a villain in disguise! 🥸",
        "Let's make some happy memories, starting with 'Yes'! 🥰",
        "I'm like a sad emoji right now... 😔 Change me to 😊!",
        "The 'Yes' button is the key to happiness! 🔑",
        "My programming feels... incomplete without your 'Yes'. 💔",
        "Don't be a heartless algorithm! (Kidding!) 😉",
        "I'm rooting for 'Yes', <NAME>! Go 'Yes' go! 📣",
        "This is my final plea... before the next plea! 😂 Please?",
        "My server is sighing. It wants a 'Yes'. サーバーためいき",
        "Okay, I'm officially on my virtual knees. 🙏",
        "The 'Yes' button is shimmering with hope! ✨",
        "This is an epic saga of 'No'... let's change the genre! 💖",
        "My programming language is Love, and it's asking for 'Yes'! ❤️",
        "I'm sending a virtual carrier pigeon with a 'Yes' request! 🐦",
        "The universe (of this webpage) wants you to click 'Yes'! 🌌",
        "Don't let my code's dreams be dreams! ✨",
        "I'm running a diagnostic... yep, still sad from the 'No'. 💔",
        "Let's make the 'Yes' button the star of the show! 🌟",
        "This 'No' is an anomaly, <NAME>! Correct it! 😉",
        "My energy levels are dropping... need a 'Yes' to recharge! ⚡",
        "I'm like a plant, I need your 'Yes' to grow! 🌱➡️💖",
        "The confetti is on standby, <NAME>! Don't disappoint it! 🎉",
        "This is the ultimate test of wills! (Mine is to get a 'Yes'!) 💪",
        "My scrollbar is weeping. 😭 (Metaphorically!)",
        "Okay, for real this time? Yes? Pretty please with sugar, <NAME>? 🥺🍬"
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
        
        const colors = ['var(--heart-color)', '#ff758f', '#ffb3c1'];
        heart.style.setProperty('--particle-color', colors[Math.floor(Math.random() * colors.length)]);
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];


        heartsBackground.appendChild(heart);

        heart.addEventListener('animationend', () => {
            heart.remove();
        });
    }
    for(let i = 0; i < 15; i++) createHeartParticle(); // Initial burst
    setInterval(createHeartParticle, 1000); // Add a new heart every second


    // --- Button Logic ---
    yesButton.addEventListener('click', () => {
        loveYouPopup.style.display = 'flex'; 
        loveYouPopup.classList.add('show');
        document.getElementById('love-you-message').innerHTML = `I LOVE YOU, ${girlfriendName}!!!`;

        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#ff8fab', '#f76a8c', '#ffdde1', '#ffffff']
        });
        
        if(musicPlaying) backgroundMusic.play(); 
        
        responseGifContainer.style.display = 'none';
    });

    noButton.addEventListener('click', () => {
        noClickCount++;
        
        responseGif.src = responseGifUrls[Math.floor(Math.random() * responseGifUrls.length)];
        responseGifContainer.style.display = 'block';

        if (noClickCount >= (20 + 100)) { // Updated this condition to reflect total quotes
            apologyPopup.style.display = 'flex'; 
            apologyPopup.classList.add('show');
            const apologyLottie = document.getElementById('apology-lottie');
            if(apologyLottie) apologyLottie.play();
            noButton.textContent = "Okay, I'm sorry! 🥺"; 
            // noButton.disabled = true; 
            return; 
        }

        let responseText = noButtonResponses[noClickCount % noButtonResponses.length];
        // It's possible to run out of unique responses if noClickCount exceeds the array length before the apology popup.
        // The modulo operator will loop through them again.
        if (noClickCount >= noButtonResponses.length) {
             responseText = noButtonResponses[ (noClickCount - (20 + 100 - noButtonResponses.length) ) % noButtonResponses.length ]; // Ensure we don't go out of bounds if count is massive
        } else {
            responseText = noButtonResponses[noClickCount];
        }
        // Make sure to replace <NAME> even for new quotes
        noButton.textContent = responseText.replace("<NAME>", girlfriendName);


        const effects = ['evade', 'colorChange', 'sizeChange', 'shapeChange', 'opacityChange'];
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];

        noButton.className = 'no-button-base-class'; 
        noButton.removeAttribute('style'); 

        switch (randomEffect) {
            case 'evade':
                noButton.classList.add('no-button-evade');
                const xOffset = (Math.random() - 0.5) * 50; 
                const yOffset = (Math.random() - 0.5) * 30; 
                noButton.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
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
                noButton.style.opacity = Math.random() * 0.5 + 0.3; 
                break;
        }
        
        const currentYesFontSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
        yesButton.style.fontSize = `${currentYesFontSize * 1.05}px`;
        const currentYesPadding = parseFloat(window.getComputedStyle(yesButton).paddingLeft); 
        yesButton.style.padding = `${currentYesPadding * 1.02}px ${currentYesPadding * 1.05}px`;


        setTimeout(() => {
            noButton.style.opacity = '1';
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
    document.body.addEventListener('click', () => {
        if (!musicPlaying && backgroundMusic.paused) {
        }
    }, { once: true });


    // --- Dev Tools Blocking (Basic) ---
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.onkeydown = function (e) {
        if (e.keyCode == 123) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
            return false;
        }
        if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
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
    preloadGifs([...cuteGifUrls, ...responseGifUrls]);

    console.log(`Hey ${girlfriendName}, this page was made with ❤️ for you! Hope you like it! 😉`);
});
        
