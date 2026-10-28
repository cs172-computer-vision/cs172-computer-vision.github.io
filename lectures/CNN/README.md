# CNN · CS172 Computer Vision I

36 slides for a 90-minute undergraduate lecture. Jiayuan Gu, ShanghaiTech University. Follows Deep Learning Basics; assumes gradients, ReLU, softmax cross-entropy, SGD, and Python.

Open **index.html** directly in a desktop browser. The portable folder includes all runtime resources, KaTeX, fonts, diagrams, and notes. No server, installation, account, or internet connection is required to present. External reading links need internet when clicked.

## Presentation

- Right / Space / Page Down: next reveal or slide. Left / Page Up: reverse.
- End: complete the current slide; Home: first slide.
- O: overview; N: notes; F: fullscreen; B: black screen; T: controls; Esc: close.
- Move to the bottom edge for the fixed-size control bar; it hides after 2.2 seconds away from controls. Tab can reach its reveal button.
- Agenda, learning outcomes, limitations, and summary lists appear in full. Worked explanations, table rows, and code groups retain progressive reveals; reduced motion disables fades.
- The exit check starts with all answers hidden. Right/Space reveals answers individually; Left hides them again. There is no time limit or submission requirement. The PDF includes completed answers.
- The URL retains the stable slide ID and reveal state, e.g. `index.html#13-gradient/1`.
- Sliders and selectors retain their normal keyboard behavior. Demonstrations have reset buttons and labeled numerical readouts.

## Deliverables

- **index.html**: the only editable source of slide content and inline notes/reference metadata.
- **CNN.pdf**: completed reveals and default demonstration settings; selectable text and clickable references, exact 16:9 pages.
- **TEACHING_PLAN.md**: outcomes, instructor pacing, worked-example solutions, untimed self-check, and homework.
- **SPEAKER_NOTES.md**, **SOURCE_MAP.csv**: derived from inline `slide-meta`, refreshed by the tool below.
- **SOURCES.md**: provenance, reference-page mappings, and important adaptations.
- **QA_REPORT.md**, **tools/qa-results.json**: verification results and limits.

## Edit and refresh

Edit readable `<section class="slide">` elements in **index.html**. Keep stable IDs. Update the matching record in its inline `slide-meta` JSON for speaker notes and references. Author math in `<m>` or `<m display="true">` using LaTeX. Do not edit the derived notes/map instead of their inline source.

Styles and navigation live in **source/style.css** and **source/app.js**. **source/diagrams.js** contains deterministic drawing and convolution logic shared by static SVG assets and live demonstrations. **source/interactions.js** wires controls. Static SVGs are derived, editable vector figures; change their drawing logic and refresh to reproduce them.

The presentation itself needs no authoring tools. Authoring/export uses Python 3.9+ and the pinned packages in **tools/requirements.txt**, plus Chrome or Playwright Chromium. Reuse an existing environment; a new environment may live outside the checkout:

```sh
# Run from lectures/CNN; one-time authoring setup:
python3 -m venv "$HOME/.venvs/cs172-slides"
. "$HOME/.venvs/cs172-slides/bin/activate"
python -m pip install -r tools/requirements.txt
# Only when Chrome is unavailable:
python -m playwright install chromium
```

For later edits, activate that environment and run:

```sh
python tools/refresh.py
python tools/verify_math.py
python tools/export_pdf.py --check --screenshots /tmp/cnn-slides
python tools/review_pdf.py --output /tmp/cnn-pdf-review
```

Refresh reads canonical HTML and updates order, counters, notes, source map, and SVGs. It preserves authored slide content. It does not create a second slide source. Set `CHROME` to a Chromium executable if needed; on macOS the tools use installed Google Chrome by default. No Node.js dependency is required.

The PDF exporter tests actual offline `file://` behavior, numerical demo invariants, navigation, fonts, images, layout bounds, and controls. It prints final reveals, restores default demo states, and normalizes pages to 1080 × 607.5 pt. `review_pdf.py` creates every-page raster previews and contact sheets outside the lecture folder. Inspect them after an export.

Optionally verify the exact displayed model and training code:

```sh
python -m pip install -r tools/requirements-model.txt
python tools/check_pytorch.py
```

This optional environment is separate from presentation requirements. The model uses synthetic input to verify shapes, parameter counts, and an SGD update; it does not demonstrate trained classification accuracy. Browser Print also works: enable backgrounds, disable headers/footers. The supplied PDF guarantees the documented dimensions. Hosting and ZIP packaging are separate actions.
