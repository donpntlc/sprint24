/* 4/3/2 Monolog mit Prüfung: die App hört mit und wertet jede Runde aus */
(function(){
var R=null, laeuft=false, text="", zwischen="";
var DE_STOP=["und","ich","nicht","der","die","das","ist","aber","wir","mit","auf","dass","auch","habe","bin","sehr","weil","wenn","oder","ein","eine","zu","es","dann","noch","schon"];

function norm(s){ return String(s||"").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9Ͱ-ϿЀ-ӿ֐-׿ ]+/g," ").replace(/\s+/g," ").trim(); }
function woerter(s){ var n=norm(s); return n? n.split(" ") : []; }
function zielDeutsch(){ return /^de/i.test(cfg().mic||"de"); }
function micDa(){ return typeof micOK==="function" && micOK(); }

function bausteinTreffer(h, gesagt){
  var w=woerter(h.replace(/…|\.\.\./g," ")).filter(function(x){ return x.length>2; });
  if(!w.length) return false;
  var set={}; gesagt.forEach(function(x){ set[x]=1; });
  var hit=w.filter(function(x){ return set[x]; }).length;
  return hit/w.length>=0.6;
}
function auswerten(secs){
  var t=TOPICS[F.idx], g=woerter(text);
  var n=g.length, wpm=Math.round(n/(secs/60));
  var deAnteil = zielDeutsch()||!n ? 0 : g.filter(function(x){ return DE_STOP.indexOf(x)>=0; }).length/n;
  var treffer=t.hints.map(function(h){ return bausteinTreffer(h,g); });
  return {n:n, wpm:wpm, de:deAnteil, treffer:treffer, text:text.trim()};
}

function hoeren(){
  try{
    R=new SRC(); R.lang=cfg().mic||"pt-BR"; R.continuous=true; R.interimResults=true;
    R.onresult=function(e){
      zwischen="";
      for(var i=e.resultIndex;i<e.results.length;i++){
        if(e.results[i].isFinal) text+=" "+e.results[i][0].transcript; else zwischen+=" "+e.results[i][0].transcript;
      }
      var el=document.getElementById("live"); if(el) el.textContent=(text+" "+zwischen).trim().split(" ").slice(-14).join(" ")||"…";
      var z=document.getElementById("zaehl"); if(z) z.textContent=woerter(text+" "+zwischen).length+" Wörter";
    };
    R.onerror=function(e){ if(e&&e.error==="not-allowed"){ S.micBroken=true; save(); laeuft=false; } };
    R.onend=function(){ if(laeuft){ try{ R.start(); }catch(e){} } };
    R.start();
  }catch(e){}
}
function stopHoeren(){ laeuft=false; try{ R&&R.stop(); }catch(e){} }

