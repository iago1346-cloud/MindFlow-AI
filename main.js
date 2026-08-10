const menuToggle = document.querySelector("[data-menu-toggle]");ynnnnnnnnnnnnnnnnnnnnnnnnnnnn66666666f5 
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

/* ============================================================
   Fase 11 — Preparatório ENEM
   ============================================================ */

const enemExamButton = document.querySelector("[data-enem-exam]");
const enemQuestionButtons = document.querySelectorAll("[data-enem-question]");
const enemEssayNewButton = document.querySelector("[data-enem-essay-new]");
const enemEssayEditButton = document.querySelector("[data-enem-essay-edit]");

function showEnemFeedback(target, message, isError = false) {
  if (!target) return;

  const existingFeedback = target.parentElement?.querySelector(".enem-feedback");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  const feedback = document.createElement("p");
  feedback.className = isError ? "enem-feedback enem-feedback--error" : "enem-feedback";
  feedback.textContent = message;
  target.insertAdjacentElement("afterend", feedback);
}

if (enemExamButton) {
  enemExamButton.addEventListener("click", () => {
    showEnemFeedback(enemExamButton, "Simulado iniciado. 90 questões — boa prova!");
  });
}

enemQuestionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const area = button.dataset.enemQuestion;
    const areaName = {
      LG: "Linguagens",
      CH: "Humanas",
      CN: "Natureza",
      MT: "Matemática",
    }[area] || "Questão";

    showEnemFeedback(button, `${areaName}: questão adicionada ao simulado de hoje.`);
  });
});

if (enemEssayNewButton) {
  enemEssayNewButton.addEventListener("click", (event) => {
    event.preventDefault();
    showEnemFeedback(enemEssayNewButton, "Nova redação criada. Tema sugerido: desafios da sociedade brasileira.");
  });
}

if (enemEssayEditButton) {
  enemEssayEditButton.addEventListener("click", () => {
    showEnemFeedback(enemEssayEditButton, "Rascunho restaurado. Continue de onde parou.");
  });
}

/* ============================================================
   Fase 12 — Dicas Inteligentes
   ============================================================ */

const tipsNewButton = document.querySelector("[data-tips-new]");

const dailyTips = [
  {
    title: "Revise em blocos curtos para não perder a constância",
    text: "Em vez de uma sessão longa, faça três blocos de 25 minutos com pausas de 5. Isso reduz a fadiga e aumenta a retenção do conteúdo estudado hoje.",
  },
  {
    title: "Priorize as matérias mais fracas no início do dia",
    text: "A energia da manhã rende mais para o que exige atenção. Reserve 40 minutos para a área com menor desempenho antes dos assuntos fáceis.",
  },
  {
    title: "Transforme erros em um plano de revisão",
    text: "Ao errar uma questão, anote o tópico e revise-o em 24h. Isso transforma o erro em oportunidade de evolução concreta.",
  },
  {
    title: "Use a técnica de ensino Feynman",
    text: "Explique o conceito estudado como se estivesse ensinando outra pessoa. Se travar, volte ao material e refaça a explicação.",
  },
  {
    title: "Mantenha a redação aquecida toda semana",
    text: "Escreva ao menos uma redação por semana e compare as competências C1 e C2 entre textos para notar evolução.",
  },
  {
    title: "Faça uma bateria de questões no cronômetro",
    text: "Resolver 10 questões em 18 minutos treina velocidade e reduz a ansiedade em condições de prova.",
  },
];

let currentTipIndex = 0;

function showTipFeedback(target, message) {
  if (!target) return;

  const existingFeedback = target.parentElement?.querySelector(".tips-feedback");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  const feedback = document.createElement("p");
  feedback.className = "tips-feedback";
  feedback.textContent = message;
  target.insertAdjacentElement("afterend", feedback);
}

if (tipsNewButton) {
  tipsNewButton.addEventListener("click", () => {
    currentTipIndex = (currentTipIndex + 1) % dailyTips.length;
    const tip = dailyTips[currentTipIndex];

    const tipTitle = tipsNewButton.closest(".daily-tip__content")?.querySelector("h3");
    const tipText = tipsNewButton.closest(".daily-tip__content")?.querySelector("p");

    if (tipTitle) {
      tipTitle.textContent = tip.title;
    }
    if (tipText) {
      tipText.textContent = tip.text;
    }

    showTipFeedback(tipsNewButton, `Dica ${currentTipIndex + 1} de ${dailyTips.length} carregada.`);
  });
}

/* ============================================================
   Fase 13 — Contador Regressivo ENEM
   ============================================================ */

const countdownDaysElements = document.querySelectorAll("[data-countdown-days]");
const countdownHoursElement = document.querySelector("[data-countdown-hours]");
const countdownMinutesElement = document.querySelector("[data-countdown-minutes]");
const countdownSecondsElement = document.querySelector("[data-countdown-seconds]");
const progressBar = document.querySelector("[data-progress-bar]");
const progressPercent = document.querySelector("[data-progress-percent]");
const progressNote = document.querySelector("[data-progress-note]");
const motivationNewButton = document.querySelector("[data-motivation-new]");
const motivationTitle = document.querySelector("[data-motivation-title]");
const motivationText = document.querySelector("[data-motivation-text]");

