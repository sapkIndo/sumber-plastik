import type { Metadata } from "next";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/layout/Footer";
import { SITE_URL, SITE_NAME, CONTACT, STORES } from "@/constants";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: `Kenali ${SITE_NAME} — distributor plastik dan kemasan terpercaya di Yogyakarta sejak 2010. Lebih dari 1.000 produk food grade, halal, dan bersertifikat ISO untuk kebutuhan FnB, industri, dan retail.`,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: `Tentang Kami | ${SITE_NAME}`,
    description: `Distributor plastik dan kemasan terpercaya di Yogyakarta sejak 2010. 5.000+ pelanggan aktif, 4 cabang, produk food grade & ISO.`,
    url: `${SITE_URL}/about`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${SITE_URL}/about`,
      name: `Tentang Kami — ${SITE_NAME}`,
      url: `${SITE_URL}/about`,
      description: `${SITE_NAME} adalah distributor plastik dan kemasan terpercaya di Yogyakarta sejak 2010.`,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Tentang Kami", item: `${SITE_URL}/about` },
        ],
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      foundingDate: "2010",
      description:
        "Distributor plastik dan kemasan terpercaya di Yogyakarta. Menyediakan lebih dari 1.000 produk food grade, halal, dan bersertifikat ISO untuk FnB, industri, dan retail.",
      email: CONTACT.email,
      telephone: CONTACT.phone,
      address: STORES.map((s) => ({
        "@type": "PostalAddress",
        streetAddress: s.address,
        addressLocality: "Yogyakarta",
        addressCountry: "ID",
      })),
      contactPoint: {
        "@type": "ContactPoint",
        telephone: CONTACT.phone,
        contactType: "customer service",
        availableLanguage: "Indonesian",
      },
    },
  ],
};

const stats = [
  { value: "2010", label: "Tahun Berdiri" },
  { value: "5.000+", label: "Klien Aktif" },
  { value: "1.000+", label: "Jenis Produk" },
  { value: "4", label: "Cabang Yogyakarta" },
];

const milestones = [
  { year: "2010", text: "Berdiri sebagai Aneka Botol — toko kemasan pertama di Yogyakarta dengan fokus pada botol plastik berkualitas." },
  { year: "2014", text: "Ekspansi ragam produk menjawab kebutuhan pelanggan: berbagai jenis kemasan untuk industri FnB dan manufaktur." },
  { year: "2018", text: "Fondasi kepercayaan semakin kokoh dengan lebih dari 1000 pelanggan setia dan kapasitas operasional yang diperkuat." },
  { year: "2022", text: "Rebranding menjadi Sumber Aneka Botol, identitas yang lebih kuat mencerminkan komitmen dan skala bisnis yang berkembang." },
  { year: "2026", text: "Transformasi penuh menjadi Sumber Aneka Plastik dan Kemasan, melayani kebutuhan kemasan menyeluruh dari satu atap." },
];

const values = [
  {
    title: "Kualitas Terjamin",
    desc: <>Seluruh produk memenuhi standar <em>food grade</em>, bersertifikasi halal, dan sesuai <em>ISO</em>. Tidak ada kompromi soal kualitas.</>,
  },
  {
    title: "Harga Kompetitif",
    desc: "Distributor tangan pertama langsung dari pabrik. Tanpa perantara, harga lebih bersaing untuk semua skala pesanan.",
  },
  {
    title: "Pilihan Lengkap",
    desc: <>Lebih dari 1.000 produk: kresek, botol <em>PET &amp; HDPE</em>, <em>cable tie</em>, <em>bubble wrap</em>, dan masih banyak lagi dalam satu tempat.</>,
  },
  {
    title: "Layanan Responsif",
    desc: "Konsultasi produk, pengecekan stok, dan pemesanan cepat via WhatsApp. Tim kami siap membantu setiap hari.",
  },
];

const misi = [
  "Menyediakan produk plastik dan kemasan lengkap untuk segala kebutuhan usaha, dari skala kecil hingga besar, dengan kualitas unggul dan harga bersaing.",
  <>Menjadi <em>one-stop solution</em> yang memudahkan pelanggan dengan layanan cepat, aman, dan efisien di seluruh Indonesia.</>,
  "Membangun kepercayaan melalui transparansi, profesionalisme, dan konsistensi dalam setiap transaksi.",
  "Terus berinovasi dalam produk dan layanan untuk mendukung pertumbuhan bisnis pelanggan kami.",
];

export default function TentangPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content">

        {/* ── Hero ── */}
        <header className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-6 md:pb-20 md:pt-24">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Tentang Perusahaan
            </p>
          </div>
          <h1
            className="mb-5 font-black tracking-tighter text-slate-900 dark:text-slate-50"
            style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)" }}
          >
            {SITE_NAME}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Distributor plastik dan kemasan terpercaya di Yogyakarta sejak 2010. Kami menyediakan lebih dari 1.000 produk berkualitas tinggi, <em>food grade</em>, halal, dan bersertifikat <em>ISO</em>, untuk kebutuhan FnB, industri, dan retail dari skala kecil hingga korporasi.
          </p>

          {/* Stats inline */}
          <div className="mt-10 flex flex-wrap gap-8 border-t border-slate-300 pt-8 dark:border-slate-700">
            {stats.map((s) => (
              <div key={s.label}>
                <p
                  className="font-black tabular-nums text-slate-900 dark:text-slate-50"
                  style={{ fontSize: "clamp(1.5rem, 2vw + 0.5rem, 2rem)" }}
                >
                  {s.value}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </header>

        {/* ── Story ── */}
        <section
          aria-labelledby="cerita-heading"
          className="border-t border-slate-300 dark:border-slate-700"
        >
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

              {/* Left: prose */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                    Kisah Kami
                  </p>
                </div>
                <h2
                  id="cerita-heading"
                  className="mb-6 font-black tracking-tighter text-slate-900 dark:text-slate-50"
                  style={{ fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)" }}
                >
                  Dari Satu Toko,{" "}
                  <span className="text-blue-600">Melayani Ribuan</span>
                </h2>
                <div className="space-y-4 text-base leading-relaxed text-slate-500 dark:text-slate-400">
                  <p>
                    Sumber Aneka Plastik dan Kemasan berawal di tahun 2010, ketika sebuah toko sederhana di Yogyakarta hadir dengan satu tekad: menyediakan botol dan kemasan berkualitas yang mudah dijangkau oleh semua kalangan usaha.
                  </p>
                  <p>
                    Selama lebih dari satu dekade, kepercayaan pelanggan mendorong kami terus berkembang, memperluas ragam produk, memperkuat jaringan distribusi, dan pada akhirnya bertransformasi menjadi Sumber Aneka Plastik dan Kemasan pada 2026.
                  </p>
                  <p>
                    Sebagai distributor tangan pertama langsung dari pabrik, kami menghilangkan perantara sehingga pelanggan mendapatkan harga terbaik tanpa mengorbankan kualitas.
                  </p>
                </div>
              </div>

              {/* Right: timeline */}
              <div>
                <ol className="space-y-0" aria-label="Perjalanan perusahaan">
                  {milestones.map((item, i) => (
                    <li key={item.year} className="relative flex gap-5 pb-7 last:pb-0">
                      {i < milestones.length - 1 && (
                        <div
                          className="absolute left-[1.75rem] top-8 bottom-0 w-px bg-slate-300 dark:bg-slate-700"
                          aria-hidden="true"
                        />
                      )}
                      <div className="relative z-10 flex h-8 min-w-[3.5rem] shrink-0 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                        {item.year}
                      </div>
                      <p className="pt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          </div>
        </section>

        {/* ── Values ── */}
        <section
          aria-labelledby="values-heading"
          className="border-t border-slate-300 dark:border-slate-700"
        >
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
            <div className="mb-12">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  Keunggulan Kami
                </p>
              </div>
              <h2
                id="values-heading"
                className="font-black tracking-tighter text-slate-900 dark:text-slate-50"
                style={{ fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)" }}
              >
                Mengapa Memilih Kami
              </h2>
            </div>

            <ul role="list" className="divide-y divide-slate-300 dark:divide-slate-700">
              {values.map(({ title, desc }, i) => (
                <li key={title} className="grid grid-cols-[2rem_1fr] gap-x-6 py-7 sm:grid-cols-[2rem_1fr_2fr] sm:gap-x-10">
                  <span className="mt-0.5 font-mono text-xs tabular-nums text-slate-400 dark:text-slate-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50">{title}</h3>
                  <p className="col-start-2 mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:col-start-3 sm:mt-0">
                    {desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Visi & Misi ── */}
        <section
          aria-labelledby="vm-heading"
          className="border-t border-slate-300 dark:border-slate-700"
        >
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">

            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Arah &amp; Tujuan
              </p>
            </div>
            <h2
              id="vm-heading"
              className="mb-14 font-black tracking-tighter text-slate-900 dark:text-slate-50"
              style={{ fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)" }}
            >
              Visi &amp; Misi
            </h2>

            {/* Visi */}
            <div className="mb-14">
              <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-blue-600">
                Visi
              </p>
              <p
                className="font-bold leading-snug tracking-tight text-slate-900 dark:text-slate-50"
                style={{ fontSize: "clamp(1.25rem, 1.5vw + 0.75rem, 1.875rem)" }}
              >
                Menjadi toko plastik dan kemasan{" "}
                <span className="text-blue-600">nomor satu di Indonesia</span>{" "}
                yang dikenal karena kualitas, inovasi, dan layanan lengkap, sehingga setiap pelaku usaha merasa aman, praktis, dan puas ketika memilih kami sebagai mitra terpercaya.
              </p>
            </div>

            {/* Misi */}
            <div>
              <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-blue-600">
                Misi
              </p>
              <ul role="list" className="divide-y divide-slate-300 dark:divide-slate-700">
                {misi.map((m, i) => (
                  <li key={i} className="flex items-start gap-5 py-5">
                    <span className="mt-0.5 shrink-0 font-mono text-xs tabular-nums text-slate-400 dark:text-slate-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base">
                      {m}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        {/* ── Store Locations ── */}
        <section
          aria-labelledby="lokasi-heading"
          className="border-t border-slate-300 dark:border-slate-700"
        >
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
            <div className="mb-12">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                  Lokasi Kami
                </p>
              </div>
              <h2
                id="lokasi-heading"
                className="font-black tracking-tighter text-slate-900 dark:text-slate-50"
                style={{ fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)" }}
              >
                Empat Cabang di Yogyakarta
              </h2>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list">
              {STORES.map((store) => (
                <li key={store.name}>
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_6px_20px_-4px_rgb(37_99_235_/_0.09)] dark:border-slate-700/80 dark:bg-slate-900 dark:hover:border-blue-900"
                    style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
                  >
                    <h3 className="mb-5 text-base font-bold text-slate-900 dark:text-slate-50">
                      {store.name}
                    </h3>
                    <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-start gap-2.5">
                        <MapPin size={14} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                        <span>{store.address}</span>
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
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section aria-label="Hubungi kami" className="border-t border-slate-300 dark:border-slate-700">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-20">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2
                  className="font-black tracking-tighter text-slate-900 dark:text-slate-50"
                  style={{ fontSize: "clamp(1.5rem, 2vw + 0.75rem, 2.25rem)" }}
                >
                  Siap Bermitra dengan Kami?
                </h2>
                <p className="mt-2 text-base text-slate-500 dark:text-slate-400">
                  Konsultasi gratis, respons dalam 1×24 jam kerja.
                </p>
              </div>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=Halo Sumber Aneka Plastik dan Kemasan, saya ingin konsultasi kebutuhan plastik dan kemasan untuk bisnis saya.`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-blue-500 active:scale-[0.97]"
                style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
              >
                <em>Chat via WhatsApp</em>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
