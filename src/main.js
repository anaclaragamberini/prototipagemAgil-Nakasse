const DAYS = [
  { weekday: "Seg", day: 5 },
  { weekday: "Ter", day: 6 },
  { weekday: "Qua", day: 7 },
  { weekday: "Qui", day: 8 },
  { weekday: "Sex", day: 9 },
];

const RESERVATIONS_BY_ENVIRONMENT = [
  { label: "Lab 8", reservations: 20 },
  { label: "Auditório", reservations: 35 },
  { label: "Sala 1038", reservations: 10 },
  { label: "Sala 1040", reservations: 20 },
];

const SVG_NS = "http://www.w3.org/2000/svg";
const dateDays = document.querySelector("#dateDays");
const previousDay = document.querySelector("#previousDay");
const nextDay = document.querySelector("#nextDay");
const chartContainer = document.querySelector("#chart");
const menuToggle = document.querySelector("#menuToggle");
const sidebarBackdrop = document.querySelector("#sidebarBackdrop");
const ambientesToggle = document.querySelector("#ambientesToggle");
const ambientesSubmenu = document.querySelector("#ambientesSubmenu");
const reservasToggle = document.querySelector("#reservasToggle");
const reservasSubmenu = document.querySelector("#reservasSubmenu");
const viewPanels = [...document.querySelectorAll("[data-view]")];
const navigationLinks = [...document.querySelectorAll("[data-nav]")];
const environmentRows = document.querySelector("#environmentRows");
const environmentSearch = document.querySelector("#environmentSearch");
const environmentCount = document.querySelector("#environmentCount");
const environmentEmpty = document.querySelector("#environmentEmpty");
const environmentFeedback = document.querySelector("#environmentFeedback");
const environmentForm = document.querySelector("#environmentForm");
const formFeedback = document.querySelector("#formFeedback");
const formTitle = document.querySelector("#environmentFormTitle");
const reservationRows = document.querySelector("#reservationRows");
const reservationStatusFilter = document.querySelector("#reservationStatusFilter");
const reservationCount = document.querySelector("#reservationCount");
const reservationEmpty = document.querySelector("#reservationEmpty");
const reservationFeedback = document.querySelector("#reservationFeedback");
const reservationDetailsDialog = document.querySelector("#reservationDetailsDialog");
const reservationDetails = document.querySelector("#reservationDetails");
const reservationDetailsActions = document.querySelector("#reservationDetailsActions");
const reservationRejectDialog = document.querySelector("#reservationRejectDialog");
const rejectReservationForm = document.querySelector("#rejectReservationForm");
const rejectionReason = document.querySelector("#rejectionReason");
const rejectionReasonError = document.querySelector("#rejectionReasonError");
const rejectionDialogFeedback = document.querySelector("#rejectionDialogFeedback");
const loginScreen = document.querySelector("#loginScreen");
const loginForm = document.querySelector("#loginForm");
const loginRole = document.querySelector("#loginRole");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const loginFeedback = document.querySelector("#loginFeedback");
const appShell = document.querySelector("#dashboard");
const professorApp = document.querySelector("#professorApp");
const professorAccount = document.querySelector("#professorAccount");
const professorHome = document.querySelector("#professorHome");
const professorRequestPanel = document.querySelector("#professorRequestPanel");
const professorReservations = document.querySelector("#professorReservations");
const professorReservationCount = document.querySelector("#professorReservationCount");
const professorReservationEmpty = document.querySelector("#professorReservationEmpty");
const professorFeedback = document.querySelector("#professorFeedback");
const professorReservationForm = document.querySelector("#professorReservationForm");
const professorFormFeedback = document.querySelector("#professorFormFeedback");
const requestEnvironment = document.querySelector("#requestEnvironment");
const requestDate = document.querySelector("#requestDate");

let selectedDayIndex = 2;
const ENVIRONMENTS_STORAGE_KEY = "unifil-environments-v1";
const RESERVATIONS_STORAGE_KEY = "unifil-reservations-v1";
const AUTH_SESSION_STORAGE_KEY = "unifil-demo-session-v1";
const SELECTED_ROLE_STORAGE_KEY = "unifil-selected-role-v1";
const DEMONSTRATION_ACCOUNTS = {
  gestor: { email: "gestor@unifil.edu.br", password: "Gestor123!" },
  professor: { email: "professor@unifil.edu.br", password: "Professor123!" },
};
const DEMONSTRATION_ENVIRONMENTS = [
  {
    id: "demo-lab-8",
    name: "Lab 8",
    type: "Laboratório",
    capacity: 30,
    location: "Bloco A, 2º andar",
    description: "Ambiente de demonstração.",
    active: true,
  },
  {
    id: "demo-auditorio",
    name: "Auditório",
    type: "Auditório",
    capacity: 180,
    location: "Bloco Central, térreo",
    description: "Ambiente de demonstração.",
    active: true,
  },
  {
    id: "demo-sala-1038",
    name: "Sala 1038",
    type: "Sala de aula",
    capacity: 40,
    location: "Bloco B, 3º andar",
    description: "Ambiente de demonstração.",
    active: true,
  },
  {
    id: "demo-sala-1040",
    name: "Sala 1040",
    type: "Sala de aula",
    capacity: 35,
    location: "Bloco B, 3º andar",
    description: "Ambiente de demonstração.",
    active: false,
  },
];

