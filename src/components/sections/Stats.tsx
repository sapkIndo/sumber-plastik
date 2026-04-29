"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats: { value: string; label: string; desc: string }[] = [
  { value: "5.000+", label: "Client Aktif",     desc: "Dari UKM hingga korporasi nasional"          },
  { value: "16+",    label: "Tahun Pengalaman", desc: "Melayani industri Indonesia sejak 2010"      },
  { value: "1.000+", label: "Jenis Produk",     desc: "PP, PET, HDPE, PVC, LLDPE, PS, dan lainnya" },
  { value: "99%",    label: "Tingkat Kepuasan", desc: "Berdasarkan survei kepuasan tahunan kami"    },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-label="Statistik Sumber Aneka Plastik dan Kemasan"
      className="py-16 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Statement */}
        <div className="stat-item mb-14 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600">
            Keunggulan Utama
          </p>
          <p className="font-black tracking-tight text-slate-900 dark:text-slate-50" style={{ fontSize: "clamp(1.875rem, 2vw + 1.25rem, 3rem)" }}>
            Distributor{" "}
            <span className="text-blue-600">Tangan Pertama</span>
          </p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 md:text-base">
            Langsung dari pabrik · tanpa perantara · harga paling kompetitif
          </p>
        </div>

        {/* Stats strip — compact, no giant hero numbers */}
        <dl className="grid grid-cols-2 divide-x divide-y divide-slate-200 dark:divide-slate-700/60 lg:grid-cols-4 lg:divide-y-0">
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-item flex flex-col px-6 py-8 first:pl-0 lg:last:pr-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd
                className="mb-1 text-3xl font-black text-blue-600 dark:text-blue-400"
                aria-label={s.value}
              >
                {s.value}
              </dd>
              <dd className="text-sm font-semibold text-slate-900 dark:text-slate-50">{s.label}</dd>
              <dd className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{s.desc}</dd>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}
