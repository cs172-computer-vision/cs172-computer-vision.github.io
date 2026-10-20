"""Reproduce the two original CS231n crops from the supplied Lecture 4 PDF.
Requires PyMuPDF; input is source/references/lecture_4.pdf (see SOURCES.md).
"""
from pathlib import Path
import fitz
R=Path(__file__).resolve().parents[1]
doc=fitz.open(R/'source/references/lecture_4.pdf')
for page,box,name in [(15,(32,76,218,241),'source-nonlinearity'),(16,(30,76,652,254),'source-transform')]:
    doc[page].get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(box)).save(R/'assets'/f'{name}.png')
print('Extracted original diagrams from PDF pages 16 and 17.')
