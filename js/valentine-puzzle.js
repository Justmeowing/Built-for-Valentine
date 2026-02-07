const puzzle = document.getElementById("puzzle");

const SIZE = 320;
const GRID = 3;
const PIECE_SIZE = SIZE / GRID;
const SNAP_DISTANCE = 20;

let placedCount = 0;

/* ---------- CREATE PIECES ---------- */

for (let y = 0; y < GRID; y++) {
  for (let x = 0; x < GRID; x++) {
    const piece = document.createElement("div");
    piece.className = "piece";

    piece.dataset.correctX = x * PIECE_SIZE;
    piece.dataset.correctY = y * PIECE_SIZE;

    piece.style.backgroundPosition =
      `-${x * PIECE_SIZE}px -${y * PIECE_SIZE}px`;

    randomizePosition(piece);
    enableDrag(piece);

    puzzle.appendChild(piece);
  }
}

/* ---------- RANDOM START ---------- */

function randomizePosition(piece) {
  const max = SIZE - PIECE_SIZE;
  piece.style.left = Math.random() * max + "px";
  piece.style.top = Math.random() * max + "px";
}

/* ---------- DRAG ---------- */

function enableDrag(piece) {
  let offsetX = 0;
  let offsetY = 0;

  piece.addEventListener("pointerdown", (e) => {
    piece.setPointerCapture(e.pointerId);
    offsetX = e.clientX - piece.offsetLeft;
    offsetY = e.clientY - piece.offsetTop;
  });

  piece.addEventListener("pointermove", (e) => {
    if (!piece.hasPointerCapture(e.pointerId)) return;

    piece.style.left = e.clientX - offsetX + "px";
    piece.style.top = e.clientY - offsetY + "px";
  });

  piece.addEventListener("pointerup", () => {
    snapIfClose(piece);
  });
}

/* ---------- SNAP ---------- */

function snapIfClose(piece) {
  const correctX = Number(piece.dataset.correctX);
  const correctY = Number(piece.dataset.correctY);

  const dx = Math.abs(piece.offsetLeft - correctX);
  const dy = Math.abs(piece.offsetTop - correctY);

  if (dx < SNAP_DISTANCE && dy < SNAP_DISTANCE) {
    piece.style.left = correctX + "px";
    piece.style.top = correctY + "px";
    piece.style.pointerEvents = "none";

    placedCount++;

    if (placedCount === GRID * GRID) {
      setTimeout(finishPuzzle, 600);
    }
  }
}

/* ---------- COMPLETE ---------- */

function finishPuzzle() {
  puzzle.style.transition = "transform 0.6s ease";
  puzzle.style.transform = "scale(1.05)";

  setTimeout(() => {
    window.location.href = "valentine-game.html";
  }, 800);
}