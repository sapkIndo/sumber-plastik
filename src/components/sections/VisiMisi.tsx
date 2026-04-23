"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, CheckCircle } from "lucide-react";

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
      gsap.from(".vm-card", {
        opacity: 0,
        y: 35,
        duration: 0.7,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="vm-heading"
      className="bg-neutral-900/30 px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
            Fondasi Kami
          </p>
          <h2
            id="vm-heading"
            className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Visi &amp; Misi
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Visi */}
          <article className="vm-card rounded-2xl border border-orange-500/20 bg-orange-500/5 p-8">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15">
              <Target size={20} className="text-orange-500" aria-hidden="true" />
            </div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-500">
              Visi
            </h3>
            <p className="text-xl font-bold leading-snug text-white sm:text-2xl">
              Menjadi distributor plastik terdepan di Indonesia yang memberikan solusi
              inovatif, berkualitas, dan berkelanjutan untuk industri nasional.
            </p>
          </article>

          {/* Misi */}
          <article className="vm-card rounded-2xl border border-neutral-800 bg-neutral-950/80 p-8">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-neutral-800">
              <CheckCircle size={20} className="text-orange-500" aria-hidden="true" />
            </div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-orange-500">
              Misi
            </h3>
            <ul className="space-y-4" role="list">
              {misi.map((m, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500"
                    aria-hidden="true"
                  />
                  <p className="text-sm leading-relaxed text-neutral-300">{m}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
