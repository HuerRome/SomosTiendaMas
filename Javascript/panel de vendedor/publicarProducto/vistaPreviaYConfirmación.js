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

/* =========================
   GALLERY
========================= */
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

/* =========================
   PUBLISH
========================= */
publishBtn.addEventListener("click", () => {

  publishBtn.disabled = true;

  publishBtn.innerHTML = `
  
    <i class="fa-solid fa-spinner fa-spin"></i>
    Publicando...
  
  `;

  /* SIMULATE DATABASE SAVE */
  setTimeout(() => {

    publishModal.classList.add("active");

  }, 1800);

});

/* =========================
   CLOSE MODAL
========================= */
closeModal.addEventListener("click", () => {

  publishModal.classList.remove("active");

  /* REDIRECT */
  window.location.href =
    "/panel-vendedor";

});
