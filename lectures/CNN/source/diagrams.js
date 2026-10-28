(function(root){'use strict';
const C={ink:'#14243c',muted:'#53657e',blue:'#236bc2',light:'#e7eff9',green:'#168a76',red:'#bb3948',line:'#b9c9dd',paper:'#f5f8fc'};
const input=[[0,0,1,1,0],[0,1,2,1,0],[0,1,3,2,0],[0,1,2,1,0],[0,0,1,0,0]],kernel=[[-1,0,1],[-1,0,1],[-1,0,1]];
const text=(x,y,t,size=28,fill=C.ink,anchor='start')=>`<text x="${x}" y="${y}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" fill="${fill}" text-anchor="${anchor}">${t}</text>`;
const rect=(x,y,w,h,fill=C.paper,stroke=C.line,sw=2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const line=(x,y,x2,y2,color=C.line,width=2)=>`<path d="M${x},${y} L${x2},${y2}" fill="none" stroke="${color}" stroke-width="${width}"/>`;
const arrow=(x,y,x2,y2)=>line(x,y,x2,y2,C.muted,2)+`<path d="M${x2-9},${y2-6} L${x2},${y2} L${x2-9},${y2+6}" fill="none" stroke="${C.muted}" stroke-width="2"/>`;
function svg(w,h,body,label){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><title>${label}</title>${body}</svg>`}
function grid(a,x,y,c=48,opts={}){let s='';a.forEach((row,i)=>row.forEach((v,j)=>{let fill=opts.fill?opts.fill(v,i,j):v<0?'#fae9ec':v>0?C.light:'#f5f7fa';s+=rect(x+j*c,y+i*c,c,c,fill,C.line,1);if(!opts.hide)s+=text(x+(j+.5)*c,y+(i+.5)*c+9,v,opts.font||26,C.ink,'middle')}));return s}
function response(r,c){return kernel.reduce((sum,row,u)=>sum+row.reduce((t,v,k)=>t+v*input[r+u][c+k],0),0)}
const output=Array.from({length:3},(_,r)=>Array.from({length:3},(_,c)=>response(r,c)));
function convolution(pos=0){const r=Math.floor(pos/3),c=pos%3;let s=text(5,32,'Input X',28)+grid(input,5,55,53)+rect(5+c*53,55+r*53,159,159,'none',C.blue,5)+text(395,32,'Output Z',28)+grid(output,365,55,59)+rect(365+c*59,55+r*59,59,59,'none',C.green,5)+text(10,365,'Kernel K',28)+grid(kernel,170,335,39,{font:24})+text(10,410,'−1 · left',24,C.muted)+text(365,295,`Selected: (${r}, ${c})`,25,C.green)+text(365,335,`response = ${output[r][c]}`,27,C.green);return svg(580,460,s,'Fixed input and kernel, with selected input window and output cell')}
function shape(h=32,k=3,stride=1,p=1){let o=Math.floor((h+2*p-k)/stride)+1,scale=6.8;const xs=35,ys=90,s2=355;
let s=text(15,38,`Input: 3 × ${h} × ${h}`,28)+text(325,38,`Output: 8 × ${o} × ${o}`,28);
s+=rect(xs-p*scale,ys-p*scale,(h+2*p)*scale,(h+2*p)*scale,'#eef2f7',C.muted,1)+rect(xs,ys,h*scale,h*scale,C.light,C.blue,3);
s+=rect(xs-p*scale,ys-p*scale,k*scale,k*scale,'#c2d7f0',C.blue,3)+rect(s2,ys,o*scale,o*scale,'#e0f1eb',C.green,3)+arrow(285,170,330,170);
s+=text(15,390,`H′ = floor((${h} + 2·${p} − ${k}) / ${stride}) + 1`,25)+text(15,430,`= ${o} positions per spatial axis`,28,C.green);
return svg(600,460,s,'Input and output spatial sizes at the same scale; gray border is zero padding')}
function field(depth=3){let s='',cell=31,x=72,y=72;for(let i=0;i<13;i++)for(let j=0;j<13;j++)s+=rect(x+j*cell,y+i*cell,cell,cell,'#f7f9fc','#d9e2ee',1);
for(let d=depth;d>=1;d--){const side=1+2*d,start=(13-side)/2;s+=rect(x+start*cell,y+start*cell,side*cell,side*cell,d===depth?'#dceaf8':'none',d===depth?C.blue:'#7e9bc0',d===depth?3:1)}
s+=rect(x+6*cell,y+6*cell,cell,cell,C.green,C.green,1)+text(274,35,`Original input · field ${1+2*depth} × ${1+2*depth}`,28,C.ink,'middle')+text(274,515,'Green: tracked output center',25,C.green,'middle');return svg(550,540,s,'Nested theoretical receptive fields in original input coordinates')}
function staticDiagram(name){let s='';
if(name==='title'){
 const a=Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>+(j===2||i===4&&j>1&&j<5)));
 s+=grid(a,30,95,42,{hide:true,fill:v=>v?C.blue:'#f2f5fa'})+text(155,400,'Image',28,C.ink,'middle');
 for(let d=2;d>=0;d--){s+=rect(330+d*16,130-d*18,150,150,['#deece7','#e7eff9','#edf1f8'][d],C.line,2)}
 s+=rect(362,184,42,42,'#a9c6e9',C.blue,2)+arrow(290,220,325,220)+text(422,400,'Features',28,C.ink,'middle');
 for(let j=0;j<10;j++)s+=rect(540,105+j*23,10+[28,18,30,25,80,20,32,15,22,18][j],13,j===4?C.green:'#c6d5e8','none');
 s+=arrow(505,220,532,220)+text(580,400,'Scores',28,C.ink,'middle');return svg(660,490,s,'A CNN transforms spatial pixels into features and class scores')}
if(name==='flatten'){
 let a=Array.from({length:6},(_,i)=>Array.from({length:6},(_,j)=>i*6+j));s+=grid(a,15,45,50,{hide:true});s+=rect(65,95,150,150,'#d3e3f6',C.blue,3)+text(165,400,'Neighbors in a grid',27,C.ink,'middle');s+=arrow(335,175,385,175);
 for(let i=0;i<12;i++)s+=rect(430,15+i*31,70,31,i>2&&i<7?'#d3e3f6':C.paper,C.line,1);
 s+=text(466,425,'Vector',27,C.ink,'middle');return svg(570,480,s,'A grid is reshaped into a vector without losing values')}
if(name==='pattern'){
 [0,1].forEach((v)=>{let a=Array.from({length:5},(_,i)=>Array.from({length:8},(_,j)=>+(j>=(v?5:2))));s+=grid(a,30+v*650,25,52,{hide:true,fill:v=>v?'#9db9dc':'#f3f6fa'});s+=rect(30+v*650+(v?4:1)*52,77,156,156,'none',C.blue,4);s+=text(238+v*650,330,v?'Same pattern, new position':'A local brightness transition',28,C.ink,'middle')});s+=arrow(485,150,620,150);return svg(1200,370,s,'The same local vertical edge at two positions')}
if(name==='dot'){
 const a=input.slice(0,3).map(r=>r.slice(0,3));s+=text(160,35,'Patch A',28,C.ink,'middle')+grid(a,40,60,80)+text(365,190,'⊙',50,C.blue,'middle')+text(570,35,'Kernel K',28,C.ink,'middle')+grid(kernel,450,60,80)+arrow(750,178,850,178)+text(1010,160,'Sum + bias',28,C.muted,'middle')+text(1010,230,'6',62,C.green,'middle');return svg(1200,330,s,'Elementwise multiplication followed by summation and bias gives six')}
if(name==='channels'){
 ['Channel 0','Channel 1','Channel 2'].forEach((t,j)=>{s+=text(20,48+j*105,t,25)+rect(180,12+j*105,65,65,['#e9ecf9','#fbe8eb','#e3f3ed'][j])+text(212,55+j*105,j+1,30,C.ink,'middle')+text(280,55+j*105,['× 0.5','× (−1)','× 2'][j],28)+line(390,45+j*105,470,150,C.line)});
 s+=text(475,160,'Σ',45,C.blue)+text(200,405,'Bias: + 0.5 → output 5',29,C.green);return svg(570,470,s,'A one by one filter sums weighted input channels')}
if(name==='tensors'){
 for(let i=2;i>=0;i--)s+=rect(40+i*24,80-i*20,225,160,['#d9e7f8','#edf1f9','#f2e8ec'][i]);s+=text(170,300,'3 input channels',28,C.ink,'middle');
 s+=arrow(350,160,550,160)+text(450,100,'8 filters',28,C.blue,'middle')+text(450,220,'3 × 3 × 3 each',26,C.muted,'middle');
 for(let i=7;i>=0;i--)s+=rect(710+i*17,90-i*8,225,150,i%2?'#f2f6fb':'#dfebf7',C.line,1);s+=text(865,300,'8 output channels',28,C.ink,'middle');return svg(1200,335,s,'Three input channels are processed by eight filters to create eight output channels')}
if(name==='relu'){
 s+=text(150,35,'Convolution Z',28,C.ink,'middle')+grid(output,40,60,68)+text(400,35,'ReLU(Z)',28,C.ink,'middle')+grid(output.map(r=>r.map(v=>Math.max(0,v))),310,60,68)+arrow(260,160,295,160)+text(275,355,'Same shape: 1 × 3 × 3',28,C.ink,'middle');return svg(570,440,s,'ReLU sets negative responses to zero without changing shape')}
if(name==='stride'){
 [1,2].forEach((stride,t)=>{let x=70+t*620;s+=grid(Array.from({length:7},()=>Array(7).fill(0)),x,15,39,{hide:true});s+=rect(x,15,117,117,'#d5e4f6',C.blue,3);for(let i=0;i<=4;i+=stride)for(let j=0;j<=4;j+=stride)s+=`<circle cx="${x+j*39+6}" cy="${21+i*39}" r="4" fill="${C.blue}"/>`;s+=text(x+136,335,`Stride ${stride}: ${stride===1?'5 × 5':'3 × 3'} output`,29,C.ink,'middle')});return svg(1200,380,s,'Kernel origins are sampled at stride one or two; outlines show the first kernel')}
if(name==='padding'){
 const a=Array.from({length:7},()=>Array(7).fill(1));s+=grid(a,60,45,35,{hide:true})+text(182,342,'P = 0 → 5 × 5',30,C.ink,'middle')+arrow(365,165,520,165);
 s+=grid(Array.from({length:9},()=>Array(9).fill(0)),650,10,35,{font:24,fill:()=> '#edf1f5'})+grid(a,685,45,35,{hide:true})+rect(685,45,245,245,'none',C.blue,3)+text(807,380,'P = 1 → 7 × 7',30,C.ink,'middle');return svg(1200,415,s,'A zero border preserves output side for a stride-one three by three kernel')}
if(name==='pool'){
 const a=[[1,4,2,0],[3,2,5,1],[0,1,2,3],[2,0,1,6]],fills=['#e2edf9','#e6f3ed','#f9ece0','#eee9f8'];
 s+=text(200,30,'One input channel',28,C.ink,'middle')+grid(a,45,60,64,{fill:(v,i,j)=>fills[Math.floor(i/2)*2+Math.floor(j/2)]});s+=arrow(370,185,580,185)+text(475,130,'2 × 2 max',28,C.muted,'middle');s+=grid([[4,5],[2,6]],700,105,85,{fill:(v,i,j)=>fills[i*2+j]})+text(785,330,'One output channel',28,C.ink,'middle');return svg(1200,370,s,'Each two by two region contributes its maximum independently per channel')}
if(name==='network'){
 const blocks=[['Input','3 × 32 × 32'],['Conv + ReLU','8 × 32 × 32'],['Max pool','8 × 16 × 16'],['Conv + ReLU','16 × 16 × 16'],['Max pool','16 × 8 × 8'],['Avg → Linear','16 → 10']];
 blocks.forEach((b,i)=>{let x=2+i*202;s+=rect(x,75,181,145,i===5?'#e2f2ec':C.paper,C.line,2)+text(x+90,124,b[0],25,C.ink,'middle')+text(x+90,176,b[1],24,C.blue,'middle');if(i<5)s+=arrow(x+184,148,x+200,148)});s+=text(600,290,'Convolution: K = 3, S = 1, P = 1 · Max pool: K = 2, S = 2',28,C.muted,'middle');return svg(1200,350,s,'An original two-block CNN with global averaging and a ten-class linear head')}
throw new Error('Unknown diagram '+name)}
root.CNNDraw={input,kernel,output,response,convolution,shape,field,staticDiagram};
})(globalThis);
