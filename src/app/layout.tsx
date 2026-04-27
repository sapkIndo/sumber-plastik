import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/ThemeProvider";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import InteractiveBg from "@/components/InteractiveBg";
import CustomCursor from "@/components/CustomCursor";
import GSAPSmoothScroll from "@/components/GSAPSmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sumberplastik.com"),
  title: {
    default: "Sumber Aneka Plastik dan Kemasan | Toko Plastik & Kemasan Terpercaya",
    template: "%s | Sumber Aneka Plastik dan Kemasan",
  },
  description:
    "Sumber Aneka Plastik dan Kemasan adalah toko plastik dan kemasan terpercaya dengan 1.000+ produk berkualitas untuk kebutuhan usaha dari skala kecil hingga besar di seluruh Indonesia.",
  keywords: ["plastik", "kemasan", "toko plastik", "sumber aneka plastik", "SAPK", "plastik kemasan", "plastik pp", "plastik pet", "hdpe", "lldpe"],
  authors: [{ name: "Sumber Aneka Plastik dan Kemasan" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sumberplastik.com",
    title: "Sumber Aneka Plastik dan Kemasan | Toko Plastik & Kemasan Terpercaya",
    description:
      "Toko plastik dan kemasan terpercaya dengan 1.000+ produk berkualitas untuk kebutuhan usaha di seluruh Indonesia.",
    siteName: "Sumber Aneka Plastik dan Kemasan",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Sumber Aneka Plastik dan Kemasan — Toko Plastik & Kemasan Terpercaya" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumber Aneka Plastik dan Kemasan | Toko Plastik & Kemasan Terpercaya",
    description: "Toko plastik dan kemasan terpercaya dengan 1.000+ produk berkualitas.",
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
          <CustomCursor />
          <InteractiveBg />
          <GSAPSmoothScroll />
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
