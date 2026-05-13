"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { SITE_NAME, NAV_LINKS, CONTACT, STORES } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ShippingLogo({ name, src, filterClass, cardClass }: { name: string; src: string; filterClass?: string; cardClass?: string }) {
  const [imgError, setImgError] = useState(false);
  return imgError ? (
    <span className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
      {name}
    </span>
  ) : (
    <div
      title={name}
      className={`relative h-8 overflow-hidden rounded border border-slate-200 bg-white sm:h-10 dark:border-slate-700 dark:bg-slate-900 ${cardClass ?? "w-[4.5rem] sm:w-24"}`}
    >
      <Image
        src={src}
        alt={name}
        fill
        className={`object-contain p-1.5${filterClass ? ` ${filterClass}` : ""}`}
        sizes="(max-width: 640px) 80px, 96px"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

const CL = (id: string, extra = "") =>
  `https://res.cloudinary.com/dcfqotpyr/image/upload/f_auto,q_auto${extra ? `,${extra}` : ""}/${id}`;

const PAYMENT_LOGOS = [
  { name: "BCA",        src: CL("pay_bca") },
  { name: "BRI",        src: CL("pay_bri") },
  { name: "BNI",        src: CL("pay_bni") },
  { name: "Mandiri",    src: CL("pay_mandiri") },
  { name: "BSI",        src: CL("pay_bsi") },
  { name: "CIMB",       src: CL("pay_cimb") },
  { name: "SeaBank",    src: CL("pay_seabank") },
  { name: "Mastercard", src: CL("pay_mc") },
  { name: "Visa",       src: CL("pay_visa") },
  { name: "GoPay",      src: CL("pay_gopay_text"),    imgClass: "p-0.5" },
  { name: "Alfamidi",   src: CL("pay_alfamidi_v2") },
  { name: "DAN+DAN",    src: CL("pay_dandan"),         imgClass: "scale-[1.5] p-0" },
  { name: "UOB",        src: CL("pay_uob") },
  { name: "Alfamart",   src: CL("alafamart_tt25xt"),   imgClass: "scale-[0.9] p-0" },
];

const SHIPPING_LOGOS = [
  { name: "JNE",         src: CL("ship_jne") },
  { name: "SiCepat",    src: CL("ship_sicepat") },
  { name: "Lion",       src: CL("ship_lion"),   filterClass: "scale-[2.5]" },
  { name: "GoSend",     src: CL("ship_gosend_v2"), filterClass: "scale-[2.5]" },
  { name: "Grab",       src: CL("ship_grab_v3") },
  { name: "AnterAja",   src: CL("ship_anteraja") },
  { name: "JET",        src: CL("ship_jet"), filterClass: "[filter:invert(1)_sepia(1)_saturate(10)_hue-rotate(5deg)] dark:filter-none" },
  { name: "Herona",     src: CL("ship_herona") },
  { name: "KIB",        src: CL("ship_kib") },
  { name: "SPX",        src: CL("ship_spx") },
];

const FEATURED_CATEGORIES = [
  { slug: "botol-pet",   name: "Botol PET" },
  { slug: "mika",        name: "Mika" },
  { slug: "thinwall",    name: "Thinwall" },
  { slug: "plastik-opp", name: "Plastik OPP" },
  { slug: "cup-gelas",   name: "Cup Gelas" },
  { slug: "sendok",      name: "Sendok" },
  { slug: "kardus",      name: "Kardus" },
  { slug: "kresek",      name: "Kresek" },
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
      <div className="mx-auto max-w-7xl px-6 py-14 lg:py-16">
        {/*
          Layout:
          mobile  → 1-col: Brand / [Nav | Produk] / Kontak
          lg+     → 4-col: Brand | Nav | Produk | Kontak
          Trick: wrapper Nav+Produk pakai lg:contents sehingga
          pada lg+ anak-anaknya jadi grid item langsung di outer grid.
        */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-4 lg:gap-12">

          {/* ── Brand ── */}
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

          {/*
            ── Nav + Produk wrapper ──
            Mobile: grid 2 kolom (side-by-side)
            lg+:    lg:contents → wrapper menghilang, anak-anaknya masuk outer grid langsung
          */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:contents">

            {/* Navigasi */}
            <div className="footer-col">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Navigasi
              </h3>
              <ul className="space-y-0.5" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 py-1.5 text-sm text-slate-500 transition-[color,transform] duration-150 hover:translate-x-0.5 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:text-slate-50"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kategori Unggulan */}
            <div className="footer-col">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Kategori
              </h3>
              <ul className="space-y-0.5" role="list">
                {FEATURED_CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/product/${c.slug}`}
                      className="inline-flex items-start py-1.5 text-sm leading-snug text-slate-500 transition-[color,transform] duration-150 hover:translate-x-0.5 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/product"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 transition-[color,transform] duration-150 hover:translate-x-0.5 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400"
              >
                Lihat semua
                <ArrowRight size={11} aria-hidden="true" />
              </Link>
            </div>

          </div>

          {/* ── Kontak ── */}
          <div className="footer-col">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Kontak
            </h3>
            <ul className="space-y-3" role="list">

              {/* WhatsApp */}
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
                  className="break-all text-sm text-slate-500 transition-colors duration-150 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            {/* Lokasi */}
            <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Lokasi Toko
            </h3>

            {/* Mobile & tablet: ringkas */}
            <div className="lg:hidden">
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
            <ul className="hidden space-y-4 lg:block" role="list">
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

        {/* ── Pengiriman & Pembayaran ── */}
        <div className="footer-bottom mt-12 border-t border-slate-300 pt-8 dark:border-slate-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-10">

            {/* Pengiriman */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Pengiriman
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SHIPPING_LOGOS.map(({ name, src, filterClass, cardClass }) => (
                  <ShippingLogo key={name} name={name} src={src} filterClass={filterClass} cardClass={cardClass} />
                ))}
              </div>
            </div>

            <div className="hidden h-auto w-px self-stretch bg-slate-200 dark:bg-slate-800 sm:block" aria-hidden="true" />

            {/* Pembayaran */}
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Pembayaran
              </p>
              <div className="flex flex-wrap gap-1.5">
                {PAYMENT_LOGOS.map(({ name, src, imgClass, cardClass }) => (
                  <div
                    key={name}
                    title={name}
                    className={`relative h-8 overflow-hidden rounded border border-slate-200 bg-white sm:h-10 dark:border-slate-700 dark:bg-slate-900 ${cardClass ?? "w-[4.5rem] sm:w-24"}`}
                  >
                    <Image
                      src={src}
                      alt={name}
                      fill
                      className={`object-contain ${imgClass ?? "p-1.5"}`}
                      sizes="(max-width: 640px) 80px, 96px"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom mt-6 flex flex-col items-center justify-between gap-2 border-t border-slate-300 pt-6 dark:border-slate-800 sm:flex-row">
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
