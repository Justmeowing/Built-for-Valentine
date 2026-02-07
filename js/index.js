document.addEventListener("DOMContentLoaded", () => {
  const door = document.getElementById("door");
  const doorWrapper = document.getElementById("doorWrapper");
  const buttons = document.getElementById("buttons");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const dialogue = document.getElementById("dialogue");
  const readyBtn = document.getElementById("readyBtn");

  // FORCE RESET INITIAL GIF
  door.src = "assets/door/door-knock.gif?" + Date.now();

  const noLines = [
    "Nice try.",
    "That wasn’t convincing.",
    "Let’s be honest.",
    "Not that.",
    "Don’t waste my time."
  ];

  let noCount = 0;
  let hasKnocked = false;

  const PEEK_DURATION = 5400;
  const OPEN_DURATION = 4400;

  doorWrapper.addEventListener("click", () => {
    if (hasKnocked) return;
    hasKnocked = true;

    door.src = "assets/door/door-peek.gif?" + Date.now();

    setTimeout(() => {
      door.src = "assets/door/door-peek-last.png";
      buttons.classList.remove("hidden");
    }, PEEK_DURATION);
  });

  noBtn.addEventListener("click", () => {
    dialogue.classList.remove("hidden");
    dialogue.textContent = noLines[noCount % noLines.length];

    yesBtn.style.transform = `scale(${1 + noCount * 0.18})`;

    const chaos = Math.min(160, 40 + noCount * 20);
    const x = Math.random() * chaos - chaos / 2;
    const y = Math.random() * chaos - chaos / 2;

    noBtn.style.transform = `translate(${x}px, ${y}px)`;

    noCount++;
  });

  yesBtn.addEventListener("click", () => {
    buttons.classList.add("hidden");
    dialogue.classList.add("hidden");

    door.src = "assets/door/door-open.gif?" + Date.now();

    setTimeout(() => {
      door.src = "assets/door/door-open-last.png";
      readyBtn.classList.remove("hidden");
    }, OPEN_DURATION);
  });

  readyBtn.addEventListener("click", () => {
    window.location.href = "hub.html";
  });
});