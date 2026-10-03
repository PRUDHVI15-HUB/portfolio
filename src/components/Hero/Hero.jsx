import { useState, useEffect, useRef } from "react";
import { ArrowRight, Download, ChevronDown } from "lucide-react";
import { Github, Linkedin } from "../Icons";
import { siteConfig } from "../../config/site";
import "./Hero.css";

const ROTATING_TEXTS = [
  "Web Applications",
  "AI-Powered Products",
  "Developer Tools",
  "Full-Stack Solutions",
];

const TERMINAL_LINES = [
  { delay: 400, text: "$ whoami", type: "cmd" },
  { delay: 900, text: "prudhvi", type: "output" },
  { delay: 1400, text: "$ cat focus.txt", type: "cmd" },
  { delay: 1900, text: "full-stack + ai development", type: "output" },
  { delay: 2400, text: "$ ls projects/", type: "cmd" },
  { delay: 2900, text: "zenscore-ai/  projvanta/  blockchain/", type: "output" },
  { delay: 3400, text: "$ echo $STATUS", type: "cmd" },
  { delay: 3900, text: "building · learning · shipping", type: "output success" },
];

function useTypingCycle(texts, interval = 2800) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | pausing | erasing

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplayed(texts[0]);
      return;
    }

    let timeout;
    const current = texts[index];

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), interval);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("erasing"), 400);
    } else if (phase === "erasing") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
      } else {
        setIndex((prev) => (prev + 1) % texts.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, index, texts, interval]);

  return displayed;
}

function Terminal() {
  const [visibleLines, setVisibleLines] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleLines]);

  return (
    <div className="terminal" aria-label="Developer terminal animation">
      <div className="terminal__header">
        <div className="terminal__dots">
          <span className="dot dot--red" aria-hidden="true"></span>
          <span className="dot dot--yellow" aria-hidden="true"></span>
          <span className="dot dot--green" aria-hidden="true"></span>
        </div>
        <span className="terminal__title">prudhvi@portfolio ~ zsh</span>
      </div>
      <div className="terminal__body">
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className={`terminal__line ${visibleLines.includes(i) ? "terminal__line--visible" : ""} ${line.type.includes("cmd") ? "terminal__line--cmd" : ""} ${line.type.includes("success") ? "terminal__line--success" : ""}`}
            aria-hidden="true"
          >
            {line.type.includes("cmd") && <span className="terminal__prompt">→</span>}
            <span className="terminal__text">{line.text}</span>
          </div>
        ))}
        <div ref={endRef} />
        <span className="terminal__cursor" aria-hidden="true">▋</span>
      </div>
    </div>
  );
}

function FloatingBadge({ icon, label, color, style }) {
  return (
    <div className="floating-badge" style={{ "--badge-color": color, ...style }} aria-hidden="true">
      {icon && <img src={icon} alt="" className="floating-badge__icon" width="18" height="18" loading="lazy" />}
      <span>{label}</span>
    </div>
  );
}

export default function Hero() {
  const rotatingText = useTypingCycle(ROTATING_TEXTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleScrollDown = () => {
    const about = document.getElementById("about");
    if (about) {
      window.scrollTo({ top: about.offsetTop - 72, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className={`hero ${loaded ? "hero--loaded" : ""}`} aria-label="Introduction">
      <div className="container hero__inner">
        {/* LEFT: Text content */}
        <div className="hero__content">
          <div className="hero__status badge badge-cyan">
            <span className="hero__status-dot" aria-hidden="true"></span>
            Available for Opportunities
          </div>

          <div className="hero__greeting">Hi, I'm</div>

          <h1 className="hero__name">
            Chinthapalli<br />
            <span className="gradient-text">Prudhvi</span>
          </h1>

          <p className="hero__headline">
            Computer Science Student<br />
            <span className="hero__build-line">
              I build{" "}
              <span className="hero__rotating" aria-live="polite" aria-atomic="true">
                {rotatingText}
                <span className="hero__cursor" aria-hidden="true">|</span>
              </span>
            </span>
          </p>

          <p className="hero__description">
            Full-stack developer and AI enthusiast focused on building practical web applications and intelligent solutions from Hyderabad, India.
          </p>

          {/* CTA Buttons */}
          <div className="hero__ctas">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
            >
              View My Projects
              <ArrowRight size={16} />
            </a>
            {siteConfig.resume ? (
              <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Download size={16} />
                Download Resume
              </a>
            ) : (
              <button className="btn btn-secondary" disabled title="Resume coming soon">
                <Download size={16} />
                Resume (Soon)
              </button>
            )}
          </div>

          {/* Social links */}
          <div className="hero__socials">
            {siteConfig.github && (
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub profile">
                <Github size={18} />
              </a>
            )}
            {siteConfig.linkedin && (
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="LinkedIn profile">
                <Linkedin size={18} />
              </a>
            )}
          </div>
        </div>

        {/* RIGHT: Terminal Visual */}
        <div className="hero__visual">
          <FloatingBadge icon="/icons/react.svg" label="React" color="#06b6d4" style={{ top: "10%", right: "-8%" }} />
          <FloatingBadge icon="/icons/nodejs.svg" label="Node.js" color="#22c55e" style={{ bottom: "18%", right: "-10%" }} />
          <FloatingBadge icon="/icons/python.svg" label="Python" color="#3b82f6" style={{ top: "28%", left: "-10%" }} />
          <FloatingBadge icon="/icons/gemini.svg" label="AI / LLM" color="#8b5cf6" style={{ bottom: "30%", left: "-8%" }} />
          <Terminal />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero__scroll"
        onClick={handleScrollDown}
        aria-label="Scroll to about section"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
