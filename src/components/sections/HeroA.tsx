"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP);

const products = [
  { name: "Plastik PP",    full: "Polypropylene",                   desc: "Kemasan makanan & industri. Tahan panas hingga 130°C, ringan, dan food-grade tersertifikasi BPOM." },
  { name: "Plastik PE",    full: "Polyethylene",                    desc: "Kantong & film plastik. Fleksibel, kedap air, tersedia dalam varian HDPE, LDPE, dan LLDPE." },
  { name: "Plastik PVC",   full: "Polyvinyl Chloride",              desc: "Pipa, konstruksi & kabel. Kuat, tahan korosi, serbaguna untuk berbagai aplikasi industri." },
  { name: "Plastik ABS",   full: "Acrylonitrile Butadiene Styrene", desc: "Komponen otomotif & elektronik. Kuat benturan tinggi, mudah dibentuk, permukaan halus." },
  { name: "Plastik Nylon", full: "Polyamide (PA)",                  desc: "Komponen presisi & gear. Tahan aus, kuat tarik tinggi, ideal untuk aplikasi mekanik bergerak." },
  { name: "Polycarbonate", full: "PC Transparan",                   desc: "Kaca pelindung & cover lampu. Transparan seperti kaca, namun 200× lebih kuat dan ringan." },
];

export default function HeroA() {
  const heroRef = useRef<HTMLElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-overline", { opacity: 0, y: -12, duration: 0.5 })
        .from(".hero-title",    { opacity: 0, y: 70,  duration: 1.1 }, "-=0.2")
        .from(".hero-rule",     { scaleX: 0, duration: 0.7, transformOrigin: "left center" }, "-=0.5")
        .from(".hero-sub",      { opacity: 0, y: 16,  duration: 0.6 }, "-=0.4")
        .from(".hero-cta",      { opacity: 0, y: 16,  duration: 0.5 }, "-=0.4")
        .from(".hero-panel",    { opacity: 0, x: 32,  duration: 0.8, ease: "expo.out" }, 0.3);
    },
    { scope: heroRef }
  );

  useEffect(() => {
    const el = titleWrapRef.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      xTo((e.clientX / window.innerWidth - 0.5) * 18);
      yTo((e.clientY / window.innerHeight - 0.5) * 9);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleWhatsApp = () => {
    toast.success("Mengarahkan ke WhatsApp...");
    window.open(`https://wa.me/${CONTACT.whatsapp}`, "_blank");
  };

  const active = products[activeIdx];

  return (
    <section
      ref={heroRef}
      aria-label="Hero — Pengenalan Sumber Plastik"
      className="flex min-h-svh flex-col overflow-hidden px-6 pb-12 pt-28 md:px-12 lg:flex-row lg:items-stretch lg:px-16"
    >
      {/* Left column */}
      <div className="flex flex-1 flex-col lg:pr-14">
        <div className="hero-overline mb-14 flex items-center gap-3">
          <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            Distributor Resmi &amp; Terpercaya Sejak 2010
          </span>
        </div>

        <div ref={titleWrapRef} className="will-change-transform">
          <h1 className="hero-title text-5xl font-black leading-[0.93] tracking-tighter text-slate-900 sm:text-6xl md:text-7xl">
            Solusi Plastik{" "}
            <span className="text-blue-600">Berkualitas Tinggi</span>{" "}
            <span className="font-bold text-slate-400">untuk Industri Anda.</span>
          </h1>
        </div>

        <div className="flex-1" />

        <div>
          <div className="hero-rule mb-8 h-px w-full bg-slate-300" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="hero-sub max-w-xs text-sm leading-relaxed text-slate-600">
              Sumber Plastik menyediakan produk plastik premium untuk industri dan rumah tangga.
              Pengiriman cepat ke seluruh Indonesia.
            </p>
            <div className="hero-cta flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={handleWhatsApp}
                className="group relative overflow-hidden rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-blue-600/20 transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-blue-500 hover:shadow-blue-500/25 active:scale-[0.97]"
              >
                <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" aria-hidden="true" />
                <span className="relative flex items-center gap-2">
                  Hubungi Kami
                  <ArrowRight size={14} className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </button>
              <a
                href="#produk"
                className="rounded-xl border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-600 transition-[border-color,color,transform] duration-150 ease-out hover:border-slate-400 hover:text-slate-900 active:scale-[0.97]"
              >
                Lihat Produk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="hero-panel mt-12 shrink-0 lg:mt-0 lg:w-[360px] lg:border-l lg:border-slate-200 lg:pl-12">
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Jelajahi Produk</span>
            <span className="text-xs text-slate-300">50+ jenis</span>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-2">
            {products.map((p, i) => (
              <button
                key={p.name}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                aria-pressed={activeIdx === i}
                className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-all duration-200 ${
                  activeIdx === i
                    ? "border-blue-500/40 bg-blue-600/10 text-blue-600"
                    : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white hover:text-slate-900"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="flex-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-200">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-blue-600">{active.full}</p>
            <p className="mb-3 text-base font-semibold text-slate-900">{active.name}</p>
            <p className="text-sm leading-relaxed text-slate-600">{active.desc}</p>
          </div>

          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=Halo, saya ingin tanya tentang ${active.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-3 text-xs font-medium text-slate-500 transition-[border-color,color] duration-150 hover:border-blue-300 hover:text-blue-600"
          >
            Tanya tentang {active.name}
            <ArrowRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
