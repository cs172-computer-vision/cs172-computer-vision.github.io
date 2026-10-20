# Sources and provenance

## Narrative references

- [Harvard CS109A 2018, Lecture 20: Support Vector Machines](https://harvard-iacs.github.io/2018-CS109A/lectures/lecture-20/presentation/lecture20_svm.pdf), Pavlos Protopapas and Kevin Rader. Primary geometric reference: many separators → normalized distances → hard margin → violations/slack → feature mappings and kernels. We move the hard dual before slack as requested, and extend the ending to multiclass learning.
- [Stanford CS229 main notes](https://cs229.stanford.edu/main_notes.pdf), Tengyu Ma and Andrew Ng, accessed 2026-10-19. Chapter 6, especially §§6.3–6.8, supports functional/geometric margins, strong duality, KKT, the hard/soft dual and SMO. Chapter 5 supports feature maps and PSD kernels. We cite section identifiers because this maintained PDF can change pagination.
- [CS231n Linear Classification](https://cs231n.github.io/linear-classify/) and [Optimization I](https://cs231n.github.io/optimization-1/). The later section adopts their sequence of intuition, mathematical objective, fixed numerical examples, predictions before reveals, subgradients and updates. The three-example scores are retained from the prior deck and CS231n; the multiclass sum-of-hinges formulation is Weston–Watkins style, as the notes explain.
- [John Platt, Fast Training of Support Vector Machines using Sequential Minimal Optimization](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/smo-book.pdf). Supplementary primary reference for the constrained pair optimization idea.
- [Chang and Lin, LIBSVM: A Library for Support Vector Machines](https://www.csie.ntu.edu.tw/~cjlin/papers/libsvm.pdf), especially §§2 and7. Supports practical primal/dual conventions, kernel solver context, and one-against-one reduction.

## Reused source images

Harvard PDF pages below are one-based physical pages. Original diagrams are retained, cropped to remove surrounding prose, and rendered at 3× with PyMuPDF. Coordinate boxes are fractions of each PDF page, making extraction reproducible using tools/extract_figures.py.

| Asset | Deck slide | Original Harvard page | Crop (left,top,right,bottom) | Transformation / credit |
|---|---:|---:|---|---|
| assets/harvard-margin.png | 1 | 6 | (.28,.27,.71,.77) | Original hyperplane/support-vector schematic; course team credited in place. |
| assets/harvard-outlier.png | 23 | 15 | (.24,.45,.75,.65) | Original two illustrative fits, retaining their markers/colors. Distinct schematic, not the computed C dataset. |
| assets/harvard-feature-map.png | 31 | 28 | (.23,.395,.76,.78) | Original input-space/feature-space drawing, retaining shape/colors/labels. Conceptual map, not the ring data. |

Credit: Harvard CS109A, Protopapas and Rader. These are attributed educational figure reuses. No blanket license for the source PDF or underlying third-party figures is asserted. The original PDF is excluded from the portable package; retrieval instructions remain in README.md.

## Recreated figures and calculations

| Asset / renderer | Slides | Basis and reproducibility |
|---|---|---|
| margin.svg, candidates.svg, distance.svg | 3–12 | New editable vectors, inspired by Harvard pp.3,5–12. Fixed six-point data; optimum w=(1,0),b=0; full width2. Every candidate distance is calculated from its unit normal. |
| dual.svg | 20 | Exact D(a)=2a−2a²; optimum a=.5 and primal=dual=.5. |
| slack.svg | 24 | Exact signed margins1.4,.6,−.3 and minimum slacks0,.4,1.3. |
| soft.svg and live C renderer | 27 | Adds positive(-1.6,.25) strictly inside the negative convex hull. Fits the box-constrained linear dual for each C. |
| features.svg | 32 | New exact ring map r²=x1²+x2²; radii .55/1.5 → squared features .3025/2.25. Vertical stacking on the right only separates coincident feature values visually. |
| kernel.svg and live RBF renderer | 36 | Fits the same 16 ring points at C10 for each gamma. Decision curves are grid approximations; support sets and optimization gaps are computed. |
| scores.svg and live score renderer | 41,44 | Adapted from the preceding Deep Learning deck, using CS231n scores3.2,5.1,−1.7. Fixed cat/car/frog order; threshold2.2. |
| source/linear.js | 47–51 | Executable mean sum-of-hinges and weight-only λ/2 L2 implementation. Independent central differences verify weight/bias gradients. |
| source/learning-diagrams.js, styles, app, controls | Various | Reused local CS172 rendering/presentation infrastructure; new deck retains established typography, spacing, footer and controls. |
| vendor/ | All math | Existing vendored KaTeX JS/CSS/fonts from the course deck. MIT license in vendor/KaTeX-LICENSE.txt. |

The demo dual solver uses exhaustive feasible pair-coordinate ascent with analytic quadratic steps, nonnegativity/box clipping, and KKT-based bias recovery. It shares the pair-update principle with SMO but does not reproduce production working-set/caching heuristics. Tolerances and primal-dual gaps are disclosed. These are synthetic demonstrations, not benchmark measurements.

## Deliberate teaching corrections and conventions

- Zero slack includes points beyond the margin; it is not the definition of a support vector. We use alpha>0, with explicit caveats for degenerate equalities.
- Alpha=C does not imply misclassification. A bounded support can remain on the correct side while violating a score margin.
- One-sided geometric margin and full width differ by a factor of two. Positive score rescaling does not change distance.
- Binary labels t differ from multiclass labels y. C remains a penalty, K counts classes, and k denotes a kernel.
- Sum-slack C and mean-loss λ are related by λ=1/(CN) under the exact conventions shown, at fixed N. Biases are unregularized.
- Polynomial and RBF kernels are stated with valid parameter domains. A generic named similarity, including tanh with arbitrary parameters, is not automatically PSD.
- One-vs-rest, one-vs-one and joint sum-of-hinges are distinct modeling choices.
- SOURCE_MAP.csv uses one-based Harvard pages and CS229 sections. Speaker notes and counters derive from the embedded metadata in the editable index.html.
