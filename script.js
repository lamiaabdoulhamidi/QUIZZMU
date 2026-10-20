const quizQuestions = [
  {
    genre: "rap",
    difficulty: "facile",
    prompt: "Qui chante la chanson 'Not Like Us' ?",
    acceptedAnswers: ["Kendrick Lamar", "kendrick lamar"],
    hints: [
      "C'est un rappeur californien connu pour les titres 'HUMBLE.' et 'DNA.'.",
      "Il a aussi été au centre d'un clash très médiatisé avec Drake.",
      "Son nom complet est Kendrick Lamar Duckworth."
    ]
  },
  {
    genre: "rap",
    difficulty: "facile",
    prompt: "Qui est l'artiste de 'HUMBLE.' ?",
    acceptedAnswers: ["Kendrick Lamar", "kendrick lamar"],
    hints: [
      "C'est un rappeur récompensé par plusieurs Grammys.",
      "Il a sorti le morceau en 2017 et il est devenu un énorme hit mondial.",
      "Le titre commence souvent par la phrase 'Sit down, be humble'."
    ]
  },
  {
    genre: "rap",
    difficulty: "facile",
    prompt: "Qui a sorti le single 'Houdini' ?",
    acceptedAnswers: ["Eminem", "eminem"],
    hints: [
      "C'est l'un des rappeurs les plus célèbres de la scène américaine.",
      "Le morceau est très associé au retour de l'artiste en 2024.",
      "Il est connu pour des titres comme 'Lose Yourself' et 'Mockingbird'."
    ]
  },
  {
    genre: "rap",
    difficulty: "facile",
    prompt: "Qui chante 'Luther' avec SZA ?",
    acceptedAnswers: ["Kendrick Lamar", "kendrick lamar"],
    hints: [
      "Le titre a été très écouté en 2024.",
      "L'artiste est le même que celui de 'Not Like Us'.",
      "Il est aussi connu pour 'King Kunta' et 'DNA.'."
    ]
  },
  {
    genre: "rap",
    difficulty: "moyen",
    prompt: "Quel rappeur est derrière le titre 'The Hillbillies' ?",
    acceptedAnswers: ["Baby Keem", "baby keem"],
    hints: [
      "Il est le cousin de Kendrick Lamar.",
      "C'est un rappeur de la scène américaine très reconnu pour ses sonorités expérimentales.",
      "L'artiste a sorti 'Family Ties' avec son cousin."
    ]
  },
  {
    genre: "rap",
    difficulty: "moyen",
    prompt: "Qui a conçu le morceau 'SICKO MODE' ?",
    acceptedAnswers: ["Travis Scott", "travis scott"],
    hints: [
      "L'artiste est originaire d'Houston.",
      "Le titre est un des grands hits de son album 'Astroworld'.",
      "Son nom complet est Jacques Bermon Webster II."
    ]
  },
  {
    genre: "rap",
    difficulty: "difficile",
    prompt: "Quel artiste est à la base de 'I KNOW ?'",
    acceptedAnswers: ["Travis Scott", "travis scott"],
    hints: [
      "Son style mélange rap, trap et influences alternatives.",
      "Il a collaboré avec des artistes comme Drake, Young Thug et Kid Cudi.",
      "Il est connu pour ses concerts très visuels."
    ]
  },
  {
    genre: "rap",
    difficulty: "difficile",
    prompt: "Qui est l'artiste du titre 'Fukumean' ?",
    acceptedAnswers: ["Gunna", "gunna"],
    hints: [
      "C'est un rappeur originaire d'Atlanta.",
      "Il a travaillé avec Young Thug et des artistes de la scène trap.",
      "Le morceau a connu un énorme succès dans les playlists rap."
    ]
  },
  {
    genre: "pop",
    difficulty: "facile",
    prompt: "Qui chante 'Espresso' ?",
    acceptedAnswers: ["Sabrina Carpenter", "sabrina carpenter"],
    hints: [
      "C'est une chanteuse pop très présente sur les plateformes et les radios.",
      "Elle a aussi sorti 'Feather' et 'Please Please Please'.",
      "Le titre est devenu l'un des hits pop les plus marquants de la période."
    ]
  },
  {
    genre: "pop",
    difficulty: "facile",
    prompt: "Quel artiste a sorti 'Beautiful Things' ?",
    acceptedAnswers: ["Benson Boone", "benson boone"],
    hints: [
      "C'est un chanteur pop très en vogue à la fin des années 2020.",
      "Le morceau a été très diffusé en radio et dans les playlists.",
      "Il est connu pour sa voix puissante et son style très aérien."
    ]
  },
  {
    genre: "pop",
    difficulty: "facile",
    prompt: "Qui chante 'Apt.' ?",
    acceptedAnswers: ["Rosé", "rose", "ROSÉ", "Rosé and Bruno Mars", "bruno mars and rose"],
    hints: [
      "Le titre est une collaboration très marquante.",
      "Une chanteuse du groupe BLACKPINK est associée au morceau.",
      "La chanson a explosé grâce à sa mélodie très accrocheuse."
    ]
  },
  {
    genre: "pop",
    difficulty: "moyen",
    prompt: "Quel artiste est derrière le titre 'Birds of a Feather' ?",
    acceptedAnswers: ["Billie Eilish", "billie eilish"],
    hints: [
      "C'est une artiste pop reconnue pour son univers très doux et mélancolique.",
      "Elle a sorti des titres comme 'Ocean Eyes' et 'Bad Guy'.",
      "Son nom est souvent associé à une image très minimaliste et éthérée."
    ]
  },
  {
    genre: "pop",
    difficulty: "moyen",
    prompt: "Qui a sorti 'Too Sweet' ?",
    acceptedAnswers: ["Hozier", "hozier"],
    hints: [
      "C'est un artiste connu pour une voix très particulière et un univers folk rock.",
      "Le morceau est souvent associé à un son plus direct et plus énergique.",
      "Il a fait un grand retour avec cette chanson très jouée."
    ]
  },
  {
    genre: "pop",
    difficulty: "difficile",
    prompt: "Quel artiste chante 'Please Please Please' ?",
    acceptedAnswers: ["Sabrina Carpenter", "sabrina carpenter"],
    hints: [
      "C'est la même chanteuse que celle de 'Espresso'.",
      "Elle a connu un vrai boom avec ses titres pop très accrocheurs.",
      "Son univers est à la fois glamour, fun et très moderne."
    ]
  },
  {
    genre: "rnb",
    difficulty: "facile",
    prompt: "Qui chante 'Snooze' ?",
    acceptedAnswers: ["SZA", "sza"],
    hints: [
      "C'est une artiste très présente dans le R&B moderne.",
      "Elle a sorti des titres comme 'Good Days' et 'Kill Bill'.",
      "Son prénom est Solána."
    ]
  },
  {
    genre: "rnb",
    difficulty: "facile",
    prompt: "Qui est l'artiste de 'Cuff It' ?",
    acceptedAnswers: ["Beyoncé", "beyonce"],
    hints: [
      "C'est l'une des artistes les plus importantes de la scène mondiale.",
      "Le titre est très connu dans le R&B et la dance music.",
      "Elle a sorti le morceau dans le cadre d'un album très attendu."
    ]
  },
  {
    genre: "rnb",
    difficulty: "moyen",
    prompt: "Qui a sorti le morceau 'On My Mama' ?",
    acceptedAnswers: ["Victoria Monét", "victoria monet"],
    hints: [
      "C'est une chanteuse R&B et auteure-compositrice très reconnue.",
      "Elle est aussi connue pour ses collaborations avec plusieurs grands artistes.",
      "Le titre donne une vibe très fun et très groove."
    ]
  },
  {
    genre: "rnb",
    difficulty: "moyen",
    prompt: "Qui chante 'Kill Bill' ?",
    acceptedAnswers: ["SZA", "sza"],
    hints: [
      "C'est un titre très populaire dans le R&B contemporain.",
      "Le morceau est souvent associé à un style très mélodique et très intense.",
      "L'artiste est aussi connue pour 'Snooze'."
    ]
  },
  {
    genre: "rnb",
    difficulty: "difficile",
    prompt: "Quel artiste est derrière 'Rush' ?",
    acceptedAnswers: ["Troye Sivan", "troye sivan"],
    hints: [
      "C'est un chanteur australien très en vogue dans le pop/R&B.",
      "Le titre a été très écouté dans plusieurs pays.",
      "Il est aussi connu pour 'One of Your Girls'."
    ]
  },
  {
    genre: "rnb",
    difficulty: "difficile",
    prompt: "Qui est l'artiste du titre 'Made for Me' ?",
    acceptedAnswers: ["Muni Long", "muni long"],
    hints: [
      "C'est un artiste de la scène R&B avec une voix très douce et soul.",
      "Le morceau est souvent associé à des sonorités très intimes.",
      "Il est très présent dans les playlists de musique actuelle."
    ]
  },
  {
    genre: "kompa",
    difficulty: "facile",
    prompt: "Qui chante le titre 'C'est la vie' ?",
    acceptedAnswers: ["Mikaben", "mikaben"],
    hints: [
      "C'est un artiste très connu dans la musique kompa haïtienne.",
      "Il est reconnu pour sa voix et son univers très festif.",
      "Le titre est associé à une énergie très dansante et très caribéenne."
    ]
  },
  {
    genre: "kompa",
    difficulty: "facile",
    prompt: "Quel artiste est associé au morceau 'Mélodie' ?",
    acceptedAnswers: ["Mikaben", "mikaben"],
    hints: [
      "C'est un artiste de la scène kompa très populaire en Haïti.",
      "Son style est à la fois moderne, groove et très festif.",
      "Il est souvent associé à des morceaux très dansants."
    ]
  },
  {
    genre: "kompa",
    difficulty: "moyen",
    prompt: "Qui est connu pour les morceaux 'Joujou' et 'Mélodie' ?",
    acceptedAnswers: ["Mikaben", "mikaben"],
    hints: [
      "Il est l'un des noms les plus connus du kompa moderne.",
      "Sa musique mélange danse, groove et rythmes latins.",
      "Il est très visible dans les scènes caribéennes et francophones."
    ]
  },
  {
    genre: "kompa",
    difficulty: "moyen",
    prompt: "Quel artiste est emblématique de la scène kompa haïtienne ?",
    acceptedAnswers: ["T-Vice", "t vice", "tvice"],
    hints: [
      "C'est un nom très représentatif du kompa moderne.",
      "L'artiste est connu pour son énergie scénique et ses morceaux très dansants.",
      "Il a marqué plusieurs générations de fans de musique caribéenne."
    ]
  },
  {
    genre: "kompa",
    difficulty: "difficile",
    prompt: "Qui a popularisé des titres comme 'Caribbean Queen' et plusieurs morceaux de kompa moderne ?",
    acceptedAnswers: ["T-Vice", "t vice", "tvice"],
    hints: [
      "L'artiste est très connu dans le milieu caribéen.",
      "Son univers est très festif et très dansant.",
      "Il a une réputation solide dans le kompa haïtien." 
    ]
  }
];

