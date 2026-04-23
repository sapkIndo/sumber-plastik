"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { toast } from "sonner";
import { ArrowRight, ChevronDown } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.6 })
        .from(".hero-title", { opacity: 0, y: 60, duration: 1 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 30, duration: 0.7 }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 20, scale: 0.96, duration: 0.6 }, "-=0.4")
        .from(".hero-scroll", { opacity: 0, duration: 0.5 }, "-=0.2");
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center"
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-1/3 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/8 blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-orange-400/5 blur-[100px]" />
      </div>

      {/* Badge */}
      <div className="hero-badge mb-7 inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-500/8 px-4 py-1.5 text-sm font-medium text-orange-400">
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
        </span>
        Distributor Resmi &amp; Terpercaya Sejak 2010
      </div>

      {/* Headline */}
      <h1 className="hero-title mb-7 max-w-5xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-7xl">
        Solusi Plastik{" "}
        <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
          Berkualitas Tinggi
        </span>{" "}
        untuk Industri Anda
      </h1>

      {/* Subtitle */}
      <p className="hero-sub mb-10 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
        Sumber Plastik menyediakan produk plastik premium untuk kebutuhan industri dan
        rumah tangga. Pengiriman cepat ke seluruh Indonesia dengan jaminan kualitas terbaik.
      </p>

      {/* CTAs */}
      <div className="hero-cta flex w-full flex-col items-center gap-4 px-4 sm:w-auto sm:flex-row sm:px-0">
        <button
          onClick={handleWhatsApp}
          className="group relative w-full overflow-hidden rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-orange-500/25 transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-orange-400 hover:shadow-orange-400/40 active:scale-[0.97] sm:w-auto"
        >
          <span
            className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
            aria-hidden="true"
          />
          <span className="relative flex items-center justify-center gap-2">
            Hubungi Kami Sekarang
            <ArrowRight size={16} className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </button>
        <a
          href="#produk"
          className="w-full rounded-xl border border-neutral-700 bg-neutral-800/50 px-8 py-4 text-center text-base font-semibold text-neutral-300 backdrop-blur-sm transition-[background-color,border-color,color,transform] duration-150 ease-out hover:border-neutral-500 hover:bg-neutral-700/50 hover:text-white active:scale-[0.97] sm:w-auto"
        >
          Lihat Produk
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2" aria-hidden="true">
        <ChevronDown size={20} className="animate-bounce text-neutral-600" />
      </div>
    </section>
  );
}
