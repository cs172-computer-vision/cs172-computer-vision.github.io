#!/usr/bin/env python3
"""Package the already-built offline folder and editable sources beside it."""
from pathlib import Path
from zipfile import ZipFile,ZIP_DEFLATED
R=Path(__file__).resolve().parents[1];out=R.parent/'Deep_Learning_Basics.zip'
with ZipFile(out,'w',ZIP_DEFLATED) as z:
    for p in sorted(R.rglob('*')):
        if not p.is_file():continue
        rel=p.relative_to(R)
        if any(x in ['.venv','__pycache__','.DS_Store'] for x in rel.parts):continue
        if rel.parent==Path('source/references') and p.suffix=='.pdf':continue
        z.write(p,Path(R.name)/rel)
print('Wrote',out)
