// WaBuk 상단 메뉴 활성화

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

function updateActiveMenu() {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    // 페이지 맨 아래에서는 STORE 활성화
    const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

    if (isAtBottom) {
        currentSection = "store";
    }

    navLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", updateActiveMenu);
window.addEventListener("load", updateActiveMenu);
// 모바일 햄버거 메뉴 열기 / 닫기
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "메뉴 닫기" : "메뉴 열기"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // 메뉴를 선택하면 자동으로 닫기
    mainNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "메뉴 열기");
            menuToggle.textContent = "☰";
        });
    });
}
