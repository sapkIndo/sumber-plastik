"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const clientsRow1 = [
  "PT Maju Bersama",
  "CV Berkah Plastik",
  "PT Nusantara Industries",
  "PT Karya Mandiri",
  "CV Sumber Rezeki",
  "PT Global Packaging",
  "PT Cipta Karya",
  "CV Aneka Industri",
];

const clientsRow2 = [
  "PT Solusi Prima",
  "PT Bintang Industri",
  "CV Mitra Sejati",
  "PT Cahaya Plastik",
  "PT Usaha Maju",
  "CV Delta Industri",
  "PT Omega Packaging",
  "PT Sentosa Mandiri",
];

export default function Clients() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".clients-heading", {
        opacity: 0,
        y: 25,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="clients-heading"
      className="overflow-hidden py-16 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="clients-heading mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
            Client Kami
          </p>
          <h2
            id="clients-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Dipercaya oleh{" "}
            <span className="text-neutral-400">500+ Perusahaan</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-neutral-400">
            Dari usaha kecil hingga perusahaan multinasional, kami melayani dengan standar yang sama: terbaik.
          </p>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-4" aria-hidden="true">
        <div className="flex overflow-hidden">
          <ul className="animate-marquee flex min-w-full shrink-0 items-center gap-4" role="list">
            {[...clientsRow1, ...clientsRow1].map((name, i) => (
              <li
                key={`r1-${i}`}
                className="flex shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 px-6 py-3 text-sm font-medium text-neutral-400 whitespace-nowrap"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex overflow-hidden">
          <ul className="animate-marquee-reverse flex min-w-full shrink-0 items-center gap-4" role="list">
            {[...clientsRow2, ...clientsRow2].map((name, i) => (
              <li
                key={`r2-${i}`}
                className="flex shrink-0 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50 px-6 py-3 text-sm font-medium text-neutral-400 whitespace-nowrap"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
