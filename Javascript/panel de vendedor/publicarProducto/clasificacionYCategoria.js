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
    "Decoración",
    "Cocina",
    "Iluminación"
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
    "Correas",
    "Camas",
    "Accesorios"
  ]

};

const categoryButtons =
document.querySelectorAll(".publish-category");

const subcategoryList =
document.getElementById("subcategoryList");

const selectedCategory =
document.getElementById("selectedCategory");

const searchInput =
document.getElementById("categorySearch");

let currentCategory = "ropa";
let currentSubcategory = "Remeras";

/* =========================
   LOAD SUBCATEGORIES
========================= */
function loadSubcategories(category){

  subcategoryList.innerHTML = "";

  categories[category].forEach(sub => {

    const item =
    document.createElement("div");

    item.classList.add("subcategory-item");

    if(sub === currentSubcategory){
      item.classList.add("active");
    }

    item.textContent = sub;

    item.addEventListener("click", () => {

      document
      .querySelectorAll(".subcategory-item")
      .forEach(el => {
        el.classList.remove("active");
      });

      item.classList.add("active");

      currentSubcategory = sub;

      updateSelected();

    });

    subcategoryList.appendChild(item);

  });

}

loadSubcategories(currentCategory);

/* =========================
   CATEGORY CHANGE
========================= */
categoryButtons.forEach(button => {

  button.addEventListener("click", () => {

    categoryButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    currentCategory =
    button.dataset.category;

    currentSubcategory =
    categories[currentCategory][0];

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
   SEARCH
========================= */
searchInput.addEventListener("input", e => {

  const value =
  e.target.value.toLowerCase();

  categoryButtons.forEach(button => {

    const text =
    button.innerText.toLowerCase();

    if(text.includes(value)){
      button.style.display = "flex";
    } else {
      button.style.display = "none";
    }

  });

});
