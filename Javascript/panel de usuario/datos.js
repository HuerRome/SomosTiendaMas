const editBtn = document.getElementById("editBtn");
const inputs = document.querySelectorAll("input:not(#promo)");
const promo = document.getElementById("promo");

let editing = false;

const loadData = () => {
  const data = JSON.parse(localStorage.getItem("userData")) || {
    nombre: "",
    apellido: "",
    email: "anroo475@gmail.com",
    dni: "",
    telefono: "",
    promo: false
  };

  nombre.value = data.nombre;
  apellido.value = data.apellido;
  email.value = data.email;
  dni.value = data.dni;
  telefono.value = data.telefono;
  promo.checked = data.promo;
};

loadData();

editBtn.addEventListener("click", () => {
  editing = !editing;

  inputs.forEach(i => i.disabled = !editing);

  editBtn.textContent = editing ? "GUARDAR" : "EDITAR";

  if (!editing) saveData();
});

function saveData() {
  const data = {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    dni: dni.value,
    telefono: telefono.value,
    promo: promo.checked
  };

  localStorage.setItem("userData", JSON.stringify(data));
}



