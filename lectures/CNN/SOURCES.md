# CNN · Provenance and adaptations

The lesson is an original CS172 teaching treatment informed by the supplied Stanford lecture. Original numerical examples, explanatory prose, diagrams, activities, and implementation are authored for this deck; source slides are not embedded or copied as screenshots. All schematic figures are labeled or explained as teaching constructions rather than trained-model outputs. `SOURCE_MAP.csv` maps each stable slide ID to relevant references and one-based PDF pages; its canonical data is inline in `index.html`.

| Reference | Use and location |
|---|---|
| [Stanford CS231n, supplied Lecture 5 PDF](https://cs231n.stanford.edu/slides/2026/lecture_5.pdf),107 pages | Conceptual progression: spatial structure → filters/channels → shape/cost → pooling → translation. Relevant source frames:17–19,43–44,57–68,87–93,103–106. Repeated animation frames are consolidated into original figures and three numerical interactions. The URL is in a 2026 directory; the actual title/footer says April 14, 2025. Preserve this distinction when citing. |
| [Dive into Deep Learning §7.1](https://d2l.ai/chapter_convolutional-neural-networks/why-conv.html) | Architectural motivation on4–6: locality and parameter sharing. |
| [D2L §7.2](https://d2l.ai/chapter_convolutional-neural-networks/conv-layer.html) | Cross-correlation on8–9 and shared-learning connection on13. The matrix and1D gradient example here are original. |
| [D2L §7.3](https://d2l.ai/chapter_convolutional-neural-networks/padding-and-strides.html) | Stride and padding on16–17; original diagrams. |
| [D2L §7.4](https://d2l.ai/chapter_convolutional-neural-networks/channels.html) | Channel summation on10; original1×1 RGB-value example. |
| [D2L §7.5](https://d2l.ai/chapter_convolutional-neural-networks/pooling.html) | Pooling on26; original matrix and reductions. |
| [PyTorch Conv2d](https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv2d.html) | Operator equation, NCHW, floor in shape formulas, groups/dilation defaults, model implementation. Live stable documentation was checked; APIs used are also validated locally with PyTorch2.8.0. |
| [PyTorch AdaptiveAvgPool2d](https://docs.pytorch.org/docs/stable/generated/torch.nn.AdaptiveAvgPool2d.html) | Global averaging in the original classifier28–30. |
| [PyTorch CrossEntropyLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html) | Raw logits and integer class targets on31. |
| [Araujo, Norris & Sim, “Computing Receptive Fields of Convolutional Neural Networks,” Distill 2019](https://distill.pub/2019/computing-receptive-fields/) | Single-path receptive-field recurrence and interpretation on24–25 and33. Original nested-square visualization and computed trace. Supplementary reading for alignment and branching. |

## Original assets

All 11 SVGs in `assets/` are generated from `source/diagrams.js`: `title`, `flatten`, `pattern`, `dot`, `channels`, `tensors`, `relu`, `stride`, `padding`, `pool`, `network`. The same file draws the live convolution, spatial-size, and receptive-field views. These are vector diagrams authored for this lecture, with no external image dependencies. No generated photographs or uncredited third-party imagery is used.

The 5×5 matrix, kernel, outputs,1D derivative, pooling matrix, parameter/cost comparisons, classifier architecture, and assessment prompts are original worked examples. No accuracy, timing, or student-learning measurements are asserted.

## Substantive clarifications

- Flattening is an invertible reshaping; a dense layer lacks an enforced spatial bias.
- Deep-learning convolution is cross-correlation without kernel flipping.
- General output-size expressions include a floor; simple division assumes exact placement.
- Shape/count formulas in the main lesson assume square kernels, symmetric padding, groups 1, dilation 1, and enabled bias.
- Translation equivariance requires compatible boundary handling and stride alignment. Pooling does not guarantee invariance to arbitrary small shifts.
- MACs omit bias additions, activations, and backward computation, and are distinguished from parameter/activation counts.
- The theoretical receptive field indicates possible dependencies, not uniform measured influence.

## Bundled third-party software

KaTeX JavaScript, CSS, and WOFF2 fonts are reused from the existing course deck. Copyright and MIT license are retained in `vendor/KaTeX-LICENSE.txt`. Check its upstream license and font notices before redistribution. The deck runtime has no CDN or remote import. External links are optional readings/citations only. Source-reference licenses do not grant rights to unrelated illustrations; none are reproduced here.

The bundled KaTeX stylesheet retains its WOFF2 font sources; unused WOFF/TTF fallback URLs were removed because those files are not packaged. This preserves the font selection used in the tested modern browser and keeps every local stylesheet resource reference resolvable.
