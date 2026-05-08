/* =========================================================
   BUTTONS NAVIGATION
========================================================= */

const backButton =
document.querySelector(".secondary-btn");

const continueButton =
document.querySelector(".primary-btn");

/* =========================
   VOLVER
========================= */
backButton.addEventListener("click", () => {

  window.location.href =
  "2InformacionYFichaTecnica.html";

});

/* =========================
   CONTINUAR
========================= */
continueButton.addEventListener("click", () => {

  /* VALIDATION */
  if(uploadedFiles.length === 0){

    alert(
      "Debes subir al menos una imagen."
    );

    return;

  }

  /* SAVE DATA */
  localStorage.setItem(
    "productImages",
    JSON.stringify(
      uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    )
  );

  /* NEXT PAGE */
  window.location.href =
  "5LogisticaYDespacho.html";

});

/* =========================================================
   MEDIA SYSTEM
========================================================= */

const uploadZone =
document.getElementById("uploadZone");

const imageInput =
document.getElementById("imageInput");

const selectImagesBtn =
document.getElementById("selectImagesBtn");

const mediaPreviewGrid =
document.getElementById("mediaPreviewGrid");

const totalImages =
document.getElementById("totalImages");

const optimizedSize =
document.getElementById("optimizedSize");

let uploadedFiles = [];

/* =========================
   OPEN FILE INPUT
========================= */
selectImagesBtn.addEventListener(
  "click",
  () => {

    imageInput.click();

  }
);

uploadZone.addEventListener(
  "click",
  () => {

    imageInput.click();

  }
);

/* =========================
   INPUT CHANGE
========================= */
imageInput.addEventListener(
  "change",
  async (e) => {

    await handleFiles(e.target.files);

  }
);

/* =========================
   DRAG & DROP
========================= */
uploadZone.addEventListener(
  "dragover",
  (e) => {

    e.preventDefault();

    uploadZone.classList.add(
      "dragging"
    );

  }
);

uploadZone.addEventListener(
  "dragleave",
  () => {

    uploadZone.classList.remove(
      "dragging"
    );

  }
);

uploadZone.addEventListener(
  "drop",
  async (e) => {

    e.preventDefault();

    uploadZone.classList.remove(
      "dragging"
    );

    await handleFiles(
      e.dataTransfer.files
    );

  }
);

/* =========================
   HANDLE FILES
========================= */
async function handleFiles(files){

  const validFiles = [...files];

  if(
    uploadedFiles.length +
    validFiles.length > 5
  ){

    alert(
      "Solo podés subir hasta 5 imágenes."
    );

    return;

  }

  for(const file of validFiles){

    if(
      !file.type.startsWith("image/")
    ) continue;

    const optimizedFile =
    await convertToWebP(file);

    createPreview(optimizedFile);

  }

}

/* =========================
   CONVERT TO WEBP
========================= */
async function convertToWebP(file){

  return new Promise((resolve) => {

    const img = new Image();

    img.src =
    URL.createObjectURL(file);

    img.onload = () => {

      const canvas =
      document.createElement("canvas");

      const ctx =
      canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      const maxWidth = 1600;

      /* RESIZE */
      if(width > maxWidth){

        height *= maxWidth / width;

        width = maxWidth;

      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(
        img,
        0,
        0,
        width,
        height
      );

      /* WEBP */
      canvas.toBlob(

        (blob) => {

          const webpFile =
          new File(
            [blob],
            file.name.replace(
              /\.\w+$/,
              ".webp"
            ),
            {
              type: "image/webp"
            }
          );

          resolve(webpFile);

        },

        "image/webp",
        0.75

      );

    };

  });

}

/* =========================
   CREATE PREVIEW
========================= */
function createPreview(file){

  const imageUrl =
  URL.createObjectURL(file);

  const mediaItem =
  document.createElement("div");

  mediaItem.className =
  "media-item";

  mediaItem.innerHTML = `
  
    <div class="media-image-wrapper">

      <img
        src="${imageUrl}"
        class="media-image"
      >

      <div class="media-actions">

        <button
          class="media-action-btn rotate-btn"
        >
          <i class="fa-solid fa-rotate-right"></i>
        </button>

        <button
          class="media-action-btn delete-btn"
        >
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>

    </div>

    <div class="media-content">

      <div class="media-name">
        ${file.name}
      </div>

      <div class="progress-wrapper">
        <div class="progress-bar"></div>
      </div>

      <div class="media-size">
        ${(file.size / 1024 / 1024).toFixed(2)} MB
      </div>

    </div>

  `;

  mediaPreviewGrid.appendChild(
    mediaItem
  );

  uploadedFiles.push(file);

  updateSummary();

  simulateUpload(mediaItem);

  /* ROTATE */
  const rotateBtn =
  mediaItem.querySelector(
    ".rotate-btn"
  );

  const image =
  mediaItem.querySelector(
    ".media-image"
  );

  let rotation = 0;

  rotateBtn.addEventListener(
    "click",
    () => {

      rotation += 90;

      image.style.transform =
      `rotate(${rotation}deg)`;

    }
  );

  /* DELETE */
  const deleteBtn =
  mediaItem.querySelector(
    ".delete-btn"
  );

  deleteBtn.addEventListener(
    "click",
    () => {

      mediaItem.remove();

      uploadedFiles =
      uploadedFiles.filter(
        currentFile =>
        currentFile !== file
      );

      updateSummary();

    }
  );

}

/* =========================
   SIMULATE UPLOAD
========================= */
function simulateUpload(mediaItem){

  const progressBar =
  mediaItem.querySelector(
    ".progress-bar"
  );

  let progress = 0;

  const interval =
  setInterval(() => {

    progress += 10;

    progressBar.style.width =
    progress + "%";

    if(progress >= 100){

      clearInterval(interval);

    }

  }, 80);

}

/* =========================
   UPDATE SUMMARY
========================= */
function updateSummary(){

  totalImages.textContent =
  `${uploadedFiles.length} / 5`;

  const totalSize =
  uploadedFiles.reduce(

    (acc, file) =>
      acc + file.size,

    0

  );

  optimizedSize.textContent =
  `${(
    totalSize /
    1024 /
    1024
  ).toFixed(2)} MB`;

}
