export interface Product {
  id: string;
  name: string;
  categorySlug: string;
  imageUrl: string;
}

// ---------------------------------------------------------------------------
// Isi array ini setelah upload ke Cloudinary selesai.
// Format URL: https://res.cloudinary.com/CLOUD_NAME/image/upload/products/KATEGORI/nama-file.jpg
//
// Contoh entry:
// {
//   id: "kresek-001",
//   name: "Kresek Hitam 30x50cm",
//   categorySlug: "kresek",
//   imageUrl: "https://res.cloudinary.com/xxx/image/upload/products/kresek/kresek-hitam-30x50.jpg",
// },
// ---------------------------------------------------------------------------
export const PRODUCTS: Product[] = [];

export const PRODUCTS_PER_PAGE = 24;

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getProductCountByCategory(categorySlug: string): number {
  return getProductsByCategory(categorySlug).length;
}

export function getPaginatedProducts(categorySlug: string, page: number): {
  products: Product[];
  totalPages: number;
  totalCount: number;
  currentPage: number;
} {
  const all = getProductsByCategory(categorySlug);
  const totalCount = all.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PRODUCTS_PER_PAGE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * PRODUCTS_PER_PAGE;
  const products = all.slice(start, start + PRODUCTS_PER_PAGE);
  return { products, totalPages, totalCount, currentPage: safePage };
}

export function searchProducts(query: string, categorySlug?: string): Product[] {
  const q = query.toLowerCase().trim();
  const pool = categorySlug ? getProductsByCategory(categorySlug) : PRODUCTS;
  if (!q) return pool;
  return pool.filter((p) => p.name.toLowerCase().includes(q));
}
