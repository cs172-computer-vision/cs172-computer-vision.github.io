# Support Vector Machines: teaching plan

CS172 Computer Vision I · Jiayuan Gu · ShanghaiTech University. Prerequisites: vectors, dot products, norms, derivatives, and linear classification. Introduce the required constrained-optimization concepts in class.

Full route: 100 minutes including activities. A 90-minute core route omits detailed substitution on slide 16 and the extended soft-KKT table on 29 (about 4 minutes), and shortens six demonstration/discussion pauses by one minute each. Preserve the dual worked example, slack-to-hinge derivation, kernel identity, and multiclass calculation.

## Learning outcomes

1. Compute functional/geometric margins, explain canonical scaling, and formulate maximum-margin learning (3–12).
2. Derive the hard dual, interpret support multipliers/KKT, recover the classifier, and explain feasible pair optimization (13–21).
3. Interpret slack, derive the soft dual box constraints, and convert summed C penalties to mean-loss λ penalties (22–29, 45–46).
4. Evaluate an explicit kernel identity and explain nonlinear classification through feature-space inner products (30–38).
5. Distinguish multiclass reductions from a joint loss; calculate hinge values, score/weight gradients and an update (39–52).

## Full timed route

| Elapsed | Minutes | Slides | Focus / activity |
|---|---:|---|---|
| 0–4 | 4 | 1–2 | Motivation, agenda, prerequisites. |
| 4–20 | 16 | 3–12 | Compare three separators, derive distances, fix scale, compute width, explore rotation. Outcome 1. |
| 20–42 | 22 | 13–21 | Lagrangian, stationarity, substitution, dual constraints, KKT, bias; 45-second two-point solution; SMO pair step. Outcome 2. |
| 42–57 | 15 | 22–29 | Outlier, three slacks, soft objective, fixed-data C demo, alpha≤C, free/bounded supports. Outcome 3. |
| 57–73 | 16 | 30–38 | Feature-space schematic, exact radius feature, kernel substitution, polynomial pair, RBF, PSD and costs. Outcome 4. |
| 73–85 | 12 | 39–44 | Notation change, reductions versus joint scores, three-example calculation, score demo. Outcome 5. |
| 85–95 | 10 | 45–52 | Eliminate slack, C/λ, gradients and one update, minibatches, learned scores. Outcomes 3, 5. |
| 95–100 | 5 | 53–55 | Summary, 90-second exit check, comparison and readings. |

## Numerical anchors and anticipated misconceptions

- Running dataset: negative (-2,-1), (-2,1), (-1,0); positive (1,0), (2,-1), (2,1). Optimum w=(1,0), b=0. One-sided margin 1, full width 2. The two nearest examples have alpha=0.5; others zero.
- Positive scaling of w,b preserves geometry, while functional margin changes. Canonical full width is 2/||w||.
- Two-point dual D(a)=2a−2a² peaks at a=0.5, primal=dual=0.5. The equality comes from the unregularized intercept.
- Minimum slack at signed margins 1.4, 0.6, −0.3 is 0, 0.4, 1.3. Zero slack does not define support. Alpha=C does not necessarily mean misclassified.
- The positive (-1.6,0.25) in the C demo lies inside the negative convex hull. No C makes the data linearly separable.
- Phi(x)=(1,√2x1,√2x2,x1²,√2x1x2,x2²) gives k(x,z)=(1+x·z)². For x=(1,2), z=(3,−1), k=4.
- Ring squared radii: 0.3025, 2.25. Threshold 1 separates them. RBF plots are separately fitted models on those points.
- Joint hinge losses: 2.9, 0, 12.9; mean 5.2667. Fix class order cat/car/frog. Sum-of-hinges differs from one-vs-rest and maximum-rival formulations.
- Mean binary normalization gives λ=1/(CN), not 1/C, for the stated sum-slack objective at fixed N.
- Update: w=(.2,−.1), x=(1,2), t=1, λ=.1, η=.1 gives gw=(−.98,−2.01), gb=−1; w+=(.298,.101), b+=.1, signed score .6, hinge data loss .4.
- Exit: full width 1; slack .4 and correct label; multiclass loss .5; dual uses inner products.

## Assessment and homework

1. **Margin and dual (30%)**: derive the two-point solution; verify six-point KKT; explain why changing one alpha violates equality.
2. **Slack and normalization (20%)**: eliminate xi, derive alpha bounds, convert C/λ under summed/averaged losses.
3. **Kernels (25%)**: expand the polynomial inner product, test three pairs, compare RBF settings with identical data/C. Separate training fit from validation.
4. **Multiclass implementation (25%)**: summed hinge, weight-only L2 and minibatch subgradients; central differences away from kinks; common score-shift invariance. Source/linear.js is a reference after attempting the exercise.

Keep homework off slides. Grade derivations, normalization, independent checks and controlled comparisons. Fit scaling on training data; choose hyperparameters on validation data; reserve test data for final evaluation.

## Notation

Binary t_i∈{−1,+1}; multiclass y_i∈{1,...,K}; C penalty; k kernel; G Gram matrix. D input dimension, N examples, B batch size. Bias is unregularized. Alpha values are coefficients, not probabilities. State a subgradient convention at kinks.
