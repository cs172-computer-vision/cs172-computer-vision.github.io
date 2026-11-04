# CNN Architecture · teaching plan

CS172 Computer Vision I · Jiayuan Gu · ShanghaiTech University. Approximately 90 minutes for undergraduates who have completed CNN fundamentals. Prerequisites: calculus, linear algebra, convolution, stride/padding, receptive fields, gradients, ReLU, SGD, and Python. The student-facing deck has 37 slides; its questions have no team instructions, facilitation labels, or time limits. The original objectives slide and design exercise have been removed. Outcomes and pacing below are instructor planning, not slide content.

The central question is how to compose layers into a network whose representation, optimization, and resource costs suit the task. The Stanford reference supplies the block → VGG → ResNet progression. Inception and MobileNet contrast composition and efficiency strategies. Original paper and lecture figures remain alongside editable teaching diagrams.

## Instructor planning outcomes and alignment

| Outcome | Instruction, current pages | Evidence | Homework |
|---|---|---|---|
| LO1: Trace tensors through stages and merges | 3–6, 9, 15, 23–24 | Shape question (3), branch diagnosis (18), shortcut diagnosis (27) | Q1, Q3 |
| LO2: Calculate weights, MACs, and theoretical receptive fields | 4, 10–13, 17, 25, 30–31 | Context audit (12), filter comparison (11), cost explorer (31) | Q1–2 |
| LO3: Explain sequential, branching, and residual designs | 8–11, 14–16, 19–22, 28 | Path illustrations (8, 28), branch diagnosis (18), exit check (36) | Q2 |
| LO4: Implement and diagnose a residual transition | 21–27 | Shortcut diagnosis (27), code contract (26) | Q3 |
| LO5: Justify an architecture using controlled evidence | 29–34 | Cost-versus-latency check (36), experiment diagram (34) | Q4 |

## Instructor pacing

The following allocation totals 90 minutes. It is not shown on the slides and imposes no timed question or submission requirement.

| Lecture clock | Current pages | Content |
|---|---|---|
| 00–05 | 1–3 | Introduce the architecture question and retrieve shapes and shared weights. |
| 05–12 | 4–6 | Separate weights, spatial reuse, and stored activations; explain normalization routes. |
| 12–18 | 7–9 | Training contracts, composition motifs, and VGG stage structure. |
| 18–27 | 10–13 | Receptive fields, small-filter stacks, the context audit, and classifier-head cost. |
| 27–37 | 14–18 | Original Inception figure, pointwise mixing, channel-reduction paths, and branch mismatch. |
| 37–43 | 19–21 | Actual depth-degradation curves and the original residual-block illustration. |
| 43–48 | 22–23 | Identity Jacobian and a shape-correct projected shortcut. |
| 48–57 | 24–26 | Full residual network, original bottleneck figure, and code contract. |
| 57–62 | 27–28 | Diagnose the shortcut and visualize addition versus concatenation. |
| 62–71 | 29–31 | Efficient factorization and width/resolution cost exploration. |
| 71–76 | 32 | Separate MAC counts, memory, and target-device latency. |
| 76–84 | 33–34 | Transfer baseline and a controlled architecture experiment. |
| 84–90 | 35–37 | Summary, three exit questions, and precise follow-up reading. |

If scope must be reduced, shorten the bottleneck elaboration and cost-explorer variants. Retain the merge contracts and three exit checks.

## Numerical keys and misconceptions

