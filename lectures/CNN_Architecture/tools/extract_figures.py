#!/usr/bin/env python3
"""Crop original artwork from the locally retained source PDFs."""
from pathlib import Path
import json,hashlib
import fitz
R=Path(__file__).resolve().parents[1]
# PDF coordinates in points; one-based page numbers. Content is cropped, not redrawn.
FIGURES=[
 dict(asset='paper-inception-module.png',pdf='inception.pdf',page=5,clip=[312,87,499,182],figure='Figure 2(b)',url='https://arxiv.org/pdf/1409.4842',credit='Szegedy et al., Going Deeper with Convolutions, CVPR 2015'),
 dict(asset='paper-resnet-degradation.png',pdf='resnet.pdf',page=1,clip=[306,219,546,305],figure='Figure 1 (both plots; caption excluded)',url='https://arxiv.org/pdf/1512.03385',credit='He et al., Deep Residual Learning for Image Recognition, CVPR 2016'),
 dict(asset='lecture-residual-block.png',pdf='cs231n-2026-lecture-6.pdf',page=52,clip=[315,127,562,343],mask=[535,127,562,177],figure='Residual-block illustration only',url='https://cs231n.stanford.edu/slides/2026/lecture_6.pdf',credit='Stanford CS231n 2026 Lecture 6, slide 52; credited there to He et al.'),
 dict(asset='paper-resnet-blocks.png',pdf='resnet.pdf',page=6,clip=[329,70,537,144],figure='Figure 5 (both blocks; caption excluded)',url='https://arxiv.org/pdf/1512.03385',credit='He et al., Deep Residual Learning for Image Recognition, CVPR 2016'),
 dict(asset='paper-depthwise-filters.png',pdf='mobilenet.pdf',page=3,clip=[320,190,538,251],figure='Figure 2(b), excluding caption',url='https://arxiv.org/pdf/1704.04861',credit='Howard et al., MobileNets, 2017'),
 dict(asset='paper-pointwise-filters.png',pdf='mobilenet.pdf',page=3,clip=[320,286,538,362],figure='Figure 2(c), excluding caption',url='https://arxiv.org/pdf/1704.04861',credit='Howard et al., MobileNets, 2017')]
def main():
 records=[]
 for item in FIGURES:
  src=R/'source/references'/item['pdf'];original=fitz.open(src);clip=fitz.Rect(item['clip'])
  cropped=fitz.open();p=cropped.new_page(width=clip.width,height=clip.height)
  p.show_pdf_page(p.rect,original,item['page']-1,clip=clip)
  if 'mask' in item:
   m=fitz.Rect(item['mask']);m=fitz.Rect(m.x0-clip.x0,m.y0-clip.y0,m.x1-clip.x0,m.y1-clip.y0)
   p.draw_rect(m,color=None,fill=(1,1,1),overlay=True)
  # Render the original crop at 8 pixels/point to preserve published typography.
  p.get_pixmap(matrix=fitz.Matrix(8,8),alpha=False).save(R/'assets'/item['asset'])
  records.append({**item,'source_sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'treatment':'High-resolution crop; original artwork and labels preserved. Neighboring blue annotation is masked only for the lecture block. Authors retain copyright.'})
 (R/'source/references/figure-provenance.json').write_text(json.dumps(records,indent=2)+'\n')
 print(f'Extracted {len(records)} high-resolution crops from four retained source PDFs.')
if __name__=='__main__':main()
