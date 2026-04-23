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
      gsap.from(".timeline-item", {
        opacity: 0,
        x: -30,
        duration: 0.7,
        stagger: 0.07,
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
      className="px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
            Perjalanan Kami
          </p>
          <h2
            id="timeline-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            14 Tahun Membangun{" "}
            <span className="text-neutral-400">Kepercayaan</span>
          </h2>
        </div>

        <ol className="relative ml-4 border-l border-neutral-800" role="list">
          {milestones.map((m, i) => (
            <li key={m.year} className="timeline-item mb-0">
              <div
                className={`relative pl-8 ${i !== milestones.length - 1 ? "pb-12" : ""}`}
              >
                {/* Dot */}
                <div
                  className="absolute -left-[9px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-orange-500 bg-neutral-950"
                  aria-hidden="true"
                />

                <time
                  dateTime={m.year}
                  className="mb-1 block text-xs font-semibold uppercase tracking-widest text-orange-500"
                >
                  {m.year}
                </time>
                <h3 className="mb-2 text-lg font-semibold text-white">{m.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{m.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
