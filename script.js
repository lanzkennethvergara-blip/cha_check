
/* =====================================
   PERSONALIZE YOUR GREETING CARD
===================================== */

const letter = `i just wanted to remind you that you're doing better than you think.

even on the days when everything feels a little too much, i hope you remember how special you are. you make ordinary moments feel beautiful just by being you.

i hope life is gentle with you. i hope you find reasons to smile even on the hardest days, and i hope you never forget how much you deserve to be loved.

thank you for being someone worth knowing, someone worth keeping, and someone who makes this world feel a little warmer.

if i could give you one thing, it would be the ability to see yourself through my eyes. maybe then, you'd understand just how wonderful you really are.`;

const specialDate = new Date("2026-12-25T00:00:00");
const countdownTitle = "until our special day ♡";


/* =====================================
   SCREEN NAVIGATION
===================================== */

const screens = document.querySelectorAll(".screen");

function showScreen(id) {
    screens.forEach(screen => {
        screen.classList.toggle("active", screen.id === id);
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =====================================
   FLOATING GHOSTS, STARS AND HEARTS
===================================== */

const stars = document.getElementById("stars");

const decorations = [
    "♡", "♥", "✧", "★", "☾", "⋆", "👻"
];

function createHeart(x = Math.random() * 100) {
    const particle = document.createElement("span");

    particle.className = "heart-particle";
    particle.textContent =
        decorations[Math.floor(Math.random() * decorations.length)];

    particle.style.left = x + "%";
    particle.style.fontSize = (12 + Math.random() * 18) + "px";
    particle.style.animationDuration = (5 + Math.random() * 5) + "s";

    stars.appendChild(particle);

    particle.addEventListener("animationend", () => {
        particle.remove();
    });
}

setInterval(() => {
    if (document.hidden) return;

    if (stars.childElementCount < 20) {
        createHeart();
    }
}, 700);

function heartBurst(amount = 20) {
    for (let i = 0; i < amount; i++) {
        setTimeout(() => {
            createHeart(10 + Math.random() * 80);
        }, i * 60);
    }
}


/* =====================================
   OPEN THE ENVELOPE
===================================== */

const openBtn = document.getElementById("openBtn");
const envelope = document.getElementById("envelope");
const hint = document.getElementById("hint");

let envelopeOpened = false;

openBtn.addEventListener("click", () => {
    if (envelopeOpened) return;

    envelopeOpened = true;
    envelope.classList.add("open");
    openBtn.disabled = true;
    hint.textContent = "a little surprise awaits... ♡";

    heartBurst(12);

    setTimeout(() => {
        showScreen("letterScreen");
        startTyping();
    }, 900);
});


/* =====================================
   LETTER TYPING ANIMATION
===================================== */

const typedText = document.getElementById("typedText");
const cursor = document.getElementById("cursor");
const skipTyping = document.getElementById("skipTyping");
const toMemories = document.getElementById("toMemories");

let typingIndex = 0;
let typingTimer = null;
let typingFinished = false;

function startTyping() {
    if (typingTimer || typingFinished) return;

    typingIndex = 0;
    typedText.textContent = "";

    skipTyping.classList.remove("hidden");
    cursor.classList.remove("hidden");

    typeNextCharacter();
}

function typeNextCharacter() {
    if (typingIndex >= letter.length) {
        finishTyping();
        return;
    }

    typedText.textContent += letter[typingIndex];

    const character = letter[typingIndex];
    typingIndex++;

    let delay = 28;

    if ([".", "!", "?", ","].includes(character)) {
        delay = 180;
    } else if (character === "\n") {
        delay = 240;
    }

    typingTimer = setTimeout(() => {
        typingTimer = null;
        typeNextCharacter();
    }, delay);
}

function finishTyping() {
    clearTimeout(typingTimer);
    typingTimer = null;
    typingFinished = true;

    typedText.textContent = letter;

    cursor.classList.add("hidden");
    skipTyping.classList.add("hidden");
    toMemories.classList.remove("hidden");
}

skipTyping.addEventListener("click", finishTyping);

toMemories.addEventListener("click", () => {
    showScreen("memories");
    heartBurst(8);
});


/* =====================================
   PHOTO GALLERY FALLBACKS
===================================== */

document.querySelectorAll(".photo-card").forEach(card => {
    const img = card.querySelector("img");
    const placeholder = card.querySelector(".photo-placeholder");

    function showPlaceholder() {
        img.style.display = "none";
        placeholder.style.display = "grid";
    }

    img.addEventListener("error", showPlaceholder);

    if (img.complete && img.naturalWidth === 0) {
        showPlaceholder();
    }
});


/* =====================================
   SECRET MESSAGES
===================================== */

const secretButtons = document.querySelectorAll(".secret");
const secretMessage = document.getElementById("secretMessage");
const secretText = document.getElementById("secretText");
const closeSecret = document.getElementById("closeSecret");

secretButtons.forEach(button => {
    button.addEventListener("click", () => {
        secretText.textContent = button.dataset.message;

        secretMessage.classList.remove("hidden");

        heartBurst(5);

        secretMessage.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});

closeSecret.addEventListener("click", () => {
    secretMessage.classList.add("hidden");
});


/* =====================================
   LIVE COUNTDOWN
===================================== */

document.getElementById("countdownLabel").textContent =
    countdownTitle;

const countdownFields = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
};

function updateCountdown() {
    const difference = specialDate.getTime() - Date.now();

    if (Number.isNaN(specialDate.getTime())) {
        document.getElementById("countdownLabel").textContent =
            "please enter a valid date in script.js ♡";
        return;
    }

    if (difference <= 0) {
        Object.values(countdownFields).forEach(field => {
            field.textContent = "00";
        });

        document.getElementById("countdownLabel").textContent =
            "our special day is here! ♡";

        return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    countdownFields.days.textContent = String(days).padStart(2, "0");
    countdownFields.hours.textContent = String(hours).padStart(2, "0");
    countdownFields.minutes.textContent = String(minutes).padStart(2, "0");
    countdownFields.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =====================================
   FINAL SURPRISE
===================================== */

const toFinal = document.getElementById("toFinal");
const revealBtn = document.getElementById("revealBtn");
const finalMessage = document.getElementById("finalMessage");
const gift = document.getElementById("gift");

toFinal.addEventListener("click", () => {
    showScreen("final");
    heartBurst(12);
});

revealBtn.addEventListener("click", () => {
    finalMessage.classList.remove("hidden");
    revealBtn.classList.add("hidden");
    gift.classList.add("hidden");

    heartBurst(35);

    setTimeout(() => {
        finalMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 150);
});


/* =====================================
   RESTART EVERYTHING
===================================== */

document.getElementById("restartBtn").addEventListener("click", () => {
    clearTimeout(typingTimer);

    typingTimer = null;
    typingIndex = 0;
    typingFinished = false;

    typedText.textContent = "";
    cursor.classList.remove("hidden");

    toMemories.classList.add("hidden");
    skipTyping.classList.add("hidden");
    secretMessage.classList.add("hidden");
    finalMessage.classList.add("hidden");

    revealBtn.classList.remove("hidden");
    gift.classList.remove("hidden");

    envelopeOpened = false;
    envelope.classList.remove("open");
    openBtn.disabled = false;
    hint.textContent = "tap the envelope to open it";

    showScreen("home");
    heartBurst(8);
});


/* =====================================
   BACKGROUND MUSIC
===================================== */

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", async () => {
    if (!musicPlaying) {
        try {
            await music.play();

            musicPlaying = true;
            musicBtn.textContent = "♫ music on";
        } catch (error) {
            musicBtn.textContent = "♫ add music.mp3";
        }
    } else {
        music.pause();

        musicPlaying = false;
        musicBtn.textContent = "♫ music off";
    }
});

music.addEventListener("error", () => {
    musicPlaying = false;
    musicBtn.textContent = "♫ music off";
});

music.addEventListener("pause", () => {
    musicPlaying = false;
    musicBtn.textContent = "♫ music off";
});

music.addEventListener("play", () => {
    musicPlaying = true;
    musicBtn.textContent = "♫ music on";
});
