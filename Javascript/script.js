

//Slider de productos

      const carousel = document.getElementById('carousel');
      const items = document.querySelectorAll('.carousel-item');
      const dots = document.querySelectorAll('.dot');
      let index = 0;
  
      function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
          dot.classList.toggle('bg-white', i === index);
          dot.classList.toggle('bg-white/50', i !== index);
        });
      }
  
      document.getElementById('next').addEventListener('click', () => {
        index = (index + 1) % items.length;
        updateCarousel();
      });
  
      document.getElementById('prev').addEventListener('click', () => {
        index = (index - 1 + items.length) % items.length;
        updateCarousel();
      });
  
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          index = i;
          updateCarousel();
        });
      });
  
      // Cambio automático cada 5 segundos
      setInterval(() => {
        index = (index + 1) % items.length;
        updateCarousel();
      }, 5000);
  
      updateCarousel();
    