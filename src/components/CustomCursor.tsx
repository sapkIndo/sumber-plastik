"use client";

import { useRef, useEffect } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const lerped = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });
  const rafId = useRef<number>(0);
  const visible = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      lerped.current.x = lerp(lerped.current.x, target.current.x, 0.5);
      lerped.current.y = lerp(lerped.current.y, target.current.y, 0.5);
      dot.style.transform = `translate(${lerped.current.x}px, ${lerped.current.y}px) translate(-50%, -50%)`;
      rafId.current = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        lerped.current.x = e.clientX;
        lerped.current.y = e.clientY;
        visible.current = true;
        dot.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible.current = false;
      dot.style.opacity = "0";
    };

    rafId.current = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[10001] hidden md:block"
      style={{ opacity: 0, transition: "opacity 0.2s", willChange: "transform" }}
    >
      <div className="h-3 w-3 rounded-full bg-blue-700 shadow-[0_0_12px_4px_rgba(37,99,235,0.3)]" />
    </div>
  );
}
