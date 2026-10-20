/* Explicit multiclass sum-of-hinges loss; X has example rows, W has class rows. */
const LinearSVM=(()=>{
function lossAndGrad(X,y,W,b,lambda=0){
 const N=X.length,K=W.length,D=W[0].length,dW=W.map(r=>r.map(()=>0)),db=b.map(()=>0);let loss=0;
 X.forEach((x,i)=>{
  const scores=W.map((row,j)=>row.reduce((s,w,d)=>s+w*x[d],b[j])),ds=Array(K).fill(0);
  for(let j=0;j<K;j++)if(j!==y[i]){let margin=scores[j]-scores[y[i]]+1;if(margin>0){loss+=margin/N;ds[j]++;ds[y[i]]--}}
  for(let j=0;j<K;j++){db[j]+=ds[j]/N;for(let d=0;d<D;d++)dW[j][d]+=ds[j]*x[d]/N}
 });
 for(let j=0;j<K;j++)for(let d=0;d<D;d++){loss+=lambda/2*W[j][d]**2;dW[j][d]+=lambda*W[j][d]}
 return{loss,dW,db};
}
return{lossAndGrad};
})();
if(typeof module!=='undefined')module.exports=LinearSVM;
