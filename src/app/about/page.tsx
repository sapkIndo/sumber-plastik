import type { Metadata } from "next";
import { MapPin, Phone, Clock, Award, Package, Users, Target, ArrowRight } from "lucide-react";
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
  { value: "2010", label: "Tahun Berdiri", desc: "Memulai dari satu toko di Yogyakarta" },
  { value: "5.000+", label: "Klien Aktif", desc: "Dari UKM hingga korporasi nasional" },
  { value: "1.000+", label: "Jenis Produk", desc: "PP, PET, HDPE, PVC, LLDPE, PS, dan lainnya" },
  { value: "4", label: "Cabang", desc: "Tersebar di lokasi strategis Yogyakarta" },
];

const milestones = [
  { year: "2010", text: "Berdiri sebagai Aneka Botol — toko kemasan pertama di Yogyakarta dengan fokus pada botol plastik berkualitas." },
  { year: "2014", text: "Ekspansi ragam produk menjawab kebutuhan pelanggan: berbagai jenis kemasan untuk industri FnB dan manufaktur." },
  { year: "2018", text: "Fondasi kepercayaan semakin kokoh dengan lebih dari 100 pelanggan setia dan kapasitas operasional yang diperkuat." },
  { year: "2022", text: "Rebranding menjadi Sumber Aneka Botol — identitas yang lebih kuat mencerminkan komitmen dan skala bisnis yang berkembang." },
  { year: "2024", text: "Transformasi penuh menjadi Sumber Aneka Plastik dan Kemasan — melayani kebutuhan kemasan menyeluruh dari satu atap." },
];

const values = [
  {
    icon: Award,
    title: "Kualitas Terjamin",
    desc: "Seluruh produk memenuhi standar food grade, bersertifikasi halal, dan sesuai ISO — tidak ada kompromi soal kualitas.",
  },
  {
    icon: Package,
    title: "Harga Kompetitif",
    desc: "Distributor tangan pertama langsung dari pabrik. Tanpa perantara, harga lebih bersaing untuk semua skala pesanan.",
  },
  {
    icon: Users,
    title: "Pilihan Lengkap",
    desc: "Lebih dari 1.000 produk: kresek, botol PET & HDPE, cable tie, bubble wrap, dan masih banyak lagi dalam satu tempat.",
  },
  {
    icon: Target,
    title: "Layanan Responsif",
    desc: "Konsultasi produk, pengecekan stok, dan pemesanan cepat via WhatsApp. Tim kami siap membantu setiap hari.",
  },
];

