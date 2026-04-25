"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight, Plus, Minus } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ── Data ───────────────────────────────────────────────────────────────────

const CATEGORIES = ["Plastik PP", "Plastik PE", "Plastik PVC", "Plastik ABS", "Plastik Nylon", "Polycarbonate"];
const MARQUEE_ITEMS = [...CATEGORIES, ...CATEGORIES, ...CATEGORIES, ...CATEGORIES];

const PRODUCTS = [
  { num: "01", name: "Plastik PP",    full: "Polypropylene",                   desc: "Kemasan makanan & industri. Tahan panas hingga 130°C, ringan, food-grade tersertifikasi BPOM." },
  { num: "02", name: "Plastik PE",    full: "Polyethylene",                    desc: "Kantong & film plastik. Fleksibel, kedap air, tersedia dalam varian HDPE, LDPE, dan LLDPE." },
  { num: "03", name: "Plastik PVC",   full: "Polyvinyl Chloride",              desc: "Pipa, konstruksi & kabel. Kuat, tahan korosi, serbaguna untuk berbagai aplikasi industri." },
  { num: "04", name: "Plastik ABS",   full: "Acrylonitrile Butadiene Styrene", desc: "Komponen otomotif & elektronik. Kuat benturan tinggi, mudah dibentuk, permukaan halus." },
  { num: "05", name: "Plastik Nylon", full: "Polyamide (PA)",                  desc: "Komponen presisi & gear. Tahan aus, kuat tarik tinggi, ideal untuk aplikasi mekanik bergerak." },
  { num: "06", name: "Polycarbonate", full: "PC Transparan",                   desc: "Kaca pelindung & cover lampu. Transparan seperti kaca, 200× lebih kuat dan ringan." },
];

const FEATURES = [
  { title: "Stok Selalu Tersedia",  desc: "Gudang kapasitas 5.000m² memastikan stok selalu siap. Tidak perlu khawatir kehabisan di saat kritis." },
  { title: "Kualitas Terjamin",     desc: "Semua produk melewati quality control ketat dan bersertifikat SNI." },
  { title: "Pengiriman Cepat",      desc: "Jaringan logistik handal ke seluruh Indonesia. Jabodetabek 1-2 hari, luar Jawa 3-7 hari kerja." },
  { title: "Harga Kompetitif",      desc: "Langsung dari produsen tanpa perantara. Dapatkan harga terbaik tanpa kompromi kualitas." },
  { title: "Konsultasi Gratis",     desc: "Tim ahli kami siap membantu memilih produk yang tepat untuk kebutuhan spesifik bisnis Anda." },
  { title: "After-Sales Support",   desc: "Dukungan purna jual tersedia untuk memastikan kepuasan Anda jangka panjang." },
];

const TESTIMONIALS = [
  { name: "Budi Santoso",  role: "Direktur",            company: "PT Maju Jaya",              quote: "Sumber Plastik menjadi mitra terpercaya kami selama 5 tahun. Kualitas produk konsisten dan pengiriman selalu tepat waktu meski volume besar." },
  { name: "Sari Dewi",     role: "Procurement Manager", company: "CV Berkah Industri",         quote: "Harga kompetitif dengan kualitas premium — kombinasi yang jarang ditemukan. Tim sales sangat responsif dan membantu menemukan solusi terbaik." },
  { name: "Ahmad Fauzi",   role: "CEO",                 company: "PT Nusantara Manufacturing", quote: "Sudah mencoba banyak supplier, tapi Sumber Plastik yang paling konsisten. Produk sesuai spesifikasi dan after-sales support yang benar-benar terasa." },
];

