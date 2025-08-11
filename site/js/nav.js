// Mobile menu toggle logic
const toggle = document.querySelector(".nav-toggle");
const closeBtn = document.querySelector(".mobile-close");
const mobileMenu = document.getElementById("mobileMenu");

if (toggle && closeBtn && mobileMenu) {
  const openMenu = () => {
    mobileMenu.hidden = false;
    mobileMenu.classList.add("active");
    toggle.setAttribute("aria-expanded", "true");
    const firstLink = mobileMenu.querySelector("a");
    if (firstLink) firstLink.focus();
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    mobileMenu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.focus();
  };

  toggle.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if (window.innerWidth > 690) closeMenu();
  });
}

// Keyboard navigation detection
(function () {
  const html = document.documentElement;

  function handleFirstTab(e) {
    if (e.key === "Tab") {
      html.classList.add("keyboard-nav");
      window.removeEventListener("keydown", handleFirstTab);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("touchstart", handleMouseDown);
    }
  }

  function handleMouseDown() {
    html.classList.remove("keyboard-nav");
    window.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("touchstart", handleMouseDown);
    window.addEventListener("keydown", handleFirstTab);
  }

  window.addEventListener("keydown", handleFirstTab);
})();

// Highlight active navigation link based on current path
document.addEventListener("DOMContentLoaded", () => {
  const normalize = (p) => (p.endsWith("/") ? p : p + "/");
  const current = normalize(location.pathname);
  const links = Array.from(
    document.querySelectorAll("header a, footer a")
  ).filter((link) => !link.querySelector("img"));

  let activeSet = false;
  links.forEach((link) => {
    link.classList.remove("active");
    const href = normalize(link.getAttribute("href"));
    if (!activeSet && href === current) {
      link.classList.add("active");
      activeSet = true;
    }
  });
});
