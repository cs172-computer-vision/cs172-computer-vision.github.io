# CNN Architecture · verification report

Revised 2026-11-04, Asia/Shanghai. Final lecture: 37 HTML sections and 37 PDF pages. Verification uses Python 3.9, Playwright 1.58.0, installed Google Chrome, PyMuPDF 1.26.5, and Pillow 11.3.0. The pinned authoring environment is outside the checkout; presentation needs no installed dependencies or network.

## Scope and content

- Removed the two design-exercise pages and their dependent exit question. The exit check now contains three questions. The agenda, notes, teaching plan, README, and derived source map reflect the removal.
- Removed all student-facing facilitation labels, group instructions, and question time limits. The remaining questions state the calculation or diagnosis directly. Instructor pacing remains only in the teaching plan.
- Replaced eight content tables with editable illustrations: learned weights / spatial reuse / output storage; BatchNorm statistics routes; sequential / parallel / residual composition; one large filter versus a local stack; direct versus compressed channel paths; branch-grid mismatch; addition versus concatenation; and a controlled experiment.
- The tensor-shape/receptive-field audit is the sole remaining slide-content table. The help overlay's keyboard-reference table is separate from lecture content.
- Kept all six original paper/reference-lecture crops, their credits, and the retained VGG/projection/ResNet diagrams. The new inline SVGs are canonical content in `index.html`, not a second generated slide source. Original empirical curves and numerical assumptions are unchanged.

## Passed verification

- Actual offline `file://` presentation in headless Chrome: zero page errors, zero remote runtime requests, all local math/fonts/images available.
- All 37 pages: unique stable IDs, matching inline metadata/counters/notes/source map, one main title each, and no recorded layout violations. Bounds checks include native SVG text and rectangles as well as paragraphs, math, figures, and code.
- Forward and reverse grouped reveals, default-hidden exit answers, three independent exit-answer steps, overview, notes, fullscreen, black screen, fixed toolbar and auto-hide, and responsive scaling. Normal and reduced-motion behavior passed. Bullet-only exposition remains static.
- Compute explorer: width/resolution changes, input keyboard behavior, reset, numerical outputs, and scaling invariants. Default dense/separable MACs remain 57,802,752 and 6,874,112.
- Independent arithmetic: shapes, theoretical context/jump recurrence, small-filter counts, classifier-head count, reduction count and ratio, bottleneck count, factorized costs, and network depth conventions. Removed tests for the deleted design exercise.
- PDF: 37 pages, each 1080×607.5 pt (16:9), retained text on every page, and 26 link annotations. Reveals are complete and demonstration controls use their defaults. Every page was rasterized and reviewed on contact sheets; new illustration pages were also inspected at full size for labels, arrows, clipping, and footer collisions. The cost-illustration labels were enlarged for projection before final export.

Browser results are recorded in `tools/qa-results.json`. All-page raster previews and contact sheets are under `/private/tmp/cnn-architecture-polished-pdf`; offline browser screenshots are under `/private/tmp/cnn-architecture-polished-slides` on the preparation machine. These temporary files are not presentation dependencies.

## Limits

The optional PyTorch execution check remains unrun because its earlier installation was declined. No model accuracy, device latency, or student outcome is claimed as measured. The browser checks use headless Chrome; Safari, Firefox, a physical projector, and touchscreen use were not directly tested. Small original paper-graph tick labels are preserved, with their axes and interpretation stated in surrounding teaching text. Visual review and numerical checks are separate from the automated DOM bounds checks.

## Reproduction

Follow `README.md`. Refresh derives slide counters, notes, source mappings, and the retained SVG assets; it preserves canonical slide content. Run `tools/verify_math.py`, `tools/export_pdf.py --check`, then `tools/review_pdf.py`. Crop extraction and source provenance remain in `tools/extract_figures.py` and `source/references/figure-provenance.json`.

## Page 4 terminology refinement

Page 4 (`05-cost`) now uses the headings Weights, Computation, and Output tensor, with explicit parameter/MAC/element units and tensor dimensions. Removed the pointer below the spatial grid; an outlined output cell now supplies the emphasis without a leader crossing its label. The footer callout states the dense-convolution/no-bias/per-image assumptions. Refreshed title metadata, notes, and source map; arithmetic and the offline browser checks passed with zero layout errors. Regenerated the 37-page PDF, reviewed every page on contact sheets, and inspected page 4 at full size. Latest previews are in `/private/tmp/cnn-architecture-page4-pdf`.
