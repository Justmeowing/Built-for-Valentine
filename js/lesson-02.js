document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");

  if (!nextBtn) return;

  nextBtn.addEventListener("click", () => {
    // Mark Lesson 02 as completed / unlock Day 3
    localStorage.setItem("unlockedDay", "3");

    // Go back to hub
    window.location.href = "../hub.html";
  });
});