const DEMONSTRATION_RESERVATIONS = [
  {
    id: "demo-reservation-1",
    professor: "Profa. Ana Martins",
    environment: "Lab 8",
    date: "2026-11-19",
    startTime: "08:00",
    endTime: "10:00",
    objective: "Aula prática de análise de materiais.",
    status: "solicitada",
    rejectionReason: "",
  },
  {
    id: "demo-reservation-2",
    professor: "Prof. Carlos Ribeiro",
    environment: "Auditório",
    date: "2026-11-20",
    startTime: "14:00",
    endTime: "16:00",
    objective: "Apresentação de trabalhos da turma.",
    status: "solicitada",
    rejectionReason: "",
  },
  {
    id: "demo-reservation-3",
    professor: "Profa. Juliana Costa",
    environment: "Sala 1038",
    date: "2026-11-18",
    startTime: "10:00",
    endTime: "12:00",
    objective: "Reposição de aula de metodologia.",
    status: "aprovada",
    rejectionReason: "",
  },
  {
    id: "demo-reservation-4",
    professor: "Prof. Ricardo Nunes",
    environment: "Lab 8",
    date: "2026-11-21",
    startTime: "19:00",
    endTime: "21:00",
    objective: "Atividade de pesquisa orientada.",
    status: "rejeitada",
    rejectionReason: "O laboratório não está disponível no horário solicitado.",
  },
  {
    id: "demo-reservation-5",
    professor: "Profa. Beatriz Lima",
    environment: "Auditório",
    date: "2026-11-22",
    startTime: "09:00",
    endTime: "11:00",
    objective: "Encontro de integração acadêmica.",
    status: "cancelada",
    rejectionReason: "",
  },
];

const environmentStore = loadEnvironments();
const reservationStore = loadReservations();
let pendingEnvironmentFeedback = "";
let rejectionReservationId = "";
let pendingProfessorFeedback = "";
let authSession = loadAuthSession();

function createSvgElement(tagName, attributes = {}) {
  const element = document.createElementNS(SVG_NS, tagName);

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, String(value));
  }

  return element;
}

function renderDays() {
  dateDays.replaceChildren();

  for (const [index, item] of DAYS.entries()) {
    const button = document.createElement("button");
    const weekday = document.createElement("span");
    const number = document.createElement("span");

    button.className = "date-day";
    button.type = "button";
    button.setAttribute("aria-pressed", String(index === selectedDayIndex));
    button.setAttribute("aria-label", `${item.weekday}, dia ${item.day}`);
    button.addEventListener("click", () => {
      selectedDayIndex = index;
      renderDays();
    });

    weekday.className = "date-day__weekday";
    weekday.textContent = item.weekday;
    number.className = "date-day__number";
    number.textContent = String(item.day);

    button.append(weekday, number);
    dateDays.append(button);
  }

  previousDay.disabled = selectedDayIndex === 0;
  nextDay.disabled = selectedDayIndex === DAYS.length - 1;
}

function appendChart() {
  const chart = createSvgElement("svg", {
    viewBox: "0 0 500 370",
    role: "img",
    "aria-labelledby": "chartSvgTitle chartSvgDescription",
    preserveAspectRatio: "xMidYMid meet",
  });
  const title = createSvgElement("title", { id: "chartSvgTitle" });
  const description = createSvgElement("desc", { id: "chartSvgDescription" });

  title.textContent = "Ambientes mais reservados";
  description.textContent =
    "Gráfico de barras com reservas: Lab 8, 20; Auditório, 35; Sala 1038, 10; Sala 1040, 20.";
  chart.append(title, description);

  const plot = {
    top: 20,
    bottom: 320,
    left: 54,
    right: 486,
    max: 35,
  };
  const tickValues = [35, 30, 25, 20, 15, 10, 5, 0];

  for (const value of tickValues) {
    const y = plot.bottom - (value / plot.max) * (plot.bottom - plot.top);
    const gridline = createSvgElement("line", {
      x1: plot.left,
      x2: plot.right,
      y1: y,
      y2: y,
      class: "chart-gridline",
    });
    const tick = createSvgElement("text", {
      x: plot.left - 10,
      y: y + 4,
      "text-anchor": "end",
      class: "chart-axis-label",
    });

    tick.textContent = String(value);
    chart.append(gridline, tick);
  }

  const centers = [108, 214, 320, 426];
  const barWidth = 66;

  RESERVATIONS_BY_ENVIRONMENT.forEach((item, index) => {
    const barHeight = (item.reservations / plot.max) * (plot.bottom - plot.top);
    const x = centers[index] - barWidth / 2;
    const y = plot.bottom - barHeight;
    const bar = createSvgElement("rect", {
      x,
      y,
      width: barWidth,
      height: barHeight,
      class: "chart-bar",
      rx: 2,
    });
    const value = createSvgElement("text", {
      x: centers[index],
      y: y - 8,
      "text-anchor": "middle",
      class: "chart-bar-value",
    });
    const category = createSvgElement("text", {
      x: centers[index],
      y: plot.bottom + 25,
      "text-anchor": "middle",
      class: "chart-category-label",
    });

    value.textContent = String(item.reservations);
    category.textContent = item.label;
    chart.append(bar, value, category);
  });

  chartContainer.replaceChildren(chart);
}

function isMobileLayout() {
  return window.matchMedia("(max-width: 900px)").matches;
}

function setMenuOpen(isOpen) {
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isMobileLayout()
      ? isOpen
        ? "Fechar menu lateral"
        : "Abrir menu lateral"
      : isOpen
        ? "Recolher menu lateral"
        : "Expandir menu lateral",
  );
}

menuToggle.addEventListener("click", () => {
  if (isMobileLayout()) {
    setMenuOpen(!document.body.classList.contains("menu-open"));
    return;
  }

  const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
  menuToggle.setAttribute("aria-expanded", String(!isCollapsed));
  menuToggle.setAttribute(
    "aria-label",
    isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral",
  );
});

sidebarBackdrop.addEventListener("click", () => setMenuOpen(false));

ambientesToggle.addEventListener("click", () => {
  const isExpanded = ambientesToggle.getAttribute("aria-expanded") === "true";
  ambientesToggle.setAttribute("aria-expanded", String(!isExpanded));
  ambientesSubmenu.hidden = isExpanded;
});

reservasToggle.addEventListener("click", () => {
  const isExpanded = reservasToggle.getAttribute("aria-expanded") === "true";
  reservasToggle.setAttribute("aria-expanded", String(!isExpanded));
  reservasSubmenu.hidden = isExpanded;
});

previousDay.addEventListener("click", () => {
  if (selectedDayIndex === 0) return;
  selectedDayIndex -= 1;
  renderDays();
});

nextDay.addEventListener("click", () => {
  if (selectedDayIndex === DAYS.length - 1) return;
  selectedDayIndex += 1;
  renderDays();
});

