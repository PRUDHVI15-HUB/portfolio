import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeSlider.css";

export default function ThemeSlider() {
  const { theme, setTheme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const [currentX, setCurrentX] = useState(null); // in pixels during drag
  const trackRef = useRef(null);

  // Constants for slider geometry
  const TRACK_WIDTH = 62;
  const THUMB_SIZE = 26;
  const PADDING = 3;
  const MAX_TRAVEL = TRACK_WIDTH - THUMB_SIZE - PADDING * 2; // 30px

  const isDark = theme === "dark";

  // State refs for drag gesture
  const dragInfoRef = useRef({
    isDown: false,
    startX: 0,
    startOffset: 0,
    grabOffset: THUMB_SIZE / 2,
    hasMoved: false,
    pointerId: null,
  });

  // Resting offset: 0 for light (left), MAX_TRAVEL for dark (right)
  const restingOffset = isDark ? MAX_TRAVEL : 0;
  const activeOffset = isDragging && currentX !== null ? currentX : restingOffset;

  // Handle pointer down (mouse or touch)
  const handlePointerDown = (e) => {
    // Only accept primary button (left mouse click or touch)
    if (e.button !== 0 && e.pointerType === "mouse") return;

    e.preventDefault();
    e.stopPropagation();

    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const pointerX = e.clientX;
    const currentThumbPos = (isDark ? MAX_TRAVEL : 0) + PADDING;
    const clickRelTrack = pointerX - rect.left;

    // Check if pointer hit the thumb directly
    const distFromThumbLeft = clickRelTrack - currentThumbPos;
    let grabOffset = THUMB_SIZE / 2;
    if (distFromThumbLeft >= 0 && distFromThumbLeft <= THUMB_SIZE) {
      grabOffset = distFromThumbLeft;
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    dragInfoRef.current = {
      isDown: true,
      startX: pointerX,
      startOffset: isDark ? MAX_TRAVEL : 0,
      grabOffset: grabOffset,
      hasMoved: false,
      pointerId: e.pointerId,
    };

    setIsDragging(true);
    setCurrentX(isDark ? MAX_TRAVEL : 0);
  };

  // Handle pointer move during drag
  const handlePointerMove = (e) => {
    const info = dragInfoRef.current;
    if (!info.isDown) return;

    e.preventDefault();

    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const deltaX = e.clientX - info.startX;

    if (Math.abs(deltaX) > 3) {
      info.hasMoved = true;
    }

    // Direct cursor tracking: thumb position aligns with pointer minus initial grab offset
    const calculatedX = e.clientX - rect.left - PADDING - info.grabOffset;
    const clampedX = Math.max(0, Math.min(MAX_TRAVEL, calculatedX));
    setCurrentX(clampedX);
  };

  // Handle pointer release
  const handlePointerUp = (e) => {
    const info = dragInfoRef.current;
    if (!info.isDown) return;

    e.preventDefault();

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // ignore
    }

    const wasMoved = info.hasMoved;
    const finalX = currentX !== null ? currentX : (isDark ? MAX_TRAVEL : 0);

    dragInfoRef.current.isDown = false;
    setIsDragging(false);

    if (wasMoved) {
      // The user manually slid the cursor! Snap to whichever side they dragged towards
      const shouldBeDark = finalX >= MAX_TRAVEL / 2;
      setTheme(shouldBeDark ? "dark" : "light");
    } else {
      // User tapped or clicked without dragging
      const track = trackRef.current;
      if (track) {
        const rect = track.getBoundingClientRect();
        const clickRel = e.clientX - rect.left;
        // Clicking left half -> light, clicking right half -> dark
        if (clickRel < rect.width / 2) {
          setTheme("light");
        } else {
          setTheme("dark");
        }
      } else {
        setTheme(isDark ? "light" : "dark");
      }
    }

    setCurrentX(null);
  };

  const handlePointerCancel = () => {
    dragInfoRef.current.isDown = false;
    setIsDragging(false);
    setCurrentX(null);
  };

  return (
    <div
      ref={trackRef}
      className={`theme-slider ${isDark ? "theme-slider--dark" : "theme-slider--light"} ${
        isDragging ? "theme-slider--dragging" : ""
      }`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      role="switch"
      aria-checked={isDark}
      aria-label={
        isDark
          ? "Dark mode active. Drag knob or click left to switch to light mode"
          : "Light mode active. Drag knob or click right to switch to dark mode"
      }
      title={isDark ? "Slide left for Light mode" : "Slide right for Dark mode"}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setTheme(isDark ? "light" : "dark");
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          setTheme("light");
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setTheme("dark");
        }
      }}
    >
      {/* Background Track Icons */}
      <span className="theme-slider__track-icon theme-slider__track-sun" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </span>

      <span className="theme-slider__track-icon theme-slider__track-moon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Draggable Sliding Thumb (Knob) */}
      <div
        className="theme-slider__thumb"
        style={{
          transform: `translate3d(${activeOffset}px, 0, 0)`,
          transition: isDragging
            ? "none"
            : "transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        {isDark ? (
          /* Exact Moon Icon inside knob matching user reference image */
          <svg
            viewBox="0 0 24 24"
            className="theme-slider__thumb-icon"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          /* Sun Icon inside knob when in light mode */
          <svg
            viewBox="0 0 24 24"
            className="theme-slider__thumb-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        )}
      </div>
    </div>
  );
}
