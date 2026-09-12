(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches;
 const control=document.createElement('button');control.className='studio-control';control.type='button';
 document.querySelector('.filters').append(control);
 const label=()=>{control.textContent=paused?'Play previews':'Pause previews';control.setAttribute('aria-pressed',String(paused));};label();
 const screens=[...document.querySelectorAll('.studio-screen')].map(el=>({el,id:el.dataset.project,time:0,visible:false,ready:false}));
 const nativePages=new Set(['robotist','neolabcare','wekwikgene','gramlingo','ancient-science-of-china','brainybaobei']);
 function fit(s){if(s.frame){s.frame.style.transform=`scale(${s.el.clientWidth/1440})`;s.frame.style.height=(1440*s.el.clientHeight/s.el.clientWidth)+'px'}}
 function mount(s){if(s.mounted)return;s.mounted=true;
  if(nativePages.has(s.id)){
   s.frame=document.createElement('iframe');s.frame.title=s.id+' original website preview';s.frame.tabIndex=-1;s.frame.setAttribute('aria-hidden','true');s.frame.setAttribute('sandbox','allow-scripts allow-same-origin');s.frame.src=s.id==='neolabcare'?'../neolabcare-case-study/pages/index.html':`pages/${s.id}-home.html`;s.frame.style.opacity=0;s.el.append(s.frame);fit(s);
  }else if(s.id==='edenne'){
   s.video=document.createElement('video');s.video.muted=true;s.video.playsInline=true;s.video.loop=true;s.video.preload='metadata';s.video.poster=s.el.querySelector('img').src;s.video.src='assets/captures/edenne-tour.mp4';s.el.append(s.video);s.el.querySelector('.studio-poster').style.display='none';s.video.addEventListener('loadeddata',()=>{s.ready=true;if(!paused&&s.visible)s.video.play().catch(()=>{})});
  }else if(s.id==='pulse-growth-engine'){
   s.slide=document.createElement('img');s.slide.src='assets/captures/growth-content.png';s.slide.alt='Growth Engine content packages';s.slide.className='studio-slide';s.el.append(s.slide);s.ready=true;
  }else s.ready=true;
 }
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{const s=screens.find(x=>x.el===e.target);s.visible=e.isIntersecting&&e.intersectionRatio>.15;if(s.visible)mount(s);if(s.video){if(s.visible&&!paused)s.video.play().catch(()=>{});else s.video.pause()}if(!s.visible&&s.frame)s.frame.contentWindow?.postMessage({type:'portfolio-playback',active:false,progress:s.time/26000},location.origin)});},{threshold:[0,.15,.5]});screens.forEach(s=>observer.observe(s.el));
 const resize=new ResizeObserver(()=>screens.forEach(fit));screens.forEach(s=>resize.observe(s.el));
 addEventListener('message',e=>{if(e.origin!==location.origin||e.data?.type!=='portfolio-ready')return;const s=screens.find(x=>x.frame?.contentWindow===e.source);if(s){s.ready=true;s.frame.style.opacity=1;s.el.querySelector('.studio-poster').style.visibility='hidden';}});
 let previous=0,raf;
 const step=now=>{const dt=previous?Math.min(60,now-previous):0;previous=now;if(!paused&&!document.hidden)screens.forEach(s=>{if(!s.visible||!s.ready)return;s.time=(s.time+dt)%26000;const p=s.time/26000;s.el.dataset.playback=p.toFixed(3);
   if(s.frame)s.frame.contentWindow?.postMessage({type:'portfolio-playback',active:true,progress:p},location.origin);
   if(s.slide)s.slide.style.opacity=s.time>8500&&s.time<21000?1:0;
   if(!s.frame&&!s.slide&&!s.video){const img=s.el.querySelector('img');const max=Math.min(Math.max(0,img.clientHeight-s.el.clientHeight),s.el.clientHeight*2);const t=Math.max(0,Math.min(1,(s.time-3000)/18000));img.style.transform=`translateY(${-max*(t*t*(3-2*t))}px)`;}
  });raf=requestAnimationFrame(step);};raf=requestAnimationFrame(step);
 function sync(){try{window.dispatchEvent(new CustomEvent('studio-pause',{detail:{paused}}))}catch(e){}label();screens.forEach(s=>{const active=!paused&&s.visible&&!document.hidden;if(s.video){if(active)s.video.play().catch(()=>{});else s.video.pause()}if(s.frame)s.frame.contentWindow?.postMessage({type:'portfolio-playback',active,progress:s.time/26000},location.origin)})}
 sync();control.onclick=()=>{paused=!paused;sync()};reduced.addEventListener('change',()=>{paused=reduced.matches;sync()});document.addEventListener('visibilitychange',sync);
 addEventListener('pagehide',()=>{cancelAnimationFrame(raf);observer.disconnect();resize.disconnect();screens.forEach(s=>s.video?.pause())});
})();
