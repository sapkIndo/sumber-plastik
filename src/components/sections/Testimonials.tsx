"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const testimonials = [
  {
    name: "Agus Setiawan",
    role: "Direktur",
    company: "PT. S***** M*****",
    quote:
      "Sudah lebih dari 5 tahun kami percayakan kebutuhan kemasan ke sini. Kualitasnya konsisten, pengiriman tidak pernah telat meski orderan kami besar. Benar-benar partner yang bisa diandalkan.",
    photo: "https://api.dicebear.com/9.x/notionists/png?seed=AgusSetiawan&size=128",
  },
  {
    name: "Laila Rahmawati",
    role: "Procurement Manager",
    company: "CV. B***** I*****",
    quote:
      "Harga bersaing, kualitas tidak pernah mengecewakan. Tim-nya juga cepat respons kalau ada pertanyaan soal spesifikasi — ini yang bikin kami terus balik ke sini.",
    photo: "https://api.dicebear.com/9.x/notionists/png?seed=LailaRahmawati&size=128",
  },
  {
    name: "Ferdi Nugroho",
    role: "CEO",
    company: "PT. N***** M*****",
    quote:
      "Pernah coba beberapa supplier lain, tapi ujung-ujungnya balik ke sini. Produknya sesuai spek, dokumen lengkap, dan after-sales-nya terasa — bukan sekadar janji.",
    photo: "https://api.dicebear.com/9.x/notionists/png?seed=FerdiNugroho&size=128",
  },
  {
    name: "Wulan Prasetyo",
    role: "Manajer Operasional",
    company: "CV. M***** S*****",
    quote:
      "Pelayanannya ramah tapi tetap profesional. Kalau ada masalah, langsung ditangani — tidak perlu follow-up berkali-kali. Itu yang penting buat kami.",
    photo: "https://api.dicebear.com/9.x/notionists/png?seed=WulanPrasetyo&size=128",
  },
  {
    name: "Eko Kurniawan",
    role: "Purchasing Manager",
    company: "PT. A***** F*****",
    quote:
      "Stok selalu ready, tidak pernah sampai kehabisan di saat kami butuh cepat. Sudah 3 tahun lebih bermitra dan belum ada kejadian yang bikin produksi kami terhambat.",
    photo: "https://api.dicebear.com/9.x/notionists/png?seed=EkoKurniawan&size=128",
  },
  {
    name: "Nisa Permata",
    role: "Owner",
    company: "UD. K***** B*****",
    quote:
      "Usaha kami masih skala menengah, tapi tidak pernah diperlakukan sebelah mata. Pesanan kecil pun dilayani dengan serius. Sangat cocok untuk bisnis yang masih berkembang.",
    photo: "https://api.dicebear.com/9.x/notionists/png?seed=NisaPermata&size=128",
  },
  {
    name: "Rendra Mahardika",
    role: "Manajer Produksi",
    company: "PT. T***** P*****",
    quote:
      "Dimensi dan bahan kemasan selalu sesuai dengan yang kami minta. Tidak ada miskomunikasi soal spesifikasi — ini kelihatan sepele tapi dampaknya besar ke lini produksi kami.",
    photo: "https://api.dicebear.com/9.x/notionists/png?seed=RendraMahardika&size=128",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
        defaults: { ease: "expo.out" },
      });
      tl.from(".testi-header", { opacity: 0, y: 28, duration: 0.7 })
        .from(".testi-tab", { opacity: 0, y: 14, duration: 0.45, stagger: 0.1 }, "-=0.4")
        .from(".testi-progress-track", { opacity: 0, duration: 0.4 }, "-=0.15")
        .from(".testi-card", { opacity: 0, y: 24, duration: 0.6 }, "-=0.3");
    },
    { scope: sectionRef }
  );

  /* quote crossfade on tab change */
  useEffect(() => {
    if (!quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }
    );
  }, [activeIdx]);

  /* progress bar + auto-advance */
  useEffect(() => {
    if (progressTweenRef.current) progressTweenRef.current.kill();

    const bar = document.getElementById("testi-progress-fill");
    if (!bar) return;

    gsap.set(bar, { scaleX: 0 });

    progressTweenRef.current = gsap.to(bar, {
      scaleX: 1,
      duration: 6,
      ease: "none",
      transformOrigin: "left center",
      onComplete: () =>
        setActiveIdx((prev) => (prev + 1) % testimonials.length),
    });

    return () => {
      progressTweenRef.current?.kill();
    };
  }, [activeIdx]);

  const handleSelect = useCallback((i: number) => setActiveIdx(i), []);
  const active = testimonials[activeIdx];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testi-heading"
      className="py-16 md:py-28"
    >
      <div className="mx-auto max-w-4xl px-5 md:px-6">

        {/* ── Header ── */}
        <div className="testi-header mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Testimoni
          </p>
          <h2
            id="testi-heading"
            className="mb-4 font-black tracking-tight text-slate-900 dark:text-slate-50"
            style={{ fontSize: "clamp(1.875rem, 2vw + 1.25rem, 3rem)" }}
          >
            Kata Mereka{" "}
            <span className="text-slate-400 dark:text-slate-500">tentang Kami</span>
          </h2>
          <p className="mx-auto max-w-md text-base text-slate-600 dark:text-slate-400">
            Kepercayaan 500+ perusahaan adalah bukti komitmen kami terhadap kualitas dan layanan.
          </p>
        </div>

        {/* ── Author tabs ── */}
        <nav
          aria-label="Pilih testimoni"
          className="mb-6 flex flex-wrap items-center justify-center gap-3"
        >
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              onClick={() => handleSelect(i)}
              aria-pressed={activeIdx === i}
              className={`testi-tab flex items-center gap-2.5 rounded-full border px-3 py-2.5 text-sm font-medium transition-all duration-300 sm:px-4 ${
                activeIdx === i
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600"
              }`}
            >
              <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full" aria-hidden="true">
                <Image src={t.photo} alt={t.name} fill sizes="24px" className="object-cover" />
              </span>
              <span className="hidden sm:inline">{t.name}</span>
            </button>
          ))}
        </nav>

        {/* ── Progress track ── */}
        <div className="testi-progress-track mx-auto mb-10 h-0.5 max-w-[200px] overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            id="testi-progress-fill"
            className="h-full origin-left scale-x-0 rounded-full bg-blue-600"
          />
        </div>

        {/* ── Quote card ── */}
        <div className="testi-card relative">

          {/* SVG decorative quote mark — top-left, very faded */}
          <svg
            className="pointer-events-none absolute -left-3 -top-8 h-36 w-36 text-blue-600/[0.07] md:-left-8 md:-top-12 md:h-52 md:w-52"
            viewBox="0 0 80 64"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 64V38.4C0 21.6 8 11.2 24 4.8L28 11.2C20 14.4 16 20.8 16 30.4H30.4V64H0ZM44.8 64V38.4C44.8 21.6 52.8 11.2 68.8 4.8L72.8 11.2C64.8 14.4 60.8 20.8 60.8 30.4H75.2V64H44.8Z" />
          </svg>

          {/* SVG decorative accent — bottom-right, very faded */}
          <svg
            className="pointer-events-none absolute -bottom-8 -right-3 h-24 w-24 rotate-180 text-slate-300/60 dark:text-slate-600/60 md:-bottom-10 md:-right-8 md:h-36 md:w-36"
            viewBox="0 0 80 64"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 64V38.4C0 21.6 8 11.2 24 4.8L28 11.2C20 14.4 16 20.8 16 30.4H30.4V64H0ZM44.8 64V38.4C44.8 21.6 52.8 11.2 68.8 4.8L72.8 11.2C64.8 14.4 60.8 20.8 60.8 30.4H75.2V64H44.8Z" />
          </svg>

          <div
            ref={quoteRef}
            className="relative rounded-2xl border border-slate-200 bg-white px-8 py-10 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-950/40 md:px-14 md:py-14"
          >
            {/* Stars */}
            <div className="mb-6 flex gap-1" aria-label="Rating 5 bintang">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              ))}
            </div>

            <figure>
              <blockquote>
                <p className="leading-relaxed text-slate-800 dark:text-slate-100" style={{ fontSize: "clamp(1.125rem, 2vw + 0.5rem, 1.875rem)" }}>
                  &ldquo;{active.quote}&rdquo;
                </p>
              </blockquote>

              <figcaption className="mt-10 flex items-center gap-4 border-t border-slate-100 pt-8 dark:border-slate-700">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-blue-100 dark:ring-slate-700" aria-hidden="true">
                  <Image src={active.photo} alt={active.name} fill sizes="48px" className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-50">{active.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {active.role} · {active.company}
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>

      </div>
    </section>
  );
}
