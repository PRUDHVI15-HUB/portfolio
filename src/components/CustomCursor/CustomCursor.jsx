import { useEffect, useRef, useState } from "react";
import "./CustomCursor.css";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, [data-cursor="hover"], .project-card, .btn, .tag, input[type="submit"], input[type="button"]';
const TEXT_INPUT_SELECTOR =
  'input[type="text"], input[type="email"], input[type="search"], input[type="number"], input[type="password"], textarea, [contenteditable="true"]';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDown, setIsDown] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse/trackpad), not touchscreens
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => {
      const isFine = mediaQuery.matches;
      setEnabled(isFine);
      if (isFine) {
        document.body.classList.add("custom-cursor-active");
      } else {
        document.body.classList.remove("custom-cursor-active");
      }
    };

    updateEnabled();
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateEnabled);
    } else {
      mediaQuery.addListener(updateEnabled);
    }

    let rafId = null;
    let targetX = -100;
    let targetY = -100;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);

      if (cursorRef.current) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          if (cursorRef.current) {
            // Hotspot anchor offset: aligns the sharp tip of the arrow (rotated 325deg) exactly at (targetX, targetY)
            cursorRef.current.style.transform = `translate3d(${targetX - 5.7}px, ${targetY - 3.8}px, 0)`;
          }
        });
      }

      // Check target element
      const target = e.target instanceof Element ? e.target : null;
      if (target) {
        const textInput = Boolean(target.closest(TEXT_INPUT_SELECTOR));
        setIsTextInput(textInput);

        const interactive = Boolean(target.closest(INTERACTIVE_SELECTOR));
        setIsHovering(interactive);
      }
    };

    const onPointerDown = () => setIsDown(true);
    const onPointerUp = () => setIsDown(false);

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", updateEnabled);
      } else {
        mediaQuery.removeListener(updateEnabled);
      }
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${visible && !isTextInput ? "custom-cursor--visible" : "custom-cursor--hidden"} ${
        isHovering ? "custom-cursor--hover" : ""
      } ${isDown ? "custom-cursor--down" : ""}`}
      aria-hidden="true"
    >
      <div className="custom-cursor__icon-wrapper">
        <svg
          viewBox="0 0 24 24"
          className="custom-cursor__icon"
          aria-hidden="true"
        >
          <path d="M12 3 L3 21 Q12 14 21 21 Z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
}
