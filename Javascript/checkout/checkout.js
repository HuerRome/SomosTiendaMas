"use strict";

// Punto de entrada
document.addEventListener("DOMContentLoaded", () => {
  // JS listo para usar
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const drawer = document.getElementById("mobileDrawer");
  const overlay = document.getElementById("overlay");

  function openMenu() {
    drawer.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    drawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  mobileBtn.addEventListener("click", openMenu);
  overlay.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

});


/* =========================
   PANEL CATEGORÍAS
========================= */

const catBtn = document.querySelector(".categories-btn");
const panel = document.getElementById("categoriesPanel");

let closeTimeout;

/* mostrar */

catBtn.addEventListener("mouseenter", () => {
  clearTimeout(closeTimeout);
  panel.classList.add("show");
});

/* mantener abierto si cursor dentro */

panel.addEventListener("mouseenter", () => {
  clearTimeout(closeTimeout);
});

/* ocultar cuando sale */

panel.addEventListener("mouseleave", () => {
  closeTimeout = setTimeout(()=> panel.classList.remove("show"),200);
});

catBtn.addEventListener("mouseleave", () => {
  closeTimeout = setTimeout(()=> panel.classList.remove("show"),200);
});

/* cambiar subcategorias */

document.querySelectorAll(".cat-item").forEach(btn=>{
  btn.addEventListener("mouseenter", ()=>{

    document.querySelectorAll(".cat-item").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

    const id = btn.dataset.cat;

    document.querySelectorAll(".cat-content").forEach(c=>c.classList.remove("active"));
    document.getElementById(id).classList.add("active");

  });

});

//Product Slider
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los sliders de la página
  const sliders = document.querySelectorAll(".best-sellers");

  sliders.forEach(sliderSection => {
    const slider = sliderSection.querySelector(".best-sellers-container");
    const prevBtn = sliderSection.querySelector(".sliderProducts-btn.prev");
    const nextBtn = sliderSection.querySelector(".sliderProducts-btn.next");

    if (!slider || !prevBtn || !nextBtn) {
      console.error("Slider o botones no encontrados");
      return;
    }

    const cardWidth = slider.querySelector(".product-card").offsetWidth;
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });
  });
});


/* -----------------------------------------------------------------
  Paginá de producto
------------------------------------------------------------------ */

const form = document.getElementById("formPago");

// Formatear tarjeta automáticamente
const tarjetaInput = document.getElementById("tarjeta");
tarjetaInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  value = value.replace(/(.{4})/g, "$1 ").trim();
  e.target.value = value;
});

// Solo números en CVV
const cvv = document.getElementById("cvv");
cvv.addEventListener("input", () => {
  cvv.value = cvv.value.replace(/\D/g, "");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const tarjeta = document.getElementById("tarjeta").value.replace(/\s/g, "");
  const cvvVal = document.getElementById("cvv").value;
  const fecha = document.getElementById("fecha").value;
  const email = document.getElementById("email").value;
  if (tarjeta.length < 16) {
    alert("Número de tarjeta inválido");
    return;
  }
  if (cvvVal.length < 3) {
    alert("CVV inválido");
    return;
  }
  alert("✅ Pago procesado correctamente");
  form.reset();
});


