def run(page,visit):
 visit('20-learning-rate')
 control=page.locator('[data-control="rate"]');control.focus();page.keyboard.press('ArrowRight')
 assert page.locator('.slide.active').get_attribute('id')=='20-learning-rate'
 control.evaluate('(e)=>{e.value=.8;e.dispatchEvent(new Event("input"))}')
 assert float(page.locator('[data-result="rate"]').text_content().split('= ')[1])>3.5
 page.locator('[data-reset="rate"]').click();assert control.input_value()=='0.1'
 visit('25-batch-noise');before=page.locator('[data-demo="noise"]').inner_html()
 page.locator('[data-control="batch"]').select_option('full');assert before!=page.locator('[data-demo="noise"]').inner_html()
 page.locator('[data-reset="noise"]').click();assert page.locator('[data-control="batch"]').input_value()=='8'
 visit('38-xor');page.locator('[data-control="xor"]').select_option('hidden')
 assert 'h₁ + h₂' in page.locator('[data-demo="xor"]').text_content()
 page.locator('[data-reset="xor"]').click();assert page.locator('[data-control="xor"]').input_value()=='input'
 visit('41-chain-rule')
 page.keyboard.press('ArrowRight');assert page.locator('.slide.active').get_attribute('data-build')=='1'
 page.keyboard.press('ArrowRight');assert page.locator('.slide.active svg .step.visible').count()==2
 page.keyboard.press('ArrowLeft');assert page.locator('.slide.active svg .step.visible').count()==1
 page.keyboard.press('End');assert page.locator('.slide.active').get_attribute('data-build')=='3'
