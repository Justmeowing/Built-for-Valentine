document.addEventListener("DOMContentLoaded", () => {
  // Guard: must finish rose game
  if (localStorage.getItem("roseGameCompleted") !== "true") {
    window.location.href = "../hub.html";
    return;
  }

  const unlockBtn = document.getElementById("unlockNext");

  unlockBtn.addEventListener("click", () => {
    localStorage.setItem("lesson1Completed", "true");
    window.location.href = "../hub.html";
  });
});