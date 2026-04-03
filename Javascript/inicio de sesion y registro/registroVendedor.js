const form = document.getElementById("registerSellerForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const businessName = document.getElementById("businessName");
const sellerType = document.getElementById("sellerType");
const cuit = document.getElementById("cuit");
const phone = document.getElementById("phone");
const terms = document.getElementById("terms");
const submitBtn = document.getElementById("submitBtn");

const fullNameError = document.getElementById("fullNameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const businessNameError = document.getElementById("businessNameError");
const sellerTypeError = document.getElementById("sellerTypeError");
const cuitError = document.getElementById("cuitError");
const phoneError = document.getElementById("phoneError");
const termsError = document.getElementById("termsError");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

const ruleLength = document.getElementById("ruleLength");
const ruleUpper = document.getElementById("ruleUpper");
const ruleNumber = document.getElementById("ruleNumber");

/* =========================
   HELPERS
========================= */
function showError(input, errorEl, message = "") {
  if (message) errorEl.textContent = message;
  errorEl.classList.add("show");
  if (input) input.classList.add("is-invalid");
}

function hideError(input, errorEl) {
  errorEl.classList.remove("show");
  if (input) input.classList.remove("is-invalid");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function isValidPassword(value) {
  return value.length >= 8 && /[A-Z]/.test(value) && /\d/.test(value);
}

function isValidPhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8;
}

function isValidCuit(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length === 11;
}

/* =========================
   PASSWORD TOGGLE
========================= */
function setupPasswordToggle(button, input) {
  button.addEventListener("click", () => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    button.textContent = isPassword ? "👁" : "👁";
  });
}

setupPasswordToggle(togglePassword, password);
setupPasswordToggle(toggleConfirmPassword, confirmPassword);

/* =========================
   PASSWORD RULES LIVE
========================= */
password.addEventListener("input", () => {
  const value = password.value;

  ruleLength.classList.toggle("valid", value.length >= 8);
  ruleUpper.classList.toggle("valid", /[A-Z]/.test(value));
  ruleNumber.classList.toggle("valid", /\d/.test(value));

  if (password.value.trim() !== "") {
    if (isValidPassword(value)) {
      hideError(password, passwordError);
    }
  }

  if (confirmPassword.value.trim() !== "") {
    if (confirmPassword.value === password.value) {
      hideError(confirmPassword, confirmPasswordError);
    } else {
      showError(confirmPassword, confirmPasswordError, "Las contraseñas no coinciden");
    }
  }
});

/* =========================
   SOLO NÚMEROS EN CUIT / PHONE
========================= */
function allowPhoneAndSymbols(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^\d+\-\s()]/g, "");
  });
}

function allowCuitFormat(input) {
  input.addEventListener("input", () => {
    input.value = input.value.replace(/[^\d-]/g, "");
  });
}

allowPhoneAndSymbols(phone);
allowCuitFormat(cuit);

/* =========================
   VALIDACIONES INDIVIDUALES
========================= */
fullName.addEventListener("blur", () => {
  if (fullName.value.trim().length < 3) {
    showError(fullName, fullNameError);
  } else {
    hideError(fullName, fullNameError);
  }
});

email.addEventListener("blur", () => {
  if (!isValidEmail(email.value)) {
    showError(email, emailError);
  } else {
    hideError(email, emailError);
  }
});

password.addEventListener("blur", () => {
  if (!isValidPassword(password.value)) {
    showError(password, passwordError, "Debe tener mínimo 8 caracteres, 1 mayúscula y 1 número");
  } else {
    hideError(password, passwordError);
  }
});

confirmPassword.addEventListener("blur", () => {
  if (confirmPassword.value !== password.value || confirmPassword.value.trim() === "") {
    showError(confirmPassword, confirmPasswordError);
  } else {
    hideError(confirmPassword, confirmPasswordError);
  }
});

