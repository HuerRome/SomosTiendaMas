
// ==================== JAVASCRIPT COMPLETO MEJORADO ====================

// 1. GALERÍA DE IMÁGENES
const thumbs = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('mainImage');
const mainImageContainer = document.getElementById('mainImageContainer');

thumbs.forEach(thumb => {
  thumb.addEventListener('click', function() {
    const newImageSrc = this.getAttribute('data-image');
    mainImage.src = newImageSrc;
    
    thumbs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    
    // Resetear zoom al cambiar imagen
    if (mainImageContainer.classList.contains('zoomed')) {
      mainImageContainer.classList.remove('zoomed');
      isZoomed = false;
    }
  });
});

// 2. ZOOM PROFESIONAL TIPO ECOMMERCE
let isZoomed = false;
let mouseX = 0, mouseY = 0;
let imgX = 0, imgY = 0;

// Crear lente de zoom
const zoomLens = document.createElement('div');
zoomLens.className = 'zoom-lens';
mainImageContainer.appendChild(zoomLens);

// Función para actualizar posición del zoom
function updateZoomPosition(e) {
  if (!isZoomed) return;
  
  const rect = mainImageContainer.getBoundingClientRect();
  let clientX, clientY;
  
  // Detectar si es evento táctil o mouse
  if (e.touches) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  
  // Calcular posición relativa dentro del contenedor
  let x = clientX - rect.left;
  let y = clientY - rect.top;
  
  // Limitar dentro del contenedor
  x = Math.min(Math.max(x, 0), rect.width);
  y = Math.min(Math.max(y, 0), rect.height);
  
  // Calcular porcentaje para el desplazamiento de la imagen
  const percentX = x / rect.width;
  const percentY = y / rect.height;
  
  // Calcular desplazamiento de la imagen (zoom 2x)
  const imgRect = mainImage.getBoundingClientRect();
  const moveX = (percentX - 0.5) * 100;
  const moveY = (percentY - 0.5) * 100;
  
  mainImage.style.transform = `scale(2) translate(${-moveX}%, ${-moveY}%)`;
  
  // Posicionar lente de zoom
  const lensSize = 150;
  zoomLens.style.left = `${x - lensSize/2}px`;
  zoomLens.style.top = `${y - lensSize/2}px`;
  zoomLens.style.width = `${lensSize}px`;
  zoomLens.style.height = `${lensSize}px`;
}

// Activar zoom en desktop (hover)
mainImageContainer.addEventListener('mouseenter', function(e) {
  if (window.innerWidth >= 1025) {
    isZoomed = true;
    mainImageContainer.classList.add('zoomed');
    mainImage.style.transform = 'scale(2)';
    updateZoomPosition(e);
  }
});

mainImageContainer.addEventListener('mousemove', function(e) {
  if (isZoomed) {
    updateZoomPosition(e);
  }
});

mainImageContainer.addEventListener('mouseleave', function() {
  if (window.innerWidth >= 1025) {
    isZoomed = false;
    mainImageContainer.classList.remove('zoomed');
    mainImage.style.transform = '';
  }
});

// Activar zoom en mobile (tap y mantener)
let zoomTimeout;
mainImageContainer.addEventListener('touchstart', function(e) {
  if (window.innerWidth < 1025) {
    e.preventDefault();
    zoomTimeout = setTimeout(() => {
      isZoomed = true;
      mainImageContainer.classList.add('zoomed');
      updateZoomPosition(e);
    }, 500);
  }
});

mainImageContainer.addEventListener('touchmove', function(e) {
  if (isZoomed) {
    e.preventDefault();
    updateZoomPosition(e);
  }
});

mainImageContainer.addEventListener('touchend', function() {
  clearTimeout(zoomTimeout);
  if (isZoomed) {
    isZoomed = false;
    mainImageContainer.classList.remove('zoomed');
    mainImage.style.transform = '';
  }
});

