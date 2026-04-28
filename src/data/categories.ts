export interface Category {
  slug: string;
  name: string;
  description: string;
  keywords: string[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "kresek",
    name: "Kresek",
    description: "Kantong kresek berbagai ukuran dan warna untuk kebutuhan industri, retail, dan rumah tangga.",
    keywords: ["kantong kresek", "plastik kresek", "kantong plastik", "tas kresek", "kresek hitam", "kresek putih"],
  },
  {
    slug: "botol-pet",
    name: "Botol PET",
    description: "Botol PET food grade untuk minuman, air mineral, jus, dan produk F&B lainnya.",
    keywords: ["botol PET", "botol plastik", "botol minuman", "botol air mineral", "botol jus", "kemasan minuman"],
  },
  {
    slug: "botol-hdpe",
    name: "Botol HDPE",
    description: "Botol HDPE untuk produk kimia, deterjen, oli, dan kebutuhan industri.",
    keywords: ["botol HDPE", "botol deterjen", "botol industri", "botol kimia", "botol oli"],
  },
  {
    slug: "cable-tie",
    name: "Cable Tie",
    description: "Cable tie nilon berbagai ukuran untuk kebutuhan industri, instalasi, dan pengikatan kabel.",
    keywords: ["cable tie", "pengikat kabel", "nylon tie", "zip tie", "cable tie putih", "cable tie hitam"],
  },
  {
    slug: "bubble-wrap",
    name: "Bubble Wrap",
    description: "Bubble wrap untuk packing, pengiriman, dan perlindungan produk dari benturan.",
    keywords: ["bubble wrap", "plastik gelembung", "packing wrap", "wrap pelindung", "plastik packing"],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
