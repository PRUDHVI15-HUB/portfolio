import { useState } from "react";
import { ExternalLink, ArrowRight, Star, BookOpen } from "lucide-react";
import { Github } from "../Icons";
import { projects } from "../../data/projects";
import ProjectModal from "./ProjectModal";
import "./Projects.css";

function ProjectVisual({ project }) {
  return (
    <div
      className="project-visual"
      style={{ "--project-color": project.color, "--project-accent": project.accentColor }}
      aria-hidden="true"
    >
      <div className="project-visual__bg" />
      <div className="project-visual__content">
        <div className="project-visual__logo-container">
          <img
            src={project.logo}
            alt={`${project.title} logo`}
            className="project-visual__logo-img"
            width="72"
            height="72"
            loading="lazy"
          />
        </div>
        <span className="project-visual__name">
          <span className="project-visual__dot" style={{ background: project.color }} />
          {project.title}
        </span>
        {project.id === "blockchain" && (
          <div className="project-visual__flow">
            {["Upload", "Encrypt", "IPFS", "Blockchain"].map((step, i) => (
              <span key={step} className="project-visual__step">
                {step}{i < 3 && <span className="project-visual__arrow">→</span>}
              </span>
            ))}
          </div>
        )}
        {project.id === "zenscore" && (
          <div className="project-visual__pills">
            {["AI Tutor", "Dashboard", "Career"].map((tag) => (
              <span key={tag} className="project-visual__pill">{tag}</span>
            ))}
          </div>
        )}
        {project.id === "projvanta" && (
          <div className="project-visual__pills">
            {["Clean UI", "Responsive", "Live"].map((tag) => (
              <span key={tag} className="project-visual__pill">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ project, onDetails }) {
  return (
    <article className={`project-card ${project.featured ? "project-card--featured" : ""}`}>
      <ProjectVisual project={project} />

      <div className="project-card__body">
        <div className="project-card__meta">
          {project.featured && (
            <span className="badge badge-cyan">
              <Star size={10} /> Featured Project
            </span>
          )}
          {project.isResearch && (
            <span className="badge badge-green">
              <BookOpen size={10} /> Research
            </span>
          )}
          <div className="project-card__categories">
            {project.categories.map((cat) => (
              <span key={cat} className="project-card__category">{cat}</span>
            ))}
          </div>
        </div>

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__tagline">{project.tagline}</p>

        <div className="project-card__tech">
          {project.tech.map((t) => (
            <span key={t} className="project-card__tech-badge">{t}</span>
          ))}
        </div>

        <div className="project-card__actions">
          <button className="btn btn-ghost btn-sm" onClick={() => onDetails(project)}>
            View Details <ArrowRight size={13} />
          </button>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <ExternalLink size={13} />
              Live Demo
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <Github size={13} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" aria-label="Featured projects">
      <div className="container">
        <p className="section-label">Featured Projects</p>
        <h2 className="section-title">Things I've Built</h2>
        <p className="section-subtitle">Some of the things I've built and shipped.</p>

        <div className="projects__grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onDetails={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
