export const SITE_NAME = "Sumber Aneka Plastik dan Kemasan";
export const SITE_URL = "https://sumberanekaplastikdankemasan.com";
export const SITE_TAGLINE = "Toko Plastik & Kemasan Terpercaya";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/product" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Kontak", href: "/contact" },
];

/** Hotline order WhatsApp — gunakan di tombol WA seluruh website */
export const CONTACT = {
  phone: "+62 895-0988-0988",
  whatsapp: "6289509880988",
  email: "sapkindonesia@gmail.com",
  address: "Jl. Gondosuli No. 1, Baciro, Yogyakarta",
} as const;

export const STORES = [
  {
    name: "Sumber Aneka Plastik dan Kemasan Baciro",
    address: "Jl. Gondosuli No. 1, Baciro, Yogyakarta",
    phone: "0853-7110-6789",
    whatsapp: "6285371106789",
    hours: "08:00 – 18:00 WIB",
    mapsUrl: "https://maps.app.goo.gl/GomHeZb1FVzRcVKE6",
    image: "https://res.cloudinary.com/dcfqotpyr/image/upload/f_auto,q_auto/baciro_tpbzjj",
  },
  {
    name: "Sumber Aneka Plastik dan Kemasan Wirobrajan",
    address: "Jl. R. E. Martadinata No. 122, Pakuncen, Wirobrajan, Yogyakarta",
    phone: "0812-2700-030",
    whatsapp: "62812270030",
    hours: "08:00 – 17:00 WIB",
    mapsUrl: "https://maps.app.goo.gl/igi8RCh9S1ny4oDx5",
    image: "https://res.cloudinary.com/dcfqotpyr/image/upload/f_auto,q_auto/martadinata_vnawcd",
  },
  {
    name: "Sumber Aneka Plastik dan Kemasan Jalan Wonosari",
    address: "Jl. Wonosari Km 9.3, Dawukan, Sleman, Yogyakarta",
    phone: "0821-1060-6789",
    whatsapp: "6282110606789",
    hours: "08:00 – 17:00 WIB",
    mapsUrl: "https://maps.app.goo.gl/EeZxLmstDEzzGfRGA",
    image: "https://res.cloudinary.com/dcfqotpyr/image/upload/f_auto,q_auto/wonosari_ohavxh",
  },
  {
    name: "Sumber Aneka Plastik dan Kemasan Jalan Magelang",
    address: "Jl. Magelang Km 8.5, Mulungan Wetan, Sendangadi, Mlati, Sleman",
    phone: "0889-9195-6969",
    whatsapp: "6288991956969",
    hours: "08:00 – 17:00 WIB",
    mapsUrl: "https://maps.app.goo.gl/Bek5o6kZTtstd2Xu6",
    image: "https://res.cloudinary.com/dcfqotpyr/image/upload/f_auto,q_auto/magelang_fnubdn",
  },
] as const;
