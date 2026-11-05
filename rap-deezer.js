(() => {
  "use strict";

  const API_TIMEOUT_MS = 10000;
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
      <p>Choisis un niveau, écoute l’extrait Deezer et retrouve le titre parmi 4 propositions.</p>
    </div>
    <div class="rap-level-picker" role="group" aria-label="Choisir le niveau">
      <button type="button" class="difficulty-btn active" data-rap-level="facile" aria-pressed="true">Facile</button>
      <button type="button" class="difficulty-btn" data-rap-level="moyen" aria-pressed="false">Moyen</button>
      <button type="button" class="difficulty-btn" data-rap-level="difficile" aria-pressed="false">Difficile</button>
    </div>
    <div id="rapPlayArea" class="rap-play-area hidden">
      <div class="game-header"><span id="rapRoundBadge" class="round-badge">Question 1 / 10</span><span id="rapScoreBadge" class="score-badge">Score : 0 / 100</span></div>
      <p id="rapDeezerStatus" class="feedback rap-deezer-status" role="status" aria-live="polite">Recherche du morceau et de son extrait via Deezer…</p>
      <div class="rap-audio-card">
        <p class="hint-label">ÉCOUTE L’EXTRAIT</p>
        <button id="rapPlayAudio" class="primary-btn rap-audio-button" type="button" disabled>Chargement de l’extrait…</button>
      </div>
      <p class="rap-answer-prompt">Quel est le titre de ce morceau ?</p>
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
    status.className = `feedback rap-deezer-status ${kind}`.trim();
  }

  // Same JSONP approach as the artist blind test, so Deezer works on static GitHub Pages.
  function requestJSONP(url) {
    return new Promise((resolve, reject) => {
      const callback = `quizzmuRap_${Date.now()}_${Math.random().toString(36).slice(2)}`;
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
    selectedLevel = level || selectedLevel;
    levelButtons.forEach((button) => {
      const active = button.dataset.rapLevel === selectedLevel;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    requestVersion += 1;
    questions = shuffle(TRACKS[selectedLevel]).map((track) => ({
      ...track,
      options: shuffle([track.title, ...shuffle(TRACKS[selectedLevel].filter((item) => item.title !== track.title).map((item) => item.title)).slice(0, 3)])
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
    answerFeedback.className = "feedback rap-answer-feedback";
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    audioButton.disabled = true;
    audioButton.textContent = "Chargement de l’extrait…";
    skipButton.disabled = false;
    setStatus("Recherche du morceau et de son extrait via Deezer…");

    choices.replaceChildren();
    question.options.forEach((answerText) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "rap-choice";
      button.textContent = answerText;
      button.addEventListener("click", () => answer(answerText, button));
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

  function answer(selectedAnswer, selectedButton) {
    if (answered) return;
    answered = true;
    const question = questions[currentIndex];
    const correct = normalize(selectedAnswer) === normalize(question.title);
    if (correct) score += 10;
    audio.pause();
    selectedButton.classList.add(correct ? "correct" : "incorrect");
    choices.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (normalize(button.textContent) === normalize(question.title)) button.classList.add("correct");
    });
    scoreBadge.textContent = `Score : ${score} / 100`;
    answerFeedback.textContent = correct ? "Bonne réponse ! +10 points" : "Réponse incorrecte.";
    answerFeedback.className = `feedback rap-answer-feedback ${correct ? "success" : "error"}`;
    revealAndAdvance(question);
  }

  function passQuestion() {
    if (answered) return;
    answered = true;
    audio.pause();
    choices.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (normalize(button.textContent) === normalize(questions[currentIndex].title)) button.classList.add("correct");
    });
    answerFeedback.textContent = "Question passée.";
    answerFeedback.className = "feedback rap-answer-feedback info";
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
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    playArea.classList.add("hidden");
    finalArea.classList.remove("hidden");
    rapScreen.querySelector("#rapFinalTitle").textContent = `Niveau ${LEVEL_LABELS[selectedLevel]} terminé`;
    rapScreen.querySelector("#rapFinalScore").textContent = `Ton score final : ${score} / 100 points.`;
  }

  rapButton.addEventListener("click", () => {
    window.setTimeout(() => {
      originalContent.hidden = true;
      rapScreen.classList.remove("hidden");
      playArea.classList.add("hidden");
      finalArea.classList.add("hidden");
    }, 0);
  });
  levelButtons.forEach((button) => button.addEventListener("click", () => startGame(button.dataset.rapLevel)));
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
  rapScreen.querySelector("#rapReplayButton").addEventListener("click", () => startGame(selectedLevel));
  rapScreen.querySelector("#backToGenreButton").addEventListener("click", () => {
    requestVersion += 1;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    rapScreen.classList.add("hidden");
    originalContent.hidden = false;
  });
})();
