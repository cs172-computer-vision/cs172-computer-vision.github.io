---
name: create-cv1-web-deck
description: Create and revise offline web-based lecture decks for CS172 Computer Vision I in a local VS Code workspace, with directly editable HTML, local assets, PDF export, and teaching notes. Use for preparing lectures, adapting reference slides, and improving existing decks.
---

# Create Computer Vision I web decks

Use this workflow to produce presentation-ready, academically rigorous lectures. Follow the current request over these defaults. Preserve approved content and design when revising an existing deck.

## 1. Establish the teaching brief

- Default to **CS172 Computer Vision I**, Jiayuan Gu, ShanghaiTech University; third-year CS students familiar with calculus, linear algebra, probability, and Python.
- Plan approximately **90 minutes** per topic, adjusting duration or marking optional material when scope requires it. Do not target a fixed slide count.
- Identify the topic, prerequisites, reference materials, required coverage, and expected outputs from the request. Ask only for missing information that materially changes the result; infer routine choices.
- For revisions, inspect the current deck and its tooling before editing. Resolve requested page numbers against the current HTML slide order and inline metadata before renumbering; use stable slide IDs to target changes.

## 2. Design the curriculum and narrative

- Define **3-6 measurable learning outcomes** in the teaching plan. Align explanations, activities, homework, and assessment with them.
- Inspect supplied reference lectures and retain their conceptual flow unless a change improves correctness, continuity, or pacing. Merge repeated source frames into staged builds when helpful.
- Develop intuition, mathematical formulation, worked examples, implementation, and limitations in a coherent sequence appropriate to the topic.
- Check whether adjacent slides repeat the same argument. Merge them or use grouped reveals when this shortens the lecture without skipping a conceptual step. Keep secondary derivations and caveats in speaker notes.
- Put an agenda near the beginning, normally on slide 2. Add a bridge when consecutive ideas lack a connection; use brief section dividers for substantial transitions.
- Include short prediction, calculation, interpretation, or diagnosis activities. Allocate realistic time for discussion and demonstrations.
- Close with a summary, an exit check when useful, and a reading list. Keep homework in the teaching plan unless requested on slides. Avoid unsolicited next-lecture teasers.
- Link readings to concrete chapters, sections, or papers and briefly explain their relevance. Mark supplementary material explicitly; do not automatically expand it into lecture slides.

## 3. Apply the visual and editorial style

- Use **16:9**, a simple academic style, restrained color, and consistent alignment. Prefer a clean slide composition over decorative panels or effects.
- Give each slide **one main title without a subtitle**. Show the current section in the footer.
- On the title slide, place the course above the instructor and institution. Prefer one relevant figure rather than a collage.
- Keep each slide focused. Split crowded material, move detail to speaker notes, or use progressive reveals before shrinking text.
- Write necessary, precise text. Remove filler, vague transitions, ambiguous temporal references, and commentary about producing the deck.
- Start with a **1440 × 810 px** canvas, **30 px** body text, secondary explanatory text **at least 24 px (18 pt)**, and titles around **50 px**. Check smaller diagram labels for projection readability.
- Start with **96 px** horizontal safe margins, title top **56 px**, content top **160 px**, and roughly **48 px** column gaps. Adjust these values to fit the content while preserving generous whitespace and a clear gap above the footer.

## 4. Keep mathematics and examples coherent

- Plan notation across each section. Define symbols when introduced and use them consistently in equations, diagrams, code, controls, and notes.
- Distinguish vectors, scalars, sample indices, coordinate indices, classes, and parameters. Explain changes in convention when reusing a source figure.
- Render mathematics professionally with bundled fonts and styles; use legible code formatting and explicit array shapes where relevant.
- Preserve numerical values, ordering, colors, and identities across algebraic, geometric, and visual explanations. Do not silently switch examples between related slides.
- Derive displayed numbers and connect them to the corresponding plotted points, axes, labels, and units. Name reported quantities explicitly, including what a percentage measures and whether higher or lower is better.
- Separate measured results, synthetic demonstrations, and schematic trends. State consequential assumptions and avoid presenting a typical trend as a universal law.
- Verify worked arithmetic and the behavior of displayed code. Explain indexing differences between mathematical notation and implementation when needed.

## 5. Select figures and useful interactions

- Prefer clear figures from supplied lectures or authoritative primary sources. Inspect them and cite the actual source. Use requested figures faithfully when suitable.
- Recreate precise diagrams and plots with editable vector or plotting code when this improves clarity. Use generated imagery only for suitable illustrative purposes.
- Cite in place with short, meaningful hyperlinks. Maintain a provenance ledger with URLs, credits, licenses, adaptations, and reference-page mappings.
- Add interaction only when changing a parameter or testing a prediction aids understanding. Use a static figure when it communicates the idea adequately.
- An open question can be enough. When inviting students to reason, keep the answer in speaker notes unless an on-slide reveal is useful; do not add a button merely to demonstrate the answer immediately.
- Hold other factors fixed in comparisons. Provide meaningful defaults, reset behavior, clear legends, distinct markers, and annotation leaders that avoid obscuring data.
- Reveal one explanatory step at a time. Support reverse navigation and reduced motion; keep the completed state understandable without animation.

## 6. Build an offline, maintainable presentation

### Work in the local VS Code project

