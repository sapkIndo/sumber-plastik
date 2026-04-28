import type { Metadata } from "next";
import { Package } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { getProductCountByCategory } from "@/data/products";
import CategoryCard from "@/components/produk/CategoryCard";
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="mx-auto max-w-7xl px-5 py-16 md:px-6 md:py-24">
        {/* Header */}
        <header className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Katalog Produk
            </p>
          </div>
          <h1
            className="mb-4 font-black tracking-tighter text-slate-900 dark:text-slate-50"
            style={{ fontSize: "clamp(2rem, 4vw + 1rem, 3.5rem)" }}
          >
            Semua Kategori
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {totalProducts > 0
              ? `${totalProducts.toLocaleString("id-ID")} produk dalam ${CATEGORIES.length} kategori — ecer & grosir, food grade, halal, bersertifikat ISO.`
              : `${CATEGORIES.length} kategori produk kemasan — ecer & grosir, food grade, halal, bersertifikat ISO.`}
          </p>
        </header>

        {/* Category grid */}
        <section aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="sr-only">Kategori produk</h2>
          {CATEGORIES.length > 0 ? (
            <ul
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
              role="list"
            >
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <CategoryCard
                    category={category}
                    productCount={getProductCountByCategory(category.slug)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Package size={40} className="mb-4 text-slate-300" aria-hidden="true" />
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                Katalog sedang disiapkan
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Produk akan segera tersedia. Hubungi kami untuk informasi lebih lanjut.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
