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
- **Theme:** Dark & Premium — background `#0a0a0a`
- **Accent:** Bold Orange `#f97316` — untuk CTA, angka kunci, aksen tipografi. **Sparingly, max 15% visual.**
- **Reference:** Apple.com — whitespace besar, tipografi dominan, animasi halus dan purposeful
- **Anti-reference:** Jangan ramai, jangan gradient pelangi, jangan shadow box berlebihan

### Color Tokens Wajib
| Token | Value | Penggunaan |
|---|---|---|
| Background utama | `#0a0a0a` | bg-neutral-950 |
| Surface / Card | `#111111` | bg-neutral-900 |
| Elevated | `#1a1a1a` | bg-neutral-800 |
| Text primary | `#fafafa` | text-neutral-50 |
| Text secondary | `#a3a3a3` | text-neutral-400 |
| Text muted | `#525252` | text-neutral-600 |
| **Accent** | `#f97316` | **text/bg-orange-500** |
| Accent hover | `#fb923c` | text/bg-orange-400 |
| Border | `#262626` | border-neutral-800 |

### Design Principles
1. **Whitespace adalah kemewahan** — section padding minimal `py-24`, jangan pernah cramped
2. **Orange sebagai tanda baca, bukan cat dinding** — hanya CTA utama, angka kunci, aksen judul
3. **Tipografi memimpin** — heading besar dan bold adalah hero di setiap section
4. **Animasi melayani** — GSAP entrance smooth dan purposeful, tidak ada bounce/flash/loop
5. **Kehangatan dalam kegelapan** — dark theme tapi approachable berkat orange + rounded corners
