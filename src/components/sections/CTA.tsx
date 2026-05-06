"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import Link from "next/link";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const differentiators = [
  "Respons dalam 1×24 jam kerja",
  <>Ecer dan grosir — <em>MOQ</em> fleksibel</>,
  "Jaminan pelayanan after sales 24/7",
  "Berdiri sejak 2010 dan berpengalaman",
  "Lebih dari 5.000 jenis produk kemasan",
  <><em>Food grade</em> &amp; halal, serta bersertifikat <em>ISO</em></>,
];

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });
  const targetRadius = useRef(0);
  const currentRadius = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const section = ref.current;
    const textReveal = textRevealRef.current;
    if (!section || !textReveal) return;

    const initMask = "radial-gradient(circle 0px at 50% 50%, black, transparent)";
    textReveal.style.maskImage = initMask;
    textReveal.style.setProperty("-webkit-mask-image", initMask);

    if (navigator.maxTouchPoints > 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Cache element position — updated on scroll/resize, never inside RAF
    let rectLeft = 0, rectTop = 0;
    let pLeft = 0, pTop = 0, pRight = 0, pBottom = 0;
    const updateRect = () => {
      const r = textReveal.getBoundingClientRect();
      rectLeft = r.left;
      rectTop  = r.top;
      const p = textReveal.querySelector('p');
      if (p) {
        const pr = p.getBoundingClientRect();
        pLeft = pr.left; pTop = pr.top; pRight = pr.right; pBottom = pr.bottom;
      }
      const sectionRect = section.getBoundingClientRect();
      if (sectionRect.bottom < 0 || sectionRect.top > window.innerHeight) {
        targetRadius.current = 0;
        currentRadius.current = 0;
      }
    };
    updateRect();
    window.addEventListener("scroll", updateRect, { passive: true });
    window.addEventListener("resize", updateRect, { passive: true });

    const tick = () => {
      lerped.current.x = lerp(lerped.current.x, mouse.current.x, 0.4);
      lerped.current.y = lerp(lerped.current.y, mouse.current.y, 0.4);
      currentRadius.current = lerp(currentRadius.current, targetRadius.current, 0.09);

      const r = Math.max(0, currentRadius.current);
      const mask = `radial-gradient(circle ${r}px at ${lerped.current.x - rectLeft}px ${lerped.current.y - rectTop}px, black 0%, transparent 60%)`;
      textReveal.style.maskImage = mask;
      textReveal.style.setProperty("-webkit-mask-image", mask);

      rafId.current = requestAnimationFrame(tick);
    };

    const isOverText = (clientX: number, clientY: number) => {
      const pad = 16;
      return clientX >= pLeft - pad && clientX <= pRight + pad && clientY >= pTop - pad && clientY <= pBottom + pad;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (isOverText(e.clientX, e.clientY)) {
        if (targetRadius.current === 0) {
          lerped.current.x = e.clientX;
          lerped.current.y = e.clientY;
        }
        targetRadius.current = 280;
      } else {
        targetRadius.current = 0;
      }
    };
    const onMouseEnter = (e: MouseEvent) => {
      updateRect();
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (isOverText(e.clientX, e.clientY)) {
        lerped.current.x = e.clientX;
        lerped.current.y = e.clientY;
        targetRadius.current = 280;
      }
    };
    const onMouseLeave = () => { targetRadius.current = 0; };

    rafId.current = requestAnimationFrame(tick);
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseenter", onMouseEnter);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useGSAP(
    () => {
      const trigger = { trigger: ref.current, start: "top 72%", once: true };

      gsap.from([".cta-label", ".cta-heading", ".cta-sub", ".cta-buttons"], {
        opacity: 0, y: 28, duration: 0.75, stagger: 0.1, ease: "expo.out",
        scrollTrigger: trigger,
      });

      gsap.from(".cta-diff-item", {
        opacity: 0, x: 14, duration: 0.55, stagger: 0.07, ease: "expo.out", delay: 0.25,
        scrollTrigger: trigger,
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-5 py-20 md:px-10 md:py-28"
    >
      {/* Glow blobs */}
      <div
        className="pointer-events-none absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.15), transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Ghost text — always faint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
      >
        <p
          className="font-black leading-none tracking-tighter text-white/[0.06]"
          style={{ fontSize: "clamp(4rem, 20vw, 22rem)" }}
        >
          M I T R A .
        </p>
      </div>

      {/* Ghost text revealed by cursor spotlight */}
      <div
        ref={textRevealRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden select-none items-center justify-center overflow-hidden md:flex"
      >
        <p
          className="font-black leading-none tracking-tighter text-white/40"
          style={{ fontSize: "clamp(4rem, 20vw, 22rem)" }}
        >
          M I T R A .
        </p>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[3fr_2fr] lg:gap-20">

          {/* Left: copy + CTA */}
          <div>
            <p className="cta-label mb-4 text-sm font-semibold uppercase tracking-widest text-blue-200">
              Mulai Sekarang
            </p>

            <h2
              id="cta-heading"
              className="cta-heading mb-6 font-black leading-[1.08] tracking-tight text-white"
              style={{ fontSize: "clamp(2.25rem, 5vw + 0.75rem, 4.5rem)" }}
            >
              Jadikan Kami Mitra{" "}
              <span className="text-blue-200">Kemasan Bisnis Anda.</span>
            </h2>

            <p className="cta-sub mb-10 max-w-lg text-lg leading-relaxed text-blue-100">
              Konsultasikan kebutuhan kemasan bisnis Anda sekarang. Tim kami siap
              memberikan penawaran terbaik dalam 1×24 jam kerja.
            </p>

            <div className="cta-buttons flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=Halo Sumber Aneka Plastik dan Kemasan, saya ingin konsultasi kebutuhan plastik dan kemasan untuk bisnis saya.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl bg-white px-7 py-4 text-base font-semibold text-blue-700 shadow-2xl shadow-blue-900/30 transition-[background-color,box-shadow,transform] duration-200 hover:bg-blue-50 hover:shadow-blue-900/40 active:scale-[0.97] sm:w-auto"
                style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
              >
                <span className="flex items-center justify-center gap-2">
                  <MessageCircle size={18} aria-hidden="true" />
                  <em>Chat via WhatsApp</em>
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
              <Link
                href="/product"
                className="rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-center text-base font-semibold text-white transition-[background-color,border-color,transform] duration-200 hover:border-white/40 hover:bg-white/20 active:scale-[0.97] sm:w-auto"
                style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
              >
                Lihat Katalog Produk
              </Link>
            </div>
          </div>

          {/* Right: editorial differentiators */}
          <div className="pt-10 lg:pl-12 lg:pt-0">
            <p className="mb-7 text-xs font-semibold uppercase tracking-widest text-blue-300">
              Mengapa Sumber Aneka Plastik
            </p>
            <ul className="space-y-5" role="list">
              {differentiators.map((item, i) => (
                <li key={i} className="cta-diff-item flex items-start gap-4">
                  <span
                    className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white"
                    aria-hidden="true"
                  >
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                  <span className="text-base leading-relaxed text-blue-100">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
