// Erzeugt fehlende Aufnahmen mit Azure (läuft in GitHub Actions). Braucht AZURE_SPEECH_KEY und AZURE_SPEECH_REGION.
const vm=require('vm'), fs=require('fs'), path=require('path');
const ROOT=path.join(__dirname,'..');
const KEY=process.env.AZURE_SPEECH_KEY, REGION=(process.env.AZURE_SPEECH_REGION||'swedencentral').trim();
if(!KEY){ console.log('Kein AZURE_SPEECH_KEY gesetzt — nichts zu tun.'); process.exit(0); }
const html=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
const main=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]).join('\n');
const el=()=>new Proxy(function(){},{get:(t,k)=>k==='style'||k==='classList'||k==='dataset'?new Proxy({},{get:()=>()=>{}}):(k==='querySelectorAll'?()=>[]:el()),set:()=>true,apply:()=>el()});
const ctx={console:{log(){},warn(){},error(){}},setTimeout:()=>0,setInterval:()=>0,clearInterval(){},clearTimeout(){},
 localStorage:{getItem:()=>null,setItem(){}},sessionStorage:{getItem:()=>null,setItem(){}},navigator:{},
 document:{getElementById:()=>el(),querySelector:()=>null,querySelectorAll:()=>[],createElement:()=>el(),addEventListener(){},body:el(),documentElement:el(),hidden:false},
 location:{hash:'#gen',search:''},fetch:()=>new Promise(()=>{}),TextEncoder,URL:{createObjectURL:()=>''},Blob:function(){},
 matchMedia:()=>({matches:false,addEventListener(){}})};
ctx.window=ctx; ctx.scrollTo=()=>{}; ctx.speechSynthesis={getVoices:()=>[],cancel(){},speak(){}}; ctx.addEventListener=()=>{};
vm.createContext(ctx);
vm.runInContext(main,ctx);
for(const f of ['profil.js','stimmen.js','bild.js','grammatik.js']) vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT,'gen.js'),'utf8').replace('setTimeout(function(){ seite(""); }, 300);','window.__texte=texte;'),ctx);
const o=ctx.__texte(), AZ=ctx.ttsAZ, hash=ctx.ttsHash;
const lang={}; Object.keys(AZ).forEach(c=>{ lang[AZ[c].f]=AZ[c].l; lang[AZ[c].m]=AZ[c].l; });
const idxPath=path.join(ROOT,'audio','index.json');
const idx=fs.existsSync(idxPath)?JSON.parse(fs.readFileSync(idxPath,'utf8')):{};
const have={}; Object.keys(idx).forEach(v=>have[v]=new Set(idx[v]));
const jobs=[]; Object.keys(o).forEach(v=>Object.keys(o[v]).forEach(h=>{ if(!(have[v]&&have[v].has(h))) jobs.push({v,h,t:o[v][h]}); }));
const LIMIT=parseInt(process.env.MAX_ITEMS||'2500',10);
console.log=(...a)=>process.stdout.write(a.join(' ')+'\n');
console.log('Fehlende Aufnahmen:',jobs.length,'· Zeichen:',jobs.reduce((a,j)=>a+j.t.length,0));
const xml=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  let ok=0;
  for(const j of jobs.slice(0,LIMIT)){
    const ssml=`<speak version="1.0" xml:lang="${lang[j.v]}"><voice name="${j.v}">${xml(j.t)}</voice></speak>`;
    let tries=0;
    while(true){
      const t0=Date.now();
      const r=await fetch(`https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,{method:'POST',
        headers:{'Ocp-Apim-Subscription-Key':KEY,'Content-Type':'application/ssml+xml','X-Microsoft-OutputFormat':'audio-24khz-48kbitrate-mono-mp3','User-Agent':'sprint24'},body:ssml});
      if(r.ok){
        const buf=Buffer.from(await r.arrayBuffer());
        fs.mkdirSync(path.join(ROOT,'audio',j.v),{recursive:true});
        fs.writeFileSync(path.join(ROOT,'audio',j.v,j.h+'.mp3'),buf);
        (have[j.v]=have[j.v]||new Set()).add(j.h); ok++;
        if(ok%50===0){ console.log('…',ok); save(); }
        const w=3100-(Date.now()-t0); if(w>0) await sleep(w);
        break;
      }
      if(r.status===429 && tries++<8){ await sleep(60000); continue; }
      console.log('Fehler',r.status,await r.text()); save(); process.exit(r.status===401?1:0);
    }
  }
  save(); console.log('Fertig:',ok,'neue Aufnahmen');
})();
function save(){ const out={}; Object.keys(have).sort().forEach(v=>out[v]=[...have[v]].sort()); fs.writeFileSync(idxPath,JSON.stringify(out)); }
