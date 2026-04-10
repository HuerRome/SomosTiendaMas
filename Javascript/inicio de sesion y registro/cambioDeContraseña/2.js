(function() {
  "use strict";

  const form = document.getElementById("passwordForm");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");

  const passwordError = document.getElementById("passwordError");
  const confirmError = document.getElementById("confirmError");
  const successMessage = document.getElementById("successMessage");

  // VALIDACIÓN CONTRASEÑA FUERTE
  function validatePassword(value) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,16}$/.test(value);
  }

  // TOGGLE PASSWORD
  document.querySelectorAll(".toggle-password").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      target.type = target.type === "password" ? "text" : "password";
    });
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    // VALIDAR PASSWORD
    if (!validatePassword(password.value)) {
      passwordError.style.display = "block";
      valid = false;
    } else {
      passwordError.style.display = "none";
    }

    // VALIDAR CONFIRM
    if (password.value !== confirmPassword.value || !confirmPassword.value) {
      confirmError.style.display = "block";
      valid = false;
    } else {
      confirmError.style.display = "none";
    }

    if (valid) {
      successMessage.style.display = "block";
      form.reset();

      setTimeout(() => {
        successMessage.style.display = "none";
      }, 4000);
    }
  });

})();