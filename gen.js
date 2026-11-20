/* Audio-Werkstatt: erzeugt alle Sätze als Azure-Aufnahmen und lädt sie als ZIP herunter. Aufruf: …/sprint24/#gen */
(function(){
if(location.hash!=="#gen") return;

function texte(){
  var AZ=ttsAZ, out={};          // voice -> {hash:text}
  function add(voice, t){
    t=speakable(t||"").trim(); if(!t || t.length>600) return;
    (out[voice]=out[voice]||{})[ttsHash(t)]=t;
  }
  Object.keys(RUBRIK_DATA).forEach(function(r){
    var d=RUBRIK_DATA[r], code=(d.mic||"de-DE").split("-")[0].toLowerCase(), z=AZ[code]||AZ.de;
    ["f","m"].forEach(function(sx){
      (d.chunks||[]).forEach(function(c){ add(z[sx], c.pt); add(AZ.de[sx], c.de); });
      var ms=d.missions||{};
      Object.keys(ms).forEach(function(k){ (ms[k].turns||[]).forEach(function(tn){ add(z[sx], tn.said); add(z[sx], tn.model); }); });
      var g=(typeof DLG!=="undefined")&&DLG[r];
      if(g){ add(z[sx], g.open); (g.scenes||[]).forEach(function(sc){ (sc.turns||[]).forEach(function(t){ add(z[sx], t.p); add(z[sx], t.exp); add(z[sx], t.ok); }); }); }
    });
  });
  if(window.GRAM){
    Object.keys(GRAM).forEach(function(r){ var z=AZ[r]; if(!z) return;
      GRAM[r].forEach(function(l){ ["f","m"].forEach(function(sx){ l.bsp.forEach(function(b){ add(z[sx], b[0]); }); }); }); });
  }
  if(window.BILD_WOERTER){
    Object.keys(BILD_SP).forEach(function(r){ var z=AZ[r]; if(!z) return;
      BILD_WOERTER.forEach(function(w){ ["f","m"].forEach(function(sx){ add(z[sx], w[BILD_SP[r]]); }); }); });
  }
  return out;
}
function zaehle(o, nurF){
  var n=0, k=0;
  Object.keys(o).forEach(function(v){ if(nurF && /(Antonio|Alvaro|Ryan|Henri|Diego|Dmitry|Nicholas|Srecko|Nestoras|Avri|Hamed|Conrad|Ostap|Maarten|Marek|Ahmet)Neural$/.test(v)) return;
    Object.keys(o[v]).forEach(function(h){ n+=o[v][h].length; k++; }); });
  return {zeichen:n, saetze:k};
}
function xml(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

/* ZIP ohne Kompression */
var CRC=(function(){ var t=[]; for(var n=0;n<256;n++){ var c=n; for(var k=0;k<8;k++) c=c&1?0xEDB88320^(c>>>1):c>>>1; t[n]=c>>>0; } return t; })();
function crc32(u){ var c=0xFFFFFFFF; for(var i=0;i<u.length;i++) c=CRC[(c^u[i])&255]^(c>>>8); return (c^0xFFFFFFFF)>>>0; }
function zip(files){ // [{name, data:Uint8Array}]
  var enc=new TextEncoder(), parts=[], central=[], off=0;
  files.forEach(function(f){
    var nm=enc.encode(f.name), crc=crc32(f.data), sz=f.data.length;
    var h=new DataView(new ArrayBuffer(30));
    h.setUint32(0,0x04034b50,true); h.setUint16(4,20,true); h.setUint16(8,0,true);
    h.setUint32(14,crc,true); h.setUint32(18,sz,true); h.setUint32(22,sz,true); h.setUint16(26,nm.length,true);
    parts.push(new Uint8Array(h.buffer), nm, f.data);
    var c=new DataView(new ArrayBuffer(46));
    c.setUint32(0,0x02014b50,true); c.setUint16(4,20,true); c.setUint16(6,20,true);
    c.setUint32(16,crc,true); c.setUint32(20,sz,true); c.setUint32(24,sz,true); c.setUint16(28,nm.length,true); c.setUint32(42,off,true);
    central.push(new Uint8Array(c.buffer), nm);
    off+=30+nm.length+sz;
  });
  var cl=central.reduce(function(a,b){ return a+b.length; },0);
  var e=new DataView(new ArrayBuffer(22));
  e.setUint32(0,0x06054b50,true); e.setUint16(8,files.length,true); e.setUint16(10,files.length,true); e.setUint32(12,cl,true); e.setUint32(16,off,true);
  return new Blob(parts.concat(central,[new Uint8Array(e.buffer)]),{type:"application/zip"});
}

var stop=false, VORHANDEN=null;
fetch("audio/index.json",{cache:"no-cache"}).then(function(r){ return r.json(); }).then(function(j){ VORHANDEN={}; Object.keys(j).forEach(function(v){ var m={}; j[v].forEach(function(h){ m[h]=1; }); VORHANDEN[v]=m; }); seite(""); }).catch(function(){ VORHANDEN={}; });
function nurNeu(o){ if(!VORHANDEN) return o; var r={}; Object.keys(o).forEach(function(v){ Object.keys(o[v]).forEach(function(h){ if(!(VORHANDEN[v]&&VORHANDEN[v][h])) (r[v]=r[v]||{})[h]=o[v][h]; }); }); return r; }
function seite(msg){
  var o=nurNeu(texte()), a=zaehle(o,false), f=zaehle(o,true);
  render('<h2>Audio-Werkstatt</h2>'+
  '<p class="note" style="margin-bottom:12px">Erzeugt alle Sätze, die noch keine Aufnahme haben. Am Ende wird eine ZIP-Datei heruntergeladen — die baut Claude in die App ein. Der Schlüssel bleibt in diesem Browser.</p>'+
  '<div class="card"><p class="note">Beide Stimmen: '+a.saetze.toLocaleString("de-DE")+' Sätze · '+a.zeichen.toLocaleString("de-DE")+' Zeichen<br>Nur Frauenstimmen: '+f.saetze.toLocaleString("de-DE")+' Sätze · '+f.zeichen.toLocaleString("de-DE")+' Zeichen<br>Gratis im Monat: 500.000 Zeichen</p></div>'+
  '<div class="card"><p class="sub">Schlüssel</p><input class="txt" id="gk" type="password" autocomplete="off" placeholder="Schlüssel 1 einfügen">'+
  '<p class="sub" style="margin-top:12px">Region</p><input class="txt" id="gr" value="swedencentral" autocomplete="off" autocapitalize="off">'+
  '<label class="note" style="display:flex;gap:8px;align-items:center;margin-top:12px"><input type="checkbox" id="gb" '+(a.zeichen<=480000?"checked":"")+'> Männer- und Frauenstimme</label></div>'+
  '<button class="btn" onclick="genStart()">Aufnahmen erzeugen</button>'+
  '<p class="note" id="gs" style="margin-top:10px">'+(msg||"")+'</p>');
}
function sleep(ms){ return new Promise(function(r){ setTimeout(r,ms); }); }
function status(t){ var e=document.getElementById("gs"); if(e) e.textContent=t; }

async function anfrage(key, region, voice, lang, liste){
  var ssml='<speak version="1.0" xml:lang="'+lang+'"><voice name="'+voice+'">'+
    liste.map(function(t){ return xml(t); }).join('<break time="2000ms"/>')+'</voice></speak>';
  for(var v=0; v<6; v++){
    var r=await fetch("https://"+region+".tts.speech.microsoft.com/cognitiveservices/v1",{method:"POST",
      headers:{"Ocp-Apim-Subscription-Key":key,"Content-Type":"application/ssml+xml","X-Microsoft-OutputFormat":"audio-24khz-48kbitrate-mono-mp3"},body:ssml});
    if(r.ok) return new Uint8Array(await r.arrayBuffer());
    if(r.status===429){ status("Azure bremst kurz … warte 60 Sekunden"); await sleep(60000); continue; }
    throw new Error("HTTP "+r.status+(r.status===401?" — Schlüssel oder Region stimmt nicht":""));
  }
  throw new Error("zu viele Wiederholungen");
}
window.genStart=async function(){
  var key=document.getElementById("gk").value.trim(), region=document.getElementById("gr").value.trim().toLowerCase(), beide=document.getElementById("gb").checked;
  if(!key) return status("Bitte zuerst den Schlüssel einfügen.");
  var o=nurNeu(texte()), lang={}; Object.keys(ttsAZ).forEach(function(c){ lang[ttsAZ[c].f]=ttsAZ[c].l; lang[ttsAZ[c].m]=ttsAZ[c].l; });
  var stimmen=Object.keys(o).filter(function(v){ return beide || Object.keys(ttsAZ).some(function(c){ return ttsAZ[c].f===v; }); });
  var jobs=[];
  stimmen.forEach(function(v){
    var hs=Object.keys(o[v]), buf=[], len=0;
    hs.forEach(function(h){
      var t=o[v][h];
      if(buf.length && (len+t.length>2200 || buf.length>=35)){ jobs.push({v:v, hs:buf}); buf=[]; len=0; }
      buf.push(h); len+=t.length;
    });
    if(buf.length) jobs.push({v:v, hs:buf});
  });
  var files=[], plan={};
  try{
    for(var i=0;i<jobs.length;i++){
      var j=jobs[i]; status("Aufnahme "+(i+1)+" von "+jobs.length+" · "+j.v);
      var t0=Date.now();
      var mp3=await anfrage(key, region, j.v, lang[j.v], j.hs.map(function(h){ return o[j.v][h]; }));
      var name="teile/"+j.v+"/"+i+".mp3";
      files.push({name:name, data:mp3}); plan[name]={voice:j.v, hashes:j.hs};
      var warte=3200-(Date.now()-t0); if(warte>0) await sleep(warte);
    }
  }catch(e){ return status("Abgebrochen: "+e.message+" — "+files.length+" Teile fertig. Nochmal starten geht."); }
  files.push({name:"plan.json", data:new TextEncoder().encode(JSON.stringify(plan))});
  var a=document.createElement("a"); a.href=URL.createObjectURL(zip(files)); a.download="sprint24-audio.zip"; document.body.appendChild(a); a.click();
  status("Fertig: "+jobs.length+" Aufnahmen. Die Datei sprint24-audio.zip liegt in deinen Downloads — sag Claude Bescheid.");
};
setTimeout(function(){ seite(""); }, 300);
})();
