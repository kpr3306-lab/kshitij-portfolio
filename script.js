const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

/* ---- content data (edit links here) ---- */
const skills=[
 ["Data Science / ML","Regression,OLS,Ridge,Lasso,Gradient descent,VIF,Multicollinearity analysis,Market basket analysis"],
 ["AI / Deep Learning","Machine learning,Deep learning,TensorFlow,TinyML,NLP,RAG"],
 ["Embedded and Hardware","ESP32,ESP32-S3,Sensor integration,IoT,Edge AI,Hands-on prototyping"],
 ["Software Development","Python,HTML/CSS/JavaScript,Django,Streamlit,Java/XML,Git"],
 ["Interests","AI,Automotive technology,Embedded systems,IoT,Data-driven applications,RAG systems"]];
const projects=[
 ["AAI Game: Dice Wars","Browser game · Multi-agent AI","A browser-based Dice Wars game developed for an AI and Agent Systems course. The game uses multiple AI agents to handle decision-making and gameplay behaviour.",[["Play live","https://dice-wars-game-7ggopexdxaxprjmoqln7fq.streamlit.app/"],["GitHub","https://github.com/kpr3306-lab/Dice-Wars-Game","alt"]]],
 ["Used Cars Dataset: Statistical Analysis","Regression · t-test · ANOVA · MANOVA · Python","A data-science project on a used-cars dataset, estimating prices with OLS, Ridge and Lasso regression, with VIF-based multicollinearity analysis, log transformation and hypothesis testing (t-test, ANOVA, MANOVA).",[["Live app","https://t-test-anova-manova-on-used-cars-dataset-pyhuzkrdp6a33t5mbwowf.streamlit.app/"],["GitHub","https://github.com/kpr3306-lab/T-test-ANOVA-MANOVA-on-used-cars-dataset","alt"]]],
 ["Monte Carlo Traffic Signal Simulation","Python · Monte Carlo simulation · Traffic systems","A simulation-based project exploring traffic-signal behaviour. Repeated random simulations show how traffic conditions and signals behave under different scenarios.",[["Open Colab","https://colab.research.google.com/drive/1XqWfBDU7I2rapjHfuC2A8bfQ43o86KhQ?usp=sharing"]]],
 ["Markov NLP Playground","NLP · Markov chains · Streamlit · Python","An interactive NLP playground for text generation with Markov-chain language modelling, turning the probabilistic model into an app where users can experiment with generated text.",[["Live app","https://markov-nlp-playground-fk7sykzdqpbwdth3nduyas.streamlit.app/"],["GitHub","https://github.com/kpr3306-lab/Markov-NLP-Playground","alt"]]],
 ["Fire Sentinel: TinyML Smart Fire Detection System","ESP32-S3 · Edge AI · IoT · TensorFlow","An IoT fire detection system built around sensor data and on-device machine learning. The project combines an ESP32-S3, environmental sensors and a machine-learning pipeline for real-time fire-state detection and alerting.",[],true],
 ["RAG Projects and Experiments","Retrieval-augmented generation · AI · Python","An ongoing exploration of retrieval-augmented generation, combining language models with external knowledge and structured retrieval to make AI systems more useful.",[]]];

$('#skillGrid').innerHTML=skills.map(([c,i])=>`<div class="skill reveal"><span class="cat">${c}</span><div class="chips">${i.split(',').map(x=>`<span>${x}</span>`).join('')}</div></div>`).join('');
$('#projList').innerHTML=projects.map(p=>`<article class="proj reveal"><h3>${p[0]}${p[4]?'<span class="badge">Ongoing</span>':''}</h3><span class="tag">${p[1]}</span><p>${p[2]}</p>${p[3].length?`<div class="btns">${p[3].map(([l,u,k])=>`<a class="btn mag ${k||''}" href="${u}" target="_blank" rel="noopener noreferrer">${l} ↗</a>`).join('')}</div>`:''}</article>`).join('');
const tk=["TinyML","ESP32-S3","Regression","RAG","Edge AI","Django","Monte Carlo","Streamlit","TensorFlow","IoT","NLP","Markov chains"];
$('#ticker').innerHTML=[...tk,...tk].map(t=>`<span>${t} ✦</span>`).join('');

const hobs=[["🎸","Guitar"],["🏊","Swimming"],["🎧","Music & podcasts"],["📚","Reading"],["✏️","Sketching"],["🧩","DIY & crafts"],["🖥️","3D modelling"],["🎮","Gaming"]];
$('#hobGrid').innerHTML=`<div class="hob car reveal" style="display:flex;gap:20px;align-items:center"><svg class="gauge" viewBox="0 0 120 70" aria-hidden="true"><path d="M10 62 A50 50 0 0 1 110 62"/><line class="needle" x1="60" y1="62" x2="60" y2="20"/></svg><div><b>🚗 Cars & driving</b><small>One of my two biggest obsessions, right next to technology.</small></div><div class="roadline"></div></div>`+hobs.map(([e,l])=>`<div class="hob reveal"><span>${e}</span>${l}</div>`).join('');
const crafts=[["diy-wall-hanging.jpg","DIY wall hanging made out of waste","-1.8deg","🧵"],["karambit.jpg","Call of Duty inspired karambit","1.2deg","🔪"],["low-poly-parrot.jpg","Low poly parrot","-1deg","🦜"]];
$('#skGrid').innerHTML=crafts.map(([f,t,r,e])=>`<figure class="sk reveal" style="--r:${r}"><div class="ph">${e}<img src="${f}" alt="${t}" loading="lazy" onerror="this.remove()"></div><figcaption>${t}</figcaption></figure>`).join('');

