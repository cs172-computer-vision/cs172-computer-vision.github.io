# Deep Learning Basics: speaker notes

## 01. Deep Learning Basics

Open with the question: what changes when we replace a linear classifier with a deep model? We still choose a loss and optimize parameters. The new ingredient is a learned nonlinear representation. Prerequisites: matrix multiplication, partial derivatives, and basic probability.

## 02. From class scores to learned features

Learning outcomes: calculate multiclass hinge loss; perform and interpret a minibatch SGD update; track MLP shapes and count parameters; explain why activation functions are necessary; trace a short computational graph with the chain rule. Timing: opening 4 min, SVM and regularization 20, optimization 28, MLP 25, backprop and wrap-up 13.

## 03. Three pieces of a learning system

Recall the previous Image Classification lecture: x is an image vector, s contains one score per class, and prediction is argmax. Theta denotes every trainable parameter, including biases. Distinguish choosing a model, evaluating its errors, and changing its parameters.

## 04. A correct label needs a higher score

Keep the class order cat, car, frog throughout the SVM section. The source example has a car score 5.1 for a cat input. Scores are arbitrary real numbers, not probabilities. Accuracy is piecewise constant in the scores, so it gives little guidance for an incremental parameter update.

## 05. Ask for a margin between scores

Define sample index i, true class y_i, and competing class j. Delta is a score margin; it is not yet a Euclidean distance in input space. We use Delta=1 throughout. Ask which competing class violates the requirement before revealing the threshold.

## 06. Hinge loss charges margin violations

The horizontal variable m is the score gap, not a model parameter. At m=1 the hinge is not differentiable; a subgradient can be used, and a common implementation chooses zero at the kink. Have students give a correctly classified example with nonzero loss: correct score 3.2 and rival 2.7 gives 0.5.

## 07. Multiclass SVM loss

This is the sum-of-hinges multiclass SVM objective used in the CS231n notes; other multiclass formulations exist. Clarify that it is an alternative to softmax cross-entropy. Class indices in the math can be 1 through C; Python uses 0 through C-1. We optimize the primal weight parameters directly, without teaching kernels or the dual.

## 08. Work through three training examples

Use the same nine numerical scores as the source lecture, reordered consistently to rows cat, car, frog. Pause for 45 seconds after the table: compute the car and frog losses in pairs. Check the frog terms: cat 2.2 minus -3.1 plus 1 = 6.3; car 2.5 minus -3.1 plus 1 = 6.6. The average is 15.8/3, not the sum and not divided by the number of classes.

## 09. Change the scores, inspect the loss

Demonstrate the default loss 2.9, then lower the car score to 3.0: prediction is correct but loss is 0.8. Lower it to 2.2: the car penalty reaches zero. Raising the correct score far enough removes both penalties. All-score translation leaves every score difference unchanged; the sliders vary two scores independently, so this invariance is a discussion question rather than a dedicated control.

## 10. SVM also has a geometric interpretation

This slide switches explicitly to a binary classifier and uses t, not y, for signed labels. The plot uses w=(1,0), b=0 and canonical planes x1=±1; the full width is 2. With hinge plus L2 we trade violations against margin size. Do not equate Delta=1 in arbitrary multiclass scores with a fixed distance in feature space. No kernel derivation is needed.

## 11. Fit the data while controlling the weights

Our convention includes 1/2 so the regularizer gradient is lambda W. The source sometimes omits 1/2; then its gradient is 2 lambda W. State the convention once and keep it everywhere. Frobenius norm means sum of squared matrix entries. A regularizer expresses a preference and can improve generalization, but does not guarantee it. Do not use test data to choose lambda.

## 12. L2 expresses a preference among equal fits

Give students 30 seconds to calculate the squared norms. Both L1 norms are 1, so L1 ties these particular vectors; L1 can encourage sparsity across a broader optimization problem. This is an intuition example, not a claim that distributing weights is always better. It illustrates the preference before seeing a generalization result.

## 13. Hinge loss and softmax cross-entropy

Reinforce the separation of architecture and objective. Hinge reaches zero at finite scores; softmax cross-entropy with at least two classes and finite logits stays positive. For cross-entropy, use stable logsumexp implementations; do not implement raw exponentials on large scores. Both objectives are invariant to adding a common constant to the scores.

## 14. Optimization

Transition: theta can be W and b in a linear model or many matrices and biases in a deep model. The optimization machinery will be largely the same.

## 15. Think of loss as a landscape

This is a deterministic quadratic contour plot, not an empirical deep-network landscape. Randomly choosing a new weight vector ignores useful local information. The curve is L=(theta1²+3 theta2²)/2; the path is generated by the same gradient formula used in the SGD illustrations.

## 16. The negative gradient points downhill

