(()=>{'use strict';
const $=s=>document.querySelector(s),D=CNNDraw;
function conv(){const p=+$('#position').value,r=Math.floor(p/3),c=p%3;$('#conv-visual').innerHTML=D.convolution(p);$('#position-value').textContent=`(${r}, ${c})`;$('#conv-products').textContent='Row contributions: '+D.kernel.map((row,u)=>row.reduce((s,v,k)=>s+v*D.input[r+u][c+k],0)).join(' + ');$('#conv-result').textContent=`Z[${r}, ${c}] = ${D.response(r,c)}`}
$('#position').addEventListener('input',conv);$('#conv-reset').onclick=()=>{$('#position').value=0;conv()};conv();
function shape(){const [h,k,s,p]=['h','k','s','p'].map(n=>+$('#shape-'+n).value),o=Math.floor((h+2*p-k)/s)+1,params=8*(3*k*k+1),values=8*o*o;$('#shape-visual').innerHTML=D.shape(h,k,s,p);$('#shape-result').textContent=`Output: 8 × ${o} × ${o}`;$('#shape-cost').textContent=`${params.toLocaleString('en-US')} parameters · ${values.toLocaleString('en-US')} output values per image`}
document.querySelectorAll('.shape-controls select').forEach(e=>e.addEventListener('change',shape));$('#shape-reset').onclick=()=>{['32','3','1','1'].forEach((v,i)=>$('#shape-'+['h','k','s','p'][i]).value=v);shape()};shape();
function rf(){const l=+$('#rf-depth').value,r=1+2*l;$('#rf-visual').innerHTML=D.field(l);$('#rf-value').textContent=l;$('#rf-result').textContent=`Receptive field: ${r} × ${r} input pixels`}
$('#rf-depth').addEventListener('input',rf);$('#rf-reset').onclick=()=>{$('#rf-depth').value=3;rf()};rf();
})();