const TIMELINE = [
  { year: "2010", event: "Pendirian",         desc: "Sumber Plastik didirikan dengan visi menjadi distributor plastik terpercaya di Indonesia." },
  { year: "2013", event: "Ekspansi Gudang",   desc: "Perluasan gudang ke kapasitas 5.000m² untuk memenuhi permintaan yang terus tumbuh." },
  { year: "2016", event: "Sertifikasi SNI",   desc: "Seluruh produk mendapatkan sertifikasi SNI dan food-grade BPOM." },
  { year: "2019", event: "500 Client Aktif",  desc: "Mencapai milestone 500 client aktif dari berbagai sektor industri nasional." },
  { year: "2023", event: "Ekspansi Nasional", desc: "Jaringan pengiriman diperluas ke seluruh kepulauan Indonesia." },
];

const FAQS = [
  { q: "Berapa minimum order untuk pembelian?",             a: "Kami melayani pembelian dengan minimum order 50 kg untuk produk reguler. Untuk kebutuhan lebih kecil, hubungi tim kami." },
  { q: "Apakah bisa request custom ukuran atau spesifikasi?", a: "Ya, kami menerima custom order sesuai spesifikasi Anda — termasuk ukuran, ketebalan, warna, dan grade material." },
  { q: "Berapa lama estimasi pengiriman ke seluruh Indonesia?", a: "Jabodetabek 1-2 hari kerja, Pulau Jawa 2-3 hari kerja, luar Jawa 3-7 hari kerja." },
  { q: "Apakah produk Sumber Plastik tersertifikasi?",      a: "Ya, seluruh produk kami memiliki sertifikat SNI. Produk food-grade juga telah mendapatkan sertifikasi BPOM." },
  { q: "Bagaimana cara melakukan pemesanan?",               a: "Via WhatsApp, email, atau langsung ke kantor. Tim sales kami memproses pesanan dalam 1×24 jam kerja." },
  { q: "Apakah tersedia plastik food-grade?",               a: "Ya, kami menyediakan plastik PP dan PE food-grade bersertifikat BPOM, aman untuk kontak langsung dengan makanan." },
];

// ── Primitives ─────────────────────────────────────────────────────────────

function IconBox() {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-blue-200 bg-blue-50">
      <div className="h-4 w-4 border border-dashed border-blue-300" />
    </div>
  );
}

function Tag({ children }: { children: string }) {
  return (
    <span className="absolute right-4 top-4 text-[9px] font-bold uppercase tracking-[0.3em] text-blue-200" aria-hidden="true">
      [{children}]
    </span>
  );
}

// ── NAVBAR ─────────────────────────────────────────────────────────────────

function WfNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-8 z-40 flex h-16 items-center border-b border-blue-200 bg-white/95 px-6 backdrop-blur-sm md:px-12 lg:px-16">
      <div className="flex w-full max-w-7xl mx-auto items-center gap-10">
        <div className="flex h-7 w-36 items-center justify-center border border-blue-200 bg-blue-50">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">LOGO</span>
        </div>
        <div className="hidden flex-1 items-center gap-8 md:flex">
          {["Produk", "Mengapa Kami", "Tentang Kami", "FAQ"].map((link) => (
            <span key={link} className="border-b border-blue-200 pb-0.5 text-sm font-medium text-blue-700">{link}</span>
          ))}
        </div>
        <button className="rounded-none border border-blue-700 bg-blue-600 px-5 py-2 text-sm font-semibold text-white">
          Hubungi Kami
        </button>
      </div>
    </nav>
  );
}

// ── HERO ───────────────────────────────────────────────────────────────────

