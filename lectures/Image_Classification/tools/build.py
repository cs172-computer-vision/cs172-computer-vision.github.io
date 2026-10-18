#!/usr/bin/env python3
"""Build the canonical source fragments into one portable offline HTML file."""
from pathlib import Path
import base64,json,mimetypes,re,subprocess,os,csv,io
R=Path(__file__).resolve().parents[1]
def data(path):
 p=R/path
 return 'data:'+('font/woff2' if p.suffix=='.woff2' else mimetypes.guess_type(p.name)[0] or 'application/octet-stream')+';base64,'+base64.b64encode(p.read_bytes()).decode()
manifest=json.loads((R/'source/manifest.json').read_text())
slides='\n'.join(re.sub(r'<span>[^<]*</span></footer>', f'<span>{i+1:02d} / {len(manifest)}</span></footer>', (R/s['file']).read_text()) for i,s in enumerate(manifest))
node=os.environ.get('CODEX_PRIMARY_RUNTIME_NODE','node')
slides=subprocess.run([node,str(R/'tools/render-math.cjs')],input=slides,text=True,capture_output=True,check=True).stdout
slides=re.sub(r'src="(assets/[^"]+)"',lambda m:'src="'+data(m[1])+'"',slides)
css=(R/'vendor/katex.min.css').read_text()
# WOFF2 only. Embed the original distribution fonts without network fallbacks.
css=re.sub(r'src:url\(fonts/([^)]*\.woff2)\) format\("woff2"\)[^;]*;',lambda m:'src:url('+data('vendor/fonts/'+m[1])+') format("woff2");',css)
if 'url(fonts/' in css:raise ValueError('Unresolved font URL')
css+='\n'+(R/'source/style.css').read_text()
ui=(R/'source/controls.html').read_text()
html='<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="CS172 Computer Vision I: Image Classification. An offline interactive lecture."><title>Image Classification · CS172</title><style>'+css+'</style></head><body><main id="viewport">'+slides+'</main>'+ui+'<script id="slide-meta" type="application/json">'+json.dumps(manifest,ensure_ascii=False).replace('</','<\\/')+'</script><script>'+(R/'source/diagrams.js').read_text()+'</script><script>'+(R/'source/app.js').read_text()+'</script></body></html>'
(R/'index.html').write_text(html)
(R/'SPEAKER_NOTES.md').write_text('# Image Classification: speaker notes\n\n'+'\n\n'.join(f'## {i:02d}. {s["title"]}\n\n{s["notes"]}' for i,s in enumerate(manifest,1))+'\n')
rows=io.StringIO();writer=csv.writer(rows)
writer.writerow(['slide','id','title','section','CS231n_2026_PDF_pages','Recognition_reference_PDF_pages','kind'])
for i,s in enumerate(manifest,1):
 writer.writerow([i,s['id'],s['title'],s['section'],','.join(map(str,s.get('reference_pages',[]))),','.join(map(str,s.get('recognition_reference_pages',[]))),s.get('kind','content')])
(R/'SOURCE_MAP.csv').write_text(rows.getvalue())
print(f'Built {len(manifest)} slides, {len(html):,} characters. No external runtime resources.')