window.matchMedia("(max-width: 900px)").addEventListener("change", () => {
  setMenuOpen(false);

  if (isMobileLayout()) {
    document.body.classList.remove("sidebar-collapsed");
  } else {
    menuToggle.setAttribute(
      "aria-expanded",
      String(!document.body.classList.contains("sidebar-collapsed")),
    );
    menuToggle.setAttribute(
      "aria-label",
      document.body.classList.contains("sidebar-collapsed")
        ? "Expandir menu lateral"
        : "Recolher menu lateral",
    );
  }
});

renderDays();
appendChart();

if (isMobileLayout()) {
  setMenuOpen(false);
}

function isEnvironmentRecord(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.type === "string" &&
    Number.isInteger(value.capacity) &&
    value.capacity > 0 &&
    typeof value.location === "string" &&
    typeof value.description === "string" &&
    typeof value.active === "boolean"
  );
}

function loadEnvironments() {
  try {
    const storedValue = localStorage.getItem(ENVIRONMENTS_STORAGE_KEY);

    if (storedValue === null) {
      const initialRecords = DEMONSTRATION_ENVIRONMENTS.map((item) => ({ ...item }));

      try {
        localStorage.setItem(ENVIRONMENTS_STORAGE_KEY, JSON.stringify(initialRecords));
        return { records: initialRecords, canWrite: true, error: "" };
      } catch {
        return {
          records: initialRecords,
          canWrite: true,
          error: "Não foi possível salvar os dados neste navegador. As alterações ficarão disponíveis somente nesta sessão.",
        };
      }
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue) || !parsedValue.every(isEnvironmentRecord)) {
      return {
        records: [],
        canWrite: false,
        error: "Os dados salvos dos ambientes são inválidos. O armazenamento existente foi preservado; não é possível alterá-los com segurança.",
      };
    }

    return { records: parsedValue, canWrite: true, error: "" };
  } catch {
    return {
      records: DEMONSTRATION_ENVIRONMENTS.map((item) => ({ ...item })),
      canWrite: true,
      error: "Não foi possível acessar os dados salvos neste navegador. As alterações ficarão disponíveis somente nesta sessão.",
    };
  }
}

function persistEnvironments(nextRecords) {
  if (!environmentStore.canWrite) {
    return false;
  }

  try {
    localStorage.setItem(ENVIRONMENTS_STORAGE_KEY, JSON.stringify(nextRecords));
    environmentStore.records = nextRecords;
    environmentStore.error = "";
    return true;
  } catch {
    environmentStore.records = nextRecords;
    environmentStore.error =
      "Não foi possível salvar os dados neste navegador. As alterações ficarão disponíveis somente nesta sessão.";
    return false;
  }
}

function isReservationRecord(value) {
  return (
    value !== null &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    typeof value.professor === "string" &&
    typeof value.environment === "string" &&
    (value.environmentId === undefined || typeof value.environmentId === "string") &&
    isValidIsoDate(value.date) &&
    typeof value.startTime === "string" &&
    /^\d{2}:\d{2}$/.test(value.startTime) &&
    typeof value.endTime === "string" &&
    /^\d{2}:\d{2}$/.test(value.endTime) &&
    typeof value.objective === "string" &&
    ["solicitada", "aprovada", "rejeitada", "cancelada"].includes(value.status) &&
    typeof value.rejectionReason === "string" &&
    (value.professorEmail === undefined || typeof value.professorEmail === "string") &&
    (value.status !== "rejeitada" || Boolean(value.rejectionReason.trim()))
  );
}

function isValidIsoDate(value) {
  if (typeof value !== "string") return false;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function loadReservations() {
  let storedValue;

  try {
    storedValue = localStorage.getItem(RESERVATIONS_STORAGE_KEY);
  } catch {
    return {
      records: DEMONSTRATION_RESERVATIONS.map((item) => ({ ...item })),
      canWrite: false,
      error: "Não foi possível acessar as reservas salvas neste navegador. As decisões não podem ser persistidas.",
    };
  }

  if (storedValue === null) {
    const initialRecords = DEMONSTRATION_RESERVATIONS.map((item) => ({ ...item }));

    try {
      localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(initialRecords));
      return { records: initialRecords, canWrite: true, error: "" };
    } catch {
      return {
        records: initialRecords,
        canWrite: false,
        error: "Não foi possível salvar as reservas neste navegador. As decisões não podem ser persistidas.",
      };
    }
  }

  let parsedValue;

  try {
    parsedValue = JSON.parse(storedValue);
  } catch {
    return {
      records: [],
      canWrite: false,
      error: "Os dados salvos das reservas estão inválidos. O armazenamento existente foi preservado; não é possível alterá-los com segurança.",
    };
  }

  if (!Array.isArray(parsedValue) || !parsedValue.every(isReservationRecord)) {
    return {
      records: [],
      canWrite: false,
      error: "Os dados salvos das reservas estão inválidos. O armazenamento existente foi preservado; não é possível alterá-los com segurança.",
    };
  }

  return { records: parsedValue, canWrite: true, error: "" };
}

function persistReservations(nextRecords) {
  if (!reservationStore.canWrite) {
    return false;
  }

  try {
    localStorage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(nextRecords));
    reservationStore.records = nextRecords;
    reservationStore.error = "";
    return true;
  } catch {
    reservationStore.error =
      "Não foi possível salvar a decisão neste navegador. O status da reserva não foi alterado.";
    return false;
  }
}

function setFeedback(element, message, isError = false) {
  element.textContent = message;
  element.classList.toggle("inline-feedback--error", isError);
  element.hidden = !message;
}

function loadAuthSession() {
  try {
    const storedValue = sessionStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!storedValue) return null;

    const session = JSON.parse(storedValue);
    const account = session && DEMONSTRATION_ACCOUNTS[session.role];
    if (
      session &&
      account &&
      session.email === account.email
    ) {
      return { role: session.role, email: session.email };
    }

    sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
    return null;
  } catch {
    return null;
  }
}

function loadSelectedRole() {
  try {
    const role = localStorage.getItem(SELECTED_ROLE_STORAGE_KEY);
    return ["gestor", "professor"].includes(role) ? role : "gestor";
  } catch {
    return "gestor";
  }
}

