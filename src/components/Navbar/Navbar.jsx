import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { siteConfig } from "../../config/site";
import { useTheme } from "../../context/ThemeContext";
import ThemeSlider from "../ThemeSlider/ThemeSlider";
import "./Navbar.css";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onChange = (e) => setActiveSection(e.detail);
    window.addEventListener("sectionChange", onChange);
    return () => window.removeEventListener("sectionChange", onChange);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="container navbar__inner">
          {/* Logo */}
          <a
            href="#home"
            className="navbar__logo"
            onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
            aria-label="Chinthapalli Prudhvi — Home"
          >
            <span className="navbar__code-tag">
              <span className="navbar__bracket">&lt;</span>
              <span className="navbar__name">Prudhvi</span>
              <span className="navbar__bracket">/&gt;</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="navbar__links hide-mobile" role="list">
            {navLinks.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`navbar__link ${activeSection === id ? "navbar__link--active" : ""}`}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="navbar__actions hide-mobile">
            {/* Draggable Theme Slider */}
            <ThemeSlider />

            {siteConfig.resume && (
              <a
                href={siteConfig.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                Resume
              </a>
            )}
          </div>

          {/* Mobile controls (Theme Slider + Hamburger) */}
          <div className="navbar__mobile-controls hide-desktop">
            <ThemeSlider />

            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {navLinks.map((link, i) => {
            const id = link.href.replace("#", "");
            return (
              <li key={link.label} style={{ transitionDelay: menuOpen ? `${i * 0.04}s` : "0s" }}>
                <a
                  href={link.href}
                  className={`mobile-menu__link ${activeSection === id ? "mobile-menu__link--active" : ""}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className="mobile-menu__num">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mobile-menu__footer">
          <div className="mobile-menu__theme-row">
            <span>Theme</span>
            <ThemeSlider />
          </div>
          {siteConfig.resume && (
            <a href={siteConfig.resume} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" tabIndex={menuOpen ? 0 : -1}>
              Resume
            </a>
          )}
        </div>
      </div>

      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
