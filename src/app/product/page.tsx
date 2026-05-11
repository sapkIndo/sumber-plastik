import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { getProductCountByCategory } from "@/data/products";
import CategoryBrowser from "@/components/produk/CategoryBrowser";
import CountUp from "@/components/ui/CountUp";
import { SITE_URL } from "@/constants";

export const metadata: Metadata = {
  title: "Katalog Produk Kemasan",
  description:
    "Katalog lengkap produk kemasan plastik dan paper dari Sumber Aneka Plastik dan Kemasan — kresek, botol PET, botol HDPE, cable tie, bubble wrap. Ecer & grosir, food grade, halal, ISO.",
  alternates: {
    canonical: `${SITE_URL}/product`,
  },
  openGraph: {
    title: "Katalog Produk Kemasan | Sumber Aneka Plastik dan Kemasan",
    description:
      "Katalog lengkap produk kemasan plastik dan paper. Kresek, botol PET, botol HDPE, cable tie, bubble wrap. Ecer & grosir.",
    url: `${SITE_URL}/product`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Katalog Produk Kemasan — Sumber Aneka Plastik dan Kemasan",
  description:
    "Katalog lengkap produk kemasan plastik dan paper untuk FnB, industri, dan retail.",
  url: `${SITE_URL}/product`,
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Produk", item: `${SITE_URL}/product` },
    ],
  },
};

export default function ProdukPage() {
  const totalProducts = CATEGORIES.reduce(
    (sum, cat) => sum + getProductCountByCategory(cat.slug),
    0
  );

  const categoryItems = CATEGORIES.map((category) => ({
    category,
    productCount: getProductCountByCategory(category.slug),
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        {/* Header */}
        <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Katalog Produk
              </p>
            </div>
            <h1
              className="mb-3 font-black tracking-tighter text-slate-900 dark:text-slate-50"
              style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)" }}
            >
              Semua Kategori
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
              <CountUp
                to={totalProducts}
                className="font-semibold tabular-nums text-slate-700 dark:text-slate-300"
              />{" "}
              produk dalam{" "}
              <CountUp
                to={CATEGORIES.length}
                className="font-semibold tabular-nums text-slate-700 dark:text-slate-300"
              />{" "}
              kategori — ecer &amp; grosir, food grade, halal, bersertifikat ISO.
            </p>
          </div>

          {/* Live update indicator */}
          <div className="flex shrink-0 flex-col items-start gap-1.5 border-l-2 border-blue-200 pl-4 md:items-end md:border-l-0 md:border-r-2 md:pr-4 dark:border-blue-800">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                ON GOING
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Katalog terus diperbarui
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Produk baru ditambahkan secara berkala
            </p>
          </div>
        </header>

        {/* Browser: tabs + search + grid */}
        <section aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="sr-only">Kategori produk</h2>
          <CategoryBrowser categories={categoryItems} />
        </section>
      </main>
    </>
  );
}
