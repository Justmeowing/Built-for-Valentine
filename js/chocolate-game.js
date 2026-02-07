const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const winState = document.getElementById("winState");
const nextBtn = document.getElementById("nextBtn");

let score = 0;
let timeLeft = 30;
let chocolates = [];
let running = true;

/* MOVE BASKET */
function moveBasket(x) {
  const maxX = gameArea.offsetWidth - basket.offsetWidth;
  const clamped = Math.max(0, Math.min(x, maxX));
  basket.style.left = clamped + "px";
}

gameArea.addEventListener("touchmove", e => {
  const rect = gameArea.getBoundingClientRect();
  moveBasket(e.touches[0].clientX - rect.left);
});

gameArea.addEventListener("mousemove", e => {
  const rect = gameArea.getBoundingClientRect();
  moveBasket(e.clientX - rect.left);
});

/* SPAWN CHOCOLATES */
function spawnChocolate() {
  if (!running) return;

  const c = document.createElement("div");
  c.className = "choco";
  c.style.left =
    Math.random() * (gameArea.offsetWidth - 20) + "px";
  c.style.top = "-20px";

  gameArea.appendChild(c);
  chocolates.push({ el: c, y: -20 });
}

setInterval(spawnChocolate, 800);

/* GAME LOOP */
function loop() {
  if (!running) return;

  const basketRect = basket.getBoundingClientRect();

  chocolates.forEach((c, i) => {
    c.y += 3;
    c.el.style.top = c.y + "px";

    const rect = c.el.getBoundingClientRect();

    // CATCH
    if (
      rect.bottom > basketRect.top &&
      rect.left < basketRect.right &&
      rect.right > basketRect.left
    ) {
      score++;
      scoreEl.textContent = score;
      c.el.remove();
      chocolates.splice(i, 1);
    }

    // REMOVE IF FALLS
    if (c.y > gameArea.offsetHeight) {
      c.el.remove();
      chocolates.splice(i, 1);
    }
  });

  requestAnimationFrame(loop);
}

loop();

/* TIMER */
const timerInterval = setInterval(() => {
  timeLeft--;
  timerEl.textContent = timeLeft + "s";

  if (timeLeft <= 0) {
    endGame();
  }
}, 1000);

/* END */
function endGame() {
  running = false;
  clearInterval(timerInterval);

  gameArea.classList.add("hidden");
  winState.classList.remove("hidden");
}

/* NEXT */
nextBtn.addEventListener("click", () => {
  localStorage.setItem("unlockedDay", "3");
  window.location.href = "../lesson/lesson-03.html";
});