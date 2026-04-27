import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sumber Aneka Plastik dan Kemasan — Toko Plastik & Kemasan Terpercaya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: overline */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "32px", height: "2px", background: "#f97316" }} />
          <span style={{ color: "#737373", fontSize: "14px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Distributor Resmi &amp; Terpercaya
          </span>
        </div>

        {/* Center: brand + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span style={{ color: "#737373", fontSize: "40px", fontWeight: 500 }}>Sumber Aneka</span>
            <span style={{ color: "#ffffff", fontSize: "40px", fontWeight: 800 }}>Plastik &amp; Kemasan</span>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <span style={{ color: "#ffffff", fontSize: "72px", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em" }}>
              Solusi Plastik
            </span>
            <span style={{ color: "#f97316", fontSize: "72px", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.04em" }}>
              Berkualitas Tinggi
            </span>
            <span style={{ color: "#525252", fontSize: "72px", fontWeight: 700, lineHeight: 0.9, letterSpacing: "-0.04em" }}>
              untuk Industri Anda.
            </span>
          </div>
        </div>

        {/* Bottom: description + stats */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ color: "#737373", fontSize: "16px", lineHeight: 1.6, maxWidth: "480px" }}>
            Pengiriman cepat ke seluruh Indonesia · Sejak 2010 · 5.000+ Klien Aktif
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#f97316" }} />
            <span style={{ color: "#404040", fontSize: "14px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              sumberplastik.com
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
