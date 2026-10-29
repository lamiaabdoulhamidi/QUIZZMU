const quizQuestions = [
  { id: "rap-001", genre: "rap", difficulty: "facile", artist: "Ninho", title: "M.L.C.", prompt: "Qui chante le titre 'M.L.C.' ?", acceptedAnswers: ["Ninho", "ninho"], hints: ["C'est un rappeur français", "Il est très connu pour ses morceaux de rap urbain"] },
  { id: "rap-002", genre: "rap", difficulty: "facile", artist: "Drake", title: "Laugh Now Cry Later", prompt: "Qui interprète 'Laugh Now Cry Later' ?", acceptedAnswers: ["Drake", "drake"], hints: ["C'est un artiste canadien", "Il a beaucoup collaboré avec 21 Savage"] },
  { id: "rap-003", genre: "rap", difficulty: "facile", artist: "Gazo", title: "Caméléon", prompt: "Qui est l'artiste de 'Caméléon' ?", acceptedAnswers: ["Gazo", "gazo"], hints: ["C'est un rappeur français", "Il a sorti plusieurs morceaux très populaires"] },
  { id: "rap-004", genre: "rap", difficulty: "facile", artist: "Jazzy Bazz", title: "Mauvais garçon", prompt: "Qui chante 'Mauvais garçon' ?", acceptedAnswers: ["Jazzy Bazz", "jazzy bazz"], hints: ["C'est un rappeur français", "Son nom contient un mot qui fait référence à la musique jazz"] },
  { id: "rap-005", genre: "rap", difficulty: "moyen", artist: "Makala", title: "Mala", prompt: "Quel artiste est derrière 'Mala' ?", acceptedAnswers: ["Makala", "makala"], hints: ["C'est un nom qui ressemble à un prénom", "Il est lié au rap francophone"] },
  { id: "rap-006", genre: "rap", difficulty: "moyen", artist: "Leto", title: "Paranoïa", prompt: "Qui interprète 'Paranoïa' ?", acceptedAnswers: ["Leto", "leto"], hints: ["C'est un rappeur français", "Son nom est très court"] },
  { id: "rap-007", genre: "rap", difficulty: "moyen", artist: "Laylow", title: "Médaille", prompt: "Qui est l'artiste du morceau 'Médaille' ?", acceptedAnswers: ["Laylow", "laylow"], hints: ["C'est un rappeur français", "Son nom est un mot anglais avec une consonance urbaine"] },
  { id: "rap-008", genre: "rap", difficulty: "moyen", artist: "Damso", title: "Bande organisée", prompt: "Quel artiste a sorti 'Bande organisée' ?", acceptedAnswers: ["Damso", "damso"], hints: ["C'est un rappeur belge", "Son nom est très connu dans le rap francophone"] },
  { id: "rap-009", genre: "rap", difficulty: "difficile", artist: "The Weeknd", title: "Starboy", prompt: "Qui chante 'Starboy' ?", acceptedAnswers: ["The Weeknd", "the weeknd", "weeknd"], hints: ["C'est un chanteur canadien", "Son nom est un mot anglais"] },
  { id: "rap-010", genre: "rap", difficulty: "difficile", artist: "Kaaris", title: "Pardonne-moi", prompt: "Quel rappeur est derrière 'Pardonne-moi' ?", acceptedAnswers: ["Kaaris", "kaaris"], hints: ["C'est un rappeur français", "Son nom commence par K"] },
  { id: "rap-011", genre: "rap", difficulty: "difficile", artist: "A$AP Rocky", title: "Praise the Lord", prompt: "Qui interprète 'Praise the Lord' avec Skepta ?", acceptedAnswers: ["A$AP Rocky", "asap rocky", "asap"], hints: ["C'est un rappeur américain", "Son nom contient le symbole du dollar"] },
  { id: "rap-012", genre: "rap", difficulty: "difficile", artist: "Cardi B", title: "WAP", prompt: "Qui chante 'WAP' avec Megan Thee Stallion ?", acceptedAnswers: ["Cardi B", "cardi b"], hints: ["C'est une rappeuse américaine", "Son nom est composé d'un prénom et d'une lettre"] },
  { id: "pop-001", genre: "pop", difficulty: "facile", artist: "Aya Nakamura", title: "Djadja", prompt: "Qui chante 'Djadja' ?", acceptedAnswers: ["Aya Nakamura", "aya nakamura", "aya"], hints: ["C'est une chanteuse française", "Son prénom est Aya"] },
  { id: "pop-002", genre: "pop", difficulty: "facile", artist: "Sabrina Carpenter", title: "Espresso", prompt: "Qui interprète 'Espresso' ?", acceptedAnswers: ["Sabrina Carpenter", "sabrina carpenter", "sabrina"], hints: ["C'est une chanteuse américaine", "Son nom est très répandu dans la pop actuelle"] },
  { id: "pop-003", genre: "pop", difficulty: "facile", artist: "Taylor Swift", title: "Fortnight", prompt: "Qui chante 'Fortnight' ?", acceptedAnswers: ["Taylor Swift", "taylor swift"], hints: ["C'est une chanteuse américaine", "Elle a sorti beaucoup de hits pop"] },
  { id: "pop-004", genre: "pop", difficulty: "facile", artist: "Rosé", title: "Apt.", prompt: "Qui a sorti 'Apt.' ?", acceptedAnswers: ["Rosé", "rose", "rosé"], hints: ["C'est une chanteuse coréenne", "Elle fait partie d'un groupe très connu"] },
  { id: "pop-005", genre: "pop", difficulty: "moyen", artist: "Billie Eilish", title: "Lunch", prompt: "Qui interprète 'Lunch' ?", acceptedAnswers: ["Billie Eilish", "billie eilish"], hints: ["C'est une chanteuse américaine", "Son nom commence par Billie"] },
  { id: "pop-006", genre: "pop", difficulty: "moyen", artist: "Beyoncé", title: "Texas Hold 'Em", prompt: "Qui chante 'Texas Hold 'Em' ?", acceptedAnswers: ["Beyoncé", "beyonce"], hints: ["C'est une artiste américaine", "Son prénom est célèbre dans la pop mondiale"] },
  { id: "pop-007", genre: "pop", difficulty: "moyen", artist: "Olivia Rodrigo", title: "obsessed", prompt: "Qui est l'artiste de 'obsessed' ?", acceptedAnswers: ["Olivia Rodrigo", "olivia rodrigo"], hints: ["C'est une chanteuse américaine", "Son nom est bien connu dans la pop contemporaine"] },
  { id: "pop-008", genre: "pop", difficulty: "moyen", artist: "The Weeknd", title: "Blinding Lights", prompt: "Qui chante 'Blinding Lights' ?", acceptedAnswers: ["The Weeknd", "the weeknd", "weeknd"], hints: ["C'est un chanteur canadien", "Son nom fait référence à la nuit"] },
  { id: "pop-009", genre: "pop", difficulty: "difficile", artist: "Doja Cat", title: "Paint the Town Red", prompt: "Qui interprète 'Paint the Town Red' ?", acceptedAnswers: ["Doja Cat", "doja cat"], hints: ["C'est une chanteuse américaine", "Son nom commence par Doja"] },
  { id: "pop-010", genre: "pop", difficulty: "difficile", artist: "Ariana Grande", title: "yes, and?", prompt: "Quel artiste chante 'yes, and?' ?", acceptedAnswers: ["Ariana Grande", "ariana grande"], hints: ["C'est une chanteuse américaine", "Elle a une vraie voix de pop"] },
  { id: "pop-011", genre: "pop", difficulty: "difficile", artist: "Lady Gaga", title: "Abracadabra", prompt: "Qui interprète 'Abracadabra' ?", acceptedAnswers: ["Lady Gaga", "lady gaga"], hints: ["C'est une chanteuse américaine", "Elle est connue pour ses performances scéniques"] },
  { id: "pop-012", genre: "pop", difficulty: "difficile", artist: "Katy Perry", title: "Dark Horse", prompt: "Qui a sorti 'Dark Horse' ?", acceptedAnswers: ["Katy Perry", "katy perry"], hints: ["C'est une chanteuse américaine", "Son prénom est Katy"] },
  { id: "rnb-001", genre: "rnb", difficulty: "facile", artist: "SZA", title: "Snooze", prompt: "Qui chante 'Snooze' ?", acceptedAnswers: ["SZA", "sza"], hints: ["C'est une artiste de R&B", "Son nom est en majuscules"] },
  { id: "rnb-002", genre: "rnb", difficulty: "facile", artist: "The Weeknd", title: "Save Your Tears", prompt: "Qui est le chanteur de 'Save Your Tears' ?", acceptedAnswers: ["The Weeknd", "the weeknd", "weeknd"], hints: ["C'est un artiste international", "Il est bien connu dans le R&B"] },
  { id: "rnb-003", genre: "rnb", difficulty: "facile", artist: "Victoria Monét", title: "On My Mama", prompt: "Qui interprète 'On My Mama' ?", acceptedAnswers: ["Victoria Monét", "victoria monet", "victoria monét"], hints: ["C'est une chanteuse américaine", "Son nom contient Monét"] },
  { id: "rnb-004", genre: "rnb", difficulty: "facile", artist: "Summer Walker", title: "Girls Need Love", prompt: "Qui chante 'Girls Need Love' ?", acceptedAnswers: ["Summer Walker", "summer walker"], hints: ["C'est une chanteuse américaine", "Son prénom est Summer"] },
  { id: "rnb-005", genre: "rnb", difficulty: "moyen", artist: "Usher", title: "DJ Got Us Fallin' in Love", prompt: "Qui chante 'DJ Got Us Fallin' in Love' ?", acceptedAnswers: ["Usher", "usher"], hints: ["C'est un chanteur américain", "Il est très connu dans le R&B"] },
  { id: "rnb-006", genre: "rnb", difficulty: "moyen", artist: "Giveon", title: "Heartbreak Anniversary", prompt: "Qui est derrière 'Heartbreak Anniversary' ?", acceptedAnswers: ["Giveon", "giveon"], hints: ["C'est un chanteur américain", "Son nom est peu courant"] },
  { id: "rnb-007", genre: "rnb", difficulty: "moyen", artist: "H.E.R.", title: "Best Part", prompt: "Qui chante 'Best Part' avec Daniel Caesar ?", acceptedAnswers: ["H.E.R.", "her"], hints: ["C'est une artiste de R&B", "Son nom ressemble à une abréviation"] },
  { id: "rnb-008", genre: "rnb", difficulty: "moyen", artist: "Miguel", title: "Sure Thing", prompt: "Quel artiste a sorti 'Sure Thing' ?", acceptedAnswers: ["Miguel", "miguel"], hints: ["C'est un chanteur américain", "Son nom est Miguel"] },
  { id: "rnb-009", genre: "rnb", difficulty: "difficile", artist: "Ariana Grande", title: "Positions", prompt: "Qui chante 'Positions' ?", acceptedAnswers: ["Ariana Grande", "ariana grande"], hints: ["C'est une chanteuse américaine", "Son nom est très connu dans la pop et le R&B"] },
  { id: "rnb-010", genre: "rnb", difficulty: "difficile", artist: "Bryson Tiller", title: "Exchange", prompt: "Qui interprète 'Exchange' ?", acceptedAnswers: ["Bryson Tiller", "bryson tiller"], hints: ["C'est un artiste américain", "Son nom est Bryson"] },
  { id: "rnb-011", genre: "rnb", difficulty: "difficile", artist: "Frank Ocean", title: "Thinkin Bout You", prompt: "Qui a sorti 'Thinkin Bout You' ?", acceptedAnswers: ["Frank Ocean", "frank ocean"], hints: ["C'est un artiste américain", "Son nom commence par Frank"] },
  { id: "rnb-012", genre: "rnb", difficulty: "difficile", artist: "Partynextdoor", title: "Come and See Me", prompt: "Qui chante 'Come and See Me' ?", acceptedAnswers: ["PARTYNEXTDOOR", "partynextdoor"], hints: ["C'est un artiste canadien", "Son nom est sans espace"] },
  { id: "kompa-001", genre: "kompa", difficulty: "facile", artist: "Mikaben", title: "C'est la vie", prompt: "Qui chante le titre 'C'est la vie' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste haïtien", "Il est très connu en musique kompa"] },
  { id: "kompa-002", genre: "kompa", difficulty: "facile", artist: "T-Vice", title: "Rêve", prompt: "Qui interprète 'Rêve' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["C'est un artiste haïtien", "Son nom comporte un tiret"] },
  { id: "kompa-003", genre: "kompa", difficulty: "facile", artist: "Carimi", title: "La vie", prompt: "Quel artiste chante 'La vie' ?", acceptedAnswers: ["Carimi", "carimi"], hints: ["C'est un artiste de musique kompa", "Son nom est très court"] },
  { id: "kompa-004", genre: "kompa", difficulty: "facile", artist: "Malandra", title: "Kombit", prompt: "Quel artiste est associé à 'Kombit' ?", acceptedAnswers: ["Malandra", "malandra"], hints: ["C'est un artiste de musique kompa", "Son nom est Malandra"] },
  { id: "kompa-005", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Toujou", prompt: "Qui interprète le titre 'Toujou' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste haïtien", "Il est connu pour les chansons kompa"] },
  { id: "kompa-006", genre: "kompa", difficulty: "moyen", artist: "T-Vice", title: "Madan", prompt: "Quel artiste est derrière 'Madan' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["Son nom contient un tiret", "C'est un artiste de kompa"] },
  { id: "kompa-007", genre: "kompa", difficulty: "moyen", artist: "Mikaben", title: "Pa gen", prompt: "Qui chante 'Pa gen' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste de kompa", "Son nom est Mikaben"] },
  { id: "kompa-008", genre: "kompa", difficulty: "moyen", artist: "Carimi", title: "Danse", prompt: "Quel artiste est associé au titre 'Danse' ?", acceptedAnswers: ["Carimi", "carimi"], hints: ["Il est connu dans le kompa", "Son nom est Carimi"] },
  { id: "kompa-009", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Sainte Marie", prompt: "Quel artiste est derrière 'Sainte Marie' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste haïtien", "Il a beaucoup de succès en kompa"] },
  { id: "kompa-010", genre: "kompa", difficulty: "difficile", artist: "T-Vice", title: "L'amour", prompt: "Qui interprète 'L'amour' ?", acceptedAnswers: ["T-Vice", "t vice", "tvice"], hints: ["Son nom contient un tiret", "C'est un artiste de musique kompa"] },
  { id: "kompa-011", genre: "kompa", difficulty: "difficile", artist: "Carimi", title: "Le cœur", prompt: "Quel artiste est lié au titre 'Le cœur' ?", acceptedAnswers: ["Carimi", "carimi"], hints: ["C'est un artiste de kompa", "Son nom est Carimi"] },
  { id: "kompa-012", genre: "kompa", difficulty: "difficile", artist: "Mikaben", title: "Soleil", prompt: "Qui chante 'Soleil' ?", acceptedAnswers: ["Mikaben", "mikaben"], hints: ["C'est un artiste haïtien", "Il est très connu dans la musique kompa"] }
];

const difficultyConfig = {
  facile: { label: "Facile", totalQuestions: 8, maxHints: 2 },
  moyen: { label: "Moyen", totalQuestions: 8, maxHints: 3 },
  difficile: { label: "Difficile", totalQuestions: 8, maxHints: 4 }
};

const state = {
  score: 0,
  round: 0,
  currentQuestion: null,
  currentHintIndex: 0,
  questions: [],
  locked: false,
  selectedGenre: "tous",
  selectedDifficulty: "facile",
  skipPending: false
};

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const clueText = document.getElementById("clueText");
const answerInput = document.getElementById("answerInput");
const feedback = document.getElementById("feedback");
const scoreBadge = document.getElementById("scoreBadge");
const roundBadge = document.getElementById("roundBadge");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const menuBtn = document.getElementById("menuBtn");
const menuFromEndBtn = document.getElementById("menuFromEndBtn");
const answerForm = document.getElementById("answerForm");
const endTitle = document.getElementById("endTitle");
const endMessage = document.getElementById("endMessage");
const genreButtons = document.querySelectorAll(".genre-btn");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");
const skipBtn = document.getElementById("skipBtn");

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function setFeedback(message, type = "") {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`.trim();
}

function getQuestionsForSelectedGenre() {
  if (state.selectedGenre === "tous") {
    return quizQuestions.filter((question) => question.difficulty === state.selectedDifficulty);
  }

  return quizQuestions.filter(
    (question) => question.genre === state.selectedGenre && question.difficulty === state.selectedDifficulty
  );
}

function updateDifficultyStats() {
  const config = difficultyConfig[state.selectedDifficulty];
  const availableQuestions = getQuestionsForSelectedGenre();
  const total = Math.min(config.totalQuestions, availableQuestions.length || config.totalQuestions);

  document.getElementById("totalQuestionsValue").textContent = String(total);
  document.getElementById("hintCountValue").textContent = String(config.maxHints);
  document.getElementById("difficultyValue").textContent = config.label;
}

function selectGenre(genre) {
  state.selectedGenre = genre;

  genreButtons.forEach((button) => {
    const isActive = button.dataset.genre === genre;
    button.classList.toggle("active", isActive);
  });

  updateDifficultyStats();
}

function selectDifficulty(level) {
  state.selectedDifficulty = level;

  difficultyButtons.forEach((button) => {
    const isActive = button.dataset.difficulty === level;
    button.classList.toggle("active", isActive);
  });

  updateDifficultyStats();
}

function buildRoundQuestions(availableQuestions, maxCount) {
  const selected = [];
  const usedIds = new Set();
  let previousArtist = "";
  const pool = shuffle(availableQuestions);

  for (const question of pool) {
    if (selected.length >= maxCount) break;
    if (usedIds.has(question.id)) continue;

    const currentArtist = normalize(question.artist || "");
    if (previousArtist && currentArtist && currentArtist === previousArtist) continue;

    selected.push(question);
    usedIds.add(question.id);
    previousArtist = currentArtist || previousArtist;
  }

  if (selected.length < maxCount) {
    const fallback = shuffle(pool.filter((question) => !usedIds.has(question.id)));
    for (const question of fallback) {
      if (selected.length >= maxCount) break;
      selected.push(question);
      usedIds.add(question.id);
    }
  }

  return selected.slice(0, maxCount);
}

function showMenu() {
  state.score = 0;
  state.round = 0;
  state.currentQuestion = null;
  state.currentHintIndex = 0;
  state.questions = [];
  state.locked = false;
  state.skipPending = false;

  if (answerInput) {
    answerInput.value = "";
    answerInput.disabled = true;
  }

  if (skipBtn) skipBtn.disabled = true;
  if (restartBtn) restartBtn.classList.add("hidden");
  if (menuBtn) menuBtn.classList.add("hidden");

  startScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  setFeedback("");
}

function showGame() {
  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  if (restartBtn) restartBtn.classList.remove("hidden");
  if (menuBtn) menuBtn.classList.remove("hidden");
}

function startGame() {
  const availableQuestions = shuffle(getQuestionsForSelectedGenre());

  if (availableQuestions.length === 0) {
    setFeedback("Aucune question disponible pour ce genre et cette difficulté. Choisis autre chose.", "error");
    return;
  }

  const config = difficultyConfig[state.selectedDifficulty];
  const totalRounds = Math.min(config.totalQuestions, availableQuestions.length);

  state.score = 0;
  state.round = 0;
  state.questions = buildRoundQuestions(availableQuestions, totalRounds);
  state.locked = false;
  state.skipPending = false;

  showGame();
  showRound();
}

function showRound() {
  const question = state.questions[state.round];

  if (!question) {
    finishGame();
    return;
  }

  state.currentQuestion = question;
  state.currentHintIndex = 0;
  state.locked = false;
  state.skipPending = false;

  answerInput.disabled = false;
  if (skipBtn) skipBtn.disabled = false;

  scoreBadge.textContent = `Score : ${state.score}`;
  roundBadge.textContent = `Question ${state.round + 1} / ${state.questions.length}`;
  clueText.textContent = question.prompt;
  answerInput.value = "";
  answerInput.focus();
  setFeedback("");
}

function revealNextHint() {
  const question = state.currentQuestion;
  const hints = question.hints || [];
  state.currentHintIndex += 1;
  clueText.textContent = hints[state.currentHintIndex] || question.prompt;

  if (state.currentHintIndex < hints.length - 1) {
    setFeedback(`Raté ! Voici un indice supplémentaire (${state.currentHintIndex + 1}/${hints.length}).`, "error");
  } else {
    setFeedback("Dernier indice : c'est presque ça !", "error");
  }
}

function advanceRound() {
  state.round += 1;

  if (state.round >= state.questions.length) {
    finishGame();
    return;
  }

  showRound();
}

function finishGame() {
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");

  if (skipBtn) skipBtn.disabled = true;
  if (restartBtn) restartBtn.classList.add("hidden");
  if (menuBtn) menuBtn.classList.add("hidden");

  const maxScore = (state.questions.length || 1) * 100;
  endTitle.textContent = "Partie terminée";
  endMessage.textContent = `Ton score final : ${state.score} / ${maxScore} points.`;
}

function checkAnswer() {
  const userGuess = normalize(answerInput.value);
  const question = state.currentQuestion;
  const acceptedAnswers = question.acceptedAnswers.map(normalize);

  if (acceptedAnswers.includes(userGuess)) {
    const points = Math.max(20, 100 - state.currentHintIndex * 20);
    state.score += points;
    scoreBadge.textContent = `Score : ${state.score}`;
    setFeedback(`Bravo ! C'était ${question.acceptedAnswers[0]}.`, "success");
    state.locked = true;
    if (skipBtn) skipBtn.disabled = true;
    answerInput.disabled = true;

    setTimeout(() => {
      advanceRound();
    }, 1400);

    return;
  }

  const maxHints = difficultyConfig[state.selectedDifficulty].maxHints;
  const hints = question.hints || [];

  if (state.currentHintIndex < maxHints - 1 && state.currentHintIndex < hints.length - 1) {
    revealNextHint();
    return;
  }

  setFeedback(`Perdu ! La bonne réponse était ${question.acceptedAnswers[0]}.`, "error");
  state.locked = true;
  if (skipBtn) skipBtn.disabled = true;
  answerInput.disabled = true;

  setTimeout(() => {
    advanceRound();
  }, 1800);
}

function skipQuestion() {
  if (state.locked || !state.currentQuestion || state.skipPending) {
    return;
  }

  state.locked = true;
  state.skipPending = true;
  if (skipBtn) skipBtn.disabled = true;
  answerInput.disabled = true;

  setFeedback("Question passée. On continue !", "info");

  setTimeout(() => {
    advanceRound();
  }, 450);
}

genreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectGenre(button.dataset.genre);
  });
});

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectDifficulty(button.dataset.difficulty);
  });
});

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (state.locked) {
    return;
  }

  checkAnswer();
});

startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
menuBtn.addEventListener("click", showMenu);
menuFromEndBtn.addEventListener("click", showMenu);
skipBtn.addEventListener("click", skipQuestion);

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    answerForm.requestSubmit();
  }
});

window.addEventListener("load", () => {
  selectGenre("tous");
  selectDifficulty("facile");
  updateDifficultyStats();
  showMenu();
});
