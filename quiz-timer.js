/* Compte à rebours commun aux quiz QUIZZMU. */
(() => {
  "use strict";
  const duration = 15;
  const style = document.createElement("style");
  style.textContent = `
    .quizzmu-timer { margin-left: auto; display: inline-flex; align-items: center; gap: 8px; padding: 7px 11px; border: 1px solid rgba(192,132,252,.4); border-radius: 99px; background: rgba(35,18,53,.8); color: #f3e8ff; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .quizzmu-timer.is-urgent { color: #f87171; border-color: rgba(248,113,113,.7); }
    .quizzmu-timer.is-waiting { opacity: .7; }
    .quizzmu-timer-track { display: block; height: 4px; width: 100%; background: rgba(192,132,252,.17); border-radius: 99px; margin: 8px 0 14px; overflow: hidden; }
    .quizzmu-timer-fill { display: block; height: 100%; width: 100%; background: #a855f7; transition: width .16s linear; }
    .quizzmu-timer-fill.is-urgent { background: #f87171; }
  `;
  document.head.appendChild(style);

  window.QuizzmuTimer = {
    create(header, onTimeout) {
      if (!header) return { reset(){}, start(){}, stop(){} };
      const display = document.createElement("span");
      display.className = "quizzmu-timer is-waiting";
      display.setAttribute("role", "timer");
      display.setAttribute("aria-label", "Temps restant");
      const label = document.createElement("span");
      label.textContent = "⏱ 15 s";
      display.appendChild(label);
      const track = document.createElement("span");
      track.className = "quizzmu-timer-track";
      const fill = document.createElement("span");
      fill.className = "quizzmu-timer-fill";
      track.appendChild(fill);
      header.appendChild(display);
      header.insertAdjacentElement("afterend", track);
      let deadline = 0;
      let interval = null;
      let remaining = duration;
      function render() {
        display.classList.toggle("is-urgent", remaining <= 5);
        fill.classList.toggle("is-urgent", remaining <= 5);
        display.classList.toggle("is-waiting", !interval);
        label.textContent = "⏱ " + Math.ceil(remaining) + " s";
        fill.style.width = ((remaining / duration) * 100) + "%";
      }
      function stop() {
        if (interval !== null) {
          window.clearInterval(interval);
          interval = null;
        }
        render();
      }
      function start() {
        if (interval !== null) return;
        deadline = performance.now() + remaining * 1000;
        interval = window.setInterval(() => {
          remaining = Math.max(0, (deadline - performance.now()) / 1000);
          if (remaining <= 0) {
            stop();
            onTimeout();
          } else render();
        }, 100);
        render();
      }
      function reset(waitForAudio = false) {
        stop();
        remaining = duration;
        render();
        if (!waitForAudio) start();
      }
      render();
      return { reset, start, stop };
    }
  };
})();
