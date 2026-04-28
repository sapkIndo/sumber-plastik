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
        <header className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:px-6 md:pb-16 md:pt-24">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Kontak
            </p>
          </div>
          <h1
            className="mb-4 font-black tracking-tighter text-slate-900 dark:text-slate-50"
            style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)" }}
          >
            Hubungi Kami
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Tim kami siap membantu konsultasi produk, pengecekan stok, dan pemesanan. Respons dalam 1×24 jam kerja.
          </p>
        </header>

        {/* ── Contact methods ── */}
        <section
          aria-label="Metode kontak"
          className="border-y border-slate-200 dark:border-slate-700"
        >
          <div className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-16">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

              {/* WhatsApp — primary */}
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Halo, saya ingin konsultasi produk kemasan.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group col-span-1 flex flex-col gap-4 rounded-2xl bg-blue-600 p-6 transition-[background-color,transform] duration-150 hover:bg-blue-500 active:scale-[0.98] sm:col-span-2"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                  <MessageCircle size={20} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-200">
                    Hotline Order
                  </p>
                  <p className="mb-1 text-xl font-black text-white">
                    Chat via WhatsApp
                  </p>
                  <p className="text-sm text-blue-100">{CONTACT.phone}</p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-white">
                  Mulai Chat
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-150 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-150 hover:border-blue-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-800"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-600">
                    Email
                  </p>
                  <p className="mb-1 text-base font-bold text-slate-900 dark:text-slate-50">
                    Kirim Email
                  </p>
                  <p className="break-all text-sm text-slate-500 dark:text-slate-400">
                    {CONTACT.email}
                  </p>
                </div>
                <div className="mt-auto flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                  Kirim Pesan
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-150 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
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
          <div className="mb-10">
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
                <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                  <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {store.name}
                  </h3>

                  <div className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
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
                        className="transition-colors hover:text-blue-600"
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
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 transition-colors hover:text-blue-500"
                  >
                    Lihat di Google Maps
                    <ArrowRight size={12} aria-hidden="true" />
                  </a>
                </div>
              </li>
            ))}
          </ul>

          {/* Delivery callout */}
          <div className="mt-6 flex items-center gap-5 rounded-2xl border border-blue-100 bg-blue-50/70 px-6 py-5 dark:border-blue-900/30 dark:bg-blue-950/20">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-600/25">
              <Truck size={18} className="text-white" aria-hidden="true" />
            </div>
            <div>
              <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                Pengiriman Nasional
              </p>
              <p className="text-base font-bold text-slate-900 dark:text-slate-50">
                Tidak bisa ke toko?{" "}
                <span className="text-blue-600 dark:text-blue-400">Kami kirim ke seluruh Indonesia.</span>
              </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
