(() => {
  "use strict";

  const blindTests = [
    { type: "blindtest", title: "Halo", artist: "Beyoncé", search: "Halo Beyoncé", fallbackTrackId: "2137356" },
    { type: "blindtest", title: "Crazy in Love", artist: "Beyoncé", search: "Crazy in Love Beyoncé" },
    { type: "blindtest", title: "Single Ladies", artist: "Beyoncé", search: "Single Ladies Beyoncé" },
    { type: "blindtest", title: "Irreplaceable", artist: "Beyoncé", search: "Irreplaceable Beyoncé" },
    { type: "blindtest", title: "Love On Top", artist: "Beyoncé", search: "Love On Top Beyoncé" },
    { type: "blindtest", title: "Formation", artist: "Beyoncé", search: "Formation Beyoncé" },
    { type: "blindtest", title: "BREAK MY SOUL", artist: "Beyoncé", search: "BREAK MY SOUL Beyoncé" }
  ];

  const cultureQuestions = [
    {
      type: "culture",
      prompt: "Dans quel groupe Beyoncé a-t-elle commencé sa carrière ?",
      title: "Destiny’s Child",
      answers: ["Destiny’s Child", "TLC", "En Vogue", "The Supremes"]
    },
    {
      type: "culture",
      prompt: "En quelle année l’album Lemonade est-il sorti ?",
      title: "2016",
      answers: ["2014", "2015", "2016", "2018"]
    },
    {
      type: "culture",
      prompt: "Dans quelle ville Beyoncé est-elle née ?",
      title: "Houston",
      answers: ["Atlanta", "Houston", "Dallas", "New Orleans"]
    }
  ];
  const questions = [...blindTests, ...cultureQuestions];
  const API_TIMEOUT_MS = 10000;
  const appShell = document.getElementById("appShell");
  const tabs = document.querySelectorAll(".category-tab");
  const startScreen = document.getElementById("artistStartScreen");
  const gameScreen = document.getElementById("artistGameScreen");
  const endScreen = document.getElementById("artistEndScreen");
  const startButton = document.getElementById("startArtistBtn");
  const restartButton = document.getElementById("restartArtistButton");
  const roundBadge = document.getElementById("artistRoundBadge");
  const scoreBadge = document.getElementById("artistScoreBadge");
  const questionType = document.getElementById("artistQuestionType");
  const prompt = document.getElementById("artistQuestionPrompt");
  const audioArea = document.getElementById("artistAudioArea");
  const audio = document.getElementById("artistPreviewAudio");
  const playButton = document.getElementById("artistPlayButton");
  const audioStatus = document.getElementById("artistAudioStatus");
  const choicesElement = document.getElementById("artistChoices");
  const revealElement = document.getElementById("artistReveal");
  const nextButton = document.getElementById("artistNextButton");
  const finalScore = document.getElementById("artistFinalScore");
  const standardHeaderButtons = [...document.querySelectorAll(".header-actions button")];

  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let requestVersion = 0;
  let currentTrack = null;
  let savedHeaderButtonState = [];

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
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
    audioStatus.textContent = message;
    audioStatus.className = `feedback ${kind}`.trim();
  }

  // Reuse the tested JSONP request pattern from the project's Deezer prototype.
  function requestJSONP(url) {
    return new Promise((resolve, reject) => {
      const callback = `quizzmuCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement("script");
      let finished = false;
      let timeout;
      const clean = () => {
        clearTimeout(timeout);
        script.remove();
        try { delete window[callback]; } catch { window[callback] = undefined; }
      };
      const fail = (message) => {
        if (finished) return;
        finished = true;
        clean();
        reject(new Error(message));
      };
      window[callback] = (data) => {
        if (finished) return;
        finished = true;
        clean();
        if (!data || data.error) reject(new Error("Deezer n’a pas renvoyé les données attendues."));
        else resolve(data);
      };
      script.onerror = () => fail("La requête JSONP vers Deezer a échoué.");
      const separator = url.includes("?") ? "&" : "?";
      script.src = `${url}${separator}output=jsonp&callback=${encodeURIComponent(callback)}`;
      timeout = window.setTimeout(() => fail("La requête Deezer a expiré."), API_TIMEOUT_MS);
      document.head.appendChild(script);
    });
  }

  async function getTrack(question) {
    try {
      const results = await requestJSONP(`https://api.deezer.com/search?q=${encodeURIComponent(question.search)}`);
      const list = Array.isArray(results.data) ? results.data : [];
      const expectedTitle = normalize(question.title);
      const match = list.find((item) => {
        const resultTitle = normalize(item.title);
        const resultArtist = normalize(item.artist?.name);
        const titleMatches = resultTitle === expectedTitle || resultTitle.startsWith(`${expectedTitle} `);
        return titleMatches && resultArtist.includes("beyonce");
      });
      if (match?.id) {
        const track = await requestJSONP(`https://api.deezer.com/track/${encodeURIComponent(match.id)}`);
        if (normalize(track.title) !== expectedTitle && !normalize(track.title).startsWith(`${expectedTitle} `)) {
          throw new Error("Le résultat Deezer ne correspond pas au titre demandé.");
        }
        if (!normalize(track.artist?.name).includes("beyonce")) {
          throw new Error("Le résultat Deezer ne correspond pas à Beyoncé.");
        }
        return track;
      }
    } catch (error) {
      if (!question.fallbackTrackId) throw error;
    }

    if (question.fallbackTrackId) {
      const track = await requestJSONP(`https://api.deezer.com/track/${encodeURIComponent(question.fallbackTrackId)}`);
      if (!normalize(track.title).startsWith("halo") || !normalize(track.artist?.name).includes("beyonce")) {
        throw new Error("Le morceau de secours Deezer ne correspond pas à Halo de Beyoncé.");
      }
      return track;
    }
    throw new Error("Deezer n’a pas trouvé ce morceau.");
  }

  function setMode(mode) {
    const artistMode = mode === "artist";
    appShell.classList.toggle("artist-mode-active", artistMode);
    tabs.forEach((tab) => {
      const active = tab.dataset.mode === mode;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    if (artistMode) {
      savedHeaderButtonState = standardHeaderButtons.map((button) => button.classList.contains("hidden"));
      standardHeaderButtons.forEach((button) => button.classList.add("hidden"));
      showArtistStart();
    } else {
      artistStartScreenHide();
      if (savedHeaderButtonState.length) {
        standardHeaderButtons.forEach((button, index) => button.classList.toggle("hidden", savedHeaderButtonState[index]));
      }
    }
  }

  function artistStartScreenHide() {
    startScreen.classList.add("hidden");
    gameScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
  }

  function showArtistStart() {
    artistStartScreenHide();
    startScreen.classList.remove("hidden");
  }

  function startGame() {
    currentIndex = 0;
    score = 0;
    requestVersion += 1;
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    renderQuestion();
  }

  function renderChoices(question) {
    choicesElement.replaceChildren();
    const answers = question.answers || makeBlindTestAnswers(question.title);
    shuffle(answers).forEach((answerText) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "artist-choice";
      button.textContent = answerText;
      button.setAttribute("aria-pressed", "false");
      button.addEventListener("click", () => answer(answerText, button));
      choicesElement.appendChild(button);
    });
  }

  function makeBlindTestAnswers(correctTitle) {
    const otherTitles = blindTests.map((question) => question.title).filter((title) => title !== correctTitle);
    return [correctTitle, ...shuffle(otherTitles).slice(0, 3)];
  }

  async function renderQuestion() {
    const version = ++requestVersion;
    const question = questions[currentIndex];
    answered = false;
    currentTrack = null;
    roundBadge.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
    scoreBadge.textContent = `Score : ${score} / ${questions.length}`;
    questionType.textContent = question.type === "blindtest" ? "Blind test · Beyoncé" : "Culture musicale · Beyoncé";
    prompt.textContent = question.prompt || "Quel est le titre du morceau ?";
    audioArea.hidden = question.type !== "blindtest";
    choicesElement.replaceChildren();
    revealElement.hidden = true;
    nextButton.hidden = true;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    playButton.disabled = true;
    playButton.textContent = "Chargement de l’extrait…";
    if (question.type === "blindtest") setStatus("Recherche du morceau et de son extrait via Deezer…");
    renderChoices(question);

    if (question.type !== "blindtest") {
      setStatus("");
      playButton.textContent = "▶ Lire l’extrait";
      return;
    }

    try {
      const track = await getTrack(question);
      if (version !== requestVersion) return;
      currentTrack = track;
      if (!track.preview || typeof track.preview !== "string") {
        playButton.textContent = "Extrait indisponible";
        setStatus("Le morceau a été trouvé, mais Deezer ne fournit pas de preview. Tu peux répondre et continuer.", "error");
        return;
      }
      audio.src = track.preview;
      audio.load();
      playButton.disabled = false;
      playButton.textContent = "▶ Lire l’extrait";
      setStatus("Extrait chargé. Écoute puis choisis une réponse.", "success");
    } catch (error) {
      if (version !== requestVersion) return;
      playButton.disabled = true;
      playButton.textContent = "Extrait indisponible";
      setStatus(`${error.message || "Une erreur Deezer est survenue."} Tu peux répondre et continuer.`, "error");
    }
  }

  function answer(selectedAnswer, selectedButton) {
    if (answered) return;
    answered = true;
    const question = questions[currentIndex];
    const correct = normalize(selectedAnswer) === normalize(question.title);
    if (correct) score += 1;
    if (question.type === "blindtest") audio.pause();
    selectedButton.setAttribute("aria-pressed", "true");
    selectedButton.classList.add(correct ? "correct" : "incorrect");
    choicesElement.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (normalize(button.textContent) === normalize(question.title)) button.classList.add("correct");
    });
    scoreBadge.textContent = `Score : ${score} / ${questions.length}`;
    const heading = document.createElement("strong");
    heading.textContent = correct ? "Bonne réponse !" : "Réponse incorrecte.";
    const details = document.createElement("p");
    const revealedTitle = currentTrack?.title || question.title;
    const revealedArtist = currentTrack?.artist?.name || "Beyoncé";
    details.textContent = question.type === "blindtest"
      ? `La bonne réponse : ${revealedTitle} — ${revealedArtist}.`
      : `La bonne réponse : ${question.title}.`;
    revealElement.replaceChildren(heading, details);
    revealElement.hidden = false;
    if (question.type === "blindtest") setStatus(correct ? "Bien joué !" : "Voici la bonne réponse.", correct ? "success" : "error");
    nextButton.textContent = currentIndex === questions.length - 1 ? "Voir mon score →" : "Suivant →";
    nextButton.hidden = false;
  }

  function finishGame() {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    finalScore.textContent = `Ton score : ${score} / ${questions.length}`;
  }

  playButton.addEventListener("click", async () => {
    if (!currentTrack?.preview) return;
    if (audio.paused) {
      try { await audio.play(); }
      catch { setStatus("La lecture de l’extrait a échoué. Tu peux répondre et continuer.", "error"); }
    } else {
      audio.pause();
    }
  });
  audio.addEventListener("play", () => { playButton.textContent = "⏸ Pause"; });
  audio.addEventListener("pause", () => { if (currentTrack?.preview) playButton.textContent = "▶ Lire l’extrait"; });
  audio.addEventListener("ended", () => { playButton.textContent = "▶ Rejouer l’extrait"; });
  audio.addEventListener("error", () => {
    if (!currentTrack) return;
    setStatus("L’extrait est indisponible ou a expiré. Tu peux quand même répondre et continuer.", "error");
    playButton.disabled = true;
    playButton.textContent = "Extrait indisponible";
  });

  nextButton.addEventListener("click", () => {
    if (!answered) return;
    if (currentIndex < questions.length - 1) {
      currentIndex += 1;
      renderQuestion();
    } else finishGame();
  });
  tabs.forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.mode)));
  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", startGame);
})();
