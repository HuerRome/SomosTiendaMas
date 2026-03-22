"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileDrawerClose = document.getElementById("mobileDrawerClose");
  const mobileOverlay = document.getElementById("mobileOverlay");

  const desktopDropdownButtons = document.querySelectorAll(".nav-dropdown-btn, .action-dropdown-btn");
  const mobileAccordionButtons = document.querySelectorAll(".mobile-accordion-btn");

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  function isMobileView() {
    return window.innerWidth <= 768;
  }

  function closeAllDesktopDropdowns() {
    document.querySelectorAll(".nav-item.is-open, .action-dropdown.is-open").forEach((item) => {
      item.classList.remove("is-open");
    });
  }

  function openMobileDrawer() {
    mobileDrawer.classList.add("is-open");
    mobileOverlay.classList.add("is-visible");
    mobileDrawer.setAttribute("aria-hidden", "false");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    body.style.overflow = "hidden";
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove("is-open");
    mobileOverlay.classList.remove("is-visible");
    mobileDrawer.setAttribute("aria-hidden", "true");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
  }

  function closeAllMobileAccordions() {
    document.querySelectorAll(".mobile-nav__section.is-open").forEach((section) => {
      section.classList.remove("is-open");
    });
  }

  /* Dropdowns desktop */
  desktopDropdownButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (isMobileView()) return;

      e.stopPropagation();

      const parent = btn.closest(".nav-item") || btn.closest(".action-dropdown");
      if (!parent) return;

      const isOpen = parent.classList.contains("is-open");

      closeAllDesktopDropdowns();

      if (!isOpen) {
        parent.classList.add("is-open");
      }
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav-item") && !e.target.closest(".action-dropdown")) {
      closeAllDesktopDropdowns();
    }
  });

  /* Drawer mobile */
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.contains("is-open");
      isOpen ? closeMobileDrawer() : openMobileDrawer();
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener("click", closeMobileDrawer);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMobileDrawer);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDesktopDropdowns();
      closeMobileDrawer();
    }
  });

  /* Acordeones mobile */
  mobileAccordionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const section = btn.closest(".mobile-nav__section");
      if (!section) return;

      const isOpen = section.classList.contains("is-open");

      closeAllMobileAccordions();

      if (!isOpen) {
        section.classList.add("is-open");
      }
    });
  });

  /* Submit buscador */
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const query = searchInput.value.trim();

      if (!query) {
        searchInput.focus();
        return;
      }

      // Cambiá esta URL por tu buscador real
      const url = `buscar.html?q=${encodeURIComponent(query)}`;
      window.location.href = url;
    });
  }

  /* Resize */
  window.addEventListener("resize", () => {
    if (!isMobileView()) {
      closeMobileDrawer();
      closeAllMobileAccordions();
    } else {
      closeAllDesktopDropdowns();
    }
  });
});

















