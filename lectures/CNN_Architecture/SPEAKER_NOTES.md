# CNN Architecture · Speaker notes

Derived from inline slide-meta in index.html. Regenerate with tools/refresh.py.

## 1. CNN Architecture [01-title]

Open with the question: if we can implement convolution, what makes a good network? Relate the architecture choice to a concrete constraint. Prerequisites: convolution, padding, stride, receptive fields, backpropagation, ReLU, SGD, and tensor shapes. This is a separate architecture lecture following CNN fundamentals.

## 2. From layers to design decisions [02-roadmap]

Lecture sequence: layer and shape contracts; context and branching; trainable residual depth; efficient operators and fair model evaluation. The original source figures and numerical examples remain. Builds are restricted to calculations, code, and visual comparisons; bullet-only exposition stays static.

## 3. Before we add another layer [04-retrieval]

Output: 16×16×128. Weights: 3×3×64×128 = 73,728, excluding bias. Shared weights are independent of spatial size; MACs depend on the number of output locations. Shapes omit batch and use HWC. A frequent error is multiplying weight count by H×W.

## 4. Convolution: weights, computation, output [05-cost]

Weights: k²CinCout learned parameters for a dense convolution without bias. The illustrated filter bank has dimensions k×k×Cin×Cout in the spatial-first notation used here; PyTorch stores convolution weights as Cout×Cin×k×k. Computation: applying the bank at HoWo output positions requires HoWo k²CinCout MACs per image. Output tensor: Ho×Wo×Cout, storing HoWoCout scalar elements. The outlined cell marks one output position; no pointer is needed. Diagrams are schematic, not literal channel counts. Reveal computation, then the output tensor. For the preceding example: 73,728 parameters, 18,874,368 MACs, 32,768 output elements (128 KiB in FP32). Training memory also includes saved activations, gradients, and optimizer state.

## 5. A network is a sequence of stages [06-blocks]

Stem transforms the raw image. A stage contains blocks with compatible feature shapes; a transition changes resolution or channel count. Reducing H and W saves spatial computation but removes detail that later layers cannot recover exactly. Increasing channels grows representational capacity and can offset some of the computation saved. Ask why early downsampling may hurt very small objects.

## 6. Normalize features within a channel [07-batchnorm]

For NCHW tensors, BatchNorm2d computes per-channel batch statistics across N,H,W during training. Gamma and beta each have C learned values. Running means/variances are buffers, not learned weights. Default evaluation uses tracked running statistics; model.eval() matters even if gradients are disabled. Very small batches or domain shifts can make these statistics unreliable. Do not present internal covariate shift as a settled causal explanation.

## 7. Architecture needs a training contract [08-training]

For a dense conv, fan_in = k²Cin (adjust for groups). Kaiming initialization is a useful starting point, not a proof of stable training for an arbitrary graph. With dropout probability p, retained activations are divided by 1−p in train mode; evaluation is identity. This differs from the source lecture’s test-time scaling convention but has the same expectation. Dropout is not required after every convolution; common residual blocks rely on other regularizers. Training details are kept brief to preserve the architecture focus.

## 8. Three ways to compose features [09-motifs]

The three diagrams show information routing rather than a list of model names. Sequential composition passes one transformation into the next. Parallel branches preserve their outputs in separate channel ranges. A residual sum superposes aligned entries. Concatenation and addition therefore impose different shape contracts. The drawing is schematic; arrows indicate information flow, not time or measured cost.

## 9. VGG: repeat a small, regular block [10-vgg]

Trace each stage output after pooling. Channels are 64,128,256,512,512. The schematic is VGG configuration D (VGG16); fully connected layers operate on 7×7×512 after the fifth pool. ReLU follows hidden weight layers and dropout appears in the hidden FC head in the original model. The diagram omits those operations for readability. No BatchNorm is implied in original VGG16.

## 10. Repeated local filters grow context [11-context]

Start r0=j0=1. Three stride-one 3×3 layers give r=3,5,7 and j=1. j is the spacing between adjacent output centers measured in input pixels. These are theoretical receptive-field extents; the learned influence within that region need not be uniform. Padding can make some edge positions depend partly on padding rather than real pixels. The source calls this effective receptive field; distinguish it from empirical effective influence.

