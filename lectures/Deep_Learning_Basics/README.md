# Deep Learning Basics · CS172 Computer Vision I

37 slides, 16:9, approximately 90 minutes. Jiayuan Gu, ShanghaiTech University.

Open **index.html** directly in a desktop browser. All presentation resources are local, including figures, KaTeX fonts, CSS, JavaScript, notes, and math. No installation, account, or server is needed. Keep the folder tree together when copying it. External references only need internet when clicked.

- Right / Space / Page Down: next reveal or slide; Left / Page Up: reverse.
- End: complete the current slide; Home: first slide.
- O: overview; N: notes; F: fullscreen; B: black screen.
- T: show/hide controls; Escape: close a panel or hide controls.
- Move to the bottom edge for the fixed-size toolbar; it hides after 2.2 seconds away from its controls. Normal keyboard operation is preserved in sliders, selectors, and buttons.
- URLs retain slide ID and reveal state, for example `index.html#23-sgd-example/2`.

## Included outputs

- **Deep_Learning_Basics.pdf**: 37 completed slides, with default demo states, selectable text, equations, and clickable references. Exact 1080 × 607.5 pt media boxes (16:9).
- **../Deep_Learning_Basics.zip**: editable portable package. Extract and open its index.html.
- **TEACHING_PLAN.md**: outcomes, 90-minute route, activities, assessment, and homework.
- **SPEAKER_NOTES.md**: notes for every slide, also available with N.
- **SOURCES.md** / **SOURCE_MAP.csv**: figure provenance and one-based reference PDF pages.
- **QA_REPORT.md**: checks and verification limits.

## Interactions

| Slide | Purpose |
|---|---|
| 11 | Change learning rate on a fixed quadratic; compare convergence, oscillation, and divergence. |
| 16 | Change batch size on a fixed synthetic objective and seeded sampling sequence. |
| 29 | Switch XOR from input coordinates to two ReLU features. |

SVM geometry, the dual, kernels, and multiclass hinge loss are now in **../Support_Vector_Machines/**. This lecture begins with that lecture’s loss-plus-regularization handoff and teaches SGD in detail.

Each demo has a reset. Diagrams are deterministic; synthetic plots are identified on slides and in notes. The scalar computational graph on slide 32 has grouped forward and backward builds. Reveals support reversal and print in their completed state. Reduced-motion preferences are supported.

## Installation for authoring

The prebuilt HTML and PDF need no authoring tools. To rebuild or export changes, install:

| Task | Requirements |
|---|---|
| Rebuild HTML and SVG figures | Python 3.9+ and Node.js (`node` on PATH, or set `NODE`). KaTeX is bundled; no npm install is needed. |
| Export PDF or run browser checks | Python packages pinned in `tools/requirements.txt`: Playwright, PyMuPDF, and Pillow; plus Google Chrome or Playwright Chromium. |
| Re-extract original PDF figures | PyMuPDF from the same requirements file, plus the reference PDF described in `source/references/README.md`. |
| Run the reference model, arithmetic checks, or ZIP packaging | Python standard library only. |

Install Python from [python.org](https://www.python.org/downloads/) and Node.js from [nodejs.org](https://nodejs.org/en/download) if they are not already available. Python must include `venv` and `pip`.

### Set up once

Run these commands from this deck's directory (`lectures/Deep_Learning_Basics`). The environment below is stored outside the checkout so it can be reused for future lecture decks and builds. These commands use a macOS/Linux shell.

```sh
python3 -m venv "$HOME/.venvs/cs172-slides"
. "$HOME/.venvs/cs172-slides/bin/activate"
python -m pip install --upgrade pip
python -m pip install -r tools/requirements.txt

# Needed unless using the installed Google Chrome on macOS,
# or another Chromium executable supplied through CHROME:
python -m playwright install chromium
```

The Python requirements file pins the authoring package versions. Keep the environment between sessions; reinstall packages only when setting it up on another machine or when the requirements change. For another lecture deck, activate the same environment and install that deck's requirements if they differ.

### Reuse for later builds

From the deck directory, activate the existing environment and run the desired commands:

```sh
. "$HOME/.venvs/cs172-slides/bin/activate"
python tools/build.py
python tools/export_pdf.py
python tools/package.py
```

Set `NODE` if Node.js is not on PATH, for example `NODE=/path/to/node python tools/build.py`. On macOS, PDF export automatically uses Google Chrome at its standard installation path when present. To select another Chromium browser, use `CHROME="/path/to/browser" python tools/export_pdf.py`. Without either, export uses the Chromium installed by Playwright.

## Edit and rebuild

Edit **source/slides/*.html**, one fragment per stable slide ID. **source/manifest.json** defines order, titles, sections, notes, and references. Do not edit the generated index.html. Styles and interactions remain separate local files.

```sh
# After activating the authoring environment:
python tools/build.py
# Optional arithmetic and gradient checks:
python tools/verify_math.py
```

Use `<m>LaTeX</m>` and `<m display="true">LaTeX</m>` for math. The build pre-renders math with the bundled KaTeX distribution. No runtime math library is needed. Use `class="step" data-stage="1"` for a reveal; matching stage numbers reveal together. Counters, notes, and the source map regenerate automatically.

**source/diagrams.js** shares drawing logic across live demos and editable SVG snapshots. `tools/build.py` refreshes snapshots automatically. Cropped original figures are already in assets/. See source/references/README.md if you want to reproduce their extraction from Stanford's original PDFs.

## Export and verify

Browser Print / PDF exports all reveal states. Enable background graphics and disable browser headers/footers. Browser page-size rounding varies; the supplied PDF has normalized media boxes.

After the one-time installation above, export without running the browser-check suite:

```sh
python tools/export_pdf.py
```

To run the optional browser checks as part of export:

```sh
python tools/export_pdf.py --check
# Optional screenshots outside the portable folder:
python tools/export_pdf.py --check --screenshots /tmp/deep-learning-slides
```

Set `CHROME` to another Chromium executable if desired. Development dependencies are pinned in tools/requirements.txt; the prebuilt presentation does not need them. `tools/reference_model.py` is an executable dependency-free MLP with softmax cross-entropy, weight-only L2, and minibatch SGD on synthetic XOR. `tools/verify_math.py` checks its gradients by independent central differences and verifies displayed examples.

Create the editable ZIP after rebuilding and exporting:

```sh
python tools/package.py
```
