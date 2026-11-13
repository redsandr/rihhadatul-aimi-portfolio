import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const asset = (file) => `${import.meta.env.BASE_URL}media/${file}`;
const artstation = {
  witch: "https://www.artstation.com/artwork/yJG409",
  corridor: "https://www.artstation.com/artwork/2qVVEa",
};

const flow = {
  rag: [
    ["01", "SEC FILING", "Read the MD&A text from 10-K and 10-Q filings."],
    [
      "02",
      "RETRIEVAL",
      "Combine keyword and semantic search, then rerank the passages.",
    ],
    [
      "03",
      "DRAFT ANSWER",
      "Generate a structured response using retrieved passages.",
    ],
    [
      "04",
      "QUOTE CHECK",
      "Only present the answer if its source quotations match.",
    ],
  ],
  cognifi: [
    ["01", "INVESTOR TEXT", "Start with the words investors actually use."],
    ["02", "CONTEXT", "Check price context and patterns in the language."],
    [
      "03",
      "BIAS SIGNAL",
      "Score rules for FOMO, loss aversion, or confirmation bias.",
    ],
    ["04", "PAUSE", "Present counter-evidence and a prompt to reconsider."],
  ],
};

function InteractiveFlow({ type }) {
  const stages = flow[type];
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const container = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (reduced || !visible || !autoplay) return;
    const timer = window.setInterval(
      () => setActive((index) => (index + 1) % stages.length),
      3700,
    );
    return () => window.clearInterval(timer);
  }, [reduced, visible, autoplay, stages.length]);
  return (
    <div className={`interactive-flow flow-${type}`} ref={container}>
      <div className="flow-top">
        <span className="eyebrow">
          {type === "rag" ? "FOLLOW THE SOURCE" : "FOLLOW THE SIGNAL"}
        </span>
        <button
          type="button"
          disabled={reduced}
          aria-label={
            autoplay ? "Pause pipeline animation" : "Play pipeline animation"
          }
          onClick={() => setAutoplay((value) => !value)}
        >
          {reduced ? "MOTION OFF" : autoplay ? "PAUSE Ⅱ" : "PLAY ▶"}
        </button>
      </div>
      <div className="flow-stage" aria-live="off">
        <span className="flow-giant" aria-hidden="true">
          {stages[active][0]}
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="flow-stage-copy"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <span>{stages[active][0]} / 04</span>
            <strong>{stages[active][1]}</strong>
            <p>{stages[active][2]}</p>
          </motion.div>
        </AnimatePresence>
        <div className="flow-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="flow-steps" aria-label="Pipeline steps">
        {stages.map(([number, title], index) => (
          <button
            type="button"
            key={number}
            className={active === index ? "active" : ""}
            aria-pressed={active === index}
            onClick={() => {
              setActive(index);
              setAutoplay(false);
            }}
          >
            <span>{number}</span>
            <strong>{title}</strong>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
    </div>
  );
}

const cases = {
  rag: {
    index: "01",
    category: "FINANCIAL RESEARCH / LOCAL AI",
    title: "RAG Variance Explainer",
    lead: "A financial answer needs a place to point back to. This local prototype retrieves passages from SEC filings, then checks that the quoted text really appears in the retrieved material.",
    task: "Investigate changes in public-company metrics without losing track of the filing behind each claim.",
    method:
      "The system extracts MD&A sections from 10-K and 10-Q filings, builds an index, combines lexical and semantic retrieval, reranks passages, and validates source quotations before showing an answer. If the response cannot be parsed or its quotations do not match, the app refuses to present it as sourced.",
    boundary:
      "The website is a static walkthrough of a reviewed Johnson & Johnson Europe sales example. It does not host live inference. Finding a quotation in a filing does not prove that every causal or arithmetic claim is correct.",
    image: "rag-case.webp",
    imageAlt:
      "Screenshot of the reviewed Johnson & Johnson case on the RAG Variance Explainer site",
    caption:
      "The public case lets readers inspect the question, finding, quotation, and filing limits.",
    links: [
      [
        "Explore the reviewed example",
        "https://rag-variance-explainer.vercel.app/example",
      ],
      [
        "Inspect the code",
        "https://github.com/redsandr/rag-variance-explainer",
      ],
    ],
    next: "cognifi",
    nextLabel: "CogniFi",
  },
  cognifi: {
    index: "02",
    category: "BEHAVIORAL FINANCE / INDONESIAN NLP",
    title: "CogniFi",
    lead: "What sounds like ordinary investor chatter can reveal a decision made under pressure. CogniFi looks for FOMO, loss aversion, and confirmation bias in Indonesian retail-investor text.",
    task: "Identify a possible bias without hiding the reason for the label behind a black box.",
    method:
      "The repository describes a six-layer, rule-based pipeline: early exit for analytical text, price context, keyword scoring, contextual adjustment, confidence thresholds, and a final signal. The response can include counter-evidence and a prompt to pause before trading.",
    boundary:
      "The repository reports 94.7% accuracy on a stratified 150-case holdout. That result belongs to the published evaluation; it is not a claim about live trading outcomes or production reliability.",
    figure: true,
    caption:
      "The rule-based approach keeps the evidence for a classification inspectable.",
    links: [
      ["Read the repository", "https://github.com/redsandr/cognifi"],
      [
        "Explore the dataset",
        "https://huggingface.co/datasets/redsandr/cognifi-investor-bias",
      ],
    ],
    next: "witch-room",
    nextLabel: "Abandon Witch Room",
  },
  "witch-room": {
    index: "03",
    category: "3D ENVIRONMENT / ARTSTATION",
    title: "Abandon Witch Room",
    lead: "A room that has been left alone long enough to tell its own story. The ArtStation post shows the build from wireframe to final adjustment.",
    task: "Build a personal environment study with enough structure, surface detail, and light to suggest a place beyond the frame.",
    method:
      "The published project includes separate wireframe, solid, render, and adjusted-render views. Blender and Photoshop are listed as the tools used on the ArtStation page.",
    boundary:
      "This is personal artwork, not a client commission. The process images below come from the published ArtStation project.",
    image: "witch-room-final.webp",
    imageAlt: "Final adjusted render of Abandon Witch Room by Rihhadatul Aimi",
    gallery: [
      ["Wireframe", "witch-room-wireframe.webp"],
      ["Solid pass", "witch-room-solid.webp"],
      ["Render", "witch-room-render.webp"],
    ],
    caption: "A closer look at how the room was built.",
    links: [["See the ArtStation post", artstation.witch]],
    next: "madness-corridor",
    nextLabel: "Madness Corridor",
  },
  "madness-corridor": {
    index: "04",
    category: "3D ENVIRONMENT / ARTSTATION",
    title: "Madness Corridor",
    lead: "A corridor built for unease. Light, repetition, and a narrow line of sight do most of the work.",
    task: "Explore how a single environment can carry a horror mood without a character in the scene.",
    method:
      "This personal environment artwork is published on ArtStation as “Madness Corridor.” The post lists Blender as the tool used.",
    boundary:
      "The ArtStation post shows one finished image. No process breakdown or client brief is published with it.",
    image: "madness-corridor.webp",
    imageAlt: "Madness Corridor 3D environment artwork by Rihhadatul Aimi",
    caption: "A single frame from the published ArtStation project.",
    links: [["See the ArtStation post", artstation.corridor]],
    next: "rag",
    nextLabel: "RAG Variance Explainer",
  },
};

export default function CaseStudy({ slug }) {
  const data = cases[slug];
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const frame = requestAnimationFrame(() =>
      window.scrollTo({ top: 0, behavior: "instant" }),
    );
    return () => cancelAnimationFrame(frame);
  }, [slug]);
  useEffect(() => {
    document.title = data
      ? `${data.title} | Rihhadatul Aimi`
      : "Work | Rihhadatul Aimi";
  }, [data]);
  if (!data)
    return (
      <main id="case-main" className="case-page">
        <div className="wrap case-not-found">
          <h1>That project isn't here.</h1>
          <a href="#work">Back to work ←</a>
        </div>
      </main>
    );
  const external = { target: "_blank", rel: "noopener noreferrer" };
  return (
    <main id="case-main" className="case-page">
      <section className="case-hero">
        <div className="wrap">
          <a
            href={slug === "rag" || slug === "cognifi" ? "#work" : "#worlds"}
            className="case-back"
          >
            ← BACK TO{" "}
            {slug === "rag" || slug === "cognifi" ? "WORK" : "3D WORK"}
          </a>
          <p className="eyebrow">
            CASE {data.index} / {data.category}
          </p>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            {data.title}
          </motion.h1>
          <p className="case-lead">{data.lead}</p>
          <div className="case-scroll">READ THE CASE ↓</div>
        </div>
      </section>
      <section className="case-content wrap">
        <div className="case-overview">
          <div className="case-facts">
            <p className="eyebrow">THE QUESTION</p>
            <h2>{data.task}</h2>
          </div>
          <div className="case-description">
            <p className="eyebrow">WHAT I MADE</p>
            <p>{data.method}</p>
          </div>
        </div>
        {(slug === "rag" || slug === "cognifi") && (
          <InteractiveFlow type={slug} />
        )}
        {data.image && (
          <figure className="case-figure">
            <img src={asset(data.image)} alt={data.imageAlt} />
            <figcaption>{data.caption}</figcaption>
          </figure>
        )}
        {data.gallery && (
          <div className="case-process">
            <div className="case-process-head">
              <span className="eyebrow">PROCESS / THREE VIEWS</span>
              <p>{data.caption}</p>
            </div>
            <div className="case-process-grid">
              {data.gallery.map(([label, file]) => (
                <figure key={file}>
                  <img
                    src={asset(file)}
                    alt={`${data.title}: ${label}`}
                    loading="lazy"
                  />
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
        <div className="case-boundary">
          <span className="eyebrow">WHAT THE WORK DOESN'T CLAIM</span>
          <p>{data.boundary}</p>
        </div>
        <div className="case-links">
          {data.links.map(([label, url]) => (
            <a key={url} href={url} {...external}>
              {label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
      <section className="case-next">
        <div className="wrap">
          <span className="eyebrow">NEXT CASE</span>
          <a href={`#/case/${data.next}`}>
            {data.nextLabel}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}
