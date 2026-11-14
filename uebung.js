/* Übung — ein Durchgang mit wechselnden Aufgabentypen (Tropfen + Lektion + Hören) */
(function(){
var U=null;

function istSprache(){
  var r=(typeof RUBRIKEN!=="undefined") && RUBRIKEN.find(function(x){ return x.id===S.rubrik; });
  return !!(r && (r.g==="Sprachen" || r.g==="Sprachen der Schrift"));
}
function woerter(s){ return String(s).split(" · ")[0].trim().split(/\s+/); }
function kurzGenug(c){ return woerter(c.pt).length<=8; }

/* welcher Aufgabentyp passt zu diesem Eintrag gerade */
function typFuer(c){
  var b=S.box[c.id]||0, moeglich=[];
  if(b<2){ moeglich=["erkennen","wahl"]; }
  else if(b<4){ moeglich=istSprache()&&kurzGenug(c) ? ["bauen","tippen","wahl"] : ["tippen","wahl"]; }
  else { moeglich=["sprechen","wahl"]; }
  if(istSprache() && kurzGenug(c) && hasVoice() && b>=1) moeglich.push("hoeren");
  if(!micOK()){ moeglich=moeglich.filter(function(t){ return t!=="sprechen"; }); if(!moeglich.length) moeglich=["tippen"]; }
  return moeglich[Math.floor(Math.random()*moeglich.length)];
}
function richtung(){
  var d=S.dir||"de";
  return d==="mix" ? (Math.random()<0.5?"de":"ziel") : d;
}
function ablenker(c, n){
  var gleiche=CHUNKS.filter(function(x){ return x.scn===c.scn && x.id!==c.id; });
  var pool=gleiche.length>=n ? gleiche : CHUNKS.filter(function(x){ return x.id!==c.id; });
  return shuffle(pool).slice(0,n);
}

function uebMenu(){
  var pool=focusPool();
  var offen=pool.filter(function(c){ return (S.box[c.id]||0)<3; }).length;
  render('<button class="back" onclick="home()">‹ zurück</button><h2>Übung</h2>'+
  '<p class="note" style="margin-bottom:14px">Ein Durchgang mit wechselnden Aufgaben: erkennen, auswählen, bauen, tippen, hören, sprechen. Welche Aufgabe kommt, entscheidet die App danach, wie sicher der Eintrag schon sitzt.</p>'+
  '<div class="card" style="padding:14px 16px"><p class="sub">Im Fokus</p>'+
  '<p style="margin:6px 0 0;font-weight:700">'+offen+' von '+pool.length+' sitzen noch nicht</p></div>'+
  '<button class="tile" onclick="uebStart(8)"><span class="ic">⚡</span><span>Kurz<small>8 Aufgaben · etwa drei Minuten</small></span><span class="chev">›</span></button>'+
  '<button class="tile" onclick="uebStart(14)"><span class="ic">🎯</span><span>Normal<small>14 Aufgaben · etwa fünf Minuten</small></span><span class="chev">›</span></button>'+
  '<button class="tile" onclick="uebStart(25)"><span class="ic">🔥</span><span>Lang<small>25 Aufgaben · etwa zehn Minuten</small></span><span class="chev">›</span></button>'+
  '<p class="note" style="margin-top:14px">Drei Herzen. Bei jedem Fehler siehst du sofort die richtige Lösung, der Eintrag wandert in die Fehlerliste und kommt später wieder.</p>');
}

function uebStart(n){
  var pool=focusPool().slice();
  if(!pool.length) return home();
  pool.sort(function(a,b){ return (S.box[a.id]||0)-(S.box[b.id]||0); });
  var liste=shuffle(pool.slice(0, Math.min(pool.length, Math.max(n, Math.ceil(n*1.5))))).slice(0,n);
  U={liste:liste, i:0, herz:3, ok:0, falsch:0, t0:Date.now(), fb:null, schwach:[]};
  uebAufgabe();
}
function uebAufgabe(){
  if(!U) return;
  if(U.i>=U.liste.length) return uebDone();
  var c=U.liste[U.i];
  U.c=c; U.typ=typFuer(c); U.ri=richtung(); U.fb=null; U.sel=[]; U.bank=null; U.gezeigt=false; U.wahl=null;
  if(U.typ==="hoeren" && hasVoice()) setTimeout(function(){ try{ speak(c.pt); }catch(e){} }, 300);
  uebView();
}

function kopf(){
  var p=Math.round(U.i/U.liste.length*100);
  return '<button class="back" onclick="uebQuit()">‹ abbrechen</button>'+
  '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">'+
    '<div class="bar" style="flex:1;margin:0"><i style="width:'+p+'%"></i></div>'+
    '<span style="letter-spacing:2px;color:var(--bad);font-size:14px">'+
      new Array(U.herz+1).join("♥")+'<span style="color:var(--line)">'+new Array(4-U.herz).join("♥")+'</span></span>'+
  '</div>';
}
function frageText(){ return U.ri==="de" ? U.c.de : U.c.pt; }
function loesungText(){ return U.ri==="de" ? U.c.pt : U.c.de; }

function uebView(){
  var c=U.c, body="";
  if(U.typ==="erkennen"){
    body='<div class="card" style="min-height:200px;display:flex;flex-direction:column;justify-content:center">'+
      '<p class="sub">Erkennen</p>'+(typeof katTag==='function'?katTag(U.c):'')+'<p class="prompt">'+frageText()+'</p>'+
      (U.gezeigt?'<p class="answer">'+loesungText()+'</p>':'<p class="note" style="margin-top:10px">Erst selbst sagen, dann auflösen.</p>')+
      '</div>'+
      (U.gezeigt
        ? '<div class="score"><button class="ok" onclick="uebScore(1)">Saß</button><button class="no" onclick="uebScore(0)">Nochmal</button></div>'
        : '<button class="btn" onclick="uebZeig()">Auflösen</button>');
  }
  else if(U.typ==="wahl"){
    if(!U.opt){
      var falsche=ablenker(c,3).map(function(x){ return U.ri==="de"? x.pt : x.de; });
      U.opt=shuffle([loesungText()].concat(falsche));
    }
    var fertig=!!U.fb;
    body='<div class="card"><p class="sub">Was passt?</p>'+(typeof katTag==='function'?katTag(U.c):'')+'<p class="prompt">'+frageText()+'</p></div>'+
      U.opt.map(function(o,k){
        var richtig=norm(o)===norm(loesungText()), gew=U.wahl===k, st="";
        if(fertig && richtig) st="border-color:var(--accent);background:rgba(143,214,169,.12)";
        else if(fertig && gew) st="border-color:var(--bad);background:rgba(235,128,115,.12)";
        else if(gew) st="border-color:var(--accent)";
        return '<button class="tile" style="'+st+'" onclick="uebWahl('+k+')">'+
        '<span class="ic">'+String.fromCharCode(65+k)+'</span><span>'+o+'</span>'+(U.ri==="de"?'<span class="chev">🔊</span>':'')+'</button>'; }).join("")+
      (fertig ? '' : '<button class="btn" '+(U.wahl==null?'disabled style="opacity:.4"':'')+' onclick="uebWahlCheck()">Prüfen</button>');
  }
  else if(U.typ==="bauen"){
    if(!U.bank){
      var richtig=woerter(c.pt);
      var extra=ablenker(c,2).map(function(x){ var w=woerter(x.pt); return w[Math.floor(Math.random()*w.length)]; });
      U.bank=shuffle(richtig.concat(extra)); U.benutzt=[];
    }
    body='<div class="card"><p class="sub">Bau den Satz</p><p class="prompt" style="font-size:20px">'+c.de+'</p>'+
      '<div style="min-height:52px;border-bottom:2px solid var(--line);display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 0;margin-top:14px">'+
        (U.sel.length? U.sel.map(function(w,k){ return '<button class="pill" style="font-size:15px;color:var(--ink);padding:9px 12px" onclick="uebBau('+k+',1)">'+w+'</button>'; }).join("")
                     : '<span class="note">…</span>')+
      '</div>'+
      '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:14px">'+
        U.bank.map(function(w,k){ return '<button class="pill" style="font-size:15px;color:var(--ink);padding:9px 12px;'+(U.benutzt.indexOf(k)>=0?"opacity:.25":"")+'" onclick="uebBau('+k+',0)">'+w+'</button>'; }).join("")+
      '</div></div>'+
      '<button class="btn" onclick="uebBauCheck()">Prüfen</button>';
  }
  else if(U.typ==="tippen"){
    body='<div class="card"><p class="sub">Tippen</p>'+(typeof katTag==='function'?katTag(U.c):'')+'<p class="prompt">'+frageText()+'</p>'+
      '<input class="txt" id="uebin" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" placeholder="Antwort eintippen">'+
      '</div><button class="btn" onclick="uebTippCheck()">Prüfen</button>';
  }
  else if(U.typ==="hoeren"){
    body='<div class="card" style="min-height:190px;display:flex;flex-direction:column;justify-content:center">'+
      '<p class="sub">Was hörst du?</p>'+
      '<button class="btn ghost" onclick="speak(U_text())">🔊 nochmal abspielen</button>'+
      '<input class="txt" id="uebin" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" placeholder="eintippen, was du gehört hast">'+
      '</div><button class="btn" onclick="uebHoerCheck()">Prüfen</button>';
  }
  else { /* sprechen */
    body='<div class="card"><p class="sub">Laut sagen</p>'+(typeof katTag==='function'?katTag(c):'')+'<p class="prompt">'+c.de+'</p>'+
      '<button class="btn" onclick="uebMic()">🎤 Antworten</button>'+
      '<p class="note" id="micst" style="text-align:center;margin-top:8px">Antippen, dann laut sagen</p>'+
      '<button class="btn ghost sm" onclick="uebZeig()">Kann gerade nicht sprechen</button></div>'+
      (U.gezeigt? '<div class="card"><p class="answer">'+c.pt+'</p><div class="score">'+
        '<button class="ok" onclick="uebScore(1)">Saß</button><button class="no" onclick="uebScore(0)">Nochmal</button></div></div>' : "");
  }
  render(kopf()+body+(U.fb?fbBox():""));
}
function U_text(){ return U&&U.c? U.c.pt : ""; }

function fbBox(){
  var ok=U.fb.ok;
  return '<div class="card" style="border-color:var(--'+(ok?"accent":"bad")+');background:'+(ok?"rgba(143,214,169,.10)":"rgba(235,128,115,.10)")+'">'+
    '<p style="margin:0 0 4px;font-weight:800;color:var(--'+(ok?"accent":"bad")+')">'+(ok?"Richtig.":"Nicht ganz.")+'</p>'+
    '<p class="note" style="margin:0">'+U.fb.text+'</p>'+
    '<button class="btn" onclick="uebWeiter()">Weiter</button></div>';
}
function zeigFb(ok, text){
  U.fb={ok:ok, text:text};
  if(ok){ U.ok++; S.box[U.c.id]=Math.min(5,(S.box[U.c.id]||0)+1); if(typeof clearError==="function") clearError(U.c.id); }
  else { U.falsch++; U.herz--; S.box[U.c.id]=0; U.schwach.push(U.c.id); if(typeof logError==="function") logError(U.c.id,U.c.de,U.c.pt); }
  S.said++; save();
  uebView();
}
function uebWeiter(){ if(U.herz<=0) return uebDone(); U.i++; U.opt=null; U.wahl=null; uebAufgabe(); }
function uebZeig(){ U.gezeigt=true; uebView(); }
function uebScore(v){
  if(v){ U.ok++; S.box[U.c.id]=Math.min(5,(S.box[U.c.id]||0)+1); if(typeof clearError==="function") clearError(U.c.id); }
  else { U.falsch++; U.herz--; S.box[U.c.id]=0; U.schwach.push(U.c.id); if(typeof logError==="function") logError(U.c.id,U.c.de,U.c.pt); }
  S.said++; save();
  if(U.herz<=0) return uebDone();
  U.i++; U.opt=null; U.wahl=null; uebAufgabe();
}
function uebWahl(k){
  if(U.fb){ if(U.ri==="de") speak(U.opt[k]); return; }
  U.wahl=k;
  if(U.ri==="de") speak(U.opt[k]);
  uebView();
}
function uebWahlCheck(){
  if(U.wahl==null || U.fb) return;
  var ok=norm(U.opt[U.wahl])===norm(loesungText());
  zeigFb(ok, ok? loesungText() : "Richtig wäre: "+loesungText());
}
function uebBau(k, ausSlot){
  if(ausSlot){
    var w=U.sel.splice(k,1)[0];
    for(var i=0;i<U.benutzt.length;i++){ if(U.bank[U.benutzt[i]]===w){ U.benutzt.splice(i,1); break; } }
  } else {
    if(U.benutzt.indexOf(k)>=0) return;
    U.benutzt.push(k); U.sel.push(U.bank[k]);
  }
  uebView();
}
function uebBauCheck(){
  var soll=woerter(U.c.pt).join(" "), ist=U.sel.join(" ");
  var ok=norm(ist)===norm(soll);
  zeigFb(ok, ok? U.c.pt : "Richtig wäre: "+U.c.pt);
}
function uebTippCheck(){
  var el=document.getElementById("uebin"), v=(el&&el.value||"").trim();
  if(!v) return;
  var ziel=loesungText(), j=judge([v], ziel);
  var ok=j.v==="ok"||j.v==="near";
  zeigFb(ok, ok? ziel : wordDiff(v, ziel));
}
function uebHoerCheck(){
  var el=document.getElementById("uebin"), v=(el&&el.value||"").trim();
  if(!v) return;
  var j=judge([v], U.c.pt), ok=j.v==="ok"||j.v==="near";
  zeigFb(ok, ok? U.c.pt+" — "+U.c.de : wordDiff(v, U.c.pt)+"<br>"+U.c.de);
}
function uebMic(){
  var c=U.c;
  listen(c.pt, function(r){
    if(!r) return;
    var ok=r.v==="ok"||r.v==="near";
    zeigFb(ok, (ok? c.pt : wordDiff(r.heard, c.pt))+'<br><span style="opacity:.7">gehört: „'+r.heard+'“</span>');
  });
}
function uebQuit(){ U=null; home(); }
function uebDone(){
  var n=U.ok+U.falsch, pct=n?Math.round(U.ok/n*100):0, aus=U.herz<=0;
  var schwach=U.schwach.filter(function(v,i,a){ return a.indexOf(v)===i; });
  render('<div class="card"><h2>'+(aus?"Herzen alle":"Durchgang fertig")+'</h2>'+
  '<p class="big">'+pct+'%</p>'+
  '<p class="note" style="text-align:center">'+U.ok+' von '+n+' richtig · '+Math.max(1,Math.round((Date.now()-U.t0)/60000))+' Minuten</p></div>'+
  (schwach.length
    ? '<h2>Das hat gehakt</h2>'+schwach.slice(0,8).map(function(id){
        var c=CHUNKS.find(function(x){ return x.id===id; });
        return c? '<div class="err"><b>'+c.pt+'</b><br>'+c.de+'</div>' : "";
      }).join("")+'<button class="btn" onclick="drill('+JSON.stringify(schwach).replace(/"/g,"&quot;")+',\'Aus der Übung\')">Diese jetzt drillen</button>'
    : '<p class="note">Kein Fehler. Starke Runde.</p>')+
  '<button class="btn ghost" onclick="uebMenu()">Noch ein Durchgang</button>'+
  '<button class="btn ghost" onclick="uebQuit()">Zurück</button>');
  U=null;
}

window.uebMenu=uebMenu; window.uebStart=uebStart; window.uebZeig=uebZeig; window.uebScore=uebScore;
window.uebWahl=uebWahl; window.uebWahlCheck=uebWahlCheck; window.uebBau=uebBau; window.uebBauCheck=uebBauCheck; window.uebTippCheck=uebTippCheck;
window.uebHoerCheck=uebHoerCheck; window.uebMic=uebMic; window.uebWeiter=uebWeiter; window.uebQuit=uebQuit;
window.U_text=U_text;
})();
