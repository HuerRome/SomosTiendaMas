const cancelBtn = document.getElementById("cancelBtn");
const closeBtn = document.getElementById("closeBtn");
const logoutBtn = document.getElementById("logoutBtn");

function goBack() {
  history.back();
}

cancelBtn.addEventListener("click", goBack);
closeBtn.addEventListener("click", goBack);

logoutBtn.addEventListener("click", () => {
  localStorage.clear();
  sessionStorage.clear();

  window.location.href = "/login.html";
});