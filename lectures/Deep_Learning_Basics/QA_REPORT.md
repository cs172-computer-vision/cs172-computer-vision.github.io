# Verification report after separating SVM

Verified 2026-10-19. The current deck has 37 slides. Geometry, duality, slack, kernels and multiclass SVM teaching moved to the separate Support Vector Machines deck. Retained IDs preserve existing links; visible numbering, notes, source mapping and teaching-plan references reflect the new order.

## Content and numerical checks

- The opening recalls only model/objective/update and regularization. The remaining lecture teaches gradients/SGD, MLPs/nonlinearity and brief graphs/backprop.
- The forward-pass example now reports first-class cross-entropy log(1+exp(−6))≈.002475685, consistent with the framework sketch and pure-Python reference.
- The reference MLP now trains with stable softmax cross-entropy, weight-only λ/2 L 2 and actual minibatch SGD. On synthetic XOR it produced labels[0,1,1,0]; objective.770414→.045458.
- All reference weight/bias gradients pass independent central finite differences, maximum absolute discrepancy approximately 9.72×10⁻¹¹. Displayed SGD arithmetic and the XOR feature construction were checked.
- K counts classes consistently across both lectures. C remains a soft-margin penalty in the SVM lecture.

## Live browser checks

- Opened the actual file:// entry with networking disabled using installed Chrome and Playwright 1.58.0.
- Visited and captured all 37 completed slides; title and content bounds detected no safe-margin/footer collisions, missing images, page errors, or remote requests.
- Tested forward/reverse reveals, grouped graph builds, notes/overview, toolbar/autohide, fullscreen/black screen, range keyboard behavior, and uniform fitting at 1280×720,1024×768,768×1024.
- Tested learning-rate calculations/divergence, batch-size redraw, XOR hidden-space switch, and resets for all three retained demos.
- The PyTorch code is a reviewed sketch, not an executed PyTorch test. The standalone numerical implementation uses pure Python.

## PDF and package checks

- 37-page PDF, exact 1080×607.5 pt media boxes, completed builds, meaningful default demo states and retained citation links.
- Rendered every PDF page for visual inspection, including updated opening, shapes, forward-pass answer, summary, exit check and readings.
- Refreshed editable ZIP, README installation/reuse instructions, sources, notes and teaching plan. The existing fragment-based build remains the editable source for this established deck; generated index.html is rebuilt from it.

## Limits

No projector trial or 90-minute teaching pilot. Browser testing is limited to Chrome; other print/fullscreen implementations may vary. Synthetic quadratic/XOR examples are not empirical generalization evidence.
