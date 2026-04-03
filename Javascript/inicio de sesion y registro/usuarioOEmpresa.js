document.addEventListener("DOMContentLoaded", () => {
  // Año footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Feedback visual opcional antes de navegar
  const selectorCards = document.querySelectorAll(".selector-card");

  selectorCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      card.classList.add("is-clicked");
      // No prevenimos navegación: solo feedback rápido
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        card.classList.add("is-clicked");
      }
    });
  });

  // Search form demo (evita recarga si todavía no tenés backend)
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("searchInput");
      const query = input?.value.trim();

      if (query) {
        console.log("Buscar:", query);
        // window.location.href = `/buscar?q=${encodeURIComponent(query)}`;
      }
    });
  }
});


