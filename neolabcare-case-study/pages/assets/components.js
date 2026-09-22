/**
 * NeolabCare Shared Components v4.0
 * Universal single-source nav + footer for ALL pages (including homepage).
 * Include: <link rel="stylesheet" href="PATH/assets/components.css">
 *          <script src="PATH/assets/components.js"></script>
 * Pages need: <div id="nav-container"></div> and <div id="footer-container"></div>
 */
(function() {
  'use strict';

  var path = window.location.pathname;
  var inBlog = path.indexOf('/blog/') !== -1;
  var base = inBlog ? '..' : '.';

  function active(name) {
    var p = path.replace(/\/$/, '').split('/').pop().replace('.html', '');
    if (p === '' || p === 'index') return name === 'index' ? ' active' : '';
    if (name === 'blog' && (p === 'blog' || inBlog)) return ' active';
    return p === name ? ' active' : '';
  }

  // ── NAV ────────────────────────────────────────────────────
  var navC = document.getElementById('nav-container');
  if (navC) {
    navC.innerHTML =
      '<nav id="mainNav">' +
        '<a href="' + base + '/index.html" class="nl-logo">' +
          '<img src="' + base + '/assets/logo-large-gold.svg" alt="neolab.care">' +
        '</a>' +
        '<div class="nl-links" id="nlLinks">' +
          '<a href="' + base + '/index.html#product" class="nl-link' + active('index') + '">Formula</a>' +
          '<a href="' + base + '/freshness.html" class="nl-link' + active('freshness') + '">Freshness</a>' +
          '<a href="' + base + '/story.html" class="nl-link' + active('story') + '">Story</a>' +
          '<a href="' + base + '/blog.html" class="nl-link' + active('blog') + '">Blog</a>' +
        '</div>' +
        '<div class="nl-right">' +
          '<a href="https://neolab-care.myshopify.com/cart/46842674184331:1" class="nl-cta">Reserve</a>' +
          '<button class="nl-ham" id="nlHam" aria-label="Menu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</nav>' +
      '<div class="nl-overlay" id="nlOverlay">' +
        '<div class="nl-overlay-bg"></div>' +
        '<div class="nl-overlay-panel">' +
          '<a href="' + base + '/index.html#product" class="nl-ov-link">The Formula</a>' +
          '<a href="' + base + '/freshness.html" class="nl-ov-link">Freshness Cycle</a>' +
          '<a href="' + base + '/index.html#science" class="nl-ov-link">The Science</a>' +
          '<a href="' + base + '/story.html" class="nl-ov-link">Our Story</a>' +
          '<div class="nl-ov-divider"></div>' +
          '<a href="' + base + '/creator-partner.html" class="nl-ov-link">Creator Partners</a>' +
          '<a href="' + base + '/blog.html" class="nl-ov-link">Blog</a>' +
          '<a href="https://neolab-care.myshopify.com/cart/46842674184331:1" class="nl-ov-cta">Reserve Signature</a>' +
        '</div>' +
      '</div>';

    // Staggered link animation on open — inject keyframes once
    if (!document.getElementById('nl-ov-styles')) {
      var st = document.createElement('style');
      st.id = 'nl-ov-styles';
      st.textContent =
        '.nl-overlay.open .nl-ov-link { animation: nlOvLinkIn 0.4s cubic-bezier(.22,1,.36,1) both; }' +
        '.nl-overlay.open .nl-ov-link:nth-child(1) { animation-delay: 0.05s; }' +
        '.nl-overlay.open .nl-ov-link:nth-child(2) { animation-delay: 0.09s; }' +
        '.nl-overlay.open .nl-ov-link:nth-child(3) { animation-delay: 0.13s; }' +
        '.nl-overlay.open .nl-ov-link:nth-child(4) { animation-delay: 0.17s; }' +
        '.nl-overlay.open .nl-ov-link:nth-child(6) { animation-delay: 0.21s; }' +
        '.nl-overlay.open .nl-ov-link:nth-child(7) { animation-delay: 0.25s; }' +
        '.nl-overlay.open .nl-ov-cta { animation: nlOvCtaIn 0.4s 0.29s cubic-bezier(.22,1,.36,1) both; }' +
        '@keyframes nlOvLinkIn { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }' +
        '@keyframes nlOvCtaIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }';
      document.head.appendChild(st);
    }
  }

  // ── FOOTER ─────────────────────────────────────────────────
  var ftC = document.getElementById('footer-container');
  if (ftC) {
    ftC.innerHTML =
      '<footer>' +
        '<div class="wrap"><div class="ft-grid">' +
          '<div>' +
            '<div class="ft-logo"><a href="' + base + '/index.html"><img src="' + base + '/assets/logo-large-gold.svg" alt="neolab.care"></a></div>' +
            '<div class="ft-tag">A lab-fresh, 9-in-1 skin treatment.<br>One pump a day. Delivered at peak potency.</div>' +
          '</div>' +
          '<div><div class="ft-hd">Product</div>' +
            '<a href="' + base + '/index.html" class="ft-lnk">Reserve Signature</a>' +
            '<a href="' + base + '/index.html#product" class="ft-lnk">The Formula</a>' +
            '<a href="' + base + '/freshness.html" class="ft-lnk">Freshness Cycle</a>' +
          '</div>' +
          '<div><div class="ft-hd">Partners</div>' +
            '<a href="' + base + '/creator-partner.html" class="ft-lnk">Creator Partner Program</a>' +
            '<a href="' + base + '/partner-dashboard.html" class="ft-lnk">Partner Dashboard</a>' +
          '</div>' +
          '<div><div class="ft-hd">Company</div>' +
            '<a href="' + base + '/story.html" class="ft-lnk">Our Story</a>' +
            '<a href="' + base + '/blog.html" class="ft-lnk">Blog</a>' +
            '<a href="' + base + '/investors.html" class="ft-lnk">Investors</a>' +
          '</div>' +
          '<div><div class="ft-hd">Contact</div>' +
            '<a href="mailto:hello@neolab.care" class="ft-lnk">hello@neolab.care</a>' +
            '<a href="https://www.instagram.com/neolabcare/" target="_blank" class="ft-lnk">Instagram</a>' +
            '<a href="https://www.tiktok.com/@neolabcare" target="_blank" class="ft-lnk">TikTok</a>' +
            '<a href="https://www.linkedin.com/in/lareesahu/" target="_blank" class="ft-lnk">LinkedIn</a>' +
          '</div>' +
        '</div>' +
        '<div class="ft-btm" style="display:flex;align-items:center;gap:10px;padding:18px 0 14px;border-top:1px solid var(--border,rgba(200,184,154,.10));margin-top:8px;flex-wrap:wrap;justify-content:space-between">' +
          '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
            '<span style="font-size:0.67rem;color:var(--muted,rgba(245,245,240,.52));letter-spacing:0.1em;text-transform:uppercase">Secure Checkout</span>' +
            '<!-- Visa --><svg height="22" viewBox="0 0 38 24" aria-label="Visa"><rect width="38" height="24" rx="4" fill="#1A1F71"/><path d="M15.6 7.2l-2.4 9.6h-2.4l2.4-9.6h2.4zm10.3 6.2l1.3-3.5.7 3.5h-2zm2.7 3.4H31l-1.9-9.6h-2c-.5 0-.9.3-1.1.7l-3.4 8.9h2.4l.5-1.3h2.9l.2 1.3zm-6-6.5c0 2.4-3.3 2.5-3.3 3.6 0 .3.3.7 1 .8-.4.6-1 1-1.8 1-1.1 0-1.7-.6-1.7-.6l-.3 1.8s.8.4 1.9.4c2.1 0 3.6-1.1 3.6-2.7 0-2.5-3.4-2.6-3.4-3.6 0-.3.3-.6.9-.7.9-.1 1.8.3 2.4.7l.3-1.8c-.6-.3-1.4-.5-2.3-.5-2 0-3.4 1-3.4 2.6z" fill="#fff"/></svg>' +
            '<!-- MC --><svg height="22" viewBox="0 0 38 24" aria-label="Mastercard"><rect width="38" height="24" rx="4" fill="#252525"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 7.3a7 7 0 0 1 0 9.4 7 7 0 0 1 0-9.4z" fill="#FF5F00"/></svg>' +
            '<!-- Amex --><svg height="22" viewBox="0 0 38 24" aria-label="Amex"><rect width="38" height="24" rx="4" fill="#2E77BC"/><text x="4" y="17" font-family="Arial" font-weight="bold" font-size="11" fill="white">AMEX</text></svg>' +
            '<!-- WeChat Pay --><svg height="22" viewBox="0 0 52 24" aria-label="WeChat Pay"><rect width="52" height="24" rx="4" fill="#07C160"/><text x="5" y="15" font-family="Arial" font-size="8" font-weight="bold" fill="white">WeChat Pay</text></svg>' +
            '<!-- Alipay --><svg height="22" viewBox="0 0 44 24" aria-label="Alipay"><rect width="44" height="24" rx="4" fill="#1677FF"/><text x="5" y="16" font-family="Arial" font-size="9" font-weight="bold" fill="white">Alipay</text></svg>' +
          '</div>' +
          '<div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">' +
            '<span>&copy; 2026 NeolabCare. All rights reserved.</span>' +
            '<a href="' + base + '/privacy-policy.html" style="color:var(--muted,rgba(245,245,240,.52));text-decoration:none;font-size:0.72rem">Privacy Policy</a>' +
            '<a href="' + base + '/cookie-policy.html" style="color:var(--muted,rgba(245,245,240,.52));text-decoration:none;font-size:0.72rem">Cookie Policy</a>' +
            '<span style="font-size:0.72rem">Signature &middot; Produced to Order</span>' +
          '</div>' +
        '</div></div>' +
      '</footer>';
  }

  // ── SCROLL ─────────────────────────────────────────────────
  var nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('sc', window.scrollY > 50);
    }, { passive: true });
    if (window.scrollY > 50) nav.classList.add('sc');
  }

  // ── HAMBURGER TOGGLE ───────────────────────────────────────
  var ham = document.getElementById('nlHam');
  var ov = document.getElementById('nlOverlay');

  // Disable body scroll when overlay is open
  function openMenu() {
    if (ov) { ov.classList.add('open'); document.body.style.overflow = 'hidden'; }
    if (ham) ham.classList.add('open');
  }
  function closeMenu() {
    if (ov) { ov.classList.remove('open'); document.body.style.overflow = ''; }
    if (ham) ham.classList.remove('open');
  }

  // Click / touch handler
  if (ham) {
    ham.addEventListener('click', function(e) {
      e.stopPropagation();
      ov && ov.classList.contains('open') ? closeMenu() : openMenu();
    });
  }

  // Close on overlay bg click
  if (ov) {
    ov.addEventListener('click', function(e) {
      if (e.target === ov || e.target.classList.contains('nl-overlay-bg')) {
        closeMenu();
      }
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && ov && ov.classList.contains('open')) closeMenu();
  });

  // Close on link click
  var ovLinks = document.querySelectorAll('.nl-ov-link, .nl-ov-cta');
  for (var i = 0; i < ovLinks.length; i++) {
    ovLinks[i].addEventListener('click', closeMenu);
  }

})();
