var R=["https://static.wixstatic.com/media/dba426_61e1696e09164f10bf4a5b04e44a5c2b~mv2.jpg","https://static.wixstatic.com/media/dba426_e34e1e0e6f54498eb897a476f1a53ee6~mv2.jpg","https://static.wixstatic.com/media/dba426_7a2f2c58f29f4b56b9e1734c5f28af43~mv2.jpg","https://static.wixstatic.com/media/dba426_b8fa9e4c5e4e4fc9a3b1e2e2e2e2e2e2~mv2.jpg","https://static.wixstatic.com/media/dba426_f4a2b5e8c2e34b8d9f1e2e2e2e2e2e2e~mv2.jpg","https://static.wixstatic.com/media/dba426_a1b2c3d4e5f64a7b8c9d0e1f2a3b4c5d~mv2.jpg","https://static.wixstatic.com/media/dba426_c3d4e5f6a7b84c9d0e1f2a3b4c5d6e7f~mv2.jpg","https://static.wixstatic.com/media/dba426_d5e6f7a8b9c04d1e2f3a4b5c6d7e8f9a~mv2.jpg"];
var BANNER="https://static.wixstatic.com/media/dba426_e34e1e0e6f54498eb897a476f1a53ee6~mv2.jpg";
function fb(el,local,remote){el.src=local;el.onerror=function(){if(remote){el.src=remote;el.onerror=function(){el.style.display='none'}}else{el.style.display='none'}}}
// Set hero background
var hb=document.getElementById('heroBg');
if(hb){var hi=new Image();hi.onload=function(){hb.style.backgroundImage='url('+this.src+')'};hi.onerror=function(){hb.style.backgroundImage='url('+BANNER+')'};hi.src='images/campus.jpg'}
// Wire data-photo images
document.querySelectorAll('[data-photo]').forEach(function(el){var i=parseInt(el.getAttribute('data-photo'));fb(el,'images/gallery'+(i+1)+'.jpg',R[i]||null)});
// Build gallery
var gal=document.getElementById('gal');
if(gal){for(var i=0;i<8;i++){var d=document.createElement('div');d.className='g rv';var img=document.createElement('img');img.alt='Gallery '+(i+1);fb(img,'images/gallery'+(i+1)+'.jpg',R[i]);d.appendChild(img);d.setAttribute('data-src',R[i]||'');gal.appendChild(d)}}
// Lightbox
var lb=document.getElementById('lb'),lbi=lb&&lb.querySelector('img');
document.addEventListener('click',function(e){var g=e.target.closest('.g');if(g&&lb&&lbi){var s=g.querySelector('img');if(s&&s.src&&s.style.display!=='none'){lbi.src=s.src;lb.classList.add('on')}}if(e.target===lb){lb.classList.remove('on')}});
// Reveal
var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in')}})},{threshold:.12});
function observe(){document.querySelectorAll('.rv').forEach(function(el){io.observe(el)})}
observe();
// MutationObserver for dynamically added gallery items
if(gal){new MutationObserver(observe).observe(gal,{childList:true})}
// Animated counters
function animNum(el){var n=parseFloat(el.getAttribute('data-n'))||0,d=parseInt(el.getAttribute('data-d'))||0,s=el.getAttribute('data-s')||'';var dur=1600,start=null;function step(ts){if(!start)start=ts;var p=Math.min((ts-start)/dur,1),ease=1-Math.pow(1-p,3),v=n*ease;el.textContent=v.toFixed(d)+s;if(p<1)requestAnimationFrame(step)}requestAnimationFrame(step)}
var cio=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){animNum(e.target);cio.unobserve(e.target)}})},{threshold:.5});
document.querySelectorAll('[data-n]').forEach(function(el){cio.observe(el)});
// Header shadow
var hdr=document.querySelector('header');
window.addEventListener('scroll',function(){if(hdr)hdr.classList.toggle('sc',window.scrollY>10)},{ passive:true});
// Burger nav
var bg=document.getElementById('bg'),nav=document.getElementById('nav'),overlay=document.createElement('div');
overlay.style.cssText='position:fixed;inset:0;z-index:199;display:none;background:#0004';
document.body.appendChild(overlay);
function closeNav(){nav&&nav.classList.remove('open');overlay.style.display='none'}
if(bg)bg.addEventListener('click',function(){nav&&nav.classList.toggle('open');overlay.style.display=nav&&nav.classList.contains('open')?'block':'none'});
overlay.addEventListener('click',closeNav);
document.querySelectorAll('nav a').forEach(function(a){a.addEventListener('click',closeNav)});
