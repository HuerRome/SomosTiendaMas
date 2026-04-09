(function() {
  "use strict";

  // Helper: formatear números a moneda local (ARS)
  function formatPrice(value) {
    return value.toLocaleString('es-AR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).replace(/,/g, '.');
  }

  // Actualizar el resumen completo: cantidad de productos, subtotal y total
  function updateSummary() {
    const allProducts = document.querySelectorAll('.cart-product');
    let totalItems = 0;
    let subtotal = 0;

    allProducts.forEach(product => {
      const priceRaw = product.getAttribute('data-price');
      const price = parseInt(priceRaw, 10);
      const qtySpan = product.querySelector('.qty-value');
      let quantity = 1;
      if (qtySpan) {
        quantity = parseInt(qtySpan.innerText, 10);
      }
      totalItems += quantity;
      subtotal += price * quantity;
    });

    // Actualizar DOM del resumen
    const totalItemsSpan = document.querySelector('.total-items-count');
    if (totalItemsSpan) totalItemsSpan.innerText = totalItems;

    const subtotalSpan = document.querySelector('.subtotal-amount');
    if (subtotalSpan) subtotalSpan.innerText = `$ ${formatPrice(subtotal)}`;

    const totalSpan = document.querySelector('.total-amount');
    if (totalSpan) totalSpan.innerText = `$ ${formatPrice(subtotal)}`;
  }

  // Actualizar la cantidad visual y el subtotal de un producto específico
  function updateProductQuantity(productElement, newQty) {
    const qtySpan = productElement.querySelector('.qty-value');
    if (!qtySpan) return;
    let quantity = newQty;
    if (quantity < 1) quantity = 1;
    qtySpan.innerText = quantity;

    // Recalcular totales globales
    updateSummary();
  }

  // Eliminar producto del DOM y eliminar card del vendedor si queda vacío
  function removeProduct(productElement) {
    const sellerCard = productElement.closest('.seller-card');
    const productsContainer = sellerCard.querySelector('.seller-products');
    productElement.remove();

    // Verificar si el vendedor ya no tiene productos
    const remainingProducts = sellerCard.querySelectorAll('.cart-product');
    if (remainingProducts.length === 0) {
      sellerCard.remove();
    }
    updateSummary();
  }

  // Configurar listeners de cantidad y eliminar para un producto
  function bindProductEvents(productElement) {
    const minusBtn = productElement.querySelector('.qty-minus');
    const plusBtn = productElement.querySelector('.qty-plus');
    const qtySpan = productElement.querySelector('.qty-value');
    const removeBtn = productElement.querySelector('.btn-remove');

    if (minusBtn) {
      minusBtn.replaceWith(minusBtn.cloneNode(true));
      const newMinus = productElement.querySelector('.qty-minus');
      if (newMinus) {
        newMinus.addEventListener('click', (e) => {
          e.stopPropagation();
          let currentQty = parseInt(qtySpan.innerText, 10);
          if (currentQty > 1) {
            currentQty--;
            updateProductQuantity(productElement, currentQty);
          }
        });
      }
    }

    if (plusBtn) {
      plusBtn.replaceWith(plusBtn.cloneNode(true));
      const newPlus = productElement.querySelector('.qty-plus');
      if (newPlus) {
        newPlus.addEventListener('click', (e) => {
          e.stopPropagation();
          let currentQty = parseInt(qtySpan.innerText, 10);
          currentQty++;
          updateProductQuantity(productElement, currentQty);
        });
      }
    }

    if (removeBtn) {
      removeBtn.replaceWith(removeBtn.cloneNode(true));
      const newRemove = productElement.querySelector('.btn-remove');
      if (newRemove) {
        newRemove.addEventListener('click', (e) => {
          e.preventDefault();
          removeProduct(productElement);
        });
      }
    }
  }

  // Inicializar todos los productos existentes
  function initAllProducts() {
    const allProducts = document.querySelectorAll('.cart-product');
    allProducts.forEach(product => bindProductEvents(product));
    updateSummary();
  }

  // Observador para cuando se eliminen cards completas y se necesite re-sincronizar (opcional)
  // Pero los eventos ya están bindeados de forma dinámica al inicio
  // También manejar la mutación si algún producto se añadiera dinámicamente (por si acaso, pero no es necesario)
  // Configurar botones principales del resumen

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert('Compra finalizada');
      console.log('Compra finalizada - Marketplace');
    });
  }

  const continueBtn = document.getElementById('continueShoppingBtn');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      window.location.href = 'productos.html';
    });
  }

  // Inicializar eventos después de cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAllProducts();
    });
  } else {
    initAllProducts();
  }
})();
