"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/data/products";
import { PRODUCTS_PER_PAGE } from "@/data/products";

interface ProductGridProps {
  allProducts: Product[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
}

export default function ProductGrid({
  allProducts,
  currentPage,
  totalPages,
  totalCount,
}: ProductGridProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filtered = query.trim()
    ? allProducts.filter((p) => p.name.toLowerCase().includes(query.toLowerCase().trim()))
    : null;

  const displayedProducts = filtered
    ? filtered
    : allProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  }

  const isEmpty = displayedProducts.length === 0;

  return (
    <div>
      {/* Search */}
      <div className="relative mb-8">
        <Search
          size={15}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari produk di kategori ini..."
          aria-label="Cari produk"
          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-[border-color,box-shadow] duration-200 focus:border-blue-400 focus:shadow-[0_0_0_3px_rgb(37_99_235_/_0.08)] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-blue-500"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Hapus pencarian"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors duration-150 hover:bg-slate-200 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <X size={11} />
          </button>
        )}
      </div>

      {/* Results info */}
      <p className="mb-6 text-sm text-slate-400 dark:text-slate-500">
        {filtered
          ? `${filtered.length} hasil untuk "${query}"`
          : `${Math.min((currentPage - 1) * PRODUCTS_PER_PAGE + 1, totalCount)}–${Math.min(currentPage * PRODUCTS_PER_PAGE, totalCount)} dari ${totalCount.toLocaleString("id-ID")} produk`
        }
      </p>

      {/* Grid */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Produk tidak ditemukan
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Coba kata kunci yang berbeda
          </p>
          <button
            onClick={() => setQuery("")}
            className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Lihat semua produk
          </button>
        </div>
      ) : (
        <ul
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4"
          role="list"
          aria-label="Daftar produk"
        >
          {displayedProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {/* Pagination — hanya tampil kalau tidak sedang search */}
      {!filtered && totalPages > 1 && (
        <nav
          aria-label="Halaman produk"
          className="mt-12 flex items-center justify-center gap-1.5"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage <= 1 || isPending}
            aria-label="Halaman sebelumnya"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
            const isActive = page === currentPage;
            const isNearCurrent = Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages;

            if (!isNearCurrent) {
              if (page === 2 || page === totalPages - 1) {
                return <span key={page} className="px-1 text-slate-400">…</span>;
              }
              return null;
            }

            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                disabled={isPending}
                aria-label={`Halaman ${page}`}
                aria-current={isActive ? "page" : undefined}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:opacity-70 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-400"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= totalPages || isPending}
            aria-label="Halaman berikutnya"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-sm text-slate-600 transition-colors hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-400"
          >
            ›
          </button>
        </nav>
      )}
    </div>
  );
}
