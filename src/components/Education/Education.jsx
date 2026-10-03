import { useRef } from "react";
import { GraduationCap, MapPin, Award } from "lucide-react";
import { education } from "../../data/experience";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Education.css";

export default function Education() {
  const headRef = useRef(null);
  const timelineRef = useRef(null);
  useScrollReveal(headRef);
  useScrollReveal(timelineRef);

  return (
    <section id="education" aria-label="Education">
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">Education</p>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">My educational journey so far.</p>
        </div>

        <div ref={timelineRef} className="edu-timeline reveal">
          {education.map((item, i) => (
            <div key={item.id} className="edu-item" style={{ "--edu-color": item.color }}>
              {/* Timeline line + dot */}
              <div className="edu-item__line" aria-hidden="true">
                <div className="edu-item__dot">
                  <GraduationCap size={14} />
                </div>
                {i < education.length - 1 && <div className="edu-item__connector" />}
              </div>

              {/* Card */}
              <article className="edu-card">
                <div className="edu-card__header">
                  <div>
                    {item.status === "current" && (
                      <span className="badge badge-cyan edu-card__status">
                        <span className="status-dot" style={{ background: "var(--accent-cyan)" }} />
                        Current
                      </span>
                    )}
                    <h3 className="edu-card__degree">{item.degree}</h3>
                    <p className="edu-card__institution">{item.institution}</p>
                  </div>
                  <div className="edu-card__meta">
                    <span className="edu-card__period">{item.period}</span>
                    <span className="edu-card__location">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="edu-card__grade">
                  <Award size={15} />
                  <span>{item.grade}</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
