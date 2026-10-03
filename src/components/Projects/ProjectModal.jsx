import { useEffect, useRef } from "react";
import {
  X,
  ExternalLink,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Layers,
  Wrench,
  Sparkles,
} from "lucide-react";
import { Github } from "../Icons";
import "./ProjectModal.css";

export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  // Focus trap & keyboard close
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    modalRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <div
        className="modal"
        ref={modalRef}
        tabIndex={-1}
        style={{
          "--project-color": project.color,
          "--project-accent": project.accentColor,
        }}
      >
        {/* Top Sticky Header */}
        <div className="modal__header">
          <div className="modal__header-left">
            {project.logo && (
              <div className="modal__logo-wrap">
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="modal__logo"
                  width="56"
                  height="56"
                />
              </div>
            )}
            <div className="modal__title-box">
              <div className="modal__badges">
                {project.categories?.map((cat) => (
                  <span key={cat} className="badge badge-cyan">
                    {cat}
                  </span>
                ))}
                {project.isResearch && (
                  <span className="badge badge-green">
                    <BookOpen size={11} /> Academic Research
                  </span>
                )}
              </div>
              <h2 className="modal__title">{project.title}</h2>
              <p className="modal__tagline">{project.tagline}</p>
            </div>
          </div>

          <div className="modal__header-actions">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary modal__action-btn"
              >
                <span>Live Demo</span>
                <ExternalLink size={14} />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary modal__action-btn"
              >
                <Github size={15} />
                <span>Code</span>
              </a>
            )}
            <button
              className="modal__close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal__body">
          {/* Section: Overview Card */}
          <div className="modal__card modal__overview-card">
            <div className="modal__section-heading">
              <Sparkles size={16} className="modal__heading-icon" />
              <span>Project Overview</span>
            </div>
            <p className="modal__overview-text">{project.description}</p>
          </div>

          {/* Section: Problem vs Solution Bento Grid */}
          <div className="modal__grid-2">
            <div className="modal__card modal__card--problem">
              <div className="modal__section-heading modal__heading--danger">
                <AlertTriangle size={15} />
                <span>The Problem</span>
              </div>
              <p className="modal__card-text">{project.problem}</p>
            </div>

            <div className="modal__card modal__card--solution">
              <div className="modal__section-heading modal__heading--success">
                <ShieldCheck size={15} />
                <span>The Solution & Engineering Impact</span>
              </div>
              <p className="modal__card-text">{project.solution}</p>
            </div>
          </div>

          {/* Section: Key Features */}
          {project.features?.length > 0 && (
            <div className="modal__card">
              <div className="modal__section-heading">
                <CheckCircle size={16} className="modal__heading-icon" />
                <span>Core Capabilities & Features</span>
              </div>
              <div className="modal__features-grid">
                {project.features.map((feature, i) => (
                  <div key={i} className="modal__feature-item">
                    <span className="modal__feature-check">✓</span>
                    <span className="modal__feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Architecture & Pipeline */}
          {project.architecture && (
            <div className="modal__card">
              <div className="modal__section-heading">
                <Layers size={16} className="modal__heading-icon" />
                <span>System Architecture & Pipeline</span>
              </div>
              <div className="modal__arch-grid">
                {project.architecture.map((layer, i) => (
                  <div key={layer.label} className="modal__arch-item">
                    <span className="modal__arch-index">0{i + 1}</span>
                    <div className="modal__arch-info">
                      <span className="modal__arch-layer">{layer.label}</span>
                      <span className="modal__arch-tech">{layer.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Workflow for Blockchain */}
          {project.workflow && (
            <div className="modal__card">
              <div className="modal__section-heading">
                <Layers size={16} className="modal__heading-icon" />
                <span>End-to-End Cryptographic Flow</span>
              </div>
              <div className="modal__flow-steps">
                {project.workflow.map((step, i) => (
                  <div key={step} className="modal__flow-step">
                    <span className="modal__flow-num">{i + 1}</span>
                    <span className="modal__flow-name">{step}</span>
                    {i < project.workflow.length - 1 && (
                      <span className="modal__flow-arrow">→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Tech Stack Badges */}
          <div className="modal__card">
            <div className="modal__section-heading">
              <Wrench size={16} className="modal__heading-icon" />
              <span>Technologies & Tools Employed</span>
            </div>
            <div className="modal__tech-tags">
              {project.tech.map((t) => (
                <span key={t} className="modal__tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Section: Engineering Challenges & What I Learned */}
          <div className="modal__grid-2">
            <div className="modal__card">
              <div className="modal__section-heading">
                <span>Technical Challenges Overcome</span>
              </div>
              <ul className="modal__bullet-list">
                {project.challenges?.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="modal__card">
              <div className="modal__section-heading">
                <span>Key Engineering Learnings</span>
              </div>
              <ul className="modal__bullet-list">
                {project.learned?.map((l, idx) => (
                  <li key={idx}>{l}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section: Academic Publication */}
          {project.publication && (
            <div className="modal__card modal__card--publication">
              <div className="modal__section-heading modal__heading--success">
                <BookOpen size={16} />
                <span>Peer-Reviewed Academic Publication</span>
              </div>
              <h4 className="modal__pub-title">
                "{project.publication.title}"
              </h4>
              <p className="modal__pub-journal">
                Published in <strong>{project.publication.journal}</strong> •
                Paper ID:{" "}
                <code className="modal__pub-code">
                  {project.publication.paperId}
                </code>
              </p>
            </div>
          )}

          {/* Modal Footer CTA */}
          <div className="modal__footer-bar">
            <span className="modal__footer-text">
              Interested in seeing this live or exploring the source code?
            </span>
            <div className="modal__footer-actions">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <span>Visit Live App</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <Github size={15} />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
