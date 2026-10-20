def run(page,visit):
 visit('11-margin-demo')
 assert '1.000' in page.locator('[data-result="margin"]').text_content()
 control=page.locator('[data-control="angle"]');control.focus();page.keyboard.press('ArrowRight')
 assert page.locator('.slide.active').get_attribute('id')=='11-margin-demo'
 control.evaluate('(e)=>{e.value=30;e.dispatchEvent(new Event("input"))}')
 assert '0.866' in page.locator('[data-result="margin"]').text_content()
 page.locator('[data-reset="margin"]').click();assert control.input_value()=='0'
 visit('27-c-demo');before=page.locator('[data-demo="soft"]').inner_html()
 page.locator('[data-control="C"]').select_option('10');assert before!=page.locator('[data-demo="soft"]').inner_html()
 page.locator('[data-reset="soft"]').click();assert page.locator('[data-control="C"]').input_value()=='1'
 visit('36-rbf-demo');before=page.locator('[data-demo="kernel"]').inner_html()
 page.locator('[data-control="gamma"]').select_option('20');assert before!=page.locator('[data-demo="kernel"]').inner_html()
 page.locator('[data-reset="kernel"]').click();assert page.locator('[data-control="gamma"]').input_value()=='1'
 visit('44-score-demo');assert '2.90' in page.locator('[data-result="scores"]').text_content()
 page.locator('[data-control="rival"]').evaluate('(e)=>{e.value=2.2;e.dispatchEvent(new Event("input"))}')
 assert '0.00' in page.locator('[data-result="scores"]').text_content()
 page.locator('[data-reset="scores"]').click();assert '2.90' in page.locator('[data-result="scores"]').text_content()
 visit('15-stationarity')
 page.keyboard.press('ArrowRight');assert page.locator('.slide.active').get_attribute('data-build')=='1'
 page.keyboard.press('ArrowRight');assert page.locator('.slide.active').get_attribute('data-build')=='2'
 page.keyboard.press('ArrowLeft');assert page.locator('.slide.active').get_attribute('data-build')=='1'