function WfHero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".wf-hero-overline", { opacity: 0, y: -12, duration: 0.5 })
      .from(".wf-hero-title",    { opacity: 0, y: 70,  duration: 1.1 }, "-=0.2")
      .from(".wf-hero-rule",     { scaleX: 0, duration: 0.7, transformOrigin: "left center" }, "-=0.3")
      .from(".wf-hero-sub",      { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
      .from(".wf-hero-cta",      { opacity: 0, y: 16, duration: 0.5 }, "-=0.4")
      .from(".wf-hero-ghost",    { opacity: 0, duration: 0.5 }, "-=0.3");
  }, { scope: ref });

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative flex min-h-svh flex-col overflow-hidden px-6 pb-12 pt-24 md:px-12 lg:px-16"
    >
      <Tag>HERO</Tag>

      {/* Overline */}
      <div className="wf-hero-overline mb-14 flex items-center gap-3">
        <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-500">
          Distributor Resmi &amp; Terpercaya Sejak 2010
        </span>
      </div>

      {/* Headline */}
      <h1 className="wf-hero-title text-5xl font-black leading-[0.93] tracking-tighter text-blue-900 sm:text-6xl md:text-7xl lg:text-8xl">
        Solusi Plastik{" "}
        <span className="text-blue-600">Berkualitas Tinggi</span>{" "}
        <span className="font-bold text-blue-200">untuk Industri Anda.</span>
      </h1>

      {/* Ghost text */}
      <div
        className="wf-hero-ghost relative hidden flex-1 select-none items-center justify-center overflow-hidden md:flex"
        aria-hidden="true"
      >
        <p className="text-center font-black leading-none tracking-tighter text-blue-100" style={{ fontSize: "clamp(4rem, 15vw, 18rem)" }}>
          Q U A L I T Y .
        </p>
      </div>
      <div className="flex-1 md:hidden" aria-hidden="true" />

      {/* Bottom bar */}
      <div>
        <div className="wf-hero-rule mb-8 h-px w-full bg-blue-200" />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="wf-hero-sub max-w-sm text-base leading-relaxed text-blue-500">
            Sumber Plastik menyediakan produk plastik premium untuk kebutuhan industri dan
            rumah tangga. Pengiriman cepat ke seluruh Indonesia dengan jaminan kualitas terbaik.
          </p>
          <div className="wf-hero-cta flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            <button className="rounded-none border border-blue-700 bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white">
              <span className="flex items-center gap-2">
                Hubungi Kami Sekarang
                <ArrowRight size={15} aria-hidden="true" />
              </span>
            </button>
            <button className="rounded-none border border-blue-300 px-7 py-3.5 text-sm font-semibold text-blue-500">
              Lihat Produk
            </button>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="pt-8">
        <div className="h-px w-full bg-blue-200" />
        <div className="overflow-hidden py-3.5">
          <div className="flex animate-marquee gap-10 whitespace-nowrap" aria-hidden="true">
            {MARQUEE_ITEMS.map((item, i) => (
              <span key={i} className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                {item}
                <span className="h-1 w-1 rounded-full bg-blue-300/60" />
              </span>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-blue-200" />
      </div>
    </section>
  );
}

// ── STATS ──────────────────────────────────────────────────────────────────

function WfStats() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wf-stat", {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.065, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });
  }, { scope: ref });

  const stats = [
    { value: "500+", label: "Client Aktif",        desc: "Perusahaan dari berbagai sektor industri" },
    { value: "14+",  label: "Tahun Pengalaman",    desc: "Melayani industri nasional sejak 2010" },
    { value: "50+",  label: "Jenis Produk",        desc: "Beragam pilihan plastik berkualitas tinggi" },
    { value: "99%",  label: "Tingkat Kepuasan",    desc: "Client puas dengan produk dan layanan kami" },
  ];

  return (
    <section ref={ref} aria-label="Statistik" className="relative border-y border-blue-200 bg-blue-50 py-16">
      <Tag>STATS</Tag>
      <div className="mx-auto max-w-7xl px-6">
        <dl className="grid grid-cols-2 gap-px bg-blue-200 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="wf-stat flex flex-col items-center bg-white px-4 py-10 text-center sm:px-8">
              <dd className="mb-1 text-3xl font-black text-blue-600 sm:text-4xl md:text-5xl">{s.value}</dd>
              <p className="mb-1 text-sm font-semibold text-blue-900">{s.label}</p>
              <p className="text-xs leading-relaxed text-blue-400">{s.desc}</p>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ── PRODUCTS ───────────────────────────────────────────────────────────────

function WfProducts() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wf-product-row", {
      opacity: 0, x: -16, duration: 0.6, stagger: 0.07, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} id="produk" aria-labelledby="wf-products-heading" className="relative px-5 py-16 md:px-6 md:py-28">
      <Tag>PRODUK</Tag>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="wf-products-heading" className="text-3xl font-bold tracking-tight text-blue-900 md:text-4xl lg:text-5xl">
            Produk <span className="text-blue-300">Unggulan</span>
          </h2>
          <div className="flex flex-col gap-2 lg:items-end lg:text-right">
            <p className="max-w-sm text-sm leading-relaxed text-blue-500">
              Lebih dari 50 jenis produk plastik berkualitas tinggi untuk kebutuhan industri nasional dan internasional.
            </p>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">50+ jenis tersedia</span>
          </div>
        </div>

        <ul role="list">
          {PRODUCTS.map((p) => (
            <li key={p.name} className="wf-product-row border-t border-blue-100">
              <div className="flex items-center gap-4 py-5 md:gap-6 md:py-6">
                <span className="w-8 shrink-0 font-mono text-xs tabular-nums text-blue-300 md:w-10">{p.num}</span>
                <IconBox />
                <div className="w-32 shrink-0 md:w-44">
                  <p className="text-sm font-semibold text-blue-900 md:text-base">{p.name}</p>
                  <p className="text-xs text-blue-300">{p.full}</p>
                </div>
                <p className="hidden flex-1 text-sm leading-relaxed text-blue-500 md:block">{p.desc}</p>
                <ArrowUpRight size={15} className="ml-auto shrink-0 text-blue-300" aria-hidden="true" />
              </div>
              <p className="pb-5 pl-[calc(2rem+2.25rem+2rem)] text-sm leading-relaxed text-blue-400 md:hidden">{p.desc}</p>
            </li>
          ))}
          <li className="border-t border-blue-100" role="presentation" />
        </ul>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-blue-300">Butuh produk selain di atas? Konsultasikan kebutuhan Anda.</p>
          <span className="text-xs font-medium text-blue-600">Hubungi tim kami →</span>
        </div>
      </div>
    </section>
  );
}

