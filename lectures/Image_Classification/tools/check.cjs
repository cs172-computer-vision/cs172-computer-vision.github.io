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
