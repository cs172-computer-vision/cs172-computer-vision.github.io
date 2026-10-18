(function(){'use strict';
const D=Diagrams, slides=[...document.querySelectorAll('.slide')],meta=JSON.parse(document.getElementById('slide-meta').textContent);
let index=0,stage=0;
function stages(slide){let next=1;return [...slide.querySelectorAll('.step')].map(e=>{let s=e.dataset.stage?+e.dataset.stage:next++;return {e,s}})}
function maxStage(slide){return Math.max(0,...stages(slide).map(x=>x.s))}
function show(i,s=0){index=Math.max(0,Math.min(slides.length-1,i));stage=Math.max(0,Math.min(maxStage(slides[index]),s));slides.forEach((e,j)=>{e.classList.toggle('active',j===index);e.setAttribute('aria-hidden',String(j!==index))});slides[index].dataset.build=stage;stages(slides[index]).forEach(({e,s})=>e.classList.toggle('visible',s<=stage));document.querySelector('#count').textContent=`${String(index+1).padStart(2,'0')} / ${slides.length}`;document.querySelector('#stage-count').textContent=maxStage(slides[index])?`step ${stage}/${maxStage(slides[index])}`:'steps —';document.querySelector('#progress').style.width=`${(index+1)/slides.length*100}%`;document.title=`${index+1}. ${meta[index].title} · CS172`;history.replaceState(null,'',`#${meta[index].id}/${stage}`);document.querySelector('#notes-title').textContent=`${index+1}. ${meta[index].title}`;document.querySelector('#notes-text').textContent=meta[index].notes}
function next(){if(stage<maxStage(slides[index]))show(index,stage+1);else show(index+1)}
function previous(){if(stage>0)show(index,stage-1);else if(index>0)show(index-1,maxStage(slides[index-1]))}
function resize(){document.documentElement.style.setProperty('--scale',Math.min(innerWidth/1440,innerHeight/810));document.documentElement.style.setProperty('--toolbar-scale',Math.min(1,Math.max(.2,(innerWidth-24)/840)))}
const toolbar=document.querySelector('#toolbar'),toolbarZone=document.querySelector('#toolbar-zone');
let toolbarTimer=null,toolbarPinned=false,toolbarHovered=false;
function toolbarVisible(visible){document.body.classList.toggle('controls',visible);toolbar.setAttribute('aria-hidden',String(!visible));toolbar.toggleAttribute('inert',!visible)}
function cancelToolbarTimer(){if(toolbarTimer!==null){clearTimeout(toolbarTimer);toolbarTimer=null}}
function scheduleToolbarHide(){cancelToolbarTimer();if(!toolbarPinned&&!toolbarHovered&&!toolbar.contains(document.activeElement))toolbarTimer=setTimeout(()=>{toolbarTimer=null;if(!toolbarPinned&&!toolbarHovered&&!toolbar.contains(document.activeElement))toolbarVisible(false)},2200)}
function revealToolbar(){toolbarVisible(true);scheduleToolbarHide()}
function hideToolbar(){cancelToolbarTimer();toolbarPinned=false;toolbarHovered=false;if(toolbar.contains(document.activeElement))document.activeElement.blur();toolbarVisible(false)}
toolbarZone.addEventListener('pointerenter',revealToolbar);
toolbarZone.addEventListener('pointermove',revealToolbar);
toolbarZone.addEventListener('pointerdown',revealToolbar);
toolbarZone.addEventListener('pointerleave',scheduleToolbarHide);
toolbar.addEventListener('pointerenter',()=>{toolbarHovered=true;cancelToolbarTimer()});
toolbar.addEventListener('pointerleave',()=>{toolbarHovered=false;scheduleToolbarHide()});
toolbar.addEventListener('focusin',()=>{cancelToolbarTimer();toolbarVisible(true)});
toolbar.addEventListener('focusout',()=>{cancelToolbarTimer();toolbarTimer=setTimeout(scheduleToolbarHide,0)});
document.querySelector('#toolbar-reveal').addEventListener('focus',revealToolbar);
document.querySelector('#toolbar-reveal').onclick=()=>{toolbarVisible(true);toolbar.querySelector('button').focus()};
toolbarVisible(false);
function overlay(id){document.querySelectorAll('.overlay').forEach(e=>{const open=e.id===id&&!e.classList.contains('open');e.classList.toggle('open',open);if(open)e.querySelector('.close').focus()})}
document.querySelector('#overview-list').innerHTML=meta.map((s,i)=>`<button data-slide="${i}">${String(i+1).padStart(2,'0')} · ${s.title}<small>${s.section}</small></button>`).join('');
document.querySelectorAll('[data-slide]').forEach(e=>e.onclick=()=>{show(+e.dataset.slide);document.querySelector('#overview').classList.remove('open')});
document.querySelectorAll('[data-close]').forEach(e=>e.onclick=()=>e.closest('.overlay').classList.remove('open'));
document.querySelector('#next').onclick=next;document.querySelector('#previous').onclick=previous;document.querySelector('#all').onclick=()=>show(index,maxStage(slides[index]));document.querySelector('#overview-button').onclick=()=>overlay('overview');document.querySelector('#notes-button').onclick=()=>overlay('notes');document.querySelector('#help-button').onclick=()=>overlay('help');document.querySelector('#pdf-button').onclick=()=>window.print();document.querySelector('#fullscreen').onclick=()=>{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(()=>{})};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){hideToolbar();document.body.classList.remove('blanked');document.querySelectorAll('.overlay').forEach(o=>o.classList.remove('open'));return}if(/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;if(e.target.closest('button')&&[' ','Enter'].includes(e.key))return;if(document.querySelector('.overlay.open'))return;let handled=true;switch(e.key){case 'ArrowRight':case 'PageDown':case ' ':next();break;case 'ArrowLeft':case 'PageUp':previous();break;case 'Home':show(0);break;case 'End':show(index,maxStage(slides[index]));break;case 't':case 'T':toolbarPinned=!toolbarPinned;if(toolbarPinned){cancelToolbarTimer();toolbarVisible(true)}else hideToolbar();break;case 'o':case 'O':overlay('overview');break;case 'n':case 'N':overlay('notes');break;case 'h':case 'H':case '?':overlay('help');break;case 'b':case 'B':hideToolbar();document.body.classList.toggle('blanked');break;case 'f':case 'F':document.querySelector('#fullscreen').click();break;default:handled=false}if(handled)e.preventDefault()});
addEventListener('resize',resize);resize();let h=location.hash.slice(1).split('/'),at=meta.findIndex(s=>s.id===h[0]);show(at>=0?at:0,+h[1]||0);
function updateKnN(el,k=1,metric='l2',q={x:-.15,y:.15}){el.innerHTML=D.knn(k,metric,q);}
document.querySelector('[data-demo="nn-plot"]').innerHTML=D.nearestPlot();
for(const el of document.querySelectorAll('[data-demo="vote"]'))el.innerHTML=D.knn(7);
{
 const el=document.querySelector('[data-demo="knn"]'),slide=el.closest('.slide'),q={x:-.5,y:1.05};let k=1;
 const update=()=>{el.innerHTML=D.knn(k,'l2',q,true,true);const c=D.vote(D.neighbors(q,k,'l2')),label=slide.querySelector('[data-query-label]');label.textContent='Prediction for q: '+['red','blue','green'][c];label.style.color=D.C[c]};
 const control=slide.querySelector('[data-control="k"]');control.addEventListener('input',()=>{k=+control.value;slide.querySelector('[data-value="k"]').textContent=k;update()});
 el.addEventListener('click',e=>{const r=el.querySelector('svg').getBoundingClientRect(),px=(e.clientX-r.left)/r.width*720,py=(e.clientY-r.top)/r.height*460;if(px<60||px>680||py<50||py>410)return;q.x=(px-60)/620*4.8-2.4;q.y=(410-py)/360*3.6-1.8;update()});
 slide.querySelector('[data-action="knn-reset"]').onclick=()=>{q.x=-.5;q.y=1.05;k=1;control.value=1;slide.querySelector('[data-value="k"]').textContent=1;update()};update();
}
{
 const el=document.querySelector('[data-demo="metric-compare"]'),slide=el.closest('.slide'),q={x:0,y:0};
 const update=()=>{el.innerHTML=D.metricComparison(q)};
 el.addEventListener('click',e=>{const r=el.querySelector('svg').getBoundingClientRect(),px=(e.clientX-r.left)/r.width*1248,py=(e.clientY-r.top)/r.height*450,ox=px<624?132:756;if(px<ox||px>ox+300||py<85||py>385)return;q.x=-.4+(px-ox)/300*1.8;q.y=1.4-(py-85)/300*1.8;update()});
 slide.querySelector('[data-action="metric-reset"]').onclick=()=>{q.x=0;q.y=0;update()};update();
}
const lin=document.querySelector('[data-demo="linear"]'),ls=lin.closest('.slide');function linear(){let vals=['a','b','c'].map(c=>{let v=+ls.querySelector(`[data-control="${c}"]`).value;ls.querySelector(`[data-value="${c}"]`).textContent=v.toFixed(1);return v});lin.innerHTML=D.linear(...vals)}ls.querySelectorAll('input').forEach(e=>e.oninput=linear);linear();
const soft=document.querySelector('[data-demo="softmax"]'),ss=soft.closest('.slide');function updateSoft(){let v=[0,1,2].map(i=>{let n=+ss.querySelector(`[data-control="s${i}"]`).value;ss.querySelector(`[data-value="s${i}"]`).textContent=n.toFixed(1);return n});soft.innerHTML=D.softplot(v)}ss.querySelectorAll('input').forEach(e=>e.oninput=updateSoft);ss.querySelector('button').onclick=()=>{[3.2,5.1,-1.7].forEach((v,i)=>ss.querySelector(`[data-control="s${i}"]`).value=v);updateSoft()};updateSoft();
})();
