# Sources and figure provenance

Primary narrative references supplied by the user:

- [CS231n 2026, Lecture 3: Regularization and Optimization](https://cs231n.stanford.edu/slides/2026/lecture_3.pdf), course team credited in the PDF footer as “Fei-Fei, Adeli, Durante, Johnson, Xiang”. Main flow: loss/regularization → gradient estimation → gradient descent/SGD. The long optimizer section is compressed to a brief overview.
- [CS231n 2026 URL, Lecture 4: Neural Networks and Backpropagation](https://cs231n.stanford.edu/slides/2026/lecture_4.pdf), same course team. Main flow: linear scores → nonlinear features → MLP → activation → computational graphs/backpropagation. This file's internal footer says April 9, 2025. After an internal numbering gap, printed slide labels differ from PDF page numbers. **SOURCE_MAP.csv uses one-based PDF pages throughout.**

SVM is introduced before the Lecture 3 optimization flow, using [CS231n Linear Classification](https://cs231n.github.io/linear-classify/). Supporting readings: [Classification](https://cs231n.github.io/classification/), [Optimization I](https://cs231n.github.io/optimization-1/), [Optimization II](https://cs231n.github.io/optimization-2/), and [Foundations of Computer Vision, Chapter 9](https://visionbook.mit.edu/intro_to_learning.html). These are conceptual references, not runtime dependencies.

The PyTorch sketch was checked against the official [SGD API](https://docs.pytorch.org/docs/stable/generated/torch.optim.SGD) and [cross_entropy API](https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.loss.CrossEntropyLoss.html). The presentation uses the mean reduction and unnormalized logits, with explicit regularization rather than additional optimizer weight decay. This sketch was reviewed, not executed with PyTorch; the complete reference MLP uses pure Python and is numerically checked.

## Figure ledger

| Local artifact | Deck slides | Actual source / transformation | Credit / rights |
|---|---|---|---|
| assets/source-nonlinearity.png | 29 | Lecture 4, PDF p.16, crop (32,76,218,241) PDF points, rendered at 3×. Original points, axes, colors, and geometry retained; title/footer/text excluded. | CS231n course team. Reused educational source figure; no new license asserted. |
| assets/source-transform.png | 30 | Lecture 4, PDF p.17, crop (30,76,652,254), rendered at 3×. Original input plot, transform arrow, and polar-coordinate plot retained. | CS231n course team. Reused educational source figure; no new license asserted. |
| assets/network.svg | 1, 33 | New editable vector drawing informed by Lecture 4 pp.20,25. Schematic 3–4–2 nodes; equations use general D–H–C. Biases omitted from drawing, included in equations. | Original implementation for this deck. |
| assets/score-margin.svg; live score plot | 5, 9 | New SVG with the Lecture 3 p.12 cat-image scores 3.2, 5.1, −1.7, ordered cat/car/frog; threshold 2.2 from Δ=1. | Numerical source credited; new vector rendering. |
| assets/hinge.svg | 6 | New exact plot of max(0,1−m), following Linear Classification notes. | Original vector rendering. |
| assets/svm.svg | 10 | New exact binary schematic with w=(1,0), b=0, margin planes x₁=±1, support vectors circled. | Original vector rendering. |
| assets/landscape.svg; live rate/noise plots | 15, 20, 25 | New exact contours and trajectories for L=(θ₁²+3θ₂²)/2, start (2,−1). Noise demo samples from 16 symmetric per-example linear perturbations using fixed seed 1729. Inspired by Lecture 3 gradient/SGD discussion. | Original synthetic mathematical demonstration; not empirical neural-network data. |
| assets/batches.svg | 21 | New schematic dataset, one highlighted minibatch. Inspired by Lecture 3 p.50. | Original vector rendering. |
| assets/mlp-blocks.svg | 31 | New block diagram corresponding to x → affine → φ → affine → scores, following Lecture 4 pp.14–20. | Original vector rendering. |
| assets/neuron.svg | 34 | New abstract weighted-sum/activation diagram, following Lecture 4 pp.34–37. No biological images reused. | Original vector rendering. |
| assets/relu.svg, assets/activations.svg | 36, 37 | New exact response curves. Leaky ReLU slope 0.1. Axes show actual function values; panel scales differ. Lecture 4 p.24 provides activation context. | Original vector rendering. |
| Live XOR plot | 38 | New exact four-point XOR construction and two ReLU features. Correspondence to nonlinear feature principle in Lecture 4 pp.16–18. | Original mathematical demonstration. |
| assets/training-graph.svg; live scalar graph | 40, 41 | New graph drawings. Training objective follows Lecture 4 pp.41–44; scalar (a+b)c example follows pp.45–64 and Optimization II. Many source frames combined into grouped reveals. | New rendering of standard computational examples. |
| vendor/ | all math | KaTeX JS, CSS, fonts copied from the existing Image Classification deck's vendored distribution. Build-time math rendering; fonts remain local. | MIT, see vendor/KaTeX-LICENSE.txt. |
| source/style.css, source/app.js, controls.html | entire deck | Adapted from the existing local lectures/Image_Classification project to retain approved CS172 presentation style and controls. | Existing course project. |

## Numerical and editorial adaptations

The three-example score table preserves all nine source values, with rows explicitly reordered cat/car/frog. Hinge losses are newly calculated: 2.9, 0, 12.9, mean 5.2667. The L2 convention uses λ/2 throughout, so the regularizer gradient on W is λW; the source sometimes omits the half. Binary geometry uses signed labels t to avoid silently changing multiclass label notation. Gradient and SGD examples are explicitly separate full-gradient and sampled-gradient examples.

One fragment per slide, the manifest, SOURCE_MAP.csv, and SPEAKER_NOTES.md preserve source correspondence after edits. The original reference PDFs are not required to present and are not bundled in the portable ZIP. Use source/references/README.md to retrieve them for crop reproduction.
