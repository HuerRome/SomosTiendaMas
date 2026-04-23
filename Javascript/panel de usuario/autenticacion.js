// Botones funcionales (simulación UX real)

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent.includes("CONTRASEÑA")) {
      alert("Redirigir a crear contraseña");
    }

    if (btn.textContent.includes("SESIONES")) {
      alert("Mostrar sesiones activas");
    }
  });
});