## 11. Same context, different computation [12-small-filters]

Assume all layers preserve H×W, channels are C in/out and hidden, dilation 1, and no bias. Weight ratio 27/49 ≈ .551, a 44.9% reduction; MAC ratio is the same under these fixed spatial sizes. Three nonlinear layers add representational flexibility but also serial dependencies and saved activations. Without nonlinearities, composing convolutions gives a constrained linear operator; do not claim arbitrary equivalence to a dense 7×7 kernel. Build: show the large kernel first, then the small-filter stack, then its numeric comparison and limitation.

## 12. Trace a change in resolution [13-context-check]

After conv: 32×32×64, r=3, j=1. After pool: 16×16×64, r=4, j=2. After final conv: 16×16×128, r=8, j=2. Pooling changes the spacing of sampled input locations. The last convolution adds 2×j=4 input pixels of context. These are theoretical receptive-field extents. The table is retained because its aligned rows support the tensor and context calculation.

## 13. The classifier can dominate the weights [14-global-pooling]

This is a controlled head-only comparison, NOT the original VGG classifier count, which first maps to 4096. Exclude bias in both; including it adds 1000 to each. Global pooling has no learned weights. It permits varying spatial dimensions at the feature level but does not remove preprocessing requirements or guarantee spatial invariance of the whole model. Ask when location information matters for a task. Build: present the flatten head before revealing global pooling and the consequence.

## 14. Combine evidence at different scales [15-branches]

Bridge from repeated uniform VGG blocks to Inception. Different branches can expose local and broader context to the following layer, but learned features are not guaranteed to correspond to specific object scales. All branch outputs must share batch, height, and width; only channel dimension changes under concatenation. This is the conceptual rule, independent of the exact Inception configuration.

## 15. Inception: branches with channel reduction [16-inception]

Original figure crop from Figure 2(b), paper PDF page 5; labels and arrows are preserved. This generic module does not print channel counts. Read the input at the bottom and concatenation at the top. Inception3a (Table 1) has input 28×28×192 and outputs 64,128,32,32 channels, totaling 256. The 3×3 branch uses a 96-channel 1×1 reduction and the 5×5 branch uses a 16-channel reduction. All spatial branches preserve H,W at stride 1 with padding; pooling is padded. Connect those values to the calculation on the reduction slide. This source figure replaces the reconstructed module.

## 16. A 1 × 1 filter mixes channels [17-pointwise]

Use the analogy of the same small fully connected layer applied at every pixel. It has Cin×Cout weights plus Cout biases. It does not directly expand the spatial receptive field at stride 1. With a subsequent activation it also adds nonlinearity. A 1×1 stride-two layer subsamples positions; preservation of the grid here explicitly assumes stride 1.

## 17. Spend spatial computation at a smaller width [18-reduction]

The paths hold spatial size and output width fixed. Direct weights: 9×192×128 = 221,184. With reduction: 192×96 + 9×96×128 = 129,024. Both stages of the reduced path operate at 28×28, so MAC counts are 173,408,256 versus 101,154,816; ratio 7/12, a 41.7% reduction. Reveal compression before the numerical savings. The branch is not guaranteed to retain equal accuracy; very aggressive width reduction can discard useful information. Bias, BN, activations, and pooling are excluded.

## 18. Can these branch outputs be merged? [19-branch-check]

Branch B is smaller because its stride-one 3×3 convolution uses padding 0. Set its padding to 1 so all four branches have a 28×28 grid. The concatenated tensor is 28×28×256, from 64+128+32+32 channels. Branch D uses size-preserving pooling and a pointwise projection. Concatenation cannot repair spatial mismatch. Addition also would require matching channel counts. The highlighted incompatible output is part of the question; the answer remains here.

## 19. Make depth trainable [20-depth]

Transition: VGG and branches offer expressive graphs, but fitting their weights is a separate problem. Distinguish optimization from generalization. The next section follows the VGG-to-ResNet narrative in the supplied lecture.

## 20. Training error diagnoses the failure [21-degradation]

