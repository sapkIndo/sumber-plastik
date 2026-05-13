import type { Metadata } from "next";
import { MapPin, Phone, Clock, Mail, MessageCircle, ArrowRight, Truck } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { SITE_URL, SITE_NAME, CONTACT, STORES } from "@/constants";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: `Hubungi ${SITE_NAME} untuk konsultasi produk, cek stok, dan pemesanan. Chat WhatsApp, email, atau kunjungi 4 cabang kami di Yogyakarta. Respons cepat 1×24 jam.`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: `Hubungi Kami | ${SITE_NAME}`,
    description: `Konsultasi produk & pemesanan via WhatsApp atau email. 4 cabang di Yogyakarta, pengiriman seluruh Indonesia.`,
    url: `${SITE_URL}/contact`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact`,
  name: `Hubungi Kami — ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  description: `Halaman kontak ${SITE_NAME}. Hubungi via WhatsApp, email, atau kunjungi cabang kami.`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Hubungi Kami", item: `${SITE_URL}/contact` },
    ],
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">

        {/* ── Hero ── */}
        <header className="mx-auto max-w-7xl px-5 pb-14 pt-16 md:px-6 md:pb-20 md:pt-24">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Kontak
            </p>
          </div>
          <h1
            className="mb-5 font-black tracking-tighter text-slate-900 dark:text-slate-50"
            style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)" }}
          >
            Hubungi Kami
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Tim kami siap membantu konsultasi produk, pengecekan stok, dan pemesanan. Respons dalam 1×24 jam kerja.
          </p>
        </header>

        {/* ── Contact methods ── */}
        <section
          aria-label="Metode kontak"
          className="border-y border-slate-300 dark:border-slate-700"
        >
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-16">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* WhatsApp — primary */}
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Halo, saya ingin konsultasi produk kemasan.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group col-span-1 flex flex-col gap-5 rounded-2xl bg-blue-600 p-8 transition-[background-color,transform] duration-200 hover:bg-blue-500 active:scale-[0.98] sm:col-span-2"
                style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
              >
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-200">
                    Hotline Order
                  </p>
                  <p
                    className="font-black text-white"
                    style={{ fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.5rem)" }}
                  >
                    {CONTACT.phone}
                  </p>
                </div>

                {/* Quick action tags */}
                <div className="flex flex-wrap gap-2">
                  {["Konsultasi Produk", "Cek Stok", "Pemesanan", "Minta Katalog"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-white/15 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                      </span>
                      <span className="text-xs text-white/70">Senin–Sabtu, 08.00–18.00 WIB</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={15} className="text-blue-200" aria-hidden="true" />
                    <span className="text-sm font-semibold text-white">Chat via WhatsApp</span>
                    <ArrowRight
                      size={15}
                      className="text-white/50 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex flex-col gap-5 rounded-2xl border border-slate-200/80 bg-white p-8 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_24px_-6px_rgb(37_99_235_/_0.11)] dark:border-slate-700/80 dark:bg-slate-900 dark:hover:border-blue-800"
                style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
              >
                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                    Email
                  </p>
                  <p className="break-all text-base font-bold text-slate-900 dark:text-slate-50">
                    {CONTACT.email}
                  </p>
                </div>

                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  Untuk penawaran resmi, permintaan invoice, dokumen, dan korespondensi formal.
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                    <Clock size={12} aria-hidden="true" />
                    <span>Balasan 1×24 jam kerja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={15} className="text-slate-400" aria-hidden="true" />
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      Kirim Email
                    </span>
                    <ArrowRight
                      size={14}
                      className="text-slate-300 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>

            </div>
          </div>
        </section>

        {/* ── Store locations ── */}
        <section
          aria-labelledby="lokasi-heading"
          className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24"
        >
          <div className="mb-12">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Kunjungi Kami
              </p>
            </div>
            <h2
              id="lokasi-heading"
              className="font-black tracking-tighter text-slate-900 dark:text-slate-50"
              style={{ fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)" }}
            >
              4 Cabang di Yogyakarta
            </h2>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list">
            {STORES.map((store) => (
              <li key={store.name}>
                <div
                  className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_6px_20px_-4px_rgb(37_99_235_/_0.09)] dark:border-slate-700/80 dark:bg-slate-900 dark:hover:border-blue-900"
                  style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                >
                  <h3 className="mb-5 text-base font-bold text-slate-900 dark:text-slate-50">
                    {store.name}
                  </h3>

                  <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-start gap-2.5">
                      <MapPin size={14} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                      <address className="not-italic">{store.address}</address>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone size={14} className="shrink-0 text-blue-600" aria-hidden="true" />
                      <a
                        href={`https://wa.me/${store.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-150 hover:text-blue-600"
                      >
                        {store.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock size={14} className="shrink-0 text-blue-600" aria-hidden="true" />
                      <span>{store.hours}</span>
                    </div>
                  </div>

                  <a
                    href={store.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition-[border-color,background-color,color] duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                  >
                    Lihat di Google Maps
                    <ArrowRight size={12} aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ul>

          {/* Delivery note */}
          <div className="mt-5 flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white px-6 py-5 dark:border-slate-700/80 dark:bg-slate-900">
            <Truck size={16} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-50">
                Tidak bisa ke toko?{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Kami kirim ke seluruh Indonesia.
                </span>
              </p>
              <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                Hubungi kami via WhatsApp untuk informasi ongkos kirim dan estimasi pengiriman.
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
