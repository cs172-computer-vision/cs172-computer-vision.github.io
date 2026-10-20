# Verification report

Verified 2026-10-19. Live presentation checks use installed Chrome via Playwright 1.58.0, file://, networking disabled, reduced motion, and a 1440×810 viewport. Detailed per-slide results are in tools/qa-results.json.

## Content and mathematics

- 55 slides follow binary geometry → hard primal/dual → slack/soft dual → kernels → multiclass loss → parameter learning. Original Harvard source figures, new calculations, and schematic versus fitted illustrations are distinguished in notes/ledger.
- The canonical running example has w=(1,0),b=0, width 2, two nonzero alpha=.5, and primal=dual=.5.
- Checked all five C choices and four RBF gamma choices for dual box/equality feasibility, KKT implications and primal-dual gaps. Largest gap across all nine settings: approximately 3.31×10⁻⁴. Demo readouts report their gaps.
- Verified polynomial feature identity on 30 pairs, all displayed hinge/slack arithmetic, common-score-translation invariance, and the binary update.
- Independently checked every weight/bias gradient of the regularized joint multiclass implementation by central differences away from kinks. Largest weight-gradient discrepancy: approximately 1.41×10⁻¹⁰.
- The demo solver is exhaustive feasible pair-coordinate ascent with analytic quadratic maximizers and box clipping. It is an educational implementation, not an assertion of production SMO performance.

## Browser and interaction checks

- Visited all 55 slides, checked titles/content against safe margins and footers, and captured completed states. Corrected one soft-KKT footer collision and two source-crop fragments found in the first pass.
- No page errors, remote resource requests, missing figures or missing math detected while offline.
- Checked slide counters and metadata, forward/reverse builds including stationarity, overview/notes, fullscreen, black screen, toolbar visibility/autohide, and uniform fit at 1280×720,1024×768,768×1024.
- Tested boundary-angle calculation (.866 at 30 degrees), focused-input arrow keys, C and gamma refits, hinge recomputation, and resets for all four demos.
- Shared deterministic drawing logic generates SVG snapshots and live views. Selected controls become printable values; source images retain provenance links.

## PDF and packaging

- 55-page PDF, completed builds, default demo states, selectable math/text, clickable references.
- Exact 1080×607.5 pt media boxes after removing Chromium’s blank sub-point bottom rounding.
- Rendered every page for inspection and reviewed dense derivations, original crops, tables, and optimization examples at larger scale.
- Editable ZIP includes the directly editable index.html, runtime assets/libraries, solver/drawing code, derived notes/map, teaching plan, requirements, numerical/browser checks and instructions.

## Limits

No classroom projector or timed teaching trial. Full-route timing is a teaching estimate with a 90-minute core route documented separately. Browser checks use Chrome; other browsers can differ in fullscreen/printing. Kernel zero contours use a 40×40 grid. Demo fits and training-error counts use small synthetic data, not external benchmarks. Harvard figures are attributed educational reuse; no blanket source license is asserted.