function saveSelectedRole(role) {
  try {
    localStorage.setItem(SELECTED_ROLE_STORAGE_KEY, role);
    return true;
  } catch {
    return false;
  }
}

function saveAuthSession(session) {
  try {
    sessionStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}

function showLoginScreen(message = "") {
  loginScreen.hidden = false;
  appShell.hidden = true;
  professorApp.hidden = true;
  document.title = "Login | Reservas Acadêmicas UniFil";
  setFeedback(loginFeedback, message, Boolean(message));
}

function routeCurrentLocation() {
  if (!authSession) {
    showLoginScreen();
    if (window.location.hash !== "#login") {
      window.history.replaceState(null, "", "#login");
    }
    return;
  }

  loginScreen.hidden = true;
  const requestedView = window.location.hash.slice(1);

  if (authSession.role === "professor") {
    appShell.hidden = true;
    professorApp.hidden = false;
    const professorView =
      requestedView === "solicitar-reserva" ? "solicitar-reserva" : "professor";

    if (requestedView !== professorView) {
      window.history.replaceState(null, "", `#${professorView}`);
    }
    professorAccount.textContent = authSession.email;
    professorHome.hidden = professorView !== "professor";
    professorRequestPanel.hidden = professorView !== "solicitar-reserva";
    document.title =
      professorView === "professor"
        ? "Área do Professor | Reservas Acadêmicas UniFil"
        : "Solicitar reserva | Reservas Acadêmicas UniFil";

    if (professorView === "professor") {
      renderProfessorReservations();
      if (pendingProfessorFeedback) {
        setFeedback(professorFeedback, pendingProfessorFeedback);
        pendingProfessorFeedback = "";
      }
    } else {
      populateAvailableEnvironments();
      requestDate.min = getTodayIsoDate();
    }
    return;
  }

  professorApp.hidden = true;
  appShell.hidden = false;
  const managerView =
    requestedView === "professor" || requestedView === "login"
      ? "dashboard"
      : requestedView || "dashboard";

  if (managerView !== requestedView) {
    window.history.replaceState(null, "", `#${managerView}`);
  }
  showView(managerView);
}

function logOut() {
  let storageError = false;

  try {
    sessionStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  } catch {
    storageError = true;
  }

  authSession = null;
  loginPassword.value = "";
  loginEmail.value = "";
  window.history.replaceState(null, "", "#login");
  showLoginScreen(
    storageError
      ? "Você saiu nesta tela, mas não foi possível limpar a sessão salva neste navegador."
      : "",
  );
}

function showView(viewName) {
  const knownViews = new Set([
    "dashboard",
    "consulta-ambientes",
    "cadastro-ambientes",
    "gerenciamento-reservas",
  ]);
  const currentView = knownViews.has(viewName) ? viewName : "dashboard";

  if (currentView !== viewName) {
    window.history.replaceState(null, "", "#dashboard");
  }

  for (const panel of viewPanels) {
    panel.hidden = panel.dataset.view !== currentView;
  }

  for (const link of navigationLinks) {
    const isCurrent = link.dataset.nav === currentView;

    if (isCurrent) {
      link.setAttribute("aria-current", "page");
      link.classList.add("nav-link--active");
    } else {
      link.removeAttribute("aria-current");
      link.classList.remove("nav-link--active");
    }
  }

  const isEnvironmentView = ["consulta-ambientes", "cadastro-ambientes"].includes(currentView);
  const isReservationView = currentView === "gerenciamento-reservas";
  ambientesToggle.classList.toggle("nav-group__toggle--active", isEnvironmentView);
  reservasToggle.classList.toggle("nav-group__toggle--active", isReservationView);

  if (isEnvironmentView) {
    ambientesToggle.setAttribute("aria-expanded", "true");
    ambientesSubmenu.hidden = false;
  }

  if (isReservationView) {
    reservasToggle.setAttribute("aria-expanded", "true");
    reservasSubmenu.hidden = false;
  }

  if (currentView === "dashboard") {
    document.title = "Dashboard do Gestor | Reservas Acadêmicas UniFil";
  } else if (currentView === "consulta-ambientes") {
    document.title = "Consulta de Ambientes | Reservas Acadêmicas UniFil";
    renderEnvironmentTable();

    if (pendingEnvironmentFeedback) {
      setFeedback(environmentFeedback, pendingEnvironmentFeedback);
      pendingEnvironmentFeedback = "";
    }
  } else if (currentView === "cadastro-ambientes") {
    document.title = `${environmentForm.elements.id.value ? "Editar" : "Cadastro"} de Ambientes | Reservas Acadêmicas UniFil`;
  } else {
    document.title = "Gerenciamento de Reservas | Reservas Acadêmicas UniFil";
    renderReservationTable();
  }

  if (isMobileLayout()) {
    setMenuOpen(false);
  }
}

function createTableCell(className = "") {
  const cell = document.createElement("td");

  if (className) {
    cell.className = className;
  }

  return cell;
}

function createRowAction(label, action, environment) {
  const button = document.createElement("button");

  button.className =
    action === "edit" ? "text-button" : "text-button text-button--muted";
  button.type = "button";
  button.dataset.action = action;
  button.dataset.environmentId = environment.id;
  button.textContent = label;
  button.setAttribute(
    "aria-label",
    `${label} ambiente ${environment.name}`,
  );
  return button;
}

function renderEnvironmentTable() {
  if (!environmentRows) return;

  const query = environmentSearch.value.trim().toLocaleLowerCase("pt-BR");
  const filteredRecords = environmentStore.records.filter((environment) =>
    [environment.name, environment.type, environment.location, environment.description]
      .join(" ")
      .toLocaleLowerCase("pt-BR")
      .includes(query),
  );

  environmentRows.replaceChildren();
  environmentCount.textContent = `${filteredRecords.length} ${
    filteredRecords.length === 1 ? "ambiente" : "ambientes"
  }`;
  environmentEmpty.hidden = filteredRecords.length > 0;

  for (const environment of filteredRecords) {
    const row = document.createElement("tr");
    const nameCell = createTableCell();
    const name = document.createElement("span");
    const descriptionCell = document.createElement("span");
    const typeCell = createTableCell();
    const capacityCell = createTableCell();
    const locationCell = createTableCell();
    const statusCell = createTableCell();
    const actionsCell = createTableCell();
    const status = document.createElement("span");
    const actions = document.createElement("div");

    name.className = "environment-name";
    name.textContent = environment.name;
    nameCell.append(name);

    if (environment.description) {
      descriptionCell.className = "environment-description";
      descriptionCell.textContent = environment.description;
      nameCell.append(descriptionCell);
    }

    typeCell.textContent = environment.type;
    capacityCell.textContent = `${environment.capacity} pessoas`;
    locationCell.textContent = environment.location;
    status.className = `status-badge ${
      environment.active ? "status-badge--active" : "status-badge--inactive"
    }`;
    status.textContent = environment.active ? "Ativo" : "Inativo";
    statusCell.append(status);

    actions.className = "row-actions";
    actions.append(
      createRowAction("Editar", "edit", environment),
      createRowAction(environment.active ? "Inativar" : "Ativar", "toggle", environment),
    );
    actionsCell.append(actions);
    row.append(nameCell, typeCell, capacityCell, locationCell, statusCell, actionsCell);
    environmentRows.append(row);
  }

  if (environmentStore.error) {
    setFeedback(environmentFeedback, environmentStore.error, true);
  } else if (environmentStore.records.some((item) => item.id.startsWith("demo-"))) {
    setFeedback(
      environmentFeedback,
      "Dados demonstrativos. Você pode editar os ambientes ou cadastrar os seus próprios.",
    );
  } else {
    setFeedback(environmentFeedback, "");
  }
}

function getReservationStatusLabel(status) {
  const labels = {
    solicitada: "Solicitada",
    aprovada: "Aprovada",
    rejeitada: "Rejeitada",
    cancelada: "Cancelada",
  };
  return labels[status] || "Status inválido";
}

function formatReservationDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getTodayIsoDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function populateAvailableEnvironments() {
  const selectedValue = requestEnvironment.value;
  const activeEnvironments = environmentStore.records.filter((item) => item.active);
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = activeEnvironments.length
    ? "Selecione um ambiente"
    : "Nenhum ambiente ativo disponível";
  requestEnvironment.replaceChildren(placeholder);

  for (const environment of activeEnvironments) {
    const option = document.createElement("option");
    option.value = environment.id;
    option.textContent = environment.name;
    requestEnvironment.append(option);
  }

  if (activeEnvironments.some((item) => item.id === selectedValue)) {
    requestEnvironment.value = selectedValue;
  }

  if (environmentStore.error) {
    setFeedback(professorFormFeedback, environmentStore.error, true);
  } else {
    setFeedback(professorFormFeedback, "");
  }
}

function createProfessorReservationCard(reservation) {
  const article = document.createElement("article");
  const header = document.createElement("header");
  const title = document.createElement("h3");
  const status = document.createElement("span");
  const meta = document.createElement("p");
  const objective = document.createElement("p");

  article.className = "professor-reservation-card";
  header.className = "professor-reservation-card__header";
  title.textContent = reservation.environment;
  status.className = `status-badge status-badge--${reservation.status}`;
  status.textContent = getReservationStatusLabel(reservation.status);
  header.append(title, status);

  meta.className = "professor-reservation-card__meta";
  meta.textContent = `${formatReservationDate(reservation.date)} · ${reservation.startTime}–${reservation.endTime}`;
  objective.className = "professor-reservation-card__objective";
  objective.textContent = reservation.objective;
  article.append(header, meta, objective);

  if (reservation.status === "rejeitada" && reservation.rejectionReason) {
    const reason = document.createElement("p");
    reason.className = "professor-reservation-card__reason";
    reason.textContent = `Motivo da rejeição: ${reservation.rejectionReason}`;
    article.append(reason);
  }

  return article;
}

function renderProfessorReservations() {
  if (!authSession || authSession.role !== "professor") return;

  const ownReservations = reservationStore.records
    .filter(
      (reservation) =>
        (reservation.professorEmail || reservation.professor) === authSession.email,
    )
    .sort((first, second) =>
      `${first.date} ${first.startTime}`.localeCompare(`${second.date} ${second.startTime}`),
    );

  professorReservations.replaceChildren(
    ...ownReservations.map(createProfessorReservationCard),
  );
  professorReservationCount.textContent = `${ownReservations.length} ${
    ownReservations.length === 1 ? "solicitação" : "solicitações"
  }`;
  professorReservationEmpty.hidden = ownReservations.length > 0;

  if (reservationStore.error) {
    setFeedback(professorFeedback, reservationStore.error, true);
  } else {
    setFeedback(professorFeedback, "");
  }
}

function createReservationAction(label, action, reservation) {
  const button = document.createElement("button");
  button.className =
    action === "reject"
      ? "text-button text-button--danger"
      : action === "approve"
        ? "text-button"
        : "text-button text-button--muted";
  button.type = "button";
  button.dataset.reservationAction = action;
  button.dataset.reservationId = reservation.id;
  button.textContent = label;
  button.setAttribute("aria-label", `${label} reserva de ${reservation.professor}`);
  return button;
}

function renderReservationTable() {
  if (!reservationRows) return;

  const selectedStatus = reservationStatusFilter.value;
  const filteredRecords = reservationStore.records.filter(
    (reservation) => selectedStatus === "todas" || reservation.status === selectedStatus,
  );

  reservationRows.replaceChildren();
  reservationCount.textContent = `${filteredRecords.length} ${
    filteredRecords.length === 1 ? "reserva" : "reservas"
  }`;
  reservationEmpty.hidden = filteredRecords.length > 0;

  for (const reservation of filteredRecords) {
    const row = document.createElement("tr");
    const professorCell = createTableCell();
    const environmentCell = createTableCell();
    const dateCell = createTableCell();
    const timeCell = createTableCell();
    const objectiveCell = createTableCell();
    const statusCell = createTableCell();
    const actionsCell = createTableCell();
    const statusBadge = document.createElement("span");
    const actions = document.createElement("div");

    professorCell.textContent = reservation.professor;
    environmentCell.textContent = reservation.environment;
    dateCell.textContent = formatReservationDate(reservation.date);
    timeCell.textContent = `${reservation.startTime}–${reservation.endTime}`;
    objectiveCell.textContent = reservation.objective;
    statusBadge.className = `status-badge status-badge--${reservation.status}`;
    statusBadge.textContent = getReservationStatusLabel(reservation.status);
    statusCell.append(statusBadge);

    actions.className = "row-actions";
    actions.append(createReservationAction("Detalhes", "details", reservation));

    if (reservation.status === "solicitada") {
      actions.append(
        createReservationAction("Aprovar", "approve", reservation),
        createReservationAction("Rejeitar", "reject", reservation),
      );
    }

    actionsCell.append(actions);
    row.append(
      professorCell,
      environmentCell,
      dateCell,
      timeCell,
      objectiveCell,
      statusCell,
      actionsCell,
    );
    reservationRows.append(row);
  }

  if (reservationStore.error) {
    setFeedback(reservationFeedback, reservationStore.error, true);
  } else if (reservationStore.records.some((item) => item.id.startsWith("demo-reservation-"))) {
    setFeedback(
      reservationFeedback,
      "Dados demonstrativos. As decisões registradas são salvas neste navegador.",
    );
  } else {
    setFeedback(reservationFeedback, "");
  }
}

function appendReservationDetail(label, value) {
  const item = document.createElement("div");
  const term = document.createElement("dt");
  const description = document.createElement("dd");
  term.textContent = label;
  description.textContent = value;
  item.append(term, description);
  reservationDetails.append(item);
}

function openReservationDetails(reservation) {
  reservationDetails.replaceChildren();
  reservationDetailsActions.replaceChildren();

  appendReservationDetail("Professor solicitante", reservation.professor);
  appendReservationDetail("Ambiente", reservation.environment);
  appendReservationDetail("Data", formatReservationDate(reservation.date));
  appendReservationDetail(
    "Horário",
    `${reservation.startTime}–${reservation.endTime}`,
  );
  appendReservationDetail("Objetivo", reservation.objective);
  appendReservationDetail("Status", getReservationStatusLabel(reservation.status));

  if (reservation.rejectionReason) {
    appendReservationDetail("Motivo da rejeição", reservation.rejectionReason);
  }

  if (reservation.status === "solicitada") {
    reservationDetailsActions.append(
      createReservationAction("Aprovar", "approve", reservation),
      createReservationAction("Rejeitar", "reject", reservation),
    );
  }

  reservationDetailsDialog.showModal();
}

function openReservationRejection(reservation) {
  if (reservation.status !== "solicitada") {
    setFeedback(
      reservationFeedback,
      "Apenas reservas solicitadas podem ser rejeitadas.",
      true,
    );
    return;
  }

  rejectionReservationId = reservation.id;
  rejectReservationForm.reset();
  rejectionReason.removeAttribute("aria-invalid");
  rejectionReasonError.textContent = "";
  setFeedback(rejectionDialogFeedback, "");
  reservationRejectDialog.showModal();
  window.requestAnimationFrame(() => rejectionReason.focus());
}

function applyReservationDecision(id, status, reason = "") {
  const reservation = reservationStore.records.find((item) => item.id === id);

  if (!reservation || reservation.status !== "solicitada") {
    renderReservationTable();
    setFeedback(
      reservationFeedback,
      "Esta reserva não está mais pendente de decisão.",
      true,
    );
    return false;
  }

  if (status !== "aprovada" && status !== "rejeitada") {
    setFeedback(reservationFeedback, "A decisão solicitada não é válida.", true);
    return false;
  }

  if (status === "rejeitada" && !reason.trim()) {
    setFeedback(reservationFeedback, "Informe o motivo da rejeição.", true);
    return false;
  }

  const nextRecords = reservationStore.records.map((item) =>
    item.id === id
      ? { ...item, status, rejectionReason: status === "rejeitada" ? reason.trim() : "" }
      : item,
  );

  if (!persistReservations(nextRecords)) {
    setFeedback(reservationFeedback, reservationStore.error, true);
    return false;
  }

  renderReservationTable();
  setFeedback(
    reservationFeedback,
    `Reserva ${status === "aprovada" ? "aprovada" : "rejeitada"} e salva neste navegador.`,
  );
  return true;
}

function handleReservationAction(action, id) {
  const reservation = reservationStore.records.find((item) => item.id === id);
  if (!reservation) {
    renderReservationTable();
    setFeedback(reservationFeedback, "A reserva selecionada não foi encontrada.", true);
    return;
  }

  if (action === "details") {
    openReservationDetails(reservation);
    return;
  }

  if (reservation.status !== "solicitada") {
    renderReservationTable();
    setFeedback(
      reservationFeedback,
      "Somente reservas solicitadas podem ser aprovadas ou rejeitadas.",
      true,
    );
    return;
  }

  if (action === "approve") {
    if (reservationDetailsDialog.open) {
      reservationDetailsDialog.close();
    }
    applyReservationDecision(id, "aprovada");
    return;
  }

  if (action === "reject") {
    if (reservationDetailsDialog.open) {
      reservationDetailsDialog.close();
    }
    openReservationRejection(reservation);
  }
}

function resetEnvironmentForm() {
  environmentForm.reset();
  environmentForm.elements.id.value = "";
  formTitle.textContent = "Cadastro de Ambientes";
  document.querySelector("#saveEnvironment").textContent = "Salvar ambiente";
  setFeedback(formFeedback, "");

  for (const error of environmentForm.querySelectorAll(".field-error")) {
    error.textContent = "";
  }

  for (const field of environmentForm.querySelectorAll("[aria-invalid]")) {
    field.removeAttribute("aria-invalid");
  }
}

function openEnvironmentForm(environment = null) {
  resetEnvironmentForm();

  if (environment) {
    environmentForm.elements.id.value = environment.id;
    environmentForm.elements.name.value = environment.name;
    environmentForm.elements.type.value = environment.type;
    environmentForm.elements.capacity.value = String(environment.capacity);
    environmentForm.elements.location.value = environment.location;
    environmentForm.elements.description.value = environment.description;
    formTitle.textContent = "Editar Ambiente";
    document.querySelector("#saveEnvironment").textContent = "Salvar alterações";
  }

  window.location.hash = "cadastro-ambientes";
  window.requestAnimationFrame(() => environmentForm.elements.name.focus());
}

function validateEnvironmentForm() {
  const values = {
    name: environmentForm.elements.name.value.trim(),
    type: environmentForm.elements.type.value,
    capacity: environmentForm.elements.capacity.value,
    location: environmentForm.elements.location.value.trim(),
    description: environmentForm.elements.description.value.trim(),
  };
  const errors = {
    name: values.name ? "" : "Informe o nome do ambiente.",
    type: values.type ? "" : "Selecione o tipo de ambiente.",
    capacity:
      values.capacity && Number.isInteger(Number(values.capacity)) && Number(values.capacity) > 0
        ? ""
        : "Informe uma capacidade inteira maior que zero.",
    location: values.location ? "" : "Informe a localização do ambiente.",
  };

  for (const [fieldName, message] of Object.entries(errors)) {
    const field = environmentForm.elements[fieldName];
    const error = document.querySelector(`#${field.id}Error`);

    field.setAttribute("aria-invalid", String(Boolean(message)));
    error.textContent = message;
  }

  const hasErrors = Object.values(errors).some(Boolean);

  if (hasErrors) {
    setFeedback(formFeedback, "Revise os campos indicados antes de salvar.", true);
    environmentForm.querySelector('[aria-invalid="true"]')?.focus();
    return null;
  }

  return {
    ...values,
    capacity: Number(values.capacity),
  };
}

function validateProfessorReservationForm() {
  const values = {
    environmentId: requestEnvironment.value,
    date: requestDate.value,
    startTime: professorReservationForm.elements.startTime.value,
    endTime: professorReservationForm.elements.endTime.value,
    objective: professorReservationForm.elements.objective.value.trim(),
  };
  const errors = {
    environmentId: values.environmentId ? "" : "Selecione um ambiente disponível.",
    date: !values.date
      ? "Informe a data da reserva."
      : !isValidIsoDate(values.date)
        ? "Informe uma data válida."
        : values.date < getTodayIsoDate()
          ? "Não é possível solicitar uma data passada."
          : "",
    startTime: values.startTime ? "" : "Informe o horário de início.",
    endTime: values.endTime ? "" : "Informe o horário de término.",
    objective: values.objective ? "" : "Informe o objetivo da reserva.",
  };

  if (
    !errors.startTime &&
    !errors.endTime &&
    values.endTime <= values.startTime
  ) {
    errors.endTime = "O término deve ser posterior ao início.";
  }

  const fields = {
    environmentId: requestEnvironment,
    date: requestDate,
    startTime: professorReservationForm.elements.startTime,
    endTime: professorReservationForm.elements.endTime,
    objective: professorReservationForm.elements.objective,
  };

  for (const [fieldName, message] of Object.entries(errors)) {
    const field = fields[fieldName];
    document.querySelector(`#${field.id}Error`).textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
  }

  if (Object.values(errors).some(Boolean)) {
    setFeedback(
      professorFormFeedback,
      "Revise os campos indicados antes de enviar a solicitação.",
      true,
    );
    professorReservationForm.querySelector('[aria-invalid="true"]')?.focus();
    return null;
  }

  return values;
}

function submitProfessorReservation(event) {
  event.preventDefault();

  if (!authSession || authSession.role !== "professor") {
    setFeedback(
      professorFormFeedback,
      "Somente o perfil Professor pode enviar solicitações.",
      true,
    );
    return;
  }

  if (!reservationStore.canWrite) {
    setFeedback(professorFormFeedback, reservationStore.error, true);
    return;
  }

  const values = validateProfessorReservationForm();
  if (!values) return;

  const environment = environmentStore.records.find(
    (item) => item.id === values.environmentId,
  );
  if (!environment || !environment.active) {
    setFeedback(
      professorFormFeedback,
      "O ambiente selecionado não está mais disponível. Selecione outro ambiente ativo.",
      true,
    );
    populateAvailableEnvironments();
    requestEnvironment.setAttribute("aria-invalid", "true");
    requestEnvironment.focus();
    return;
  }

  const conflictsWithApprovedReservation = reservationStore.records.some(
    (reservation) =>
      reservation.status === "aprovada" &&
      (reservation.environmentId === environment.id ||
        (!reservation.environmentId && reservation.environment === environment.name)) &&
      reservation.date === values.date &&
      values.startTime < reservation.endTime &&
      values.endTime > reservation.startTime,
  );

  if (conflictsWithApprovedReservation) {
    setFeedback(
      professorFormFeedback,
      "Já existe uma reserva aprovada para este ambiente em um horário conflitante.",
      true,
    );
    return;
  }

  const reservation = {
    id: `reservation-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`,
    professor: authSession.email,
    professorEmail: authSession.email,
    environmentId: environment.id,
    environment: environment.name,
    date: values.date,
    startTime: values.startTime,
    endTime: values.endTime,
    objective: values.objective,
    status: "solicitada",
    rejectionReason: "",
  };

  if (!persistReservations([...reservationStore.records, reservation])) {
    setFeedback(professorFormFeedback, reservationStore.error, true);
    return;
  }

  professorReservationForm.reset();
  requestDate.min = getTodayIsoDate();
  setFeedback(professorFormFeedback, "");
  pendingProfessorFeedback = "Solicitação enviada e registrada para análise do Gestor.";
  window.location.hash = "professor";
}

environmentRows.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const environment = environmentStore.records.find(
    (item) => item.id === button.dataset.environmentId,
  );
  if (!environment) return;

  if (button.dataset.action === "edit") {
    openEnvironmentForm(environment);
    return;
  }

  const nextRecords = environmentStore.records.map((item) =>
    item.id === environment.id ? { ...item, active: !item.active } : item,
  );
  const saved = persistEnvironments(nextRecords);
  renderEnvironmentTable();

  if (environmentStore.error) {
    setFeedback(environmentFeedback, environmentStore.error, true);
  } else {
    setFeedback(
      environmentFeedback,
      `Ambiente "${environment.name}" ${environment.active ? "inativado" : "ativado"}${saved ? " e salvo" : ""}.`,
    );
  }
});

