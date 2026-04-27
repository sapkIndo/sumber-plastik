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
];

const clientsRow2: Client[] = [
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
  { name: "Kopinggirjalan" },
  { name: "RS Soerojo" },
  { name: "Triwara" },
  { name: "Lab Art Aromatique" },
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
    <li className="flex h-20 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      {client.logo ? (
        <div className="relative h-14 w-44 p-2">
          <Image
            src={client.logo}
            alt={`Logo ${client.name}`}
            fill
            className="object-contain dark:brightness-90"
            sizes="176px"
          />
        </div>
      ) : (
        <span className="px-7 py-4 text-sm font-medium text-slate-600 whitespace-nowrap dark:text-slate-300">
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
        opacity: 0, y: 25, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} aria-labelledby="clients-heading" className="overflow-hidden py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="clients-heading mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">Client Kami</p>
          <h2 id="clients-heading" className="mb-4 font-bold tracking-tight text-slate-900 dark:text-slate-50" style={{ fontSize: "clamp(1.875rem, 2vw + 1.25rem, 3rem)" }}>
            Dipercaya oleh{" "}
            <span className="text-slate-400 dark:text-slate-500">5.000+ Pelanggan</span>
          </h2>
          <p className="mx-auto max-w-xl text-base text-slate-600 dark:text-slate-400">
            Dari usaha kecil hingga perusahaan multinasional, kami melayani dengan standar yang sama: terbaik.
          </p>
        </div>
      </div>

      <div className="space-y-4" aria-hidden="true">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <ul className="animate-marquee flex min-w-full shrink-0 items-center gap-4" role="list">
            {[...clientsRow1, ...clientsRow1].map((client, i) => (
              <ClientCard key={`r1-${i}`} client={client} />
            ))}
          </ul>
        </div>

        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <ul className="animate-marquee-reverse flex min-w-full shrink-0 items-center gap-4" role="list">
            {[...clientsRow2, ...clientsRow2].map((client, i) => (
              <ClientCard key={`r2-${i}`} client={client} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
