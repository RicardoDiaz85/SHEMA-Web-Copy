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
