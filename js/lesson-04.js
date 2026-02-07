document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");

  if (!nextBtn) return;

  nextBtn.addEventListener("click", () => {
    // Mark Lesson 04 as completed / unlock Day 5
    localStorage.setItem("unlockedDay", "5");

    // Go back to hub
    window.location.href = "../hub.html";
  });
});