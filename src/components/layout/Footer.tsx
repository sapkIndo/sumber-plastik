import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { SITE_NAME, NAV_LINKS, CONTACT } from "@/constants";

const PRODUCT_LIST = [
  "Plastik PP (Polypropylene)",
  "Plastik PE (Polyethylene)",
  "Plastik PVC",
  "Plastik ABS",
  "Plastik Nylon (PA)",
  "Polycarbonate",
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
              <span className="font-bold text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400">
              Distributor plastik terpercaya dengan pengalaman lebih dari 14 tahun
              melayani kebutuhan industri nasional.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Navigasi
            </h3>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Produk
            </h3>
            <ul className="space-y-3" role="list">
              {PRODUCT_LIST.map((p) => (
                <li key={p} className="text-sm text-neutral-400">
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-neutral-500">
              Kontak
            </h3>
            <ul className="space-y-4" role="list">
              <li className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 shrink-0 text-orange-500" aria-hidden="true" />
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 shrink-0 text-orange-500" aria-hidden="true" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0 text-orange-500" aria-hidden="true" />
                <address className="not-italic text-sm text-neutral-400">
                  {CONTACT.address}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} {SITE_NAME}. Semua hak dilindungi.
          </p>
          <p className="text-xs text-neutral-600">Distributor Plastik Terpercaya di Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
