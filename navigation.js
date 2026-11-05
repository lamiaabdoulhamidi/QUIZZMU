(() => {
  "use strict";

  const welcome = document.getElementById("welcomeScreen");
  const selector = document.getElementById("modeSelection");
  const app = document.getElementById("appShell");
  const begin = document.getElementById("beginJourney");
  const back = document.getElementById("backToWelcome");
  const chooseMode = document.getElementById("chooseModeBtn");
  const startScreen = document.getElementById("startScreen");
  const artistStart = document.getElementById("artistStartScreen");
  const artistGame = document.getElementById("artistGameScreen");
  const artistEnd = document.getElementById("artistEndScreen");
  const tabs = [...document.querySelectorAll(".category-tab")];

  // Rename and describe only the genre-based quiz UI; leave the welcome and artist quiz intact.
  const genreMode = document.querySelector('[data-open-mode="questions"]');
  if (genreMode) {
    genreMode.querySelector(".mode-overline").textContent = "BLIND TEST PAR GENRE";
    genreMode.querySelector("strong").textContent = "Blind Test par genre";
    genreMode.querySelector(".mode-card-copy > span:last-child").textContent = "Choisis un genre musical et un niveau de difficulté.";
  }
  const genreTab = tabs.find((tab) => tab.dataset.mode === "questions");
  if (genreTab) genreTab.textContent = "Blind Test par genre";

  // Add the standalone RAP quiz module and its scoped styles; the other modes stay unchanged.
  const rapStyles = document.createElement("link");
  rapStyles.rel = "stylesheet";
  rapStyles.href = "rap-deezer.css";
  document.head.appendChild(rapStyles);
  const rapModule = document.createElement("script");
  rapModule.src = "rap-deezer.js";
  document.body.appendChild(rapModule);

  // R&B uses its own Deezer module; Rap and artist modules are unchanged.
  const rnbStyles = document.createElement("link");
  rnbStyles.rel = "stylesheet";
  rnbStyles.href = "rnb-deezer.css";
  document.head.appendChild(rnbStyles);
  const rnbModule = document.createElement("script");
  rnbModule.src = "rnb-deezer.js";
  document.body.appendChild(rnbModule);

  function hideAllQuizScreens() {
    [startScreen, artistStart, artistGame, artistEnd].forEach((screen) => screen?.classList.add("hidden"));
  }

  function showModeChooser() {
    app.classList.add("hidden");
    welcome.classList.add("hidden");
    selector.classList.remove("hidden");
  }

  function openMode(mode) {
    welcome.classList.add("hidden");
    selector.classList.add("hidden");
    app.classList.remove("hidden");
    const tab = tabs.find((item) => item.dataset.mode === mode);
    if (tab) tab.click();

    // The existing quiz modules own the quiz state; this only chooses the initial view.
    if (mode === "artist") {
      app.classList.add("artist-mode-active");
      hideAllQuizScreens();
      artistStart.classList.remove("hidden");
    } else {
      app.classList.remove("artist-mode-active");
      hideAllQuizScreens();
      startScreen.classList.remove("hidden");
    }
  }

  begin.addEventListener("click", () => {
    welcome.classList.add("hidden");
    selector.classList.remove("hidden");
  });
  back.addEventListener("click", () => {
    selector.classList.add("hidden");
    welcome.classList.remove("hidden");
  });
  chooseMode.addEventListener("click", showModeChooser);
  document.querySelectorAll("[data-open-mode]").forEach((button) => {
    button.addEventListener("click", () => openMode(button.dataset.openMode));
  });

  // Keep the compact category tabs usable after entering the app, including from quiz screens.
  tabs.forEach((tab) => tab.addEventListener("click", () => {
    if (app.classList.contains("hidden")) return;
    if (tab.dataset.mode === "questions") {
      window.setTimeout(() => {
        if (!app.classList.contains("hidden") && !app.classList.contains("artist-mode-active")) {
          const anyQuestionView = [startScreen].some((screen) => !screen.classList.contains("hidden"));
          if (!anyQuestionView) startScreen.classList.remove("hidden");
        }
      }, 0);
    }
  }));
})();
