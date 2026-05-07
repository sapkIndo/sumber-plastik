"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, DrawSVGPlugin);

const EN_SPECS = new Set([
  "Food Grade", "Food Grade BPOM", "Recyclable", "Crystal Clear",
  "Chemical Resistant", "Waterproof", "Rigid & Flexible",
  "Stretch Film", "Tear Resistant", "Food Safe",
  "Eco Friendly", "Biodegradable", "Custom Print",
]);

const CX = 110;
const CY = 110;
const RADII   = [42, 57, 72, 87];
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
      { label: "Kekuatan",      value: 93 },
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
    name: "PVC Shrink",
    tagline: "Label & sleeve yang menyesuaikan kontur kemasan",
    desc: "Film PVC shrink untuk label botol, sleeve kemasan, dan bundling produk. Mengkerut sempurna saat terkena panas, mengikuti kontur produk dengan presisi tinggi.",
    specs: ["Crystal Clear", "Shrink Rate Tinggi", "Kilap Tinggi"],
    industries: "Minuman  ·  Farmasi  ·  Kosmetik  ·  Retail",
    props: [
      { label: "Daya Menyusut",  value: 92 },
      { label: "Kejernihan",     value: 88 },
      { label: "Kekuatan",       value: 92 },
      { label: "Food Safety",    value: 72 },
    ],
  },
  {
    abbr: "LLDPE",
    name: "LLDPE",
    tagline: "Film & wrapping serba guna untuk kemasan modern",
    desc: "Stretch film, kantong plastik Es Crystal, food wrap, dan kemasan fleksibel. Kekuatan sobek tinggi dengan ketebalan lebih tipis — ideal untuk packaging otomatis dan distribusi skala besar.",
    specs: ["Stretch Film", "Tear Resistant", "Food Safe"],
    industries: "Logistik  ·  FMCG  ·  Retail  ·  Cold Chain",
    props: [
      { label: "Kekuatan",      value: 92 },
      { label: "Fleksibilitas", value: 95 },
      { label: "Tahan Uap Air", value: 80 },
      { label: "Food Safety",   value: 85 },
    ],
  },
  {
    abbr: "PS",
    name: "Polystyrene",
    tagline: "Sendok, wadah & kemasan sekali pakai serba guna",
    desc: "Sendok, garpu, pisau plastik, wadah makanan styrofoam, baki buah & sayur, dan cup minuman. Ringan, mudah dibentuk, dan insulasi panas-dingin sangat baik.",
    specs: ["Insulasi Termal", "Food Grade", "Ringan"],
    industries: "F&B  ·  Catering  ·  Restoran  ·  Supermarket",
    props: [
      { label: "Food Safety",   value: 82 },
      { label: "Kekuatan",      value: 91 },
      { label: "Insulasi",      value: 90 },
      { label: "Tahan Panas",   value: 35 },
    ],
  },
  {
    abbr: "Paper",
    name: "Paper Packaging",
    tagline: "Kemasan ramah lingkungan berbasis kertas",
    desc: "Kardus, paper bag, kraft paper, cup gelas, dan kemasan eco-friendly. Solusi sustainable yang semakin diminati pasar modern. Tersedia dalam berbagai ketebalan dan finishing.",
    specs: ["Eco Friendly", "Biodegradable", "Custom Print"],
    industries: "Retail  ·  F&B  ·  E-commerce  ·  Gift",
    props: [
      { label: "Kekuatan",      value: 91 },
      { label: "Fleksibilitas", value: 60 },
      { label: "Tahan Panas",   value: 30 },
      { label: "Food Safety",   value: 88 },
    ],
  },
  {
    abbr: "OPP",
    name: "OPP",
    tagline: "Film transparan glossy untuk kemasan premium",
    desc: "Oriented Polypropylene — film plastik transparan dengan kilap tinggi. Ideal untuk kemasan snack, confectionery, label botol, dan wrapping produk retail.",
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
    desc: "Kantong plastik dengan aditif oxo-degradable yang mempercepat penguraian di lingkungan terbuka. Alternatif eco-friendly untuk kantong belanja dan kemasan ritel.",
    specs: ["Eco Friendly", "Biodegradable", "Dapat Terurai"],
    industries: "Retail  ·  Supermarket  ·  E-commerce  ·  FMCG",
    props: [
      { label: "Daya Urai",     value: 88 },
      { label: "Kekuatan",      value: 91 },
      { label: "Fleksibilitas", value: 85 },
      { label: "Food Safety",   value: 78 },
    ],
  },
  {
    abbr: "Custom",
    name: "Custom Packaging",
    tagline: "Kemasan sesuai ukuran & spesifikasi Anda",
    desc: "Seluruh lini produk tersedia dalam ukuran, ketebalan, dan warna sesuai permintaan. Cocok untuk brand yang ingin tampil eksklusif dengan kemasan unik.",
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
    desc: "Layanan cetak sablon untuk seluruh lini produk kemasan kami. Logo, merek, dan desain Anda dicetak langsung di permukaan kemasan dengan warna tajam dan tahan lama.",
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
  const trackRef   = useRef<HTMLDivElement>(null);
  const progRef    = useRef<SVGLineElement>(null);
  const slideRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const ringRefs   = useRef<(SVGCircleElement | null)[]>([]);

  useGSAP(() => {
    const total = products.length;
    const inTL: (gsap.core.Timeline | null)[] = Array(total).fill(null);

    function q<T extends Element>(el: HTMLDivElement, sel: string) {
      return el.querySelector<T>(sel);
    }
    function qa<T extends Element>(el: HTMLDivElement, sel: string) {
      return el.querySelectorAll<T>(sel);
    }

    // ── Background blob drift ─────────────────────────────────────────────────
    gsap.utils.toArray<HTMLElement>(".ps-blob").forEach((blob, i) => {
      gsap.to(blob, {
        x: "random(-45, 45)",
        y: "random(-28, 28)",
        scale: "random(0.88, 1.14)",
        duration: "random(7, 12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 2.2,
      });
    });

    // ── Slide animations ──────────────────────────────────────────────────────
    function initSlide(i: number) {
      const s = slideRefs.current[i];
      if (!s) return;
      gsap.set(q(s, ".ps-ghost"),      { opacity: 0, scale: 1.12, overwrite: true });
      gsap.set(q(s, ".ps-overline"),   { opacity: 0, y: 10, overwrite: true });
      gsap.set(q(s, ".ps-tagline"),    { opacity: 0, y: 6,  overwrite: true });
      gsap.set(q(s, ".ps-name"),       { opacity: 0, y: 28, overwrite: true });
      gsap.set(q(s, ".ps-desc"),       { opacity: 0, y: 16, overwrite: true });
      gsap.set(q(s, ".ps-industries"), { opacity: 0,         overwrite: true });
      gsap.set(qa(s, ".ps-spec"),      { opacity: 0, y: 12, scale: 0.82, overwrite: true });
      gsap.set(qa(s, ".ps-legend"),    { opacity: 0, x: -8, overwrite: true });
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

      // Ghost watermark rises in slowly
      tl.to(q(s, ".ps-ghost"), { opacity: 1, scale: 1, duration: 1.4, ease: "power2.out" }, 0);

      for (let j = 0; j < N_RINGS; j++) {
        const ring = ringRefs.current[i * N_RINGS + j];
        const pct  = products[i].props[j].value;
        if (ring)
          tl.to(ring, { drawSVG: `0% ${pct}%`, duration: 1.0, ease: "circ.out" }, 0.12 + j * 0.06);
      }

      tl.to(qa(s, ".ps-legend"),    { opacity: 1, x: 0,  duration: 0.4,  stagger: 0.06, ease: "power2.out" }, 0.32);
      tl.to(q(s, ".ps-overline"),   { opacity: 1, y: 0,  duration: 0.35, ease: "power2.out" }, 0.1);
      tl.to(q(s, ".ps-name"),       { opacity: 1, y: 0,  duration: 0.6,  ease: "power3.out" }, 0.18);
      tl.to(q(s, ".ps-tagline"),    { opacity: 1, y: 0,  duration: 0.35, ease: "power2.out" }, 0.28);
      tl.to(q(s, ".ps-desc"),       { opacity: 1, y: 0,  duration: 0.45, ease: "power2.out" }, 0.34);
      tl.to(q(s, ".ps-industries"), { opacity: 1,         duration: 0.35, ease: "power1.out" }, 0.44);
      tl.to(qa(s, ".ps-spec"), {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6, stagger: 0.08, ease: "back.out(1.5)",
      }, 0.48);
    }

    function slideOut(i: number) {
      const s = slideRefs.current[i];
      if (!s) return;
      if (inTL[i]) { inTL[i]!.kill(); inTL[i] = null; }
      for (let j = 0; j < N_RINGS; j++) {
        const ring = ringRefs.current[i * N_RINGS + j];
        if (ring) gsap.to(ring, { drawSVG: "0%", duration: 0.25, ease: "power2.in", overwrite: true });
      }
      const targets = [
        q(s, ".ps-ghost"),
        q(s, ".ps-overline"), q(s, ".ps-name"),    q(s, ".ps-tagline"),
        q(s, ".ps-desc"),     q(s, ".ps-industries"),
        ...Array.from(qa(s, ".ps-spec")),
        ...Array.from(qa(s, ".ps-legend")),
      ].filter(Boolean);
      if (targets.length)
        gsap.to(targets, { opacity: 0, duration: 0.18, ease: "power2.in", overwrite: true });
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    for (let i = 0; i < total; i++) initSlide(i);
    slideIn(0);

    gsap.set(progRef.current, { drawSVG: "0%" });

    // ── Scroll state ──────────────────────────────────────────────────────────
    let activeIdx    = 0;
    let targetX      = 0;
    let pendingIn: gsap.core.Tween | null = null;
    let canNav       = true;
    let gestureTimer: ReturnType<typeof setTimeout> | null = null;

    gsap.set(trackRef.current, { x: 0 });

    const xTo = gsap.quickTo(trackRef.current, "x", { duration: 0.5, ease: "power3.out" });

    // ── Swipe / click hint ────────────────────────────────────────────────────
    const hintEl   = ref.current!.querySelector<HTMLElement>(".ps-hint");
    const ringEls  = Array.from(ref.current!.querySelectorAll<HTMLElement>(".ps-hint-ring"));
    const arrowEl  = hintEl?.querySelector<SVGElement>(".ps-hint-arrow");
    let breathTw: gsap.core.Tween | null = null;
    let ringTw:   gsap.core.Tween | null = null;
    let arrowTw:  gsap.core.Tween | null = null;

    function startHintAnim() {
      if (breathTw) breathTw.kill();
      if (ringTw)   ringTw.kill();
      if (arrowTw)  arrowTw.kill();

      breathTw = gsap.to(hintEl, {
        scale: 1.08, repeat: -1, yoyo: true,
        duration: 1.4, ease: "sine.inOut",
      });

      if (ringEls.length) {
        ringTw = gsap.fromTo(ringEls,
          { scale: 1, opacity: 0.65 },
          { scale: 2.6, opacity: 0, duration: 2.0, repeat: -1, ease: "power1.out", stagger: 1.0 },
        );
      }

      if (arrowEl) {
        arrowTw = gsap.to(arrowEl, {
          x: 5, repeat: -1, yoyo: true, duration: 0.5, ease: "power1.inOut",
        });
      }
    }

    function showHint() {
      if (!hintEl) return;
      gsap.to(hintEl, {
        opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)",
        overwrite: true,
        onComplete: startHintAnim,
      });
    }

    function hideHint() {
      if (!hintEl) return;
      if (breathTw) { breathTw.kill(); breathTw = null; }
      if (ringTw)   { ringTw.kill();   ringTw   = null; }
      if (arrowTw)  { arrowTw.kill();  arrowTw  = null; }
      if (arrowEl)  gsap.set(arrowEl, { x: 0 });
      gsap.to(hintEl, { opacity: 0, scale: 0.8, duration: 0.25, overwrite: true });
    }

    if (hintEl) {
      gsap.set(hintEl, { opacity: 0, scale: 0.8 });
      gsap.delayedCall(2, showHint);

      const onHintClick = () => { if (activeIdx < total - 1) goTo(activeIdx + 1); };
      hintEl.addEventListener("click", onHintClick);
      // Store for cleanup
      (hintEl as HTMLElement & { _onClick?: () => void })._onClick = onHintClick;
    }

    const tickProgress = () => {
      const x    = gsap.getProperty(trackRef.current!, "x") as number;
      const maxX = (total - 1) * window.innerWidth;
      if (maxX <= 0) return;
      const pct = Math.min(100, Math.max(0, (Math.abs(x) / maxX) * 100));
      gsap.set(progRef.current, { drawSVG: `0% ${pct}%` });
    };
    gsap.ticker.add(tickProgress);

    function activate(idx: number) {
      if (idx === activeIdx) return;
      if (pendingIn) { pendingIn.kill(); pendingIn = null; }
      // Hint: hilang di produk terakhir, muncul kembali kalau bukan terakhir
      if (idx >= total - 1) hideHint(); else showHint();
      slideOut(activeIdx);
      activeIdx = idx;
      initSlide(idx);
      pendingIn = gsap.delayedCall(0.22, () => slideIn(idx));
    }

    function goTo(idx: number) {
      const next = Math.max(0, Math.min(total - 1, idx));
      targetX = -next * window.innerWidth;
      xTo(targetX);
      activate(next);
    }

    // ── Hover tracking (untuk mouse wheel navigation) ─────────────────────────
    let isHovered = false;
    const onMouseEnter = () => { isHovered = true; };
    const onMouseLeave = () => { isHovered = false; };

    // ── Wheel ─────────────────────────────────────────────────────────────────
    const nav = (delta: number) => {
      if (gestureTimer) clearTimeout(gestureTimer);
      gestureTimer = setTimeout(() => { canNav = true; gestureTimer = null; }, 150);
      if (!canNav) return;
      canNav = false;
      goTo(activeIdx + delta);
    };

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // ── Kasus 1: horizontal trackpad swipe ────────────────────────────────
      if (absX > absY && absX > 5) {
        // Selalu block agar browser tidak trigger back/forward
        e.preventDefault();
        if (e.deltaX > 0 && activeIdx >= total - 1) return;
        if (e.deltaX < 0 && activeIdx <= 0)         return;
        nav(e.deltaX > 0 ? 1 : -1);
        return;
      }

      // ── Kasus 2: mouse wheel vertical saat hover di dalam section ─────────
      if (isHovered) {
        // Di boundary → biarkan halaman scroll melewati section
        if (e.deltaY > 0 && activeIdx >= total - 1) return;
        if (e.deltaY < 0 && activeIdx <= 0)         return;
        e.preventDefault();
        nav(e.deltaY > 0 ? 1 : -1);
      }
      // else: mouse di luar section → scroll halaman normal
    };

    // ── Touch — horizontal swipe navigates, vertical scrolls page ────────────
    let touchStartX = 0;
    let touchStartY = 0;
    let touchLastX  = 0;
    let isHSwipe: boolean | null = null;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchLastX  = touchStartX;
      isHSwipe    = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - touchStartX;
      const dy = e.touches[0].clientY - touchStartY;
      if (isHSwipe === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8))
        isHSwipe = Math.abs(dx) > Math.abs(dy);
      if (!isHSwipe) return;
      e.preventDefault();
      const delta = e.touches[0].clientX - touchLastX;
      touchLastX  = e.touches[0].clientX;
      targetX = Math.max(-(total - 1) * window.innerWidth, Math.min(0, targetX + delta));
      xTo(targetX);
    };

    const onTouchEnd = () => {
      if (!isHSwipe) return;
      goTo(Math.max(0, Math.min(total - 1, Math.round(-targetX / window.innerWidth))));
    };

    const onResize = () => {
      targetX = -activeIdx * window.innerWidth;
      gsap.set(trackRef.current, { x: targetX });
    };

    const el = ref.current!;
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("wheel",      onWheel,      { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true  });
    el.addEventListener("touchmove",  onTouchMove,  { passive: false });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true  });
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(tickProgress);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("wheel",      onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onTouchEnd);
      window.removeEventListener("resize", onResize);
      if (pendingIn)    pendingIn.kill();
      if (gestureTimer) clearTimeout(gestureTimer);
      if (breathTw)     breathTw.kill();
      if (ringTw)       ringTw.kill();
      if (arrowTw)      arrowTw.kill();
      const h = hintEl as HTMLElement & { _onClick?: () => void };
      if (h?._onClick)  h.removeEventListener("click", h._onClick);
    };
  }, { scope: ref });

  return (
    <section
      ref={ref}
      className="relative flex h-[75svh] w-full flex-col overflow-hidden bg-white dark:bg-slate-900"
      aria-labelledby="spotlight-heading"
    >
      {/* ── Animated background blobs ─────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="ps-blob absolute -left-32 -top-24 h-[500px] w-[500px] rounded-full bg-blue-400/15 blur-[96px] dark:bg-blue-500/8" />
        <div className="ps-blob absolute -bottom-16 -right-24 h-[420px] w-[420px] rounded-full bg-sky-300/18 blur-[80px] dark:bg-sky-400/8" />
        <div className="ps-blob absolute left-[40%] top-[20%] h-[360px] w-[360px] rounded-full bg-indigo-300/14 blur-[72px] dark:bg-indigo-400/7" />
      </div>

      {/* ── Header bar ───────────────────────────────────────────────────── */}
      <div className="relative z-10 flex shrink-0 items-center border-b border-slate-100/80 px-6 py-3 dark:border-slate-800 md:px-12">
        <span className="h-px w-5 bg-blue-600" aria-hidden="true" />
        <h2
          id="spotlight-heading"
          className="ml-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400 dark:text-slate-500"
        >
          Material Unggulan
        </h2>
      </div>

      {/* ── Horizontal track ─────────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full cursor-ew-resize"
          style={{ width: `${products.length * 100}vw` }}
        >
          {products.map((p, i) => (
            <div
              key={p.abbr}
              ref={(el) => { slideRefs.current[i] = el; }}
              className="relative flex h-full w-screen flex-col justify-center gap-4 overflow-hidden px-6 py-3 md:flex-row md:items-center md:gap-8 md:px-12 lg:px-16"
            >
              {/* Ghost watermark abbr */}
              <div
                className="ps-ghost pointer-events-none absolute bottom-0 right-0 flex items-end justify-end overflow-hidden"
                aria-hidden="true"
              >
                <span
                  className="select-none font-black leading-none text-blue-600/[0.12] dark:text-blue-400/[0.10]"
                  style={{
                    fontSize: "clamp(6rem, 18vw, 17rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 0.85,
                  }}
                >
                  {p.abbr}
                </span>
              </div>

              {/* ── Text column ─────────────────────────────────────────── */}
              <div className="relative z-10 flex flex-col md:w-[52%]">
                <div className="ps-overline mb-2 flex items-center gap-3">
                  <span className="h-px w-4 shrink-0 bg-blue-600" aria-hidden="true" />
                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-blue-600">
                    {p.abbr}
                  </span>
                </div>

                <h3
                  className="ps-name mb-1.5 font-black leading-none tracking-tight text-slate-900 dark:text-slate-50"
                  style={{ fontSize: "clamp(2.4rem, 5vw, 5.5rem)" }}
                >
                  {p.name}
                </h3>

                <p className="ps-tagline mb-2.5 text-sm font-semibold text-blue-600 md:text-base">
                  {p.tagline}
                </p>

                <p className="ps-desc mb-2.5 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400 md:text-[15px] md:leading-[1.75]">
                  {p.desc}
                </p>

                <p className="ps-industries mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                  {p.industries}
                </p>

                <ul className="flex flex-wrap gap-1.5" role="list">
                  {p.specs.map((spec) => (
                    <li
                      key={spec}
                      className="ps-spec rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-blue-600 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400"
                    >
                      {EN_SPECS.has(spec) ? <em>{spec}</em> : spec}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Chart column ─────────────────────────────────────────── */}
              <div className="relative z-10 flex shrink-0 items-center gap-3 md:w-[48%] md:flex-col md:gap-3">
                <svg
                  className="h-36 w-36 shrink-0 md:h-52 md:w-52 lg:h-56 lg:w-56"
                  viewBox="0 0 220 220"
                  aria-hidden="true"
                >
                  <g transform={`rotate(-90, ${CX}, ${CY})`}>
                    {p.props.map((prop, j) => (
                      <g key={prop.label}>
                        <circle
                          cx={CX} cy={CY} r={RADII[j]}
                          fill="none" stroke={COLORS[j]} strokeWidth="2.5" opacity="0.1"
                        />
                        <circle
                          ref={(el) => { ringRefs.current[i * N_RINGS + j] = el; }}
                          cx={CX} cy={CY} r={RADII[j]}
                          fill="none" stroke={COLORS[j]} strokeWidth="2.5" strokeLinecap="round"
                        />
                      </g>
                    ))}
                  </g>

                  <text
                    x={CX} y={CY - 4}
                    textAnchor="middle" fontSize="18" fontWeight="900"
                    fill="rgba(37,99,235,0.5)"
                    style={{ fontFamily: "inherit", letterSpacing: "-0.02em" }}
                  >
                    {p.abbr}
                  </text>
                  <text
                    x={CX} y={CY + 14}
                    textAnchor="middle" fontSize="9" fill="rgba(37,99,235,0.35)"
                    style={{ fontFamily: "inherit", letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    properties
                  </text>
                </svg>

                <ul className="grid grid-cols-1 gap-y-1 md:w-full md:max-w-[180px]" role="list">
                  {p.props.map((prop, j) => (
                    <li key={prop.label} className="ps-legend flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
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
      </div>

      {/* ── Swipe hint ───────────────────────────────────────────────────── */}
      <button
        className="ps-hint pointer-events-auto absolute right-6 top-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-500/50 ring-2 ring-white/25 transition-all hover:from-blue-400 hover:to-indigo-500 hover:shadow-blue-400/60 focus:outline-none md:right-12"
        aria-label="Produk berikutnya"
      >
        <div className="ps-hint-ring absolute inset-0 rounded-full bg-blue-400" />
        <div className="ps-hint-ring absolute inset-0 rounded-full bg-indigo-400" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="ps-hint-arrow relative z-10 drop-shadow-sm">
          <polyline points="9,5 16,12 9,19" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* ── Progress bar ─────────────────────────────────────────────────── */}
      <div className="relative z-10 shrink-0 px-6 pb-4 md:px-12">
        <svg width="100%" height="2" aria-hidden="true" style={{ overflow: "visible" }}>
          <line x1="0" y1="1" x2="100%" y2="1" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="1.5" />
          <line
            ref={progRef}
            x1="0" y1="1" x2="100%" y2="1"
            stroke="rgb(37,99,235)" strokeWidth="1.5" strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  );
}
