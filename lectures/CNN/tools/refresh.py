#!/usr/bin/env python3
"""Refresh derived notes, maps, counters and SVGs from canonical index.html."""
from pathlib import Path
from html.parser import HTMLParser
import json,csv,re,os,html
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1]
class Source(HTMLParser):
 def __init__(self):super().__init__();self.meta=False;self.data=[];self.slides=[];self.heading=False;self.headings=[];self.heading_parts=[]
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t=='section' and 'slide' in a.get('class','').split():self.slides.append(a['id'])
  if t=='script' and a.get('id')=='slide-meta':self.meta=True
  if t=='h1':self.heading=True;self.heading_parts=[]
 def handle_endtag(self,t):
  if t=='script':self.meta=False
  if t=='h1':self.heading=False;self.headings.append(''.join(self.heading_parts))
 def handle_data(self,d):
  if self.meta:self.data.append(d)
  if self.heading:self.heading_parts.append(d)
def read_source():
 p=Source();p.feed((R/'index.html').read_text());m=json.loads(''.join(p.data));byid={x['id']:x for x in m}
 assert len(p.slides)==len(set(p.slides))==len(m),'Duplicate or missing slide IDs'
 assert set(p.slides)==set(byid),'Slide metadata mismatch'
 assert len(p.headings)==len(p.slides),'Each slide needs one main heading'
 for id,title in zip(p.slides,p.headings):byid[id]['title']=title
 return [byid[id] for id in p.slides]
if __name__=='__main__':
 m=read_source();src=(R/'index.html').read_text();i=[0]
 def counter(match):
  i[0]+=1;return f'<span>{i[0]:02d} / {len(m)}</span></footer>'
 src=re.sub(r'<span>\d+ / \d+</span></footer>',counter,src)
 labels={s['id']:f'{i}. {s["title"]}' for i,s in enumerate(m,1)}
 src=re.sub(r'(<section\b[^>]*\bid="([^"]+)"[^>]*\baria-label=")[^"]*(")',lambda a:a[1]+html.escape(labels[a[2]],quote=True)+a[3],src)
 src=re.sub(r'(<script type="application/json" id="slide-meta">).*?(</script>)',lambda a:a[1]+json.dumps(m,indent=2,ensure_ascii=False)+a[2],src,flags=re.S)
 (R/'index.html').write_text(src)
 (R/'SPEAKER_NOTES.md').write_text('# CNN · Speaker notes\n\nDerived from inline slide-meta in index.html. Regenerate with tools/refresh.py.\n\n'+'\n\n'.join(f'## {i}. {s["title"]} [{s["id"]}]\n\n{s["notes"]}' for i,s in enumerate(m,1))+'\n')
 with (R/'SOURCE_MAP.csv').open('w') as f:
  w=csv.writer(f);w.writerow(['slide','id','title','section','reference_url','reference_pdf_pages_1_based','reference_label'])
  for i,s in enumerate(m,1):w.writerow([i,s['id'],s['title'],s['section'],s['reference_url'],s['reference_pages'],s['reference_label']])
 names=['title','flatten','pattern','dot','channels','tensors','relu','stride','padding','pool','network']
 with sync_playwright() as pw:
  chrome=os.environ.get('CHROME','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
  browser=pw.chromium.launch(headless=True,**({'executable_path':chrome} if Path(chrome).exists() else {}))
  p=browser.new_page();p.goto((R/'index.html').as_uri());p.wait_for_function('typeof CNNDraw!=="undefined"')
  for name in names:(R/'assets'/f'{name}.svg').write_text(p.evaluate('(n)=>CNNDraw.staticDiagram(n)',name))
  browser.close()
 print(f'Refreshed {len(m)} slide records and {len(names)} SVG figures.')
