"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const siteHeader = document.querySelector(".site-header");

  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileDrawerClose = document.getElementById("mobileDrawerClose");
  const mobileOverlay = document.getElementById("mobileOverlay");

  const mobileAccordionButtons = document.querySelectorAll(".mobile-accordion-btn");

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  const accountDropdownBtn = document.querySelector(".action-dropdown-btn");
  const accountDropdown = document.querySelector(".action-dropdown");

  const navDropdownButtons = document.querySelectorAll(".nav-item .nav-dropdown-btn");

  const categoriesItem = document.querySelector(".nav-item--categories");
  const categoriesBtn = document.querySelector(".nav-categories-btn");
  const categoriesPanel = document.getElementById("categoriesPanel");

  const categoryMainButtons = document.querySelectorAll(".category-main");
  const categoryContents = document.querySelectorAll(".category-content");

  let categoriesCloseTimeout = null;

  function isMobileView() {
    return window.innerWidth <= 768;
  }

  function isDesktopOrTablet() {
    return window.innerWidth > 768;
  }

  /* =========================================================
     DROPDOWNS DESKTOP (Ofertas / Cuenta)
  ========================================================= */
  function closeAllDesktopDropdowns() {
    document.querySelectorAll(".nav-item.is-open, .action-dropdown.is-open").forEach((item) => {
      item.classList.remove("is-open");
    });
  }

  navDropdownButtons.forEach((btn) => {
    const parent = btn.closest(".nav-item");

    // Excluir categorías porque usa panel especial
    if (parent && parent.classList.contains("nav-item--categories")) return;

    btn.addEventListener("click", (e) => {
      if (isMobileView()) return;

      e.stopPropagation();

      const item = btn.closest(".nav-item");
      if (!item) return;

      const isOpen = item.classList.contains("is-open");

      closeAllDesktopDropdowns();
      closeCategoriesPanel();

      if (!isOpen) {
        item.classList.add("is-open");
      }
    });
  });

  if (accountDropdownBtn && accountDropdown) {
    accountDropdownBtn.addEventListener("click", (e) => {
      if (isMobileView()) return;

      e.stopPropagation();

      const isOpen = accountDropdown.classList.contains("is-open");

      closeAllDesktopDropdowns();
      closeCategoriesPanel();

      if (!isOpen) {
        accountDropdown.classList.add("is-open");
      }
    });
  }

  document.addEventListener("click", (e) => {
    const clickedInsideCategories =
      e.target.closest(".nav-item--categories") || e.target.closest(".categories-panel");

    if (!clickedInsideCategories && !e.target.closest(".nav-item") && !e.target.closest(".action-dropdown")) {
      closeAllDesktopDropdowns();
      closeCategoriesPanel();
    }
  });

  /* =========================================================
     PANEL CATEGORÍAS (desktop / tablet)
  ========================================================= */
  function openCategoriesPanel() {
    if (!isDesktopOrTablet() || !siteHeader || !categoriesPanel || !categoriesBtn) return;

    clearTimeout(categoriesCloseTimeout);
    closeAllDesktopDropdowns();

    siteHeader.classList.add("categories-panel-open");
    categoriesPanel.setAttribute("aria-hidden", "false");
    categoriesBtn.setAttribute("aria-expanded", "true");
  }

  function closeCategoriesPanel() {
    if (!siteHeader || !categoriesPanel || !categoriesBtn) return;

    siteHeader.classList.remove("categories-panel-open");
    categoriesPanel.setAttribute("aria-hidden", "true");
    categoriesBtn.setAttribute("aria-expanded", "false");
  }

  function delayedCloseCategoriesPanel() {
    clearTimeout(categoriesCloseTimeout);
    categoriesCloseTimeout = setTimeout(() => {
      closeCategoriesPanel();
    }, 140);
  }

  function activateCategory(categoryId) {
    categoryMainButtons.forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.category === categoryId);
    });

    categoryContents.forEach((content) => {
      content.classList.toggle("is-active", content.dataset.content === categoryId);
    });
  }

  if (categoriesItem && categoriesPanel && categoriesBtn) {
    // Hover en botón/item
    categoriesItem.addEventListener("mouseenter", () => {
      if (isDesktopOrTablet()) openCategoriesPanel();
    });

    categoriesItem.addEventListener("mouseleave", () => {
      if (isDesktopOrTablet()) delayedCloseCategoriesPanel();
    });

    // Hover en panel
    categoriesPanel.addEventListener("mouseenter", () => {
      if (isDesktopOrTablet()) {
        clearTimeout(categoriesCloseTimeout);
        openCategoriesPanel();
      }
    });

    categoriesPanel.addEventListener("mouseleave", () => {
      if (isDesktopOrTablet()) delayedCloseCategoriesPanel();
    });

    // Click / focus accesible
    categoriesBtn.addEventListener("click", (e) => {
      if (!isDesktopOrTablet()) return;

      e.preventDefault();
      e.stopPropagation();

      const isOpen = siteHeader.classList.contains("categories-panel-open");

      closeAllDesktopDropdowns();

      if (isOpen) {
        closeCategoriesPanel();
      } else {
        openCategoriesPanel();
      }
    });

    categoriesBtn.addEventListener("focus", () => {
      if (isDesktopOrTablet()) openCategoriesPanel();
    });
  }

  // Hover y click en categorías principales
  categoryMainButtons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      if (!isDesktopOrTablet()) return;
      activateCategory(btn.dataset.category);
    });

    btn.addEventListener("click", () => {
      if (!isDesktopOrTablet()) return;
      activateCategory(btn.dataset.category);
    });

    btn.addEventListener("focus", () => {
      if (!isDesktopOrTablet()) return;
      openCategoriesPanel();
      activateCategory(btn.dataset.category);
    });
  });

  /* =========================================================
     DRAWER MOBILE
  ========================================================= */
  function openMobileDrawer() {
    if (!mobileDrawer || !mobileOverlay || !mobileMenuBtn) return;

    mobileDrawer.classList.add("is-open");
    mobileOverlay.classList.add("is-visible");
    mobileDrawer.setAttribute("aria-hidden", "false");
    mobileMenuBtn.setAttribute("aria-expanded", "true");
    body.style.overflow = "hidden";
  }

  function closeMobileDrawer() {
    if (!mobileDrawer || !mobileOverlay || !mobileMenuBtn) return;

    mobileDrawer.classList.remove("is-open");
    mobileOverlay.classList.remove("is-visible");
    mobileDrawer.setAttribute("aria-hidden", "true");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    body.style.overflow = "";
    mobileMenuBtn.focus();
  }

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

  /* =========================================================
     ACORDEONES MOBILE
  ========================================================= */
  function closeAllMobileAccordions() {
    document.querySelectorAll(".mobile-nav__section.is-open").forEach((section) => {
      section.classList.remove("is-open");
    });
  }

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

  /* =========================================================
     BUSCADOR
  ========================================================= */
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const query = searchInput.value.trim();

      if (!query) {
        searchInput.focus();
        return;
      }

      const url = `buscar.html?q=${encodeURIComponent(query)}`;
      window.location.href = url;
    });
  }

  /* =========================================================
     ESC
  ========================================================= */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAllDesktopDropdowns();
      closeCategoriesPanel();
      closeMobileDrawer();
    }
  });

  /* =========================================================
     RESIZE
  ========================================================= */
  window.addEventListener("resize", () => {
    closeAllDesktopDropdowns();
    closeCategoriesPanel();

    if (!isMobileView()) {
      closeMobileDrawer();
      closeAllMobileAccordions();
    }
  });

  /* Estado inicial */
  activateCategory("electro");
});













