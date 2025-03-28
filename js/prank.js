document.addEventListener("DOMContentLoaded", function () {
    startPrank();
});

function startPrank() {
    playAudio();
    window.addEventListener("scroll", playAudio);
    window.addEventListener("mousemove", playAudio);
    window.addEventListener("click", playAudio);
    window.addEventListener("touchstart", playAudio);
    window.addEventListener("keydown", playAudio);
    window.addEventListener("resize", () => {
        stopText();
        removeText();
        spawnTextOnResize();
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
        spawnText(10); // Spawn fewer texts for small screens (e.g., phones)
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
    const targetDate = new Date("2025-04-11T13:15:00"); // Local time

    const interval = setInterval(() => {
        const now = new Date(); // Local time
        const timeLeft = targetDate - now;

        if (timeLeft <= 52000) { // 10 seconds before the end
            document.getElementById("backgroundAudio").pause();
            finalAudio.play();

            // Stop finalAudio after 52 seconds
            setTimeout(() => {
                finalAudio.pause();
                finalAudio.currentTime = 0;
            }, 52000);
        }

        if (timeLeft <= 0) {
            clearInterval(interval);
            document.getElementById("countdown").style.display = "none";
            document.getElementById("message").style.display = "block";
            triggerFireworks();
            stopText();
            removeText();
        } else {
            // Update the countdown
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

function triggerFireworks() {
    document.body.style.backgroundImage = "url('fireworks.gif')";
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
