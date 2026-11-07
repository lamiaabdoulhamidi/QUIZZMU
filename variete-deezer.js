(() => {
  "use strict";

  const API_TIMEOUT_MS = 10000;
  const TRACKS = {
    facile: [
      { title: "Pour que tu m'aimes encore", artist: "Céline Dion" },
      { title: "Dernière danse", artist: "Indila" },
      { title: "Je te donne", artist: "Jean-Jacques Goldman" },
      { title: "Allumer le feu", artist: "Johnny Hallyday" },
      { title: "Ella, elle l'a", artist: "France Gall" },
      { title: "La Bohème", artist: "Charles Aznavour" },
      { title: "Avenir", artist: "Louane" },
      { title: "La Vie en rose", artist: "Édith Piaf" },
      { title: "Place des grands hommes", artist: "Patrick Bruel" },
      { title: "L'Aziza", artist: "Daniel Balavoine" }
    ],
    moyen: [
      { title: "Je l'aime à mourir", artist: "Francis Cabrel" },
      { title: "Désenchantée", artist: "Mylène Farmer" },
      { title: "Savoir aimer", artist: "Florent Pagny" },
      { title: "Le Paradis blanc", artist: "Michel Berger" },
      { title: "Joe le taxi", artist: "Vanessa Paradis" },
      { title: "On s'attache", artist: "Christophe Maé" },
      { title: "Je veux", artist: "Zaz" },
      { title: "La Maladie d'amour", artist: "Michel Sardou" },
      { title: "En apesanteur", artist: "Calogero" },
      { title: "À fleur de toi", artist: "Vitaa" }
    ],
    difficile: [
      { title: "Foule sentimentale", artist: "Alain Souchon" },
      { title: "La Javanaise", artist: "Serge Gainsbourg" },
      { title: "Tous les garçons et les filles", artist: "Françoise Hardy" },
      { title: "Lettre à France", artist: "Michel Polnareff" },
      { title: "Ne me quitte pas", artist: "Jacques Brel" },
      { title: "L'Aigle noir", artist: "Barbara" },
      { title: "Osez Joséphine", artist: "Alain Bashung" },
      { title: "Amoureuse", artist: "Véronique Sanson" },
      { title: "Week-end à Rome", artist: "Étienne Daho" },
      { title: "Un homme heureux", artist: "William Sheller" }
    ]
  };
  const LEVEL_LABELS = { facile: "Facile", moyen: "Moyen", difficile: "Difficile" };
  const varieteButton = document.querySelector('.genre-btn[data-genre="variete"]');
  const startScreen = document.getElementById("startScreen");
  if (!varieteButton || !startScreen) return;

  const originalContent = startScreen.querySelector(":scope > .panel-content");
  const headerActions = document.querySelector(".header-actions");
  const chooseModeButton = document.getElementById("chooseModeBtn");
  if (!originalContent || !headerActions || !chooseModeButton) return;

  const varieteScreen = document.createElement("section");
  varieteScreen.className = "variete-deezer-panel hidden";
  varieteScreen.setAttribute("aria-labelledby", "varieteDeezerTitle");
  varieteScreen.innerHTML = `
    <div class="variete-deezer-heading">
      <span class="badge glow">BLIND TEST PAR GENRE · Variété française</span>
      <h2 id="varieteDeezerTitle">Blind test Variété française</h2>
      <p>Choisis un niveau, écoute l’extrait Deezer et retrouve le titre parmi 4 propositions.</p>
    </div>
    <div class="variete-level-picker" role="group" aria-label="Choisir le niveau">
      <button type="button" class="difficulty-btn active" data-variete-level="facile" aria-pressed="true">Facile</button>
      <button type="button" class="difficulty-btn" data-variete-level="moyen" aria-pressed="false">Moyen</button>
      <button type="button" class="difficulty-btn" data-variete-level="difficile" aria-pressed="false">Difficile</button>
    </div>
    <div id="varietePlayArea" class="variete-play-area hidden">
      <div class="game-header"><span id="varieteRoundBadge" class="round-badge">Question 1 / 10</span><span id="varieteScoreBadge" class="score-badge">Score : 0 / 100</span></div>
      <p id="varieteDeezerStatus" class="feedback variete-deezer-status" role="status" aria-live="polite">Recherche du morceau et de son extrait via Deezer…</p>
      <div class="variete-audio-card">
        <p class="hint-label">ÉCOUTE L’EXTRAIT</p>
        <button id="varietePlayAudio" class="primary-btn variete-audio-button" type="button" disabled>Chargement de l’extrait…</button>
      </div>
      <p class="variete-answer-prompt">Quel est le titre de ce morceau ?</p>
      <div id="varieteChoices" class="variete-choices" role="group" aria-label="Propositions de titres et artistes"></div>
      <p id="varieteAnswerFeedback" class="feedback variete-answer-feedback" aria-live="polite"></p>
      <button id="varieteSkipButton" class="ghost-btn variete-skip-button" type="button">Passer</button>
    </div>
    <div id="varieteFinalArea" class="variete-final-area hidden" aria-live="polite">
      <span class="badge success">FIN DE PARTIE</span>
      <h3 id="varieteFinalTitle">Partie terminée</h3>
      <p id="varieteFinalScore"></p>
      <button id="varieteReplayButton" class="primary-btn" type="button">Rejouer ce niveau</button>
    </div>
    <p class="variete-deezer-attribution">Extraits de 30 secondes fournis par <a href="https://www.deezer.com/" target="_blank" rel="noopener noreferrer">Deezer</a>. Lecture en ligne, sans téléchargement.</p>
    <span id="varieteBackButtonPlaceholder" hidden></span>
    <button id="backToGenreButton" class="ghost-btn variete-back-button" type="button">← Retour</button>
    <audio id="varietePreviewAudio" preload="none"></audio>
  `;
  startScreen.appendChild(varieteScreen);

  const status = varieteScreen.querySelector("#varieteDeezerStatus");
  const playArea = varieteScreen.querySelector("#varietePlayArea");
  const finalArea = varieteScreen.querySelector("#varieteFinalArea");
  const roundBadge = varieteScreen.querySelector("#varieteRoundBadge");
  const scoreBadge = varieteScreen.querySelector("#varieteScoreBadge");
  const choices = varieteScreen.querySelector("#varieteChoices");
  const answerFeedback = varieteScreen.querySelector("#varieteAnswerFeedback");
  const audio = varieteScreen.querySelector("#varietePreviewAudio");
  const audioButton = varieteScreen.querySelector("#varietePlayAudio");
  const skipButton = varieteScreen.querySelector("#varieteSkipButton");
  const levelButtons = [...varieteScreen.querySelectorAll("[data-variete-level]")];
  const backButton = varieteScreen.querySelector("#backToGenreButton");
  const backPlaceholder = varieteScreen.querySelector("#varieteBackButtonPlaceholder");
  let selectedLevel = "facile";
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let requestVersion = 0;
  let currentTrack = null;
  let advanceTimer = null;

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
  }
  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
  function setStatus(message, kind = "") {
    status.textContent = message;
    status.className = `feedback variete-deezer-status ${kind}`.trim();
  }
  function stopAudio() {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    audioButton.textContent = "▶ Lire l’extrait";
  }
  function answerLabel(track) {
    const artist = track.artist || track.expectedArtist;
    const feature = track.featuring ? ` feat. ${track.featuring}` : "";
    return `${artist}${feature} — ${track.title}`;
  }

  // Same JSONP approach as the artist blind test, so Deezer works on static GitHub Pages.
  function requestJSONP(url) {
    return new Promise((resolve, reject) => {
      const callback = `quizzmuVariete_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement("script");
      let finished = false;
      let timeout;
      const clean = () => {
        window.clearTimeout(timeout);
        script.remove();
        try { delete window[callback]; } catch { window[callback] = undefined; }
      };
      const fail = (message) => {
        if (finished) return;
        finished = true;
        clean();
        reject(new Error(message));
      };
      window[callback] = (payload) => {
        if (finished) return;
        finished = true;
        clean();
        if (!payload || payload.error) {
          reject(new Error("Deezer n’a pas renvoyé les données attendues."));
          return;
        }
        resolve(payload);
      };
      script.onerror = () => fail("La requête Deezer a échoué.");
      const separator = url.includes("?") ? "&" : "?";
      script.src = `${url}${separator}output=jsonp&callback=${encodeURIComponent(callback)}`;
      timeout = window.setTimeout(() => fail("La requête Deezer a expiré."), API_TIMEOUT_MS);
      document.head.appendChild(script);
    });
  }

  function titleForComparison(value) {
    return normalize(String(value || "").replace(/\s*(?:\(|\[)?(?:feat\.?|ft\.?|with)\s+.*$/i, ""));
  }
  function exactTrackMatch(track, expected) {
    if (!track?.id || !track.title || !track.artist?.name || !track.preview || !track.link) return false;
    if (titleForComparison(track.title) !== normalize(expected.title)) return false;
    if (normalize(track.artist.name) !== normalize(expected.artist)) return false;
    if (expected.featuring) {
      const credits = [track.title, track.title_version, ...(track.contributors || []).map((person) => person?.name)]
        .filter(Boolean).map(normalize).join(" ");
      if (!credits.includes(normalize(expected.featuring))) return false;
    }
    return /^https:\/\//i.test(track.preview) && /^https:\/\//i.test(track.link);
  }

  async function getTrack(expected) {
    const query = `${expected.title} ${expected.artist}${expected.featuring ? ` ${expected.featuring}` : ""}`;
    const response = await requestJSONP(`https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=25`);
    const results = Array.isArray(response.data) ? response.data : [];
    const match = results.find((item) => exactTrackMatch(item, expected));
    if (!match) throw new Error(`Deezer n’a pas trouvé exactement « ${expected.title} » de ${expected.artist}.`);

    const trackResponse = await requestJSONP(`https://api.deezer.com/track/${encodeURIComponent(match.id)}`);
    const track = trackResponse.data || trackResponse;
    if (!exactTrackMatch(track, expected)) throw new Error("Le résultat Deezer ne correspond pas exactement au morceau demandé.");
    return track;
  }

  function startGame(level) {
    window.clearTimeout(advanceTimer);
    stopAudio();
    selectedLevel = level || selectedLevel;
    levelButtons.forEach((button) => {
      const active = button.dataset.varieteLevel === selectedLevel;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    requestVersion += 1;
    questions = shuffle(TRACKS[selectedLevel]).map((track) => ({
      ...track,
      options: shuffle([track, ...shuffle(TRACKS[selectedLevel].filter((item) => item.title !== track.title)).slice(0, 3)])
    }));
    currentIndex = 0;
    score = 0;
    answered = false;
    finalArea.classList.add("hidden");
    playArea.classList.remove("hidden");
    showQuestion();
  }

  async function showQuestion() {
    const version = ++requestVersion;
    const question = questions[currentIndex];
    if (!question) return showFinal();
    answered = false;
    currentTrack = null;
    roundBadge.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
    scoreBadge.textContent = `Score : ${score} / 100`;
    answerFeedback.textContent = "";
    answerFeedback.className = "feedback variete-answer-feedback";
    stopAudio();
    audioButton.disabled = true;
    audioButton.textContent = "Chargement de l’extrait…";
    skipButton.disabled = false;
    setStatus("Recherche du morceau et de son extrait via Deezer…");

    choices.replaceChildren();
    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "variete-choice";
      button.textContent = answerLabel(option);
      button.addEventListener("click", () => answer(option, button));
      choices.appendChild(button);
    });

    try {
      const track = await getTrack(question);
      if (version !== requestVersion) return;
      currentTrack = track;
      audio.src = track.preview;
      audio.load();
      audioButton.disabled = false;
      audioButton.textContent = "▶ Lire l’extrait";
      setStatus("Extrait chargé. Écoute puis choisis une réponse.", "success");
    } catch (error) {
      if (version !== requestVersion) return;
      audioButton.disabled = true;
      audioButton.textContent = "Extrait indisponible";
      setStatus(`${error.message || "Une erreur Deezer est survenue."} Tu peux répondre ou passer.`, "error");
    }
  }

  function answer(selectedOption, selectedButton) {
    if (answered) return;
    answered = true;
    const question = questions[currentIndex];
    const correct = normalize(selectedOption.title) === normalize(question.title);
    stopAudio();
    if (correct) score += 10;
    selectedButton.classList.add(correct ? "correct" : "incorrect");
    choices.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      const answerText = button.textContent;
      if (normalize(answerText) === normalize(answerLabel(question))) button.classList.add("correct");
    });
    scoreBadge.textContent = `Score : ${score} / 100`;
    answerFeedback.textContent = correct ? "Bonne réponse ! +10 points" : "Réponse incorrecte.";
    answerFeedback.className = `feedback variete-answer-feedback ${correct ? "success" : "error"}`;
    revealAndAdvance(question);
  }

  function passQuestion() {
    if (answered) return;
    answered = true;
    stopAudio();
    choices.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (normalize(button.textContent) === normalize(answerLabel(questions[currentIndex]))) button.classList.add("correct");
    });
    answerFeedback.textContent = "Question passée.";
    answerFeedback.className = "feedback variete-answer-feedback info";
    revealAndAdvance(questions[currentIndex]);
  }

  function revealAndAdvance(question) {
    const artist = currentTrack?.artist?.name || question.artist;
    answerFeedback.textContent += ` Réponse : « ${currentTrack?.title || question.title} » — ${artist}${question.featuring ? ` feat. ${question.featuring}` : ""}.`;
    audioButton.disabled = true;
    skipButton.disabled = true;
    advanceTimer = window.setTimeout(() => {
      if (varieteScreen.classList.contains("hidden")) return;
      currentIndex += 1;
      if (currentIndex >= questions.length) showFinal();
      else showQuestion();
    }, 1200);
  }

  function showFinal() {
    requestVersion += 1;
    stopAudio();
    playArea.classList.add("hidden");
    finalArea.classList.remove("hidden");
    varieteScreen.querySelector("#varieteFinalTitle").textContent = `Niveau ${LEVEL_LABELS[selectedLevel]} terminé`;
    varieteScreen.querySelector("#varieteFinalScore").textContent = `Ton score final : ${score} / 100 points.`;
  }

  function showVarieteScreen() {
    window.setTimeout(() => {
      window.clearTimeout(advanceTimer);
      originalContent.hidden = true;
      varieteScreen.classList.remove("hidden");
      playArea.classList.add("hidden");
      finalArea.classList.add("hidden");
      chooseModeButton.classList.add("hidden");
      backPlaceholder.before(backButton);
      headerActions.appendChild(backButton);
      backButton.classList.remove("hidden");
    }, 0);
  }

  function leaveVarieteScreen() {
    requestVersion += 1;
    stopAudio();
    varieteScreen.classList.add("hidden");
    originalContent.hidden = false;
    backPlaceholder.after(backButton);
    backButton.classList.add("hidden");
    chooseModeButton.classList.remove("hidden");
  }

  varieteButton.addEventListener("click", showVarieteScreen);
  levelButtons.forEach((button) => button.addEventListener("click", () => startGame(button.dataset.varieteLevel)));
  audioButton.addEventListener("click", async () => {
    if (!currentTrack?.preview || answered) return;
    if (audio.paused) {
      try {
        await audio.play();
        audioButton.textContent = "⏸ Pause";
      } catch {
        setStatus("La lecture de l’extrait a échoué. Tu peux répondre ou passer.", "error");
      }
    } else audio.pause();
  });
  audio.addEventListener("play", () => { audioButton.textContent = "⏸ Pause"; });
  audio.addEventListener("pause", () => {
    if (currentTrack?.preview && !answered) audioButton.textContent = "▶ Lire l’extrait";
  });
  audio.addEventListener("ended", () => { audioButton.textContent = "▶ Réécouter l’extrait"; });
  audio.addEventListener("error", () => {
    if (!currentTrack || answered) return;
    setStatus("L’extrait est indisponible ou a expiré. Tu peux quand même répondre ou passer.", "error");
    audioButton.disabled = true;
    audioButton.textContent = "Extrait indisponible";
  });
  skipButton.addEventListener("click", passQuestion);
  varieteScreen.querySelector("#varieteReplayButton").addEventListener("click", () => startGame(selectedLevel));
  backButton.addEventListener("click", leaveVarieteScreen);
  window.addEventListener("pagehide", stopAudio);
})();
