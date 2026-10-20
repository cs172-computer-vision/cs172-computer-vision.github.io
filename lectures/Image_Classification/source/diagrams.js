/* Pure deterministic SVG renderers. Shared by live slides and offline snapshots. */
(function(root){
'use strict';
const C=['#bb3948','#236bc2','#168a76'], P=['#f8e7e9','#e4eefb','#e2f2ed'];
const text=(x,y,s,size=24,fill='#26354a',anchor='middle')=>`<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" text-anchor="${anchor}" fill="${fill}">${s}</text>`;
const wrap=(s,w=720,h=460)=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img">${s}</svg>`;
function points(){let seed=172;const rnd=()=>{seed=(1664525*seed+1013904223)>>>0;return seed/4294967296};let a=[];for(let c=0;c<3;c++)for(let i=0;i<14;i++){const cx=[-1,.9,.1][c],cy=[.5,.55,-.85][c];a.push({x:cx+(rnd()-.5)*2.2,y:cy+(rnd()-.5)*1.8,c,id:a.length})}a.push({x:-.7,y:.9,c:1,id:a.length});return a}
const data=points();
function dist(a,b,m='l2'){return m==='l1'?Math.abs(a.x-b.x)+Math.abs(a.y-b.y):Math.hypot(a.x-b.x,a.y-b.y)}
function neighbors(q,k=1,m='l2',pts=data){return pts.map(p=>({...p,d:dist(p,q,m)})).sort((a,b)=>a.d-b.d||a.id-b.id).slice(0,k)}
function vote(n){let counts=[0,0,0];n.forEach(p=>counts[p.c]++);const mx=Math.max(...counts);return n.find(p=>counts[p.c]===mx).c}
function queryMarker(x,y,r=10,withLabel=true){
const dx=x>645?-22:20,anchor=x>645?'end':'start';
return `<path d="M${x} ${y-r}L${x+r} ${y}L${x} ${y+r}L${x-r} ${y}Z" fill="#14243c" stroke="white" stroke-width="3"/>`+(withLabel?`<text x="${x+dx}" y="${y+8}" font-family="Arial,sans-serif" font-style="italic" font-weight="bold" font-size="27" text-anchor="${anchor}" fill="#14243c">q</text>`:'');
}

function knn(k=1,m='l2',q={x:-.15,y:.15},showQuery=true,markOutlier=false){let s='';const X=x=>60+(x+2.4)/4.8*620,Y=y=>410-(y+1.8)/3.6*360;
for(let py=50;py<410;py+=10)for(let px=60;px<680;px+=10){const a={x:(px-60)/620*4.8-2.4,y:(410-py)/360*3.6-1.8};s+=`<rect x="${px}" y="${py}" width="10.3" height="10.3" fill="${P[vote(neighbors(a,k,m))]}"/>`}
s+=`<path d="M60 50V410H680" fill="none" stroke="#a6afbc"/>`;
if(showQuery)neighbors(q,k,m).forEach(p=>s+=`<path d="M${X(q.x)} ${Y(q.y)}L${X(p.x)} ${Y(p.y)}" stroke="#435570" stroke-width="2" stroke-dasharray="5 5"/>`);
data.forEach(p=>s+=`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="7" stroke="white" stroke-width="1.5" fill="${C[p.c]}"/>`);
if(markOutlier){const p=data[data.length-1],px=X(p.x),py=Y(p.y);
s+=`<defs><marker id="outlier-arrow" viewBox="0 0 10 10" markerWidth="9" markerHeight="9" refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse"><path d="M0 1L9 5L0 9Z" fill="#236bc2"/></marker></defs>`;
s+=`<circle cx="${px}" cy="${py}" r="15" fill="none" stroke="#236bc2" stroke-width="2"/><path d="M365 40Q${px-8} 43 ${px-3} ${py-19}" stroke="#236bc2" stroke-width="1.8" fill="none" marker-end="url(#outlier-arrow)"/>`+text(350,28,'isolated blue example',22,'#236bc2','start');
}
if(showQuery)s+=queryMarker(X(q.x),Y(q.y));
s+=`<text x="22" y="230" transform="rotate(-90 22 230)" font-family="Arial,sans-serif" font-size="24" text-anchor="middle" fill="#26354a">feature 2</text>`+text(365,449,'feature 1',24)+text(64,28,`k = ${k}  ·  ${m.toUpperCase()} distance`,24,'#26354a','start');return wrap(s)}

function metric(){let s='';for(let i=0;i<2;i++){let cx=185+i*350,cy=220; s+=`<path d="M${cx-145} ${cy}h290M${cx} ${cy-145}v290" stroke="#a6afbc"/>`;s+=i===0?`<path d="M${cx} ${cy-115}l115 115-115 115-115-115Z" fill="#e4eefb" stroke="#236bc2" stroke-width="3"/>`:`<circle cx="${cx}" cy="${cy}" r="115" fill="#e2f2ed" stroke="#168a76" stroke-width="3"/>`;s+=`<circle cx="${cx}" cy="${cy}" r="4" fill="#14243c"/>`+text(cx,405,i===0?'L1: diamond':'L2: circle',28)+text(cx+125,cy-10,'1',22)}return wrap(s)}
function linear(a=1,b=1,bias=0){let s='';const X=x=>70+(x+2)/4*580,Y=y=>400-(y+2)/4*340;
for(let py=60;py<400;py+=8)for(let px=70;px<650;px+=8){let x=(px-70)/580*4-2,y=(400-py)/340*4-2;s+=`<rect x="${px}" y="${py}" width="8.3" height="8.3" fill="${a*x+b*y+bias>=0?P[0]:P[1]}"/>`}
s+=`<path d="M70 230H650M360 60V400" stroke="#a3afbe"/>`;let ints=[];for(let x of [-2,2]){if(Math.abs(b)>1e-9){let y=-(a*x+bias)/b;if(y>=-2&&y<=2)ints.push([x,y])}}for(let y of [-2,2]){if(Math.abs(a)>1e-9){let x=-(b*y+bias)/a;if(x>=-2&&x<=2)ints.push([x,y])}}if(ints.length>1)s+=`<path d="M${X(ints[0][0])} ${Y(ints[0][1])}L${X(ints[1][0])} ${Y(ints[1][1])}" stroke="#14243c" stroke-width="4"/>`;
[[-1.2,-.9,1],[-.7,-1.2,1],[-1,.2,1],[.8,.6,0],[1.3,.8,0],[.7,1.3,0]].forEach(p=>s+=`<circle cx="${X(p[0])}" cy="${Y(p[1])}" r="9" fill="${C[p[2]]}" stroke="white" stroke-width="2"/>`);
s+=text(70,29,'s₁ − s₂ = a x₁ + b x₂ + c',27,'#26354a','start')+text(650,441,'x₁',25)+text(345,65,'x₂',25)+text(470,100,'class 1',24,C[0])+text(190,375,'class 2',24,C[1]);return wrap(s)}
function hard(){let s='';for(let n=0;n<3;n++){const ox=n*240;for(let i=0;i<13;i++)for(let j=0;j<13;j++){let x=(i-6)/3,y=(j-6)/3;let c=n===0?(x*y>0?0:1):n===1?(Math.hypot(x,y)>.75&&Math.hypot(x,y)<1.55?0:1):((Math.hypot(x+1.2,y+.8)<.5||Math.hypot(x-1.1,y+.6)<.5||Math.hypot(x,y-1.1)<.5)?0:1);s+=`<circle cx="${ox+25+i*16}" cy="${100+j*20}" r="5" fill="${C[c]}"/>`}s+=text(ox+120,408,['XOR','Ring','Multiple modes'][n],27)}return wrap(s)}
function cv(){let s='';for(let row=0;row<5;row++){s+=text(85,85+row*68,`run ${row+1}`,23);for(let col=0;col<5;col++){let x=150+col*85,y=50+row*68;s+=`<rect x="${x}" y="${y}" width="78" height="48" fill="${row===col?'#e4eefb':'#e9edf2'}" stroke="white"/>`+text(x+39,y+32,row===col?'val':'train',21)}}s+=`<rect x="602" y="50" width="100" height="320" fill="#fae8d8"/>`+text(652,190,'test',25)+text(652,225,'held out',20)+text(360,429,'Fit a fresh model in every run. Average validation accuracy.',23);return wrap(s)}
function cvplot(){let s=`<path d="M90 50V370H650" fill="none" stroke="#53657e" stroke-width="2"/>`;const ks=[1,3,5,7,9,11],means=[.24,.27,.28,.29,.285,.278],es=[.018,.012,.014,.013,.012,.015];let path='';means.forEach((v,i)=>{let x=115+i*98,y=350-(v-.2)*2200,e=es[i]*2200;path+=`${i?'L':'M'}${x} ${y}`;s+=`<path d="M${x} ${y-e}V${y+e}M${x-7} ${y-e}h14M${x-7} ${y+e}h14" stroke="#236bc2" stroke-width="2"/>`;for(let f=-2;f<=2;f++)s+=`<circle cx="${x+f*5}" cy="${y+f*e/Math.sqrt(2.5)}" r="4" fill="#8fb2e0"/>`;s+=`<circle cx="${x}" cy="${y}" r="7" fill="#236bc2"/>`+text(x,403,ks[i],23)});s+=`<path d="${path}" fill="none" stroke="#236bc2" stroke-width="3"/>`+text(360,448,'number of neighbors k',25)+text(90,28,'validation accuracy',25,'#26354a','start');for(let v of [.2,.24,.28,.32])s+=text(73,350-(v-.2)*2200+8,v.toFixed(2),20,'#53657e','end');return wrap(s)}
function softmax(scores=[3.2,5.1,-1.7],truth=0){const mx=Math.max(...scores),z=scores.map(s=>Math.exp(s-mx)),total=z.reduce((a,b)=>a+b,0),p=z.map(x=>x/total);return {p,loss:Math.log(total)-(scores[truth]-mx)}}
function softplot(scores=[3.2,5.1,-1.7]){const {p}=softmax(scores);let s='';p.forEach((v,i)=>{let y=85+i*105;s+=text(118,y+18,['cat','car','frog'][i],29,C[i],'end')+`<rect x="145" y="${y-18}" width="470" height="49" fill="#eef1f5"/><rect x="145" y="${y-18}" width="${470*v}" height="49" fill="${C[i]}"/>`+text(695,y+18,(v*100).toFixed(2)+'%',25,'#26354a','end')});s+=text(360,426,`Probabilities sum to 1. Prediction: ${['cat','car','frog'][p.indexOf(Math.max(...p))]}.`,25);return wrap(s)}
function lossplot(){
const example=softmax(),prob=example.p[0],loss=example.loss,X=p=>95+555*p,Y=l=>380-60*l;
let s=`<path d="M95 50V380H650" fill="none" stroke="#53657e" stroke-width="2"/>`,d='';
for(let i=1;i<=200;i++){const p=i/200;d+=`${i===1?'M':'L'}${X(p)} ${Y(-Math.log(p))}`}
s+=`<path d="${d}" fill="none" stroke="#236bc2" stroke-width="4"/>`;
s+=`<path d="M95 ${Y(loss)}H${X(prob)}V380" fill="none" stroke="#bb3948" stroke-width="2" stroke-dasharray="6 5"/><circle cx="${X(prob)}" cy="${Y(loss)}" r="7" fill="#bb3948"/>`;
s+=text(84,Y(loss)+10,loss.toFixed(2),29,'#bb3948','end')+text(X(prob),413,prob.toFixed(2),29,'#bb3948');
s+=`<path d="M${X(prob)+6} ${Y(loss)-6}L245 230" fill="none" stroke="#bb3948" stroke-width="1.8"/>`+text(255,230,`(${prob.toFixed(2)}, ${loss.toFixed(2)})`,29,'#bb3948','start');
s+=text(95,29,'Loss −log p',26,'#26354a','start')+text(375,449,'True-class probability p',26);
for(const p of [0,.5,1])s+=text(X(p),413,p===0?'0':p.toFixed(1),26);s+=text(84,389,'0',26,'#53657e','end');return wrap(s)}
function pixels(shift=1,brightness=0){
const n=12,base=Array.from({length:n},(_,y)=>Array.from({length:n},(_,x)=>((x>=4&&x<=7&&y>=2&&y<=9)||(x>=2&&x<=9&&y>=4&&y<=6))?210:20));
const changed=base.map((row,y)=>row.map((v,x)=>Math.min(255,(x-shift>=0?base[y][x-shift]:20)+brightness)));
let l1=0,l2=0,s='';for(let y=0;y<n;y++)for(let x=0;x<n;x++){let d=changed[y][x]-base[y][x];l1+=Math.abs(d);l2+=d*d}
for(let z=0;z<2;z++){let ox=z===0?105:535;s+=text(ox+150,29,z===0?'Original':'Transformed',27);for(let y=0;y<n;y++)for(let x=0;x<n;x++){let v=(z?changed:base)[y][x];s+=`<rect x="${ox+x*24}" y="${50+y*24}" width="24" height="24" fill="rgb(${v},${v},${v})" stroke="#7f8c9f" stroke-width="0.5"/>`}}
s+=text(1090,120,'L1 distance',27)+text(1090,164,String(l1),34)+text(1090,235,'L2 distance',27)+text(1090,279,Math.sqrt(l2).toFixed(1),34);return wrap(s,1296,370)}
function nearestIntro(){
let s='';const sample=(ox,oy,vals,label,color)=>{let out='';vals.forEach((v,i)=>{out+=`<rect x="${ox+i*66}" y="${oy}" width="66" height="78" fill="rgb(${v},${v},${v})" stroke="white" stroke-width="2"/>`+text(ox+i*66+33,oy+48,v,25,v<130?'#fff':'#14243c')});return out+text(ox+66,oy+116,label,26,color)};
s+=sample(294,48,[80,180],'new image','#14243c');
for(const [x,label,values,col] of [[45,'class A',[70,190],C[0]],[294,'class B',[180,50],C[1]],[543,'class C',[220,210],C[2]]]){s+=`<path d="M360 178L${x+66} 273" stroke="${label==='class A'?C[0]:'#ccd5e1'}" stroke-width="${label==='class A'?4:2}" ${label==='class A'?'':'stroke-dasharray="5 5"'}/>`;s+=sample(x,273,values,label,col)}
s+=text(170,222,'closest',25,C[0])+text(360,444,'Copy the label of the closest stored image.',25);return wrap(s)}
const metricPoints=[{x:1,y:0,c:0,id:0},{x:.6,y:.6,c:1,id:1}];
function metricResult(q,m){const n=neighbors(q,1,m,metricPoints);return {prediction:n[0].c,distances:metricPoints.map(p=>dist(q,p,m))}}
function metricComparison(q={x:0,y:0}){let s='';for(let panel=0;panel<2;panel++){
const m=panel?'l2':'l1',ox=132+panel*624,oy=85,size=300,lo=-.4,hi=1.4,X=x=>ox+(x-lo)/(hi-lo)*size,Y=y=>oy+size-(y-lo)/(hi-lo)*size;
const r=metricResult(q,m),c=r.prediction;
const boundary=panel?[[-.25,lo],[hi,.7]]:[[lo,.1],[.6,.1],[1,.5],[hi,.5]];
const region=panel?[[-.25,lo],[hi,lo],[hi,.7]]:[[lo,lo],[hi,lo],...boundary.slice().reverse()];
s+=`<rect x="${ox}" y="${oy}" width="${size}" height="${size}" fill="${P[1]}"/><polygon points="${region.map(p=>X(p[0])+','+Y(p[1])).join(' ')}" fill="${P[0]}"/><path d="${boundary.map((p,i)=>(i?'L':'M')+X(p[0])+' '+Y(p[1])).join(' ')}" fill="none" stroke="#52627a" stroke-width="1.8"/>`;
s+=text(ox+150,29,m==='l1'?'L1 distance':'L2 distance',29)+text(ox+150,62,`Prediction for q: class ${c?'B':'A'}`,26,C[c]);
s+=`<path d="M${ox} ${Y(0)}H${ox+size}M${X(0)} ${oy}V${oy+size}" stroke="#a4b0bf" fill="none"/><rect x="${ox}" y="${oy}" width="${size}" height="${size}" fill="none" stroke="#c5cedb"/>`;
const near=metricPoints[c];s+=`<path d="M${X(q.x)} ${Y(q.y)}L${X(near.x)} ${Y(near.y)}" stroke="#14243c" stroke-width="2" stroke-dasharray="5 5"/>`;
metricPoints.forEach((p,i)=>{s+=`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="8" fill="${C[i]}" stroke="white" stroke-width="2"/>`+text(X(p.x)+12,Y(p.y)-13,i?'x⁽²⁾ (0.6, 0.6)':'x⁽¹⁾ (1, 0)',22,C[i],'start')});
s+=queryMarker(X(q.x),Y(q.y),9,false);
s+=text(Math.max(ox+90,Math.min(ox+size-90,X(q.x))),Y(q.y)>oy+size-45?Y(q.y)-18:Y(q.y)+29,`q = (${Number(q.x.toFixed(2))}, ${Number(q.y.toFixed(2))})`,22,'#14243c');
s+=text(ox+size-4,Y(0)+32,'feature 1',21,'#53657e','end')+`<text x="${ox-21}" y="${oy+size/2}" transform="rotate(-90 ${ox-21} ${oy+size/2})" font-family="Arial,sans-serif" font-size="21" text-anchor="middle" fill="#53657e">feature 2</text>`;
s+=text(ox-45,427,`d(q, x⁽¹⁾) = ${r.distances[0].toFixed(2)}`,24,'#26354a','start')+text(ox+232,427,`d(q, x⁽²⁾) = ${r.distances[1].toFixed(2)}`,24,'#26354a','start');
}return wrap(s,1248,450)}

function nearestPlot(q={x:1.8,y:-.95}){
let s='';const X=x=>60+(x+2.4)/4.8*620,Y=y=>410-(y+1.8)/3.6*360,n=neighbors(q,1)[0];
s+=`<path d="M60 50V410H680" fill="none" stroke="#a6afbc"/>`;
for(let c=0;c<3;c++)s+=text(80+c*230,28,'class '+['A','B','C'][c],24,C[c],'start');
s+=`<path d="M${X(q.x)} ${Y(q.y)}L${X(n.x)} ${Y(n.y)}" stroke="#53657e" stroke-width="2.5" stroke-dasharray="6 5"/>`;
data.forEach(p=>s+=`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="7" stroke="white" stroke-width="1.5" fill="${C[p.c]}"/>`);
s+=`<circle cx="${X(n.x)}" cy="${Y(n.y)}" r="13" fill="none" stroke="${C[n.c]}" stroke-width="2"/>`+text(680,Y(n.y)-23,'nearest example',23,C[n.c],'end');
s+=queryMarker(X(q.x),Y(q.y),11);
s+=text(365,449,'feature 1',25)+`<text x="22" y="230" transform="rotate(-90 22 230)" font-family="Arial,sans-serif" font-size="25" text-anchor="middle" fill="#26354a">feature 2</text>`;return wrap(s)}

const api={C,P,data,dist,neighbors,vote,knn,metric,linear,hard,cv,cvplot,softmax,softplot,lossplot,pixels,nearestIntro,nearestPlot,metricComparison,metricResult,metricPoints};if(typeof module!=='undefined')module.exports=api;root.Diagrams=api;
})(typeof globalThis!=='undefined'?globalThis:this);
