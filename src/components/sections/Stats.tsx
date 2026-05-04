"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats: { num: number; sep: boolean; suffix: string; label: string; desc: string }[] = [
  { num: 5000, sep: true,  suffix: "+", label: "Client Aktif",     desc: "Dari UKM hingga korporasi nasional"          },
  { num: 16,   sep: false, suffix: "+", label: "Tahun Pengalaman", desc: "Melayani industri Indonesia sejak 2010"      },
  { num: 1000, sep: true,  suffix: "+", label: "Jenis Produk",     desc: "PP, PET, HDPE, PVC, LLDPE, PS, dan lainnya" },
  { num: 99,   sep: false, suffix: "%", label: "Tingkat Kepuasan", desc: "Berdasarkan survei kepuasan tahunan kami"    },
];

function fmt(n: number, sep: boolean, suffix: string) {
  return (sep ? n.toLocaleString("id-ID") : String(n)) + suffix;
}

export default function Stats() {
  const ref     = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      // Set starting state before first paint — elements invisible, numbers at zero
      gsap.set(".stat-item", { opacity: 0, y: 24 });
      numRefs.current.forEach((el, i) => {
        if (el) el.textContent = `0${stats[i].suffix}`;
      });

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 78%",
        once: true,
        onEnter: () => {
          // Fade-in each card with stagger
          gsap.to(".stat-item", {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.07,
            ease: "expo.out",
          });

          // Count-up numbers, staggered to match card entrance
          stats.forEach((stat, i) => {
            const el = numRefs.current[i];
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.num,
              duration: 1.8,
              ease: "power2.out",
              delay: i * 0.07,
              onUpdate() {
                el.textContent = fmt(Math.round(obj.val), stat.sep, stat.suffix);
              },
            });
          });
        },
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

        {/* Stats strip */}
        <dl className="grid grid-cols-2 divide-x divide-y divide-slate-300 dark:divide-slate-700/60 lg:grid-cols-4 lg:divide-y-0">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-item flex flex-col px-6 py-8 first:pl-0 lg:last:pr-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd
                ref={(el) => { numRefs.current[i] = el; }}
                className="mb-1 text-3xl font-black text-blue-600 dark:text-blue-400"
                aria-label={fmt(s.num, s.sep, s.suffix)}
              >
                {fmt(s.num, s.sep, s.suffix)}
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
