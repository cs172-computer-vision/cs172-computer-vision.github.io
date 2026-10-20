# Support Vector Machines: speaker notes

## 01. Support Vector Machines

Opening question: many boundaries classify the training set correctly; what principle selects one? Start with geometry, derive the dual, allow violations and nonlinear features, then return to the learning objective. Prerequisites: dot products, norms and derivatives; introduce Lagrange multipliers here.

## 02. From geometry to a learning objective

Outcomes: calculate geometric margins; derive and interpret primal/dual constraints; connect slack, hinge and C; evaluate kernels through feature maps; calculate joint multiclass loss and a subgradient update. Full route 100 minutes;90-minute core route in teaching plan.

## 03. Start with two classes

Running dataset: negative red squares(-2,-1),(-2,1),(-1,0); positive blue circles(1,0),(2,-1),(2,1). Optimum w=(1,0),b=0. Signed binary labels t; reserve y for class index. Green rings mark support vectors.

## 04. Correct classification leaves many choices

All three lines correctly classify the same data. Their normal vectors have unit norm, so reported minimum signed scores are distances. Ask which is least sensitive to a small perturbation before the reveal.

## 05. The weight vector is normal to the boundary

A tangent displacement satisfies w dot delta=0. Distinguish points x from normal w. The same geometry holds for a hyperplane in D dimensions. Assume w is nonzero.

## 06. Normalize the score to get a distance

Derive using x=x_projection+d w/||w||. Multiplication by t makes positive correspond to correct classification. A negative minimum margin is not a separating solution.

## 07. The score scale is arbitrary

Scale w=(1,0),b=0 by 2: scores double but distances do not. We need a canonical scale. Positive scaling preserves the class assignment; negative scaling flips it.

## 08. Fix the closest functional margin to one

Distinguish one-sided margin 1/||w|| and full width 2/||w||. Rescaling is possible because a separating solution has strictly positive minimum signed score.

## 09. Compute the width of the running example

Ask for full width before revealing. Distances use the synthetic input units. Do not say that scaling w doubles or halves the geometric margin without maintaining the canonical convention.

## 10. Nearest constraints determine the separator

Here(-1,0),(1,0) suffice. Outside points may move while remaining outside without changing this solution. Precise support definition is alpha>0. Equality at a plane alone need not imply a positive coefficient in every optimum.

## 11. Rotate the boundary and measure its margin

Try 30 degrees,b=0: minimum distance sqrt(3)/2. Try 0 degrees,b=.5: margin.5. Reset gives optimum 1. Dashed planes are score±1; they do not necessarily touch data for a nonoptimal candidate.

## 12. Maximum margin becomes a convex problem

Bias is unregularized. Squaring a positive norm preserves its minimizer; the half simplifies derivatives. Convexity does not imply uniqueness of every variable.

## 13. The dual problem

Duality exposes support vectors and inner products, enabling kernels. Derive the dual rather than merely presenting another formula.

## 14. Put the constraints into a Lagrangian

Maximizing over nonnegative alpha makes a positive violation arbitrarily expensive. The dual function minimizes L over primal variables for fixed alpha. Alpha is neither a probability nor a hyperparameter.

## 15. Eliminate the primal variables

Weights lie in the span of data with signed coefficients alpha_i t_i. If sum alpha_i t_i is nonzero, minimizing over b sends the dual function to minus infinity. Keep the b derivative sign correct.

## 16. Substitute the weighted sum back in

Optional algebra-detail slide in 90-minute route. At stationarity the third term is||w||²; expanding the remaining squared norm reveals inner products.

## 17. Maximize a concave quadratic in α

Q_ij=t_i t_j x_i dot x_j is PSD, so D is concave. Separability permits strictly feasible scaling; Slater supports strong duality. There are N dual variables rather than D weight coordinates.

## 18. Complementary slackness identifies support

KKT statements apply at an optimum with feasibility and stationarity. Sparsity is over training examples. Equality alone does not force a nonzero multiplier in degenerate cases.

