"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const faqs = [
  {
    q: "Berapa minimum order untuk pembelian?",
    a: "Kami melayani pembelian dengan minimum order 50 kg untuk produk reguler. Untuk kebutuhan dalam jumlah kecil, silakan hubungi tim kami untuk solusi yang sesuai.",
  },
  {
    q: "Apakah bisa request custom ukuran atau spesifikasi?",
    a: "Ya, kami menerima custom order sesuai spesifikasi Anda — termasuk ukuran, ketebalan, warna, dan grade material. Konsultasikan kebutuhan Anda dengan tim teknis kami.",
  },
  {
    q: "Berapa lama estimasi pengiriman ke seluruh Indonesia?",
    a: "Jabodetabek 1-2 hari kerja, Pulau Jawa 2-3 hari kerja, luar Jawa 3-7 hari kerja. Pengiriman ekspres tersedia untuk kebutuhan mendesak.",
  },
  {
    q: "Apakah produk Sumber Plastik tersertifikasi?",
    a: "Ya, seluruh produk kami memiliki sertifikat SNI. Produk food-grade juga telah mendapatkan sertifikasi BPOM dan memenuhi standar food contact material.",
  },
  {
    q: "Bagaimana cara melakukan pemesanan?",
    a: "Pemesanan bisa dilakukan via WhatsApp, email, atau langsung ke kantor kami. Tim sales kami akan memproses pesanan dalam 1x24 jam kerja dan memberikan konfirmasi beserta invoice.",
  },
  {
    q: "Apakah tersedia plastik food-grade untuk industri makanan?",
    a: "Ya, kami menyediakan plastik PP dan PE food-grade yang telah bersertifikat BPOM. Aman untuk kontak langsung dengan makanan dan minuman, sesuai regulasi BPOM terbaru.",
  },
];

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.from(".faq-item", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
    },
    { scope: ref }
  );

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section ref={ref} aria-labelledby="faq-heading" className="px-5 py-16 md:px-6 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-500">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Pertanyaan yang{" "}
            <span className="text-neutral-400">Sering Ditanyakan</span>
          </h2>
        </div>

        <dl className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="faq-item overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 transition-colors hover:border-neutral-700"
            >
              <dt>
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="pr-4 text-sm font-semibold text-white md:text-base">
                    {f.q}
                  </span>
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-orange-500 transition-transform"
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
                  <p className="px-6 pb-5 text-sm leading-relaxed text-neutral-400">{f.a}</p>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
