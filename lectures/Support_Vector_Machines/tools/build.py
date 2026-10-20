#!/usr/bin/env python3
"""Refresh figures, counters, notes and source map. index.html is the editable content."""
from pathlib import Path
from html.parser import HTMLParser
import json,re,csv,io,os,shutil,subprocess
R=Path(__file__).resolve().parents[1]
class Metadata(HTMLParser):
 def __init__(self):super().__init__();self.inside=False;self.parts=[]
 def handle_starttag(self,tag,attrs):
  if tag=='script' and dict(attrs).get('id')=='slide-meta':self.inside=True
 def handle_endtag(self,tag):
  if tag=='script':self.inside=False
 def handle_data(self,data):
  if self.inside:self.parts.append(data)
text=(R/'index.html').read_text();parser=Metadata();parser.feed(text);M=json.loads(''.join(parser.parts))
ids=re.findall(r'<section class="slide(?: section-divider)?" id="([^"]+)"',text)
assert ids==[s['id'] for s in M],'Keep metadata order aligned with slide order.'
node=os.environ.get('NODE') or shutil.which('node')
if not node:raise SystemExit('Set NODE or install Node.js to regenerate SVG snapshots.')
subprocess.run([node,str(R/'tools/snapshots.cjs')],check=True)
i=iter(range(1,len(M)+1))
text=re.sub(r'<span>\d+ / (?:\d+|TOTAL)</span></footer>',lambda m:f'<span>{next(i):02d} / {len(M)}</span></footer>',text)
# Accessible slide labels are derived from the authored order and titles.
for n,s in enumerate(M,1):
 text=re.sub(r'(id="'+re.escape(s['id'])+r'" aria-label=")[^"]*"',lambda m:m[1]+str(n)+'. '+s['title'].replace('&','&amp;').replace('"','&quot;')+'"',text)
(R/'index.html').write_text(text)
(R/'SPEAKER_NOTES.md').write_text('# Support Vector Machines: speaker notes\n\n'+'\n\n'.join(f'## {n:02d}. {s["title"]}\n\n{s["notes"]}' for n,s in enumerate(M,1))+'\n')
out=io.StringIO();w=csv.writer(out);w.writerow(['slide','id','title','section','source_URL','one_based_Harvard_PDF_pages','source_sections'])
for n,s in enumerate(M,1):w.writerow([n,s['id'],s['title'],s['section'],s['reference_url'],','.join(map(str,s['reference_pages'])),s['reference_sections']])
(R/'SOURCE_MAP.csv').write_text(out.getvalue())
print(f'Refreshed {len(M)} slides; index.html remains the single editable content source.')
