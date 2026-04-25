# Sumber Plastik — Project Rules

## #1 PRIORITAS UTAMA: SEO HARUS SEMPURNA
Client membayar 9 juta rupiah. SEO adalah syarat nomor 1 yang tidak bisa dikompromikan.

### SEO Checklist Wajib (jangan skip satupun)
- Setiap halaman WAJIB punya `export const metadata` yang spesifik (bukan pakai default dari layout)
- `alternates.canonical` wajib ada di setiap metadata halaman
- JSON-LD structured data wajib ada di layout (LocalBusiness schema)
- Semua gambar WAJIB pakai `next/image` — dilarang pakai `<img>` biasa
- Semua `next/image` WAJIB ada prop `alt` yang deskriptif
- Satu halaman = satu `<h1>`. Urutan heading tidak boleh loncat (h1 → h2 → h3)
- HTML semantic wajib: `<header>`, `<main>`, `<section aria-label="...">`, `<footer>`
- `next-sitemap` sudah dikonfigurasi — otomatis generate saat `npm run build`
- `opengraph-image.tsx` wajib dibuat untuk OG image dinamis

### Core Web Vitals — Jangan Sampai Jelek
- GSAP: animasi HANYA boleh pakai `opacity` dan `transform`. DILARANG animate `width`, `height`, `top`, `left`, `margin`, `padding`
- Semua komponen berat (chatbot, dll) wajib pakai `dynamic()` dengan `ssr: false` kalau tidak butuh SSR
- Font sudah pakai `next/font` — jangan tambah font via `<link>` manual

---

## Tech Stack Final

```
next.js 14+ (App Router) + TypeScript
tailwindcss
gsap + @gsap/react
@google/generative-ai       model: gemini-2.5-flash (JANGAN ganti model lain)
react-markdown + remark-gfm
react-hook-form + zod
lucide-react
sonner
next-sitemap
@vercel/analytics
```

---

## Rules Umum

- **DILARANG** pakai `alert()` — selalu pakai `sonner` toast
- **DILARANG** pakai `<img>` — selalu pakai `next/image`
- Server Component by default — tambah `"use client"` hanya kalau benar-benar butuh interaktivitas
- Semua bentuk feedback UI (sukses, error, loading) pakai `sonner`
- Form validation pakai `zod` schema + `react-hook-form`
- Icons pakai `lucide-react`

---

## Design Context

### Brand Personality
**Tiga kata:** Profesional · Modern · Ramah
Terpercaya dan berpengalaman, tapi tetap mudah didekati. Percaya diri tanpa arogan, hangat tanpa murahan.

### Aesthetic Direction
- **Theme:** Light & Bright — background `#f0f6ff` (biru muda terang) + interactive gradient blobs
- **Accent:** Blue `#2563eb` — untuk CTA, angka kunci, aksen tipografi. **Sparingly, max 15% visual.**
- **Reference:** Stripe.com / Linear.app light mode — clean, spacious, tipografi dominan, animasi halus
- **Anti-reference:** Jangan ramai, jangan gradient pelangi, jangan shadow box berlebihan
- **Interactive background:** 4 gradient blobs (blue/sky/indigo) dengan CSS drift animation + GSAP mouse parallax

### Color Tokens Wajib
| Token | Value | Penggunaan |
|---|---|---|
| Background utama | `#f0f6ff` | var(--background) di html, body transparent |
| Surface / Card | `#ffffff` | bg-white |
| Alt section | `#f8faff` | bg-slate-50/60 |
| Text primary | `#0f172a` | text-slate-900 |
| Text secondary | `#475569` | text-slate-600 |
| Text muted | `#94a3b8` | text-slate-400 |
| **Accent** | `#2563eb` | **text/bg-blue-600** |
| Accent hover | `#3b82f6` | text/bg-blue-500 |
| Border | `#e2e8f0` | border-slate-200 |
| Border strong | `#cbd5e1` | border-slate-300 |

### Design Principles
1. **Whitespace adalah kemewahan** — section padding minimal `py-24`, jangan pernah cramped
2. **Blue sebagai tanda baca, bukan cat dinding** — hanya CTA utama, angka kunci, aksen judul
3. **Tipografi memimpin** — heading besar dan bold adalah hero di setiap section
4. **Animasi melayani** — GSAP entrance smooth dan purposeful, tidak ada bounce/flash/loop
5. **Cerah namun elegan** — light theme dengan interactive bg blobs, shadow tipis, rounded corners
