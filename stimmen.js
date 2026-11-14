/* Echte Stimmen — Cloud-Sprachausgabe (Azure oder ElevenLabs), jeder Satz wird nur einmal geladen und dann vom Gerät abgespielt */
(function(){
var CACHE="sprint-stimmen-v1";
var AZ={
  pt:{l:"pt-BR",f:"pt-BR-FranciscaNeural",m:"pt-BR-AntonioNeural"},
  es:{l:"es-ES",f:"es-ES-ElviraNeural",m:"es-ES-AlvaroNeural"},
  en:{l:"en-GB",f:"en-GB-SoniaNeural",m:"en-GB-RyanNeural"},
  fr:{l:"fr-FR",f:"fr-FR-DeniseNeural",m:"fr-FR-HenriNeural"},
  it:{l:"it-IT",f:"it-IT-ElsaNeural",m:"it-IT-DiegoNeural"},
  ru:{l:"ru-RU",f:"ru-RU-SvetlanaNeural",m:"ru-RU-DmitryNeural"},
  sr:{l:"sr-RS",f:"sr-RS-SophieNeural",m:"sr-RS-NicholasNeural"},
  hr:{l:"hr-HR",f:"hr-HR-GabrijelaNeural",m:"hr-HR-SreckoNeural"},
  el:{l:"el-GR",f:"el-GR-AthinaNeural",m:"el-GR-NestorasNeural"},
  he:{l:"he-IL",f:"he-IL-HilaNeural",m:"he-IL-AvriNeural"},
  ar:{l:"ar-SA",f:"ar-SA-ZariyahNeural",m:"ar-SA-HamedNeural"},
  de:{l:"de-DE",f:"de-DE-KatjaNeural",m:"de-DE-ConradNeural"},
  uk:{l:"uk-UA",f:"uk-UA-PolinaNeural",m:"uk-UA-OstapNeural"},
  nl:{l:"nl-NL",f:"nl-NL-FennaNeural",m:"nl-NL-MaartenNeural"},
  pl:{l:"pl-PL",f:"pl-PL-ZofiaNeural",m:"pl-PL-MarekNeural"},
  tr:{l:"tr-TR",f:"tr-TR-EmelNeural",m:"tr-TR-AhmetNeural"}
};
var EL={f:"21m00Tcm4TlvDq8ikWAM", m:"pNInz6obpgDQGcFmaJgB"}; // Rachel / Adam, sprechen mit dem Multilingual-Modell jede Sprache

var audio=null, queue=null, IDX=null;
try{ fetch("audio/index.json",{cache:"no-cache"}).then(function(r){ return r.ok?r.json():null; }).then(function(j){
  if(!j) return; IDX={}; Object.keys(j).forEach(function(v){ var m={}; j[v].forEach(function(h){ m[h]=1; }); IDX[v]=m; });
}).catch(function(){}); }catch(e){}
function datei(txt, which){
  if(!IDX) return null;
  var st=stimme(which), h=hash(speakable(txt||"").trim());
  return (IDX[st.az]&&IDX[st.az][h]) ? "audio/"+st.az+"/"+h+".mp3" : null;
}
function hat(txt, which){ return !!datei(txt, which) || ttsOn(); }

function T(){ S.tts=S.tts||{prov:"azure", key:"", region:"swedencentral", sex:"f", on:false, chars:0, monat:""}; if(S.tts.aus===undefined) S.tts.aus=false; return S.tts; }
function ttsOn(){ var t=T(); return !!(t.on && t.key); }
function langCode(which){
  if(which==="de") return "de";
  var v=(typeof vlangOf==="function"&&vlangOf())||((cfg().mic||"de-DE").split("-")[0].toLowerCase());
  return v;
}
function stimme(which){
  var t=T(), c=langCode(which), a=AZ[c]||AZ.de;
  var sex = (which==="de" && t.zweiStimmen) ? (t.sex==="f"?"m":"f") : t.sex;   // Deutsch auf Wunsch mit der anderen Stimme
  return {lang:a.l, az:a[sex], el:EL[sex]};
}
function rateProz(){ var r=S.rate||0.88; return Math.round((r/0.88-1)*100); }
function xml(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function hash(s){ var h=5381; for(var i=0;i<s.length;i++){ h=((h<<5)+h+s.charCodeAt(i))|0; } return (h>>>0).toString(36); }

function zaehle(n){
  var t=T(), m=new Date().toISOString().slice(0,7);
  if(t.monat!==m){ t.monat=m; t.chars=0; }
  t.chars+=n; save();
}
function holen(txt, which){
  var t=T(), st=stimme(which);
  var lokal=datei(txt, which);
  if(lokal) return fetch(lokal).then(function(r){ if(!r.ok) throw new Error("Datei fehlt"); return r.blob(); });
  if(!ttsOn()) return Promise.reject(new Error("kein Schlüssel"));
  var id=t.prov==="eleven" ? "el/"+st.el : "az/"+st.az;
  var url="https://stimmen.local/"+id+"/"+hash(txt)+".mp3";
  var cacheP = (window.caches ? caches.open(CACHE) : Promise.resolve(null));
  return cacheP.then(function(c){
    return (c? c.match(url) : Promise.resolve(null)).then(function(hit){
      if(hit) return hit.blob();
      var req;
      if(t.prov==="eleven"){
        req=fetch("https://api.elevenlabs.io/v1/text-to-speech/"+st.el+"?output_format=mp3_44100_64",{
          method:"POST", headers:{"xi-api-key":t.key,"Content-Type":"application/json"},
          body:JSON.stringify({text:txt, model_id:"eleven_multilingual_v2"})});
      }else{
        var ssml='<speak version="1.0" xml:lang="'+st.lang+'"><voice name="'+st.az+'">'+xml(txt)+'</voice></speak>';
        req=fetch("https://"+(t.region||"swedencentral").trim()+".tts.speech.microsoft.com/cognitiveservices/v1",{
          method:"POST", headers:{"Ocp-Apim-Subscription-Key":t.key.trim(),"Content-Type":"application/ssml+xml","X-Microsoft-OutputFormat":"audio-24khz-48kbitrate-mono-mp3"},
          body:ssml});
      }
      return req.then(function(res){
        if(!res.ok) throw new Error("HTTP "+res.status);
        return res.blob();
      }).then(function(b){
        zaehle(txt.length);
        if(c) c.put(url,new Response(b,{headers:{"Content-Type":"audio/mpeg"}}));
        return b;
      });
    });
  });
}
function player(){
  if(!audio){ audio=new Audio(); audio.preload="auto"; try{ audio.preservesPitch=true; }catch(e){} }
  return audio;
}
function ttsStop(){
  queue=null;
  try{ if(audio){ audio.pause(); audio.onended=null; audio.onerror=null; } }catch(e){}
}
function ttsSay(txt, which, done){
  txt=speakable(txt||"").trim();
  if(!txt){ done&&done(); return; }
  ttsStop();
  var mein={}; queue=mein;
  holen(txt, which).then(function(b){
    if(queue!==mein) return;
    var a=player();
    if(a._url) URL.revokeObjectURL(a._url);
    a._url=URL.createObjectURL(b); a.src=a._url;
    a.playbackRate=(S.rate||0.88)/0.88;
    a.onended=function(){ if(queue===mein){ queue=null; done&&done(); } };
    a.onerror=function(){ if(queue===mein){ queue=null; done&&done(); } };
    var p=a.play(); if(p&&p.catch) p.catch(function(){ if(queue===mein){ queue=null; done&&done(); } });
  }).catch(function(e){
    T().fehler=String(e&&e.message||e); save();
    if(queue!==mein) return;
    queue=null;
    fallback(txt, which, done);
  });
}
function fallback(txt, which, done){
  try{
    var u=new SpeechSynthesisUtterance(txt);
    var v=which==="de"?null:pickVoice(); if(v){ u.voice=v; u.lang=v.lang; } else u.lang="de-DE";
    u.rate=S.rate||0.88; u.onend=function(){ done&&done(); }; u.onerror=function(){ done&&done(); };
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }catch(e){ done&&done(); }
}

// bestehende Funktionen umleiten
var altSpeak=window.speak, altSex=window.voiceSex, altHas=window.hasVoice;
function aktiv(){ return !T().aus && (ttsOn() || (IDX && IDX[stimme("ziel").az])); }
function istHinweis(txt){ try{ var t=speakable(txt||"").trim(); return CHUNKS.some(function(c){ return c.scn==="w" && speakable(c.pt).trim()===t; }); }catch(e){ return false; } }
window.speak=function(txt){ if(istHinweis(txt) && !T().aus){ try{ speechSynthesis.cancel(); }catch(e){} return ttsSay(txt,"de"); } if(!T().aus && hat(txt,"ziel")){ try{ speechSynthesis.cancel(); }catch(e){} return ttsSay(txt,"ziel"); } return altSpeak(txt); };
window.voiceSex=function(){ return aktiv() ? T().sex : altSex(); };
window.hasVoice=function(){ return aktiv() || altHas(); };

function stille(){
  var n=800, buf=new ArrayBuffer(44+n), d=new DataView(buf);
  function str(o,x){ for(var i=0;i<x.length;i++) d.setUint8(o+i,x.charCodeAt(i)); }
  str(0,"RIFF"); d.setUint32(4,36+n,true); str(8,"WAVE"); str(12,"fmt "); d.setUint32(16,16,true);
  d.setUint16(20,1,true); d.setUint16(22,1,true); d.setUint32(24,8000,true); d.setUint32(28,8000,true);
  d.setUint16(32,1,true); d.setUint16(34,8,true); str(36,"data"); d.setUint32(40,n,true);
  for(var i=0;i<n;i++) d.setUint8(44+i,128);
  return URL.createObjectURL(new Blob([buf],{type:"audio/wav"}));
}
// iPhone: Audio muss einmal durch eine Berührung freigeschaltet werden
document.addEventListener("touchend", function frei(){
  try{ var a=player(); if(!a.src){ a.src=stille(); a.play().then(function(){ a.pause(); }).catch(function(){}); } }catch(e){}
  document.removeEventListener("touchend", frei);
}, {passive:true});

/* Einstellungen */
var testStatus="";
function ttsMenu(){
  var t=T(), m=new Date().toISOString().slice(0,7), used=t.monat===m?t.chars:0;
  var limit=t.prov==="eleven"?10000:500000;
  render('<button class="back" onclick="settings()">‹ zurück</button>'+
  '<h2>Echte Stimmen</h2>'+
  (IDX? '<div class="card"><p class="sub">Eingebaute Stimmen</p><p class="note" style="margin-bottom:10px">Die Sätze sind als echte Aufnahmen in der App — kein Schlüssel nötig, läuft auch offline.</p><button class="btn ghost sm" style="margin:0" onclick="ttsAus()">'+(T().aus?"Einschalten":"Ausschalten (Handystimme nehmen)")+'</button></div>':'')+
  '<p class="sub" style="margin-top:6px">Eigener Schlüssel (optional)</p>'+
  '<p class="note" style="margin-bottom:14px">Statt der Roboterstimme des Handys liest eine natürliche Stimme aus dem Internet vor. Jeder Satz wird nur einmal geladen und dann auf dem Gerät gespeichert — beim zweiten Mal kostet er nichts und läuft auch ohne Netz.</p>'+
  '<div class="card">'+
    '<p class="sub">Anbieter</p>'+
    '<div class="row" style="margin-bottom:12px">'+
      btn("azure","Microsoft Azure","prov")+btn("eleven","ElevenLabs","prov")+
    '</div>'+
    '<p class="note" style="margin-bottom:12px">'+(t.prov==="eleven"
      ? 'ElevenLabs: sehr menschlich, kostenlos 10 000 Zeichen im Monat (etwa 250 Sätze). Schlüssel: elevenlabs.io → Profil → API Keys.'
      : 'Azure: sehr klar, kostenlos 500 000 Zeichen im Monat — reicht für alles. Schlüssel: portal.azure.com → Speech-Dienst anlegen (Tarif F0) → Schlüssel und Endpunkt.')+'</p>'+
    '<p class="sub">Schlüssel</p>'+
    '<input class="txt" id="ttsKey" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Schlüssel einfügen" value="'+xml(t.key||"")+'">'+
    (t.prov==="azure"
      ? '<p class="sub" style="margin-top:14px">Region <span style="text-transform:none;font-weight:400">(steht neben dem Schlüssel)</span></p>'+
        '<input class="txt" id="ttsReg" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="z. B. swedencentral" value="'+xml(t.region||"")+'">'
      : '')+
    '<p class="note" style="margin-top:8px">Der Schlüssel bleibt nur auf diesem Gerät.</p>'+
  '</div>'+
  '<div class="card">'+
    '<p class="sub">Stimme</p>'+
    '<div class="row">'+btn("f","Frau","sex")+btn("m","Mann","sex")+'</div>'+
    '<label class="note" style="display:flex;gap:8px;align-items:center;margin-top:12px"><input type="checkbox" '+(t.zweiStimmen?"checked":"")+' onchange="ttsSet(\'zweiStimmen\',this.checked)"> Deutsch mit der anderen Stimme sprechen</label>'+
  '</div>'+
  '<button class="btn" onclick="ttsSave(true)">Speichern & testen</button>'+
  (testStatus?'<p class="note" style="margin:6px 0 12px">'+testStatus+'</p>':'')+
  (t.key?'<button class="btn ghost" onclick="ttsToggle()">'+(t.on?"Echte Stimmen ausschalten":"Echte Stimmen einschalten")+'</button>':'')+
  (ttsOn()?'<button class="btn ghost" onclick="ttsVorab()">Fokus vorab laden <small style="display:block;font-weight:400">für unterwegs ohne Netz</small></button>':'')+
  '<p class="note" style="margin-top:10px">Diesen Monat geladen: '+used.toLocaleString("de-DE")+' von '+limit.toLocaleString("de-DE")+' Gratis-Zeichen.</p>');
}
function btn(v,l,k){ var on=T()[k]===v; return '<button class="btn ghost sm" style="margin:0;'+(on?"border-color:var(--accent);color:var(--accent)":"")+'" onclick="ttsSet(\''+k+'\',\''+v+'\')">'+l+'</button>'; }
function lesen(){
  var t=T(), k=document.getElementById("ttsKey"), r=document.getElementById("ttsReg");
  if(k) t.key=k.value.trim(); if(r) t.region=r.value.trim().toLowerCase().replace(/\s+/g,"");
}
function ttsSet(k,v){ lesen(); T()[k]=v; save(); testStatus=""; ttsMenu(); }
function ttsAus(){ var t=T(); t.aus=!t.aus; save(); ttsMenu(); }
function ttsToggle(){ lesen(); var t=T(); t.on=!t.on; save(); ttsMenu(); }
function ttsSave(test){
  lesen(); var t=T();
  if(!t.key){ testStatus="Bitte erst den Schlüssel einfügen."; return ttsMenu(); }
  t.on=true; t.fehler=""; save();
  if(!test) return ttsMenu();
  testStatus="Teste …"; ttsMenu();
  var satz=(typeof testLine==="function"?testLine():"Olá!");
  ttsSay(satz,"ziel",function(){
    var f=T().fehler;
    testStatus = f ? "Hat nicht geklappt ("+f+"). Prüfe Schlüssel"+(t.prov==="azure"?" und Region":"")+"." : "Läuft. Ab jetzt sprechen überall die echten Stimmen.";
    if(f){ t.on=false; save(); }
    ttsMenu();
  });
}
function ttsVorab(){
  var pool=(typeof focusPool==="function"?focusPool():CHUNKS).filter(function(c){ return c&&c.pt; });
  var i=0, ok=0;
  (function next(){
    if(i>=pool.length){ testStatus="Fertig: "+ok+" Sätze gespeichert."; return ttsMenu(); }
    testStatus="Lade "+(i+1)+" von "+pool.length+" …"; ttsMenu();
    var c=pool[i++];
    holen(speakable(c.pt),"ziel").then(function(){ ok++; return holen(speakable(c.de),"de"); }).then(next,next);
  })();
}

window.ttsOn=ttsOn; window.ttsHat=function(t,w){ return !T().aus && hat(t,w); }; window.ttsHash=hash; window.ttsAZ=AZ; window.ttsSay=ttsSay; window.ttsStop=ttsStop;
window.ttsMenu=ttsMenu; window.ttsAus=ttsAus; window.ttsSet=ttsSet; window.ttsToggle=ttsToggle; window.ttsSave=ttsSave; window.ttsVorab=ttsVorab;
})();