// 3. SELECTOR DE CANTIDAD
const qtyInput = document.getElementById('qtyInput');
const qtyText = document.getElementById('qtyText');
const decrementBtn = document.getElementById('decrementQty');
const incrementBtn = document.getElementById('incrementQty');

function updateQuantity() {
  let value = parseInt(qtyInput.value);
  if (isNaN(value)) value = 1;
  value = Math.min(Math.max(value, 1), 10);
  qtyInput.value = value;
  qtyText.textContent = value + (value === 1 ? ' unidad' : ' unidades');
}

decrementBtn.addEventListener('click', () => {
  let current = parseInt(qtyInput.value);
  if (current > 1) {
    qtyInput.value = current - 1;
    updateQuantity();
  }
});

incrementBtn.addEventListener('click', () => {
  let current = parseInt(qtyInput.value);
  if (current < 10) {
    qtyInput.value = current + 1;
    updateQuantity();
  }
});

qtyInput.addEventListener('change', updateQuantity);

// 4. SELECTOR DE TALLE
const sizeBtns = document.querySelectorAll('.size-btn');
const selectedSizeSpan = document.getElementById('selectedSize');

sizeBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    sizeBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const size = this.getAttribute('data-size');
    selectedSizeSpan.textContent = size;
  });
});

// 5. SELECTOR DE COLOR
const colorSelect = document.getElementById('colorSelect');
const selectedColorSpan = document.getElementById('selectedColor');

colorSelect.addEventListener('change', function() {
  selectedColorSpan.textContent = this.value;
});

// 6. BOTONES DE COMPRA
const buyBtn = document.getElementById('buyBtn');
const addToCartBtn = document.getElementById('addToCartBtn');

buyBtn.addEventListener('click', () => {
  const quantity = qtyInput.value;
  const size = selectedSizeSpan.textContent !== 'Elegí' ? selectedSizeSpan.textContent : 'No seleccionado';
  const color = selectedColorSpan.textContent;
  alert(`✅ Compra iniciada\n\nProducto: Buzo Unisex Canguro\nCantidad: ${quantity}\nTalle: ${size}\nColor: ${color}\n\nTotal: $${(38000 * quantity).toLocaleString()}`);
});

addToCartBtn.addEventListener('click', () => {
  const quantity = qtyInput.value;
  const size = selectedSizeSpan.textContent !== 'Elegí' ? selectedSizeSpan.textContent : 'No seleccionado';
  const color = selectedColorSpan.textContent;
  alert(`🛒 Agregado al carrito\n\n${quantity} x Buzo Unisex Canguro\nTalle: ${size}\nColor: ${color}\n\nSubtotal: $${(38000 * quantity).toLocaleString()}`);
});

// 7. FAVORITOS
const favoriteBtn = document.querySelector('.favorite');
let isFavorite = false;
favoriteBtn.addEventListener('click', function() {
  isFavorite = !isFavorite;
  if (isFavorite) {
    this.innerHTML = '<i class="fa-solid fa-heart" style="color: #e74c3c;"></i>';
  } else {
    this.innerHTML = '<i class="fa-regular fa-heart"></i>';
  }
});

// 8. MOSTRAR MÁS CARACTERÍSTICAS
const toggleFeaturesBtn = document.getElementById('toggleFeatures');
let featuresExpanded = false;
toggleFeaturesBtn.addEventListener('click', function() {
  featuresExpanded = !featuresExpanded;
  if (featuresExpanded) {
    this.innerHTML = 'Mostrar menos características <span class="features-arrow">▲</span>';
  } else {
    this.innerHTML = 'Ver todas las características <span class="features-arrow">▼</span>';
  }
});

// 9. BOTÓN COMPARTIR
const shareButton = document.querySelector('.share-btn');
shareButton.addEventListener('click', () => {
  alert('Compartir producto: https://tiendamas.com/producto/buzo-unisex');
});

// Inicialización
updateQuantity();

