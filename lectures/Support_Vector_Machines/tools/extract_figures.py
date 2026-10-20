#!/usr/bin/env python3
"""Crop supplied Harvard figures: python tools/extract_figures.py /path/to/lecture20_svm.pdf"""
import sys
from pathlib import Path
import fitz
R=Path(__file__).resolve().parents[1];doc=fitz.open(sys.argv[1])
for i,box,name in [(5,(.28,.27,.71,.77),'harvard-margin'),(14,(.24,.45,.75,.65),'harvard-outlier'),(27,(.23,.395,.76,.78),'harvard-feature-map')]:
 p=doc[i];w,h=p.rect.width,p.rect.height;p.get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(box[0]*w,box[1]*h,box[2]*w,box[3]*h)).save(R/'assets'/f'{name}.png')
