import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const ConsoleEasterEgg = dynamic(() => import("@/components/ConsoleEasterEgg"), { ssr: false });
const InteractiveBg = dynamic(() => import("@/components/InteractiveBg"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const GSAPSmoothScroll = dynamic(() => import("@/components/GSAPSmoothScroll"), { ssr: false });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sumberanekaplastikdankemasan.com"),
  title: {
    default: "Sumber Aneka Plastik dan Kemasan | Supplier Kemasan FnB & Industri Yogyakarta",
    template: "%s | Sumber Aneka Plastik dan Kemasan",
  },
  description:
    "Supplier kemasan plastik & paper untuk FnB, restoran, catering, dan industri di Yogyakarta. 1.000+ produk kemasan food grade, halal, bersertifikat ISO. Ecer & grosir, pengiriman seluruh Indonesia.",
  keywords: [
    "kemasan plastik", "kemasan makanan", "kemasan minuman", "kemasan FnB",
    "kemasan food grade", "kemasan halal", "kemasan restoran", "kemasan catering",
    "kemasan usaha", "supplier kemasan", "grosir kemasan", "toko kemasan",
    "kemasan yogyakarta", "plastik kemasan yogyakarta", "cup plastik", "kantong plastik",
    "sumber aneka plastik dan kemasan", "sumber plastik kemasan", "kemasan paper",
    "kemasan ISO", "distributor kemasan indonesia",
  ],
  authors: [{ name: "Sumber Aneka Plastik dan Kemasan" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sumberanekaplastikdankemasan.com",
    title: "Sumber Aneka Plastik dan Kemasan | Supplier Kemasan FnB & Industri Yogyakarta",
    description:
      "Supplier kemasan plastik & paper untuk FnB, restoran, catering, dan industri. 1.000+ produk food grade, halal, ISO. Ecer & grosir — pengiriman seluruh Indonesia.",
    siteName: "Sumber Aneka Plastik dan Kemasan",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Sumber Aneka Plastik dan Kemasan — Supplier Kemasan FnB & Industri Terpercaya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumber Aneka Plastik dan Kemasan | Supplier Kemasan FnB & Industri Yogyakarta",
    description: "Supplier kemasan plastik & paper untuk FnB, restoran, dan industri. 1.000+ produk food grade & halal, ecer & grosir.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Prevent flash of unstyled content — runs sync before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('sp-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}`,
          }}
        />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline-none"
          >
            Lewati ke konten utama
          </a>
          <CustomCursor />
          <InteractiveBg />
          <GSAPSmoothScroll />
          <Navbar />
          <div id="smooth-wrapper">
            <div id="smooth-content">
              {children}
            </div>
          </div>
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: { fontFamily: "var(--font-geist-sans)" },
            }}
          />
          <Analytics />
          <ConsoleEasterEgg />
        </ThemeProvider>
      </body>
    </html>
  );
}
