document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");

  if (!nextBtn) return;

  nextBtn.addEventListener("click", () => {
    // Mark Lesson 01 as completed / unlock Day 2
    localStorage.setItem("unlockedDay", "2");

    // Go back to hub
    window.location.href = "../hub.html";
  });
});