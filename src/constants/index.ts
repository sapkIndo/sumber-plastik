export const SITE_NAME = "Sumber Plastik";
export const SITE_URL = "https://sumberplastik.com";
export const SITE_TAGLINE = "Distributor Plastik Terpercaya";

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Beranda", href: "/" },
  { label: "Produk", href: "/produk" },
  { label: "Tentang Kami", href: "/tentang" },
  { label: "Kontak", href: "/kontak" },
];

export const CONTACT = {
  phone: "+62 xxx-xxxx-xxxx",
  email: "info@sumberplastik.com",
  address: "Jl. Contoh No. 123, Jakarta, Indonesia",
  whatsapp: "62xxxxxxxxxx",
} as const;
