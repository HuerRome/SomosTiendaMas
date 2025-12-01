
const track = document.querySelector('.ml-track');
const slides = Array.from(document.querySelectorAll('.ml-slide'));
const dotsContainer = document.querySelector('.ml-dots');
const prevBtn = document.querySelector('.ml-prev');
const nextBtn = document.querySelector('.ml-next');
let index = 0;
// Crear puntos dinámicamente
slides.forEach((_, i) => {
  const b = document.createElement('button');
  if (i === 0) b.classList.add('active');
  dotsContainer.appendChild(b);
  b.addEventListener('click', () => goToSlide(i));
});
const dots = Array.from(document.querySelectorAll('.ml-dots button'));
function goToSlide(i) {
  index = i;
  updateSlider();
}
function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
}
prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
});
nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateSlider();
});


/* ========================
   DESLIZAR EN CELULAR
   ======================== */

let startX = 0;
let moveX = 0;
let isMoving = false;

track.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isMoving = true;
});

track.addEventListener("touchmove", (e) => {
  if (!isMoving) return;
  moveX = e.touches[0].clientX;

  const diff = startX - moveX;

  // Para que se mueva un poquito mientras arrastrás (opcional)
  track.style.transform = `translateX(-${index * 100 + diff / 5}%)`;
});

track.addEventListener("touchend", () => {
  isMoving = false;

  const diff = startX - moveX;

  // Sensibilidad del swipe (50px)
  if (diff > 50) {
    index = (index + 1) % slides.length; // swipe izquierda → siguiente
  } else if (diff < -50) {
    index = (index - 1 + slides.length) % slides.length; // swipe derecha → anterior
  }

  updateSlider();
  track.style.transition = "transform 0.45s ease";
});

/* ========================
   AUTOPLAY
   ======================== */

let autoplayInterval;
const autoplayDelay = 4000; // tiempo en ms (4 segundos)

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlider();
  }, autoplayDelay);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Iniciar autoplay al cargar
startAutoplay();

// Pausar autoplay si el usuario interactúa
track.addEventListener("mouseenter", stopAutoplay); // desktop
track.addEventListener("mouseleave", startAutoplay);

track.addEventListener("touchstart", stopAutoplay); // mobile
track.addEventListener("touchend", startAutoplay);


















