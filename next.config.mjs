/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Force HTTPS for 2 years
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent clickjacking
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  // Prevent MIME-type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Referrer info only on same-origin or HTTPS cross-origin
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  // Disable unnecessary browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js inline scripts (hydration, JSON-LD) require unsafe-inline
      "script-src 'self' 'unsafe-inline'",
      // Tailwind + Next.js inject inline styles
      "style-src 'self' 'unsafe-inline'",
      // Allow images from same origin, data URIs, blobs, and HTTPS
      "img-src 'self' data: blob: https:",
      // Next.js serves fonts from _next/static/
      "font-src 'self' data:",
      // API routes (same-origin) + Vercel Analytics beacon
      "connect-src 'self' https://vitals.vercel-insights.com",
      // No iframes allowed
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        pathname: "/9.x/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
