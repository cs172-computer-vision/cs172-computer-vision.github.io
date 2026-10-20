#!/usr/bin/env python3
"""Assemble canonical slide fragments; pre-render math using local KaTeX.
Needs Python 3 and Node.js. Set NODE to a Node executable if it is not on PATH.
The generated deck opens directly via file:// with no build or server required.
"""
from pathlib import Path
import csv, io, json, os, re, shutil, subprocess
R=Path(__file__).resolve().parents[1]
M=json.loads((R/'source/manifest.json').read_text())
node=os.environ.get('NODE') or shutil.which('node')
if not node:raise SystemExit('Node.js required to rebuild; set NODE to its executable path.')
subprocess.run([node,str(R/'tools/snapshots.cjs')],check=True)
slides=[]
for i,s in enumerate(M,1):
 text=(R/s['file']).read_text()
 text=re.sub(r'<span>\d+ / (?:TOTAL|\d+)</span></footer>',f'<span>{i:02d} / {len(M)}</span></footer>',text)
 slides.append(text)
content=subprocess.run([node,str(R/'tools/render-math.cjs')],input='\n'.join(slides),text=True,capture_output=True,check=True).stdout
html='''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="CS172 Computer Vision I: Deep Learning Basics. An offline interactive lecture.">
<title>Deep Learning Basics · CS172</title><link rel="stylesheet" href="vendor/katex.min.css"><link rel="stylesheet" href="source/style.css"></head>
<body><main id="viewport">'''+content+'</main>'+(R/'source/controls.html').read_text()+'<script id="slide-meta" type="application/json">'+json.dumps(M,ensure_ascii=False).replace('</','<\\/')+'</script><script src="source/diagrams.js"></script><script src="source/interactions.js"></script><script src="source/app.js"></script></body></html>'
(R/'index.html').write_text(html)
(R/'SPEAKER_NOTES.md').write_text('# Deep Learning Basics: speaker notes\n\n'+'\n\n'.join(f'## {i:02d}. {s["title"]}\n\n{s["notes"]}' for i,s in enumerate(M,1))+'\n')
rows=io.StringIO();w=csv.writer(rows);w.writerow(['slide','id','title','section','reference_url','reference_lecture','one_based_PDF_pages','kind'])
for i,s in enumerate(M,1):w.writerow([i,s['id'],s['title'],s['section'],s['reference_url'],s['reference_lecture'],','.join(map(str,s['reference_pages'])),s['kind']])
(R/'SOURCE_MAP.csv').write_text(rows.getvalue())
print(f'Built {len(M)} slides. Math pre-rendered; all presentation resources local.')
