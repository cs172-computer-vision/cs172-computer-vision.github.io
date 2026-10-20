# Image Classification: speaker notes

## 01. Image Classification

Opening: introduce CS172 Computer Vision I, then instructor and institution. The only title figure is the CIFAR-10 montage. Explain that today’s task is to map an image to a category, first by similarity and then by learned class scores.

## 02. Lecture overview

Preview the sequence: visual task, similarity baseline, model selection, linear scores, then probabilistic classification. Explain class probabilities before using observed labels to construct a learning objective. Validation remains distinct from fitting parameters.

## 03. An image, one category

Ask students to distinguish classification from locating or segmenting an object. We assume a fixed label vocabulary and one label per example. Multi-label classification and detection are useful extensions but outside today’s formulation.

## 04. Pixels and meaning

This is the semantic gap: useful categories are not explicit in the input representation. Connect to camera imaging and previous lectures on filters, edges and local features. Pixel values in the displayed grid are illustrative, not a literal crop from this photograph.

## 05. Why is image classification difficult?

Bridge the semantic gap to the challenge examples. The previous slide explains the numerical input; this slide explains why a mapping from those numbers to a category is difficult. The photographs show different instances and conditions, not controlled transformations of one cat. Ask what changes in the image and what should remain unchanged in the prediction.

## 06. Variation within one category

The left diagram shows orthographic views of the same 3D wireframe chair at two camera azimuths. This is an original geometric illustration. The right photographs illustrate illumination across different cats, not a controlled relighting experiment. Ask why a pixel-by-pixel comparison is unstable even when the category stays fixed.

## 07. Clutter and occlusion

Give students 20 seconds to find the cat. Ask whether background alone could become a shortcut. A model can perform well on familiar backgrounds and fail on a new environment. Reserve a rigorous treatment of distribution shift for later.

## 08. Deformation and category diversity

Separate within-instance changes from differences across instances. Ask which earlier features handle translation or scale and which still struggle with articulation. These photographs depict different cats and poses, not a time series of one individual.

## 09. Context can help or mislead

Keep the context issue from the reference but replace the weakly sourced social-media example with a concrete dataset question. Ask for a counterexample where background helps and one where it misleads. Do not claim that this particular photo set measures shortcut learning.

## 10. Representations for image classification

The old edge/corner diagram described a classical feature pipeline, not a modern deep-learning pipeline. Both approaches can learn a classifier from data. Deep learning additionally learns the representation, often jointly with the final classifier. A neural classifier is not required to consist of explicitly identifiable edge and corner stages. This lecture studies basic classification principles; later lectures learn nonlinear representations. Raw-pixel nearest neighbor and raw-pixel linear classification are deliberately simple baselines. “This lecture” refers to the present lecture, not to contemporary models. Nearest neighbor introduces similarity; linear classification introduces class scores and loss. Do not imply that k-NN optimizes softmax loss.

## 11. Learning from labeled examples

Explain that fitting training examples is a means, not the evaluation goal. In supervised learning, labels are available for training and evaluation but not as inputs to a prediction. Recall that a learning algorithm produces the parameters or stored information used by a prediction algorithm.

## 12. Nearest-neighbor classification

Pause before introducing the first classifier. Recall the data-driven training and prediction diagrams. Ask students what it would mean for two images to be similar; leave the distance unspecified until the numerical example. Spend about 15 seconds on this transition.

## 13. The nearest-neighbor rule

Use q for the unlabeled query and x^(i), y^(i) for training example i and its class label. Superscript parentheses identify examples; they are not powers. The navy diamond denotes q and the ring identifies its nearest example. All plotted coordinates are synthetic. No metric or k is named until it is introduced later. The query remains (1.8,-0.95).

## 14. A distance calculation

Flatten in row-major order: q=(10,20,30,40), x^(i)=(12,17,30,45), D=4. The example index i is a parenthesized superscript; j indexes a vector coordinate. L1 and L2 appear in distance subscripts to avoid confusing metric names with coordinate indices. q-x^(i)=(-2,3,0,-5), giving L1=10 and L2=sqrt(38).

