/* Réactions légères communes à tous les quiz QUIZZMU. */
(() => {
  "use strict";
  const messages = {
    correct: [
      "T'es trop fort(e) 🔥",
      "Okkk, y'a du niveau !",
      "Masterclass 😮‍💨",
      "Mais oui, évidemment !",
      "Tu connais tes classiques 🎧",
      "C'est trop facile pour toi !",
      "Là, tu régales !",
      "Rien à dire, c'est validé ✅"
    ],
    wrong: [
      "Aïe aïe aïe 😭",
      "On va faire comme si on avait rien vu 👀",
      "C'était pas loin… enfin presque",
      "Bon… on retente au prochain son ?",
      "Même les meilleurs se trompent 😌",
      "On met ça sur le compte du stress 😭",
      "Le prochain, c'est le bon ! 🔥",
      "Petit accident de parcours 😭",
      "On oublie celle-là et on avance 🤝"
    ]
  };
  const states = new WeakMap();
  const style = document.createElement("style");
  style.textContent = `
    .quizzmu-reaction {
      display: block; width: fit-content; max-width: 100%; margin: 12px auto;
      padding: 12px 18px; border-radius: 16px; text-align: center;
      font-size: clamp(1rem, 2.5vw, 1.2rem); font-weight: 800; line-height: 1.4;
      letter-spacing: -.015em; border: 1px solid; pointer-events: none;
    }
    .quizzmu-reaction--correct {
      color: #bbf7d0; background: rgba(21,128,61,.26);
      border-color: rgba(74,222,128,.55); box-shadow: 0 0 25px rgba(34,197,94,.22);
      animation: quizzmu-reaction-pop .46s cubic-bezier(.2,1.6,.4,1) both;
    }
    .quizzmu-reaction--wrong {
      color: #fecdd3; background: rgba(159,18,57,.24);
      border-color: rgba(251,113,133,.53); box-shadow: 0 0 24px rgba(244,63,94,.16);
      animation: quizzmu-reaction-shake .48s ease-out both;
    }
    .quizzmu-reaction--correct.quizzmu-reaction--leaving,
    .quizzmu-reaction--wrong.quizzmu-reaction--leaving {
      animation: quizzmu-reaction-out .32s ease-in forwards;
    }
    .quizzmu-answer-pulse { animation: quizzmu-answer-pulse .45s ease-out; }
    @keyframes quizzmu-reaction-pop {
      0% { opacity: 0; transform: translateY(12px) scale(.82); }
      70% { opacity: 1; transform: translateY(-3px) scale(1.06); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes quizzmu-reaction-shake {
      0% { opacity: 0; transform: translateX(0) scale(.94); }
      20% { opacity: 1; transform: translateX(-7px); }
      40% { transform: translateX(6px); }
      60% { transform: translateX(-4px); }
      80% { transform: translateX(2px); }
      100% { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes quizzmu-answer-pulse {
      50% { transform: scale(1.035); }
      100% { transform: scale(1); }
    }
    @keyframes quizzmu-reaction-out {
      to { opacity: 0; transform: translateY(-5px) scale(.97); }
    }
    @media (prefers-reduced-motion: reduce) {
      .quizzmu-reaction, .quizzmu-answer-pulse { animation: none !important; }
    }
  `;
  document.head.appendChild(style);
  function shuffle(values) {
    const items = values.slice();
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }
  function pick(state, kind) {
    if (!state.bags[kind].length) {
      state.bags[kind] = shuffle(messages[kind]);
      if (state.bags[kind][0] === state.last[kind] && state.bags[kind].length > 1) {
        const first = state.bags[kind].shift();
        state.bags[kind].push(first);
      }
    }
    const chosen = state.bags[kind].shift();
    state.last[kind] = chosen;
    return chosen;
  }
  function getState(anchor) {
    let state = states.get(anchor);
    if (!state) {
      state = { bags: { correct: [], wrong: [] }, last: { correct: null, wrong: null }, timer: null, element: null };
      states.set(anchor, state);
    }
    return state;
  }
  window.QuizzmuReactions = {
    show(anchor, isCorrect, selectedButton) {
      if (!anchor) return;
      const state = getState(anchor);
      const kind = isCorrect ? "correct" : "wrong";
      if (state.timer) clearTimeout(state.timer);
      if (state.element) state.element.remove();
      const reaction = document.createElement("div");
      reaction.className = "quizzmu-reaction quizzmu-reaction--" + kind;
      reaction.textContent = pick(state, kind);
      reaction.setAttribute("role", "status");
      reaction.setAttribute("aria-live", "polite");
      if (anchor.classList.contains("artist-reveal")) anchor.prepend(reaction);
      else anchor.insertAdjacentElement("afterend", reaction);
      state.element = reaction;
      if (selectedButton) {
        selectedButton.classList.remove("quizzmu-answer-pulse");
        void selectedButton.offsetWidth;
        selectedButton.classList.add("quizzmu-answer-pulse");
        setTimeout(() => selectedButton.classList.remove("quizzmu-answer-pulse"), 500);
      }
      state.timer = setTimeout(() => {
        reaction.classList.add("quizzmu-reaction--leaving");
        setTimeout(() => reaction.remove(), 330);
        if (state.element === reaction) state.element = null;
      }, 2000);
    }
  };
})();
