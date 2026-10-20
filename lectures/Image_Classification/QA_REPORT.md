# Image Classification verification

Completed 19 October 2026. The revised deck has 54 slides. This report supersedes the earlier DOM-simulation-only revision reports preserved in CHANGELOG.md and EDIT_NOTES.md.

## Content and arithmetic

- The shorter sequence is scores/probability constraints → softmax → exploration → observed-label comparison → likelihood and dataset mean → cross-entropy. The softmax exploration contains no target-label loss.
- The worked logits (3.2,5.1,−1.7) give probabilities approximately (0.1299825390,0.8690495352,0.0009679258). The observed cat gives loss 2.0403551528. The loss-curve marker uses this same calculation. B=(0.3,0.6,0.1) improves the observed cat likelihood while retaining the car argmax.
- Node numerical checks passed for normalization, positivity, argmax preservation, logit/probability ratios, shared-shift invariance, the distinction between shifting and scaling, and negative log likelihood. Equal-logit and extreme finite wrong-class examples remain covered.
- Retained distance, vote/tie, exact metric counterexample, k=1 blue/k=3 red and degenerate linear-boundary checks passed. Existing synthetic generalization data and reported error percentages were preserved; the NumPy generator was not rerun for this revision.
- The probability model is distinguished from guaranteed calibration. Conditional independence is stated for the likelihood product. Zero multiclass softmax loss remains an infimum for finite logits. Evidence and adaptations are linked in SOURCES.md.

## Live browser checks

Ran tools/export_pdf.py --check --screenshots using Playwright and local Google Chrome, opening the actual index.html with file:// and the browser context offline.

- All 54 slides: counters, completed builds, image loading and content bounds passed. No JavaScript errors or HTTP/HTTPS requests occurred. Local KaTeX finished rendering.
- Forward/reverse grouped builds passed for the four-stage template, two-stage softmax table and two-stage likelihood derivation. The weight-row transition reached its intended grid coordinates and reversed to its initial coordinates with motion enabled. Reduced-motion states also passed.
- k-NN neighbor changes, query placement/reset, metric query/reset, linear parameters/reset, and softmax sliders/reset passed. The shared-shift control is absent; the open shared-constant question remains on the slide without a revealed answer. A range input retained normal arrow-key behavior without advancing the slide.
- Overview, notes, toolbar reveal/autohide, keyboard navigation, fullscreen and black screen passed. Scaling passed at 1440×810, 1280×720, 1024×768 and 768×1024.

Machine-readable all-slide results are in tools/qa-results.json. Screenshots used for review are temporary development outputs, not presentation dependencies.

## PDF and packaging

- Exported Image_Classification.pdf contains 54 pages, each exactly 1080×607.5 pt (16:9), with completed builds and default demonstration states. It retains selectable text/math and 60 citation/reading links.
- Every PDF page was rendered and visually reviewed in contact sheets. New/changed probability and loss slides received enlarged inspection, including the final notation edit. No clipping, overlap or footer collisions were found.
- The portable ZIP contains the current editable index, local assets/styles/scripts/fonts, PDF, documentation and tools. Runtime references remain relative. Notes and source-map entries match all 54 slide IDs; legacy duplicate fragments and manifest are absent.

## Limits

Checks used one Chromium browser on macOS. Other browsers, physical projection conditions and screen-reader operation were not independently evaluated. The optional NumPy figure generator and the README installation procedure were not rerun. External reading links are references, not required presentation resources; this revision does not assert that every historical third-party image host is still available.


## Simplification checks

The old pages 45, 47 and 52 were merged or removed. Counters, notes and the source map were rebuilt for 54 slides. The softmax demo has no shared-shift event handler, button or on-slide answer. The shared-shift mathematical property remains covered by numerical checks and instructor notes. The cross-entropy slide retains the same numerical curve marker; one-hot detail is in notes. All 54 PDF pages were rendered and reviewed, with enlarged inspection of the merged score/probability slide, demo and cross-entropy slide. Browser checks again reported no layout errors, missing images, JavaScript errors or remote requests.
