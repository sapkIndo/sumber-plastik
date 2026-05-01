"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE_NAME, CONTACT } from "@/constants";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = NAV_LINKS.filter((l) => l.href !== "/");

export default function Navbar() {
  const openRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Scroll-based hide/show — passive event + single RAF per scroll event
  useEffect(() => {
    let prevY = window.scrollY;
    let rafId: number;
    let ticking = false;

    const onScroll = () => {
      if (ticking || openRef.current) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - prevY;
        if (Math.abs(delta) >= 2) {
          prevY = y;
          setScrolled(y >= 60);
          setHidden(y >= 60 && delta > 0);
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    if (open) setHidden(false);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        role="banner"
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled
            ? "border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-700/80 dark:bg-slate-900/90"
            : "border-slate-200/30 bg-white/50 backdrop-blur-sm dark:border-slate-700/30 dark:bg-slate-900/50"
        }`}
      >
        <nav
          aria-label="Navigasi utama"
          className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${SITE_NAME} - Beranda`}
            className="transition-opacity duration-150 hover:opacity-70"
          >
            <Image
              src="/logo/logo-horizontal.png"
              alt={SITE_NAME}
              width={130}
              height={44}
              className="object-contain dark:brightness-0 dark:invert"
              style={{ height: "auto" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-7 md:flex" role="list">
            {navItems.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-baseline gap-1.5 text-sm text-slate-600 transition-colors duration-150 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                >
                  <span className="font-mono text-[10px] tabular-nums text-slate-400 transition-colors duration-150 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-400" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right: toggle + CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1 text-sm font-medium text-slate-600 transition-[color,transform] duration-150 hover:text-slate-900 active:scale-[0.97] dark:text-slate-400 dark:hover:text-slate-50"
            >
              Hubungi Kami
              <ArrowUpRight
                size={13}
                className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-500 transition-[color,transform] duration-150 hover:text-slate-900 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:text-slate-50 dark:focus-visible:ring-offset-slate-950"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Buka menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={`fixed inset-0 z-[60] flex flex-col bg-white px-6 pb-12 pt-5 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] dark:bg-slate-950 md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-6 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-5 dark:border-slate-800">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/logo/logo-horizontal.png"
              alt={SITE_NAME}
              width={130}
              height={44}
              className="object-contain dark:brightness-0 dark:invert"
              style={{ height: "auto" }}
            />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-slate-500 transition-[color,transform] duration-150 hover:text-slate-900 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-slate-400 dark:hover:text-slate-50 dark:focus-visible:ring-offset-slate-950"
            aria-label="Tutup menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="mt-10 flex flex-col" aria-label="Menu mobile">
          {navItems.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${i * 55 + 60}ms` : "0ms" }}
              className={`group flex items-baseline gap-3 border-b border-slate-100 py-5 transition-[opacity,transform] duration-300 ease-out dark:border-slate-800 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              <span className="font-mono text-xs tabular-nums text-slate-400 transition-colors duration-150 group-hover:text-blue-600 dark:text-slate-600 dark:group-hover:text-blue-400" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-3xl font-bold tracking-tight text-slate-900 transition-colors duration-150 group-hover:text-blue-600 dark:text-slate-50 dark:group-hover:text-blue-400">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

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
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-4 text-sm font-semibold text-slate-700 transition-[border-color,background-color,transform] duration-150 hover:border-blue-300 hover:bg-blue-50 active:scale-[0.97] dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/40"
          >
            Hubungi Kami
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-500" aria-hidden="true">Sejak 2010 · Terpercaya</p>
        </div>
      </div>
    </>
  );
}