## 15. Nearest neighbor in NumPy

The code uses the same q as the formulas. Row i of X stores training vector x^(i). The distance array has N entries, i_star selects the closest row, and y_pred is y-hat(q). Mathematics uses indices 1 through N while NumPy uses 0 through N-1. Casting before subtraction prevents uint8 wraparound. For large data, compute distances in chunks rather than materializing a large difference array.

## 16. Where nearest neighbor spends time

N counts stored examples, D counts coordinates, and one query is q. Constant-time training means retaining references to arrays already in memory; copying or reading N D values is not constant time. Direct prediction computes N distances, each involving D coordinates. The final row is a memory cost, unlike the preceding time costs.

## 17. Voting among nearby examples

I_k(q) is a set of training-example indices, not the feature vectors themselves. Each vote uses the corresponding label y^(i). The navy diamond is q, as on the preceding nearest-neighbor plot. Odd k avoids binary vote ties only; a multiclass tie can still occur. The deterministic demo selects the tied class with the closest neighbor.

## 18. How k changes the decision regions

Keep the sample set and metric fixed while changing k. The navy diamond q starts at (-0.5,1.05), near the isolated blue training example (-0.7,0.9). A curved leader with an arrowhead ends above the blue example’s ring and avoids the query marker. Prediction for q changes from blue at k=1 to red at k=3. A plot click changes q, not the stored examples. Reset restores the query and k=1.

## 19. L1 and L2 define different neighborhoods

Use the same query q, stored vector x^(i), and coordinate index j as the distance calculation. d_L1 and d_L2 identify the metric, while j ranges over D coordinates. The drawings are unit-distance contours in two dimensions centered at the zero vector; they do not depict class boundaries. The rotation claim concerns orthogonal transformations of feature coordinates, not arbitrary rotations of an object in an image.

## 20. The distance metric can change the boundary

Both panels use x^(1)=(1,0) with class A and x^(2)=(0.6,0.6) with class B; the shared query is q. Thus A and B are class labels, not training-vector variable names. Under each panel’s metric, d(q,x^(1)) and d(q,x^(2)) compare the same query to the same vectors. At q=(0,0), L1 gives 1 and 1.2 so A wins; L2 gives 1 and sqrt(.72) so B wins. Axis labels name feature coordinates and are not sample indices. Query movement does not alter the fixed boundaries.

## 21. Model selection

Separate constructing a classifier from selecting among alternatives. Ask whether training accuracy is sufficient. The next slides examine tempting but invalid selection procedures before introducing validation. Spend about 15 seconds here.

## 22. Underfitting and overfitting

Define generalization relative to a target data distribution. All panels use the same 61 training vectors, the same six flipped labels, Euclidean distance, and the same 61-by-61 clean validation grid. The dots show observed training labels; the pale background shows predicted labels. Reveal the k=5 result, then k=1. Ask whether zero training error identifies the best classifier. The displayed percentages are reproducible errors, not CIFAR-10 measurements. Large k gives a rigid prediction; small k yields more local, flexible regions. The low training error at k=1 includes each example as its own neighbor. Validation is separate. In this constructed noisy-training case validation error may be lower than training error; that is not contradictory. Underfitting generally has high training and validation error; ineffective fitting can also cause it. Overfitting is a failure to generalize, often accompanied by an unusually large train/validation gap. The dashed curve is the known data-generating boundary x2=0.45 sin(2.4 x1); it is shown only to explain this synthetic example, and is not supplied to k-NN. Every percentage is labeled as a training or validation error rate, not accuracy; lower is better. Numerical values are unchanged.

## 23. Model complexity and generalization

Relate this familiar schematic to the preceding measured k-NN example. Complexity means the flexibility of the possible decision rules, not prediction cost. For fixed data, reducing k generally makes k-NN more flexible. In a nested model family, the best achievable training objective cannot increase with added flexibility, although finite optimization and a reported classification error need not follow this exactly. Validation error may decrease and then increase because fitting sample-specific noise does not help new examples. Do not teach a U-shaped curve as a theorem; other behaviors, including double descent, occur. The vertical scale is schematic. Choose hyperparameters using validation, not by repeatedly inspecting test error.

