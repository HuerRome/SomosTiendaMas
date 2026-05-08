/* =========================
   DYNAMIC FIELDS
========================= */

const categorySelector =
document.getElementById("categorySelector");

const dynamicFields =
document.getElementById("dynamicFields");

const previewCategory =
document.getElementById("previewCategory");

/* =========================
   CONFIG
========================= */
const categoryFields = {

  calzado: [

    {
      label: "Talla",
      type: "select",
      options: [
        "38",
        "39",
        "40",
        "41",
        "42"
      ]
    },

    {
      label: "Color",
      type: "select",
      options: [
        "Negro",
        "Blanco",
        "Rojo",
        "Azul"
      ]
    },

    {
      label: "Material",
      type: "text",
      placeholder: "Ej: Cuero"
    }

  ],

  celulares: [

    {
      label: "RAM",
      type: "select",
      options: [
        "4GB",
        "6GB",
        "8GB",
        "12GB"
      ]
    },

    {
      label: "Almacenamiento",
      type: "select",
      options: [
        "128GB",
        "256GB",
        "512GB"
      ]
    },

    {
      label: "Batería",
      type: "text",
      placeholder: "Ej: 5000mAh"
    }

  ],

  ropa: [

    {
      label: "Talle",
      type: "select",
      options: [
        "S",
        "M",
        "L",
        "XL"
      ]
    },

    {
      label: "Color",
      type: "select",
      options: [
        "Negro",
        "Blanco",
        "Gris"
      ]
    },

    {
      label: "Género",
      type: "select",
      options: [
        "Hombre",
        "Mujer",
        "Unisex"
      ]
    }

  ]

};

/* =========================
   RENDER
========================= */
function renderFields(category){

  dynamicFields.innerHTML = "";

  const fields =
  categoryFields[category];

  fields.forEach(field => {

    const wrapper =
    document.createElement("div");

    wrapper.classList.add("input-group");

    const label =
    document.createElement("label");

    label.textContent = field.label;

    wrapper.appendChild(label);

    /* SELECT */
    if(field.type === "select"){

      const select =
      document.createElement("select");

      field.options.forEach(option => {

        const opt =
        document.createElement("option");

        opt.value = option;

        opt.textContent = option;

        select.appendChild(opt);

      });

      wrapper.appendChild(select);

    }

    /* TEXT */
    else{

      const input =
      document.createElement("input");

      input.type = "text";

      input.placeholder =
      field.placeholder;

      wrapper.appendChild(input);

    }

    dynamicFields.appendChild(wrapper);

  });

  updatePreview(category);

}

/* =========================
   UPDATE PREVIEW
========================= */
function updatePreview(category){

  let categoryName = "";

  if(category === "calzado"){
    categoryName = "Calzado";
  }

  if(category === "celulares"){
    categoryName =
    "Tecnología / Celulares";
  }

  if(category === "ropa"){
    categoryName = "Ropa";
  }

  previewCategory.textContent =
  `Categoría: ${categoryName}`;

}

/* =========================
   EVENTS
========================= */
categorySelector.addEventListener(
  "change",
  e => {

    renderFields(e.target.value);

  }
);

/* =========================
   INIT
========================= */
renderFields("calzado");




/*-------------------------------------------------------------------------------------------------------------- */
/* =========================
   BUTTONS
========================= */

const backBtn =
document.getElementById("backBtn");

const continueBtn =
document.getElementById("continueBtn");

/* =========================
   BACK
========================= */

backBtn.addEventListener("click", () => {

  window.location.href =
  "1ClasificacionYCategoria.html";

});

/* =========================
   CONTINUE
========================= */

continueBtn.addEventListener("click", () => {

  /* INPUTS */
  const productName =
  document.querySelector(
    'input[placeholder*="Zapatillas"]'
  ).value;

  const description =
  document.querySelector("textarea").value;

  const brand =
  document.querySelector(
    'input[placeholder="Ej: Samsung"]'
  ).value;

  const model =
  document.querySelector(
    'input[placeholder="Ej: S24 Ultra"]'
  ).value;

  /* VALIDATION */
  if(
    !productName ||
    !description ||
    !brand ||
    !model
  ){

    alert(
      "Completá todos los campos."
    );

    return;

  }

  /* SAVE DATA */
  const technicalData = {

    productName,
    description,
    brand,
    model,

    category:
    categorySelector.value

  };

  localStorage.setItem(
    "technicalData",
    JSON.stringify(technicalData)
  );

  /* REDIRECT */
  window.location.href =
  "3GestionDeMultimedia.html";

});