// ── WHY US ─────────────────────────────────────────────────────────────────

function WfWhyUs() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wf-whyus-heading", {
      opacity: 0, y: 30, duration: 0.7, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });
    gsap.from(".wf-whyus-card", {
      opacity: 0, y: 35, duration: 0.6, stagger: 0.065, ease: "expo.out",
      scrollTrigger: { trigger: ".wf-whyus-grid", start: "top 78%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} aria-labelledby="wf-whyus-heading" className="relative bg-blue-50 px-5 py-16 md:px-6 md:py-28">
      <Tag>MENGAPA KAMI</Tag>
      <div className="mx-auto max-w-7xl">
        <div className="wf-whyus-heading mb-16 flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">Mengapa Kami</p>
            <h2 id="wf-whyus-heading" className="text-3xl font-bold leading-tight tracking-tight text-blue-900 md:text-4xl lg:text-5xl">
              Kenapa Ribuan Bisnis{" "}
              <span className="text-blue-400">Mempercayai Kami</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-blue-500 lg:text-right">
            Kami bukan sekadar supplier. Kami adalah mitra bisnis yang berkomitmen pada pertumbuhan jangka panjang bersama Anda.
          </p>
        </div>

        <ul className="wf-whyus-grid grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {FEATURES.map((f) => (
            <li key={f.title} className="wf-whyus-card">
              <article className="flex h-full flex-col gap-3 border border-blue-200 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center border border-blue-200 bg-blue-50">
                  <div className="h-4 w-4 border border-dashed border-blue-300" />
                </div>
                <h3 className="text-base font-semibold text-blue-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-blue-500">{f.desc}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ── CLIENTS ────────────────────────────────────────────────────────────────

function WfClients() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wf-clients-heading", {
      opacity: 0, y: 25, duration: 0.7, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });
  }, { scope: ref });

  const LOGO_COUNT = 10;
  const allLogos = [...Array(LOGO_COUNT), ...Array(LOGO_COUNT)];

  return (
    <section ref={ref} aria-label="Klien Kami" className="relative border-y border-blue-200 py-16 px-5 md:px-6">
      <Tag>KLIEN</Tag>
      <div className="mx-auto max-w-7xl">
        <div className="wf-clients-heading mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-500">Dipercaya Oleh</p>
          <h2 className="text-2xl font-bold tracking-tight text-blue-900 md:text-3xl">
            500+ Perusahaan di Seluruh Indonesia
          </h2>
        </div>

        <div className="overflow-hidden">
          <div className="flex animate-marquee gap-6" aria-hidden="true">
            {allLogos.map((_, i) => (
              <div
                key={i}
                className="flex h-12 w-32 shrink-0 items-center justify-center border border-blue-200 bg-blue-50"
              >
                <span className="text-[9px] font-bold uppercase tracking-widest text-blue-300">
                  CLIENT {(i % LOGO_COUNT) + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TESTIMONIALS ───────────────────────────────────────────────────────────

function WfTestimonials() {
  const ref = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
      defaults: { ease: "expo.out" },
    });
    tl.from(".wf-testi-header",  { opacity: 0, y: 25, duration: 0.7 })
      .from(".wf-testi-authors", { opacity: 0, x: -20, duration: 0.7 }, "-=0.4")
      .from(".wf-testi-quote",   { opacity: 0, x: 20,  duration: 0.7 }, "-=0.6");
  }, { scope: ref });

  const active = TESTIMONIALS[activeIdx];

  return (
    <section ref={ref} aria-labelledby="wf-testi-heading" className="relative bg-blue-50 px-5 py-16 md:px-6 md:py-28">
      <Tag>TESTIMONI</Tag>
      <div className="mx-auto max-w-7xl">
        <div className="wf-testi-header mb-16 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="wf-testi-heading" className="text-3xl font-bold tracking-tight text-blue-900 md:text-4xl lg:text-5xl">
            Kata Mereka <span className="text-blue-300">tentang Kami</span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-blue-500 lg:text-right">
            Kepercayaan 500+ perusahaan adalah bukti komitmen kami terhadap kualitas dan layanan.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Author nav */}
          <nav aria-label="Pilih testimoni" className="wf-testi-authors">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                onClick={() => setActiveIdx(i)}
                aria-pressed={activeIdx === i}
                className={`flex w-full flex-col gap-0.5 border-l-2 px-5 py-4 text-left transition-all duration-200 ${
                  activeIdx === i ? "border-blue-600 bg-white" : "border-blue-200 hover:border-blue-400"
                }`}
              >
                <span className={`mb-1 font-mono text-[10px] tabular-nums tracking-widest ${activeIdx === i ? "text-blue-600" : "text-blue-300"}`}>
                  0{i + 1}
                </span>
                <span className={`text-sm font-semibold ${activeIdx === i ? "text-blue-900" : "text-blue-500"}`}>
                  {t.name}
                </span>
                <span className={`text-xs ${activeIdx === i ? "text-blue-600" : "text-blue-400"}`}>
                  {t.role} · {t.company}
                </span>
              </button>
            ))}
          </nav>

          {/* Quote */}
          <div className="wf-testi-quote">
            <figure>
              <div className="mb-6 select-none font-serif text-8xl leading-none text-blue-200" aria-hidden="true">
                &ldquo;
              </div>
              <blockquote>
                <p className="text-xl leading-relaxed text-blue-800 md:text-2xl">{active.quote}</p>
              </blockquote>
              <figcaption className="mt-8 border-t border-blue-200 pt-6">
                <p className="text-sm font-semibold text-blue-900">{active.name}</p>
                <p className="text-xs text-blue-400">{active.role} · {active.company}</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── TIMELINE ───────────────────────────────────────────────────────────────

