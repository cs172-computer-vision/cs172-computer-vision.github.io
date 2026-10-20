// Optional numerical checks after editing the interactive renderers.
const assert=require('node:assert/strict'),D=require('../source/diagrams.js');
const p=D.softmax([3.2,5.1,-1.7]);assert(Math.abs(p.loss-2.0403551528001698)<1e-12);
assert(Math.abs(p.p.reduce((a,b)=>a+b,0)-1)<1e-12);
assert(Math.abs(D.softmax([0,0]).loss-Math.log(2))<1e-12);
assert(Math.abs(D.softmax([1000,1000,1000]).loss-Math.log(3))<1e-12);
assert(Number.isFinite(D.softmax([-10000,10000,0]).loss));
assert.equal(D.dist({x:0,y:0},{x:1,y:1},'l1'),2);
assert.equal(D.dist({x:0,y:0},{x:3,y:4},'l2'),5);
assert.equal(D.vote([{c:1,d:1},{c:0,d:2},{c:0,d:3}]),0);
assert.equal(D.vote([{c:1,d:1},{c:0,d:2}]),1);
assert(!/NaN|Infinity/.test(D.linear(0,0,0)));
assert.equal(D.metricResult({x:0,y:0},'l1').prediction,0);
assert.equal(D.metricResult({x:0,y:0},'l2').prediction,1);
assert.equal(D.vote(D.neighbors({x:-.5,y:1.05},1)),1);
assert.equal(D.vote(D.neighbors({x:-.5,y:1.05},3)),0);
console.log('Numerical checks passed.');
// Probability interpretation and the bridge from label likelihood to loss.
const scores=[3.2,5.1,-1.7],base=D.softmax(scores);
const close=(a,b)=>assert(Math.abs(a-b)<1e-11,`${a} != ${b}`);
base.p.forEach(v=>assert(v>0&&v<1));
assert.equal(base.p.indexOf(Math.max(...base.p)),scores.indexOf(Math.max(...scores)));
close(base.p[1]/base.p[0],Math.exp(1.9));
const shifted=D.softmax(scores.map(s=>s+1000));
base.p.forEach((v,i)=>close(v,shifted.p[i]));close(base.loss,shifted.loss);
assert.notDeepEqual(base.p,D.softmax(scores.map(s=>s*2)).p);
close(base.loss,-Math.log(base.p[0]));
const B=[.3,.6,.1];assert.equal(B.indexOf(Math.max(...B)),1);
assert(-Math.log(B[0])<base.loss); // Accuracy is unchanged; label likelihood improves.
assert(!/loss|cross-entropy|true class/i.test(D.softplot()));
console.log('Probability ratios, translation invariance, likelihood and demo separation passed.');
