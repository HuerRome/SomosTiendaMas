"use strict";

// Punto de entrada
document.addEventListener("DOMContentLoaded", () => {
  // JS listo para usar
});

const breadcrumb = [
  {name:"Frávega",url:"/"},
  {name:"Pequeños Electrodomésticos",url:"/electrodomesticos"},
  {name:"Hogar",url:"/hogar"},
  {name:"Limpiadoras a vapor",url:null}
];

/*----------------------- Galeria de imagenes ------------------------------*/
const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumb");
const zoomArea = document.querySelector(".zoom-area");


// CAMBIO DE IMAGEN
thumbnails.forEach(thumb => {

  thumb.addEventListener("click", () => {

    const newImage = thumb.dataset.image;

    mainImage.src = newImage;

    thumbnails.forEach(t => t.classList.remove("active"));

    thumb.classList.add("active");

  });

});


// ZOOM DINAMICO

zoomArea.addEventListener("mousemove", (e)=>{

const rect = zoomArea.getBoundingClientRect();

const x = (e.clientX - rect.left) / rect.width * 100;
const y = (e.clientY - rect.top) / rect.height * 100;

mainImage.style.transformOrigin = `${x}% ${y}%`;

zoomArea.classList.add("zoomed");

});


zoomArea.addEventListener("mouseleave", ()=>{

zoomArea.classList.remove("zoomed");

mainImage.style.transformOrigin = "center";

});
