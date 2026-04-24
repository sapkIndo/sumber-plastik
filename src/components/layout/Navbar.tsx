"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { NAV_LINKS, SITE_NAME, CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP);

const navItems = NAV_LINKS.filter((l) => l.href !== "/");

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastScrollY = useRef(0);

  // Entrance animation — clearProps agar inline style GSAP tidak override CSS class
  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -48,
      opacity: 0,
      duration: 0.8,
      ease: "expo.out",
      clearProps: "all",
    });
  }, {});

  // Smart hide/show on scroll direction
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 60) {
        setScrolled(false);
        setHidden(false);
        lastScrollY.current = currentY;
        return;
      }

      setScrolled(true);

      if (currentY > lastScrollY.current + 6) {
        setHidden(true);
      } else if (currentY < lastScrollY.current - 6) {
        setHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        role="banner"
        className={`fixed inset-x-0 top-0 z-50 border-b border-neutral-800/50 transition-[background-color,backdrop-filter,transform] duration-300 ease-out ${
          scrolled
            ? "bg-neutral-950/95 backdrop-blur-md"
            : "bg-neutral-950/20 backdrop-blur-sm"
        } ${hidden && !open ? "-translate-y-full" : "translate-y-0"}`}
      >
        <nav
          aria-label="Navigasi utama"
          className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16"
        >
          {/* Logo — split weight, no icon */}
          <Link
            href="/"
            aria-label={`${SITE_NAME} - Beranda`}
            className="flex items-baseline gap-0.5 transition-opacity duration-150 hover:opacity-70"
          >
            <span className="text-sm font-medium text-neutral-500">Sumber</span>
            <span className="text-sm font-bold text-white">Plastik</span>
          </Link>

          {/* Desktop nav — numbered */}
          <ul className="hidden items-center gap-7 md:flex" role="list">
            {navItems.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-baseline gap-1.5 text-sm text-neutral-400 transition-colors duration-150 hover:text-white"
                >
                  <span className="font-mono text-[10px] tabular-nums text-neutral-700 transition-colors duration-150 group-hover:text-orange-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop — text CTA */}
          <Link
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-1 text-sm font-medium text-neutral-400 transition-colors duration-150 hover:text-white md:flex"
          >
            Hubungi Kami
            <ArrowUpRight
              size={13}
              className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>

          {/* Mobile toggle */}
          <button
            className="p-1.5 text-neutral-500 transition-colors hover:text-white md:hidden"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Buka menu"
          >
            <Menu size={18} />
          </button>
        </nav>
      </header>

      {/* Mobile — full-screen overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={`fixed inset-0 z-[60] flex flex-col bg-neutral-950 px-6 pb-12 pt-5 transition-[opacity,transform] duration-300 ease-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        {/* Top row */}
        <div className="flex items-center justify-between border-b border-neutral-800/50 pb-5">
          <Link
            href="/"
            className="flex items-baseline gap-0.5"
            onClick={() => setOpen(false)}
          >
            <span className="text-sm font-medium text-neutral-500">Sumber</span>
            <span className="text-sm font-bold text-white">Plastik</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 text-neutral-500 transition-colors hover:text-white"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links — large, numbered */}
        <nav className="mt-10 flex flex-col" aria-label="Menu mobile">
          {navItems.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 55 + 60}ms` : "0ms" }}
              className={`group flex items-baseline gap-3 border-b border-neutral-800/50 py-5 transition-[opacity,transform] duration-300 ease-out ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <span className="font-mono text-xs tabular-nums text-neutral-700 transition-colors duration-150 group-hover:text-orange-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-3xl font-bold tracking-tight text-white transition-colors duration-150 group-hover:text-orange-400">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div
          className={`mt-auto transition-[opacity,transform] duration-300 ease-out ${
            open ? "translate-y-0 opacity-100 delay-[280ms]" : "translate-y-3 opacity-0"
          }`}
        >
          <Link
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-800 py-4 text-sm font-semibold text-white transition-[border-color,background-color] duration-150 hover:border-orange-500/30 hover:bg-orange-500/5"
          >
            Hubungi Kami
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <p className="mt-4 text-center text-xs text-neutral-700">
            Sejak 2010 · Terpercaya
          </p>
        </div>
      </div>
    </>
  );
}
