import { useRef } from "react";
import { BookOpen, FileText, ExternalLink } from "lucide-react";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import "./Research.css";

const PUBLICATION = {
  title: "A Novel Blockchain-Driven Approach for Decentralized Cloud Storage",
  journal: "IJARSCT",
  paperId: "IJARSCT-2026-25880",
  type: "Research Paper",
  description:
    "This paper presents a decentralized cloud storage architecture using AES encryption, IPFS for distributed storage, and blockchain-based data integrity verification — removing reliance on centralized storage systems.",
  topics: ["Blockchain", "IPFS", "AES Encryption", "Cloud Storage", "Decentralization", "Data Security"],
};

export default function Research() {
  const headRef = useRef(null);
  const cardRef = useRef(null);
  useScrollReveal(headRef);
  useScrollReveal(cardRef);

  return (
    <section id="research" aria-label="Research and highlights">
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">Research & Highlights</p>
          <h2 className="section-title">Published Work</h2>
        </div>

        <div ref={cardRef} className="reveal research-card">
          <div className="research-card__icon-col" aria-hidden="true">
            <div className="research-card__icon">
              <BookOpen size={28} />
            </div>
            <div className="research-card__line" />
          </div>

          <div className="research-card__content">
            <div className="research-card__meta">
              <span className="badge badge-green">
                <FileText size={11} />
                {PUBLICATION.type}
              </span>
              <span className="research-card__journal">{PUBLICATION.journal}</span>
            </div>

            <h3 className="research-card__title">"{PUBLICATION.title}"</h3>
            <p className="research-card__desc">{PUBLICATION.description}</p>

            <div className="research-card__topics">
              {PUBLICATION.topics.map((t) => (
                <span key={t} className="badge badge-cyan">{t}</span>
              ))}
            </div>

            <div className="research-card__footer">
              <span className="research-card__paperid">
                Paper ID: <code>{PUBLICATION.paperId}</code>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
