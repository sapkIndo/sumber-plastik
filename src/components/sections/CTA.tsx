"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".cta-content", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative overflow-hidden px-5 py-16 md:px-6 md:py-28"
    >
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="animate-glow-pulse absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/8 blur-[120px]" />
      </div>

      <div className="cta-content mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-orange-500">
          Mulai Sekarang
        </p>
        <h2
          id="cta-heading"
          className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-6xl"
        >
          Siap Bermitra dengan{" "}
          <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
            Sumber Plastik?
          </span>
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-neutral-400">
          Konsultasikan kebutuhan plastik bisnis Anda sekarang. Tim kami siap memberikan
          penawaran terbaik dalam 1x24 jam kerja.
        </p>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=Halo Sumber Plastik, saya ingin konsultasi kebutuhan plastik untuk bisnis saya.`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-full overflow-hidden rounded-xl bg-orange-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-orange-500/25 transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-orange-400 hover:shadow-orange-400/40 active:scale-[0.97] sm:w-auto"
          >
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" aria-hidden="true" />
            <span className="relative flex items-center justify-center gap-2">
            <MessageCircle size={18} aria-hidden="true" />
            Chat via WhatsApp
            <ArrowRight
              size={16}
              className="transition-transform duration-150 ease-out group-hover:translate-x-1"
              aria-hidden="true"
            />
            </span>
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-800/50 px-8 py-4 text-center text-base font-semibold text-neutral-300 backdrop-blur-sm transition-[background-color,border-color,color,transform] duration-150 ease-out hover:border-neutral-500 hover:bg-neutral-700/50 hover:text-white active:scale-[0.97] sm:w-auto"
          >
            Kirim Email
          </a>
        </div>
      </div>
    </section>
  );
}
