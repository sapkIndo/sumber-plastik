"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP, SplitText);

const categories = [
  "Plastik PP", "Plastik PET", "Plastik HDPE",
  "Plastik PVC", "LLDPE", "PS / Styrofoam", "Paper Packaging",
];

const marqueeItems = [...categories, ...categories, ...categories, ...categories];

export default function HeroB() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });
  const targetRadius = useRef(0);
  const currentRadius = useRef(0);
  const rafId = useRef<number>(0);

  useGSAP(
    () => {
      const split = new SplitText(titleRef.current!, { type: "words" });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-overline", { opacity: 0, y: -12, duration: 0.5 })
        .from(".hero-year",     { opacity: 0, y: -12, duration: 0.5 }, "<")
        .from(split.words,      { opacity: 0, y: 50,  duration: 0.9, stagger: 0.055 }, "-=0.2")
        .from(".hero-rule",     { scaleX: 0, duration: 0.7, transformOrigin: "left center" }, "-=0.5")
        .from(".hero-sub",      { opacity: 0, y: 16,  duration: 0.6 }, "-=0.4")
        .from(".hero-cta",      { opacity: 0, y: 16,  duration: 0.5 }, "-=0.4")
        .from(".hero-strip",    { opacity: 0,          duration: 0.5 }, "-=0.3");
      return () => split.revert();
    },
    { scope: heroRef }
  );

  useGSAP(
    () => {
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
    },
    { scope: heroRef }
  );

  useEffect(() => {
    const hero = heroRef.current;
    const textReveal = textRevealRef.current;
    if (!hero || !textReveal) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const initMask = "radial-gradient(circle 0px at 50% 50%, black, transparent)";
    textReveal.style.maskImage = initMask;
    textReveal.style.setProperty("-webkit-mask-image", initMask);

    const tick = () => {
      lerped.current.x = lerp(lerped.current.x, mouse.current.x, 0.4);
      lerped.current.y = lerp(lerped.current.y, mouse.current.y, 0.4);
      currentRadius.current = lerp(currentRadius.current, targetRadius.current, 0.09);

      const { x, y } = lerped.current;
      const r = Math.max(0, currentRadius.current);

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
      if (targetRadius.current === 0) {
        lerped.current.x = e.clientX;
        lerped.current.y = e.clientY;
        targetRadius.current = 260;
      }
    };

    const onMouseEnter = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      lerped.current.x = e.clientX;
      lerped.current.y = e.clientY;
      targetRadius.current = 260;
    };

    const onMouseLeave = () => { targetRadius.current = 0; };

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
    <section
      ref={heroRef}
      aria-label="Hero — Pengenalan Sumber Aneka Plastik dan Kemasan"
      className="relative flex min-h-svh flex-col overflow-hidden px-6 pt-24 md:pt-28 md:px-12 lg:px-16"
    >
      <div className="relative z-10 flex flex-col gap-8">

        {/* Overline + year */}
        <div className="flex items-center justify-between">
          <div className="hero-overline flex items-center gap-3">
            <span className="h-px w-8 bg-blue-600" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Distributor Resmi &amp; Terpercaya
            </span>
          </div>
          <span className="hero-year text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
            Est. 2010
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="hero-title will-change-transform text-4xl font-black leading-[0.9] tracking-tighter text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl lg:text-8xl"
        >
          Solusi Plastik
          <br className="hidden sm:block" />
          <span className="text-blue-600">Berkualitas Tinggi</span>
          <br className="hidden sm:block" />
          <span className="font-bold text-slate-400 dark:text-slate-500">untuk Industri Anda.</span>
        </h1>

        {/* Rule + Subtitle + CTAs */}
        <div>
          <div className="hero-rule mb-8 h-px w-full bg-slate-200 dark:bg-slate-700" />
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="hero-sub max-w-sm text-base leading-relaxed text-slate-600 dark:text-slate-400">
              Sumber Aneka Plastik dan Kemasan menyediakan 1.000+ produk plastik dan kemasan untuk kebutuhan usaha dari skala kecil hingga besar. Pengiriman cepat ke seluruh Indonesia.
            </p>
            <div className="hero-cta flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
              <button
                onClick={handleWhatsApp}
                className="group relative w-full overflow-hidden rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-blue-500 hover:shadow-blue-500/25 active:scale-[0.97] sm:w-auto sm:py-3.5"
              >
                <span
                  className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden="true"
                />
                <span className="relative flex items-center justify-center gap-2">
                  Hubungi Kami Sekarang
                  <ArrowRight size={15} className="transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </button>
              <a
                href="#produk"
                className="flex items-center justify-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors duration-150 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 sm:rounded-xl sm:border sm:border-slate-300 sm:px-7 sm:py-3.5 sm:hover:border-slate-400 dark:sm:border-slate-700 dark:sm:hover:border-slate-500"
              >
                Lihat Produk
                <ArrowRight size={13} className="text-slate-400 sm:hidden" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Ghost text with spotlight reveal */}
      <div
        aria-hidden="true"
        className="relative flex flex-1 select-none items-center justify-center overflow-hidden"
      >
        <p
          className="text-center font-black leading-none tracking-tighter text-slate-200 dark:text-slate-800"
          style={{ fontSize: "clamp(3rem, 16vw, 18rem)" }}
        >
          Q U A L I T Y .
        </p>
        <div
          ref={textRevealRef}
          className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex"
        >
          <p
            className="text-center font-black leading-none tracking-tighter text-slate-900 dark:text-slate-100"
            style={{ fontSize: "clamp(3rem, 16vw, 18rem)" }}
          >
            Q U A L I T Y .
          </p>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="hero-strip pb-12 pt-8">
        <div className="h-px w-full bg-slate-200 dark:bg-slate-700" />
        <div className="overflow-hidden py-3.5">
          <div className="flex animate-marquee gap-10 whitespace-nowrap" aria-hidden="true">
            {marqueeItems.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-blue-600/40" />
              </span>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-slate-200 dark:bg-slate-700" />
      </div>

    </section>
  );
}
