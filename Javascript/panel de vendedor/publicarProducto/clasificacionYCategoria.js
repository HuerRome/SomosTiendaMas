const categories = {
  ropa: [
    "Remeras",
    "Buzos",
    "Pantalones",
    "Camperas",
    "Zapatillas"
  ],

  tecnologia: [
    "Celulares",
    "Notebooks",
    "Auriculares",
    "Smartwatch",
    "Monitores"
  ],

  hogar: [
    "Sillas",
    "Mesas",
    "Iluminación",
    "Decoración",
    "Cocina"
  ],

  deportes: [
    "Fútbol",
    "Gym",
    "Running",
    "Básquet",
    "Ciclismo"
  ],

  belleza: [
    "Maquillaje",
    "Perfumes",
    "Skincare",
    "Cabello",
    "Uñas"
  ],

  mascotas: [
    "Alimento",
    "Juguetes",
    "Accesorios",
    "Camas",
    "Correas"
  ]
};

const categoryCards = document.querySelectorAll(".category-card");
const subcategoryList = document.getElementById("subcategoryList");
const selectedCategory = document.getElementById("selectedCategory");
const searchInput = document.getElementById("categorySearch");

let currentCategory = "ropa";
let currentSubcategory = "Remeras";

/* =========================
   LOAD SUBCATEGORIES
========================= */
function loadSubcategories(category) {

  subcategoryList.innerHTML = "";

  categories[category].forEach(sub => {

    const div = document.createElement("div");

    div.classList.add("subcategory-item");

    if(sub === currentSubcategory){
      div.classList.add("active");
    }

    div.textContent = sub;

    div.addEventListener("click", () => {

      document
        .querySelectorAll(".subcategory-item")
        .forEach(item => item.classList.remove("active"));

      div.classList.add("active");

      currentSubcategory = sub;

      updateSelected();
    });

    subcategoryList.appendChild(div);

  });

}

loadSubcategories(currentCategory);

/* =========================
   CATEGORY SELECT
========================= */
categoryCards.forEach(card => {

  card.addEventListener("click", () => {

    categoryCards.forEach(c => c.classList.remove("active"));

    card.classList.add("active");

    currentCategory = card.dataset.category;

    currentSubcategory = categories[currentCategory][0];

    loadSubcategories(currentCategory);

    updateSelected();

  });

});

/* =========================
   UPDATE SELECTED
========================= */
function updateSelected(){

  const categoryName =
    currentCategory.charAt(0).toUpperCase() +
    currentCategory.slice(1);

  selectedCategory.textContent =
    `${categoryName} / ${currentSubcategory}`;

}

/* =========================
   SEARCH FILTER
========================= */
searchInput.addEventListener("input", e => {

  const value = e.target.value.toLowerCase();

  categoryCards.forEach(card => {

    const text = card.innerText.toLowerCase();

    if(text.includes(value)){
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }

  });

});
