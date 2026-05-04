"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MapPin, Clock, Phone, ArrowUpRight, Building2, Truck } from "lucide-react";
import { STORES } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const STORE_PALETTES: [string, string][] = [
  ["#1d4ed8", "#3b82f6"],
  ["#0e7490", "#22d3ee"],
  ["#4338ca", "#818cf8"],
  ["#1e40af", "#38bdf8"],
];

const PANEL_W = 200;
const SHIFT   = 248;  // content shifts this many px right
const GAP     = 24;   // gap between panel right edge and shifted list left edge

export default function StoreBranch() {
  const sectionRef   = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef   = useRef<HTMLHeadingElement>(null);
  const listRef      = useRef<HTMLDivElement>(null);
  const rowRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const panelRef     = useRef<HTMLDivElement>(null);
  const panelBgRef   = useRef<HTMLDivElement>(null);
  const panelNumRef  = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const isDark = () => document.documentElement.classList.contains("dark");

      /* ── Heading SplitText ── */
      const split = new SplitText(headingRef.current!, { type: "chars" });
      gsap.set(split.chars, { transformOrigin: "0% 50% -40px" });

      ScrollTrigger.create({
        trigger: headingRef.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.from(".fc-label",    { opacity: 0, y: -10, duration: 0.5, ease: "expo.out" });
          gsap.from(split.chars,    { opacity: 0, y: 28, rotateX: -80, stagger: 0.02, duration: 0.6, ease: "expo.out", delay: 0.1 });
          gsap.from(".fc-subtitle", { opacity: 0, y: 14, duration: 0.5, ease: "expo.out", delay: 0.5 });
        },
      });

      // Mobile card entrance animation
      gsap.from(".fc-mobile-card", {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ".fc-mobile-cards", start: "top 78%", once: true },
      });

      ScrollTrigger.create({
        trigger: listRef.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          gsap.from(".fc-divider", {
            scaleX: 0,
            transformOrigin: "left center",
            stagger: 0.12,
            duration: 0.8,
            ease: "expo.out",
          });
          gsap.from(".fc-row", {
            opacity: 0,
            y: 28,
            stagger: 0.1,
            duration: 0.65,
            ease: "expo.out",
            delay: 0.1,
          });
          gsap.from(".fc-delivery", {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: "expo.out",
            delay: 0.55,
          });
        },
      });

      /*
       * Compute panel geometry once at mount — list is guaranteed at x:0 here.
       * Height = full list height so the panel spans all 4 rows.
       */
      const lRect = listRef.current!.getBoundingClientRect();
      const cRect = containerRef.current!.getBoundingClientRect();
      const panelTop  = lRect.top  - cRect.top;
      const panelLeft = (lRect.left - cRect.left) + SHIFT - PANEL_W - GAP;
      const panelH    = lRect.height;

      if (panelRef.current) panelRef.current.style.height = `${panelH}px`;
      gsap.set(panelRef.current, { left: panelLeft, top: panelTop, x: -(PANEL_W + 40), opacity: 0 });

      const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;
      const cleanups: (() => void)[] = [];

      /* ── Per-row hover ── */
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const numEl = row.querySelector<HTMLElement>(".fc-num");

        const onEnter = () => {
          /* Snap all other rows to transparent instantly — no fade-to-white flash */
          rowRefs.current.forEach((r, j) => {
            if (j === i || !r) return;
            gsap.killTweensOf(r);
            gsap.set(r, { backgroundColor: "transparent" });
            const n = r.querySelector<HTMLElement>(".fc-num");
            if (n) gsap.set(n, { color: isDark() ? "#334155" : "#e2e8f0" });
          });

          gsap.to(row, {
            backgroundColor: isDark() ? "#1e293b" : "#f8faff",
            duration: 0.2,
            ease: "power2.out",
          });
          if (numEl) gsap.to(numEl, { color: "#2563eb", duration: 0.28, ease: "power2.out" });

          if (!isDesktop()) return;

          gsap.killTweensOf(listRef.current);
          gsap.killTweensOf(panelRef.current);

          const [from, to] = STORE_PALETTES[i];
          if (panelBgRef.current)
            panelBgRef.current.style.background = `linear-gradient(160deg, ${from} 0%, ${to} 100%)`;
          if (panelNumRef.current)
            panelNumRef.current.textContent = String(i + 1).padStart(2, "0");

          gsap.to(listRef.current,  { x: SHIFT, duration: 0.45, ease: "power3.out" });
          gsap.to(panelRef.current, { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
        };

        const onLeave = () => {
          gsap.to(row, { backgroundColor: "transparent", duration: 0.2, ease: "power2.out" });
          if (numEl)
            gsap.to(numEl, {
              color: isDark() ? "#334155" : "#e2e8f0",
              duration: 0.28,
              ease: "power2.out",
            });
        };

        row.addEventListener("mouseenter", onEnter);
        row.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          row.removeEventListener("mouseenter", onEnter);
          row.removeEventListener("mouseleave", onLeave);
        });
      });

      /* ── List leave: collapse both list and panel ── */
      const list = listRef.current;
      if (list) {
        const onListLeave = () => {
          if (!isDesktop()) return;
          gsap.killTweensOf(list);
          gsap.killTweensOf(panelRef.current);
          gsap.to(list,             { x: 0,               duration: 0.48, ease: "power3.inOut" });
          gsap.to(panelRef.current, { x: -(PANEL_W + 40), duration: 0.4,  ease: "power3.inOut",
                                      opacity: 0 });
        };
        list.addEventListener("mouseleave", onListLeave);
        cleanups.push(() => list.removeEventListener("mouseleave", onListLeave));
      }

      return () => { split.revert(); cleanups.forEach((fn) => fn()); };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="fc-heading"
      className="relative overflow-x-hidden py-16 md:py-28"
    >
      <div ref={containerRef} className="relative mx-auto max-w-7xl px-5 md:px-6">
        {/*
          Floating panel — desktop only.
          Positioned relative to the max-w-7xl container (not the section)
          so coordinates stay consistent across all viewport widths.
          Height is set dynamically by GSAP to match the full list height.
        */}
        <div
          ref={panelRef}
          className="pointer-events-none absolute hidden md:block rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/25"
          style={{ width: PANEL_W }}
          aria-hidden="true"
        >
          <div
            ref={panelBgRef}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{ background: "linear-gradient(160deg, #1d4ed8 0%, #3b82f6 100%)" }}
          >
            <Building2 size={36} className="text-white/25" />
            <span
              ref={panelNumRef}
              className="font-mono text-8xl font-black leading-none tracking-tighter text-white/90"
            >
              01
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">
              SAPK
            </span>
          </div>
          {/* Gloss */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_65%_18%,rgba(255,255,255,0.18),transparent_52%)]" />
          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* ── Header ── */}
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="fc-label mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Jaringan Toko
            </p>
            <h2
              ref={headingRef}
              id="fc-heading"
              className="font-black tracking-tight text-slate-900 dark:text-slate-50"
              style={{ fontSize: "clamp(1.875rem, 2vw + 1.25rem, 3rem)", perspective: "600px" }}
            >
              4 Toko, Siap Melayani
              <br className="hidden sm:block" />
              <span className="text-slate-400 dark:text-slate-500">Seluruh Indonesia</span>
            </h2>
          </div>
          <p className="fc-subtitle max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400 md:text-right">
            Kedepannya kami berkomitmen untuk membuka cabang di seluruh Kota di Indonesia. Stok lengkap, tim siap bantu, pengiriman di hari yang sama.
          </p>
        </div>

        {/* ── Mobile card carousel ── */}
        <div className="fc-mobile-cards md:hidden grid grid-cols-2 gap-3 mb-2">
          {STORES.map((store, i) => (
            <a
              key={store.name}
              href={store.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Buka lokasi ${store.name} di Google Maps`}
              className="fc-mobile-card group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition-[border-color] duration-200 hover:border-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-800"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-2xl font-black leading-none text-slate-200 dark:text-slate-700" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight size={13} className="mt-0.5 text-slate-300 transition-colors duration-200 group-hover:text-blue-500 dark:text-slate-600 dark:group-hover:text-blue-400" aria-hidden="true" />
              </div>
              <p className="line-clamp-2 text-sm font-bold leading-tight text-slate-900 dark:text-slate-50">{store.name}</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-start gap-1.5">
                  <MapPin size={11} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                  <address className="not-italic text-[11px] leading-snug text-slate-500 dark:text-slate-400">{store.address}</address>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={11} className="shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">{store.hours}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* ── Directory list (desktop only) ── */}
        <div ref={listRef} className="fc-list hidden md:block">
          <div className="fc-divider h-px w-full bg-slate-300 dark:bg-slate-700" />

          {STORES.map((store, i) => {
            const num = String(i + 1).padStart(2, "0");
            return (
              <div key={store.name}>
                <div
                  ref={(el) => { rowRefs.current[i] = el; }}
                  className="fc-row relative -mx-4 cursor-pointer rounded-xl px-4"
                >
                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Lihat lokasi ${store.name} di Google Maps`}
                    className="absolute inset-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500"
                    tabIndex={0}
                  />

                  <div className="fc-row-inner grid grid-cols-[40px_1fr] gap-x-6 gap-y-3 py-7 md:grid-cols-[56px_1.2fr_2fr_1fr_1fr_32px] md:items-center md:gap-x-8 md:gap-y-0 md:py-8">

                    <span
                      className="fc-num font-mono text-2xl font-black text-slate-200 dark:text-slate-700 md:text-3xl"
                      aria-hidden="true"
                    >
                      {num}
                    </span>

                    <p className="text-base font-bold text-slate-900 dark:text-slate-50 md:text-lg">{store.name}</p>

                    <div className="col-span-2 flex items-start gap-2 md:col-span-1">
                      <MapPin size={13} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                      <address className="not-italic text-sm leading-snug text-slate-500 dark:text-slate-400">
                        {store.address}
                      </address>
                    </div>

                    <div className="col-span-2 flex items-center gap-2 md:col-span-1">
                      <Clock size={13} className="shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                      <span className="text-sm text-slate-500 dark:text-slate-400">{store.hours}</span>
                    </div>

                    <a
                      href={`tel:${store.phone}`}
                      className="relative z-10 col-span-2 flex items-center gap-2 md:col-span-1"
                    >
                      <Phone size={13} className="shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                      <span className="text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">{store.phone}</span>
                    </a>

                    <div className="fc-arrow hidden items-center justify-end md:flex" aria-hidden="true">
                      <ArrowUpRight size={16} className="text-slate-300 dark:text-slate-600" />
                    </div>

                  </div>
                </div>
                <div className="fc-divider h-px w-full bg-slate-300 dark:bg-slate-700" />
              </div>
            );
          })}

        </div>

        {/* ── Delivery callout ── */}
        <div className="fc-delivery mt-10 flex items-center gap-5 rounded-2xl border border-blue-100 bg-blue-50/70 px-6 py-5 dark:border-blue-900/30 dark:bg-blue-950/20">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-600/25">
            <Truck size={18} className="text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
              Pengiriman Nasional
            </p>
            <p className="text-base font-bold text-slate-900 dark:text-slate-50">
              Order dari mana pun, kami siap kirim ke{" "}
              <span className="text-blue-600 dark:text-blue-400">seluruh wilayah Indonesia</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
