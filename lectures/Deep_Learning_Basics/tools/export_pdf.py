#!/usr/bin/env python3
"""Export completed 16:9 slides and optionally check live offline presentation.
Install: python -m pip install -r tools/requirements.txt
Uses an installed Chrome, or Playwright Chromium (playwright install chromium).
"""
from pathlib import Path
import argparse,json,os
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser();p.add_argument('--check',action='store_true');p.add_argument('--screenshots',type=Path);a=p.parse_args()
M=json.loads((R/'source/manifest.json').read_text());errors=[];requests=[]
with sync_playwright() as pw:
 chrome=os.environ.get('CHROME')
 default=Path('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
 if not chrome and default.exists():chrome=str(default)
 browser=pw.chromium.launch(**({'executable_path':chrome} if chrome else {}),headless=True)
 context=browser.new_context(viewport={'width':1440,'height':810},offline=True,reduced_motion='reduce')
 page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)));page.on('request',lambda r:requests.append(r.url))
 page.goto((R/'index.html').as_uri());page.evaluate('document.fonts.ready');page.wait_for_function('document.querySelector(".slide.active")')
 if a.check:
  layout=[]
  for s in M:
   page.goto((R/'index.html').as_uri()+'#'+s['id']+'/0');page.reload();page.keyboard.press('End')
   result=page.evaluate('''() => {
    const s=document.querySelector('.slide.active'),f=s.querySelector('footer').getBoundingClientRect(),c=s.querySelector('.content').getBoundingClientRect();
    const bad=[];const title=s.querySelector('h1');const range=document.createRange();range.selectNodeContents(title);if(range.getBoundingClientRect().right>1346)bad.push({tag:'H1',text:title.textContent});for(const e of s.querySelectorAll('.content p,.content li,.content pre,.content table,.content figure,.content .katex-display,.content .callout')){
     const r=e.getBoundingClientRect();if(r.width&&r.height&&(r.bottom>f.top-8||r.right>1346||r.left<90))bad.push({tag:e.tagName,text:e.textContent.slice(0,90),box:[r.x,r.y,r.width,r.height]});
    }return {id:s.id,bad,images:[...s.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth>0),stage:s.dataset.build};}''')
   layout.append(result)
   if a.screenshots:
    a.screenshots.mkdir(parents=True,exist_ok=True);page.screenshot(path=str(a.screenshots/(s['id']+'.png')))
  # Reverse navigation across reveal boundaries.
  page.goto((R/'index.html').as_uri()+'#08-svm-example/0');page.reload()
  page.keyboard.press('ArrowRight');assert page.locator('.slide.active').get_attribute('data-build')=='1'
  page.keyboard.press('ArrowLeft');assert page.locator('.slide.active').get_attribute('data-build')=='0'
  page.keyboard.press('ArrowLeft');assert page.locator('.slide.active').get_attribute('id')=='07-svm-loss'
  page.keyboard.press('o');assert page.locator('#overview').evaluate('(e)=>e.classList.contains("open")')
  page.keyboard.press('Escape');page.keyboard.press('n');assert page.locator('#notes').evaluate('(e)=>e.classList.contains("open")');page.keyboard.press('Escape')
  page.keyboard.press('t');assert page.locator('#toolbar').get_attribute('aria-hidden')=='false';page.keyboard.press('Escape')
  # Test the actual interactive calculations and resets.
  page.goto((R/'index.html').as_uri()+'#09-margin-demo/0');page.reload()
  assert page.locator('[data-result="hinge"]').text_content()=='SVM loss = 2.90'
  page.locator('[data-control="rival"]').evaluate('(e)=>{e.value=2.2;e.dispatchEvent(new Event("input"))}')
  assert page.locator('[data-result="hinge"]').text_content()=='SVM loss = 0.00'
  page.locator('[data-reset="hinge"]').click();assert page.locator('[data-result="hinge"]').text_content()=='SVM loss = 2.90'
  page.locator('[data-control="true"]').focus();page.keyboard.press('ArrowRight');assert page.locator('.slide.active').get_attribute('id')=='09-margin-demo'
  page.goto((R/'index.html').as_uri()+'#20-learning-rate/0');page.reload()
  page.locator('[data-control="rate"]').evaluate('(e)=>{e.value=.8;e.dispatchEvent(new Event("input"))}')
  assert float(page.locator('[data-result="rate"]').text_content().split('= ')[1])>3.5
  page.locator('[data-reset="rate"]').click();assert page.locator('[data-control="rate"]').input_value()=='0.1'
  page.goto((R/'index.html').as_uri()+'#25-batch-noise/0');page.reload();before=page.locator('[data-demo="noise"]').inner_html();page.locator('[data-control="batch"]').select_option('full');assert before!=page.locator('[data-demo="noise"]').inner_html()
  page.goto((R/'index.html').as_uri()+'#38-xor/0');page.reload();page.locator('[data-control="xor"]').select_option('hidden');assert 'h₁ + h₂' in page.locator('[data-demo="xor"]').text_content();page.locator('[data-reset="xor"]').click();assert page.locator('[data-control="xor"]').input_value()=='input'
  # Grouped graph builds, toolbar auto-hide, black screen, and fullscreen.
  page.goto((R/'index.html').as_uri()+'#41-chain-rule/0');page.reload()
  page.keyboard.press('ArrowRight');assert page.locator('.slide.active').get_attribute('data-build')=='1'
  page.keyboard.press('ArrowRight');assert page.locator('.slide.active').get_attribute('data-build')=='2'
  assert page.locator('.slide.active svg .step.visible').count()==2
  page.keyboard.press('ArrowLeft');assert page.locator('.slide.active svg .step.visible').count()==1
  page.keyboard.press('End');assert page.locator('.slide.active').get_attribute('data-build')=='3'
  page.keyboard.press('b');assert page.locator('body').evaluate('(e)=>e.classList.contains("blanked")');page.keyboard.press('Escape')
  page.mouse.move(8,805);page.wait_for_function('document.querySelector("#toolbar").getAttribute("aria-hidden")==="false"')
  page.mouse.move(8,100);page.wait_for_function('document.querySelector("#toolbar").getAttribute("aria-hidden")==="true"')
  page.keyboard.press('f');page.wait_for_function('!!document.fullscreenElement');page.keyboard.press('f');page.wait_for_function('!document.fullscreenElement')
  # Responsive slide and toolbar scaling, all content scales uniformly.
  for w,h in [(1280,720),(1024,768),(768,1024)]:
   page.set_viewport_size({'width':w,'height':h});page.wait_for_function('document.querySelector("#viewport").getBoundingClientRect().width <= innerWidth + 1 && document.querySelector("#viewport").getBoundingClientRect().height <= innerHeight + 1');v=page.locator('#viewport').bounding_box();assert v['width']<=w+1 and v['height']<=h+1
  page.set_viewport_size({'width':1440,'height':810})
  # A deck with no external network requests and no image failures.
  assert not [r for r in requests if r.startswith(('https://','http://'))]
  assert not errors,errors
  assert all(x['images'] for x in layout)
  report={'slides':len(M),'page_errors':errors,'external_requests':[],'layout':layout,'checks':'Offline file://, reveal/reverse, overview, notes, toolbar, range keyboard handling, four interactions/resets, grouped graph builds/reversal, black screen, toolbar auto-hide, fullscreen, responsive scaling.'}
  (R/'tools/qa-results.json').write_text(json.dumps(report,indent=2))
  print('Browser checks complete. Potential layout issues:',[(x['id'],len(x['bad'])) for x in layout if x['bad']])
 page.goto((R/'index.html').as_uri());page.reload();page.emulate_media(media='print');page.evaluate('document.fonts.ready')
 page.pdf(path=str(R/'Deep_Learning_Basics.pdf'),width='1440px',height='810px',print_background=True,prefer_css_page_size=True)
 print('Exported',R/'Deep_Learning_Basics.pdf');browser.close()
# Chromium rounds paper height; trim only the blank bottom fraction of a point.
import fitz
output=R/'Deep_Learning_Basics.pdf'
doc=fitz.open(output)
for page in doc:page.set_mediabox(fitz.Rect(0,0,1080,607.5))
doc.set_metadata({'title':'Deep Learning Basics · CS172 Computer Vision I','author':'Jiayuan Gu · ShanghaiTech University','subject':'SVM, SGD, neural networks, computational graphs and backpropagation'})
tmp=R/'Deep_Learning_Basics.tmp.pdf';doc.save(tmp,garbage=4,deflate=True);doc.close();tmp.replace(output)
print('Normalized PDF media boxes to exact 16:9 (1080 × 607.5 pt).')