environmentSearch.addEventListener("input", renderEnvironmentTable);

environmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = validateEnvironmentForm();
  if (!values) return;

  const id = environmentForm.elements.id.value;

  if (id && !environmentStore.records.some((item) => item.id === id)) {
    setFeedback(
      formFeedback,
      "O ambiente que você está tentando editar não foi encontrado. Consulte a lista e tente novamente.",
      true,
    );
    return;
  }

  const duplicate = environmentStore.records.some(
    (item) =>
      item.id !== id &&
      item.name.toLocaleLowerCase("pt-BR") === values.name.toLocaleLowerCase("pt-BR"),
  );

  if (duplicate) {
    environmentForm.elements.name.setAttribute("aria-invalid", "true");
    document.querySelector("#environmentNameError").textContent =
      "Já existe um ambiente com esse nome.";
    setFeedback(formFeedback, "Escolha um nome que ainda não esteja cadastrado.", true);
    environmentForm.elements.name.focus();
    return;
  }

  const existing = environmentStore.records.find((item) => item.id === id);
  const environment = {
    id: id || `environment-${globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`,
    ...values,
    active: existing?.active ?? true,
  };
  const nextRecords = id
    ? environmentStore.records.map((item) => (item.id === id ? environment : item))
    : [...environmentStore.records, environment];
  const saved = persistEnvironments(nextRecords);

  pendingEnvironmentFeedback = environmentStore.error
    ? environmentStore.error
    : `${id ? "Ambiente atualizado" : "Ambiente cadastrado"} com sucesso${saved ? " e salvo neste navegador" : ""}.`;

  resetEnvironmentForm();
  window.location.hash = "consulta-ambientes";
});

