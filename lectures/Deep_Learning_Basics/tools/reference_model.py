#!/usr/bin/env python3
"""Executable small MLP: mean multiclass hinge loss, L2 weights, minibatch SGD.
Pure Python 3; no dependencies. Educational XOR example, not an image benchmark.
Arrays use W1[hidden][input], W2[class][hidden], matching column-vector slides.
"""
import random

def initialize(seed=7, D=2, H=8, C=2):
    rng=random.Random(seed)
    return {'W1':[[rng.uniform(-1,1) for _ in range(D)] for _ in range(H)],
            'b1':[0.1]*H,
            'W2':[[rng.uniform(-1,1) for _ in range(H)] for _ in range(C)],
            'b2':[0.0]*C}

def zeros_like(p):
    return {k:([[0.0]*len(v[0]) for _ in v] if isinstance(v[0],list) else [0.0]*len(v)) for k,v in p.items()}

def forward(x,p):
    z=[sum(w*v for w,v in zip(row,x))+b for row,b in zip(p['W1'],p['b1'])]
    h=[max(0,v) for v in z]
    s=[sum(w*v for w,v in zip(row,h))+b for row,b in zip(p['W2'],p['b2'])]
    return z,h,s

def loss_and_grad(X,y,p,lam=0.0):
    """Return mean data loss + lam/2 * squared weight norms and its gradient.
    At a hinge or ReLU kink, use zero as the local subgradient.
    """
    n=len(X);assert n>0 and n==len(y)
    g=zeros_like(p);loss=0.0
    for x,label in zip(X,y):
        z,h,s=forward(x,p);ds=[0.0]*len(s)
        for j in range(len(s)):
            if j==label:continue
            margin=s[j]-s[label]+1
            if margin>0:
                loss+=margin/n;ds[j]+=1/n;ds[label]-=1/n
        dh=[sum(p['W2'][j][k]*ds[j] for j in range(len(s))) for k in range(len(h))]
        for j in range(len(s)):
            g['b2'][j]+=ds[j]
            for k in range(len(h)):g['W2'][j][k]+=ds[j]*h[k]
        for k in range(len(h)):
            dz=dh[k] if z[k]>0 else 0.0
            g['b1'][k]+=dz
            for d in range(len(x)):g['W1'][k][d]+=dz*x[d]
    for name in ['W1','W2']:
        for i,row in enumerate(p[name]):
            for j,v in enumerate(row):
                loss+=0.5*lam*v*v;g[name][i][j]+=lam*v
    return loss,g

def update(p,g,eta):
    for name,v in p.items():
        if isinstance(v[0],list):
            for i,row in enumerate(v):
                for j in range(len(row)):row[j]-=eta*g[name][i][j]
        else:
            for i in range(len(v)):v[i]-=eta*g[name][i]

def train_xor():
    X=[[0,0],[0,1],[1,0],[1,1]];y=[0,1,1,0]
    p=initialize();rng=random.Random(172);eta=0.05;lam=0.0001
    initial=loss_and_grad(X,y,p,lam)[0]
    for epoch in range(500):
        ids=list(range(len(X)));rng.shuffle(ids)
        for start in range(0,len(ids),2):
            batch=ids[start:start+2]
            _,g=loss_and_grad([X[i] for i in batch],[y[i] for i in batch],p,lam)
            update(p,g,eta)
    final=loss_and_grad(X,y,p,lam)[0]
    predictions=[max(range(2),key=lambda j:forward(x,p)[2][j]) for x in X]
    print(f'Synthetic XOR: objective {initial:.6f} -> {final:.6f}; labels {predictions}')
    return predictions
if __name__=='__main__':train_xor()
