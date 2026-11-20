/* Bildkarten — lernen ohne Deutsch: Bild sehen, Wort hören, Wort sagen */
(function(){
// Reihenfolge der Spalten: pt, es, en, fr, it, ru, sr, el
var W=[
["💧","a água","el agua","water","l'eau","l'acqua","вода · voda","voda","το νερό · to neró"],
["🍞","o pão","el pan","bread","le pain","il pane","хлеб · chleb","hleb","το ψωμί · to psomí"],
["☕","o café","el café","coffee","le café","il caffè","кофе · kofe","kafa","ο καφές · o kafés"],
["🥛","o leite","la leche","milk","le lait","il latte","молоко · moloko","mleko","το γάλα · to gála"],
["🍎","a maçã","la manzana","apple","la pomme","la mela","яблоко · jabloko","jabuka","το μήλο · to mílo"],
["🍌","a banana","el plátano","banana","la banane","la banana","банан · banan","banana","η μπανάνα · i banána"],
["🥚","o ovo","el huevo","egg","l'œuf","l'uovo","яйцо · jajzo","jaje","το αυγό · to avgó"],
["🧀","o queijo","el queso","cheese","le fromage","il formaggio","сыр · syr","sir","το τυρί · to tirí"],
["🐟","o peixe","el pez","fish","le poisson","il pesce","рыба · ryba","riba","το ψάρι · to psári"],
["🥩","a carne","la carne","meat","la viande","la carne","мясо · mjaso","meso","το κρέας · to kréas"],
["🍚","o arroz","el arroz","rice","le riz","il riso","рис · ris","pirinač","το ρύζι · to rízi"],
["🏠","a casa","la casa","house","la maison","la casa","дом · dom","kuća","το σπίτι · to spíti"],
["🚪","a porta","la puerta","door","la porte","la porta","дверь · dwer","vrata","η πόρτα · i pórta"],
["🛏️","a cama","la cama","bed","le lit","il letto","кровать · krowat","krevet","το κρεβάτι · to kreváti"],
["🪑","a cadeira","la silla","chair","la chaise","la sedia","стул · stul","stolica","η καρέκλα · i karékla"],
["🔑","a chave","la llave","key","la clé","la chiave","ключ · kljutsch","ključ","το κλειδί · to klidí"],
["📖","o livro","el libro","book","le livre","il libro","книга · kniga","knjiga","το βιβλίο · to vivlío"],
["📱","o celular","el móvil","phone","le portable","il cellulare","телефон · telefon","telefon","το κινητό · to kinitó"],
["💵","o dinheiro","el dinero","money","l'argent","i soldi","деньги · dengi","novac","τα λεφτά · ta leftá"],
["🚗","o carro","el coche","car","la voiture","la macchina","машина · maschina","auto","το αυτοκίνητο · to aftokínito"],
["🚌","o ônibus","el autobús","bus","le bus","l'autobus","автобус · awtobus","autobus","το λεωφορείο · to leoforío"],
["🚆","o trem","el tren","train","le train","il treno","поезд · pojesd","voz","το τρένο · to tréno"],
["✈️","o avião","el avión","plane","l'avion","l'aereo","самолёт · samoljot","avion","το αεροπλάνο · to aeropláno"],
["🚲","a bicicleta","la bicicleta","bicycle","le vélo","la bicicletta","велосипед · welosiped","bicikl","το ποδήλατο · to podílato"],
["☀️","o sol","el sol","sun","le soleil","il sole","солнце · solnze","sunce","ο ήλιος · o ílios"],
["🌙","a lua","la luna","moon","la lune","la luna","луна · luna","mesec","το φεγγάρι · to fengári"],
["🌧️","a chuva","la lluvia","rain","la pluie","la pioggia","дождь · doschd","kiša","η βροχή · i vrochí"],
["🌳","a árvore","el árbol","tree","l'arbre","l'albero","дерево · derewo","drvo","το δέντρο · to déntro"],
["🌸","a flor","la flor","flower","la fleur","il fiore","цветок · zwetok","cvet","το λουλούδι · to louloúdi"],
["🐕","o cachorro","el perro","dog","le chien","il cane","собака · sobaka","pas","ο σκύλος · o skílos"],
["🐈","o gato","el gato","cat","le chat","il gatto","кошка · koschka","mačka","η γάτα · i gáta"],
["🐦","o pássaro","el pájaro","bird","l'oiseau","l'uccello","птица · ptiza","ptica","το πουλί · to poulí"],
["🐎","o cavalo","el caballo","horse","le cheval","il cavallo","лошадь · loschad","konj","το άλογο · to álogo"],
["🐄","a vaca","la vaca","cow","la vache","la mucca","корова · korowa","krava","η αγελάδα · i ageláda"],
["✋","a mão","la mano","hand","la main","la mano","рука · ruka","ruka","το χέρι · to chéri"],
["👁️","o olho","el ojo","eye","l'œil","l'occhio","глаз · glas","oko","το μάτι · to máti"],
["👂","a orelha","la oreja","ear","l'oreille","l'orecchio","ухо · ucho","uvo","το αυτί · to aftí"],
["👄","a boca","la boca","mouth","la bouche","la bocca","рот · rot","usta","το στόμα · to stóma"],
["❤️","o coração","el corazón","heart","le cœur","il cuore","сердце · serdze","srce","η καρδιά · i kardiá"],
["👨","o homem","el hombre","man","l'homme","l'uomo","мужчина · muschtschina","muškarac","ο άντρας · o ántras"],
["👩","a mulher","la mujer","woman","la femme","la donna","женщина · schenschtschina","žena","η γυναίκα · i jinéka"],
["🧒","a criança","el niño","child","l'enfant","il bambino","ребёнок · rebjonok","dete","το παιδί · to pedí"],
["🏫","a escola","la escuela","school","l'école","la scuola","школа · schkola","škola","το σχολείο · to scholío"],
["🏥","o hospital","el hospital","hospital","l'hôpital","l'ospedale","больница · bolniza","bolnica","το νοσοκομείο · to nosokomío"],
["⛪","a igreja","la iglesia","church","l'église","la chiesa","церковь · zerkow","crkva","η εκκλησία · i ekklisía"],
["🏖️","a praia","la playa","beach","la plage","la spiaggia","пляж · pljasch","plaža","η παραλία · i paralía"],
["⛰️","a montanha","la montaña","mountain","la montagne","la montagna","гора · gora","planina","το βουνό · to vounó"],
["🌊","o mar","el mar","sea","la mer","il mare","море · more","more","η θάλασσα · i thálassa"],
["🕰️","o relógio","el reloj","clock","l'horloge","l'orologio","часы · tschasy","sat","το ρολόι · to rolói"],
["👞","o sapato","el zapato","shoe","la chaussure","la scarpa","ботинок · botinok","cipela","το παπούτσι · to papútsi"],
["👓","os óculos","las gafas","glasses","les lunettes","gli occhiali","очки · otschki","naočare","τα γυαλιά · ta jaliá"],
["👜","a bolsa","el bolso","bag","le sac","la borsa","сумка · sumka","torba","η τσάντα · i tsánta"],
["⚽","a bola","la pelota","ball","le ballon","la palla","мяч · mjatsch","lopta","η μπάλα · i bála"]
];
var SP={pt:1,es:2,en:3,fr:4,it:5,ru:6,sr:7,el:8};
var DE=["das Wasser","das Brot","der Kaffee","die Milch","der Apfel","die Banane","das Ei","der Käse","der Fisch","das Fleisch","der Reis","das Haus","die Tür","das Bett","der Stuhl","der Schlüssel","das Buch","das Handy","das Geld","das Auto","der Bus","der Zug","das Flugzeug","das Fahrrad","die Sonne","der Mond","der Regen","der Baum","die Blume","der Hund","die Katze","der Vogel","das Pferd","die Kuh","die Hand","das Auge","das Ohr","der Mund","das Herz","der Mann","die Frau","das Kind","die Schule","das Krankenhaus","die Kirche","der Strand","der Berg","das Meer","die Uhr","der Schuh","die Brille","die Tasche","der Ball"];
function deModus(){ return S.bildDe||"tippen"; }
function deZeile(i){
  var m=deModus(); if(m==="aus") return "";
  if(m==="zeigen") return '<p class="note" style="text-align:center;margin:6px 0 0">🇩🇪 '+DE[i]+'</p>';
  return '<p class="note" style="text-align:center;margin:6px 0 0;display:none">🇩🇪 '+DE[i]+'</p>'+
    '<button class="btn ghost sm" style="margin-top:8px" onclick="this.previousElementSibling.style.display=\'block\';this.remove()">Auf Deutsch zeigen</button>';
}
function bildDeSet(m){ S.bildDe=m; save(); bildMenu(); }

function da(){ return !!SP[S.rubrik]; }
function wort(i){ return W[i][SP[S.rubrik]]; }
function nur(t){ return String(t).split(" · ")[0]; }
function um(t){ var p=String(t).split(" · "); return p[1]||""; }
function box(){ S.bild=S.bild||{}; S.bild[S.rubrik]=S.bild[S.rubrik]||{}; return S.bild[S.rubrik]; }
function stufe(i){ return box()[i]||0; }
function mische(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function sag(t){ try{ speak(nur(t)); }catch(e){} }

var B=null;
function bildMenu(){
  if(!da()) return home();
  var b=box(), sitzt=0, gesehen=0;
  W.forEach(function(w,i){ if((b[i]||0)>=3) sitzt++; if(b[i]!==undefined) gesehen++; });
  render('<button class="back" onclick="home()">‹ zurück</button><h2>Bildkarten</h2>'+
  '<p class="note" style="margin-bottom:14px">Kein Deutsch: Du siehst ein Bild, hörst das Wort und sagst es selbst. So verknüpft sich das neue Wort direkt mit der Sache — nicht mit der Übersetzung im Kopf.</p>'+
  '<div class="card" style="padding:14px 16px"><p class="sub">Stand</p><p style="margin:6px 0 0;font-weight:700">'+sitzt+' von '+W.length+' Wörtern sitzen · '+gesehen+' schon gesehen</p></div>'+
  '<button class="tile" onclick="bildStart(12)" style="border-color:var(--accent)"><span class="ic">🖼️</span><span>Runde starten<small>12 Aufgaben · neue Wörter kommen in kleinen Portionen dazu</small></span><span class="chev">›</span></button>'+
  '<button class="tile" onclick="bildStart(24)"><span class="ic">🔥</span><span>Lange Runde<small>24 Aufgaben</small></span><span class="chev">›</span></button>'+
  '<p class="sub" style="margin-top:16px">Deutsch nach der Lösung</p>'+
  '<div class="row" style="gap:8px;margin-top:6px">'+[["zeigen","immer zeigen"],["tippen","auf Antippen"],["aus","nie"]].map(function(o){ var on=deModus()===o[0];
    return '<button class="btn ghost sm" style="flex:1;margin:0;'+(on?"border-color:var(--accent);color:var(--accent)":"")+'" onclick="bildDeSet(\''+o[0]+'\')">'+o[1]+'</button>'; }).join("")+'</div>'+
  '<p class="note" style="margin-top:14px">Aufgaben: Bild sehen und Wort hören · Bild sehen und Wort wählen · Wort hören und Bild wählen · Bild sehen und das Wort eintippen oder sprechen — die App prüft.</p>');
}
function auswahl(n){
  var b=box(), alt=[], neu=[];
  W.forEach(function(w,i){ if(b[i]===undefined) neu.push(i); else if(b[i]<5) alt.push(i); });
  var aktiv=alt.slice(); var nachschub=neu.slice(0, Math.max(0, 6-alt.filter(function(i){ return b[i]<3; }).length));
  nachschub=nachschub.slice(0,5);
  var aufgaben=[];
  nachschub.forEach(function(i){ aufgaben.push({i:i, typ:"neu"}); });
  var pool=aktiv.concat(nachschub);
  if(!pool.length) pool=W.map(function(w,i){ return i; });
  while(aufgaben.length<n){
    var i=pool[Math.floor(Math.random()*pool.length)], s=b[i]||0;
    var typen = s<1 ? ["wort","hoer"] : s<3 ? ["wort","hoer","sag"] : ["hoer","sag","sag"];
    aufgaben.push({i:i, typ:typen[Math.floor(Math.random()*typen.length)]});
  }
  var neuA=aufgaben.slice(0,nachschub.length), rest=mische(aufgaben.slice(nachschub.length));
  // neue Wörter: erst zeigen, dann später abfragen
  return neuA.concat(rest).slice(0, Math.max(n, neuA.length+4));
}
function bildStart(n){ B={q:auswahl(n), k:0, ok:0, fb:null, wahl:null}; bildKarte(); }
function kopf(){
  var p=Math.round(B.k/B.q.length*100);
  return '<button class="back" onclick="bildMenu()">‹ abbrechen</button><div class="bar" style="margin-bottom:16px"><i style="width:'+p+'%"></i></div>';
}
function gross(e){ return '<div style="font-size:96px;line-height:1.1;text-align:center;margin:10px 0 6px">'+e+'</div>'; }
function bildKarte(){
  if(B.k>=B.q.length) return bildEnde();
  var a=B.q[B.k], i=a.i, w=wort(i);
  if(!B.opt && (a.typ==="wort"||a.typ==="hoer")){
    var andere=mische(W.map(function(x,j){ return j; }).filter(function(j){ return j!==i; })).slice(0,3);
    B.opt=mische([i].concat(andere));
  }
  var body="";
  if(a.typ==="neu"){
    body='<div class="card">'+gross(W[i][0])+
      '<p class="prompt" style="text-align:center">'+nur(w)+'</p>'+(um(w)?'<p class="note" style="text-align:center">'+um(w)+'</p>':'')+
      deZeile(i)+
      '<button class="btn ghost" onclick="bildHoer()">🔊 nochmal hören</button>'+
      '<p class="note" style="text-align:center">Neues Wort. Anschauen, hören, laut nachsagen.</p></div>'+
      '<button class="btn" onclick="bildNext(1)">Gesagt — weiter</button>';
  } else if(a.typ==="wort"){
    body='<div class="card">'+gross(W[i][0])+'<p class="sub" style="text-align:center">Wie heisst das?</p></div>'+
      B.opt.map(function(j,k){
        var st="", r=j===i;
        if(B.fb && r) st="border-color:var(--accent);background:rgba(143,214,169,.12)";
        else if(B.fb && B.wahl===k) st="border-color:var(--bad);background:rgba(235,128,115,.12)";
        else if(B.wahl===k) st="border-color:var(--accent)";
        return '<button class="tile" style="'+st+'" onclick="bildWahl('+k+')"><span class="ic">🔊</span><span>'+nur(wort(j))+'</span></button>';
      }).join("")+
      (B.fb? '' : '<button class="btn" '+(B.wahl==null?'disabled style="opacity:.4"':'')+' onclick="bildCheck()">Prüfen</button>');
  } else if(a.typ==="hoer"){
    body='<div class="card" style="text-align:center"><p class="sub">Was hörst du?</p><button class="btn ghost" onclick="bildHoer()">🔊 abspielen</button></div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+B.opt.map(function(j,k){
        var st="", r=j===i;
        if(B.fb && r) st="border-color:var(--accent);background:rgba(143,214,169,.12)";
        else if(B.fb && B.wahl===k) st="border-color:var(--bad);background:rgba(235,128,115,.12)";
        else if(B.wahl===k) st="border-color:var(--accent)";
        return '<button class="card" style="margin:0;font-size:56px;text-align:center;cursor:pointer;'+st+'" onclick="bildWahl('+k+')">'+W[j][0]+'</button>';
      }).join("")+'</div>'+
      (B.fb? '' : '<button class="btn" '+(B.wahl==null?'disabled style="opacity:.4"':'')+' onclick="bildCheck()">Prüfen</button>');
  } else { // sag
    body='<div class="card">'+gross(W[i][0])+'<p class="sub" style="text-align:center">Wie heisst das? Tippen oder sprechen</p>'+
      (B.fb? '' : afFeld(w, bildSagFertig))+'</div>';
  }
  if(B.fb && a.typ==="sag") body+='<div class="card" style="border-color:var(--'+(B.fb.ok?"accent":"bad")+')">'+
    '<div style="font-size:44px;text-align:center">'+W[i][0]+'</div>'+afErgebnis(B.fb.res, nur(w), (um(w)?'<p class="note">'+um(w)+'</p>':'')+deZeile(i))+
    '<button class="btn ghost sm" onclick="bildHoer()">🔊 anhören</button><button class="btn" onclick="bildNext('+(B.fb.ok?1:0)+')">Weiter</button></div>';
  else if(B.fb) body+='<div class="card" style="border-color:var(--'+(B.fb.ok?"accent":"bad")+')"><p style="margin:0 0 4px;font-weight:800;color:var(--'+(B.fb.ok?"accent":"bad")+')">'+(B.fb.ok?"Richtig.":"Nicht ganz.")+'</p>'+
    '<p class="prompt" style="margin:0">'+W[i][0]+' '+nur(w)+'</p>'+deZeile(i)+'<button class="btn" onclick="bildNext('+(B.fb.ok?1:0)+')">Weiter</button></div>';
  render(kopf()+body);
  if(!B.fb && !B.gespielt && (a.typ==="neu"||a.typ==="hoer")){ B.gespielt=true; setTimeout(function(){ sag(w); }, 250); }
}
function bildHoer(){ sag(wort(B.q[B.k].i)); }
function bildWahl(k){
  var a=B.q[B.k];
  if(a.typ==="wort") sag(wort(B.opt[k]));
  if(B.fb) return;
  B.wahl=k; bildKarte();
}
function bildCheck(){
  if(B.wahl==null) return;
  var a=B.q[B.k], ok=B.opt[B.wahl]===a.i;
  B.fb={ok:ok};
  if(!ok || a.typ==="hoer") sag(wort(a.i));
  bildKarte();
}
function bildSagFertig(res){ B.fb={ok:afGut(res), res:res}; sag(wort(B.q[B.k].i)); bildKarte(); }
function bildZeig(){ B.zeig=true; sag(wort(B.q[B.k].i)); bildKarte(); }
function bildNext(ok){
  var a=B.q[B.k], b=box();
  if(a.typ==="neu") b[a.i]=b[a.i]||0;
  else if(ok){ B.ok++; b[a.i]=Math.min(5,(b[a.i]||0)+1); }
  else { b[a.i]=0; B.q.push({i:a.i, typ:"wort"}); }
  S.said++; save();
  B.k++; B.opt=null; B.wahl=null; B.fb=null; B.zeig=false; B.gespielt=false;
  bildKarte();
}
function bildEnde(){
  var n=B.q.filter(function(a){ return a.typ!=="neu"; }).length;
  render('<div class="card"><h2>Runde fertig</h2><p class="big">'+B.ok+' / '+n+'</p></div>'+
    '<button class="btn" onclick="bildStart(12)">Noch eine Runde</button><button class="btn ghost" onclick="home()">Zurück</button>');
  B=null;
}
window.bildMenu=bildMenu; window.bildDeSet=bildDeSet; window.bildStart=bildStart; window.bildHoer=bildHoer; window.bildWahl=bildWahl;
window.bildCheck=bildCheck; window.bildZeig=bildZeig; window.bildNext=bildNext; window.bildDa=da;
window.BILD_WOERTER=W; window.BILD_SP=SP;
})();
