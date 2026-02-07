document.addEventListener("DOMContentLoaded", () => {
  const flip = document.getElementById("flip");
  const readyBtn = document.getElementById("readyBtn");

  let flipped = false;

  flip.addEventListener("click", () => {
    if (flipped) return;

    flipped = true;
    flip.classList.add("flipped");

    setTimeout(() => {
      readyBtn.classList.remove("hidden");
    }, 900);
  });

  readyBtn.addEventListener("click", () => {
    window.location.href = "valentine-puzzle.html";
  });
});