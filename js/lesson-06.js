document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");

  if (!nextBtn) return;

  nextBtn.addEventListener("click", () => {
    // Mark Lesson 06 as completed / unlock Day 7
    localStorage.setItem("unlockedDay", "7");

    // Go back to hub
    window.location.href = "../hub.html";
  });
});