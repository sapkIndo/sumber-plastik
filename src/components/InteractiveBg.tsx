"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function InteractiveBg() {
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const refs = [r1, r2, r3, r4];
    const cfg = [
      { x: 0.055, y: 0.04,  dur: 2.2 },
      { x: -0.04, y: -0.032, dur: 2.8 },
      { x: 0.028, y: 0.05,  dur: 3.4 },
      { x: -0.022, y: 0.038, dur: 1.8 },
    ];

    const xTos = refs.map((ref, i) =>
      gsap.quickTo(ref.current, "x", { duration: cfg[i].dur, ease: "power3.out" })
    );
    const yTos = refs.map((ref, i) =>
      gsap.quickTo(ref.current, "y", { duration: cfg[i].dur, ease: "power3.out" })
    );

    const onMove = (e: MouseEvent) => {
      const cx = e.clientX - window.innerWidth / 2;
      const cy = e.clientY - window.innerHeight / 2;
      cfg.forEach(({ x, y }, i) => { xTos[i](cx * x); yTos[i](cy * y); });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Blob 1 — large blue, top-left */}
      <div className="absolute -left-48 -top-48 blob-drift-1">
        <div ref={r1}>
          <div className="h-[780px] w-[780px] rounded-full bg-blue-400/[0.22] blur-[140px]" />
        </div>
      </div>

      {/* Blob 2 — sky/cyan, top-right */}
      <div className="absolute -right-72 top-12 blob-drift-2">
        <div ref={r2}>
          <div className="h-[620px] w-[620px] rounded-full bg-sky-300/[0.18] blur-[110px]" />
        </div>
      </div>

      {/* Blob 3 — indigo, bottom-center */}
      <div className="absolute -bottom-32 left-[30%] blob-drift-3">
        <div ref={r3}>
          <div className="h-[680px] w-[680px] rounded-full bg-indigo-300/[0.16] blur-[130px]" />
        </div>
      </div>

      {/* Blob 4 — small bright blue, mid-right */}
      <div className="absolute right-[22%] top-[42%] blob-drift-4">
        <div ref={r4}>
          <div className="h-[380px] w-[380px] rounded-full bg-blue-300/[0.14] blur-[90px]" />
        </div>
      </div>
    </div>
  );
}
