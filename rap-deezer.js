(() => {
  "use strict";

  const API_TIMEOUT_MS = 12000;
  const RAP_GENRE_ID = 116;
  const RAP_TRACK_COUNT = 5;
  const rapButton = document.querySelector('.genre-btn[data-genre="rap"]');
  const startScreen = document.getElementById("startScreen");
  if (!rapButton || !startScreen) return;

  const originalContent = startScreen.querySelector(":scope > .panel-content");
  if (!originalContent) return;

  const rapScreen = document.createElement("section");
  rapScreen.className = "rap-deezer-panel hidden";
  rapScreen.setAttribute("aria-labelledby", "rapDeezerTitle");
  rapScreen.innerHTML = `
    <div class="rap-deezer-heading">
      <span class="badge glow">BLIND TEST PAR GENRE · RAP</span>
      <h2 id="rapDeezerTitle">Découvre 5 morceaux Rap</h2>
      <p>Une sélection Rap français et américain, chargée depuis le catalogue Rap/Hip-Hop de Deezer.</p>
    </div>
    <p id="rapDeezerStatus" class="feedback rap-deezer-status" role="status" aria-live="polite">Lance le chargement pour récupérer les morceaux Deezer.</p>
    <button id="loadRapTracks" class="primary-btn start-btn" type="button">Charger 5 morceaux</button>
    <div id="rapTrackList" class="rap-track-list" aria-live="polite"></div>
    <p class="rap-deezer-attribution">Extraits de 30 secondes fournis par <a href="https://www.deezer.com/" target="_blank" rel="noopener noreferrer">Deezer</a>. Lecture en ligne uniquement ; aucun fichier audio n’est téléchargé ni stocké.</p>
    <button id="backToGenreButton" class="ghost-btn rap-back-button" type="button">← Retour aux genres</button>
    <audio id="rapPreviewAudio" preload="none"></audio>
  `;
  originalContent.hidden = false;
  startScreen.appendChild(rapScreen);

  const status = rapScreen.querySelector("#rapDeezerStatus");
  const loadButton = rapScreen.querySelector("#loadRapTracks");
  const trackList = rapScreen.querySelector("#rapTrackList");
  const audio = rapScreen.querySelector("#rapPreviewAudio");
  let requestVersion = 0;
  let activePreviewButton = null;

  const setStatus = (message, kind = "") => {
    status.textContent = message;
    status.className = `feedback rap-deezer-status ${kind}`.trim();
  };

  function requestJSONP(url) {
    return new Promise((resolve, reject) => {
      const callback = `quizzmuRap_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement("script");
      let settled = false;
      let timeout;
      const cleanup = () => {
        window.clearTimeout(timeout);
        script.remove();
        try { delete window[callback]; } catch { window[callback] = undefined; }
      };
      const fail = (message) => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error(message));
      };
      window[callback] = (payload) => {
        if (settled) return;
        settled = true;
        cleanup();
        if (!payload || payload.error || !Array.isArray(payload.data)) {
          reject(new Error("Deezer n’a pas renvoyé les données attendues."));
          return;
        }
        resolve(payload.data);
      };
      script.onerror = () => fail("La connexion à l’API Deezer a échoué.");
      const separator = url.includes("?") ? "&" : "?";
      script.src = `${url}${separator}output=jsonp&callback=${encodeURIComponent(callback)}`;
      timeout = window.setTimeout(() => fail("La requête Deezer a expiré."), API_TIMEOUT_MS);
      document.head.appendChild(script);
    });
  }

  function isUsableTrack(track) {
    return Boolean(track && track.id && track.title && track.artist && track.artist.name &&
      typeof track.preview === "string" && track.preview && Number.isFinite(Number(track.rank)) && track.link);
  }

  function selectDistinctTracks(tracks) {
    const usedIds = new Set();
    const selected = [];
    for (const track of tracks) {
      const id = String(track.id);
      if (usedIds.has(id) || !isUsableTrack(track)) continue;
      usedIds.add(id);
      selected.push(track);
      if (selected.length === RAP_TRACK_COUNT) break;
    }
    return selected;
  }

  async function loadRapTracks() {
    const version = ++requestVersion;
    loadButton.disabled = true;
    trackList.replaceChildren();
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    setStatus("Récupération des artistes Rap/Hip-Hop puis des titres français et américains…");

    try {
      // Restrict results to artists returned by Deezer's Rap/Hip-Hop genre catalog (ID 116).
      const artists = await requestJSONP(`https://api.deezer.com/genre/${RAP_GENRE_ID}/artists?limit=100`);
      if (version !== requestVersion) return;
      const rapArtistIds = new Set(artists.filter((artist) => artist && artist.id).map((artist) => String(artist.id)));
      if (!rapArtistIds.size) throw new Error("Aucun artiste n’a été renvoyé pour le genre Rap/Hip-Hop.");

      const [frenchResults, americanResults] = await Promise.all([
        requestJSONP(`https://api.deezer.com/search?q=${encodeURIComponent("rap français")}&limit=50`),
        requestJSONP(`https://api.deezer.com/search?q=${encodeURIComponent("american rap")}&limit=50`)
      ]);
      if (version !== requestVersion) return;

      const french = selectDistinctTracks(frenchResults.filter((track) => rapArtistIds.has(String(track.artist?.id))));
      const american = selectDistinctTracks(americanResults.filter((track) => rapArtistIds.has(String(track.artist?.id))));
      const mix = selectDistinctTracks([...french.slice(0, 3), ...american.slice(0, 2)]);
      if (mix.length !== RAP_TRACK_COUNT) {
        throw new Error(`Deezer n’a pas fourni assez de morceaux distincts avec preview et rang pour composer le mélange demandé (Rap français : ${french.length}, Rap américain : ${american.length}).`);
      }

      renderTracks(mix, version);
      setStatus("5 morceaux Rap récupérés. Les extraits sont prêts à être testés depuis les boutons.", "success");
    } catch (error) {
      if (version !== requestVersion) return;
      setStatus(`${error.message || "Une erreur Deezer est survenue."} Réessaie dans un instant.`, "error");
    } finally {
      if (version === requestVersion) loadButton.disabled = false;
    }
  }

  function renderTracks(tracks, version) {
    const fragment = document.createDocumentFragment();
    tracks.forEach((track) => {
      const card = document.createElement("article");
      card.className = "rap-track-card";
      const title = document.createElement("h3");
      title.textContent = track.title;
      const artist = document.createElement("p");
      artist.textContent = track.artist.name;
      const rank = document.createElement("p");
      rank.className = "rap-track-rank";
      rank.textContent = `Popularité Deezer (rank) : ${Number(track.rank).toLocaleString("fr-FR")}`;
      const link = document.createElement("a");
      link.href = track.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Voir sur Deezer";
      const play = document.createElement("button");
      play.type = "button";
      play.className = "primary-btn rap-preview-button";
      play.textContent = "▶ Tester l’extrait";
      play.addEventListener("click", async () => {
        if (version !== requestVersion) return;
        if (activePreviewButton === play && !audio.paused) {
          audio.pause();
          return;
        }
        audio.pause();
        if (activePreviewButton) activePreviewButton.textContent = "▶ Tester l’extrait";
        activePreviewButton = play;
        audio.src = track.preview;
        audio.load();
        try {
          await audio.play();
          play.textContent = "⏸ Mettre en pause";
          setStatus(`Lecture en cours : ${track.title} — ${track.artist.name}.`, "success");
        } catch {
          play.textContent = "▶ Réessayer l’extrait";
          setStatus(`Le navigateur n’a pas pu lire l’extrait de « ${track.title} ». Vérifie la connexion ou réessaie.`, "error");
        }
      });
      card.append(title, artist, rank, link, play);
      fragment.appendChild(card);
    });
    trackList.replaceChildren(fragment);
  }

  audio.addEventListener("pause", () => {
    if (activePreviewButton) activePreviewButton.textContent = "▶ Tester l’extrait";
  });
  audio.addEventListener("ended", () => {
    if (activePreviewButton) activePreviewButton.textContent = "▶ Tester l’extrait";
  });
  audio.addEventListener("error", () => {
    if (rapScreen.classList.contains("hidden")) return;
    setStatus("Deezer a renvoyé un extrait, mais le navigateur n’a pas pu le charger. Cet extrait peut être indisponible dans ta région.", "error");
  });

  rapButton.addEventListener("click", () => {
    // Run after the original genre selector updates its own state.
    window.setTimeout(() => {
      originalContent.hidden = true;
      rapScreen.classList.remove("hidden");
      setStatus("Lance le chargement pour récupérer les morceaux Deezer.");
    }, 0);
  });

  rapScreen.querySelector("#backToGenreButton").addEventListener("click", () => {
    requestVersion += 1;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    rapScreen.classList.add("hidden");
    originalContent.hidden = false;
  });
  loadButton.addEventListener("click", loadRapTracks);
})();