document.querySelector('[data-new-environment]').addEventListener("click", () => {
  openEnvironmentForm();
});

document.querySelector('[data-cancel-environment]').addEventListener("click", () => {
  resetEnvironmentForm();
});

reservationRows.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-reservation-action]");
  if (!button) return;

  handleReservationAction(
    button.dataset.reservationAction,
    button.dataset.reservationId,
  );
});

reservationDetailsActions.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-reservation-action]");
  if (!button) return;

  handleReservationAction(
    button.dataset.reservationAction,
    button.dataset.reservationId,
  );
});

reservationStatusFilter.addEventListener("change", renderReservationTable);

document.querySelector("[data-close-details]").addEventListener("click", () => {
  reservationDetailsDialog.close();
});

document.querySelectorAll("[data-close-rejection]").forEach((button) => {
  button.addEventListener("click", () => reservationRejectDialog.close());
});

rejectReservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reason = rejectionReason.value.trim();

  if (!reason) {
    rejectionReason.setAttribute("aria-invalid", "true");
    rejectionReasonError.textContent = "Informe o motivo da rejeição.";
    setFeedback(rejectionDialogFeedback, "O motivo é obrigatório.", true);
    rejectionReason.focus();
    return;
  }

  rejectionReason.removeAttribute("aria-invalid");
  rejectionReasonError.textContent = "";
  const reservationId = rejectionReservationId;
  reservationRejectDialog.close();
  rejectionReservationId = "";
  applyReservationDecision(reservationId, "rejeitada", reason);
});

