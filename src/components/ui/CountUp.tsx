"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpProps {
  to: number;
  duration?: number;
  className?: string;
}

export default function CountUp({ to, duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: to,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
      onUpdate() {
        el.textContent = Math.round(obj.val).toLocaleString("id-ID");
      },
    });

    return () => {
      tween.kill();
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
