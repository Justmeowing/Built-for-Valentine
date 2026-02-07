document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");

  if (!nextBtn) return;

  nextBtn.addEventListener("click", () => {
    // Mark Lesson 05 as completed / unlock Day 6
    localStorage.setItem("unlockedDay", "6");

    // Go back to hub
    window.location.href = "../hub.html";
  });
});