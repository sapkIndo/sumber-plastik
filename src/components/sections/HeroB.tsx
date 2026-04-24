"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP);

const categories = [
  "Plastik PP", "Plastik PE", "Plastik PVC",
  "Plastik ABS", "Plastik Nylon", "Polycarbonate",
];

const marqueeItems = [...categories, ...categories, ...categories, ...categories];

export default function HeroB() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });
  const targetRadius = useRef(0);
  const currentRadius = useRef(0);
  const rafId = useRef<number>(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-overline", { opacity: 0, y: -12, duration: 0.5 })
        .from(".hero-year",     { opacity: 0, y: -12, duration: 0.5 }, "<")
        .from(".hero-title",    { opacity: 0, y: 70,  duration: 1.1 }, "-=0.2")
        .from(".hero-rule",     { scaleX: 0, duration: 0.7, transformOrigin: "left center" }, "-=0.3")
        .from(".hero-sub",      { opacity: 0, y: 16,  duration: 0.6 }, "-=0.4")
        .from(".hero-cta",      { opacity: 0, y: 16,  duration: 0.5 }, "-=0.4")
        .from(".hero-strip",    { opacity: 0,          duration: 0.5 }, "-=0.3");
    },
    { scope: heroRef }
  );

  // Magnetic cursor on headline
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" });
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((e.clientX - rect.left - rect.width / 2) * 0.05);
      yTo((e.clientY - rect.top - rect.height / 2) * 0.04);
    };
    const onLeave = () => { xTo(0); yTo(0); };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Spotlight reveal — lerped radius grows on enter, shrinks on leave
  useEffect(() => {
    const hero = heroRef.current;
    const cursor = cursorRef.current;
    const textReveal = textRevealRef.current;
    if (!hero || !cursor || !textReveal) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Initialize white layer mask to hidden
    const initMask = "radial-gradient(circle 0px at 50% 50%, black, transparent)";
    textReveal.style.maskImage = initMask;
    textReveal.style.setProperty("-webkit-mask-image", initMask);

    const tick = () => {
      lerped.current.x = lerp(lerped.current.x, mouse.current.x, 0.4);
      lerped.current.y = lerp(lerped.current.y, mouse.current.y, 0.4);
      currentRadius.current = lerp(currentRadius.current, targetRadius.current, 0.09);

      const { x, y } = lerped.current;
      const r = Math.max(0, currentRadius.current);

      // Cursor dot — fades in with radius
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      cursor.style.opacity = String(Math.min(1, r / 25));

      // White text reveal mask (text-element-relative coords)
      const textRect = textReveal.getBoundingClientRect();
      const tx = x - textRect.left;
      const ty = y - textRect.top;
      const mask = `radial-gradient(circle ${r}px at ${tx}px ${ty}px, black 0%, transparent 60%)`;
      textReveal.style.maskImage = mask;
      textReveal.style.setProperty("-webkit-mask-image", mask);

      rafId.current = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onMouseEnter = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      lerped.current.x = e.clientX;
      lerped.current.y = e.clientY;
      targetRadius.current = 260;
    };

    const onMouseLeave = () => {
      targetRadius.current = 0;
    };

    rafId.current = requestAnimationFrame(tick);
    hero.addEventListener("mousemove", onMouseMove);
    hero.addEventListener("mouseenter", onMouseEnter);
    hero.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      hero.removeEventListener("mousemove", onMouseMove);
      hero.removeEventListener("mouseenter", onMouseEnter);
      hero.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const handleWhatsApp = () => {
    toast.success("Mengarahkan ke WhatsApp...");
    window.open(`https://wa.me/${CONTACT.whatsapp}`, "_blank");
  };

  return (
    <>
      {/* Custom cursor dot — fixed, outside section clip */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[200] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ left: "-200px", top: "-200px", opacity: 0 }}
        aria-hidden="true"
      >
        <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_12px_4px_rgba(255,255,255,0.4)]" />
      </div>

      <section
        ref={heroRef}
        aria-label="Hero — Pengenalan Sumber Plastik"
        className="relative flex min-h-svh flex-col overflow-hidden px-6 pt-24 md:cursor-none md:pt-28 md:[&_*]:cursor-none md:px-12 lg:px-16"
      >
        {/* ── Content — anchored to top, no void ── */}
        <div className="relative z-10 flex flex-col gap-8">

          {/* Overline + year */}
          <div className="flex items-center justify-between">
            <div className="hero-overline flex items-center gap-3">
              <span className="h-px w-8 bg-orange-500" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                Distributor Resmi &amp; Terpercaya
              </span>
            </div>
            <span className="hero-year text-xs font-semibold uppercase tracking-[0.2em] text-neutral-700">
              Est. 2010
            </span>
          </div>

          {/* Headline — 3 lines, magnetic */}
          <h1
            ref={titleRef}
            className="hero-title will-change-transform text-4xl font-black leading-[0.9] tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-8xl"
          >
            Solusi Plastik
            <br className="hidden sm:block" />
            <span className="text-orange-400">Berkualitas Tinggi</span>
            <br className="hidden sm:block" />
            <span className="font-bold text-neutral-500">untuk Industri Anda.</span>
          </h1>

          {/* Rule + Subtitle + CTAs */}
          <div>
            <div className="hero-rule mb-8 h-px w-full bg-neutral-800" />
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="hero-sub max-w-sm text-base leading-relaxed text-neutral-400">
                Sumber Plastik menyediakan produk plastik premium untuk kebutuhan industri dan
                rumah tangga. Pengiriman cepat ke seluruh Indonesia dengan jaminan kualitas terbaik.
              </p>
              <div className="hero-cta flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={handleWhatsApp}
                  className="group relative overflow-hidden rounded-xl bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-orange-500/25 transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-orange-400 hover:shadow-orange-400/40 active:scale-[0.97]"
                >
                  <span
                    className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    aria-hidden="true"
                  />
                  <span className="relative flex items-center gap-2">
                    Hubungi Kami Sekarang
                    <ArrowRight size={15} className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </button>
                <a
                  href="#produk"
                  className="rounded-xl border border-neutral-700 px-7 py-3.5 text-center text-sm font-semibold text-neutral-400 transition-[border-color,color,transform] duration-150 ease-out hover:border-neutral-500 hover:text-white active:scale-[0.97]"
                >
                  Lihat Produk
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile spacer — fills void on small screens where ghost text is hidden */}
        <div className="flex-1 md:hidden" aria-hidden="true" />

        {/* Ghost text — flex-1 fills the space between content and marquee */}
        <div
          aria-hidden="true"
          className="relative hidden flex-1 select-none items-center justify-center overflow-hidden md:flex"
        >
          {/* Dark base — always faintly visible */}
          <p
            className="text-center font-black leading-none tracking-tighter text-neutral-800"
            style={{ fontSize: "clamp(4rem, 15vw, 18rem)" }}
          >
            Q U A L I T Y .
          </p>
          {/* White reveal — masked to cursor */}
          <div
            ref={textRevealRef}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <p
              className="text-center font-black leading-none tracking-tighter text-white"
              style={{ fontSize: "clamp(4rem, 15vw, 18rem)" }}
            >
              Q U A L I T Y .
            </p>
          </div>
        </div>

        {/* Marquee — sits naturally after flex-1 ghost area */}
        <div className="hero-strip pb-12 pt-8">
          <div className="h-px w-full bg-neutral-800" />
          <div className="overflow-hidden py-3.5">
            <div className="flex animate-marquee gap-10 whitespace-nowrap" aria-hidden="true">
              {marqueeItems.map((item, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-orange-500/40" />
                </span>
              ))}
            </div>
          </div>
          <div className="h-px w-full bg-neutral-800" />
        </div>

      </section>
    </>
  );
}
