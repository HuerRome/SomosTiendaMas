(function() {
  "use strict";

  const cards = document.querySelectorAll(".register-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const type = card.getAttribute("data-type");

      // Guardar selección (clave UX real)
      localStorage.setItem("registerType", type);

      // Redirección según tipo
      if (type === "persona") {
        window.location.href = "registro-persona.html";
      } else {
        window.location.href = "registro-empresa.html";
      }
    });
  });

})();