## 24. Training data and model complexity

Adapt the attached lecture’s training-size discussion. Both curves represent expected held-out performance as training set size changes; they are qualitative, not measured results or a guarantee of monotonic gains for every sample. More independent, representative data can constrain a flexible model and reduce variance. Data quality, distribution shift, noise, optimization and inductive bias also matter. Duplicate frames do not provide the same information as independent new scenes. Connect to the split-design prompt. A lower error curve and a rightward preferred complexity are possibilities under the stated comparable conditions, not a universal rule.

## 25. Which choices should we tune?

Distinguish a hyperparameter from stored examples or learned weights. Avoid saying every setting must be exhaustively tried. In practice a finite search budget is chosen. Repeatedly choosing models using a set can adapt to that set, which motivates a separate final test set.

## 26. Two tempting evaluation mistakes

Ask for a vote before each reveal. The training-self-match argument assumes no conflicting labels on identical inputs and the usual self-inclusion rule. Leave-one-out evaluation differs because the query is removed from the stored set. Test-set reuse leads to optimistic selection even if no gradient is computed on the test set.

## 27. Training, validation, and test

Explain leakage through duplicates or related frames. Split by the independent sampling unit (person, scene, video, household) when that reflects deployment. Preprocessing statistics must also be estimated within the training split. In this course’s workflow, freeze model choices before final test evaluation. Grouping is conditional on the intended generalization target. For new-scene evaluation, put every view or frame from a scene in a single split. For new-subject evaluation, group by subject. For future-frame prediction within a known scene, a time-based split may instead be appropriate. Relatedness alone is not a universal reason to group; the split should represent deployment and avoid near-duplicate leakage. This advice matters for multiview/video data but need not dominate an independent-image benchmark.

## 28. Cross-validation reuses limited data

The development pool excludes the final test set. Each run fits a fresh model and preprocessing state from that run’s training folds. Cross-validation can be expensive for deep models. Grouped or stratified folds may be appropriate. Do not average test results over hyperparameter candidates.

## 29. CIFAR-10 as a working example

Use the figure to show that even tiny images retain category cues, while fine details are difficult. The official split provides no separate validation portion. Use a development split inside the 50,000 training examples, or cross-validation. Cite Krizhevsky’s dataset page and original technical report.

## 30. Nearby pixels can retrieve the wrong class

Walk through one row rather than claim an exact accuracy from this small selected figure. Students should compare background, color, and rough silhouette. A retrieval visualization is a diagnostic, not an unbiased estimate of test accuracy.

## 31. Selecting k from validation results

Use the original CS231n cross-validation figure requested for this slide. There are five validation accuracies per k. The line joins their mean values and the error bars show standard deviation, not a confidence interval. In this source example the mean peaks around k=7. Ask students why the best individual fold outcome is not the selection criterion. Freeze the hyperparameter choice before the final test evaluation. These are source results; they are not newly measured by this deck.

## 32. Pixel distance and perceptual similarity

Static CS231n figure requested for this slide. The original is compared with shifted, occluded, and darkened versions. As stated in the source note, the three modified images have equal L2 pixel distance from the original, despite different perceptual effects. No numerical distance is asserted. Ask students whether this metric represents the similarity needed for recognition. The figure is bundled unchanged and replaces the shift/brightness interaction.

## 33. What nearest neighbors teach us

Qualify the limitation: nearest-neighbor methods remain useful on learned feature embeddings. It is raw-pixel similarity that is a poor semantic baseline. Next, introduce a parametric score function, while retaining the need for validation and meaningful representations.

## 34. Linear classification

Link the nearest-neighbor summary to a compact parametric model. The training set will be used to estimate parameters, while prediction uses the resulting score function. The validation principles remain unchanged. Spend about 15 seconds here.

## 35. A parametric score function