professorReservationForm.addEventListener("submit", submitProfessorReservation);

window.addEventListener("storage", (event) => {
  if (event.key === RESERVATIONS_STORAGE_KEY && event.newValue !== null) {
    let records;

    try {
      records = JSON.parse(event.newValue);
    } catch {
      records = null;
    }

    if (!Array.isArray(records) || !records.every(isReservationRecord)) {
      reservationStore.records = [];
      reservationStore.canWrite = false;
      reservationStore.error =
        "Os dados compartilhados das reservas são inválidos. O conteúdo existente foi preservado.";
    } else {
      reservationStore.records = records;
      reservationStore.canWrite = true;
      reservationStore.error = "";
    }

    renderReservationTable();
    renderProfessorReservations();
  }

  if (event.key === ENVIRONMENTS_STORAGE_KEY && event.newValue !== null) {
    let records;

    try {
      records = JSON.parse(event.newValue);
    } catch {
      records = null;
    }

    if (!Array.isArray(records) || !records.every(isEnvironmentRecord)) {
      environmentStore.records = [];
      environmentStore.canWrite = false;
      environmentStore.error =
        "Os dados compartilhados dos ambientes são inválidos. O conteúdo existente foi preservado.";
    } else {
      environmentStore.records = records;
      environmentStore.canWrite = true;
      environmentStore.error = "";
    }

    if (!professorRequestPanel.hidden) {
      populateAvailableEnvironments();
    }
  }
});

