const query=new URLSearchParams(location.search),project=PROJECTS.find(p=>p.id===query.get('project')),page=project.pages.find(p=>p.id===query.get('page')),kind=query.get('kind');
document.body.style.background=project.paper;
const ready=()=>parent.postMessage({type:'portfolio-ready'},location.origin);
if(page.html){
 const f=document.createElement('iframe');f.title=page.label;f.src=page.html;f.setAttribute('sandbox','allow-scripts allow-same-origin');document.body.append(f);
 window.addEventListener('message',e=>{if(e.origin!==location.origin)return;if(e.source===parent&&e.data?.type==='portfolio-playback')f.contentWindow?.postMessage(e.data,location.origin);if(e.source===f.contentWindow&&e.data?.type==='portfolio-ready')ready()});
}else{
 const img=document.createElement('img');img.alt=page.label+' / original project capture';img.src=kind==='mobile'?page.mobile:page.desktop;img.onload=ready;img.onerror=()=>{document.body.textContent='Original capture unavailable.';ready()};document.body.append(img);
 window.addEventListener('message',e=>{if(e.source!==parent||e.origin!==location.origin||e.data?.type!=='portfolio-playback')return;const p=e.data.progress;const ease=t=>t*t*(3-2*t);let q=p<.18?0:p<.45?.45*ease((p-.18)/.27):p<.62?.45:.45+.55*ease(Math.min(1,(p-.62)/.28));const distance=Math.max(0,img.getBoundingClientRect().height-innerHeight);img.style.transform=`translateY(${-Math.min(distance,innerHeight*2.5)*q}px)`;document.body.dataset.progress=q.toFixed(3)});
}
