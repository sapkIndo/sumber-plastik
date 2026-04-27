"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  Package, Gem, Box, Wrench, Layers, Thermometer, ArrowUpRight,
} from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const products = [
  {
    num: "01", icon: Package,
    name: "Plastik PP", full: "Polypropylene",
    desc: "Kemasan makanan & minuman. Tahan panas hingga 130°C, ringan, food-grade tersertifikasi BPOM — cup, toples, tray, hingga kemasan industri.",
    specs: ["Food Grade", "130°C", "BPOM"],
  },
  {
    num: "02", icon: Gem,
    name: "Plastik PET", full: "Polyethylene Terephthalate",
    desc: "Botol minuman & kemasan transparan. Jernih kristal, ringan, tahan benturan, dan 100% recyclable — standar industri F&B global.",
    specs: ["Crystal Clear", "Food Grade", "Recyclable"],
  },
  {
    num: "03", icon: Box,
    name: "HDPE", full: "High-Density Polyethylene",
    desc: "Jeriken, drum plastik, dan kantong tebal. Kekuatan struktural tinggi, tahan bahan kimia, dan food-safe untuk distribusi skala besar.",
    specs: ["Chemical Resistant", "Food Grade", "Waterproof"],
  },
  {
    num: "04", icon: Wrench,
    name: "Plastik PVC", full: "Polyvinyl Chloride",
    desc: "Pipa, selang & kemasan blister farmasi. Rigid atau fleksibel, tahan korosi dan cuaca ekstrem tanpa degradasi.",
    specs: ["Rigid & Flexible", "Tahan Korosi"],
  },
  {
    num: "05", icon: Layers,
    name: "LLDPE", full: "Linear Low-Density Polyethylene",
    desc: "Stretch film, kantong plastik & food wrap. Kekuatan sobek tinggi dengan ketebalan lebih tipis — ideal untuk packaging otomatis skala besar.",
    specs: ["Stretch Film", "Tear Resistant", "Food Safe"],
  },
  {
    num: "06", icon: Thermometer,
    name: "PS / Styrofoam", full: "Polystyrene",
    desc: "Wadah makanan, baki buah & sayur, cup minuman, dan kemasan produk segar. Insulasi panas dan dingin sangat baik, ringan, dan mudah dibentuk untuk berbagai ukuran kemasan.",
    specs: ["Insulasi Termal", "Food Grade", "Ringan"],
  },
];

