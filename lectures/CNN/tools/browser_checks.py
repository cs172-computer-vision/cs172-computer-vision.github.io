"""Numerical browser checks against independently computed expected values."""
import math
def run(page,visit):
 visit('09-slide')
 expected=[[6,2,-6],[7,1,-7],[6,1,-6]]
 for i in range(9):
  page.locator('#position').fill(str(i));r,c=divmod(i,3)
  assert page.locator('#conv-result').inner_text()==f'Z[{r}, {c}] = {expected[r][c]}'
  assert page.locator('#conv-visual svg').count()==1
 page.locator('#conv-reset').click();assert page.locator('#position').input_value()=='0'
 page.locator('#position').focus();page.keyboard.press('ArrowRight');assert page.locator('#position').input_value()=='1'
 assert page.locator('.slide.active').get_attribute('id')=='09-slide'
 visit('19-shape-lab')
 for h in [7,8,32]:
  for k in [3,5]:
   for s in [1,2]:
    for p in [0,1,2]:
     for name,v in [('h',h),('k',k),('s',s),('p',p)]:page.locator('#shape-'+name).select_option(str(v))
     # Count valid starts rather than copy the floor formula.
     o=len(range(0,h+2*p-k+1,s));weights=8*(3*k*k+1);macs=8*o*o*3*k*k
     assert page.locator('#shape-result').inner_text()==f'Output: 8 × {o} × {o}'
     assert page.locator('#shape-cost').inner_text()==f'{weights:,} parameters · {8*o*o:,} output values per image'
 page.locator('#shape-reset').click();assert [page.locator('#shape-'+n).input_value() for n in ['h','k','s','p']]==['32','3','1','1']
 page.locator('#shape-s').focus();page.keyboard.press('ArrowDown');assert page.locator('.slide.active').get_attribute('id')=='19-shape-lab'
 visit('24-field')
 for depth in range(1,6):
  page.locator('#rf-depth').fill(str(depth));assert page.locator('#rf-result').inner_text()==f'Receptive field: {1+2*depth} × {1+2*depth} input pixels'
 page.locator('#rf-reset').click();assert page.locator('#rf-depth').input_value()=='3'
 visit('13-gradient');page.keyboard.press('ArrowRight');assert page.locator('.slide.active').get_attribute('data-build')=='1'
 page.keyboard.press('ArrowRight');assert page.locator('.slide.active').get_attribute('data-build')=='2'
 page.keyboard.press('ArrowLeft');assert page.locator('.slide.active').get_attribute('data-build')=='1'
 page.keyboard.press('ArrowLeft');assert page.locator('.slide.active').get_attribute('data-build')=='0'
 page.keyboard.press('ArrowLeft');assert page.locator('.slide.active').get_attribute('id')=='12-equation'
 # Bullet-led slides show every item on entry and advance without extra builds.
 for id,next_id in [('02-roadmap','03-outcomes'),('03-outcomes','04-recap'),('33-limits','34-summary'),('34-summary','35-exit')]:
  visit(id)
  assert page.locator('.slide.active .step').count()==0
  assert page.locator('.slide.active li').evaluate_all('(els)=>els.every(e=>getComputedStyle(e).visibility==="visible" && getComputedStyle(e).opacity==="1")')
  page.keyboard.press('ArrowRight')
  assert page.locator('.slide.active').get_attribute('id')==next_id
 # Worked builds still reverse correctly, including rendered math and code.
 for id in ['08-dot','20-pair-audit','21-parameters','25-field-stride','29-model-audit','30-code','31-training','32-diagnosis']:
  visit(id)
  steps=page.locator('.slide.active .step')
  maximum=max(int(v) for v in steps.evaluate_all('(els)=>els.map(e=>e.dataset.stage)'))
  assert steps.evaluate_all('(els)=>els.every(e=>getComputedStyle(e).visibility==="hidden")')
  page.keyboard.press('End')
  assert steps.evaluate_all('(els)=>els.every(e=>getComputedStyle(e).visibility==="visible")')
  for stage in range(maximum-1,-1,-1):
   page.keyboard.press('ArrowLeft')
   assert page.locator('.slide.active').get_attribute('data-build')==str(stage)
 visit('35-exit')
 answers=page.locator('.slide.active .answer')
 assert answers.count()==3
 assert answers.evaluate_all('(els)=>els.every(e=>getComputedStyle(e).visibility==="hidden")')
 for n in range(1,4):
  page.keyboard.press('ArrowRight')
  assert answers.evaluate_all('(els)=>els.filter(e=>getComputedStyle(e).visibility==="visible").length')==n
 for n in range(2,-1,-1):
  page.keyboard.press('ArrowLeft')
  assert answers.evaluate_all('(els)=>els.filter(e=>getComputedStyle(e).visibility==="visible").length')==n
 assert 'submit' not in page.locator('.slide.active .content').inner_text().lower()
 page.emulate_media(media='print')
 assert answers.evaluate_all('(els)=>els.every(e=>getComputedStyle(e).visibility==="visible" && getComputedStyle(e).opacity==="1")')
 page.emulate_media(media='screen')
 # Check math rendering and bundled font loading, rather than DOM presence alone.
 assert page.locator('.katex-error').count()==0
 assert page.evaluate('document.fonts.check("30px KaTeX_Main")')
 page.emulate_media(reduced_motion='no-preference');visit('09-slide');page.locator('#position').fill('8')
 assert page.locator('#conv-result').inner_text()=='Z[2, 2] = -6'
 visit('35-exit');page.keyboard.press('ArrowRight')
 page.wait_for_function('getComputedStyle(document.querySelector(".slide.active .answer")).opacity==="1"')
 assert page.locator('.slide.active .answer').nth(1).evaluate('(e)=>getComputedStyle(e).visibility')=='hidden'
 page.emulate_media(reduced_motion='reduce')
