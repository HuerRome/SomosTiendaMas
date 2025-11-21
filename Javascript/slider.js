
  const swiper = new Swiper(".categoriaSlider", {
    slidesPerView: 2,
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    centeredSlides: false,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: { slidesPerView: 4, spaceBetween: 15 },
      1024: { slidesPerView: 6, spaceBetween: 20 },
      1280: { slidesPerView: 8, spaceBetween: 24 },
    },
  });

  const slider = document.getElementById("ofertasScroll");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("cursor-grabbing");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("cursor-grabbing");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("cursor-grabbing");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // velocidad del arrastre
    slider.scrollLeft = scrollLeft - walk;
  });








