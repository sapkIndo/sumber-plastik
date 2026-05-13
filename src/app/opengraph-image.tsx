import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sumber Aneka Plastik dan Kemasan — Distributor Plastik & Kemasan Terpercaya Yogyakarta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STATS = [
  { value: "Est. 2010", label: "Berpengalaman" },
  { value: "4 Cabang", label: "di Yogyakarta" },
  { value: "1000+ Produk", label: "Siap Kirim" },
  { value: "Food Grade", label: "Berstandar" },
];

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(145deg, #f0f6ff 0%, #e4eeff 60%, #dce8ff 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 72px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background blobs */}
        <div style={{
          position: "absolute", top: -160, right: -120,
          width: 480, height: 480, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: 480,
          width: 320, height: 320, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,139,255,0.1) 0%, transparent 70%)",
        }} />

        {/* Top: logo mark + brand name */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 11,
            background: "#2563eb",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "white", fontSize: 26, fontWeight: 800, lineHeight: 1 }}>S</span>
          </div>
          <span style={{ color: "#475569", fontSize: 16, fontWeight: 600, letterSpacing: "0.04em" }}>
            Sumber Aneka Plastik dan Kemasan
          </span>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#2563eb" }} />
            <span style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Yogyakarta
            </span>
          </div>
        </div>

        {/* Center: headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{
            color: "#2563eb", fontSize: 15, fontWeight: 700,
            letterSpacing: "0.18em", textTransform: "uppercase",
          }}>
            Distributor Resmi &amp; Terpercaya
          </span>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ color: "#0f172a", fontSize: 82, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
              Plastik &amp; Kemasan
            </span>
            <span style={{ color: "#2563eb", fontSize: 82, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
              Lengkap &amp; Terpercaya
            </span>
            <span style={{ color: "#94a3b8", fontSize: 82, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1 }}>
              untuk Bisnis Anda.
            </span>
          </div>
        </div>

        {/* Bottom: stats + URL */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {STATS.map((s) => (
              <div
                key={s.value}
                style={{
                  display: "flex", flexDirection: "column", gap: 2,
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: 12, padding: "12px 18px",
                  border: "1px solid rgba(37,99,235,0.12)",
                }}
              >
                <span style={{ color: "#2563eb", fontSize: 22, fontWeight: 800, lineHeight: 1 }}>{s.value}</span>
                <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{s.label}</span>
              </div>
            ))}
          </div>
          <span style={{ color: "#cbd5e1", fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>
            sumberanekaplastikdankemasan.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
