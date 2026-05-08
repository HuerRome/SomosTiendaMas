const uploadZone = document.getElementById("uploadZone");
const imageInput = document.getElementById("imageInput");
const selectImagesBtn = document.getElementById("selectImagesBtn");

const mediaPreviewGrid = document.getElementById("mediaPreviewGrid");

const totalImages = document.getElementById("totalImages");
const optimizedSize = document.getElementById("optimizedSize");

let uploadedFiles = [];

/* =========================
   OPEN FILES
========================= */
selectImagesBtn.addEventListener("click", () => {
  imageInput.click();
});

uploadZone.addEventListener("click", () => {
  imageInput.click();
});

/* =========================
   INPUT CHANGE
========================= */
imageInput.addEventListener("change", (e) => {
  handleFiles(e.target.files);
});

/* =========================
   DRAG & DROP
========================= */
uploadZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadZone.classList.add("dragging");
});

uploadZone.addEventListener("dragleave", () => {
  uploadZone.classList.remove("dragging");
});

uploadZone.addEventListener("drop", (e) => {
  e.preventDefault();

  uploadZone.classList.remove("dragging");

  handleFiles(e.dataTransfer.files);
});

/* =========================
   HANDLE FILES
========================= */
function handleFiles(files){

  const validFiles = [...files];

  if(uploadedFiles.length + validFiles.length > 5){
    alert("Solo podés subir hasta 5 imágenes.");
    return;
  }

  validFiles.forEach((file) => {

    if(!file.type.startsWith("image/")) return;

    createPreview(file);

  });

}

/* =========================
   CREATE PREVIEW
========================= */
function createPreview(file){

  const reader = new FileReader();

  reader.onload = (e) => {

    const imageUrl = e.target.result;

    const mediaItem = document.createElement("div");
    mediaItem.className = "media-item";

    mediaItem.innerHTML = `
      <div class="media-image-wrapper">

        <img
          src="${imageUrl}"
          class="media-image"
        >

        <div class="media-actions">

          <button class="media-action-btn rotate-btn">
            <i class="fa-solid fa-rotate-right"></i>
          </button>

          <button class="media-action-btn delete-btn">
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

    mediaPreviewGrid.appendChild(mediaItem);

    uploadedFiles.push(file);

    updateSummary();

    simulateUpload(mediaItem);

    /* ROTATE */
    const rotateBtn = mediaItem.querySelector(".rotate-btn");
    const image = mediaItem.querySelector(".media-image");

    let rotation = 0;

    rotateBtn.addEventListener("click", () => {

      rotation += 90;

      image.style.transform = `rotate(${rotation}deg)`;

    });

    /* DELETE */
    const deleteBtn = mediaItem.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {

      mediaItem.remove();

      uploadedFiles = uploadedFiles.filter(
        currentFile => currentFile !== file
      );

      updateSummary();

    });

  };

  reader.readAsDataURL(file);

}

/* =========================
   SIMULATE UPLOAD
========================= */
function simulateUpload(mediaItem){

  const progressBar =
    mediaItem.querySelector(".progress-bar");

  let progress = 0;

  const interval = setInterval(() => {

    progress += 10;

    progressBar.style.width = progress + "%";

    if(progress >= 100){
      clearInterval(interval);
    }

  }, 100);

}

/* =========================
   UPDATE SUMMARY
========================= */
function updateSummary(){

  totalImages.textContent =
    `${uploadedFiles.length} / 5`;

  const totalSize = uploadedFiles.reduce(
    (acc, file) => acc + file.size,
    0
  );

  const optimized =
    (totalSize * 0.7 / 1024 / 1024).toFixed(2);

  optimizedSize.textContent =
    optimized + " MB";

}
