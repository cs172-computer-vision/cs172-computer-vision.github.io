/* Deterministic SVG renderers. Shared by the live deck and static SVG assets. */
const Diagrams = (() => {
'use strict';
const C={ink:'#14243c',muted:'#53657e',blue:'#236bc2',red:'#bb3948',green:'#168a76',grid:'#dce4ee'};
const text=(x,y,s,color=C.ink,size=26,anchor='middle')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}" font-family="Arial,Helvetica,sans-serif">${s}</text>`;
const line=(x1,y1,x2,y2,color=C.grid,width=2,dash='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
const circle=(x,y,r=7,color=C.blue)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
const path=(points,color=C.blue,width=4)=>`<path d="${points.map((p,i)=>(i?'L':'M')+p.join(',')).join(' ')}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
function svg(body,w=720,h=480,label='Teaching diagram'){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}"><defs><marker id="arrow" markerWidth="9" markerHeight="9" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="${C.muted}" stroke-width="1.5"/></marker></defs>${body}</svg>`}
function axis({xmin=-2,xmax=2,ymin=-2,ymax=2,w=720,h=480,xlabel='θ₁',ylabel='θ₂'}={}){
 const X=x=>70+(x-xmin)/(xmax-xmin)*(w-115),Y=y=>h-70-(y-ymin)/(ymax-ymin)*(h-125);
 let b='';
 for(let t=Math.ceil(xmin);t<=Math.floor(xmax);t++){b+=line(X(t),55,X(t),h-70,C.grid,1);if(t%1===0)b+=text(X(t),h-38,t,C.muted,22)}
 for(let t=Math.ceil(ymin);t<=Math.floor(ymax);t++){b+=line(70,Y(t),w-45,Y(t),C.grid,1);b+=text(48,Y(t)+8,t,C.muted,22)}
 b+=line(70,h-70,w-35,h-70,C.muted,2)+line(70,45,70,h-70,C.muted,2)+text(w-35,h-8,xlabel,C.ink,26)+text(32,28,ylabel,C.ink,26);
 return {X,Y,b};
}
function network(){let b='',layers=[[100,[130,240,350]],[350,[80,185,290,395]],[610,[180,310]]];
 for(let k=0;k<2;k++)for(const a of layers[k][1])for(const d of layers[k+1][1])b+=line(layers[k][0]+22,a,layers[k+1][0]-22,d,'#b5c7dc',2);
 layers.forEach(([x,ys],i)=>ys.forEach(y=>{b+=`<circle cx="${x}" cy="${y}" r="24" fill="${['#e7eef9','#e5f3ef','#f9e6e9'][i]}" stroke="${[C.blue,C.green,C.red][i]}" stroke-width="2.5"/>`}));
 b+=text(100,35,'Input')+text(350,35,'Hidden features')+text(610,35,'Scores')+text(100,460,'x',C.blue,30)+text(350,460,'h = φ(W₁x + b₁)',C.green,28)+text(610,460,'s',C.red,30);return svg(b,720,480,'Fully connected neural network');}
function hingeCurve(){const {X,Y,b}=axis({xmin:-3,xmax:3,ymin:0,ymax:4,xlabel:'gap m',ylabel:'loss'});return svg(b+path([[-3,4],[1,0],[3,0]].map(([x,y])=>[X(x),Y(y)]))+circle(X(1),Y(0),7,C.red)+text(465,110,'max(0, 1 − m)',C.blue,29)+text(475,150,'margin satisfied →',C.muted,24));}
function hinge(a=3.2,b=5.1){let out='',vals=[a,b,-1.7],labs=['cat (true)','car','frog'];let X=x=>175+(x+3)/11*495;
 for(let v=-3;v<=8;v++)out+=line(X(v),65,X(v),365,C.grid,1)+text(X(v),405,v,C.muted,22);
 vals.forEach((v,i)=>{let y=100+i*105;out+=text(25,y+8,labs[i],i===0?C.green:C.ink,26,'start')+line(X(-3),y,X(v),y,i===0?C.green:C.blue,14)+circle(X(v),y,9,i===0?C.green:C.blue)+text(X(v),y-22,v.toFixed(1),C.ink,25)});
 let threshold=a-1;out+=line(X(threshold),55,X(threshold),365,C.red,3,'7 6')+text(395,450,'Dashed line: allowed rival score = cat − 1',C.red,25);return svg(out,720,480,'Class scores and the allowed rival-score threshold');}
function svm(){let {X,Y,b}=axis({xmin:-3,xmax:3,ymin:-2,ymax:2,xlabel:'x₁',ylabel:'x₂'});
 for(let x of [-1,0,1])b+=line(X(x),55,X(x),410,x?C.muted:C.ink,x?2:4,x?'8 5':'');
 [[-2,1.2],[-2.4,-.7],[-1,0],[-1,-1.3]].forEach(([x,y])=>b+=circle(X(x),Y(y),10,C.red));
 [[1,.6],[1,-1.1],[2.4,.9],[2,-.9]].forEach(([x,y])=>b+=circle(X(x),Y(y),10,C.blue));
 [[-1,0],[-1,-1.3],[1,.6],[1,-1.1]].forEach(([x,y])=>b+=`<circle cx="${X(x)}" cy="${Y(y)}" r="18" fill="none" stroke="${C.green}" stroke-width="3"/>`);
 b+=text(180,30,'t = −1',C.red)+text(540,30,'t = +1',C.blue);return svg(b,720,480,'Binary SVM boundary x1 zero, margins x1 plus or minus one, support vectors circled');}
function trajectory(eta=.1,steps=8,batch='full'){
 let x=2,y=-1,pts=[[x,y]],state=1729;
 const rand=()=>{state=(Math.imul(1664525,state)+1013904223)>>>0;return state/4294967296};
 for(let t=0;t<steps;t++){let a=0,b=0;if(batch!=='full'){for(let j=0;j<+batch;j++){// Uniform sampling from 4^2 symmetric per-example perturbations.
 const sample=()=>[-2,-.7,.7,2][Math.floor(rand()*4)];a+=sample();b+=sample();}a/=+batch;b/=+batch;}
 x-=eta*(x+a);y-=eta*(3*y+b);pts.push([x,y]);}return pts;
}
function contour(eta=.1,steps=8,batch='full'){
 let {X,Y,b}=axis({xmin:-2.5,xmax:2.5,ymin:-2,ymax:2});
 for(let l of [.15,.5,1,2,3.5]){let points=[];for(let t=0;t<=128;t++){let a=t/128*Math.PI*2;points.push([X(Math.sqrt(2*l)*Math.cos(a)),Y(Math.sqrt(2*l/3)*Math.sin(a))]);}b+=path(points,'#b8cadf',1.6);}
 let pts=trajectory(eta,steps,batch);let clipped=pts.map(([x,y])=>[Math.max(-2.5,Math.min(2.5,x)),Math.max(-2,Math.min(2,y))]);b+=path(clipped.map(([x,y])=>[X(x),Y(y)]),C.red,3);clipped.forEach(([x,y],i)=>b+=circle(X(x),Y(y),i===0?8:4,C.red));b+=circle(X(0),Y(0),6,C.green)+text(543,31,'L = ½(θ₁² + 3θ₂²)',C.muted,26);
 if(pts.some(([x,y])=>Math.abs(x)>2.5||Math.abs(y)>2))b+=text(390,75,'Path leaves the plot; edge positions clipped',C.red,23);
 return svg(b,720,480,'Quadratic loss contours and computed gradient descent path');
}
function batches(){let b='';for(let row=0;row<3;row++)for(let col=0;col<12;col++){let x=110+col*85,y=30+row*52;let sel=col<3;b+=`<rect x="${x}" y="${y}" width="68" height="35" fill="${sel?'#b9d2f2':'#edf1f6'}" stroke="${sel?C.blue:'#c1cddd'}" rx="2"/>`;}b+=text(230,230,'One minibatch',C.blue,30)+text(780,230,'Remaining examples',C.muted,30);return svg(b,1248,260,'One minibatch highlighted within a dataset');}
function block(x,y,w,label,color=C.blue){return `<rect x="${x}" y="${y}" width="${w}" height="85" fill="#f5f8fc" stroke="${color}" stroke-width="2" rx="3"/>`+text(x+w/2,y+51,label,color,28)}
function blocks(){let b='',xs=[0,250,560,825,1100],ws=[150,230,185,220,145],labs=['x','W₁x + b₁','φ','W₂h + b₂','s'];xs.forEach((x,i)=>{b+=block(x,80,ws[i],labs[i],i===2?C.green:C.blue);if(i<4)b+=`<path d="M${x+ws[i]+10},122 L${xs[i+1]-15},122" stroke="${C.muted}" stroke-width="2" marker-end="url(#arrow)"/>`;});b+=text(652,218,'hidden representation h',C.green,28);return svg(b,1248,260,'Affine, nonlinear activation, affine, scores');}
function neuron(){let b='';[110,230,350].forEach((y,i)=>{b+=text(60,y+10,'x'+['₁','₂','₃'][i],C.blue,32)+line(95,y,335,230,C.muted,2)+text(180,y-10,'w'+['₁','₂','₃'][i],C.muted,27)});b+=`<circle cx="370" cy="230" r="44" fill="#edf3fb" stroke="${C.blue}" stroke-width="2"/>`+text(370,243,'Σ',C.blue,40)+line(414,230,480,230,C.muted,2)+block(480,187,130,'φ',C.green)+line(610,230,660,230,C.muted,2)+text(690,240,'a',C.green,32)+text(370,130,'+ b',C.muted,30)+text(440,280,'z',C.ink,30);return svg(b);}
function activation(which='relu'){const {X,Y,b}=axis({xmin:-3,xmax:3,ymin:which==='relu'?-1:-1.2,ymax:which==='relu'?3:1.2,xlabel:'z',ylabel:'φ(z)'});let pts=[];for(let z=-3;z<=3.01;z+=.04){let a=which==='relu'?Math.max(0,z):which==='sigmoid'?1/(1+Math.exp(-z)):which==='tanh'?Math.tanh(z):Math.max(.1*z,z);pts.push([X(z),Y(a)]);}return svg(b+path(pts,which==='relu'?C.green:C.blue));}
function activations(){
 let out='';['sigmoid','tanh','leaky'].forEach((name,i)=>{let ox=i*416;let ymin=name==='sigmoid'?-.15:name==='tanh'?-1.3:-1,ymax=name==='leaky'?4.5:1.3;
 let X=z=>ox+65+(z+4)*35,Y=a=>285-(a-ymin)/(ymax-ymin)*245;
 out+=line(X(-4),Y(0),X(4),Y(0),C.muted,2)+line(X(0),35,X(0),285,C.muted,2)+text(X(4)+20,Y(0)+8,'z',C.muted,25);
 [-4,4].forEach(t=>out+=text(X(t),320,t,C.muted,24));[name==='leaky'?4:1].forEach(t=>out+=text(X(0)-15,Y(t)+8,t,C.muted,24,'end'));
 let pts=[];for(let z=-4;z<=4.01;z+=.05){let a=name==='sigmoid'?1/(1+Math.exp(-z)):name==='tanh'?Math.tanh(z):Math.max(.1*z,z);pts.push([X(z),Y(a)]);}out+=path(pts,C.blue,4);
 out+=text(ox+210,25,name==='leaky'?'max(0.1z, z)':name==='sigmoid'?'1 / (1 + e⁻ᶻ)':'tanh(z)',C.ink,28);});return svg(out,1248,335,'Sigmoid, tanh, leaky ReLU curves with actual response scales');}
function marginFigure(){let b='',X=x=>190+(x+3)/11*1000;
 for(let v of [-3,0,5,8])b+=line(X(v),24,X(v),205,C.grid,1)+text(X(v),237,v,C.muted,25);
 [3.2,5.1,-1.7].forEach((v,i)=>{let y=48+i*68;let color=i===0?C.green:C.blue;b+=text(15,y+10,['cat (true)','car','frog'][i],color,29,'start')+line(X(-3),y,X(v),y,color,12)+circle(X(v),y,8,color)+text(X(v)+23,y+10,v.toFixed(1),color,28,'start')});
 b+=line(X(2.2),22,X(2.2),210,C.red,3,'7 5')+text(X(2.2),237,'2.2',C.red,25);return svg(b,1248,255,'Class scores with dashed allowed-rival threshold at 2.2');}
function xor(hidden=false){let {X,Y,b}=axis({xmin:-.3,xmax:1.3,ymin:-.3,ymax:1.3,xlabel:hidden?'h₁':'x₁',ylabel:hidden?'h₂':'x₂'});let pts=hidden?[[0,0,0,'(0,0), (1,1)'],[1,0,1,'(1,0)'],[0,1,1,'(0,1)']]:[[0,0,0,'(0,0)'],[1,0,1,'(1,0)'],[0,1,1,'(0,1)'],[1,1,0,'(1,1)']];
 if(hidden)b+=line(X(-.3),Y(.8),X(.8),Y(-.3),C.green,3,'8 6');
 pts.forEach(([x,y,c,l])=>{b+=circle(X(x),Y(y),13,c?C.blue:C.red)+text(X(x),Y(y)-28,l,c?C.blue:C.red,26);});b+=text(370,470,hidden?'Dashed line: h₁ + h₂ = 0.5':'Red: class 0; blue: class 1',hidden?C.green:C.muted,25);return svg(b,720,480,'XOR points in '+(hidden?'hidden feature':'input')+' coordinates');}
function trainingGraph(){let b='',xs=[0,200,420,645,865,1080],ws=[115,155,150,165,150,165],labs=['x','Affine','ReLU','Affine','Loss','+'];xs.forEach((x,i)=>{b+=block(x,110,ws[i],labs[i],i===2?C.green:C.blue);if(i<5)b+=`<path d="M${x+ws[i]+5},152 L${xs[i+1]-12},152" stroke="${C.muted}" stroke-width="2" marker-end="url(#arrow)"/>`});b+=text(278,73,'W₁, b₁',C.muted,27)+text(727,73,'W₂, b₂',C.muted,27)+text(938,73,'labels y',C.muted,27)+text(1165,270,'total L',C.blue,29)+text(1165,35,'R(W₁, W₂)',C.muted,27)+`<path d="M1165,45 L1165,98" stroke="${C.muted}" stroke-width="2" marker-end="url(#arrow)"/>`;return svg(b,1248,310,'MLP computational graph ending in data loss plus regularization');}
function chain(){let b=text(60,105,'a = −2')+text(60,285,'b = 5')+text(365,390,'c = −4')+line(130,100,235,200,C.muted)+line(130,275,235,200,C.muted)+line(315,200,495,200,C.muted)+line(405,375,525,245,C.muted)+line(575,200,700,200,C.muted)+block(235,158,80,'+',C.blue)+block(495,158,80,'×',C.blue);
 b+=`<g class="step" data-stage="1">${text(390,150,'q = 3',C.blue,28)+text(660,150,'L = −12',C.blue,28)}</g>`;
 b+=`<g class="step" data-stage="2">${text(175,55,'∂L/∂a = −4',C.red,27)+text(175,335,'∂L/∂b = −4',C.red,27)+text(545,405,'∂L/∂c = 3',C.red,27)+text(400,270,'∂L/∂q = −4',C.red,27)}</g>`;return svg(b,720,480,'Scalar computation graph for (a+b)c with forward values and gradients');}
return {network,hingeCurve,hinge,marginFigure,svm,trajectory,contour,batches,blocks,neuron,activation,activations,xor,trainingGraph,chain};
})();
if(typeof module!=='undefined')module.exports=Diagrams;
