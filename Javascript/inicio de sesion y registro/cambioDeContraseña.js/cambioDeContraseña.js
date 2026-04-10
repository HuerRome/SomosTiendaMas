(function() {
  "use strict";

  const form = document.getElementById("resetForm");
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const successMessage = document.getElementById("successMessage");

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    // Validación email
    if (!email.value || !validateEmail(email.value)) {
      emailError.style.display = "block";
      valid = false;
    } else {
      emailError.style.display = "none";
    }

    if (valid) {
      // Mostrar mensaje seguro
      successMessage.style.display = "block";

      // Limpiar input
      form.reset();

      // UX PRO: ocultar después
      setTimeout(() => {
        successMessage.style.display = "none";
      }, 5000);
    }
  });

})();

