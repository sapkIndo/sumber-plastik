"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const FEATURED = [
  {
    slug:           "botol-br",
    name:           "Botol & Wadah",
    count:          30,
    imageUrl:       "https://res.cloudinary.com/dcfqotpyr/image/upload/v1777904654/BOTOL_BR_PINK_60ML_vpwfrh.jpg",
    objectPosition: "50% 50%",
  },
  {
    slug:           "cup-gelas",
    name:           "Kemasan Minuman",
    count:          35,
    imageUrl:       "https://res.cloudinary.com/dcfqotpyr/image/upload/v1777904705/CUP_GELAS_PET_OVAL_PLP_12_OZ_aifjsr.jpg",
    objectPosition: "50% 38%",
    imageScale:     2.5,
  },
  {
    slug:           "thinwall",
    name:           "Kemasan Makanan",
    count:          45,
    imageUrl:       "https://res.cloudinary.com/dcfqotpyr/image/upload/v1777905469/THINWALL_VICTORY_SQ350_jf8r4v.jpg",
    objectPosition: "50% 40%",
    imageScale:     1.8,
  },
  {
    slug:           "toples",
    name:           "Toples & Stoples",
    count:          31,
    imageUrl:       "https://res.cloudinary.com/dcfqotpyr/image/upload/v1777905477/TOPLES_TABUNG_MIM_sch9yo.jpg",
    objectPosition: "50% 40%",
    imageScale:     1.65,
  },
  {
    slug:           "bag",
    name:           "Kantong & Bag",
    count:          11,
    imageUrl:       "https://res.cloudinary.com/dcfqotpyr/image/upload/v1777904648/SOFT_HANDEL_BAG_MOTIF_30X30_x4wosi.jpg",
    objectPosition: "50% 50%",
    imageScale:     1.5,
  },
];

export default function FeaturedCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const split = new SplitText(headingRef.current!, { type: "words" });
    gsap.set(split.words, { transformOrigin: "0% 50% -30px" });

    ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 82%",
      once: true,
      onEnter: () => {
        gsap.from(".cat-label",   { opacity: 0, y: -10, duration: 0.45, ease: "expo.out" });
        gsap.from(split.words,    { opacity: 0, y: 40, rotateX: -60, stagger: 0.07, duration: 0.65, ease: "expo.out", delay: 0.05 });
        gsap.from(".cat-subtext", { opacity: 0, y: 14, duration: 0.5,  ease: "expo.out", delay: 0.5 });
      },
    });

    ScrollTrigger.create({
      trigger: ".cat-grid",
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.from(".cat-card", {
          opacity: 0, y: 40, scale: 0.96,
          stagger: { amount: 0.5, from: "start" },
          duration: 0.65, ease: "expo.out",
        });
      },
    });

    return () => split.revert();
  }, { scope: sectionRef });

  const hero = FEATURED[0];

  return (
    <section
      id="produk"
      ref={sectionRef}
      aria-labelledby="categories-heading"
      className="px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-7xl">

        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="cat-label mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
              Kategori Unggulan
            </p>
            <h2
              ref={headingRef}
              id="categories-heading"
              className="font-black tracking-tight text-slate-900 dark:text-slate-50"
              style={{ perspective: "600px", fontSize: "clamp(1.875rem, 2vw + 1.25rem, 3rem)" }}
            >
              Temukan Produk
              <br className="hidden sm:block" />
              <span className="text-blue-600">yang Anda Butuhkan</span>
            </h2>
          </div>
          <div className="cat-subtext flex flex-col gap-2 lg:items-end lg:text-right">
            <p className="max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Dari kemasan makanan, botol, kantong, hingga perlengkapan — semua tersedia ecer maupun grosir.
            </p>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              1.000+ produk tersedia
            </span>
          </div>
        </div>

        <div className="cat-grid grid grid-cols-2 gap-4 lg:grid-cols-3">

          {/* Hero category */}
          <a
            href={`/product/${hero.slug}`}
            aria-label={`Jelajahi kategori ${hero.name}`}
            className="cat-card group relative col-span-2 min-h-[260px] overflow-hidden rounded-2xl sm:min-h-[320px] lg:min-h-[380px]"
          >
            <Image
              src={hero.imageUrl}
              alt={hero.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.07]"
              style={{ objectPosition: hero.objectPosition }}
            />
            {/* base overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent transition-opacity duration-500 group-hover:opacity-75" />
            {/* blue shimmer on hover */}
            <div className="absolute inset-0 bg-blue-900/0 transition-colors duration-500 group-hover:bg-blue-900/10" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1">
              <div>
                <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-blue-400 transition-colors duration-300 group-hover:text-blue-300">
                  {hero.count} produk tersedia
                </span>
                <p className="text-2xl font-black leading-tight text-white">
                  {hero.name}
                </p>
              </div>
              <ArrowUpRight
                size={22}
                className="shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                aria-hidden="true"
              />
            </div>
          </a>

          {/* Small category cards */}
          {FEATURED.slice(1).map((cat) => (
            <a
              key={cat.slug}
              href={`/product/${cat.slug}`}
              aria-label={`Jelajahi kategori ${cat.name}`}
              className="cat-card group relative min-h-[180px] overflow-hidden rounded-2xl sm:min-h-[220px] lg:min-h-[260px]"
            >
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-[transform,scale] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.07]"
                style={{ objectPosition: cat.objectPosition, scale: cat.imageScale ?? 1 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent transition-opacity duration-500 group-hover:opacity-75" />
              <div className="absolute inset-0 bg-blue-900/0 transition-colors duration-500 group-hover:bg-blue-900/10" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-1">
                <div>
                  <span className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-blue-400 transition-colors duration-300 group-hover:text-blue-300">
                    {cat.count} produk tersedia
                  </span>
                  <p className="text-base font-black leading-tight text-white sm:text-lg">
                    {cat.name}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-white/25 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                  aria-hidden="true"
                />
              </div>
            </a>
          ))}

          {/* CTA strip */}
          <div className="cat-card col-span-2 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center lg:col-span-3 dark:border-slate-700 dark:bg-slate-900">
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-slate-50">
                Masih banyak kategori lainnya
              </p>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Jirigen, kardus, lakban, bubble wrap, dan puluhan kategori lain menanti di katalog.
              </p>
            </div>
            <Link
              href="/product"
              className="flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
            >
              Lihat Semua Kategori
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
