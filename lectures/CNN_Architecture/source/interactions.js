/* Deterministic cost model. No timing or accuracy is simulated. */
(function(){'use strict';
const width=document.querySelector('#width'),resolution=document.querySelector('#resolution');
function cost(alpha,R){const M=64*alpha,N=128*alpha,dense=9*M*N,sep=9*M+M*N;return {M,N,dense,sep,denseMAC:R*R*dense,sepMAC:R*R*sep,ratio:dense/sep}}
function update(){const a=+width.value,R=+resolution.value,c=cost(a,R),fmt=x=>x.toLocaleString('en-US');document.querySelector('#width-value').textContent=a;document.querySelector('#resolution-value').textContent=R;document.querySelector('#dense-bar').style.width='100%';document.querySelector('#sep-bar').style.width=`${100/c.ratio}%`;document.querySelector('#budget-result').innerHTML=`<p>Channels: <strong>${c.M} → ${c.N}</strong></p><p>Dense: <strong>${(c.denseMAC/1e6).toFixed(3)} M MACs</strong><br>${fmt(c.dense)} weights</p><p>Separable: <strong>${(c.sepMAC/1e6).toFixed(3)} M MACs</strong><br>${fmt(c.sep)} weights</p><p>Dense / separable: <strong>${c.ratio.toFixed(2)}×</strong></p>`}
function reset(){width.value='1';resolution.value='28';update()}
width.addEventListener('change',update);resolution.addEventListener('change',update);document.querySelector('#budget-reset').addEventListener('click',reset);window.addEventListener('beforeprint',reset);window.ArchitectureCost={cost,reset};reset();
})();
