# Verification report

Verified on 2026-10-19 using installed Google Chrome controlled by Playwright 1.58.0, with a 1440 × 810 viewport, local file:// entry, networking disabled, and reduced motion enabled. Source math rendered with the bundled KaTeX distribution. See tools/qa-results.json for the per-slide layout results.

## Content and numerical checks

- 46 manifest entries, 46 canonical fragments, generated counters and overview, and notes for every slide. Reference mapping uses one-based PDF pages; long source build sequences are consolidated.
- Calculated all three multiclass hinge examples and their mean; exit-check loss; L2 preference; full-gradient and minibatch steps; the MLP forward pass; XOR feature transformation; and scalar chain-rule derivatives.
- Executed the pure-Python MLP implementation with mean hinge loss, weight-only λ/2 L2, and actual minibatch SGD. The seeded synthetic XOR run produced all four correct labels; regularized objective decreased from 1.104906 to 0.000947. This is a small implementation check, not a generalization claim.
- Independently compared every weight/bias gradient in a smooth test case against central finite differences. Maximum absolute discrepancy: approximately 1.75 × 10⁻¹⁰.
- Reviewed the PyTorch sketch against official SGD/cross-entropy documentation. PyTorch itself was not installed or executed; the sketch assumes imports, model, loader, and λ exist. The standalone verified model uses pure Python.

## Live browser checks

- Opened directly through file:// with networking disabled: no remote resource requests, page errors, missing images, or missing math/fonts detected.
- Visited and captured every slide at its completed reveal state. Geometry checks found no content extending into footer space or beyond horizontal safe margins; titles were checked separately for overflow. Inspected the slide contact sheets and enlarged dense slides.
- Tested forward/reverse navigation, reveal boundaries, grouped computational-graph builds, End, overview, notes, toolbar visibility, toolbar auto-hide, black screen, and fullscreen.
- Tested margin-loss recomputation and reset, learning-rate divergence and reset, batch-size redraw, XOR representation switching and reset. Focused range inputs retain arrow-key behavior without advancing slides.
- Verified uniform slide fitting at 1280 × 720, 1024 × 768, and 768 × 1024. These checks establish canvas fitting, not touch-device usability.
- Shared deterministic SVG code generates static snapshots and live diagrams. Synthetic demonstrations identify the fixed objective, initial state, and sampling conventions. Original source figure colors and geometry were retained.

## PDF and packaging

- Exported all reveal states and default demonstration states, preserving selectable text, local math fonts, and citation hyperlinks. Controls are omitted; selected default values remain as printable text.
- Rendered every PDF page for visual inspection; examined dense mathematical/code pages at larger scale. Fixed literal linebreak escapes in the SGD listing, clipped titles, small margin illustration labels, and print-only select-value omissions found during QA.
- Normalized Chromium's sub-point paper-height rounding by trimming only the blank bottom edge to exact **1080 × 607.5 pt**, 16:9. Page count and links were checked after normalization.
- The portable ZIP contains the built presentation, local runtime dependencies, canonical fragments, editable vectors, reproducible extraction/drawing tools, notes, teaching plan, and source ledger. Original reference PDFs are excluded; retrieval instructions are included.

## Limits

No classroom projector trial, physical audience readability study, or 90-minute teaching pilot was performed. Live checks used Chrome; other browsers' fullscreen, print, or file-handling details may vary. The numerical two-parameter and XOR demonstrations are synthetic. Source diagrams are credited educational reuse, with no blanket license asserted for Stanford's materials.
