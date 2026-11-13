"""Fail if a deployed page points to missing JavaScript or CSS."""
import sys
from html.parser import HTMLParser
from urllib.error import HTTPError
from urllib.parse import urljoin, urlparse
from urllib.request import urlopen


class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "script" and values.get("src"):
            self.paths.append(values["src"])
        if tag == "link" and values.get("rel") == "stylesheet":
            self.paths.append(values["href"])


def check(url):
    url = url.rstrip("/") + "/"
    with urlopen(url, timeout=20) as response:
        html = response.read().decode("utf-8")

    assets = Assets()
    assets.feed(html)
    if not assets.paths:
        raise SystemExit(f"FAIL {url}: no scripts or stylesheets in HTML")

    failed = False
    for path in assets.paths:
        asset_url = urljoin(url, path)
        if urlparse(asset_url).netloc != urlparse(url).netloc:
            continue
        try:
            with urlopen(asset_url, timeout=20) as response:
                content_type = response.headers.get("Content-Type", "")
                status = response.status
        except HTTPError as error:
            status = error.code
            content_type = ""
        valid_type = "javascript" in content_type if path.endswith(".js") else "css" in content_type
        print(f"{status} {content_type} {asset_url}")
        failed |= status != 200 or not valid_type
    return not failed


if __name__ == "__main__":
    raise SystemExit(0 if check(sys.argv[1]) else 1)
