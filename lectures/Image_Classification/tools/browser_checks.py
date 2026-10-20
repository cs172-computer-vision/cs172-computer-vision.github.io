"""Live checks for the actual file:// deck; no DOM emulation."""
def run(page, visit):
    def set_value(name, value):
        page.locator('[data-control="'+name+'"]').evaluate(
            '(e,v)=>{e.value=v;e.dispatchEvent(new Event("input"))}', value)
    def plot(name):
        return page.locator('[data-demo="'+name+'"]').inner_html()
    visit('16-knn-demo')
    assert 'blue' in page.locator('[data-query-label]').text_content()
    set_value('k', 3)
    assert 'red' in page.locator('[data-query-label]').text_content()
    page.locator('[data-control="k"]').focus();page.keyboard.press('ArrowRight')
    assert page.locator('.slide.active').get_attribute('id') == '16-knn-demo'
    page.locator('[data-action="knn-reset"]').click()
    default=plot('knn')
    page.locator('[data-demo="knn"] svg').click(position={'x':300,'y':200})
    assert plot('knn') != default
    page.locator('[data-action="knn-reset"]').click();assert plot('knn') == default
    visit('18-metric-demo');default=plot('metric-compare')
    page.locator('[data-demo="metric-compare"] svg').click(position={'x':300,'y':200})
    assert plot('metric-compare') != default
    page.locator('[data-action="metric-reset"]').click();assert plot('metric-compare') == default
    visit('32-geometry');default=plot('linear')
    set_value('a',0);set_value('b',0);assert 'NaN' not in plot('linear')
    assert plot('linear') != default
    page.locator('[data-action="linear-reset"]').click();assert plot('linear') == default
    visit('37-softmax-demo');default=plot('softmax')
    assert not any(w in default.lower() for w in ['loss','cross-entropy','true class'])
    def probabilities():
        import re
        return [float(x) for x in re.findall(r'>([\d.]+)%<',plot('softmax'))]
    base=probabilities();set_value('s0',4.2);assert probabilities()[0]>base[0]
    probabilities_before_rival=probabilities()[0]
    set_value('s1',6.1);assert probabilities()[0]<probabilities_before_rival
    page.locator('[data-action="soft-reset"]').click();assert plot('softmax') == default
    assert page.locator('[data-action="soft-shift"]').count() == 0
    assert 'same constant' in page.locator('.slide.active .callout').text_content()
    for id,stages in [('31-templates',4),('36-softmax',2),('39-likelihood',2)]:
        visit(id)
        for stage in range(1,stages+1):
            page.keyboard.press('ArrowRight')
            assert page.locator('.slide.active').get_attribute('data-build') == str(stage)
        page.keyboard.press('ArrowLeft')
        assert page.locator('.slide.active').get_attribute('data-build') == str(stages-1)
        page.keyboard.press('End')
        assert page.locator('.slide.active').get_attribute('data-build') == str(stages)

    # Check the actual 0.6-second transition and reverse it with motion enabled.
    page.emulate_media(reduced_motion='no-preference')
    visit('31-templates')
    weight=page.locator('.slide.active .moving-weight').first
    initial=weight.evaluate('(e)=>getComputedStyle(e).transform')
    page.keyboard.press('ArrowRight')
    page.wait_for_function("""() => {
        const e=document.querySelector('.slide.active .moving-weight');
        const m=new DOMMatrixReadOnly(getComputedStyle(e).transform);
        return Math.abs(m.m41-parseFloat(getComputedStyle(e).getPropertyValue('--to-x')))<0.01 &&
               Math.abs(m.m42-parseFloat(getComputedStyle(e).getPropertyValue('--to-y')))<0.01;
    }""")
    assert weight.evaluate('(e)=>getComputedStyle(e).transform') != initial
    page.keyboard.press('ArrowLeft')
    page.wait_for_function('(v)=>getComputedStyle(document.querySelector(".slide.active .moving-weight")).transform===v',arg=initial)
    page.emulate_media(reduced_motion='reduce')
