// TOGGLE PASSWORD
const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

toggle.addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
});

// VALIDACIÓN
document.getElementById("registerForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");

  // NAME
  if (name.value.trim() === "") {
    document.getElementById("nameError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("nameError").style.display = "none";
  }

  // EMAIL
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    document.getElementById("emailError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("emailError").style.display = "none";
  }

  // PASSWORD
  if (password.value.length < 6) {
    document.getElementById("passwordError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("passwordError").style.display = "none";
  }

  // CONFIRM
  if (confirm.value !== password.value || confirm.value === "") {
    document.getElementById("confirmError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("confirmError").style.display = "none";
  }

  // TERMS
  if (!terms.checked) {
    document.getElementById("termsError").style.display = "block";
    valid = false;
  } else {
    document.getElementById("termsError").style.display = "none";
  }

  // SUCCESS
  if (valid) {
    console.log("Cuenta creada:", {
      name: name.value,
      email: email.value
    });

    alert("Cuenta creada con éxito 🚀");
  }
});


