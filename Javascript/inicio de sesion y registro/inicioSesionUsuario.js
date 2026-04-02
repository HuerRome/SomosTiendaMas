// TOGGLE PASSWORD
const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

toggle.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    toggle.textContent = "👁";
  } else {
    password.type = "password";
    toggle.textContent = "👁";
  }
});

// VALIDACIÓN
const form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  let valid = true;

  // EMAIL VALIDATION
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    emailError.style.display = "block";
    valid = false;
  } else {
    emailError.style.display = "none";
  }

  // PASSWORD VALIDATION
  if (password.value.trim() === "") {
    passwordError.style.display = "block";
    valid = false;
  } else {
    passwordError.style.display = "none";
  }

  // SIMULACIÓN LOGIN
  if (valid) {
    console.log("Login exitoso:", {
      email: email.value,
      password: password.value
    });

    alert("Login exitoso.");
  }
});


