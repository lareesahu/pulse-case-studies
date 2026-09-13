(()=>{
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.studio-card').forEach(card=>{
    const stage=card.querySelector('.studio-stage'),scene=stage?.querySelector('.studio-scene');if(!scene)return;
    if(card.id==='cover-wekwikgene'){
      stage.innerHTML='<div class="dna-cover" aria-label="Animated WeKwikGene DNA ring model"><div class="dna-halo"></div><div class="dna-orbit dna-orbit-a"></div><div class="dna-orbit dna-orbit-b"></div><img class="dna-ring" src="../wekwikgene-case-study/assets/dna-loop-poster.webp" alt="WeKwikGene DNA ring model"><span class="dna-caption">ORIGINAL 3D MODEL / WEKWIKGENE</span></div>';
      const dna=stage.querySelector('.dna-cover');let t=0,frame=0;
      const tick=()=>{t+=.006;dna.style.setProperty('--dna-x',`${Math.sin(t)*7}px`);dna.style.setProperty('--dna-y',`${Math.cos(t*.83)*5}px`);dna.style.setProperty('--dna-rotate',`${Math.sin(t*.7)*3}deg`);frame=requestAnimationFrame(tick)};
      if(!reduced.matches)tick();
      card.addEventListener('pointerleave',()=>{dna.style.setProperty('--dna-hover','0')});
      card.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();dna.style.setProperty('--dna-hover',`${(((e.clientX-r.left)/r.width)-.5)*2}`)});
      return;
    }
    const screen=scene.querySelector('.studio-screen'),notch=scene.querySelector('.studio-notch');
    scene.querySelector('.studio-material')?.remove();scene.querySelector('.studio-bg')?.remove();
    const surface=document.createElement('div');surface.className='studio-surface';surface.setAttribute('aria-hidden','true');
    const shadow=document.createElement('div');shadow.className='device-shadow';shadow.setAttribute('aria-hidden','true');
    const device=document.createElement('div');device.className='studio-device';device.setAttribute('aria-hidden','true');
    const bezel=document.createElement('div');bezel.className='device-bezel';if(screen){bezel.append(screen);if(notch)bezel.append(notch)}device.append(bezel);
    const base=document.createElement('div');base.className='device-base';device.append(base);scene.replaceChildren(surface,shadow,device);
    let raf=0;const tilt=(x,y)=>{card.style.setProperty('--tilt-x',`${x.toFixed(2)}deg`);card.style.setProperty('--tilt-y',`${y.toFixed(2)}deg`)};
    const reset=()=>{cancelAnimationFrame(raf);tilt(0,0);card.classList.remove('is-tilting')};
    card.addEventListener('pointermove',e=>{if(reduced.matches||e.pointerType==='touch')return;const r=stage.getBoundingClientRect(),x=((e.clientX-r.left)/r.width-.5)*2,y=((e.clientY-r.top)/r.height-.5)*2;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{card.classList.add('is-tilting');tilt(-y*1.25,x*2.5)})});
    card.addEventListener('pointerleave',reset);card.addEventListener('focusin',()=>{if(!reduced.matches)card.classList.add('is-tilting')});card.addEventListener('focusout',reset);
  });
})();
