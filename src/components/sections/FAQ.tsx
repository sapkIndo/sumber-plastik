"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FaqCategory = "Pemesanan" | "Produk" | "Pengiriman";
const CATEGORIES: ("Semua" | FaqCategory)[] = ["Semua", "Pemesanan", "Produk", "Pengiriman"];

const faqs: { category: FaqCategory; q: string; a: string }[] = [
  {
    category: "Pemesanan",
    q: "Berapa minimum order untuk pembelian?",
    a: "Tidak ada batasan minimum. Kami melayani dari 1 pcs (ecer) hingga partai besar ribuan pcs atau berton-ton — semua kalangan dari skala kecil, menengah, hingga perusahaan besar dan pabrik, semua kami layani.",
  },
  {
    category: "Pemesanan",
    q: "Bagaimana cara melakukan pemesanan?",
    a: "Pemesanan dapat dilakukan langsung ke toko kami atau melalui hotline order. Tim kami siap membantu, memproses pesanan, dan memberikan konfirmasi beserta invoice dengan cepat.",
  },
  {
    category: "Produk",
    q: "Bagaimana struktur harga produk?",
    a: "Kami memiliki dua tier harga: harga ecer untuk pembelian satuan (cocok untuk retail dan perorangan), dan harga grosir untuk pembelian partai besar (untuk perusahaan dan pabrik). Semua kalangan — kecil, menengah, maupun besar — mendapatkan harga yang sesuai skala kebutuhan mereka.",
  },
  {
    category: "Produk",
    q: "Apakah bisa request custom ukuran atau spesifikasi?",
    a: "Ya, kami menerima custom order sesuai ukuran dan spesifikasi khusus Anda. Untuk produk dengan spesifikasi non-standar, umumnya berlaku minimum order quantity (MOQ) tertentu. Konsultasikan kebutuhan Anda dengan tim kami untuk detail lebih lanjut.",
  },
  {
    category: "Produk",
    q: "Apakah produk tersedia dalam standar food grade, halal, dan ISO?",
    a: "Ya. Kami menyediakan produk food grade, bersertifikat halal, dan memenuhi standar ISO. Seluruh dokumen sertifikasi lengkap dapat dimintakan sesuai kebutuhan Anda.",
  },
  {
    category: "Pengiriman",
    q: "Berapa lama estimasi pengiriman ke seluruh Indonesia?",
    a: "Pengiriman kami cepat dan menjangkau seluruh Indonesia. Jabodetabek 1–2 hari kerja, Pulau Jawa 2–3 hari kerja, luar Jawa 3–7 hari kerja. Pengiriman ekspres tersedia untuk kebutuhan mendesak.",
  },
  {
    category: "Pengiriman",
    q: "Apakah bisa ambil barang langsung ke toko?",
    a: "Ya, layanan pick-up langsung tersedia di toko kami. Mohon konfirmasi terlebih dahulu agar stok sudah disiapkan saat Anda tiba.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const prevHeightRef = useRef<number>(0);
  const isFirstRender = useRef(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<"Semua" | FaqCategory>("Semua");

  const filtered =
    activeCategory === "Semua" ? faqs : faqs.filter((f) => f.category === activeCategory);

  useGSAP(
    () => {
      gsap.from(".faq-left", {
        opacity: 0, x: -24, duration: 0.8, ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });

      gsap.from(".faq-tabs", {
        opacity: 0, y: 16, duration: 0.6, ease: "expo.out", delay: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
      gsap.from(".faq-item", {
        opacity: 0, y: 20, duration: 0.5, stagger: 0.07, ease: "expo.out", delay: 0.15,
        scrollTrigger: { trigger: accordionRef.current, start: "top 82%", once: true },
      });
    },
    { scope: ref }
  );

  const handleCategoryChange = (cat: "Semua" | FaqCategory) => {
    if (accordionRef.current) {
      prevHeightRef.current = accordionRef.current.offsetHeight;
      gsap.set(accordionRef.current, { height: prevHeightRef.current });
    }
    setActiveCategory(cat);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setOpenIndex(null);
    if (!accordionRef.current) return;

    // Measure new natural height by briefly unlocking
    gsap.set(accordionRef.current, { height: "auto" });
    const newHeight = accordionRef.current.offsetHeight;
    gsap.set(accordionRef.current, { height: prevHeightRef.current });

    // Fade-slide items in
    const items = accordionRef.current.querySelectorAll<HTMLElement>(".faq-item");
    gsap.fromTo(
      items,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "expo.out" }
    );

    // Animate container height
    gsap.killTweensOf(accordionRef.current);
    gsap.to(accordionRef.current, {
      height: newHeight,
      duration: 0.45,
      ease: "expo.out",
      onComplete: () => gsap.set(accordionRef.current!, { height: "auto" }),
    });
  }, [activeCategory]);

  return (
    <section ref={ref} aria-labelledby="faq-heading" className="px-5 py-16 md:px-6 md:py-28">

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">

          {/* Left: heading + decorative SVG */}
          <div className="faq-left lg:sticky lg:top-28 lg:self-start">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">FAQ</p>
            <h2
              id="faq-heading"
              className="mb-4 font-bold tracking-tight text-slate-900 dark:text-slate-50"
              style={{ fontSize: "clamp(1.875rem, 2vw + 1.25rem, 3rem)" }}
            >
              Pertanyaan yang{" "}
              <span className="text-slate-400 dark:text-slate-500">Sering Ditanyakan</span>
            </h2>
            <p className="mb-10 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Jawaban atas pertanyaan yang paling sering kami terima. Tidak menemukan jawaban Anda?
              Hubungi tim kami langsung.
            </p>

          </div>

          {/* Right: tabs + accordion */}
          <div>
            <div
              className="faq-tabs mb-6 flex flex-wrap gap-2"
              role="tablist"
              aria-label="Filter pertanyaan berdasarkan kategori"
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-[background-color,color,border-color,box-shadow] duration-200 ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:text-blue-400"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Accordion — height animated on tab switch */}
            <div ref={accordionRef} className="overflow-hidden">
              <dl className="space-y-3">
                {filtered.map((f, i) => (
                  <div
                    key={f.q}
                    className="faq-item overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-blue-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-800"
                  >
                    <dt>
                      <button
                        id={`faq-btn-${i}`}
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        aria-expanded={openIndex === i}
                        aria-controls={`faq-content-${i}`}
                        className="flex w-full items-center gap-4 px-6 py-5 text-left focus-visible:rounded-t-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600"
                      >
                        <span
                          className="w-6 shrink-0 font-mono text-xs font-bold text-blue-600/40"
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-sm font-semibold text-slate-900 dark:text-slate-50 md:text-base">
                          {f.q}
                        </span>
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 transition-transform duration-300 ${
                            openIndex === i ? "rotate-45" : ""
                          }`}
                          aria-hidden="true"
                        >
                          <Plus size={12} />
                        </span>
                      </button>
                    </dt>
                    <dd
                      id={`faq-content-${i}`}
                      aria-labelledby={`faq-btn-${i}`}
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pl-16 pr-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          {f.a}
                        </p>
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
