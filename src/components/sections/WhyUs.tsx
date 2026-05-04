"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const SVG_PROPS = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "whyus-svg h-7 w-7 shrink-0 text-blue-600 dark:text-blue-400",
  "aria-hidden": true,
};

const features = [
  {
    svg: (
      <svg {...SVG_PROPS}>
        <path d="M24 6 L38 14 L24 22 L10 14 Z" />
        <path d="M10 14 L10 34 L24 42 L24 22" />
        <path d="M38 14 L38 34 L24 42" />
      </svg>
    ),
    title: "Stok Selalu Tersedia",
    desc: "Gudang kapasitas 5.000m² memastikan stok selalu siap. Tidak perlu khawatir kehabisan di saat kritis.",
  },
  {
    svg: (
      <svg {...SVG_PROPS}>
        <path d="M24 4 L40 10 L40 28 C40 38 24 44 24 44 C24 44 8 38 8 28 L8 10 Z" />
        <path d="M14 24 L21 31 L34 17" />
      </svg>
    ),
    title: "Kualitas Terjamin",
    desc: "Semua produk melewati quality control ketat dan bersertifikat SNI. Konsistensi kualitas adalah prioritas kami.",
  },
  {
    svg: (
      <svg {...SVG_PROPS}>
        <rect x="2" y="18" width="28" height="16" rx="2" />
        <path d="M30 22 L42 22 L46 30 L46 34 L30 34" />
        <path d="M30 22 L38 18 L44 22" />
        <circle cx="10" cy="36" r="4" />
        <circle cx="36" cy="36" r="4" />
        <line x1="2" y1="12" x2="14" y2="12" />
        <line x1="2" y1="8" x2="10" y2="8" />
      </svg>
    ),
    title: "Pengiriman Cepat",
    desc: "Jaringan logistik handal ke seluruh Indonesia. Jabodetabek 1–2 hari, luar Jawa 3–7 hari kerja.",
  },
  {
    svg: (
      <svg {...SVG_PROPS}>
        <path d="M6 6 L36 6 L42 24 L36 42 L6 42 Z" />
        <circle cx="30" cy="14" r="4" />
        <line x1="12" y1="26" x2="30" y2="26" />
        <line x1="12" y1="34" x2="24" y2="34" />
      </svg>
    ),
    title: "Harga Kompetitif",
    desc: "Langsung dari produsen tanpa perantara. Dapatkan harga terbaik di pasar dengan kualitas yang tidak berkompromi.",
  },
  {
    svg: (
      <svg {...SVG_PROPS}>
        <path d="M8 8 L40 8 L40 30 L28 30 L24 38 L20 30 L8 30 Z" />
        <line x1="14" y1="18" x2="34" y2="18" />
        <line x1="14" y1="24" x2="26" y2="24" />
      </svg>
    ),
    title: "Konsultasi Gratis",
    desc: "Tim ahli kami siap membantu memilih produk yang tepat untuk kebutuhan spesifik bisnis Anda.",
  },
  {
    svg: (
      <svg {...SVG_PROPS}>
        <path d="M10 20 C10 10 17 6 24 6 C31 6 38 10 38 20" />
        <polyline points="34,16 38,20 34,24" />
        <path d="M38 28 C38 38 31 42 24 42 C17 42 10 38 10 28" />
        <polyline points="14,24 10,28 14,32" />
      </svg>
    ),
    title: "After-Sales Support",
    desc: "Kami tidak berhenti setelah transaksi. Dukungan purna jual tersedia untuk memastikan kepuasan Anda.",
  },
];

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".whyus-heading", {
        opacity: 0, y: 30, duration: 0.7, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });

      gsap.from(".whyus-item", {
        opacity: 0, y: 20, duration: 0.55, stagger: 0.07, ease: "expo.out",
        scrollTrigger: { trigger: ".whyus-list", start: "top 78%", once: true },
      });

      gsap.utils.toArray<HTMLElement>(".whyus-item").forEach((item, i) => {
        const strokes = item.querySelectorAll("path, circle, rect, line, polyline");
        gsap.fromTo(
          strokes,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 1.2,
            ease: "power2.inOut",
            stagger: 0.1,
            delay: i * 0.07,
            scrollTrigger: { trigger: ".whyus-list", start: "top 78%", once: true },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-labelledby="whyus-heading" className="px-5 py-16 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="whyus-heading mb-12 flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">Mengapa Kami</p>
            <h2
              id="whyus-heading"
              className="font-black leading-tight tracking-tight text-slate-900 dark:text-slate-50"
              style={{ fontSize: "clamp(1.875rem, 2vw + 1.25rem, 3rem)" }}
            >
              Kenapa Ribuan Bisnis{" "}
              <span className="text-slate-400 dark:text-slate-500">Mempercayai Kami</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400 lg:text-right">
            Kami bukan sekadar supplier. Kami adalah mitra bisnis yang berkomitmen pada
            pertumbuhan jangka panjang bersama Anda.
          </p>
        </div>

        {/* Feature list — 2-col grid with dividers, no cards */}
        <ul className="whyus-list grid grid-cols-1 md:grid-cols-2" role="list">
          {features.map((f, i) => {
            const isRight   = i % 2 !== 0;
            const isLastRow = i >= features.length - 2;
            return (
            <li
              key={f.title}
              className={[
                "whyus-item group flex gap-5 py-7 transition-colors duration-200 hover:bg-slate-50/70 dark:hover:bg-slate-800/20",
                "border-b border-slate-300 dark:border-slate-800/70 last:border-b-0",
                isRight   ? "md:border-l md:border-slate-300 dark:md:border-slate-800/70 md:pl-8 md:pr-0" : "md:pl-0 md:pr-8",
                isLastRow ? "md:border-b-0" : "",
              ].filter(Boolean).join(" ")}
            >
              {/* Number + icon */}
              <div className="flex shrink-0 flex-col items-center gap-2 pt-0.5">
                <span className="font-mono text-[10px] tabular-nums text-slate-400 dark:text-slate-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.svg}
              </div>

              {/* Text */}
              <div className="min-w-0">
                <h3 className="mb-1.5 text-base font-semibold text-slate-900 dark:text-slate-50">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {f.desc}
                </p>
              </div>
            </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}
