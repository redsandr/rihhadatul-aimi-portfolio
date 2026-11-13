"""Prepare owned portfolio media for responsive web delivery."""
from pathlib import Path
import subprocess

import imageio_ffmpeg
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / "asset"
target = root / "public" / "media"
target.mkdir(parents=True, exist_ok=True)

for name in ("Bathroom", "Brokoli", "House", "Komala", "Talion", "Tidy Room"):
    with Image.open(source / f"{name}.png") as image:
        image.thumbnail((1600, 1600))
        image.convert("RGB").save(target / f"{name.lower().replace(' ', '-')}.webp", "WEBP", quality=79, method=6)

with Image.open(root / "ava.jpeg") as image:
    image.thumbnail((800, 800))
    image.convert("RGB").save(target / "portrait.webp", "WEBP", quality=80)

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
video = str(source / "Character.mp4")
subprocess.run([ffmpeg, "-y", "-i", video, "-vf", "scale=1920:-2", "-frames:v", "1", "-q:v", "2", str(target / "character-poster.jpg")], check=True, capture_output=True)
subprocess.run([ffmpeg, "-y", "-i", video, "-vf", "scale=1920:-2", "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-movflags", "+faststart", str(target / "character.mp4")], check=True, capture_output=True)
print([(p.name, round(p.stat().st_size / 1024 / 1024, 2)) for p in target.iterdir()])
