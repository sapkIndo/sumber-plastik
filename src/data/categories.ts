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
    description: "Alumunium foil food grade untuk bungkus makanan, grill, dan kemasan industri — tahan panas, anti bocor. Ecer & grosir.",
    keywords: [
      "alumunium foil", "aluminium foil", "alumunium foil makanan", "alumunium foil food grade",
      "aluminium foil bungkus makanan", "foil kemasan makanan", "jual alumunium foil",
      "alumunium foil murah", "alumunium foil yogyakarta", "alumunium foil jogja",
    ],
  },
  {
    slug: "botol-br", name: "BOTOL BR", group: "botol-wadah",
    description: "Botol BR plastik beragam ukuran untuk minuman, jus, sirup, dan produk FnB — 30 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "botol br", "botol plastik", "jual botol plastik", "botol plastik murah",
      "botol plastik grosir", "botol br murah", "supplier botol plastik yogyakarta",
      "botol br jogja", "botol minuman plastik br", "botol br food grade",
    ],
  },
  {
    slug: "botol-bumbu", name: "BOTOL BUMBU", group: "botol-wadah",
    description: "Botol bumbu dapur plastik untuk saus, kecap, sambal, dan bumbu cair — 9 varian ukuran. Food grade, ecer & grosir.",
    keywords: [
      "botol bumbu", "botol bumbu dapur", "botol saus", "botol kecap", "botol sambal",
      "botol plastik bumbu", "jual botol bumbu", "botol bumbu murah", "botol bumbu food grade",
      "botol saus plastik", "botol bumbu dapur plastik", "botol bumbu jogja",
    ],
  },
  {
    slug: "botol-carex", name: "BOTOL CAREX", group: "botol-wadah",
    description: "Botol carex plastik untuk produk perawatan diri, sabun, dan kosmetik — cosmetic & food grade. Ecer & grosir.",
    keywords: [
      "botol carex", "jual botol carex", "botol carex murah", "botol carex plastik",
      "botol sabun cair", "botol lotion plastik", "botol kosmetik plastik", "botol carex jogja",
    ],
  },
  {
    slug: "botol-hdpe", name: "BOTOL HDPE", group: "botol-wadah",
    description: "Botol HDPE plastik tebal untuk kimia, detergen, sampo, dan industri — 17 varian. Food grade, tahan bahan kimia, ecer & grosir.",
    keywords: [
      "botol hdpe", "botol plastik hdpe", "jual botol hdpe", "botol hdpe food grade",
      "botol hdpe murah", "botol kimia plastik", "botol detergen plastik", "botol sampo plastik",
      "botol hdpe yogyakarta", "supplier botol hdpe", "botol hdpe jogja",
    ],
  },
  {
    slug: "botol-pet", name: "BOTOL PET", group: "botol-wadah",
    description: "Botol PET plastik bening untuk air minum, minuman, teh, dan produk FnB — 94 varian ukuran. Food grade, halal, ecer & grosir.",
    keywords: [
      "botol pet", "botol plastik bening", "botol minuman plastik", "botol air minum plastik",
      "jual botol pet", "botol pet food grade", "botol pet murah", "botol pet yogyakarta",
      "supplier botol pet", "botol teh plastik", "botol plastik transparan", "botol pet jogja",
      "botol air mineral plastik", "grosir botol pet",
    ],
  },
  {
    slug: "ember", name: "EMBER", group: "botol-wadah",
    description: "Ember plastik berbagai ukuran untuk rumah tangga, catering, masak, dan industri — 5 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "ember plastik", "ember plastik murah", "jual ember plastik", "ember grosir",
      "ember plastik yogyakarta", "ember besar plastik", "ember dapur plastik",
      "ember catering", "ember plastik jogja",
    ],
  },
  {
    slug: "galon", name: "GALON", group: "botol-wadah",
    description: "Galon plastik untuk air minum isi ulang, kemasan produk, dan industri — 8 varian kapasitas. Ecer & grosir Yogyakarta.",
    keywords: [
      "galon plastik", "galon air minum", "jual galon plastik", "galon kosong plastik",
      "galon murah", "galon plastik yogyakarta", "galon isi ulang", "galon air isi ulang",
      "supplier galon plastik", "galon plastik jogja",
    ],
  },
  {
    slug: "gelas-ukur", name: "GELAS UKUR", group: "botol-wadah",
    description: "Gelas ukur plastik akurat untuk laboratorium, dapur, dan industri — 3 varian (100ml–1000ml). Ecer & grosir.",
    keywords: [
      "gelas ukur", "gelas ukur plastik", "gelas ukur laboratorium", "jual gelas ukur",
      "gelas ukur murah", "gelas ukur plastik murah", "gelas ukur 500ml", "gelas ukur 1000ml",
      "gelas ukur dapur", "gelas ukur jogja",
    ],
  },
  {
    slug: "jirigen", name: "JIRIGEN", group: "botol-wadah",
    description: "Jirigen plastik HDPE tebal untuk minyak, bensin, air, dan keperluan industri — 18 varian kapasitas. Ecer & grosir Yogyakarta.",
    keywords: [
      "jirigen", "jirigen plastik", "jual jirigen", "jirigen murah", "jirigen minyak",
      "jirigen bensin", "jirigen air", "jirigen grosir yogyakarta", "jirigen hdpe",
      "jirigen plastik tebal", "jirigen industri", "jirigen jogja",
    ],
  },
  {
    slug: "pet-can", name: "PET CAN", group: "botol-wadah",
    description: "PET can plastik bening modern untuk minuman, jus, dan produk FnB kemasan premium — 8 varian. Food grade, ecer & grosir.",
    keywords: [
      "pet can", "kaleng plastik bening", "cup minuman bening", "cup bening modern",
      "jual pet can", "pet can murah", "cup plastik bening premium", "kemasan minuman bening",
      "botol can plastik", "pet can food grade", "pet can jogja",
    ],
  },
  {
    slug: "pot-urine", name: "POT URINE", group: "botol-wadah",
    description: "Pot urine plastik steril untuk keperluan medis, laboratorium, klinik, dan rumah sakit — 7 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "pot urine", "pot urine plastik", "jual pot urine", "pot urine murah",
      "pot urine laboratorium", "pot sampel plastik", "pot urine medis", "pot urine klinik",
      "wadah sampel urine", "pot urine steril", "pot urine jogja",
    ],
  },
  {
    slug: "toples", name: "TOPLES", group: "botol-wadah",
    description: "Toples plastik bening untuk kue lebaran, permen, camilan, dan produk makanan — 31 varian. Food grade, halal, ecer & grosir.",
    keywords: [
      "toples plastik", "toples makanan", "toples kue", "toples permen", "toples camilan",
      "jual toples plastik", "toples murah", "toples food grade", "toples bening plastik",
      "toples kue lebaran", "grosir toples yogyakarta", "toples plastik bening",
      "toples snack plastik", "toples jogja",
    ],
  },
  {
    slug: "tutup-botol", name: "TUTUP BOTOL", group: "botol-wadah",
    description: "Tutup botol plastik untuk botol PET, HDPE, dan berbagai ukuran botol — food grade. Ecer & grosir Yogyakarta.",
    keywords: [
      "tutup botol", "tutup botol plastik", "jual tutup botol", "tutup botol murah",
      "tutup botol grosir", "tutup botol minuman", "cap botol plastik", "penutup botol plastik",
      "tutup botol pet", "tutup botol hdpe", "tutup botol jogja",
    ],
  },
  {
    slug: "tutup-gelas", name: "TUTUP GELAS", group: "botol-wadah",
    description: "Tutup cup plastik dan dome lid untuk minuman kafe, boba, es teh, dan FnB — 12 varian. Food grade, ecer & grosir.",
    keywords: [
      "tutup gelas", "tutup cup", "dome lid", "tutup gelas plastik", "jual tutup gelas",
      "tutup cup boba", "tutup gelas minuman", "tutup cup cafe", "dome cup lid",
      "tutup gelas murah", "lid cup minuman", "tutup cup kafe", "tutup gelas jogja",
    ],
  },

  // ── Kantong & Plastik ─────────────────────────────────────────────────────
  {
    slug: "bag", name: "BAG", group: "kantong-plastik",
    description: "Tas belanja dan paper bag untuk toko, retail, kafe, dan FnB — 11 varian. Shopping bag, soft handel, paper bag handle, ecer & grosir.",
    keywords: [
      "bag plastik", "kantong belanja", "paper bag", "shopping bag", "jual bag plastik",
      "kantong belanja plastik", "paper bag handle", "soft handel bag", "tote bag plastik",
      "kantong belanja grosir", "paper bag toko", "bag kemasan toko", "bag jogja",
    ],
  },
  {
    slug: "bubble-wrap", name: "BUBBLE WRAP", group: "kantong-plastik",
    description: "Bubble wrap plastik gelembung untuk packing pengiriman dan perlindungan barang rapuh — 9 varian ukuran. Ecer & grosir Yogyakarta.",
    keywords: [
      "bubble wrap", "plastik gelembung", "bubble wrap murah", "jual bubble wrap",
      "plastik pelindung bubble", "bubble wrap pengiriman", "bubble wrap grosir",
      "bubble wrap yogyakarta", "bungkus bubble wrap", "plastik bubble packing",
      "bubble wrap packing jogja",
    ],
  },
  {
    slug: "kresek", name: "KRESEK", group: "kantong-plastik",
    description: "Kantong kresek plastik hitam, putih, dan warna untuk belanja dan kemasan — 31 varian ukuran. Ecer & grosir Yogyakarta.",
    keywords: [
      "kresek", "kantong kresek", "plastik kresek", "kresek hitam", "kresek putih",
      "jual kresek", "kresek murah", "kresek grosir", "kantong belanja kresek",
      "plastik belanja kresek", "kantong plastik hitam", "kresek yogyakarta",
      "grosir kantong kresek", "kresek jogja",
    ],
  },
  {
    slug: "mika", name: "MIKA", group: "kantong-plastik",
    description: "Mika plastik bening untuk kemasan kue, makanan, souvenir, dan produk — 52 varian ukuran. Food grade, ecer & grosir Yogyakarta.",
    keywords: [
      "mika plastik", "mika makanan", "mika kue", "mika kemasan", "jual mika plastik",
      "mika murah", "mika food grade", "mika bening plastik", "mika kue bolu",
      "mika kemasan makanan", "mika souvenir", "mika packaging", "grosir mika yogyakarta",
      "mika plastik jogja",
    ],
  },
  {
    slug: "plastik-es", name: "PLASTIK ES", group: "kantong-plastik",
    description: "Plastik es untuk kemasan es batu, es bersih, es krim, dan produk beku — 4 varian. Food grade, ecer & grosir.",
    keywords: [
      "plastik es", "plastik es batu", "kantong es batu", "plastik es krim",
      "jual plastik es", "plastik es murah", "kantong es grosir",
      "plastik es batangan", "kantong plastik es batu", "plastik es jogja",
    ],
  },
  {
    slug: "plastik-kg", name: "PLASTIK KG", group: "kantong-plastik",
    description: "Plastik kiloan (HD) untuk belanja, kemasan produk, dan keperluan rumah tangga — 26 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "plastik kg", "plastik kiloan", "plastik putih", "plastik hd", "kantong plastik kg",
      "jual plastik kg", "plastik kg murah", "plastik putih grosir", "plastik kilogram",
      "plastik hd murah", "kantong plastik putih", "plastik kg yogyakarta", "plastik kg jogja",
    ],
  },
  {
    slug: "plastik-laundry", name: "PLASTIK LAUNDRY", group: "kantong-plastik",
    description: "Plastik cover laundry untuk melindungi pakaian bersih dan pengiriman — 3 varian. Ecer & grosir.",
    keywords: [
      "plastik laundry", "kantong laundry", "plastik baju laundry", "plastik cover laundry",
      "jual plastik laundry", "kantong plastik laundry murah", "plastik laundry grosir",
      "cover laundry plastik", "plastik pelindung baju laundry", "plastik laundry jogja",
    ],
  },
  {
    slug: "plastik-opp", name: "PLASTIK OPP", group: "kantong-plastik",
    description: "Plastik OPP bening mengkilap untuk kemasan souvenir, roti, kue kering, dan produk — 48 varian ukuran. Ecer & grosir Yogyakarta.",
    keywords: [
      "plastik opp", "plastik opp bening", "plastik opp murah", "jual plastik opp",
      "plastik souvenir", "plastik bungkus souvenir", "plastik opp grosir",
      "plastik kemasan souvenir", "plastik opp yogyakarta", "kantong opp bening",
      "plastik opp kue kering", "opp bag", "plastik opp jogja",
    ],
  },
  {
    slug: "plastik-wrap", name: "PLASTIK WRAP", group: "kantong-plastik",
    description: "Plastik wrap (cling film) untuk bungkus makanan, preservasi, dan dapur profesional — food grade. Ecer & grosir.",
    keywords: [
      "plastik wrap", "cling wrap", "stretch film", "plastik wrap makanan",
      "jual plastik wrap", "plastik wrapping", "cling film makanan",
      "plastik wrap murah", "plastik bungkus makanan", "plastik wrap dapur", "cling wrap jogja",
    ],
  },
  {
    slug: "pvc-shrink", name: "PVC SHRINK", group: "kantong-plastik",
    description: "PVC shrink film untuk kemasan botol, produk FMCG, dan perlindungan kemasan — 2 varian. Ecer & grosir.",
    keywords: [
      "pvc shrink", "shrink wrap", "pvc shrink film", "jual pvc shrink",
      "shrink sleeve", "plastik shrink murah", "pvc shrink grosir",
      "shrink film kemasan", "pvc shrink botol", "heat shrink plastik", "pvc shrink jogja",
    ],
  },
  {
    slug: "standing-pouch", name: "STANDING POUCH", group: "kantong-plastik",
    description: "Standing pouch plastik untuk kemasan kopi, teh, snack, dan produk FMCG — 7 varian. Food grade, zipper, ecer & grosir.",
    keywords: [
      "standing pouch", "standing pouch plastik", "kantong standing pouch", "pouch kemasan",
      "jual standing pouch", "standing pouch murah", "standing pouch food grade",
      "kemasan standing pouch", "standing pouch grosir", "standing pouch kopi",
      "standing pouch snack", "standing pouch jogja",
    ],
  },
  {
    slug: "trash-bag", name: "TRASH BAG", group: "kantong-plastik",
    description: "Kantong sampah (trash bag) hitam dan warna untuk rumah tangga, kantor, dan industri — 4 varian. Ecer & grosir.",
    keywords: [
      "trash bag", "kantong sampah", "kantong sampah plastik", "garbage bag",
      "jual trash bag", "kantong sampah murah", "trash bag hitam", "kantong sampah grosir",
      "kantong sampah besar", "trash bag plastik murah", "kantong sampah jogja",
    ],
  },
  {
    slug: "zip-lock", name: "ZIP LOCK", group: "kantong-plastik",
    description: "Plastik zip lock klip untuk kemasan makanan, bahan baku, dan penyimpanan — 13 varian. Food grade, ecer & grosir.",
    keywords: [
      "zip lock", "plastik zip lock", "kantong zip lock", "zipper bag",
      "plastik klip", "jual zip lock", "zip lock murah", "kantong klip plastik",
      "zip lock food grade", "plastik zipper murah", "kantong zip lock makanan",
      "zip lock grosir", "plastik ziplock jogja",
    ],
  },

  // ── Kemasan Makanan ───────────────────────────────────────────────────────
  {
    slug: "cake-cases", name: "CAKE CASES", group: "kemasan-makanan",
    description: "Cup kue kertas (cake cases) untuk cupcake, muffin, brownie, dan kue kering — 11 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "cake cases", "cup kue", "cetakan kue kertas", "baking cup", "cup cupcake",
      "jual cake cases", "cup muffin", "paper cup kue", "cake cases murah",
      "baking cup grosir", "cup brownie", "cup kue kertas yogyakarta", "cake cases jogja",
    ],
  },
  {
    slug: "carry-cup", name: "CARRY CUP", group: "kemasan-makanan",
    description: "Carry cup tempat minuman kafe dan boba untuk memudahkan membawa — praktis, anti tumpah. Ecer & grosir.",
    keywords: [
      "carry cup", "tempat minum", "cup carrier", "tempat gelas minuman",
      "jual carry cup", "cup holder minuman", "carry cup cafe", "tempat minuman plastik",
      "holder minuman boba", "carry cup kafe", "tempat bawa minuman", "carry cup jogja",
    ],
  },
  {
    slug: "cup-gelas", name: "CUP GELAS", group: "kemasan-makanan",
    description: "Gelas plastik bening untuk minuman kafe, boba, es teh, dan FnB — 35 varian ukuran. Cup gelas food grade, ecer & grosir Yogyakarta.",
    keywords: [
      "cup gelas", "gelas plastik", "gelas minuman", "cup plastik cafe", "gelas boba",
      "cup minuman kekinian", "cup plastik murah", "gelas minuman cafe", "cup plastik food grade",
      "gelas plastik bening", "gelas plastik untuk kafe", "cup gelas minuman",
      "jual cup gelas", "cup gelas boba", "gelas plastik grosir", "cup minuman plastik",
      "gelas minuman kekinian", "gelas plastik yogyakarta", "cup gelas jogja",
      "gelas plastik cafe", "cup boba plastik",
    ],
  },
  {
    slug: "deli-pet-square", name: "DELI PET SQUARE", group: "kemasan-makanan",
    description: "Deli PET square wadah plastik bening untuk salad, buah, produk deli, dan makanan segar — 3 varian. Food grade, ecer & grosir.",
    keywords: [
      "deli pet square", "kotak makan plastik bening", "wadah makanan bening",
      "deli container", "jual deli pet square", "kotak plastik bening murah",
      "wadah salad plastik", "deli box bening", "container makanan bening",
      "kotak buah plastik", "deli pet square jogja",
    ],
  },
  {
    slug: "food-tray", name: "FOOD TRAY", group: "kemasan-makanan",
    description: "Food tray nampan plastik untuk kemasan makanan siap saji, fast food, dan catering — 3 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "food tray", "nampan makanan", "tray plastik", "nampan plastik",
      "food tray murah", "jual food tray", "tray makanan plastik",
      "nampan plastik grosir", "tray fast food", "tray catering plastik", "food tray jogja",
    ],
  },
  {
    slug: "ice-cream", name: "ICE CREAM", group: "kemasan-makanan",
    description: "Kemasan ice cream untuk es krim cup, cone, stick, dan produk beku — 6 varian. Food grade, ecer & grosir.",
    keywords: [
      "kemasan ice cream", "wadah es krim", "cup es krim", "cone es krim",
      "jual kemasan ice cream", "cup ice cream plastik", "wadah es krim murah",
      "kemasan ice cream cafe", "kemasan es krim grosir", "cup es krim plastik",
      "kemasan ice cream jogja",
    ],
  },
  {
    slug: "kertas-nasi", name: "KERTAS NASI", group: "kemasan-makanan",
    description: "Kertas nasi pembungkus makanan food grade untuk warung, catering, dan usaha FnB — 8 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "kertas nasi", "kertas pembungkus nasi", "nasi bungkus kertas", "kertas food grade",
      "jual kertas nasi", "kertas nasi murah", "kertas bungkus makanan",
      "kertas nasi grosir", "kertas kemasan nasi", "kertas nasi warung",
      "kertas pembungkus makanan", "kertas nasi yogyakarta", "kertas nasi jogja",
    ],
  },
  {
    slug: "lunchbox", name: "LUNCHBOX", group: "kemasan-makanan",
    description: "Lunchbox kotak makan plastik dan kertas untuk catering, meal prep, bekal, dan delivery — 8 varian. Food grade, ecer & grosir.",
    keywords: [
      "lunchbox", "kotak makan", "lunch box plastik", "kotak makan plastik",
      "jual lunchbox", "lunchbox murah", "kotak bekal plastik", "kotak makan food grade",
      "lunch box grosir", "kotak makan catering", "kotak makan delivery",
      "lunchbox thinwall", "kotak makan jogja",
    ],
  },
  {
    slug: "matras-sushi-roll", name: "MATRAS SUSHI ROLL", group: "kemasan-makanan",
    description: "Matras sushi roll bambu untuk menggulung sushi — alat dapur restoran Jepang dan kelas memasak. Ecer & grosir.",
    keywords: [
      "matras sushi roll", "bamboo mat sushi", "alat gulung sushi", "jual matras sushi",
      "matras sushi murah", "sushi rolling mat", "alat sushi roll", "sushi mat bambu",
      "matras bambu sushi", "matras sushi jogja",
    ],
  },
  {
    slug: "paper-bowl", name: "PAPER BOWL", group: "kemasan-makanan",
    description: "Paper bowl mangkok kertas food grade untuk sup, bakso, mie, dan makanan berkuah — 10 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "paper bowl", "mangkok kertas", "bowl kertas", "mangkok kertas makanan",
      "jual paper bowl", "paper bowl murah", "paper bowl soup", "mangkok kertas grosir",
      "bowl kertas food grade", "paper bowl sup", "mangkok kertas bakso",
      "mangkok kertas mie", "paper bowl yogyakarta", "paper bowl jogja",
    ],
  },
  {
    slug: "paper-box", name: "PAPER BOX", group: "kemasan-makanan",
    description: "Paper box kotak kertas food grade untuk burger, ayam, makanan fast food, dan delivery — 6 varian. Ecer & grosir.",
    keywords: [
      "paper box", "kotak kertas", "box kertas makanan", "jual paper box",
      "paper box murah", "kotak makanan kertas", "paper box food grade",
      "kemasan box kertas", "paper box burger", "paper box ayam", "box kertas delivery",
      "paper box jogja",
    ],
  },
  {
    slug: "paper-cup", name: "PAPER CUP", group: "kemasan-makanan",
    description: "Paper cup gelas kertas untuk kopi, minuman panas, es, dan kafe — 9 varian ukuran (6oz–16oz). Food grade, ecer & grosir Yogyakarta.",
    keywords: [
      "paper cup", "gelas kertas", "cup kertas", "gelas kertas minuman",
      "jual paper cup", "paper cup murah", "gelas kertas cafe", "cup kertas kopi",
      "paper cup grosir", "gelas kertas food grade", "paper cup kopi", "cup kertas kafe",
      "paper cup 8oz", "paper cup 12oz", "paper cup yogyakarta", "paper cup jogja",
    ],
  },
  {
    slug: "paper-dollies", name: "PAPER DOLLIES", group: "kemasan-makanan",
    description: "Paper dollies alas kertas renda untuk presentasi kue, display makanan, dan dekorasi — 2 varian. Ecer & grosir.",
    keywords: [
      "paper dollies", "alas kue kertas", "doilies kertas", "alas kertas kue",
      "jual paper dollies", "paper doilies murah", "alas kue renda kertas",
      "doily kertas", "alas kue display", "paper dollies jogja",
    ],
  },
  {
    slug: "seal-cup", name: "SEAL CUP", group: "kemasan-makanan",
    description: "Seal cup film plastik untuk menyegel minuman boba, jus, es, dan cup — 2 varian. Anti tumpah, ecer & grosir Yogyakarta.",
    keywords: [
      "seal cup", "sealer cup", "film sealer", "plastik seal cup",
      "jual seal cup", "seal cup murah", "segel cup minuman", "lid seal cup",
      "cup sealer plastik", "seal boba", "seal cup kafe", "seal minuman plastik",
      "seal cup yogyakarta", "seal cup jogja",
    ],
  },
  {
    slug: "seal-toples", name: "SEAL TOPLES", group: "kemasan-makanan",
    description: "Seal toples segel plastik untuk menutup dan mengamankan toples makanan — 10 varian. Anti bocor, ecer & grosir.",
    keywords: [
      "seal toples", "segel toples", "tutup segel plastik", "seal penutup toples",
      "jual seal toples", "seal toples murah", "segel toples makanan",
      "plastik segel toples", "penutup toples segel", "seal toples jogja",
    ],
  },
  {
    slug: "sedotan", name: "SEDOTAN", group: "kemasan-makanan",
    description: "Sedotan plastik dan kertas untuk minuman boba, kopi, jus, dan kafe — 14 varian. Food grade, ecer & grosir Yogyakarta.",
    keywords: [
      "sedotan", "sedotan plastik", "sedotan minuman", "straw minuman", "sedotan boba",
      "sedotan kertas", "jual sedotan", "sedotan murah", "sedotan grosir",
      "sedotan cafe", "sedotan kopi", "sedotan food grade",
      "sedotan minuman kekinian", "sedotan yogyakarta", "sedotan jogja",
    ],
  },
  {
    slug: "sendok", name: "SENDOK", group: "kemasan-makanan",
    description: "Sendok plastik food grade untuk makanan, dessert, es krim, dan katering — 34 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "sendok plastik", "sendok makan plastik", "sendok dessert", "sendok ice cream",
      "jual sendok plastik", "sendok plastik murah", "sendok grosir",
      "sendok plastik food grade", "sendok plastik cafe", "sendok plastik katering",
      "grosir sendok plastik", "sendok yogyakarta", "sendok plastik jogja",
    ],
  },
  {
    slug: "sendok-garpu-pisau", name: "SENDOK GARPU PISAU", group: "kemasan-makanan",
    description: "Set cutlery plastik sendok garpu pisau untuk katering, acara, event, dan restoran — 6 varian. Food grade, ecer & grosir.",
    keywords: [
      "sendok garpu pisau", "cutlery plastik", "alat makan plastik", "set sendok garpu",
      "jual cutlery plastik", "sendok garpu pisau murah", "alat makan plastik grosir",
      "cutlery set plastik", "set makan plastik", "cutlery katering", "sendok garpu jogja",
    ],
  },
  {
    slug: "soup-cup", name: "SOUP CUP", group: "kemasan-makanan",
    description: "Soup cup plastik dan kertas untuk sup, bakso, mie, pho, dan makanan berkuah — 6 varian. Food grade, ecer & grosir.",
    keywords: [
      "soup cup", "cup sup", "mangkok sup plastik", "container sup",
      "jual soup cup", "soup cup murah", "cup mie plastik", "cup bakso plastik",
      "soup cup kertas", "soup cup food grade", "cup berkuah plastik", "soup cup jogja",
    ],
  },
  {
    slug: "styrofoam", name: "STYROFOAM", group: "kemasan-makanan",
    description: "Styrofoam kotak makan untuk kemasan makanan warung, katering, dan takeaway — 5 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "styrofoam", "kemasan styrofoam", "kotak styrofoam", "kotak makan styrofoam",
      "jual styrofoam", "styrofoam murah", "styrofoam makanan", "styrofoam catering",
      "styrofoam grosir", "busa makanan styrofoam", "styrofoam yogyakarta", "styrofoam jogja",
    ],
  },
  {
    slug: "sumpit", name: "SUMPIT", group: "kemasan-makanan",
    description: "Sumpit bambu dan plastik untuk restoran, sushi, ramen, dan mie — 2 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "sumpit", "sumpit bambu", "sumpit plastik", "sumpit kayu", "jual sumpit",
      "sumpit murah", "sumpit grosir", "sumpit cafe", "chopstick bambu",
      "sumpit restoran", "sumpit sushi", "sumpit yogyakarta", "sumpit jogja",
    ],
  },
  {
    slug: "thinwall", name: "THINWALL", group: "kemasan-makanan",
    description: "Thinwall wadah plastik bening untuk katering, meal prep, makanan, dan delivery — 45 varian ukuran. Food grade, ecer & grosir Yogyakarta.",
    keywords: [
      "thinwall", "wadah plastik thinwall", "kotak thinwall", "thinwall food grade",
      "jual thinwall", "thinwall murah", "kotak makan thinwall bening", "thinwall grosir",
      "thinwall catering", "thinwall delivery", "kemasan thinwall", "thinwall meal prep",
      "wadah makan thinwall", "thinwall yogyakarta", "thinwall jogja",
    ],
  },
  {
    slug: "tusuk-gigi", name: "TUSUK GIGI", group: "kemasan-makanan",
    description: "Tusuk gigi bambu dan plastik untuk restoran, kafe, dan usaha FnB — 2 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "tusuk gigi", "tusuk gigi plastik", "tusuk gigi bambu", "jual tusuk gigi",
      "tusuk gigi murah", "toothpick grosir", "tusuk gigi cafe",
      "tusuk gigi restoran", "tusuk gigi grosir", "tusuk gigi jogja",
    ],
  },
  {
    slug: "tusukan", name: "TUSUKAN", group: "kemasan-makanan",
    description: "Tusukan sate, bakso, dan makanan bambu untuk restoran, warung, dan katering — 20 varian panjang. Ecer & grosir Yogyakarta.",
    keywords: [
      "tusukan", "tusuk sate", "tusuk bakso", "tusuk makanan", "jual tusukan",
      "tusuk sate bambu", "tusukan murah", "tusukan grosir",
      "tusuk bakso bambu", "tusuk sate kayu", "lidi sate bambu",
      "tusukan yogyakarta", "tusuk sate jogja",
    ],
  },

  // ── Perlengkapan ─────────────────────────────────────────────────────────
  {
    slug: "cable-tie", name: "CABLE TIE", group: "perlengkapan",
    description: "Cable tie pengikat nylon plastik untuk kabel, pipa, dan keperluan teknik & industri — 10 varian ukuran. Ecer & grosir.",
    keywords: [
      "cable tie", "kabel tie", "pengikat kabel", "cable tie plastik",
      "jual cable tie", "cable tie murah", "cable tie grosir",
      "nylon cable tie", "tie wrap plastik", "cable tie nylon", "cable tie jogja",
    ],
  },
  {
    slug: "cutter", name: "CUTTER", group: "perlengkapan",
    description: "Cutter pisau serbaguna untuk pemotongan kemasan, karton, dan keperluan industri & kantor. Ecer & grosir.",
    keywords: [
      "cutter", "pisau cutter", "cutter murah", "jual cutter", "cutter plastik",
      "cutter grosir", "box cutter", "art knife", "cutter karton", "cutter jogja",
    ],
  },
  {
    slug: "jas-hujan", name: "JAS HUJAN", group: "perlengkapan",
    description: "Jas hujan plastik sekali pakai untuk pekerja lapangan, kurir, dan kebutuhan darurat — 5 varian. Ecer & grosir.",
    keywords: [
      "jas hujan", "jas hujan plastik", "jas hujan murah", "raincoat plastik",
      "jual jas hujan", "jas hujan grosir", "jas hujan disposable",
      "jas hujan sekali pakai", "raincoat disposable", "jas hujan kurir", "jas hujan jogja",
    ],
  },
  {
    slug: "kardus", name: "KARDUS", group: "perlengkapan",
    description: "Kardus dus kemasan untuk pengiriman, packaging produk, dan penyimpanan — 33 varian ukuran. Ecer & grosir Yogyakarta.",
    keywords: [
      "kardus", "kardus dus", "kardus packaging", "kardus kemasan",
      "jual kardus", "kardus murah", "kardus grosir", "dus kemasan",
      "kardus pengiriman", "kardus cokelat", "kardus packing", "dus grosir",
      "kardus yogyakarta", "kardus jogja",
    ],
  },
  {
    slug: "karet-gelang", name: "KARET GELANG", group: "perlengkapan",
    description: "Karet gelang (rubber band) untuk mengikat, packaging, dan keperluan kantor & toko — 2 varian. Ecer & grosir.",
    keywords: [
      "karet gelang", "karet gelang plastik", "rubber band", "gelang karet",
      "jual karet gelang", "karet gelang murah", "karet gelang grosir",
      "karet ikat", "rubber band murah", "karet gelang kantor", "karet gelang jogja",
    ],
  },
  {
    slug: "kran-air", name: "KRAN AIR", group: "perlengkapan",
    description: "Kran air plastik food grade untuk galon, dispenser, dan tempat air minum. Ecer & grosir.",
    keywords: [
      "kran air", "keran air plastik", "kran galon", "kran dispenser",
      "jual kran air", "kran air murah", "kran plastik", "keran plastik murah",
      "kran air galon plastik", "kran air food grade", "kran air jogja",
    ],
  },
  {
    slug: "lakban", name: "LAKBAN", group: "perlengkapan",
    description: "Lakban selotip bening, cokelat, dan hitam untuk packaging, pengiriman, dan industri — 26 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "lakban", "selotip", "lakban bening", "lakban cokelat", "lakban hitam",
      "jual lakban", "lakban murah", "lakban grosir", "isolasi",
      "tape packaging", "lakban packaging", "lakban pengiriman",
      "selotip besar", "lakban yogyakarta", "lakban jogja",
    ],
  },
  {
    slug: "pipet-kaca", name: "PIPET KACA", group: "perlengkapan",
    description: "Pipet kaca dropper untuk laboratorium, apotik, dan produk kosmetik — lab grade. Ecer & grosir.",
    keywords: [
      "pipet kaca", "pipet laboratorium", "dropper kaca", "jual pipet kaca",
      "pipet kaca murah", "pipet tetes kaca", "glass dropper",
      "pipet apotik", "dropper kaca kosmetik", "pipet kaca jogja",
    ],
  },
  {
    slug: "saringan", name: "SARINGAN", group: "perlengkapan",
    description: "Saringan plastik untuk kopi, teh, masak, dan keperluan dapur — food grade. Ecer & grosir.",
    keywords: [
      "saringan", "saringan plastik", "strainer plastik", "jual saringan",
      "saringan murah", "saringan kopi", "saringan teh plastik",
      "saringan masak", "saringan dapur plastik", "saringan jogja",
    ],
  },
  {
    slug: "sarung-tangan", name: "SARUNG TANGAN", group: "perlengkapan",
    description: "Sarung tangan plastik disposable untuk memasak, kebersihan, dan industri makanan — 5 varian. Food grade, ecer & grosir.",
    keywords: [
      "sarung tangan", "sarung tangan plastik", "gloves plastik", "sarung tangan disposable",
      "jual sarung tangan", "sarung tangan murah", "sarung tangan sekali pakai",
      "sarung tangan food grade", "handgloves plastik", "sarung tangan masak",
      "gloves dapur", "sarung tangan jogja",
    ],
  },
  {
    slug: "segel", name: "SEGEL", group: "perlengkapan",
    description: "Segel botol dan kemasan plastik anti-tamper untuk keamanan produk — 2 varian. Ecer & grosir.",
    keywords: [
      "segel", "segel botol", "seal botol plastik", "tamper evident seal",
      "jual segel", "segel murah", "segel kemasan", "segel galon",
      "segel plastik kemasan", "anti tamper segel", "segel botol plastik", "segel jogja",
    ],
  },
  {
    slug: "stiker", name: "STIKER", group: "perlengkapan",
    description: "Stiker label untuk kemasan produk, harga, branding toko, dan packaging — 2 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "stiker", "stiker label", "stiker kemasan", "label stiker plastik",
      "jual stiker", "stiker murah", "label produk stiker", "stiker packaging",
      "stiker toko", "label harga stiker", "stiker branding", "stiker jogja",
    ],
  },
  {
    slug: "tali-rafia", name: "TALI RAFIA", group: "perlengkapan",
    description: "Tali rafia plastik warna untuk mengikat, packing, dan keperluan pertanian & gudang — 2 varian. Ecer & grosir.",
    keywords: [
      "tali rafia", "rafia plastik", "tali plastik", "jual tali rafia",
      "tali rafia murah", "tali rafia grosir", "tali rafia packing",
      "rafia hijau", "tali ikat plastik", "tali rafia pertanian", "tali rafia jogja",
    ],
  },
  {
    slug: "tissue", name: "TISSUE", group: "perlengkapan",
    description: "Tissue tisu meja dan napkin untuk restoran, kafe, dan usaha FnB — 3 varian. Ecer & grosir Yogyakarta.",
    keywords: [
      "tissue", "tisu", "tissue makanan", "tissue meja", "jual tissue",
      "tissue murah", "tisu grosir", "tissue restoran", "tissue cafe",
      "napkin tissue", "tisu makan", "tissue fnb", "tissue yogyakarta", "tissue jogja",
    ],
  },

  // ── Sablon ────────────────────────────────────────────────────────────────
  {
    slug: "sablon", name: "Sablon & Custom", group: "sablon",
    description: "Kemasan sablon custom untuk branding produk, packaging usaha, dan kemasan khusus — 48 desain. Custom order, ecer & grosir Yogyakarta.",
    keywords: [
      "sablon", "kemasan sablon", "plastik sablon", "custom packaging",
      "jual sablon kemasan", "sablon murah", "custom packaging yogyakarta",
      "cetak kemasan sablon", "kemasan custom", "plastik sablon custom",
      "kemasan branding", "sablon kemasan plastik jogja",
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
