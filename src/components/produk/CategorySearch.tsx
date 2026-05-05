"use client";

import { useState, useId } from "react";
import { Search, X } from "lucide-react";
import CategoryCard from "./CategoryCard";
import type { Category } from "@/data/categories";

interface CategorySearchProps {
  categories: { category: Category; productCount: number }[];
}

export default function CategorySearch({ categories }: CategorySearchProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const q = query.trim().toLowerCase();
  const filtered = q
    ? categories.filter(({ category }) =>
        category.name.toLowerCase().includes(q) ||
        category.description.toLowerCase().includes(q) ||
        category.keywords.some((k) => k.includes(q))
      )
    : categories;

  return (
    <div>
      {/* Search bar */}
      <div className="mb-10 max-w-sm">
        <label htmlFor={inputId} className="sr-only">Cari kategori produk</label>
        <div className="relative">
          <Search
            size={15}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kategori…"
            autoComplete="off"
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-blue-500"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Hapus pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {q && (
          <p className="mt-2.5 text-xs text-slate-400 dark:text-slate-500">
            {filtered.length > 0
              ? <><span className="font-semibold tabular-nums text-slate-700 dark:text-slate-300">{filtered.length}</span> kategori ditemukan</>
              : "Tidak ada kategori yang cocok"}
          </p>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <ul
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {filtered.map((item, index) => (
            <li
              key={item.category.slug}
              className="animate-fadein-up"
              style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
            >
              <CategoryCard
                category={item.category}
                productCount={item.productCount}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="font-semibold text-slate-900 dark:text-slate-50">
            Kategori tidak ditemukan
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Coba kata kunci lain atau{" "}
            <button
              onClick={() => setQuery("")}
              className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
            >
              lihat semua kategori
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
