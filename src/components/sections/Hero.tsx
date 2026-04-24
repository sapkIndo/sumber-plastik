"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-overline", { opacity: 0, y: -12, duration: 0.5 })
        .from(".hero-title", { opacity: 0, y: 70, duration: 1.1 }, "-=0.2")
        .from(".hero-rule", { scaleX: 0, duration: 0.8, transformOrigin: "left center" }, "-=0.5")
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.5 }, "-=0.4");
    },
    { scope: heroRef }
  );

  const handleWhatsApp = () => {
    toast.success("Mengarahkan ke WhatsApp...");
    window.open(`https://wa.me/${CONTACT.whatsapp}`, "_blank");
  };

  return (
    <section
      ref={heroRef}
      aria-label="Hero — Pengenalan Sumber Plastik"
      className="flex min-h-svh flex-col overflow-hidden px-6 pb-12 pt-28 md:px-12 lg:px-16"
    >
      {/* Overline — replaces badge pill */}
      <div className="hero-overline mb-14 flex items-center gap-3">
        <span className="h-px w-8 bg-orange-500" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
          Distributor Resmi &amp; Terpercaya Sejak 2010
        </span>
      </div>

      {/* Headline — left-aligned, dominates viewport */}
      <h1 className="hero-title text-5xl font-black leading-[0.93] tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
        Solusi Plastik{" "}
        <span className="text-orange-400">Berkualitas Tinggi</span>{" "}
        <span className="font-bold text-neutral-500">untuk Industri Anda.</span>
      </h1>

      {/* Spacer — pushes bottom bar to viewport bottom */}
      <div className="flex-1" />

      {/* Bottom bar */}
      <div>
        <div className="hero-rule mb-8 h-px w-full bg-neutral-800" />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="hero-sub max-w-sm text-base leading-relaxed text-neutral-400">
            Sumber Plastik menyediakan produk plastik premium untuk kebutuhan industri dan
            rumah tangga. Pengiriman cepat ke seluruh Indonesia dengan jaminan kualitas terbaik.
          </p>
          <div className="hero-cta flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <button
              onClick={handleWhatsApp}
              className="group relative overflow-hidden rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-orange-500/25 transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-orange-400 hover:shadow-orange-400/40 active:scale-[0.97]"
            >
              <span
                className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                aria-hidden="true"
              />
              <span className="relative flex items-center gap-2">
                Hubungi Kami Sekarang
                <ArrowRight size={15} className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </button>
            <a
              href="#produk"
              className="rounded-xl border border-neutral-700 px-7 py-3.5 text-center text-sm font-semibold text-neutral-400 transition-[border-color,color,transform] duration-150 ease-out hover:border-neutral-500 hover:text-white active:scale-[0.97]"
            >
              Lihat Produk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
