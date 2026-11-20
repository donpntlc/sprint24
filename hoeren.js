/* Hören & Nachsprechen — Audio-Drill ohne Hinsehen */
(function(){
var H=null, lock=null, timer=null;

function cfgH(){ S.hoer=S.hoer||{src:"offen", dir:"mix", pause:4, echo:true, warten:true}; if(S.hoer.warten===undefined) S.hoer.warten=true; return S.hoer; }

function deVoice(){
  try{
    var all=(window.speechSynthesis.getVoices()||[]).filter(function(v){ return (v.lang||"").toLowerCase().indexOf("de")===0; });
    all.sort(function(a,b){ return (/premium|enhanced/i.test(b.name)?1:0)-(/premium|enhanced/i.test(a.name)?1:0); });
    return all[0]||null;
  }catch(e){ return null; }
}
function hSay(txt, which, done){
  try{
    if(!txt) return done&&done();
    if(window.ttsHat&&ttsHat(txt, which==="de"?"de":"ziel")) return ttsSay(txt, which==="de"?"de":"ziel", done);
    var u=new SpeechSynthesisUtterance(speakable(txt));
    var v = which==="de" ? deVoice() : pickVoice();
    if(v){ u.voice=v; u.lang=v.lang; }
    u.rate=(S.rate||0.88);
    u.onend=function(){ done&&done(); };
    u.onerror=function(){ done&&done(); };
    window.speechSynthesis.speak(u);
  }catch(e){ done&&done(); }
}
function wait(ms, done){ clearTimeout(timer); timer=setTimeout(done, ms); }

function hPool(src){
  var pool;
  if(src==="fehler") pool=(S.errors||[]).map(function(e){ return CHUNKS.find(function(c){ return c.id===e.id; }); }).filter(Boolean);
  else if(src==="offen") pool=focusPool().filter(function(c){ return (S.box[c.id]||0)<3; });
  else if(src==="fokus") pool=focusPool();
  else pool=CHUNKS.slice();
  return pool.filter(function(c){ return c && c.pt && c.de && !(c.scn==="w" && window.istSpr && istSpr()); });
}
function hLabel(src){
  return src==="fehler" ? "Fehlerliste" : src==="offen" ? "Was noch nicht sitzt" : src==="fokus" ? "Alles im Fokus" : "Ganze Rubrik";
}

function hoerMenu(){
  var h=cfgH();
  var counts={fehler:hPool("fehler").length, offen:hPool("offen").length, fokus:hPool("fokus").length, alles:hPool("alles").length};
  var src=function(id,d){
    return '<button class="tile" onclick="hoerSet(\'src\',\''+id+'\')" style="'+(h.src===id?"border-color:var(--accent)":"")+'">'+
      '<span class="ic">'+(id==="fehler"?"🩹":id==="offen"?"🌱":id==="fokus"?"⭐":"🌀")+'</span>'+
      '<span>'+hLabel(id)+'<small>'+counts[id]+' Einträge · '+d+'</small></span>'+
      '<span class="chev">'+(h.src===id?'<b class="done">gewählt</b>':"›")+'</span></button>';
  };
  var pill=function(k,val,txt){
    var cur=h[k]===true?"1":h[k]===false?"0":String(h[k]);
    return '<button class="btn ghost sm" style="margin:0;flex:1 1 auto;'+(cur===val?"border-color:var(--accent);color:var(--accent);background:rgba(143,214,169,.10)":"")+'" onclick="hoerSet(\''+k+'\',\''+val+'\')">'+txt+'</button>';
  };
  render('<button class="back" onclick="home()">‹ zurück</button><h2>Hören & Nachsprechen</h2>'+
  '<p class="note" style="margin-bottom:14px">Du hörst, sagst nach, hörst die Lösung. Ohne Hinsehen — beim Laufen, Kochen, Fahrradfahren. Läuft von allein weiter.</p>'+
  '<p class="sub" style="margin:0 0 8px">Was abgefragt wird</p>'+
  src("fehler","alles, was du schon falsch hattest")+
  src("offen","im Fokus, noch nicht dreimal richtig")+
  src("fokus","der ganze aktuelle Fokus")+
  src("alles","alle Einträge dieser Rubrik")+
  '<div class="card" style="margin-top:14px"><p class="sub">Richtung</p><div class="row" style="margin-top:8px;flex-wrap:wrap;gap:8px">'+
    pill("dir","mix","gemischt")+(window.istSpr&&!istSpr()? pill("dir","de","Frage zuerst")+pill("dir","ziel","Antwort zuerst") : pill("dir","de","Deutsch zuerst")+pill("dir","ziel",(cfg().name==="Brasilianisches Portugiesisch"?"Portugiesisch":cfg().name.split(" ")[0])+" zuerst"))+
  '</div>'+
  '<p class="sub" style="margin-top:14px">Denkpause</p><div class="row" style="margin-top:8px;flex-wrap:wrap;gap:8px">'+
    pill("pause","3","3 Sek")+pill("pause","4","4 Sek")+pill("pause","6","6 Sek")+pill("pause","8","8 Sek")+
  '</div>'+
  '<p class="sub" style="margin-top:14px">Lösung zweimal</p><div class="row" style="margin-top:8px;flex-wrap:wrap;gap:8px">'+
    pill("echo","1","ja — zum Nachsprechen")+pill("echo","0","nein")+
  '</div>'+
  '<p class="sub" style="margin-top:14px">Nach der Lösung</p><div class="row" style="margin-top:8px;flex-wrap:wrap;gap:8px">'+
    pill("warten","1","auf dich warten")+pill("warten","0","durchlaufen")+
  '</div></div>'+
  (hPool(h.src).length
    ? '<button class="btn" onclick="hoerStart()">Los — '+hPool(h.src).length+' Einträge</button>'
    : '<p class="note">Hier ist gerade nichts drin. Wähle oben etwas anderes.</p>')+
  '<p class="note" style="margin-top:14px">Der Ton läuft nur, solange die App offen und der Bildschirm an ist — das gibt iOS Web-Apps so vor. Die App hält den Bildschirm deshalb selbst wach. In die Hosentasche stecken geht nicht, ans Lenkrad klemmen oder daneben liegen lassen schon.</p>');
};
function hoerSet(k,v){
  var h=cfgH();
  h[k] = (k==="echo"||k==="warten") ? (v==="1") : (k==="pause") ? parseInt(v,10) : v;
  save(); hoerMenu();
};

function hoerStart(){
  var h=cfgH(), pool=hPool(h.src);
  if(!pool.length) return hoerMenu();
  pool=pool.slice().sort(function(a,b){ return (S.box[a.id]||0)-(S.box[b.id]||0); });
  var head=pool.slice(0,Math.min(12,pool.length)), rest=shuffle(pool.slice(12));
  H={list:head.concat(rest), i:0, playing:true, phase:"", runde:1};
  keepAwake();
  hoerStep();
};
function hoerStop(){
  if(H) H.playing=false;
  clearTimeout(timer);
  try{ window.speechSynthesis.cancel(); }catch(e){}
  try{ if(window.ttsStop) ttsStop(); }catch(e){}
  releaseAwake();
};
function hoerQuit(){ hoerStop(); H=null; home(); };
function hoerPause(){ hoerStop(); hoerView(); };
function hoerResume(){ if(!H) return; H.playing=true; keepAwake(); hoerStep(); };
function hoerNext(){ if(!H) return; hoerStop(); H.i++; if(H.i>=H.list.length){ H.i=0; H.runde++; H.list=shuffle(H.list); } H.playing=true; keepAwake(); hoerStep(); };
function hoerBack(){ if(!H) return; hoerStop(); H.i=Math.max(0,H.i-1); H.playing=true; keepAwake(); hoerStep(); };
function hoerMark(ok){
  if(!H) return;
  var c=H.list[H.i];
  if(ok){ S.box[c.id]=Math.min(5,(S.box[c.id]||0)+1); if(typeof clearError==="function") clearError(c.id); }
  else { S.box[c.id]=0; if(typeof logError==="function") logError(c.id,c.de,c.pt); }
  S.said++; save(); hoerNext();
};

function hoerStep(){
  if(!H||!H.playing) return;
  var c=H.list[H.i], h=cfgH();
  if(!c) return hoerQuit();
  var toZiel = h.dir==="de" ? true : h.dir==="ziel" ? false : (Math.random()<0.5);
  H.toZiel=toZiel;
  H.phase="frage"; hoerView();
  hSay(toZiel? c.de : c.pt, toZiel? "de":"ziel", function(){
    if(!H||!H.playing) return;
    H.phase="du"; hoerView();
    wait((h.pause||4)*1000, function(){
      if(!H||!H.playing) return;
      H.phase="loesung"; hoerView();
      hSay(toZiel? c.pt : c.de, toZiel? "ziel":"de", function(){
        if(!H||!H.playing) return;
        var weiter=function(){
          if(!H||!H.playing) return;
          if(h.warten){ H.phase="bewerten"; hoerView(); return; }
          wait(500, function(){
            if(!H||!H.playing) return;
            H.i++;
            if(H.i>=H.list.length){ H.i=0; H.runde++; H.list=shuffle(H.list); }
            hoerStep();
          });
        };
        if(h.echo && toZiel) wait(600, function(){ hSay(c.pt,"ziel",weiter); });
        else weiter();
      });
    });
  });
}

function lblFor(ph){
  return ph==="bewerten" ? "Sa\u00df das?" : ph==="frage" ? "H\u00f6r zu" : ph==="du" ? "Jetzt du \u2014 laut sagen" : "L\u00f6sung";
}
function hoerView(){
  if(!H) return;
  var c=H.list[H.i], h=cfgH();
  var ph=H.phase, zeig = (ph==="loesung"||ph==="bewerten"), bew = (ph==="bewerten");
  var frage = H.toZiel ? c.de : c.pt, loesung = H.toZiel ? c.pt : c.de;
  render('<button class="back" onclick="hoerQuit()">‹ beenden</button>'+
  '<div class="meta"><span>'+hLabel(h.src)+' · Runde '+H.runde+'</span><span>'+(H.i+1)+' / '+H.list.length+'</span></div>'+
  '<div class="card" style="min-height:230px;display:flex;flex-direction:column;justify-content:center">'+
    '<p class="sub">'+lblFor(ph)+'</p>'+
    '<p class="prompt">'+frage+'</p>'+
    (zeig? '<p class="answer">'+loesung+'</p>' : '<p class="answer" style="opacity:.18">· · ·</p>')+
  '</div>'+
  (bew
    ? '<div class="score" style="margin-top:2px">'+
        '<button class="ok" style="padding:20px 6px;font-size:15px" onclick="hoerMark(true)">Saß</button>'+
        '<button class="no" style="padding:20px 6px;font-size:15px" onclick="hoerMark(false)">Nochmal üben</button>'+
      '</div>'+
      '<button class="btn ghost sm" onclick="hoerNext()">ohne Bewertung weiter</button>'
    : '<div class="grid2">'+
        (H.playing
          ? '<button class="btn ghost" onclick="hoerPause()">Pause</button>'
          : '<button class="btn" onclick="hoerResume()">Weiter</button>')+
        '<button class="btn ghost" onclick="hoerNext()">Nächstes</button>'+
      '</div>'+
      '<button class="btn ghost sm" onclick="hoerBack()">· eins zurück</button>')+
  '<p class="note" style="margin-top:12px">Läuft von allein weiter. „Saß“ und „Nochmal üben“ wirken auf denselben Fortschritt wie die Drills — du kannst also nebenbei wirklich lernen.</p>');
}

function keepAwake(){
  try{ if(navigator.wakeLock && !lock) navigator.wakeLock.request("screen").then(function(l){ lock=l; }).catch(function(){}); }catch(e){}
}
function releaseAwake(){ try{ if(lock){ lock.release(); lock=null; } }catch(e){} }
try{
  document.addEventListener("visibilitychange", function(){
    if(document.visibilityState==="visible" && H && H.playing) keepAwake();
  });
}catch(e){}

window.hoerMenu=hoerMenu;
window.hoerSet=hoerSet;
window.hoerStart=hoerStart;
window.hoerStop=hoerStop;
window.hoerQuit=hoerQuit;
window.hoerPause=hoerPause;
window.hoerResume=hoerResume;
window.hoerNext=hoerNext;
window.hoerBack=hoerBack;
window.hoerMark=hoerMark;
})();
