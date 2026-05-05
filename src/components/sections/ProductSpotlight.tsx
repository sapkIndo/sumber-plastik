"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const EN_SPECS = new Set([
  "Food Grade", "Food Grade BPOM", "Recyclable", "Crystal Clear",
  "Chemical Resistant", "Waterproof", "Rigid & Flexible",
  "Stretch Film", "Tear Resistant", "Food Safe",
  "Eco Friendly", "Biodegradable", "Custom Print",
]);

const CX = 130;
const CY = 130;
const RADII   = [50, 68, 86, 104];
const COLORS  = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];
const N_RINGS = 4;

const products = [
  {
    abbr: "PP",
    name: "Polypropylene",
    tagline: "Serbaguna & tersertifikasi food-grade",
    desc: "Pilihan utama kemasan makanan dan minuman. Ringan, tahan panas hingga 130 °C, dan tersertifikasi BPOM — cocok untuk cup, toples, tray, hingga kemasan industri skala besar.",
    specs: ["Food Grade BPOM", "Tahan 130 °C", "Recyclable"],
    industries: "Makanan  ·  Minuman  ·  Farmasi  ·  Kosmetik",
    props: [
      { label: "Kekuatan",      value: 92 },
      { label: "Fleksibilitas", value: 55 },
      { label: "Tahan Panas",   value: 78 },
      { label: "Food Safety",   value: 95 },
    ],
  },
  {
    abbr: "PET",
    name: "PET",
    tagline: "Kemasan transparan premium untuk produk F&B",
    desc: "Botol minuman, kemasan makanan jernih kristal, dan Cup gelas. Ringan namun kuat, 100% recyclable, dan tersertifikasi food-grade — standar industri F&B global.",
    specs: ["Crystal Clear", "Food Grade", "Recyclable"],
    industries: "Minuman  ·  Makanan  ·  Farmasi  ·  Kosmetik",
    props: [
      { label: "Kekuatan",      value: 90 },
      { label: "Fleksibilitas", value: 50 },
      { label: "Tahan Panas",   value: 40 },
      { label: "Food Safety",   value: 93 },
    ],
  },
  {
    abbr: "HDPE",
    name: "HDPE",
    tagline: "Kemasan rigid & distribusi produk skala besar",
    desc: "Jerigen, botol agro, drum plastik, kantong belanja tebal, dan botol detergen. Kekuatan struktural tinggi, tahan bahan kimia, dan food-safe — pilihan utama distribusi FMCG.",
    specs: ["Food Grade", "Chemical Resistant", "Waterproof"],
    industries: "Distribusi  ·  FMCG  ·  Kimia  ·  Konstruksi",
    props: [
      { label: "Kekuatan",      value: 92 },
      { label: "Fleksibilitas", value: 42 },
      { label: "Tahan Panas",   value: 55 },
      { label: "Food Safety",   value: 80 },
    ],
  },
  {
    abbr: "PVC",
    name: "Polyvinyl Chloride",
    tagline: "Rigid atau fleksibel — satu material, dua karakter",
    desc: "Hadir dalam varian rigid untuk pipa dan kemasan blister farmasi, serta flexible untuk selang dan film pembungkus. Tahan korosi dan cuaca ekstrem tanpa degradasi.",
    specs: ["Rigid & Flexible", "Tahan Korosi", "Isolasi Listrik"],
    industries: "Farmasi  ·  Konstruksi  ·  Retail  ·  Medis",
    props: [
      { label: "Kekuatan",      value: 95 },
      { label: "Fleksibilitas", value: 65 },
      { label: "Tahan Panas",   value: 60 },
      { label: "Food Safety",   value: 40 },
    ],
  },
  {
    abbr: "LLDPE",
    name: "LLDPE",
    tagline: "Film & wrapping serba guna untuk kemasan modern",
    desc: "Stretch film, kantong plastik Es Crystal, food wrap, dan kemasan fleksibel. Kekuatan sobek tinggi dengan ketebalan lebih tipis. Ideal untuk packaging otomatis skala besar.",
    specs: ["Stretch Film", "Tear Resistant", "Food Safe"],
    industries: "Logistik  ·  FMCG  ·  Retail  ·  Cold Chain",
    props: [
      { label: "Kekuatan",      value: 95 },
      { label: "Fleksibilitas", value: 95 },
      { label: "Tahan Panas",   value: 38 },
      { label: "Food Safety",   value: 85 },
    ],
  },
  {
    abbr: "PS",
    name: "Polystyrene",
    tagline: "Insulasi termal terbaik untuk kemasan produk segar",
    desc: "Wadah makanan styrofoam, baki buah & sayur, cup minuman, dan kemasan produk segar. Insulasi panas dan dingin yang sangat baik, ringan, dan mudah dibentuk.",
    specs: ["Insulasi Termal", "Food Grade", "Ringan"],
    industries: "F&B  ·  Supermarket  ·  Ekspedisi  ·  Hortikultura",
    props: [
      { label: "Kekuatan",      value: 90 },
      { label: "Fleksibilitas", value: 25 },
      { label: "Tahan Panas",   value: 35 },
      { label: "Food Safety",   value: 75 },
    ],
  },
  {
    abbr: "Paper",
    name: "Paper Packaging",
    tagline: "Kemasan ramah lingkungan berbasis kertas",
    desc: "Kardus, paper bag, kraft paper, cup gelas, dan kemasan eco-friendly. Solusi sustainable yang semakin diminati pasar modern. Tersedia dalam berbagai ketebalan, gramasi, dan finishing.",
    specs: ["Eco Friendly", "Biodegradable", "Custom Print"],
    industries: "Retail  ·  F&B  ·  E-commerce  ·  Gift",
    props: [
      { label: "Kekuatan",      value: 75 },
      { label: "Fleksibilitas", value: 60 },
      { label: "Tahan Panas",   value: 30 },
      { label: "Food Safety",   value: 88 },
    ],
  },
  {
    abbr: "OPP",
    name: "OPP",
    tagline: "Film transparan glossy untuk kemasan premium",
    desc: "Oriented Polypropylene — film plastik transparan dengan kilap tinggi dan permukaan halus. Ideal untuk kemasan snack, confectionery, label botol, dan wrapping produk retail. Barrier yang baik terhadap uap air dan aroma.",
    specs: ["Crystal Clear", "Food Grade", "Kilap Tinggi"],
    industries: "Snack  ·  Confectionery  ·  Retail  ·  Farmasi",
    props: [
      { label: "Kejernihan",    value: 96 },
      { label: "Fleksibilitas", value: 82 },
      { label: "Tahan Uap Air", value: 80 },
      { label: "Food Safety",   value: 90 },
    ],
  },
  {
    abbr: "Oxo-Bio",
    name: "Oxo-Biodegradable",
    tagline: "Plastik ramah lingkungan yang terurai lebih cepat",
    desc: "Kantong plastik dengan aditif oxo-degradable yang mempercepat penguraian di lingkungan terbuka. Alternatif eco-friendly untuk kantong belanja dan kemasan ritel. Memenuhi standar degradabilitas internasional.",
    specs: ["Eco Friendly", "Biodegradable", "Dapat Terurai"],
    industries: "Retail  ·  Supermarket  ·  E-commerce  ·  FMCG",
    props: [
      { label: "Daya Urai",     value: 88 },
      { label: "Kekuatan",      value: 72 },
      { label: "Fleksibilitas", value: 85 },
      { label: "Food Safety",   value: 78 },
    ],
  },
  {
    abbr: "Custom",
    name: "Custom Packaging",
    tagline: "Kemasan sesuai ukuran & spesifikasi Anda",
    desc: "Seluruh lini produk tersedia dalam ukuran, ketebalan, dan warna sesuai permintaan. Cocok untuk brand yang ingin tampil eksklusif dengan kemasan unik. MOQ berlaku untuk spesifikasi non-standar — hubungi tim kami untuk konsultasi.",
    specs: ["MOQ Fleksibel", "Custom Ukuran", "Custom Warna"],
    industries: "F&B  ·  Retail  ·  FMCG  ·  Kosmetik",
    props: [
      { label: "Fleksibilitas",  value: 95 },
      { label: "Pilihan Ukuran", value: 90 },
      { label: "Pilihan Warna",  value: 88 },
      { label: "Food Safety",    value: 85 },
    ],
  },
  {
    abbr: "Sablon",
    name: "Sablon Premium",
    tagline: "Cetak logo & branding langsung di kemasan",
    desc: "Layanan cetak sablon untuk seluruh lini produk kemasan kami. Logo, merek, dan desain Anda dicetak langsung di permukaan kemasan dengan warna tajam dan tahan lama. Tersedia berbagai teknik cetak sesuai jenis material.",
    specs: ["Custom Print", "Multi Warna", "Tahan Luntur"],
    industries: "F&B  ·  Retail  ·  FMCG  ·  E-commerce",
    props: [
      { label: "Kualitas Cetak", value: 92 },
      { label: "Tahan Luntur",   value: 88 },
      { label: "Pilihan Warna",  value: 90 },
      { label: "Fleksibilitas",  value: 95 },
    ],
  },
];

