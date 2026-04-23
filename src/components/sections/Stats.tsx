"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: "500+", label: "Client Aktif", desc: "Perusahaan dari berbagai sektor industri" },
  { value: "14+", label: "Tahun Pengalaman", desc: "Melayani industri nasional sejak 2010" },
  { value: "50+", label: "Jenis Produk", desc: "Beragam pilihan plastik berkualitas tinggi" },
  { value: "99%", label: "Tingkat Kepuasan", desc: "Client puas dengan produk dan layanan kami" },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.065,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 78%",
        },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-label="Statistik Sumber Plastik"
      className="border-y border-neutral-800 bg-neutral-900/40 py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <dl className="grid grid-cols-2 gap-px bg-neutral-800 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-item flex flex-col items-center bg-neutral-950 px-4 py-8 text-center sm:px-8 sm:py-10"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="mb-1 text-3xl font-bold text-orange-500 sm:text-4xl md:text-5xl">{s.value}</dd>
              <p className="mb-1 text-sm font-semibold text-white">{s.label}</p>
              <p className="text-xs leading-relaxed text-neutral-500">{s.desc}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
