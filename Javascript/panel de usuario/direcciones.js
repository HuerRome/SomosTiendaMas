const container = document.getElementById("addressContainer");
const addBtn = document.getElementById("addAddressBtn");

let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

/* RENDER */
function render() {
  container.innerHTML = "";

  if (addresses.length === 0) {
    container.innerHTML = "Aún no hay direcciones cargadas.";
    return;
  }

  const list = document.createElement("div");
  list.className = "address-list";

  addresses.forEach((addr, index) => {
    const item = document.createElement("div");
    item.className = "address-item";

    item.innerHTML = `
      <span class="address-text">${addr}</span>
      <button class="delete-btn" data-index="${index}">✕</button>
    `;

    list.appendChild(item);
  });

  container.appendChild(list);
}

/* AGREGAR DIRECCIÓN */
addBtn.addEventListener("click", () => {
  const newAddress = prompt("Ingrese nueva dirección:");

  if (newAddress && newAddress.trim() !== "") {
    addresses.push(newAddress.trim());
    save();
  }
});

/* ELIMINAR */
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    addresses.splice(index, 1);
    save();
  }
});

/* GUARDAR */
function save() {
  localStorage.setItem("addresses", JSON.stringify(addresses));
  render();
}

/* INIT */
render();
