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
  setupPageLinks();
})();
