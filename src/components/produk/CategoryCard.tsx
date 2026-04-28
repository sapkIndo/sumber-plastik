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
      href={`/produk/${category.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-blue-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-800"
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
          {productCount > 0 ? `${productCount} produk` : "Segera hadir"}
        </span>
        <ArrowRight
          size={16}
          className="text-slate-300 transition-[transform,color] duration-200 group-hover:translate-x-1 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-400"
          aria-hidden="true"
        />
      </div>
      <div>
        <h2 className="mb-1.5 text-lg font-bold text-slate-900 dark:text-slate-50">
          {category.name}
        </h2>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
