# Image Classification: teaching plan

Audience: third-year undergraduate CS students who know calculus, linear algebra, probability, and Python. The core route takes about 90 minutes with selected details assigned as reading. For two 45-minute meetings, finish the first meeting after the validation discussion, then recap nearest-neighbor limitations before introducing parametric models. The full route including optional material takes about 98 minutes; a 90-minute route is given below.

## Intended learning outcomes and evidence

| Outcome | In-class evidence | Homework evidence |
|---|---|---|
| Explain semantic versus pixel similarity | Challenge photos and equal-distance figure, slides 4–9 and 32 | Explain why equal pixel distances need not indicate equal perceptual changes. |
| Implement and compare k-NN with L1/L2 | Hand calculation, code inspection, boundary experiments, slides 14–20 | A correct implementation with a controlled comparison. |
| Design a valid model-selection protocol | Training/test misuse discussion and split design, slides 26–31 | A justified validation protocol with leakage prevention. |
| Compute and interpret linear class scores and multiclass regions | Matrix calculation and boundary manipulation, slides 36–41 | Scores, prediction, and active pairwise decision boundaries. |
| Derive and evaluate softmax cross-entropy | Normalization, loss behavior, exit check, slides 46–53 | Stable numerical loss and a derivation from likelihood. |
| Diagnose underfitting and overfitting; compare classifier tradeoffs | Same-data k-NN panels and complexity plots, slides 22–24; comparison, slide 42 | Interpret train/validation errors and compare query cost, storage, and representation limits. |

The opening agenda previews the sequence, and the exit check assesses key concepts. The inserted challenge slide explicitly connects numerical image inputs to the appearance variations that follow.

## Prerequisite review

Before class, students should be able to multiply a C×D matrix by a D-vector, evaluate L1 and L2 norms, recognize argmin/argmax, and use log(ab)=log(a)+log(b). Review array shape, integer versus floating-point arithmetic, and why exp(s) is positive. A two-minute warm-up can ask for a matrix product and the distance between (0,0) and (1,1).

## Timed route

| Minutes | Slides | Teaching purpose and student action |
|---|---|---|
| 0–4 | 1–2 | Opening and lecture agenda. |
| 4–14 | 3–11 | Specify the task, diagnose variation, connect representations to learning. |
| 14–25 | 12–17 | Derive nearest neighbor, calculate distances, inspect cost and code. |
| 25–34 | 18–20 | Predict how k and the distance metric change decisions. |
| 34–46 | 21–27 | Diagnose underfitting/overfitting, relate flexibility to data, design splits. |
| 46–51 | 28–31 | Explain cross-validation and interpret a validation curve. |
| 51–56 | 32–33 | Discuss the equal-distance figure and articulate nearest-neighbor limitations. |
| 56–73 | 34–42 | Compute scores, inspect templates, compare binary/multiclass regions and classifiers. |
| 73–80 | 43–46 | Motivate a loss and normalize scores. |
| 80–91 | 47–51 | Derive cross-entropy, likelihood, and numerical stability. |
| 91–96 | 52–53 | Recap and collect an individual exit check. |
| 96–98 | 54 | Reading list and optional classical-method topics. |

For 90 minutes, assign slides 24, 28, and 51 as guided reading (about eight minutes saved). Preserve the noisy-data example, split-design discussion, matrix calculation, multiclass extension, and cross-entropy derivation. The four section dividers are slides 12, 21, 34, and 43; each is a short verbal bridge.

## Planned interactions

1. **Distance calculation, slide 14 (45 seconds).** Students calculate L1 before the answer appears. Follow with L2 and ask whether the ranking of two candidates must stay the same.

2. **k-NN experiment, slide 18 (3 minutes).** The initial query is near a marked isolated blue example. Ask students to predict what happens when k changes from 1 to 3, then confirm the readout changes from blue to red. The same synthetic dataset remains fixed. Avoid implying increasing k always improves accuracy.

3. **Metric comparison, slide 20 (2 minutes).** Both panels start at q=(0,0), with x^(1)=(1,0) labeled A and x^(2)=(0.6,0.6) labeled B. Students calculate L1 distances 1 and 1.2, then L2 distances 1 and √0.72. The prediction changes from A to B. Move the shared query to compare other locations. Explain that metric changes can alter regions, but need not change every prediction.

4. **Generalization diagnosis, slide 22 (3 minutes).** Before revealing k=1, ask whether it will improve validation error. Training error reaches zero but validation error rises from 6.4% to 14.5%. The panels share all data and differ only in k. Explain that the synthetic training labels include six flips while the validation grid has clean labels. The dashed curve is known only because this is a constructed example.

5. **Protocol vote, slide 26 (2 minutes).** Ask students to accept or reject each proposal before its consequences appear. Discuss the difference between using training data and leave-one-out evaluation.

6. **Split-design prompt, slide 27 (2 minutes).** “Your images are adjacent frames from ten videos. Would a random image split estimate performance on an eleventh video?” Expected reasoning: keep frames from a source video together when evaluating generalization to new videos.

7. **Visual-view builds, slide 38 (about 1 minute).** Reveal the reshape, score, full-image templates, and interpretation separately. Before build 1, ask what changes when a row of weights becomes a grid. Expected answer: the layout changes, while entry order, dot product, and score remain the same. Use the four builds inside the existing linear-classification time block.