function WfTimeline() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wf-tl-item", {
      opacity: 0, y: 25, duration: 0.6, stagger: 0.1, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} aria-labelledby="wf-tl-heading" className="relative px-5 py-16 md:px-6 md:py-28">
      <Tag>TIMELINE</Tag>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">Perjalanan Kami</p>
          <h2 id="wf-tl-heading" className="text-3xl font-bold tracking-tight text-blue-900 md:text-4xl lg:text-5xl">
            14 Tahun <span className="text-blue-300">Melayani Industri</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-[3.5rem] top-0 hidden w-px bg-blue-200 md:block" aria-hidden="true" />

          <ul className="space-y-0">
            {TIMELINE.map((item) => (
              <li key={item.year} className="wf-tl-item flex items-start gap-6 border-b border-blue-100 py-7 md:gap-12">
                {/* Year */}
                <div className="w-14 shrink-0 text-right">
                  <span className="font-mono text-sm font-bold text-blue-600 md:text-base">{item.year}</span>
                </div>
                {/* Dot */}
                <div className="relative hidden shrink-0 items-center justify-center md:flex" aria-hidden="true">
                  <div className="h-3 w-3 border-2 border-blue-600 bg-white" />
                </div>
                {/* Content */}
                <div className="flex-1">
                  <p className="mb-1 text-base font-semibold text-blue-900">{item.event}</p>
                  <p className="text-sm leading-relaxed text-blue-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── VISI MISI ──────────────────────────────────────────────────────────────

function WfVisiMisi() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wf-vm-col", {
      opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 78%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} aria-labelledby="wf-vm-heading" className="relative bg-blue-50 px-5 py-16 md:px-6 md:py-28">
      <Tag>VISI MISI</Tag>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">Tentang Kami</p>
          <h2 id="wf-vm-heading" className="text-3xl font-bold tracking-tight text-blue-900 md:text-4xl lg:text-5xl">
            Visi &amp; Misi
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="wf-vm-col border border-blue-200 bg-white p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">Visi</p>
            <h3 className="mb-4 text-xl font-bold leading-snug text-blue-900">
              Menjadi distributor plastik nomor satu yang paling terpercaya di Indonesia.
            </h3>
            <p className="text-sm leading-relaxed text-blue-500">
              Kami berkomitmen untuk menyediakan produk plastik berkualitas tinggi yang mendukung
              pertumbuhan industri nasional dan mendorong inovasi berkelanjutan.
            </p>
          </div>

          <div className="wf-vm-col border border-blue-200 bg-white p-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-600">Misi</p>
            <ul className="space-y-3">
              {[
                "Menyediakan produk plastik berkualitas tinggi dan bersertifikat",
                "Memberikan layanan yang cepat, responsif, dan solutif",
                "Menjaga harga kompetitif tanpa mengorbankan kualitas",
                "Mendukung pertumbuhan bisnis klien dengan solusi inovatif",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-blue-700">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-blue-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ ────────────────────────────────────────────────────────────────────

function WfFAQ() {
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(() => {
    gsap.from(".wf-faq-item", {
      opacity: 0, y: 20, duration: 0.5, stagger: 0.08, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} aria-labelledby="wf-faq-heading" className="relative px-5 py-16 md:px-6 md:py-28">
      <Tag>FAQ</Tag>
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">FAQ</p>
          <h2 id="wf-faq-heading" className="mb-4 text-3xl font-bold tracking-tight text-blue-900 md:text-4xl lg:text-5xl">
            Pertanyaan yang{" "}
            <span className="text-blue-300">Sering Ditanyakan</span>
          </h2>
        </div>

        <dl className="space-y-2">
          {FAQS.map((f, i) => (
            <div key={i} className="wf-faq-item overflow-hidden border border-blue-200 bg-white transition-colors hover:border-blue-400">
              <dt>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 text-sm font-semibold text-blue-900 md:text-base">{f.q}</span>
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center border border-blue-200 bg-blue-50 text-blue-600"
                    aria-hidden="true"
                  >
                    {openIndex === i ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>
              </dt>
              <dd
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-relaxed text-blue-500">{f.a}</p>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// ── CTA ────────────────────────────────────────────────────────────────────

function WfCTA() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".wf-cta-inner", {
      opacity: 0, y: 30, duration: 0.8, ease: "expo.out",
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
    });
  }, { scope: ref });

  return (
    <section ref={ref} aria-label="Call to Action" className="bg-blue-600 px-5 py-16 md:px-6 md:py-28">
      <div className="mx-auto max-w-3xl text-center wf-cta-inner">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-blue-200">Siap Bekerjasama?</p>
        <h2 className="mb-6 text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">
          Mulai Konsultasi Gratis Hari Ini
        </h2>
        <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-blue-200">
          Tim kami siap membantu menemukan solusi plastik yang paling tepat untuk kebutuhan bisnis Anda.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <button className="rounded-none border border-white bg-white px-8 py-3.5 text-sm font-semibold text-blue-600">
            Hubungi via WhatsApp
          </button>
          <button className="rounded-none border border-blue-300 px-8 py-3.5 text-sm font-semibold text-white">
            Lihat Produk
          </button>
        </div>
      </div>
    </section>
  );
}

// ── FOOTER ─────────────────────────────────────────────────────────────────

function WfFooter() {
  return (
    <footer className="border-t border-blue-200 bg-white px-5 py-14 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4 flex h-7 w-36 items-center justify-center border border-blue-200 bg-blue-50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">LOGO</span>
            </div>
            <p className="text-sm leading-relaxed text-blue-500">
              Distributor dan supplier produk plastik berkualitas tinggi sejak 2010.
            </p>
          </div>

          {[
            { label: "Produk",     links: ["Plastik PP", "Plastik PE", "Plastik PVC", "Plastik ABS", "Polycarbonate"] },
            { label: "Perusahaan", links: ["Tentang Kami", "Visi & Misi", "Timeline", "Karier"] },
            { label: "Kontak",     links: ["WhatsApp", "Email", "Lokasi", "Jam Operasional"] },
          ].map((col) => (
            <div key={col.label}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-900">{col.label}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link} className="text-sm text-blue-500">{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-blue-100 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-blue-400">© 2024 Sumber Plastik. Hak cipta dilindungi.</p>
          <p className="text-xs text-blue-300">Sitemap · Privacy Policy · Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────

export default function WireframePage() {
  const PROTO_ITEMS = Array.from({ length: 16 });

  return (
    <div className="bg-white font-sans text-blue-900">
      {/* Prototype banner — top bar */}
      <div
        className="fixed left-0 right-0 top-0 z-50 flex h-8 items-center overflow-hidden bg-blue-600"
        aria-label="Halaman prototype — belum final"
      >
        <div className="flex animate-marquee gap-10 whitespace-nowrap">
          {PROTO_ITEMS.map((_, i) => (
            <span key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-white/70">
              PROTOTYPE
              <span className="h-1 w-1 bg-white/30" />
            </span>
          ))}
        </div>
      </div>

      <WfNavbar />

      <main>
        <WfHero />
        <WfStats />
        <WfProducts />
        <WfWhyUs />
        <WfClients />
        <WfTestimonials />
        <WfTimeline />
        <WfVisiMisi />
        <WfFAQ />
        <WfCTA />
      </main>

      <WfFooter />
    </div>
  );
}
