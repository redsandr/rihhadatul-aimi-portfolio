"""Copy and compress the owner's two published ArtStation projects for the gallery."""
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image

out = Path(__file__).resolve().parents[1] / 'public' / 'media'
images = {
    'witch-room-final': 'https://cdna.artstation.com/p/assets/images/images/053/175/180/large/rihhadatul-aimi-04-adjustedrender.jpg?1661597174',
    'witch-room-wireframe': 'https://cdnb.artstation.com/p/assets/images/images/053/175/175/large/rihhadatul-aimi-01-wireframe.jpg?1661597161',
    'witch-room-solid': 'https://cdna.artstation.com/p/assets/images/images/053/175/176/large/rihhadatul-aimi-02-no-texture.jpg?1661597165',
    'witch-room-render': 'https://cdna.artstation.com/p/assets/images/images/053/175/178/large/rihhadatul-aimi-03-render.jpg?1661597169',
    'madness-corridor': 'https://cdnb.artstation.com/p/assets/images/images/051/836/769/large/rihhadatul-aimi-corridor-horror-enchanted.jpg?1658293280',
}
out.mkdir(parents=True, exist_ok=True)
for name, url in images.items():
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    with Image.open(BytesIO(response.content)) as image:
        image.thumbnail((1600, 1600))
        image.convert('RGB').save(out / f'{name}.webp', 'WEBP', quality=83, method=6)
print('Prepared', len(images), 'ArtStation images')
