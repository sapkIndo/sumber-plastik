"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { value: 500, suffix: "+", label: "Client Aktif",     desc: "Perusahaan dari berbagai sektor industri" },
  { value: 14,  suffix: "+", label: "Tahun Pengalaman", desc: "Melayani industri nasional sejak 2010" },
  { value: 50,  suffix: "+", label: "Jenis Produk",     desc: "Beragam pilihan plastik berkualitas tinggi" },
  { value: 99,  suffix: "%", label: "Tingkat Kepuasan", desc: "Client puas dengan produk dan layanan kami" },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.065,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });

      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          snap: { val: 1 },
          scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
          onUpdate() {
            el.textContent = Math.round(obj.val) + stat.suffix;
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-label="Statistik Sumber Plastik"
      className="border-y border-slate-200 bg-white/70 py-16 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-6">
        <dl className="grid grid-cols-2 gap-px bg-slate-200 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-item flex flex-col items-center bg-white px-4 py-8 text-center sm:px-8 sm:py-10"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd
                ref={(el) => { numberRefs.current[i] = el; }}
                className="mb-1 text-3xl font-black text-blue-600 sm:text-4xl md:text-5xl"
                aria-label={`${s.value}${s.suffix}`}
              >
                0{s.suffix}
              </dd>
              <p className="mb-1 text-sm font-semibold text-slate-900">{s.label}</p>
              <p className="text-xs leading-relaxed text-slate-500">{s.desc}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
