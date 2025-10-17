
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








