const arena = document.getElementById("arena");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const winState = document.getElementById("winState");
const nextBtn = document.getElementById("nextBtn");

let score = 0;
let timeLeft = 30;
const GOAL = 12;

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";

  const img = document.createElement("img");
  img.src = "../assets/icons/heart.png";
  heart.appendChild(img);

  const maxX = arena.clientWidth - 40;
  const maxY = arena.clientHeight - 40;

  heart.style.left = Math.random() * maxX + "px";
  heart.style.top = Math.random() * maxY + "px";

  heart.onclick = () => {
    score++;
    scoreEl.textContent = `Hearts: ${score}`;
    heart.remove();

    if (score >= GOAL) endGame();
  };

  arena.appendChild(heart);

  setTimeout(() => heart.remove(), 1200);
}

const spawnInterval = setInterval(spawnHeart, 700);

const timerInterval = setInterval(() => {
  timeLeft--;
  timerEl.textContent = `Time: ${timeLeft}s`;

  if (timeLeft <= 0) endGame();
}, 1000);

function endGame() {
  clearInterval(spawnInterval);
  clearInterval(timerInterval);

  if (score >= GOAL) {
    // pass score & time if you want
    window.location.href = "kiss-win.html";
  }
}