# CNN · Teaching plan

**Course:** CS172 Computer Vision I. **Instructor:** Jiayuan Gu, ShanghaiTech University. **Audience:** third-year CS undergraduates. **Lecture length:** approximately 90 minutes. **Prerequisites:** matrix products, chain rule, neural networks, cross-entropy, SGD, and Python. Follows Deep Learning Basics.

## Learning outcomes and evidence

| Outcome | Observable performance | Teaching sequence | Evidence of understanding |
|---|---|---|---|
| O1 | Explain locality and sharing | 4–6: translated patterns and structural assumptions | Explain why a detector can reuse its weights |
| O2 | Calculate outputs and shared-weight gradients | 8–14: patch products, channels, chain rule | Reproduce the numerical examples |
| O3 | Derive shapes, parameter counts, and MAC counts | 16–22: placement geometry, worked audit, operation count | Exit item 1; homework derivations |
| O4 | Trace receptive fields and translation properties | 24–27: nested fields, recurrence, counterexample | Exit items 2–3 |
| O5 | Implement and diagnose a classifier | 28–32: architecture, code, tensor corrections | Homework implementation and shape checks |

## Instructor pacing guide

These allocations guide the instructor; they are not time limits for student responses.

| Lecture minutes | Slides | Teaching action |
|---|---|---|
| 0–10 | 1–6 | Establish outcomes, connect to dense networks, explain locality and sharing. |
| 10–32 | 7–14 | Define kernel/bias; compute responses; demonstrate channels and shared gradients. |
| 32–55 | 15–22 | Define stride/padding, derive output size, demonstrate shape changes, work through counts. |
| 55–73 | 23–27 | Define receptive field and downsampling; explain pooling and translation. |
| 73–83 | 28–32 | Connect architecture and code; demonstrate repairs for tensor mismatches. |
| 83–86 | 33–34 | Explain limitations and revisit the main connections. |
| 86–90 | 35–36 | Offer an untimed self-check and readings; reflection may continue after class. |

If more explanation is needed, use slide 25's recurrence as guided reading and review slide 31's update in lab. The final self-check has no submission, deadline, or score requirement.

## Presentation and terminology

Show bullet-led agenda, outcomes, limitations, and summary slides in full. Reserve reveals for worked explanations, calculations, code, and exit-check answers; Left reverses builds and End completes a slide. Fade-ins last 180 ms and are disabled for reduced motion. Layout stays fixed. Use the three controls as explanatory demonstrations without repeated prediction requests. Slides 20 and 32 are worked examples rather than timed quizzes.

Define terms at first use: kernel/filter and bias (7); channel (10); feature map/activation and NCHW (11); stride (16); zero padding (17); floor (18); MAC (22); downsampling (23); receptive field (24); translation operator, equivariance, and invariance (27); classification head/logit (28). MAC means multiply–accumulate: multiply two numbers and add their product to a running sum. Slide 19 reports output values instead of introducing MACs early. Optional API features such as groups/dilation remain in notes.

## Worked examples

**Local response (8–9):** patch `[0,0,1;0,1,2;0,1,3]`, kernel rows `[-1,0,1]`, bias zero. Contributions 1+2+3 give 6. Full output `[6,2,-6;7,1,-7;6,1,-6]`. Move the same kernel over fixed data. Negative responses indicate opposite brightness polarity for this kernel.

**Shared gradient (13):** input `[1,2,3]`, weights `[a,b]`, outputs `[a+2b,2a+3b]`, incoming gradient `[4,5]`. Derivatives `da=14`, `db=23`. Contributions from all uses add.

**Layer audit (20):** input `N×8×16×16`, 16 filters, K3/S2/P1. Reveal weights `16×8×3×3`, output `N×16×8×8`, parameters `16(8·9+1)=1168`. Batch size changes output count, not learned weights.

**Compute (22):** each output uses 27 MACs. There are 8192 outputs, hence 221184 MACs per image, despite only 224 learned parameters. Count padded-zero products; exclude bias additions, ReLU, and backward work. Analytical count is not measured runtime.

**Receptive field (24–25):** K3/S1 stacks yield sides 3,5,7,9,11. Conv3→pool2→conv3→pool2 gives `(r,j)=(3,1),(4,2),(8,2),(10,4)`. Jump means spacing between output centers in original input pixels.

**Pooling/translation (26–27):** max `[4,5;2,6]`; average `[2.5,2;0.75,3]`. Shift `[0,1,0,0]` to `[0,0,1,0]`: stride-2 max pool changes `[1,0]` to `[0,1]`. Sharing does not imply invariance. Boundary handling and stride alignment qualify equivariance.

**Code repair (32):** channels-last `(4,32,32,3)` becomes NCHW with `permute(0,3,1,2)`. Flattening `(4,16,8,8)` gives 1024 values; global averaging first restores the intended 16-feature head. Reveal each correction separately.

## Exit self-check

Slide 35 initially shows the questions with **all answers hidden**. Right/Space reveals each answer; Left hides answers in reverse. No timer, submission instruction, or grading requirement is shown or expected. The completed PDF includes answers for review.

1. Output `16×16×16`; parameters `16(8·9+1)=1168`.
2. Receptive field `5×5` for an output away from the border.
3. No: sharing supports equivariance under compatible assumptions, not invariance. Strided pooling supplies a counterexample.

Offer private reflection or optional discussion without collecting or scoring responses.

## Homework and rubric

Implement the two-block classifier on a small labeled dataset. Record its source/license, fixed split, seeds, optimizer settings, epochs, and environment. Fit normalization on training data only; retain the test set until model selection is complete.

1. Derive shapes, the 1562-parameter total, and MAC counts; compare with implementation counts.
2. Train while monitoring training/validation loss and accuracy; examine errors.
3. Change one factor while holding split and training budget fixed. Report measured results and limitations.
4. Check a tiny shared-filter gradient with finite differences; explain shift behavior with explicit stride/boundary assumptions.

Homework rubric: derivations 30%; implementation/gradient check 25%; reproducibility/evaluation 25%; interpretation 20%. This separate rubric does not apply to the exit self-check.

## Accessibility

Use outlined selections and numerical readouts alongside color. Controls support keyboard operation and reset. All resources work offline. Reduced motion removes fades; the completed PDF provides a static review path. No learning-effectiveness measurement is claimed.
