"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const products = [
  {
    abbr: "PP",
    name: "Polypropylene",
    desc: "Solusi serbaguna untuk ribuan aplikasi industri, dari kemasan makanan hingga komponen otomotif presisi tinggi.",
    specs: ["Food grade", "Ringan & kuat", "Tahan kimia"],
  },
  {
    abbr: "PE",
    name: "Polyethylene",
    desc: "Fleksibilitas tinggi dengan kualitas konsisten — pilihan utama industri packaging dan distribusi nasional.",
    specs: ["HDPE & LDPE", "Tahan benturan", "Tahan suhu rendah"],
  },
  {
    abbr: "PVC",
    name: "Polyvinyl Chloride",
    desc: "Ketahanan superior untuk konstruksi, infrastruktur, dan aplikasi teknik yang menuntut presisi tinggi.",
    specs: ["Rigid & Flexible", "Tahan cuaca", "Isolasi listrik"],
  },
  {
    abbr: "ABS",
    name: "ABS Plastic",
    desc: "Impact resistance kelas dunia yang dipercaya industri otomotif, elektronik, dan manufaktur global.",
    specs: ["High impact", "Mudah diproses", "Permukaan halus"],
  },
  {
    abbr: "PA",
    name: "Nylon",
    desc: "Performa engineering-grade untuk kondisi paling demanding — panas ekstrem, gesekan berat, dan tekanan tinggi.",
    specs: ["Tahan panas", "Self-lubricating", "Kekuatan tinggi"],
  },
];

// Clockwise: atas → kanan → bawah → kiri
const transitions = [
  { exitX:    0, exitY:  -90, enterX:    0, enterY:   90 },
  { exitX:  120, exitY:    0, enterX: -120, enterY:    0 },
  { exitX:    0, exitY:   90, enterX:    0, enterY:  -90 },
  { exitX: -120, exitY:    0, enterX:  120, enterY:    0 },
];

export default function ProductSpotlight() {
  const ref         = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const total  = products.length;
      const root   = ref.current!;
      const slides = gsap.utils.toArray<HTMLElement>(".ps-slide", root);

      // Set initial position per slide based on its entry direction
      slides.forEach((slide, i) => {
        if (i === 0) return;
        const { enterX, enterY } = transitions[i - 1];
        gsap.set(slide, { x: enterX, y: enterY, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: () => `+=${(total - 1) * window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(progressRef.current, { scaleX: 1, ease: "none", duration: total - 1 }, 0);

      for (let i = 1; i < total; i++) {
        const pos = i - 1;
        const { exitX, exitY } = transitions[i - 1];
        tl
          .to(slides[i - 1], { x: exitX, y: exitY, opacity: 0, ease: "none", duration: 0.4 }, pos)
          .to(slides[i],     { x: 0, y: 0, opacity: 1, ease: "none", duration: 0.4 }, pos + 0.55);
      }
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-label="Material unggulan Sumber Plastik">
      <div
        ref={stickyRef}
        className="relative flex h-screen w-full flex-col overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 60% 50%, #0f172a 0%, #020617 100%)",
        }}
      >
        {/* ── Top bar ── */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.05] px-6 py-5 md:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-6 bg-blue-400" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/30">
              Material Unggulan
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/20">
            {products.length} Kategori Produk
          </span>
        </div>

        {/* ── Slides ── */}
        <div className="relative flex flex-1 overflow-hidden">
          {products.map((p, i) => (
            <div
              key={p.abbr}
              className={`ps-slide absolute inset-0 flex flex-col justify-center overflow-hidden px-8 md:pl-20 lg:pl-28 ${i > 0 ? "opacity-0" : ""}`}
            >
              {/* Watermark abbr */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-black leading-none tracking-tighter text-white"
                style={{ fontSize: "clamp(12rem, 38vw, 52rem)", opacity: 0.045 }}
              >
                {p.abbr}
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-xl">

                {/* Overline */}
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-px w-6 shrink-0 bg-blue-400" aria-hidden="true" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue-400">
                    {p.abbr}
                  </span>
                </div>

                {/* Name */}
                <h3
                  className="mb-6 font-black leading-[1.0] tracking-tight text-white"
                  style={{ fontSize: "clamp(2.8rem, 7vw, 8rem)" }}
                >
                  {p.name}
                </h3>

                {/* Description */}
                <p className="mb-10 max-w-md text-sm leading-[1.85] text-white/40 md:text-[15px]">
                  {p.desc}
                </p>

                {/* Specs */}
                <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-white/25">
                  {p.specs.join("  ·  ")}
                </p>

              </div>
            </div>
          ))}
        </div>

        {/* ── Progress bar ── */}
        <div className="relative h-px w-full shrink-0 bg-white/[0.05]">
          <div
            ref={progressRef}
            className="absolute inset-0 origin-left bg-blue-500"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}
