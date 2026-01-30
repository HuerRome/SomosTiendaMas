
//Product Slider 1
/*
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("bestSellersSlider");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  if (!slider || !prevBtn || !nextBtn) {
    console.error("Slider o botones no encontrados");
    return;
  }

  const cardWidth = slider.querySelector(".product-card").offsetWidth;
  const gap = 16; 
  const scrollAmount = cardWidth + gap;

  nextBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  });

  prevBtn.addEventListener("click", () => {
    slider.scrollBy({
      left: -scrollAmount,
      behavior: "smooth"
    });
  });
});
*/

//Product Slider
document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los sliders de la página
  const sliders = document.querySelectorAll(".best-sellers");

  sliders.forEach(sliderSection => {
    const slider = sliderSection.querySelector(".best-sellers-container");
    const prevBtn = sliderSection.querySelector(".slider-btn.prev");
    const nextBtn = sliderSection.querySelector(".slider-btn.next");

    if (!slider || !prevBtn || !nextBtn) {
      console.error("Slider o botones no encontrados");
      return;
    }

    const cardWidth = slider.querySelector(".product-card").offsetWidth;
    const gap = 16;
    const scrollAmount = cardWidth + gap;

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });
  });
});
