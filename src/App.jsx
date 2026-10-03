import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Education from "./components/Education/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { useActiveSection } from "./hooks/useScrollReveal";

const SECTIONS = ["home", "about", "skills", "projects", "education", "contact"];

// ── Easter Egg: Konami Code ────────────────────────────────
function useEasterEgg() {
  useEffect(() => {
    const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    const SUDO = "sudo hire prudhvi";
    let konamiIdx = 0;
    let sudoBuffer = "";

    const handleKey = (e) => {
      // Konami code
      if (e.key === KONAMI[konamiIdx]) {
        konamiIdx++;
        if (konamiIdx === KONAMI.length) {
          triggerEasterEgg("🎮 Konami code unlocked! Hire Prudhvi? That's a great idea.");
          konamiIdx = 0;
        }
      } else {
        konamiIdx = 0;
      }

      // "sudo hire prudhvi" typed anywhere
      if (e.key.length === 1) {
        sudoBuffer = (sudoBuffer + e.key).slice(-SUDO.length);
        if (sudoBuffer.toLowerCase() === SUDO) {
          triggerEasterEgg("✅ sudo hire prudhvi\n→ Permission granted. Great taste!");
          sudoBuffer = "";
        }
      }
    };

    const triggerEasterEgg = (msg) => {
      const existing = document.getElementById("easter-egg-toast");
      if (existing) existing.remove();

      const toast = document.createElement("div");
      toast.id = "easter-egg-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      toast.style.cssText = `
        position: fixed;
        bottom: 32px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background: linear-gradient(135deg, #0d0d14 0%, #13131f 100%);
        border: 1px solid rgba(6,182,212,0.4);
        border-radius: 16px;
        padding: 16px 24px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.88rem;
        color: #06b6d4;
        z-index: 9999;
        box-shadow: 0 8px 32px rgba(6,182,212,0.2), 0 0 0 1px rgba(6,182,212,0.05);
        white-space: pre-line;
        text-align: center;
        max-width: 320px;
        line-height: 1.5;
        transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease;
        opacity: 0;
      `;
      toast.textContent = msg;
      document.body.appendChild(toast);

      requestAnimationFrame(() => {
        toast.style.transform = "translateX(-50%) translateY(0)";
        toast.style.opacity = "1";
      });

      setTimeout(() => {
        toast.style.transform = "translateX(-50%) translateY(100px)";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 400);
      }, 4000);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);
}

export default function App() {
  useActiveSection(SECTIONS);
  useEasterEgg();

  return (
    <>
      <CustomCursor />
      <div className="grid-bg" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