Display the actual measured curves from He et al., Figure 1, paper PDF page 1. Left: training error (%); right: test error (%); horizontal axis: iterations in units of 10,000. Red is the 56-layer plain network; yellow-green is the 20-layer plain network. Lower error is better. Ask students to compare the training curves before revealing the interpretation. This empirical observation is different from the source lecture’s schematic curves and is not a universal law about depth. Higher training error is evidence of an optimization difficulty under this procedure, not merely an overfitting pattern. Do not recolor or redraw the measured curves.

## 21. Learn a correction to the input [22-residual]

Original figure crop of the residual-block illustration on CS231n 2026 Lecture 6 slide 52, credited there to He et al. Preserve its bottom-to-top direction and explain that the x labels refer to the same input. The source figure omits normalization; the implementation later includes BN. First establish the sum and final ReLU, then reveal the residual reparameterization. H denotes the desired mapping before final ReLU. A zero residual gives z=x, but y=ReLU(x); this is an exact identity only on nonnegative inputs. Original post-activation formulation, not the pre-activation variant.

## 22. The shortcut contributes an identity term [23-gradient]

Derive with column gradients; JF is the output-by-input Jacobian. The direct additive route can help propagation, but no guarantee follows: a=-1 cancels the identity, a near -1 can shrink it, and large a can amplify it. With the final ReLU, grad_z = diag(z>0) grad_y almost everywhere. Do not say residual connections solve vanishing gradients universally. This extends the paper’s mapping intuition with an original chain-rule derivation. Build: establish the Jacobian, reveal the chain-rule gradient, then the scalar example.

## 23. A shortcut must match the residual shape [24-projection]

Input 56×56×64; output 28×28×128 on both paths. Main branch first conv has stride 2, second stride 1, both 3×3 padding 1. Shortcut 1×1 stride 2 padding 0 changes both resolution and channels, followed by BN in the implementation. It contributes 64×128 = 8192 weights plus 256 BN parameters. A shape-correct projection is not an identity route: derivative is Js+JF. The paper also considers zero-padding shortcuts; here we choose a learned projection for a consistent implementation.

## 24. Read a complete residual network [25-resnet18]

For input 224×224×3, stem 7×7 stride 2 padding 3 gives 112×112×64; 3×3 maxpool stride 2 padding 1 gives 56×56×64. Stage outputs are shown. First blocks of stages 2,3,4 downsample. Final GAP gives 512 features then 1000 logits. Depth counts main-path weighted layers and FC, excludes shortcuts, BN, and activations. Thus 18 is a naming convention, not the total number of modules. Original diagram from ResNet Table 1 configuration.

## 25. A residual bottleneck controls width [26-bottleneck]

Original Figure 5, paper PDF page 6. The left basic block has width 64, not 256, so its two spatial convolutions have 2×9×64²=73,728 weights. The right bottleneck has 256 input/output channels and internal width 64, giving 69,632 weights. These differently shaped blocks have similar convolutional parameter cost; do not claim they are the same function. Reveal the right-block calculation after tracing its compression and expansion. A hypothetical pair of 256→256 spatial convolutions would cost 1,179,648 weights, but that is NOT the left block in the original figure. BN and activations are excluded from these counts. ResNet50 counts 1+3×(3+4+6+3)+1=50 main-path weight layers.

## 26. Implement the block contract [27-code]

This is an excerpt from a BasicBlock class: import torch and from torch import nn, subclass nn.Module, call super().__init__(), place initialization inside __init__, forward code inside forward. Full executable class is in tools/check_model.py and follows this exact module order. Conv uses no bias because following BN includes an affine offset. NCHW in code versus HWC on diagrams is explicit. The example handles stride 1 and 2, dilation 1, no groups. Check on synthetic input; no accuracy claim. Build: residual branch, shortcut contract, then final addition and its reminder.

## 27. Find the broken residual transition [28-debug]

Main output: (8,128,28,28); identity output: (8,64,56,56). Replace the shortcut with a 1×1 stride-two 64→128 convolution, typically followed by BN. Concatenation alone cannot repair the spatial mismatch; even after alignment it would change the output width and block meaning. The snippet isolates addition; a complete basic block also contains its second convolution and normalization.

## 28. Addition and concatenation encode different choices [29-merge-check]

