import { useRef } from "react";
import { MapPin, BookOpen, Zap, Cpu, Globe, Brain } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { projects } from "../../data/projects";
import "./About.css";

const STATS = [
  { value: "8.47", label: "Current CGPA", icon: <BookOpen size={18} /> },
  { value: "B.Tech", label: "CSE", icon: <Cpu size={18} /> },
  { value: String(projects.length) + "+", label: "Major Projects", icon: <Zap size={18} /> },
  { value: "2023–Now", label: "Engineering Journey", icon: <Globe size={18} /> },
];

const FOCUS_ITEMS = [
  { icon: <Globe size={16} />, label: "Frontend Engineering" },
  { icon: <Zap size={16} />, label: "Full-Stack Development" },
  { icon: <Brain size={16} />, label: "AI-Powered Applications" },
  { icon: <Cpu size={16} />, label: "Problem Solving" },
];

export default function About() {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  useScrollReveal(headRef);
  useScrollReveal(textRef, { rootMargin: "0px 0px -30px 0px" });
  useScrollReveal(statsRef, { rootMargin: "0px 0px -30px 0px" });

  return (
    <section id="about" ref={sectionRef} aria-label="About me">
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">About Me</p>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about__grid">
          {/* Text content */}
          <div ref={textRef} className="reveal about__text-col">
            <div className="about__location">
              <MapPin size={14} />
              Hyderabad, Telangana, India
            </div>

            <p className="about__paragraph">
              I'm a Computer Science Engineering student at{" "}
              <strong>CMR Technical Campus, Hyderabad</strong>, interested in building practical
              software products and exploring the intersection of web development and AI.
            </p>

            <p className="about__paragraph">
              I enjoy turning ideas into working applications — from full-stack platforms to
              AI-powered student tools. My current focus is strengthening my frontend and backend
              development skills while building projects that solve real problems.
            </p>

            <p className="about__paragraph">
              I'm continuously learning, experimenting with new technologies, and improving through
              hands-on development.
            </p>

            {/* Currently focused on */}
            <div className="about__focus">
              <p className="about__focus-label">Currently focused on</p>
              <div className="about__focus-grid">
                {FOCUS_ITEMS.map((item) => (
                  <div key={item.label} className="about__focus-item">
                    <span className="about__focus-icon">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="reveal about__stats-col">
            <div className="about__stats-grid">
              {STATS.map((stat, i) => (
                <div key={stat.label} className="about__stat-card" style={{ "--delay": `${i * 0.08}s` }}>
                  <div className="about__stat-icon">{stat.icon}</div>
                  <div className="about__stat-value">{stat.value}</div>
                  <div className="about__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Terminal detail card */}
            <div className="about__detail-card">
              <div className="about__detail-row">
                <span className="about__detail-key">building</span>
                <span className="about__detail-val">ZenScore AI</span>
              </div>
              <div className="about__detail-row">
                <span className="about__detail-key">learning</span>
                <span className="about__detail-val">Full-Stack Engineering</span>
              </div>
              <div className="about__detail-row">
                <span className="about__detail-key">leadership</span>
                <span className="about__detail-val">PR & Design Lead · Intel Club CMRTC</span>
              </div>
              <div className="about__detail-row">
                <span className="about__detail-key">location</span>
                <span className="about__detail-val">Hyderabad, India</span>
              </div>
              <div className="about__detail-row">
                <span className="about__detail-key">status</span>
                <span className="about__detail-val about__detail-val--green">
                  <span className="status-dot"></span>
                  Open to opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
