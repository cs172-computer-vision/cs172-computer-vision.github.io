# Image Classification: teaching plan

Audience: third-year undergraduate CS students who know calculus, linear algebra, probability, and Python. The core route takes about 90 minutes with selected details assigned as reading. For two 45-minute meetings, finish the first meeting after slide 33, then recap nearest-neighbor limitations before introducing parametric models. The full route including optional material takes about 100 minutes; a 90-minute route is given below.

## Intended learning outcomes and evidence

| Outcome | In-class evidence | Homework evidence |
|---|---|---|
| Explain semantic versus pixel similarity | Challenge photos and equal-distance figure, slides 4–9 and 32 | Explain why equal pixel distances need not indicate equal perceptual changes. |
| Implement and compare k-NN with L1/L2 | Hand calculation, code inspection, boundary experiments, slides 14–20 | A correct implementation with a controlled comparison. |
| Design a valid model-selection protocol | Training/test misuse discussion and split design, slides 26–31 | A justified validation protocol with leakage prevention. |
| Compute and interpret linear class scores and multiclass regions | Matrix calculation and boundary manipulation, slides 36–41 | Scores, prediction, and active pairwise decision boundaries. |
| Interpret softmax as a probability model and derive cross-entropy from label likelihood | Softmax exploration, shared-constant question, same-argmax comparison and exit check, slides 43–53 | Probability calculation, stable loss and likelihood derivation; distinguish model probabilities from calibration. |
| Diagnose underfitting and overfitting; compare classifier tradeoffs | Same-data k-NN panels and complexity plots, slides 22–24; comparison, slide 42 | Interpret train/validation errors and compare query cost, storage, and representation limits. |

The opening agenda previews the sequence, and the exit check assesses key concepts. The inserted challenge slide explicitly connects numerical image inputs to the appearance variations that follow.

## Prerequisite review

Before class, students should be able to multiply a C×D matrix by a D-vector, evaluate L1 and L2 norms, recognize argmin/argmax, and use log(ab)=log(a)+log(b). Review array shape, integer versus floating-point arithmetic, and why exp(s) is positive. A two-minute warm-up can ask for a matrix product and the distance between (0,0) and (1,1).

## Timed route

| Minutes | Slides | Teaching purpose and student action |
|---|---|---|
| 0–3 | 1–2 | Opening and agenda. |
| 3–12 | 3–11 | Specify classification, diagnose appearance variation, connect representations to learning. |
| 12–25 | 12–20 | Calculate distances, inspect code/cost, predict k and metric effects. |
| 25–40 | 21–31 | Diagnose generalization, design splits, interpret validation results. |
| 40–45 | 32–33 | Explain pixel-distance limitations and the need for a compact model. |
| 45–62 | 34–42 | Compute scores, reshape templates, manipulate boundaries, compare classifiers. |
| 62–76 | 43–47 | Interpret scores, define categorical probabilities, explore softmax, then reveal the label. |
| 76–85 | 48–51 | Turn label likelihood into mean negative log likelihood; inspect cross-entropy behavior. |
| 85–90 | 52–54 | Summary, individual exit check, readings. |

This 90-minute core route assigns slides 24 (data size), 28 (cross-validation detail) and 51 (stable code) as guided reading. Preserve the fixed-data generalization example, split-design prompt, matrix calculation and probability-to-loss bridge. For the 100-minute full route, allow 3 minutes each for slides 24 and 28 and 4 minutes for the stable-code derivation. For two 45-minute meetings, divide after slide 33, then begin the second meeting with a nearest-neighbor recap. Section dividers are slides 12, 21, 34 and 43.

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

11. **Scores and probabilities, slides 44–45 (2 minutes).** Use the same score table to show that raw scores are not probabilities, then define a categorical model and softmax. Reveal exponentiated weights and normalized probabilities in two builds. Argmax preservation and the probability-ratio identity can be explained aloud if needed; they no longer require a separate slide.

