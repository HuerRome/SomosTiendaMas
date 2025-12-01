
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');

let index = 0;

/* Crear puntos dinámicos */
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.setAttribute('data-index', i);
  dotsContainer.appendChild(dot);
});
updateDots();

/* Mover slider */
function showSlide(i) {
  index = (i + slides.length) % slides.length;
  slider.style.transform = `translateX(${-index * 100}%)`;
  updateDots();
}

/* Actualizar puntos */
function updateDots() {
  document.querySelectorAll('.dots span').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.onclick = () => showSlide(i);
  });
}

/* Flechas */
prevBtn.onclick = () => showSlide(index - 1);
nextBtn.onclick = () => showSlide(index + 1);

/* Swipe para móviles */
let startX = 0;
slider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
slider.addEventListener('touchend', e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) showSlide(index + 1);
  if (endX - startX > 50) showSlide(index - 1);
});





















