const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const header = document.querySelector("[data-header]");
const modal = document.querySelector("[data-modal]");
const modalOpen = document.querySelector("[data-modal-open]");
const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

function closeMenu() {
  if (!menu || !menuToggle) return;

  menu.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });
}

function updateHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

function openModal() {
  if (!modal) return;

  modal.hidden = false;
  document.body.classList.add("has-modal");
}

function closeModal() {
  if (!modal) return;

  modal.hidden = true;
  document.body.classList.remove("has-modal");
}

if (modalOpen) {
  modalOpen.addEventListener("click", openModal);
}

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
