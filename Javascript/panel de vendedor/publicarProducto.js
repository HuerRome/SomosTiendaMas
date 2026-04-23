const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const form = document.getElementById("productForm");

let images = [];

/* SUBIR IMÁGENES */
input.addEventListener("change", () => {
  const files = Array.from(input.files);

  if (images.length + files.length > 5) {
    alert("Máximo 5 imágenes");
    return;
  }

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

/* RENDER */
function renderImages() {
  preview.innerHTML = "";

  images.forEach((img, index) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="preview-item">
        <img src="${img}">
        <button class="remove" onclick="removeImage(${index})">x</button>
      </div>
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
  const description = document.getElementById("description").value;

  /* VALIDACIONES */
  if (!name || !location) {
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

  /* OBJETO PRODUCTO */
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
});

