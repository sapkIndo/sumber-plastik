import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/HeroB"; // switch: HeroA | HeroB | Hero

const Stats = dynamic(() => import("@/components/sections/Stats"));
const Products = dynamic(() => import("@/components/sections/Products"));
const ProductSpotlight = dynamic(() => import("@/components/sections/ProductSpotlight"));
const WhyUs = dynamic(() => import("@/components/sections/WhyUs"));
const Clients = dynamic(() => import("@/components/sections/Clients"));
const StoreBranch = dynamic(() => import("@/components/sections/StoreBranch"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const Timeline = dynamic(() => import("@/components/sections/Timeline"));
const VisiMisi = dynamic(() => import("@/components/sections/VisiMisi"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const SocialMedia = dynamic(() => import("@/components/sections/SocialMedia"));
const CTA = dynamic(() => import("@/components/sections/CTA"));

export const metadata: Metadata = {
  alternates: {
    canonical: "https://sumberanekaplastikdankemasan.com",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Berapa minimum order untuk pembelian?", acceptedAnswer: { "@type": "Answer", text: "Tidak ada batasan minimum. Kami melayani dari 1 pcs (ecer) hingga partai besar ribuan pcs atau berton-ton — semua kalangan dari skala kecil, menengah, hingga perusahaan besar dan pabrik, semua kami layani." } },
    { "@type": "Question", name: "Bagaimana cara melakukan pemesanan?", acceptedAnswer: { "@type": "Answer", text: "Pemesanan dapat dilakukan langsung ke toko kami atau melalui hotline order. Tim kami siap membantu, memproses pesanan, dan memberikan konfirmasi beserta invoice dengan cepat." } },
    { "@type": "Question", name: "Bagaimana struktur harga produk?", acceptedAnswer: { "@type": "Answer", text: "Kami memiliki dua tier harga: harga ecer untuk pembelian satuan (cocok untuk retail dan perorangan), dan harga grosir untuk pembelian partai besar (untuk perusahaan dan pabrik). Semua kalangan mendapatkan harga yang sesuai skala kebutuhan mereka." } },
    { "@type": "Question", name: "Apakah bisa request custom ukuran atau spesifikasi?", acceptedAnswer: { "@type": "Answer", text: "Ya, kami menerima custom order sesuai ukuran dan spesifikasi khusus Anda. Untuk produk dengan spesifikasi non-standar, umumnya berlaku minimum order quantity (MOQ) tertentu." } },
    { "@type": "Question", name: "Apakah produk tersedia dalam standar food grade, halal, dan ISO?", acceptedAnswer: { "@type": "Answer", text: "Ya. Kami menyediakan produk food grade, bersertifikat halal, dan memenuhi standar ISO. Seluruh dokumen sertifikasi lengkap dapat dimintakan sesuai kebutuhan Anda." } },
    { "@type": "Question", name: "Berapa lama estimasi pengiriman ke seluruh Indonesia?", acceptedAnswer: { "@type": "Answer", text: "Jabodetabek 1–2 hari kerja, Pulau Jawa 2–3 hari kerja, luar Jawa 3–7 hari kerja. Pengiriman ekspres tersedia untuk kebutuhan mendesak." } },
    { "@type": "Question", name: "Apakah bisa ambil barang langsung ke toko?", acceptedAnswer: { "@type": "Answer", text: "Ya, layanan pick-up langsung tersedia di toko kami. Mohon konfirmasi terlebih dahulu agar stok sudah disiapkan saat Anda tiba." } },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sumber Aneka Plastik dan Kemasan",
  description:
    "Supplier kemasan plastik dan paper untuk FnB, restoran, catering, dan industri. 1.000+ produk kemasan food grade, halal, dan bersertifikat ISO. Melayani ecer hingga grosir ke seluruh Indonesia.",
  url: "https://sumberanekaplastikdankemasan.com",
  telephone: "+62-895-0988-0988",
  email: "sapkindonesia@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Gondosuli No.1",
    addressLocality: "Yogyakarta",
    addressRegion: "Daerah Istimewa Yogyakarta",
    addressCountry: "ID",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
  hasMap: "https://maps.google.com/?q=Jl.+Gondosuli+No.1+Baciro+Yogyakarta",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main id="main-content">
        <Hero />
        <Stats />
        <Products />
        <ProductSpotlight />
        <WhyUs />
        <Clients />
        <StoreBranch />
        <Testimonials />
        <Timeline />
        <VisiMisi />
        <FAQ />
        <SocialMedia />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