export default function Products() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const cardRefs    = useRef<(HTMLAnchorElement | null)[]>([]);

  useGSAP(() => {
    const split = new SplitText(headingRef.current!, { type: "words" });
    gsap.set(split.words, { transformOrigin: "0% 50% -30px" });

    ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 82%",
      once: true,
      onEnter: () => {
        gsap.from(".prod-label",   { opacity: 0, y: -10, duration: 0.45, ease: "expo.out" });
        gsap.from(split.words,     { opacity: 0, y: 40, rotateX: -60, stagger: 0.07, duration: 0.65, ease: "expo.out", delay: 0.05 });
        gsap.from(".prod-subtext", { opacity: 0, y: 14, duration: 0.5,  ease: "expo.out", delay: 0.5 });
      },
    });

    ScrollTrigger.create({
      trigger: ".prod-grid",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.from(".prod-card", {
          opacity: 0, y: 40, scale: 0.96,
          stagger: { amount: 0.5, from: "start" },
          duration: 0.65, ease: "expo.out",
        });
      },
    });

    const cleanups: (() => void)[] = [];

    cardRefs.current.forEach((card) => {
      if (!card) return;

      gsap.set(card, { transformPerspective: 900 });

      const iconEl = card.querySelector<HTMLElement>(".prod-icon");
      const rXTo   = gsap.quickTo(card,   "rotateX", { duration: 0.55, ease: "power3.out" });
      const rYTo   = gsap.quickTo(card,   "rotateY", { duration: 0.55, ease: "power3.out" });
      const iXTo   = iconEl ? gsap.quickTo(iconEl, "x", { duration: 0.55, ease: "power3.out" }) : null;
      const iYTo   = iconEl ? gsap.quickTo(iconEl, "y", { duration: 0.55, ease: "power3.out" }) : null;

      const onMove = (e: MouseEvent) => {
        const r  = card.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
        const dy = ((e.clientY - r.top)  / r.height - 0.5) * 2;
        rXTo(-dy * 5);
        rYTo( dx * 7);
        iXTo?.(-dx * 6);
        iYTo?.(-dy * 6);
      };

      const onEnter = () => gsap.to(card, { scale: 1.025, duration: 0.35, ease: "power3.out" });

      const onLeave = () => {
        rXTo(0); rYTo(0);
        gsap.to(card, { scale: 1, duration: 0.55, ease: "power3.out" });
        iXTo?.(0); iYTo?.(0);
      };

      card.addEventListener("mousemove",  onMove);
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove",  onMove);
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => { split.revert(); cleanups.forEach(fn => fn()); };
  }, { scope: sectionRef });

  return (
    <section
      id="produk"
      ref={sectionRef}
      aria-labelledby="products-heading"
      className="px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="prod-label mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Produk Unggulan
            </p>
            <h2
              ref={headingRef}
              id="products-heading"
              className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50 md:text-4xl lg:text-5xl"
              style={{ perspective: "600px" }}
            >
              Material Plastik
              <br className="hidden sm:block" />
              <span className="text-slate-400 dark:text-slate-500">Berkualitas Premium</span>
            </h2>
          </div>
          <div className="prod-subtext flex flex-col gap-2 lg:items-end lg:text-right">
            <p className="max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Lebih dari 50 jenis produk plastik berkualitas tinggi untuk kebutuhan industri nasional.
            </p>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              1.000+ jenis tersedia
            </span>
          </div>
        </div>

        <div className="prod-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => {
            const Icon      = p.icon;
            const isFeature = i === 0;
            const isStrip   = i === 5;

            if (isStrip) {
              return (
                <a
                  key={p.name}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  href={`https://wa.me/${CONTACT.whatsapp}?text=Halo, saya ingin tanya tentang ${p.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Tanya tentang ${p.name} via WhatsApp`}
                  className="prod-card group col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-7 will-change-transform transition-shadow duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-slate-900/50 md:flex-row md:items-center md:gap-10"
                >
                  <div className="prod-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 will-change-transform transition-colors duration-200 group-hover:bg-blue-100 dark:bg-blue-950/50 dark:group-hover:bg-blue-900/50">
                    <Icon size={26} className="text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                      {p.full}
                    </p>
                    <p className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-50">{p.name}</p>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{p.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 md:shrink-0 md:flex-col md:items-end">
                    {p.specs.map(s => (
                      <span key={s} className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        — {s}
                      </span>
                    ))}
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="hidden shrink-0 text-slate-300 transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-400 md:block"
                    aria-hidden="true"
                  />
                </a>
              );
            }

            return (
              <a
                key={p.name}
                ref={(el) => { cardRefs.current[i] = el; }}
                href={`https://wa.me/${CONTACT.whatsapp}?text=Halo, saya ingin tanya tentang ${p.name}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Tanya tentang ${p.name} via WhatsApp`}
                className={[
                  "prod-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-7 will-change-transform transition-shadow duration-300",
                  isFeature
                    ? "sm:col-span-2 bg-slate-900 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/25 dark:bg-slate-800 dark:shadow-slate-950/40 min-h-[260px]"
                    : "bg-white border border-slate-200 shadow-sm hover:shadow-md dark:bg-slate-900 dark:border-slate-700 dark:hover:shadow-slate-900/50 min-h-[200px]",
                ].join(" ")}
              >
                <div className="flex items-start justify-between">
                  <span className={`font-mono text-xs tabular-nums ${isFeature ? "text-white/30" : "text-slate-300 dark:text-slate-600"}`}>
                    {p.num}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className={`transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                      isFeature
                        ? "text-white/20 group-hover:text-white/60"
                        : "text-slate-300 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-400"
                    }`}
                    aria-hidden="true"
                  />
                </div>

                <div
                  className={[
                    "prod-icon my-5 flex h-12 w-12 items-center justify-center rounded-xl will-change-transform transition-colors duration-200",
                    isFeature ? "bg-white/10" : "bg-slate-100 group-hover:bg-blue-50 dark:bg-slate-800 dark:group-hover:bg-blue-950/50",
                  ].join(" ")}
                >
                  <Icon
                    size={22}
                    className={
                      isFeature
                        ? "text-white"
                        : "text-slate-600 transition-colors duration-200 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400"
                    }
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className={`mb-0.5 text-[10px] font-semibold uppercase tracking-widest ${isFeature ? "text-blue-400" : "text-slate-400 dark:text-slate-500"}`}>
                    {p.full}
                  </p>
                  <p className={`mb-2 text-lg font-bold leading-tight ${isFeature ? "text-white" : "text-slate-900 dark:text-slate-50"}`}>
                    {p.name}
                  </p>
                  <p className={`mb-4 text-sm leading-relaxed ${isFeature ? "text-white/55" : "text-slate-500 dark:text-slate-400"}`}>
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {p.specs.map(s => (
                      <span
                        key={s}
                        className={`text-[10px] font-semibold uppercase tracking-wider ${isFeature ? "text-white/35" : "text-slate-400 dark:text-slate-500"}`}
                      >
                        — {s}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-slate-400 dark:text-slate-500">Butuh produk selain di atas? Konsultasikan kebutuhan Anda.</p>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=Halo, saya ingin konsultasi produk plastik`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Hubungi tim kami →
          </a>
        </div>

      </div>
    </section>
  );
}
