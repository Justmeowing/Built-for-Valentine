document.addEventListener("DOMContentLoaded", () => {
  const flipCard = document.getElementById("flipCard");
  const readyBtn = document.getElementById("readyBtn");

  // Flip envelope on click
  flipCard.addEventListener("click", () => {
    flipCard.classList.add("flipped");
  });

  // Go to proposal game
  readyBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent re-flip
    window.location.href = "proposal-game.html";
  });
});