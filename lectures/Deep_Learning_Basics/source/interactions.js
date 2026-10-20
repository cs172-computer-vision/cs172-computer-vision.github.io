/* The same deterministic renderers supply both interactive and printed figures. */
(function(){'use strict';const D=Diagrams;
function setup(name,render,reset){const el=document.querySelector(`[data-demo="${name}"]`);if(!el)return;const slide=el.closest('.slide');const update=()=>{render(el,slide);slide.querySelectorAll('select').forEach(select=>{let label=select.parentElement,copy=label.querySelector('[data-print-value]');if(!copy){copy=document.createElement('span');copy.className='print-only';copy.dataset.printValue='';label.append(copy)}copy.textContent=select.selectedOptions[0].textContent})};slide.querySelectorAll('input,select').forEach(x=>x.addEventListener('input',update));const button=slide.querySelector(`[data-reset="${name}"]`);if(button)button.onclick=()=>{reset(slide);update()};update()}
setup('rate',(el,s)=>{let eta=+s.querySelector('input').value;el.innerHTML=D.contour(eta);s.querySelector('[data-value="rate"]').textContent=eta.toFixed(2);let [x,y]=D.trajectory(eta).at(-1),loss=.5*(x*x+3*y*y);s.querySelector('[data-result="rate"]').textContent=`After 8 updates: L = ${loss.toFixed(4)}`},s=>s.querySelector('input').value=.1);
setup('noise',(el,s)=>el.innerHTML=D.contour(.1,30,s.querySelector('select').value),s=>s.querySelector('select').value='8');
setup('xor',(el,s)=>el.innerHTML=D.xor(s.querySelector('select').value==='hidden'),s=>s.querySelector('select').value='input');
document.querySelector('[data-demo="chain"]').innerHTML=D.chain();
})();
