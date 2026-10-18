#!/usr/bin/env python3
"""Rebuild the original supplementary SVG figures; requires NumPy only."""
from pathlib import Path
import json
import numpy as np

R = Path(__file__).resolve().parents[1]
INK, BLUE, RED, GREEN = '#14243c', '#236bc2', '#bb3948', '#168a76'
PALE = ['#e4eefb', '#fae8eb', '#e2f2ed']

def text(x,y,s,size=24,color=INK,anchor='middle'):
    return f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="{size}" fill="{color}" text-anchor="{anchor}">{s}</text>'
def line(x1,y1,x2,y2,color='#8d9aad',width=2,dash=''):
    return f'<path d="M{x1} {y1}L{x2} {y2}" stroke="{color}" stroke-width="{width}" fill="none"'+(f' stroke-dasharray="{dash}"' if dash else '')+'/>'
def save(name,s,w,h):
    (R/'assets'/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img">{s}</svg>')
def path(points,color,width=4,dash=''):
    d=' '.join(('M' if i==0 else 'L')+f'{x:.2f} {y:.2f}' for i,(x,y) in enumerate(points))
    return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{width}"'+(f' stroke-dasharray="{dash}"' if dash else '')+'/>'

# Same noisy training data in all three k-NN panels. Evaluation labels are clean.
rng=np.random.default_rng(172)
train=rng.uniform(-1,1,(61,2))
labels=(train[:,1]>.45*np.sin(2.4*train[:,0])).astype(int)
flips=np.array([2,10,21,34,45,57]);labels[flips]=1-labels[flips]
grid=np.stack(np.meshgrid(np.linspace(-.98,.98,61),np.linspace(-.98,.98,61)),axis=-1).reshape(-1,2)
truth=(grid[:,1]>.45*np.sin(2.4*grid[:,0])).astype(int)
def predict(q,k):
    ids=np.argsort(((q[:,None]-train[None])**2).sum(2),axis=1,kind='stable')[:,:k]
    return (labels[ids].sum(1)>k/2).astype(int)
metrics={}
for k in [61,5,1]:
    s=''; X=lambda x:35+(x+1)*165;Y=lambda y:255-(y+1)*110
    for i in range(44):
        for j in range(30):
            q=np.array([[-1+(i+.5)/22,-1+(j+.5)/15]])
            c=int(predict(q,k)[0]);s+=f'<rect x="{35+i*7.5}" y="{35+(29-j)*7.333}" width="7.7" height="7.6" fill="{PALE[c]}"/>'
    s+=line(35,35,35,255)+line(35,255,365,255)
    s+=path([(X(t),Y(.45*np.sin(2.4*t))) for t in np.linspace(-1,1,151)],'#657585',2,'5 5')
    for p,c in zip(train,labels):
        s+=f'<circle cx="{X(p[0]):.3f}" cy="{Y(p[1]):.3f}" r="4.9" fill="{[BLUE,RED][c]}" stroke="white" stroke-width="1.2"/>'
    s+=text(195,291,'feature 1',24)+f'<text x="14" y="145" transform="rotate(-90 14 145)" font-family="Arial,sans-serif" font-size="22" text-anchor="middle" fill="{INK}">feature 2</text>'
    save(f'generalization-k{k}.svg',s,395,300)
    metrics[str(k)]={'training_error':float(np.mean(predict(train,k)!=labels)),'validation_error':float(np.mean(predict(grid,k)!=truth))}
(R/'assets/generalization-data.json').write_text(json.dumps({'seed':172,'training_points':train.tolist(),'training_labels':labels.tolist(),'flipped_indices':flips.tolist(),'validation_grid':{'size':61,'range':[-.98,.98]},'metrics':metrics},indent=2))

# Conceptual curves: no measured accuracy is implied by their vertical scale.
X=lambda t:85+590*t;Y=lambda e:370-290*e
ts=np.linspace(0,1,151)
s=line(85,55,85,370)+line(85,370,675,370)
s+=text(80,29,'Error',27,anchor='start')+text(380,445,'Model complexity / flexibility',26)
s+=text(85,404,'Low',23)+text(675,404,'High',23)
s+=path([(X(t),Y(.62*np.exp(-4*t)+.035)) for t in ts],BLUE)
s+=path([(X(t),Y(.23+.65*(t-.45)**2+.65*np.maximum(t-.55,0)**1.25)) for t in ts],RED)
s+=text(675,Y(.047)-20,'Training',23,BLUE,'end')
s+=text(678,Y(.69)-12,'Validation',23,RED,'end')
s+=line(X(.45),77,X(.45),370,'#929ead',2,'6 6')+text(X(.45),62,'Selected model',24,GREEN)
s+=text(150,125,'Underfit',24)+text(580,125,'Overfit',24)
save('complexity-errors.svg',s,740,465)

s=line(85,55,85,370)+line(85,370,675,370)
s+=text(80,28,'Validation error',27,anchor='start')+text(380,445,'Model complexity / flexibility',26)
s+=text(85,404,'Low',23)+text(675,404,'High',23)
few=lambda t:.25+.75*(t-.34)**2+.55*np.maximum(t-.45,0)**1.3
many=lambda t:.13+.35*(t-.64)**2+.25*np.maximum(t-.7,0)**1.3
s+=path([(X(t),Y(few(t))) for t in ts],RED)+path([(X(t),Y(many(t))) for t in ts],GREEN)
s+=text(580,114,'Fewer examples',24,RED)+text(570,299,'More examples',24,GREEN)
for t,f,col in [(.34,few,RED),(.64,many,GREEN)]:
    s+=line(X(t),Y(f(t)),X(t),370,col,2,'5 5')
    s+=f'<circle cx="{X(t)}" cy="{Y(f(t))}" r="6" fill="{col}"/>'
save('data-size-complexity.svg',s,740,465)

# Exact affine regions for three scores: s1=x1, s2=x2, s3=0.
X=lambda x:80+(x+2)*130;Y=lambda y:455-(y+2)*95
s=f'<rect x="80" y="75" width="520" height="380" fill="{PALE[2]}"/>'
s+=f'<path d="M340 265L600 75V455H340Z" fill="{PALE[1]}"/>'
s+=f'<path d="M80 75H600L340 265H80Z" fill="{PALE[0]}"/>'
s+=line(80,265,600,265,'#a5afbd')+line(340,75,340,455,'#a5afbd')
s+=line(340,265,600,75,INK,3)+line(340,265,340,455,INK,3)+line(340,265,80,265,INK,3)
s+=line(340,265,80,455,'#9ca7b5',2,'7 6')+line(340,265,340,75,'#9ca7b5',2,'7 6')+line(340,265,600,265,'#9ca7b5',2,'7 6')
s+=text(490,365,'class 1',28,RED)+text(195,177,'class 2',28,BLUE)+text(195,373,'class 3',28,GREEN)
s+=text(610,263,'x₁',27)+text(343,58,'x₂',27)
s+=text(340,505,'Solid: active class boundary',25)+text(340,540,'Dashed: equal scores, but another class wins',23,'#53657e')
save('multiclass-regions.svg',s,680,560)

print('Built original generalization, complexity, and multiclass figures.')
