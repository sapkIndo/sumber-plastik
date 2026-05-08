"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Client = {
  name: string;
  logo?: string;
};

const CL = (id: string) =>
  `https://res.cloudinary.com/dcfqotpyr/image/upload/f_auto,q_auto/${id}`;

const clientsRow1: Client[] = [
  { name: "Alfamart", logo: CL("logo_alfamart_transparent_si8dkc") },
  { name: "Evita", logo: CL("evita-logo_-_Copy_ug6cwk") },
  { name: "Universitas Gadjah Mada", logo: CL("LOGO-UGM-BAKU-tnp-back-grou-300x300_gdkki2") },
  { name: "Norde", logo: CL("LOGO_NORDE_CUP_BLACK_NO_BG_psqjjw") },
  { name: "Lamora Sagan", logo: CL("LAMORA-SAGAN-YOGYAKARTA_LOGOPACK-03-1024x287_-_Copy_vkxetk") },
  { name: "Kopi Jo", logo: CL("KOPI_JO_3_pdf_001_-_Copy_suk2al") },
  { name: "Aicare", logo: CL("LOGO-AICARE-dark-reed_-_Copy_f3obgu") },
  { name: "RS Soerojo", logo: CL("logosoerojo2024_q79bfs") },
  { name: "Triwara", logo: CL("TRIWARA_STICKER_nzuqs0") },
];

const clientsRow2: Client[] = [
  { name: "Lab Art Aromatique", logo: CL("Logo-Lab-Art-Aromatique-Yogyakarta-lowkerjogja_-_Copy_f7byj2") },
  { name: "Putra Farma Yogyakarta", logo: CL("logo-pfy-newzam_vjvbm0") },
  { name: "Royal Coffee", logo: CL("Royal_Paper_Gold_MP_sbhska") },
  { name: "Koyo Slow Bar", logo: CL("Logo_KSB-08_-_Copy_hhzjx8") },
  { name: "Spesial Sambal", logo: CL("sppg-1757490703_edxmep") },
  { name: "Starsteak", logo: CL("front_-_Copy_f0petx") },
  { name: "Citranet", logo: CL("fb777e20201b7d23bbbd291f20a2ea3f_-_Copy_kwgemd") },
  { name: "Khaira", logo: CL("logo-header_-_Copy_ylibqu") },
  { name: "Bura Bura", logo: CL("HontizxOKlzXRY3IuUlY6wGXZUqtYW5VRMkrgTxt_-_Copy_thgbfz") },
];

const clientsRow3: Client[] = [
  { name: "Jovin Petshop", logo: CL("JOP-70079-918845d2-c938-4db8-8d58-30388a13013e_-_Copy_sfokqr") },
  { name: "Gembira Loka Zoo", logo: CL("IMG_0154_-_Copy_chenb8") },
  { name: "Cavinton Hotel Yogyakarta", logo: CL("1690982113404_v6o2o6") },
  { name: "Bawana Kopi", logo: CL("553744264_18068688329221143_2712954494876729455_n_ineawe") },
  { name: "Impresso Coffee", logo: CL("523102536_17846253237531652_7133214011072661210_n_jwpifc") },
  { name: "Kenz Catering", logo: CL("520971330_18043566983640257_6527850635176471879_n_ev0opv") },
  { name: "Sender", logo: CL("485194159_501161706384491_3593102940184971308_n_xv0kkw") },
  { name: "Kopian", logo: CL("473780251_3997067550533683_671427783066977177_n_zpfuuc") },
];

const clientsRow5: Client[] = [
  { name: "Alfamart", logo: CL("logo_alfamart_transparent_si8dkc") },
  { name: "Evita", logo: CL("evita-logo_-_Copy_ug6cwk") },
  { name: "Universitas Gadjah Mada", logo: CL("LOGO-UGM-BAKU-tnp-back-grou-300x300_gdkki2") },
  { name: "Norde", logo: CL("LOGO_NORDE_CUP_BLACK_NO_BG_psqjjw") },
  { name: "Lamora Sagan", logo: CL("LAMORA-SAGAN-YOGYAKARTA_LOGOPACK-03-1024x287_-_Copy_vkxetk") },
  { name: "Kopi Jo", logo: CL("KOPI_JO_3_pdf_001_-_Copy_suk2al") },
  { name: "Aicare", logo: CL("LOGO-AICARE-dark-reed_-_Copy_f3obgu") },
  { name: "RS Soerojo", logo: CL("logosoerojo2024_q79bfs") },
  { name: "Triwara", logo: CL("TRIWARA_STICKER_nzuqs0") },
];

