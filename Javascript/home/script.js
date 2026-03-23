// Update footer year
(function () {
  const year = document.getElementById('year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();


//GoTop Button
const goTopBtn = document.getElementById("goTopBtn");
  
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    goTopBtn.classList.add("show");
  } else {
    goTopBtn.classList.remove("show");
  }
});
  
goTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

