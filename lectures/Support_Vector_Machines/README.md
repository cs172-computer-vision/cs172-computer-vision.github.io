# Support Vector Machines · CS172 Computer Vision I

55 slides, 16:9. Full route 100 minutes, or 90 minutes using the core route in TEACHING_PLAN.md. Jiayuan Gu, ShanghaiTech University.

Open **index.html** directly in a desktop browser. All figures, fonts, math rendering, notes, controls, and demonstrations are local. No server or installation is needed to present. Keep the folder together when copying it. Citation links need internet only when opened.

This lecture precedes **../Deep_Learning_Basics/**: binary geometry → hard-margin primal/dual → soft margins → kernels → multiclass hinge loss → parameter learning. It uses Harvard’s geometric progression, CS229’s dual/SMO derivation, and CS231n’s worked-example approach.

## Present

- Right / Space / Page Down: next build or slide. Left / Page Up: reverse.
- End: complete the current slide. Home: first slide.
- O: overview. N: notes. F: fullscreen. B: black screen.
- T: show/hide controls; Escape: close panels or hide controls.
- The bottom-edge toolbar hides after 2.2 seconds. Inputs keep normal keyboard behavior.
- Stable URLs include slide and build, for example index.html#15-stationarity/2.

## Included outputs

- **Support_Vector_Machines.pdf**: 55 completed slides; exact 16:9, selectable math/text, default demo states, citation links.
- **../Support_Vector_Machines.zip**: portable deck plus editable content, scripts and teaching materials.
- **TEACHING_PLAN.md**, **SPEAKER_NOTES.md**: outcomes, timing, activities, assessment, and notes for every slide.
- **SOURCES.md**, **SOURCE_MAP.csv**: figure provenance and reference-page/section mapping.
- **QA_REPORT.md**, **tools/qa-results.json**: mathematical/browser checks and their limits.

## Interactions

| Slide | Change | Held fixed |
|---|---|---|
| 11 | Boundary angle and intercept | Six examples; unit normal |
| 27 | Slack penalty C | Seven overlapping examples; linear kernel |
| 36 | RBF gamma | Sixteen ring examples; C=10 |
| 44 | True and rival class scores | Frog score and margin 1 |

Every demo has a reset and printable default values. Green rings identify nonzero support coefficients in fitted plots. Synthetic data are identified explicitly. The small solver reports a primal-dual gap; it uses educational exhaustive pair-coordinate ascent.

## Installation for authoring

The prebuilt HTML and PDF need no authoring tools. To rebuild or export changes, install:

| Task | Requirements |
|---|---|
| Rebuild HTML and SVG figures | Python 3.9+ and Node.js (`node` on PATH, or set `NODE`). KaTeX is bundled; no npm install is needed. |
| Export PDF or run browser checks | Python packages pinned in `tools/requirements.txt`: Playwright, PyMuPDF, and Pillow; plus Google Chrome or Playwright Chromium. |
| Re-extract original PDF figures | PyMuPDF from the same requirements file, plus the Harvard PDF described below. |
| Check dual/multiclass arithmetic | Node.js; no npm packages needed. |
| ZIP packaging | Python standard library only. |

Install Python from [python.org](https://www.python.org/downloads/) and Node.js from [nodejs.org](https://nodejs.org/en/download) if they are not already available. Python must include `venv` and `pip`.

### Set up once

Run these commands from this deck's directory (`lectures/Support_Vector_Machines`). The environment below is stored outside the checkout so it can be reused for future lecture decks and builds. These commands use a macOS/Linux shell.

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

## Edit and refresh

**index.html is the single editable source for slide content.** Edit its slide sections directly. The inline slide-meta JSON contains titles, order, notes, and references; keep that metadata aligned with the section order. No per-slide fragment tree or second content copy is maintained. HTML is not generated by the build tool.

Use `<m>LaTeX</m>` or `<m display="true">LaTeX</m>`. Bundled local KaTeX renders math when the page opens. Use class="step" data-stage="1" for reversible builds; equal stage numbers reveal together.

After editing, refresh derived artifacts:

```sh
python tools/build.py
python tools/export_pdf.py
python tools/package.py
```

The build refreshes SVG snapshots, counters, accessible labels, SPEAKER_NOTES.md and SOURCE_MAP.csv. Styles and controls live in source/. Deterministic source/diagrams.js draws SVGs; source/svm.js fits the binary dual; source/linear.js implements the multiclass objective.

To reproduce the Harvard crops:

```sh
curl -fL https://harvard-iacs.github.io/2018-CS109A/lectures/lecture-20/presentation/lecture20_svm.pdf -o /tmp/lecture20_svm.pdf
python tools/extract_figures.py /tmp/lecture20_svm.pdf
```

The original PDF is not a presentation dependency and is not included in the ZIP.

## Optional verification

```sh
node tools/verify_math.cjs
python tools/export_pdf.py --check
python tools/export_pdf.py --check --screenshots /tmp/svm-slides
```

Numerical checks cover the exact two-support-vector solution, box/equality feasibility, KKT and duality gaps across demo settings, the polynomial identity, hinge values, an update, and independent multiclass weight/bias finite differences. Browser checks use networking-disabled file:// and test layouts, controls, and each interaction/reset.

For a manual export, use Print/PDF with backgrounds enabled and browser headers/footers disabled. All builds print completed. The scripted exporter normalizes Chromium paper rounding to exact 1080 × 607.5 pt.
