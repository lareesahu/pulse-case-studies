(() => {
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 1001px) and (pointer: fine)');
  const toggle = $('.motion-toggle');
  const originals = new Map();
  const ambient = $$('video[data-ambient]');
  const inView = new Set();
  let paused = false, context, lenis, ticker, progressFrame, refreshFrame;
  const moving = () => !paused && !reduced.matches;
  // Source-paced motion; layout mechanics are shared, not a universal brand theme.
  const robotist = document.body.classList.contains('robotist');
  const neolabcare = document.body.classList.contains('neolabcare');
  const motion = { duration: robotist ? .6 : neolabcare ? 1 : .9, distance: neolabcare ? 20 : 24, stagger: robotist ? .08 : neolabcare ? .15 : .045, control: robotist ? .32 : .6 };

  function refresh() {
    cancelAnimationFrame(refreshFrame);
    refreshFrame = requestAnimationFrame(() => {
      window.ScrollTrigger?.refresh();
      readingProgress();
    });
  }
  function readingProgress() {
    cancelAnimationFrame(progressFrame);
    progressFrame = requestAnimationFrame(() => {
      const length = document.documentElement.scrollHeight - innerHeight;
      const progress = length > 0 ? Math.min(1, Math.max(0, scrollY / length)) : 0;
      const bar = $('.progress');
      if (bar) bar.style.transform = `scaleX(${progress})`;
    });
  }
  function syncAmbient() {
    ambient.forEach(video => {
      if (moving() && !document.hidden && inView.has(video)) video.play().catch(() => {});
      else video.pause();
    });
  }
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) inView.add(target);
      else inView.delete(target);
    });
    syncAmbient();
  }, { threshold: .25 });
  ambient.forEach(video => videoObserver.observe(video));

  // Native image links work without JavaScript; the dialog is additive.
  const links = $$('.image-link');
  let dialog, expanded, caption, returnFocus;
  if (links.length && typeof HTMLDialogElement !== 'undefined') {
    dialog = document.createElement('dialog');
    dialog.setAttribute('aria-label', 'Expanded original artwork');
    const form = document.createElement('form');
    form.method = 'dialog';
    const close = document.createElement('button');
    close.textContent = 'Close ×';
    form.append(close);
    expanded = document.createElement('img');
    caption = document.createElement('p');
    dialog.append(form, expanded, caption);
    document.body.append(dialog);
    links.forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      returnFocus = link;
      expanded.src = link.href;
      expanded.alt = link.querySelector('img')?.alt || 'Original artwork';
      caption.textContent = link.closest('figure')?.querySelector('figcaption')?.textContent || expanded.alt;
      lenis?.stop();
      dialog.showModal();
    }));
    dialog.addEventListener('close', () => {
      lenis?.start();
      returnFocus?.focus({ preventScroll: true });
      refresh();
    });
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }

  // Each selector is a small source-artwork viewer, not a simulated product.
  $$('[data-selector]').forEach(group => {
    const controls = group.querySelector('.selection');
    const buttons = [...group.querySelectorAll('[data-select]')];
    const panels = [...group.querySelectorAll('[data-panel]')];
    if (!controls || !panels.length) return;
    controls.hidden = false;
    const first = buttons.find(button => button.getAttribute('aria-pressed') === 'true') || buttons[0];
    panels.forEach(panel => {
      panel.id = `${group.dataset.selector}-${panel.dataset.panel}`;
      panel.hidden = panel.dataset.panel !== first.dataset.select;
    });
    buttons.forEach(button => {
      button.setAttribute('aria-controls', `${group.dataset.selector}-${button.dataset.select}`);
      button.addEventListener('click', () => {
        if (button.getAttribute('aria-pressed') === 'true') return;
        buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
        panels.forEach(panel => {
          window.gsap?.killTweensOf(panel);
          const active = panel.dataset.panel === button.dataset.select;
          panel.hidden = !active;
          if (active && moving() && window.gsap) {
            gsap.fromTo(panel, { opacity: .3, y: 12 }, { opacity: 1, y: 0, duration: motion.control, ease: 'power3.out', clearProps: 'opacity,transform' });
          } else { panel.style.removeProperty('opacity'); panel.style.removeProperty('transform'); }
        });
        if (group.dataset.selector === 'flavours') group.dataset.flavour = button.dataset.select;
        refresh();
      });
    });
  });

  function splitHeading(heading) {
    originals.set(heading, heading.innerHTML);
    heading.setAttribute('aria-label', heading.innerText.replace(/\s+/g, ' ').trim());
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(part => {
        if (!part.trim()) fragment.append(document.createTextNode(part));
        else {
          const word = document.createElement('span');
          word.className = 'motion-word';
          word.setAttribute('aria-hidden', 'true');
          word.textContent = part;
          fragment.append(word);
        }
      });
      node.replaceWith(fragment);
    });
    return heading.querySelectorAll('.motion-word');
  }
  function clearMotion() {
    context?.revert(); context = null;
    if (ticker) window.gsap?.ticker.remove(ticker);
    ticker = null;
    lenis?.destroy(); lenis = null;
    originals.forEach((html, heading) => { heading.innerHTML = html; heading.removeAttribute('aria-label'); });
    originals.clear();
    $$('.selector-panel').forEach(panel => {
      window.gsap?.killTweensOf(panel);
      panel.style.removeProperty('opacity');panel.style.removeProperty('transform');
    });
  }
  function setupMotion() {
    clearMotion();
    document.documentElement.dataset.motion = moving() ? 'on' : 'off';
    if (toggle) {
      toggle.hidden = false;
      toggle.textContent = reduced.matches ? 'Reduced motion' : paused ? 'Motion off' : 'Motion on';
      toggle.setAttribute('aria-pressed', String(!moving()));
      toggle.disabled = reduced.matches;
    }
    if (!moving() || !window.gsap || !window.ScrollTrigger) { syncAmbient(); refresh(); return; }
    gsap.registerPlugin(ScrollTrigger);
    if (desktop.matches && window.Lenis) {
      lenis = new Lenis({ duration: .85, smoothWheel: true, syncTouch: false, anchors: false });
      lenis.on('scroll', ScrollTrigger.update);
      ticker = time => { if (!document.hidden) lenis?.raf(time * 1000); };
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }
    context = gsap.context(() => {
      if (scrollY < 100) {
        const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } });
        const title = $('.hero h1, .collection-hero h1');
        const artwork = $('.hero-art');
        if (title) entrance.from(title, { y: motion.distance, opacity: .5, duration: motion.duration });
        if (artwork) entrance.from(artwork, { y: motion.distance, opacity: .55, duration: motion.duration }, .1);
      }
      $$('.reveal').forEach(element => {
        if (element.matches('h2,h3') && !robotist) {
          gsap.from(splitHeading(element), { y: motion.distance, opacity: .18, duration: motion.duration, stagger: motion.stagger, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 93%', once: true } });
        } else {
          gsap.from(element, { y: motion.distance, opacity: .4, duration: motion.duration, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 95%', once: true } });
        }
      });
      $$('.swatches').forEach(group => gsap.from(group.children, { y: motion.distance, opacity: .4, duration: motion.duration, stagger: motion.stagger, scrollTrigger: { trigger: group, start: 'top 90%', once: true } }));
      if (desktop.matches && $('.hero-art')) gsap.to('.hero-art', { yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .5 } });
    });
    syncAmbient(); refresh();
  }
  toggle?.addEventListener('click', () => { paused = !paused; setupMotion(); });
  reduced.addEventListener('change', setupMotion);
  desktop.addEventListener('change', setupMotion);
  window.addEventListener('scroll', readingProgress, { passive: true });
  window.addEventListener('resize', refresh, { passive: true });
  document.addEventListener('visibilitychange', syncAmbient);
  $$('img').filter(img => img !== expanded).forEach(img => { if (!img.complete) img.addEventListener('load', refresh, { once: true }); });
  $$('details').forEach(detail => detail.addEventListener('toggle', refresh));
  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor || !lenis || !moving()) return;
    const target = document.getElementById(anchor.getAttribute('href').slice(1));
    if (target) { event.preventDefault(); lenis.scrollTo(target, { offset: -80, onComplete: () => { history.replaceState(null, '', anchor.getAttribute('href')); } }); }
  });
  document.fonts?.ready.then(refresh);
  setupMotion();
  window.addEventListener('pagehide', () => {
    clearMotion();videoObserver.disconnect();ambient.forEach(video => video.pause());
    cancelAnimationFrame(progressFrame);cancelAnimationFrame(refreshFrame);
    reduced.removeEventListener('change', setupMotion);desktop.removeEventListener('change', setupMotion);
    window.removeEventListener('scroll', readingProgress);window.removeEventListener('resize', refresh);
    document.removeEventListener('visibilitychange', syncAmbient);
  });
  window.addEventListener('pageshow', event => { if (event.persisted) location.reload(); });
})();
