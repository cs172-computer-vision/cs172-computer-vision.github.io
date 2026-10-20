/* Exact pair-coordinate ascent for the box-constrained SVM dual.
   Educational solver for tiny fixed datasets; no general-purpose QP dependency. */
const SVM = (()=>{
 const dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0);
 const base=[{x:[-2,-1],y:-1},{x:[-2,1],y:-1},{x:[-1,0],y:-1},{x:[1,0],y:1},{x:[2,-1],y:1},{x:[2,1],y:1}];
 const soft=[...base,{x:[-1.6,.25],y:1}];
 const rings=Array.from({length:16},(_,i)=>{let a=(i%8)*Math.PI/4,r=i<8?.55:1.5;return{x:[r*Math.cos(a),r*Math.sin(a)],y:i<8?1:-1}});
 function train(data,C=1,gamma=null){
  const n=data.length,kernel=gamma===null?dot:(x,z)=>Math.exp(-gamma*x.reduce((s,v,i)=>s+(v-z[i])**2,0));
  const G=data.map(a=>data.map(b=>kernel(a.x,b.x))),Q=G.map((r,i)=>r.map((v,j)=>v*data[i].y*data[j].y));
  const alpha=Array(n).fill(0),g=Array(n).fill(1);let iterations=0;
  for(;iterations<12000;iterations++){
   let best=null;
   for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){
    const u=data[i].y,v=-data[j].y;
    let lo=-Infinity,hi=Infinity;
    for(const [a,d] of [[alpha[i],u],[alpha[j],v]]){let l=-a/d,h=(C-a)/d;lo=Math.max(lo,Math.min(l,h));hi=Math.min(hi,Math.max(l,h))}
    const slope=u*g[i]+v*g[j],curv=Math.max(0,G[i][i]+G[j][j]-2*G[i][j]);
    const delta=curv>1e-12?Math.max(lo,Math.min(hi,slope/curv)):(slope>0?hi:lo);
    const gain=slope*delta-.5*curv*delta*delta;
    if(gain>1e-12&&(!best||gain>best.gain))best={i,j,u,v,delta,gain};
   }
   if(!best)break;
   const {i,j,u,v,delta}=best;alpha[i]+=u*delta;alpha[j]+=v*delta;
   for(let k=0;k<n;k++)g[k]-=delta*(Q[k][i]*u+Q[k][j]*v);
  }
  const raw=x=>data.reduce((s,p,i)=>s+alpha[i]*p.y*kernel(p.x,x),0),free=alpha.map((a,i)=>a>1e-7&&a<C-1e-7?i:-1).filter(i=>i>=0);
  let b;
  if(free.length)b=free.reduce((s,i)=>s+data[i].y-raw(data[i].x),0)/free.length;
  else{let low=-Infinity,high=Infinity;data.forEach((p,i)=>{let value=p.y-raw(p.x);if(alpha[i]<C-1e-7){if(p.y===1)low=Math.max(low,value);else high=Math.min(high,value)}if(alpha[i]>1e-7){if(p.y===1)high=Math.min(high,value);else low=Math.max(low,value)}});b=Number.isFinite(low)&&Number.isFinite(high)?(low+high)/2:Number.isFinite(low)?low:Number.isFinite(high)?high:0}
  const predict=x=>raw(x)+b,norm2=alpha.reduce((s,a,i)=>s+a*(1-g[i]),0),slacks=data.map(p=>Math.max(0,1-p.y*predict(p.x)));
  const dual=alpha.reduce((s,a)=>s+a,0)-norm2/2,primal=norm2/2+C*slacks.reduce((s,x)=>s+x,0),w=[0,1].map(d=>data.reduce((s,p,i)=>s+alpha[i]*p.y*p.x[d],0));
  return {alpha,b,w,primal,dual,gap:primal-dual,iterations,predict,slacks,free};
 }
 return{dot,base,soft,rings,train};
})();
if(typeof module!=='undefined')module.exports=SVM;