const misi = [
  "Menyediakan produk plastik dan kemasan lengkap untuk segala kebutuhan usaha, dari skala kecil hingga besar, dengan kualitas unggul dan harga bersaing.",
  "Menjadi one-stop solution yang memudahkan pelanggan dengan layanan cepat, aman, dan efisien di seluruh Indonesia.",
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
        <header className="mx-auto max-w-7xl px-5 pb-12 pt-16 md:px-6 md:pb-16 md:pt-24">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Tentang Perusahaan
            </p>
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1
                className="mb-4 font-black tracking-tighter text-slate-900 dark:text-slate-50"
                style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)" }}
              >
                {SITE_NAME}
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
                Distributor plastik dan kemasan terpercaya di Yogyakarta sejak 2010. Kami menyediakan lebih dari 1.000 produk berkualitas tinggi — food grade, halal, dan bersertifikat ISO — untuk kebutuhan FnB, industri, dan retail dari skala kecil hingga korporasi.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600" aria-hidden="true" />
                Berdiri Sejak 2010
              </span>
            </div>
          </div>
        </header>

        {/* ── Stats ── */}
        <section aria-label="Statistik perusahaan" className="border-y border-slate-200 dark:border-slate-700">
          <div className="mx-auto max-w-7xl px-5 md:px-6">
            <dl className="grid grid-cols-2 divide-x divide-y divide-slate-200 dark:divide-slate-700/60 lg:grid-cols-4 lg:divide-y-0">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center px-6 py-10 text-center sm:px-10"
                >
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="mb-1 font-black text-blue-600 dark:text-blue-400" style={{ fontSize: "clamp(1.875rem, 4vw + 0.5rem, 3rem)" }}>
                    {s.value}
                  </dd>
                  <dd className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {s.label}
                  </dd>
                  <dd className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {s.desc}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Story ── */}
        <section
          aria-labelledby="cerita-heading"
          className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24"
        >
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">

            {/* Left — prose */}
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
              <div className="space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                <p>
                  Sumber Aneka Plastik dan Kemasan berawal di tahun 2010, ketika sebuah toko sederhana di Yogyakarta hadir dengan satu tekad: menyediakan botol dan kemasan berkualitas yang mudah dijangkau oleh semua kalangan usaha.
                </p>
                <p>
                  Selama lebih dari satu dekade, kepercayaan pelanggan mendorong kami terus berkembang — memperluas ragam produk, memperkuat jaringan distribusi, dan pada akhirnya bertransformasi menjadi Sumber Aneka Plastik dan Kemasan pada 2024.
                </p>
                <p>
                  Sebagai distributor tangan pertama langsung dari pabrik, kami menghilangkan perantara sehingga pelanggan mendapatkan harga terbaik tanpa mengorbankan kualitas.
                </p>
              </div>
            </div>

            {/* Right — timeline */}
            <div>
              <ol className="space-y-0" aria-label="Perjalanan perusahaan">
                {milestones.map((item, i) => (
                  <li key={item.year} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < milestones.length - 1 && (
                      <div
                        className="absolute left-[1.6rem] top-7 bottom-0 w-px bg-slate-200 dark:bg-slate-700"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative z-10 flex h-7 min-w-[3.25rem] shrink-0 items-center justify-center rounded-full bg-blue-50 text-[11px] font-black text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
                      {item.year}
                    </div>
                    <p className="pt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {item.text}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </section>

        {/* ── Values ── */}
        <section
          aria-labelledby="values-heading"
          className="border-t border-slate-200 dark:border-slate-700"
        >
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
            <div className="mb-10">
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
                Mengapa Memilih Kami?
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
              {values.map(({ icon: Icon, title, desc }) => (
                <li key={title}>
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <h3 className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-50">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Visi & Misi ── */}
        <section
          aria-labelledby="vm-heading"
          className="border-t border-slate-200 dark:border-slate-700"
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
              className="mb-12 font-black tracking-tighter text-slate-900 dark:text-slate-50"
              style={{ fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)" }}
            >
              Visi &amp; Misi
            </h2>

            {/* Visi */}
            <div className="mb-12 rounded-2xl border border-blue-100 bg-blue-50/50 p-8 dark:border-blue-900/40 dark:bg-blue-950/20 md:p-10">
              <p className="mb-3 flex items-center gap-2">
                <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Visi</span>
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
              <p className="mb-6 flex items-center gap-2">
                <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Misi</span>
              </p>
              <ul role="list">
                {misi.map((m, i) => (
                  <li
                    key={i}
                    className="group flex items-start gap-5 border-t border-slate-100 py-5 first:border-t-0 dark:border-slate-800"
                  >
                    <span className="shrink-0 font-mono text-xs tabular-nums text-slate-400 dark:text-slate-500 mt-0.5">
                      0{i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 md:text-base">
                      {m}
                    </p>
                  </li>
                ))}
                <li className="border-t border-slate-100 dark:border-slate-800" role="presentation" />
              </ul>
            </div>

          </div>
        </section>

        {/* ── Store Locations ── */}
        <section
          aria-labelledby="lokasi-heading"
          className="border-t border-slate-200 dark:border-slate-700"
        >
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
            <div className="mb-10">
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
                  <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                    <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-50">
                      {store.name}
                    </h3>
                    <div className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
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
          </div>
        </section>

        {/* ── CTA ── */}
        <section aria-label="Hubungi kami" className="border-t border-slate-200 dark:border-slate-700">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
            <div className="rounded-2xl bg-blue-600 px-8 py-12 text-center md:py-16">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-200">
                Siap Berkolaborasi?
              </p>
              <h2
                className="mb-4 font-black tracking-tighter text-white"
                style={{ fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.75rem)" }}
              >
                Hubungi Kami Sekarang
              </h2>
              <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-blue-100">
                Dapatkan konsultasi gratis tentang produk yang tepat untuk kebutuhan usaha Anda. Tim kami siap merespons dengan cepat.
              </p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-blue-600 transition-[background-color,transform] duration-150 hover:bg-blue-50 active:scale-[0.97]"
              >
                Chat via WhatsApp
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
