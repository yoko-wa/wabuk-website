(() => {
  const desktop = window.matchMedia("(min-width: 721px)");

  function setupMobileMenu() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("#main-nav");

    if (!header || !toggle || !nav) return;

    function setOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
    }

    setOpen(false);
    toggle.hidden = false;

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a[href]")) {
        setOpen(false);
      }
    });

    header.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    desktop.addEventListener("change", () => setOpen(false));
  }

  function setupHero() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const slides = [...hero.querySelectorAll(".hero-slide")];
    const controls = hero.querySelector(".hero-controls");
    const count = hero.querySelector(".hero-count");

    if (slides.length < 2 || !controls || !count) return;

    let activeIndex = 0;
    let swipeStart = null;

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        slide.hidden = slideIndex !== activeIndex;
      });

      count.textContent = `${activeIndex + 1} / ${slides.length}`;
    }

    showSlide(0);
    controls.hidden = false;

    controls.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-direction]");
      if (!button) return;

      const direction = Number(button.dataset.direction);
      if (direction === -1 || direction === 1) {
        showSlide(activeIndex + direction);
      }
    });

    hero.addEventListener("touchstart", (event) => {
      swipeStart = event.touches.length === 1 ? event.touches[0] : null;
    }, { passive: true });

    hero.addEventListener("touchend", (event) => {
      if (!swipeStart) return;

      const start = swipeStart;
      swipeStart = null;

      const end = event.changedTouches[0];
      if (!end || end.identifier !== start.identifier) return;

      const dx = end.clientX - start.clientX;
      const dy = end.clientY - start.clientY;

      if (Math.abs(dx) >= 55 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        showSlide(activeIndex + (dx < 0 ? 1 : -1));
      }
    }, { passive: true });

    hero.addEventListener("touchcancel", () => {
      swipeStart = null;
    });
  }

  function setupPageLinks() {
    const links = [...document.querySelectorAll("a[href][data-page]")].map((link) => ({
      element: link,
      mobileHref: link.getAttribute("href"),
      desktopHref: link.dataset.page,
    }));

    if (links.length === 0) return;

    function updateLinks() {
      links.forEach(({ element, mobileHref, desktopHref }) => {
        element.setAttribute("href", desktop.matches ? desktopHref : mobileHref);
      });

      document.documentElement.classList.toggle("has-desktop-pages", desktop.matches);
    }

    updateLinks();
    desktop.addEventListener("change", updateLinks);
  }

  setupMobileMenu();
  setupHero();
  setupPageLinks();
})();
