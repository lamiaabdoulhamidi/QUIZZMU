(() => {
  "use strict";
  // Only the selection flow changes. Existing Deezer quizzes and QCM/free-answer
  // engines keep managing their own questions, scoring and timers.
  const labels = { rap:"Rap", rnb:"R&B", afro:"Afro", variete:"Variété française" };
  let current = null;
  const panelFor = genre => document.querySelector("." + genre + "-deezer-panel");

  function clearSetup() {
    if (!current) return;
    current.panel.classList.remove("genre-config-stage");
    current.element.remove();
    current = null;
  }

  function openSetup(genre) {
    const panel = panelFor(genre);
    if (!panel || panel.classList.contains("hidden")) return;
    clearSetup();
    const levels = [...panel.querySelectorAll("[data-" + genre + "-level]")];
    if (levels.length !== 3) return;
    let selectedLevel = "facile";
    let selectedMode = "qcm";
    const element = document.createElement("div");
    element.className = "genre-setup";
    element.innerHTML = `
      <h2>Prépare ta partie</h2>
      <p>Blind test ${labels[genre]} · Choisis ton niveau et ton mode de réponse.</p>
      <div class="genre-setup-field">
        <h3>Ton niveau</h3>
        <div class="genre-setup-levels" role="group" aria-label="Choisir le niveau">
          <button type="button" data-setup-level="facile" class="genre-setup-level active" aria-pressed="true">Facile</button>
          <button type="button" data-setup-level="moyen" class="genre-setup-level" aria-pressed="false">Moyen</button>
          <button type="button" data-setup-level="difficile" class="genre-setup-level" aria-pressed="false">Difficile</button>
        </div>
      </div>
      <div class="genre-setup-field">
        <h3>Comment tu veux répondre ?</h3>
        <div class="genre-setup-modes" role="group" aria-label="Choisir le mode de réponse">
          <button type="button" data-setup-mode="qcm" class="genre-setup-mode active" aria-pressed="true"><strong>🎵 QCM</strong><span>4 propositions</span></button>
          <button type="button" data-setup-mode="free" class="genre-setup-mode" aria-pressed="false"><strong>✍️ Réponse libre</strong><span>À toi de trouver !</span></button>
        </div>
      </div>
      <button type="button" class="primary-btn genre-setup-start">C'est parti ! →</button>
    `;
    panel.appendChild(element);
    current = { panel, element };
    panel.classList.add("genre-config-stage");

    element.querySelectorAll("[data-setup-level]").forEach(button => {
      button.addEventListener("click", () => {
        selectedLevel = button.dataset.setupLevel;
        element.querySelectorAll("[data-setup-level]").forEach(item => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
      });
    });
    element.querySelectorAll("[data-setup-mode]").forEach(button => {
      button.addEventListener("click", () => {
        selectedMode = button.dataset.setupMode;
        element.querySelectorAll("[data-setup-mode]").forEach(item => {
          const active = item === button;
          item.classList.toggle("active", active);
          item.setAttribute("aria-pressed", String(active));
        });
      });
    });
    element.querySelector(".genre-setup-start").addEventListener("click", () => {
      const originalLevel = levels.find(button => button.getAttribute("data-" + genre + "-level") === selectedLevel);
      if (!originalLevel) return;
      clearSetup();
      // The existing answer-mode controller intercepts this click and offers
      // the two original modes. Select the user's mode immediately, without
      // displaying that extra screen.
      originalLevel.click();
      const picker = panel.querySelector(".genre-answer-picker");
      const selected = picker?.querySelector(selectedMode === "qcm" ? "[data-qcm]" : "[data-free]");
      selected?.click();
      window.scrollTo(0, 0);
    });
  }

  document.addEventListener("click", event => {
    const genreButton = event.target.closest(".genre-btn[data-genre]");
    if (genreButton && Object.hasOwn(labels,genreButton.dataset.genre)) {
      const genre = genreButton.dataset.genre;
      // Existing genre modules first reveal the panel in a setTimeout(0).
      window.setTimeout(() => window.setTimeout(() => openSetup(genre), 0), 0);
      return;
    }
    if (event.target.closest(".rap-back-button,.rnb-back-button,.afro-back-button,.variete-back-button,#chooseModeBtn,[data-open-mode],.category-tab")) {
      clearSetup();
    }
  }, true);
  window.addEventListener("pagehide",clearSetup);
})();