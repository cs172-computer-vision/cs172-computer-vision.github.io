# Image Classification · CS172 Computer Vision I

54 slides, 16:9, approximately 90 minutes for the core route, or 100 minutes including optional material.

## Present

Open **index.html** in a modern desktop browser. It is a single self-contained file: fonts, figures, equations, diagrams, speaker notes, and interaction code are embedded. You can disconnect from the internet before opening it. No local server, installation, or account is required. External citation links need internet only when you choose to open them.

- **Right / Space / Page Down:** next reveal or slide.
- **Left / Page Up:** previous reveal or slide.
- **End:** show every reveal on the current slide.
- **O:** slide overview. **N:** presenter notes. **F:** full screen. **B:** black screen.
- **T:** show or hide the toolbar. **Esc:** close a panel, black screen, or toolbar.
- Move the pointer to the bottom 28-pixel edge to reveal the control bar. It stays hidden over the rest of the slide. Away from its buttons, it fades after 2.2 seconds.
- The toolbar uses fixed 840 × 52-pixel dimensions and reserved slots for the slide/reveal counters. On narrow displays, the whole bar scales uniformly. Press T to keep it open; press T again or Esc to hide it.
- Keyboard focus keeps the toolbar available while you use it. A focusable Controls button also provides keyboard access.
- Slider controls keep their usual keyboard behavior while focused.

Slide state is recorded in the URL fragment, for example `index.html#32-geometry/0`.

## Interactive illustrations

| Slide | Interaction |
|---|---|
| 18 | Change k and read the query label. The marked example gives blue at k=1 and red at k=3. |
| 20 | Compare L1 and L2 side by side; click to move a shared query and reset to the counterexample. |
| 39 | Change the two-class boundary normal and intercept. |
| 47 | Change logits and inspect softmax probabilities and true-class loss. |

## PDF

**Image_Classification.pdf** is included. It contains the completed reveal state and the default state of each interactive illustration, including answers to classroom checks.

To export a changed deck from your browser: choose **Print / PDF**, save as PDF, enable background graphics, and disable browser headers and footers. Chrome/Edge generally honor the specified 16:9 CSS page size. Browser print behavior can vary. The supplied PDF uses an explicit 1440 × 810 CSS-pixel page box (1080 × 607.5 pt).

An alternative reproducible export uses Python and WeasyPrint:

```sh
python -m pip install weasyprint
python tools/export_pdf.py
```

## Edit one slide

