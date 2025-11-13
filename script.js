// ----- MATRIX EFFECT -----
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()".split("");
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px 'Share Tech Mono', monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 99);

// ----- SEQUENCE LOGIC -----
const content = document.getElementById("content");
const sequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, "??", "??"]; // Fibonacci? 

function showInitialScreen() {
  content.innerHTML = `
    <h1>Access Terminal</h1>
    <p>Press start to begin simulation.</p>
    <button id="startBtn">Start</button>
  `;
  document.getElementById("startBtn").addEventListener("click", startSequence);
}

function startSequence() {
  let index = 0;

  const showNext = () => {
    if (index < sequence.length) {
      content.innerHTML = `<p class="number fade">${sequence[index]}</p>`;
      index++;
      setTimeout(showNext, 2000);
    } else {
      // After sequence ends, return to start screen after a brief pause
      setTimeout(showInitialScreen, 500);
    }
  };

  showNext();
}

// Initialize the first screen
showInitialScreen();
