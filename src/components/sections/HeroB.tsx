"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const categories = [
  "Plastik PP", "Plastik PET", "Plastik HDPE",
  "Plastik PVC", "LLDPE", "PS / Styrofoam", "Paper Packaging",
  "OPP", "Oxo-biodegradable",
];

const marqueeItems = [...categories, ...categories, ...categories, ...categories];
const CERTS = ["Food Grade", "Halal", "ISO"];

export default function HeroB() {
  const heroRef      = useRef<HTMLElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);

  const mouse         = useRef({ x: 0, y: 0 });
  const lerped        = useRef({ x: 0, y: 0 });
  const targetRadius  = useRef(0);
  const currentRadius = useRef(0);
  const rafId         = useRef<number>(0);

  /* ── Entrance animation ──
     h1 is intentionally excluded — it renders visible from first paint
     so PageSpeed captures LCP immediately, before GSAP loads.
     CSS animate-fadein-up on the h1 handles the visual entrance without JS. ── */
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-overline", { opacity: 0, y: -12, duration: 0.5 })
        .from(".hero-year",     { opacity: 0, y: -12, duration: 0.5 }, "<")
        .from(".hero-rule",     { scaleX: 0, duration: 0.7, transformOrigin: "left center" }, "-=0.2")
        .from(".hero-sub",      { opacity: 0, y: 16,  duration: 0.6 }, "-=0.4")
        .from(".hero-cta",      { opacity: 0, y: 16,  duration: 0.5 }, "-=0.4")
        .from(".hero-trust",    { opacity: 0, y: 12,  duration: 0.5 }, "-=0.3")
        .from(".hero-strip",    { opacity: 0,          duration: 0.5 }, "-=0.3");
    },
    { scope: heroRef }
  );

  /* ── Title parallax drift — fine pointer + no reduced motion ── */
  useGSAP(
    () => {
      const el = titleRef.current;
      if (!el) return;
      if (navigator.maxTouchPoints > 1) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });

      // Cache rects — updated on scroll/resize, never read per-mousemove
      let heroVisible = false;
      let elCX = 0, elCY = 0;
      const updateCache = () => {
        const heroRect = heroRef.current?.getBoundingClientRect();
        if (heroRect) heroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        const elRect = el.getBoundingClientRect();
        elCX = elRect.left + elRect.width  / 2;
        elCY = elRect.top  + elRect.height / 2;
      };
      updateCache();
      window.addEventListener("scroll", updateCache, { passive: true });
      window.addEventListener("resize", updateCache, { passive: true });

      const onMove   = (e: MouseEvent) => {
        if (!heroVisible) return;
        xTo((e.clientX - elCX) * 0.05);
        yTo((e.clientY - elCY) * 0.04);
      };
      const onLeave  = () => { xTo(0); yTo(0); };
      const onScroll = () => { if (!heroVisible) { xTo(0); yTo(0); } };

      window.addEventListener("mousemove",   onMove);
      window.addEventListener("scroll",      onScroll, { passive: true });
      document.addEventListener("mouseleave", onLeave);
      return () => {
        window.removeEventListener("mousemove",   onMove);
        window.removeEventListener("scroll",      onScroll);
        window.removeEventListener("scroll",      updateCache);
        window.removeEventListener("resize",      updateCache);
        document.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: heroRef }
  );

  /* ── QUALITY masking reveal — fine pointer + no reduced motion ── */
  useEffect(() => {
    const hero       = heroRef.current;
    const textReveal = textRevealRef.current;
    if (!hero || !textReveal) return;

    // Always initialize to radius-0 so the dark overlay text starts hidden.
    // Without this, iPads and touch devices show the unmasked dark text.
    const initMask = "radial-gradient(circle 0px at 50% 50%, black, transparent)";
    textReveal.style.maskImage = initMask;
    textReveal.style.setProperty("-webkit-mask-image", initMask);

    // Only wire up the interactive reveal for non-touch, fine-pointer, no-reduced-motion devices.
    // maxTouchPoints > 1 catches all iOS/Android and DevTools touch simulation.
    if (navigator.maxTouchPoints > 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Cache element position — updated on scroll/resize, never inside RAF
    let rectLeft = 0, rectTop = 0;
    const updateRect = () => {
      const r = textReveal.getBoundingClientRect();
      rectLeft = r.left;
      rectTop  = r.top;
    };
    updateRect();
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });

    const tick = () => {
      lerped.current.x = lerp(lerped.current.x, mouse.current.x, 0.4);
      lerped.current.y = lerp(lerped.current.y, mouse.current.y, 0.4);
      currentRadius.current = lerp(currentRadius.current, targetRadius.current, 0.09);

      const { x, y } = lerped.current;
      const r = Math.max(0, currentRadius.current);
      const mask = `radial-gradient(circle ${r}px at ${x - rectLeft}px ${y - rectTop}px, black 0%, transparent 60%)`;
      textReveal.style.maskImage = mask;
      textReveal.style.setProperty("-webkit-mask-image", mask);

      rafId.current = requestAnimationFrame(tick);
    };

    const onMouseMove  = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (targetRadius.current === 0) {
        lerped.current.x = e.clientX;
        lerped.current.y = e.clientY;
        targetRadius.current = 480;
      }
    };
    const onMouseEnter = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      lerped.current.x = e.clientX;
      lerped.current.y = e.clientY;
      targetRadius.current = 480;
    };
    const onMouseLeave = () => { targetRadius.current = 0; };

    const container = textReveal.parentElement as HTMLElement;

    rafId.current = requestAnimationFrame(tick);
    container.addEventListener("mousemove",  onMouseMove);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
      container.removeEventListener("mousemove",  onMouseMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Hero — Pengenalan Sumber Aneka Plastik dan Kemasan"
      className="relative flex flex-col overflow-hidden px-6 pt-24 min-h-svh md:px-12 md:pt-28 lg:px-16"
    >

      {/* ── Upper content ── */}
      <div className="relative z-10 flex flex-col gap-8">

        {/* Overline + year */}
        <div className="flex items-center justify-between">
          <div className="hero-overline flex items-center gap-3">
            <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Distributor Resmi &amp; Terpercaya
            </span>
          </div>
          <span className="hero-year text-xs font-semibold italic uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Est. 2010
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="hero-title animate-fadein-up will-change-transform font-black leading-[0.9] tracking-tighter text-slate-900 dark:text-slate-50"
          style={{ fontSize: "clamp(2.25rem, 9vw + 0.25rem, 7rem)", animationDuration: "600ms" }}
        >
          Kemasan Yang Bisa
          <br className="hidden sm:block" />
          <span className="text-blue-600"> Anda Andalkan</span>
          <br className="hidden sm:block" />
          <span className="font-bold text-slate-400 dark:text-slate-500">- Sejak 2010.</span>
        </h1>

        {/* Rule + Subtitle + CTAs */}
        <div>
          <div className="hero-rule mb-8 h-px w-full bg-slate-300 dark:bg-slate-700" />
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="hero-sub text-xs leading-relaxed text-slate-600 md:max-w-md md:text-base dark:text-slate-400">
              1.000+ produk <em>food grade</em>, halal, dan bersertifikat <em>ISO</em>.
              <br />
              <em>One Stop Solution</em> Untuk Seluruh Kebutuhan Anda
              <br />
              Dari Yogyakarta, kirim ke seluruh Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* ── Middle zone ── */}
      {/*   Mobile  → trust signal (pills + caption)      */}
      {/*   Desktop → QUALITY ghost text + masking reveal */}
      <div
        aria-hidden="true"
        className="relative flex-1 select-none overflow-hidden"
      >

        {/* Mobile + tablet: decorative geometry */}
        <div className="hero-trust flex items-center justify-center py-12 xl:hidden md:absolute md:inset-0 md:py-0">

          {/* Mobile only — landscape viewBox, natural width */}
          <svg viewBox="0 0 500 300" fill="none" className="w-full max-w-lg opacity-70 dark:opacity-40 md:hidden" aria-hidden="true">
            <g className="geo-b">
              <circle cx="250" cy="150" r="108" stroke="#2563eb" strokeWidth="1" strokeDasharray="5 10" opacity="0.18" />
              <circle cx="250" cy="150" r="76"  stroke="#2563eb" strokeWidth="1.5" opacity="0.22" />
              <circle cx="250" cy="150" r="44"  stroke="#2563eb" strokeWidth="2"   opacity="0.28" />
              <circle cx="250" cy="150" r="12"  fill="#2563eb"   opacity="0.12" />
            </g>
            <g className="geo-a">
              <rect x="42" y="110" width="72" height="95" rx="12" stroke="#3b82f6" strokeWidth="1.5" opacity="0.22" />
              <rect x="57" y="125" width="42" height="65" rx="7"  stroke="#3b82f6" strokeWidth="1"   opacity="0.14" />
            </g>
            <g className="geo-c">
              <polygon points="420,52 452,70 452,108 420,126 388,108 388,70" stroke="#2563eb" strokeWidth="1.5" opacity="0.2" />
              <polygon points="420,70 442,82 442,106 420,118 398,106 398,82" stroke="#2563eb" strokeWidth="1"   opacity="0.12" />
            </g>
            <circle cx="100" cy="56"  r="9"  fill="#2563eb"  opacity="0.1"  className="geo-c" />
            <circle cx="390" cy="240" r="18" stroke="#60a5fa" strokeWidth="1" opacity="0.2"  className="geo-a" />
            <circle cx="155" cy="272" r="22" stroke="#2563eb" strokeWidth="1" strokeDasharray="3 7" opacity="0.16" className="geo-b" />
            <rect   x="422"  y="185" width="32" height="44" rx="6" stroke="#3b82f6" strokeWidth="1" opacity="0.16" className="geo-b" />
            <circle cx="62"  cy="248" r="6"  fill="#3b82f6"  opacity="0.15" className="geo-a" />
          </svg>

          {/* iPad only — square viewBox, centered in flex-1 space */}
          <svg viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet" fill="none" className="hidden w-auto max-h-[45vh] opacity-70 dark:opacity-40 md:block" aria-hidden="true">
            <g className="geo-b">
              <circle cx="250" cy="250" r="130" stroke="#2563eb" strokeWidth="1" strokeDasharray="5 10" opacity="0.18" />
              <circle cx="250" cy="250" r="94"  stroke="#2563eb" strokeWidth="1.5" opacity="0.22" />
              <circle cx="250" cy="250" r="58"  stroke="#2563eb" strokeWidth="2"   opacity="0.28" />
              <circle cx="250" cy="250" r="18"  fill="#2563eb"   opacity="0.12" />
            </g>
            <g className="geo-a">
              <rect x="38" y="185" width="80" height="105" rx="14" stroke="#3b82f6" strokeWidth="1.5" opacity="0.22" />
              <rect x="54" y="201" width="48" height="73"  rx="8"  stroke="#3b82f6" strokeWidth="1"   opacity="0.14" />
            </g>
            <g className="geo-c">
              <polygon points="424,88 460,108 460,150 424,170 388,150 388,108" stroke="#2563eb" strokeWidth="1.5" opacity="0.2" />
              <polygon points="424,108 450,122 450,148 424,162 398,148 398,122" stroke="#2563eb" strokeWidth="1"   opacity="0.12" />
            </g>
            <circle cx="108" cy="80"  r="11" fill="#2563eb"   opacity="0.1"  className="geo-c" />
            <circle cx="408" cy="390" r="22" stroke="#60a5fa" strokeWidth="1" opacity="0.2"  className="geo-a" />
            <circle cx="148" cy="430" r="26" stroke="#2563eb" strokeWidth="1" strokeDasharray="3 7" opacity="0.16" className="geo-b" />
            <rect   x="430" y="300"  width="36" height="50" rx="7" stroke="#3b82f6" strokeWidth="1" opacity="0.16" className="geo-b" />
            <circle cx="58"  cy="370" r="7"  fill="#3b82f6"  opacity="0.15" className="geo-a" />
            <circle cx="460" cy="250" r="10" stroke="#2563eb" strokeWidth="1" opacity="0.18" className="geo-c" />
          </svg>

        </div>

        {/* Large desktop only: ghost QUALITY text */}
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center xl:flex">
          <p
            className="text-center font-black leading-none tracking-tighter text-slate-200 dark:text-slate-800"
            style={{ fontSize: "clamp(3rem, 16vw, 18rem)" }}
          >
            Q U A L I T Y .
          </p>
        </div>

        {/* Large desktop only: masked QUALITY text (spotlight reveal) */}
        <div
          ref={textRevealRef}
          className="pointer-events-none absolute inset-0 hidden items-center justify-center xl:flex"
        >
          <p
            className="text-center font-black leading-none tracking-tighter text-slate-900 dark:text-slate-100"
            style={{ fontSize: "clamp(3rem, 16vw, 18rem)" }}
          >
            Q U A L I T Y .
          </p>
        </div>
      </div>

      {/* ── Marquee strip ── */}
      <div className="hero-strip pb-12 pt-8">
        <div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
        <div className="overflow-hidden py-3.5">
          <div className="flex animate-marquee items-center gap-6 whitespace-nowrap" aria-hidden="true">
            {marqueeItems.flatMap((item, i) => [
              <span
                key={`t${i}`}
                className="text-[10px] font-semibold italic uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400"
              >
                {item}
              </span>,
              <span key={`d${i}`} className="h-1 w-1 shrink-0 rounded-full bg-blue-600/40" />,
            ])}
          </div>
        </div>
        <div className="h-px w-full bg-slate-300 dark:bg-slate-700" />
      </div>

    </section>
  );
}