12. **Softmax exploration, slide 46 (2 minutes).** Let students change one logit and observe the probability redistribution. Ask the displayed open question: what happens if the same constant is added to every logit? Do not reveal an answer on this slide. Instructor answer: the common exponential factor cancels, so probabilities are unchanged. This motivates the later stable implementation. Keep the extra time for student reasoning.

13. **Observed-label bridge, slide 47 (1 minute).** Both hypothetical distributions predict car. Ask which supports the observed cat label better. B assigns probability 0.3 instead of approximately 0.13. The answer stays in notes; explain how this motivates a likelihood objective.

14. **Likelihood and cross-entropy, slides 48–49 (4 minutes).** Derive product → log sum → mean negative log likelihood. The mean already supplies the dataset objective, so a second dataset-average slide is unnecessary. Name the per-example penalty cross-entropy and connect it to the plotted (0.13,2.04) example. The expanded one-hot identity and calibration caveat are available in notes rather than on the slide.

15. **Exit check, slide 53 (2 minutes).** Collect individual answers before revealing them. Equal logits imply p=(1/2,1/2); a known target then gives loss log 2. The PDF includes completed answers and is an instructor reference.

## Homework prompts

### A. k-NN and evaluation

Implement k-NN on CIFAR-10 or a balanced subset sized for available computers. Use float32 before subtraction, deterministic tie handling, and chunked distance computation if memory is limited. Compare k∈{1,3,5,7,9} with L1 and L2 using a fixed validation split. Report validation accuracy and prediction time. Specify the subset size and split seed. Choose the final setting before evaluating the test set. Use only training data for any fitted preprocessing.

Assess: correctness of distance and voting, array shapes, faithful model selection, reproducibility, and a failure analysis grounded in retrieved images. Do not grade only the highest accuracy. If using a subset, do not compare its results directly with full-dataset reported numbers.

### B. Linear scores and geometry

Using slide 37, compute all three scores and the predicted label. Derive the pairwise boundary between cat and dog: `(w_cat − w_dog)^T x + (b_cat − b_dog) = 0`. Explain why one class’s zero-score plane does not generally equal a multiclass decision boundary. Give a nonlinear feature that makes XOR separable.

Answer checks: scores (−96.8, 437.9, 60.75), predicted dog. For XOR with same-sign coordinates in one class, x₁x₂ separates the signs.

### C. Softmax and stability

For logits (3.2, 5.1, −1.7), compute the probability vector without using a label. Then reveal true class cat and compute cross-entropy. Compare with the hypothetical distribution (0.3,0.6,0.1): why does accuracy stay unchanged while loss decreases? Add a common constant to all logits and explain why probabilities do not change. Implement the stable loss without first forming log of an explicitly normalized probability. Verify equal logits produce log C and an extreme wrong prediction produces a large finite loss for finite inputs.

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

The ship score in the source example becomes **60.75** after including its −1.2 bias. Complexity includes D explicitly. The zero softmax loss is an infimum for finite multiclass logits. The binary geometric demo uses equality of two class scores; the multiclass extension shows that only maximal-score ties form active class boundaries. The feature-space points are synthetic. The cross-validation figure is the original CS231n example, whose mean validation accuracy peaks near k=7. Regularization and parameter optimization are covered in the separate SVM and Deep Learning Basics lectures.

## Supplementary classical methods

The reading list on slide 54 identifies bag of visual words and spatial pyramid matching as optional topics. Sivic & Zisserman (ICCV 2003) introduces visual-word retrieval: local descriptors are quantized using a learned vocabulary and pooled into histograms. Lazebnik, Schmid & Ponce (CVPR 2006) adds coarse spatial layout for recognition. There is no separate visual-word lecture slide. Homework remains in this teaching plan.

## Nearest-neighbor notation

Use the same symbols throughout slides 13–20: query q, stored vector x^(i), label y^(i), example index i, coordinate index j, dataset size N, dimension D, and neighbor count k. Parenthesized superscripts index examples; they are not exponents. NumPy rows and indices are zero-based, unlike the displayed mathematical convention 1,…,N. In the metric demonstration A/B are class labels; the training vectors are x^(1)/x^(2). On slide 22, every percentage is an error rate: lower is better.
