(function() {
  "use strict";

  const form = document.getElementById("resetForm");

  const stepEmail = document.getElementById("stepEmail");
  const stepPassword = document.getElementById("stepPassword");

  const emailInput = document.getElementById("resetEmail");
  const emailError = document.getElementById("resetEmailError");

  const codeInput = document.getElementById("code");
  const codeError = document.getElementById("codeError");

  const newPassword = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");

  const newPasswordError = document.getElementById("newPasswordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");

  let isStep2 = false;

  // 👁 Mostrar / ocultar password
  document.querySelectorAll(".toggle-password").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      target.type = target.type === "password" ? "text" : "password";
    });
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!isStep2) {
      handleEmailStep();
    } else {
      handlePasswordStep();
    }
  });

  // 🔹 STEP 1
  function handleEmailStep() {
    const email = emailInput.value.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmail.test(email)) {
      emailError.style.display = "block";
      return;
    }

    emailError.style.display = "none";

    // 👉 Simulación envío código
    console.log("Código enviado a:", email);

    // Cambiar a paso 2
    stepEmail.style.display = "none";
    stepPassword.style.display = "block";
    isStep2 = true;
  }

  // 🔹 STEP 2
  function handlePasswordStep() {
    let valid = true;

    const code = codeInput.value.trim();
    const pass = newPassword.value.trim();
    const confirm = confirmPassword.value.trim();

    // Código (simulado)
    if (code.length < 4) {
      codeError.style.display = "block";
      valid = false;
    } else {
      codeError.style.display = "none";
    }

    // Password
    if (pass.length < 6) {
      newPasswordError.style.display = "block";
      valid = false;
    } else {
      newPasswordError.style.display = "none";
    }

    // Confirmación
    if (pass !== confirm || confirm === "") {
      confirmPasswordError.style.display = "block";
      valid = false;
    } else {
      confirmPasswordError.style.display = "none";
    }

    if (!valid) return;

    // ✅ Simulación éxito
    alert("Contraseña actualizada correctamente");

    // Redirección
    window.location.href = "login.html";
  }

})();