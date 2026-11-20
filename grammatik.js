/* Grammatik — die Basics jeder Sprache, kurz erklärt und gleich geprüft */
(function(){
// Lektion: {t, ic, text, bsp:[[Zielsprache, Deutsch]], q:[{f, o:[...], a, w}]}
var G={
pt:[
 {t:"Der, die, das: o und a", ic:"🔤", text:"Portugiesisch hat nur zwei Geschlechter. <b>o</b> ist männlich, <b>a</b> ist weiblich, im Plural <b>os</b> und <b>as</b>. Wörter auf -o sind meist männlich, auf -a meist weiblich. Das Geschlecht passt oft nicht zum Deutschen: der Apfel ist <b>a</b> maçã. Darum jedes Wort gleich mit Artikel lernen.",
  bsp:[["o carro","das Auto"],["a casa","das Haus"],["a maçã","der Apfel"],["os carros","die Autos"],["um café, uma água","ein Kaffee, ein Wasser"],["o dia, o problema","der Tag, das Problem (Ausnahmen auf -a)"]],
  q:[{f:"Wie sagt man „der Apfel“?",o:["o maçã","a maçã"],a:1,w:"maçã ist weiblich — also a maçã, auch wenn es im Deutschen „der“ ist."},
     {f:"Plural von „a casa“?",o:["os casas","as casas","a casas"],a:1,w:"Weiblich bleibt weiblich: as casas."}]},
 {t:"Zahlen: erst die Zehner", ic:"🔢", text:"Anders als im Deutschen kommt die Zehnerstelle zuerst, verbunden mit <b>e</b> (und): 28 ist <b>vinte e oito</b> — „zwanzig und acht“. 11 bis 19 haben eigene Wörter. 1 und 2 richten sich nach dem Geschlecht: <b>um/uma</b>, <b>dois/duas</b>.",
  bsp:[["vinte e oito","28"],["quarenta e cinco","45"],["dezesseis","16"],["cem / cento e um","100 / 101"],["dois cafés, duas águas","zwei Kaffee, zwei Wasser"]],
  q:[{f:"Was heisst 36?",o:["seis e trinta","trinta e seis","trinta seis"],a:1,w:"Zehner zuerst, dann e, dann die Einer: trinta e seis."},
     {f:"„zwei Frauen“?",o:["dois mulheres","duas mulheres"],a:1,w:"mulher ist weiblich, also duas."}]},
 {t:"Satzbau, Nein und Fragen", ic:"🧩", text:"Die Reihenfolge ist fast immer: Wer – tut – was. Das Verb wandert nie ans Satzende wie im Deutschen. Das Wort für ich, du usw. lässt man oft weg, weil die Verbendung es zeigt. Verneint wird mit <b>não</b> direkt vor dem Verb. Eine Frage ist derselbe Satz — nur die Stimme geht am Ende hoch.",
  bsp:[["(Eu) moro em Berlim.","Ich wohne in Berlin."],["Não falo inglês.","Ich spreche kein Englisch."],["Você fala alemão?","Sprichst du Deutsch?"],["Acho que ele vem amanhã.","Ich glaube, dass er morgen kommt."]],
  q:[{f:"„Ich verstehe nicht.“",o:["Entendo não.","Não entendo.","Eu entendo não."],a:1,w:"não steht direkt vor dem Verb."},
     {f:"Wie wird aus „Você tem tempo.“ eine Frage?",o:["Tem você tempo?","Você tem tempo? — Stimme hoch am Ende","Você tempo tem?"],a:1,w:"Gleiche Reihenfolge, nur die Betonung ändert sich."}]},
 {t:"Verben im Präsens: -ar, -er, -ir", ic:"⚙️", text:"Jedes Verb gehört zu einer von drei Gruppen — erkennbar an der Grundform: <b>-ar</b> (falar), <b>-er</b> (comer) oder <b>-ir</b> (partir). Du nimmst die Endung weg und hängst die passende neue an. In Brasilien brauchst du vier Formen. <b>você</b> (du/Sie) nimmt dieselbe Form wie ele/ela (er/sie), <b>vocês</b> (ihr) dieselbe wie eles/elas (sie).",
  tab:'<table class="gt"><tr><th></th><th>-ar<br><small>falar</small></th><th>-er<br><small>comer</small></th><th>-ir<br><small>partir</small></th></tr><tr><td>eu</td><td>fal<b>o</b></td><td>com<b>o</b></td><td>part<b>o</b></td></tr><tr><td>você · ele · ela</td><td>fal<b>a</b></td><td>com<b>e</b></td><td>part<b>e</b></td></tr><tr><td>nós</td><td>fal<b>amos</b></td><td>com<b>emos</b></td><td>part<b>imos</b></td></tr><tr><td>vocês · eles · elas</td><td>fal<b>am</b></td><td>com<b>em</b></td><td>part<b>em</b></td></tr></table>',
  merk:"Merksatz: ich = immer <b>-o</b>. Bei -ar steht ein <b>a</b> in der Endung, bei -er und -ir ein <b>e</b> — nur bei nós sagt -ir <b>-imos</b>.",
  bsp:[["eu fal<b>o</b> / você fal<b>a</b>","falar (-ar): ich spreche / du sprichst"],["nós fal<b>amos</b> / eles fal<b>am</b>","falar (-ar): wir sprechen / sie sprechen"],["eu com<b>o</b> / você com<b>e</b>","comer (-er): ich esse / du isst"],["nós com<b>emos</b> / eles com<b>em</b>","comer (-er): wir essen / sie essen"],["eu part<b>o</b> / nós part<b>imos</b>","partir (-ir): ich reise ab / wir reisen ab"]],
  q:[{f:"<b>morar</b> (wohnen) ist ein -ar-Verb. „wir wohnen“?",o:["nós moremos","nós moramos","nós moram"],a:1,w:"-ar + nós → <b>-amos</b>: moramos."},
     {f:"<b>beber</b> (trinken) ist ein -er-Verb. „du trinkst“ (você)?",o:["você beba","você bebe","você bebo"],a:1,w:"-er + você → <b>-e</b>: bebe."},
     {f:"<b>abrir</b> (öffnen) ist ein -ir-Verb. „wir öffnen“?",o:["nós abremos","nós abrimos","nós abramos"],a:1,w:"-ir + nós → <b>-imos</b>: abrimos."},
     {f:"<b>trabalhar</b> (arbeiten). „sie arbeiten“ (eles)?",o:["eles trabalham","eles trabalhem","eles trabalhamos"],a:0,w:"-ar + eles → <b>-am</b>: trabalham."}]},
 {t:"Die wichtigsten unregelmässigen Verben", ic:"⭐", text:"Ein paar Verben halten sich nicht an die Regel — aber genau die brauchst du ständig. Lern sie als Block, laut, mehrmals.",
  tab:'<table class="gt"><tr><th></th><th>eu</th><th>você</th><th>nós</th><th>eles</th></tr><tr><td>ser <small>sein</small></td><td>sou</td><td>é</td><td>somos</td><td>são</td></tr><tr><td>estar <small>sein</small></td><td>estou</td><td>está</td><td>estamos</td><td>estão</td></tr><tr><td>ter <small>haben</small></td><td>tenho</td><td>tem</td><td>temos</td><td>têm</td></tr><tr><td>ir <small>gehen</small></td><td>vou</td><td>vai</td><td>vamos</td><td>vão</td></tr><tr><td>fazer <small>machen</small></td><td>faço</td><td>faz</td><td>fazemos</td><td>fazem</td></tr><tr><td>querer <small>wollen</small></td><td>quero</td><td>quer</td><td>queremos</td><td>querem</td></tr><tr><td>poder <small>können</small></td><td>posso</td><td>pode</td><td>podemos</td><td>podem</td></tr></table>',
  merk:"Tipp: Mit <b>ir</b> + Grundform sprichst du über die Zukunft: <b>vou comer</b> = ich werde essen.",
  bsp:[["Eu tenho tempo.","Ich habe Zeit."],["Nós vamos à praia.","Wir gehen an den Strand."],["Você pode me ajudar?","Kannst du mir helfen?"],["Vou comer agora.","Ich esse jetzt gleich."]],
  q:[{f:"„ich habe“",o:["eu tem","eu tenho","eu teno"],a:1,w:"ter ist unregelmässig: eu <b>tenho</b>."},
     {f:"„wir gehen“",o:["nós imos","nós vamos","nós vão"],a:1,w:"ir: nós <b>vamos</b>."},
     {f:"„ich kann“",o:["eu podo","eu posso","eu pode"],a:1,w:"poder: eu <b>posso</b>."}]},
 {t:"Sein: ser oder estar", ic:"⚖️", text:"Portugiesisch hat zwei Wörter für „sein“. <b>ser</b> für das, was jemand oder etwas ist — Herkunft, Beruf, Eigenschaft. <b>estar</b> für Zustände und wo man gerade ist.",
  bsp:[["Sou alemão.","Ich bin Deutscher."],["É caro.","Es ist teuer."],["Estou cansado.","Ich bin müde."],["Estou no hotel.","Ich bin im Hotel."]],
  q:[{f:"„Ich bin müde.“",o:["Sou cansado.","Estou cansado."],a:1,w:"Müde ist ein Zustand — estar."},
     {f:"„Er ist Arzt.“",o:["Ele é médico.","Ele está médico."],a:0,w:"Beruf — ser."}]},
 {t:"Du und Sie", ic:"🤝", text:"In Brasilien sagt man fast immer <b>você</b> — das passt für du und für ein lockeres Sie. Bei Älteren oder sehr höflich: <b>o senhor</b> (Herr) und <b>a senhora</b> (Frau). Alle drei nehmen dieselbe Verbform wie „er/sie“.",
  bsp:[["Você quer um café?","Willst du einen Kaffee?"],["O senhor quer um café?","Möchten Sie einen Kaffee? (zu einem älteren Mann)"],["A senhora precisa de ajuda?","Brauchen Sie Hilfe? (zu einer Frau)"]],
  q:[{f:"Höflich zu einer älteren Frau: „Möchten Sie Wasser?“",o:["Você quer água?","A senhora quer água?"],a:1,w:"Respektvoll: a senhora."}]},
 {t:"Kleine Verschmelzungen", ic:"🔗", text:"<b>em</b> (in) und <b>de</b> (von) verschmelzen mit dem Artikel: em + o = <b>no</b>, em + a = <b>na</b>, de + o = <b>do</b>, de + a = <b>da</b>.",
  bsp:[["no hotel","im Hotel"],["na praia","am Strand"],["do Brasil","aus Brasilien"],["da Alemanha","aus Deutschland"]],
  q:[{f:"„im Hotel“ (o hotel)",o:["em o hotel","no hotel","na hotel"],a:1,w:"em + o = no."},
     {f:"„am Strand“ (a praia)",o:["no praia","na praia"],a:1,w:"em + a = na."}]},
 {t:"Plural", ic:"➕", text:"Meist kommt einfach <b>-s</b> dazu. Wörter auf <b>-ão</b> werden meist zu <b>-ões</b>, auf <b>-l</b> zu <b>-is</b>.",
  bsp:[["o carro → os carros","das Auto → die Autos"],["o avião → os aviões","das Flugzeug → die Flugzeuge"],["o animal → os animais","das Tier → die Tiere"],["o pão → os pães","das Brot → die Brote (Ausnahme)"]],
  q:[{f:"Plural von „o avião“?",o:["os aviãos","os aviões"],a:1,w:"-ão wird meist zu -ões."}]}
],
es:[
 {t:"Der, die, das: el und la", ic:"🔤", text:"Spanisch hat zwei Geschlechter: <b>el</b> (männlich), <b>la</b> (weiblich), Plural <b>los/las</b>. Auf -o meist männlich, auf -a meist weiblich. Das Geschlecht passt oft nicht zum Deutschen. Darum immer mit Artikel lernen.",
  bsp:[["el coche","das Auto"],["la casa","das Haus"],["la manzana","der Apfel"],["los coches","die Autos"],["el día, el problema","der Tag, das Problem (Ausnahmen)"]],
  q:[{f:"„der Apfel“",o:["el manzana","la manzana"],a:1,w:"manzana ist weiblich."},{f:"Plural von „la casa“",o:["las casas","los casas"],a:0,w:"Weiblich bleibt weiblich: las casas."}]},
 {t:"Zahlen: erst die Zehner", ic:"🔢", text:"Die Zehner kommen zuerst. Bis 29 schreibt man zusammen: 28 = <b>veintiocho</b>. Ab 31 mit <b>y</b> (und): 45 = <b>cuarenta y cinco</b>.",
  bsp:[["veintiocho","28"],["treinta y uno","31"],["cuarenta y cinco","45"],["cien / ciento uno","100 / 101"]],
  q:[{f:"Was heisst 36?",o:["seis y treinta","treinta y seis"],a:1,w:"Zehner zuerst: treinta y seis."}]},
 {t:"Satzbau, Nein und Fragen", ic:"🧩", text:"Wer – tut – was. Das Verb wandert nie ans Satzende. „ich, du“ lässt man meist weg. Verneint wird mit <b>no</b> vor dem Verb. Fragen haben dieselbe Reihenfolge und ein umgedrehtes Fragezeichen am Anfang.",
  bsp:[["Vivo en Berlín.","Ich wohne in Berlin."],["No hablo inglés.","Ich spreche kein Englisch."],["¿Hablas alemán?","Sprichst du Deutsch?"]],
  q:[{f:"„Ich verstehe nicht.“",o:["Entiendo no.","No entiendo."],a:1,w:"no vor dem Verb."}]},
 {t:"Verben im Präsens", ic:"⚙️", text:"Verben enden auf -ar, -er, -ir. Die Endung zeigt die Person.",
  bsp:[["hablo · hablas · habla","ich spreche · du sprichst · er/sie spricht"],["hablamos · habláis · hablan","wir · ihr · sie sprechen"],["como · comes · come","ich esse · du isst · er isst"]],
  q:[{f:"„wir sprechen“",o:["hablan","hablamos","habláis"],a:1,w:"wir = -mos."}]},
 {t:"Sein: ser oder estar", ic:"⚖️", text:"<b>ser</b> für Herkunft, Beruf, Eigenschaft. <b>estar</b> für Zustand und Ort.",
  bsp:[["Soy alemán.","Ich bin Deutscher."],["Estoy cansado.","Ich bin müde."],["Estoy en el hotel.","Ich bin im Hotel."]],
  q:[{f:"„Ich bin müde.“",o:["Soy cansado.","Estoy cansado."],a:1,w:"Zustand — estar."}]},
 {t:"Du und Sie", ic:"🤝", text:"<b>tú</b> ist du, <b>usted</b> ist Sie — usted nimmt die Verbform wie er/sie. In Spanien sagt man zu mehreren Freunden <b>vosotros</b>, in Lateinamerika immer <b>ustedes</b>.",
  bsp:[["¿Tú quieres un café?","Willst du einen Kaffee?"],["¿Usted quiere un café?","Möchten Sie einen Kaffee?"]],
  q:[{f:"Höflich: „Sprechen Sie Deutsch?“",o:["¿Hablas alemán?","¿Habla usted alemán?"],a:1,w:"usted nimmt die er/sie-Form: habla."}]}
],
en:[
 {t:"Artikel ohne Geschlecht", ic:"🔤", text:"Englisch hat kein grammatisches Geschlecht. <b>the</b> heisst der, die und das. <b>a</b> heisst ein/eine — vor einem Vokal-Laut <b>an</b>.",
  bsp:[["the car, the house","das Auto, das Haus"],["a coffee","ein Kaffee"],["an apple","ein Apfel"],["an hour","eine Stunde (h ist stumm)"]],
  q:[{f:"„ein Ei“ (egg)",o:["a egg","an egg"],a:1,w:"Vor Vokal-Laut: an."}]},
 {t:"Zahlen: erst die Zehner", ic:"🔢", text:"Wie fast überall: Zehner zuerst, mit Bindestrich. 28 = <b>twenty-eight</b>. 13–19 enden auf -teen.",
  bsp:[["twenty-eight","28"],["forty-five","45"],["sixteen","16"],["a hundred and five","105"]],
  q:[{f:"Was heisst 36?",o:["six-thirty","thirty-six"],a:1,w:"Zehner zuerst."}]},
 {t:"Satzbau und do", ic:"🧩", text:"Die Reihenfolge ist fest: Wer – tut – was. Für Fragen und Verneinung braucht man meist <b>do</b>: Do you …? / I don't …",
  bsp:[["I live in Berlin.","Ich wohne in Berlin."],["Do you speak German?","Sprichst du Deutsch?"],["I don't understand.","Ich verstehe nicht."]],
  q:[{f:"„Ich verstehe nicht.“",o:["I understand not.","I don't understand."],a:1,w:"Verneinung mit don't."}]},
 {t:"Er arbeitet: das -s", ic:"⚙️", text:"Im Präsens ändert sich das Verb kaum — nur bei he/she/it kommt <b>-s</b> dazu. Für „gerade jetzt“ nimmt man <b>am/is/are + -ing</b>.",
  bsp:[["I work · she works","ich arbeite · sie arbeitet"],["I'm working right now.","Ich arbeite gerade."]],
  q:[{f:"„Er spricht Englisch.“",o:["He speak English.","He speaks English."],a:1,w:"he/she/it: -s."}]},
 {t:"Du und Sie", ic:"🤝", text:"<b>you</b> ist du und Sie zugleich. Höflich wird man über die Form: please, could you …, thank you.",
  bsp:[["Could you help me, please?","Könnten Sie mir bitte helfen?"]],
  q:[{f:"Höflich bitten:",o:["Help me.","Could you help me, please?"],a:1,w:"Höflichkeit steckt in could und please."}]}
],
fr:[
 {t:"Der, die, das: le und la", ic:"🔤", text:"Zwei Geschlechter: <b>le</b> (männlich), <b>la</b> (weiblich), vor Vokal <b>l'</b>, Plural <b>les</b>. Ein/eine: <b>un/une</b>. Das Geschlecht sieht man dem Wort oft nicht an — mit Artikel lernen.",
  bsp:[["le pain","das Brot"],["la pomme","der Apfel"],["l'eau","das Wasser"],["les maisons","die Häuser"]],
  q:[{f:"„das Wasser“",o:["le eau","l'eau"],a:1,w:"Vor Vokal: l'."}]},
 {t:"Zahlen", ic:"🔢", text:"Zehner zuerst: 28 = <b>vingt-huit</b>, 21 = vingt et un. Speziell in Frankreich: 70 = <b>soixante-dix</b> (60+10), 80 = <b>quatre-vingts</b> (4×20), 90 = <b>quatre-vingt-dix</b>. In Belgien und der Schweiz sagt man septante und nonante.",
  bsp:[["vingt-huit","28"],["soixante-quinze","75"],["quatre-vingts","80"],["quatre-vingt-dix-neuf","99"]],
  q:[{f:"Was heisst 80 in Frankreich?",o:["huitante","quatre-vingts"],a:1,w:"4 × 20."}]},
 {t:"Nein und Fragen", ic:"🧩", text:"Verneint wird mit <b>ne … pas</b> um das Verb herum. Fragen: einfach Stimme hoch, oder <b>est-ce que</b> davor.",
  bsp:[["Je ne parle pas anglais.","Ich spreche kein Englisch."],["Vous parlez allemand ?","Sprechen Sie Deutsch?"],["Est-ce que tu viens ?","Kommst du?"]],
  q:[{f:"„Ich verstehe nicht.“",o:["Je comprends pas ne.","Je ne comprends pas."],a:1,w:"ne vor, pas nach dem Verb."}]},
 {t:"Verben auf -er", ic:"⚙️", text:"Die meisten Verben enden auf -er. Viele Formen klingen gleich, auch wenn sie anders geschrieben werden.",
  bsp:[["je parle · tu parles · il parle","ich spreche · du sprichst · er spricht"],["nous parlons · vous parlez · ils parlent","wir · ihr/Sie · sie sprechen"],["je suis · j'ai","ich bin · ich habe"]],
  q:[{f:"„wir sprechen“",o:["nous parlez","nous parlons"],a:1,w:"nous = -ons."}]},
 {t:"Du und Sie", ic:"🤝", text:"<b>tu</b> ist du, <b>vous</b> ist Sie und auch ihr. Bei Fremden immer vous.",
  bsp:[["Tu veux un café ?","Willst du einen Kaffee?"],["Vous voulez un café ?","Möchten Sie einen Kaffee?"]],
  q:[{f:"Zu einer fremden Person:",o:["tu","vous"],a:1,w:"Fremde: vous."}]}
],
it:[
 {t:"Der, die, das", ic:"🔤", text:"Zwei Geschlechter. Männlich meist <b>il</b> (vor s+Konsonant und z: <b>lo</b>), weiblich <b>la</b>, vor Vokal <b>l'</b>. Plural: <b>i/gli</b> und <b>le</b>. Auf -o meist männlich, auf -a weiblich, auf -e beides möglich.",
  bsp:[["il libro · i libri","das Buch · die Bücher"],["la casa · le case","das Haus · die Häuser"],["lo zaino","der Rucksack"],["l'acqua","das Wasser"]],
  q:[{f:"Plural von „la casa“",o:["le case","i case"],a:0,w:"Weiblich: la → le, -a → -e."}]},
 {t:"Zahlen: erst die Zehner", ic:"🔢", text:"Zehner zuerst und zusammengeschrieben: 28 = <b>ventotto</b> (der Vokal fällt vor uno und otto weg), 45 = <b>quarantacinque</b>.",
  bsp:[["ventotto","28"],["trentuno","31"],["quarantacinque","45"],["cento","100"]],
  q:[{f:"Was heisst 36?",o:["seitrenta","trentasei"],a:1,w:"Zehner zuerst."}]},
 {t:"Satzbau, Nein und Fragen", ic:"🧩", text:"Wer – tut – was, ich/du lässt man meist weg. Verneint wird mit <b>non</b> vor dem Verb. Fragen per Stimme.",
  bsp:[["Abito a Berlino.","Ich wohne in Berlin."],["Non parlo inglese.","Ich spreche kein Englisch."],["Parli tedesco?","Sprichst du Deutsch?"]],
  q:[{f:"„Ich verstehe nicht.“",o:["Capisco non.","Non capisco."],a:1,w:"non vor dem Verb."}]},
 {t:"Verben im Präsens", ic:"⚙️", text:"Verben enden auf -are, -ere, -ire. Die Endung zeigt die Person.",
  bsp:[["parlo · parli · parla","ich · du · er spricht"],["parliamo · parlate · parlano","wir · ihr · sie sprechen"]],
  q:[{f:"„wir sprechen“",o:["parliamo","parlano"],a:0,w:"wir = -iamo."}]},
 {t:"Du und Sie", ic:"🤝", text:"<b>tu</b> ist du. Höflich sagt man <b>Lei</b> — mit der Verbform wie er/sie.",
  bsp:[["Vuoi un caffè?","Willst du einen Kaffee?"],["Vuole un caffè?","Möchten Sie einen Kaffee?"]],
  q:[{f:"Höflich: „Sprechen Sie Deutsch?“",o:["Parli tedesco?","Parla tedesco?"],a:1,w:"Lei nimmt die er/sie-Form."}]}
],
ru:[
 {t:"Keine Artikel, drei Geschlechter", ic:"🔤", text:"Russisch hat keine Artikel. Das Geschlecht erkennst du an der Endung: Konsonant = männlich, <b>-а/-я</b> = weiblich, <b>-о/-е</b> = sächlich.",
  bsp:[["дом · dom","das Haus (männlich)"],["мама · mama","die Mama (weiblich)"],["окно · okno","das Fenster (sächlich)"]],
  q:[{f:"Welches Geschlecht hat „книга“ (Buch)?",o:["männlich","weiblich","sächlich"],a:1,w:"Endung -а = weiblich."}]},
 {t:"Kein „bin“ im Präsens", ic:"⚖️", text:"Im Präsens fällt „sein“ weg. Man sagt einfach „Ich Student“. <b>Это</b> heisst „das ist“.",
  bsp:[["Я студент. · Ja student.","Ich bin Student."],["Это мой брат. · Eto moi brat.","Das ist mein Bruder."]],
  q:[{f:"„Ich bin müde.“ (устал)",o:["Я есть устал.","Я устал."],a:1,w:"Kein „bin“ im Präsens."}]},
 {t:"Zahlen: erst die Zehner", ic:"🔢", text:"Zehner zuerst: 28 = <b>двадцать восемь</b>. Ohne „und“.",
  bsp:[["двадцать восемь · dwadzat wosem","28"],["сорок пять · sorok pjat","45"],["сто · sto","100"]],
  q:[{f:"Was heisst 36?",o:["шесть тридцать","тридцать шесть"],a:1,w:"Zehner zuerst."}]},
 {t:"Fälle: Endungen ändern sich", ic:"🧩", text:"Russisch hat sechs Fälle. Statt Artikeln ändern sich die Endungen. Für den Anfang reicht: nach <b>в</b> (in) bekommt der Ort meist ein <b>-е</b>.",
  bsp:[["Москва → в Москве · w Moskwe","Moskau → in Moskau"],["дом → дома · doma","Haus → zu Hause"]],
  q:[{f:"„in Moskau“",o:["в Москва","в Москве"],a:1,w:"Nach в: -е."}]},
 {t:"Nein, Fragen, du und Sie", ic:"🤝", text:"<b>не</b> vor dem Verb verneint. Fragen per Stimme, gleiche Reihenfolge. <b>ты</b> ist du, <b>вы</b> ist Sie.",
  bsp:[["Я не понимаю. · Ja ne ponimaju.","Ich verstehe nicht."],["Вы говорите по-немецки? · Wy goworite po-nemezki?","Sprechen Sie Deutsch?"]],
  q:[{f:"„Ich verstehe nicht.“",o:["Я понимаю не.","Я не понимаю."],a:1,w:"не vor dem Verb."}]}
],
sr:[
 {t:"Keine Artikel, drei Geschlechter", ic:"🔤", text:"Serbisch hat keine Artikel. Konsonant am Ende = männlich, <b>-a</b> = weiblich, <b>-o/-e</b> = sächlich.",
  bsp:[["grad","die Stadt (männlich)"],["kuća","das Haus (weiblich)"],["selo","das Dorf (sächlich)"]],
  q:[{f:"Welches Geschlecht hat „knjiga“ (Buch)?",o:["männlich","weiblich","sächlich"],a:1,w:"Endung -a = weiblich."}]},
 {t:"Sein: sam, si, je", ic:"⚖️", text:"„sein“ ist kurz und steht meist an zweiter Stelle: ja <b>sam</b>, ti <b>si</b>, on <b>je</b>. Verneint: <b>nisam</b>, <b>nisi</b>, <b>nije</b>.",
  bsp:[["Ja sam umoran.","Ich bin müde."],["On je doktor.","Er ist Arzt."],["Nisam gladan.","Ich bin nicht hungrig."]],
  q:[{f:"„Ich bin nicht müde.“",o:["Ja ne sam umoran.","Nisam umoran."],a:1,w:"ne + sam = nisam."}]},
 {t:"Zahlen: erst die Zehner", ic:"🔢", text:"Zehner zuerst: 28 = <b>dvadeset osam</b>.",
  bsp:[["dvadeset osam","28"],["četrdeset pet","45"],["sto","100"]],
  q:[{f:"Was heisst 36?",o:["šest trideset","trideset šest"],a:1,w:"Zehner zuerst."}]},
 {t:"Fälle: Endungen ändern sich", ic:"🧩", text:"Serbisch hat sieben Fälle. Für den Anfang: nach <b>u</b> (in) endet der Ort meist auf <b>-u</b>.",
  bsp:[["Beograd → u Beogradu","Belgrad → in Belgrad"],["kuća → u kući","Haus → im Haus"]],
  q:[{f:"„in Belgrad“",o:["u Beograd","u Beogradu"],a:1,w:"Nach u: -u."}]},
 {t:"Nein, Fragen, du und Sie", ic:"🤝", text:"<b>ne</b> vor dem Verb verneint. Fragen oft mit <b>da li</b> am Anfang. <b>ti</b> ist du, <b>Vi</b> ist Sie.",
  bsp:[["Ne razumem.","Ich verstehe nicht."],["Da li govorite nemački?","Sprechen Sie Deutsch?"]],
  q:[{f:"„Ich verstehe nicht.“",o:["Razumem ne.","Ne razumem."],a:1,w:"ne vor dem Verb."}]}
],
el:[
 {t:"Der, die, das: ο, η, το", ic:"🔤", text:"Drei Geschlechter wie im Deutschen: <b>ο</b> (männlich), <b>η</b> (weiblich), <b>το</b> (sächlich). Endungen helfen: -ος meist männlich, -α/-η weiblich, -ο/-ι sächlich.",
  bsp:[["ο δρόμος · o drómos","die Strasse"],["η θάλασσα · i thálassa","das Meer"],["το σπίτι · to spíti","das Haus"]],
  q:[{f:"„das Haus“",o:["ο σπίτι","το σπίτι"],a:1,w:"-ι ist meist sächlich: το."}]},
 {t:"Zahlen: erst die Zehner", ic:"🔢", text:"Zehner zuerst: 28 = <b>είκοσι οκτώ</b>.",
  bsp:[["είκοσι οκτώ · íkosi októ","28"],["σαράντα πέντε · saránta pénde","45"],["εκατό · ekató","100"]],
  q:[{f:"Was heisst 36?",o:["έξι τριάντα","τριάντα έξι"],a:1,w:"Zehner zuerst."}]},
 {t:"Nein und Fragen", ic:"🧩", text:"<b>δεν</b> vor dem Verb verneint. Fragen per Stimme — und das Fragezeichen sieht aus wie ein Strichpunkt: <b>;</b>",
  bsp:[["Δεν καταλαβαίνω. · Den katalavéno.","Ich verstehe nicht."],["Μιλάτε γερμανικά; · Miláte jermaniká?","Sprechen Sie Deutsch?"]],
  q:[{f:"Welches Zeichen ist im Griechischen das Fragezeichen?",o:["?",";"],a:1,w:"Das griechische Fragezeichen sieht aus wie ;"}]},
 {t:"Verben: die Endung zeigt die Person", ic:"⚙️", text:"„ich, du“ lässt man meist weg — die Endung zeigt die Person.",
  bsp:[["μιλάω · miláo","ich spreche"],["μιλάς · milás","du sprichst"],["μιλάμε · miláme","wir sprechen"]],
  q:[{f:"„wir sprechen“",o:["μιλάς","μιλάμε"],a:1,w:"wir = -με."}]},
 {t:"Du und Sie", ic:"🤝", text:"<b>εσύ</b> ist du, <b>εσείς</b> ist Sie und ihr. Fremde und Ältere siezt man.",
  bsp:[["Θέλεις καφέ; · Thélis kafé?","Willst du einen Kaffee?"],["Θέλετε καφέ; · Thélete kafé?","Möchten Sie einen Kaffee?"]],
  q:[{f:"Höflich: „Möchten Sie einen Kaffee?“",o:["Θέλεις καφέ;","Θέλετε καφέ;"],a:1,w:"Sie = -ετε."}]}
]
};

var VERBEN={pt:[["falar","sprechen"],["morar","wohnen"],["trabalhar","arbeiten"],["comprar","kaufen"],["gostar","mögen"],["precisar","brauchen"],["estudar","lernen"],["chegar","ankommen"],["pagar","bezahlen"],["tomar","nehmen"],["andar","gehen, laufen"],["olhar","schauen"],["comer","essen"],["beber","trinken"],["vender","verkaufen"],["aprender","lernen"],["entender","verstehen"],["correr","rennen"],["escrever","schreiben"],["abrir","öffnen"],["partir","abreisen"],["decidir","entscheiden"],["dividir","teilen"],["assistir","anschauen"],["permitir","erlauben"]]};
var PERS=[["eu","ich",0],["você","du",1],["ele","er",1],["nós","wir",2],["vocês","ihr",3],["eles","sie",3]];
var END={ar:["o","a","amos","am"],er:["o","e","emos","em"],ir:["o","e","imos","em"]};
function form(v,p){ var g=v.slice(-2), st=v.slice(0,-2); return st+END[g][p]; }
var VT=null;
function verbStart(){ VT={k:0,n:10,ok:0}; verbNeu(); }
function verbNeu(){
  var L=VERBEN.pt, v=L[Math.floor(Math.random()*L.length)], p=PERS[Math.floor(Math.random()*PERS.length)];
  var richtig=form(v[0],p[2]), g=v[0].slice(-2), opts=[richtig];
  [0,1,2,3].forEach(function(i){ var f=form(v[0],i); if(opts.indexOf(f)<0) opts.push(f); });
  ["ar","er","ir"].forEach(function(gg){ if(gg!==g){ var f=v[0].slice(0,-2)+END[gg][p[2]]; if(opts.indexOf(f)<0 && opts.length<4) opts.push(f); } });
  opts=opts.slice(0,4).sort(function(){ return Math.random()-.5; });
  VT.v=v; VT.p=p; VT.r=richtig; VT.o=opts; VT.wahl=null; VT.fb=null; verbView();
}
function verbView(){
  if(VT.k>=VT.n) return render('<div class="card"><h2>Verben-Trainer</h2><p class="big">'+VT.ok+' / '+VT.n+'</p></div><button class="btn" onclick="verbStart()">Noch eine Runde</button><button class="btn ghost" onclick="gramMenu()">Zurück</button>');
  var g=VT.v[0].slice(-2), endg=END[g][VT.p[2]];
  render('<button class="back" onclick="gramMenu()">‹ zurück</button><p class="sub">Verben-Trainer · '+(VT.k+1)+' von '+VT.n+'</p>'+
  '<div class="card"><p class="note" style="margin:0 0 6px">'+VT.v[0]+' = '+VT.v[1]+' · <b>-'+g+'</b>-Verb</p><p class="prompt" style="font-size:24px">'+VT.p[0]+' … <small style="opacity:.7">('+VT.p[1]+')</small></p></div>'+
  VT.o.map(function(o,k){ var st=""; if(VT.fb && o===VT.r) st="border-color:var(--accent);background:rgba(143,214,169,.12)"; else if(VT.fb && VT.wahl===k) st="border-color:var(--bad);background:rgba(235,128,115,.12)"; else if(VT.wahl===k) st="border-color:var(--accent)";
    return '<button class="tile" style="'+st+'" onclick="verbWahl('+k+')"><span class="ic">'+String.fromCharCode(65+k)+'</span><span>'+VT.p[0]+' '+o+'</span></button>'; }).join("")+
  (VT.fb ? '<div class="card" style="border-color:var(--'+(VT.fb.ok?"accent":"bad")+')"><p style="margin:0 0 4px;font-weight:800;color:var(--'+(VT.fb.ok?"accent":"bad")+')">'+(VT.fb.ok?"Richtig.":"Nicht ganz.")+'</p><p class="note" style="margin:0">-'+g+' + '+VT.p[0]+' → <b>-'+endg+'</b>: '+VT.p[0]+' '+VT.r+'</p><button class="btn" onclick="verbWeiter()">Weiter</button></div>'
         : '<button class="btn" '+(VT.wahl==null?'disabled style="opacity:.4"':'')+' onclick="verbCheck()">Prüfen</button>'));
}
function verbWahl(k){ if(VT.fb) return; VT.wahl=k; verbView(); }
function verbCheck(){ var ok=VT.o[VT.wahl]===VT.r; VT.fb={ok:ok}; if(ok) VT.ok++; try{ speak(VT.p[0]+" "+VT.r); }catch(e){} verbView(); }
function verbWeiter(){ VT.k++; verbNeu(); }
function merkliste(){
  var tabs=L().filter(function(l){ return l.tab||l.merk; });
  render('<button class="back" onclick="gramMenu()">‹ zurück</button><h2>📋 Merkliste</h2><p class="note" style="margin-bottom:12px">Alles Wichtige auf einen Blick — zum Einprägen und Nachschauen.</p>'+
    tabs.map(function(l){ return '<p class="sub" style="margin-top:14px">'+l.ic+' '+l.t+'</p>'+(l.tab?'<div class="card" style="overflow-x:auto">'+l.tab+'</div>':'')+(l.merk?'<p class="note">💡 '+l.merk+'</p>':''); }).join("")+
    L().filter(function(l){ return !l.tab; }).map(function(l){ return '<p class="sub" style="margin-top:14px">'+l.ic+' '+l.t+'</p><div class="card">'+l.bsp.map(function(b){ return '<p style="margin:4px 0"><b>'+b[0]+'</b> <span class="note">— '+b[1]+'</span></p>'; }).join("")+'</div>'; }).join(""));
}
window.verbStart=verbStart; window.verbWahl=verbWahl; window.verbCheck=verbCheck; window.verbWeiter=verbWeiter; window.merkliste=merkliste;
function da(){ return !!G[S.rubrik]; }
function L(){ return G[S.rubrik]||[]; }
function fertig(){ S.gram=S.gram||{}; S.gram[S.rubrik]=S.gram[S.rubrik]||{}; return S.gram[S.rubrik]; }
var Q=null;
function gramMenu(){
  var f=fertig(), n=L().filter(function(l,i){ return f[i]; }).length;
  render('<button class="back" onclick="home()">‹ zurück</button><h2>Grammatik — die Basics</h2>'+
  '<p class="note" style="margin-bottom:14px">Kurz erklärt, mit Beispielen zum Anhören, danach zwei schnelle Fragen. Am besten der Reihe nach — das ist das Gerüst, in das später alle Sätze passen.</p>'+
  '<div class="card" style="padding:14px 16px"><p class="sub">Stand</p><p style="margin:6px 0 0;font-weight:700">'+n+' von '+L().length+' Lektionen verstanden</p></div>'+
  '<button class="tile" onclick="merkliste()"><span class="ic">📋</span><span>Merkliste<small>alle Tabellen und Regeln auf einen Blick</small></span><span class="chev">›</span></button>'+
  (VERBEN[S.rubrik]?'<button class="tile" onclick="verbStart()"><span class="ic">🏋️</span><span>Verben-Trainer<small>Verb + Person → richtige Endung, mit Regel dazu</small></span><span class="chev">›</span></button>':'')+
  '<p class="sub" style="margin-top:14px">Lektionen</p>'+
  L().map(function(l,i){ return '<button class="tile" onclick="gramLektion('+i+')"'+(!f[i]&&(i===0||f[i-1])?' style="border-color:var(--accent)"':'')+'><span class="ic">'+l.ic+'</span><span>'+(i+1)+'. '+l.t+(f[i]?' <span class="done">· ✓</span>':'')+'</span><span class="chev">›</span></button>'; }).join(""));
}
function gramLektion(i){
  var l=L()[i];
  render('<button class="back" onclick="gramMenu()">‹ zurück</button><p class="sub">Lektion '+(i+1)+' von '+L().length+'</p><h2>'+l.ic+' '+l.t+'</h2>'+
  '<div class="card"><p style="margin:0;line-height:1.55">'+l.text+'</p></div>'+
  (l.tab? '<div class="card" style="overflow-x:auto">'+l.tab+'</div>' : '')+
  (l.merk? '<div class="card" style="border-color:var(--accent)"><p style="margin:0;line-height:1.5">💡 '+l.merk+'</p></div>' : '')+
  '<p class="sub">Beispiele — antippen zum Anhören</p>'+
  l.bsp.map(function(b){ return '<button class="tile" onclick="speak('+JSON.stringify(b[0].replace(/<[^>]+>/g,"").replace(/ \/ /g,", ")).replace(/"/g,"&quot;")+')"><span class="ic">🔊</span><span>'+b[0]+'<small>'+b[1]+'</small></span></button>'; }).join("")+
  '<button class="btn" onclick="gramQuiz('+i+')">Verstanden — kurz prüfen</button>');
}
function gramQuiz(i){ Q={l:i, k:0, wahl:null, fb:null, ok:0}; gramFrage(); }
function gramFrage(){
  var l=L()[Q.l], q=l.q[Q.k];
  if(!q){
    var alle=Q.ok===l.q.length; if(alle){ fertig()[Q.l]=true; save(); }
    return render('<div class="card"><h2>'+(alle?"Sitzt ✓":"Fast")+'</h2><p class="note">'+Q.ok+' von '+l.q.length+' richtig.'+(alle?"":" Lies die Erklärung nochmal und probier es dann wieder.")+'</p></div>'+
      (alle && L()[Q.l+1] ? '<button class="btn" onclick="gramLektion('+(Q.l+1)+')">Nächste Lektion: '+L()[Q.l+1].t+'</button>' : '')+
      (!alle ? '<button class="btn" onclick="gramLektion('+Q.l+')">Erklärung nochmal</button>' : '')+
      '<button class="btn ghost" onclick="gramMenu()">Zur Übersicht</button>');
  }
  render('<button class="back" onclick="gramLektion('+Q.l+')">‹ zur Erklärung</button><p class="sub">'+l.t+' · Frage '+(Q.k+1)+' von '+l.q.length+'</p>'+
  '<div class="card"><p class="prompt" style="font-size:22px">'+q.f+'</p></div>'+
  q.o.map(function(o,k){
    var st=""; if(Q.fb && k===q.a) st="border-color:var(--accent);background:rgba(143,214,169,.12)"; else if(Q.fb && Q.wahl===k) st="border-color:var(--bad);background:rgba(235,128,115,.12)"; else if(Q.wahl===k) st="border-color:var(--accent)";
    return '<button class="tile" style="'+st+'" onclick="gramWahl('+k+')"><span class="ic">'+String.fromCharCode(65+k)+'</span><span>'+o+'</span></button>'; }).join("")+
  (Q.fb ? '<div class="card" style="border-color:var(--'+(Q.fb.ok?"accent":"bad")+')"><p style="margin:0 0 4px;font-weight:800;color:var(--'+(Q.fb.ok?"accent":"bad")+')">'+(Q.fb.ok?"Richtig.":"Nicht ganz.")+'</p><p class="note" style="margin:0">'+q.w+'</p><button class="btn" onclick="gramWeiter()">Weiter</button></div>'
        : '<button class="btn" '+(Q.wahl==null?'disabled style="opacity:.4"':'')+' onclick="gramCheck()">Prüfen</button>'));
}
function gramWahl(k){ if(Q.fb) return; Q.wahl=k; var o=L()[Q.l].q[Q.k].o[k]; if(/[a-zà-ÿа-яёͰ-Ͽ]/i.test(o) && !/^(männlich|weiblich|sächlich)$/.test(o)) try{ speak(o.replace(/ — .*/,"")); }catch(e){} gramFrage(); }
function gramCheck(){ var q=L()[Q.l].q[Q.k]; Q.fb={ok:Q.wahl===q.a}; if(Q.fb.ok) Q.ok++; gramFrage(); }
function gramWeiter(){ Q.k++; Q.wahl=null; Q.fb=null; gramFrage(); }
window.gramDa=da; window.gramMenu=gramMenu; window.gramLektion=gramLektion; window.gramQuiz=gramQuiz; window.gramWahl=gramWahl; window.gramCheck=gramCheck; window.gramWeiter=gramWeiter;
window.gramOffen=function(){ var f=fertig(); return L().filter(function(l,i){ return !f[i]; }).length; };
window.GRAM=G;
})();
