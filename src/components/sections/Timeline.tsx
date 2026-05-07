"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronsDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const milestones = [
  {
    year: "2010",
    tag: "Fondasi",
    title: "Lahirnya Aneka Botol",
    desc: "Berawal dari sebuah toko sederhana di Yogyakarta, Aneka Botol hadir dengan satu tekad: menyediakan botol dan kemasan berkualitas yang mudah dijangkau oleh semua kalangan.",
    stat: { value: "2010", label: "Tahun berdiri di Jogja" },
  },
  {
    year: "2014",
    tag: "Pertumbuhan",
    title: "Memperluas Ragam Produk",
    desc: "Menjawab kebutuhan pelanggan yang terus berkembang, kami mulai menghadirkan lebih banyak pilihan kemasan — dari berbagai jenis botol plastik hingga beragam wadah untuk kebutuhan industri.",
    stat: { value: "100+", label: "Jenis produk baru" },
  },
  {
    year: "2018",
    tag: "Kepercayaan",
    title: "Fondasi yang Semakin Kokoh",
    desc: "Dengan pelayanan konsisten dan kualitas yang terjaga, kepercayaan pelanggan terus tumbuh. Kami pun memperkuat kapasitas operasional untuk melayani lebih banyak mitra bisnis.",
    stat: { value: "1000+", label: "Pelanggan setia" },
  },
  {
    year: "2022",
    tag: "Rebranding",
    title: "Menjadi Sumber Aneka Botol",
    desc: "Setelah lebih dari satu dekade melayani, kami resmi berganti nama menjadi Sumber Aneka Botol — mencerminkan identitas yang lebih kuat dan komitmen yang tak pernah goyah.",
    stat: { value: "12+", label: "Tahun pengalaman" },
  },
  {
    year: "2026",
    tag: "Transformasi",
    title: "Sumber Aneka Plastik dan Kemasan",
    desc: "Berkembang melampaui botol, kini kami hadir sebagai Sumber Aneka Plastik dan Kemasan — melayani kebutuhan kemasan menyeluruh dengan platform digital dan lebih dari 5000 client setia.",
    stat: { value: "5000+", label: "Client setia hari ini" },
  },
];

const VB_W = 280;
const VB_H = 600;

const NODES: [number, number][] = [
  [72,  75],
  [208, 195],
  [72,  315],
  [208, 435],
  [72,  555],
];

