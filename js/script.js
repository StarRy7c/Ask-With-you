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
        "https://media.tenor.com/ZB-ZjHPAKlgAAAAC/bee-honey-bee.gif", // Initial cute GIF
        "https://media.tenor.com/ZB-ZjHPAKlgAAAAC/bee-honey-bee.gif", // Another option
        "https://media.tenor.com/ZB-ZjHPAKlgAAAAC/bee-honey-bee.gif"
    ];
    const responseGifUrls = [ // GIFs for "No" button responses
        "https://media.tenor.com/ZB-ZjHPAKlgAAAAC/bee-honey-bee.gif",
        "https://media.tenor.com/ZB-ZjHPAKlgAAAAC/bee-honey-bee.gif",
        "https://media.tenor.com/ZB-ZjHPAKlgAAAAC/bee-honey-bee.gif",
        "https://media.tenor.com/ZB-ZjHPAKlgAAAAC/bee-honey-bee.gif",
        "https://media.tenor.com/ZB-ZjHPAKlgAAAAC/bee-honey-bee.gif"
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
  "No...? My heart skipped a beat... but not in a good way. 💔",
  "Ouch... that felt like a dagger to the soul. 🗡️",
  "Say yes... please? For the sake of love. 🥺❤️",
  "You're playing with my feelings now... 😢",
  "If you knew how much this meant to me... 😞",
  "Clicking no feels like you're walking away from me... again. 🚶‍♂️",
  "What did I do wrong? Tell me... I’ll fix it. 🥲",
  "Don't be so cold... I was warm just for you. ❄️🔥",
  "Please don't leave me hanging like this... 🪢",
  "I thought we had something special... didn't we? 💘",
  "Every no makes me a little smaller inside... 🧍‍♂️➡️🕳️",
  "Still no? I'm holding on by a thread. 🧵",
  "You don’t see the tears... but they’re real. 💧",
  "Was it something I said? Or didn’t say? 🤐",
  "Even the stars look dull tonight... 🌌",
  "This is starting to feel like rejection... 🥀",
  "Don’t break my code *and* my heart. 💻 + 💔",
  "Would a poem change your mind? Roses are red... 🌹",
  "I made this just for you... and you said no? 😭",
  "I imagined your yes... I felt it. Don’t erase that. 💭",
  "I’m not giving up... but you’re making it hard. 💪",
  "Do you hear that? It’s my hope falling. 📉",
  "I thought you were the one... now I’m not sure. 💭",
  "Please... don’t make me rewrite this whole page. 📝",
  "I have no backup plan for rejection... 🧃",
  "Are you testing me? Because I’m failing... 💢",
  "Every no makes the music sound sadder... 🎵➡️🖤",
  "I can’t process this response... system crashing. 🧠",
  "My smile is now a frown. ☹️",
  "You broke the 4th wall... and my heart. 🧱❤️",
  "Not the response I dreamed of... 😶‍🌫️",
  "You're not just a button click... you're everything. ❤️",
  "A part of me just wilted... like that houseplant I neglected. 🪴",
  "You wouldn’t do this if you saw my puppy eyes. 🐶",
  "I made cookies in this code. 🍪 Now they’re sad cookies.",
  "You said no again... my screen is fogging up with tears. 💻🌫️",
  "I’ve replayed your yes a thousand times in my head... 🧠",
  "This isn’t how love stories go... 📖",
  "I thought this was the moment... the big one... 🌅",
  "I asked with all my pixels... 💾",
  "That click echoed... in my soul. 🌌",
  "You can still say yes... there’s still time. ⏳",
  "I bet your finger slipped. Yes, right? Right...? 🥹",
  "Even the code wants you to say yes. Ask the console! 🧑‍💻",
  "This button doesn’t feel like a 'no' button anymore... 🪫",
  "Is this... the end? Or just a rough start? 💬",
  "Every 'no' adds another crack... 🪨➡️⚡",
  "I’ve waited so long... can’t we just be us now? 🕰️❤️",
  "You're making this bot cry. 🤖😭",
  "You're not just rejecting a line of code... it’s *me*. 🧍‍♂️",
  "Even the background music stopped in shock. 🎼❌",
  "One yes... that’s all I need to rewrite this love story. ✍️",
  "Why is your 'no' louder than my 'I love you'? 📢",
  "If I could rewrite reality, I'd put us together. 💫",
  "You know this isn’t just a website, right? It’s *my heart*. 🫀",
  "Okay... but what if I cry now? 😭",
  "Your 'no' is the villain in this romantic comedy. 🎬",
  "Come on... don't let the credits roll yet. 🎞️",
  "I practiced this proposal a thousand times. 🧠",
  "Even Milk & Mocha are disappointed. 🐻",
  "The GIFs were supposed to be persuasive... what went wrong? 🤷‍♂️",
  "This hurts more than spoilers. 📺",
  "You're the missing piece to my jigsaw soul. 🧩",
  "Every no is like walking barefoot on Lego. 🧱",
  "I'm just a sad little line of JavaScript now. 📉",
  "You could melt me with one yes. ☀️",
  "No? Again? This is emotional cardio now. 🫀",
  "You're so close to making this perfect... 🏁",
  "A 'yes' would be the sunshine I need. 🌞",
  "You can say yes, and we pretend you never said no. 🤫",
  "I believed in us... still do. 💘",
  "Tell me you’re kidding... this is a prank, right? 🎭",
  "My virtual heart has real feelings. 🩶",
  "I coded this with trembling fingers. 🤲",
  "I didn’t think you’d say no... not even once. 🥹",
  "Maybe if I blink enough, this becomes a yes? 👁️",
  "Would adding sparkles help? ✨ Yes? ✨",
  "Click yes and unlock a surprise... (it's love) ❤️",
  "I saved the best GIF for when you say yes. 💝",
  "Every 'no' makes my imaginary flowers wilt. 🌷➡️🥀",
  "You have no idea how much this means... 🫶",
  "You’re not just rejecting a button… you’re rejecting *us*. 😢",
  "Even the CSS is sad now. 🎨➡️🖤",
  "Can’t we just skip to the happy ending? 📖",
  "If love was a variable, it just got nullified. 🧮",
  "I can't debug this heartbreak... 🪛",
  "Please don't ghost me... even digitally. 👻",
  "There’s confetti waiting... you just need to click yes. 🎊",
  "You are the reason this page exists. Don’t say no to it. 🙏",
  "You’re not cold... right? Just confused? 🥶➡️❤️‍🔥",
  "I’m still hoping... still loving. Always. 💌",
  "This is not a gimmick... this is me. Being vulnerable. 🫣",
  "Clicking yes is free... but priceless to me. 💸❤️",
  "Let’s make this page our love story. 📜",
  "You’re worth every second of this wait. ⏱️",
  "This button cried when you said no... 🖲️😭",
  "I’m still here. Still loving. Still waiting. ❤️",
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
        