const clientsRow4: Client[] = [
  { name: "Badan Gizi Nasional", logo: CL("455191046_378852101657668_768894196703536366_n_pwxrdr") },
  { name: "Cosan", logo: CL("300622009_595168728703326_7752860228095121394_n_gvw8me") },
  { name: "Green Roots", logo: CL("358430624_726389346161030_3129359534570283439_n_gfkhme") },
  { name: "Fyns Kopi", logo: CL("312985154_437516638327350_2173544245188706171_n_thjjaq") },
  { name: "Sambal MamaNi", logo: CL("70378944_2428545853897311_4733108377427640320_n_q0vjcu") },
  { name: "Bunny House", logo: CL("7b9e2a62e4fa8934fda6087a936cf0bf_tn_qjtoyf") },
  { name: "Kopinggirjalan", logo: CL("44207c96ebf83fde59834bc79fb4ec80_s5b7ip") },
  { name: "Lactona", logo: CL("20230324104913_qemlbs") },
];

function ClientCard({ client }: { client: Client }) {
  return (
    <li className="flex w-36 h-16 md:w-52 md:h-20 lg:w-64 lg:h-28 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-[border-color,background-color] duration-200 hover:border-blue-100 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-900/40 dark:hover:bg-blue-950/20">
      {client.logo ? (
        <div className="relative w-full h-full transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100">
          <Image
            src={client.logo}
            alt={`Logo ${client.name}`}
            fill
            className="object-contain p-2 md:p-3 drop-shadow dark:drop-shadow-none dark:brightness-90"
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
  const [running, setRunning] = useState(false);

  useGSAP(
    () => {
      gsap.from(".clients-heading", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 80%",
        once: true,
        onEnter: () => setRunning(true),
      });
    },
    { scope: ref }
  );

  const playState = running ? "running" : "paused";

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
            <span className="text-blue-600">5.000+ Pelanggan</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400">
            Dari usaha kecil hingga perusahaan multinasional, kami melayani dengan standar yang sama: terbaik.
          </p>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 lg:space-y-6" aria-hidden="true">
        <div className="marquee-track flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee flex min-w-full shrink-0 items-center gap-3 md:gap-4 lg:gap-6" style={{ animationDuration: "28s", animationPlayState: playState }} role="list">
            {[...clientsRow1, ...clientsRow1].map((client, i) => (
              <ClientCard key={`r1-${i}`} client={client} />
            ))}
          </ul>
        </div>

        <div className="marquee-track flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee-reverse flex min-w-full shrink-0 items-center gap-3 md:gap-4 lg:gap-6" style={{ animationDuration: "28s", animationPlayState: playState }} role="list">
            {[...clientsRow2, ...clientsRow2].map((client, i) => (
              <ClientCard key={`r2-${i}`} client={client} />
            ))}
          </ul>
        </div>

        <div className="marquee-track flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee flex min-w-full shrink-0 items-center gap-3 md:gap-4 lg:gap-6" style={{ animationDuration: "25s", animationPlayState: playState }} role="list">
            {[...clientsRow3, ...clientsRow3].map((client, i) => (
              <ClientCard key={`r3-${i}`} client={client} />
            ))}
          </ul>
        </div>

        <div className="marquee-track flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee-reverse flex min-w-full shrink-0 items-center gap-3 md:gap-4 lg:gap-6" style={{ animationDuration: "25s", animationPlayState: playState }} role="list">
            {[...clientsRow4, ...clientsRow4].map((client, i) => (
              <ClientCard key={`r4-${i}`} client={client} />
            ))}
          </ul>
        </div>

        <div className="marquee-track flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="animate-marquee flex min-w-full shrink-0 items-center gap-3 md:gap-4 lg:gap-6" style={{ animationDuration: "30s", animationPlayState: playState }} role="list">
            {[...clientsRow5, ...clientsRow5].map((client, i) => (
              <ClientCard key={`r5-${i}`} client={client} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
