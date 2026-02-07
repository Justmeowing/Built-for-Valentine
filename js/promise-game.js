const gameArea = document.getElementById("gameArea");
const goal = document.getElementById("goal");
const ball = document.getElementById("ball");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const winState = document.getElementById("winState");
const nextBtn = document.getElementById("nextBtn");
const message = document.getElementById("message"); // small popup text

let score = 0;
let timeLeft = 30;
let running = true;
let isKicking = false;

/* --------------------
   GOAL MOVEMENT
-------------------- */
let goalX = 0;
let direction = 1;

function moveGoal() {
  if (!running) return;

  const maxX = gameArea.offsetWidth - goal.offsetWidth;
  goalX += direction * 4.5;

  if (goalX <= 0 || goalX >= maxX) {
    direction *= -1;
    goalX = Math.max(0, Math.min(goalX, maxX));
  }

  goal.style.left = goalX + "px";
  requestAnimationFrame(moveGoal);
}

moveGoal();

/* --------------------
   KICK BALL
-------------------- */
ball.addEventListener("click", () => {
  if (!running || isKicking) return;

  isKicking = true;
  hideMessage();

  const startTop = ball.offsetTop;
  const targetTop = goal.offsetTop + goal.offsetHeight - 6;

  ball.style.transition = "top 0.35s linear";
  ball.style.top = targetTop + "px";

  setTimeout(() => {
    checkGoal();
    resetBall(startTop);
  }, 350);
});

/* --------------------
   GOAL CHECK (FIXED)
-------------------- */
function checkGoal() {
  const ballCenter =
    ball.offsetLeft + ball.offsetWidth / 2;

  const goalLeft = goal.offsetLeft;
  const goalRight = goalLeft + goal.offsetWidth;

  if (ballCenter >= goalLeft && ballCenter <= goalRight) {
    score++;
    scoreEl.textContent = score;
    showMessage("GOAL ⚽");

    if (score >= 5) {
      setTimeout(() => endGame(true), 600);
    }
  } else {
    showMessage("Missed 😬");
  }
}

/* --------------------
   RESET BALL
-------------------- */
function resetBall(startTop) {
  setTimeout(() => {
    ball.style.transition = "none";
    ball.style.top = startTop + "px";
    isKicking = false;
  }, 150);
}

/* --------------------
   TIMER
-------------------- */
const timerInterval = setInterval(() => {
  if (!running) return;

  timeLeft--;
  timerEl.textContent = timeLeft + "s";

  if (timeLeft <= 0) {
    endGame(false);
  }
}, 1000);

/* --------------------
   END GAME
-------------------- */
function endGame(win) {
  running = false;
  clearInterval(timerInterval);

  gameArea.classList.add("hidden");

  if (win) {
    winState.classList.remove("hidden");
  } else {
    showMessage("Out of time ⏱️");
    setTimeout(() => location.reload(), 1200);
  }
}

/* --------------------
   MESSAGE POPUP
-------------------- */
function showMessage(text) {
  message.textContent = text;
  message.classList.add("show");
}

function hideMessage() {
  message.classList.remove("show");
}

/* --------------------
   NEXT
-------------------- */
nextBtn.addEventListener("click", () => {
  window.location.href = "../lesson/lesson-05.html";
});