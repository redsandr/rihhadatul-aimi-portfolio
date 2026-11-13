# Rihhadatul Aimi | Portfolio

React portfolio built with Vite, GSAP, and Motion. The RAG and CogniFi projects have interactive case studies. Two ArtStation projects have their own pages; the rest of the 3D gallery opens in a short image panel. The gallery advances every 5.2 seconds when visible and stops after a manual selection. Video waits for a tap on mobile. Reduced-motion settings turn off automatic movement.

## Local development

Requires Node 22+. Run `npm ci`, then `npm run dev`. Run `npm run build` to produce `dist/`, followed by `python scripts/test_asset_paths.py` to check that asset paths work at both the Vercel root and GitHub Pages repository path. GitHub Actions deploys the built site to GitHub Pages on changes to `main`. Vercel should use the Vite preset, `npm run build`, and the `dist` output directory. The Vite base is relative so the same build works on both hosts.

## Media and CVs

Original media in `asset/` stays local and is ignored by Git. Rebuild the compressed copies with `python scripts/prepare_media.py` (Pillow and imageio-ffmpeg). `scripts/prepare_artstation.py` downloads images from the owner's two published ArtStation posts; `scripts/prepare_case_study.py` prepares a screenshot from the public RAG repository. Those two scripts also require Requests and Pillow.

Run `python scripts/build_cvs.py` (ReportLab) to regenerate the three selectable-text PDFs in `public/cv/`. Check the text before using a CV for an application. The source material was cross-checked against LinkedIn, the project repositories, and an earlier creative portfolio in November 2026. The public RAG demo is a static reviewed case, not a hosted model.

The research section links to the university's [Coretax thesis record](https://etd.usk.ac.id/search/index.php?p=baca&bacaID=1715387&page=1) and the [CogniFi paper](https://www.researchgate.net/publication/403038697_The_Behavioral_Layer_Gap_Domain-Specific_Interpretability_Challenges_Scale_in_Low-Resource_Safety-Critical_Classification_Evidence_from_Cognitive_Bias_Detection_in_Indonesian_Retail_Investor_Text) as listed on LinkedIn. A ResearchGate link may require login or block automated browsers.
