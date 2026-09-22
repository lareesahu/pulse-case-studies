(()=>{
 document.querySelectorAll('.cookie-consent-box-wrapper,.inquiry-cart-link').forEach(el=>el.style.display='none');
 const reveal='[data-aos],.reveal,.fade-up,.fade-in,.animate-on-scroll';document.querySelectorAll(reveal).forEach(el=>{el.classList.add('in','visible','is-visible','aos-animate');el.style.opacity='1';el.style.visibility='visible';});
 document.querySelectorAll('a,button,input,textarea,select').forEach(e=>{e.tabIndex=-1;if(e.matches('input,textarea,select,button'))e.disabled=true});
 document.addEventListener('click',e=>e.preventDefault(),true);document.addEventListener('submit',e=>e.preventDefault(),true);
 const ready=()=>parent.postMessage({type:'portfolio-ready'},location.origin);
 ready();addEventListener('load',ready,{once:true});
 addEventListener('message',e=>{if(e.source!==parent||e.origin!==location.origin||e.data?.type!=='portfolio-playback')return;let p=e.data.progress;const ease=t=>t*t*(3-2*t);let q=p<.17?0:p<.42?.45*ease((p-.17)/.25):p<.6?.45:.45+.55*ease(Math.min(1,(p-.6)/.27));const max=Math.min(document.documentElement.scrollHeight-innerHeight,innerHeight*3.5);scrollTo(0,Math.max(0,max)*q);document.querySelectorAll('video').forEach(v=>{v.muted=true;if(e.data.active&&v.getBoundingClientRect().top<innerHeight&&v.getBoundingClientRect().bottom>0)v.play().catch(()=>{});else v.pause()});document.body.dataset.playbackProgress=q.toFixed(3)});
})();