businessName.addEventListener("blur", () => {
  if (businessName.value.trim().length < 2) {
    showError(businessName, businessNameError);
  } else {
    hideError(businessName, businessNameError);
  }
});

sellerType.addEventListener("change", () => {
  if (!sellerType.value) {
    showError(sellerType, sellerTypeError);
  } else {
    hideError(sellerType, sellerTypeError);
  }
});

cuit.addEventListener("blur", () => {
  const value = cuit.value.trim();

  if (!value) {
    hideError(cuit, cuitError); // opcional
    return;
  }

  if (!isValidCuit(value)) {
    showError(cuit, cuitError);
  } else {
    hideError(cuit, cuitError);
  }
});

phone.addEventListener("blur", () => {
  if (!isValidPhone(phone.value)) {
    showError(phone, phoneError);
  } else {
    hideError(phone, phoneError);
  }
});

terms.addEventListener("change", () => {
  if (terms.checked) {
    termsError.classList.remove("show");
  }
});

/* =========================
   SUBMIT
========================= */
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isValid = true;

  // Nombre
  if (fullName.value.trim().length < 3) {
    showError(fullName, fullNameError);
    isValid = false;
  } else {
    hideError(fullName, fullNameError);
  }

  // Email
  if (!isValidEmail(email.value)) {
    showError(email, emailError);
    isValid = false;
  } else {
    hideError(email, emailError);
  }

  // Password
  if (!isValidPassword(password.value)) {
    showError(password, passwordError, "Debe tener mínimo 8 caracteres, 1 mayúscula y 1 número");
    isValid = false;
  } else {
    hideError(password, passwordError);
  }

  // Confirm password
  if (confirmPassword.value !== password.value || confirmPassword.value.trim() === "") {
    showError(confirmPassword, confirmPasswordError);
    isValid = false;
  } else {
    hideError(confirmPassword, confirmPasswordError);
  }

  // Negocio
  if (businessName.value.trim().length < 2) {
    showError(businessName, businessNameError);
    isValid = false;
  } else {
    hideError(businessName, businessNameError);
  }

  // Tipo vendedor
  if (!sellerType.value) {
    showError(sellerType, sellerTypeError);
    isValid = false;
  } else {
    hideError(sellerType, sellerTypeError);
  }

  // CUIT (opcional)
  if (cuit.value.trim() !== "" && !isValidCuit(cuit.value)) {
    showError(cuit, cuitError);
    isValid = false;
  } else {
    hideError(cuit, cuitError);
  }

  // Teléfono
  if (!isValidPhone(phone.value)) {
    showError(phone, phoneError);
    isValid = false;
  } else {
    hideError(phone, phoneError);
  }

  // Terms
  if (!terms.checked) {
    termsError.classList.add("show");
    isValid = false;
  } else {
    termsError.classList.remove("show");
  }

  if (!isValid) return;

  // Estado loading
  submitBtn.disabled = true;
  submitBtn.classList.add("is-loading");
  submitBtn.querySelector(".btn-text").textContent = "Creando cuenta...";

  // Payload listo para API
  const payload = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    password: password.value,
    businessName: businessName.value.trim(),
    sellerType: sellerType.value,
    cuit: cuit.value.trim(),
    phone: phone.value.trim(),
    acceptedTerms: terms.checked
  };

  try {
    // Simulación de request
    await new Promise(resolve => setTimeout(resolve, 1800));

    console.log("Payload listo para enviar:", payload);

    submitBtn.querySelector(".btn-text").textContent = "Cuenta creada ✔";

    // Acá después podés hacer:
    // const response = await fetch("/api/sellers/register", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(payload)
    // });

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);

  } catch (error) {
    console.error("Error al registrar:", error);

    submitBtn.disabled = false;
    submitBtn.classList.remove("is-loading");
    submitBtn.querySelector(".btn-text").textContent = "Crear cuenta";
    alert("Ocurrió un error al crear la cuenta. Intentá nuevamente.");
  }
});





