import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category, CategoryGroup } from "@/data/categories";

interface CategoryCardProps {
  category:     Category;
  productCount: number;
}

const CONFIG: Record<CategoryGroup, {
  label: string;
  card:  string;
  mark:  string;
  tag:   string;
  arrow: string;
}> = {
  "botol-wadah": {
    label: "Botol & Wadah",
    card:  "bg-blue-50 border-blue-200/60 hover:border-blue-300 hover:shadow-[0_8px_24px_-6px_rgb(37_99_235_/_0.13)] dark:bg-blue-950/20 dark:border-blue-800/40 dark:hover:border-blue-700",
    mark:  "text-blue-200 dark:text-blue-900/80",
    tag:   "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    arrow: "border-blue-200 text-blue-300 group-hover:bg-blue-100 group-hover:border-blue-300 group-hover:text-blue-700 dark:border-blue-800 dark:text-blue-700 dark:group-hover:bg-blue-900/40 dark:group-hover:border-blue-700 dark:group-hover:text-blue-400",
  },
  "kantong-plastik": {
    label: "Kantong & Plastik",
    card:  "bg-teal-50 border-teal-200/60 hover:border-teal-300 hover:shadow-[0_8px_24px_-6px_rgb(20_184_166_/_0.13)] dark:bg-teal-950/20 dark:border-teal-800/40 dark:hover:border-teal-700",
    mark:  "text-teal-200 dark:text-teal-900/80",
    tag:   "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
    arrow: "border-teal-200 text-teal-300 group-hover:bg-teal-100 group-hover:border-teal-300 group-hover:text-teal-700 dark:border-teal-800 dark:text-teal-700 dark:group-hover:bg-teal-900/40 dark:group-hover:border-teal-700 dark:group-hover:text-teal-400",
  },
  "kemasan-makanan": {
    label: "Kemasan Makanan",
    card:  "bg-amber-50 border-amber-200/60 hover:border-amber-300 hover:shadow-[0_8px_24px_-6px_rgb(245_158_11_/_0.13)] dark:bg-amber-950/20 dark:border-amber-800/40 dark:hover:border-amber-700",
    mark:  "text-amber-200 dark:text-amber-900/80",
    tag:   "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    arrow: "border-amber-200 text-amber-300 group-hover:bg-amber-100 group-hover:border-amber-300 group-hover:text-amber-700 dark:border-amber-800 dark:text-amber-700 dark:group-hover:bg-amber-900/40 dark:group-hover:border-amber-700 dark:group-hover:text-amber-400",
  },
  "perlengkapan": {
    label: "Perlengkapan",
    card:  "bg-violet-50 border-violet-200/60 hover:border-violet-300 hover:shadow-[0_8px_24px_-6px_rgb(124_58_237_/_0.13)] dark:bg-violet-950/20 dark:border-violet-800/40 dark:hover:border-violet-700",
    mark:  "text-violet-200 dark:text-violet-900/80",
    tag:   "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
    arrow: "border-violet-200 text-violet-300 group-hover:bg-violet-100 group-hover:border-violet-300 group-hover:text-violet-700 dark:border-violet-800 dark:text-violet-700 dark:group-hover:bg-violet-900/40 dark:group-hover:border-violet-700 dark:group-hover:text-violet-400",
  },
  "sablon": {
    label: "Sablon",
    card:  "bg-rose-50 border-rose-200/60 hover:border-rose-300 hover:shadow-[0_8px_24px_-6px_rgb(244_63_94_/_0.13)] dark:bg-rose-950/20 dark:border-rose-800/40 dark:hover:border-rose-700",
    mark:  "text-rose-200 dark:text-rose-900/80",
    tag:   "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300",
    arrow: "border-rose-200 text-rose-300 group-hover:bg-rose-100 group-hover:border-rose-300 group-hover:text-rose-700 dark:border-rose-800 dark:text-rose-700 dark:group-hover:bg-rose-900/40 dark:group-hover:border-rose-700 dark:group-hover:text-rose-400",
  },
};

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  const cfg = CONFIG[category.group];

  return (
    <Link
      href={`/product/${category.slug}`}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${cfg.card}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      {/* Decorative watermark letter */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-4 -right-2 select-none font-black leading-none ${cfg.mark}`}
        style={{ fontSize: "clamp(5rem, 14vw, 9rem)" }}
      >
        {category.name.charAt(0)}
      </span>

      <div className="relative flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {/* Group label */}
        <span className={`self-start rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${cfg.tag}`}>
          {cfg.label}
        </span>

        {/* Category name */}
        <h2 className="text-sm font-black leading-snug tracking-tight text-slate-900 dark:text-slate-50 sm:text-[0.9375rem]">
          {category.name}
        </h2>

        {/* Footer: product count + arrow */}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-mono text-xs font-semibold tabular-nums text-slate-500 dark:text-slate-400">
            {productCount} produk
          </span>
          <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,color,background-color] duration-200 ${cfg.arrow}`}>
            <ArrowRight size={11} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
