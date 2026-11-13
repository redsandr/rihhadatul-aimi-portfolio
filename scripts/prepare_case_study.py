"""Convert the public RAG project screenshot for the case-study page."""
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image

url = 'https://raw.githubusercontent.com/redsandr/rag-variance-explainer/master/docs/assets/jnj-example-desktop.png'
response = requests.get(url, timeout=30)
response.raise_for_status()
with Image.open(BytesIO(response.content)) as image:
    image.thumbnail((1600, 1600))
    output = Path(__file__).resolve().parents[1] / 'public' / 'media' / 'rag-case.webp'
    image.convert('RGB').save(output, 'WEBP', quality=85, method=6)
    print(output.name, output.stat().st_size)
