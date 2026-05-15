/* =========================
   ELEMENTOS
========================= */

const personalBtn = document.getElementById("editPersonalBtn");
const storeBtn = document.getElementById("editStoreBtn");
const paymentBtn = document.getElementById("editPaymentBtn");

const logoInput = document.getElementById("logoInput");
const changeLogoBtn = document.getElementById("changeLogoBtn");
const logoPreview = document.getElementById("logoPreview");

/* =========================
   INPUTS
========================= */

const personalInputs = [
  nombre,
  apellido,
  email,
  telefono
];

const storeInputs = [
  storeName,
  storeCategory,
  storeDescription,
  storeAddress
];

const paymentInputs = [
  alias,
  cbu,
  titular,
  mpEmail
];

/* =========================
   ESTADOS
========================= */

let editingPersonal = false;
let editingStore = false;
let editingPayment = false;

/* =========================
   DATA
========================= */

function loadSellerData() {

  const data = JSON.parse(
    localStorage.getItem("sellerData")
  ) || {

    nombre: "Anita",
    apellido: "Romero",
    email: "anroo475@gmail.com",
    telefono: "383154977412",

    storeName: "Tecno Store",
    storeCategory: "Tecnología",
    storeDescription: "Tienda especializada en productos tecnológicos.",
    storeAddress: "Catamarca, Argentina",

    alias: "tecno.store.mp",
    cbu: "0000003100000001234567",
    titular: "Anita Romero",
    mpEmail: "pagos@tecnostore.com",

    logo: ""
  };

  /* Personales */
  nombre.value = data.nombre;
  apellido.value = data.apellido;
  email.value = data.email;
  telefono.value = data.telefono;

  /* Tienda */
  storeName.value = data.storeName;
  storeCategory.value = data.storeCategory;
  storeDescription.value = data.storeDescription;
  storeAddress.value = data.storeAddress;

  /* Cobros */
  alias.value = data.alias;
  cbu.value = data.cbu;
  titular.value = data.titular;
  mpEmail.value = data.mpEmail;

  /* Logo */
  if (data.logo) {
    logoPreview.innerHTML = `<img src="${data.logo}">`;
  }
}

loadSellerData();

/* =========================
   TOGGLE EDIT
========================= */

function toggleEdit(inputs, state) {
  inputs.forEach(input => {
    input.disabled = !state;
  });
}

/* =========================
   BOTONES
========================= */

personalBtn.addEventListener("click", () => {

  editingPersonal = !editingPersonal;

  toggleEdit(personalInputs, editingPersonal);

  personalBtn.textContent =
    editingPersonal ? "GUARDAR" : "EDITAR";

  if (!editingPersonal) {
    saveSellerData();
  }
});

storeBtn.addEventListener("click", () => {

  editingStore = !editingStore;

  toggleEdit(storeInputs, editingStore);

  storeBtn.textContent =
    editingStore ? "GUARDAR" : "EDITAR";

  if (!editingStore) {
    saveSellerData();
  }
});

paymentBtn.addEventListener("click", () => {

  editingPayment = !editingPayment;

  toggleEdit(paymentInputs, editingPayment);

  paymentBtn.textContent =
    editingPayment ? "GUARDAR" : "EDITAR";

  if (!editingPayment) {
    saveSellerData();
  }
});

/* =========================
   LOGO
========================= */

changeLogoBtn.addEventListener("click", () => {
  logoInput.click();
});

logoInput.addEventListener("change", (e) => {

  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(event) {

    logoPreview.innerHTML =
      `<img src="${event.target.result}">`;

    saveSellerData(event.target.result);
  };

  reader.readAsDataURL(file);
});

/* =========================
   SAVE
========================= */

function saveSellerData(customLogo = null) {

  const oldData = JSON.parse(
    localStorage.getItem("sellerData")
  ) || {};

  const data = {

    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    telefono: telefono.value,

    storeName: storeName.value,
    storeCategory: storeCategory.value,
    storeDescription: storeDescription.value,
    storeAddress: storeAddress.value,

    alias: alias.value,
    cbu: cbu.value,
    titular: titular.value,
    mpEmail: mpEmail.value,

    logo: customLogo || oldData.logo || ""
  };

  localStorage.setItem(
    "sellerData",
    JSON.stringify(data)
  );
}
