"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Users, Award, Package, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats: { value: number; suffix: string; label: string; desc: string; icon: LucideIcon }[] = [
  { value: 5000, suffix: "+", label: "Client Aktif",     desc: "Dari UKM hingga korporasi nasional",       icon: Users   },
  { value: 16,  suffix: "+", label: "Tahun Pengalaman", desc: "Melayani industri Indonesia sejak 2010",   icon: Award   },
  { value: 1000, suffix: "+", label: "Jenis Produk",     desc: "PP, PET, HDPE, PVC, LLDPE, PS, dan lainnya",    icon: Package },
  { value: 99,  suffix: "%", label: "Tingkat Kepuasan", desc: "Berdasarkan survei kepuasan tahunan kami", icon: Star    },
];

export default function Stats() {
  const ref = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLElement | null)[]>([]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });

      tl.from(".stat-item", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.065,
        ease: "expo.out",
      });

      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        tl.to(
          obj,
          {
            val: stat.value,
            duration: 2,
            ease: "power2.out",
            onUpdate() {
              el.textContent = Math.round(obj.val) + stat.suffix;
            },
          },
          0
        );
      });
    },
    { scope: ref }
  );

  numberRefs.current = [];

  return (
    <section
      ref={ref}
      aria-label="Statistik Sumber Aneka Plastik dan Kemasan"
      className="py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <dl className="grid grid-cols-2 divide-x divide-y divide-slate-200 dark:divide-slate-700/60 lg:grid-cols-4 lg:divide-y-0">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="stat-item flex flex-col items-center px-6 py-10 text-center sm:px-10"
              >
                <div
                  className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/60 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  aria-hidden="true"
                >
                  <Icon size={18} />
                </div>
                <dt className="sr-only">{s.label}</dt>
                <dd
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className="mb-1 text-3xl font-black text-blue-600 dark:text-blue-400 sm:text-4xl md:text-5xl"
                  aria-label={`${s.value}${s.suffix}`}
                >
                  0{s.suffix}
                </dd>
                <p className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">{s.label}</p>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{s.desc}</p>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
