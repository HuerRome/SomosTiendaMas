/* =========================
   ELEMENTS
========================= */

const productPrice =
document.getElementById("productPrice");

const previewPrice =
document.getElementById("previewPrice");

const previewCommission =
document.getElementById("previewCommission");

const previewTotal =
document.getElementById("previewTotal");

const allowPickup =
document.getElementById("allowPickup");

const pickupBox =
document.getElementById("pickupBox");

const continueBtn =
document.getElementById("continueBtn");

const backBtn =
document.getElementById("backBtn");

/* =========================
   COMMISSION
========================= */

function calculateCommission(){

  const price =
  Number(productPrice.value) || 0;

  const commission =
  price * 0.10;

  const sellerReceives =
  price - commission;

  previewPrice.textContent =
  `$${price.toFixed(2)}`;

  previewCommission.textContent =
  `- $${commission.toFixed(2)}`;

  previewTotal.textContent =
  `$${sellerReceives.toFixed(2)}`;

}

productPrice.addEventListener(
  "input",
  calculateCommission
);

/* =========================
   PICKUP
========================= */

allowPickup.addEventListener(
  "change",
  () => {

    pickupBox.classList.toggle(
      "hidden",
      !allowPickup.checked
    );

  }
);

/* =========================
   VALIDATION
========================= */

function validateField(field){

  if(!field.value.trim()){

    field.classList.add("input-error");
    return false;

  }

  field.classList.remove("input-error");

  return true;

}

/* =========================
   BACK
========================= */

backBtn.addEventListener(
  "click",
  () => {

    window.location.href =
    "3GestionDeMultimedia.html";

  }
);

/* =========================
   CONTINUE
========================= */

continueBtn.addEventListener(
  "click",
  () => {

    const requiredFields = [

      document.getElementById(
        "productPrice"
      ),

      document.getElementById(
        "productPriceWithoutTax"
      ),

      document.getElementById(
        "productStock"
      ),

      document.getElementById(
        "productWidth"
      ),

      document.getElementById(
        "productHeight"
      ),

      document.getElementById(
        "productLength"
      ),

      document.getElementById(
        "productWeight"
      ),

      document.getElementById(
        "dispatchTime"
      ),

      document.getElementById(
        "productWarranty"
      ),

      document.getElementById(
        "returnsPolicy"
      )

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

    const logisticsData = {

      productPrice:
      document.getElementById(
        "productPrice"
      ).value,

      productPriceWithoutTax:
      document.getElementById(
        "productPriceWithoutTax"
      ).value,

      stock:
      document.getElementById(
        "productStock"
      ).value,

      width:
      document.getElementById(
        "productWidth"
      ).value,

      height:
      document.getElementById(
        "productHeight"
      ).value,

      length:
      document.getElementById(
        "productLength"
      ).value,

      weight:
      document.getElementById(
        "productWeight"
      ).value,

      dispatchTime:
      document.getElementById(
        "dispatchTime"
      ).value,

      warranty:
      document.getElementById(
        "productWarranty"
      ).value,

      returnsPolicy:
      document.getElementById(
        "returnsPolicy"
      ).value,

      allowShipping:
      document.getElementById(
        "allowShipping"
      ).checked,

      allowPickup:
      allowPickup.checked

    };

    localStorage.setItem(
      "logisticsData",
      JSON.stringify(logisticsData)
    );

    window.location.href =
    "vistaPreviaYConfirmacion.html";

  }
);

/* =========================
   INIT
========================= */

calculateCommission();

