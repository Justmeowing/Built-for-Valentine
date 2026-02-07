document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("nextBtn");

  if (!nextBtn) return;

  nextBtn.addEventListener("click", () => {
    // Mark Lesson 03 as completed / unlock Day 4
    localStorage.setItem("unlockedDay", "4");

    // Go back to hub
    window.location.href = "../hub.html";
  });
});