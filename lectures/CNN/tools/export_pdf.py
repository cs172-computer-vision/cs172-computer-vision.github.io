#!/usr/bin/env python3
"""Offline PDF export and optional live-browser checks. Install tools/requirements.txt."""
from pathlib import Path
from html.parser import HTMLParser
import argparse,json,os,importlib.util
from playwright.sync_api import sync_playwright
import fitz
R=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');parser.add_argument('--screenshots',type=Path);args=parser.parse_args()
class Meta(HTMLParser):
 def __init__(self):super().__init__();self.inside=False;self.parts=[]
 def handle_starttag(self,tag,attrs):
  if tag=='script' and dict(attrs).get('id')=='slide-meta':self.inside=True
 def handle_endtag(self,tag):
  if tag=='script':self.inside=False
 def handle_data(self,data):
  if self.inside:self.parts.append(data)
manifest=R/'source/manifest.json'
if manifest.exists():M=json.loads(manifest.read_text())
else:
 p=Meta();p.feed((R/'index.html').read_text());M=json.loads(''.join(p.parts))
title=R.name.replace('_',' ');output=R/(R.name+'.pdf');errors=[];requests=[];layout=[]
with sync_playwright() as pw:
 chrome=os.environ.get('CHROME');standard=Path('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
 if not chrome and standard.exists():chrome=str(standard)
 browser=pw.chromium.launch(headless=True,**({'executable_path':chrome} if chrome else {}))
 context=browser.new_context(viewport={'width':1440,'height':810},offline=True,reduced_motion='reduce')
 page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda r:requests.append(r.url))
 def visit(id=None):
  page.goto((R/'index.html').as_uri()+('#'+id+'/0' if id else ''));page.reload()
  page.wait_for_selector('.slide.active');page.evaluate('document.fonts.ready')
 visit()
 if args.check:
  for n,s in enumerate(M,1):
   visit(s['id']);page.keyboard.press('End')
   result=page.evaluate('''() => {
    const s=document.querySelector('.slide.active'),footer=s.querySelector('footer').getBoundingClientRect(),content=s.querySelector('.content').getBoundingClientRect(),bad=[];
    const title=s.querySelector('h1'),range=document.createRange();range.selectNodeContents(title);const tr=range.getBoundingClientRect();
    if(tr.right>1346||tr.bottom>content.top-8)bad.push({tag:'H1',text:title.textContent,box:[tr.x,tr.y,tr.width,tr.height]});
    for(const e of s.querySelectorAll('.content p,.content li,.content pre,.content table,.content figure,.content .katex-display,.content .callout,.content .katex-html')){
     const r=e.getBoundingClientRect();if(r.width&&r.height&&(r.bottom>footer.top-8||r.right>1346||r.left<90))bad.push({tag:e.tagName,text:e.textContent.slice(0,80),box:[r.x,r.y,r.width,r.height]});
    }
    return{id:s.id,bad,images:[...s.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth>0),stage:s.dataset.build,counter:s.querySelector('footer span:last-child').textContent};
   }''')
   assert result['counter']==f'{n:02d} / {len(M)}'
   layout.append(result)
   if args.screenshots:
    args.screenshots.mkdir(parents=True,exist_ok=True);page.screenshot(path=str(args.screenshots/(s['id']+'.png')))
  visit(M[1]['id']);page.keyboard.press('ArrowLeft');assert page.locator('.slide.active').get_attribute('id')==M[0]['id']
  page.keyboard.press('o');assert page.locator('#overview').evaluate('(e)=>e.classList.contains("open")');page.keyboard.press('Escape')
  page.keyboard.press('n');assert page.locator('#notes-text').text_content()==M[0]['notes'];page.keyboard.press('Escape')
  page.keyboard.press('t');assert page.locator('#toolbar').get_attribute('aria-hidden')=='false';page.keyboard.press('Escape')
  page.keyboard.press('b');assert page.locator('body').evaluate('(e)=>e.classList.contains("blanked")');page.keyboard.press('Escape')
  page.mouse.move(8,805);page.wait_for_function('document.querySelector("#toolbar").getAttribute("aria-hidden")==="false"')
  page.mouse.move(8,100);page.wait_for_function('document.querySelector("#toolbar").getAttribute("aria-hidden")==="true"')
  page.keyboard.press('f');page.wait_for_function('!!document.fullscreenElement');page.keyboard.press('f');page.wait_for_function('!document.fullscreenElement')
  spec=importlib.util.spec_from_file_location('deck_checks',R/'tools/browser_checks.py');checks=importlib.util.module_from_spec(spec);spec.loader.exec_module(checks);checks.run(page,visit)
  for w,h in [(1280,720),(1024,768),(768,1024)]:
   page.set_viewport_size({'width':w,'height':h});page.wait_for_function('document.querySelector("#viewport").getBoundingClientRect().width<=innerWidth+1 && document.querySelector("#viewport").getBoundingClientRect().height<=innerHeight+1')
  page.set_viewport_size({'width':1440,'height':810})
  assert not errors,errors
  remote=[r for r in requests if r.startswith(('http://','https://'))];assert not remote
  assert all(x['images'] for x in layout)
  report={'slides':len(M),'page_errors':errors,'external_requests':remote,'layout':layout,'checks':'Offline file://; all-slide layout/counters/images; forward/reverse builds; notes/overview; fullscreen/black screen; toolbar/autohide; responsive scaling; deck-specific interactions and resets.'}
  (R/'tools/qa-results.json').write_text(json.dumps(report,indent=2))
  print('Layout issues:',[(x['id'],len(x['bad'])) for x in layout if x['bad']])
  assert not any(x['bad'] for x in layout),'Fix the layout issues recorded in tools/qa-results.json.'
 visit();page.emulate_media(media='print');page.evaluate('document.fonts.ready')
 page.pdf(path=str(output),width='1440px',height='810px',print_background=True,prefer_css_page_size=True)
 browser.close()
doc=fitz.open(output)
for p in doc:p.set_mediabox(fitz.Rect(0,0,1080,607.5))
doc.set_metadata({'title':title+' · CS172 Computer Vision I','author':'Jiayuan Gu · ShanghaiTech University'})
tmp=output.with_suffix('.tmp.pdf');doc.save(tmp,garbage=4,deflate=True);doc.close();tmp.replace(output)
print('Exported',output)
