const assert=require('assert'),S=require('../source/svm.js'),L=require('../source/linear.js');
const close=(a,b,tol=1e-8)=>assert(Math.abs(a-b)<tol,a+' != '+b);
const dot=S.dot;
let exact=S.train(S.base,100);
close(exact.w[0],1);close(exact.w[1],0);close(exact.b,0);close(exact.primal,.5);close(exact.dual,.5);
close(exact.alpha[2],.5);close(exact.alpha[3],.5);
let largestGap=0;
for(const [data,C,gamma] of [...[.05,.2,1,10,100].map(C=>[S.soft,C,null]),...[.1,1,5,20].map(g=>[S.rings,10,g])]){
 const m=S.train(data,C,gamma);largestGap=Math.max(largestGap,m.gap);
 assert(m.gap>=-1e-7&&m.gap<1e-3);close(m.alpha.reduce((s,a,i)=>s+a*data[i].y,0),0,1e-7);
 m.alpha.forEach((a,i)=>{assert(a>=-1e-7&&a<=C+1e-7);let margin=data[i].y*m.predict(data[i].x);
  if(a<1e-7)assert(margin>=1-1e-3);
  else if(a>C-1e-7)assert(margin<=1+1e-3);
  else close(margin,1,1e-3);
 });
}
for(let i=0;i<30;i++){
 let x=[Math.sin(i),Math.cos(2*i)],z=[Math.cos(i),Math.sin(3*i)],phi=a=>[1,Math.SQRT2*a[0],Math.SQRT2*a[1],a[0]**2,Math.SQRT2*a[0]*a[1],a[1]**2];
 close(dot(phi(x),phi(z)),(1+dot(x,z))**2);
}
const hinge=(s,y)=>s.reduce((sum,v,j)=>sum+(j===y?0:Math.max(0,v-s[y]+1)),0);
close(hinge([3.2,5.1,-1.7],0),2.9);close(hinge([1.3,4.9,2],1),0);close(hinge([2.2,2.5,-3.1],2),12.9);
close(hinge([103.2,105.1,98.3],0),2.9);close((2.9+12.9)/3,5.266666666666667);
for(let m of [1.4,.6,-.3])close(Math.max(0,1-m),m>=1?0:m===.6?.4:1.3);
let w=[.2,-.1],x=[1,2],lambda=.1,eta=.1,b=0;
w=w.map((v,j)=>v-eta*(lambda*v-x[j]));b-=eta*(-1);close(w[0],.298);close(w[1],.101);close(dot(w,x)+b,.6);
const X=[[.3,-.7],[-.8,.4],[.2,.9]],y=[0,1,2],W=[[.2,-.3],[-.4,.1],[.1,.5]],bias=[.1,-.2,.05],lam=.13;
const g=L.lossAndGrad(X,y,W,bias,lam);let worst=0;
for(let j=0;j<3;j++)for(let d=0;d<2;d++){let old=W[j][d],h=1e-6;W[j][d]=old+h;let plus=L.lossAndGrad(X,y,W,bias,lam).loss;W[j][d]=old-h;let minus=L.lossAndGrad(X,y,W,bias,lam).loss;W[j][d]=old;let e=Math.abs((plus-minus)/(2*h)-g.dW[j][d]);worst=Math.max(worst,e);assert(e<1e-7)}
for(let j=0;j<3;j++){let old=bias[j],h=1e-6;bias[j]=old+h;let plus=L.lossAndGrad(X,y,W,bias,lam).loss;bias[j]=old-h;let minus=L.lossAndGrad(X,y,W,bias,lam).loss;bias[j]=old;close((plus-minus)/(2*h),g.db[j],1e-7)}
console.log(JSON.stringify({exactPrimalDual:.5,largestDemoGap:largestGap,multiclassGradientError:worst,checks:'canonical margin; dual feasibility and KKT; 9 fitted settings; polynomial identity; hinge arithmetic/invariance; update; full weight/bias finite differences'},null,2));
