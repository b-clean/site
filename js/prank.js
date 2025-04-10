document.addEventListener("DOMContentLoaded", function () {
    startPrank();
});

function startPrank() {
    playAudio();
    window.addEventListener("scroll", playAudio);
    window.addEventListener("mousemove", playAudio);
    window.addEventListener("click", playAudio);
    window.addEventListener("touchstart", playAudio, { passive: true });
    window.addEventListener("touchmove", playAudio, { passive: true });
    window.addEventListener("touchend", playAudio, { passive: true });
    window.addEventListener("keydown", playAudio);
    window.addEventListener("resize", () => {
        spawnTextOnResize(15);
        playAudio();
    });
    window.addEventListener("DOMContentLoaded", () => {
        spawnTextOnResize(15);
        playAudio();
    });

    // Adjust number of texts spawned based on screen width
    if (window.innerWidth > 800) {
        spawnText(40); // Spawn 100 texts for larger screens (e.g., desktops/tablets)
    }
    else if (window.innerWidth > 600) {
        spawnText(15); // Spawn 60 texts for medium screens (e.g., tablets)
    }
    else {
        spawnText(8); // Spawn fewer texts for small screens (e.g., phones)
    }
    startCountdown();
}


function playAudio() {
    const backgroundAudio = document.getElementById("backgroundAudio");
    backgroundAudio.volume = 1;
    backgroundAudio.loop = true; // Ensure looping
    backgroundAudio.play().catch(err => console.error("Audio playback failed", err));
}

