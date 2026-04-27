import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE_NAME, NAV_LINKS, CONTACT, STORES } from "@/constants";

const PRODUCT_LIST = [
  "Plastik PP (Polypropylene)",
  "Plastik PET",
  "HDPE",
  "Plastik PVC",
  "LLDPE",
  "PS / Styrofoam",
  "Paper Packaging",
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/logo/logo-square.png"
                alt={SITE_NAME}
                width={72}
                height={72}
                className="object-contain dark:brightness-0 dark:invert"
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Distributor plastik terpercaya dengan pengalaman lebih dari 14 tahun
              melayani kebutuhan industri nasional.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Navigasi</h3>
            <ul className="space-y-3" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Produk</h3>
            <ul className="space-y-3" role="list">
              {PRODUCT_LIST.map((p) => (
                <li key={p} className="text-sm text-slate-500 dark:text-slate-400">{p}</li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Kontak</h3>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-3">
                <Phone size={14} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Hotline Order WA</p>
                  <a
                    href={`https://wa.me/${CONTACT.whatsapp}`}
                    target="_blank" rel="noopener noreferrer"
                    className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={14} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50">
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            <h3 className="mb-3 mt-6 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Lokasi Toko</h3>
            <ul className="space-y-4" role="list">
              {STORES.map((store) => (
                <li key={store.name} className="flex items-start gap-3">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-blue-600" aria-hidden="true" />
                  <div>
                    <a href={store.mapsUrl} target="_blank" rel="noopener noreferrer" className="group">
                      <address className="not-italic text-xs leading-relaxed text-slate-500 transition-colors group-hover:text-slate-800 dark:text-slate-400 dark:group-hover:text-slate-200">
                        {store.address}
                      </address>
                    </a>
                    <div className="mt-1 flex items-center gap-2">
                      <Clock size={10} className="shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">{store.hours}</span>
                      <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">·</span>
                      <a href={`tel:${store.phone}`} className="text-[11px] text-blue-600 hover:underline dark:text-blue-400">
                        {store.phone}
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 dark:border-slate-800 sm:flex-row">
          <p className="text-xs text-slate-400 dark:text-slate-500">© {new Date().getFullYear()} {SITE_NAME}. Semua hak dilindungi.</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Distributor Plastik Terpercaya di Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
