# Deep Learning Basics: teaching plan

CS172 Computer Vision I · Jiayuan Gu · ShanghaiTech University. Audience: third-year CS students familiar with calculus, linear algebra, probability, Python, and the previous Image Classification lecture. Duration: 90 minutes including activities. No fixed prerequisites in convex duality or neural-network frameworks.

## Measurable outcomes

1. Compute the sum-of-hinges multiclass SVM loss and distinguish score margin from accuracy (slides 4–10).
2. Explain weight regularization and calculate a minibatch SGD update, including averaging and the learning-rate sign (11–27).
3. Track the dimensions and parameter count of a two-layer MLP and calculate its forward pass (31–35).
4. Explain why affine composition needs nonlinear activations; demonstrate XOR separation in hidden coordinates (29–39).
5. Trace forward values and local chain-rule derivatives in a small computational graph; distinguish differentiation from optimization (40–43).

## Timed route

| Elapsed | Minutes | Slides | Teaching focus / activity |
|---|---:|---|---|
| 0–4 | 4 | 1–3 | Recall score, loss, and update; introduce agenda. |
| 4–12 | 8 | 4–8 | Scores → margin → hinge → multiclass objective. Pairs calculate car/frog losses for 45 seconds before the builds. Outcome 1. |
| 12–17 | 5 | 9–10 | Change the rival score before changing the true score. Ask when prediction is correct but loss remains positive. Contrast score and geometric margins. Outcome 1. |
| 17–24 | 7 | 11–13 | Data loss + weight regularizer; 30-second norm calculation. Compare hinge with the softmax objective from the previous lecture. Outcome 2. |
| 24–32 | 8 | 14–18 | Landscape, negative gradient, finite differences, efficient derivatives. Predict the sign of the first coordinate derivative. Outcome 2. |
| 32–38 | 6 | 19–20 | Compute a full-gradient step, then predict learning-rate behavior at 0.6 and 0.8. Threshold is specific to the toy quadratic. Outcome 2. |
| 38–47 | 9 | 21–25 | Full data versus minibatches; work the numerical minibatch update for 60 seconds. Explain iteration/epoch and compare seeded batch-size paths. Outcome 2. |
| 47–52 | 5 | 26–27 | Diagnose training trends and validation behavior. Other optimizers: about one minute, without update derivations. Outcome 2. |
| 52–61 | 9 | 28–33 | Linear limitation → feature transform → MLP. Predict what happens without activations; identify matrix shapes. Outcomes 3–4. |
| 61–69 | 8 | 34–37 | Neuron, 90-second paired forward pass, ReLU and brief activation gallery. Outcome 3. |
| 69–77 | 8 | 38–39 | XOR prediction then hidden-space switch; discuss capacity and validation. Outcome 4. |
| 77–85 | 8 | 40–43 | Brief graph/backprop introduction, scalar forward/backward builds, autograd code, and training-system map. Outcome 5. |
| 85–90 | 5 | 44–46 | Summary, 90-second exit check, 30-second comparison, reading links. Outcomes 1–2, 4–5. |

If time is tight, shorten live demonstrations or the optimizer gallery. Preserve the SVM calculation, SGD calculation, affine-collapse explanation, and MLP forward pass. Extended optimizer derivations, biological detail, kernel SVMs, and full matrix backpropagation are outside the core lecture.

## Assessment and answer guidance

- Slide 8: losses 2.9, 0, 12.9; mean 5.2667. Look for excluding the correct class and averaging over examples.
- Slide 12: squared L2 norms 1 and 0.25. Both L1 norms are 1; the example does not show that L1 strictly prefers one.
- Slide 23: mean gradient (1, −3), next parameters (1.9, −0.7). Look for the correct averaging and subtraction signs.
- Slide 33: parameter count HD + H + CH + C. For D=3072, H=100, C=10: 308,310.
- Slide 35: z=(3, −3), h=(3, 0), s=(3, −3), prediction first class, hinge data loss 0 if the first class is true.
- Slide 41: q=3, L=−12, derivatives with respect to a, b, c are −4, −4, 3. This scalar toy is not a classification loss.
- Exit check: 0.5; (0.7, 2.1); an affine map. Backpropagation computes gradients and SGD uses them.

## Homework (kept off the slides)

1. **SVM and regularization (25%)**: implement mean multiclass hinge loss with a weight-only λ/2 norm penalty. Test invariance to adding a common constant to all scores; explain why a correct prediction may incur loss. Outcomes 1–2.
2. **SGD experiment (30%)**: implement shuffled minibatches; log iterations and epochs. On a fixed synthetic dataset, compare three learning rates with identical initialization and order, then compare two batch sizes at equal example-processing budgets. Report mean data losses separately from the regularizer. Outcome 2.
3. **MLP and gradients (35%)**: implement two affine layers with ReLU; annotate all shapes, count parameters, and check selected gradients by central differences away from kinks. Use the supplied pure-Python reference only after attempting the derivation. Outcomes 3–5.
4. **Interpretation (10%)**: explain affine collapse, why XOR needs a nonlinear representation, and why improved training loss alone is insufficient evidence of generalization. Outcome 4.

Use validation data for choices; evaluate the test set once after those choices are fixed. Grade numerical correctness, shape consistency, controlled comparisons, and reasoning rather than the best reported accuracy.

## Notation and implementation conventions

x is a column feature vector; i indexes examples; y_i is a class index; j is a competing class; θ contains all parameters. Binary geometric SVM uses signed labels t_i. Hidden activation is φ; hidden vector is h; learning rate is η. The regularizer is λ/2 times summed weight-matrix squared Frobenius norms; biases are excluded. Mathematical first class maps to Python index 0. Batch implementations use rows of examples, so they may transpose the weight convention explicitly.
