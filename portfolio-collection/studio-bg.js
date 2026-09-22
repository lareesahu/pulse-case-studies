/* Living scene backgrounds: subtle brand gradient + film grain (Three.js, local).
   Respects reduced motion, Pause previews, visibility and offscreen state. */
(()=>{
 if(!window.THREE)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=reduced.matches;
 const frag=`
 precision highp float;varying vec2 vUv;uniform vec3 uTop;uniform vec3 uBot;uniform float uTime;
 float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);}
 void main(){vec2 uv=vUv;vec3 col=mix(uTop,uBot,pow(uv.y,1.35));
  col+=noise(uv*3.4+vec2(0.,uTime*.025))*0.045-0.022;
  vec2 gp=gl_FragCoord.xy+vec2(mod(uTime*11.,1021.),mod(uTime*6.,1009.));
  col+=(hash(gp)-0.5)*0.085+(hash(gp+vec2(73.,41.))-0.5)*0.045;
  vec2 c=uv-0.5;col*=1.0-dot(c,c)*1.55*0.4;
  gl_FragColor=vec4(col,1.0);}`;
 const vert=`varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
 const units=[];
 document.querySelectorAll('canvas.studio-bg').forEach(canvas=>{
  const ca=new THREE.Color(canvas.dataset.a||'#888888');
  const cb=new THREE.Color(canvas.dataset.b||'#444444');
  canvas.style.opacity=canvas.dataset.op||'0.5';
  const box=canvas.parentElement;
  let renderer,scene,cam,mat;
  try{
   renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:false,powerPreference:'low-power'});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
   scene=new THREE.Scene();
   cam=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
   mat=new THREE.ShaderMaterial({vertexShader:vert,fragmentShader:frag,uniforms:{uTop:{value:ca},uBot:{value:cb},uTime:{value:0}}});
   scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),mat));
  }catch(err){return;}
  let visible=false,sized=false;
  function sizeIt(){
   if(!box.clientWidth||!box.clientHeight||sized&&mat.uniforms)return;
   renderer.setSize(box.clientWidth,box.clientHeight,false);sized=true;
  }
  new ResizeObserver(()=>{sized=false;sizeIt()}).observe(box);
  new IntersectionObserver(es=>{es.forEach(e=>{visible=e.isIntersecting;tick()})},{threshold:0.01}).observe(canvas);
  sizeIt();
  units.push({renderer,scene,cam,mat,canvas,visible});
 });
 let raf=null;
 function step(now){
  const t=(now/1000)%3600;let any=false;
  units.forEach(u=>{
   if(paused||!u.visible||document.hidden||reduced.matches)return;
   u.mat.uniforms.uTime.value=t;u.renderer.render(u.scene,u.cam);any=true;
  });
  raf=any?requestAnimationFrame(step):null;
 }
 function drawStatic(){
  units.forEach(u=>{u.mat.uniforms.uTime.value=0;try{u.renderer.render(u.scene,u.cam)}catch(e){}});
 }
 function tick(){
  if(reduced.matches||paused){if(raf){cancelAnimationFrame(raf);raf=null}}
  else if(!raf)raf=requestAnimationFrame(step);
 }
 window.addEventListener('studio-pause',e=>{paused=!!(e.detail&&e.detail.paused);tick()});
 reduced.addEventListener('change',()=>{paused=reduced.matches;tick()});
 document.addEventListener('visibilitychange',tick);
 addEventListener('pagehide',()=>{if(raf){cancelAnimationFrame(raf);raf=null}units.forEach(u=>{try{u.renderer.dispose()}catch(e){}})});
 drawStatic();tick();
})();
