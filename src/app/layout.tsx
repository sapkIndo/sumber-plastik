import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
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
    default: "Sumber Plastik | Distributor Plastik Terpercaya",
    template: "%s | Sumber Plastik",
  },
  description:
    "Sumber Plastik adalah distributor dan supplier produk plastik berkualitas tinggi untuk kebutuhan industri dan rumah tangga di seluruh Indonesia.",
  keywords: ["plastik", "distributor plastik", "supplier plastik", "sumber plastik", "plastik industri"],
  authors: [{ name: "Sumber Plastik" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sumberplastik.com",
    title: "Sumber Plastik | Distributor Plastik Terpercaya",
    description:
      "Distributor dan supplier produk plastik berkualitas tinggi untuk kebutuhan industri dan rumah tangga.",
    siteName: "Sumber Plastik",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sumber Plastik" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumber Plastik | Distributor Plastik Terpercaya",
    description: "Distributor dan supplier produk plastik berkualitas tinggi.",
    images: ["/og-image.jpg"],
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
        className={`${geistSans.variable} ${geistMono.variable} bg-neutral-950 text-neutral-50 antialiased`}
      >
        {children}
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
      </body>
    </html>
  );
}
