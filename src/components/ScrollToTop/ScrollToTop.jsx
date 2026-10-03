import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button once user has scrolled past 300px
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${visible ? "scroll-to-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Scroll back to top"
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={20} className="scroll-to-top__icon" />
    </button>
  );
}
