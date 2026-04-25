"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Package, ShoppingBag, Wrench, Cpu, Settings, Shield, ArrowUpRight } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const products = [
  { num: "01", icon: Package,    name: "Plastik PP",    full: "Polypropylene",                   desc: "Kemasan makanan & industri. Tahan panas hingga 130°C, ringan, dan food-grade tersertifikasi BPOM." },
  { num: "02", icon: ShoppingBag,name: "Plastik PE",    full: "Polyethylene",                    desc: "Kantong & film plastik. Fleksibel, kedap air, tersedia dalam varian HDPE, LDPE, dan LLDPE." },
  { num: "03", icon: Wrench,     name: "Plastik PVC",   full: "Polyvinyl Chloride",              desc: "Pipa, konstruksi & kabel. Kuat, tahan korosi, dan serbaguna untuk berbagai aplikasi industri." },
  { num: "04", icon: Cpu,        name: "Plastik ABS",   full: "Acrylonitrile Butadiene Styrene", desc: "Komponen otomotif & elektronik. Kuat benturan tinggi, mudah dibentuk, permukaan halus." },
  { num: "05", icon: Settings,   name: "Plastik Nylon", full: "Polyamide (PA)",                  desc: "Komponen presisi & gear. Tahan aus, kuat tarik tinggi, ideal untuk aplikasi mekanik bergerak." },
  { num: "06", icon: Shield,     name: "Polycarbonate", full: "PC Transparan",                   desc: "Kaca pelindung & cover lampu. Transparan seperti kaca, namun 200× lebih kuat dan ringan." },
];

export default function Products() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".product-row", {
        opacity: 0,
        x: -16,
        duration: 0.6,
        stagger: 0.07,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref }
  );

  return (
    <section id="produk" ref={ref} aria-labelledby="products-heading" className="px-5 py-16 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">

        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="products-heading" className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            Produk <span className="text-slate-400">Unggulan</span>
          </h2>
          <div className="flex flex-col gap-2 lg:items-end lg:text-right">
            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
              Lebih dari 50 jenis produk plastik berkualitas tinggi untuk kebutuhan
              industri nasional dan internasional.
            </p>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              50+ jenis tersedia
            </span>
          </div>
        </div>

        <ul role="list">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.name} className="product-row group border-t border-slate-100">
                <a
                  href={`https://wa.me/${CONTACT.whatsapp}?text=Halo, saya ingin tanya tentang ${p.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 py-5 transition-colors duration-200 hover:bg-blue-50/50 md:items-center md:gap-6 md:py-6"
                  aria-label={`Tanya tentang ${p.name} via WhatsApp`}
                >
                  <span className="w-8 shrink-0 font-mono text-xs tabular-nums text-slate-400 transition-colors duration-200 group-hover:text-blue-600 md:w-10">
                    {p.num}
                  </span>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 transition-colors duration-200 group-hover:bg-blue-600/10">
                    <Icon size={16} className="text-slate-500 transition-colors duration-200 group-hover:text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="w-32 shrink-0 md:w-44">
                    <p className="text-sm font-semibold text-slate-900 md:text-base">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.full}</p>
                  </div>
                  <p className="hidden flex-1 text-sm leading-relaxed text-slate-600 md:block">{p.desc}</p>
                  <ArrowUpRight
                    size={15}
                    className="ml-auto mt-0.5 shrink-0 text-slate-400 transition-[color,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-600 md:mt-0"
                    aria-hidden="true"
                  />
                </a>
                <p className="pb-5 pl-[calc(2rem+2.25rem+2rem)] text-sm leading-relaxed text-slate-600 md:hidden">
                  {p.desc}
                </p>
              </li>
            );
          })}
          <li className="border-t border-slate-100" role="presentation" />
        </ul>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-slate-400">Butuh produk selain di atas? Konsultasikan kebutuhan Anda.</p>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}?text=Halo, saya ingin konsultasi produk plastik`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-blue-600 transition-colors hover:text-blue-500"
          >
            Hubungi tim kami →
          </a>
        </div>
      </div>
    </section>
  );
}
