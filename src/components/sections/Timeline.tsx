"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
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
  const ref         = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pathRef     = useRef<SVGPathElement>(null);
  const pinVisualRefs = useRef<(SVGGElement | null)[]>([]);
  const stRef         = useRef<ScrollTrigger | null>(null);

  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

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

      const total  = milestones.length;
      const root   = ref.current!;
      const panels = gsap.utils.toArray<HTMLElement>(".tl-panel", root);

      // Initial state — panels
      gsap.set(panels.slice(1), { opacity: 0, y: 40 });

      // Initial state — pins 1-4 hidden (autoAlpha avoids any transform conflict)
      pinVisualRefs.current.slice(1).forEach(g => {
        if (g) gsap.set(g, { autoAlpha: 0 });
      });

      // Track which pins have bounced in
      const pinDone = Array(total).fill(false);
      pinDone[0] = true;

      // Main scrubbed timeline (path + panels only — no pin tweens here)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: () => `+=${(total - 1) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          // anticipatePin removed — causes scroll-to-top jump on iPadOS
          invalidateOnRefresh: true,
          onRefresh(self) { stRef.current = self; },
          onUpdate(self) {
            const p = self.progress;
            for (let i = 1; i < total; i++) {
              // Each pin appears at ~80 % through each milestone segment
              const threshold = (i - 0.2) / (total - 1);
              const g = pinVisualRefs.current[i];
              if (!g) continue;

              if (p >= threshold && !pinDone[i]) {
                pinDone[i] = true;
                gsap.fromTo(g,
                  { autoAlpha: 0, y: -18 },
                  { autoAlpha: 1, y: 0, duration: 0.65, ease: "back.out(1.7)", overwrite: true }
                );
              } else if (p < threshold && pinDone[i]) {
                pinDone[i] = false;
                gsap.to(g, { autoAlpha: 0, y: -28, duration: 0.2, ease: "power2.in", overwrite: true });
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

        {/* ── Top bar ── */}
        <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800 md:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
              Perjalanan Kami
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-slate-300 dark:text-slate-600">
              {milestones[0].year} — {milestones[milestones.length - 1].year}
            </span>
            <button
              onClick={handleSkip}
              aria-label="Lewati section Perjalanan Kami"
              className={`flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 backdrop-blur-sm transition-all duration-500 hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-500 ${showSkip ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              Lewati
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* ── Main ── */}
        <div className="relative flex flex-1 flex-col overflow-hidden md:flex-row">

          {/* Left — SVG zigzag (desktop only) */}
          <div className="relative hidden shrink-0 items-center justify-center border-r border-slate-100 dark:border-slate-800 md:flex md:w-[44%]">
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="xMidYMid meet"
              className="h-full w-full p-10"
              aria-hidden="true"
            >
              <defs>
                <filter id="tl-path-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="tl-pin-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ghost path */}
              <path
                d={PATH_D}
                className="stroke-slate-200 dark:stroke-slate-700"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Animated DrawSVG path */}
              <path
                ref={pathRef}
                d={PATH_D}
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#tl-path-glow)"
              />

              {/* Pins — outer <g> handles SVG positioning (never touched by GSAP).
                  Inner <g> is the ref that GSAP animates (autoAlpha + y). */}
              {milestones.map((m, i) => {
                const [x, y] = NODES[i];
                const isLeft  = i % 2 === 0;
                return (
                  <g key={m.year} transform={`translate(${x},${y})`}>

                    {/* Year + tag labels — always visible once outer group renders */}
                    <text
                      x={isLeft ? -24 : 24}
                      y="-28"
                      textAnchor={isLeft ? "end" : "start"}
                      className="fill-slate-600 dark:fill-slate-400"
                      fontSize="13"
                      fontFamily="monospace"
                      letterSpacing="0.06em"
                      fontWeight="700"
                    >
                      {m.year}
                    </text>
                    <text
                      x={isLeft ? -24 : 24}
                      y="-14"
                      textAnchor={isLeft ? "end" : "start"}
                      className="fill-slate-400 dark:fill-slate-500"
                      fontSize="9"
                      fontFamily="monospace"
                      letterSpacing="0.1em"
                    >
                      {m.tag.toUpperCase()}
                    </text>

                    {/* Visual pin — GSAP animates this (bounce drop + autoAlpha) */}
                    <g ref={el => { pinVisualRefs.current[i] = el; }}>
                      {/* Ground shadow */}
                      <ellipse cx="1" cy="4" rx="7" ry="2.5" fill="rgba(37,99,235,0.15)" />
                      {/* Teardrop body */}
                      <path d={PIN_PATH} fill="#2563eb" filter="url(#tl-pin-glow)" />
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
            <div className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex flex-col gap-2 md:hidden" aria-hidden="true">
              {milestones.map((_, i) => (
                <div key={i} className="tl-dot h-1 w-1 rounded-full bg-blue-600 opacity-20" />
              ))}
            </div>

            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`tl-panel absolute inset-0 flex items-center px-8 md:px-14 lg:px-20 ${i > 0 ? "opacity-0" : ""}`}
              >
                <div className="max-w-lg">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="h-px w-6 shrink-0 bg-blue-600" aria-hidden="true" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">{m.tag}</span>
                  </div>
                  <h3 className="mb-5 font-black leading-[1.0] tracking-tight text-slate-900 dark:text-slate-50" style={{ fontSize: "clamp(1.875rem, 4vw + 0.5rem, 4rem)" }}>
                    {m.title}
                  </h3>
                  <p className="text-sm leading-[1.8] text-slate-500 dark:text-slate-400 md:text-[15px]">{m.desc}</p>
                  <div className="mt-8 border-t border-slate-100 pt-6 dark:border-slate-700">
                    <div className="flex items-baseline gap-4">
                      <span className="text-4xl font-black tracking-tight text-blue-600 md:text-5xl">{m.stat.value}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">{m.stat.label}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Progress bar ── */}
        <div className="relative h-[2px] w-full shrink-0 bg-slate-100 dark:bg-slate-800">
          <div
            ref={progressRef}
            className="absolute inset-0 origin-left bg-blue-600"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
