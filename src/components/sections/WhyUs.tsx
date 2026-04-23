"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Boxes, BadgeCheck, Truck, Tag, Headphones, RefreshCw } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    icon: Boxes,
    title: "Stok Selalu Tersedia",
    desc: "Gudang kapasitas 5.000m² memastikan stok selalu siap. Tidak perlu khawatir kehabisan di saat kritis.",
  },
  {
    icon: BadgeCheck,
    title: "Kualitas Terjamin",
    desc: "Semua produk melewati quality control ketat dan bersertifikat SNI. Konsistensi kualitas adalah prioritas kami.",
  },
  {
    icon: Truck,
    title: "Pengiriman Cepat",
    desc: "Jaringan logistik handal ke seluruh Indonesia. Jabodetabek 1-2 hari, luar Jawa 3-7 hari kerja.",
  },
  {
    icon: Tag,
    title: "Harga Kompetitif",
    desc: "Langsung dari produsen tanpa perantara. Dapatkan harga terbaik di pasar dengan kualitas yang tidak berkompromi.",
  },
  {
    icon: Headphones,
    title: "Konsultasi Gratis",
    desc: "Tim ahli kami siap membantu memilih produk yang tepat untuk kebutuhan spesifik bisnis Anda.",
  },
  {
    icon: RefreshCw,
    title: "After-Sales Support",
    desc: "Kami tidak berhenti setelah transaksi. Dukungan purna jual tersedia untuk memastikan kepuasan Anda.",
  },
];

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".whyus-heading", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });
      gsap.from(".whyus-card", {
        opacity: 0,
        y: 35,
        duration: 0.6,
        stagger: 0.065,
        ease: "expo.out",
        scrollTrigger: { trigger: ".whyus-grid", start: "top 78%" },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="whyus-heading"
      className="bg-neutral-900/30 px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="whyus-heading mb-16 flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
              Mengapa Kami
            </p>
            <h2
              id="whyus-heading"
              className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
            >
              Kenapa Ribuan Bisnis{" "}
              <span className="text-neutral-400">Mempercayai Kami</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-400 lg:text-right">
            Kami bukan sekadar supplier. Kami adalah mitra bisnis yang berkomitmen pada
            pertumbuhan jangka panjang bersama Anda.
          </p>
        </div>

        <ul className="whyus-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <li key={f.title} className="whyus-card">
                <article className="group flex h-full flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 transition-[background-color,transform] duration-200 ease-out group-hover:rotate-6 group-hover:scale-110 group-hover:bg-orange-500/20">
                    <Icon size={18} className="text-orange-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-white">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">{f.desc}</p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
