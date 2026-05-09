(() => {
  const bgCanvas = document.getElementById('hp-bg');
  const ctx = bgCanvas && bgCanvas.getContext ? bgCanvas.getContext('2d') : null;
  let W, H, particles = [], nodes = [];

  function resize(){
    if(!bgCanvas) return;
    W = bgCanvas.width = window.innerWidth;
    H = bgCanvas.height = window.innerHeight;
  }

  // Particle / starfield
  class Star{
    constructor(){ this.reset(); }
    reset(){
      this.x = Math.random()*W;
      this.y = Math.random()*H;
      this.z = Math.random()*1;
      this.size = (0.5+Math.random()*1.6)* (this.z*1.6);
      this.alpha = 0.2+Math.random()*0.6;
      this.vx = (Math.random()-0.5)*0.2;
      this.vy = -0.05 - Math.random()*0.2;
    }
    update(){
      this.x += this.vx * (1+this.z);
      this.y += this.vy * (1+this.z);
      if(this.y < -10 || this.x < -50 || this.x > W+50) this.reset();
    }
    draw(){
      ctx.beginPath();
      ctx.fillStyle = `rgba(180,220,255,${this.alpha})`;
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fill();
    }
  }

  // Nodes for wireframe globe
  class Node{
    constructor(theta,phi){
      this.theta = theta; this.phi = phi; this.r = Math.min(W,H)/4.2; this.rot = 0;
      this.update();
    }
    update(rot=0){
      // spherical coords
      const x = this.r * Math.cos(this.theta) * Math.sin(this.phi);
      const y = this.r * Math.sin(this.theta) * Math.sin(this.phi);
      const z = this.r * Math.cos(this.phi);
      // rotate around Y axis
      const ang = rot;
      const rx = x * Math.cos(ang) + z * Math.sin(ang);
      const rz = -x * Math.sin(ang) + z * Math.cos(ang);
      this.screenX = W/2 + rx;
      this.screenY = H/2 + y*0.92;
      this.depth = (rz + this.r) / (2*this.r);
    }
    draw(){
      const s = 1.8 + this.depth*2;
      ctx.beginPath();
      ctx.fillStyle = `rgba(160,210,255,${0.4+this.depth*0.7})`;
      ctx.arc(this.screenX,this.screenY,s,0,Math.PI*2);
      ctx.fill();
    }
  }

  function buildNodes(){
    nodes = [];
    const rings = 8;
    for(let i=0;i<rings;i++){
      const phi = (i+1)/(rings+1)*Math.PI;
      const perRing = 14 + Math.round(i*2.5);
      for(let j=0;j<perRing;j++){
        const theta = (j/perRing)*Math.PI*2;
        nodes.push(new Node(theta,phi));
      }
    }
  }

  function initParticles(cnt=140){
    particles = [];
    for(let i=0;i<cnt;i++) particles.push(new Star());
  }

  let rot = 0;
  function draw(){
    if(!ctx) return;
    ctx.clearRect(0,0,W,H);

    // subtle background gradient
    const g = ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#030617');
    g.addColorStop(0.6,'#071025');
    g.addColorStop(1,'#02060b');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

    // stars
    for(const s of particles){ s.update(); s.draw(); }

    // wireframe globe
    rot += 0.0008;
    // update node positions
    nodes.forEach(n => n.update(rot));

    // draw connecting lines
    ctx.lineWidth = 0.8; ctx.strokeStyle = 'rgba(120,160,255,0.07)';
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a = nodes[i]; const b = nodes[j];
        const dx = a.screenX - b.screenX; const dy = a.screenY - b.screenY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 120){
          ctx.beginPath();
          ctx.moveTo(a.screenX,a.screenY);
          ctx.lineTo(b.screenX,b.screenY);
          ctx.strokeStyle = `rgba(110,150,255,${0.04 + (1 - dist/120)*0.12})`;
          ctx.stroke();
        }
      }
    }

    // draw nodes on top
    nodes.forEach(n => n.draw());

    // subtle glow overlay with radial gradient
    const rg = ctx.createRadialGradient(W/2,H/2,50,W/2,H/2,Math.max(W,H)/1.8);
    rg.addColorStop(0,'rgba(100,150,255,0.02)');
    rg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = rg; ctx.fillRect(0,0,W,H);

    requestAnimationFrame(draw);
  }

  // counters
  function animateCounters(){
    const els = document.querySelectorAll('.stat .num');
    els.forEach(el => {
      const raw = +el.dataset.target || 0;
      const format = el.dataset.format || '';
      const target = raw;
      const duration = 1600;
      const start = performance.now();
      function step(now){
        const t = Math.min(1,(now-start)/duration);
        const eased = t<.5? 2*t*t : (-1 + (4-2*t)*t);
        let val = Math.floor(target * eased);
        if(format==='percent') val = Math.min(99, Math.floor( target * eased ));
        if(format==='short' && t===1) el.textContent = '10,000+';
        else if(format!=='short') el.textContent = val + (format==='percent'? '%' : (format==='seconds'? '' : ''));
        if(t<1) requestAnimationFrame(step);
        else if(format==='short') el.textContent = '10,000+';
      }
      requestAnimationFrame(step);
    });
  }

  function triggerLoaded(){
    document.documentElement.classList.add('loaded');
  }

  function init(){
    resize();
    buildNodes();
    initParticles(window.innerWidth < 700 ? 60 : 160);
    draw();
    triggerLoaded();
    animateCounters();
    window.addEventListener('resize', ()=>{ resize(); buildNodes(); initParticles(window.innerWidth < 700 ? 60 : 140); });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
