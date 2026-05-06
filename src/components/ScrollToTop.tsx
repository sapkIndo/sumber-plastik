"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    // Start hidden
    gsap.set(btn, { opacity: 0, scale: 0.8, pointerEvents: "none" });

    const show = () =>
      gsap.to(btn, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.4)", pointerEvents: "auto" });
    const hide = () =>
      gsap.to(btn, { opacity: 0, scale: 0.8, duration: 0.2, ease: "power2.in", pointerEvents: "none" });

    ScrollTrigger.create({
      start: "400px top",
      onEnter: show,
      onLeaveBack: hide,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  function handleClick() {
    // ScrollSmoother (desktop) — scroll to top via plugin if available
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { ScrollSmoother } = gsap as any;
      const smoother = ScrollSmoother?.get?.();
      if (smoother) {
        smoother.scrollTo(0, true);
        return;
      }
    } catch {
      // not loaded — fall through
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label="Kembali ke atas"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md transition-[border-color,background-color] duration-150 hover:border-blue-400 hover:bg-blue-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-500 dark:hover:bg-blue-600 dark:text-slate-300"
    >
      <ArrowUp size={18} aria-hidden="true" />
    </button>
  );
}
