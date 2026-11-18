/* QUIZZMU — Mode Mystère isolé : aucune modification des quiz existants. */
(() => {
  "use strict";
  const BANK = Array.isArray(window.QuizzmuMysteryTracks) ? window.QuizzmuMysteryTracks : [];
  const button = document.querySelector('[data-open-mode="mystere"]');
  const app = document.getElementById("appShell");
  const selector = document.getElementById("modeSelection");
  const welcome = document.getElementById("welcomeScreen");
  const back = document.getElementById("chooseModeBtn");
  const main = app?.querySelector(":scope > main");
  if (!BANK.length || !button || !app || !selector || !main) return;

  const KEY = "quizzmu-mystere-cycle-v1";
  const LIMIT = 10;
  const SECONDS = 30;
  const norm = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()
    .replace(/&/g," and ").replace(/[^a-z0-9]+/g," ").trim().replace(/\s+/g," ");
  const key = (t) => norm(t.title) + "|" + norm(t.artist);
  const all = [...new Map(BANK.map(t=>[key(t),t])).values()];
  const lookup = new Map(all.map(t=>[key(t),t]));
  function shuffle(input) {
    const a=[...input];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  }
  let queue=[];
  function save() { try { localStorage.setItem(KEY, JSON.stringify(queue)); } catch {} }
  function load() {
    try { const stored=JSON.parse(localStorage.getItem(KEY)); if(Array.isArray(stored)) queue=[...new Set(stored.filter(k=>lookup.has(k)))]; }
    catch {}
    if(!queue.length) queue=shuffle([...lookup.keys()]);
    save();
  }
  load();
  function takeSong(excluded) {
    let available = queue.filter(k=>!excluded.has(k));
    if(!available.length) {
      // Un nouveau cycle commence seulement quand toutes les chansons inédites ont été parcourues.
      const previous=excluded;
      const next=shuffle([...lookup.keys()]);
      queue=next.filter(k=>!previous.has(k));
      available=queue;
    }
    if(!available.length) return null;
    const chosen=available[0];
    queue.splice(queue.indexOf(chosen),1);
    save();
    return lookup.get(chosen);
  }
  const screen=document.createElement("section");
  screen.id="mystereScreen";
  screen.className="panel mystere-screen hidden";
  screen.innerHTML=`
    <div class="panel-content mystere-intro" id="mystereIntro">
      <span class="badge glow">MODE MYSTÈRE</span>
      <h2>À toi de retrouver le son !</h2>
      <p>Tous les genres sont mélangés. Écoute 10 morceaux et écris leurs titres sans propositions. Deux indices sont disponibles si tu bloques.</p>
      <button class="primary-btn" id="mystereStart" type="button">Commencer la partie →</button>
    </div>
    <div class="mystere-game hidden" id="mystereGame">
      <div class="game-header">
        <span class="round-badge" id="mystereRound">Question 1 / 10</span>
        <span class="score-badge" id="mystereScore">Score : 0 / 10</span>
        <span class="round-badge" id="mystereTimer" aria-label="Temps restant">30 s</span>
      </div>
      <div class="mystere-audio-card">
        <p class="hint-label">ÉCOUTE L’EXTRAIT</p>
        <button class="primary-btn" id="mysterePlay" type="button" disabled>Chargement…</button>
        <audio id="mystereAudio" preload="none"></audio>
      </div>
      <p class="feedback mystere-feedback" id="mystereStatus" aria-live="polite"></p>
      <p class="mystere-prompt">Quel est le titre de ce morceau ?</p>
      <form id="mystereForm" class="mystere-form">
        <input id="mystereAnswer" aria-label="Titre de la chanson" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Écris le titre de la chanson…" required />
        <button class="primary-btn" id="mystereSubmit" type="submit">Valider</button>
      </form>
      <div class="mystere-help" id="mystereHelp">
        <div class="mystere-help-title">💡 Besoin d'aide ? (2 indices)</div>
        <p id="mystereHintOne" class="mystere-hint mystere-hint-mask hidden"></p>
        <p id="mystereHintTwo" class="mystere-hint hidden"></p>
        <button class="ghost-btn" id="mystereHintButton" type="button">Révéler le premier indice</button>
      </div>
      <p class="feedback mystere-feedback" id="mystereFeedback" aria-live="polite"></p>
      <button class="primary-btn mystere-next hidden" id="mystereNext" type="button">Question suivante →</button>
    </div>
    <div class="mystere-final-area hidden" id="mystereFinal">
      <span class="badge success">FIN DE PARTIE</span>
      <h2>Partie terminée !</h2>
      <p id="mystereFinalScore">Ton score final : 0 / 10 points.</p>
      <button class="primary-btn" id="mystereReplay" type="button">Rejouer le Mode Mystère</button>
    </div>
    <p class="mystere-attribution">Extraits de 30 secondes fournis par <a href="https://www.deezer.com/" target="_blank" rel="noopener noreferrer">Deezer</a>. Lecture en ligne, sans téléchargement.</p>
  `;
  main.appendChild(screen);
  const $=(id)=>screen.querySelector("#"+id);
  const intro=$("mystereIntro"),game=$("mystereGame"),final=$("mystereFinal");
  const audio=$("mystereAudio"),play=$("mysterePlay"),answer=$("mystereAnswer");
  const hintButton=$("mystereHintButton"),next=$("mystereNext"),feedback=$("mystereFeedback");
  let active=false, used=new Set(), count=0, score=0, track=null, answered=false, hints=0, requestId=0, timer=null,remaining=SECONDS,started=false;
  function stopClock(){if(timer){clearInterval(timer);timer=null;}}
  function stopAudio(){audio.pause();audio.removeAttribute("src");audio.load();}
  function stopQuestion(){stopClock();stopAudio();requestId++;started=false;}
  function clockDisplay(){
    $("mystereTimer").textContent=remaining+" s";
    $("mystereTimer").style.color=remaining<=5?"#ff8195":"";
  }
  function startClock(){
    if(started||answered)return;
    started=true;
    timer=setInterval(()=>{remaining--;clockDisplay();if(remaining<=0) finish(false,true);},1000);
  }
  function maskTitle(title){
    let seen=false;
    return Array.from(title).map(c=>{
      if(/[\p{L}\p{N}]/u.test(c)){if(!seen){seen=true;return c.toUpperCase();}return "_";}
      return c===" "?"  ":c;
    }).join(" ");
  }
  function editDistance(a,b){
    if(Math.abs(a.length-b.length)>2)return 99;
    let row=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++){
      let next=[i];
      for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));
      row=next;
    }
    return row[b.length];
  }
  function validResponse(value,title){
    const a=norm(value),b=norm(title);
    if(!a||!b)return false;
    if(a===b)return true;
    const distance=editDistance(a,b);
    const allowed=b.length>=16?2:b.length>=5?1:0;
    return distance<=allowed;
  }
  function setStatus(text,kind=""){
    $("mystereStatus").textContent=text;
    $("mystereStatus").className="feedback mystere-feedback "+kind;
  }
  function requestJSONP(url){
    return new Promise((resolve,reject)=>{
      const name="quizzmuMystere_"+Date.now()+"_"+Math.random().toString(36).slice(2);
      const script=document.createElement("script");let done=false;
      const clean=()=>{clearTimeout(timeout);script.remove();try{delete window[name];}catch{window[name]=undefined;}};
      const fail=()=>{if(done)return;done=true;clean();reject(new Error("Recherche Deezer indisponible"));};
      window[name]=(data)=>{if(done)return;done=true;clean();data&&!data.error?resolve(data):reject(new Error("Deezer n’a pas renvoyé l’extrait."));};
      script.onerror=fail;
      script.src=url+(url.includes("?")?"&":"?")+"output=jsonp&callback="+encodeURIComponent(name);
      const timeout=setTimeout(fail,10000);
      document.head.appendChild(script);
    });
  }
  function exactMatch(item,t){
    if(!item?.id||!item?.preview||!item?.artist?.name||!item?.title)return false;
    const actual=norm(item.title.replace(/\s*(?:\(|\[)?(?:feat\.?|ft\.?|with)\s+.*$/i,""));
    if(actual!==norm(t.title)||norm(item.artist.name)!==norm(t.artist))return false;
    if(t.featuring){
      const credits=[item.title,item.title_version,...(item.contributors||[]).map(c=>c?.name)].filter(Boolean).map(norm).join(" ");
      if(!credits.includes(norm(t.featuring)))return false;
    }
    return /^https:\/\//.test(item.preview);
  }
  async function resolveTrack(t){
    const q=[t.title,t.artist,t.featuring].filter(Boolean).join(" ");
    const result=await requestJSONP("https://api.deezer.com/search?q="+encodeURIComponent(q)+"&limit=25");
    const match=(Array.isArray(result.data)?result.data:[]).find(x=>exactMatch(x,t));
    if(!match)throw new Error("Extrait exact indisponible");
    const resultTrack=await requestJSONP("https://api.deezer.com/track/"+encodeURIComponent(match.id));
    const full=resultTrack.data||resultTrack;
    if(!exactMatch(full,t))throw new Error("Extrait exact indisponible");
    return full;
  }
  async function nextQuestion(){
    if(!active)return;
    stopQuestion();
    answered=false;
    hints=0;
    remaining=SECONDS;clockDisplay();
    answer.value="";answer.disabled=true;$("mystereSubmit").disabled=true;
    hintButton.disabled=true;hintButton.textContent="Révéler le premier indice";
    $("mystereHintOne").classList.add("hidden");$("mystereHintTwo").classList.add("hidden");
    feedback.textContent="";feedback.className="feedback mystere-feedback";
    next.classList.add("hidden");
    play.disabled=true;play.textContent="Chargement de l’extrait…";
    if(count>=LIMIT)return showFinal();
    $("mystereRound").textContent="Question "+(count+1)+" / "+LIMIT;
    $("mystereScore").textContent="Score : "+score+" / "+LIMIT;
    const thisId=requestId;
    for(let attempt=0;attempt<all.length;attempt++){
      const item=takeSong(used);
      if(!item)break;
      used.add(key(item));
      setStatus("Recherche du morceau et de son extrait via Deezer…");
      try{
        const found=await resolveTrack(item);
        if(thisId!==requestId||!active)return;
        track=item;audio.src=found.preview;audio.load();
        play.disabled=false;play.textContent="▶ Lire l’extrait";
        answer.disabled=false;$("mystereSubmit").disabled=false;hintButton.disabled=false;
        setStatus("Extrait prêt. Lance la lecture pour démarrer les 30 secondes.","success");
        count++;
        return;
      }catch(err){if(thisId!==requestId||!active)return;}
    }
    setStatus("Aucun nouvel extrait Deezer n’est disponible. Réessaie plus tard.","error");
    next.textContent="Réessayer →";next.classList.remove("hidden");
  }
  function finish(correct,timeout=false){
    if(answered||!active)return;
    answered=true;
    stopClock();stopAudio();
    answer.disabled=true;$("mystereSubmit").disabled=true;hintButton.disabled=true;play.disabled=true;
    if(correct)score++;
    $("mystereScore").textContent="Score : "+score+" / "+LIMIT;
    feedback.textContent=(timeout?"Temps écoulé ! ":correct?"Bonne réponse ! +1 point. ":"Pas tout à fait ! ")
      +"Réponse : « "+track.title+" » — "+track.artist+".";
    feedback.className="feedback mystere-feedback "+(correct?"success":"error");
    if(window.QuizzmuReactions)window.QuizzmuReactions.show(feedback,correct);
    next.textContent=count===LIMIT?"Voir mon score →":"Question suivante →";
    next.classList.remove("hidden");
    next.scrollIntoView({behavior:"smooth",block:"nearest"});
  }
  function showFinal(){
    stopQuestion();game.classList.add("hidden");intro.classList.add("hidden");
    $("mystereFinalScore").textContent="Ton score final : "+score+" / "+LIMIT+" points.";
    final.classList.remove("hidden");
    window.scrollTo(0,0);
  }
  function startGame(){
    stopQuestion();used=new Set();count=0;score=0;
    intro.classList.add("hidden");final.classList.add("hidden");game.classList.remove("hidden");
    nextQuestion();
  }
  function openMystery(){
    active=true;welcome.classList.add("hidden");selector.classList.add("hidden");app.classList.remove("hidden");
    app.classList.remove("artist-mode-active");
    main.querySelectorAll(":scope > section").forEach(x=>{if(x!==screen)x.classList.add("hidden");});
    screen.classList.remove("hidden");game.classList.add("hidden");final.classList.add("hidden");intro.classList.remove("hidden");
    back.classList.remove("hidden");
    window.scrollTo(0,0);
  }
  function leaveMystery(){
    active=false;stopQuestion();screen.classList.add("hidden");
    app.classList.add("hidden");selector.classList.remove("hidden");welcome.classList.add("hidden");
    // Restore the genre landing section for the next visit; other modes keep their state.
    document.getElementById("startScreen")?.classList.remove("hidden");
    window.scrollTo(0,0);
  }
  button.addEventListener("click",openMystery);
  back.addEventListener("click",(event)=>{if(!active)return;event.preventDefault();event.stopImmediatePropagation();leaveMystery();},true);
  $("mystereStart").addEventListener("click",startGame);
  $("mystereReplay").addEventListener("click",startGame);
  next.addEventListener("click",()=>{if(!answered&&count<LIMIT)nextQuestion();else if(answered)nextQuestion();});
  $("mystereForm").addEventListener("submit",(event)=>{event.preventDefault();if(!answered&&track)finish(validResponse(answer.value,track.title));});
  hintButton.addEventListener("click",()=>{
    if(answered||!track||hints>=2)return;
    hints++;
    if(hints===1){
      $("mystereHintOne").textContent="Indice 1 : "+maskTitle(track.title);
      $("mystereHintOne").classList.remove("hidden");
      hintButton.textContent="Révéler le deuxième indice";
    }else{
      $("mystereHintTwo").textContent="Indice 2 : "+track.artist;
      $("mystereHintTwo").classList.remove("hidden");
      hintButton.disabled=true;
    }
  });
  play.addEventListener("click",async()=>{
    if(!track||answered||play.disabled)return;
    if(!audio.paused){audio.pause();return;}
    try{await audio.play();startClock();play.textContent="⏸ Pause";}
    catch{setStatus("La lecture de cet extrait a échoué. Réessaie.","error");}
  });
  audio.addEventListener("pause",()=>{if(track&&!answered&&active)play.textContent="▶ Lire l’extrait";});
  audio.addEventListener("ended",()=>{if(!answered)play.textContent="▶ Réécouter l’extrait";});
  audio.addEventListener("error",()=>{if(active&&!answered&&track)setStatus("L’extrait rencontre un problème de lecture.","error");});
  window.addEventListener("pagehide",()=>{stopClock();audio.pause();});
})();
