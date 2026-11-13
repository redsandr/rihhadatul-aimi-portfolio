import { motion, useReducedMotion } from "motion/react";

const publications = [
  {
    number: "01",
    kind: "RESEARCH PAPER / MARCH 2026",
    title: "The Behavioral Layer Gap",
    fullTitle:
      "Domain-Specific Interpretability Challenges Scale in Low-Resource Safety-Critical Classification: Evidence from Cognitive Bias Detection in Indonesian Retail Investor Text",
    venue: "ResearchGate",
    finding:
      "CogniFi's rule-based detector reached 94.7% accuracy on the paper's 150-case held-out test. The paper examines FOMO, loss aversion, and confirmation bias in Indonesian investor posts, including code-switched language.",
    caveat:
      "That score describes this test set. It does not measure live trading outcomes or independent production performance.",
    url: "https://www.researchgate.net/publication/403038697_The_Behavioral_Layer_Gap_Domain-Specific_Interpretability_Challenges_Scale_in_Low-Resource_Safety-Critical_Classification_Evidence_from_Cognitive_Bias_Detection_in_Indonesian_Retail_Investor_Text",
    linkLabel: "READ ON RESEARCHGATE",
    caseUrl: "#/case/cognifi",
    caseLabel: "SEE THE COGNIFI CASE",
    visual: "94.7%",
    visualLabel: "REPORTED HOLDOUT ACCURACY / 150 CASES",
  },
  {
    number: "02",
    kind: "ACCOUNTING THESIS / MAY 2026",
    title: "Trust and Coretax adoption",
    fullTitle:
      "Pengaruh Tingkat Kepercayaan terhadap Tingkat Niat Menggunakan Coretax Administration System dengan Pendekatan Model UTAUT 3 (Studi Kasus pada UMKM yang Terdaftar di KPP Pratama Banda Aceh)",
    venue: "Universitas Syiah Kuala, Electronic Theses and Dissertation",
    finding:
      "A survey of registered micro, small, and medium enterprises in Banda Aceh, analyzed with SPSS. The reported findings associate effort expectancy and habit with intention to use the Coretax Administration System.",
    caveat:
      "The university catalog holds the thesis under its original Indonesian title. The heading above is an English short title, not a translated publication title.",
    url: "https://etd.usk.ac.id/search/index.php?p=baca&bacaID=1715387&page=1",
    linkLabel: "READ THE UNIVERSITY RECORD",
    visual: "UTAUT 3",
    visualLabel: "FRAMEWORK / BANDA ACEH MSMES",
  },
];

export default function Research({ SectionHead }) {
  const reduced = useReducedMotion();
  return (
    <section id="research" className="research-section section-pad">
      <div className="wrap">
        <SectionHead
          index="03"
          label="RESEARCH AND PUBLICATIONS"
          title={
            <>
              Questions I <em>put in print.</em>
            </>
          }
          note="One paper on investor bias. One accounting thesis on Coretax adoption."
        />
        <div className="research-list">
          {publications.map((paper) => (
            <motion.article
              className="research-item"
              key={paper.number}
              initial={reduced ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
            >
              <div className="research-visual" aria-hidden="true">
                <span className="eyebrow">PAPER {paper.number} / 02</span>
                <strong>{paper.visual}</strong>
                <span className="eyebrow">{paper.visualLabel}</span>
              </div>
              <div className="research-copy">
                <span className="eyebrow">{paper.kind}</span>
                <h3>{paper.title}</h3>
                <p className="research-venue">{paper.venue}</p>
                <p>{paper.finding}</p>
                <details>
                  <summary>
                    Full title and scope <span aria-hidden="true">+</span>
                  </summary>
                  <p className="research-full-title">{paper.fullTitle}</p>
                  <p>{paper.caveat}</p>
                </details>
                <div className="research-links">
                  <a href={paper.url} target="_blank" rel="noopener noreferrer">
                    {paper.linkLabel} <span aria-hidden="true">↗</span>
                  </a>
                  {paper.caseUrl && (
                    <a href={paper.caseUrl}>
                      {paper.caseLabel} <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