window.f432=function(idx){ F={idx:idx, round:0, used:[], res:[]}; f432Card(); };
window.f432Card=function(){
  var t=TOPICS[F.idx], secs=[240,180,120][F.round];
  if(F.round>2) return ende();
  var mic=micDa();
  render('<button class="back" onclick="f432Abbruch()">‹ abbrechen</button>'+
  '<div class="meta"><span>'+t.t+'</span><span>Runde '+(F.round+1)+' / 3</span></div>'+
  '<div class="card" style="margin-top:10px">'+
    '<p class="big" id="clock">'+Math.floor(secs/60)+':'+String(secs%60).padStart(2,"0")+'</p>'+
    (F.res.length? '<p class="note" style="text-align:center">Ziel: mehr als '+F.res[F.res.length-1].wpm+' Wörter pro Minute</p>':'')+
    '<button class="btn" id="startBtn" onclick="f432Start('+secs+')">Los — reden</button>'+
    (mic? '<p class="note" id="zaehl" style="text-align:center;margin-top:6px">Die App hört mit und wertet danach aus.</p>'+
          '<p class="note" id="live" style="text-align:center;min-height:22px;font-style:italic"></p>'
        : '<p class="note" style="margin-top:8px">Mikrofon aus oder nicht erlaubt — dann kann die App nicht prüfen. Einschalten unter Einstellungen → Mikrofon-Modus (nur in Safari, nicht in der Vorschau).</p>')+
    '<p class="sub" style="margin-top:14px">Diese Bausteine einbauen:</p>'+
    '<ul class="ck">'+t.hints.map(function(h){ return '<li>'+h+'</li>'; }).join("")+'</ul>'+
  '</div>');
};
window.f432Abbruch=function(){ stopHoeren(); clearInterval(timer); f432List(); };
window.f432Start=function(secs){
  var btn=document.getElementById("startBtn"); btn.textContent="läuft …"; btn.disabled=true;
  text=""; zwischen="";
  if(micDa()){ laeuft=true; hoeren(); }
  var left=secs; clearInterval(timer);
  timer=setInterval(function(){
    left--;
    var c=document.getElementById("clock");
    if(!c){ clearInterval(timer); stopHoeren(); return; }
    c.textContent=Math.floor(left/60)+":"+String(left%60).padStart(2,"0");
    if(left<=0){ clearInterval(timer); text+=" "+zwischen; stopHoeren(); setTimeout(function(){ rundeFertig(secs); }, 600); }
  },1000);
};
function rundeFertig(secs){
  var mic=micDa()||text.trim().length>0;
  var r=auswerten(secs); F.res.push(r);
  var t=TOPICS[F.idx];
  S.said++; save();
  if(!mic){ F.round++; if(F.round>2){ S.f432Done=(S.f432Done||0)+1; save(); } return f432Card(); }
  var ok=r.treffer.filter(Boolean).length;
  var urteil=[];
  if(r.n<20) urteil.push("Kaum etwas verstanden. Sprich lauter und näher am Handy — oder du hast zu lange Pausen gemacht.");
  if(r.de>0.12) urteil.push("Da war viel Deutsch dabei. Bleib in der Sprache, auch wenn's holpert — umschreiben statt wechseln.");
  if(ok<t.hints.length) urteil.push("Bausteine fehlen noch — bau sie in der nächsten Runde bewusst ein.");
  var vor=F.res.length>1? F.res[F.res.length-2].wpm : null;
  if(vor!==null) urteil.push(r.wpm>vor? "Schneller als die Runde davor (+"+(r.wpm-vor)+" pro Minute). Genau das ist der Effekt." : "Nicht schneller als davor. Gleicher Inhalt, kürzere Zeit — weniger Pausen, kürzere Sätze.");
  if(!urteil.length) urteil.push("Sauber: genug gesagt, in der Sprache geblieben, alle Bausteine drin.");
  render('<div class="card"><p class="sub">Runde '+(F.round+1)+' ausgewertet</p>'+
    '<div class="row" style="gap:10px;margin:8px 0 14px">'+
      kachel(r.n,"Wörter")+kachel(r.wpm,"pro Minute")+kachel(ok+"/"+t.hints.length,"Bausteine")+
    '</div>'+
    '<ul class="ck">'+t.hints.map(function(h,i){ return '<li class="'+(r.treffer[i]?"on":"")+'">'+(r.treffer[i]?"✓ ":"✗ ")+h+'</li>'; }).join("")+'</ul>'+
    urteil.map(function(u){ return '<p class="note" style="margin-top:8px">'+u+'</p>'; }).join("")+
    '<details style="margin-top:10px"><summary class="sum">Was die App gehört hat</summary><p class="note" style="margin-top:6px">'+(r.text||"—")+'</p></details>'+
    '<button class="btn" onclick="f432Weiter()">'+(F.round<2?"Nächste Runde · "+[3,2][F.round]+" Minuten":"Fertig")+'</button>'+
  '</div>');
}
function kachel(z,l){ return '<div class="card" style="flex:1;margin:0;padding:10px;text-align:center"><p style="margin:0;font-size:22px;font-weight:800">'+z+'</p><p class="note" style="margin:0">'+l+'</p></div>'; }
window.f432Weiter=function(){ F.round++; if(F.round>2){ S.f432Done=(S.f432Done||0)+1; save(); } f432Card(); };
function ende(){
  var t=TOPICS[F.idx], r=F.res;
  var verlauf = r.length && r[0].n ? '<p class="note">Wörter pro Minute: '+r.map(function(x){ return x.wpm; }).join(" → ")+'</p>' : "";
  render('<div class="card"><h2>Durch</h2><p class="note">Drei Runden über „'+t.t+'".</p>'+verlauf+
    '<button class="btn" onclick="f432('+F.idx+')">Nochmal</button><button class="btn ghost" onclick="f432List()">Anderes Thema</button></div>');
}
})();
