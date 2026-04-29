"use client";

import { useEffect } from "react";

export default function GSAPSmoothScroll() {
  useEffect(() => {
    // Only load ScrollSmoother on desktop fine-pointer devices.
    // Mobile gets native scroll — smoothTouch:0 meant it did nothing there anyway,
    // but the plugin (~50KB parsed) was still costing mobile TBT on every page.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let cleanup: (() => void) | undefined;

    import("gsap").then(({ default: gsap }) =>
      Promise.all([
        import("gsap/ScrollTrigger"),
        import("gsap/ScrollSmoother"),
      ]).then(([{ ScrollTrigger }, { ScrollSmoother }]) => {
        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
        const smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.2,
          smoothTouch: 0,
          effects: true,
        });
        cleanup = () => smoother.kill();
      })
    );

    return () => cleanup?.();
  }, []);

  return null;
}
