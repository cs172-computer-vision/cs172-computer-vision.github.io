---
name: create-cv1-web-deck
description: Create and revise self-contained web-based lecture decks for CS172 Computer Vision I. Use for requests to prepare computer vision lecture slides, adapt reference lectures into offline HTML presentations, improve existing web decks, or deliver a PDF and maintainable source package with teaching notes. Apply general curriculum, presentation, notation, citation, interaction, and verification standards across lecture topics.
---

# Create Computer Vision I web decks

Use this workflow to produce presentation-ready, academically rigorous lectures. Follow the current request over these defaults. Preserve approved content and design when revising an existing deck.

## 1. Establish the teaching brief

- Default to **CS172 Computer Vision I**, Jiayuan Gu, ShanghaiTech University; third-year CS students familiar with calculus, linear algebra, probability, and Python.
- Plan approximately **90 minutes** per topic, adjusting duration or marking optional material when scope requires it. Do not target a fixed slide count.
- Identify the topic, prerequisites, reference materials, required coverage, and expected outputs from the request. Ask only for missing information that materially changes the result; infer routine choices.
- For revisions, inspect the current artifact and its editable sources before changing it. Resolve requested page numbers against the current manifest.

## 2. Design the curriculum and narrative

- Define **3-6 measurable learning outcomes** in the teaching plan. Align explanations, activities, homework, and assessment with them.
- Inspect supplied reference lectures and retain their conceptual flow unless a change improves correctness, continuity, or pacing. Merge repeated source frames into staged builds when helpful.
- Develop intuition, mathematical formulation, worked examples, implementation, and limitations in a coherent sequence appropriate to the topic.
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
- Hold other factors fixed in comparisons. Provide meaningful defaults, reset behavior, clear legends, distinct markers, and annotation leaders that avoid obscuring data.
- Reveal one explanatory step at a time. Support reverse navigation and reduced motion; keep the completed state understandable without animation.

## 6. Build an offline, maintainable presentation

### Deliver a portable project folder

- Default to a **multi-file project suitable for VS Code**. Keep HTML, CSS, JavaScript, images, fonts, and libraries as separate local files where useful. Generate a single HTML with everything embedded only when explicitly requested.
- Provide a ready-to-open `index.html` with all required assets in the same portable folder tree. Use relative paths; avoid absolute machine paths and root-relative URLs that break after moving or extracting the folder.
- Make the delivered presentation work offline by opening `index.html` directly in a browser (`file://`), without installing dependencies, starting a server, or signing in. Allow a local development server for convenience in VS Code, but do not make it a presentation requirement.
- Store every runtime dependency locally, including library JavaScript and CSS, fonts, images, media, and licenses. Remove CDN imports, remote font stylesheets, and other network-dependent presentation resources. Allow external citation and reading links, clearly separate from resources needed to present.

### Keep editing and presentation separate

- Keep one editable fragment per slide and stable slide IDs. Use a manifest for order, sections, notes, and source mappings. Assemble fragments and metadata into the entry HTML or a local script during the build; do not require runtime fetching of slide fragments or JSON to open the deck.
- Organize source slides, styles, scripts, assets, and vendored dependencies into clear directories. If using a build step, distinguish canonical source files from generated presentation files and include a complete, already-built output folder.
- Choose a lightweight stack. Use browser-compatible local scripts or build dependencies into locally loadable bundles. Avoid runtime module-loading or resource-fetching patterns that require an HTTP server; verify the actual `file://` presentation path rather than assuming development-server behavior carries over.
- Pin development dependencies and include a lockfile when using a package manager. Document installation and rebuild commands for editing, while keeping the delivered presentation usable without running those commands. Never download dependencies during presentation.
- Generate counters and refresh notes and reference mappings automatically after insertions or deletions. Preserve targeted editability rather than rewriting the whole deck for one change.
- Share deterministic drawing logic between live illustrations and static snapshots where possible. Keep generated figures and the code needed to reproduce them in the editable package.

### Preserve presentation controls and PDF export

- Keep the toolbar hidden most of the time and its dimensions fixed as labels change. Use reserved counter slots, bottom-edge reveal, keyboard access, and automatic hiding. Treat **840 × 52 px** and approximately **2.2 seconds** as adjustable starting values.
- Support Right/Space to advance, Left to reverse, and End to reveal all, plus overview, presenter notes, fullscreen, and print controls. Preserve normal keyboard behavior inside inputs and buttons.
- Scale the slide uniformly to fit the display. Export PDF at 16:9 with completed reveals, meaningful default demonstration states, and intact text, mathematics, and citation links where possible.

## 7. Verify and deliver

1. Check narrative continuity, notation, assumptions, derivations, code, and correspondence between examples and figures.
2. Render and inspect every PDF page; examine changed and dense slides at larger scale. Fix clipping, overlap, tiny labels, misplaced annotations, and footer collisions.
3. Check navigation, grouped reveals and reversal, controls, resets, responsive scaling, and offline resource loading. Test mathematical behavior when changing interactive calculations.
4. Verify slide count, counters, titles, notes, source mappings, and teaching-plan references after revisions.
5. Report material verification limits honestly. Do not describe PDF inspection or DOM simulation as live-browser animation testing.
6. Include a README, timed teaching plan with aligned activities and assessment, speaker notes, source ledger, and rebuild/export instructions in the editable package. Save deliverables using the active environment’s persistence workflow, preserve existing file identities when updating, and provide concise downloadable links.