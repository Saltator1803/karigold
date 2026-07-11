"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return;
      glowRef.current.style.left = `${e.clientX}px`;
      glowRef.current.style.top = `${e.clientY}px`;
    };

    // Check if device supports touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="custom-cursor-glow pointer-events-none hidden md:block"
      style={{
        position: "fixed",
        width: "450px",
        height: "450px",
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.04) 0%, rgba(212, 175, 55, 0) 70%)",
        borderRadius: "50%",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        mixBlendMode: "screen",
        left: "-9999px",
        top: "-9999px",
      }}
    />
  );
}
