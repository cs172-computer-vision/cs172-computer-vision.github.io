# Optional original reference PDFs

These PDFs are authoring references, not presentation dependencies. All required cropped figures are already in ../../assets/.

To reproduce the two original figures, download Stanford's Lecture 4 here, then run the extractor from the deck root:

```sh
curl -fL https://cs231n.stanford.edu/slides/2026/lecture_4.pdf -o source/references/lecture_4.pdf
python3 tools/extract_figures.py
```

The other narrative reference is https://cs231n.stanford.edu/slides/2026/lecture_3.pdf. Figure credits, crop coordinates, and one-based PDF pages are in ../../SOURCES.md and ../../SOURCE_MAP.csv. The original Stanford PDFs are excluded from the editable ZIP; do not interpret educational reuse of their figures as relicensing their materials.
