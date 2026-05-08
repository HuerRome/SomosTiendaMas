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

/* =========================
   COMMISSION CALCULATOR
========================= */
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

/* =========================
   PICKUP TOGGLE
========================= */
allowPickup.addEventListener("change", () => {

  pickupBox.classList.toggle(
    "hidden",
    !allowPickup.checked
  );

});

/* INIT */
calculateCommission();
