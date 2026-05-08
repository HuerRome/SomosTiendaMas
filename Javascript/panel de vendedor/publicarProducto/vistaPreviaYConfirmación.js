const publishBtn =
document.getElementById("publishBtn");

const publishModal =
document.getElementById("publishModal");

const closeModal =
document.getElementById("closeModal");

const previewThumbs =
document.querySelectorAll(".preview-thumb");

const mainPreviewImage =
document.getElementById("mainPreviewImage");

/* =========================================================
   GALLERY
========================================================= */
previewThumbs.forEach((thumb) => {

  thumb.addEventListener("click", () => {

    previewThumbs.forEach((item) => {

      item.classList.remove("active");

    });

    thumb.classList.add("active");

    const image =
    thumb.querySelector("img").src;

    mainPreviewImage.src = image;

  });

});

/* =========================================================
   BUTTONS NAVIGATION
========================================================= */

const backButton =
document.querySelector(".secondary-btn");

/* =========================
   VOLVER
========================= */
backButton.addEventListener(
  "click",
  () => {

    window.location.href =
    "5LogisticaYDespacho.html";

  }
);

/* =========================================================
   PUBLISH PRODUCT
========================================================= */
publishBtn.addEventListener(
  "click",
  () => {

    publishBtn.disabled = true;

    publishBtn.innerHTML = `
    
      <i class="fa-solid fa-spinner fa-spin"></i>
      <span>Publicando...</span>
    
    `;

    /* =========================
       GET LOCAL DATA
    ========================= */

    const logisticsData =
    JSON.parse(
      localStorage.getItem(
        "logisticsData"
      )
    );

    const productImages =
    JSON.parse(
      localStorage.getItem(
        "productImages"
      )
    );

    console.log(
      "Producto listo para guardar:",
      {
        logisticsData,
        productImages
      }
    );

    /* =========================
       SIMULATE DATABASE SAVE
    ========================= */

    setTimeout(() => {

      publishModal.classList.add(
        "active"
      );

      /* CLEAN STORAGE */
      localStorage.removeItem(
        "productImages"
      );

      localStorage.removeItem(
        "logisticsData"
      );

    }, 1800);

  }
);

/* =========================================================
   CLOSE MODAL
========================================================= */
closeModal.addEventListener(
  "click",
  () => {

    publishModal.classList.remove(
      "active"
    );

    /* REDIRECT */
    window.location.href =
    "../../inicio de sesion y registro/miCuenta/miCuentaVendedor.html";

  }
);
