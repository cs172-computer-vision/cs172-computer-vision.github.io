#!/usr/bin/env python3
"""Refresh derived artifacts; index.html is the single editable slide source."""
from pathlib import Path
from html.parser import HTMLParser
from html import escape
import csv, io, json, os, re, shutil, subprocess

R = Path(__file__).resolve().parents[1]

class Deck(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_metadata = False
        self.metadata = []
        self.ids = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'script' and attrs.get('id') == 'slide-meta':
            self.in_metadata = True
        if tag == 'section' and 'slide' in attrs.get('class', '').split():
            self.ids.append(attrs['id'])
    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_metadata = False
    def handle_data(self, data):
        if self.in_metadata:
            self.metadata.append(data)

text = (R / 'index.html').read_text()
p = Deck()
p.feed(text)
slides = json.loads(''.join(p.metadata))
assert len(p.ids) == len(set(p.ids)), 'Slide IDs must be unique.'
assert p.ids == [s['id'] for s in slides], 'Align metadata order with HTML slide order.'
for slide in slides:
    assert all(slide.get(k) for k in ('id', 'title', 'section', 'notes')), slide['id']
node = os.environ.get('NODE') or shutil.which('node')
if not node:
    raise SystemExit('Install Node.js or set NODE to refresh SVG snapshots.')
subprocess.run([node, str(R / 'tools/snapshots.cjs')], check=True)
count = iter(range(1, len(slides) + 1))
text, refreshed = re.subn(r'<span>\d+ / (?:\d+|TOTAL)</span></footer>',
    lambda m: f'<span>{next(count):02d} / {len(slides)}</span></footer>', text)
assert refreshed == len(slides), 'Every slide must have a footer counter.'
for n, slide in enumerate(slides, 1):
    text = re.sub(r'(id="' + re.escape(slide['id']) + r'" aria-label=")[^"]*"',
        lambda m: m[1] + escape(f'{n}. {slide["title"]}', quote=True) + '"', text)
(R / 'index.html').write_text(text)
(R / 'SPEAKER_NOTES.md').write_text('# Image Classification: speaker notes\n\n' +
    '\n\n'.join(f'## {n:02d}. {s["title"]}\n\n{s["notes"]}' for n, s in enumerate(slides, 1)) + '\n')
rows = io.StringIO()
writer = csv.writer(rows, lineterminator="\n")
writer.writerow(['slide', 'id', 'title', 'section', 'source_URL',
    'CS231n_2026_PDF_pages', 'Recognition_reference_PDF_pages', 'kind', 'source_sections'])
for n, s in enumerate(slides, 1):
    writer.writerow([n, s['id'], s['title'], s['section'], s.get('reference_url', ''),
        ','.join(map(str, s.get('reference_pages', []))),
        ','.join(map(str, s.get('recognition_reference_pages', []))),
        s.get('kind', 'content'), s.get('reference_sections', '')])
(R / 'SOURCE_MAP.csv').write_text(rows.getvalue())
print(f'Refreshed {len(slides)} slides. Edit content directly in index.html.')
