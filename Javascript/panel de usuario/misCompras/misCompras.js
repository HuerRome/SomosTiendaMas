const container = document.getElementById("purchasesContent");

/* Render */
function loadPurchases() {
  const data = JSON.parse(localStorage.getItem("purchases")) || [];

  container.innerHTML = "";

  if (data.length === 0) {
    renderEmpty();
    return;
  }

  data.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("purchase-card");

    div.innerHTML = `
      <strong>${p.producto}</strong>
      <span>Precio: $${p.precio}</span><br>
      <span>Fecha: ${p.fecha}</span>
    `;

    container.appendChild(div);
  });
}

/* Empty state EXACTO */
function renderEmpty() {
  container.innerHTML = `
    <div class="empty-icon">
      <img src="../../assets/icons/iconos/shopping-bag.svg" alt="Mis compras">
    </div>

    <div class="empty-title">
      No encontramos compras con tu mail
    </div>

    <div class="empty-text">
      Si compraste recién, tu compra puede demorar unos minutos en aparecer.
    </div>

    <div class="empty-link">
      ¿Todavía no compraste? ¡Conocé nuestras ofertas!
    </div>

    <button class="btn-primary" id="goShop">
      Conocer ofertas
    </button>
  `;

  document.getElementById("goShop").addEventListener("click", () => {
    alert("Redirigir a tienda");
  });
}

/* DEMO: agregar compra */
function addDemoPurchase() {
  const data = JSON.parse(localStorage.getItem("purchases")) || [];

  data.push({
    producto: "Notebook Lenovo",
    precio: 500000,
    fecha: new Date().toLocaleDateString()
  });

  localStorage.setItem("purchases", JSON.stringify(data));
  loadPurchases();
}

/* Inicial */
loadPurchases();

/* 👉 para testear en consola:
addDemoPurchase();
*/

