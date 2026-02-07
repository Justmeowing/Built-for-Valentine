document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("cardGrid");
  const winState = document.getElementById("winState");
  const nextBtn = document.getElementById("nextBtn");

  if (!grid || !winState || !nextBtn) {
    console.error("Rose game DOM missing");
    return;
  }

  const images = [
    "rose-red.png",
    "rose-pink.png",
    "rose-blue.png",
    "rose-yellow.png"
  ];

  const cards = [...images, ...images].sort(() => Math.random() - 0.5);

  let firstCard = null;
  let lock = false;
  let matches = 0;

  cards.forEach(img => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">
          <img src="../assets/games/rose/${img}" />
        </div>
        <div class="card-face card-back">
          <img src="../assets/games/rose/card-back.png" />
        </div>
      </div>
    `;

    card.addEventListener("click", () => handleFlip(card, img));
    grid.appendChild(card);
  });

  function handleFlip(card, img) {
    if (lock || card.classList.contains("flipped")) return;

    card.classList.add("flipped");

    if (!firstCard) {
      firstCard = { card, img };
      return;
    }

    lock = true;

    if (firstCard.img === img) {
      card.classList.add("matched");
      firstCard.card.classList.add("matched");
      matches++;
      reset();

      if (matches === images.length) finishGame();
    } else {
      setTimeout(() => {
        card.classList.remove("flipped");
        firstCard.card.classList.remove("flipped");
        reset();
      }, 900);
    }
  }

  function reset() {
    firstCard = null;
    lock = false;
  }

  function finishGame() {
    setTimeout(() => {
      grid.classList.add("hidden");
      winState.classList.remove("hidden");
    }, 600);
  }

  nextBtn.addEventListener("click", () => {
    window.location.href = "../lesson/lesson-01.html";
  });
});