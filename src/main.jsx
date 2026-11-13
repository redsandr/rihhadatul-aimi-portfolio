import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Gallery from "./Gallery.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import "./style.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const base = import.meta.env.BASE_URL;
const media = (file) => `${base}media/${file}`;
const external = { target: "_blank", rel: "noopener noreferrer" };
const CaseStudy = lazy(() => import("./CaseStudy.jsx"));

function Arrow({ diagonal = false }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [open]);
  const navigate = () => setOpen(false);
  return (
    <header className="site-header">
      <a
        href="#top"
        className="wordmark"
        onClick={navigate}
        aria-label="Sebas Aimi, back to top"
      >
        SEBAS<span className="wordmark-dot">.</span>
      </a>
      <span className="header-descriptor">
        RIHHADATUL AIMI <span className="header-spark">✳</span> INDONESIA
      </span>
      <button
        className={`menu-toggle ${open ? "is-open" : ""}`}
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(!open)}
      >
        <span className="menu-icon" aria-hidden="true">
          <i />
          <i />
        </span>
        <span>{open ? "CLOSE" : "MENU"}</span>
      </button>
      <nav
        id="site-nav"
        className={open ? "nav-open" : ""}
        aria-label="Main navigation"
      >
        <span className="nav-kicker">RIHHADATUL AIMI / PORTFOLIO</span>
        {[
          ["Work", "#work"],
          ["3D worlds", "#worlds"],
          ["About", "#about"],
          ["CV", "#cv"],
          ["Contact", "#contact"],
        ].map(([label, href], index) => (
          <a href={href} key={label} onClick={navigate}>
            <small>0{index + 1}</small>
            {label}
            <span className="nav-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        ))}
        <span className="nav-foot">AI ENGINEERING / FINANCE / 3D</span>
      </nav>
    </header>
  );
}

function Hero() {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [canAutoplay, setCanAutoplay] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setCanAutoplay(mq.matches && !reduce);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reduce]);
  useEffect(() => {
    if (!video.current) return;
    if (canAutoplay)
      video.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    else {
      video.current.pause();
      setPlaying(false);
    }
  }, [canAutoplay]);
  const toggle = () => {
    if (!video.current) return;
    if (playing) {
      video.current.pause();
      setPlaying(false);
    } else
      video.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
  };
  const hero = useRef(null);
  useGSAP(
    () => {
      if (reduce) return;
      gsap.from(".hero-title-line", {
        yPercent: 105,
        opacity: 0,
        duration: 1.05,
        stagger: 0.13,
        ease: "power4.out",
        delay: 0.16,
      });
      gsap.from(".hero-bottom", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power2.out",
      });
      gsap.to(".hero-media", {
        yPercent: 13,
        ease: "none",
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: hero, dependencies: [reduce], revertOnUpdate: true },
  );
  return (
    <section id="top" className="hero" ref={hero} aria-label="Introduction">
      <div className="hero-media" aria-hidden="true">
        <video
          ref={video}
          muted
          playsInline
          loop
          preload="none"
          poster={media("character-poster.jpg")}
          src={media("character.mp4")}
        />
      </div>
      <div className="hero-shade" />
      <div className="hero-content wrap">
        <p className="eyebrow hero-eyebrow">
          PORTFOLIO / 2026 <span>✳</span> ENGINEERING × FINANCE × 3D
        </p>
        <h1>
          <span className="line-clip">
            <span className="hero-title-line">Read the filing.</span>
          </span>
          <span className="line-clip">
            <span className="hero-title-line serif italic">
              Make the scene.
            </span>
          </span>
        </h1>
        <div className="hero-bottom">
          <p>
            SEC research tools, Indonesian investor language, and rooms that
            exist only in 3D.
            <br />
            Rihhadatul <em>“Sebas”</em> Aimi.
          </p>
          <a
            href="#work"
            className="round-link"
            aria-label="Explore selected work"
          >
            EXPLORE <Arrow />
          </a>
        </div>
      </div>
      <button
        className="video-toggle"
        type="button"
        onClick={toggle}
        aria-label={
          playing ? "Pause background video" : "Play background video"
        }
      >
        {playing ? "PAUSE FILM Ⅱ" : "PLAY FILM ▶"}
      </button>
      <div className="hero-side" aria-hidden="true">
        SCROLL TO EXPLORE / 01 OF 05
      </div>
    </section>
  );
}