The gradient is steepest ascent with respect to Euclidean distance; negative gradient is steepest descent under that metric. The linear approximation is local, which is why step size matters. P is the total number of scalar parameters. At nonsmooth points of hinge or ReLU we use a subgradient convention.

## 17. Estimate a gradient numerically

Merge the many consecutive source frames into one reveal. The rounded source losses give the displayed -2.5 derivative. A central difference is typically better for checking. The estimate depends on h, numerical precision, and smoothness. Do not claim an arbitrarily small h is better.

## 18. Compute gradients; check with differences

Automatic differentiation is not numerical finite differencing and is not symbolic expansion of a giant expression. It computes derivatives of the executed graph using local rules, up to floating-point error. Compare a handful of central differences away from hinge/ReLU kinks; at a kink the two-sided difference may disagree with the chosen subgradient.

## 19. Gradient descent is a repeated update

Compute each coordinate separately: subtract 0.2 from 2 and subtract -0.3 from -1. The negative second gradient increases the second coordinate. Recalculate the gradient at the new position; it is now (1.8,-2.1). These numbers are exact for the quadratic, not results from a trained classifier.

## 20. Learning rate controls the step

Keep the objective and start fixed. For this quadratic a constant step converges when 0<eta<2/3; eta=0.6 oscillates in the steep direction while converging, and eta=0.8 diverges in that coordinate. Values outside the plotted region are explicitly indicated. This threshold is specific to this quadratic. Large learning rates do not always reduce the loss.

## 21. The full gradient can be expensive

Do not imply all examples must be in memory simultaneously; we can accumulate a full gradient in chunks, but each update still waits for all N contributions. The regularizer is a parameter term and is added once, not once per sample without normalization.

## 22. Stochastic gradient descent uses a minibatch

This is the core algorithm to teach clearly. Separate sample selection, mean gradient, regularizer, and update. The unbiased statement applies to fresh uniform sampling at a fixed theta. Random reshuffling is common in practice, but conditional unbiasedness need not hold after observing earlier batches in the same epoch. B=N gives full-batch descent.

## 23. One minibatch, one concrete SGD step

Give 60 seconds to compute before revealing. The point is averaging two gradient vectors before updating. Explicitly lambda=0 here avoids quietly omitting regularization. The illustrative gradients need not equal the full gradient from slide 19. Ask why a noisy estimate can move in a direction that raises full loss on one step.

## 24. The SGD training loop

loss_and_grad returns the mean batch data loss plus lambda/2 times weight norm squared, with matching gradients. The final batch can be smaller; average by its actual length. rng is a seeded NumPy generator. minibatches is a helper that partitions the shuffled indices; this is pseudocode, not a standalone program. Each new epoch reshuffles.

## 25. A minibatch trades computation for noise

This demo uses per-example losses L_i(theta)=L(theta)+a_i dot theta with symmetric zero-mean a_i, sampled uniformly with replacement from a fixed finite dataset. The full objective is the quadratic up to a constant. Plot is measured from that synthetic setup. Larger B reduces gradient variance roughly proportional to 1/B for independent draws, but not necessarily time to a target accuracy. No claim about a real training run is made.

## 26. Monitor learning, then validate choices

These are diagnostic prompts, not unique diagnoses. Compare mean training data loss and validation data loss using the same definition; do not compare a regularized training objective to an unregularized validation loss as if the difference were all overfitting. A schedule that reduces eta later is often useful; avoid giving a universal schedule.

## 27. A brief look at other optimizers

Keep this to about one minute. No derivations of optimizer state or bias corrections. Explain that learning rate schedules change eta over time and can be used with multiple optimizers. Hinge plus L2 with a linear score function is convex, while an MLP objective is generally nonconvex. A zero gradient in an MLP can be at a minimum, maximum, or saddle.

## 28. Neural networks

Transition from how to learn parameters to what model family to learn. The model will still output class scores; we do not add an activation to output logits for hinge or cross-entropy.

## 29. Linear boundaries have limits

Reuse the original ring example from Lecture 4, cropped to the diagram. This example makes the geometric limitation visible before introducing the MLP formula. A radius feature can separate this ring pattern, as in the next slide; the eventual network learns a different piecewise-linear representation.

## 30. Transform features to separate classes

Reuse the original input-to-polar feature transform from Lecture 4. The diagram uses x,y as two coordinates, unlike y_i as a class index earlier. Name this local convention aloud. The radius separates inner and outer rings; the angle is not needed for the class decision. We do not claim a small ReLU MLP computes an exact square root.

## 31. An MLP learns features, then class scores

A two-layer network means two learned affine transformations; the input is not counted as a learned layer. Hidden features h and all weight matrices are learned jointly from the final loss. Use phi for activation and theta for the entire parameter set. Biases are included even if omitted in some source formulas.

## 32. Affine layers alone still give an affine map

