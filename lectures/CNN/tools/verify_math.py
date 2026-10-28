"""Dependency-free checks of displayed arithmetic and finite-difference gradients."""
from math import isclose
X=[[0,0,1,1,0],[0,1,2,1,0],[0,1,3,2,0],[0,1,2,1,0],[0,0,1,0,0]]
K=[[-1,0,1]]*3
Y=[[sum(X[i+u][j+v]*K[u][v] for u in range(3) for v in range(3)) for j in range(3)] for i in range(3)]
assert Y==[[6,2,-6],[7,1,-7],[6,1,-6]]
def objective(a,b):return 4*(a+2*b)+5*(2*a+3*b)
eps=1e-6;a=.7;b=-.2
assert isclose((objective(a+eps,b)-objective(a-eps,b))/(2*eps),14,abs_tol=1e-8)
assert isclose((objective(a,b+eps)-objective(a,b-eps))/(2*eps),23,abs_tol=1e-8)
assert 8192*(3072+1)==25174016
assert 8192*(27+1)==229376
assert 8*(27+1)==224
assert 32*32*8*27==221184
assert 16*(8*9+1)==1168
assert 224+1168+16*10+10==1562
assert .5*1-1*2+2*3+.5==5
pool=[[1,4,2,0],[3,2,5,1],[0,1,2,3],[2,0,1,6]]
pooled=[[max(pool[i+u][j+v] for u in range(2) for v in range(2)) for j in [0,2]] for i in [0,2]]
assert pooled==[[4,5],[2,6]]
averages=[[sum(pool[i+u][j+v] for u in range(2) for v in range(2))/4 for j in [0,2]] for i in [0,2]]
assert averages==[[2.5,2],[.75,3]]
r,j=1,1;trace=[]
for k,s in [(3,1),(2,2),(3,1),(2,2)]:r,j=r+(k-1)*j,j*s;trace.append((r,j))
assert trace==[(3,1),(4,2),(8,2),(10,4)]
print('Convolution, finite-difference gradients, counts, pooling and receptive fields passed.')