function Statement() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-5%", "5%"],
  );
  return (
    <section className="statement" ref={ref}>
      <div className="statement-top wrap">
        <span className="eyebrow">01 / TWO KINDS OF WORK</span>
        <span className="eyebrow">FROM FILINGS TO FILM ↘</span>
      </div>
      <div className="statement-marquee">
        <motion.p style={{ x }}>
          Read the source. <em>Build the scene.</em>
        </motion.p>
      </div>
      <div className="statement-footer wrap">
        <p>
          Filing research and 3D art have little in common on paper. Both reward
          a second look.
        </p>
        <a className="statement-link" href="#work">
          SEE THE WORK ↗
        </a>
      </div>
    </section>
  );
}

function SectionHead({ index, label, title, note }) {
  return (
    <div className="section-head">
      <div className="section-meta">
        <span>
          {index} / {label}
        </span>
        <span className="section-hairline" />
      </div>
      <div className="section-head-row">
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Diagram({ type }) {
  if (type === "rag")
    return (
      <div
        className="diagram rag-diagram"
        aria-label="Diagram: SEC filings to retrieval to reviewed answer"
        role="img"
      >
        <span className="diagram-caption">RESEARCH PIPELINE / LOCAL FIRST</span>
        <div className="diagram-flow">
          <div>
            <small>01 / SOURCE</small>
            <strong>
              10-K
              <br />
              10-Q
            </strong>
          </div>
          <b>→</b>
          <div>
            <small>02 / RETRIEVE</small>
            <strong>
              FIND
              <br />
              SIGNAL
            </strong>
          </div>
          <b>→</b>
          <div>
            <small>03 / VERIFY</small>
            <strong>
              CHECK
              <br />
              QUOTE
            </strong>
          </div>
        </div>
        <div className="diagram-foot">
          <span>Evidence before explanation.</span>
          <span className="diagram-orbit">◎</span>
        </div>
      </div>
    );
  return (
    <div
      className="diagram cognifi-diagram"
      aria-label="Diagram: investor language classified into cognitive bias signals"
      role="img"
    >
      <span className="diagram-caption">
        BEHAVIORAL FINANCE / INDONESIAN NLP
      </span>
      <div className="bias-visual">
        <span className="bias-ring">FOMO</span>
        <span className="bias-ring">
          LOSS
          <br />
          AVERSION
        </span>
        <span className="bias-ring">CONFIRMATION</span>
        <span className="bias-center">
          language
          <br />→ signal
        </span>
      </div>
      <div className="diagram-foot">
        <span>Make the invisible legible.</span>
        <span>↗</span>
      </div>
    </div>
  );
}

const projects = [
  {
    num: "01",
    type: "rag",
    category: "AI + FINANCE",
    name: "RAG Variance\nExplainer",
    text: "An SEC-filing research workbench that retrieves the receipts behind a financial explanation. Hybrid retrieval, cross-encoder reranking and quote validation keep the source visible.",
    detail:
      "The local application indexes MD&A text from SEC 10-K and 10-Q filings, merges lexical and semantic retrieval, reranks passages, then checks source quotations before presenting a structured answer. The public site is a reviewed, static Johnson & Johnson case walkthrough, not a live hosted model or a guarantee of causal accuracy.",
    meta: "Python · SEC filings · RAG",
    links: [
      [
        "Explore reviewed case",
        "https://rag-variance-explainer.vercel.app/example",
      ],
      ["Source code", "https://github.com/redsandr/rag-variance-explainer"],
    ],
  },
  {
    num: "02",
    type: "cognifi",
    category: "AI + RESEARCH",
    name: "CogniFi",
    text: "An interpretable detector for FOMO, loss aversion and confirmation bias in Indonesian investor language. Designed to show why a signal was raised, not just assign a label.",
    detail:
      "A rule-based six-layer pipeline combines price context, domain keywords, contextual rules and confidence thresholds to create explainable bias signals with counter-evidence and intervention prompts. The repository reports 94.7% accuracy on a 150-case stratified held-out set; that result describes this evaluation, not production reliability.",
    meta: "NLP · Behavioral finance · Research",
    links: [
      ["Explore the repository", "https://github.com/redsandr/cognifi"],
      [
        "View the dataset",
        "https://huggingface.co/datasets/redsandr/cognifi-investor-bias",
      ],
    ],
  },
];

function ProjectCard({ project }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [expanded, setExpanded] = useState(false);
  const move = (event) => {
    if (!reduce && event.pointerType === "mouse") {
      const box = event.currentTarget.getBoundingClientRect();
      setPosition({
        x: ((event.clientX - box.left) / box.width) * 100,
        y: ((event.clientY - box.top) / box.height) * 100,
      });
    }
  };
  return (
    <Reveal className={`project project-${project.type}`}>
      <article
        ref={ref}
        onPointerMove={move}
        style={{ "--px": `${position.x}%`, "--py": `${position.y}%` }}
      >
        <div className="project-intro">
          <span className="eyebrow">
            {project.num} / {project.category}
          </span>
          <span className="project-mark">↗</span>
        </div>
        <div className="project-grid">
          <div className="project-copy">
            <h3>
              {project.name.split("\n").map((part, i) => (
                <React.Fragment key={part}>
                  {i > 0 && <br />}
                  {part}
                </React.Fragment>
              ))}
            </h3>
            <p>{project.text}</p>
            <span className="project-tech">{project.meta}</span>
            <div className="project-links">
              <a href={`#/case/${project.type}`}>
                Read case study <Arrow diagonal />
              </a>
              <button
                className="detail-toggle"
                type="button"
                aria-expanded={expanded}
                aria-controls={`detail-${project.type}`}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Less about this project −" : "Quick details +"}
              </button>
              {project.links.map(([label, href]) => (
                <a key={label} href={href} {...external}>
                  {label} <Arrow diagonal />
                </a>
              ))}
            </div>
          </div>
          <a
            className="project-visual-link"
            href={`#/case/${project.type}`}
            aria-label={`Read ${project.name.replace("\n", " ")} case study`}
          >
            <Diagram type={project.type} />
          </a>
        </div>
        {expanded && (
          <div id={`detail-${project.type}`} className="project-detail">
            <span className="eyebrow">HOW IT WORKS / LIMITATIONS</span>
            <p>{project.detail}</p>
          </div>
        )}
      </article>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="work wrap section-pad">
      <SectionHead
        index="02"
        label="SELECTED WORK"
        title={
          <>
            What I've <em>built.</em>
          </>
        }
        note="Open a case study, then follow its code or published source."
      />
      <div className="project-list">
        {projects.map((p) => (
          <ProjectCard key={p.num} project={p} />
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about section-pad">
      <div className="wrap">
        <SectionHead
          index="04"
          label="ABOUT"
          title={
            <>
              Accounting, code, <em>and 3D.</em>
            </>
          }
        />
        <div className="about-grid">
          <Reveal className="portrait-wrap">
            <img
              src={media("portrait.webp")}
              alt="Portrait of Rihhadatul Aimi"
              loading="lazy"
            />
            <span>RIHHADATUL “SEBAS” AIMI / INDONESIA</span>
          </Reveal>
          <div className="about-copy">
            <Reveal>
              <p className="about-lead">
                I studied <em>accounting</em>, built financial reporting
                workflows, and now work in backend AI. I've also made 3D art
                since 2018.
              </p>
              <p>
                At Flowistic, I built a 72-account chart of accounts and
                reconciled four bank accounts across IDR, USD, and CNY. My
                independent projects grew out of similar questions about
                evidence: where did a number come from, and what can we say
                about it?
              </p>
            </Reveal>
            <div className="timeline">
              <div>
                <span>2026 / NOW</span>
                <p>
                  Backend AI Engineering Intern <b>· FlyRank AI</b>
                </p>
              </div>
              <div>
                <span>2026</span>
                <p>
                  Finance Specialist <b>· Flowistic</b>
                </p>
              </div>
              <div>
                <span>2020 / 2026</span>
                <p>
                  Bachelor of Accounting <b>· Universitas Syiah Kuala</b>
                </p>
              </div>
              <div>
                <span>2018 / 2025</span>
                <p>
                  3D Generalist <b>· Freelance</b>
                </p>
              </div>
            </div>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/rihhadatul-aimi/"
              {...external}
            >
              WORK HISTORY ON LINKEDIN <Arrow diagonal />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const resumes = [
  {
    id: "01",
    name: "AI Engineering",
    desc: "Backend AI, retrieval, NLP and evidence-grounded systems.",
    file: "Rihhadatul_Aimi_AI_Engineering_CV.pdf",
  },
  {
    id: "02",
    name: "Finance & Accounting",
    desc: "Financial reporting, reconciliation, controls and analysis.",
    file: "Rihhadatul_Aimi_Finance_Accounting_CV.pdf",
  },
  {
    id: "03",
    name: "Creative & 3D",
    desc: "3D production, visual storytelling and digital content.",
    file: "Rihhadatul_Aimi_Creative_3D_CV.pdf",
  },
];
function CVs() {
  return (
    <section id="cv" className="cv-section section-pad">
      <div className="wrap">
        <SectionHead
          index="05"
          label="RESUMES"
          title={
            <>
              Pick the right <em>CV.</em>
            </>
          }
          note="One role per PDF. No columns or graphics to confuse an ATS parser."
        />
        <div className="resume-list">
          {resumes.map((r) => (
            <a
              className="resume"
              key={r.id}
              href={`${base}cv/${r.file}`}
              download={r.file}
            >
              <span className="resume-number">{r.id}</span>
              <span className="resume-body">
                <strong>{r.name}</strong>
                <small>{r.desc}</small>
              </span>
              <span className="resume-download">
                DOWNLOAD PDF <span aria-hidden="true">↙</span>
              </span>
            </a>
          ))}
        </div>
        <p className="cv-note">
          One-column, selectable text · Updated November 2026
        </p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="contact section-pad">
      <div className="wrap">
        <div className="contact-top">
          <span className="eyebrow">CONTACT</span>
          <span className="eyebrow">INDONESIA / SEND A MESSAGE</span>
        </div>
        <h2>
          Have a question?
          <br />
          <em>Write me.</em>
        </h2>
        <a className="contact-email" href="mailto:aimirihad@gmail.com">
          aimirihad@gmail.com <Arrow diagonal />
        </a>
        <div className="contact-bottom">
          <span>© {new Date().getFullYear()} RIHHADATUL AIMI</span>
          <div>
            <a href="https://github.com/redsandr" {...external}>
              GITHUB ↗
            </a>
            <a
              href="https://www.linkedin.com/in/rihhadatul-aimi/"
              {...external}
            >
              LINKEDIN ↗
            </a>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
          <span>DESIGNED AND BUILT BY SEBAS.</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [hash, setHash] = useState(window.location.hash);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 25,
    restDelta: 0.001,
  });
  useEffect(() => {
    const change = () => setHash(window.location.hash);
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    if (hash.startsWith("#/case/"))
      window.scrollTo({ top: 0, behavior: "instant" });
    else {
      document.title = "Rihhadatul Aimi | Work and projects";
      if (hash.length > 1)
        requestAnimationFrame(() =>
          document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({ behavior: "instant" }),
        );
    }
  }, [hash]);
  const slug = hash.startsWith("#/case/") ? hash.slice("#/case/".length) : null;
  return (
    <>
      <a className="skip-link" href="#work">
        Skip to selected work
      </a>
      <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
      <Header />
      {slug ? (
        <Suspense
          fallback={
            <main className="case-page case-loading" aria-live="polite">
              Loading case study
            </main>
          }
        >
          <CaseStudy slug={slug} />
        </Suspense>
      ) : (
        <>
          <main>
            <Hero />
            <Statement />
            <Work />
            <Gallery SectionHead={SectionHead} />
            <About />
            <CVs />
          </main>
          <Contact />
        </>
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