export default function ProductSpotlight() {
  const ref        = useRef<HTMLElement>(null);
  const stickyRef  = useRef<HTMLDivElement>(null);
  const progRef    = useRef<SVGLineElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringRefs  = useRef<(SVGCircleElement | null)[]>([]);
  const stRef     = useRef<ScrollTrigger | null>(null);

  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSkip(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    const st = stRef.current;
    if (!st) return;
    window.scrollTo({ top: st.end + window.innerHeight });
  };

  useGSAP(() => {
    // On iOS/iPadOS, default pin uses position:fixed which conflicts with
    // native scroll momentum → jump-to-top. pinType:"transform" uses
    // translateY instead. normalizeScroll is intentionally excluded: it
    // intercepts scroll events globally and breaks desktop on touch laptops.
    // MacIntel + maxTouchPoints > 1 catches iPadOS 13+ (reports as Mac).
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    if (isIOS) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (ScrollTrigger.config as any)({ pinType: "transform", ignoreMobileResize: true });
    }

    const total = products.length;

    // Stores running slideIn timelines so slideOut can kill them before fading out
    const inTL: (gsap.core.Timeline | null)[] = Array(total).fill(null);

    // ── Shared helpers ────────────────────────────────────────────────────────
    function q<T extends Element>(el: HTMLDivElement, sel: string) {
      return el.querySelector<T>(sel);
    }
    function qa<T extends Element>(el: HTMLDivElement, sel: string) {
      return el.querySelectorAll<T>(sel);
    }

    function initSlide(i: number) {
      const s = slideRefs.current[i];
      if (!s) return;
      gsap.set(s, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 1.03, overwrite: true });
      gsap.set(q(s, ".ps-overline"),  { opacity: 0, y: 12, overwrite: true });
      gsap.set(q(s, ".ps-tagline"),   { opacity: 0, y: 8,  overwrite: true });
      gsap.set(q(s, ".ps-name"),      { opacity: 0, y: 32, overwrite: true });
      gsap.set(q(s, ".ps-desc"),      { opacity: 0, y: 20, overwrite: true });
      gsap.set(q(s, ".ps-industries"),{ opacity: 0,         overwrite: true });
      gsap.set(qa(s, ".ps-spec"),     { opacity: 0, y: 14, scale: 0.8, overwrite: true });
      gsap.set(qa(s, ".ps-legend"),   { opacity: 0, x: -8, overwrite: true });
      for (let j = 0; j < N_RINGS; j++) {
        const ring = ringRefs.current[i * N_RINGS + j];
        if (ring) gsap.set(ring, { drawSVG: "0%", overwrite: true });
      }
    }

    function slideIn(i: number) {
      const s = slideRefs.current[i];
      if (!s) return;
      const tl = gsap.timeline();
      inTL[i] = tl;

      tl.to(s, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 0);

      for (let j = 0; j < N_RINGS; j++) {
        const ring = ringRefs.current[i * N_RINGS + j];
        const pct  = products[i].props[j].value;
        if (ring)
          tl.to(ring, { drawSVG: `0% ${pct}%`, duration: 1.1, ease: "circ.out" }, 0.1 + j * 0.07);
      }

      tl.to(qa(s, ".ps-legend"),   { opacity: 1, x: 0,  duration: 0.45, stagger: 0.07, ease: "power2.out" }, 0.35);
      tl.to(q(s, ".ps-overline"),  { opacity: 1, y: 0,  duration: 0.4,  ease: "power2.out" }, 0.14);
      tl.to(q(s, ".ps-name"),      { opacity: 1, y: 0,  duration: 0.65, ease: "power3.out" }, 0.22);
      tl.to(q(s, ".ps-tagline"),   { opacity: 1, y: 0,  duration: 0.4,  ease: "power2.out" }, 0.32);
      tl.to(q(s, ".ps-desc"),      { opacity: 1, y: 0,  duration: 0.5,  ease: "power2.out" }, 0.38);
      tl.to(q(s, ".ps-industries"),{ opacity: 1,         duration: 0.4,  ease: "power1.out" }, 0.5);
      tl.to(qa(s, ".ps-spec"), {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, stagger: 0.09,
        ease: "back.out(1.5)",
      }, 0.54);
    }

    function slideOut(i: number) {
      const s = slideRefs.current[i];
      if (!s) return;
      // Kill the in-progress slideIn timeline so it can't fight the fade-out
      if (inTL[i]) { inTL[i]!.kill(); inTL[i] = null; }
      for (let j = 0; j < N_RINGS; j++) {
        const ring = ringRefs.current[i * N_RINGS + j];
        if (ring) gsap.to(ring, { drawSVG: "0%", duration: 0.28, ease: "power2.in", overwrite: true });
      }
      gsap.to(s, { opacity: 0, scale: 0.97, duration: 0.32, ease: "power2.in", overwrite: true });
    }

    // ── Shared ScrollTrigger factory (desktop vs mobile differ only by snap) ──
    function buildScrollTrigger(withSnap: boolean) {
      let current = 0;
      let pendingIn: gsap.core.Tween | null = null;

      for (let i = 0; i < total; i++) initSlide(i);
      slideIn(0);

      if (counterRef.current)
        counterRef.current.textContent = `01 / ${String(total).padStart(2, "0")}`;

      gsap.set(progRef.current, { drawSVG: "0%" });
      gsap.to(progRef.current, {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: stickyRef.current,
          start: "top top",
          end: () => `+=${(total - 1) * window.innerHeight}`,
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      function goTo(next: number) {
        if (next === current) return;
        if (pendingIn) pendingIn.kill();
        slideOut(current);
        current = next;
        if (counterRef.current)
          counterRef.current.textContent =
            `${String(next + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
        initSlide(next);
        pendingIn = gsap.delayedCall(0.22, () => slideIn(next));
      }

      stRef.current = ScrollTrigger.create({
        trigger: stickyRef.current,
        start: "top top",
        end: () => `+=${(total - 1) * window.innerHeight}`,
        pin: true,
        invalidateOnRefresh: true,
        snap: withSnap ? {
          snapTo: 1 / (total - 1),
          duration: { min: 0.3, max: 0.7 },
          delay: 0.05,
          ease: "power1.inOut",
        } : undefined,
        onUpdate(self) {
          const idx = Math.round(self.progress * (total - 1));
          if (idx !== current) goTo(idx);
        },
      });

      return () => {
        if (pendingIn) pendingIn.kill();
      };
    }

    const mm = gsap.matchMedia();

    // Only xl desktops get snap — all iPads (including Pro 12.9" at 1024px)
    // are excluded because snap conflicts with iPadOS touch momentum.
    mm.add("(min-width: 1280px)", () => buildScrollTrigger(true));
    mm.add("(max-width: 1279px)", () => buildScrollTrigger(false));
  }, { scope: ref });

  useEffect(() => {
    const timer = setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref} aria-labelledby="spotlight-heading">
      <div
        ref={stickyRef}
        className="relative flex h-svh w-full flex-col overflow-hidden bg-[#f0f6ff] dark:bg-slate-900"
      >
        {/* header bar */}
        <div className="relative z-10 flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-slate-800 md:px-12">
          <div className="flex items-center gap-3">
            <span className="h-px w-5 bg-blue-600" aria-hidden="true" />
            <h2 id="spotlight-heading" className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
              Material Unggulan
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span ref={counterRef} className="font-mono text-[11px] tabular-nums text-slate-400 dark:text-slate-500" />
            <button
              onClick={handleSkip}
              aria-label="Lewati section Material Unggulan"
              className={`flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400 backdrop-blur-sm transition-all duration-500 hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-500 ${showSkip ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
              Lewati
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* slides */}
        <div className="relative flex flex-1 overflow-hidden">
          {products.map((p, i) => (
            <div
              key={p.abbr}
              ref={(el) => { slideRefs.current[i] = el; }}
              className="absolute inset-0 flex flex-col justify-center gap-5 px-6 py-4 md:flex-row md:items-center md:gap-10 md:px-12 lg:px-16"
            >
              {/* text column */}
              <div className="flex flex-col md:w-[55%]">
                <div className="ps-overline mb-4 flex items-center gap-3">
                  <span className="h-px w-5 shrink-0 bg-blue-600" aria-hidden="true" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-blue-600">
                    {p.abbr}
                  </span>
                </div>

                <h3
                  className="ps-name mb-2 font-black leading-none tracking-tight text-slate-900 dark:text-slate-50"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 5.5rem)" }}
                >
                  {p.name}
                </h3>

                <p className="ps-tagline mb-4 text-sm font-medium text-blue-600 md:text-base">
                  {p.tagline}
                </p>

                <p className="ps-desc mb-4 text-sm leading-[1.8] text-slate-500 dark:text-slate-400 md:text-[15px]">
                  {p.desc}
                </p>

                <p className="ps-industries mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                  {p.industries}
                </p>

                <ul className="flex flex-wrap gap-2" role="list">
                  {p.specs.map((spec) => (
                    <li
                      key={spec}
                      className="ps-spec rounded-full border border-blue-200 bg-blue-50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-blue-600 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
                    >
                      {EN_SPECS.has(spec) ? <em>{spec}</em> : spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* chart column */}
              <div className="flex shrink-0 flex-col items-center gap-3 md:w-[45%] md:gap-4">
                <svg
                  className="h-40 w-40 shrink-0 md:h-64 md:w-64 lg:h-72 lg:w-72"
                  viewBox="0 0 260 260"
                  aria-hidden="true"
                >
                  <g transform={`rotate(-90, ${CX}, ${CY})`}>
                    {p.props.map((prop, j) => (
                      <g key={prop.label}>
                        <circle
                          cx={CX} cy={CY} r={RADII[j]}
                          fill="none" stroke={COLORS[j]} strokeWidth="3" opacity="0.1"
                        />
                        <circle
                          ref={(el) => { ringRefs.current[i * N_RINGS + j] = el; }}
                          cx={CX} cy={CY} r={RADII[j]}
                          fill="none" stroke={COLORS[j]} strokeWidth="3" strokeLinecap="round"
                        />
                      </g>
                    ))}
                  </g>

                  <text
                    x={CX} y={CY - 4}
                    textAnchor="middle" fontSize="18" fontWeight="900"
                    fill="rgba(37,99,235,0.55)"
                    style={{ fontFamily: "inherit", letterSpacing: "-0.02em" }}
                  >
                    {p.abbr}
                  </text>
                  <text
                    x={CX} y={CY + 16}
                    textAnchor="middle" fontSize="9" fill="rgba(37,99,235,0.38)"
                    style={{ fontFamily: "inherit", letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    properties
                  </text>
                </svg>

                <ul className="grid w-full grid-cols-2 gap-x-5 gap-y-1.5 md:max-w-50 md:grid-cols-1" role="list">
                  {p.props.map((prop, j) => (
                    <li key={prop.label} className="ps-legend flex items-center gap-2">
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: COLORS[j] }}
                        aria-hidden="true"
                      />
                      <span className="flex-1 text-xs text-slate-500 dark:text-slate-400">{prop.label}</span>
                      <span className="font-mono text-xs font-semibold tabular-nums text-slate-700 dark:text-slate-300">
                        {prop.value}%
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* progress bar */}
        <div className="relative z-10 shrink-0 px-6 pb-5 md:px-12">
          <svg width="100%" height="2" aria-hidden="true" style={{ overflow: "visible" }}>
            <line x1="0" y1="1" x2="100%" y2="1" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="1.5" />
            <line
              ref={progRef}
              x1="0" y1="1" x2="100%" y2="1"
              stroke="rgb(37,99,235)" strokeWidth="1.5" strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
