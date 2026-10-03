import { useState, useRef } from "react";
import { skillCategories, skills } from "../../data/skills";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Skills.css";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");
  const headRef = useRef(null);
  const gridRef = useRef(null);

  useScrollReveal(headRef);
  useScrollReveal(gridRef);

  const filtered =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" aria-label="Tech stack">
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">Tech Stack</p>
          <h2 className="section-title">Technical Skills & AI Arsenal</h2>
          <p className="section-subtitle">
            From modern AI coding agents and rapid prototyping tools to full-stack engineering and computer science fundamentals.
          </p>
        </div>

        {/* Category filter */}
        <div className="skills__filter" role="tablist" aria-label="Skill categories">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              className={`skills__filter-btn ${activeCategory === cat.id ? "skills__filter-btn--active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div
          ref={gridRef}
          className="skills__grid reveal"
          role="tabpanel"
          aria-label={`${activeCategory} skills`}
        >
          {filtered.map((skill, i) => (
            <div
              key={skill.id}
              className="skill-card"
              style={{ "--anim-delay": `${i * 0.04}s` }}
            >
              <span className="skill-card__icon" aria-hidden="true">
                {typeof skill.icon === "string" && (skill.icon.startsWith("/") || skill.icon.startsWith("http")) ? (
                  <img
                    src={skill.icon}
                    alt={`${skill.name} logo`}
                    className="skill-card__logo"
                    width="26"
                    height="26"
                    loading="lazy"
                  />
                ) : (
                  skill.icon
                )}
              </span>
              <div className="skill-card__content">
                <span className="skill-card__name">{skill.name}</span>
                <span className="skill-card__desc">{skill.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