## 19. Recover the classifier from support vectors

Only use a margin support vector for b, not an arbitrary example. Averaging over such vectors reduces numerical error. Nonlinear kernels may never materialize an explicit feature-space weight vector.

## 20. Solve the dual for two support points

45-second calculation:2-4 a=0. Weight sum is a(-1)(-1,0)+a(1)(1,0)=(1,0). Other four running points have alpha 0 and satisfy constraints, so this also solves the six-point problem.

## 21. Optimize two coefficients at a time

Choose pair, reduce with equality, maximize the 1 D quadratic over its feasible interval, update, check KKT. Platt SMO includes efficient heuristics and caching; the demo is a simpler exact pair search. Soft margin adds upper bounds. For d with entries t_i,-t_j, D(alpha+delta d)=D(alpha)+delta d^T grad D minus half delta² d^T Qd. With positive curvature, differentiate then clip to the interval preserving bounds. If curvature is zero, optimize the resulting linear function at a feasible endpoint. The live solver handles both cases.

## 22. Allow controlled margin violations

After the hard dual, soften the constraints. The objective remains convex.

## 23. One unusual point can reshape the boundary

Original Harvard schematic is separate from the running dataset. Its markers/colors remain unchanged. If data are nonseparable, hard margin is infeasible. The C demo adds a positive point inside the negative convex hull.

## 24. Slack measures a shortfall from the margin

Slack uses functional-score units. Since C>0, optimizing over xi for fixed w,b selects its smallest feasible value. Positive slack need not mean an incorrect label.

## 25. A violation is not always a classification error

For m 1.4,.6,-.3 get slack 0,.4,1.3. Crucial source correction: zero slack also holds for all strictly outside correctly classified points; it does not identify support vectors. Table assumes minimum feasible slack.

## 26. Trade margin width against total slack

Do not claim a universal validation trend or that C directly counts errors. The term is summed slack. Large C cannot create a zero-error linear boundary for nonseparable data.

## 27. Change C while keeping the data fixed

Only C changes. The added positive(-1.6,.25) is in the negative triangle, so hard margin is infeasible. Inspect errors, support count, and primal-dual gap. This is training behavior, not measured generalization.

## 28. Slack adds an upper bound in the dual

Weight/bias stationarity is unchanged. This upper bound is specific to linear slack penalty C sum xi; squared slack gives a different dual. The equality comes from the unregularized bias.

## 29. Read support-vector roles from α

Necessary implications, not converses at degenerate equalities. Alpha=C may still be correctly classified. The demo averages free-support bias estimates or uses KKT bounds if none are free. Extended table optional in 90-minute route.

## 30. Nonlinear boundaries through kernels

A kernel SVM is still linear in its feature space, potentially nonlinear in input space.

## 31. Separation can appear after a feature mapping

The original Harvard 2 D-to 3 D schematic retains its colors and geometry. It is not a computed fit to the next slide. Follow it with an exact reproducible map.

## 32. A nonlinear feature separates the rings

Fixed 16 points:8 inner radius.55 label+1 blue,8 outer radius 1.5 label-1 red. Squared radii.3025,2.25 separate at 1. The map is hand chosen and need not be invertible.

## 33. Evaluate inner products without the features

This substitution follows from the inner products in the dual. It does not license arbitrary similarities, and it differs from learning a parameterized representation in an MLP.

## 34. Expand a kernel once to see why it works

Our six coordinates reorder Harvard 33 but use the same terms; sqrt 2 ensures cross coefficients. Ask students to compute x dot z=1. Identity holds for all vectors.

## 35. The dual now gives a nonlinear classifier

A PSD kernel preserves concavity. The feature-space norm is alphaT Q alpha; it is generally not an original-coordinate weight vector. Avoid depicting a curved input boundary with one constant input-space normal.

## 36. RBF bandwidth changes the shape of influence

Fit a new dual at each gamma, keeping data and C fixed. Shading is predicted regions; green rings indicate alpha>0. Large gamma can form islands around training points. Contours approximate the score zero set on a 40×40 grid. Report gap to disclose optimization tolerance.