/* ---- hero name: letters pop in ---- */
$('#name').innerHTML=[...'Kshitij'].map((c,i)=>`<span style="animation-delay:${.15+i*.07}s">${c}</span>`).join('');

/* ---- typewriter ---- */
const words=["Building things at the intersection of data, machines & curiosity.","drives, sketches and builds.","teaches sensors to spot a fire.","loves anything with an engine."];
let w=0,ch=0,del=false;const tEl=$('#typed');
(function type(){
  const s=words[w];
  if(reduce){tEl.textContent=s;return}
  tEl.textContent=s.slice(0,ch);
  if(!del&&ch===s.length){del=true;return setTimeout(type,1600)}
  if(del&&ch===0){del=false;w=(w+1)%words.length}
  ch+=del?-1:1;setTimeout(type,del?28:60);
})();

/* ---- oscilloscope hero: cursor height = sensor reading ---- */
const cv=$('#scope'),cx=cv.getContext('2d');let W,H,ty=.7,cur=.7,t=0;
const THRESH=.35; // fraction from top; above this line = alarm
function size(){const r=cv.getBoundingClientRect(),d=devicePixelRatio||1;W=cv.width=r.width*d;H=cv.height=r.height*d}
addEventListener('resize',size);size();
const heroEl=$('#top');
function setTarget(y){const r=heroEl.getBoundingClientRect();ty=Math.min(.95,Math.max(.05,(y-r.top)/r.height))}
addEventListener('pointermove',e=>setTarget(e.clientY));
function css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()}
let lastState=null;
function frame(){
  t+=.02;cur+=(ty-cur)*.06;
  const hot=cur<THRESH,col=hot?css('--ember'):css('--sig');
  cx.clearRect(0,0,W,H);
  // grid
  cx.strokeStyle=css('--line');cx.lineWidth=1;cx.globalAlpha=.5;
  for(let x=0;x<W;x+=W/16){cx.beginPath();cx.moveTo(x,0);cx.lineTo(x,H);cx.stroke()}
  for(let y=0;y<H;y+=H/9){cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke()}
  // threshold line
  cx.globalAlpha=.8;cx.setLineDash([10,10]);cx.strokeStyle=css('--ember');
  cx.beginPath();cx.moveTo(0,H*THRESH);cx.lineTo(W,H*THRESH);cx.stroke();cx.setLineDash([]);
  // wave: amplitude and noise grow as reading rises (cur falls)
  const heat=1-cur,amp=H*(.02+heat*.09),base=H*cur;
  cx.globalAlpha=1;cx.lineWidth=2.5*(devicePixelRatio||1);cx.strokeStyle=col;cx.shadowColor=col;cx.shadowBlur=14;
  cx.beginPath();
  for(let x=0;x<=W;x+=4){
    const n=hot?Math.sin(x*.09+t*9)*amp*.5:0;
    const y=base+Math.sin(x*.012+t*2)*amp+Math.sin(x*.031-t*3)*amp*.4+n;
    x?cx.lineTo(x,y):cx.moveTo(x,y);
  }
  cx.stroke();cx.shadowBlur=0;
  // readout
  const temp=Math.round(20+heat*80);
  $('#temp').textContent=temp+'°';
  if(hot!==lastState){lastState=hot;$('#readout').classList.toggle('hot',hot);$('#state').textContent=hot?'High!':'Normal'}
  if(!reduce)requestAnimationFrame(frame);
}
frame();

/* ---- scroll: progress bar, reveal, active nav ---- */
addEventListener('scroll',()=>{
  const h=document.documentElement;
  $('#bar').style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
},{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}
}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
$$('.reveal').forEach((el,i)=>{el.style.transitionDelay=(['skill','proj','hob','sk'].some(k=>el.classList.contains(k))?(i%3)*.08:0)+'s';io.observe(el)});
const links=$$('nav a'),secs=links.map(a=>$(a.getAttribute('href')));
const spy=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))
}),{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(s=>s&&spy.observe(s));

/* ---- pointer effects (skipped on touch) ---- */
if(matchMedia('(hover:hover)').matches&&!reduce){
  const g=$('#glow');
  addEventListener('pointermove',e=>{g.style.left=e.clientX+'px';g.style.top=e.clientY+'px'});
  $$('.proj').forEach(c=>{
    c.addEventListener('pointermove',e=>{
      const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
      c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
      c.style.transform=`perspective(900px) rotateX(${(.5-y/r.height)*6}deg) rotateY(${(x/r.width-.5)*8}deg) translateY(-3px)`;
    });
    c.addEventListener('pointerleave',()=>c.style.transform='');
  });
  $$('.mag').forEach(b=>{
    b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();
      b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});
    b.addEventListener('pointerleave',()=>b.style.transform='');
  });
}

/* ---- theme toggle ---- */
const root=document.documentElement,tb=$('#theme');
function setTheme(m){root.dataset.theme=m;tb.textContent=m==='light'?'☀':'☾'}
setTheme(matchMedia('(prefers-color-scheme:light)').matches?'light':'dark');
tb.onclick=()=>setTheme(root.dataset.theme==='light'?'dark':'light');