const ENEM_DATE = new Date("2026-11-01T13:00:00");
const PREP_START_DATE = new Date("2025-01-01T00:00:00");

const motivationalMessages = [
  {
    title: "Você já percorreu um longo caminho",
    text: "Cada hora de estudo, cada questão resolvida e cada redação escrita te aproxima do seu objetivo. Continue firme — a constância vence o talento quando o talento não é constante.",
  },
  {
    title: "O esforço de hoje é o resultado de amanhã",
    text: "Não subestime o poder de um dia bem aproveitado. Pequenas ações diárias constroem grandes conquistas.",
  },
  {
    title: "Você é mais forte do que imagina",
    text: "Já superou desafios antes e vai superar este também. Confie no processo e no seu preparo.",
  },
  {
    title: "Foco no que você pode controlar",
    text: "Não se preocupe com o resultado final agora. Concentre-se em estudar bem hoje, amanhã e todos os dias até a prova.",
  },
  {
    title: "Cada questão conta",
    text: "Uma questão a mais resolvida hoje pode ser a diferença entre a aprovação e a lista de espera. Continue praticando.",
  },
  {
    title: "Sua história ainda está sendo escrita",
    text: "O ENEM é apenas um capítulo. Escreva cada página com dedicação, e o final será digno do seu esforço.",
  },
];

let currentMotivationIndex = 0;

function updateCountdown() {
  const now = new Date();
  const diff = ENEM_DATE - now;

  if (diff <= 0) {
    countdownDaysElements.forEach((el) => (el.textContent = "0"));
    if (countdownHoursElement) countdownHoursElement.textContent = "0";
    if (countdownMinutesElement) countdownMinutesElement.textContent = "0";
    if (countdownSecondsElement) countdownSecondsElement.textContent = "0";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  countdownDaysElements.forEach((el) => (el.textContent = String(days)));
  if (countdownHoursElement) countdownHoursElement.textContent = String(hours).padStart(2, "0");
  if (countdownMinutesElement) countdownMinutesElement.textContent = String(minutes).padStart(2, "0");
  if (countdownSecondsElement) countdownSecondsElement.textContent = String(seconds).padStart(2, "0");

  const totalDuration = ENEM_DATE - PREP_START_DATE;
  const elapsed = now - PREP_START_DATE;
  const percent = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));

  if (progressBar) {
    progressBar.style.width = `${percent}%`;
  }
  if (progressPercent) {
    progressPercent.textContent = `${percent}%`;
  }
  if (progressNote) {
    if (percent < 30) {
      progressNote.textContent = "Você está no início da preparação. Estabeleça uma rotina sólida agora!";
    } else if (percent < 60) {
      progressNote.textContent = "Bom progresso! Continue mantendo a constância nos estudos.";
    } else if (percent < 85) {
      progressNote.textContent = "Você já completou grande parte da preparação. Foque nas revisões!";
    } else {
      progressNote.textContent = "Fase final! Revise os pontos fracos e mantenha a calma.";
    }
  }
}

function showCountdownFeedback(target, message) {
  if (!target) return;

  const existingFeedback = target.parentElement?.querySelector(".countdown-feedback");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  const feedback = document.createElement("p");
  feedback.className = "countdown-feedback";
  feedback.textContent = message;
  target.insertAdjacentElement("afterend", feedback);
}

if (motivationNewButton) {
  motivationNewButton.addEventListener("click", () => {
    currentMotivationIndex = (currentMotivationIndex + 1) % motivationalMessages.length;
    const message = motivationalMessages[currentMotivationIndex];

    if (motivationTitle) {
      motivationTitle.textContent = message.title;
    }
    if (motivationText) {
      motivationText.textContent = message.text;
    }

    showCountdownFeedback(motivationNewButton, `Mensagem ${currentMotivationIndex + 1} de ${motivationalMessages.length}.`);
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================================
   Fase 14 — Página de Contato
   ============================================================ */

const contactSendButton = document.querySelector("[data-contact-send]");

function showContactFeedback(target, message, isError = false) {
  if (!target) return;

  const existingFeedback = target.parentElement?.querySelector(".contact-feedback");
  if (existingFeedback) {
    existingFeedback.remove();
  }

  const feedback = document.createElement("p");
  feedback.className = isError ? "contact-feedback contact-feedback--error" : "contact-feedback";
  feedback.textContent = message;
  target.insertAdjacentElement("afterend", feedback);
}

if (contactSendButton) {
  contactSendButton.addEventListener("click", () => {
    const form = contactSendButton.closest("form");
    const nameInput = form?.querySelector('input[type="text"]');
    const emailInput = form?.querySelector('input[type="email"]');
    const messageTextarea = form?.querySelector("textarea");

    const name = nameInput?.value?.trim() || "";
    const email = emailInput?.value?.trim() || "";
    const message = messageTextarea?.value?.trim() || "";

    if (!name || !email || !message) {
      showContactFeedback(contactSendButton, "Preencha todos os campos antes de enviar.", true);
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      showContactFeedback(contactSendButton, "Informe um e-mail válido.", true);
      return;
    }

    showContactFeedback(contactSendButton, "Mensagem enviada com sucesso! Nossa equipe responderá em até 24 horas úteis.");

    if (nameInput) nameInput.value = "";
    if (emailInput) emailInput.value = "";
    if (messageTextarea) messageTextarea.value = "";
  });
}
