(() => {
  "use strict";

  const artistCatalog = {
    beyonce: {
      name: "Beyoncé",
      intro: "7 blind tests et 3 questions de culture musicale.",
      blindTests: [
        { type: "blindtest", title: "Halo", artist: "Beyoncé", search: "Halo Beyoncé", fallbackTrackId: "2137356" },
        { type: "blindtest", title: "Crazy in Love", artist: "Beyoncé", search: "Crazy in Love Beyoncé" },
        { type: "blindtest", title: "Single Ladies", artist: "Beyoncé", search: "Single Ladies Beyoncé" },
        { type: "blindtest", title: "Irreplaceable", artist: "Beyoncé", search: "Irreplaceable Beyoncé" },
        { type: "blindtest", title: "Love On Top", artist: "Beyoncé", search: "Love On Top Beyoncé" },
        { type: "blindtest", title: "Formation", artist: "Beyoncé", search: "Formation Beyoncé" },
        { type: "blindtest", title: "BREAK MY SOUL", artist: "Beyoncé", search: "BREAK MY SOUL Beyoncé" }
      ],
      cultureQuestions: [
        { type: "culture", prompt: "Dans quel groupe Beyoncé a-t-elle commencé sa carrière ?", title: "Destiny’s Child", answers: ["Destiny’s Child", "TLC", "En Vogue", "The Supremes"] },
        { type: "culture", prompt: "En quelle année l’album Lemonade est-il sorti ?", title: "2016", answers: ["2014", "2015", "2016", "2018"] },
        { type: "culture", prompt: "Dans quelle ville Beyoncé est-elle née ?", title: "Houston", answers: ["Atlanta", "Houston", "Dallas", "New Orleans"] }
      ]
    },
    michaeljackson: {
      name: "Michael Jackson",
      intro: "5 blind tests et 5 questions de culture musicale.",
      blindTests: [
        { type: "blindtest", title: "Billie Jean", artist: "Michael Jackson", search: "Billie Jean Michael Jackson" },
        { type: "blindtest", title: "Thriller", artist: "Michael Jackson", search: "Thriller Michael Jackson" },
        { type: "blindtest", title: "Beat It", artist: "Michael Jackson", search: "Beat It Michael Jackson" },
        { type: "blindtest", title: "Smooth Criminal", artist: "Michael Jackson", search: "Smooth Criminal Michael Jackson" },
        { type: "blindtest", title: "Bad", artist: "Michael Jackson", search: "Bad Michael Jackson" }
      ],
      cultureQuestions: [
        { type: "culture", prompt: "Quel album de Michael Jackson est considéré comme l’un des plus vendus de tous les temps ?", title: "Thriller", answers: ["Off the Wall", "Thriller", "Bad", "Dangerous"] },
        { type: "culture", prompt: "Quel groupe de musique a lancé la carrière de Michael Jackson avant sa carrière solo ?", title: "The Jackson 5", answers: ["The Jackson 5", "The Temptations", "The Supremes", "The Four Tops"] },
        { type: "culture", prompt: "Quel titre de Michael Jackson est associé au célèbre pas de danse du moonwalk ?", title: "Billie Jean", answers: ["Beat It", "Billie Jean", "Smooth Criminal", "Man in the Mirror"] },
        { type: "culture", prompt: "Lequel de ces albums est sorti avant Dangerous ?", title: "Bad", answers: ["HIStory", "Bad", "Invincible", "Number Ones"] },
        { type: "culture", prompt: "Dans quelle ville Michael Jackson est-il né ?", title: "Gary", answers: ["Chicago", "Gary", "Detroit", "Los Angeles"] }
      ]
    }
  };

  const API_TIMEOUT_MS = 10000;
  const appShell = document.getElementById("appShell");
  const tabs = document.querySelectorAll(".category-tab");
  const startScreen = document.getElementById("artistStartScreen");
  const gameScreen = document.getElementById("artistGameScreen");
  const endScreen = document.getElementById("artistEndScreen");
  const startBeyonceButton = document.getElementById("startBeyonceButton");
  const startMichaelButton = document.getElementById("startMichaelButton");
  const restartButton = document.getElementById("restartArtistButton");
  const directoryButton = document.getElementById("artistDirectoryButton");
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
  const endTitle = document.getElementById("artistEndTitle");
  const endBadge = document.getElementById("artistEndBadge");
  const standardHeaderButtons = [...document.querySelectorAll(".header-actions button")];

  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let requestVersion = 0;
  let currentTrack = null;
  let currentArtistId = "beyonce";
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
  function getArtistQuestions() {
    const artist = artistCatalog[currentArtistId];
    return [...artist.blindTests, ...artist.cultureQuestions];
  }

  // JSONP pattern retained from the tested Deezer prototype for GitHub Pages compatibility.
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
    const artistName = artistCatalog[currentArtistId].name;
    const search = question.search || `${question.title} ${artistName}`;
    try {
      const results = await requestJSONP(`https://api.deezer.com/search?q=${encodeURIComponent(search)}`);
      const list = Array.isArray(results.data) ? results.data : [];
      const expectedTitle = normalize(question.title);
      const match = list.find((item) => {
        const resultTitle = normalize(item.title);
        const resultArtist = normalize(item.artist?.name);
        return (resultTitle === expectedTitle || resultTitle.startsWith(`${expectedTitle} `)) && resultArtist.includes(normalize(artistName));
      });
      if (match?.id) {
        const track = await requestJSONP(`https://api.deezer.com/track/${encodeURIComponent(match.id)}`);
        if (!(normalize(track.title) === expectedTitle || normalize(track.title).startsWith(`${expectedTitle} `))) throw new Error("Le résultat Deezer ne correspond pas au titre demandé.");
        if (!normalize(track.artist?.name).includes(normalize(artistName))) throw new Error(`Le résultat Deezer ne correspond pas à ${artistName}.`);
        return track;
      }
    } catch (error) {
      if (!question.fallbackTrackId) throw error;
    }
    if (question.fallbackTrackId) {
      const track = await requestJSONP(`https://api.deezer.com/track/${encodeURIComponent(question.fallbackTrackId)}`);
      if (!normalize(track.title).startsWith(normalize(question.title)) || !normalize(track.artist?.name).includes(normalize(artistName))) throw new Error(`Le morceau Deezer ne correspond pas à ${question.title} de ${artistName}.`);
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
      showArtistDirectory();
    } else {
      startScreen.classList.add("hidden");
      gameScreen.classList.add("hidden");
      endScreen.classList.add("hidden");
      if (savedHeaderButtonState.length) standardHeaderButtons.forEach((button, index) => button.classList.toggle("hidden", savedHeaderButtonState[index]));
    }
  }

  function showArtistDirectory() {
    startScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
  }
  function startGame(artistId) {
    if (artistId) currentArtistId = artistId;
    currentIndex = 0;
    score = 0;
    requestVersion += 1;
    endScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    renderQuestion();
  }
  function renderChoices(question) {
    const artist = artistCatalog[currentArtistId];
    const answers = question.answers || [question.title, ...shuffle(artist.blindTests.map((item) => item.title).filter((title) => title !== question.title)).slice(0, 3)];
    choicesElement.replaceChildren();
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

  async function renderQuestion() {
    const version = ++requestVersion;
    const artist = artistCatalog[currentArtistId];
    const questions = getArtistQuestions();
    const question = questions[currentIndex];
    answered = false;
    currentTrack = null;
    roundBadge.textContent = `Question ${currentIndex + 1} / ${questions.length}`;
    scoreBadge.textContent = `Score : ${score} / ${questions.length}`;
    questionType.textContent = question.type === "blindtest" ? `Blind test · ${artist.name}` : `Culture musicale · ${artist.name}`;
    prompt.textContent = question.prompt || "Quel est le titre du morceau ?";
    audioArea.hidden = question.type !== "blindtest";
    revealElement.hidden = true;
    nextButton.hidden = true;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    playButton.disabled = true;
    playButton.textContent = "Chargement de l’extrait…";
    if (question.type === "blindtest") setStatus("Recherche du morceau et de son extrait via Deezer…");
    renderChoices(question);
    if (question.type !== "blindtest") return;
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
    const question = getArtistQuestions()[currentIndex];
    const correct = normalize(selectedAnswer) === normalize(question.title);
    if (correct) score += 1;
    if (question.type === "blindtest") audio.pause();
    selectedButton.setAttribute("aria-pressed", "true");
    selectedButton.classList.add(correct ? "correct" : "incorrect");
    choicesElement.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (normalize(button.textContent) === normalize(question.title)) button.classList.add("correct");
    });
    scoreBadge.textContent = `Score : ${score} / ${getArtistQuestions().length}`;
    const heading = document.createElement("strong");
    heading.textContent = correct ? "Bonne réponse !" : "Réponse incorrecte.";
    const details = document.createElement("p");
    details.textContent = question.type === "blindtest"
      ? `La bonne réponse : ${currentTrack?.title || question.title} — ${currentTrack?.artist?.name || artistCatalog[currentArtistId].name}.`
      : `La bonne réponse : ${question.title}.`;
    revealElement.replaceChildren(heading, details);
    revealElement.hidden = false;
    if (question.type === "blindtest") setStatus(correct ? "Bien joué !" : "Voici la bonne réponse.", correct ? "success" : "error");
    nextButton.textContent = currentIndex === getArtistQuestions().length - 1 ? "Voir mon score →" : "Suivant →";
    nextButton.hidden = false;
  }
  function finishGame() {
    gameScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    endTitle.textContent = `Quiz ${artistCatalog[currentArtistId].name} terminé !`;
    endBadge.textContent = `Spécial ${artistCatalog[currentArtistId].name}`;
    finalScore.textContent = `Ton score : ${score} / ${getArtistQuestions().length}`;
  }

  playButton.addEventListener("click", async () => {
    if (!currentTrack?.preview) return;
    if (audio.paused) {
      try { await audio.play(); }
      catch { setStatus("La lecture de l’extrait a échoué. Tu peux répondre et continuer.", "error"); }
    } else audio.pause();
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
    if (currentIndex < getArtistQuestions().length - 1) { currentIndex += 1; renderQuestion(); }
    else finishGame();
  });
  startBeyonceButton.addEventListener("click", () => startGame("beyonce"));
  startMichaelButton.addEventListener("click", () => startGame("michaeljackson"));
  restartButton.addEventListener("click", () => startGame());
  directoryButton.addEventListener("click", showArtistDirectory);
  tabs.forEach((tab) => tab.addEventListener("click", () => setMode(tab.dataset.mode)));
})();
