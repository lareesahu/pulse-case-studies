/* Pulse case embed bridge: adds a class in embed mode and reports height to the parent frame. */
(function(){
  var q = window.location.search;
  var embedded = /(?:^|[?&])embed=1(?:&|$)/.test(q);
  if(!embedded){ return; }
  document.documentElement.classList.add('pb-embed-html');
  document.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('pb-embed');
    var last = 0;
    function send(){
      var h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      if(Math.abs(h - last) < 4) return;
      last = h;
      try { parent.postMessage({ type:'pulse-case-height', height:h, id:document.title }, '*'); } catch(e){}
    }
    send();
    setInterval(send, 1200);
    window.addEventListener('resize', send);
    window.addEventListener('load', function(){ setTimeout(send, 300); });
  });
})();