Compare memory after training with k-NN. A score function provides one score per category, and argmax produces a discrete prediction. Scores may be negative and need not sum to one. Learned parameters summarize patterns in training data but can still overfit.

## 36. The linear classifier

Check matrix dimensions aloud. There are 30,730 scalar parameters, including biases. Linear score layers also appear inside neural networks, often acting on learned features rather than raw pixels. Do not call an affine map mathematically linear without qualification.

## 37. Linear classifier: algebraic view

Compute scores as matrix-vector multiplication. Highlight the first row as the cat weight vector, corresponding to the first entry of the bias and score vectors. The computed scores are (-96.8,437.9,60.75), and the highest is dog. The following slide retains exactly the cat row and input, but reshapes them as 2-by-2 arrays. This is a change of representation, not a different model or new weights. The corrected ship arithmetic remains 60.75.

## 38. Linear classifier: visual view

Four progressive builds organize this explanation. At entry, show the image grid and the unchanged cat weight row. Build 1 moves the four weight cells from the row into a 2-by-2 layout in the same row-major pixel order. Build 2 reveals the dot-product score and the instruction to multiply corresponding entries, sum, and add the same bias. Build 3 reveals the ten learned CIFAR-10 templates. Build 4 explains the rescaled signed weights and varied appearances. Left/Right reverse/advance the builds, End shows all, and the PDF shows the final arrangement. Motion is disabled when reduced motion is requested. The input, weights, bias, and score remain unchanged from the preceding algebraic slide.

## 39. Two-class decision geometry

For two classes, the decision boundary is (w1-w2)^T x + (b1-b2)=0. It is not generally an individual class’s zero-score contour. In this demo a,b,c are the difference parameters. Move c to translate the boundary and a or b to rotate it. If a=b=0, c selects one class everywhere, and c=0 ties everywhere. This demonstration is explicitly binary. The linear classifier Wx+b is not limited to two classes; the next slide shows its multiclass extension.

## 40. Multiclass decision regions

The classifier supports any number C of classes via C rows of W. Show the exact example s1=x1, s2=x2, s3=0. Class 1 is the intersection x1>=x2 and x1>=0; class 2 is x2>=x1 and x2>=0; class 3 is x1<=0 and x2<=0. The solid lines are the actual class boundaries. An equal-score hyperplane contributes to the argmax boundary only where both tied scores are maximal. Dashed extensions illustrate inactive equality lines. Each affine-score class region is an intersection of halfspaces and is convex (possibly empty) in the chosen feature space. Resolve exact ties consistently. This is a direct multiclass model; no one-versus-rest construction is required.

## 41. Where a single linear boundary fails

Ask students to draw the best straight line for XOR and explain the unavoidable mistakes. These are binary problems in the displayed original feature space. A nonlinear feature map can help, for example the product x1*x2 for XOR or squared radius for a ring. We are not claiming no linear classifier in any feature space can solve them.

## 42. Nearest neighbors and linear classifiers

Compare both methods on the same fixed D-dimensional representation. Direct exact 1-NN uses O(ND) distance work; exact k-NN also needs neighbor selection (linear-time selection is possible). With fixed-size labels and C biases, the displayed storage suppresses lower-order terms. Training for NN means retaining examples; copying data still costs time and an index adds a construction cost. Linear training requires an optimizer and its cost depends on the loss and algorithm. A fixed C,D gives parameter storage independent of N. A linear classifier is not guaranteed to outperform k-NN. Both can be effective on good features; raw-pixel shortcomings are not a verdict on learned-embedding retrieval. The attached lecture compares nonparametric and parametric classifiers; this table uses the affine-score model actually introduced here.

## 43. From scores to class probabilities

Bridge from the existing linear classifier to a categorical probability model. Do not mention a loss formula or empirical-risk minimization yet. Preserve the familiar score function; add a probabilistic interpretation to its output. Original ID is retained for existing links.

## 44. Scores are not probabilities

