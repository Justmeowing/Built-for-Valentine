const gameArea = document.getElementById("gameArea");
const teddy = document.getElementById("teddy");
const winState = document.getElementById("winState");
const nextBtn = document.getElementById("nextBtn");

let objects = [];
let running = true;

const GAME_DURATION = 20000;
const SPAWN_RATE = 800;

let fallSpeed = 2.5;

/* MOVE TEDDY */
function moveTeddy(x) {
  const maxX = gameArea.offsetWidth - teddy.offsetWidth;
  const clamped = Math.max(0, Math.min(x, maxX));
  teddy.style.left = clamped + "px";
}

gameArea.addEventListener("touchmove", e => {
  const rect = gameArea.getBoundingClientRect();
  moveTeddy(e.touches[0].clientX - rect.left);
});

gameArea.addEventListener("mousemove", e => {
  const rect = gameArea.getBoundingClientRect();
  moveTeddy(e.clientX - rect.left);
});

/* SPAWN OBJECT */
function spawnObject() {
  if (!running) return;

  const obj = document.createElement("div");
  obj.className = "fall";
  obj.style.left =
    Math.random() * (gameArea.offsetWidth - 22) + "px";
  obj.style.top = "-30px";

  gameArea.appendChild(obj);
  objects.push(obj);
}

setInterval(spawnObject, SPAWN_RATE);

/* GAME LOOP */
function loop() {
  if (!running) return;

  const teddyRect = teddy.getBoundingClientRect();

  objects.forEach((obj, index) => {
    let y = parseFloat(obj.dataset.y || "-30");
    y += fallSpeed;
    obj.dataset.y = y;
    obj.style.top = y + "px";

    const objRect = obj.getBoundingClientRect();

    // FAIR COLLISION (center only)
    const dx =
      (objRect.left + objRect.width / 2) -
      (teddyRect.left + teddyRect.width / 2);
    const dy =
      (objRect.top + objRect.height / 2) -
      (teddyRect.top + teddyRect.height / 2);

    if (Math.sqrt(dx * dx + dy * dy) < 18) {
      endGame(false);
    }

    if (y > gameArea.offsetHeight) {
      obj.remove();
      objects.splice(index, 1);
    }
  });

  // gradual difficulty increase
  if (fallSpeed < 3.2) {
    fallSpeed += 0.0007;
  }

  requestAnimationFrame(loop);
}

loop();

/* END GAME */
setTimeout(() => {
  endGame(true);
}, GAME_DURATION);

function endGame(win) {
  if (!running) return;
  running = false;

  objects.forEach(o => o.remove());
  objects = [];

  if (win) {
    gameArea.classList.add("hidden");
    winState.classList.remove("hidden");
  } else {
    alert("He didn’t make it. Try again.");
    location.reload();
  }
}

/* NEXT */
nextBtn.addEventListener("click", () => {
  window.location.href = "../lesson/lesson-06.html";
});