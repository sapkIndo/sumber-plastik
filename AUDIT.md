# Audit Teknis — Sumber Aneka Plastik dan Kemasan

**Tanggal:** 28 April 2026
**Auditor:** Claude Sonnet 4.6
**Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS v4 · GSAP · Vercel

---

## Ringkasan Eksekutif

| Area | Status | Temuan |
|------|--------|--------|
| SEO | ✅ Baik | 2 isu minor |
| Keamanan | ⚠️ Perlu perbaikan | 1 critical, 2 high, 2 medium |
| UI/UX & Desain | ✅ Baik | 3 isu konsistensi minor |
| Aksesibilitas | ✅ Sangat Baik | Lengkap |
| Performa Animasi | ✅ Sangat Baik | Semua transform-only |
| Dark Mode | ✅ Sangat Baik | Semua komponen tercakup |
| Responsif Mobile | ✅ Baik | Minor typography scaling |

---

## 1. SEO

### ✅ Yang Sudah Baik
- Metadata root di `layout.tsx` lengkap: OG tags, Twitter Card, robots config
- Canonical URL terdefinisi di `page.tsx`
- JSON-LD LocalBusiness lengkap di `page.tsx` (nama, alamat, telepon, jam buka)
- JSON-LD FAQPage di `FAQ.tsx`
- `next-sitemap` sudah dikonfigurasi dan generate otomatis saat build
- `robots.txt` dengan sitemap reference
- `opengraph-image.tsx` sudah ada untuk OG image dinamis
- Semua gambar pakai `next/image` — tidak ada `<img>` biasa
- `alt` text deskriptif di semua gambar
- Semantic HTML digunakan dengan benar (`header`, `main`, `section`, `article`, `nav`, `figure`, `blockquote`)
- Satu `<h1>` per halaman, urutan heading tidak loncat

### ⚠️ Isu yang Perlu Diperbaiki

#### [MEDIUM] JSON-LD FAQPage ada di dalam component, bukan di `<head>`
- **File:** `src/components/sections/FAQ.tsx`
- **Masalah:** Google merekomendasikan JSON-LD ditempatkan di `<head>`. Saat ini FAQPage schema ada di dalam body component via `dangerouslySetInnerHTML`.
- **Dampak:** Google masih bisa membacanya, tapi placement di `<head>` lebih optimal.
- **Fix:** Pindahkan JSON-LD FAQPage ke `src/app/layout.tsx` atau `src/app/page.tsx`.

#### [LOW] `connect-src` CSP belum mencakup Gemini API
- **File:** `next.config.mjs` baris 43
- **Masalah:** CSP `connect-src` hanya allow `'self'` dan Vercel Analytics. Padahal chatbot melakukan request ke Gemini API, tapi karena request terjadi server-side (API route), ini tidak blocking — hanya catatan dokumentasi.
- **Status:** Tidak urgent, hanya perlu awareness.

---

## 2. Keamanan

### ⚠️ Isu yang Perlu Diperbaiki

#### [CRITICAL] `'unsafe-eval'` aktif di Content Security Policy
- **File:** `next.config.mjs` baris 35
- **Kode saat ini:**
  ```js
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  ```
- **Masalah:** `'unsafe-eval'` mengizinkan eksekusi kode via `eval()`, `Function()`, dan sejenisnya. Ini membuka celah untuk XSS code injection jika ada input user yang tidak tersanitasi.
- **Konteks:** Next.js modern (App Router) tidak memerlukan `'unsafe-eval'`. Flag ini mungkin ditambahkan untuk mengakomodasi library lama.
- **Fix:**
  ```js
  "script-src 'self' 'unsafe-inline'",
  ```
  Jika setelah dihapus ada error di console tentang eval, lacak library mana yang membutuhkannya dan pertimbangkan alternatif.

#### [HIGH] Rate limiting chatbot menggunakan in-memory Map
- **File:** `src/app/api/chat/route.ts` baris 5–28
- **Masalah:** Rate limit disimpan di `Map` di memory process. Pada Vercel (serverless), setiap function invocation bisa berjalan di instance yang berbeda, sehingga rate limit tidak tershare antar instance — satu user bisa bypass dengan request yang tersebar.
- **Catatan positif:** Ada interval cleanup setiap 5 menit untuk mencegah memory leak. ✅
- **Fix untuk production:** Gunakan Upstash Redis (gratis, ada di Vercel Marketplace) untuk persistent rate limiting.
  ```ts
  import { Ratelimit } from "@upstash/ratelimit";
  import { Redis } from "@upstash/redis";
  ```

#### [HIGH] Tidak ada validasi CORS di API chatbot
- **File:** `src/app/api/chat/route.ts`
- **Masalah:** Endpoint `/api/chat` bisa dipanggil dari domain manapun. Ini berarti kompetitor atau pihak lain bisa "nebeng" Gemini API key melalui endpoint ini.
- **Fix:**
  ```ts
  const origin = request.headers.get("origin") ?? "";
  const allowed = ["https://sumberplastik.com", "https://www.sumberplastik.com"];
  if (process.env.NODE_ENV === "production" && !allowed.includes(origin)) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }
  ```

