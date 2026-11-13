"""Verify one Vite build resolves at both domain root and a repository subpath."""
from pathlib import Path
from urllib.parse import urljoin, urlparse

from check_deployment import Assets


root = Path(__file__).resolve().parents[1] / "dist"
html = (root / "index.html").read_text(encoding="utf-8")
assets = Assets()
assets.feed(html)
assets.paths.append("./media/character-poster.jpg")

for prefix in ("/", "/rihhadatul-aimi-portfolio/"):
    url = f"https://example.test{prefix}"
    for path in assets.paths:
        resolved = urlparse(urljoin(url, path))
        if resolved.netloc != urlparse(url).netloc:
            continue
        target = resolved.path
        assert target.startswith(prefix), f"{path} escapes mount {prefix}: {target}"
        local_path = root / target[len(prefix):]
        assert local_path.is_file(), f"missing {local_path} for {url}"
    print(f"PASS {prefix}: scripts, CSS, and media resolve inside the mount")
