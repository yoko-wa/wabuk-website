(() => {
  // 모바일 메뉴
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#main-nav");

  if (header && navToggle && nav) {
    function setMenuOpen(isOpen) {
      nav.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    }

    navToggle.hidden = false;

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setMenuOpen(false);
      }
    });

    header.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenuOpen(false);
        navToggle.focus();
      }
    });
  }

  // 메인 배너
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const slides = [...hero.querySelectorAll(".hero-slide")];
  const controls = hero.querySelector(".hero-controls");
  const count = hero.querySelector(".hero-count");

  if (slides.length < 2 || !controls || !count) return;

  let activeSlide = 0;
  let swipeStart = null;

  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== activeSlide;
    });

    count.textContent = `${activeSlide + 1} / ${slides.length}`;
  }

  showSlide(0);
  controls.hidden = false;

  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-direction]");
    if (!button) return;

    showSlide(activeSlide + Number(button.dataset.direction));
  });

  hero.addEventListener("touchstart", (event) => {
    swipeStart = event.touches.length === 1 ? event.touches[0] : null;
  }, { passive: true });

  hero.addEventListener("touchend", (event) => {
    if (!swipeStart) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - swipeStart.clientX;
    const dy = touch.clientY - swipeStart.clientY;
    swipeStart = null;

    if (Math.abs(dx) >= 55 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      showSlide(activeSlide + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });

  hero.addEventListener("touchcancel", () => {
    swipeStart = null;
  });
})();
(() => {
  const desktop = window.matchMedia("(min-width: 721px)");
  const links = [...document.querySelectorAll("a[data-page]")].map((link) => ({
    link,
    mobileHref: link.getAttribute("href"),
    desktopHref: link.dataset.page,
  }));

  function updateLinks() {
    links.forEach(({ link, mobileHref, desktopHref }) => {
      link.setAttribute("href", desktop.matches ? desktopHref : mobileHref);
    });

    document.documentElement.classList.toggle("has-desktop-pages", desktop.matches);
  }

  updateLinks();
  desktop.addEventListener("change", updateLinks);
})();
