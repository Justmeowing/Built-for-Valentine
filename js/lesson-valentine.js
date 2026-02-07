document.addEventListener("DOMContentLoaded", () => {
  const homeBtn = document.getElementById("homeBtn");

  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = "../index.html";
    });
  }
});