## 37. A valid kernel behaves like an inner product

Condition concerns every finite input set, not just one observed matrix. Sigmoid/tanh similarity is not universally PSD, so omitted. Scaling affects kernels and therefore the trained model.

## 38. Choose the optimization view for the problem

Do not imply all solvers materialize full NxN. Kernel computation and number of SV can be costly at large N. No universal speed/accuracy claim about MLPs.

## 39. From two classes to many

Explicit change from t∈{-1,+1} to class index y∈{1,...,K}. C still denotes penalty. Kernel k is lowercase.

## 40. Combine binary classifiers—or train jointly

LIBSVM implements one-against-one. Independent scores are not probabilities. The next sum-of-hinges loss is Weston–Watkins-style as in CS 231 n, different from reductions or max-rival Crammer–Singer.

## 41. A matrix produces one score per class

Reconnect to prior classification lecture. Scores cat 3.2,car 5.1,frog-1.7; correct/competitor colors are local score semantics, not binary labels. Python class index 0 corresponds to first math class.

## 42. The true class must beat every competitor

Score margin is not by itself an input-space Euclidean distance. Do not divide the sum by class count under this convention. Another multiclass formulation could instead penalize only the highest rival.

## 43. Calculate the loss before changing the model

All nine original CS 231 n values retained, reordered consistently cat/car/frog. Have pairs calculate car/frog. Sum competitors within each example; average over examples.

## 44. Correct predictions can still violate a margin

No: car contributes.8. It reacheszero once car<=2.2 with cat 3.2. Translating all scores preserves the loss. This worked demo is moved from Deep Learning Basics.

## 45. Eliminating slack exposes the binary hinge

Exact elimination: xi has lowerbounds 0 and 1-tf and C>0, so select their maximum. This links the geometric problem to the CS 231 n learning perspective.

## 46. Match the sum and mean conventions

Same fixed binary problem. Not a universal mapping across APIs. Averaging by N is why lambda is 1/(CN), not 1/C. Bias remains unregularized.

## 47. A joint loss gives a direct learning problem

This multiclass objective is an extra modeling choice. Penalize all rows of W. With MLP scores, parameter optimization is generally nonconvex even though hinge loss is convex in scores.

## 48. A violated margin tells scores how to move

This is a score-space derivative; shared weights couple multiple examples. If two rivals violate the true derivative is-2. At zero hinge input, taking the inactive branch is a valid subgradient.

## 49. Convert score gradients into weight gradients

Outer-product shape K×1 times 1×D givesK×D. Add lambdaW once after averaging data gradients. This linear chain rule prepares for MLP backprop. At kinks call it a subgradient; SGD often includes this case.

## 50. Work one binary subgradient update

The reported hinge decrease excludes regularization. Full one-example regularized objective 1.0025 ->.40495025. Subtracting the negative bias gradient increases b. This is one step, not a convergence proof.

## 51. A minibatch subgradient method scales training

Pseudocode: W K×D, Xb B×D, d B×K. Form d before either update. Bias gradient already computed through d and is independent of the updated W. Do not divide by K. Detailed SGD mechanics remain in Deep Learning Basics.

## 52. Keep the objective; change the score function

Requested handoff to Deep Learning Basics. Fixed kernel map versus trainable hidden features. Hinge or softmax loss can train explicit score functions; detailed SGD and backprop follow separately.

## 53. Connect geometry and the learning view

Revisit five outcomes. Ask which equality links slack to hinge and which links support coefficients to inner products.

## 54. Check the connections

90 seconds individually,30 seconds compare. Distinguish full/one-sided margin, slack/error, true/competing classes, and inner products versus a special nonlinear optimizer.

## 55. Reading and source lectures

The source ledger records reuse and corrections: zero slack is not synonymous with support; C statements match the objective; named similarities are not automatically valid kernels. Solver engineering and full proofs supplementary.
