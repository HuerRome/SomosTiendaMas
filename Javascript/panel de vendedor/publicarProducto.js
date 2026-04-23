const form = document.getElementById("productForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const product = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    category: document.getElementById("category").value,
    stock: document.getElementById("stock").value,
    description: document.getElementById("description").value,
    image: document.getElementById("image").value
  };

  const products = JSON.parse(localStorage.getItem("sellerProducts")) || [];
  products.push(product);

  localStorage.setItem("sellerProducts", JSON.stringify(products));

  alert("Producto publicado correctamente");

  form.reset();
});
