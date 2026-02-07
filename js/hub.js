document.addEventListener("DOMContentLoaded", () => {
  const unlockedDay =
    parseInt(localStorage.getItem("unlockedDay"), 10) || 1;

  const routes = {
    1: "rose/rose-card.html",
    2: "proposal/proposal-card.html",
    3: "chocolate/chocolate-card.html",
    4: "teddy/teddy-card.html",
    5: "promise/promise-card.html",
    6: "hug/hug-card.html",
    7: "kiss/kiss-card.html",
    8: "valentine/valentine-card.html"
  };

  /* ---------- NORMAL ENVELOPES (1–7) ---------- */

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const day = parseInt(card.dataset.day, 10);

    if (day <= unlockedDay) {
      card.classList.remove("locked");
      card.classList.add("unlocked");

      const lock = card.querySelector(".lock");
      if (lock) lock.remove();

      card.style.pointerEvents = "auto";
      card.style.cursor = "pointer";

      card.addEventListener("click", () => {
        window.location.href = routes[day];
      });
    } else {
      card.style.pointerEvents = "none";
    }
  });

  /* ---------- VALENTINE HEART (DAY 8) ---------- */

  const heart = document.querySelector(".heart-wrapper");
  if (!heart) return;

  const heartDay = parseInt(heart.dataset.day, 10);

  if (heartDay <= unlockedDay) {
    heart.classList.remove("locked");

    const lock = heart.querySelector(".lock");
    if (lock) lock.remove();

    heart.style.pointerEvents = "auto";
    heart.style.cursor = "pointer";

    heart.addEventListener("click", () => {
      window.location.href = routes[8];
    });
  } else {
    heart.style.pointerEvents = "none";
    heart.style.cursor = "default";
  }
});