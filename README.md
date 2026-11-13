# Rihhadatul Aimi — portfolio

An English-language, responsive portfolio for Rihhadatul “Sebas” Aimi, built with React, Vite, GSAP and Motion. The visual work and film are owned by the portfolio author; no external template assets are used. Motion respects `prefers-reduced-motion`, and the film pauses by default on mobile.

## Local development

Requires Node 22+. Run `npm ci`, then `npm run dev`. Run `npm run build` to produce `dist/`. GitHub Actions deploys the built site to GitHub Pages on changes to `main`.

## Media and CVs

The originals in `asset/` stay local and are ignored by Git. The optimized site media in `public/media/` can be regenerated with `python scripts/prepare_media.py` (requires Pillow and imageio-ffmpeg). Three searchable, single-column ATS-oriented PDFs in `public/cv/` can be regenerated with `python scripts/build_cvs.py` (requires ReportLab). Review CV copy before using it in applications; source material was checked against the owner's LinkedIn, GitHub repositories and existing creative portfolio in November 2026. The public RAG site is a static reviewed walkthrough, not hosted inference.

Contact on the public CVs: `aimirihad@gmail.com`, `+62 813 6014 1594`.
