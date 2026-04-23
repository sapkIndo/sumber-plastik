"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Direktur",
    company: "PT Maju Jaya",
    quote:
      "Sumber Plastik menjadi mitra terpercaya kami selama 5 tahun. Kualitas produk konsisten, tidak pernah mengecewakan, dan pengiriman selalu tepat waktu meski volume besar.",
    rating: 5,
  },
  {
    name: "Sari Dewi",
    role: "Procurement Manager",
    company: "CV Berkah Industri",
    quote:
      "Harga kompetitif dengan kualitas premium — kombinasi yang jarang ditemukan. Tim sales sangat responsif dan membantu kami menemukan solusi plastik yang paling efisien.",
    rating: 5,
  },
  {
    name: "Ahmad Fauzi",
    role: "CEO",
    company: "PT Nusantara Manufacturing",
    quote:
      "Sudah mencoba banyak supplier, tapi Sumber Plastik yang paling konsisten. Produk sesuai spesifikasi, dokumen lengkap, dan after-sales support mereka benar-benar terasa.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".testi-card", {
        opacity: 0,
        y: 40,
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
      aria-labelledby="testi-heading"
      className="bg-neutral-900/30 px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
            Testimoni
          </p>
          <h2
            id="testi-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Kata Mereka tentang{" "}
            <span className="text-neutral-400">Sumber Plastik</span>
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3" role="list">
          {testimonials.map((t) => (
            <li key={t.name} className="testi-card">
              <figure className="flex h-full flex-col rounded-2xl border border-neutral-800 bg-neutral-950/80 p-7">
                <div className="mb-5 flex gap-0.5" aria-label={`Rating ${t.rating} dari 5 bintang`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-orange-500 text-orange-500"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="flex-1">
                  <p className="text-sm leading-relaxed text-neutral-300">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-800 pt-5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-sm font-bold text-orange-500"
                    aria-hidden="true"
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-neutral-500">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
