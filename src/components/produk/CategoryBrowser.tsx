"use client";

import { useState, useRef, useId } from "react";
import { Search, X } from "lucide-react";
import CategoryCard from "./CategoryCard";
import type { Category } from "@/data/categories";

interface CategoryItem {
  category:     Category;
  productCount: number;
}

interface CategoryBrowserProps {
  categories: CategoryItem[];
}

const TAB_GROUPS = [
  {
    id: "semua",
    label: "Semua",
    slugs: null,
  },
  {
    id: "botol-wadah",
    label: "Botol & Wadah",
    slugs: [
      "botol-br","botol-bumbu","botol-carex","botol-hdpe","botol-pet",
      "tutup-botol","tutup-gelas","jirigen","galon","pet-can",
      "pot-urine","ember","gelas-ukur",
    ],
  },
  {
    id: "kantong-plastik",
    label: "Kantong & Plastik",
    slugs: [
      "kresek","plastik-es","plastik-kg","plastik-laundry",
      "plastik-opp","plastik-wrap","bag","zip-lock","standing-pouch",
      "trash-bag","bubble-wrap","mika","pvc-shrink","alumunium-foil",
    ],
  },
  {
    id: "kemasan-makanan",
    label: "Kemasan Makanan",
    slugs: [
      "thinwall","cup-gelas","lunchbox","food-tray","paper-cup",
      "paper-bowl","paper-box","soup-cup","carry-cup","deli-pet-square",
      "cake-cases","ice-cream","sendok","sendok-garpu-pisau","sumpit",
      "sedotan","tusuk-gigi","tusukan","kertas-nasi","paper-dollies",
      "seal-cup","seal-toples","matras-sushi-roll",
    ],
  },
  {
    id: "perlengkapan",
    label: "Perlengkapan",
    slugs: [
      "lakban","cable-tie","tali-rafia","karet-gelang","segel",
      "stiker","cutter","saringan","kran-air","sarung-tangan",
      "jas-hujan","tissue","kardus","pipet-kaca",
    ],
  },
  {
    id: "sablon",
    label: "Sablon",
    slugs: ["sablon"],
  },
] as const;

export default function CategoryBrowser({ categories }: CategoryBrowserProps) {
  const [activeTab, setActiveTab] = useState("semua");
  const [query, setQuery]         = useState("");
  const tabsRef = useRef<HTMLDivElement>(null);
  const searchId = useId();

  const handleTab = (id: string) => {
    setActiveTab(id);
    setQuery("");
  };

  // 1. filter by tab
  const activeGroup = TAB_GROUPS.find((t) => t.id === activeTab);
  const tabFiltered =
    !activeGroup?.slugs
      ? categories
      : categories.filter(({ category }) =>
          (activeGroup.slugs as readonly string[]).includes(category.slug)
        );

  // 2. filter by search query
  const q = query.trim().toLowerCase();
  const visible = q
    ? tabFiltered.filter(({ category }) =>
        category.name.toLowerCase().includes(q) ||
        category.description.toLowerCase().includes(q) ||
        category.keywords.some((k) => k.includes(q))
      )
    : tabFiltered;

  return (
    <div>
      {/* ── Tab bar ── */}
      <div
        ref={tabsRef}
        role="tablist"
        aria-label="Filter kategori"
        className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TAB_GROUPS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count =
            tab.slugs === null
              ? categories.length
              : categories.filter(({ category }) =>
                  (tab.slugs as readonly string[]).includes(category.slug)
                ).length;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleTab(tab.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950
                ${isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
            >
              {tab.label}
              <span className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] tabular-nums
                ${isActive
                  ? "bg-white/25 text-white"
                  : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Search ── */}
      <div className="mb-7 max-w-xs">
        <div className="relative">
          <label htmlFor={searchId} className="sr-only">Cari kategori produk</label>
          <Search
            size={14}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari kategori…"
            autoComplete="off"
            aria-label="Cari kategori produk"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-50 dark:placeholder:text-slate-500 dark:focus:border-blue-500"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Hapus pencarian"
              title="Hapus pencarian"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:text-slate-200 dark:focus-visible:ring-offset-slate-900"
            >
              <X size={13} />
            </button>
          )}
        </div>
        {q && (
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            {visible.length > 0 ? (
              <><span className="font-semibold text-slate-700 dark:text-slate-300">{visible.length}</span> kategori ditemukan</>
            ) : (
              "Tidak ada kategori yang cocok"
            )}
          </p>
        )}
      </div>

      {/* ── Grid ── */}
      {visible.length > 0 ? (
        <ul
          role="list"
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        >
          {visible.map(({ category, productCount }, index) => (
            <li
              key={category.slug}
              className="animate-fadein-up h-full"
              style={{ animationDelay: `${Math.min(index, 15) * 35}ms` }}
            >
              <CategoryCard
                category={category}
                productCount={productCount}
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
              onClick={() => { setQuery(""); setActiveTab("semua"); }}
              className="text-blue-600 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:focus-visible:ring-offset-slate-900"
            >
              lihat semua kategori
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