The colored stacks are schematic feature volumes, each H×W×C. Addition combines corresponding entries and preserves C channels; concatenation carries both channel groups and produces 2C channels. The number of drawn sheets is illustrative, not the numeric value C. A subsequent dense 3×3 convolution to C channels therefore has 9C² versus 18C² weights, with the same spatial output size. Reveal only the downstream cost after the routing comparison. Neither merge guarantees higher accuracy.

## 29. Design within a budget [30-efficiency]

Architecture is constrained by resolution, width, serial depth, activation memory, and hardware. Use MobileNet’s factorization as one concrete tool rather than a catalogue of every modern model. The material that follows extends the supplied lecture and supports the cost and evaluation examples.

## 30. Factor spatial filtering and channel mixing [31-depthwise]

Two original figure crops from MobileNet Figure 2(b) and (c), PDF page 3. The dense-filter subpanel (a) is omitted. Original D_K is the kernel side k used in our equations; M is input channels, N output channels. First show the spatial filter bank, then reveal the pointwise bank and combined weight formula as one grouped build. Captions are retyped outside the artwork for projection readability. Depthwise multiplier 1, stride 1, same spatial sizes. No bias, BN, or activation cost is counted. These are filter banks, not feature maps. Factorization constrains spatial–channel coupling and is not an arbitrary dense kernel expressed for free.

## 31. Explore width and spatial cost [32-budget]

Predict before touching a control: halving R quarters both MAC counts; halving width approximately quarters dense conv cost. Depthwise cost is linear in width, pointwise cost quadratic. At default: dense 73728 weights and 57802752 MACs; separable 8768 weights and 6874112 MACs; ratio 8.409×. Alpha=0.5 gives M32 N64. Alpha=1.5 gives M96 N192. Bars share the selected dense MAC baseline of 100%. Default values are restored on print. No timing or trained accuracy is simulated.

## 32. Fewer MACs do not guarantee lower latency [33-latency]

A depthwise kernel can have fewer MACs yet run poorly on a given backend because of memory bandwidth, kernel availability, and small operations. Width and resolution can also change utilization. Do not infer measured speedups from the preceding algebra. A fair report includes preprocessing, device, batch size, numerical precision, warmup, synchronization, repeats, and timing scope. Use validation data for selection and reserve a test set for the final report.

## 33. Choose what to reuse and what to learn [36-transfer]

A frozen backbone requires requires_grad_(False) to stop parameter gradients; use eval() on it to freeze default BN running statistics. model.train() resets submodule modes, so reapply backbone.eval() for the frozen baseline. The classifier may remain in train mode. If fine-tuning, use smaller backbone learning rates as a starting hypothesis and evaluate; domain shift and data size matter, not a universal image-count threshold. Avoid leaking validation examples into training augmentation or preprocessing fitting.

## 34. An architecture claim needs a fair experiment [37-evaluation]

The fork defines a controlled comparison. Share data splits and preprocessing; hold pretraining, augmentation, resolution, optimizer family, and evaluation protocol fixed or report differences. Give both models comparable tuning effort: identical hyperparameters are not automatically equally favorable. The variant changes one architectural choice. Measure accuracy plus resource use under a documented device, precision, and batch size. Report seed variation when available. Select on validation data and use the held-out test only after decisions are fixed. No empirical result is invented in this schematic.

## 35. Carry the design principles forward [38-summary]

Ask students to name a calculation they can now do and a claim they can no longer justify from MACs alone. Avoid introducing new architectures here. Depth, width, and resolution are coupled choices rather than independent guarantees of quality.

## 36. Exit check [39-exit]

Three checks: two stride-one 3×3 layers give a 5×5 theoretical receptive-field extent with no prior downsampling; a shortcut must align spatial and channel dimensions when shape changes; MAC counts do not establish latency without measurements. Reveal answers separately and use Left to hide them. No design-case question remains.

## 37. Reading and further study [40-reading]

Required follow-up: source architecture section and ResNet §3. VGG and Inception support the calculations; MobileNet is supplementary depth. Explain that the teaching plan contains homework and an aligned rubric. External links need internet; all presentation resources and figures are local.
