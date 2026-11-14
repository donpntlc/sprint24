/* Profil — Name und Herkunft kommen vom Nutzer, nicht aus den Daten */
(function(){
var LAND={
 "schweiz":{pt:"Suíça",es:"Suiza",en:"Switzerland",fr:"Suisse",it:"Svizzera",ru:"Швейцария",sr:"Švajcarska",el:"Ελβετία"},
 "deutschland":{pt:"Alemanha",es:"Alemania",en:"Germany",fr:"Allemagne",it:"Germania",ru:"Германия",sr:"Nemačka",el:"Γερμανία"},
 "österreich":{pt:"Áustria",es:"Austria",en:"Austria",fr:"Autriche",it:"Austria",ru:"Австрия",sr:"Austrija",el:"Αυστρία"},
 "brasilien":{pt:"Brasil",es:"Brasil",en:"Brazil",fr:"Brésil",it:"Brasile",ru:"Бразилия",sr:"Brazil",el:"Βραζιλία"},
 "italien":{pt:"Itália",es:"Italia",en:"Italy",fr:"Italie",it:"Italia",ru:"Италия",sr:"Italija",el:"Ιταλία"}
};
var ZIEL=["Alemanha","Alemania","Germany","Allemagne","Germania","Германии","Nemačke","Γερμανία","Germanía"];
var NAMEN=["Alex","Aleks"];
var NAMEN_X=["Άλεξ","Алекс"];

function me(){ S.me=S.me||{}; return S.me; }
function landZiel(code){
  var m=me(); if(m.landZiel) return m.landZiel;
  var k=(m.land||"").toLowerCase().trim();
  return (LAND[k]&&LAND[k][code]) || m.land || "";
}
function esc(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"); }
function eff(){
  var m=me();
  return {name:m.name||"Alex", land:m.land||"Deutschland", stadt:m.stadt||"", landZiel:m.landZiel||""};
}
function landZ(code){
  var e=eff(); if(e.landZiel) return e.landZiel;
  var k=e.land.toLowerCase().trim();
  return (LAND[k]&&LAND[k][code]) || e.land;
}
function landDe(l){
  var mitArtikel={"schweiz":"der Schweiz","türkei":"der Türkei","ukraine":"der Ukraine","slowakei":"der Slowakei","niederlande":"den Niederlanden","usa":"den USA"};
  return mitArtikel[l.toLowerCase()]||l;
}
function ersetze(txt, code){
  if(!txt || typeof txt!=="string") return txt;
  var m=me(), s=txt;
  if(m.name){
    NAMEN.forEach(function(n){ s=s.replace(new RegExp("\\b"+esc(n)+"\\b","g"), m.name); });
    NAMEN_X.forEach(function(n){ s=s.split(n).join(m.name); });
  }
  if(m.stadt){ s=s.split("moro em \u2026").join("moro em "+m.stadt); }
  if(m.land && m.land.toLowerCase()!=="deutschland"){
    s=s.replace(/\baus Deutschland\b/g,"aus "+landDe(m.land)).replace(/\bDeutschland\b/g,m.land);
    var lz=landZ(code);
    if(lz) ZIEL.forEach(function(z){ s=s.split(z).join(lz); });
  }
  return s;
}
function feldCode(id){
  var map={pt:"pt",es:"es",en:"en",fr:"fr",it:"it",ru:"ru",sr:"sr",el:"el",gr:"el"};
  return map[id]||"de";
}
function persApply(){
  try{
    if(typeof RUBRIK_DATA==="undefined") return;
    Object.keys(RUBRIK_DATA).forEach(function(rid){
      var code=feldCode(rid), arr=RUBRIK_DATA[rid].chunks||[];
      arr.forEach(function(c){
        if(c._de0===undefined){ c._de0=c.de; c._pt0=c.pt; }
        c.de=ersetze(c._de0,"de"); c.pt=ersetze(c._pt0,code);
      });
    });
    Object.keys(RUBRIK_DATA).forEach(function(rid){
      var code=feldCode(rid), d=RUBRIK_DATA[rid];
      var ms=d.missions||{};
      Object.keys(ms).forEach(function(k){
        (ms[k].turns||[]).forEach(function(tn){
          if(tn._o===undefined) tn._o={said:tn.said, task:tn.task, model:tn.model};
          tn.said=ersetze(tn._o.said,code); tn.task=ersetze(tn._o.task,"de"); tn.model=ersetze(tn._o.model,code);
        });
      });
      (d.topics||[]).forEach(function(tp){
        if(tp._o===undefined) tp._o=(tp.hints||[]).slice();
        tp.hints=tp._o.map(function(h){ return ersetze(h,code); });
      });
    });
    if(typeof DLG!=="undefined"){
      Object.keys(DLG).forEach(function(rid){
        var code=feldCode(rid), d=DLG[rid];
        if(d._o===undefined){ d._o={open:d.open, opende:d.opende}; }
        d.open=ersetze(d._o.open,code); d.opende=ersetze(d._o.opende,"de");
        (d.scenes||[]).forEach(function(sc){
          (sc.turns||[]).forEach(function(t){
            if(t._o===undefined){ t._o={p:t.p,de:t.de,ask:t.ask,exp:t.exp,ok:t.ok,alt:(t.alt||[]).slice(),hints:(t.hints||[]).slice()}; }
            t.p=ersetze(t._o.p,code); t.de=ersetze(t._o.de,"de"); t.ask=ersetze(t._o.ask,"de");
            t.exp=ersetze(t._o.exp,code); t.ok=ersetze(t._o.ok,code);
            if(t._o.alt) t.alt=t._o.alt.map(function(a){ return ersetze(a,code); });
            if(t._o.hints&&t._o.hints.length) t.hints=t._o.hints.map(function(a){ return ersetze(a,code); });
          });
        });
      });
    }
    if(typeof applyRubrik==="function") applyRubrik();
  }catch(e){}
}

function profilMenu(erst){
  var m=me();
  render((erst?"":'<button class="back" onclick="settings()">‹ zurück</button>')+
  '<h2>'+(erst?"Kurz zu dir":"Dein Profil")+'</h2>'+
  '<p class="note" style="margin-bottom:14px">In vielen Sätzen kommt ein Name vor — „Ich habe eine Reservierung auf den Namen …" oder „Ich komme aus …". Damit du nicht fremde Angaben übst, setzt die App hier deine ein. Beides ist freiwillig und bleibt auf deinem Gerät.</p>'+
  '<div class="card">'+
    '<p class="sub">Dein Vorname</p>'+
    '<input class="txt" id="pName" autocapitalize="words" autocomplete="off" placeholder="Vorname eingeben" value="'+(m.name||"").replace(/"/g,"&quot;")+'">'+
    '<p class="sub" style="margin-top:16px">Woher du kommst</p>'+
    '<input class="txt" id="pLand" autocapitalize="words" autocomplete="off" placeholder="Land eingeben" value="'+(m.land||"").replace(/"/g,"&quot;")+'">'+
    '<p class="note" style="margin-top:8px">Schweiz, Deutschland, Österreich, Brasilien und Italien übersetzt die App automatisch mit. Bei anderen Ländern kannst du unten die Schreibweise in der Zielsprache ergänzen.</p>'+
    '<p class="sub" style="margin-top:16px">Deine Stadt <span style="text-transform:none;font-weight:400">(optional)</span></p>'+
    '<input class="txt" id="pStadt" autocapitalize="words" autocomplete="off" placeholder="Stadt eingeben" value="'+(m.stadt||"").replace(/"/g,"&quot;")+'">'+
    '<p class="sub" style="margin-top:16px">In der Zielsprache <span style="text-transform:none;font-weight:400">(optional)</span></p>'+
    '<input class="txt" id="pLandZ" autocapitalize="words" autocomplete="off" placeholder="nur falls nötig" value="'+(m.landZiel||"").replace(/"/g,"&quot;")+'">'+
  '</div>'+
  '<button class="btn" onclick="profilSave()">Speichern</button>'+
  (erst? '<button class="btn ghost" onclick="profilSkip()">Überspringen</button>'
       : '<button class="btn ghost" onclick="settings()">Abbrechen</button>'));
}
function profilSave(){
  var m=me();
  var g=function(id){ var el=document.getElementById(id); return el? el.value.trim() : ""; };
  m.name=g("pName"); m.land=g("pLand"); m.stadt=g("pStadt"); m.landZiel=g("pLandZ"); m.gefragt=true;
  save(); persApply();
  if(typeof home==="function") home();
}
function profilSkip(){ var m=me(); m.gefragt=true; save(); if(typeof home==="function") home(); }

window.profilMenu=profilMenu; window.profilSave=profilSave; window.profilSkip=profilSkip; window.persApply=persApply;

try{
  persApply();
  if(!me().gefragt) profilMenu(true);
}catch(e){}
})();
