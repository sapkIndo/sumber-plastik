"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// TODO: ganti handle dan href dengan akun asli
const SOCIALS = [
  {
    id:     "instagram",
    label:  "Instagram",
    handle: "@sumberanekaplastikdankemasan",
    href:   "https://www.instagram.com/sumberanekaplastikdankemasan/",
    color:  "#E1306C",
    path:   "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    id:     "facebook",
    label:  "Facebook",
    handle: "@sumber.aneka.plastik.dan.kemasan",
    href:   "https://www.facebook.com/sumber.aneka.plastik.dan.kemasan/",
    color:  "#1877F2",
    path:   "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    id:     "tiktok",
    label:  "TikTok",
    handle: "@sumberplastikdankemasan",
    href:   "https://www.tiktok.com/@sumberplastikdankemasan",
    color:  "#25F4EE",
    path:   "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
] as const;

export default function SocialMedia() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeSocial = SOCIALS.find((s) => s.id === activeId) ?? null;

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start:   "top 75%",
          once:    true,
        },
        defaults: { ease: "expo.out" },
      });

      tl.from(".soc-overline", { opacity: 0, y: -10, duration: 0.5 })
        .from(".soc-heading",  { opacity: 0, y: 40,  duration: 0.9 }, "-=0.3")
        .from(".soc-sub",      { opacity: 0, y: 16,  duration: 0.6 }, "-=0.6")
        .from(".soc-divider",  { scaleX: 0, duration: 0.7, transformOrigin: "left center", stagger: 0.07 }, "-=0.45")
        .from(".soc-row",      { opacity: 0, x: 32, scale: 0.98, duration: 0.75, stagger: 0.08 }, "-=0.6");

      gsap.to(".soc-ring", {
        rotation: 360,
        duration: 80,
        ease:     "none",
        repeat:   -1,
        transformOrigin: "center center",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Sosial Media — Sumber Aneka Plastik dan Kemasan"
      onMouseLeave={() => setActiveId(null)}
      className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-slate-900 px-6 py-20 md:px-12 md:py-24 lg:px-16"
    >

      {/* ── Dekorasi background ── */}

      {/* Color wash — berubah ke warna platform saat hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: activeSocial ? `${activeSocial.color}22` : "transparent",
          transition: "background-color 600ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      />

      {/* Ghost watermark — nama platform besar di belakang, crossfade per platform */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        {SOCIALS.map((s) => (
          <span
            key={s.id}
            className="absolute select-none font-black uppercase tracking-tighter"
            style={{
              fontSize: "clamp(5rem, 16vw, 16rem)",
              color:    s.color,
              opacity:  activeId === s.id ? 0.08 : 0,
              transition: "opacity 500ms cubic-bezier(0.23, 1, 0.32, 1)",
              whiteSpace: "nowrap",
            }}
          >
            {s.label}
          </span>
        ))}
      </div>

      {/* Static blue glow — idle state */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 65% 50% at 30% 55%, rgba(37,99,235,0.15), transparent)" }}
      />

      {/* Ring berputar lambat */}
      <div
        aria-hidden="true"
        className="soc-ring pointer-events-none absolute -right-16 top-1/2 h-[70vmin] w-[70vmin] -translate-y-1/2"
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" fill="none">
          <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="0.5" opacity="0.07" strokeDasharray="6 14" />
          <circle cx="50" cy="50" r="34" stroke="white" strokeWidth="0.3" opacity="0.04" />
          <circle cx="50" cy="4"  r="1.5" fill="white" opacity="0.15" />
          <circle cx="96" cy="50" r="1.5" fill="white" opacity="0.15" />
          <circle cx="50" cy="96" r="1.5" fill="white" opacity="0.15" />
          <circle cx="4"  cy="50" r="1.5" fill="white" opacity="0.15" />
        </svg>
      </div>

      {/* Scatter dots */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
        <circle cx="8%"  cy="15%" r="2" fill="white"   opacity="0.06" />
        <circle cx="18%" cy="80%" r="2" fill="white"   opacity="0.05" />
        <circle cx="55%" cy="8%"  r="2" fill="white"   opacity="0.05" />
        <circle cx="72%" cy="88%" r="3" fill="#E1306C" opacity="0.25" />
        <circle cx="82%" cy="22%" r="3" fill="#25F4EE" opacity="0.20" />
        <circle cx="92%" cy="65%" r="3" fill="#1877F2" opacity="0.20" />
      </svg>

      {/* ── Header ── */}
      <div className="relative z-10 mb-12 md:mb-16 md:max-w-2xl">
        <div className="soc-overline mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-blue-500" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
            Sosial Media
          </span>
        </div>

        <h2
          className="soc-heading font-black leading-[0.9] tracking-tighter text-white"
          style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
        >
          Ikuti
          
          Kami.
        </h2>

        <p className="soc-sub mt-6 text-sm leading-relaxed text-white/35 md:text-base">
          Update produk, promo, dan konten sehari-hari.
        </p>
      </div>

      {/* ── Row list ── */}
      <div className="relative z-10">
        <div className="soc-divider h-px w-full bg-white/10" />

        {SOCIALS.map((s, i) => {
          const isActive = activeId === s.id;
          const isDimmed = !!activeId && !isActive;
          return (
            <div
              key={s.id}
              style={{
                opacity:    isDimmed ? 0.25 : 1,
                transition: "opacity 400ms cubic-bezier(0.23, 1, 0.32, 1)",
              }}
            >
              <Link
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} — ${s.handle}`}
                onMouseEnter={() => setActiveId(s.id)}
                className="soc-row group relative flex items-center gap-5 overflow-hidden py-7 md:gap-8 md:py-9"
              >
                {/* Nomor */}
                <span className="relative z-10 w-7 shrink-0 font-mono text-xs text-white/20 md:w-9 md:text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon platform */}
                <div className="relative z-10 shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 md:h-6 md:w-6"
                    aria-hidden="true"
                    style={{
                      fill:       isActive ? s.color : "rgba(255,255,255,0.45)",
                      transition: "fill 400ms cubic-bezier(0.23, 1, 0.32, 1)",
                    }}
                  >
                    <path d={s.path} />
                  </svg>
                </div>

                {/* Nama platform */}
                <span
                  className="relative z-10 font-black tracking-tighter"
                  style={{
                    fontSize:   "clamp(1.6rem, 4.5vw, 3.75rem)",
                    color:      isActive ? s.color : "white",
                    transition: "color 400ms cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  {s.label}
                </span>

                {/* Spacer */}
                <div className="relative z-10 flex-1" />

                {/* Handle */}
                <span
                  className="relative z-10 hidden font-mono text-sm md:block"
                  style={{
                    color:      isActive ? `${s.color}99` : "rgba(255,255,255,0.3)",
                    transition: "color 400ms cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  {s.handle}
                </span>

                {/* Panah */}
                <span
                  aria-hidden="true"
                  className="relative z-10 shrink-0 text-xl font-light
                    [transition:transform_300ms_cubic-bezier(0.23,1,0.32,1),color_400ms_cubic-bezier(0.23,1,0.32,1)]
                    [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-2"
                  style={{ color: isActive ? s.color : "rgba(255,255,255,0.4)" }}
                >
                  ↗
                </span>
              </Link>

              <div className="soc-divider h-px w-full bg-white/10" />
            </div>
          );
        })}
      </div>

    </section>
  );
}
