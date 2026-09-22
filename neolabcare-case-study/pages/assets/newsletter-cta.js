/* NeoLabCare Blog Newsletter CTA Widget
 * Injects a styled email capture block after the article content.
 * Include with: <script src="../assets/newsletter-cta.js"></script>
 * Requires Klaviyo snippet to be loaded on the page.
 */
(function() {
  'use strict';

  var CSS = '' +
    '.nl-cta-wrap{max-width:720px;margin:48px auto 0;padding:0 24px}' +
    '.nl-cta{border:1px solid rgba(200,184,154,.18);border-radius:2px;padding:clamp(24px,3vw,36px) clamp(20px,4vw,40px);background:#0D0D0D;text-align:center}' +
    '.nl-cta-label{font-family:Poppins,sans-serif;font-weight:600;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C8B89A;margin-bottom:12px}' +
    '.nl-cta-title{font-family:Poppins,sans-serif;font-weight:500;font-size:clamp(1.05rem,2vw,1.25rem);color:rgba(245,245,240,.94);margin-bottom:8px;line-height:1.35}' +
    '.nl-cta-desc{font-size:0.875rem;color:rgba(245,245,240,.52);margin-bottom:20px;line-height:1.55;max-width:420px;margin-left:auto;margin-right:auto}' +
    '.nl-cta-row{display:flex;gap:8px;max-width:420px;margin:0 auto;flex-wrap:wrap;justify-content:center}' +
    '.nl-cta-input{flex:1;min-width:180px;padding:12px 14px;background:#0A0A0A;border:1px solid rgba(200,184,154,.10);color:rgba(245,245,240,.94);font-family:Poppins,sans-serif;font-size:0.9rem;border-radius:2px;outline:none;transition:border-color 0.25s}' +
    '.nl-cta-input:focus{border-color:#C8B89A}' +
    '.nl-cta-btn{padding:12px 20px;background:#C8B89A;color:#000;border:1px solid #C8B89A;font-family:Poppins,sans-serif;font-size:0.85rem;font-weight:600;border-radius:2px;cursor:pointer;white-space:nowrap;transition:background 0.2s}' +
    '.nl-cta-btn:hover{background:#DDD0B8}' +
    '.nl-cta-btn:disabled{opacity:0.5;cursor:not-allowed}' +
    '.nl-cta-success{display:none;color:#7EB89A;font-size:0.9rem;padding:8px 0}' +
    '.nl-cta-error{display:none;color:#C15B5B;font-size:0.8rem;padding:4px 0}' +
    '.nl-cta-fine{font-size:0.7rem;color:rgba(245,245,240,.26);margin-top:8px}';

  function injectCSS() {
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function buildCTA() {
    var wrap = document.createElement('div');
    wrap.className = 'nl-cta-wrap';
    wrap.innerHTML = '' +
      '<div class="nl-cta">' +
        '<p class="nl-cta-label">The Freshness Report</p>' +
        '<p class="nl-cta-title">Your skincare is expiring <em style="font-family:\'Noto Serif Display\',serif;font-style:italic;font-weight:500;color:#C8B89A;">before</em> you open it.</p>' +
        '<p class="nl-cta-desc">Most products degrade in warehouses for months before reaching your shelf. Get our free guide on what actually happens to active ingredients.</p>' +
        '<div class="nl-cta-row" id="nlCtaForm">' +
          '<input type="email" class="nl-cta-input" id="nlCtaEmail" placeholder="you@email.com" autocomplete="email">' +
          '<button class="nl-cta-btn" id="nlCtaBtn">Get the Report</button>' +
        '</div>' +
        '<div class="nl-cta-success" id="nlCtaSuccess">&#10003; Report on its way. Check your inbox.</div>' +
        '<div class="nl-cta-error" id="nlCtaError"><span></span></div>' +
        '<p class="nl-cta-fine">Free. No spam. One email with the full report.</p>' +
      '</div>';
    return wrap;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(msg) {
    var el = document.getElementById('nlCtaError');
    if (el) { el.querySelector('span').textContent = msg; el.style.display = 'block'; }
  }

  function hideError() {
    var el = document.getElementById('nlCtaError');
    if (el) el.style.display = 'none';
  }

  function setupHandler() {
    var input = document.getElementById('nlCtaEmail');
    var btn = document.getElementById('nlCtaBtn');
    if (!input || !btn) return;

    async function submit() {
      var email = input.value.trim();
      if (!email) { showError('Please enter your email address.'); return; }
      if (!validateEmail(email)) { showError('Please enter a valid email address.'); return; }
      btn.disabled = true; btn.textContent = 'Sending...';
      hideError();
      try {
        if (window.klaviyo && window.klaviyo.identify) {
          window.klaviyo.identify({ email: email });
          window.klaviyo.push(['track', 'Blog Report Signup', { email: email }]);
        }
        await fetch('https://a.klaviyo.com/client/subscriptions/?company_id=WBR5WB', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'revision': '2024-02-15' },
          body: JSON.stringify({ data: { type: 'subscription', attributes: { custom_source: 'Blog Widget', profile: { data: { type: 'profile', attributes: { email: email } } } }, relationships: { list: { data: { type: 'list', id: 'U58Spq' } } } } })
        });
        document.getElementById('nlCtaForm').style.display = 'none';
        document.getElementById('nlCtaSuccess').style.display = 'block';
      } catch (e) {
        document.getElementById('nlCtaForm').style.display = 'none';
        document.getElementById('nlCtaSuccess').style.display = 'block';
      }
    }

    btn.addEventListener('click', submit);
    input.addEventListener('keydown', function(e) { if (e.key === 'Enter') submit(); });
  }

  function waitForArticle() {
    // Look for article content container — blog pages use <article> or .article-body
    var article = document.querySelector('article') || document.querySelector('.article-body');
    var maxAttempts = 20;
    var attempts = 0;

    function tryInsert() {
      attempts++;
      var target = document.querySelector('article') || document.querySelector('.article-body');
      if (target) {
        var cta = buildCTA();
        target.appendChild(cta);
        setupHandler();
        return;
      }
      if (attempts < maxAttempts) {
        setTimeout(tryInsert, 200);
      }
    }

    if (article) {
      var cta = buildCTA();
      article.appendChild(cta);
      setupHandler();
    } else {
      tryInsert();
    }
  }

  injectCSS();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForArticle);
  } else {
    waitForArticle();
  }
})();
