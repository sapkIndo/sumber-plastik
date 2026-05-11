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
  invert?: boolean;
  scale?: number;
  ty?: string;
};

const CL = (id: string) =>
  `https://res.cloudinary.com/dcfqotpyr/image/upload/f_auto,q_auto/${id}`;

const clientsRow1: Client[] = [
  { name: "Alfamart",              logo: CL("alafamart_tt25xt"),      scale: 0.85 },
  { name: "Evita",                 logo: CL("evita_logo_xctg2a"),    scale: 0.85 },
  { name: "Universitas Gadjah Mada", logo: CL("ugm_stmuh8") },
  { name: "Norde",                 logo: CL("norde_kf48uk"),          scale: 1.4 },
  { name: "Lamora Sagan",          logo: CL("lamora_j3gsq7"),        invert: true, scale: 0.85 },
  { name: "Kopi Jo",               logo: CL("KOPI_JO_ohu9sx"),        scale: 0.85 },
  { name: "Aicare",                logo: CL("aicare_tsn9ao"),         scale: 0.85 },
  { name: "RS Soerojo",            logo: CL("RS_soerojo_b4zomd") },
  { name: "Triwara",               logo: CL("TRIWARA_STICKER_odli5j"), scale: 1.2 },
];

const clientsRow2: Client[] = [
  { name: "Lab Art Aromatique",    logo: CL("lab_art_aromatique_wvukcd") },
  { name: "Putra Farma Yogyakarta", logo: CL("putra_farma_w3dxkl"),   invert: true },
  { name: "Royal Coffee",          logo: CL("royal_coffee_ou7gzi"),  scale: 1.4 },
  { name: "Koyo Slow Bar",         logo: CL("koyo_slow_bar_qmd63t"),  scale: 1.7 },
  { name: "Spesial Sambal",        logo: CL("special_sambal_g6wh9o"), scale: 0.85 },
  { name: "Star Steak",            logo: CL("Star_Steak_bpnae1"),     scale: 1.7 },
  { name: "Citranet",              logo: CL("citranet_kazw7g"),       scale: 0.85 },
  { name: "Khaira",                logo: CL("khaira_zgovqy"),         scale: 0.85 },
  { name: "Bura Bura",             logo: CL("Bura_bura_p4mwv1"),     scale: 0.85 },
];

const clientsRow3: Client[] = [
  { name: "Jovin Petshop",         logo: CL("jovin_petshop_dkurd8"),  scale: 0.85 },
  { name: "Gembira Loka Zoo",      logo: CL("gembira_loka_zoo_mapvaz"), scale: 1.4 },
  { name: "Cavinton Hotel",        logo: CL("cavinton_kkxbho"),       scale: 0.85 },
  { name: "Bawana Kopi",           logo: CL("bawana_kopi_cmi7cv"),   scale: 0.85 },
  { name: "Impresso Coffee",       logo: CL("impresso_juorev") },
  { name: "Kenz Catering",         logo: CL("kenz_catering_dlnbcr"),  scale: 1.4, ty: "-4%" },
  { name: "Sender",                logo: CL("sender_hiaxmp"),         scale: 0.85 },
  { name: "Kopian",                logo: CL("kopian_nxy8r8"),         scale: 0.85 },
  { name: "Airku",                 logo: CL("airku_wpx7bt"),          scale: 0.85 },
];

const clientsRow4: Client[] = [
  { name: "Side to Side",          logo: CL("side_to_side_eor7ao"),  scale: 1.4 },
  { name: "Urban Perfume",         logo: CL("Urban_Perfume_djupci"),  scale: 0.85 },
  { name: "Badan Gizi Nasional",   logo: CL("BGN_yxg70q"),           scale: 0.85 },
  { name: "Cosan",                 logo: CL("cosan_owhp86"),          scale: 0.85 },
  { name: "Green Roots",           logo: CL("green_roots_yxbgtp"),   scale: 0.85 },
  { name: "Fyns Kopi",             logo: CL("fyns_tco3mz"),           scale: 0.85 },
  { name: "Sambal MamaNi",         logo: CL("sambal_mamani_uogus3"),  scale: 0.85 },
  { name: "Bunny House",           logo: CL("bunny_house_iwkos4"),   scale: 0.85 },
  { name: "Kopinggirjalan",        logo: CL("kopinggirjalan_syxdxn") },
];

