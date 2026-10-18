#!/usr/bin/env python3
"""Optional reproducible PDF export: python -m pip install weasyprint; python tools/export_pdf.py"""
from pathlib import Path
from weasyprint import HTML
R=Path(__file__).resolve().parents[1]
HTML(filename=str(R/'index.html')).write_pdf(str(R/'Image_Classification.pdf'))
print('Wrote Image_Classification.pdf')
