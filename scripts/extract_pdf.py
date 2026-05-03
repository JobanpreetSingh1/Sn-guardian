import sys
from pathlib import Path
try:
    from PyPDF2 import PdfReader
except Exception as e:
    print('MISSING_LIB', file=sys.stderr)
    sys.exit(2)

if len(sys.argv) < 2:
    print('Usage: extract_pdf.py <pdf_path> [output_txt]')
    sys.exit(1)

pdf_path = Path(sys.argv[1])
out_path = Path(sys.argv[2]) if len(sys.argv) > 2 else Path('extracted.txt')
if not pdf_path.exists():
    print(f'ERROR: {pdf_path} not found', file=sys.stderr)
    sys.exit(1)

reader = PdfReader(str(pdf_path))
texts = []
for page in reader.pages:
    try:
        texts.append(page.extract_text() or '')
    except Exception:
        texts.append('')

full = '\n\n'.join(texts)
try:
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(full, encoding='utf-8')
    print(f'WROTE: {out_path}')
except Exception as e:
    print('ERROR_WRITING', e, file=sys.stderr)
    print(full)
