"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_NAME, CONTACT } from "@/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled
          ? "border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
      >
        <Link
          href="/"
          aria-label={`${SITE_NAME} - Beranda`}
          className="group flex items-center gap-2"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-orange-500 transition-transform duration-200 group-hover:scale-125" />
          <span className="font-bold tracking-tight text-white">{SITE_NAME}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-orange-500 transition-[width] duration-200 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-[background-color,transform] duration-150 ease-out hover:bg-orange-400 active:scale-[0.97]"
          >
            Hubungi Kami
          </Link>
        </div>

        <button
          className="rounded-lg p-2.5 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } border-b border-neutral-800 bg-neutral-950/95 px-6 backdrop-blur-md`}
      >
        <ul className="flex flex-col gap-4 pb-6 pt-4" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block py-2 text-neutral-400 transition-colors hover:text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-6 block rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
          onClick={() => setOpen(false)}
        >
          Hubungi Kami
        </Link>
      </div>
    </header>
  );
}
