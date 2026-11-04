(() => {
  "use strict";

  const canvas = document.getElementById("soundscape");
  if (!canvas) return;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  let animationId = 0;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    const centerY = height * (height < 600 ? 0.78 : 0.72) + (pointer.y - 0.5) * 18;
    const motion = reducedMotion.matches ? 0 : frame;
    const layers = [
      { amp: height * 0.105, freq: 0.010, speed: 0.012, phase: 0.2, color: "rgba(135, 57, 255, .46)", glow: "#872dff", weight: 2.2 },
      { amp: height * 0.075, freq: 0.014, speed: 0.016, phase: 2.1, color: "rgba(191, 82, 255, .38)", glow: "#bb4dff", weight: 1.8 },
      { amp: height * 0.052, freq: 0.019, speed: 0.021, phase: 4.4, color: "rgba(95, 98, 255, .34)", glow: "#6870ff", weight: 1.5 },
      { amp: height * 0.032, freq: 0.026, speed: 0.025, phase: 1.3, color: "rgba(221, 130, 255, .30)", glow: "#df82ff", weight: 1.3 }
    ];

    layers.forEach((layer, layerIndex) => {
      context.beginPath();
      const shift = (pointer.x - 0.5) * (18 + layerIndex * 12);
      for (let x = -2; x <= width + 2; x += 3) {
        const normalizedX = x / Math.max(width, 1);
        const envelope = 0.26 + Math.pow(Math.sin(normalizedX * Math.PI), 0.75) * 0.74;
        const wave = Math.sin(x * layer.freq + motion * layer.speed + layer.phase + shift * 0.012) * layer.amp * envelope;
        const detail = Math.sin(x * layer.freq * 2.1 - motion * layer.speed * 1.7 + layer.phase) * layer.amp * 0.16;
        const y = centerY + wave + detail;
        if (x === -2) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = layer.color;
      context.lineWidth = layer.weight;
      context.shadowColor = layer.glow;
      context.shadowBlur = 20;
      context.stroke();
      context.shadowBlur = 0;
    });

    const haze = context.createRadialGradient(width * (0.5 + (pointer.x - 0.5) * 0.06), centerY, 8, width / 2, centerY, Math.max(width, height) * 0.58);
    haze.addColorStop(0, "rgba(92, 26, 176, .13)");
    haze.addColorStop(1, "rgba(8, 6, 13, 0)");
    context.fillStyle = haze;
    context.fillRect(0, 0, width, height);
  }

  function animate() {
    pointer.x += (pointer.targetX - pointer.x) * 0.035;
    pointer.y += (pointer.targetY - pointer.y) * 0.035;
    frame += 1;
    draw();
    if (!reducedMotion.matches) animationId = window.requestAnimationFrame(animate);
  }

  window.addEventListener("pointermove", (event) => {
    pointer.targetX = event.clientX / Math.max(window.innerWidth, 1);
    pointer.targetY = event.clientY / Math.max(window.innerHeight, 1);
  }, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  reducedMotion.addEventListener?.("change", () => {
    window.cancelAnimationFrame(animationId);
    if (!reducedMotion.matches) animate();
    else draw();
  });
  resize();
  if (!reducedMotion.matches) animate();
})();
