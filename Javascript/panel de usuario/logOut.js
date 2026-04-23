const cancelBtn = document.getElementById("cancelBtn");
const closeBtn = document.getElementById("closeBtn");
const logoutBtn = document.getElementById("logoutBtn");

// CANCELAR / CERRAR
function goBack() {
  history.back();
}

cancelBtn.addEventListener("click", goBack);
closeBtn.addEventListener("click", goBack);

// LOGOUT REAL
logoutBtn.addEventListener("click", () => {
  console.log("Cerrando sesión...");

  // 🔥 limpiar sesión
  localStorage.clear();
  sessionStorage.clear();

  // 🔥 redirigir
  window.location.href = "/login.html";
});