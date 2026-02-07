document.addEventListener("DOMContentLoaded", () => {
  const unlockBtn = document.getElementById("unlockBtn");

  if (!unlockBtn) return;

  unlockBtn.addEventListener("click", () => {
    // Unlock Valentine (day 8)
    localStorage.setItem("unlockedDay", "8");

    // Go back to hub
    window.location.href = "../hub.html";
  });
});