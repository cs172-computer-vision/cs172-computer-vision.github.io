# Latest requested changes

The deck remains 54 slides with unchanged order.

| Page | Change |
|---|---|
| 13–20 | Consistent query q, stored vector x^(i), label y^(i), example index i, coordinate index j, and explicit L1/L2 metric subscripts. Math, code, plot labels, notes and captions follow this convention. |
| 13 | Replaced the query circle with a navy diamond and separate q label; removed the sentence about real-image coordinates. |
| 18 | Added a curved arrow with a defined arrowhead to the isolated blue example; retained the same query and k-dependent predictions. |
| 22 | Expanded every percentage label to Training error or Validation error. |

Existing slide-31 and slide-32 source figures, template animation, later multiclass geometry, and reading list remain in place. The notation table and interpretation guidance are recorded in the README and teaching plan. PDF export shows completed reveals.


## 19 October 2026 · Probability-first narrative and one editable source

The deck now has 57 slides. Slides 1–42 retain their order; the final block is scores → categorical probability model → softmax → probability ratios/demo → observed-label comparison → likelihood → cross-entropy → dataset mean. New slides are 34a-probability-model, 36a-logit-odds and 37a-label-evidence. The probability demo is now slide 48, cross-entropy 51, likelihood 50, stability 54, summary 55, exit 56 and readings 57.

index.html is canonical and directly editable. Separate local styles, math rendering, navigation, interactions and shared SVG renderers replace the embedded generated file. The duplicate fragments/manifest were retired; inline metadata drives notes, counters and source mappings. The build only refreshes derived artifacts. Existing stable IDs, design, figures and four-stage template build are preserved. The linear demo now has a reset; clicks use SVG coordinates so query placement respects scaling and letterboxing. README.md documents the reusable authoring environment and current workflow. Previous entries describe earlier versions.


## 19 October 2026 · Shorter softmax/cross-entropy section

54 slides. Removed the old page 47 probability-ratio slide, merged old pages 44–45, and folded the old page 52 dataset mean into the likelihood derivation. The old page 48 demo is now page 46: three logits, reset, and the open question “What happens if we add the same constant to every logit?” The shared-shift control and on-slide answer are absent. Cross-entropy is now page 49 and retains its formula, fixed example and curve; the one-hot identity and secondary caveats are in notes. Current page mapping is in SOURCE_MAP.csv.