Ask students to expand the matrix product first. A bottleneck may impose a rank constraint, so factorization is not identical to an unconstrained single matrix in every respect, but the resulting function remains affine. This is why we need nonlinear activations between affine layers.

## 33. Track the shapes through an MLP

The schematic shows three input nodes, four hidden nodes, and two output nodes purely for readability; D, H, C remain general in the formulas. Edges represent scalar weights. Biases are trainable but are not drawn as extra neurons. For CIFAR-10 flattened input D=3072, H=100, C=10 gives 308310 parameters.

## 34. A neuron: weighted sum, then activation

Each hidden neuron has its own weight row and scalar bias. With ReLU, the neuron is active only in the half-space w dot x+b>0. A layer computes many such responses in parallel. Do not spend time on action potentials or imply the model accurately simulates biological neurons.

## 35. Calculate a complete forward pass

Ask pairs to compute z and h, then reveal scores. All vectors are columns, all dimensions equal two, and zero biases mean two zero vectors. Class 1 means mathematical first class, Python index 0. These exact W and x also appear in the executable NumPy verification script. This is a toy MLP, not a trained image model.

## 36. ReLU introduces a useful nonlinearity

At z=0, the derivative is undefined; implementations commonly use zero. The network is piecewise affine in x because each activation pattern selects an affine map. ReLU can suffer from inactive units; say what the zero slope does without turning this into an advanced activation lecture.

## 37. Compare activation functions

Brief gallery only. Saturation means small derivatives, which can reduce gradient flow when many layers are composed. Leaky ReLU plotted with slope 0.1; this is an illustrative choice. ReLU is the running example. Sigmoid can also be used as an output for binary probabilities, but that is a separate modeling choice.

## 38. Two ReLU features can solve XOR

A concrete learned-feature form using the same first-layer rows (1,-1) and (-1,1) as the numerical forward pass. For binary inputs, unequal pairs give one hidden activation of 1; equal pairs give (0,0). Thus h1+h2>0.5 solves XOR exactly. Points are deliberately discrete; this does not claim this boundary is uniquely desirable elsewhere. Reset returns to input view. Ask why no single input-space line separates the two classes.

## 39. Capacity and generalization

Avoid a universal U-shaped test-error claim: large modern networks can show more complicated behavior. The operational lesson is held-out evaluation, not a theorem that fewer parameters always generalize better. Count a deeper MLP by composing another affine-plus-activation block; we do not introduce convolution here.

## 40. Represent computation as a graph

Keep this introduction brief. The graph also shows the regularization branch, because forgetting it gives the wrong total gradient. Cache intermediate values such as preactivations and hidden activations for the backward pass. Backpropagation computes gradients; the optimizer uses them in a separate update. The regularizer R depends on W1 and W2; gradients from both loss branches add.

## 41. Backpropagation follows the chain rule

Negative scalar L is fine for a chain-rule toy; this is not a classification loss. Seed dL/dL=1. Multiply gate sends c=-4 to q and q=3 to c. Add gate copies -4 to a and b. The original source has many build frames; these are merged into three reversible stages. Mention that vector-valued nodes use Jacobian-vector products without forming full Jacobian matrices.

## 42. Automatic differentiation in the training loop

Code is a framework sketch assuming torch, F, model, loader, and lam exist. A standard biased MLP has rank-2 weights and rank-1 biases, so p.ndim>1 implements our chosen regularizer here; this is not a general parameter-grouping rule. Cross-entropy expects logits and integer labels; no softmax before it. zero_grad prevents unintended accumulation. Explicit penalty means do not also set optimizer weight_decay. See verified NumPy reference for executable arithmetic.

## 43. Connect the whole training system

Ask students to point to the item that changes if hinge is replaced with cross-entropy, if linear is replaced with MLP, or if SGD is replaced with Adam. Forward, differentiation, and optimization are separate jobs. Validation chooses design settings and does not backpropagate updates to fit validation labels.

## 44. Five ideas to take away

Revisit each learning outcome from slide 2. The network is trained end to end by the same objective-and-update pattern as the linear classifier. Keep the focus on these foundations; there is no next-lecture teaser.

## 45. Check your understanding

Give 90 seconds individually and 30 seconds to compare. Q1 checks exclusion of true class and zero clipping; Q2 checks coordinate signs and step size; Q3 checks function composition. Final verbal answer: backprop computes gradients; the optimizer applies them. Collect responses or use a show of hands; aligned to outcomes 1, 2, 4, and 5.

## 46. Reading and references

The pages on classification and generalization are prerequisite refreshers; the longer optimizer and backprop derivations are optional reading. The source ledger records figure reuse, redrawing, local crops, and one-based reference PDF pages. The Lecture 4 PDF lives under the 2026 URL but its internal footer says 2025; refer to the supplied URL and PDF page numbers rather than silently correcting its internal date.
