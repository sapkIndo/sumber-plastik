/**
 * Fetch semua gambar dari Cloudinary dan generate isi PRODUCTS array.
 *
 * Cara pakai:
 *   node scripts/generate-products.mjs API_KEY API_SECRET
 *
 * API Key & Secret ada di: Cloudinary Dashboard → Settings → Access Keys
 */

import https from "https";

const CLOUD_NAME = "dcfqotpyr";
const API_KEY    = process.argv[2];
const API_SECRET = process.argv[3];

if (!API_KEY || !API_SECRET) {
  console.error("\n❌  Usage: node scripts/generate-products.mjs API_KEY API_SECRET\n");
  console.error("   API Key & Secret ada di: Cloudinary Dashboard → Settings → Access Keys\n");
  process.exit(1);
}

// ── Fetch semua resources (handle pagination) ──────────────────────────────
function fetchPage(nextCursor) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({ max_results: "500" });
    if (nextCursor) params.set("next_cursor", nextCursor);

    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
    const url  = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image?${params}`;

    const req = https.get(url, { headers: { Authorization: `Basic ${auth}` } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error("Invalid JSON response")); }
      });
    });
    req.on("error", reject);
  });
}

async function fetchAll() {
  const all = [];
  let cursor;
  do {
    const result = await fetchPage(cursor);
    if (result.error) {
      console.error("\n❌  Cloudinary error:", result.error.message);
      console.error("   Pastikan API Key dan API Secret benar.\n");
      process.exit(1);
    }
    all.push(...(result.resources ?? []));
    cursor = result.next_cursor;
  } while (cursor);
  return all;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toTitle(filename) {
  return filename
    .replace(/_[a-z0-9]{6}$/i, "")   // hapus suffix cloudinary misal _kigc2b
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

// ── Main ───────────────────────────────────────────────────────────────────
console.log("\n⏳  Mengambil data dari Cloudinary...\n");
const resources = await fetchAll();
console.log(`✅  Ditemukan ${resources.length} gambar.\n`);

// Group by folder
const byFolder = new Map();
for (const r of resources) {
  const parts  = r.public_id.split("/");
  const folder = parts.length > 1 ? parts.slice(0, -1).join("/") : "(root)";
  if (!byFolder.has(folder)) byFolder.set(folder, []);
  byFolder.get(folder).push(r);
}

// Tampilkan ringkasan folder
console.log("📂  Folder yang ditemukan:");
for (const [folder, imgs] of byFolder) {
  console.log(`    ${folder.padEnd(30)} ${imgs.length} gambar`);
}
console.log();

// Build products array
const products = [];
for (const [folder, imgs] of byFolder) {
  const rawSlug     = folder === "(root)" ? "lainnya" : toSlug(folder.split("/").pop());
  const categorySlug = rawSlug;

  for (const r of imgs) {
    const filename = r.public_id.split("/").pop();
    const idx      = String(products.length + 1).padStart(3, "0");

    products.push({
      id:           `${categorySlug}-${idx}`,
      name:          toTitle(filename),
      categorySlug,
      imageUrl:      r.secure_url,
    });
  }
}

// Output
const lines = products.map((p) => {
  return (
    `  {\n` +
    `    id:           "${p.id}",\n` +
    `    name:         "${p.name}",\n` +
    `    categorySlug: "${p.categorySlug}",\n` +
    `    imageUrl:     "${p.imageUrl}",\n` +
    `  },`
  );
});

console.log("─".repeat(60));
console.log("📋  Copy bagian ini ke src/data/products.ts:\n");
console.log(`export const PRODUCTS: Product[] = [\n${lines.join("\n")}\n];`);
console.log("─".repeat(60));
console.log(`\n✅  Total: ${products.length} produk dari ${byFolder.size} folder.\n`);

// Tampilkan juga slug kategori yang ditemukan (untuk update categories.ts)
const slugs = [...new Set(products.map((p) => p.categorySlug))];
console.log("💡  Category slugs yang ditemukan:");
console.log("   ", slugs.join(", "));
console.log("\n   Pastikan semua slug ini ada di src/data/categories.ts!\n");
