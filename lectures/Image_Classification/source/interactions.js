/* Demo behavior is independent of navigation. Renderers are shared with snapshots. */
(function(){'use strict';
const D=Diagrams;
function svgPoint(el,event){
 const svg=el.querySelector('svg'),p=svg.createSVGPoint();
 p.x=event.clientX;p.y=event.clientY;
 return p.matrixTransform(svg.getScreenCTM().inverse());
}
document.querySelector('[data-demo="nn-plot"]').innerHTML=D.nearestPlot();
for(const el of document.querySelectorAll('[data-demo="vote"]'))el.innerHTML=D.knn(7);
{
 const el=document.querySelector('[data-demo="knn"]'),slide=el.closest('.slide'),q={x:-.5,y:1.05};let k=1;
 const update=()=>{el.innerHTML=D.knn(k,'l2',q,true,true);const c=D.vote(D.neighbors(q,k,'l2')),label=slide.querySelector('[data-query-label]');label.textContent='Prediction for q: '+['red','blue','green'][c];label.style.color=D.C[c]};
 const control=slide.querySelector('[data-control="k"]');control.addEventListener('input',()=>{k=+control.value;slide.querySelector('[data-value="k"]').textContent=k;update()});
 el.addEventListener('click',e=>{const {x:px,y:py}=svgPoint(el,e);if(px<60||px>680||py<50||py>410)return;q.x=(px-60)/620*4.8-2.4;q.y=(410-py)/360*3.6-1.8;update()});
 slide.querySelector('[data-action="knn-reset"]').onclick=()=>{q.x=-.5;q.y=1.05;k=1;control.value=1;slide.querySelector('[data-value="k"]').textContent=1;update()};update();
}
{
 const el=document.querySelector('[data-demo="metric-compare"]'),slide=el.closest('.slide'),q={x:0,y:0};
 const update=()=>{el.innerHTML=D.metricComparison(q)};
 el.addEventListener('click',e=>{const {x:px,y:py}=svgPoint(el,e),ox=px<624?132:756;if(px<ox||px>ox+300||py<85||py>385)return;q.x=-.4+(px-ox)/300*1.8;q.y=1.4-(py-85)/300*1.8;update()});
 slide.querySelector('[data-action="metric-reset"]').onclick=()=>{q.x=0;q.y=0;update()};update();
}
const lin=document.querySelector('[data-demo="linear"]'),ls=lin.closest('.slide');function linear(){let vals=['a','b','c'].map(c=>{let v=+ls.querySelector(`[data-control="${c}"]`).value;ls.querySelector(`[data-value="${c}"]`).textContent=v.toFixed(1);return v});lin.innerHTML=D.linear(...vals)}ls.querySelectorAll('input').forEach(e=>e.oninput=linear);linear();

ls.querySelector('[data-action="linear-reset"]').onclick=()=>{['a','b','c'].forEach((c,i)=>ls.querySelector('[data-control="'+c+'"]').value=[1,1,0][i]);linear()};
const soft=document.querySelector('[data-demo="softmax"]'),ss=soft.closest('.slide');
function updateSoft(){
 const scores=[0,1,2].map(i=>{
  const value=+ss.querySelector('[data-control="s'+i+'"]').value;
  ss.querySelector('[data-value="s'+i+'"]').textContent=value.toFixed(1);
  return value;
 });
 soft.innerHTML=D.softplot(scores);
}
ss.querySelectorAll('input').forEach(e=>e.addEventListener('input',updateSoft));
ss.querySelector('[data-action="soft-reset"]').onclick=()=>{
 [3.2,5.1,-1.7].forEach((v,i)=>ss.querySelector('[data-control="s'+i+'"]').value=v);updateSoft();
};
updateSoft();
})();
