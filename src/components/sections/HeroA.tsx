"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP);

const products = [
  {
    name: "Plastik PP",
    full: "Polypropylene",
    desc: "Kemasan makanan & industri. Tahan panas hingga 130°C, ringan, dan food-grade tersertifikasi BPOM.",
  },
  {
    name: "Plastik PE",
    full: "Polyethylene",
    desc: "Kantong & film plastik. Fleksibel, kedap air, tersedia dalam varian HDPE, LDPE, dan LLDPE.",
  },
  {
    name: "Plastik PVC",
    full: "Polyvinyl Chloride",
    desc: "Pipa, konstruksi & kabel. Kuat, tahan korosi, serbaguna untuk berbagai aplikasi industri.",
  },
  {
    name: "Plastik ABS",
    full: "Acrylonitrile Butadiene Styrene",
    desc: "Komponen otomotif & elektronik. Kuat benturan tinggi, mudah dibentuk, permukaan halus.",
  },
  {
    name: "Plastik Nylon",
    full: "Polyamide (PA)",
    desc: "Komponen presisi & gear. Tahan aus, kuat tarik tinggi, ideal untuk aplikasi mekanik bergerak.",
  },
  {
    name: "Polycarbonate",
    full: "PC Transparan",
    desc: "Kaca pelindung & cover lampu. Transparan seperti kaca, namun 200× lebih kuat dan ringan.",
  },
];

export default function HeroA() {
  const heroRef = useRef<HTMLElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-overline", { opacity: 0, y: -12, duration: 0.5 })
        .from(".hero-title", { opacity: 0, y: 70, duration: 1.1 }, "-=0.2")
        .from(".hero-rule", { scaleX: 0, duration: 0.7, transformOrigin: "left center" }, "-=0.5")
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.5 }, "-=0.4")
        .from(".hero-panel", { opacity: 0, x: 32, duration: 0.8, ease: "expo.out" }, 0.3);
    },
    { scope: heroRef }
  );

  // Cursor parallax on heading
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
      {/* ── Left column ── */}
      <div className="flex flex-1 flex-col lg:pr-14">
        {/* Overline */}
        <div className="hero-overline mb-14 flex items-center gap-3">
          <span className="h-px w-8 bg-orange-500" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Distributor Resmi &amp; Terpercaya Sejak 2010
          </span>
        </div>

        {/* Headline — wrapped for parallax */}
        <div ref={titleWrapRef} className="will-change-transform">
          <h1 className="hero-title text-5xl font-black leading-[0.93] tracking-tighter text-white sm:text-6xl md:text-7xl">
            Solusi Plastik{" "}
            <span className="text-orange-400">Berkualitas Tinggi</span>{" "}
            <span className="font-bold text-neutral-500">untuk Industri Anda.</span>
          </h1>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom bar */}
        <div>
          <div className="hero-rule mb-8 h-px w-full bg-neutral-800" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <p className="hero-sub max-w-xs text-sm leading-relaxed text-neutral-400">
              Sumber Plastik menyediakan produk plastik premium untuk industri dan rumah tangga.
              Pengiriman cepat ke seluruh Indonesia.
            </p>
            <div className="hero-cta flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={handleWhatsApp}
                className="group relative overflow-hidden rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-500/25 transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-orange-400 hover:shadow-orange-400/40 active:scale-[0.97]"
              >
                <span
                  className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden="true"
                />
                <span className="relative flex items-center gap-2">
                  Hubungi Kami
                  <ArrowRight size={14} className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </button>
              <a
                href="#produk"
                className="rounded-xl border border-neutral-700 px-6 py-3 text-center text-sm font-semibold text-neutral-400 transition-[border-color,color,transform] duration-150 ease-out hover:border-neutral-500 hover:text-white active:scale-[0.97]"
              >
                Lihat Produk
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — product explorer ── */}
      <div className="hero-panel mt-12 shrink-0 lg:mt-0 lg:w-[360px] lg:border-l lg:border-neutral-800 lg:pl-12">
        <div className="flex h-full flex-col">
          {/* Panel label */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Jelajahi Produk
            </span>
            <span className="text-xs text-neutral-700">50+ jenis</span>
          </div>

          {/* Product chips */}
          <div className="mb-6 grid grid-cols-2 gap-2">
            {products.map((p, i) => (
              <button
                key={p.name}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => setActiveIdx(i)}
                aria-pressed={activeIdx === i}
                className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-all duration-200 ${
                  activeIdx === i
                    ? "border-orange-500/40 bg-orange-500/10 text-orange-400"
                    : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:bg-neutral-900 hover:text-neutral-200"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Active product detail */}
          <div className="flex-1 rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 transition-colors duration-200">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-orange-500">
              {active.full}
            </p>
            <p className="mb-3 text-base font-semibold text-white">{active.name}</p>
            <p className="text-sm leading-relaxed text-neutral-400">{active.desc}</p>
          </div>

          {/* Panel CTA */}
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=Halo, saya ingin tanya tentang ${active.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-neutral-800 py-3 text-xs font-medium text-neutral-500 transition-[border-color,color] duration-150 hover:border-orange-500/30 hover:text-orange-400"
          >
            Tanya tentang {active.name}
            <ArrowRight size={12} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
