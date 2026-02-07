const line1Text = "WILL YOU BE";
const line2Text = "MY VALENTINE";

const fullText = (line1Text + line2Text).replace(/ /g, "");

const line1 = document.getElementById("line1");
const line2 = document.getElementById("line2");
const lettersContainer = document.getElementById("letters");
const hintBtn = document.getElementById("hintBtn");
const hintsDiv = document.getElementById("hints");
const bubble = document.getElementById("bubble");

let currentIndex = 0;
let hintsLeft = 5;

/* Render word slots */
function renderLine(line, text, startIndex) {
  [...text.replace(/ /g, "")].forEach((_, i) => {
    const span = document.createElement("span");
    span.className = "slot";
    span.dataset.index = startIndex + i;
    line.appendChild(span);
  });
}

renderLine(line1, line1Text, 0);
renderLine(line2, line2Text, line1Text.replace(/ /g, "").length);

/* Letters */
const letters = fullText.split("").sort(() => Math.random() - 0.5);

letters.forEach(char => {
  const btn = document.createElement("button");
  btn.className = "letter";
  btn.textContent = char;
  btn.addEventListener("click", () => handleGuess(btn, char));
  lettersContainer.appendChild(btn);
});

/* Guess logic */
function handleGuess(btn, char) {
  if (char !== fullText[currentIndex]) {
    showBubble("Not that one 😌");
    return;
  }

  const slot = document.querySelector(
    `.slot[data-index="${currentIndex}"]`
  );

  slot.textContent = char;
  btn.disabled = true;
  currentIndex++;

  if (currentIndex === fullText.length) {
    setTimeout(() => {
      window.location.href = "proposal-win.html";
    }, 700);
  }
}

/* Hint */
hintBtn.addEventListener("click", () => {
  if (hintsLeft <= 0) return;

  const needed = fullText[currentIndex];
  const buttons = [...document.querySelectorAll(".letter")];

  const match = buttons.find(
    b => b.textContent === needed && !b.disabled
  );

  if (match) match.click();

  hintsLeft--;
  hintsDiv.textContent = `Hints left: ${hintsLeft}`;

  if (hintsLeft === 0) hintBtn.disabled = true;
});

/* Bubble */
function showBubble(text) {
  bubble.textContent = text;
  bubble.classList.remove("hidden");

  clearTimeout(bubble.timer);
  bubble.timer = setTimeout(() => {
    bubble.classList.add("hidden");
  }, 1200);
}