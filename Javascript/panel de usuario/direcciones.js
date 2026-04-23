const container = document.getElementById("addressContainer");
const addBtn = document.getElementById("addAddress");

/* Cargar */
function loadAddresses() {
  const data = JSON.parse(localStorage.getItem("addresses")) || [];

  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = `<p class="empty">Aún no hay direcciones cargadas.</p>`;
    return;
  }

  data.forEach((addr, index) => {
    const div = document.createElement("div");
    div.classList.add("address-card");

    div.innerHTML = `
      <div class="address-info">
        <strong>${addr.nombre}</strong><br>
        ${addr.calle}, ${addr.ciudad}
      </div>
      <button class="delete-btn" data-index="${index}">Eliminar</button>
    `;

    container.appendChild(div);
  });
}

/* Agregar */
addBtn.addEventListener("click", () => {
  const nombre = prompt("Nombre:");
  const calle = prompt("Calle:");
  const ciudad = prompt("Ciudad:");

  if (!nombre || !calle || !ciudad) return;

  const data = JSON.parse(localStorage.getItem("addresses")) || [];

  data.push({ nombre, calle, ciudad });

  localStorage.setItem("addresses", JSON.stringify(data));
  loadAddresses();
});

/* Eliminar */
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;

    const data = JSON.parse(localStorage.getItem("addresses")) || [];
    data.splice(index, 1);

    localStorage.setItem("addresses", JSON.stringify(data));
    loadAddresses();
  }
});

loadAddresses();
