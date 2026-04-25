"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Direktur",
    company: "PT Maju Jaya",
    quote: "Sumber Plastik menjadi mitra terpercaya kami selama 5 tahun. Kualitas produk konsisten, tidak pernah mengecewakan, dan pengiriman selalu tepat waktu meski volume besar.",
  },
  {
    name: "Sari Dewi",
    role: "Procurement Manager",
    company: "CV Berkah Industri",
    quote: "Harga kompetitif dengan kualitas premium — kombinasi yang jarang ditemukan. Tim sales sangat responsif dan membantu kami menemukan solusi plastik yang paling efisien.",
  },
  {
    name: "Ahmad Fauzi",
    role: "CEO",
    company: "PT Nusantara Manufacturing",
    quote: "Sudah mencoba banyak supplier, tapi Sumber Plastik yang paling konsisten. Produk sesuai spesifikasi, dokumen lengkap, dan after-sales support mereka benar-benar terasa.",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        defaults: { ease: "expo.out" },
      });
      tl.from(".testi-header",      { opacity: 0, y: 25, duration: 0.7 })
        .from(".testi-authors",     { opacity: 0, x: -20, duration: 0.7 }, "-=0.4")
        .from(".testi-quote-panel", { opacity: 0, x: 20,  duration: 0.7 }, "-=0.6");
    },
    { scope: ref }
  );

  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(quoteRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out" });
  }, [activeIdx]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIdx]);

  const active = testimonials[activeIdx];

  return (
    <section ref={ref} aria-labelledby="testi-heading" className="bg-slate-50/60 px-5 py-16 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">

        <div className="testi-header mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="testi-heading" className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Kata Mereka{" "}
            <span className="text-slate-400">tentang Kami</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-slate-600 lg:text-right">
            Kepercayaan 500+ perusahaan adalah bukti komitmen kami terhadap kualitas dan layanan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">

          {/* Author switcher */}
          <nav aria-label="Pilih testimoni" className="testi-authors">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActiveIdx(i)}
                aria-pressed={activeIdx === i}
                className={`group flex w-full flex-col gap-0.5 border-l-2 px-5 py-4 text-left transition-all duration-200 ${
                  activeIdx === i
                    ? "border-blue-600"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <span className={`mb-1 font-mono text-[10px] tabular-nums tracking-widest transition-colors duration-200 ${activeIdx === i ? "text-blue-600" : "text-slate-400"}`}>
                  0{i + 1}
                </span>
                <span className={`text-sm font-semibold transition-colors duration-200 ${activeIdx === i ? "text-slate-900" : "text-slate-600 group-hover:text-slate-800"}`}>
                  {t.name}
                </span>
                <span className={`text-xs transition-colors duration-200 ${activeIdx === i ? "text-slate-600" : "text-slate-400"}`}>
                  {t.role} · {t.company}
                </span>
              </button>
            ))}
          </nav>

          {/* Quote panel */}
          <div className="testi-quote-panel">
            <figure ref={quoteRef}>
              <div className="mb-6 font-serif text-8xl leading-none text-blue-600/20 select-none" aria-hidden="true">
                &ldquo;
              </div>
              <blockquote>
                <p className="text-xl leading-relaxed text-slate-800 md:text-2xl">{active.quote}</p>
              </blockquote>
              <figcaption className="mt-8 border-t border-slate-200 pt-6">
                <p className="text-sm font-semibold text-slate-900">{active.name}</p>
                <p className="text-xs text-slate-500">{active.role} · {active.company}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
