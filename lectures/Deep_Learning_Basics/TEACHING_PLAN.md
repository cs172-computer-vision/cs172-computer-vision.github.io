# Deep Learning Basics: teaching plan

CS172 Computer Vision I · Jiayuan Gu · ShanghaiTech University. 37 slides, 90 minutes. Prerequisites: Image Classification and the separate Support Vector Machines lecture. SVM geometry, duality, kernels and hinge derivations belong there.

## Outcomes

1. Interpret gradients and learning-rate behavior.
2. Calculate and implement a mean minibatch SGD update.
3. Track MLP shapes, count parameters, and compute a forward pass.
4. Explain affine collapse and how nonlinear features solve XOR.
5. Trace a scalar graph and distinguish backprop from optimization.

## Timed route

| Elapsed | Minutes | Current slides | Focus |
|---|---:|---|---|
| 0–7 | 7 | 1–4 | Model/objective/update and weight regularization. |
| 7–20 | 13 | 5–9 | Landscape, derivatives, finite differences and checks. |
| 20–30 | 10 | 10–11 | Compute a step; predict learning-rate behavior. |
| 30–45 | 15 | 12–16 | Minibatches; 60-second update; iteration/epoch; noise demo. |
| 45–50 | 5 | 17–18 | Diagnosis, validation, brief optimizer gallery. |
| 50–64 | 14 | 19–25 | Linear limitation, features, MLP, affine collapse, shapes, neuron. |
| 64–75 | 11 | 26–30 | 90-second forward pass; activations; XOR; generalization. |
| 75–85 | 10 | 31–34 | Graph, chain rule, autograd sketch, training loop. |
| 85–90 | 5 | 35–37 | Summary, exit check, comparison and readings. |

## Activities and answers

- Update: theta=(2,−1), mean sample gradient (1,−3), eta=.1 gives (1.9,−.7). Recompute gradients after updates.
- Count: HD+H+KH+K; D=3072,H=100,K=10 gives 308310.
- Forward: z=(3,−3), h=(3,0), s=(3,−3). First-class cross-entropy log(1+exp(−6))≈.002475685. Output scores are unrestricted logits.
- Scalar graph: q=a+b=3, L=qc=−12; derivatives da,db,dc=−4,−4,3. This scalar toy is not a classification loss.
- Exit: W1 shape 3×4; next theta (.7,2.1); without activations, an affine map. Backprop computes gradients; SGD uses them.

## Homework

- **SGD (35%)**: learning rates with identical initialization/order; batch sizes at equal processed-example budgets; separate data loss and regularization.
- **MLP (40%)**: annotate shapes, implement softmax cross-entropy and a ReLU MLP, verify central differences away from kinks.
- **Interpretation (25%)**: affine collapse, XOR features, gradient noise, and why training loss alone does not establish generalization.

Choose settings with validation data, and evaluate the test set only after choices are fixed. The pure-Python reference now uses softmax cross-entropy. Prior SVM exercises are in the SVM teaching plan. Retained slide IDs preserve URLs despite renumbering.