function startCountdown() {
    const countdownElement = document.getElementById("countdown");
    const finalAudio = document.getElementById("finalAudio");
    const backgroundAudio = document.getElementById("backgroundAudio");
    const videoElement = document.getElementById("fullScreenVideo"); // Get video element
    const messageElement = document.getElementById("message");
    const targetDate = new Date("2025-04-11T09:00:00");

    const interval = setInterval(() => {
        const now = new Date();
        const timeLeft = targetDate - now;

        if (timeLeft <= 52000) { // 52 seconds before end
            backgroundAudio.pause();
            finalAudio.play();
        }

        if (timeLeft <= 0) {
            clearInterval(interval); // Stop countdown
            stopAllEvents(); // Stop everything
            removeAllElements(); // Remove all elements
        playAudio();

            //lauch firework
            launchFinalFireworks(); // Launch fireworks

            // Play video in fullscreen
            // videoElement.style.display = "block";
            // videoElement.requestFullscreen().catch(err => console.error("Fullscreen failed", err));
            // videoElement.play().catch(err => console.error("Video playback failed", err));
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

// Function to stop all event listeners and intervals
function stopAllEvents() {
    window.removeEventListener("scroll", playAudio);
    window.removeEventListener("mousemove", playAudio);
    window.removeEventListener("click", playAudio);
    window.removeEventListener("touchstart", playAudio);
    window.removeEventListener("keydown", playAudio);
    window.removeEventListener("resize", playAudio);
    clearInterval(textInterval); // Stop text spawning
}

// Function to remove all elements from the screen
function removeAllElements() {
    document.body.style.backgroundImage = "none"; // Remove fireworks
    document.getElementById("countdown")?.remove();
    document.getElementById("message")?.remove();
    document.querySelectorAll(".abi25").forEach(textElement => textElement.remove());
    document.getElementById("backgroundAudio")?.remove();
    document.getElementById("finalAudio")?.remove();
}



function triggerFireworks() {
    //document.body.style.backgroundImage = "url('fireworks.gif')";
    document.body.style.backgroundSize = "cover";
}

let textInterval;

// Function to spawn the text and let you control the initial number of texts
function spawnText(count) {
    const textVariations = ["ABI25"];
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700"];
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const sizes = ["1rem", "2rem", "3rem", "4rem", "5rem"]; // Array of possible sizes

    // Spawn a specified number of texts at the start
    for (let i = 0; i < count; i++) {
        const text = textVariations[Math.floor(Math.random() * textVariations.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const textElement = document.createElement("div");

        textElement.classList.add("abi25");
        textElement.style.color = color;

        // Random positioning
        textElement.style.top = Math.random() * (screenHeight - 50) + "px";
        textElement.style.left = Math.random() * (screenWidth - 100) + "px";
        textElement.innerText = text;

        // Set random size from the sizes array
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        textElement.style.fontSize = size;

        // Randomly assign an animation
        const animationType = Math.floor(Math.random() * 5); // 5 different types

        switch (animationType) {
            case 0:
                textElement.style.animation = "spin 3s infinite";
                break;
            case 1:
                textElement.style.animation = "jump 3s infinite";
                break;
            case 2:
                textElement.style.animation = "zoom 3s infinite";
                break;
            case 3:
                textElement.style.animation = "spinJump 3s infinite";
                break;
            case 4:
                textElement.style.animation = "zoomJump 3s infinite";
                break;
        }

        document.body.appendChild(textElement);
    }
}

// Stop spawning text (optional)
function stopText() {
    clearInterval(textInterval); // Stop spawning text
}

function removeText() {
    const textElements = document.querySelectorAll(".abi25");
    textElements.forEach(textElement => textElement.remove());
}

const names = ["Abbas A", "Abigael K", "Adam H", "Affaan R", "Dyami J", "Alexandra S", "Aliya Y", "Aminah Z", "Anas E", "Anna M", "Anto M", "Ari Y", "Arina P", "Arwin D", "Awin T",
    "Baha R", "Benjamin K",
    "Christopher T",
    "Danja T", "Dufayl A",
    "Elias J", "Elias W",
    "Felix H", "Fortina N",
    "Hamid L", "Hannah G",
    "Ibtissam H", "Isabella K",
    "Joanna S", "Josef I", "Josh B", "Julian K",
    "Len E", "Levy M", "Liam B", "Lorijan S",
    "Malaak S", "Malik E", "Malte B", "Mandus S", "Marc I", "Marcel A", "Marek W", "Mariam G", "Mariella T", "Matin S", "Max P", "Maya O", "Merle O", "Mette S", "Michael B", "Mihaela N", "Mirek K", "Mohamad A", "Moritz G",
    "Nel K", "Nina B", "Niobe Y", "Noah K", "Nuseiba B",
    "Ole C", "Ole S",
    "Rayan E", "Rengin D",
    "Sbaina Z", "Safa N", "Sami H", "Sami S", "Sarra B", "Sibel F", "Sophia E", "Soraya S",
    "Tim U",
    "Yannic N",
    "Zabilla A",];
const allowNameRepeats = false;
const repeatFactor = 2; // How many times to reuse a name if too few

function buildFireworkText(word = "ABI25") {
    const container = document.body;
    if (document.querySelector(".abi25-word")) return;

    // Get actual viewport dimensions
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const canvas = document.createElement("canvas");
    // More responsive canvas sizing
    canvas.width = viewportWidth * 0.9; // Remove the 800 limit
    canvas.height = viewportHeight * 0.6; // Increase from 0.4 to 0.6 for better visibility on mobile
    const ctx = canvas.getContext("2d");

    // Adjust margins for smaller screens
    const margin = viewportWidth < 600 ? 20 : 100;
    const safeZoneTop = viewportHeight * 0.2;    // Start higher up
    const safeZoneBottom = viewportHeight * 0.8; // Extend lower down

    // Adjust name text size for mobile
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flyIn {
            0% { 
                transform: translate(100vw, 100vh);
                opacity: 0;
            }
            100% { 
                transform: translate(0, 0);
                opacity: 1;
            }
        }
        .name-text {
            position: absolute;
            font-size: ${viewportWidth < 600 ? '1rem' : '1.5rem'};
            color: white;
            text-shadow: 0 0 5px #000;
            animation: flyIn 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
    `;
    document.head.appendChild(style);

    // Create positions array for names
    const namePositions = [];

    // Generate random non-overlapping positions
    for (let i = 0; i < names.length; i++) {
        let x, y;
        let overlap;
        do {
            x = margin + Math.random() * (viewportWidth - 2 * margin);
            y = Math.random() * viewportHeight;
            // Avoid middle section where ABI25 will be
            if (y > safeZoneTop && y < safeZoneBottom) {
                y = Math.random() < 0.5 ? y - safeZoneTop : y + (viewportHeight - safeZoneBottom);
            }
            overlap = namePositions.some(pos =>
                Math.abs(pos.x - x) < 80 && Math.abs(pos.y - y) < 80
            );
        } while (overlap);

        namePositions.push({ x, y });
    }

    // Spawn names one by one
    names.forEach((name, index) => {
        setTimeout(() => {
            const nameElement = document.createElement("span");
            nameElement.className = "name-text";
            nameElement.innerText = name;
            nameElement.style.left = `${namePositions[index].x}px`;
            nameElement.style.top = `${namePositions[index].y}px`;
            container.appendChild(nameElement);
        }, index * 200); // Adjust this value to control name spawn speed

        // When last name is placed, start the ABI25 effect
        if (index === names.length - 1) {
            setTimeout(() => {
                drawStarText(word, container);
            }, 1000); // Adjust this value to control delay before ABI25 appears
        }
    });
}

function drawStarText(word, container) {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const canvas = document.createElement("canvas");
    canvas.width = viewportWidth * 0.9; // Remove the 800 limit
    canvas.height = viewportHeight * 0.6; // Increase from 0.4 to 0.6 for better visibility on mobile
    const ctx = canvas.getContext("2d");

    // Adjust font size based on screen size
    const fontSize = viewportWidth < 600 ? 100 : 200;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = "white";
    ctx.fillText(word, canvas.width / 2, canvas.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const step = viewportWidth < 600 ? 10 : 15; // Smaller step size for mobile
    const offsetX = (viewportWidth - canvas.width) / 2;
    const offsetY = (viewportHeight - canvas.height) / 2;

    const textContainer = document.createElement("div");
    textContainer.className = "star-text-container";
    textContainer.style.position = "absolute";
    textContainer.style.left = "0";
    textContainer.style.top = "0";
    textContainer.style.width = "100%";
    textContainer.style.height = "100%";
    textContainer.style.pointerEvents = "none";
    textContainer.style.zIndex = "9999";
    container.appendChild(textContainer);

    for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
            const index = (y * canvas.width + x) * 4;
            if (imageData[index + 3] > 128) {
                const star = document.createElement("span");
                star.className = "star-text";
                star.innerText = "★";
                star.style.position = "absolute";
                star.style.left = `${offsetX + x}px`;
                star.style.top = `${offsetY + y}px`;
                star.style.fontSize = "1rem";
                star.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
                star.style.opacity = "0";
                star.style.animation = `fadeIn 0.5s ${Math.random() * 0.5}s forwards`;
                textContainer.appendChild(star);
            }
        }
    }
}

function launchFinalFireworks() {
    // First launch the text effect
    buildFireworkText("ABI25");

    // Then launch the fireworks with a slight delay
    setTimeout(() => {
        for (let i = 0; i < 7; i++) {
            setTimeout(() => {
                const x = Math.random() * (window.innerWidth - 200) + 100;
                launchFirework(x);
            }, i * 1000);
        }
    }, 500); // Half second delay after text appears
}

