# Sources and figure provenance

Accessed 17–18 October 2026. References appear in place as short hyperlinks in the slides and remain clickable in the supplied PDF. Links below record original locations as identified by the reference PDF; some older external image hosts may no longer be available.

## Lecture structure

- [CS231n 2026, Lecture 2: Image Classification with Linear Classifiers](https://cs231n.stanford.edu/slides/2026/lecture_2.pdf). The source credits Fei-Fei Li, Ehsan Adeli, Durante, Johnson, and Xiang. The order of core concepts follows this lecture. Administrative slides and course-specific announcements are omitted. Repeated builds are merged. SOURCE_MAP.csv gives the correspondence using one-based PDF page numbers.
- [CS231n: Image Classification](https://cs231n.github.io/classification/). Supplementary discussion of nearest neighbors, image distances, and validation.
- [CS231n: Linear Classification](https://cs231n.github.io/linear-classify/). Supplementary discussion of score functions, signed templates, and numerical stability.
- [Foundations of Computer Vision, Chapter 9](https://visionbook.mit.edu/intro_to_learning.html), Antonio Torralba, Phillip Isola, and William T. Freeman. In particular §§9.2, 9.5, and 9.7.3.
- [CIFAR-10](https://www.cs.toronto.edu/~kriz/cifar.html), Alex Krizhevsky. Dataset and original technical report: *Learning Multiple Layers of Features from Tiny Images*, 2009.

## Reused figures

The following bitmap figures were extracted from the supplied reference PDF rather than screen-captured. No labels were altered inside the CIFAR or template figures. Photographs are fit inside their presentation boxes without changing the depicted objects.

| Asset | Credit and provenance | Source PDF page |
|---|---|---|
| cat-nikita.jpeg | [Nikita](https://www.flickr.com/photos/malfet/), [original photograph](https://www.flickr.com/photos/malfet/1428198050), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | 7–9 |
| light-1.jpeg | Public domain / CC0 as credited in CS231n. [Pixabay original](https://pixabay.com/en/cat-cat-in-the-dark-eyes-staring-987528/) | 10 |
| light-2.jpeg | Public domain / CC0 as credited in CS231n. [Archived original location](http://maxpixel.freegreatpicture.com/Cats-Silhouette-Cats-Eyes-Silhouette-Cat-694730). Retained as an optional alternate asset. | 10 |
| light-3.jpeg | Public domain / CC0 as credited in CS231n. [Pixabay original](https://pixabay.com/en/red-cat-animals-cat-face-cat-red-1451799/) | 10 |
| light-4.jpeg | Public domain / CC0 as credited in CS231n. [Archived original location](http://maxpixel.freegreatpicture.com/Animals-Tree-Sun-Cat-In-Tree-Cat-Feline-Titus-63683) | 10 |
| clutter-2.jpeg | Public domain / CC0 as credited in CS231n. The reference lists [Pixabay](https://pixabay.com/en/cat-camouflage-autumn-fur-animals-408728/) and [Pexels](https://www.pexels.com/photo/view-of-cat-in-snow-248276/) image sources for this page. | 11 |
| occlusion-2.jpeg | Public domain / CC0 as credited in CS231n. [Pixabay original](https://pixabay.com/en/cat-hidden-meadow-green-summer-1009957/) | 12 |
| deform-1.jpeg | [Umberto Salvagnin](https://www.flickr.com/photos/kaibara/), [original photograph](https://www.flickr.com/photos/kaibara/3625964429/in/photostream/), CC BY 2.0 | 13 |
| deform-2.jpeg | [Tom Thai](https://www.flickr.com/photos/eviltomthai/), [original image file](https://c1.staticflickr.com/5/4101/4877610923_52c9a5fedf_b.jpg), CC BY 2.0 | 13 |
| deform-3.jpeg | [sare bear](https://www.flickr.com/photos/sarahcord/), [original photograph](https://www.flickr.com/photos/sarahcord/364252525), CC BY 2.0 | 13 |
| intraclass.jpeg | Public domain / CC0 as credited in CS231n. [Archived original location](http://maxpixel.freegreatpicture.com/Cat-Kittens-Free-Float-Kitten-Rush-Cat-Puppy-555822) | 14 |
| cifar10.jpeg | CIFAR-10 example montage, Krizhevsky, reused through CS231n | 42 |
| cifar-neighbors.jpeg | CIFAR-10 nearest-neighbor retrieval visualization, CS231n | 43 |
| linear-templates.jpeg | Learned linear-classifier templates, CS231n | 60 |

Licenses and credits apply to their individual figures. This package does not claim ownership of third-party source figures or relicense them as a whole. The original source PDF is not bundled.

## Original vector illustrations and code

The viewpoint diagram projects the same wireframe chair under two orthographic viewing directions. Feature-space data, boundaries, metric contours, cross-validation fold diagram, validation plot, block-image sensitivity example, nonlinear binary problems, softmax probability bars, and loss curve are original programmatic vector drawings for this deck. They are not reported experimental findings. The validation plot on slide 31 now reuses the CS231n cross-validation figure, with fold outcomes, mean accuracy, and standard-deviation bars.

The k-NN dataset is a seeded synthetic set of 43 points. The voting and neighborhood-size examples use the same points. The metric comparison uses the separate two-point example specified below. Equal distances are ordered by stable example ID. Vote ties select the tied class with the closest member. This rule is documented for reproducibility, rather than presented as the only possible convention.

## Adaptations and corrections

- Separate challenge slides and repeated code/equation builds were consolidated.
- The context discussion uses a dataset-shift question in place of the source social-media image.
- Nearest-neighbor complexity includes dimension D explicitly. Constant-time training refers only to retaining references to existing arrays.
- The four-pixel example includes the ship bias: the correct score is **60.75**, instead of 61.95 in the reference.
- The geometric demo displays equality of two competing class scores.
- Softmax loss has infimum zero for finite multiclass logits, and no finite maximum.
- Stable numerical loss, learning objectives, assessment prompts, and teaching notes were added.

## Offline mathematics

[KaTeX 0.16.22](https://katex.org/) renders equations at build time. Its original JavaScript, CSS, WOFF2 fonts, and MIT license are included in vendor/. The presentation embeds the font bytes and pre-rendered equation markup, so it makes no request to a CDN when opened. KaTeX is not required to execute in the browser.

## Presentation layout references for the revision

- [Microsoft: Tips for creating and delivering an effective presentation](https://support.microsoft.com/en-us/powerpoint/tips-for-creating-and-delivering-an-effective-presentation): readable sans-serif text, avoiding small type, concise copy, and awareness that projection may crop edges.
- [Microsoft: Accessible PowerPoint presentations](https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities): left alignment, sufficient paragraph/line spacing, and legible text.

These sources support readability and whitespace principles. They do not specify a single universally best margin. The 96-pixel safe area, title gap, and column gutter are tailored to this slide layout and were checked in the PDF export.

## Clarified teaching figures

The nearest-neighbor introduction again uses the seeded 2D point dataset. The query is q=(1.8,−0.95), and a line links it to the closest stored point. k and the metric name are omitted from this introductory figure. The plot is synthetic, not an embedding of actual images.

The side-by-side metric example uses x^(1)=(1,0), class A, and x^(2)=(0.6,0.6), class B. At q=(0,0), L1 chooses A while L2 chooses B. Its vector boundaries are calculated exactly for these fixed points. The L1 boundary is y=0.1 for x≤0.6, y=x−0.5 for 0.6≤x≤1, and y=0.5 for x≥1. The L2 boundary is y=(2/3)x−7/30. Query movement leaves these boundaries fixed because the training points and metric in each panel stay unchanged.

The visual-view toy image preserves the row-major order of x=(56,231,24,2) and the cat row w=(0.2,−0.5,0.1,2.0). Reshaping both into 2×2 arrays leaves their dot product unchanged, and the same bias 1.1 gives the cat score −96.8. This precedes the existing CS231n learned-template figure.

## Progressive visual view and marked loss example

Slide 38 moves the original cat-weight row into its 2×2 layout with an offline CSS transition. Subsequent reveals show the unchanged score, the existing CS231n template strip, and an interpretation note. The PDF fixes all elements at their completed positions. The loss plot marks the probability and loss computed from the fixed softmax scores (3.2,5.1,−1.7); the displayed coordinates are rounded to (0.13,2.04).

## Recognition lecture and new teaching figures

- Jiayuan Gu, **Recognition**, uploaded as `07 recognition(updated)(1).pdf`: pages 35, 38, 48 and 75 inform the nonparametric/parametric comparison; pages 76–80 inform generalization, complexity, underfitting/overfitting, data size and validation; pages 20–33 inform the optional visual-word overview. Source graphics were redrawn rather than copied. Some source statements were made conditional: the shape of the generalization curve is not universal, and grouping images in splits depends on the intended generalization target.
- [Foundations of Computer Vision, Chapter 11](https://visionbook.mit.edu/problem_of_generalization.html), especially §11.2, is supplementary reading for generalization. The qualitative curves are original schematics, not experimental claims. The fixed-data k-NN example is an original experiment generated by `tools/extra_figures.py` using NumPy RNG seed 172. Its 61 training points have six flipped binary labels; a separate 61×61 grid evaluates the underlying clean rule x2 > 0.45 sin(2.4 x1). Training error includes each training vector itself as a candidate neighbor. This constructed label-noise difference can make validation error lower than training error at intermediate k. All errors are computed, not hand-chosen illustration numbers.
- [Sivic & Zisserman, Video Google, ICCV 2003](https://www.robots.ox.ac.uk/~vgg/publications/2003/Sivic03/) motivates visual words for retrieval. The deck’s descriptor/codeword/count diagram is original and symbolic; assignments 1,2,1,3,2,1 produce counts (3,2,1).
- [Lazebnik, Schmid & Ponce, Beyond Bags of Features, CVPR 2006](https://slazebni.cs.illinois.edu/publications/cvpr06b.pdf) extends bags of features using spatial pyramids. This primary paper is linked on the optional overview and reading list.
- The three-class diagram is an exact original drawing for scores s1=x1, s2=x2, s3=0. Solid boundary segments are maximal-score ties; dashed equal-score continuations do not change the predicted class.

The attached lecture and external reading papers are not bundled as full PDFs. All figures and runtime resources needed to present the deck are bundled; external reading links require internet when opened.

## Static pixel-distance figure · latest revision

- `assets/samenorm.png` is reused unchanged from [CS231n](https://cs231n.github.io/assets/samenorm.png), with the explanation in [Image Classification](https://cs231n.github.io/classification/). The original, shifted, occluded, and darkened images retain the source labels. The source states that the three modified images have equal L2 pixel distance from the original; no numerical distance is asserted. Credit appears on slide 32. The file is embedded in the offline HTML.
- The separate bag-of-visual-words slide and its symbolic figure were removed. Earlier provenance paragraphs about that diagram describe the preceding version. The classical papers remain linked and explained in the reading list, now slide 54.

## Cross-validation figure · latest revision

Slide 31 uses [CS231n cvplot.png](https://cs231n.github.io/assets/cvplot.png), bundled unchanged as `assets/cvplot.png`. The source [classification note](https://cs231n.github.io/classification/) describes five folds for each k, a mean line, standard-deviation bars, and a peak near k=7. The previous illustrative SVG is not used on this slide. The figure credit links to the note in place.

## Consistent nearest-neighbor notation

Pages 13–20 use q for a query vector; x^(i), y^(i) for stored example i and its label; j for a coordinate index; N for the number of stored examples; D for vector dimension; and I_k(q) for the indices of the k nearest examples. Distance subscripts L1/L2 name metrics rather than coordinate indices. The source images elsewhere retain their own original notation. The plot axes in the revised vector figures identify features explicitly. The same navy diamond marks queries across the nearest-neighbor plots and metric comparison. The refined leader on slide 18 identifies the same fixed isolated blue example, so its numerical result is unchanged.

All percentages on slide 22 are explicitly labeled as training or validation error rates. Plot labels and spacing changed; the data, predicted regions, and numerical percentages did not.
