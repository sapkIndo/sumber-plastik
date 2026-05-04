"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { SITE_NAME, NAV_LINKS, CONTACT, STORES } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PRODUCT_LIST = [
  "Plastik PP (Polypropylene)",
  "Plastik PET",
  "HDPE",
  "Plastik PVC",
  "LLDPE",
  "PS / Styrofoam",
  "Paper Packaging",
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const experienceYears = new Date().getFullYear() - 2010;

  useGSAP(
    () => {
      gsap.from(".footer-col", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
      gsap.from(".footer-bottom", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.45,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <footer
      ref={ref}
      role="contentinfo"
      className="border-t border-slate-300 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="footer-col">
            <Link
              href="/"
              aria-label={`${SITE_NAME} — Beranda`}
              className="mb-5 inline-block transition-opacity duration-150 hover:opacity-75"
            >
              <Image
                src="/logo/logo-square.png"
                alt={SITE_NAME}
                width={72}
                height={72}
                className="object-contain dark:brightness-0 dark:invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Distributor plastik terpercaya dengan pengalaman lebih dari{" "}
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {experienceYears} tahun
              </span>{" "}
              melayani kebutuhan industri nasional.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-500">
              <em>Est. 2010 · Food Grade · ISO</em>
            </p>
          </div>

          {/* Navigasi */}
          <div className="footer-col">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Navigasi
            </h3>
            <ul className="space-y-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 py-1.5 text-sm text-slate-500 transition-[color,transform] duration-150 hover:translate-x-0.5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:text-slate-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produk — hidden on mobile (not actionable, adds scroll length) */}
          <div className="footer-col hidden sm:block">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Produk
            </h3>
            <ul className="space-y-1" role="list">
              {PRODUCT_LIST.map((p) => (
                <li key={p}>
                  <Link
                    href="/product"
                    className="group inline-flex items-center gap-1.5 py-1 text-sm text-slate-500 transition-[color,transform] duration-150 hover:translate-x-0.5 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/product"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition-[color,transform] duration-150 hover:translate-x-0.5 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
            >
              Lihat semua produk
              <ArrowRight size={11} aria-hidden="true" />
            </Link>
          </div>

          {/* Kontak */}
          <div className="footer-col sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Kontak
            </h3>
            <ul className="space-y-3" role="list">

              {/* WhatsApp — pulsing dot = delight signal "kami aktif" */}
              <li className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    <em>Hotline Order</em> WA
                  </p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-700 transition-colors duration-150 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                      {CONTACT.phone}
                    </a>
                  </div>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-slate-500 transition-colors duration-150 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            {/* Lokasi — mobile: ringkas; desktop: full list */}
            <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Lokasi Toko
            </h3>

            {/* Mobile: single CTA */}
            <div className="sm:hidden">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <MapPin size={13} className="shrink-0 text-blue-600" aria-hidden="true" />
                <span>{STORES.length} cabang di Yogyakarta</span>
              </div>
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition-[color,transform] duration-150 hover:translate-x-0.5 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
              >
                Lihat semua lokasi
                <ArrowRight size={11} aria-hidden="true" />
              </Link>
            </div>

            {/* Desktop: full store list */}
            <ul className="hidden space-y-4 sm:block" role="list">
              {STORES.map((store) => (
                <li key={store.name} className="flex items-start gap-3">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                  <div>
                    <a
                      href={store.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <address className="not-italic text-xs leading-relaxed text-slate-500 transition-colors duration-150 group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200">
                        {store.address}
                      </address>
                    </a>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <Clock size={10} className="shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                      <span className="text-xs text-slate-500 dark:text-slate-400">{store.hours}</span>
                      <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
                      <a
                        href={`tel:${store.phone}`}
                        className="text-xs text-blue-600 transition-colors duration-150 hover:text-blue-500 dark:text-blue-400"
                      >
                        {store.phone}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-300 pt-8 dark:border-slate-800 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-500 dark:text-slate-400">{SITE_NAME}</span>
            . Semua hak dilindungi.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            Distributor Plastik &amp; Kemasan Terpercaya · Yogyakarta
          </p>
        </div>
      </div>
    </footer>
  );
}