8. **Boundary experiment, slide 39 (2 minutes).** Keep a and b fixed and change c. Then rotate the normal. Identify the equality of competing scores as the decision boundary. If a=b=0, no unique line exists.

9. **Multiclass regions, slide 40 (2 minutes).** Ask why the upper part of x1=0 is dashed. Although s1=s3 there, s2 is larger, so crossing the line does not change the winner. Ask students to express the class-3 region as x1≤0 and x2≤0.

10. **Classifier comparison, slide 42 (1 minute).** Fix D and C and double N. Direct nearest-neighbor storage and distance work double; the trained linear model’s parameter count and score-evaluation cost do not. Do not infer that one method must be more accurate.

11. **Softmax experiment, slide 47 (2 minutes).** Raise the correct logit, then raise a competing logit. Predict the effect on the correct-class probability and loss before changing the slider.

12. **Probability-to-loss connection, slide 48.** Recompute p_cat from the fixed scores shown on the slide, then locate the highlighted point on the curve. Both the x-coordinate (0.13) and y-coordinate (2.04) use rounded values from this same example.

13. **Exit check, slide 53 (2 minutes).** Collect individual answers before revealing them. The provided PDF includes the answers and is an instructor reference, not an unrevealed quiz handout.

## Homework prompts

### A. k-NN and evaluation

Implement k-NN on CIFAR-10 or a balanced subset sized for available computers. Use float32 before subtraction, deterministic tie handling, and chunked distance computation if memory is limited. Compare k∈{1,3,5,7,9} with L1 and L2 using a fixed validation split. Report validation accuracy and prediction time. Specify the subset size and split seed. Choose the final setting before evaluating the test set. Use only training data for any fitted preprocessing.

Assess: correctness of distance and voting, array shapes, faithful model selection, reproducibility, and a failure analysis grounded in retrieved images. Do not grade only the highest accuracy. If using a subset, do not compare its results directly with full-dataset reported numbers.

### B. Linear scores and geometry

Using slide 37, compute all three scores and the predicted label. Derive the pairwise boundary between cat and dog: `(w_cat − w_dog)^T x + (b_cat − b_dog) = 0`. Explain why one class’s zero-score plane does not generally equal a multiclass decision boundary. Give a nonlinear feature that makes XOR separable.

Answer checks: scores (−96.8, 437.9, 60.75), predicted dog. For XOR with same-sign coordinates in one class, x₁x₂ separates the signs.

### C. Softmax and stability

For logits (3.2, 5.1, −1.7), compute the probability vector and cross-entropy for true class cat. Add a common constant to all logits and explain why probabilities do not change. Implement the stable loss without first forming log of an explicitly normalized probability. Verify equal logits produce log C and an extreme wrong prediction produces a large finite loss for finite inputs.

Answer checks: probabilities approximately (0.12998, 0.86905, 0.000968), loss approximately 2.04036. Use the exact computation as authoritative for final numerical grading. Explain that zero loss is approached, not attained, for finite logits with more than one class.

### D. Generalization and representation

Use the provided synthetic-data generator to reproduce the train/validation error comparison for k=61,5,1. Explain why the zero training error at k=1 does not identify the best model. Distinguish statistical flexibility from query-time cost. In the optional visual-word pipeline, explain why the vocabulary must be fitted only on training descriptors, and what spatial information a global histogram discards.

Assess: correct error interpretation, leakage prevention, and an explanation grounded in the model’s decisions rather than a universal claim that larger models always overfit.

## Common misconceptions to address

- Raw-pixel k-NN limitations do not imply retrieval in a learned embedding is useless.
- Odd k does not prevent every multiclass vote tie.
- A higher training score does not establish better generalization.
- Test-set selection leaks information even without gradient-based fitting on test examples.
- A row of W is a signed discriminative template, not necessarily an ordinary image or a Euclidean prototype.
- Softmax probabilities are model outputs and may be poorly calibrated.
- The loss uses the true class probability, not whichever class has the largest score.

## Reference corrections and scope

The ship score in the source example becomes **60.75** after including its −1.2 bias. Complexity includes D explicitly. The zero softmax loss is an infimum for finite multiclass logits. The binary geometric demo uses equality of two class scores; the multiclass extension shows that only maximal-score ties form active class boundaries. The feature-space points are synthetic. The cross-validation figure is the original CS231n example, whose mean validation accuracy peaks near k=7. Regularization and optimization are reserved for the next lecture.

## Supplementary classical methods

The reading list on slide 54 identifies bag of visual words and spatial pyramid matching as optional topics. Sivic & Zisserman (ICCV 2003) introduces visual-word retrieval: local descriptors are quantized using a learned vocabulary and pooled into histograms. Lazebnik, Schmid & Ponce (CVPR 2006) adds coarse spatial layout for recognition. There is no separate visual-word lecture slide. Homework remains in this teaching plan.

## Nearest-neighbor notation

Use the same symbols throughout slides 13–20: query q, stored vector x^(i), label y^(i), example index i, coordinate index j, dataset size N, dimension D, and neighbor count k. Parenthesized superscripts index examples; they are not exponents. NumPy rows and indices are zero-based, unlike the displayed mathematical convention 1,…,N. In the metric demonstration A/B are class labels; the training vectors are x^(1)/x^(2). On slide 22, every percentage is an error rate: lower is better.
