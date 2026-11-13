# Rihhadatul Aimi | Portfolio

React portfolio built with Vite, GSAP, and Motion. The RAG and CogniFi projects have interactive case studies. Two ArtStation projects have their own pages; the rest of the 3D gallery opens in a short image panel. The gallery advances every 5.2 seconds when visible and stops after a manual selection. Video waits for a tap on mobile. Reduced-motion settings turn off automatic movement.

## Local development

Requires Node 22+. Run `npm ci`, then `npm run dev`. Run `npm run build` to produce `dist/`. GitHub Actions deploys the built site to GitHub Pages on changes to `main`.

## Media and CVs

Original media in `asset/` stays local and is ignored by Git. Rebuild the compressed copies with `python scripts/prepare_media.py` (Pillow and imageio-ffmpeg). `scripts/prepare_artstation.py` downloads images from the owner's two published ArtStation posts; `scripts/prepare_case_study.py` prepares a screenshot from the public RAG repository. Those two scripts also require Requests and Pillow.

Run `python scripts/build_cvs.py` (ReportLab) to regenerate the three selectable-text PDFs in `public/cv/`. Check the text before using a CV for an application. The source material was cross-checked against LinkedIn, the project repositories, and an earlier creative portfolio in November 2026. The public RAG demo is a static reviewed case, not a hosted model.
