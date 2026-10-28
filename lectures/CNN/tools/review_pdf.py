#!/usr/bin/env python3
"""Render every exported page and compose numbered contact sheets for visual review."""
from pathlib import Path
import argparse,json
import fitz
from PIL import Image,ImageDraw
R=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--output',type=Path,required=True);args=p.parse_args();args.output.mkdir(parents=True,exist_ok=True)
d=fitz.open(R/'CNN.pdf');thumbs=[]
for i,page in enumerate(d):
 assert abs(page.rect.width-1080)<.01 and abs(page.rect.height-607.5)<.01
 pix=page.get_pixmap(matrix=fitz.Matrix(1.33334,1.33334));pix.save(args.output/f'{i+1:02d}.png')
 im=Image.open(args.output/f'{i+1:02d}.png').convert('RGB');im.thumbnail((480,270));thumbs.append(im)
 assert page.get_text().strip(),f'Page {i+1} has no retained text'
for start in range(0,len(thumbs),12):
 sheet=Image.new('RGB',(1480,1200),'#dbe2ed');draw=ImageDraw.Draw(sheet)
 for j,im in enumerate(thumbs[start:start+12]):
  x=10+(j%3)*490;y=10+(j//3)*295;sheet.paste(im,(x,y));draw.text((x+5,y+274),str(start+j+1),fill='#14243c')
 sheet.save(args.output/f'contact-{start//12+1}.png')
report={'pages':len(d),'dimensions_pt':[1080,607.5],'text_on_every_page':True,'link_annotations':sum(len(p.get_links()) for p in d)}
(args.output/'pdf-check.json').write_text(json.dumps(report,indent=2));print(json.dumps(report))
