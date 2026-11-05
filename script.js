(() => {
  "use strict";

  const DEEZER_GENRE_ID = 116;
  const QUESTIONS_PER_GAME = 10;
  const ARTIST_LIMIT = 18;
  const API_TIMEOUT_MS = 12000;
  const difficultyLabels = { facile: "Facile", moyen: "Moyen", difficile: "Difficile" };
  const difficultyDescriptions = {
    facile: "Facile : les morceaux ayant les rangs Deezer les plus élevés.",
    moyen: "Moyen : les morceaux autour du milieu des rangs récupérés.",
    difficile: "Difficile : les morceaux ayant les rangs Deezer les plus faibles."
  };
  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("gameScreen");
  const endScreen = document.getElementById("endScreen");
  const dataStatus = document.getElementById("dataStatus");
  const availableTracks = document.getElementById("availableTracks");
  const difficultyExplanation = document.getElementById("difficultyExplanation");
  const startButton = document.getElementById("startBtn");
  const playButton = document.getElementById("playButton");
  const audio = document.getElementById("previewAudio");
  const audioStatus = document.getElementById("audioStatus");
  const choicesElement = document.getElementById("choices");
  const revealElement = document.getElementById("answerReveal");
  const nextButton = document.getElementById("nextButton");
  const roundBadge = document.getElementById("roundBadge");
  const scoreBadge = document.getElementById("scoreBadge");
  const endMessage = document.getElementById("endMessage");
  const difficultyButtons = [...document.querySelectorAll("[data-difficulty]")];
  const menuButton = document.getElementById("menuBtn");
  const restartButton = document.getElementById("restartBtn");

  let catalog = [];
  let levels = { facile: [], moyen: [], difficile: [] };
  let selectedDifficulty = "facile";
  let questions = [];
  let questionIndex = 0;
  let score = 0;
  let currentTrack = null;
  let answered = false;
  let requestVersion = 0;

  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  // Deezer's public API is queried with JSONP so the static GitHub Pages site needs no proxy.
  function requestDeezer(path) {
    return new Promise((resolve, reject) => {
      const callback = `quizzmuDeezer_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement("script");
      let settled = false;
      const cleanup = () => {
        window.clearTimeout(timeout);
        script.remove();
        try { delete window[callback]; } catch { window[callback] = undefined; }
      };
      const timeout = window.setTimeout(() => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error("Deezer ne répond pas. Vérifie ta connexion puis réessaie."));
      }, API_TIMEOUT_MS);
      window[callback] = (payload) => {
        if (settled) return;
        settled = true;
        cleanup();
        if (!payload || payload.error || !Array.isArray(payload.data)) {
          reject(new Error("Deezer n’a pas renvoyé les morceaux attendus."));
          return;
        }
        resolve(payload.data);
      };
      script.onerror = () => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error("Impossible de contacter l’API Deezer."));
      };
      const separator = path.includes("?") ? "&" : "?";
      script.src = `https://api.deezer.com${path}${separator}output=jsonp&callback=${encodeURIComponent(callback)}`;
      document.head.appendChild(script);
    });
  }

  function validTrack(track) {
    return track && track.id && typeof track.title === "string" && track.title.trim() &&
      track.artist && typeof track.artist.name === "string" && track.artist.name.trim() &&
      typeof track.preview === "string" && track.preview.trim() && Number.isFinite(Number(track.rank));
  }

  function splitByPopularity(tracks) {
    const ordered = [...tracks].sort((a, b) => Number(b.rank) - Number(a.rank));
    const third = Math.floor(ordered.length / 3);
    const secondThird = Math.floor((ordered.length * 2) / 3);
    return {
      facile: ordered.slice(0, third),
      moyen: ordered.slice(third, secondThird),
      difficile: ordered.slice(secondThird)
    };
  }

  async function loadCatalog() {
    dataStatus.textContent = "Recherche des artistes Rap/Hip-Hop sur Deezer…";
    try {
      const artists = await requestDeezer(`/genre/${DEEZER_GENRE_ID}/artists?limit=100`);
      const uniqueArtists = shuffle(artists.filter((artist) => artist && artist.id)).slice(0, ARTIST_LIMIT);
      if (!uniqueArtists.length) throw new Error("Deezer n’a trouvé aucun artiste dans le genre Rap/Hip-Hop.");
      dataStatus.textContent = `Récupération des titres et rangs de ${uniqueArtists.length} artistes…`;
      const results = await Promise.allSettled(uniqueArtists.map((artist) => requestDeezer(`/artist/${encodeURIComponent(artist.id)}/top?limit=50`)));
      const tracks = results.flatMap((result) => result.status === "fulfilled" ? result.value : []).filter(validTrack);
      const seen = new Set();
      catalog = tracks.filter((track) => {
        const key = normalize(track.title);
        if (!key || seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      if (catalog.length < QUESTIONS_PER_GAME) throw new Error("Le catalogue Deezer ne contient pas assez de morceaux avec un extrait et un rang valides pour une partie de 10 questions.");
      levels = splitByPopularity(catalog);
      updateLevelAvailability();
      dataStatus.textContent = `${catalog.length} morceaux avec extrait et rang Deezer récupérés. Les niveaux sont répartis selon les rangs réellement reçus.`;
      dataStatus.className = "feedback blindtest-status success";
    } catch (error) {
      dataStatus.textContent = `${error.message || "Une erreur Deezer est survenue."} Recharge la page pour réessayer.`;
      dataStatus.className = "feedback blindtest-status error";
      startButton.disabled = true;
    }
  }

  function updateLevelAvailability() {
    const pool = levels[selectedDifficulty] || [];
    availableTracks.textContent = String(pool.length);
    difficultyExplanation.textContent = `${difficultyDescriptions[selectedDifficulty]} Répartition calculée à partir des rangs Deezer des ${catalog.length} morceaux valides récupérés.`;
    startButton.disabled = pool.length < QUESTIONS_PER_GAME || catalog.length < 13;
    difficultyButtons.forEach((button) => {
      const active = button.dataset.difficulty === selectedDifficulty;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
      button.disabled = Boolean(catalog.length && levels[button.dataset.difficulty].length < QUESTIONS_PER_GAME);
    });
    if (catalog.length && pool.length < QUESTIONS_PER_GAME) {
      dataStatus.textContent = `Seulement ${pool.length} morceaux disponibles pour ${difficultyLabels[selectedDifficulty]}. Choisis un autre niveau pour avoir 10 questions.`;
    }
  }

  function setStatus(message, kind = "") {
    audioStatus.textContent = message;
    audioStatus.className = `feedback ${kind}`.trim();
  }

  function buildRound(pool) {
    const selected = shuffle(pool).slice(0, QUESTIONS_PER_GAME);
    return selected.map((track) => {
      const alternatives = shuffle(catalog.filter((candidate) => normalize(candidate.title) !== normalize(track.title))).slice(0, 3);
      return { track, choices: shuffle([track, ...alternatives]) };
    });
  }

  function showMenu() {
    requestVersion += 1;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    gameScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
    menuButton.classList.add("hidden");
    restartButton.classList.add("hidden");
    updateLevelAvailability();
  }

  function startGame() {
    const pool = levels[selectedDifficulty] || [];
    if (pool.length < QUESTIONS_PER_GAME || catalog.length < 13) {
      dataStatus.textContent = "Il n’y a pas assez de titres Deezer disponibles pour créer 10 questions avec 4 choix. Choisis un autre niveau ou réessaie plus tard.";
      dataStatus.className = "feedback blindtest-status error";
      return;
    }
    questions = buildRound(pool);
    if (questions.some((item) => item.choices.length !== 4)) {
      dataStatus.textContent = "Deezer n’a pas fourni assez de titres différents pour composer les choix. Réessaie plus tard.";
      dataStatus.className = "feedback blindtest-status error";
      return;
    }
    questionIndex = 0;
    score = 0;
    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    menuButton.classList.remove("hidden");
    restartButton.classList.remove("hidden");
    renderQuestion();
  }

  function renderQuestion() {
    const version = ++requestVersion;
    const question = questions[questionIndex];
    currentTrack = question.track;
    answered = false;
    roundBadge.textContent = `Question ${questionIndex + 1} / ${QUESTIONS_PER_GAME}`;
    scoreBadge.textContent = `Score : ${score} / ${QUESTIONS_PER_GAME}`;
    audio.pause();
    audio.removeAttribute("src");
    audio.src = currentTrack.preview;
    audio.load();
    playButton.disabled = false;
    playButton.textContent = "▶ Écouter l’extrait";
    setStatus("Écoute l’extrait puis choisis un titre.");
    revealElement.replaceChildren();
    revealElement.hidden = true;
    nextButton.hidden = true;
    choicesElement.replaceChildren();
    question.choices.forEach((track) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "artist-choice";
      button.textContent = track.title;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => answer(track, button, version));
      choicesElement.appendChild(button);
    });
  }

  function answer(selectedTrack, selectedButton, version) {
    if (answered || version !== requestVersion) return;
    answered = true;
    audio.pause();
    const correct = String(selectedTrack.id) === String(currentTrack.id);
    if (correct) score += 1;
    selectedButton.setAttribute("aria-pressed", "true");
    selectedButton.classList.add(correct ? "correct" : "incorrect");
    choicesElement.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (normalize(button.textContent) === normalize(currentTrack.title)) button.classList.add("correct");
    });
    scoreBadge.textContent = `Score : ${score} / ${QUESTIONS_PER_GAME}`;
    const heading = document.createElement("strong");
    heading.textContent = correct ? "Bonne réponse !" : "Pas tout à fait…";
    const details = document.createElement("p");
    details.textContent = `${currentTrack.title} — ${currentTrack.artist.name} · Rang Deezer : ${currentTrack.rank}`;
    revealElement.replaceChildren(heading, details);
    revealElement.hidden = false;
    setStatus(correct ? "Bien joué !" : "Voici la bonne réponse.", correct ? "success" : "error");
    nextButton.textContent = questionIndex === QUESTIONS_PER_GAME - 1 ? "Voir mon score →" : "Question suivante →";
    nextButton.hidden = false;
    playButton.disabled = true;
  }

  function finishGame() {
    requestVersion += 1;
    audio.pause();
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    menuButton.classList.add("hidden");
    restartButton.classList.add("hidden");
    endMessage.textContent = `Tu as obtenu ${score} bonne${score > 1 ? "s" : ""} réponse${score > 1 ? "s" : ""} sur ${QUESTIONS_PER_GAME} en difficulté ${difficultyLabels[selectedDifficulty]}.`;
  }

  difficultyButtons.forEach((button) => button.addEventListener("click", () => {
    if (button.disabled) return;
    selectedDifficulty = button.dataset.difficulty;
    updateLevelAvailability();
  }));
  startButton.addEventListener("click", startGame);
  document.getElementById("playAgainBtn").addEventListener("click", startGame);
  menuButton.addEventListener("click", showMenu);
  document.getElementById("menuFromEndBtn").addEventListener("click", showMenu);
  restartButton.addEventListener("click", startGame);
  nextButton.addEventListener("click", () => {
    if (!answered) return;
    if (questionIndex < QUESTIONS_PER_GAME - 1) {
      questionIndex += 1;
      renderQuestion();
    } else finishGame();
  });
  playButton.addEventListener("click", async () => {
    if (!currentTrack?.preview || answered) return;
    if (audio.paused) {
      try { await audio.play(); }
      catch { setStatus("La lecture de l’extrait a échoué. Vérifie ta connexion puis réessaie.", "error"); }
    } else audio.pause();
  });
  audio.addEventListener("play", () => { playButton.textContent = "⏸ Mettre en pause"; });
  audio.addEventListener("pause", () => { if (!answered && currentTrack) playButton.textContent = "▶ Écouter l’extrait"; });
  audio.addEventListener("ended", () => { if (!answered) playButton.textContent = "▶ Réécouter l’extrait"; });
  audio.addEventListener("error", () => {
    if (!currentTrack || answered) return;
    setStatus("L’extrait Deezer est momentanément indisponible. Tu peux toujours choisir une réponse.", "error");
  });

  loadCatalog();
})();
