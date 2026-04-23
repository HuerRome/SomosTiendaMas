const input = document.getElementById("imageInput");
const fileBtn = document.getElementById("fileBtn");
const fileText = document.getElementById("fileText");
const preview = document.getElementById("preview");
const form = document.getElementById("productForm");

let images = [];

/* ABRIR SELECTOR */
fileBtn.addEventListener("click", () => {
  input.click();
});

/* SELECCIONAR IMÁGENES */
input.addEventListener("change", () => {
  const files = Array.from(input.files);

  if (images.length + files.length > 5) {
    alert("Máximo 5 imágenes");
    return;
  }

  if (files.length === 0) {
    fileText.textContent = "No se eligió ningún archivo";
    return;
  }

  fileText.textContent =
    files.length === 1
      ? files[0].name
      : `${files.length} archivos seleccionados`;

  files.forEach(file => {
    const reader = new FileReader();

    reader.onload = (e) => {
      images.push(e.target.result);
      renderImages();
    };

    reader.readAsDataURL(file);
  });

  input.value = "";
});

/* RENDER PREVIEW */
function renderImages() {
  preview.innerHTML = "";

  images.forEach((img, index) => {
    const div = document.createElement("div");
    div.classList.add("preview-item");

    div.innerHTML = `
      <img src="${img}">
      <button class="remove" onclick="removeImage(${index})">x</button>
    `;

    preview.appendChild(div);
  });
}

/* ELIMINAR */
function removeImage(index) {
  images.splice(index, 1);
  renderImages();
}

/* VALIDACIÓN */
function validateNumber(value) {
  return value >= 0;
}

/* SUBMIT */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const stock = parseInt(document.getElementById("stock").value);
  const location = document.getElementById("location").value.trim();
  const shipping = document.getElementById("shipping").checked;
  const description = document.getElementById("description").value.trim();

  if (!name || !location || !description) {
    alert("Completar todos los campos obligatorios");
    return;
  }

  if (!validateNumber(price) || !validateNumber(stock)) {
    alert("Precio y stock no pueden ser negativos");
    return;
  }

  if (images.length === 0) {
    alert("Subí al menos una imagen");
    return;
  }

  const product = {
    name,
    price,
    stock,
    location,
    shipping,
    description,
    images
  };

  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  alert("Producto publicado correctamente");

  form.reset();
  images = [];
  renderImages();
  fileText.textContent = "No se eligió ningún archivo";
});

