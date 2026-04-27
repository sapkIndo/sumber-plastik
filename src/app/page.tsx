import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/HeroB"; // switch: HeroA | HeroB | Hero
import Stats from "@/components/sections/Stats";
import Products from "@/components/sections/Products";
import WhyUs from "@/components/sections/WhyUs";
import Clients from "@/components/sections/Clients";
import StoreBranch from "@/components/sections/StoreBranch";
import Testimonials from "@/components/sections/Testimonials";
import Timeline from "@/components/sections/Timeline";
import ProductSpotlight from "@/components/sections/ProductSpotlight";
import VisiMisi from "@/components/sections/VisiMisi";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import ChatbotLoader from "@/components/chatbot/ChatbotLoader";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://sumberplastik.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Sumber Aneka Plastik dan Kemasan",
  description:
    "Toko plastik dan kemasan terpercaya dengan 1.000+ produk berkualitas untuk kebutuhan usaha dari skala kecil hingga besar di seluruh Indonesia.",
  url: "https://sumberplastik.com",
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
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

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
        <CTA />
      </main>

      <Footer />
      <ChatbotLoader />
    </>
  );
}