#### [MEDIUM] Prompt injection detection berbasis blacklist (bisa dibypass)
- **File:** `src/app/api/chat/route.ts` baris 31–44
- **Masalah:** Pattern matching berbasis regex blacklist rentan terhadap variasi phrasing, encoding unicode, atau obfuscation.
- **Catatan positif:** Pattern yang ada sudah mencakup serangan umum. ✅
- **Rekomendasi tambahan:** Batasi panjang response system instruction agar tidak bisa "ditumpuk" dengan instruksi baru.

#### [MEDIUM] Gemini API key tidak ada fallback error handling
- **File:** `src/app/api/chat/route.ts` baris 50
- **Kode:**
  ```ts
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  ```
- **Masalah:** Non-null assertion (`!`) — jika `GEMINI_API_KEY` tidak terdefinisi di environment, akan throw runtime error yang expose stack trace.
- **Fix:**
  ```ts
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  ```

### ✅ Praktik Keamanan yang Sudah Baik
- HSTS aktif 2 tahun dengan `includeSubDomains` dan `preload`
- `X-Frame-Options: SAMEORIGIN` — mencegah clickjacking
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` membatasi kamera, mikrofon, geolokasi
- `frame-ancestors 'none'` di CSP
- Semua external link pakai `rel="noopener noreferrer"` ✅
- Gemini API key ada di environment variable, tidak hardcoded ✅
- Input dibatasi 500 karakter di client dan server ✅
- History chat dibatasi 20 pesan ✅

---

## 3. UI/UX & Desain

### ✅ Yang Sudah Baik
- Semua GSAP animasi hanya pakai `opacity` dan `transform` — tidak ada `width/height/top/left` yang trigger layout reflow ✅
- Dark mode lengkap di semua komponen ✅
- Focus states (`focus-visible:ring-2`) konsisten di semua elemen interaktif ✅
- ARIA roles lengkap: `role="tab"`, `aria-selected`, `aria-expanded`, `aria-modal`, `aria-label` ✅
- `next/image` dengan `sizes` dan `priority` pada LCP image (logo navbar) ✅
- RAF cleanup (`cancelAnimationFrame`) diterapkan di HeroB dan CTA ✅
- Border radius konsisten: card `rounded-2xl`, button `rounded-xl` ✅
- Warna aksen biru dipakai sparingly, tidak dominan ✅

### ⚠️ Isu yang Perlu Diperbaiki

#### [LOW] Spacing section tidak konsisten
- **Masalah:** Mayoritas section pakai `py-16 md:py-28`, tapi Stats pakai `py-16 md:py-20`.

  | Section | Padding Desktop |
  |---------|----------------|
  | WhyUs | `md:py-28` ✅ |
  | Clients | `md:py-28` ✅ |
  | Testimonials | `md:py-28` ✅ |
  | CTA | `md:py-28` ✅ |
  | **Stats** | **`md:py-20`** ⚠️ |

- **Fix:** Ubah Stats section ke `md:py-28` untuk konsistensi ritme vertikal.

#### [LOW] Typography scaling di beberapa heading masih fixed breakpoint
- **Masalah:** Beberapa section heading pakai `text-3xl md:text-4xl lg:text-5xl` (breakpoint-based), sementara bagian lain pakai `clamp()` untuk fluid scaling.
- **Contoh yang sudah baik (fluid):** HeroB, ProductSpotlight, Timeline, CTA — semua pakai `clamp()`
- **Yang belum:** Stats, Clients, WhyUs heading
- **Rekomendasi:** Tidak urgent karena breakpoint-based masih bekerja baik, tapi fluid scaling lebih smooth di semua ukuran layar.

#### [LOW] Nama file logo mengandung spasi dan teks panjang
- **File:** `public/logo/Asli_Persegi_Panjang_Putih-removebg-preview.png`
- **Masalah:** Nama file panjang dan tidak optimal untuk caching dan SEO.
- **Fix:** Rename ke `logo-horizontal.png` dan `logo-square.png`.

---

## 4. Performa

### ✅ Yang Sudah Baik
- `next/font` untuk Geist font — tidak ada font via `<link>` manual
- `dynamic()` dengan `ssr: false` di `ChatbotLoader` ✅
- Semua gambar pakai `next/image` dengan `sizes` yang tepat
- LCP image (navbar logo) punya `priority` prop ✅
- Client component hanya pada komponen yang butuh interaktivitas
- `@vercel/analytics` sudah terpasang

### ℹ️ Catatan
- InteractiveBg menggunakan `requestAnimationFrame` untuk mouse parallax — performa baik, tapi pastikan berjalan setelah hydration (sudah menggunakan `useEffect` ✅)

---

## Prioritas Perbaikan

### Segera (sebelum launch)
1. **Hapus `'unsafe-eval'` dari CSP** — `next.config.mjs` baris 35
2. **Tambah CORS validation** di `src/app/api/chat/route.ts`
3. **Tambah env variable check** di awal `route.ts`

### Setelah Launch
4. **Rate limiting dengan Redis** (Upstash, gratis tier cukup untuk skala ini)
5. **Pindahkan JSON-LD FAQPage** ke `page.tsx`
6. **Standardisasi spacing** Stats ke `md:py-28`

### Nice to Have
7. Fluid typography (`clamp()`) untuk heading yang masih breakpoint-based
8. Rename file logo

---

*Audit ini mencakup seluruh source code yang tersedia per tanggal audit. Lakukan re-audit setelah perubahan signifikan pada codebase.*
