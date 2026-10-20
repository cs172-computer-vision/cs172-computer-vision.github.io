# Image Classification · CS172 Computer Vision I

54 slides, 16:9. Approximately 90 minutes using the core route, or 100 minutes including optional material. Jiayuan Gu, ShanghaiTech University.

Open **index.html** directly in a desktop browser. Keep the folder together: figures, scripts, styles, fonts and KaTeX are local. No installation, server or account is needed to present. External citation and reading links need internet only when opened.

The sequence is visual classification → nearest neighbors → model selection → linear scores → softmax probabilities → observed-label likelihood → cross-entropy. Softmax is introduced as a categorical probability model before a learning objective is defined. The same three-class example connects the score table, probability demo and loss curve.

## Present

- Right / Space / Page Down: next build or slide. Left / Page Up: reverse.
- End: complete the current slide. Home: first slide.
- O: overview. N: notes. F: fullscreen. B: black screen.
- T: show/hide controls; Escape: close a panel or hide controls.
- Move to the bottom edge to reveal the toolbar; it hides after 2.2 seconds away from its controls. Its 840 × 52 px dimensions stay fixed and scale on narrow displays.
- Inputs retain normal keyboard behavior. Stable URLs include slide and build, for example index.html#36-softmax/2.

## Included outputs

- **Image_Classification.pdf**: 54 completed slides, exact 16:9, default demo states, selectable text/math and citation links. Answers to classroom checks are visible.
- **../Image_Classification.zip**: the portable project, including editable content and teaching materials.
- **TEACHING_PLAN.md**, **SPEAKER_NOTES.md**: outcomes, timing, activities, assessment and notes for every slide.
- **SOURCES.md**, **SOURCE_MAP.csv**: figure provenance and source-page/section mappings.
- **QA_REPORT.md**, **tools/qa-results.json**: completed checks and their limits.

## Interactions

| Slide | Change | Held fixed |
|---|---|---|
| 18 | Neighbor count k and query location; reset | Seeded 43-point dataset, L2 metric |
| 20 | Shared query in the L1/L2 panels; reset | The same two labeled examples |
| 39 | Two-class normal and intercept; reset | Six feature-space examples |
| 46 | Three logits; reset | Class set; other logits when one slider moves |

Slide 46 shows probabilities without a target label or loss, and asks what happens if the same constant is added to every logit. The answer is in speaker notes; there is no shared-shift button or on-slide reveal. Slide 38 retains four reversible builds: reshape weights, compute the score, reveal learned templates, interpret. Reduced-motion preferences disable its movement; the PDF shows the completed state.

## Installation for authoring

The prebuilt HTML and PDF need no authoring tools. To rebuild or export changes, install:

| Task | Requirements |
|---|---|
| Refresh counters, notes and SVG figures | Python 3.9+ and Node.js (`node` on PATH, or set `NODE`). KaTeX is bundled; no npm install is needed. |
| Export PDF or run browser checks | Python packages pinned in `tools/requirements.txt`: Playwright, PyMuPDF, and Pillow; plus Google Chrome or Playwright Chromium. |
| Check distances, votes and softmax arithmetic | Node.js; no npm packages needed. |
| ZIP packaging | Python standard library only. |

Install Python from [python.org](https://www.python.org/downloads/) and Node.js from [nodejs.org](https://nodejs.org/en/download) if they are not already available. Python must include `venv` and `pip`.

### Set up once

Run these commands from this deck's directory (`lectures/Image_Classification`). The environment below is stored outside the checkout so it can be reused for future lecture decks and builds. These commands use a macOS/Linux shell.

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

**index.html is the single editable source for slide content.** Edit its slide sections directly. The inline slide-meta JSON holds titles, order, notes and references; keep its order aligned with the HTML sections. There is no second per-slide fragment tree. The build updates derived artifacts without assembling or replacing the authored content.

| Location | Purpose |
|---|---|
| index.html | Slide content, control markup and inline metadata |
| source/style.css | Screen layout, reversible build styling and print rules |
| source/app.js | Navigation, notes, overview, scaling and toolbar |
| source/interactions.js | Demo events and reset behavior |
| source/diagrams.js | Deterministic SVG renderers and numerical helpers |
| source/math.js | Local KaTeX rendering on page open |
| assets/ | Local photographs, source figures and SVG snapshots |
| vendor/ | KaTeX JavaScript, CSS, fonts and license |
| tools/ | Refresh, export, numerical/browser checks and packaging |

Use `<m>LaTeX</m>` or `<m display="true">LaTeX</m>`. Local KaTeX renders these on open. Use class="step" data-stage="1" for reversible builds; equal stage numbers reveal together. Add images using relative assets/ paths. Preserve stable slide IDs when editing.

From this deck directory, refresh the outputs after changing content:

```sh
python tools/build.py
python tools/export_pdf.py
python tools/package.py
```

The build regenerates SVG snapshots, footer counters, accessible slide labels, SPEAKER_NOTES.md and SOURCE_MAP.csv. It requires Python and Node.js; presentation does not. Run packaging after exporting the updated PDF and updating documentation.

Optional: tools/extra_figures.py regenerates the existing synthetic generalization figures and assets/generalization-data.json. It additionally needs NumPy (`python -m pip install numpy==2.0.2`, Python 3.9+). Those assets are already included and do not need regenerating for ordinary text edits. The saved data record the training vectors, six flipped labels, clean validation grid and measured errors. Complexity/data-size trend diagrams are explicitly schematic.

## Verify or export

```sh
node tools/check.cjs
python tools/export_pdf.py --check
python tools/export_pdf.py --check --screenshots /tmp/image-classification-slides
```

Checks cover distance/vote examples, probability normalization and ratios, shared-shift invariance, likelihood/loss arithmetic, all-slide offline loading and layout, presentation controls, grouped reveals and demo resets. The exporter launches a local Chromium browser and uses no network resources. It normalizes the PDF to 1080 × 607.5 pt. Read QA_REPORT.md for the current results and limits.

For manual PDF export, choose Print / PDF, enable backgrounds, and disable browser headers and footers. Browser print behavior can vary; the scripted exporter specifies the page box. Both routes print completed reveals.

Body text is 30 CSS px and secondary explanations are normally at least 24 px. The canvas is 1440 × 810 px with 96 px horizontal safe margins, titles at 56 px and content at 160 px. Footers and some diagram labels are smaller. The slide scales uniformly to fit the display.

CHANGELOG.md and EDIT_NOTES.md preserve historical revision records; the current content, order and notes are in index.html.
