/* Célébrations partagées des résultats de tous les quiz QUIZZMU. */
(() => {
  "use strict";

  const DURATION_MS = 6000;
  const completedScreens = new WeakMap();
  const activeScreens = new WeakMap();
  const messages = {
    rain: [
      "On va dire que c’était un échauffement.",
      "Tu peux largement faire mieux.",
      "Ce n’est pas encore gagné, mais on y croit."
    ],
    average: "La moyenne est là, c'est validé !",
    good: "Tu connais vraiment tes classiques !",
    great: "Mais t'es une véritable encyclopédie musicale !",
    perfect: "QUIZZMU n'a plus rien à t'apprendre. T'es une légende !"
  };
  const style = document.createElement("style");
  style.textContent = `
    .quizzmu-final-message {
      margin: 12px 0 0;
      color: #e9c8ff;
      font-size: clamp(1rem, 2.8vw, 1.2rem);
      font-weight: 750;
      line-height: 1.5;
      text-wrap: balance;
      animation: quizzmu-final-message-in .55s cubic-bezier(.2,.8,.2,1) both;
    }
    .quizzmu-final-message[data-celebration="rain"] { color: #cbd5e1; }
    .quizzmu-final-message[data-celebration="average"],
    .quizzmu-final-message[data-celebration="good"],
    .quizzmu-final-message[data-celebration="great"] { color: #f0abfc; }
    .quizzmu-final-message[data-celebration="perfect"] { color: #fcd34d; }
    .quizzmu-celebration-canvas {
      position: fixed;
      inset: 0;
      z-index: 1000;
      width: 100%;
      height: 100%;
      pointer-events: none;
      opacity: 1;
      transition: opacity .65s ease;
    }
    .quizzmu-celebration-canvas.is-fading { opacity: 0; }
    @keyframes quizzmu-final-message-in {
      from { opacity: 0; transform: translateY(9px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @media (prefers-reduced-motion: reduce) {
      .quizzmu-final-message { animation: none; }
      .quizzmu-celebration-canvas { display: none; }
    }
  `;
  document.head.appendChild(style);

  let currentAnimation = null;

  function getResultScreen(scoreElement) {
    return scoreElement.closest(
      '#artistEndScreen, .artist-view, [class*="-final-area"]'
    );
  }

  function isVisible(element) {
    if (!element || !element.isConnected) return false;
    for (let node = element; node && node !== document.documentElement; node = node.parentElement) {
      if (node.hidden || node.classList?.contains("hidden")) return false;
    }
    return true;
  }

  function getScore(scoreElement) {
    const match = scoreElement.textContent.match(/(\d+(?:[.,]\d+)?)\s*\/\s*(\d+(?:[.,]\d+)?)/);
    if (!match) return null;
    const score = Number(match[1].replace(",", "."));
    const maximum = Number(match[2].replace(",", "."));
    if (!Number.isFinite(score) || !Number.isFinite(maximum) || maximum <= 0) return null;
    return { score, maximum, percent: Math.min(100, Math.max(0, score / maximum * 100)) };
  }

  function getCelebration(percent) {
    if (percent >= 99.999) return { kind: "perfect", message: messages.perfect, pieces: 190 };
    if (percent >= 80) return { kind: "great", message: messages.great, pieces: 112 };
    if (percent >= 60) return { kind: "good", message: messages.good, pieces: 58 };
    if (percent >= 50) return { kind: "average", message: messages.average, pieces: 38 };
    const index = Math.floor(Math.random() * messages.rain.length);
    return { kind: "rain", message: messages.rain[index], pieces: 0 };
  }

  function stopAnimation() {
    if (!currentAnimation) return;
    cancelAnimationFrame(currentAnimation.frame);
    clearTimeout(currentAnimation.fadeTimer);
    clearTimeout(currentAnimation.removeTimer);
    currentAnimation.canvas.remove();
    currentAnimation = null;
  }

  function addMessage(resultScreen, scoreElement, celebration) {
    let message = resultScreen.querySelector(":scope > .panel-content > .quizzmu-final-message");
    if (!message) message = resultScreen.querySelector(".quizzmu-final-message");
    if (!message) {
      message = document.createElement("p");
      message.className = "quizzmu-final-message";
      message.setAttribute("aria-live", "polite");
      scoreElement.insertAdjacentElement("afterend", message);
    }
    message.dataset.celebration = celebration.kind;
    message.textContent = celebration.message;
    message.style.animation = "none";
    void message.offsetWidth;
    message.style.animation = "";
  }

  function animate(resultScreen, scoreElement, celebration) {
    stopAnimation();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = document.createElement("canvas");
    canvas.className = "quizzmu-celebration-canvas";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    const context = canvas.getContext("2d");
    if (!context) {
      canvas.remove();
      return;
    }

    const animation = { canvas, frame: 0, fadeTimer: 0, removeTimer: 0 };
    currentAnimation = animation;
    const startedAt = performance.now();
    let width = 0;
    let height = 0;
    let scale = 1;
    let particles = [];
    let rainDrops = [];
    let cloud = { x: 0, y: 0 };

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      scale = ratio;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (celebration.kind === "rain") {
        const bounds = scoreElement.getBoundingClientRect();
        cloud.x = Math.min(width - 48, Math.max(48, bounds.left + bounds.width / 2));
        cloud.y = Math.max(42, bounds.top - 24);
        rainDrops = Array.from({ length: 20 }, () => makeRaindrop(true));
      } else {
        particles = Array.from({ length: celebration.pieces }, () => makeConfetti(true));
      }
    }

    function makeConfetti(initial = false) {
      const palette = celebration.kind === "perfect"
        ? ["#facc15", "#fbbf24", "#fde68a", "#a855f7", "#7e22ce"]
        : ["#f472b6", "#ec4899", "#d946ef", "#a855f7", "#c084fc"];
      return {
        x: Math.random() * width,
        y: initial ? Math.random() * height : -10 - Math.random() * 80,
        size: 4 + Math.random() * (celebration.kind === "perfect" ? 8 : 6),
        speed: 1.1 + Math.random() * (celebration.kind === "perfect" ? 3.4 : 2.4),
        drift: (Math.random() - .5) * 1.7,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - .5) * .16,
        color: palette[Math.floor(Math.random() * palette.length)],
        shape: Math.random() > .35 ? "rect" : "circle"
      };
    }

    function makeRaindrop(initial = false) {
      return {
        x: cloud.x + (Math.random() - .5) * 76,
        y: initial ? cloud.y + 13 + Math.random() * 190 : cloud.y + 14,
        length: 8 + Math.random() * 8,
        speed: 2.2 + Math.random() * 2.8,
        drift: 5 + Math.random() * 10
      };
    }

    function drawCloud() {
      const x = cloud.x;
      const y = cloud.y;
      context.save();
      context.fillStyle = "rgba(203, 213, 225, .94)";
      context.beginPath();
      context.arc(x - 15, y + 3, 11, Math.PI * .5, Math.PI * 1.5);
      context.arc(x - 5, y - 5, 14, Math.PI, Math.PI * 1.9);
      context.arc(x + 10, y - 3, 12, Math.PI * 1.1, Math.PI * 2);
      context.arc(x + 17, y + 4, 9, Math.PI * 1.5, Math.PI * .5);
      context.closePath();
      context.fill();
      context.restore();
    }

    function draw(now) {
      if (currentAnimation !== animation) return;
      const elapsed = now - startedAt;
      context.clearRect(0, 0, width, height);
      if (celebration.kind === "rain") {
        drawCloud();
        context.strokeStyle = "rgba(147, 197, 253, .8)";
        context.lineWidth = 2;
        context.lineCap = "round";
        for (const drop of rainDrops) {
          context.beginPath();
          context.moveTo(drop.x, drop.y);
          context.lineTo(drop.x - 3, drop.y + drop.length);
          context.stroke();
          drop.y += drop.speed;
          drop.x += drop.drift * .012;
          if (drop.y > Math.min(height - 8, cloud.y + 230)) Object.assign(drop, makeRaindrop());
        }
      } else {
        const fade = elapsed > DURATION_MS - 850 ? Math.max(0, (DURATION_MS - elapsed) / 850) : 1;
        context.globalAlpha = fade;
        for (const piece of particles) {
          context.save();
          context.translate(piece.x, piece.y);
          context.rotate(piece.rotation);
          context.fillStyle = piece.color;
          if (piece.shape === "circle") {
            context.beginPath();
            context.ellipse(0, 0, piece.size * .42, piece.size * .7, 0, 0, Math.PI * 2);
            context.fill();
          } else {
            context.fillRect(-piece.size / 2, -piece.size / 3, piece.size, piece.size * .66);
          }
          context.restore();
          piece.y += piece.speed;
          piece.x += piece.drift;
          piece.rotation += piece.spin;
          if (piece.y > height + 12) Object.assign(piece, makeConfetti());
        }
        context.globalAlpha = 1;
      }

      if (elapsed < DURATION_MS) animation.frame = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true, signal: undefined });
    animation.frame = requestAnimationFrame(draw);
    animation.fadeTimer = window.setTimeout(() => canvas.classList.add("is-fading"), DURATION_MS - 650);
    animation.removeTimer = window.setTimeout(() => {
      if (currentAnimation !== animation) return;
      window.removeEventListener("resize", resize);
      canvas.remove();
      currentAnimation = null;
    }, DURATION_MS + 100);
  }

  function celebrate(resultScreen, scoreElement) {
    const score = getScore(scoreElement);
    if (!score) return;
    const celebration = getCelebration(score.percent);
    addMessage(resultScreen, scoreElement, celebration);
    animate(resultScreen, scoreElement, celebration);
  }

  function scanResults() {
    const scoreElements = document.querySelectorAll(
      '#artistEndScreen [data-final-score], .artist-view [data-final-score], .artist-view .artist-final-score, .artist-view #artistFinalScore, [class*="-final-area"] [id$="FinalScore"]'
    );
    const seenScreens = new Set();
    scoreElements.forEach((scoreElement) => {
      const resultScreen = getResultScreen(scoreElement);
      if (!resultScreen) return;
      seenScreens.add(resultScreen);
      if (!isVisible(resultScreen)) {
        activeScreens.set(resultScreen, false);
        return;
      }
      const score = getScore(scoreElement);
      if (!score) return;
      const key = `${score.score}/${score.maximum}`;
      if (activeScreens.get(resultScreen) && completedScreens.get(resultScreen) === key) return;
      activeScreens.set(resultScreen, true);
      completedScreens.set(resultScreen, key);
      celebrate(resultScreen, scoreElement);
    });
    // Remember hidden result screens so replaying the same score starts a fresh celebration.
    document.querySelectorAll('#artistEndScreen, .artist-view, [class*="-final-area"]').forEach((screen) => {
      if (!seenScreens.has(screen) && !isVisible(screen)) activeScreens.set(screen, false);
    });
  }

  const observer = new MutationObserver(scanResults);
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["class", "hidden"]
  });
  scanResults();
})();
