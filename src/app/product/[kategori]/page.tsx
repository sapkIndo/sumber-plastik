import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Package } from "lucide-react";
import { Suspense } from "react";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory, getPaginatedProducts } from "@/data/products";
import Breadcrumb from "@/components/produk/Breadcrumb";
import ProductGrid from "@/components/produk/ProductGrid";
import { SITE_URL, SITE_NAME, CONTACT } from "@/constants";

interface PageProps {
  params: Promise<{ kategori: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ kategori: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori } = await params;
  const category = getCategoryBySlug(kategori);
  if (!category) return {};

  const title = `${category.name} — Katalog Produk Kemasan`;
  const description = `Lihat katalog lengkap produk ${category.name} dari ${SITE_NAME}. ${category.description} Ecer & grosir, food grade, halal, ISO.`;

  return {
    title,
    description,
    keywords: category.keywords,
    alternates: {
      canonical: `${SITE_URL}/product/${category.slug}`,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/product/${category.slug}`,
    },
  };
}

export default async function KategoriPage({ params, searchParams }: PageProps) {
  const { kategori } = await params;
  const { page: pageParam } = await searchParams;

  const category = getCategoryBySlug(kategori);
  if (!category) notFound();

  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
  const allProducts = getProductsByCategory(category.slug);
  const { products, totalPages, totalCount, currentPage } = getPaginatedProducts(category.slug, page);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Katalog ${category.name} — ${SITE_NAME}`,
    description: category.description,
    url: `${SITE_URL}/product/${category.slug}`,
    numberOfItems: totalCount,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: (currentPage - 1) * 24 + i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        image: p.imageUrl,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          seller: { "@type": "Organization", name: SITE_NAME },
          url: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Halo, saya ingin menanyakan produk: ${p.name}`)}`,
        },
        brand: { "@type": "Brand", name: SITE_NAME },
      },
    })),
  };

  const isEmpty = totalCount === 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main id="main-content" className="mx-auto max-w-7xl px-5 py-12 md:px-6 md:py-20">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: "Produk", href: "/product" },
              { label: category.name },
            ]}
          />
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-6 bg-blue-600" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              Kategori
            </p>
          </div>
          <h1
            className="mb-3 font-black tracking-tighter text-slate-900 dark:text-slate-50"
            style={{ fontSize: "clamp(1.75rem, 3vw + 1rem, 3rem)" }}
          >
            {category.name}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
            {category.description}
          </p>
        </header>

        {/* Product grid or empty state */}
        {isEmpty ? (
          <section aria-labelledby="products-heading">
            <h2 id="products-heading" className="sr-only">Produk {category.name}</h2>
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-32 text-center dark:border-slate-700">
              <Package size={40} className="mb-4 text-slate-300" aria-hidden="true" />
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                Produk segera hadir
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Hubungi kami untuk informasi stok dan harga.
              </p>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Halo, saya ingin menanyakan produk kategori ${category.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Hubungi via WhatsApp
              </a>
            </div>
          </section>
        ) : (
          <section aria-labelledby="products-heading">
            <h2 id="products-heading" className="sr-only">Produk {category.name}</h2>
            <Suspense>
              <ProductGrid
                allProducts={allProducts}
                currentPage={currentPage}
                totalPages={totalPages}
                totalCount={totalCount}
              />
            </Suspense>
          </section>
        )}
      </main>
    </>
  );
}
