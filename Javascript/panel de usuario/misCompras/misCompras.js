// Simulación de compras (esto después viene del backend)
const ordersData = [
  {
    id: 1,
    date: "10/04/2026",
    items: ["Mouse Gamer", "Teclado Mecánico"],
    total: "$45.000"
  },
  {
    id: 2,
    date: "02/04/2026",
    items: ["Auriculares Bluetooth"],
    total: "$18.000"
  }
];

// 👉 Probá esto para ver el estado vacío:
// const ordersData = [];

const ordersContainer = document.getElementById("orders");
const emptyState = document.getElementById("empty-state");

function renderOrders() {
  if (ordersData.length === 0) {
    emptyState.classList.remove("hidden");
    ordersContainer.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  ordersContainer.classList.remove("hidden");

  ordersContainer.innerHTML = ordersData.map(order => `
    <div class="order-card">
      <div class="order-header">
        <span class="order-title">Pedido #${order.id}</span>
        <span class="order-date">${order.date}</span>
      </div>

      <div class="order-items">
        ${order.items.join(", ")}
      </div>

      <div class="order-total">
        ${order.total}
      </div>
    </div>
  `).join("");
}

renderOrders();
