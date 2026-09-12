# CS 172 — Computer Vision

A responsive, single-page course website built for GitHub Pages. It is plain HTML, CSS, and JavaScript, so there is no build step.

## Preview locally

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Push these files to a GitHub repository.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing the site (usually `main`) and the `/ (root)` folder.

## Customize

- Course copy, syllabus, staff, and links live in `index.html`.
- Colors and layout tokens are at the top of `styles.css`.
- Theme, mobile navigation, filtering, and scroll effects live in `script.js`.
- Shared course media is organized under `assets/`, including material made
  for lecture slides that may not appear on the website. See
  `assets/README.md` for the folder layout and naming conventions.

Placeholder links currently use `href="#"`, and TA details remain generic until the course team is announced.
