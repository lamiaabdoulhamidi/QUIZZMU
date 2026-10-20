const songs = [
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    genre: "rock",
    hints: [
      "Genre : rock classique, avec une structure très singulière.",
      "Paroles : 'Mama, just killed a man'.",
      "Le morceau a été publié en 1975 et est connu pour son changement de tempo impressionnant."
    ]
  },
  {
    title: "Rolling in the Deep",
    artist: "Adele",
    genre: "pop",
    hints: [
      "Genre : pop et soul, très intense émotionnellement.",
      "Paroles : 'We could have had it all'.",
      "Cette chanson a été l'une des plus grandes hits de l'artiste britannique vers 2010."
    ]
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    genre: "pop",
    hints: [
      "Genre : pop dance, très utilisé dans les clubs et les radios.",
      "Paroles : 'I'm in love with the shape of you'.",
      "Le titre a explosé en 2017 et est signé par Ed Sheeran."
    ]
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    genre: "synthpop",
    hints: [
      "Genre : synthpop / électro avec un groove très marquant.",
      "Paroles : 'I live for the night light'.",
      "Le morceau est devenu un énorme succès dans le monde entier en 2020."
    ]
  },
  {
    title: "Viva la Vida",
    artist: "Coldplay",
    genre: "rock",
    hints: [
      "Genre : rock alternatif, avec une ambiance grandiose.",
      "Paroles : 'I used to rule the world'.",
      "Le titre est sorti en 2008 et a été porté par le groupe britannique Coldplay."
    ]
  },
  {
    title: "Le temps est bon",
    artist: "Mylène Farmer",
    genre: "pop",
    hints: [
      "Genre : pop électro, avec un univers nocturne et sensuel.",
      "Le titre parle d'un moment où la vie semble enfin se mettre en place.",
      "Cette chanson française a été interprétée par Mylène Farmer et est très connue."
    ]
  }
];

const TOTAL_ROUNDS = 5;
const state = {
  score: 0,
  round: 0,
  currentSong: null,
  currentHintIndex: 0,
  songs: [],
  locked: false
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

function normalize(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, " ");
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

function startGame() {
  state.score = 0;
  state.round = 0;
  state.songs = shuffle(songs).slice(0, TOTAL_ROUNDS);
  state.locked = false;

  startScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  restartBtn.classList.remove("hidden");

  showRound();
}

function showRound() {
  const song = state.songs[state.round];
  state.currentSong = song;
  state.currentHintIndex = 0;
  state.locked = false;

  scoreBadge.textContent = `Score : ${state.score}`;
  roundBadge.textContent = `Question ${state.round + 1} / ${state.songs.length}`;
  clueText.textContent = song.hints[0];
  answerInput.value = "";
  answerInput.focus();
  setFeedback("");
}

function revealNextHint() {
  const { hints } = state.currentSong;
  state.currentHintIndex += 1;
  clueText.textContent = hints[state.currentHintIndex];

  if (state.currentHintIndex < hints.length - 1) {
    setFeedback(`Raté ! Voici un indice supplémentaire (${state.currentHintIndex + 1}/${hints.length}).`, "error");
  } else {
    setFeedback(`Dernier indice : c'est presque ça !`, "error");
  }
}

function advanceRound() {
  state.round += 1;

  if (state.round >= state.songs.length) {
    finishGame();
    return;
  }

  showRound();
}

function finishGame() {
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");

  endTitle.textContent = "Partie terminée";
  endMessage.textContent = `Ton score final : ${state.score} / ${state.songs.length * 25} points.`;
}

function checkAnswer() {
  const userGuess = normalize(answerInput.value);
  const song = state.currentSong;
  const acceptedAnswers = [
    normalize(song.title),
    normalize(`${song.artist} ${song.title}`),
    normalize(`${song.title} ${song.artist}`)
  ];

  if (acceptedAnswers.includes(userGuess)) {
    const points = 25 - state.currentHintIndex * 5;
    state.score += Math.max(points, 10);
    scoreBadge.textContent = `Score : ${state.score}`;
    setFeedback(`Bravo ! C'était "${song.title}" de ${song.artist}.`, "success");
    state.locked = true;

    setTimeout(() => {
      advanceRound();
    }, 1400);

    return;
  }

  if (state.currentHintIndex < song.hints.length - 1) {
    revealNextHint();
    return;
  }

  setFeedback(`Perdu ! La bonne réponse était "${song.title}" de ${song.artist}.`, "error");
  state.locked = true;

  setTimeout(() => {
    advanceRound();
  }, 1800);
}

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
  startScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  restartBtn.classList.add("hidden");
});

