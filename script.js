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
    genre: "electro",
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
    genre: "french",
    hints: [
      "Genre : pop électro, avec un univers nocturne et sensuel.",
      "Le titre parle d'un moment où la vie semble enfin se mettre en place.",
      "Cette chanson française a été interprétée par Mylène Farmer et est très connue."
    ]
  },
  {
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    genre: "rock",
    hints: [
      "Genre : grunge rock, très énergique et abrasif.",
      "Paroles : 'With the lights out, it's less dangerous'.",
      "Le morceau est devenu un hymne du rock des années 1990."
    ]
  },
  {
    title: "God's Plan",
    artist: "Drake",
    genre: "rap",
    hints: [
      "Genre : rap / hip-hop, avec un rythme très fluide.",
      "Paroles : 'I been saying this for years'.",
      "La chanson a connu un immense succès mondial et est très jouée en radio."
    ]
  },
  {
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    genre: "rap",
    hints: [
      "Genre : rap, avec un flow puissant et une énergie immédiate.",
      "Paroles : 'Sit down, be humble'.",
      "Ce titre est sorti en 2017 et a marqué les charts internationaux."
    ]
  },
  {
    title: "On the Floor",
    artist: "Jennifer Lopez",
    genre: "rnb",
    hints: [
      "Genre : dance-pop avec des influences latines et R&B.",
      "Paroles : 'Dance the night away'.",
      "La chanson a été un grand tube dans le monde entier au début des années 2010."
    ]
  },
  {
    title: "Love on the Brain",
    artist: "Rihanna",
    genre: "rnb",
    hints: [
      "Genre : R&B / soul, très émouvant et puissant.",
      "Paroles : 'And you got me like, ooh'.",
      "Le titre est connu pour sa voix expressive et le crescendo émotionnel."
    ]
  },
  {
    title: "L'Impératrice",
    artist: "L'Impératrice",
    genre: "french",
    hints: [
      "Genre : pop française / indie, très groove et lumineux.",
      "Le titre est souvent associé à une ambiance douce et dansante.",
      "Ce groupe français est connu pour ses morceaux festifs et rétro-futuristes."
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
  locked: false,
  selectedGenre: "tous"
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

function getSongsForSelectedGenre() {
  if (state.selectedGenre === "tous") {
    return songs;
  }

  return songs.filter((song) => song.genre === state.selectedGenre);
}

function selectGenre(genre) {
  state.selectedGenre = genre;

  genreButtons.forEach((button) => {
    const isActive = button.dataset.genre === genre;
    button.classList.toggle("active", isActive);
  });
}

function startGame() {
  const availableSongs = shuffle(getSongsForSelectedGenre());

  if (availableSongs.length === 0) {
    setFeedback("Ce genre n'a pas encore de chansons dans le quiz.", "error");
    return;
  }

  state.score = 0;
  state.round = 0;
  state.songs = availableSongs.slice(0, Math.min(TOTAL_ROUNDS, availableSongs.length));
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

  const maxScore = state.songs.length * 25;
  endTitle.textContent = "Partie terminée";
  endMessage.textContent = `Ton score final : ${state.score} / ${maxScore} points.`;
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

genreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectGenre(button.dataset.genre);
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
  startScreen.classList.remove("hidden");
  gameScreen.classList.add("hidden");
  endScreen.classList.add("hidden");
  restartBtn.classList.add("hidden");
});
