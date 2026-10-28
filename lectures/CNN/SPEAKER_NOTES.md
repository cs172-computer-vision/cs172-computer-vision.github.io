# CNN · Speaker notes

Derived from inline slide-meta in index.html. Regenerate with tools/refresh.py.

## 1. Convolutional Neural Networks [01-title]

Connect to the previous lecture: preserve losses, gradients, and SGD while adding spatial structure. Figures are original schematics, not measured model outputs.

## 2. From local evidence to a classifier [02-roadmap]

90-minute route: motivation 10 min; convolution 22 min; geometry and cost 23 min; context and pooling 18 min; classifier, diagnosis, and exit check 17 min. Activities and demonstrations are included in those times. This bullet-list slide is static: all items appear on entry, without intermediate advances.

## 3. What you should be able to do [03-outcomes]

Five outcomes remain: explain spatial assumptions, calculate outputs/gradients, derive shapes/cost, trace context/translation, implement/debug a classifier. Use the final untimed self-check for reflection; intermediate slides are explanatory demonstrations rather than repeated audience quizzes. This bullet-list slide is static: all items appear on entry, without intermediate advances.

## 4. A dense layer has no built-in image geometry [04-recap]

Correct the common shorthand that flattening destroys information: reshaping is invertible. The loss is an architectural inductive bias, not numerical information. A dense network can learn spatial structure but is not constrained to exploit it. Connect to the previous lecture’s MLP.

## 5. The same local pattern can occur anywhere [05-pattern]

Show the translated edge and then reveal detector reuse. Shared weights express the same local rule at each location. No audience vote is required.

## 6. Two architectural constraints [06-bias]

Define inductive bias before using it: a structural assumption that favors some solutions. Reveal locality, sharing, then the name for their role. Absolute position can still matter for some tasks.

## 7. Compute one local response [07-convolution]

Define kernel/filter and bias here. The next example uses a hand-selected kernel to make arithmetic inspectable; trained kernels are learned from data.

## 8. One patch produces one number [08-dot]

Read rows of the patch: [0,0,1], [0,1,2], [0,1,3]. Kernel rows are [-1,0,1]. Multiply corresponding entries, sum all nine products, and add one bias. Positive means right side is brighter for this chosen kernel; it is not a probability.

## 9. Slide the same kernel across the image [09-slide]

Demonstrate the scan without requiring a prediction. There are nine valid windows. Zero-based output row=floor(position/3), column=position mod 3. Output [[6,2,-6],[7,1,-7],[6,1,-6]]. Keep the input and kernel fixed. Selection uses outlines as well as color.

## 10. Sum over every input channel [10-channels]

The pictured special case uses a 1×1 kernel and three input channels; it mixes channels at one spatial location. General 3×3 kernels do the same after each channel’s nine products. This lecture assumes groups=1 and dilation=1 unless explicitly stated.

## 11. A filter bank creates output channels [11-tensors]

A feature map is one output channel; activations are computed values. NCHW names the axis order: batch size, channels, height, width. Define N as the number of images, C as channel count, H/W as spatial dimensions. The eight filters are each 3×3×3, with one bias each. One-pixel steps and a zero border preserve spatial size.

## 12. Write the operator precisely [12-equation]

All indices are zero-based. This is a square kernel with symmetric padding P and stride S, groups=1, dilation=1. Tilde X includes P zeros on each edge; original X coordinate is (iS+u−P,jS+v−P). True mathematical convolution flips the spatial kernel. For trainable unconstrained kernels the representable family is unchanged.

## 13. Shared weights collect gradients from all uses [13-gradient]

The gradient arriving from later layers is often called the upstream gradient. Reveal the two weight derivatives together, then the shared-gradient rule. For L=4z0+5z1, da=14 and db=23. Contributions from every use add. Mean-loss scaling is already included in the incoming derivatives.

## 14. Nonlinearity makes stacked layers expressive [14-relu]

ReLU means rectified linear unit. It clips negative values, keeps nonnegative values, and does not change shape. An affine map is a weighted sum plus bias. Composing affine maps without nonlinearities remains affine. Deeper feature interpretations belong in discussion, not an extra paragraph on the slide.

## 15. Control shape and cost [15-geometry]

Transition from what one output means to how many outputs a layer creates.

## 16. Stride sets the step size [16-stride]

Stride is the input-pixel step between successive kernel positions. The same 7×7 input and 3×3 kernel produce 5×5 at stride 1 and 3×3 at stride 2, with no padding. Weight count does not depend on stride.

## 17. Padding adds a boundary convention [17-padding]

Define P as the number of zeros on each side. For K=3 and P=1, padded side is 9 and output side is 7. Same-size padding here assumes odd kernel and stride one; it is not a general statement about every API’s padding="same". Do not claim padding preserves new image information.

## 18. Count valid kernel placements [18-shape]

Assume H+2P≥K, W+2P≥K, positive integer stride, dilation one. Derive the floor from allowed output start indices, not memorization. For the H=8 example the final row at index 7 is unused. The source lecture’s simple expression assumes exact division; PyTorch uses the floor in general.

## 19. See how each setting changes the output [19-shape-lab]

An explanatory calculator, not a prediction prompt. The readout reports parameter count and output values; MAC terminology is introduced on slide 22. Default K3,S1,P1,H32 gives 8×32×32, 224 parameters, 8192 output values. Stride 2 gives 8×16×16 and 2048 output values while keeping 224 parameters. Reset restores defaults.

## 20. Work through a convolutional layer [20-pair-audit]

