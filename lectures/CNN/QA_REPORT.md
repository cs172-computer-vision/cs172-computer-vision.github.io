# CNN · Quality assurance

Verified 2026-10-28. Status: **passed** for the delivered offline HTML and PDF. This records technical and editorial checks; no student attainment, classifier accuracy, or hardware speed is claimed.

## Curriculum and technical review

- 36 slides with stable IDs; a timed 90-minute route and five measurable outcomes.
- Bullet-led agenda (2), outcomes (3), limitations (33), and summary (34) display all items immediately. Browser checks confirm each advances directly to the next slide without intermediate builds. Worked calculations/code and hidden exit answers retain their reveals.
- Worked examples explain convolution, gradients, shapes, context, and code repairs. The exit self-check is untimed, requires no submission, and reveals answers only on advance. The separate homework retains its rubric.
- Defined uncommon terms at first use, including kernel, bias, tensor, activation, NCHW, floor, receptive field, logit, and MAC (multiply–accumulate). Removed repeated prediction questions and reading-list production metadata.
- Checked notation and numerical continuity across diagrams, formulas, controls, notes, and code. Fixed NCHW convention; explicit channel and spatial axes.
- Clarified invertible flattening, cross-correlation, floor in output sizing, boundary/stride limits of equivariance, and theoretical receptive-field interpretation.
- Verified every displayed convolution output, pooling result, parameter count, MAC count, classifier total, and receptive-field trace. Shared-filter gradients passed independent central finite differences. `tools/verify_math.py` reproduces these checks without extra packages.

## Actual offline browser checks

Chrome **155.0.8059.85**, Playwright **1.58.0**, macOS; the browser loaded the actual `file://` presentation with its context set offline. This was live browser automation, not DOM simulation.

- All 36 slides: titles, counters, local images, bundled KaTeX/font loading, and content bounds, including math bounds. Zero page errors, zero external runtime requests, zero reported layout issues.
- All nine convolution positions against independent expected outputs; all 72 shape-calculator combinations against independently enumerated valid starts, parameter counts, and output-value counts; all five receptive-field depths; all resets.
- Forward/reverse reveals for rendered mathematics, table rows, code groups, and explanations; all three exit answers hidden initially, revealed individually, and hidden in reverse; completed answers visible in print; 180 ms fade under normal motion and no transitions under reduced motion. Also checked slide boundaries, End, overview, inline notes, black screen, fullscreen, fixed toolbar reveal/auto-hide, keyboard operation in inputs, and normal/reduced motion.
- Uniform fit at 1440×810, 1280×720, 1024×768, and 768×1024. Presentation intentionally preserves a 16:9 canvas; a portrait window scales down the complete slide.
- Numerical defaults restored before PDF export. The raw machine-readable results are in `tools/qa-results.json`.

## Executable implementation

`tools/check_pytorch.py` extracted and executed the exact code displayed on slides 30–31 with PyTorch **2.8.0**, using seeded synthetic data. Forward output was `(4,10)`, parameters totaled **1,562**, loss was finite, and an SGD step changed model parameters. This checks API use and arithmetic, not real-data learning performance. The local environment emitted an optional NumPy-integration warning; these tensor operations passed without NumPy.

## PDF and visual review

- **CNN.pdf:** 36 pages; every media box exactly **1080 × 607.5 pt** (16:9).
- Text retained on every page; **34 link annotations** retained.
- Completed reveals and meaningful default demo values exported. Interactive controls are replaced by their static labels/values where appropriate.
- After removing bullet-list builds, regenerated the PDF and compared raster pixels on all 36 pages with the previously reviewed output: identical. The change affects presentation pacing, preserving the completed PDF layout.
- Rendered every PDF page to a full-size PNG and inspected all three contact sheets. Inspected changed pages 11, 22, 27, 32, and 35 at larger size. No clipping, title overlap, illegible figure labels, or footer collisions remained. The review output is outside the portable folder at `/private/tmp/cnn-revised-pdf`; regenerate it with `tools/review_pdf.py`.

## Reproduction and limits

Follow README.md to activate a reusable authoring environment, refresh from canonical HTML, run math/browser checks, export, and render all PDF pages. All runtime files are bundled. Source mappings and speaker notes derive from inline metadata; content remains directly editable in index.html.

The checks cover the installed Chromium browser and listed viewport sizes. Safari/Firefox and a physical classroom projector were not tested. External reading destinations require internet and are not part of the offline runtime. No hosting/deployment or ZIP export was requested or performed.
