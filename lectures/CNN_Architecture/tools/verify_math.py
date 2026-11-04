#!/usr/bin/env python3
"""Independent arithmetic invariants for the displayed examples."""
from math import floor,isclose
def out(h,k,s,p):return floor((h+2*p-k)/s)+1
assert out(32,3,2,1)==16
assert 9*64*128==73728
assert 16**2*9*64*128==18874368
r=j=1
trace=[]
for k,s in [(3,1),(2,2),(3,1)]:
 r+=(k-1)*j;j*=s;trace.append((r,j))
assert trace==[(3,1),(4,2),(8,2)]
assert 49*64**2==200704 and 27*64**2==110592
assert 49*512*1000==25088000
assert 28**2*(9*192*128)==173408256
assert 28**2*(192*96+9*96*128)==101154816
assert isclose((192*96+9*96*128)/(9*192*128),7/12)
assert 256*64+9*64**2+64*256==69632
assert 9*64+64*128==8768
assert 28**2*8768==6874112
assert 1+16+1==18 and 1+3*(3+4+6+3)+1==50
print('Verified shapes, receptive-field recurrence, weight counts, MACs, and depth conventions.')
