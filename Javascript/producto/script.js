"use strict";

// Punto de entrada
document.addEventListener("DOMContentLoaded", () => {
  // JS listo para usar
});

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumb");
  const zoomArea = document.querySelector(".zoom-area");

  // CAMBIO DE IMAGEN
  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const newImage = thumb.dataset.image;

      if (!newImage || !mainImage) return;

      mainImage.src = newImage;

      thumbnails.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });

  // ZOOM DINÁMICO (solo si existe .zoom-area)
  if (zoomArea && mainImage) {
    zoomArea.addEventListener("mousemove", (e) => {
      const rect = zoomArea.getBoundingClientRect();

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      mainImage.style.transformOrigin = `${x}% ${y}%`;
      zoomArea.classList.add("zoomed");
    });

    zoomArea.addEventListener("mouseleave", () => {
      zoomArea.classList.remove("zoomed");
      mainImage.style.transformOrigin = "center";
    });
  }
});




/*----------------------- Controles de cantidad ------------------------------*/
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const input = document.querySelector(".qty-input");

minus.addEventListener("click", () => {
  let value = parseInt(input.value);
  if(value > 1){
    input.value = value - 1;
  }
});

plus.addEventListener("click", () => {
  let value = parseInt(input.value);
  input.value = value + 1;
});


/*-------------------- Sección de especificaciones del producto --------------------*/
/*
const toggleBtn = document.getElementById("toggleFeatures");
const extras = document.querySelectorAll(".extra");
const arrow = document.querySelector(".arrow");

let open = false;

toggleBtn.addEventListener("click", () => {

  open = !open;

  extras.forEach(el => {
    el.style.display = open ? "flex" : "none";
  });

  toggleBtn.childNodes[0].textContent = open
    ? "Ver menos características "
    : "Ver todas las características ";

  arrow.style.transform = open ? "rotate(180deg)" : "rotate(0deg");

});
*/





document.addEventListener("DOMContentLoaded", () => {

  const toggleBtn = document.getElementById("toggleFeatures");
  const extras = document.querySelectorAll(".extra");
  const arrow = document.querySelector(".arrow");

  if (!toggleBtn) return;

  let open = false;

  toggleBtn.addEventListener("click", () => {

    open = !open;

    extras.forEach(el => {
      el.style.display = open ? "flex" : "none";
    });

    toggleBtn.firstChild.textContent = open
      ? "Ver menos características "
      : "Ver todas las características ";

    arrow.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";

  });

});





/*------------------------ Selector de talles ------------------------*/
document.addEventListener("DOMContentLoaded", () => {
  const sizeButtons = document.querySelectorAll(".size-btn");
  const selectedSizeText = document.getElementById("selectedSize");

  let selectedSize = null;

  sizeButtons.forEach(btn => {
    btn.addEventListener("click", () => {

      // Limpiar selección previa
      sizeButtons.forEach(b => b.classList.remove("active"));

      // Activar actual
      btn.classList.add("active");

      selectedSize = btn.dataset.size;
      selectedSizeText.textContent = selectedSize;

      console.log("Talle seleccionado:", selectedSize);
    });
  });

  // VALIDACIÓN antes de comprar
  const buyBtn = document.querySelector(".btn-buy");
  const cartBtn = document.querySelector(".btn-cart");

  function validateSize(e) {
    if (!selectedSize) {
      e.preventDefault();
      alert("Por favor seleccioná un talle");
    }
  }

  buyBtn.addEventListener("click", validateSize);
  cartBtn.addEventListener("click", validateSize);
});


/*----------------------- Controles de cantidad con stock ------------------------------*/
document.addEventListener("DOMContentLoaded", () => {

  const minus = document.querySelector(".minus");
  const plus = document.querySelector(".plus");
  const input = document.querySelector(".qty-input");
  const qtyText = document.getElementById("qtyText");
  const stockInfo = document.querySelector(".stock-info");

  const stockDisponible = 10; // 🔥 dinámico en futuro (API)

  function updateUI(value) {
    // texto "1 unidad / 2 unidades"
    qtyText.textContent = value === 1 ? "1 unidad" : `${value} unidades`;

    // bloquear botón +
    if (value >= stockDisponible) {
      plus.disabled = true;
      plus.style.opacity = "0.5";
      plus.style.cursor = "not-allowed";
    } else {
      plus.disabled = false;
      plus.style.opacity = "1";
      plus.style.cursor = "pointer";
    }
  }

  minus.addEventListener("click", () => {
    let value = parseInt(input.value);
    if (value > 1) {
      value--;
      input.value = value;
      updateUI(value);
    }
  });

  plus.addEventListener("click", () => {
    let value = parseInt(input.value);

    if (value < stockDisponible) {
      value++;
      input.value = value;
      updateUI(value);
    }
  });

  input.addEventListener("input", () => {
    let value = parseInt(input.value) || 1;

    if (value > stockDisponible) {
      value = stockDisponible;
    }

    if (value < 1) {
      value = 1;
    }

    input.value = value;
    updateUI(value);
  });

  // INIT
  updateUI(parseInt(input.value));
});