"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const milestones = [
  {
    year: "2010",
    title: "Pendirian Sumber Plastik",
    desc: "Berdiri di Jakarta sebagai distributor plastik lokal dengan visi sederhana: pelayanan terbaik, kualitas tidak pernah kompromi.",
  },
  {
    year: "2013",
    title: "Ekspansi Lini Produk",
    desc: "Memperluas portofolio dengan 30+ jenis plastik baru untuk menjawab kebutuhan industri manufaktur yang terus berkembang.",
  },
  {
    year: "2016",
    title: "100+ Client Aktif",
    desc: "Tonggak kepercayaan tercapai — lebih dari 100 perusahaan dari berbagai sektor industri di Pulau Jawa menjadi mitra setia.",
  },
  {
    year: "2019",
    title: "Fasilitas Gudang Baru",
    desc: "Membangun gudang modern seluas 5.000m² untuk meningkatkan kapasitas stok dan mempercepat proses distribusi nasional.",
  },
  {
    year: "2024",
    title: "500+ Client & Transformasi Digital",
    desc: "Meluncurkan platform digital lengkap dengan AI assistant untuk menghadirkan pengalaman terbaik bagi 500+ client setia kami.",
  },
];

export default function Timeline() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".tl-item", {
        opacity: 0,
        y: 20,
        duration: 0.65,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="timeline-heading"
      className="bg-neutral-900/30 px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header — asymmetric */}
        <div className="mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="timeline-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Perjalanan <span className="text-neutral-500">Kami</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-400 lg:text-right">
            14 tahun membangun kepercayaan, satu langkah pada satu waktu.
          </p>
        </div>

        {/* Milestones */}
        <ol role="list">
          {milestones.map((m, i) => {
            const isLatest = i === milestones.length - 1;
            return (
              <li key={m.year} className="tl-item group border-t border-neutral-800 last:border-b">
                <div className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[180px_1fr] md:items-center md:gap-16 md:py-10">

                  {/* Year — large, muted */}
                  <time
                    dateTime={m.year}
                    className={`font-black tracking-tighter transition-colors duration-300 text-6xl md:text-7xl lg:text-8xl ${
                      isLatest
                        ? "text-orange-500/25 group-hover:text-orange-500/40"
                        : "text-neutral-800 group-hover:text-neutral-700"
                    }`}
                  >
                    {m.year}
                  </time>

                  {/* Content */}
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-white transition-colors duration-200 group-hover:text-white md:text-lg">
                      {m.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

      </div>
    </section>
  );
}
