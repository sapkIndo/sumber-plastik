"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, ShoppingBag, Wrench, Cpu, Settings, Shield, ArrowRight } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const products = [
  {
    icon: Package,
    name: "Plastik PP",
    full: "Polypropylene",
    desc: "Kemasan makanan & industri. Tahan panas hingga 130°C, ringan, dan food-grade tersertifikasi BPOM.",
  },
  {
    icon: ShoppingBag,
    name: "Plastik PE",
    full: "Polyethylene",
    desc: "Kantong & film plastik. Fleksibel, kedap air, tersedia dalam varian HDPE, LDPE, dan LLDPE.",
  },
  {
    icon: Wrench,
    name: "Plastik PVC",
    full: "Polyvinyl Chloride",
    desc: "Pipa, konstruksi & kabel. Kuat, tahan korosi, dan serbaguna untuk berbagai aplikasi industri.",
  },
  {
    icon: Cpu,
    name: "Plastik ABS",
    full: "Acrylonitrile Butadiene Styrene",
    desc: "Komponen otomotif & elektronik. Kuat benturan tinggi, mudah dibentuk, permukaan halus.",
  },
  {
    icon: Settings,
    name: "Plastik Nylon",
    full: "Polyamide (PA)",
    desc: "Komponen presisi & gear. Tahan aus, kuat tarik tinggi, ideal untuk aplikasi mekanik bergerak.",
  },
  {
    icon: Shield,
    name: "Polycarbonate",
    full: "PC Transparan",
    desc: "Kaca pelindung & cover lampu. Transparan seperti kaca, namun 200x lebih kuat dan ringan.",
  },
];

export default function Products() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".product-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.065,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
        },
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="produk"
      ref={ref}
      aria-labelledby="products-heading"
      className="px-5 py-16 md:px-6 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
            Produk Unggulan
          </p>
          <h2
            id="products-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Solusi Plastik untuk{" "}
            <span className="text-neutral-400">Setiap Kebutuhan</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-neutral-400">
            Kami menyediakan lebih dari 50 jenis produk plastik berkualitas tinggi yang
            memenuhi standar industri nasional dan internasional.
          </p>
        </div>

        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.name} className="product-card group">
                <article className="flex h-full flex-col rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 transition-[border-color,background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-orange-500/30 hover:bg-neutral-900 hover:shadow-xl hover:shadow-black/30">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 transition-colors duration-300 group-hover:bg-orange-500/20">
                    <Icon size={20} className="text-orange-500" aria-hidden="true" />
                  </div>
                  <h3 className="mb-0.5 text-base font-semibold text-white">{p.name}</h3>
                  <p className="mb-3 text-xs text-neutral-500">{p.full}</p>
                  <p className="flex-1 text-sm leading-relaxed text-neutral-400">{p.desc}</p>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}?text=Halo, saya ingin tanya tentang ${p.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-orange-500 transition-colors hover:text-orange-400"
                  >
                    Tanya Produk
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