Worked example, replacing the timed pair quiz. Reveal weights, output, parameter count, then the batch-size conclusion. Weights 16×8×3×3; bias 16; output N×16×8×8. Parameters 16(8·9+1)=1168. Doubling N changes batch activations and computation, not learned tensors.

## 21. Sharing separates parameters from output size [21-parameters]

Holding output count fixed makes this a controlled comparison. Local unshared assumes a full per-position3×3×3 filter even at padded edges; coefficients multiplying fixed zeros are still stored by this convention. A bias is per output for unshared/dense and per output channel for shared convolution. Batch size and input spatial size do not occur in the shared parameter formula.

## 22. Count the multiply–accumulate operations [22-compute]

Define MAC as multiply–accumulate: multiply x and w, then add the product to accumulator a. Count all kernel products, including padded zeros; omit bias additions, ReLU and backward work. One output uses 27 MACs, and 8192 outputs use 221184 MACs per image. Batch work scales with N. Some FLOP conventions count a MAC as two floating-point operations; this is not a hardware runtime measurement.

## 23. Let local evidence cover larger regions [23-context]

Bridge: stacking grows receptive fields, while downsampling makes later layers cover larger portions of the input. Avoid equating larger receptive fields with guaranteed use of all their pixels.

## 24. Stacked layers expand the receptive field [24-field]

Define receptive field as the original-input region that can affect one output. Demonstrate depth changes without posing a prediction task. For K3,S1 and no dilation, depths 1–5 give field sides 3,5,7,9,11. Assume an output away from the border and a sufficiently large input. Theoretical field size does not imply uniform influence.

## 25. Downsampling makes later context grow faster [25-field-stride]

Derive using the previous jump, not the new jump. Start r0=j0=1. Conv3S1:r3,j1. Pool2S2:r4,j2. Conv3S1:r8,j2. Pool2S2:r10,j4. ReLU changes neither. These are the feature extractor layers in the classifier shown later. Padding changes alignment/border content, not this theoretical size recurrence. Groups and dilation are outside the main scope.

## 26. Pooling summarizes each channel separately [26-pool]

Explain the pictured reductions directly. Max output [[4,5],[2,6]]; average output [[2.5,2],[0.75,3]]. A unique maximum receives the max-pool gradient; an average shares it across the window. Pooling processes each channel separately and has no learned parameters.

## 27. Equivariance is different from invariance [27-translation]

Define T_delta before comparing the two properties. Reveal invariance after equivariance, then the pooling counterexample. A one-pixel shift [0,1,0,0] to [0,0,1,0] changes stride-2 max pooling from [1,0] to [0,1]. Exact equivariance also depends on compatible boundaries and stride-aligned shifts.

## 28. Assemble a small image classifier [28-classifier]

The classification head is the final mapping from features to class scores. Logits are unnormalized scores before conversion to probabilities. Global average pooling (GAP) averages each channel spatially. The original teaching architecture has 1562 parameters and no claimed benchmark accuracy.

## 29. Check every layer before training [29-model-audit]

Reveal the two convolution/pooling blocks, then the classifier row and total. Conv1:224; Conv2:1168; head:170; total:1562. GAP returns 16 features; flattening the unpooled 16×8×8 maps would return 1024.

## 30. Express the same architecture in PyTorch [30-code]

Reveal the second block, pooled classifier, then executable shape check. Plain code extraction remains unchanged. Defaults: convolution stride 1, groups 1, dilation 1, enabled bias. Groups partitions channel connectivity; dilation spaces kernel taps. Those optional API features are outside this lecture.

## 31. Train the logits with the familiar objective [31-training]

This synthetic batch demonstrates one valid update, not training performance. Images and labels are placeholders; real work uses a dataloader, fixed split, training-set normalization, appropriate augmentation, and validation monitoring. Target is long class indices. Do not apply softmax before this criterion. Evaluate with model.eval() and torch.no_grad(); select hyperparameters using validation and reserve the test set.

## 32. Repair two common tensor mismatches [32-diagnosis]

Explain the first mismatch, reveal its correction, then show the second mismatch and correction. Channels-last input (4,32,32,3) becomes NCHW with permute(0,3,1,2). Flattening (4,16,8,8) gives 1024 features. Global averaging before flattening restores the intended 16-feature input. No timed response is required.

## 33. Architectural assumptions have limits [33-limits]

Use task choices as discussion: fine-grained boundaries may need high-resolution features; image classification often tolerates compressed spatial detail. These are reasoned architectural tradeoffs, not measured outcomes for this synthetic model. Do not promise robustness from parameter sharing alone. This bullet-list slide is static: all items appear on entry, without intermediate advances.

## 34. Connect structure, geometry, and learning [34-summary]

Revisit the five outcomes through the worked examples. Emphasize the order: specify axes, calculate shapes, count parameters, then train. Present the complete summary at once. This bullet-list slide is static: all items appear on entry, without intermediate advances.

## 35. Check your understanding [35-exit]

Untimed self-check with no submission requirement. All three questions are initially visible; answers are hidden. Advance reveals answers one at a time; Left hides them in reverse, and End reveals all. Answers: output 16×16×16, 1168 parameters; field 5×5; sharing does not imply invariance. The PDF includes completed answers. Offer discussion or private reflection without collecting or scoring responses.

## 36. Reading and further study [36-reading]

Point students to the source lecture for the operator overview, D2L for worked explanations, PyTorch for API contracts, and the supplementary Distill article for receptive-field derivations.