- **3 / `04-retrieval`:** output 16×16×128; 73,728 weights without bias; 18,874,368 convolution MACs. Spatial size changes reuse, not the shared weight count. Slide shapes use HWC without batch; code uses NCHW.
- **4 / `05-cost`:** the drawings are schematic. A bank of k×k×Cin filters has k²CinCout weights; reuse at HoWo locations gives convolution MACs; the output stores HoWoCout activations. The highlighted spatial cell shows reuse and is not an extra filter.
- **11 / `12-small-filters`:** at fixed channels and spatial size, one 7×7 has 49C² weights, three 3×3 layers have 27C². At C=64: 200,704 versus 110,592. ReLU appears after each shown convolution. Equal theoretical extent does not imply equal functions.
- **12 / `13-context-check`:** after conv: 32×32×64, r=3, j=1; after pool: 16×16×64, r=4, j=2; after final conv: 16×16×128, r=8, j=2. The aligned audit table is retained to support calculation.
- **17 / `18-reduction`:** direct 192→128 via 3×3 costs 221,184 weights and 173,408,256 MACs at 28². The 192→96 pointwise layer followed by a 96→128 spatial layer costs 129,024 weights and 101,154,816 MACs. Both stages retain 28² resolution; reduction is 41.7%.
- **18 / `19-branch-check`:** set branch B padding to 1. All outputs then have 28×28 grids, and concatenation gives 256 channels. The smaller 26×26 branch is highlighted in the routing diagram. The answer stays in the notes.
- **25 / `26-bottleneck`:** the original source's left block has 64 channels and 73,728 convolution weights; the right bottleneck has 256 outer / 64 inner channels and 69,632 weights. Do not silently treat the source's left block as 256-wide.
- **27 / `28-debug`:** main output (8,128,28,28), identity output (8,64,56,56). Use a 1×1 stride-2 64→128 projection, typically followed by BN. Concatenation cannot repair spatial mismatch and changes the block's channel contract.
- **28 / `29-merge-check`:** two H×W×C inputs produce C channels by addition and 2C by concatenation. A following 3×3 convolution to C channels has 9C² versus 18C² weights. The drawn sheets are schematic, not literal C.
- **31 / `32-budget`:** default dense 57,802,752 versus separable 6,874,112 MACs. Halving output side divides both by four; halving width quarters the dense term but only halves the depthwise term. No measured speedup is simulated.
- **36 / `39-exit`:** three answers only: 5×5 theoretical extent; align changed shortcut shapes; measure latency under a fixed protocol. The removed design exercise has no dependent question here.

## Homework (20 points)

1. **Shape and context audit (5 points; LO1/2).** For a 64×64×32 input, use conv3×3/stride1/pad1 to 64 channels, pool2×2/stride2, conv3×3/stride2/pad1 to 128. Give every output shape, r and j, convolution weights, and forward convolution MACs. Exclude biases. Show arithmetic and units.
2. **Design comparison (4 points; LO2/3).** At constant spatial size with 128 channels throughout, compare one 5×5 convolution to two 3×3 convolutions. State receptive-field extent, weight/MAC ratios, and why equal context does not imply equal functions. Explain serial computation or activation storage.
3. **Residual implementation (5 points; LO1/4).** Implement a post-activation basic block. Demonstrate identity, channel transition, and same-channel stride-2 cases; assert shapes and finite gradients. Explain the BN train/eval contract and why channel equality alone does not justify an identity shortcut. Use synthetic inputs; training a dataset is unnecessary.
4. **Controlled architecture proposal (6 points; LO5).** Specify a small-image classification task and resource limit. Propose one baseline and one block modification. Give a reproducible evaluation protocol, training and selection budget, accuracy metric, memory/MAC accounting, and a target-device timing protocol. State the evidence that would change your preference. An empirical pilot is optional; label unmeasured claims as hypotheses. If running a pilot, retain a held-out test split and report variation rather than selecting favorable runs.

### Marking guide and instructor numerical key

Q1: shape 1, context 1, weights 1, MACs 1, conventions 1. Shapes: 64²×64, 32²×64, 16²×128. Context/jump: (3,1), (4,2), (8,4). Weights: 18,432 + 73,728 = 92,160. MACs: 75,497,472 + 18,874,368 = 94,371,840. Q2: extent 5×5, weights 409,600 versus 294,912; ratio 18/25, 28% fewer for the stack under fixed shapes. Award 2 for correct comparison, 2 for meaningful limitations. Q3: 2 for contracts, 2 for executable checks/backprop, 1 for mode reasoning. Q4: 2 for controlled comparison, 2 for resource/timing protocol, 1 for selection discipline, 1 for falsifiable justification. Do not reward an unsupported claim that a named architecture must be best.

## Teaching evidence and visual choices

Use the shape, context, branch, and shortcut questions to identify errors in locality, padding, context jumps, and merge contracts. The three exit answers check context, shape alignment, and cost-versus-latency reasoning. Homework supplies the implementation and experiment-design evidence; no student results are claimed.

Eight former tables are now illustrations: filter storage/reuse/output, normalization routes, three network motifs, filter-stack comparison, channel-reduction paths, branch mismatch, feature-volume merges, and a controlled experiment. The tensor/context audit is the only remaining content table. Progressive builds are limited to calculations, comparisons, code, and answers. Bullet-only exposition stays static, and reverse navigation restores previous stages. The six original paper/reference-lecture image crops are unchanged.
