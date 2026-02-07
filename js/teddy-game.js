const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const winState = document.getElementById("winState");
const nextBtn = document.getElementById("nextBtn");

/* ---------- RESIZE ---------- */

function resizeCanvas() {
  const scale = window.devicePixelRatio || 1;
  const width = Math.min(window.innerWidth - 32, 420);
  const height = width * (3 / 8);

  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ---------- GAME SETTINGS ---------- */

let gameSpeed = 2.3;
let distance = 0;
let score = 0;
const finishDistance = 2000;

/* ---------- GROUND ---------- */

function groundY() {
  return canvas.height / (window.devicePixelRatio || 1) - 22;
}

/* ---------- TEDDY ---------- */
/* slightly smaller + tighter hitbox */

const teddy = {
  x: 42,
  y: 0,
  size: 22,          // ⬅ reduced from 26
  vy: 0,
  gravity: 0.9,
  jumpPower: -12.5,  // slightly gentler jump
  jumping: false
};

function resetTeddy() {
  teddy.y = groundY() - teddy.size;
  teddy.vy = 0;
  teddy.jumping = false;
}

resetTeddy();

/* ---------- OBSTACLES ---------- */

let obstacles = [];
const MIN_GAP = 160;   // ⬅ minimum distance between obstacles
const MAX_GAP = 260;

function spawnObstacle() {
  const last = obstacles[obstacles.length - 1];
  const startX = last
    ? last.x + MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP)
    : canvas.width / (window.devicePixelRatio || 1) + 300;

  obstacles.push({
    x: startX,
    width: 14 + Math.random() * 8,   // ⬅ slightly smaller
    height: 22 + Math.random() * 14
  });
}

spawnObstacle();

/* ---------- INPUT ---------- */

canvas.addEventListener("pointerdown", jump);

function jump() {
  if (!teddy.jumping) {
    teddy.vy = teddy.jumpPower;
    teddy.jumping = true;
  }
}

/* ---------- DRAW ---------- */

function drawTeddy() {
  ctx.fillStyle = "#6b4f3f";
  ctx.beginPath();
  ctx.arc(
    teddy.x + teddy.size / 2,
    teddy.y + teddy.size / 2,
    teddy.size / 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function drawObstacles() {
  ctx.fillStyle = "#c7c7c7";
  obstacles.forEach(o => {
    ctx.fillRect(o.x, groundY() - o.height, o.width, o.height);
  });
}

function drawGround() {
  ctx.strokeStyle = "#ddd";
  ctx.beginPath();
  ctx.moveTo(0, groundY());
  ctx.lineTo(canvas.width, groundY());
  ctx.stroke();
}

function drawHUD() {
  ctx.fillStyle = "#555";
  ctx.font = "14px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("Distance", 12, 20);

  ctx.textAlign = "right";
  ctx.fillText(score + " m", canvas.width / (window.devicePixelRatio || 1) - 12, 20);
}

/* ---------- GAME LOOP ---------- */

let running = true;

function animate() {
  if (!running) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  distance += gameSpeed;
  score = Math.floor(distance / 10);

  drawGround();

  teddy.y += teddy.vy;
  teddy.vy += teddy.gravity;

  if (teddy.y >= groundY() - teddy.size) {
    resetTeddy();
  }

  drawTeddy();

  obstacles.forEach(o => (o.x -= gameSpeed));
  obstacles = obstacles.filter(o => o.x + o.width > 0);

  if (obstacles.length < 3) spawnObstacle();

  for (let o of obstacles) {
    if (
      teddy.x < o.x + o.width &&
      teddy.x + teddy.size > o.x &&
      teddy.y + teddy.size > groundY() - o.height
    ) {
      resetGame();
      return;
    }
  }

  drawObstacles();
  drawHUD();

  if (distance >= finishDistance) {
    endGame();
    return;
  }

  if (distance % 800 === 0) gameSpeed += 0.12; // smoother speed ramp

  requestAnimationFrame(animate);
}

/* ---------- RESET ---------- */

function resetGame() {
  distance = 0;
  score = 0;
  gameSpeed = 2.3;
  obstacles = [];
  resetTeddy();
  spawnObstacle();
  requestAnimationFrame(animate);
}

/* ---------- WIN ---------- */

function endGame() {
  running = false;
  canvas.classList.add("hidden");
  winState.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  window.location.href = "../lesson/lesson-04.html";
});

/* ---------- START ---------- */

animate();