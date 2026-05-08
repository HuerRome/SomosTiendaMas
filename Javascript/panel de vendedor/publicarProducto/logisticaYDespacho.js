const productPrice =
document.getElementById("productPrice");

const shippingPrice =
document.getElementById("shippingPrice");

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

/* =========================================================
   COMMISSION CALCULATOR
========================================================= */
function calculateCommission(){

  const price =
  Number(productPrice.value) || 0;

  const shipping =
  Number(shippingPrice.value) || 0;

  const total =
  price + shipping;

  const commission =
  total * 0.10;

  const sellerReceives =
  total - commission;

  previewPrice.textContent =
  `$${total.toFixed(2)}`;

  previewCommission.textContent =
  `- $${commission.toFixed(2)}`;

  previewTotal.textContent =
  `$${sellerReceives.toFixed(2)}`;

}

productPrice.addEventListener(
  "input",
  calculateCommission
);

shippingPrice.addEventListener(
  "input",
  calculateCommission
);

/* =========================================================
   PICKUP TOGGLE
========================================================= */
allowPickup.addEventListener(
  "change",
  () => {

    pickupBox.classList.toggle(
      "hidden",
      !allowPickup.checked
    );

  }
);

/* =========================================================
   BUTTONS NAVIGATION
========================================================= */

const backButton =
document.querySelector(".secondary-btn");

const continueButton =
document.querySelector(".primary-btn");

/* =========================
   VOLVER
========================= */
backButton.addEventListener(
  "click",
  () => {

    window.location.href =
    "3GestionDeMultimedia.html";

  }
);

/* =========================
   CONTINUAR
========================= */
continueButton.addEventListener(
  "click",
  () => {

    /* VALIDATION */
    if(
      !productPrice.value ||
      Number(productPrice.value) <= 0
    ){

      alert(
        "Ingresá un precio válido."
      );

      productPrice.focus();

      return;

    }

    /* SAVE DATA */
    const logisticsData = {

      productPrice:
      productPrice.value,

      shippingPrice:
      shippingPrice.value,

      total:
      previewPrice.textContent,

      commission:
      previewCommission.textContent,

      sellerReceives:
      previewTotal.textContent,

      allowPickup:
      allowPickup.checked

    };

    localStorage.setItem(
      "logisticsData",
      JSON.stringify(logisticsData)
    );

    /* NEXT PAGE */
    window.location.href =
    "vistaPreviaYConfirmacion.html";
 
  }
);

/* =========================================================
   INIT
========================================================= */
calculateCommission();

