"""Meaningful numerical and UI checks on the actual offline presentation."""
def run(page,visit):
 visit('27-code')
 assert page.locator('.block-code').evaluate('(e)=>e.scrollWidth<=e.clientWidth')
 visit('32-budget')
 def read():return page.locator('#budget-result').inner_text()
 assert '57.803 M' in read() and '6.874 M' in read()
 page.select_option('#resolution','14');assert '14.451 M' in read()
 page.select_option('#width','0.5');assert '3.613 M' in read()
 page.locator('#width').focus();page.keyboard.press('ArrowDown')
 assert page.locator('.slide.active').get_attribute('id')=='32-budget'
 page.locator('#budget-reset').click();assert '57.803 M' in read()
 values=page.evaluate('''()=>{const f=ArchitectureCost.cost;return [f(1,28),f(.5,28),f(1,14)]}''')
 assert values[0]['denseMAC']==4*values[1]['denseMAC']==4*values[2]['denseMAC']
 assert values[0]['sepMAC']==6874112
 # Each reveal is a conceptual group, and reverse navigation restores it.
 groups={'05-cost':2,'12-small-filters':2,'14-global-pooling':1,
         '18-reduction':2,'21-degradation':1,'22-residual':1,
         '23-gradient':2,'26-bottleneck':1,'27-code':2,
         '29-merge-check':1,'31-depthwise':1}
 for id,last in groups.items():
  visit(id)
  assert page.locator('.slide.active .step.visible').count()==0
  for stage in range(1,last+1):
   page.keyboard.press('ArrowRight')
   assert page.locator('.slide.active').get_attribute('id')==id
   assert page.locator('.slide.active .step').evaluate_all('(es,s)=>es.every(e=>e.classList.contains("visible")===(+e.dataset.stage<=s))',stage)
  for stage in reversed(range(last)):
   page.keyboard.press('ArrowLeft')
   assert page.locator('.slide.active .step').evaluate_all('(es,s)=>es.every(e=>e.classList.contains("visible")===(+e.dataset.stage<=s))',stage)
 for id in ['02-roadmap','04-retrieval','08-training','28-debug','33-latency','36-transfer','38-summary','40-reading']:
  visit(id);assert page.locator('.slide.active .step').count()==0
 visit('39-exit')
 assert page.locator('.slide.active .step.visible').count()==0
 for i in range(1,4):
  page.keyboard.press('ArrowRight');assert page.locator('.slide.active .step.visible').count()==i
 page.keyboard.press('ArrowLeft');assert page.locator('.slide.active .step.visible').count()==2
 assert page.locator('.katex-error').count()==0
 assert page.evaluate('document.documentElement.dataset.mathReady')=='true'
 assert page.evaluate('async()=>{await document.fonts.load("30px KaTeX_Main");return document.fonts.check("30px KaTeX_Main")}')
 # Verify normal-motion navigation as well as export's reduced-motion context.
 page.emulate_media(reduced_motion='no-preference');visit('23-gradient')
 page.keyboard.press('ArrowRight');page.wait_for_timeout(250)
 assert page.locator('.slide.active .step').first.evaluate('(e)=>getComputedStyle(e).opacity')=='1'
 page.keyboard.press('ArrowLeft');assert page.locator('.slide.active .step').first.evaluate('(e)=>getComputedStyle(e).visibility')=='hidden'
 page.emulate_media(reduced_motion='reduce')
