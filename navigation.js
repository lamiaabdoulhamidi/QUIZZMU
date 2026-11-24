(() => {
  "use strict";

  // Shared result animations are observed centrally, so every current and future quiz
  // (genre, artist, and dynamically-rendered results) gets the same celebration.
  const celebrationScript = document.createElement("script");
  celebrationScript.src = "quiz-celebration.js?v=20261117final2";
  document.head.appendChild(celebrationScript);

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
    genreMode.querySelector("strong").textContent = "Blind Test par genre";
    genreMode.querySelector(".mode-card-copy > span:last-child").textContent = "Choisis ton genre musical et devine les morceaux avant la fin du chrono.";
  }
  const genreTab = tabs.find((tab) => tab.dataset.mode === "questions");
  if (genreTab) genreTab.textContent = "Blind Test par genre";

  // Add scoped styles for the shared artist-quiz back button.
  const artistBackStyles = document.createElement("link");
  artistBackStyles.rel = "stylesheet";
  artistBackStyles.href = "artist-back.css";
  document.head.appendChild(artistBackStyles);

  // Add the standalone RAP quiz module and its scoped styles; the other modes stay unchanged.
  const rapStyles = document.createElement("link");
  rapStyles.rel = "stylesheet";
  rapStyles.href = "rap-deezer.css";
  document.head.appendChild(rapStyles);
  const rapModule = document.createElement("script");
  rapModule.src = "rap-deezer.js?v=20261124score100";
  document.body.appendChild(rapModule);

  // R&B uses its own Deezer module; Rap and artist modules are unchanged.
  const rnbStyles = document.createElement("link");
  rnbStyles.rel = "stylesheet";
  rnbStyles.href = "rnb-deezer.css";
  document.head.appendChild(rnbStyles);
  const rnbModule = document.createElement("script");
  rnbModule.src = "rnb-deezer.js?v=20261124score100";
  document.body.appendChild(rnbModule);

  // Afro has its own Deezer module; existing genres and artist quizzes stay unchanged.
  const afroStyles = document.createElement("link");
  afroStyles.rel = "stylesheet";
  afroStyles.href = "afro-deezer.css";
  document.head.appendChild(afroStyles);
  // The Afro script is loaded directly by index.html to guarantee initialization.

  const varieteStyles = document.createElement("link");
  varieteStyles.rel = "stylesheet";
  varieteStyles.href = "variete-deezer.css";
  document.head.appendChild(varieteStyles);

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
  chooseMode.addEventListener("click", () => {
    // In an artist quiz, the previous screen is the artist directory.
    if (!artistGame?.classList.contains("hidden") || !artistEnd?.classList.contains("hidden")) {
      const artistTab = tabs.find((tab) => tab.dataset.mode === "artist");
      if (artistTab) artistTab.click();
      app.querySelectorAll("audio").forEach((audio) => audio.pause());
      window.scrollTo(0, 0);
      return;
    }
    // From the genre or artist directory, return to mode selection.
    app.querySelectorAll("audio").forEach((audio) => audio.pause());
    showModeChooser();
    window.scrollTo(0, 0);
  });
  // Return from either selection screen to the two-mode chooser.
  document.querySelectorAll(".mode-directory-back").forEach((button) => {
    button.addEventListener("click", () => {
      app.querySelectorAll("audio").forEach((audio) => {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      });
      hideAllQuizScreens();
      showModeChooser();
      window.scrollTo(0, 0);
    });
  });
  document.querySelectorAll("[data-open-mode]").forEach((button) => {
    button.addEventListener("click", () => openMode(button.dataset.openMode));
  });

  // Return to the artist directory and stop any currently playing preview immediately.
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".artist-back-button")) return;
    app.querySelectorAll(".artist-view audio").forEach((audio) => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    });
    const artistTab = tabs.find((tab) => tab.dataset.mode === "artist");
    if (artistTab) artistTab.click();
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

  // Load Drake as a separate artist quiz module without changing the other artist quizzes.
  const drakeModule = document.createElement("script");
  drakeModule.src = "drake-quiz.js?v=20261124score100";
  document.body.appendChild(drakeModule);
})();
