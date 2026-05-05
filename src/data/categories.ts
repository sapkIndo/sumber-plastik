export type CategoryGroup =
  | "botol-wadah"
  | "kantong-plastik"
  | "kemasan-makanan"
  | "perlengkapan"
  | "sablon";

export interface Category {
  slug:        string;
  name:        string;
  description: string;
  keywords:    string[];
  group:       CategoryGroup;
}

export const CATEGORIES: Category[] = [
  // ── Botol & Wadah ─────────────────────────────────────────────────────────
  {
    slug: "alumunium-foil", name: "ALUMUNIUM FOIL", group: "kantong-plastik",
    description: "ALUMUNIUM FOIL — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["alumunium foil", "jual alumunium foil", "alumunium foil murah", "alumunium foil jogja"],
  },
  {
    slug: "botol-br", name: "BOTOL BR", group: "botol-wadah",
    description: "BOTOL BR — 30 produk tersedia. Ecer dan grosir.",
    keywords: ["botol br", "jual botol br", "botol br murah", "botol br jogja"],
  },
  {
    slug: "botol-bumbu", name: "BOTOL BUMBU", group: "botol-wadah",
    description: "BOTOL BUMBU — 9 produk tersedia. Ecer dan grosir.",
    keywords: ["botol bumbu", "jual botol bumbu", "botol bumbu murah", "botol bumbu jogja"],
  },
  {
    slug: "botol-carex", name: "BOTOL CAREX", group: "botol-wadah",
    description: "BOTOL CAREX — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["botol carex", "jual botol carex", "botol carex murah", "botol carex jogja"],
  },
  {
    slug: "botol-hdpe", name: "BOTOL HDPE", group: "botol-wadah",
    description: "BOTOL HDPE — 17 produk tersedia. Ecer dan grosir.",
    keywords: ["botol hdpe", "jual botol hdpe", "botol hdpe murah", "botol hdpe jogja"],
  },
  {
    slug: "botol-pet", name: "BOTOL PET", group: "botol-wadah",
    description: "BOTOL PET — 94 produk tersedia. Ecer dan grosir.",
    keywords: ["botol pet", "jual botol pet", "botol pet murah", "botol pet jogja"],
  },
  {
    slug: "ember", name: "EMBER", group: "botol-wadah",
    description: "EMBER — 5 produk tersedia. Ecer dan grosir.",
    keywords: ["ember", "jual ember", "ember murah", "ember jogja"],
  },
  {
    slug: "galon", name: "GALON", group: "botol-wadah",
    description: "GALON — 8 produk tersedia. Ecer dan grosir.",
    keywords: ["galon", "jual galon", "galon murah", "galon jogja"],
  },
  {
    slug: "gelas-ukur", name: "GELAS UKUR", group: "botol-wadah",
    description: "GELAS UKUR — 3 produk tersedia. Ecer dan grosir.",
    keywords: ["gelas ukur", "jual gelas ukur", "gelas ukur murah", "gelas ukur jogja"],
  },
  {
    slug: "jirigen", name: "JIRIGEN", group: "botol-wadah",
    description: "JIRIGEN — 18 produk tersedia. Ecer dan grosir.",
    keywords: ["jirigen", "jual jirigen", "jirigen murah", "jirigen jogja"],
  },
  {
    slug: "pet-can", name: "PET CAN", group: "botol-wadah",
    description: "PET CAN — 8 produk tersedia. Ecer dan grosir.",
    keywords: ["pet can", "jual pet can", "pet can murah", "pet can jogja"],
  },
  {
    slug: "pot-urine", name: "POT URINE", group: "botol-wadah",
    description: "POT URINE — 7 produk tersedia. Ecer dan grosir.",
    keywords: ["pot urine", "jual pot urine", "pot urine murah", "pot urine jogja"],
  },
  {
    slug: "toples", name: "TOPLES", group: "botol-wadah",
    description: "TOPLES — 31 produk tersedia. Ecer dan grosir.",
    keywords: ["toples", "jual toples", "toples murah", "toples jogja"],
  },
  {
    slug: "tutup-botol", name: "TUTUP BOTOL", group: "botol-wadah",
    description: "TUTUP BOTOL — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["tutup botol", "jual tutup botol", "tutup botol murah", "tutup botol jogja"],
  },
  {
    slug: "tutup-gelas", name: "TUTUP GELAS", group: "botol-wadah",
    description: "TUTUP GELAS — 12 produk tersedia. Ecer dan grosir.",
    keywords: ["tutup gelas", "jual tutup gelas", "tutup gelas murah", "tutup gelas jogja"],
  },

  // ── Kantong & Plastik ─────────────────────────────────────────────────────
  {
    slug: "bag", name: "BAG", group: "kantong-plastik",
    description: "BAG — 11 produk tersedia. Ecer dan grosir.",
    keywords: ["bag", "jual bag", "bag murah", "bag jogja"],
  },
  {
    slug: "bubble-wrap", name: "BUBBLE WRAP", group: "kantong-plastik",
    description: "BUBBLE WRAP — 9 produk tersedia. Ecer dan grosir.",
    keywords: ["bubble wrap", "jual bubble wrap", "bubble wrap murah", "bubble wrap jogja"],
  },
  {
    slug: "kresek", name: "KRESEK", group: "kantong-plastik",
    description: "KRESEK — 31 produk tersedia. Ecer dan grosir.",
    keywords: ["kresek", "jual kresek", "kresek murah", "kresek jogja"],
  },
  {
    slug: "mika", name: "MIKA", group: "kantong-plastik",
    description: "MIKA — 52 produk tersedia. Ecer dan grosir.",
    keywords: ["mika", "jual mika", "mika murah", "mika jogja"],
  },
  {
    slug: "plastik-es", name: "PLASTIK ES", group: "kantong-plastik",
    description: "PLASTIK ES — 4 produk tersedia. Ecer dan grosir.",
    keywords: ["plastik es", "jual plastik es", "plastik es murah", "plastik es jogja"],
  },
  {
    slug: "plastik-kg", name: "PLASTIK KG", group: "kantong-plastik",
    description: "PLASTIK KG — 26 produk tersedia. Ecer dan grosir.",
    keywords: ["plastik kg", "jual plastik kg", "plastik kg murah", "plastik kg jogja"],
  },
  {
    slug: "plastik-laundry", name: "PLASTIK LAUNDRY", group: "kantong-plastik",
    description: "PLASTIK LAUNDRY — 3 produk tersedia. Ecer dan grosir.",
    keywords: ["plastik laundry", "jual plastik laundry", "plastik laundry murah", "plastik laundry jogja"],
  },
  {
    slug: "plastik-opp", name: "PLASTIK OPP", group: "kantong-plastik",
    description: "PLASTIK OPP — 48 produk tersedia. Ecer dan grosir.",
    keywords: ["plastik opp", "jual plastik opp", "plastik opp murah", "plastik opp jogja"],
  },
  {
    slug: "plastik-wrap", name: "PLASTIK WRAP", group: "kantong-plastik",
    description: "PLASTIK WRAP — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["plastik wrap", "jual plastik wrap", "plastik wrap murah", "plastik wrap jogja"],
  },
  {
    slug: "pvc-shrink", name: "PVC SHRINK", group: "kantong-plastik",
    description: "PVC SHRINK — 2 produk tersedia. Ecer dan grosir.",
    keywords: ["pvc shrink", "jual pvc shrink", "pvc shrink murah", "pvc shrink jogja"],
  },
  {
    slug: "standing-pouch", name: "STANDING POUCH", group: "kantong-plastik",
    description: "STANDING POUCH — 7 produk tersedia. Ecer dan grosir.",
    keywords: ["standing pouch", "jual standing pouch", "standing pouch murah", "standing pouch jogja"],
  },
  {
    slug: "trash-bag", name: "TRASH BAG", group: "kantong-plastik",
    description: "TRASH BAG — 4 produk tersedia. Ecer dan grosir.",
    keywords: ["trash bag", "jual trash bag", "trash bag murah", "trash bag jogja"],
  },
  {
    slug: "zip-lock", name: "ZIP LOCK", group: "kantong-plastik",
    description: "ZIP LOCK — 13 produk tersedia. Ecer dan grosir.",
    keywords: ["zip lock", "jual zip lock", "zip lock murah", "zip lock jogja"],
  },

  // ── Kemasan Makanan ───────────────────────────────────────────────────────
  {
    slug: "cake-cases", name: "CAKE CASES", group: "kemasan-makanan",
    description: "CAKE CASES — 11 produk tersedia. Ecer dan grosir.",
    keywords: ["cake cases", "jual cake cases", "cake cases murah", "cake cases jogja"],
  },
  {
    slug: "carry-cup", name: "CARRY CUP", group: "kemasan-makanan",
    description: "CARRY CUP — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["carry cup", "jual carry cup", "carry cup murah", "carry cup jogja"],
  },
  {
    slug: "cup-gelas", name: "CUP GELAS", group: "kemasan-makanan",
    description: "CUP GELAS — 35 produk tersedia. Ecer dan grosir.",
    keywords: ["cup gelas", "jual cup gelas", "cup gelas murah", "cup gelas jogja"],
  },
  {
    slug: "deli-pet-square", name: "DELI PET SQUARE", group: "kemasan-makanan",
    description: "DELI PET SQUARE — 3 produk tersedia. Ecer dan grosir.",
    keywords: ["deli pet square", "jual deli pet square", "deli pet square murah", "deli pet square jogja"],
  },
  {
    slug: "food-tray", name: "FOOD TRAY", group: "kemasan-makanan",
    description: "FOOD TRAY — 3 produk tersedia. Ecer dan grosir.",
    keywords: ["food tray", "jual food tray", "food tray murah", "food tray jogja"],
  },
  {
    slug: "ice-cream", name: "ICE CREAM", group: "kemasan-makanan",
    description: "ICE CREAM — 6 produk tersedia. Ecer dan grosir.",
    keywords: ["ice cream", "jual ice cream", "ice cream murah", "ice cream jogja"],
  },
  {
    slug: "kertas-nasi", name: "KERTAS NASI", group: "kemasan-makanan",
    description: "KERTAS NASI — 8 produk tersedia. Ecer dan grosir.",
    keywords: ["kertas nasi", "jual kertas nasi", "kertas nasi murah", "kertas nasi jogja"],
  },
  {
    slug: "lunchbox", name: "LUNCHBOX", group: "kemasan-makanan",
    description: "LUNCHBOX — 8 produk tersedia. Ecer dan grosir.",
    keywords: ["lunchbox", "jual lunchbox", "lunchbox murah", "lunchbox jogja"],
  },
  {
    slug: "matras-sushi-roll", name: "MATRAS SUSHI ROLL", group: "kemasan-makanan",
    description: "MATRAS SUSHI ROLL — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["matras sushi roll", "jual matras sushi roll", "matras sushi roll murah", "matras sushi roll jogja"],
  },
  {
    slug: "paper-bowl", name: "PAPER BOWL", group: "kemasan-makanan",
    description: "PAPER BOWL — 10 produk tersedia. Ecer dan grosir.",
    keywords: ["paper bowl", "jual paper bowl", "paper bowl murah", "paper bowl jogja"],
  },
  {
    slug: "paper-box", name: "PAPER BOX", group: "kemasan-makanan",
    description: "PAPER BOX — 6 produk tersedia. Ecer dan grosir.",
    keywords: ["paper box", "jual paper box", "paper box murah", "paper box jogja"],
  },
  {
    slug: "paper-cup", name: "PAPER CUP", group: "kemasan-makanan",
    description: "PAPER CUP — 9 produk tersedia. Ecer dan grosir.",
    keywords: ["paper cup", "jual paper cup", "paper cup murah", "paper cup jogja"],
  },
  {
    slug: "paper-dollies", name: "PAPER DOLLIES", group: "kemasan-makanan",
    description: "PAPER DOLLIES — 2 produk tersedia. Ecer dan grosir.",
    keywords: ["paper dollies", "jual paper dollies", "paper dollies murah", "paper dollies jogja"],
  },
  {
    slug: "seal-cup", name: "SEAL CUP", group: "kemasan-makanan",
    description: "SEAL CUP — 2 produk tersedia. Ecer dan grosir.",
    keywords: ["seal cup", "jual seal cup", "seal cup murah", "seal cup jogja"],
  },
  {
    slug: "seal-toples", name: "SEAL TOPLES", group: "kemasan-makanan",
    description: "SEAL TOPLES — 10 produk tersedia. Ecer dan grosir.",
    keywords: ["seal toples", "jual seal toples", "seal toples murah", "seal toples jogja"],
  },
  {
    slug: "sedotan", name: "SEDOTAN", group: "kemasan-makanan",
    description: "SEDOTAN — 14 produk tersedia. Ecer dan grosir.",
    keywords: ["sedotan", "jual sedotan", "sedotan murah", "sedotan jogja"],
  },
  {
    slug: "sendok", name: "SENDOK", group: "kemasan-makanan",
    description: "SENDOK — 34 produk tersedia. Ecer dan grosir.",
    keywords: ["sendok", "jual sendok", "sendok murah", "sendok jogja"],
  },
  {
    slug: "sendok-garpu-pisau", name: "SENDOK GARPU PISAU", group: "kemasan-makanan",
    description: "SENDOK GARPU PISAU — 6 produk tersedia. Ecer dan grosir.",
    keywords: ["sendok garpu pisau", "jual sendok garpu pisau", "sendok garpu pisau murah", "sendok garpu pisau jogja"],
  },
  {
    slug: "soup-cup", name: "SOUP CUP", group: "kemasan-makanan",
    description: "SOUP CUP — 6 produk tersedia. Ecer dan grosir.",
    keywords: ["soup cup", "jual soup cup", "soup cup murah", "soup cup jogja"],
  },
  {
    slug: "styrofoam", name: "STYROFOAM", group: "kemasan-makanan",
    description: "STYROFOAM — 5 produk tersedia. Ecer dan grosir.",
    keywords: ["styrofoam", "jual styrofoam", "styrofoam murah", "styrofoam jogja"],
  },
  {
    slug: "sumpit", name: "SUMPIT", group: "kemasan-makanan",
    description: "SUMPIT — 2 produk tersedia. Ecer dan grosir.",
    keywords: ["sumpit", "jual sumpit", "sumpit murah", "sumpit jogja"],
  },
  {
    slug: "thinwall", name: "THINWALL", group: "kemasan-makanan",
    description: "THINWALL — 45 produk tersedia. Ecer dan grosir.",
    keywords: ["thinwall", "jual thinwall", "thinwall murah", "thinwall jogja"],
  },
  {
    slug: "tusuk-gigi", name: "TUSUK GIGI", group: "kemasan-makanan",
    description: "TUSUK GIGI — 2 produk tersedia. Ecer dan grosir.",
    keywords: ["tusuk gigi", "jual tusuk gigi", "tusuk gigi murah", "tusuk gigi jogja"],
  },
  {
    slug: "tusukan", name: "TUSUKAN", group: "kemasan-makanan",
    description: "TUSUKAN — 20 produk tersedia. Ecer dan grosir.",
    keywords: ["tusukan", "jual tusukan", "tusukan murah", "tusukan jogja"],
  },

  // ── Perlengkapan ─────────────────────────────────────────────────────────
  {
    slug: "cable-tie", name: "CABLE TIE", group: "perlengkapan",
    description: "CABLE TIE — 10 produk tersedia. Ecer dan grosir.",
    keywords: ["cable tie", "jual cable tie", "cable tie murah", "cable tie jogja"],
  },
  {
    slug: "cutter", name: "CUTTER", group: "perlengkapan",
    description: "CUTTER — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["cutter", "jual cutter", "cutter murah", "cutter jogja"],
  },
  {
    slug: "jas-hujan", name: "JAS HUJAN", group: "perlengkapan",
    description: "JAS HUJAN — 5 produk tersedia. Ecer dan grosir.",
    keywords: ["jas hujan", "jual jas hujan", "jas hujan murah", "jas hujan jogja"],
  },
  {
    slug: "kardus", name: "KARDUS", group: "perlengkapan",
    description: "KARDUS — 33 produk tersedia. Ecer dan grosir.",
    keywords: ["kardus", "jual kardus", "kardus murah", "kardus jogja"],
  },
  {
    slug: "karet-gelang", name: "KARET GELANG", group: "perlengkapan",
    description: "KARET GELANG — 2 produk tersedia. Ecer dan grosir.",
    keywords: ["karet gelang", "jual karet gelang", "karet gelang murah", "karet gelang jogja"],
  },
  {
    slug: "kran-air", name: "KRAN AIR", group: "perlengkapan",
    description: "KRAN AIR — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["kran air", "jual kran air", "kran air murah", "kran air jogja"],
  },
  {
    slug: "lakban", name: "LAKBAN", group: "perlengkapan",
    description: "LAKBAN — 26 produk tersedia. Ecer dan grosir.",
    keywords: ["lakban", "jual lakban", "lakban murah", "lakban jogja"],
  },
  {
    slug: "pipet-kaca", name: "PIPET KACA", group: "perlengkapan",
    description: "PIPET KACA — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["pipet kaca", "jual pipet kaca", "pipet kaca murah", "pipet kaca jogja"],
  },
  {
    slug: "saringan", name: "SARINGAN", group: "perlengkapan",
    description: "SARINGAN — 1 produk tersedia. Ecer dan grosir.",
    keywords: ["saringan", "jual saringan", "saringan murah", "saringan jogja"],
  },
  {
    slug: "sarung-tangan", name: "SARUNG TANGAN", group: "perlengkapan",
    description: "SARUNG TANGAN — 5 produk tersedia. Ecer dan grosir.",
    keywords: ["sarung tangan", "jual sarung tangan", "sarung tangan murah", "sarung tangan jogja"],
  },
  {
    slug: "segel", name: "SEGEL", group: "perlengkapan",
    description: "SEGEL — 2 produk tersedia. Ecer dan grosir.",
    keywords: ["segel", "jual segel", "segel murah", "segel jogja"],
  },
  {
    slug: "stiker", name: "STIKER", group: "perlengkapan",
    description: "STIKER — 2 produk tersedia. Ecer dan grosir.",
    keywords: ["stiker", "jual stiker", "stiker murah", "stiker jogja"],
  },
  {
    slug: "tali-rafia", name: "TALI RAFIA", group: "perlengkapan",
    description: "TALI RAFIA — 2 produk tersedia. Ecer dan grosir.",
    keywords: ["tali rafia", "jual tali rafia", "tali rafia murah", "tali rafia jogja"],
  },
  {
    slug: "tissue", name: "TISSUE", group: "perlengkapan",
    description: "TISSUE — 3 produk tersedia. Ecer dan grosir.",
    keywords: ["tissue", "jual tissue", "tissue murah", "tissue jogja"],
  },

  // ── Sablon ────────────────────────────────────────────────────────────────
  {
    slug: "sablon", name: "Sablon & Custom", group: "sablon",
    description: "Kemasan sablon custom — 48 desain tersedia.",
    keywords: ["sablon", "kemasan sablon", "plastik sablon", "custom packaging jogja"],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