- Edit the existing lecture folder in the local workspace. The folder itself is the editable deliverable; **do not create or refresh a ZIP unless explicitly requested**. Keep changes scoped to the requested deck and supporting course links when relevant.
- Use a **multi-file project**: editable `index.html`, scripts and styles in `source/`, figures in `assets/`, local libraries/fonts/licenses in `vendor/`, and authoring tools in `tools/`. Reuse existing names and organization where practical. Generate a single HTML with everything embedded only when explicitly requested.
- Provide a ready-to-open `index.html` with all required assets in the same portable folder tree. Use relative paths; avoid absolute machine paths and root-relative URLs that break after moving or extracting the folder.
- Make the delivered presentation work offline by opening `index.html` directly in a browser (`file://`), without installing dependencies, starting a server, or signing in. Allow a local development server for convenience in VS Code, but do not make it a presentation requirement.
- Store every runtime dependency locally, including library JavaScript and CSS, fonts, images, media, and licenses. Remove CDN imports, remote font stylesheets, and other network-dependent presentation resources. Allow external citation and reading links, clearly separate from resources needed to present.

### Keep one editable slide source

- Make **`index.html` the single editable source for slide content**, and open that same file to present. Author slides as readable HTML sections with stable IDs. Do not maintain per-slide fragments or a second generated copy of the slide content.
- Keep notes and reference metadata inline, for example in a `script` element with `type="application/json"` and `id="slide-meta"`. Use the HTML section order as the presentation order; derive titles/order where practical, or validate any repeated metadata against it. Do not require runtime fetching of fragments or JSON.
- Keep styles, navigation, math rendering, interactions, and drawing logic in separate local files as useful. Keep authoring mathematics editable, for example as LaTeX in `<m>` elements rendered by bundled KaTeX on page open.
- A refresh/build script may update counters, accessible labels, SVG snapshots, speaker notes, and source mappings. It must preserve authored slide content rather than assemble or overwrite it from another content tree. Identify derived files in the README and regenerate them from their canonical source.
- For an existing deck that uses generated fragments, avoid introducing another content copy. Migrate when requested or when restructuring is part of the task; preserve content, notes, citations, assets, and stable IDs before retiring the old sources.
- Choose a lightweight stack. Use browser-compatible local scripts or build dependencies into locally loadable bundles. Avoid runtime module-loading or resource-fetching patterns that require an HTTP server; verify the actual `file://` presentation path rather than assuming development-server behavior carries over.
- Pin development dependencies and include a lockfile when using a package manager. Document presentation requirements separately from authoring requirements. In the README, give a one-time setup and later refresh/export commands; prefer a reusable authoring environment outside the checkout so future decks can share it. Reuse installed tools when suitable. Never download dependencies during presentation.
- Generate counters and refresh notes and reference mappings automatically after insertions or deletions. Preserve targeted editability rather than rewriting the whole deck for one change.
- Share deterministic drawing logic between live illustrations and static snapshots where possible. Keep generated figures and the code needed to reproduce them in the editable package.

### Preserve presentation controls and PDF export

- Keep the toolbar hidden most of the time and its dimensions fixed as labels change. Use reserved counter slots, bottom-edge reveal, keyboard access, and automatic hiding. Treat **840 × 52 px** and approximately **2.2 seconds** as adjustable starting values.
- Support Right/Space to advance, Left to reverse, and End to reveal all, plus overview, presenter notes, fullscreen, and print controls. Preserve normal keyboard behavior inside inputs and buttons.
- Scale the slide uniformly to fit the display. Export PDF at 16:9 with completed reveals, meaningful default demonstration states, and intact text, mathematics, and citation links where possible.

## 7. Verify and deliver

1. Edit the canonical HTML and relevant local files. Check narrative continuity, notation, assumptions, arithmetic, and correspondence between examples and figures. Reuse the deck's existing refresh and export tools rather than creating a parallel workflow.
2. Refresh affected derived artifacts after insertions, deletions, or reordering. Check agreement among slide IDs/order, counters, titles, notes, source mappings, and teaching-plan page references. Keep current README and QA guidance accurate; label historical revision records clearly.
3. Verify the actual offline `file://` presentation in a browser, including local math/fonts/images. For changed interactions, check parameter behavior, defaults/reset, input keyboard behavior, and forward/reverse builds. Check normal motion as well as reduced motion when animation changes. For structural changes, also check toolbar, notes, overview, fullscreen, and responsive scaling. Prefer meaningful numerical invariants over tests that only mirror wording or markup.
4. Refresh the PDF when rendered slides change. Export completed reveals and default demo states; check page count, exact 16:9 dimensions, and retained text/links. Render and inspect every PDF page, using contact sheets for an initial pass and larger views for changed or dense slides. Fix clipping, overlap, tiny labels, misplaced annotations, and footer collisions. Documentation-only edits do not require a PDF export or browser rerun.
5. Report material verification limits honestly in the QA record. Distinguish live-browser checks, numerical checks, DOM simulation, and visual PDF review. After checks pass, repeat them only for further changes or unresolved issues.
6. Keep the local lecture folder complete with README, timed teaching plan and aligned assessment, speaker notes, source ledger/map, and refresh/export instructions. Preserve existing file identities. Finish with concise clickable local links to the deck and updated PDF, plus the main changes and verification results. ZIP export, upload, hosting, and deployment are separate actions performed only when requested.
