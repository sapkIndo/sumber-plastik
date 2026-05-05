"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// TODO: ganti handle dan href dengan akun asli
const SOCIALS = [
  {
    id:     "instagram",
    label:  "Instagram",
    handle: "@sumber.plastik",
    href:   "https://www.instagram.com/sumber.plastik",
    // Simple Icons — instagram
    path:   "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    id:     "facebook",
    label:  "Facebook",
    handle: "Sumber Aneka Plastik",
    href:   "https://www.facebook.com/sumberanekaplastik",
    // Simple Icons — facebook
    path:   "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    id:     "tiktok",
    label:  "TikTok",
    handle: "@sumberplastik",
    href:   "https://www.tiktok.com/@sumberplastik",
    // Simple Icons — tiktok
    path:   "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
] as const;

export default function SocialMedia() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // ── Entrance (scroll-triggered) ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once:  true,
        },
        defaults: { ease: "expo.out" },
      });

      tl.from(".soc-overline", { opacity: 0, y: -10, duration: 0.5 })
        .from(".soc-heading",  { opacity: 0, y: 28,  duration: 0.7 }, "-=0.3")
        .from(".soc-rule",     { scaleX: 0,          duration: 0.8, transformOrigin: "left center" }, "-=0.5")
        .from(".soc-card",     { opacity: 0, y: 52,  duration: 0.85, stagger: 0.14 }, "-=0.5");

      // ── Ghost icons: slow infinite float, staggered phase ──
      gsap.to(".soc-ghost-0", { y: -18, duration: 3.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".soc-ghost-1", { y: -13, duration: 4.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.1 });
      gsap.to(".soc-ghost-2", { y: -16, duration: 3.8, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2.0 });

      // ── Decorative background elements: slow drift ──
      gsap.to(".soc-deco-a", { y: -10, rotation:  14, duration: 6.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
      gsap.to(".soc-deco-b", { y:  12, rotation:  -9, duration: 7.2, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 1.5 });
      gsap.to(".soc-deco-c", { y:  -7, rotation:   5, duration: 5.5, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 0.8 });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Sosial Media — Sumber Aneka Plastik dan Kemasan"
      className="relative overflow-hidden px-6 py-24 md:px-12 md:py-28 lg:px-16"
    >

      {/* ── Decorative background SVG ── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* Concentric ellipses */}
        <ellipse cx="50%" cy="50%" rx="42%" ry="46%"
          stroke="#2563eb" strokeWidth="1" opacity="0.05" />
        <ellipse cx="50%" cy="50%" rx="29%" ry="32%"
          stroke="#2563eb" strokeWidth="1" strokeDasharray="5 9" opacity="0.06" />

        {/* Corner accent circles */}
        <circle cx="6%"  cy="12%" r="60" stroke="#2563eb" strokeWidth="1"               opacity="0.08" className="soc-deco-a" />
        <circle cx="94%" cy="88%" r="78" stroke="#3b82f6" strokeWidth="1"               opacity="0.06" className="soc-deco-b" />
        <circle cx="94%" cy="12%" r="38" fill="#2563eb"                                 opacity="0.04" className="soc-deco-a" />
        <circle cx="6%"  cy="88%" r="52" stroke="#2563eb" strokeWidth="1" strokeDasharray="3 6" opacity="0.06" className="soc-deco-b" />

        {/* Card separator accent dots */}
        <circle cx="33.3%" cy="50%" r="3" fill="#2563eb" opacity="0.12" className="soc-deco-c" />
        <circle cx="66.6%" cy="50%" r="3" fill="#2563eb" opacity="0.12" className="soc-deco-c" />

        {/* Scattered micro dots */}
        <circle cx="20%"  cy="22%" r="3" fill="#2563eb" opacity="0.08" />
        <circle cx="80%"  cy="78%" r="3" fill="#2563eb" opacity="0.08" />
        <circle cx="50%"  cy="8%"  r="2" fill="#3b82f6" opacity="0.10" />
        <circle cx="11%"  cy="62%" r="2" fill="#2563eb" opacity="0.07" />
        <circle cx="89%"  cy="38%" r="2" fill="#2563eb" opacity="0.07" />
        <circle cx="38%"  cy="90%" r="2" fill="#3b82f6" opacity="0.06" />
        <circle cx="62%"  cy="10%" r="2" fill="#3b82f6" opacity="0.06" />
      </svg>

      {/* ── Header ── */}
      <div className="relative z-10">
        <div className="soc-overline mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
            Sosial Media
          </span>
        </div>

        <h2
          className="soc-heading font-black leading-none tracking-tighter text-slate-900 dark:text-slate-50"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Ikuti Kami.
        </h2>

        <div className="soc-rule mt-8 h-px w-full bg-slate-300 dark:bg-slate-700" />
      </div>

      {/* ── Cards ── */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3">
        {SOCIALS.map((s, i) => (
          <Link
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} — ${s.handle}`}
            className="soc-card group relative flex flex-col items-center justify-center gap-5 px-8 py-16 transition-colors duration-300 hover:bg-blue-50/50 dark:hover:bg-slate-800/40"
          >
            {/* Ghost icon — large, faint, animated */}
            <div
              className={`soc-ghost-${i} pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform`}
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-56 w-56 fill-slate-900 opacity-[0.04] transition-opacity duration-500 group-hover:opacity-[0.08] dark:fill-slate-100 dark:opacity-[0.05] dark:group-hover:opacity-[0.10]"
              >
                <path d={s.path} />
              </svg>
            </div>

            {/* Foreground icon */}
            <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="h-9 w-9 fill-slate-700 dark:fill-slate-300"
                aria-hidden="true"
              >
                <path d={s.path} />
              </svg>
            </div>

            {/* Platform + handle */}
            <div className="relative z-10 text-center">
              <p className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                {s.label}
              </p>
              <p className="mt-1 font-mono text-sm text-slate-400 dark:text-slate-500">
                {s.handle}
              </p>
            </div>

            {/* Hover CTA */}
            <p
              className="relative z-10 translate-y-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
              aria-hidden="true"
            >
              Kunjungi ↗
            </p>
          </Link>
        ))}
      </div>

    </section>
  );
}