const difficultyConfig = {
  facile: { label: "Facile", totalQuestions: 5, maxHints: 2 },
  moyen: { label: "Moyen", totalQuestions: 6, maxHints: 3 },
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
  selectedDifficulty: "facile"
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
const answerForm = document.getElementById("answerForm");
const endTitle = document.getElementById("endTitle");
const endMessage = document.getElementById("endMessage");
const genreButtons = document.querySelectorAll(".genre-btn");
const difficultyButtons = document.querySelectorAll(".difficulty-btn");

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

function updateDifficultyStats() {
  const config = difficultyConfig[state.selectedDifficulty];
  document.getElementById("totalQuestionsValue").textContent = String(config.totalQuestions);
  document.getElementById("hintCountValue").textContent = String(config.maxHints);
  document.getElementById("difficultyValue").textContent = config.label;
}

function getQuestionsForSelectedGenre() {
  if (state.selectedGenre === "tous") {
    return quizQuestions.filter((question) => question.difficulty === state.selectedDifficulty);
  }

  return quizQuestions.filter(
    (question) => question.genre === state.selectedGenre && question.difficulty === state.selectedDifficulty
  );
}

function selectGenre(genre) {
  state.selectedGenre = genre;

  genreButtons.forEach((button) => {
    const isActive = button.dataset.genre === genre;
    button.classList.toggle("active", isActive);
  });
}

function selectDifficulty(level) {
  state.selectedDifficulty = level;

  difficultyButtons.forEach((button) => {
    const isActive = button.dataset.difficulty === level;
    button.classList.toggle("active", isActive);
  });

  updateDifficultyStats();
}

function startGame() {
  const availableQuestions = shuffle(getQuestionsForSelectedGenre());

  if (availableQuestions.length === 0) {
    setFeedback("Aucune question disponible pour ce genre et cette difficulté. Choisis autre chose.", "error");
    return;
  }

  const config = difficultyConfig[state.selectedDifficulty];
  state.score = 0;
  state.round = 0;
  state.questions = availableQuestions.slice(0, Math.min(config.totalQuestions, availableQuestions.length));
  state.locked = false;

  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  restartBtn.classList.remove("hidden");

  showRound();
}

function showRound() {
  const question = state.questions[state.round];
  state.currentQuestion = question;
  state.currentHintIndex = 0;
  state.locked = false;

  scoreBadge.textContent = `Score : ${state.score}`;
  roundBadge.textContent = `Question ${state.round + 1} / ${state.questions.length}`;
  clueText.textContent = question.prompt;
  answerInput.value = "";
  answerInput.focus();
  setFeedback("");
}

function revealNextHint() {
  const { hints } = state.currentQuestion;
  state.currentHintIndex += 1;
  clueText.textContent = hints[state.currentHintIndex];

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

  const maxScore = state.questions.length * 100;
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

    setTimeout(() => {
      advanceRound();
    }, 1400);

    return;
  }

  const maxHints = difficultyConfig[state.selectedDifficulty].maxHints;
  if (state.currentHintIndex < maxHints - 1 && state.currentHintIndex < question.hints.length - 1) {
    revealNextHint();
    return;
  }

  setFeedback(`Perdu ! La bonne réponse était ${question.acceptedAnswers[0]}.`, "error");
  state.locked = true;

  setTimeout(() => {
    advanceRound();
  }, 1800);
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

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    answerForm.requestSubmit();
  }
});

window.addEventListener("load", () => {
  selectGenre("tous");
  selectDifficulty("facile");
  updateDifficultyStats();
  startScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  restartBtn.classList.add("hidden");
});
