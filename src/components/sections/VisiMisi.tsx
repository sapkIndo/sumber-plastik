"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const misi = [
  "Menyediakan produk plastik dan kemasan lengkap untuk segala kebutuhan usaha, dari skala kecil hingga besar, dengan kualitas unggul dan harga bersaing.",
  "Menjadi one-stop solution yang memudahkan pelanggan dengan layanan cepat, aman, dan efisien di seluruh Indonesia.",
  "Membangun kepercayaan melalui transparansi, profesionalisme, dan konsistensi dalam setiap transaksi.",
  "Terus berinovasi dalam produk dan layanan untuk mendukung pertumbuhan bisnis pelanggan kami.",
  "Menjadi rekan yang selalu diingat karena solusi lengkap, pelayanan prima, dan kepedulian terhadap kesuksesan setiap pelanggan.",
];

export default function VisiMisi() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current!;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
        defaults: { ease: "expo.out" },
      });
      tl.from(".vm-header",   { opacity: 0, y: 25, duration: 0.7 })
        .from(".vm-visi",     { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".vm-misi-row", { opacity: 0, x: -14, duration: 0.55, stagger: 0.07 }, "-=0.4");

      // DrawSVG — concentric rings expand outward from inner to outer
      gsap.fromTo(
        gsap.utils.toArray<SVGCircleElement>(".vm-visi-ring", root),
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 2,
          ease: "power2.inOut",
          stagger: 0.28,
          scrollTrigger: { trigger: ".vm-visi", start: "top 80%", once: true },
        }
      );

      // DrawSVG — checkmark draws into each misi row, delayed to match row entrance
      gsap.utils.toArray<HTMLElement>(".vm-misi-row", root).forEach((row, i) => {
        const strokes = row.querySelectorAll(".vm-misi-check path, .vm-misi-check polyline");
        gsap.fromTo(
          strokes,
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.07 + 0.45,
            scrollTrigger: { trigger: root, start: "top 75%", once: true },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-labelledby="vm-heading" className="px-5 py-16 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">

        <div className="vm-header mb-0 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="vm-heading" className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl lg:text-5xl">
            Visi <span className="text-slate-400 dark:text-slate-500">&amp; Misi</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400 lg:text-right">
            Fondasi yang mengarahkan setiap keputusan bisnis dan standar layanan kami.
          </p>
        </div>

        {/* Visi */}
        <div className="vm-visi relative mt-14 overflow-hidden border-b border-t border-slate-200 pb-12 pt-12 dark:border-slate-700">
          <p className="mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">Visi</span>
          </p>
          <p className="relative z-10 max-w-4xl text-2xl font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl md:text-4xl">
            Menjadi toko plastik dan kemasan{" "}
            <span className="text-blue-600">nomor satu di Indonesia</span>{" "}
            yang dikenal karena kualitas, inovasi, dan layanan lengkap, sehingga setiap pelaku usaha merasa aman, praktis, dan puas ketika memilih kami sebagai mitra terpercaya.
          </p>

          {/* Decorative concentric rings */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 select-none"
          >
            <svg
              viewBox="0 0 340 340"
              width="340"
              height="340"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-blue-600 opacity-[0.11]"
            >
              <circle className="vm-visi-ring" cx="170" cy="170" r="38" />
              <circle className="vm-visi-ring" cx="170" cy="170" r="76" />
              <circle className="vm-visi-ring" cx="170" cy="170" r="114" />
              <circle className="vm-visi-ring" cx="170" cy="170" r="152" />
            </svg>
          </div>
        </div>

        {/* Misi */}
        <div className="pt-10">
          <p className="mb-8 flex items-center gap-3">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-600">Misi</span>
          </p>

          <ul role="list">
            {misi.map((m, i) => (
              <li key={i} className="vm-misi-row group border-t border-slate-100 py-5 first:border-t-0 dark:border-slate-800">
                <div className="flex items-start gap-6 md:items-center">
                  <div className="flex w-8 shrink-0 flex-col items-start gap-1 md:w-10">
                    <span className="font-mono text-xs tabular-nums text-slate-400 transition-colors duration-200 group-hover:text-blue-600 dark:text-slate-500">
                      0{i + 1}
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 18 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="vm-misi-check h-2.5 w-3.5 text-blue-600 opacity-70"
                    >
                      <polyline points="1,6 6,11 17,1" />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700 transition-colors duration-200 group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-slate-50 md:text-base">
                    {m}
                  </p>
                </div>
              </li>
            ))}
            <li className="border-t border-slate-100 dark:border-slate-800" role="presentation" />
          </ul>
        </div>
      </div>
    </section>
  );
}
