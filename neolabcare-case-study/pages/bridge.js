document.querySelector('#hero')?.classList.add('ld');
document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');
const style=document.createElement('style');style.textContent='.origin-kicker,.origin-header h2,.ofc,.origin-closing,.origin-closing p{opacity:1!important;transform:none!important}.ofc.is-operated .ofc-back{transform:translateY(0)!important;opacity:1!important}';document.head.append(style);
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in','visible')}),{threshold:.03});document.querySelectorAll('.rv,.rvl,.rvr,.reveal,.fade-in').forEach(e=>io.observe(e));
document.addEventListener('click',e=>{const a=e.target.closest('a,button');if(a)e.preventDefault()});document.addEventListener('submit',e=>e.preventDefault());
let live=false;const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const videos=[...document.querySelectorAll('.exhibit-video')];
const videoIO=new IntersectionObserver(es=>es.forEach(e=>{e.target.dataset.onscreen=String(e.isIntersecting);syncVideo(e.target)}),{threshold:.1});videos.forEach(v=>videoIO.observe(v));
function syncVideo(v){if(live&&!reduced.matches&&v.dataset.onscreen==='true'){if(!v.src)v.src=v.dataset.src;v.muted=true;v.play().catch(()=>{});}else v.pause()}
function awake(v){live=v;document.querySelectorAll('*').forEach(e=>{if(getComputedStyle(e).animationName!=='none')e.style.animationPlayState=v&&!reduced.matches?'running':'paused'});videos.forEach(syncVideo)}
function playback(p){
 const max=Math.max(0,document.documentElement.scrollHeight-innerHeight),reserve=location.pathname.includes('crowdfunding');
 const page=location.pathname.split('/').pop();
 const top=selector=>{const e=document.querySelector(selector);return e?Math.max(0,e.getBoundingClientRect().top+scrollY-72):0};
 const start=reserve?Math.min(max,top('#perks')+72):0;
 let end=reserve?Math.min(max,start+innerHeight*.72):page==='index.html'?top('#product')+Math.min(500,innerHeight*.5):Math.min(max,innerHeight*2.3);
 if(page==='story.html')end=Math.min(max,top('.letter-image')||innerHeight*2.3);
 end=Math.max(start,Math.min(max,end));
 const ease=x=>x*x*(3-2*x);
 // Each view settles, travels to a meaningful second composition, then holds.
 const a=.17,b=.42,c=.6,d=.87;
 const travel=p<a?0:p<b?.45*ease((p-a)/(b-a)):p<c?.45:p<d?.45+.55*ease((p-c)/(d-c)):1;
 window.scrollTo(0,start+(end-start)*travel);
 document.body.classList.toggle('past-capture',scrollY>(document.querySelector('.captured-hero')?.offsetHeight||0)-64);
 document.documentElement.dataset.playback=String(p);
 document.documentElement.dataset.captureScroll=String(Math.round(start+(end-start)*travel));
 const card=document.querySelector('.ofc');card?.classList.toggle('is-operated',p>.24&&p<.42);
}
window.addEventListener('message',e=>{if(e.source!==parent||e.origin!==location.origin)return;const d=e.data;if(d.type==='portfolio-playback'){playback(Math.max(0,Math.min(1,d.progress||0)));if(typeof d.active==='boolean'&&live!==d.active)awake(d.active)}});
document.querySelectorAll('.nl-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')?.includes(location.pathname.split('/').pop())));
awake(false);playback(0);
function ready(){playback(0);parent.postMessage({type:'portfolio-ready',page:location.pathname},location.origin)}
window.addEventListener('load',ready);if(document.readyState==='complete')ready();
