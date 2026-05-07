"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { MessageCircle, X, ZoomIn } from "lucide-react";
import { CONTACT } from "@/constants";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Refs for direct DOM manipulation — avoids re-render on every mousemove
  const zoomClipRef = useRef<HTMLDivElement>(null);
  const zoomLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setIsZoomed(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  // Update transform-origin directly — no state, no re-render, instant response
  function handleZoomMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!zoomClipRef.current || !zoomLayerRef.current) return;
    const rect = zoomClipRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    zoomLayerRef.current.style.transformOrigin = `${x}% ${y}%`;
  }

  const waMessage = encodeURIComponent(
    `Halo, saya ingin menanyakan produk: ${product.name}`
  );
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${waMessage}`;

  return (
    <>
      <article
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-px hover:border-blue-100 hover:shadow-[0_6px_20px_-4px_rgb(37_99_235_/_0.09)] dark:border-slate-700/80 dark:bg-slate-900 dark:hover:border-blue-900"
        style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
      >
        {/* Thumbnail — klik untuk fullscreen, hover scale */}
        <button
          type="button"
          onClick={open}
          aria-label={`Lihat gambar penuh ${product.name}`}
          className="relative aspect-square w-full overflow-hidden bg-slate-50 dark:bg-slate-800"
        >
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
            style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
            loading="lazy"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-[background-color] duration-300 group-hover:bg-black/15"
          >
            <ZoomIn
              size={26}
              className="text-white opacity-0 drop-shadow-lg transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:scale-110"
            />
          </span>
        </button>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 dark:text-slate-50">
            {product.name}
          </h3>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Tanya harga ${product.name} via WhatsApp`}
            className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition-[transform,border-color,background-color,color] duration-150 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-400 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-400 dark:focus-visible:ring-offset-slate-900"
          >
            <MessageCircle size={13} aria-hidden="true" />
            Tanya Harga
          </a>
        </div>
      </article>

      {/* Lightbox portal */}
      {mounted && isOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Gambar ${product.name}`}
            className="animate-lightbox-backdrop fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4"
            onClick={close}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/88 backdrop-blur-md" />

            {/* Close button */}
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-[background-color,transform] duration-150 hover:bg-white/25 hover:scale-105 active:scale-95"
            >
              <X size={20} />
            </button>

            {/* Image + cursor-following zoom */}
            <div
              className="animate-lightbox-image relative z-10 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Clipping container — mouse events live here */}
              <div
                ref={zoomClipRef}
                className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl"
                onMouseMove={handleZoomMove}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => {
                  setIsZoomed(false);
                  // Reset origin to center when cursor leaves
                  if (zoomLayerRef.current) {
                    zoomLayerRef.current.style.transformOrigin = "50% 50%";
                  }
                }}
              >
                {/* Zoom layer — transform-origin updated via direct DOM, scale via state */}
                <div
                  ref={zoomLayerRef}
                  className="absolute inset-0"
                  style={{
                    transform: isZoomed ? "scale(3.5)" : "scale(1)",
                    transformOrigin: "50% 50%",
                    transition: "transform 0.38s cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 95vw, 672px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <p className="mt-4 text-center text-sm font-medium text-white/80">
                {product.name}
              </p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
