import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Products from "@/components/sections/Products";
import WhyUs from "@/components/sections/WhyUs";
import Clients from "@/components/sections/Clients";
import Testimonials from "@/components/sections/Testimonials";
import Timeline from "@/components/sections/Timeline";
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
  name: "Sumber Plastik",
  description:
    "Distributor dan supplier produk plastik berkualitas tinggi untuk kebutuhan industri dan rumah tangga di seluruh Indonesia.",
  url: "https://sumberplastik.com",
  telephone: "+62-xxx-xxxx-xxxx",
  email: "info@sumberplastik.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Contoh No. 123",
    addressLocality: "Jakarta",
    addressRegion: "DKI Jakarta",
    addressCountry: "ID",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
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
        <WhyUs />
        <Clients />
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
