import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/constants";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const waMessage = encodeURIComponent(
    `Halo, saya ingin menanyakan produk: ${product.name}`
  );
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-[border-color,box-shadow] duration-200 hover:border-blue-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-800">
      <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-sm font-semibold leading-snug text-slate-900 dark:text-slate-50 line-clamp-2">
          {product.name}
        </h3>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Tanya harga ${product.name} via WhatsApp`}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition-[border-color,background-color,color] duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
        >
          <MessageCircle size={13} aria-hidden="true" />
          Tanya Harga
        </a>
      </div>
    </article>
  );
}
