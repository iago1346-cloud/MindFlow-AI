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

const chatForm = document.querySelector("[data-chat-form]");
const chatInput = document.querySelector("[data-chat-input]");
const chatMessages = document.querySelector("[data-chat-messages]");
const promptButtons = document.querySelectorAll("[data-prompt]");

const assistantResponses = [
  {
    keywords: ["matemática", "matematica", "funções", "funcoes"],
    answer:
      "Para matemática, faça 25 minutos de teoria, 35 minutos de exercícios e 10 minutos revisando erros. Marque os tópicos que travaram para revisar amanhã.",
  },
  {
    keywords: ["redação", "redacao", "enem"],
    answer:
      "Para redação ENEM, treine repertório, tese e conectivos. Hoje vale escrever uma introdução completa e revisar se ela responde diretamente ao tema.",
  },
  {
    keywords: ["prioridade", "priorizar", "semana"],
    answer:
      "Nesta semana, priorize Matemática e Natureza, mantenha Redação em dois blocos e use Humanas como revisão curta para não perder constância.",
  },
  {
    keywords: ["produtividade", "foco", "rotina"],
    answer:
      "Uma boa regra: estude em blocos curtos, deixe o celular fora da mesa e feche cada sessão anotando a próxima ação. Isso reduz a chance de começar perdido.",
  },
];

function getAssistantAnswer(message) {
  const normalizedMessage = message.toLowerCase();
  const match = assistantResponses.find((response) =>
    response.keywords.some((keyword) => normalizedMessage.includes(keyword))
  );

  if (match) {
    return match.answer;
  }

  return "Vou transformar isso em um plano simples: defina uma matéria, escolha um bloco de 45 a 60 minutos e finalize com 10 minutos de revisão dos erros.";
}

function addChatMessage(author, message, type) {
  if (!chatMessages) return;

  const messageElement = document.createElement("article");
  messageElement.className = `chat-message chat-message--${type}`;

  const authorElement = document.createElement("span");
  authorElement.textContent = author;

  const textElement = document.createElement("p");
  textElement.textContent = message;

  messageElement.append(authorElement, textElement);
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage(message) {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) return;

  addChatMessage("Você", trimmedMessage, "user");
  addChatMessage("IA", getAssistantAnswer(trimmedMessage), "ai");
}

if (chatForm && chatInput) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendChatMessage(chatInput.value);
    chatInput.value = "";
  });
}

promptButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const prompt = button.dataset.prompt;

    if (!prompt) return;
    sendChatMessage(prompt);
  });
});

const reminderDemoButton = document.querySelector("[data-reminder-demo]");

if (reminderDemoButton) {
  reminderDemoButton.addEventListener("click", () => {
    const form = reminderDemoButton.closest("form");
    const existingFeedback = form?.querySelector(".reminder-feedback");

    if (existingFeedback) {
      existingFeedback.remove();
    }

    const feedback = document.createElement("p");
    feedback.className = "reminder-feedback";
    feedback.textContent = "Lembrete criado na agenda demonstrativa.";
    reminderDemoButton.insertAdjacentElement("afterend", feedback);
  });
}
