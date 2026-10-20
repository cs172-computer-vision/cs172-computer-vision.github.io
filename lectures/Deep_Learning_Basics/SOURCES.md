# Sources and figure provenance

This revised 37-slide lecture begins after **Support Vector Machines**. Binary geometry, duality, slack, kernels, multiclass hinge calculations and their dedicated demonstrations have moved to ../Support_Vector_Machines/. This deck retains only the short objective/regularization bridge before teaching optimization and learned representations.

## Primary references

- [CS231n 2026 Lecture 3](https://cs231n.stanford.edu/slides/2026/lecture_3.pdf): regularization, gradients, gradient descent, minibatches, and the brief optimizer overview.
- [CS231n 2026 URL, Lecture 4](https://cs231n.stanford.edu/slides/2026/lecture_4.pdf): nonlinear features, MLPs, activations, graphs and backpropagation. The file’s footer says2025; later printed slide labels differ from physical PDF pages. SOURCE_MAP.csv consistently uses one-based PDF pages.
- [Optimization I](https://cs231n.github.io/optimization-1/), [Optimization II](https://cs231n.github.io/optimization-2/), and [Linear Classification: softmax section](https://cs231n.github.io/linear-classify/).
- [Foundations of Computer Vision, Chapter9](https://visionbook.mit.edu/intro_to_learning.html), §9.5 empirical risk and §9.7.3 classification/softmax.
- Official [PyTorch SGD](https://docs.pytorch.org/docs/stable/generated/torch.optim.SGD) and [cross-entropy](https://docs.pytorch.org/docs/stable/generated/torch.nn.modules.loss.CrossEntropyLoss.html) support the framework sketch. The sketch is reviewed rather than executed with PyTorch; the complete checked reference is dependency-free Python.

## Figure ledger

| Local artifact | Current slides | Source / adaptation |
|---|---|---|
| assets/network.svg | 1,24 | New vector network informed by Lecture4 pp.20,25. Schematic3–4–2 nodes; equations have general dimensions. Biases included in algebra, omitted from drawing. |
| assets/landscape.svg; rate/noise renderers | 6,11,16 | Exact synthetic L=(theta1²+3theta2²)/2, start(2,−1). Shared deterministic drawing; seeded finite-data noise example. Not an empirical neural-network surface. |
| assets/batches.svg | 12 | Original vector dataset schematic, following Lecture3 p.50. |
| assets/source-nonlinearity.png | 20 | Original Lecture4 physical p.16 diagram, crop(32,76,218,241) PDF points, 3×. Red inner class and blue outer ring retained. |
| assets/source-transform.png | 21 | Original Lecture4 physical p.17 diagrams/arrow, crop(30,76,652,254),3×. Original transform and geometry retained. |
| assets/mlp-blocks.svg | 22 | New affine–activation–affine block diagram following Lecture4 pp.14–20. |
| assets/neuron.svg | 25 | New abstract weighted-sum/activation schematic following Lecture4 pp.34–37. No biological image reused. |
| assets/relu.svg, activations.svg | 27,28 | Exact activation responses; leaky slope.1, actual y scales shown separately. Lecture4 p.24. |
| Live XOR plot | 29 | Exact four-point XOR and two ReLU features. Original mathematical construction illustrating the nonlinear-feature idea. |
| assets/training-graph.svg; scalar graph | 31,32 | New graphs following Lecture4 pp.41–44 and45–64; source build sequences merged into reversible stages. |
| vendor/ | All math | KaTeX JS/CSS/fonts inherited from Image Classification. MIT, see vendor/KaTeX-LICENSE.txt. |
| source/style.css, app.js, controls.html | All | Adapted from local Image Classification to preserve the CS172 style and controls. |

Credit for original Stanford figures: CS231n course team, credited in its footer as “Fei-Fei, Adeli, Durante, Johnson, Xiang.” Reused educational figures have no new license asserted. Recreated vectors and synthetic calculations are original implementations for this deck.

## Coherent examples after the split

The complete MLP forward pass still gives z=(3,−3),h=(3,0),s=(3,−3), but now reports first-class softmax cross-entropy log(1+exp(−6))≈.002475685. The Python reference model likewise uses stable softmax cross-entropy with weight-only λ/2 L2. Its gradients are independently checked by central differences. The regularizer derivative is λW.

Retained slide IDs preserve existing links; counters, notes, source mappings, teaching-plan references, and exit checks have been updated to37slides. The original Stanford PDFs are optional authoring references, not runtime dependencies.
