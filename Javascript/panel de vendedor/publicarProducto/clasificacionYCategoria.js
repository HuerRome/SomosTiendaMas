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

/* ===========================================================================
   STEPS SYSTEM
=========================================================================== */

const steps =
document.querySelectorAll(".publish-step");

const lines =
document.querySelectorAll(".publish-line");

/* =========================
   CHANGE STEP
========================= */
function setActiveStep(stepNumber){

  steps.forEach((step, index) => {

    step.classList.remove(
      "active",
      "completed"
    );

    /* CURRENT */
    if(index + 1 === stepNumber){

      step.classList.add("active");

    }

    /* PREVIOUS */
    else if(index + 1 < stepNumber){

      step.classList.add("completed");

    }

  });

  /* LINES */
  lines.forEach((line, index) => {

    line.classList.remove("active");

    if(index + 1 < stepNumber){

      line.classList.add("active");

    }

  });

}

/* =========================
   INIT
========================= */
setActiveStep(1);

/*
=========================
USAGE EXAMPLES
=========================

Página 1:
setActiveStep(1);

Página 2:
setActiveStep(2);

Página 3:
setActiveStep(3);

Página 4:
setActiveStep(4);

Página 5:
setActiveStep(5);

*/


/*--------------------------------------------------------------------------------------------------------------------------------------- */
/* =========================
   CONTINUE BUTTON
========================= */

const continueBtn =
document.getElementById("continueBtn");

continueBtn.addEventListener("click", () => {

  /* VALIDATION */
  if(!currentCategory || !currentSubcategory){

    alert(
      "Seleccioná una categoría y subcategoría."
    );

    return;

  }

  /* SAVE DATA */
  const publishData = {

    category: currentCategory,
    subcategory: currentSubcategory

  };

  localStorage.setItem(
    "publishProductData",
    JSON.stringify(publishData)
  );

  /* REDIRECT */
  window.location.href =
  "2InformacionYFichaTecnica.html";

});