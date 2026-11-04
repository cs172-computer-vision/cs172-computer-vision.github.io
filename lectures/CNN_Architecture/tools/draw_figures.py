#!/usr/bin/env python3
"""Reproduce the five teaching diagrams retained alongside original source figures."""
from pathlib import Path
from html import escape
R=Path(__file__).resolve().parents[1]/'assets'
INK='#14243c'; BLUE='#236bc2'; GREEN='#168a76'
def text(x,y,s,size=28,color=INK,anchor='middle'):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}">{escape(s)}</text>'
def box(x,y,w,h,lines,color=BLUE,size=28):
 out=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="#f3f7fc" stroke="{color}" stroke-width="2"/>'
 for i,l in enumerate(lines):out+=text(x+w/2,y+h/2+(i-(len(lines)-1)/2)*36+9,l,size)
 return out
def path(d,color=BLUE,head=True):
 marker=f' marker-end="url(#{"green" if color==GREEN else "blue"})"' if head else ''
 return f'<path d="{d}" fill="none" stroke="{color}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"{marker}/>'
def arrow(x,y,u,v,color=BLUE):return path(f'M{x},{y} L{u},{v}',color)
def save(name,body,w=1248,h=430):
 markers=''.join(f'<marker id="{id}" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" viewBox="0 -4.5 9 9" refX="9" refY="0" orient="auto"><path d="M0,-4 L9,0 L0,4 Z" fill="{color}"/></marker>' for id,color in [('blue',BLUE),('green',GREEN)])
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img"><defs>{markers}</defs><g font-family="Arial,Helvetica,sans-serif">{body}</g></svg>'
 (R/f'{name}.svg').write_text(svg)
def main():
 R.mkdir(exist_ok=True)
 b=''
 for i,name in enumerate(['VGG','Inception','ResNet']):b+=text(15,76+i*140,name,30,BLUE,'start')
 for j in range(3):
  x=215+j*170;b+=box(x,35,115,66,['3 × 3'])
  if j<2:b+=arrow(x+125,68,x+160,68)
 b+=path('M210,208 H245',head=False)+path('M245,208 V158 H285')+path('M245,208 V244 H285')
 b+=box(295,129,150,58,['1 × 1'])+box(295,215,150,58,['3 × 3'])
 b+=path('M455,158 H530 V196 H570')+path('M455,244 H530 V220 H570')+box(580,177,105,64,['Concat'],size=24)
 b+=arrow(210,348,285,348)+box(295,313,220,70,['F(x)'])+arrow(525,348,614,348)
 b+=path('M250,348 V293 H640 V319',GREEN)
 b+=f'<circle cx="640" cy="348" r="20" fill="white" stroke="{GREEN}" stroke-width="2"/>'+text(640,358,'+',32,GREEN)
 save('title',b,700,450)
 b=''
 for i,(n,c,r) in enumerate([(2,64,112),(2,128,56),(3,256,28),(3,512,14),(3,512,7)]):
  x=12+i*216;b+=box(x,80,144,156,[f'{n} × conv',f'3 × 3, {c}','pool ÷2'],size=26)+text(x+72,283,f'{r} × {r}',27)
  b+=arrow(x+154,158,x+206,158)
 b+=box(1092,80,144,156,['FC 4096','FC 4096','FC 1000'],size=26)
 b+=text(624,368,'Input: 224 × 224 × 3  →  13 convolutions + 3 fully connected layers',28)
 save('vgg',b)
 b=''
 for j,n in enumerate([3,5,7]):
  x=70+j*405;cell=37
  for a in range(n):
   for c in range(n):b+=f'<rect x="{x+c*cell}" y="{50+a*cell}" width="35" height="35" fill="{["#dceafa","#bad6f5","#87b6e8"][j]}" stroke="#fff"/>'
  b+=text(x+n*cell/2,365,f'{j+1} layer'+('s' if j else '')+f' → {n} × {n}',28)
 save('receptive',b)
 b=box(10,142,240,110,['56 × 56 × 64','input'])+path('M260,197 H300',head=False)
 b+=f'<circle cx="300" cy="197" r="4" fill="{BLUE}"/>'
 b+=path('M300,197 V95 H398')+box(410,25,370,140,['3 × 3, stride 2','3 × 3, stride 1','64 → 128 channels'],size=27)
 b+=path('M300,197 V322 H398')+box(410,272,370,100,['1 × 1, stride 2','64 → 128'],color=GREEN)
 b+=path('M792,95 H975 V164')+path('M792,322 H975 V230',GREEN)
 b+=f'<circle cx="975" cy="197" r="23" fill="white" stroke="{GREEN}" stroke-width="2.4"/>'+text(975,207,'+',34,GREEN)
 b+=arrow(1010,197,1058,197)+box(1070,142,166,110,['28 × 28','C = 128'])
 save('projection',b)
 b=''
 for i,(c,r) in enumerate([(64,56),(128,28),(256,14),(512,7)]):
  x=10+i*320;b+=box(x,90,250,155,[f'{r} × {r} × {c}','2 basic blocks','4 convolutions'])
  if i<3:b+=arrow(x+262,166,x+308,166)
 b+=text(624,45,'Stem: 7 × 7 conv, stride 2 → max pool, stride 2',30)
 b+=text(624,320,'Global average pool → 512 features → 1000 logits',30)
 b+=text(624,385,'Depth convention: 1 stem + 16 block convolutions + 1 classifier = 18',27)
 save('resnet18',b)
 print('Generated five teaching SVGs with compact arrowheads and clear connector gaps.')
if __name__=='__main__':main()
