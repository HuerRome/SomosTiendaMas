    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let index = 0;

    /* Crear dots automáticamente */
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('button');

    function updateSlider() {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }

    function goToSlide(i) {
      index = i;
      updateSlider();
    }

    nextBtn.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      updateSlider();
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      updateSlider();
    });

    /* Swipe mobile */
    let startX = 0;

    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', e => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) nextBtn.click();
      if (endX - startX > 50) prevBtn.click();
    });

    let autoplayDelay = 4000; // 4 segundos
    let autoplay;
    
    function startAutoplay() {
      autoplay = setInterval(() => {
        index = (index + 1) % slides.length;
        updateSlider();
      }, autoplayDelay);
    }
    
    function stopAutoplay() {
      clearInterval(autoplay);
    }
    
    // iniciar autoplay
    startAutoplay();

    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    track.addEventListener('touchstart', stopAutoplay);
    track.addEventListener('touchend', startAutoplay);







