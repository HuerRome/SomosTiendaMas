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

/* SUBMIT */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value,
    images: images
  };

  if (images.length === 0) {
    alert("Subí al menos una imagen");
    return;
  }

  const products = JSON.parse(localStorage.getItem("products")) || [];

  products.push(product);

  localStorage.setItem("products", JSON.stringify(products));

  alert("Producto publicado");

  form.reset();
  images = [];
  renderImages();
});
