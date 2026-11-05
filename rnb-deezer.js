(() => {
  "use strict";

  const API_TIMEOUT_MS = 10000;
  const TRACKS = {
    facile: [
      { title: "Let Me Love You", artist: "Mario" },
      { title: "So Sick", artist: "Ne-Yo" },
      { title: "Umbrella", artist: "Rihanna", featuring: "JAY-Z" },
      { title: "No One", artist: "Alicia Keys" },
      { title: "Crazy in Love", artist: "Beyoncé", featuring: "JAY-Z" },
      { title: "Le temps", artist: "Tayc" },
      { title: "Reine", artist: "Dadju" },
      { title: "À fleur de toi", artist: "Vitaa" },
      { title: "Ma philosophie", artist: "Amel Bent" },
      { title: "My Salsa", artist: "Franglish", featuring: "Tory Lanez" }
    ],
    moyen: [
      { title: "Kiss It Better", artist: "Rihanna" },
      { title: "Take You Down", artist: "Chris Brown" },
      { title: "Don't", artist: "Bryson Tiller" },
      { title: "Playing Games", artist: "Summer Walker" },
      { title: "Snooze", artist: "SZA" },
      { title: "C'est chelou", artist: "Zaho" },
      { title: "Parce qu'on vient de loin", artist: "Corneille" },
      { title: "C'est trop", artist: "Singuila" },
      { title: "L'olivier", artist: "Wallen" },
      { title: "Jolie madame", artist: "Joé Dwèt Filé", featuring: "Ronisia" }
    ],
    difficile: [
      { title: "Focus", artist: "H.E.R." },
      { title: "Get You", artist: "Daniel Caesar", featuring: "Kali Uchis" },
      { title: "Damage", artist: "H.E.R." },
      { title: "Session 32", artist: "Summer Walker" },
      { title: "Persian Rugs", artist: "PARTYNEXTDOOR" },
      { title: "Exchange", artist: "Bryson Tiller" },
      { title: "Thinkin Bout You", artist: "Frank Ocean" },
      { title: "Adorn", artist: "Miguel" },
      { title: "Sure Thing", artist: "Miguel" },
      { title: "Come and See Me", artist: "PARTYNEXTDOOR", featuring: "Drake" }
    ]
  };
  const LEVEL_LABELS = { facile: "Facile", moyen: "Moyen", difficile: "Difficile" };
  const rnbButton = document.querySelector('.genre-btn[data-genre="rnb"]');
  const startScreen = document.getElementById("startScreen");
  if (!rnbButton || !startScreen) return;

  const originalContent = startScreen.querySelector(":scope > .panel-content");
  const headerActions = document.querySelector(".header-actions");
  const chooseModeButton = document.getElementById("chooseModeBtn");
  if (!originalContent || !headerActions || !chooseModeButton) return;

  const rnbScreen = document.createElement("section");
  rnbScreen.className = "rnb-deezer-panel hidden";
  rnbScreen.setAttribute("aria-labelledby", "rnbDeezerTitle");
  rnbScreen.innerHTML = `
    <div class="rnb-deezer-heading">
      <span class="badge glow">BLIND TEST PAR GENRE · R&B</span>
      <h2 id="rnbDeezerTitle">Blind test R&B</h2>
      <p>Choisis un niveau, écoute l’extrait Deezer et retrouve le titre parmi 4 propositions.</p>
    </div>
    <div class="rnb-level-picker" role="group" aria-label="Choisir le niveau">
      <button type="button" class="difficulty-btn active" data-rnb-level="facile" aria-pressed="true">Facile</button>
      <button type="button" class="difficulty-btn" data-rnb-level="moyen" aria-pressed="false">Moyen</button>
      <button type="button" class="difficulty-btn" data-rnb-level="difficile" aria-pressed="false">Difficile</button>
    </div>
    <div id="rnbPlayArea" class="rnb-play-area hidden">
      <div class="game-header"><span id="rnbRoundBadge" class="round-badge">Question 1 / 10</span><span id="rnbScoreBadge" class="score-badge">Score : 0 / 100</span></div>
      <p id="rnbDeezerStatus" class="feedback rnb-deezer-status" role="status" aria-live="polite">Recherche du morceau et de son extrait via Deezer…</p>
      <div class="rnb-audio-card">
        <p class="hint-label">ÉCOUTE L’EXTRAIT</p>
        <button id="rnbPlayAudio" class="primary-btn rnb-audio-button" type="button" disabled>Chargement de l’extrait…</button>
      </div>
      <p class="rnb-answer-prompt">Quel est le titre de ce morceau ?</p>
      <div id="rnbChoices" class="rnb-choices" role="group" aria-label="Propositions de titres et artistes"></div>
      <p id="rnbAnswerFeedback" class="feedback rnb-answer-feedback" aria-live="polite"></p>
      <button id="rnbSkipButton" class="ghost-btn rnb-skip-button" type="button">Passer</button>
    </div>
    <div id="rnbFinalArea" class="rnb-final-area hidden" aria-live="polite">
      <span class="badge success">FIN DE PARTIE</span>
      <h3 id="rnbFinalTitle">Partie terminée</h3>
      <p id="rnbFinalScore"></p>
      <button id="rnbReplayButton" class="primary-btn" type="button">Rejouer ce niveau</button>
    </div>
    <p class="rnb-deezer-attribution">Extraits de 30 secondes fournis par <a href="https://www.deezer.com/" target="_blank" rel="noopener noreferrer">Deezer</a>. Lecture en ligne, sans téléchargement.</p>
    <span id="rnbBackButtonPlaceholder" hidden></span>
    <button id="backToGenreButton" class="ghost-btn rnb-back-button" type="button">← Retour</button>
    <audio id="rnbPreviewAudio" preload="none"></audio>
  `;
  startScreen.appendChild(rnbScreen);

  const status = rnbScreen.querySelector("#rnbDeezerStatus");
  const playArea = rnbScreen.querySelector("#rnbPlayArea");
  const finalArea = rnbScreen.querySelector("#rnbFinalArea");
  const roundBadge = rnbScreen.querySelector("#rnbRoundBadge");
  const scoreBadge = rnbScreen.querySelector("#rnbScoreBadge");
  const choices = rnbScreen.querySelector("#rnbChoices");
  const answerFeedback = rnbScreen.querySelector("#rnbAnswerFeedback");
  const audio = rnbScreen.querySelector("#rnbPreviewAudio");
  const audioButton = rnbScreen.querySelector("#rnbPlayAudio");
  const skipButton = rnbScreen.querySelector("#rnbSkipButton");
  const levelButtons = [...rnbScreen.querySelectorAll("[data-rnb-level]")];
  const backButton = rnbScreen.querySelector("#backToGenreButton");
  const backPlaceholder = rnbScreen.querySelector("#rnbBackButtonPlaceholder");
  let selectedLevel = "facile";
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let requestVersion = 0;
  let currentTrack = null;

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
    status.className = `feedback rnb-deezer-status ${kind}`.trim();
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
      const callback = `quizzmuRnb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
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
    stopAudio();
    selectedLevel = level || selectedLevel;
    levelButtons.forEach((button) => {
      const active = button.dataset.rnbLevel === selectedLevel;
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
    answerFeedback.className = "feedback rnb-answer-feedback";
    stopAudio();
    audioButton.disabled = true;
    audioButton.textContent = "Chargement de l’extrait…";
    skipButton.disabled = false;
    setStatus("Recherche du morceau et de son extrait via Deezer…");

    choices.replaceChildren();
    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "rnb-choice";
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
    answerFeedback.className = `feedback rnb-answer-feedback ${correct ? "success" : "error"}`;
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
    answerFeedback.className = "feedback rnb-answer-feedback info";
    revealAndAdvance(questions[currentIndex]);
  }

  function revealAndAdvance(question) {
    const artist = currentTrack?.artist?.name || question.artist;
    answerFeedback.textContent += ` Réponse : « ${currentTrack?.title || question.title} » — ${artist}${question.featuring ? ` feat. ${question.featuring}` : ""}.`;
    audioButton.disabled = true;
    skipButton.disabled = true;
    window.setTimeout(() => {
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
    rnbScreen.querySelector("#rnbFinalTitle").textContent = `Niveau ${LEVEL_LABELS[selectedLevel]} terminé`;
    rnbScreen.querySelector("#rnbFinalScore").textContent = `Ton score final : ${score} / 100 points.`;
  }

  function showRnbScreen() {
    window.setTimeout(() => {
      originalContent.hidden = true;
      rnbScreen.classList.remove("hidden");
      playArea.classList.add("hidden");
      finalArea.classList.add("hidden");
      chooseModeButton.classList.add("hidden");
      backPlaceholder.before(backButton);
      headerActions.appendChild(backButton);
      backButton.classList.remove("hidden");
    }, 0);
  }

  function leaveRnbScreen() {
    requestVersion += 1;
    stopAudio();
    rnbScreen.classList.add("hidden");
    originalContent.hidden = false;
    backPlaceholder.after(backButton);
    backButton.classList.add("hidden");
    chooseModeButton.classList.remove("hidden");
  }

  rnbButton.addEventListener("click", showRnbScreen);
  levelButtons.forEach((button) => button.addEventListener("click", () => startGame(button.dataset.rnbLevel)));
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
  rnbScreen.querySelector("#rnbReplayButton").addEventListener("click", () => startGame(selectedLevel));
  backButton.addEventListener("click", leaveRnbScreen);
  window.addEventListener("pagehide", stopAudio);
})();
