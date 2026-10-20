#!/usr/bin/env python3
"""Verify displayed arithmetic and independently check backprop by differences."""
from math import isclose
from reference_model import initialize,forward,loss_and_grad,train_xor

def close(a,b):assert isclose(a,b,abs_tol=1e-8,rel_tol=1e-8),(a,b)
close(__import__('math').log1p(__import__('math').exp(-6)),0.0024756851377304495)
close(.5*(1.8**2+3*(-.7)**2),2.355)
assert [2-.1*1,-1-.1*(-3)]==[1.9,-.7]
p={'W1':[[1,-1],[-1,1]],'b1':[0,0],'W2':[[1,-1],[-1,1]],'b2':[0,0]}
assert forward([1,-2],p)==([3,-3],[3,0],[3,-3])
for x,y in [([0,0],0),([0,1],1),([1,0],1),([1,1],0)]:
 h=[max(0,x[0]-x[1]),max(0,x[1]-x[0])];assert int(sum(h)>.5)==y
# Central differences validate every weight and bias on a smooth, nonzero-loss case.
p=initialize(seed=12,H=3);X=[[.3,-.7],[-.8,.4],[.2,.9]];y=[0,1,0];lam=.13
loss,g=loss_and_grad(X,y,p,lam);worst=0
for name,v in p.items():
 coords=[(i,j) for i,row in enumerate(v) for j in range(len(row))] if isinstance(v[0],list) else [(i,None) for i in range(len(v))]
 for i,j in coords:
  row=v if j is None else v[i];k=i if j is None else j;old=row[k];eps=1e-6
  row[k]=old+eps;plus=loss_and_grad(X,y,p,lam)[0];row[k]=old-eps;minus=loss_and_grad(X,y,p,lam)[0];row[k]=old
  analytic=g[name][i] if j is None else g[name][i][j]
  error=abs((plus-minus)/(2*eps)-analytic);worst=max(worst,error);assert error<1e-7,(name,i,j,error)
assert train_xor()==[0,1,1,0]
print(f'Displayed arithmetic and XOR verified; largest finite-difference error: {worst:.3g}')
