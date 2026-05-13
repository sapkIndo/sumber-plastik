/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://sumberanekaplastikdankemasan.com",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
    ],
  },
  transform: async (config, path) => {
    // Homepage
    if (path === "/") {
      return { loc: path, changefreq: "daily", priority: 1.0, lastmod: new Date().toISOString() };
    }
    // Katalog utama
    if (path === "/product") {
      return { loc: path, changefreq: "daily", priority: 0.9, lastmod: new Date().toISOString() };
    }
    // Halaman kategori produk — prioritas tinggi untuk indexing
    if (path.startsWith("/product/")) {
      return { loc: path, changefreq: "weekly", priority: 0.85, lastmod: new Date().toISOString() };
    }
    // About & Contact
    if (path === "/about" || path === "/contact") {
      return { loc: path, changefreq: "monthly", priority: 0.6, lastmod: new Date().toISOString() };
    }
    return { loc: path, changefreq: config.changefreq, priority: config.priority, lastmod: new Date().toISOString() };
  },
};
