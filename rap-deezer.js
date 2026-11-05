(() => {
  "use strict";

  const API_TIMEOUT_MS = 12000;
  const PREVIEW_TIMEOUT_MS = 8000;
  const TRACKS_PER_LEVEL = 10;
  const TRACKS = {
    facile: [
      { title: "Au DD", artist: "PNL" },
      { title: "La vie qu'on mène", artist: "Ninho" },
      { title: "HAINE&SEX", artist: "Gazo" },
      { title: "Bolide allemand", artist: "SDM" },
      { title: "Réseaux", artist: "Niska" },
      { title: "God's Plan", artist: "Drake" },
      { title: "SICKO MODE", artist: "Travis Scott" },
      { title: "WAP", artist: "Cardi B", featuring: "Megan Thee Stallion" },
      { title: "Not Like Us", artist: "Kendrick Lamar" },
      { title: "Empire State of Mind", artist: "JAY-Z", featuring: "Alicia Keys" }
    ],
    moyen: [
      { title: "Macarena", artist: "Damso" },
      { title: "Champs-Élysées", artist: "SCH" },
      { title: "On verra", artist: "Nekfeu" },
      { title: "92i Veyron", artist: "Booba" },
      { title: "Wati by Night", artist: "Sexion d'Assaut" },
      { title: "Bodak Yellow", artist: "Cardi B" },
      { title: "Mask Off", artist: "Future" },
      { title: "Praise The Lord (Da Shine)", artist: "A$AP Rocky", featuring: "Skepta" },
      { title: "Super Bass", artist: "Nicki Minaj" },
      { title: "In Da Club", artist: "50 Cent" }
    ],
    difficile: [
      { title: "Étoile", artist: "Booba" },
      { title: "Uranus", artist: "PNL" },
      { title: "Kietu", artist: "Damso" },
      { title: "Binks to Binks 6", artist: "Ninho" },
      { title: "Interlude", artist: "SCH" },
      { title: "Tuscan Leather", artist: "Drake" },
      { title: "Maria I'm Drunk", artist: "Travis Scott" },
      { title: "FEAR.", artist: "Kendrick Lamar" },
      { title: "Codeine Crazy", artist: "Future" },
      { title: "Saint Pablo", artist: "Kanye West" }
    ]
  };
  const LEVEL_LABELS = { facile: "Facile", moyen: "Moyen", difficile: "Difficile" };
  const rapButton = document.querySelector('.genre-btn[data-genre="rap"]');
  const startScreen = document.getElementById("startScreen");
  if (!rapButton || !startScreen) return;

  const originalContent = startScreen.querySelector(":scope > .panel-content");
  if (!originalContent) return;

  const rapScreen = document.createElement("section");
  rapScreen.className = "rap-deezer-panel hidden";
  rapScreen.setAttribute("aria-labelledby", "rapDeezerTitle");
  rapScreen.innerHTML = `
    <div class="rap-deezer-heading">
      <span class="badge glow">BLIND TEST PAR GENRE · RAP</span>
      <h2 id="rapDeezerTitle">Blind test Rap</h2>
      <p>10 extraits par niveau. Écoute et choisis le bon titre parmi 4 propositions.</p>
    </div>
    <div class="rap-level-picker" role="group" aria-label="Choisir le niveau">
      <button type="button" class="difficulty-btn active" data-rap-level="facile" aria-pressed="true">Facile</button>
      <button type="button" class="difficulty-btn" data-rap-level="moyen" aria-pressed="false">Moyen</button>
      <button type="button" class="difficulty-btn" data-rap-level="difficile" aria-pressed="false">Difficile</button>
    </div>
    <p id="rapDeezerStatus" class="feedback rap-deezer-status" role="status" aria-live="polite">Charge et vérifie les 30 extraits Deezer pour commencer.</p>
    <button id="loadRapTracks" class="primary-btn start-btn" type="button">Charger les 30 morceaux</button>
    <div id="rapPlayArea" class="rap-play-area hidden">
      <div class="game-header"><span id="rapRoundBadge" class="round-badge">Question 1 / 10</span><span id="rapScoreBadge" class="score-badge">Score : 0 / 100</span></div>
      <div class="rap-audio-card">
        <p class="hint-label">ÉCOUTE L’EXTRAIT</p>
        <button id="rapPlayAudio" class="primary-btn rap-audio-button" type="button">▶ Écouter l’extrait</button>
      </div>
      <p id="rapAnswerPrompt" class="rap-answer-prompt">Quel est le titre de ce morceau ?</p>
      <div id="rapChoices" class="rap-choices" role="group" aria-label="Propositions de titres"></div>
      <p id="rapAnswerFeedback" class="feedback rap-answer-feedback" aria-live="polite"></p>
      <button id="rapSkipButton" class="ghost-btn rap-skip-button" type="button">Passer</button>
    </div>
    <div id="rapFinalArea" class="rap-final-area hidden" aria-live="polite">
      <span class="badge success">FIN DE PARTIE</span>
      <h3 id="rapFinalTitle">Partie terminée</h3>
      <p id="rapFinalScore"></p>
      <button id="rapReplayButton" class="primary-btn" type="button">Rejouer ce niveau</button>
    </div>
    <p class="rap-deezer-attribution">Extraits de 30 secondes fournis par <a href="https://www.deezer.com/" target="_blank" rel="noopener noreferrer">Deezer</a>. Lecture en ligne, sans téléchargement.</p>
    <button id="backToGenreButton" class="ghost-btn rap-back-button" type="button">← Retour aux genres</button>
    <audio id="rapPreviewAudio" preload="none"></audio>
  `;
  startScreen.appendChild(rapScreen);

  const status = rapScreen.querySelector("#rapDeezerStatus");
  const loadButton = rapScreen.querySelector("#loadRapTracks");
  const playArea = rapScreen.querySelector("#rapPlayArea");
  const finalArea = rapScreen.querySelector("#rapFinalArea");
  const roundBadge = rapScreen.querySelector("#rapRoundBadge");
  const scoreBadge = rapScreen.querySelector("#rapScoreBadge");
  const choices = rapScreen.querySelector("#rapChoices");
  const answerFeedback = rapScreen.querySelector("#rapAnswerFeedback");
  const audio = rapScreen.querySelector("#rapPreviewAudio");
  const audioButton = rapScreen.querySelector("#rapPlayAudio");
  const skipButton = rapScreen.querySelector("#rapSkipButton");
  const levelButtons = [...rapScreen.querySelectorAll("[data-rap-level]")];
  const cachedCatalog = {};
  let selectedLevel = "facile";
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let locked = false;
  let requestVersion = 0;
  let activePreviewButton = null;

  const setStatus = (message, kind = "") => {
    status.textContent = message;
    status.className = `feedback rap-deezer-status ${kind}`.trim();
  };
  const normalize = (value) => String(value || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
  const shuffle = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  function requestJSONP(url) {
    return new Promise((resolve, reject) => {
      const callback = `quizzmuRap_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement("script");
      let settled = false;
      let timeout;
      const cleanup = () => {
        window.clearTimeout(timeout);
        script.remove();
        try { delete window[callback]; } catch { window[callback] = undefined; }
      };
      const fail = (message) => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error(message));
      };
      window[callback] = (payload) => {
        if (settled) return;
        settled = true;
        cleanup();
        if (!payload || payload.error || !Array.isArray(payload.data)) {
          reject(new Error("Deezer n’a pas renvoyé les résultats attendus."));
          return;
        }
        resolve(payload.data);
      };
      script.onerror = () => fail("La connexion à l’API Deezer a échoué.");
      script.src = `${url}${url.includes("?") ? "&" : "?"}output=jsonp&callback=${encodeURIComponent(callback)}`;
      timeout = window.setTimeout(() => fail("La recherche Deezer a expiré."), API_TIMEOUT_MS);
      document.head.appendChild(script);
    });
  }

  function titleForComparison(value) {
    // Deezer may append the explicitly requested featured artist to the title.
    return normalize(String(value || "").replace(/\s*[([б]*(?:feat\.?|ft\.?|with)\s+.*$/i, ""));
  }

  function getTrackCredits(track) {
    return [track.artist?.name, track.title, track.title_short, track.title_version,
      ...(Array.isArray(track.contributors) ? track.contributors.map((person) => person?.name) : [])]
      .filter(Boolean).join(" ");
  }

  function isExactMatch(track, expected) {
    if (!track?.id || !track.title || !track.artist?.name || !track.preview || !track.link) return false;
    if (titleForComparison(track.title) !== normalize(expected.title)) return false;
    if (normalize(track.artist.name) !== normalize(expected.artist)) return false;
    if (expected.featuring && !normalize(getTrackCredits(track)).includes(normalize(expected.featuring))) return false;
    return /^https:\/\//i.test(track.preview) && /^https:\/\//i.test(track.link);
  }

  function previewIsAvailable(url) {
    return new Promise((resolve) => {
      const probe = document.createElement("audio");
      probe.preload = "metadata";
      let finished = false;
      const finish = (available) => {
        if (finished) return;
        finished = true;
        window.clearTimeout(timeout);
        probe.removeEventListener("loadedmetadata", onMetadata);
        probe.removeEventListener("error", onError);
        probe.pause();
        probe.removeAttribute("src");
        probe.load();
        resolve(available);
      };
      const onMetadata = () => finish(Number.isFinite(probe.duration) && probe.duration > 0);
      const onError = () => finish(false);
      const timeout = window.setTimeout(() => finish(false), PREVIEW_TIMEOUT_MS);
      probe.addEventListener("loadedmetadata", onMetadata, { once: true });
      probe.addEventListener("error", onError, { once: true });
      probe.src = url;
      probe.load();
    });
  }

  async function findVerifiedTrack(expected) {
    const query = `${expected.title} ${expected.artist}${expected.featuring ? ` ${expected.featuring}` : ""}`;
    const results = await requestJSONP(`https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=25`);
    const exact = results.find((track) => isExactMatch(track, expected));
    if (!exact) return null;
    if (!await previewIsAvailable(exact.preview)) return null;
    return {
      id: String(exact.id),
      title: exact.title,
      artist: exact.artist.name,
      preview: exact.preview,
      link: exact.link,
      expectedTitle: expected.title,
      expectedArtist: expected.artist,
      featuring: expected.featuring || ""
    };
  }

  async function mapWithLimit(items, limit, callback) {
    const output = new Array(items.length);
    let next = 0;
    const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        output[index] = await callback(items[index], index);
      }
    });
    await Promise.all(workers);
    return output;
  }

  async function loadCatalog() {
    const version = ++requestVersion;
    loadButton.disabled = true;
    playArea.classList.add("hidden");
    finalArea.classList.add("hidden");
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    setStatus("Recherche des 30 titres exacts et vérification de chaque extrait audio…");
    const allExpected = Object.entries(TRACKS).flatMap(([level, tracks]) => tracks.map((track) => ({ ...track, level })));
    let completed = 0;
    try {
      const verified = await mapWithLimit(allExpected, 4, async (expected) => {
        try { return await findVerifiedTrack(expected); } catch { return null; }
        finally {
          completed += 1;
          if (version === requestVersion) setStatus(`Vérification Deezer : ${completed} / ${allExpected.length} morceaux…`);
        }
      });
      if (version !== requestVersion) return;
      const missing = [];
      const result = { facile: [], moyen: [], difficile: [] };
      verified.forEach((track, index) => {
        const expected = allExpected[index];
        if (!track) missing.push(`${expected.artist} — ${expected.title}`);
        else result[expected.level].push(track);
      });
      const complete = Object.values(result).every((tracks) => tracks.length === TRACKS_PER_LEVEL);
      if (!complete) {
        const short = Object.entries(result).filter(([, tracks]) => tracks.length !== TRACKS_PER_LEVEL)
          .map(([level, tracks]) => `${LEVEL_LABELS[level]} : ${tracks.length}/10`).join(" · ");
        setStatus(`Impossible de démarrer : ${short}. Certains titres n’ont pas été trouvés exactement ou leur preview ne répond pas.`, "error");
        console.warn("Titres RAP Deezer non vérifiés :", missing);
        return;
      }
      Object.assign(cachedCatalog, result);
      loadButton.classList.add("hidden");
      setStatus("Les 30 titres et leurs previews ont été vérifiés. Choisis un niveau puis commence.", "success");
      startRound();
    } finally {
      if (version === requestVersion) loadButton.disabled = false;
    }
  }

  function updateScore() {
    scoreBadge.textContent = `Score : ${score} / 100`;
  }

  function stopPreview() {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    if (activePreviewButton) activePreviewButton.textContent = "▶ Écouter l’extrait";
    activePreviewButton = null;
    audioButton.textContent = "▶ Écouter l’extrait";
  }

  function startRound() {
    const catalog = cachedCatalog[selectedLevel];
    if (!catalog || catalog.length !== TRACKS_PER_LEVEL) return;
    questions = shuffle(catalog).map((track) => {
      const wrongTitles = shuffle(catalog.filter((candidate) => candidate.id !== track.id)).slice(0, 3).map((candidate) => candidate.expectedTitle);
      return { ...track, options: shuffle([track.expectedTitle, ...wrongTitles]) };
    });
    currentIndex = 0;
    score = 0;
    locked = false;
    finalArea.classList.add("hidden");
    playArea.classList.remove("hidden");
    loadButton.classList.add("hidden");
    updateScore();
    showQuestion();
  }

  function showQuestion() {
    const question = questions[currentIndex];
    if (!question) return showFinal();
    locked = false;
    stopPreview();
    roundBadge.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
    updateScore();
    answerFeedback.textContent = "";
    answerFeedback.className = "feedback rap-answer-feedback";
    choices.replaceChildren();
    question.options.forEach((title) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "rap-choice";
      button.textContent = title;
      button.addEventListener("click", () => answer(title));
      choices.appendChild(button);
    });
    audioButton.disabled = false;
    skipButton.disabled = false;
  }

  function revealAnswer(question, wasCorrect, passed = false) {
    locked = true;
    stopPreview();
    [...choices.children].forEach((button) => {
      button.disabled = true;
      if (button.textContent === question.expectedTitle) button.classList.add("correct");
    });
    if (wasCorrect) {
      score += 10;
      answerFeedback.textContent = "Bonne réponse ! +10 points";
      answerFeedback.classList.add("success");
    } else if (passed) {
      answerFeedback.textContent = `Passé. La réponse était « ${question.expectedTitle} » — ${question.expectedArtist}${question.featuring ? ` feat. ${question.featuring}` : ""}.`;
      answerFeedback.classList.add("info");
    } else {
      answerFeedback.textContent = `La réponse était « ${question.expectedTitle} » — ${question.expectedArtist}${question.featuring ? ` feat. ${question.featuring}` : ""}.`;
      answerFeedback.classList.add("error");
    }
    updateScore();
    audioButton.disabled = true;
    skipButton.disabled = true;
    window.setTimeout(() => {
      currentIndex += 1;
      if (currentIndex >= questions.length) showFinal();
      else showQuestion();
    }, 1300);
  }

  function answer(selectedTitle) {
    if (locked) return;
    const question = questions[currentIndex];
    const correct = selectedTitle === question.expectedTitle;
    if (correct) [...choices.children].find((button) => button.textContent === selectedTitle)?.classList.add("correct");
    else [...choices.children].find((button) => button.textContent === selectedTitle)?.classList.add("incorrect");
    revealAnswer(question, correct);
  }

  function passQuestion() {
    if (locked) return;
    revealAnswer(questions[currentIndex], false, true);
  }

  function showFinal() {
    stopPreview();
    playArea.classList.add("hidden");
    finalArea.classList.remove("hidden");
    rapScreen.querySelector("#rapFinalTitle").textContent = `Niveau ${LEVEL_LABELS[selectedLevel]} terminé`;
    rapScreen.querySelector("#rapFinalScore").textContent = `Ton score final : ${score} / 100 points.`;
  }

  rapButton.addEventListener("click", () => {
    window.setTimeout(() => {
      originalContent.hidden = true;
      rapScreen.classList.remove("hidden");
      if (!Object.keys(cachedCatalog).length) setStatus("Charge et vérifie les 30 extraits Deezer pour commencer.");
    }, 0);
  });

  levelButtons.forEach((button) => button.addEventListener("click", () => {
    selectedLevel = button.dataset.rapLevel;
    levelButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    if (cachedCatalog[selectedLevel]) startRound();
  }));

  audioButton.addEventListener("click", async () => {
    const question = questions[currentIndex];
    if (!question || locked) return;
    if (!audio.paused && activePreviewButton === audioButton) {
      audio.pause();
      return;
    }
    stopPreview();
    activePreviewButton = audioButton;
    audio.src = question.preview;
    audio.load();
    try {
      await audio.play();
      audioButton.textContent = "⏸ Mettre en pause";
    } catch {
      answerFeedback.textContent = "Lecture impossible pour le moment. Réessaie ou passe cette question.";
      answerFeedback.className = "feedback rap-answer-feedback error";
    }
  });
  audio.addEventListener("pause", () => {
    if (activePreviewButton === audioButton) audioButton.textContent = "▶ Écouter l’extrait";
  });
  audio.addEventListener("ended", () => { audioButton.textContent = "▶ Réécouter l’extrait"; });
  skipButton.addEventListener("click", passQuestion);
  loadButton.addEventListener("click", loadCatalog);
  rapScreen.querySelector("#rapReplayButton").addEventListener("click", startRound);
  rapScreen.querySelector("#backToGenreButton").addEventListener("click", () => {
    requestVersion += 1;
    stopPreview();
    rapScreen.classList.add("hidden");
    originalContent.hidden = false;
  });
})();
