## Design Context

### Users
Pelanggan bisnis (B2B) dan retail yang membutuhkan produk plastik dan kemasan — mulai dari pemilik usaha FnB kecil, catering, restoran, hingga manajer procurement perusahaan industri dan pabrik. Mereka datang dengan tujuan jelas: cari supplier plastik terpercaya, lihat katalog produk, dan hubungi tim via WhatsApp. Keputusan pembelian sangat dipengaruhi oleh kesan **kepercayaan dan profesionalisme** yang ditangkap dalam hitungan detik pertama.

### Brand Personality
**Tiga kata:** Profesional · Modern · Ramah

Terpercaya dan berpengalaman (Est. 2010, 4 cabang di Yogyakarta), tapi tetap mudah didekati. Tone komunikasi: percaya diri tanpa arogan, hangat tanpa terkesan murahan. Bukan korporat yang kaku, tapi juga bukan toko biasa.

### Aesthetic Direction
- **Theme:** Light & Bright sebagai default — background `#f0f6ff` (biru muda terang) dengan interactive gradient blobs (blue/sky/indigo). Dark mode didukung penuh sebagai dark variant dari skema yang sama (bukan dark/orange).
- **Accent color:** Blue `#2563eb` — bersih, profesional, terpercaya. Digunakan sparingly: CTA button, angka kunci, aksen tipografi. **Max 15% visual real estate.**
- **Reference:** Stripe.com / Linear.app light mode — clean, spacious, tipografi dominan, animasi halus dan purposeful
- **Anti-reference:** Jangan ramai, jangan gradient pelangi, jangan shadow box berlebihan, jangan tampilan "toko online murahan"
- **Texture:** Grain overlay tipis di atas background (SVG noise, opacity 0.12) — menambah kedalaman tanpa mengganggu
- **Interactive background:** 4 gradient blobs (blue/sky/indigo) dengan CSS drift animation + GSAP mouse parallax

### Color Tokens
| Token | Value | Tailwind | Penggunaan |
|---|---|---|---|
| Background utama | `#f0f6ff` | `var(--background)` | html, body transparent |
| Surface / Card | `#ffffff` | `bg-white` | Card, modal |
| Alt section | `#f8faff` | `bg-slate-50/60` | Section selang-seling |
| Text primary | `#0f172a` | `text-slate-900` | Heading, body utama |
| Text secondary | `#475569` | `text-slate-600` | Subtitle, deskripsi |
| Text muted | `#94a3b8` | `text-slate-400` | Caption, placeholder |
| **Accent** | `#2563eb` | `text/bg-blue-600` | **CTA, angka kunci, aksen** |
| Accent hover | `#3b82f6` | `text/bg-blue-500` | Hover state |
| Border | `#e2e8f0` | `border-slate-200` | Garis pembatas standar |
| Border strong | `#cbd5e1` | `border-slate-300` | Border lebih tegas |

*Dark mode: `#0f172a` background, `#f8fafc` foreground — blue accent tetap sama.*

### Typography
- **Font:** Geist Sans (via `next/font`) — clean, modern, highly legible
- **Heading style:** Besar, font-black/font-bold, tracking-tighter — heading adalah hero di setiap section
- **Body:** `text-slate-600` di light, `text-slate-400` di dark — comfortable readability
- **Hierarchy wajib:** Satu `h1` per halaman → h2 per section → h3 sub-item. Tidak boleh loncat.

### Accessibility
- **Target:** WCAG AA
- **Reduced motion:** Sudah dihandle via `@media (prefers-reduced-motion: reduce)` di globals.css
- **Semantic HTML:** `<header>`, `<main>`, `<section aria-label="...">`, `<footer>` wajib di setiap halaman
- **Images:** Selalu `next/image` dengan `alt` deskriptif

### Design Principles
1. **Whitespace adalah kemewahan** — Section padding minimal `py-24`. Jangan pernah cramped. Ruang kosong adalah bagian dari desain.
2. **Blue sebagai tanda baca, bukan cat dinding** — `#2563eb` hanya untuk CTA utama, angka kunci, aksen judul. Max 15% visual real estate.
3. **Tipografi memimpin** — Heading besar dan bold adalah hero di setiap section. Konten bicara lewat teks, bukan dekorasi berlebihan.
4. **Animasi melayani, tidak menghibur** — GSAP untuk entrance smooth dan purposeful. Tidak ada bounce, tidak ada flash, tidak ada loop tanpa henti. Hanya `opacity` dan `transform`.
5. **Cerah namun elegan** — Light theme dengan texture grain + interactive blobs menciptakan kedalaman. Shadow tipis, rounded corners, border halus — premium tanpa noisy.