Use the same cat/car/frog logits as the next slides. A score of 5.1 is not a percentage. Introduce a categorical model over mutually exclusive known classes, with theta=(W,b). Normalized model estimates do not automatically match observed frequencies; keep calibration as a spoken caveat or supplementary reading. The formula defines model probabilities, not the true data-generating conditional. Softmax is the modeling choice introduced next.

## 45. Softmax probabilities

Call the class scores logits. Reveal exponentiated positive weights together, then normalized probabilities. Softmax is a modeling choice; positivity and normalization alone do not uniquely derive it. Exponentiation is increasing, so argmax is unchanged. Values are rounded. For finite logits and C>1 probabilities are strictly between zero and one in exact arithmetic. Optional spoken extension: p_a/p_b=exp(s_a-s_b); this no longer needs a separate slide.

## 46. Explore softmax probabilities

Let students raise one logit and a competitor, predicting the probability changes. Then pose the displayed shared-constant question and pause for an argument. Answer for instructor only: exp(s_c+k)/sum_j exp(s_j+k)=exp(s_c)/sum_j exp(s_j), so probabilities and argmax are unchanged. There is no shared-shift button or revealed answer on this slide, including its completed/PDF state. Scaling logits is different. Reset restores (3.2,5.1,-1.7). The later stable-code slide returns to the shift property.

## 47. Which prediction better supports the label?

A is the rounded default probability vector; B is hypothetical, not a measured update. Both argmax predictions are car, so accuracy is unchanged. Let students identify B as better support for the observed cat: 0.3 rather than about 0.13. This motivates maximizing observed-label likelihood. One observation does not establish which model generalizes better.

## 48. Maximize the likelihood of training labels

First maximize the product of observed-label probabilities, conditional on the inputs and parameters. Log is strictly increasing and turns the product into a sum; negation and division by positive N yield a mean negative log likelihood with the same optimum. This final expression is the dataset loss L(W,b), the average of per-example losses; it replaces the redundant separate dataset-average slide. Validation still selects settings; held-out test data evaluate the final procedure. Regularization and optimization remain for later lectures.

## 49. Cross-entropy loss

Here y is the observed class label and p_y its model probability. The negative log likelihood of that label is cross-entropy for a one-hot target: t_c=1[c=y] gives -sum_c t_c log p_c=-log p_y. Keep this expanded identity in notes rather than adding another on-slide definition. Natural logarithm. Fixed logits give p_cat=0.1299825390 and loss=2.0403551528, matching the curve marker. Lower true-label probability gives a larger penalty.

## 50. Checking the behavior of softmax loss

Allow 45 seconds to derive both answers. For finite logits with multiple classes, all class probabilities are strictly between zero and one, so the loss never equals zero exactly. This precision matters if students later discuss separable unregularized logistic regression and diverging parameter norms.

## 51. A numerically stable implementation

This addition supports practical implementation without changing the reference flow. It avoids overflow and avoids taking log of a probability that has underflowed to zero. Exponentials of very negative shifted scores can still underflow harmlessly to zero in the sum. Code assumes finite logits and valid class indices. Distinguish numerical stability from generalization.

## 52. From image categories to a learning objective

Recap five distinct jobs. Softmax creates a categorical distribution; cross-entropy scores it against observed labels. Neither normalization nor lower training loss guarantees calibrated held-out probabilities or generalization.

## 53. Exit check

Use as a 2-minute individual exit ticket before revealing. Answers correspond to objectives 1, 3 and 5. For homework, add implementation and geometric interpretation tasks to assess objectives 2 and 4. The PDF includes revealed answers for instructor review; hide or remove them before distributing as an assessment.

## 54. Reading list

Reading-only closing slide. Core reading: the two CS231n notes. Textbook background: Foundations of Computer Vision Chapters 9 and 11. Optional classical methods: study bag of visual words, from local SIFT descriptors through vocabulary learning and histogram encoding, in Sivic and Zisserman (ICCV 2003); then spatial pyramid matching in Lazebnik, Schmid and Ponce (CVPR 2006). The separate bag-of-visual-words slide was removed. Reading links need internet.
