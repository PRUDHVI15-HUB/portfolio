import { useRef } from "react";
import { experience } from "../../data/experience";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Experience.css";

export default function Experience() {
  const headRef = useRef(null);
  const timelineRef = useRef(null);
  useScrollReveal(headRef);
  useScrollReveal(timelineRef);

  return (
    <section id="experience" aria-label="Experience and leadership">
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">Experience & Leadership</p>
          <h2 className="section-title">Where I've Contributed</h2>
          <p className="section-subtitle">Roles and responsibilities I've taken on.</p>
        </div>

        <div ref={timelineRef} className="exp-timeline reveal">
          {experience.map((item, i) => (
            <article
              key={item.id}
              className="exp-card"
              style={{ "--exp-color": item.color, "--delay": `${i * 0.1}s` }}
            >
              <div className="exp-card__accent" aria-hidden="true" />

              <div className="exp-card__header">
                <div className="exp-card__title-group">
                  <span className="badge" style={{ background: `${item.color}18`, color: item.color, border: `1px solid ${item.color}33` }}>
                    {item.type}
                  </span>
                  <h3 className="exp-card__role">{item.role}</h3>
                  <p className="exp-card__company">{item.company}</p>
                </div>
                <div className="exp-card__meta">
                  <span className="exp-card__period">{item.period}</span>
                  <span className="exp-card__location">{item.location}</span>
                </div>
              </div>

              <p className="exp-card__description">{item.description}</p>

              <ul className="exp-card__responsibilities">
                {item.responsibilities.map((r) => (
                  <li key={r} className="exp-card__resp-item">
                    <span className="exp-card__resp-dot" aria-hidden="true" />
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