loginRole.value = loadSelectedRole();
loginRole.addEventListener("change", () => {
  const saved = saveSelectedRole(loginRole.value);
  setFeedback(
    loginFeedback,
    saved
      ? ""
      : "Não foi possível salvar o perfil selecionado neste navegador.",
    !saved,
  );
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const role = loginRole.value;
  const email = loginEmail.value.trim().toLocaleLowerCase("pt-BR");
  const password = loginPassword.value;
  const account = DEMONSTRATION_ACCOUNTS[role];

  if (!email || !password) {
    setFeedback(loginFeedback, "Informe o e-mail e a senha.", true);
    return;
  }

  if (!account || email !== account.email || password !== account.password) {
    setFeedback(loginFeedback, "E-mail, senha ou perfil incorretos.", true);
    return;
  }

  const session = { role, email: account.email };
  if (!saveSelectedRole(role) || !saveAuthSession(session)) {
    setFeedback(
      loginFeedback,
      "Não foi possível salvar sua sessão neste navegador. Verifique o armazenamento e tente novamente.",
      true,
    );
    return;
  }

  authSession = session;
  loginPassword.value = "";
  window.history.replaceState(null, "", role === "gestor" ? "#dashboard" : "#professor");
  routeCurrentLocation();
});

document.querySelectorAll("[data-logout]").forEach((button) => {
  button.addEventListener("click", logOut);
});

window.addEventListener("hashchange", routeCurrentLocation);
routeCurrentLocation();
