# Course media assets

This directory holds shared visuals for lecture slides and optional website
illustrations. An asset does not need to be referenced by the course website.
Keep editable sources separate from generated delivery formats, using this
layout as the collection grows:

```text
assets/
├── animations/
│   └── <concept-name>/
│       ├── <concept-name>.svg
│       └── exports/
│           ├── <concept-name>.gif
│           └── <concept-name>.mp4
├── diagrams/
│   └── <concept-name>.svg
└── figures/
    └── <descriptive-name>.{png,jpg,webp}
```

## What goes where

- `animations/`: One directory per animated concept. Keep the editable SVG at
  the concept directory's top level and optional GIF/MP4 conversions in
  `exports/`. These assets can be used in slides, the website, or both.
- `diagrams/`: Static, editable SVG diagrams.
- `figures/`: Photographs, screenshots, plots, and other raster images.

If a category becomes crowded, add course-unit folders such as
`diagrams/03-filtering/` rather than adding another top-level asset type.

## Naming conventions

- Use lowercase kebab-case: `2d-cross-correlation.svg`.
- Name files after the concept, not their page position: use
  `sobel-kernel.svg`, not `figure-4.svg`.
- Give an animation directory, its SVG, and its exports the same base name.
- Do not add revision suffixes such as `final`, `new`, or `v2`; use version
  control for history.
- Keep SVG `<title>` and `<desc>` metadata, and add meaningful `alt` text when
  embedding assets in HTML.

## Export an animation

Use an online animated-SVG converter when GIF or MP4 output is needed, then
save the result in the animation's `exports/` directory with the same base
name. Prefer MP4 for web delivery when a GIF fallback is not required; it is
usually substantially smaller.
