





















(function() {
  "use strict";

  function formatPrice(value) {
    return value.toLocaleString('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function updateSummary() {
    const allProducts = document.querySelectorAll('.cart-product');

    let totalItems = 0;
    let subtotal = 0;

    allProducts.forEach(product => {
      const price = parseInt(product.dataset.price, 10) / 100; // 🔥 centavos
      const qty = parseInt(product.querySelector('.qty-value').innerText, 10);

      totalItems += qty;
      subtotal += price * qty;
    });

    // 🔥 ENVÍO POR VENDEDOR (PRO)
    const sellerCards = document.querySelectorAll('.seller-card');
    const FREE_SHIPPING_MIN = 50000;
    let shipping = 0;

    sellerCards.forEach(card => {
      let sellerSubtotal = 0;

      const products = card.querySelectorAll('.cart-product');

      products.forEach(p => {
        const price = parseInt(p.dataset.price, 10) / 100;
        const qty = parseInt(p.querySelector('.qty-value').innerText, 10);
        sellerSubtotal += price * qty;
      });

      if (sellerSubtotal < FREE_SHIPPING_MIN && sellerSubtotal > 0) {
        shipping += 3500;
      }
    });

    // 🔥 UI envío
    const shippingEl = document.querySelector('.shipping-amount');
    const freeMsg = document.querySelector('.free-shipping-msg');

    if (shipping === 0) {
      shippingEl.innerText = "Gratis";
      shippingEl.classList.add("free");
      shippingEl.classList.remove("paid");

      freeMsg.innerText = "Tenés envío gratis.";
    } else {
      shippingEl.innerText = `$ ${formatPrice(shipping)}`;
      shippingEl.classList.add("paid");
      shippingEl.classList.remove("free");

      freeMsg.innerText = "El envío se calcula por vendedor.";
    }

    // 🔥 TOTAL (sin impuestos)
    const total = subtotal + shipping;

    // 🔥 DOM
    document.querySelector('.total-items-count').innerText = totalItems;
    document.querySelector('.subtotal-amount').innerText = `$ ${formatPrice(subtotal)}`;
    document.querySelector('.total-amount').innerText = `$ ${formatPrice(total)}`;

    // 🔥 carrito vacío
    if (totalItems === 0) {
      document.querySelector('.cart-items').innerHTML = `
        <div class="empty-cart">
          <h3>Tu carrito está vacío</h3>
          <p>Agregá productos para comenzar</p>
        </div>
      `;
    }
  }

  function updateProductQuantity(product, qty) {
    if (qty < 1) qty = 1;
    product.querySelector('.qty-value').innerText = qty;
    updateSummary();
  }

  function removeProduct(product) {
    const sellerCard = product.closest('.seller-card');
    product.remove();

    if (sellerCard.querySelectorAll('.cart-product').length === 0) {
      sellerCard.remove();
    }

    updateSummary();
  }

  function bindEvents(product) {
    product.querySelector('.qty-minus')?.addEventListener('click', () => {
      const qtyEl = product.querySelector('.qty-value');
      updateProductQuantity(product, parseInt(qtyEl.innerText) - 1);
    });

    product.querySelector('.qty-plus')?.addEventListener('click', () => {
      const qtyEl = product.querySelector('.qty-value');
      updateProductQuantity(product, parseInt(qtyEl.innerText) + 1);
    });

    product.querySelector('.btn-remove')?.addEventListener('click', () => {
      removeProduct(product);
    });
  }

  function init() {
    document.querySelectorAll('.cart-product').forEach(bindEvents);
    updateSummary();

    document.getElementById('checkoutBtn')?.addEventListener('click', () => {
      const items = document.querySelectorAll('.cart-product').length;

      if (items === 0) {
        alert("Tu carrito está vacío");
        return;
      }

      alert("Compra finalizada");
    });

    document.getElementById('continueShoppingBtn')?.addEventListener('click', () => {
      window.location.href = "productos.html";
    });
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();

})();