const PATH_D = NODES.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x},${y}`).join(" ");

// Teardrop/map-pin: tip at (0,0), circle centre at (0,−27)
const PIN_PATH = "M 0,0 C 12,-4 14,-15 14,-27 A 14,14 0 1,0 -14,-27 C -14,-15 -12,-4 0,0 Z";

export default function Timeline() {
  const ref           = useRef<HTMLElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const progressRef   = useRef<HTMLDivElement>(null);
  const pathRef       = useRef<SVGPathElement>(null);
  const pinVisualRefs = useRef<(SVGGElement | null)[]>([]);
  const stRef         = useRef<ScrollTrigger | null>(null);
  const skipBtnRef    = useRef<HTMLButtonElement>(null);
  const skipIconRef   = useRef<SVGSVGElement>(null);

  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const btn  = skipBtnRef.current;
    const icon = skipIconRef.current;
    if (!btn || !showSkip) return;

    gsap.fromTo(
      btn,
      { opacity: 0, x: 14, scale: 0.88 },
      { opacity: 1, x: 0, scale: 1, duration: 0.55, ease: "back.out(1.6)", clearProps: "scale" }
    );

    if (icon) {
      const tween = gsap.to(icon, {
        y: 3, repeat: -1, yoyo: true, duration: 0.55, ease: "power1.inOut", delay: 0.7,
      });
      return () => { tween.kill(); };
    }
  }, [showSkip]);

  const handleSkip = () => {
    const st = stRef.current;
    if (!st) return;
    window.scrollTo({ top: st.end + window.innerHeight });
  };

  useGSAP(
    () => {
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

      if (isIOS) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ScrollTrigger.config as any)({ pinType: "transform", ignoreMobileResize: true });
      }

      // ── Blob drift ─────────────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>(".tl-blob").forEach((blob, i) => {
        gsap.to(blob, {
          x: "random(-45, 45)",
          y: "random(-28, 28)",
          scale: "random(0.88, 1.14)",
          duration: "random(9, 15)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 2.8,
        });
      });

      const total  = milestones.length;
      const root   = ref.current!;
      const panels = gsap.utils.toArray<HTMLElement>(".tl-panel", root);

      gsap.set(panels.slice(1), { opacity: 0, y: 40 });

      pinVisualRefs.current.slice(1).forEach(g => {
        if (g) gsap.set(g, { autoAlpha: 0 });
      });

      const pinDone = Array(total).fill(false);
      pinDone[0] = true;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: () => `+=${(total - 1) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onRefresh(self) { stRef.current = self; },
          onUpdate(self) {
            const p = self.progress;
            for (let i = 1; i < total; i++) {
              const threshold = (i - 0.2) / (total - 1);
              const g = pinVisualRefs.current[i];
              if (!g) continue;
              if (p >= threshold && !pinDone[i]) {
                pinDone[i] = true;
                gsap.fromTo(g,
                  { autoAlpha: 0, y: -18, scale: 0.6 },
                  { autoAlpha: 1, y: 0, scale: 1, duration: 0.65, ease: "back.out(1.9)", overwrite: true }
                );
              } else if (p < threshold && pinDone[i]) {
                pinDone[i] = false;
                gsap.to(g, { autoAlpha: 0, y: -24, scale: 0.7, duration: 0.2, ease: "power2.in", overwrite: true });
              }
            }
          },
        },
      });

      if (tl.scrollTrigger) stRef.current = tl.scrollTrigger;

      tl.from(pathRef.current, { drawSVG: "0%", ease: "none", duration: total - 1 }, 0);
      tl.to(progressRef.current, { scaleX: 1, ease: "none", duration: total - 1 }, 0);

      for (let i = 1; i < total; i++) {
        const pos = i - 1;
        tl
          .to(panels[i - 1], { opacity: 0, y: -40, ease: "none", duration: 0.4 }, pos)
          .to(panels[i],     { opacity: 1, y: 0,   ease: "none", duration: 0.4 }, pos + 0.55);
      }
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-labelledby="timeline-heading">
      <h2 id="timeline-heading" className="sr-only">Perjalanan Kami</h2>

      <div
        ref={stickyRef}
        className="relative flex h-[100svh] w-full flex-col overflow-hidden bg-[#f0f6ff] dark:bg-slate-900"
      >

        {/* ── Animated blobs ────────────────────────────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="tl-blob absolute -right-40 -top-16 h-[680px] w-[680px] rounded-full bg-blue-400/12 blur-[130px] dark:bg-blue-500/7" />
          <div className="tl-blob absolute -bottom-20 left-[5%] h-[560px] w-[560px] rounded-full bg-sky-300/14 blur-[110px] dark:bg-sky-400/7" />
          <div className="tl-blob absolute left-[32%] top-[25%] h-[440px] w-[440px] rounded-full bg-indigo-300/10 blur-[90px] dark:bg-indigo-400/6" />
        </div>

        {/* ── Top bar ───────────────────────────────────────────────────────── */}
        <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-slate-100/80 px-6 py-5 dark:border-slate-800 md:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
              Perjalanan Kami
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.15em] text-slate-300 dark:text-slate-600 md:block">
              {milestones[0].year} — {milestones[milestones.length - 1].year}
            </span>
            <button
              ref={skipBtnRef}
              onClick={handleSkip}
              aria-label="Lewati section Perjalanan Kami"
              style={{ opacity: 0, pointerEvents: showSkip ? "auto" : "none" }}
              className="group flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 backdrop-blur-sm transition-colors duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-500 dark:hover:border-blue-600 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
            >
              Lewati
              <ChevronsDown
                ref={skipIconRef}
                className="h-3.5 w-3.5 transition-colors duration-200 group-hover:text-blue-500"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* ── Main ──────────────────────────────────────────────────────────── */}
        <div className="relative flex flex-1 flex-col overflow-hidden md:flex-row">

          {/* Left — SVG zigzag (desktop) */}
          <div className="relative hidden shrink-0 items-center justify-center border-r border-slate-200/50 dark:border-slate-800 md:flex md:w-[42%]">

            {/* Subtle dot grid */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-40" aria-hidden="true">
              <defs>
                <pattern id="tl-dotgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                  <circle cx="1" cy="1" r="1" fill="rgba(37,99,235,0.12)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tl-dotgrid)" />
            </svg>

            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="relative h-full w-full p-10"
              aria-hidden="true"
            >
              <defs>
                <filter id="tl-path-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="tl-pin-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="tl-line-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="tl-pin-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>

              {/* Ghost path */}
              <path
                d={PATH_D}
                stroke="rgba(203,213,225,0.7)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Animated DrawSVG path */}
              <path
                ref={pathRef}
                d={PATH_D}
                stroke="url(#tl-line-grad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#tl-path-glow)"
              />

              {/* Pins */}
              {milestones.map((m, i) => {
                const [x, y] = NODES[i];
                const isLeft = i % 2 === 0;
                return (
                  <g key={m.year} transform={`translate(${x},${y})`}>

                    {/* Year label */}
                    <text
                      x={isLeft ? -28 : 28}
                      y="-22"
                      textAnchor={isLeft ? "end" : "start"}
                      fontSize="14"
                      fontFamily="monospace"
                      fontWeight="800"
                      letterSpacing="-0.02em"
                      fill="#2563eb"
                    >
                      {m.year}
                    </text>

                    {/* Tag label */}
                    <text
                      x={isLeft ? -28 : 28}
                      y="-7"
                      textAnchor={isLeft ? "end" : "start"}
                      fontSize="8.5"
                      fontFamily="monospace"
                      letterSpacing="0.1em"
                      fill="rgba(148,163,184,0.9)"
                    >
                      {m.tag.toUpperCase()}
                    </text>

                    {/* Short connector tick */}
                    <line
                      x1={isLeft ? -6 : 6} y1="-13"
                      x2={isLeft ? -20 : 20} y2="-13"
                      stroke="#2563eb" strokeWidth="1" opacity="0.25"
                    />

                    {/* Pin visual — GSAP ref (autoAlpha + scale bounce) */}
                    <g ref={el => { pinVisualRefs.current[i] = el; }}>
                      {/* Ground shadow */}
                      <ellipse cx="1" cy="4" rx="8" ry="3" fill="rgba(37,99,235,0.18)" />
                      {/* Teardrop body with gradient */}
                      <path d={PIN_PATH} fill="url(#tl-pin-grad)" filter="url(#tl-pin-glow)" />
                      {/* Inner white dot */}
                      <circle cx="0" cy="-27" r="4.5" fill="white" />
                    </g>

                  </g>
                );
              })}
            </svg>
          </div>

          {/* Right — content panels */}
          <div className="relative flex-1 overflow-hidden">

            {/* Mobile dot indicator */}
            <div className="absolute left-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 md:hidden" aria-hidden="true">
              {milestones.map((_, i) => (
                <div key={i} className="tl-dot h-1.5 w-1.5 rounded-full bg-blue-600 opacity-20" />
              ))}
            </div>

            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`tl-panel absolute inset-0 flex items-center px-10 md:px-14 lg:px-20 ${i > 0 ? "opacity-0" : ""}`}
              >
                {/* Ghost year watermark */}
                <div
                  className="pointer-events-none absolute -bottom-4 right-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <span
                    className="select-none font-black leading-none text-blue-600/[0.07] dark:text-blue-400/[0.06]"
                    style={{ fontSize: "clamp(7rem, 22vw, 21rem)", letterSpacing: "-0.06em", lineHeight: 0.82 }}
                  >
                    {m.year}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-xl">

                  {/* Tag pill + year */}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600 dark:border-blue-800/50 dark:bg-blue-950/40 dark:text-blue-400">
                      {m.tag}
                    </span>
                    <span className="font-mono text-xs font-bold tabular-nums text-slate-300 dark:text-slate-600">
                      {m.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="mb-5 font-black leading-[1.0] tracking-tight text-slate-900 dark:text-slate-50"
                    style={{ fontSize: "clamp(2rem, 4vw + 0.5rem, 4.5rem)" }}
                  >
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-10 text-sm leading-[1.85] text-slate-500 dark:text-slate-400 md:text-[15px]">
                    {m.desc}
                  </p>

                  {/* Stat */}
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-black tabular-nums tracking-tight text-blue-600"
                      style={{ fontSize: "clamp(3rem, 5.5vw, 5.5rem)" }}
                    >
                      {m.stat.value}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                      {m.stat.label}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Progress bar ──────────────────────────────────────────────────── */}
        <div className="relative h-[2px] w-full shrink-0 bg-slate-200/60 dark:bg-slate-800">
          <div
            ref={progressRef}
            className="absolute inset-0 origin-left bg-gradient-to-r from-blue-500 to-indigo-500"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

      </div>
    </section>
  );
}
