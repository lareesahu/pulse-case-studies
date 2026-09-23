/* Project covers, animated.
 *
 * Each card carries a recorded clip of the project's own site, sitting over its
 * still inside the same frame the poster used. The still is the poster, the
 * fallback and the reduced-motion state; the clip only fades in once the browser
 * is actually playing it with the card on screen.
 *
 * The Play/Pause previews control in studio.js drives these too, through the
 * studio-pause event, so the whole grid keeps one set of behaviour.
 */
(() => {
  const clips = [...document.querySelectorAll('video.studio-clip')];
  if (!clips.length) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;

  const state = clips.map(el => ({ el, visible: false }));

  function start(s) {
    if (paused || document.hidden || !s.visible) return;
    const p = s.el.play();
    if (p && p.catch) p.catch(() => {});
  }
  function stop(s) {
    s.el.pause();
    s.el.classList.remove('on');
  }

  clips.forEach(el => {
    el.addEventListener('playing', () => el.classList.add('on'));
    el.addEventListener('error', () => {
      el.pause();
      el.classList.remove('on');
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const s = state.find(x => x.el === entry.target);
      if (!s) return;
      s.visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      if (s.visible) start(s);
      else stop(s);
    });
  }, { threshold: [0, 0.5, 0.9] });
  state.forEach(s => observer.observe(s.el));

  function sync() {
    state.forEach(s => (paused || document.hidden ? stop(s) : start(s)));
  }

  addEventListener('studio-pause', event => {
    paused = Boolean(event.detail && event.detail.paused);
    sync();
  });
  reduced.addEventListener('change', () => {
    paused = reduced.matches;
    sync();
  });
  document.addEventListener('visibilitychange', sync);
  addEventListener('pagehide', () => {
    observer.disconnect();
    state.forEach(stop);
  });
})();
