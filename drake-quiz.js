(() => {
  "use strict";

  const ARTIST = "Drake";
  const QUESTIONS = [
    { type: "blindtest", title: "One Dance", search: "One Dance Drake Wizkid Kyla" },
    { type: "blindtest", title: "God's Plan", search: "God's Plan Drake" },
    { type: "blindtest", title: "Hotline Bling", search: "Hotline Bling Drake" },
    { type: "blindtest", title: "In My Feelings", search: "In My Feelings Drake" },
    { type: "blindtest", title: "Nice for What", search: "Nice for What Drake" },
    { type: "blindtest", title: "Started From the Bottom", search: "Started From the Bottom Drake" },
    { type: "culture", prompt: "Dans quelle ville Drake est-il né ?", title: "Toronto", answers: ["Toronto", "Montréal", "Vancouver", "Ottawa"] },
    { type: "culture", prompt: "Dans quelle série télévisée Drake a-t-il joué avant sa carrière musicale ?", title: "Degrassi: The Next Generation", answers: ["The O.C.", "Degrassi: The Next Generation", "Gossip Girl", "One Tree Hill"] },
    { type: "culture", prompt: "Quel est le titre du premier album studio de Drake, sorti en 2010 ?", title: "Thank Me Later", answers: ["So Far Gone", "Thank Me Later", "Take Care", "Nothing Was the Same"] },
    { type: "culture", prompt: "Quel label Drake a-t-il cofondé avec le producteur Noah ‘40’ Shebib et Oliver El-Khatib ?", title: "OVO Sound", answers: ["Cash Money Records", "OVO Sound", "Young Money Entertainment", "Dreamville Records"] }
  ];
  const API_TIMEOUT_MS = 10000;
  const artistStart = document.getElementById("artistStartScreen");
  const appShell = document.getElementById("appShell");
  const cards = artistStart?.querySelector(".artist-cards");
  const main = appShell?.querySelector("main");
  if (!cards || !main) return;

  const card = document.createElement("article");
  card.className = "artist-card";
  card.setAttribute("aria-labelledby", "drakeCardTitle");
  card.innerHTML = '<div class="artist-card-copy"><p class="eyebrow">QUIZ ARTISTE · 10 QUESTIONS</p><h3 id="drakeCardTitle">Drake</h3><p>6 blind tests et 4 questions de culture musicale.</p></div><button class="primary-btn artist-start-button" type="button">Jouer le quiz Drake</button>';
  cards.appendChild(card);

  const modeDescription = document.querySelector('[data-open-mode="artist"] .mode-card-copy > span:last-child');
  if (modeDescription) modeDescription.textContent = "Plonge dans l’univers de Beyoncé, Michael Jackson, Rihanna et Drake.";

  const game = document.createElement("section");
  game.className = "panel artist-view hidden";
  game.setAttribute("aria-labelledby", "drakeQuestionPrompt");
  game.innerHTML = '<div class="artist-game-content"><div class="game-header"><span class="round-badge" data-round>Question 1 / 10</span><span class="score-badge" data-score>Score : 0 / 10</span></div><p class="eyebrow" data-type></p><div class="hint-card artist-question-card"><p class="hint-label">QUESTION</p><h3 data-prompt></h3></div><div class="artist-audio-area" data-audio-area><button class="primary-btn artist-play-button" type="button" data-play disabled>Chargement de l’extrait…</button><audio preload="none"></audio><p class="feedback" role="status" aria-live="polite" data-status></p></div><div class="artist-choices" aria-label="Propositions de réponse" data-choices></div><div class="artist-reveal" hidden aria-live="polite" data-reveal></div><div class="artist-next-row" style="justify-content:space-between"><button class="ghost-btn" type="button" data-pass>Passer</button><button class="primary-btn" type="button" data-next hidden>Question suivante →</button></div></div>';

  const end = document.createElement("section");
  end.className = "panel artist-view hidden";
  end.setAttribute("aria-labelledby", "drakeEndTitle");
  end.innerHTML = '<div class="panel-content center"><span class="badge success">QUIZ ARTISTE TERMINÉ</span><h2 id="drakeEndTitle">Quiz Drake terminé !</h2><p class="artist-final-score" data-final-score></p><div class="end-actions"><button class="primary-btn" type="button" data-restart>Rejouer ce quiz</button><button class="ghost-btn" type="button" data-directory>Retour aux artistes</button></div></div>';
  main.append(game, end);

  const audio = game.querySelector("audio");
  const playButton = game.querySelector("[data-play]");
  const passButton = game.querySelector("[data-pass]");
  const nextButton = game.querySelector("[data-next]");
  const choices = game.querySelector("[data-choices]");
  const status = game.querySelector("[data-status]");
  const reveal = game.querySelector("[data-reveal]");
  let questions = [];
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let requestVersion = 0;
  let currentTrack = null;
  let inDrakeQuiz = false;

  function normalize(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
  }
  function shuffle(list) {
    const result = [...list];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function stopAudio() {
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    playButton.disabled = true;
    playButton.textContent = "▶ Lire l’extrait";
  }
  function setStatus(message, kind = "") {
    status.textContent = message;
    status.className = `feedback ${kind}`.trim();
  }
  function requestJSONP(url) {
    return new Promise((resolve, reject) => {
      const callback = `quizzmuDrake_${Date.now()}_${Math.random().toString(36).slice(2)}`;
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
        if (!payload || payload.error) reject(new Error("Deezer n’a pas renvoyé les données attendues."));
        else resolve(payload);
      };
      script.onerror = () => fail("La requête Deezer a échoué.");
      script.src = `${url}${url.includes("?") ? "&" : "?"}output=jsonp&callback=${encodeURIComponent(callback)}`;
      timeout = window.setTimeout(() => fail("La requête Deezer a expiré."), API_TIMEOUT_MS);
      document.head.appendChild(script);
    });
  }
  async function getTrack(question) {
    const response = await requestJSONP(`https://api.deezer.com/search?q=${encodeURIComponent(question.search)}`);
    const expected = normalize(question.title);
    const result = (Array.isArray(response.data) ? response.data : []).find((item) => {
      const title = normalize(item.title);
      return (title === expected || title.startsWith(`${expected} `)) && normalize(item.artist?.name).includes(normalize(ARTIST));
    });
    if (!result?.id) throw new Error("Deezer n’a pas trouvé ce morceau.");
    const trackResponse = await requestJSONP(`https://api.deezer.com/track/${encodeURIComponent(result.id)}`);
    const track = trackResponse.data || trackResponse;
    const actualTitle = normalize(track.title);
    if (!(actualTitle === expected || actualTitle.startsWith(`${expected} `)) || !normalize(track.artist?.name).includes(normalize(ARTIST))) {
      throw new Error("Le résultat Deezer ne correspond pas au morceau demandé.");
    }
    return track;
  }
  function renderChoices(question) {
    const answers = question.type === "culture"
      ? question.answers
      : shuffle([question.title, ...shuffle(QUESTIONS.filter((item) => item.type === "blindtest" && item.title !== question.title).map((item) => item.title)).slice(0, 3)]);
    choices.replaceChildren();
    shuffle(answers).forEach((label) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "artist-choice";
      button.textContent = label;
      button.addEventListener("click", () => answer(label));
      choices.appendChild(button);
    });
  }
  async function renderQuestion() {
    const version = ++requestVersion;
    const question = questions[currentIndex];
    if (!question) return finish();
    answered = false;
    currentTrack = null;
    stopAudio();
    game.querySelector("[data-round]").textContent = `Question ${currentIndex + 1} / ${questions.length}`;
    game.querySelector("[data-score]").textContent = `Score : ${score} / ${questions.length}`;
    game.querySelector("[data-type]").textContent = question.type === "blindtest" ? `Blind test · ${ARTIST}` : `Culture musicale · ${ARTIST}`;
    game.querySelector("[data-prompt]").textContent = question.prompt || "Quel est le titre du morceau ?";
    game.querySelector("[data-audio-area]").hidden = question.type !== "blindtest";
    reveal.hidden = true;
    reveal.replaceChildren();
    nextButton.hidden = true;
    passButton.disabled = false;
    renderChoices(question);
    if (question.type !== "blindtest") return;
    playButton.textContent = "Recherche de l’extrait…";
    setStatus("Recherche du morceau et de son extrait via Deezer…");
    try {
      const track = await getTrack(question);
      if (version !== requestVersion || !inDrakeQuiz) return;
      currentTrack = track;
      if (!track.preview || typeof track.preview !== "string") {
        playButton.textContent = "Extrait indisponible";
        setStatus("L’extrait Deezer est indisponible pour ce morceau. Tu peux répondre ou passer la question.", "error");
        return;
      }
      audio.src = track.preview;
      audio.load();
      playButton.disabled = false;
      playButton.textContent = "▶ Lire l’extrait";
      setStatus("Extrait chargé. Écoute puis choisis une réponse.", "success");
    } catch (error) {
      if (version !== requestVersion || !inDrakeQuiz) return;
      playButton.textContent = "Extrait indisponible";
      setStatus(`${error.message || "Une erreur Deezer est survenue."} Tu peux répondre ou passer la question.`, "error");
    }
  }
  function answer(selectedAnswer, wasPassed = false) {
    if (answered) return;
    answered = true;
    requestVersion += 1;
    const question = questions[currentIndex];
    stopAudio();
    const correct = !wasPassed && normalize(selectedAnswer) === normalize(question.title);
    if (correct) score += 1;
    choices.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (normalize(button.textContent) === normalize(question.title)) button.classList.add("correct");
      else if (!wasPassed && normalize(button.textContent) === normalize(selectedAnswer)) button.classList.add("incorrect");
    });
    game.querySelector("[data-score]").textContent = `Score : ${score} / ${questions.length}`;
    const heading = document.createElement("strong");
    heading.textContent = wasPassed ? "Question passée." : correct ? "Bonne réponse !" : "Réponse incorrecte.";
    const details = document.createElement("p");
    details.textContent = question.type === "blindtest"
      ? `La bonne réponse : ${currentTrack?.title || question.title} — ${currentTrack?.artist?.name || ARTIST}.`
      : `La bonne réponse : ${question.title}.`;
    reveal.replaceChildren(heading, details);
    reveal.hidden = false;
    if (question.type === "blindtest" && !currentTrack?.preview) setStatus("L’extrait Deezer est indisponible, mais tu peux continuer.", "error");
    nextButton.textContent = currentIndex === questions.length - 1 ? "Voir mon score →" : "Question suivante →";
    nextButton.hidden = false;
    passButton.disabled = true;
  }
  function start() {
    requestVersion += 1;
    stopAudio();
    inDrakeQuiz = true;
    questions = shuffle(QUESTIONS);
    currentIndex = 0;
    score = 0;
    answered = false;
    artistStart.classList.add("hidden");
    end.classList.add("hidden");
    game.classList.remove("hidden");
    renderQuestion();
  }
  function finish() {
    requestVersion += 1;
    stopAudio();
    inDrakeQuiz = false;
    game.classList.add("hidden");
    artistStart.classList.add("hidden");
    end.classList.remove("hidden");
    end.querySelector("[data-final-score]").textContent = `Ton score : ${score} / ${questions.length}`;
  }
  function leaveToDirectory() {
    if (!inDrakeQuiz && game.classList.contains("hidden") && end.classList.contains("hidden")) return;
    requestVersion += 1;
    inDrakeQuiz = false;
    stopAudio();
    game.classList.add("hidden");
    end.classList.add("hidden");
    artistStart.classList.remove("hidden");
  }

  card.querySelector("button").addEventListener("click", start);
  passButton.addEventListener("click", () => answer("", true));
  nextButton.addEventListener("click", () => {
    if (!answered) return;
    currentIndex += 1;
    if (currentIndex >= questions.length) finish();
    else renderQuestion();
  });
  playButton.addEventListener("click", async () => {
    if (!currentTrack?.preview || answered) return;
    if (audio.paused) {
      try { await audio.play(); }
      catch { setStatus("La lecture de l’extrait a échoué. Tu peux répondre ou passer.", "error"); }
    } else audio.pause();
  });
  audio.addEventListener("play", () => { playButton.textContent = "⏸ Pause"; });
  audio.addEventListener("pause", () => { if (currentTrack?.preview && !answered) playButton.textContent = "▶ Lire l’extrait"; });
  audio.addEventListener("ended", () => { if (!answered) playButton.textContent = "▶ Rejouer l’extrait"; });
  audio.addEventListener("error", () => {
    if (!currentTrack) return;
    setStatus("L’extrait Deezer est indisponible ou a expiré. Tu peux répondre ou passer la question.", "error");
    playButton.disabled = true;
    playButton.textContent = "Extrait indisponible";
  });
  end.querySelector("[data-restart]").addEventListener("click", start);
  end.querySelector("[data-directory]").addEventListener("click", leaveToDirectory);
  document.getElementById("artistDirectoryButton")?.addEventListener("click", leaveToDirectory);
  document.querySelectorAll(".category-tab").forEach((button) => button.addEventListener("click", leaveToDirectory));
  document.getElementById("chooseModeBtn")?.addEventListener("click", leaveToDirectory);
  window.addEventListener("pagehide", () => { inDrakeQuiz = false; requestVersion += 1; stopAudio(); });
  document.addEventListener("visibilitychange", () => { if (document.hidden && inDrakeQuiz) stopAudio(); });
})();
