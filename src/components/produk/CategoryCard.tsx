import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
  productCount: number;
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <Link
      href={`/product/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_8px_28px_-6px_rgb(37_99_235_/_0.11)] active:scale-[0.99] dark:border-slate-700/80 dark:bg-slate-900 dark:hover:border-blue-800 dark:hover:shadow-[0_8px_28px_-6px_rgb(37_99_235_/_0.18)]"
      style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      {productCount > 0 && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-3 select-none font-black text-slate-100 dark:text-slate-800"
          style={{
            fontSize: "clamp(3rem, 5vw, 4.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {productCount}
        </span>
      )}

      <div className="relative flex flex-1 flex-col gap-5">
        <div>
          <h2 className="mb-2 text-lg font-bold tracking-tight text-slate-900 transition-colors duration-200 group-hover:text-blue-600 dark:text-slate-50 dark:group-hover:text-blue-400">
            {category.name}
          </h2>
          <p className="max-w-[34ch] text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {category.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs font-medium tabular-nums text-slate-400 dark:text-slate-500">
            {productCount > 0
              ? `${productCount} produk`
              : "Segera hadir"}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-300 transition-[transform,border-color,color,background-color] duration-200 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 dark:border-slate-700 dark:group-hover:border-blue-800 dark:group-hover:bg-blue-950/40 dark:group-hover:text-blue-400">
            <ArrowRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
