"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const misi = [
  "Menyediakan produk plastik berkualitas tinggi dengan harga yang kompetitif",
  "Membangun kemitraan jangka panjang yang saling menguntungkan dengan setiap client",
  "Menghadirkan layanan pengiriman yang cepat dan andal ke seluruh wilayah Indonesia",
  "Menerapkan standar quality control tertinggi di setiap produk yang kami distribusikan",
  "Berinovasi secara berkelanjutan untuk mengikuti perkembangan kebutuhan industri",
];

export default function VisiMisi() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        defaults: { ease: "expo.out" },
      });
      tl.from(".vm-header", { opacity: 0, y: 25, duration: 0.7 })
        .from(".vm-visi", { opacity: 0, y: 30, duration: 0.8 }, "-=0.4")
        .from(".vm-misi-row", {
          opacity: 0,
          x: -14,
          duration: 0.55,
          stagger: 0.07,
        }, "-=0.4");
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="vm-heading"
      className="px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header — asymmetric */}
        <div className="vm-header mb-0 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="vm-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Visi <span className="text-neutral-500">&amp; Misi</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-400 lg:text-right">
            Fondasi yang mengarahkan setiap keputusan bisnis dan standar layanan kami.
          </p>
        </div>

        {/* Visi block */}
        <div className="vm-visi mt-14 border-t border-neutral-800 pt-12 pb-12 border-b">
          <p className="mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-orange-500" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
              Visi
            </span>
          </p>
          <p className="max-w-4xl text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl md:text-4xl">
            Menjadi distributor plastik{" "}
            <span className="text-orange-400">terdepan di Indonesia</span>{" "}
            yang memberikan solusi inovatif, berkualitas, dan berkelanjutan
            untuk industri nasional.
          </p>
        </div>

        {/* Misi block */}
        <div className="pt-10">
          <p className="mb-8 flex items-center gap-3">
            <span className="h-px w-6 bg-orange-500" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-500">
              Misi
            </span>
          </p>

          <ul role="list">
            {misi.map((m, i) => (
              <li
                key={i}
                className="vm-misi-row group border-t border-neutral-800 py-5 first:border-t-0"
              >
                <div className="flex items-start gap-6 md:items-center">
                  <span className="w-8 shrink-0 font-mono text-xs tabular-nums text-neutral-700 transition-colors duration-200 group-hover:text-orange-500 md:w-10">
                    0{i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-neutral-300 transition-colors duration-200 group-hover:text-white md:text-base">
                    {m}
                  </p>
                </div>
              </li>
            ))}
            <li className="border-t border-neutral-800" role="presentation" />
          </ul>
        </div>

      </div>
    </section>
  );
}
