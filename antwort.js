/* Antwortfeld — eintippen ODER sprechen, anzeigen, bestätigen. Die App bewertet, nicht du selbst. */
(function(){
var AF=null;
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;"); }
function micDa(){ try{ return typeof micOK==="function" && micOK(); }catch(e){ return false; } }

/* target: erwartete Antwort · cb: function(res) mit res={v:"ok"|"near"|"no", heard, skip} */
function afFeld(target, cb, ph, o){
  o=o||{}; var mic=micDa() && !o.noMic;
  AF={target:target, cb:cb, mic:null, fertig:false};
  return '<div style="margin-top:12px">'+
    '<input class="txt" id="afIn" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" placeholder="'+esc(ph||(mic?"eintippen oder 🎤 sprechen":"Antwort eintippen"))+'">'+
    '<p class="note" id="afSt" style="text-align:center;margin:6px 0 0;min-height:18px"></p>'+
    '<div style="display:flex;gap:8px;margin-top:6px">'+
      (mic?'<button class="btn ghost" style="flex:1;margin:0" onclick="afMic()">🎤 Sprechen</button>':'')+
      '<button class="btn" style="flex:1;margin:0" onclick="afGo()">Prüfen</button>'+
    '</div>'+
    '<button class="btn ghost sm" style="margin-top:8px" onclick="afWeissNicht()">Weiss ich nicht</button>'+
  '</div>';
}
function afMic(){
  if(!AF||AF.fertig) return;
  listen(AF.target, function(r){
    if(!r||!AF) return;
    AF.mic=r;
    var i=document.getElementById("afIn"); if(i) i.value=r.heard;
    var st=document.getElementById("afSt"); if(st) st.textContent="Gehört — stimmt das? Dann „Prüfen“.";
  }, "afSt");
}
function afGo(){
  if(!AF||AF.fertig) return;
  var i=document.getElementById("afIn"), v=(i&&i.value||"").trim();
  if(!v){ var st=document.getElementById("afSt"); if(st) st.textContent="Erst eintippen oder sprechen."; return; }
  var r = (AF.mic && AF.mic.heard===v) ? AF.mic : judge([v], AF.target);
  r={v:r.v, heard:v, typed:!(AF.mic && AF.mic.heard===v)};
  AF.fertig=true; AF.cb(r);
}
/* Zeit abgelaufen: was im Feld steht, wird bewertet; leer = falsch */
function afZeitUm(){
  if(!AF||AF.fertig) return false;
  var i=document.getElementById("afIn"), v=(i&&i.value||"").trim();
  try{ stopListen(); }catch(e){}
  if(v) { afGo(); return true; }
  AF.fertig=true; AF.cb({v:"no", heard:"", skip:true, zeit:true}); return true;
}
function afWeissNicht(){ if(!AF||AF.fertig) return; AF.fertig=true; AF.cb({v:"no", heard:"", skip:true}); }

/* Ergebnis-Kasten */
function afErgebnis(res, target, extra){
  var farbe=res.v==="ok"?"accent":res.v==="near"?"mid":"bad";
  var titel=res.v==="ok"?"Richtig ✓":res.v==="near"?"Fast richtig — achte auf die genaue Form":(res.zeit?"Zeit um":res.skip?"Lösung":"Falsch");
  return '<p style="margin:0 0 6px;font-weight:800;color:var(--'+farbe+')">'+titel+'</p>'+
    (res.heard?'<p class="note" style="margin:0 0 6px">Deine Antwort: „'+esc(res.heard)+'“</p>':'')+
    '<p class="answer">'+(res.heard&&res.v!=="ok"&&typeof wordDiff==="function"?wordDiff(res.heard,target):target)+'</p>'+(extra||"");
}
function afGut(res){ return res.v==="ok"||res.v==="near"; }

document.addEventListener("keydown",function(e){ if(e.key==="Enter" && e.target && e.target.id==="afIn"){ e.preventDefault(); afGo(); } });

window.afFeld=afFeld; window.afMic=afMic; window.afGo=afGo; window.afWeissNicht=afWeissNicht;
window.afZeitUm=afZeitUm; window.afErgebnis=afErgebnis; window.afGut=afGut;
})();
