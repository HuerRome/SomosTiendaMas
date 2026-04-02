const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeatPassword");

const rules = {
  length: document.getElementById("rule-length"),
  upper: document.getElementById("rule-upper"),
  number: document.getElementById("rule-number"),
  special: document.getElementById("rule-special"),
};

password.addEventListener("input", () => {
  const value = password.value;

  rules.length.style.color = value.length >= 8 ? "green" : "red";
  rules.upper.style.color = /[A-Z]/.test(value) ? "green" : "red";
  rules.number.style.color = /\d/.test(value) ? "green" : "red";
  rules.special.style.color = /[^A-Za-z0-9]/.test(value) ? "green" : "red";
});

document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (password.value !== repeatPassword.value) {
    alert("Las contraseñas no coinciden");
    return;
  }

  console.log("Formulario enviado correctamente 🚀");
});
