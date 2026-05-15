/* =========================================
   CATEGORY
========================================= */

const currentCategory = "calzado";

/* =========================================
   ELEMENTS
========================================= */

const dynamicFields =
document.getElementById("dynamicFields");

const previewTitle =
document.getElementById("previewTitle");

const previewCategory =
document.getElementById("previewCategory");

const productNameInput =
document.getElementById("productName");

const productSlug =
document.getElementById("productSlug");

const attributeSelector =
document.getElementById("attributeSelector");

const attributeValueSelector =
document.getElementById("attributeValueSelector");

const addFeatureBtn =
document.getElementById("addFeatureBtn");

const featureTags =
document.getElementById("featureTags");

/* =========================================
   CONFIG
========================================= */

const categoryFields = {

  calzado: {

    fields: [

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

    attributes: {

      Marca: [
        "Nike",
        "Adidas",
        "Puma"
      ],

      Género: [
        "Hombre",
        "Mujer",
        "Unisex"
      ],

      Estilo: [
        "Deportivo",
        "Casual",
        "Running"
      ]

    }

  }

};

/* =========================================
   RENDER FIELDS
========================================= */

function renderFields(category){

  dynamicFields.innerHTML = "";

  const categoryData =
  categoryFields[category];

  categoryData.fields.forEach(field => {

    const wrapper =
    document.createElement("div");

    wrapper.classList.add("input-group");

    const label =
    document.createElement("label");

    label.textContent =
    field.label;

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

    /* INPUT */
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

  renderAttributes(category);

  updatePreview();

}

/* =========================================
   ATTRIBUTES
========================================= */

function renderAttributes(category){

  attributeSelector.innerHTML =
  `<option value="">Seleccionar atributo</option>`;

  attributeValueSelector.innerHTML =
  `<option value="">Seleccionar valor</option>`;

  const attributes =
  categoryFields[category].attributes;

  Object.keys(attributes).forEach(attribute => {

    const option =
    document.createElement("option");

    option.value = attribute;
    option.textContent = attribute;

    attributeSelector.appendChild(option);

  });

}

/* =========================================
   ATTRIBUTE CHANGE
========================================= */

attributeSelector.addEventListener(
  "change",
  () => {

    attributeValueSelector.innerHTML =
    `<option value="">Seleccionar valor</option>`;

    const selectedAttribute =
    attributeSelector.value;

    if(!selectedAttribute) return;

    const values =
    categoryFields[
      currentCategory
    ].attributes[selectedAttribute];

    values.forEach(value => {

      const option =
      document.createElement("option");

      option.value = value;
      option.textContent = value;

      attributeValueSelector.appendChild(option);

    });

  }
);

/* =========================================
   ADD FEATURE
========================================= */

addFeatureBtn.addEventListener(
  "click",
  () => {

    const attribute =
    attributeSelector.value;

    const value =
    attributeValueSelector.value;

    if(!attribute || !value){

      alert(
        "Seleccioná atributo y valor."
      );

      return;

    }

    const tag =
    document.createElement("div");

    tag.classList.add("feature-tag");

    tag.innerHTML = `
      ${attribute}: ${value}
      <button type="button">✕</button>
    `;

    tag.querySelector("button")
    .addEventListener(
      "click",
      () => tag.remove()
    );

    featureTags.appendChild(tag);

  }
);

/* =========================================
   PREVIEW
========================================= */

function updatePreview(){

  const productName =
  productNameInput.value.trim();

  previewTitle.textContent =
  productName || "Nombre del producto";

  previewCategory.textContent =
  "Categoría: Calzado";

}

/* =========================================
   AUTO SLUG
========================================= */

productNameInput.addEventListener(
  "input",
  () => {

    updatePreview();

    productSlug.value =
    productNameInput.value
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replace(/[^\w-]+/g, "");

  }
);

/* =========================================
   VALIDATION
========================================= */

function validateField(field){

  if(!field.value.trim()){

    field.classList.add("input-error");
    field.classList.remove("input-success");

    return false;

  }

  field.classList.remove("input-error");
  field.classList.add("input-success");

  return true;

}

/* =========================================
   BUTTONS
========================================= */

const backBtn =
document.getElementById("backBtn");

const continueBtn =
document.getElementById("continueBtn");

/* BACK */

backBtn.addEventListener(
  "click",
  () => {

    window.location.href =
    "1ClasificacionYCategoria.html";

  }
);

/* CONTINUE */

continueBtn.addEventListener(
  "click",
  () => {

    const requiredFields = [

      document.getElementById("productName"),

      document.getElementById("productDescription"),

      document.getElementById("productBrand"),

      document.getElementById("productCondition"),

      document.getElementById("productSku"),

      document.getElementById("productSlug")

    ];

    let isValid = true;

    requiredFields.forEach(field => {

      const valid =
      validateField(field);

      if(!valid){
        isValid = false;
      }

    });

    if(!isValid){

      alert(
        "Completá todos los campos obligatorios."
      );

      return;

    }

    /* SAVE */

    const technicalData = {

      productName:
      document.getElementById("productName").value,

      description:
      document.getElementById("productDescription").value,

      brand:
      document.getElementById("productBrand").value,

      condition:
      document.getElementById("productCondition").value,

      sku:
      document.getElementById("productSku").value,

      slug:
      document.getElementById("productSlug").value,

      category:
      currentCategory

    };

    localStorage.setItem(
      "technicalData",
      JSON.stringify(technicalData)
    );

    /* REDIRECT */

    window.location.href =
    "3GestionDeMultimedia.html";

  }
);

/* =========================================
   INIT
========================================= */

renderFields(currentCategory);

updatePreview();