1. Edit its fragment in **source/slides/**. The filenames are stable slide IDs.
2. Run `python tools/build.py` from this directory. Python 3 and Node.js are needed only for rebuilding.
3. Open the rebuilt **index.html**. Export the PDF again if needed.

The fragments are the canonical content. Do not edit the generated index.html unless you only need a one-off change. `source/manifest.json` controls order, titles used in the overview, sections, notes, and the reference-page mapping. The builder automatically updates footer numbers and totals when inserting, deleting, or reordering slides.

- Use `<m>...</m>` for inline LaTeX and `<m display="true">...</m>` for display equations. The bundled KaTeX renderer runs during the build, so the presentation does not need a runtime math library.
- Add `class="step"` for a reveal. Elements sharing `data-stage="1"` reveal together. Use explicit stage numbers for every build on that slide if grouping.
- New images go in **assets/** and use `src="assets/filename"`. The builder embeds them automatically.
- **source/style.css** defines the 1440 × 810 layout and print rules.
- **source/diagrams.js** contains deterministic vector renderers shared by interactive examples and static snapshots.
- **source/app.js** handles navigation, reveal state, notes, toolbar timing, and interaction controls.
- **source/controls.html** defines the toolbar and presentation panels.
- Section divider fragments use `class="slide section-divider"`; their IDs remain stable even when their slide numbers change.
- If changing a renderer, refresh its matching SVG snapshot in **assets/** before rebuilding, so print and live views agree. Run `node tools/snapshots.cjs`.

## Teaching and sources

- **TEACHING_PLAN.md:** timing, objective alignment, activities, homework, and grading guidance.
- **SPEAKER_NOTES.md:** notes for every slide, also accessible with N.
- **SOURCE_MAP.csv:** correspondence to the one-based PDF pages of CS231n 2026 Lecture 2 and the attached Recognition lecture.
- **SOURCES.md:** figure credits, source links, adaptations, and numerical corrections.
- **QA_REPORT.md:** completed checks and verification limits.
- **vendor/**: bundled KaTeX distribution, fonts, and license.

Main body text is 30 CSS px (22.5 pt at the specified page size). Secondary explanatory text is normally 24 px (18 pt). Footers and some diagram labels are smaller. Projection fit scales the entire slide to the display.

## Revised presentation spacing

Content shares a 96-pixel left and right safe margin on the 1440-pixel canvas (6.7% each). Titles start 56 pixels from the top. Main content begins at 160 pixels, with a 48-pixel gap between columns. The body text remains 30 px and explanatory text normally remains at least 24 px. Table padding and selected figure heights are adjusted independently to preserve separation from the footer. These dimensions are deliberate choices for this deck, rather than a universal rule.

Four section dividers mark nearest-neighbor classification, model selection, linear classification, and learning with a loss function. The dividers are short verbal transitions. See the teaching plan for a 90-minute core route and a 100-minute route including optional material.

## Narrative and example revision

Page 2 is now an agenda. Page 5 bridges the pixel representation to classification difficulty. The deck ends with a reading list that explicitly identifies bag of visual words and spatial pyramids; the previous final-check slide remains removed. The nearest-neighbor introduction uses a 2D point plot, with no k or named metric before those ideas are introduced. The metric demonstration uses two fixed points and exact vector boundaries, showing a query that chooses A under L1 and B under L2. The algebraic and visual slides retain the same four input pixels, cat-weight row, bias, and score. See EDIT_NOTES.md for the old/new page correspondence.

## Latest presentation builds

Slide 38 has four builds: reshape the same four weight cells, compute the score, reveal CIFAR-10 templates, and interpret their appearance. Use Right/Space to advance, Left to reverse, or End to reveal all. The weight-row-to-grid transition lasts 0.6 seconds. Reduced-motion preferences disable it. The PDF shows the completed layout.

Slide 48 derives the example probability from scores (3.2, 5.1, −1.7). Its loss curve highlights the matching (0.13, 2.04) point with guides to both axes. The units description was removed.

## Generalization and classical-method additions

Slides 22–24 explain generalization, underfitting/overfitting, flexibility, and the role of training-set size. The first slide reveals three fixed-data k-NN fits and reports reproducible errors. The next two curves are explicitly schematic. Slide 40 extends pairwise geometry to three-class argmax regions. Slide 42 compares classifier training, query cost, storage, strengths, and limitations. Slide 54 is the reading list, with bag of visual words and spatial pyramids identified as supplementary topics.

The new figures are editable SVGs. `python tools/extra_figures.py` regenerates them (requires NumPy); `assets/generalization-data.json` records the points, labels, label flips, validation-grid specification, and measured errors. The build script also refreshes speaker notes and the two-reference source map automatically. No NumPy or Python installation is needed to present the HTML or read the PDF.

## Latest simplification

Slide 32 now uses the original CS231n same-L2-distance image, bundled unchanged, with a static explanation. The shift/brightness controls and their initialization were removed. The separate visual-word slide was removed; the final reading list explains both visual words and spatial pyramid matching.

## Nearest-neighbor notation revision

Pages 13–20 consistently use query q and stored examples x^(i), with parenthesized superscript i for an example and subscript j for a coordinate. L1/L2 distance labels are explicit; the code uses q and i_star. Query markers are navy diamonds. Page 18’s curved arrow points to the same isolated blue example. Page 22 explicitly labels both training and validation error rates. The deck remains 54 slides.
