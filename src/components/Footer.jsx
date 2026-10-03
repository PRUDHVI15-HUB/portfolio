import { Mail } from "lucide-react";
import { Github, Linkedin, Twitter } from "./Icons";
import { siteConfig } from "../config/site";
import "./Footer.css";

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        {/* Left: Brand Monogram & Copyright */}
        <div className="footer__info">
          <a
            href="#home"
            className="footer__logo"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            &lt;{siteConfig.initials || "CP"} /&gt;
          </a>
          <p className="footer__copy">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        {/* Right: Clean Social Icons */}
        <div className="footer__socials" aria-label="Social links">
          {siteConfig.github && (
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="GitHub profile"
            >
              <Github size={20} />
            </a>
          )}
          {siteConfig.linkedin && (
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="LinkedIn profile"
            >
              <Linkedin size={20} />
            </a>
          )}
          {siteConfig.twitter && (
            <a
              href={siteConfig.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social"
              aria-label="Twitter profile"
            >
              <Twitter size={20} />
            </a>
          )}
          {siteConfig.email && (
            <a
              href={`mailto:${siteConfig.email}`}
              className="footer__social"
              aria-label="Send email"
            >
              <Mail size={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
