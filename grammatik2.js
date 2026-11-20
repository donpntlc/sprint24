/* Grammatik, Teil 2: Schrift & Aussprache, Verbtabellen und Verben-Trainer für alle Sprachen */
(function(){
var G=window.GRAM; if(!G) return;
function T(kopf, zeilen){ // kleine Tabelle bauen
  return '<table class="gt"><tr>'+kopf.map(function(k){ return '<th>'+k+'</th>'; }).join("")+'</tr>'+
    zeilen.map(function(z){ return '<tr>'+z.map(function(c){ return '<td>'+c+'</td>'; }).join("")+'</tr>'; }).join("")+'</table>';
}
function vorne(sp, lektionen){ G[sp]=lektionen.concat(G[sp]); }
function ersetze(sp, titelStart, neu){ var i=G[sp].findIndex(function(l){ return l.t.indexOf(titelStart)===0; }); if(i<0) G[sp]=G[sp].concat(neu); else G[sp].splice.apply(G[sp],[i,1].concat(neu)); }

/* ---------------- Portugiesisch (Brasilien) ---------------- */
vorne("pt",[{t:"Alphabet & Aussprache", ic:"🗣️",
 text:"Das Alphabet ist fast wie im Deutschen — aber einige Buchstaben klingen anders. Wer diese Regeln kennt, kann jedes Wort richtig vorlesen, auch ohne es zu kennen.",
 tab:T(["Schrift","klingt wie","Beispiel"],[
  ["ã, õ, -ão","durch die Nase (nasal)","não, pão, mãe"],
  ["ç","ss","maçã, açúcar"],
  ["lh","lj (wie in „Million“)","trabalho, filho"],
  ["nh","nj (wie in „Cognac“)","amanhã, banho"],
  ["r am Anfang, rr","hartes h (Rachen)","Rio, carro"],
  ["r zwischen Vokalen","kurz getippt","caro, para"],
  ["de, te (am Ende, vor i)","dschi, tschi","cidade, leite, noite"],
  ["o am Wortende","u","obrigado → obrigadu"],
  ["e am Wortende","i","leite → leitschi"],
  ["l am Silbenende","u","Brasil → Brasiu"],
  ["j, g vor e/i","weiches sch (wie „Garage“)","já, gente"],
  ["x","meist sch","peixe, xícara"],
  ["h","stumm","hotel → otel"]]),
 merk:"Akzente zeigen die Betonung: <b>á é í ó ú</b> sind betont und offen, <b>â ê ô</b> betont und geschlossen. Ohne Akzent liegt die Betonung meist auf der vorletzten Silbe.",
 bsp:[["não","nein (nasal)"],["obrigado","danke (Ende wie u)"],["cidade","Stadt (dschi am Ende)"],["trabalho","Arbeit (lh = lj)"],["amanhã","morgen (nh = nj)"],["carro","Auto (rr = hartes h)"]],
 q:[{f:"Wie klingt <b>ç</b> in „maçã“?",o:["wie k","wie ss","wie tsch"],a:1,w:"ç klingt immer wie ss."},
    {f:"Wie spricht man „leite“ (Milch) in Brasilien?",o:["leite","leitschi","leide"],a:1,w:"te am Wortende wird zu tschi."},
    {f:"Wie klingt <b>lh</b> in „filho“?",o:["wie lj","wie l-h","wie ch"],a:0,w:"lh klingt wie lj."}]}]);

/* ---------------- Spanisch ---------------- */
vorne("es",[{t:"Alphabet & Aussprache", ic:"🗣️",
 text:"Spanisch spricht man fast so, wie man es schreibt. Ein paar Buchstaben musst du aber neu lernen.",
 tab:T(["Schrift","klingt wie","Beispiel"],[
  ["j, g vor e/i","ch wie in „Bach“","jamón, gente"],
  ["ñ","nj","mañana, España"],
  ["ll, y","j (je nach Region auch dsch)","calle, yo"],
  ["c vor e/i, z","Spanien: wie engl. th · Lateinamerika: s","cena, zapato"],
  ["qu","k","queso"],
  ["h","stumm","hola → ola"],
  ["v","wie b","vino"],
  ["r am Anfang, rr","stark gerollt","perro, Roma"]]),
 merk:"Ein Akzent zeigt die betonte Silbe: <b>café</b>, <b>teléfono</b>. Fragen und Ausrufe beginnen mit umgedrehtem Zeichen: <b>¿…?</b> <b>¡…!</b>",
 bsp:[["jamón","Schinken (j = ch)"],["mañana","morgen (ñ = nj)"],["queso","Käse (qu = k)"],["hola","hallo (h stumm)"],["perro","Hund (rr gerollt)"]],
 q:[{f:"Wie klingt <b>j</b> in „jamón“?",o:["wie j in „ja“","wie ch in „Bach“","wie dsch"],a:1,w:"j ist im Spanischen ein Rachen-ch."},
    {f:"Wie klingt „hola“?",o:["hola mit h","ola — h ist stumm"],a:1,w:"h wird nie gesprochen."}]}]);
ersetze("es","Verben im Präsens",[
 {t:"Verben im Präsens: -ar, -er, -ir", ic:"⚙️", text:"Drei Gruppen, erkennbar an der Grundform. Endung weg, neue Endung dran. Das Personalpronomen lässt man meist weg — die Endung zeigt die Person.",
  tab:T(["","-ar <small>hablar</small>","-er <small>comer</small>","-ir <small>vivir</small>"],[
   ["yo","habl<b>o</b>","com<b>o</b>","viv<b>o</b>"],["tú","habl<b>as</b>","com<b>es</b>","viv<b>es</b>"],["él · ella · usted","habl<b>a</b>","com<b>e</b>","viv<b>e</b>"],
   ["nosotros","habl<b>amos</b>","com<b>emos</b>","viv<b>imos</b>"],["vosotros","habl<b>áis</b>","com<b>éis</b>","viv<b>ís</b>"],["ellos · ustedes","habl<b>an</b>","com<b>en</b>","viv<b>en</b>"]]),
  merk:"ich = immer <b>-o</b>. -ar hat ein <b>a</b> in der Endung, -er und -ir ein <b>e</b>. Nur bei wir/ihr unterscheidet sich -ir: <b>-imos, -ís</b>.",
  bsp:[["hablo / hablas","ich spreche / du sprichst"],["comemos / coméis","wir essen / ihr esst"],["vive / viven","er lebt / sie leben"]],
  q:[{f:"<b>trabajar</b> (-ar): „wir arbeiten“",o:["trabajemos","trabajamos","trabajan"],a:1,w:"-ar + nosotros → -amos."},{f:"<b>beber</b> (-er): „du trinkst“",o:["bebas","bebes","bebe"],a:1,w:"-er + tú → -es."}]},
 {t:"Die wichtigsten unregelmässigen Verben", ic:"⭐", text:"Diese Verben brauchst du ständig — als Block lernen.",
  tab:T(["","yo","tú","él","nosotros","ellos"],[["ser <small>sein</small>","soy","eres","es","somos","son"],["estar <small>sein</small>","estoy","estás","está","estamos","están"],["tener <small>haben</small>","tengo","tienes","tiene","tenemos","tienen"],["ir <small>gehen</small>","voy","vas","va","vamos","van"],["hacer <small>machen</small>","hago","haces","hace","hacemos","hacen"],["poder <small>können</small>","puedo","puedes","puede","podemos","pueden"],["querer <small>wollen</small>","quiero","quieres","quiere","queremos","quieren"]]),
  merk:"Zukunft ganz einfach: <b>ir a</b> + Grundform — <b>voy a comer</b> = ich werde essen.",
  bsp:[["Tengo tiempo.","Ich habe Zeit."],["Vamos a la playa.","Wir gehen an den Strand."],["¿Puedes ayudarme?","Kannst du mir helfen?"]],
  q:[{f:"„ich habe“",o:["teno","tengo","tiene"],a:1,w:"tener: yo tengo."},{f:"„wir gehen“",o:["vamos","imos","van"],a:0,w:"ir: nosotros vamos."}]}]);

/* ---------------- Englisch ---------------- */
vorne("en",[{t:"Aussprache: Schrift ≠ Klang", ic:"🗣️",
 text:"Im Englischen klingt vieles anders, als es geschrieben ist. Ein paar Regeln helfen sehr.",
 tab:T(["Schrift","klingt wie","Beispiel"],[
  ["th","Zunge zwischen die Zähne (stimmlos oder stimmhaft)","think, this"],
  ["w","kurzes u, Lippen rund","water, we"],
  ["v","wie deutsches w","very"],
  ["r","nicht gerollt, Zunge hinten","red"],
  ["stummes e am Ende","macht den Vokal davor lang","mak<b>e</b>, tim<b>e</b>"],
  ["-ed","t, d oder id","worked = workt, wanted = wantid"]]),
 merk:"Lerne neue Wörter immer mit dem Klang, nicht nur geschrieben — die Schreibung allein verrät die Aussprache oft nicht.",
 bsp:[["think","denken (th stimmlos)"],["this","dies (th stimmhaft)"],["water","Wasser (w = u)"],["very","sehr (v = w)"],["worked","arbeitete (-ed = t)"]],
 q:[{f:"Wie klingt <b>v</b> in „very“?",o:["wie f","wie deutsches w"],a:1,w:"englisches v = deutsches w."},{f:"Wie klingt „worked“?",o:["work-ed","workt"],a:1,w:"-ed nach k klingt wie t."}]}]);
ersetze("en","Er arbeitet",[
 {t:"Verben: Gegenwart und Vergangenheit", ic:"⚙️", text:"Englische Verben sind einfach: Im Präsens ändert sich nur he/she/it (+s). Die Vergangenheit bildet man meist mit <b>-ed</b> — ausser bei den unregelmässigen.",
  tab:T(["","Präsens","Vergangenheit"],[["I · you · we · they","work","work<b>ed</b>"],["he · she · it","work<b>s</b>","work<b>ed</b>"],["be <small>sein</small>","am · is · are","was · were"],["have <small>haben</small>","have · <b>has</b>","had"],["go <small>gehen</small>","go · <b>goes</b>","went"],["do <small>tun</small>","do · <b>does</b>","did"],["see <small>sehen</small>","see · sees","saw"],["eat <small>essen</small>","eat · eats","ate"]]),
  merk:"Fragen und Nein brauchen <b>do/does/did</b>: Do you …? · She doesn't … · Did you …?",
  bsp:[["She works here.","Sie arbeitet hier."],["I went home.","Ich ging nach Hause."],["Did you see it?","Hast du es gesehen?"]],
  q:[{f:"„Er hat ein Auto.“",o:["He have a car.","He has a car."],a:1,w:"he/she/it: has."},{f:"„Ich ging“",o:["I goed","I went"],a:1,w:"go ist unregelmässig: went."}]}]);

/* ---------------- Französisch ---------------- */
vorne("fr",[{t:"Alphabet & Aussprache", ic:"🗣️",
 text:"Französisch schreibt viel mehr, als man spricht. Mit diesen Regeln kannst du fast alles richtig vorlesen.",
 tab:T(["Schrift","klingt wie","Beispiel"],[
  ["Endkonsonanten","meist stumm","peti<b>t</b>, pari<b>s</b>"],
  ["u","ü","tu, rue"],["ou","u","vous, rouge"],["oi","wa","moi, trois"],["au, eau","o","eau, chaud"],
  ["an, en · on · in","durch die Nase (nasal)","enfant, bon, vin"],["ch","sch","chat"],["j, g vor e/i","weiches sch","je, rouge"],
  ["é · è/ê","geschlossenes e · offenes ä","café · mère"],["h","stumm","hôtel"],["r","im Rachen","merci"]]),
 merk:"<b>Liaison</b>: Ein stummer Endbuchstabe wird gesprochen, wenn das nächste Wort mit Vokal beginnt: les amis → „le-sa-mi“.",
 bsp:[["merci","danke"],["trois","drei (oi = wa)"],["vous","Sie/ihr (ou = u)"],["bon vin","guter Wein (nasal)"],["les amis","die Freunde (Liaison)"]],
 q:[{f:"Wie klingt <b>oi</b> in „moi“?",o:["oi","wa","ö"],a:1,w:"oi = wa."},{f:"Wird das t in „petit“ gesprochen?",o:["ja","nein, stumm"],a:1,w:"Endkonsonanten sind meist stumm."}]}]);
ersetze("fr","Verben auf -er",[
 {t:"Verben im Präsens: -er, -ir, -re", ic:"⚙️", text:"Die grosse Gruppe sind Verben auf <b>-er</b> — fast alle regelmässig. Dazu kommen -ir (wie finir) und -re (wie vendre). Viele Formen werden geschrieben verschieden, klingen aber gleich.",
  tab:T(["","-er <small>parler</small>","-ir <small>finir</small>","-re <small>vendre</small>"],[
   ["je","parl<b>e</b>","fin<b>is</b>","vend<b>s</b>"],["tu","parl<b>es</b>","fin<b>is</b>","vend<b>s</b>"],["il · elle","parl<b>e</b>","fin<b>it</b>","vend"],
   ["nous","parl<b>ons</b>","fin<b>issons</b>","vend<b>ons</b>"],["vous","parl<b>ez</b>","fin<b>issez</b>","vend<b>ez</b>"],["ils · elles","parl<b>ent</b>","fin<b>issent</b>","vend<b>ent</b>"]]),
  merk:"Bei -er klingen je, tu, il und ils gleich: parle · parles · parle · parlent — das -ent am Ende ist stumm. Vor Vokal wird je zu <b>j'</b>: j'aime.",
  bsp:[["je parle / nous parlons","ich spreche / wir sprechen"],["vous parlez","Sie sprechen"],["j'aime","ich mag"]],
  q:[{f:"<b>habiter</b> (-er): „wir wohnen“",o:["nous habitez","nous habitons"],a:1,w:"nous → -ons."},{f:"<b>aimer</b>: „ich mag“",o:["je aime","j'aime"],a:1,w:"je vor Vokal → j'."}]},
 {t:"Die wichtigsten unregelmässigen Verben", ic:"⭐", text:"être, avoir, aller, faire — die brauchst du in fast jedem Satz.",
  tab:T(["","je","tu","il","nous","vous","ils"],[["être <small>sein</small>","suis","es","est","sommes","êtes","sont"],["avoir <small>haben</small>","ai","as","a","avons","avez","ont"],["aller <small>gehen</small>","vais","vas","va","allons","allez","vont"],["faire <small>machen</small>","fais","fais","fait","faisons","faites","font"],["pouvoir <small>können</small>","peux","peux","peut","pouvons","pouvez","peuvent"],["vouloir <small>wollen</small>","veux","veux","veut","voulons","voulez","veulent"]]),
  merk:"Zukunft einfach: <b>aller</b> + Grundform — <b>je vais manger</b> = ich werde essen.",
  bsp:[["J'ai faim.","Ich habe Hunger."],["Nous allons à la plage.","Wir gehen an den Strand."],["Tu peux m'aider ?","Kannst du mir helfen?"]],
  q:[{f:"„ich habe“",o:["je ai","j'ai"],a:1,w:"avoir: j'ai."},{f:"„sie sind“ (ils)",o:["ils sont","ils ont"],a:0,w:"être: ils sont · avoir: ils ont."}]}]);

/* ---------------- Italienisch ---------------- */
vorne("it",[{t:"Alphabet & Aussprache", ic:"🗣️",
 text:"Italienisch spricht man, wie man es schreibt — wenn man diese Regeln kennt.",
 tab:T(["Schrift","klingt wie","Beispiel"],[
  ["c vor e/i","tsch","ciao, cena"],["g vor e/i","dsch","gelato, giorno"],["ch, gh","k, g","chiesa, spaghetti"],
  ["gli","lj","famiglia, figlio"],["gn","nj","gnocchi, bagno"],["sc vor e/i","sch","scena, pesce"],
  ["z","ts oder ds","pizza, zero"],["h","stumm","ho → o"],["Doppelkonsonant","länger gesprochen","pala ≠ palla"]]),
 merk:"<b>ci/gi</b> = weich (tsch/dsch), <b>chi/ghi</b> = hart (k/g). Das h macht hart.",
 bsp:[["ciao","hallo (tsch)"],["chiesa","Kirche (k)"],["famiglia","Familie (gli = lj)"],["gnocchi","Gnocchi (gn = nj)"],["pesce","Fisch (sc = sch)"]],
 q:[{f:"Wie klingt „chiesa“?",o:["tschiesa","kiesa"],a:1,w:"ch = k."},{f:"Wie klingt <b>gli</b> in „figlio“?",o:["gli","lj"],a:1,w:"gli = lj."}]}]);
ersetze("it","Verben im Präsens",[
 {t:"Verben im Präsens: -are, -ere, -ire", ic:"⚙️", text:"Drei Gruppen, erkennbar an der Grundform. Endung weg, neue dran. Das Pronomen lässt man meist weg.",
  tab:T(["","-are <small>parlare</small>","-ere <small>prendere</small>","-ire <small>dormire</small>"],[
   ["io","parl<b>o</b>","prend<b>o</b>","dorm<b>o</b>"],["tu","parl<b>i</b>","prend<b>i</b>","dorm<b>i</b>"],["lui · lei · Lei","parl<b>a</b>","prend<b>e</b>","dorm<b>e</b>"],
   ["noi","parl<b>iamo</b>","prend<b>iamo</b>","dorm<b>iamo</b>"],["voi","parl<b>ate</b>","prend<b>ete</b>","dorm<b>ite</b>"],["loro","parl<b>ano</b>","prend<b>ono</b>","dorm<b>ono</b>"]]),
  merk:"io = <b>-o</b>, tu = <b>-i</b>, noi = <b>-iamo</b> — bei allen drei Gruppen gleich.",
  bsp:[["parlo / parli","ich spreche / du sprichst"],["prendiamo","wir nehmen"],["dormono","sie schlafen"]],
  q:[{f:"<b>abitare</b> (-are): „wir wohnen“",o:["abitamo","abitiamo"],a:1,w:"noi → -iamo."},{f:"<b>vedere</b> (-ere): „er sieht“",o:["vede","veda"],a:0,w:"-ere + lui → -e."}]},
 {t:"Die wichtigsten unregelmässigen Verben", ic:"⭐", text:"essere, avere, andare, fare — als Block lernen.",
  tab:T(["","io","tu","lui","noi","voi","loro"],[["essere <small>sein</small>","sono","sei","è","siamo","siete","sono"],["avere <small>haben</small>","ho","hai","ha","abbiamo","avete","hanno"],["andare <small>gehen</small>","vado","vai","va","andiamo","andate","vanno"],["fare <small>machen</small>","faccio","fai","fa","facciamo","fate","fanno"],["potere <small>können</small>","posso","puoi","può","possiamo","potete","possono"],["volere <small>wollen</small>","voglio","vuoi","vuole","vogliamo","volete","vogliono"]]),
  merk:"<b>ho, hai, ha, hanno</b>: das h ist stumm — es unterscheidet nur die Schreibung (ho = ich habe, o = oder).",
  bsp:[["Ho fame.","Ich habe Hunger."],["Andiamo al mare.","Wir gehen ans Meer."],["Puoi aiutarmi?","Kannst du mir helfen?"]],
  q:[{f:"„ich habe“",o:["ho","o","hai"],a:0,w:"avere: io ho."},{f:"„sie gehen“ (loro)",o:["andano","vanno"],a:1,w:"andare: loro vanno."}]}]);

/* ---------------- Russisch ---------------- */
vorne("ru",[
 {t:"Kyrillisch 1: bekannte und falsche Freunde", ic:"🔠",
  text:"Russisch schreibt man kyrillisch — 33 Buchstaben. Gute Nachricht: Viele kennst du schon. Aber Vorsicht: Einige sehen aus wie unsere, klingen aber anders.",
  tab:T(["sieht aus wie","klingt wie","Beispiel"],[
   ["А а, К к, М м, О о, Т т","wie bei uns: a, k, m, o, t","мама · mama"],
   ["Е е","je","нет · njet (nein)"],
   ["В в","w (nicht b!)","водка · wodka"],["Н н","n (nicht h!)","нет · njet"],["Р р","r (nicht p!)","рис · ris (Reis)"],
   ["С с","s (nicht k!)","суп · sup (Suppe)"],["У у","u (nicht y!)","улица · uliza (Strasse)"],["Х х","ch wie „Bach“","хлеб · chlep (Brot)"],["Ё ё","jo, immer betont","ёлка · jolka"]]),
  merk:"Lies langsam Buchstabe für Buchstabe — viele Wörter sind international: <b>такси</b> = taksi, <b>метро</b> = metro, <b>ресторан</b> = restoran.",
  bsp:[["такси · taksi","Taxi"],["метро · metro","U-Bahn"],["ресторан · restoran","Restaurant"],["банк · bank","Bank"],["кофе · kofe","Kaffee"]],
  q:[{f:"Wie liest man <b>Р</b>?",o:["p","r"],a:1,w:"Р = r."},{f:"Wie liest man <b>В</b>?",o:["b","w"],a:1,w:"В = w."},{f:"Was heisst „метро“?",o:["Meter","U-Bahn"],a:1,w:"метро = metro."}]},
 {t:"Kyrillisch 2: neue Buchstaben", ic:"🔡",
  text:"Diese Buchstaben gibt es bei uns nicht. Sie stehen meist für Laute, die wir mit mehreren Buchstaben schreiben.",
  tab:T(["Buchstabe","klingt wie","Beispiel"],[
   ["Б б","b","банк · bank"],["Г г","g","город · gorod (Stadt)"],["Д д","d","дом · dom (Haus)"],["Ж ж","weiches sch (Garage)","жена · schena (Ehefrau)"],
   ["З з","weiches s (Sonne)","зима · sima (Winter)"],["И и","i","Иван · Iwan"],["Й й","kurzes j","чай · tschai (Tee)"],["Л л","l","лук · luk"],
   ["П п","p","папа · papa"],["Ф ф","f","фото · foto"],["Ц ц","z","центр · zentr"],["Ч ч","tsch","чай · tschai"],["Ш ш","sch","школа · schkola"],
   ["Щ щ","weiches schtsch","борщ · borschtsch"],["Ы ы","dunkles i (wie „i“ mit Zunge hinten)","мы · my (wir)"],["Э э","e","это · eto (das)"],
   ["Ю ю","ju","юг · juk (Süden)"],["Я я","ja","я · ja (ich)"],["Ь ь","macht den Laut davor weich, kein eigener Laut","день · den"],["Ъ ъ","Trennzeichen, sehr selten","объект"]]),
  merk:"Zwei Ausspracheregeln: Ein <b>unbetontes о</b> klingt wie a (молоко = malakó). Am Wortende werden Konsonanten <b>stimmlos</b> (хлеб = chlep).",
  bsp:[["школа · schkola","Schule"],["чай · tschai","Tee"],["я · ja","ich"],["молоко · malakó","Milch (unbetontes о = a)"],["спасибо · spassiba","danke"]],
  q:[{f:"Wie liest man <b>Ш</b>?",o:["sch","tsch","w"],a:0,w:"Ш = sch."},{f:"Wie liest man <b>Я</b>?",o:["r","ja"],a:1,w:"Я = ja (und heisst auch „ich“)."},{f:"Wie klingt „молоко“?",o:["moloko","malakó"],a:1,w:"Unbetontes о klingt wie a."}]}]);
ersetze("ru","Nein, Fragen, du und Sie",[
 G.ru.find(function(l){ return l.t.indexOf("Nein, Fragen")===0; }),
 {t:"Verben im Präsens: zwei Muster", ic:"⚙️", text:"Russische Verben folgen meist einem von zwei Mustern. Verben auf <b>-ать</b> haben Endungen mit <b>е</b>, Verben auf <b>-ить</b> Endungen mit <b>и</b>.",
  tab:T(["","-ать <small>делать (machen)</small>","-ить <small>говорить (sprechen)</small>"],[
   ["я","дела<b>ю</b>","говор<b>ю</b>"],["ты","дела<b>ешь</b>","говор<b>ишь</b>"],["он · она","дела<b>ет</b>","говор<b>ит</b>"],
   ["мы","дела<b>ем</b>","говор<b>им</b>"],["вы","дела<b>ете</b>","говор<b>ите</b>"],["они","дела<b>ют</b>","говор<b>ят</b>"]]),
  merk:"я = <b>-ю</b> (bzw. -у), ты = <b>-шь</b>, они = <b>-ют/-ят</b>. Unregelmässig und wichtig: хотеть (wollen) хочу, хочешь, хочет, хотим, хотите, хотят · мочь (können) могу, можешь, может, можем, можете, могут.",
  bsp:[["я делаю · ja delaju","ich mache"],["ты говоришь · ty goworisch","du sprichst"],["мы понимаем · my ponimajem","wir verstehen"],["я хочу · ja chatschu","ich will"]],
  q:[{f:"<b>читать</b> (lesen, -ать): „ich lese“",o:["я читаю","я читит"],a:0,w:"-ать + я → -аю."},{f:"<b>говорить</b> (-ить): „sie sprechen“ (они)",o:["они говорют","они говорят"],a:1,w:"-ить + они → -ят."}]}]);

/* ---------------- Serbisch ---------------- */
vorne("sr",[
 {t:"Zwei Schriften, ein Laut pro Buchstabe", ic:"🔠",
  text:"Serbisch schreibt man kyrillisch <b>und</b> lateinisch — beide sind normal. Das Schöne: Jeder Buchstabe hat genau einen Laut. „Schreib, wie du sprichst“ gilt wirklich. In dieser App steht Serbisch in lateinischer Schrift.",
  tab:T(["Latein","Kyrillisch","klingt wie","Beispiel"],[
   ["c","ц","z (ts)","cena (Preis)"],["č","ч","hartes tsch","čaj (Tee)"],["ć","ћ","weiches tsch","noć (Nacht)"],
   ["dž","џ","hartes dsch","džep (Tasche)"],["đ","ђ","weiches dsch","đak (Schüler)"],["š","ш","sch","škola"],["ž","ж","weiches sch (Garage)","žena (Frau)"],
   ["j","ј","j","ja (ich)"],["lj","љ","lj","ljubav (Liebe)"],["nj","њ","nj","njegov (sein)"],["h","х","ch wie „Bach“","hleb (Brot)"],["r","р","gerollt, auch als Vokal","prst (Finger)"]]),
  merk:"Kyrillisch lesen: Viele Buchstaben sind wie im Russischen. Neu sind <b>ђ ћ џ љ њ ј</b>. In Kirche und Behörden siehst du oft Kyrillisch — darum beide lesen lernen.",
  bsp:[["Hvala.","Danke."],["čaj","Tee (č = tsch)"],["žena","Frau (ž = weiches sch)"],["ljubav","Liebe (lj)"],["noć","Nacht (ć = weiches tsch)"]],
  q:[{f:"Wie klingt <b>c</b> in „cena“?",o:["k","z/ts","s"],a:1,w:"c = ts."},{f:"Welcher kyrillische Buchstabe ist <b>š</b>?",o:["ш","щ","ж"],a:0,w:"š = ш."}]}]);
ersetze("sr","Sein: sam, si, je",[
 G.sr.find(function(l){ return l.t.indexOf("Sein: sam")===0; }),
 {t:"Verben im Präsens: drei Muster", ic:"⚙️", text:"Serbische Verben haben im Präsens meist eine von drei Vokal-Endungen: <b>-am</b>, <b>-im</b> oder <b>-em</b>. Das Pronomen lässt man meist weg.",
  tab:T(["","-ati <small>gledati (schauen)</small>","-iti <small>govoriti (sprechen)</small>","-eti <small>voleti (lieben)</small>"],[
   ["ja","gleda<b>m</b>","govor<b>im</b>","vol<b>im</b>"],["ti","gleda<b>š</b>","govor<b>iš</b>","vol<b>iš</b>"],["on · ona","gleda","govor<b>i</b>","vol<b>i</b>"],
   ["mi","gleda<b>mo</b>","govor<b>imo</b>","vol<b>imo</b>"],["vi","gleda<b>te</b>","govor<b>ite</b>","vol<b>ite</b>"],["oni","gleda<b>ju</b>","govor<b>e</b>","vol<b>e</b>"]]),
  merk:"Wichtig und unregelmässig: <b>hteti</b> (wollen) hoću, hoćeš, hoće, hoćemo, hoćete, hoće · <b>moći</b> (können) mogu, možeš, može, možemo, možete, mogu · <b>ići</b> (gehen) idem, ideš, ide, idemo, idete, idu.",
  bsp:[["gledam","ich schaue"],["govorimo","wir sprechen"],["volim te","ich liebe dich"],["hoću kafu","ich will Kaffee"]],
  q:[{f:"<b>čitati</b> (-ati): „ich lese“",o:["čitam","čitim"],a:0,w:"-ati + ja → -am."},{f:"<b>raditi</b> (-iti): „wir arbeiten“",o:["radamo","radimo"],a:1,w:"-iti + mi → -imo."}]}]);

/* ---------------- Griechisch ---------------- */
vorne("el",[
 {t:"Das griechische Alphabet", ic:"🔠",
  text:"24 Buchstaben — viele kennst du aus Mathe und Physik. Die Akzentzeichen zeigen, welche Silbe betont wird.",
  tab:T(["Buchstabe","klingt wie","Buchstabe","klingt wie"],[
   ["Α α","a","Ν ν","n"],["Β β","w (nicht b!)","Ξ ξ","ks"],["Γ γ","gh, vor e/i wie j","Ο ο","o"],["Δ δ","weiches th (engl. this)","Π π","p"],
   ["Ε ε","e","Ρ ρ","r (gerollt)"],["Ζ ζ","weiches s","Σ σ ς","s (ς am Wortende)"],["Η η","i","Τ τ","t"],["Θ θ","hartes th (engl. think)","Υ υ","i"],
   ["Ι ι","i","Φ φ","f"],["Κ κ","k","Χ χ","ch"],["Λ λ","l","Ψ ψ","ps"],["Μ μ","m","Ω ω","o"]]),
  merk:"Fünf Wege, „i“ zu schreiben: <b>ι, η, υ, ει, οι</b> — alle klingen gleich. Das Fragezeichen ist <b>;</b>",
  bsp:[["καφές · kafés","Kaffee"],["νερό · neró","Wasser"],["θάλασσα · thálassa","Meer (θ = th)"],["δρόμος · drómos","Strasse (δ = weiches th)"],["γεια · ja","hallo"]],
  q:[{f:"Wie liest man <b>β</b>?",o:["b","w"],a:1,w:"β = w."},{f:"Wie liest man <b>η</b>?",o:["n","i","e"],a:1,w:"η = i."}]},
 {t:"Buchstaben-Paare", ic:"🔡",
  text:"Einige Buchstaben-Paare ergeben einen eigenen Laut. Wer die kennt, kann fast alles vorlesen.",
  tab:T(["Paar","klingt wie","Beispiel"],[
   ["ου","u","ουρανός · uranós (Himmel)"],["αι","e","και · ke (und)"],["ει, οι","i","είμαι · íme (ich bin)"],
   ["μπ","b (am Anfang) / mb","μπύρα · bíra (Bier)"],["ντ","d (am Anfang) / nd","ντομάτα · domáta"],["γκ","g","γκαράζ · garás"],
   ["αυ, ευ","af/ef oder av/ev","αυτό · aftó (das)"]]),
  merk:"Für <b>b, d, g</b> gibt es keinen eigenen Buchstaben — man schreibt μπ, ντ, γκ.",
  bsp:[["και · ke","und"],["μπύρα · bíra","Bier"],["ευχαριστώ · efcharistó","danke"],["ντομάτα · domáta","Tomate"]],
  q:[{f:"Wie liest man <b>ου</b>?",o:["ou","u","o"],a:1,w:"ου = u."},{f:"Wie schreibt man den Laut „b“?",o:["β","μπ"],a:1,w:"b = μπ, β ist w."}]}]);
ersetze("el","Verben: die Endung",[
 {t:"Verben im Präsens: zwei Muster", ic:"⚙️", text:"Die meisten Verben enden auf <b>-ω</b> (Gruppe A, betont vorne) oder auf <b>-άω</b> (Gruppe B, betont am Ende). Das Pronomen lässt man meist weg.",
  tab:T(["","-ω <small>γράφω (schreiben)</small>","-άω <small>μιλάω (sprechen)</small>"],[
   ["εγώ","γράφ<b>ω</b>","μιλ<b>άω</b>"],["εσύ","γράφ<b>εις</b>","μιλ<b>άς</b>"],["αυτός · αυτή","γράφ<b>ει</b>","μιλ<b>άει</b>"],
   ["εμείς","γράφ<b>ουμε</b>","μιλ<b>άμε</b>"],["εσείς","γράφ<b>ετε</b>","μιλ<b>άτε</b>"],["αυτοί","γράφ<b>ουν</b>","μιλ<b>άνε</b>"]]),
  merk:"Unregelmässig und wichtig: <b>είμαι</b> (sein) είμαι, είσαι, είναι, είμαστε, είστε, είναι · <b>έχω</b> (haben) läuft wie γράφω.",
  bsp:[["γράφω · gráfo","ich schreibe"],["μιλάμε · miláme","wir sprechen"],["είμαι · íme","ich bin"],["έχεις · échis","du hast"]],
  q:[{f:"<b>θέλω</b> (wollen, -ω): „wir wollen“",o:["θέλουμε","θέλαμε"],a:0,w:"-ω + εμείς → -ουμε."},{f:"<b>μιλάω</b>: „du sprichst“",o:["μιλάς","μιλείς"],a:0,w:"-άω + εσύ → -άς."}]}]);

/* ---------------- Verben-Trainer ---------------- */
window.VERBTR={
 pt:{pers:[["eu","ich",0],["você","du",1],["ele","er",1],["nós","wir",2],["vocês","ihr",3],["eles","sie",3]],
  gr:{ar:{suf:"ar",name:"-ar-Verb",end:["o","a","amos","am"]},er:{suf:"er",name:"-er-Verb",end:["o","e","emos","em"]},ir:{suf:"ir",name:"-ir-Verb",end:["o","e","imos","em"]}},
  v:[["falar","sprechen","ar"],["morar","wohnen","ar"],["trabalhar","arbeiten","ar"],["comprar","kaufen","ar"],["gostar","mögen","ar"],["precisar","brauchen","ar"],["estudar","lernen","ar"],["chegar","ankommen","ar"],["tomar","nehmen","ar"],["olhar","schauen","ar"],["comer","essen","er"],["beber","trinken","er"],["vender","verkaufen","er"],["aprender","lernen","er"],["entender","verstehen","er"],["correr","rennen","er"],["escrever","schreiben","er"],["abrir","öffnen","ir"],["partir","abreisen","ir"],["decidir","entscheiden","ir"],["dividir","teilen","ir"],["assistir","anschauen","ir"],["permitir","erlauben","ir"]]},
 es:{pers:[["yo","ich",0],["tú","du",1],["él","er",2],["nosotros","wir",3],["vosotros","ihr",4],["ellos","sie",5]],
  gr:{ar:{suf:"ar",name:"-ar-Verb",end:["o","as","a","amos","áis","an"]},er:{suf:"er",name:"-er-Verb",end:["o","es","e","emos","éis","en"]},ir:{suf:"ir",name:"-ir-Verb",end:["o","es","e","imos","ís","en"]}},
  v:[["hablar","sprechen","ar"],["trabajar","arbeiten","ar"],["comprar","kaufen","ar"],["estudiar","lernen","ar"],["tomar","nehmen","ar"],["llegar","ankommen","ar"],["necesitar","brauchen","ar"],["escuchar","zuhören","ar"],["mirar","schauen","ar"],["comer","essen","er"],["beber","trinken","er"],["vender","verkaufen","er"],["aprender","lernen","er"],["comprender","verstehen","er"],["leer","lesen","er"],["vivir","leben","ir"],["escribir","schreiben","ir"],["abrir","öffnen","ir"],["subir","hinaufgehen","ir"],["decidir","entscheiden","ir"]]},
 fr:{je:true,pers:[["je","ich",0],["tu","du",1],["il","er",2],["nous","wir",3],["vous","ihr/Sie",4],["ils","sie",5]],
  gr:{er:{suf:"er",name:"-er-Verb",end:["e","es","e","ons","ez","ent"]}},
  v:[["parler","sprechen","er"],["aimer","mögen","er"],["habiter","wohnen","er"],["travailler","arbeiten","er"],["regarder","schauen","er"],["écouter","zuhören","er"],["chercher","suchen","er"],["donner","geben","er"],["trouver","finden","er"],["arriver","ankommen","er"],["demander","fragen","er"],["penser","denken","er"]]},
 it:{pers:[["io","ich",0],["tu","du",1],["lui","er",2],["noi","wir",3],["voi","ihr",4],["loro","sie",5]],
  gr:{are:{suf:"are",name:"-are-Verb",end:["o","i","a","iamo","ate","ano"]},ere:{suf:"ere",name:"-ere-Verb",end:["o","i","e","iamo","ete","ono"]},ire:{suf:"ire",name:"-ire-Verb",end:["o","i","e","iamo","ite","ono"]}},
  v:[["parlare","sprechen","are"],["lavorare","arbeiten","are"],["abitare","wohnen","are"],["comprare","kaufen","are"],["guardare","schauen","are"],["aspettare","warten","are"],["ascoltare","zuhören","are"],["prendere","nehmen","ere"],["vedere","sehen","ere"],["scrivere","schreiben","ere"],["vendere","verkaufen","ere"],["credere","glauben","ere"],["dormire","schlafen","ire"],["partire","abfahren","ire"],["sentire","hören","ire"],["aprire","öffnen","ire"]]},
 ru:{pers:[["я","ich",0],["ты","du",1],["он","er",2],["мы","wir",3],["вы","ihr/Sie",4],["они","sie",5]],
  gr:{at:{suf:"ть",name:"-ать-Verb",end:["ю","ешь","ет","ем","ете","ют"]},it:{suf:"ить",name:"-ить-Verb",end:["ю","ишь","ит","им","ите","ят"]}},
  v:[["делать","machen","at"],["читать","lesen","at"],["знать","wissen","at"],["понимать","verstehen","at"],["слушать","zuhören","at"],["работать","arbeiten","at"],["играть","spielen","at"],["думать","denken","at"],["отдыхать","sich ausruhen","at"],["говорить","sprechen","it"],["звонить","anrufen","it"],["курить","rauchen","it"],["варить","kochen","it"]]},
 sr:{pers:[["ja","ich",0],["ti","du",1],["on","er",2],["mi","wir",3],["vi","ihr/Sie",4],["oni","sie",5]],
  gr:{ati:{suf:"ti",name:"-ati-Verb",end:["m","š","","mo","te","ju"]},iti:{suf:"iti",name:"-iti-Verb",end:["im","iš","i","imo","ite","e"]},eti:{suf:"eti",name:"-eti-Verb",end:["im","iš","i","imo","ite","e"]}},
  v:[["gledati","schauen","ati"],["čitati","lesen","ati"],["slušati","zuhören","ati"],["znati","wissen","ati"],["imati","haben","ati"],["pitati","fragen","ati"],["čekati","warten","ati"],["govoriti","sprechen","iti"],["raditi","arbeiten","iti"],["učiti","lernen","iti"],["voleti","lieben","eti"],["videti","sehen","eti"],["živeti","leben","eti"]]},
 el:{pers:[["εγώ","ich",0],["εσύ","du",1],["αυτός","er",2],["εμείς","wir",3],["εσείς","ihr/Sie",4],["αυτοί","sie",5]],
  gr:{a:{suf:"ω",name:"Gruppe A (-ω)",end:["ω","εις","ει","ουμε","ετε","ουν"]},b:{suf:"άω",name:"Gruppe B (-άω)",end:["άω","άς","άει","άμε","άτε","άνε"]}},
  v:[["γράφω","schreiben","a"],["θέλω","wollen","a"],["κάνω","machen","a"],["πίνω","trinken","a"],["μένω","wohnen","a"],["ξέρω","wissen","a"],["διαβάζω","lesen","a"],["δουλεύω","arbeiten","a"],["έχω","haben","a"],["μιλάω","sprechen","b"],["αγαπάω","lieben","b"],["ρωτάω","fragen","b"],["πεινάω","Hunger haben","b"]]}
};
})();