const clientsRow5: Client[] = [
  { name: "Lactona",               logo: CL("lactona_cco1nj"),        scale: 1.7 },
  { name: "Cubiq",                 logo: CL("cubiq_kkefq3"),          scale: 0.85 },
  { name: "Muhammadiyah Pakel",    logo: CL("muhammadiyah_pakel_xtybgt"), scale: 1.0 },
  { name: "Perumda Tirta Binangun", logo: CL("perumda_air_minum_tirta_binangun_eaoscx"), scale: 0.85 },
  { name: "StarUp",                logo: CL("starUp_v66xmi"),         scale: 0.85 },
  { name: "HK",                    logo: CL("HK_wcxtdx"),            scale: 0.85 },
  { name: "IT",                    logo: CL("it_iapixs"),            invert: true, scale: 1.4 },
  { name: "PJ",                    logo: CL("PJ_esf9b3"),            scale: 0.85 },
  { name: "C",                     logo: CL("c_v09iz7") },
];

const ROWS = [
  { data: clientsRow1, duration: 28, reverse: false },
  { data: clientsRow2, duration: 28, reverse: true  },
  { data: clientsRow3, duration: 25, reverse: false },
  { data: clientsRow4, duration: 25, reverse: true  },
  { data: clientsRow5, duration: 30, reverse: false },
];

function ClientCard({ client }: { client: Client }) {
  return (
    <li className="flex w-36 h-16 md:w-52 md:h-20 lg:w-64 lg:h-28 shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-[border-color,background-color] duration-200 hover:border-blue-100 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-900/40 dark:hover:bg-blue-950/20">
      {client.logo ? (
        <div className="relative w-full h-full">
          <Image
            src={client.logo}
            alt={`Logo ${client.name}`}
            fill
            className={`object-contain p-1 drop-shadow dark:drop-shadow-none dark:brightness-90${client.invert ? " invert dark:invert-0" : ""}`}
            style={(client.scale || client.ty) ? { transform: `scale(${client.scale ?? 1}) translateY(${client.ty ?? "0"})` } : undefined}
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
  const sectionRef = useRef<HTMLElement>(null);
  const ulRefs = useRef<(HTMLUListElement | null)[]>([]);
  const tweens = useRef<gsap.core.Tween[]>([]);

  useGSAP(() => {
    gsap.from(".clients-heading", {
      opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
    });

    ROWS.forEach(({ duration, reverse }, i) => {
      const el = ulRefs.current[i];
      if (!el) return;
      const halfWidth = el.scrollWidth / 2;
      let tween: gsap.core.Tween;
      if (reverse) {
        gsap.set(el, { x: -halfWidth });
        tween = gsap.to(el, { x: 0, duration, ease: "none", repeat: -1, paused: true });
      } else {
        tween = gsap.to(el, { x: -halfWidth, duration, ease: "none", repeat: -1, paused: true });
      }
      tweens.current[i] = tween;
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => tweens.current.forEach(t => t?.play()),
    });
  }, { scope: sectionRef });

  const handleEnter = (i: number) => {
    const t = tweens.current[i];
    if (t) gsap.to(t, { timeScale: 0, duration: 0.6, ease: "power2.out", overwrite: true });
  };

  const handleLeave = (i: number) => {
    const t = tweens.current[i];
    if (t) gsap.to(t, { timeScale: 1, duration: 0.6, ease: "power2.in", overwrite: true });
  };

  return (
    <section
      ref={sectionRef}
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
            Dari usaha kecil hingga perusahaan multinasional, kami melayani dengan standar yang sama terbaik.
          </p>
        </div>
      </div>

      <div className="space-y-3 md:space-y-4 lg:space-y-6" aria-hidden="true">
        {ROWS.map(({ data }, i) => (
          <div
            key={i}
            className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            <ul
              ref={el => { ulRefs.current[i] = el; }}
              className="flex shrink-0 items-center gap-3 md:gap-4 lg:gap-6"
              role="list"
            >
              {[...data, ...data].map((client, j) => (
                <ClientCard key={`r${i}-${j}`} client={client} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
