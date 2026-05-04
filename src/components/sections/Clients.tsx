"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Client = {
  name: string;
  logo?: string;
};

// 11 items each for rows 1 & 2, 10 items each for rows 3 & 4 (42 total, no duplicates)
const clientsRow1: Client[] = [
  { name: "Universitas Gadjah Mada" },
  { name: "Starsteak" },
  { name: "Sender" },
  { name: "Cosan", logo: "/clients/Cosan.webp" },
  { name: "Evita" },
  { name: "Lactona" },
  { name: "Cubic Cup" },
  { name: "Kopian" },
  { name: "Sambal MamaNi" },
  { name: "Cavinton Hotel Yogyakarta", logo: "/clients/Cavinton.webp" },
  { name: "Lamora Sagan" },
];

const clientsRow2: Client[] = [
  { name: "Bawana Kopi" },
  { name: "Royal Coffee" },
  { name: "Star Up" },
  { name: "Norde" },
  { name: "Koyo Slow Bar" },
  { name: "Bubur & Yamie HK" },
  { name: "Citranet", logo: "/clients/Citranet.webp" },
  { name: "Green Roots", logo: "/clients/Green Roots.webp" },
  { name: "Khaira", logo: "/clients/khaira.webp" },
  { name: "Alfamart" },
  { name: "Lab Art Aromatique" },
];

const clientsRow3: Client[] = [
  { name: "Urban Perfume Point" },
  { name: "Bura Bura", logo: "/clients/Bura Bura.webp" },
  { name: "CV Mitra Sejati" },
  { name: "PT Cahaya Plastik" },
  { name: "Gembira Loka Zoo", logo: "/clients/gembira loka zoo.webp" },
  { name: "Impresso Coffee" },
  { name: "Jovin Petshop" },
  { name: "Kopi Jo", logo: "/clients/KOPI JO 3 pdf_001.webp" },
  { name: "Fyns Kopi" },
  { name: "Spesial Sambal" },
];

const clientsRow4: Client[] = [
  { name: "Kopinggirjalan" },
  { name: "RS Soerojo" },
  { name: "Triwara" },
  { name: "Aicare" },
  { name: "Badan Gizi Nasional" },
  { name: "Side to Side" },
  { name: "Bunny House" },
  { name: "Kenz Catering", logo: "/clients/kenz Catering.webp" },
  { name: "SD Muhammadiyah Pakel" },
  { name: "Putra Farma Yogyakarta" },
];

function ClientCard({ client }: { client: Client }) {
  return (
    <li className="flex w-36 h-16 md:w-52 md:h-20 lg:w-64 lg:h-28 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color,background-color] duration-200 hover:border-blue-100 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-900/40 dark:hover:bg-blue-950/20">
      {client.logo ? (
        <div className="relative w-full h-full">
          <Image
            src={client.logo}
            alt={`Logo ${client.name}`}
            fill
            className="object-contain p-2 md:p-3 dark:brightness-90"
            sizes="(max-width: 768px) 144px, (max-width: 1024px) 208px, 256px"
          />
        </div>
      ) : (
        <span className="px-3 md:px-4 lg:px-5 text-xs md:text-sm lg:text-base font-medium text-center leading-snug text-slate-600 line-clamp-2 dark:text-slate-300">
          {client.name}
        </span>
      )}
    </li>
  );
}

export default function Clients() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".clients-heading", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="clients-heading"
      className="overflow-hidden min-h-screen flex flex-col justify-center py-16 md:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="clients-heading mb-10 md:mb-14 lg:mb-20 text-center">
          <p className="mb-3 text-xs md:text-sm font-semibold uppercase tracking-widest text-blue-600">Client Kami</p>
          <h2
            id="clients-heading"
            className="mb-4 md:mb-5 font-black tracking-tight text-slate-900 dark:text-slate-50"
            style={{ fontSize: "clamp(1.75rem, 3vw + 1rem, 4rem)" }}
          >
            Dipercaya oleh{" "}
            <span className="text-slate-400 dark:text-slate-500">5.000+ Pelanggan</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400">
            Dari usaha kecil hingga perusahaan multinasional, kami melayani dengan standar yang sama: terbaik.
          </p>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 lg:space-y-6" aria-hidden="true">
        <div className="marquee-track flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee flex min-w-full shrink-0 items-center gap-3 md:gap-4 lg:gap-6" style={{ animationDuration: "28s" }} role="list">
            {[...clientsRow1, ...clientsRow1].map((client, i) => (
              <ClientCard key={`r1-${i}`} client={client} />
            ))}
          </ul>
        </div>

        <div className="marquee-track flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee-reverse flex min-w-full shrink-0 items-center gap-3 md:gap-4 lg:gap-6" style={{ animationDuration: "28s" }} role="list">
            {[...clientsRow2, ...clientsRow2].map((client, i) => (
              <ClientCard key={`r2-${i}`} client={client} />
            ))}
          </ul>
        </div>

        <div className="marquee-track flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee flex min-w-full shrink-0 items-center gap-3 md:gap-4 lg:gap-6" style={{ animationDuration: "25s" }} role="list">
            {[...clientsRow3, ...clientsRow3].map((client, i) => (
              <ClientCard key={`r3-${i}`} client={client} />
            ))}
          </ul>
        </div>

        <div className="marquee-track flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee-reverse flex min-w-full shrink-0 items-center gap-3 md:gap-4 lg:gap-6" style={{ animationDuration: "25s" }} role="list">
            {[...clientsRow4, ...clientsRow4].map((client, i) => (
              <ClientCard key={`r4-${i}`} client={client} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
