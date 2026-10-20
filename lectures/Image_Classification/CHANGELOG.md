# Nearest-neighbor notation and figure annotation

- Standardized notation across slides 13–20 and linked it to the NumPy example.
- Refined query markers, nearest-example annotation, and the isolated-blue-example leader.
- Removed the requested sentence on slide 13.
- Labeled every percentage on slide 22 as an error rate; values unchanged.
- Refreshed offline HTML, PDF, editable sources, notes, and teaching plan; 54 slides retained.

## Previous revisions

# Original CS231n cross-validation figure

- Replaced the illustrative plot on slide 31 with the requested cvplot.png.
- Adjusted the interpretation and credit to match the source example.
- Refreshed HTML, PDF, source notes, and editable package; 54 slides retained.

## Previous revisions

# Static pixel-distance figure and shorter reading close

- 54 slides after removing the standalone bag-of-visual-words page.
- Replaced page 32’s interaction with CS231n samenorm.png, embedded unchanged and cited in place.
- Expanded the supplementary reading entry to explain visual words and spatial pyramids.
- Updated PDF, source map, notes, and documentation.

## Previous revisions

# Generalization and classical-method revision · 18 October 2026

- 55 slides; six additions preserve the core lecture sequence.
- Clarified lecture scope, conditional scene grouping, and binary versus multiclass geometry.
- Added reproducible noisy-data fits and schematic complexity/data-size curves.
- Compared nearest-neighbor and linear-classifier costs, strengths, and limitations.
- Added an optional visual-word overview and a reading-only closing slide.
- Preserved offline resources, animation builds, and original interactive demos; refreshed the PDF, notes, source map, and teaching plan.

## Previous revisions

# Presentation pacing and loss example

- 49 slides after removing the former final check.
- Restored the 2D nearest-neighbor plot.
- Four progressive builds on slide 35, including a weight-row-to-grid transition and later template/interpretation reveals.
- Explicit probability derivation and matching marked point on the loss curve, without the units description.
- Updated PDF, notes, page references, and editable sources.

## Previous revisions

# Conceptual clarity revision

- Simplified title with course-first ordering and one CIFAR figure.
- Opening agenda, challenge bridge, and final learning-objective check; 50 slides total.
- Explicit classical/deep-learning representation distinction.
- Concrete nearest-neighbor introduction without premature k/metric notation.
- Marked k-NN example and query-label readout.
- Synchronized side-by-side L1/L2 demonstration with an explicit counterexample and exact vector boundaries.
- Matched algebraic and visual views using unchanged input values, weight row, bias, and score.
- Updated page references, speaker notes, source map, HTML, and PDF.

## Earlier presentation revision

- Toolbar hidden until the pointer reaches the bottom edge, the keyboard Controls button receives focus, or T is pressed.
- Fixed toolbar dimensions and reserved counter cells prevent resizing during reveals and slide changes.
- Automatic fading after 2.2 seconds away from the controls, with hover and keyboard-focus retention. T pins or dismisses the toolbar. Esc dismisses it.
- Four section-transition slides, bringing the deck to 48 slides.
- Shared 96-pixel horizontal margins, a clearer title/content gap, consistent 48-pixel column gutters, and revised dense-table spacing.
- Training/prediction diagrams use an explicit grid, avoiding unstable box sizing in PDF rendering.
- Automatic footer numbering during rebuilding. Editable control markup is kept in source/controls.html.
- Updated teaching plan, source map, speaker notes, offline HTML, and PDF.


## 19 October 2026 · Probability-first narrative and one editable source

The deck now has 57 slides. Slides 1–42 retain their order; the final block is scores → categorical probability model → softmax → probability ratios/demo → observed-label comparison → likelihood → cross-entropy → dataset mean. New slides are 34a-probability-model, 36a-logit-odds and 37a-label-evidence. The probability demo is now slide 48, cross-entropy 51, likelihood 50, stability 54, summary 55, exit 56 and readings 57.

index.html is canonical and directly editable. Separate local styles, math rendering, navigation, interactions and shared SVG renderers replace the embedded generated file. The duplicate fragments/manifest were retired; inline metadata drives notes, counters and source mappings. The build only refreshes derived artifacts. Existing stable IDs, design, figures and four-stage template build are preserved. The linear demo now has a reset; clicks use SVG coordinates so query placement respects scaling and letterboxing. README.md documents the reusable authoring environment and current workflow. Previous entries describe earlier versions.


## 19 October 2026 · Shorter softmax/cross-entropy section

54 slides. Removed the old page 47 probability-ratio slide, merged old pages 44–45, and folded the old page 52 dataset mean into the likelihood derivation. The old page 48 demo is now page 46: three logits, reset, and the open question “What happens if we add the same constant to every logit?” The shared-shift control and on-slide answer are absent. Cross-entropy is now page 49 and retains its formula, fixed example and curve; the one-hot identity and secondary caveats are in notes. Current page mapping is in SOURCE_MAP.csv.
