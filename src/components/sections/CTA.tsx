"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, MessageCircle, Users, Award, Package, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CONTACT } from "@/constants";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const trustStats: { value: number; suffix: string; label: string; icon: LucideIcon }[] = [
  { value: 5000, suffix: "+", label: "Client Aktif",     icon: Users   },
  { value: 16,   suffix: "+", label: "Tahun Pengalaman", icon: Award   },
  { value: 1000, suffix: "+", label: "Jenis Produk",     icon: Package },
  { value: 99,  suffix: "%", label: "Tingkat Kepuasan", icon: Star    },
];

export default function CTA() {
  const ref = useRef<HTMLElement>(null);
  const textRevealRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const mouse = useRef({ x: 0, y: 0 });
  const lerped = useRef({ x: 0, y: 0 });
  const targetRadius = useRef(0);
  const currentRadius = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const section = ref.current;
    const textReveal = textRevealRef.current;
    if (!section || !textReveal) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const initMask = "radial-gradient(circle 0px at 50% 50%, black, transparent)";
    textReveal.style.maskImage = initMask;
    textReveal.style.setProperty("-webkit-mask-image", initMask);

    const tick = () => {
      lerped.current.x = lerp(lerped.current.x, mouse.current.x, 0.4);
      lerped.current.y = lerp(lerped.current.y, mouse.current.y, 0.4);
      currentRadius.current = lerp(currentRadius.current, targetRadius.current, 0.09);

      const r = Math.max(0, currentRadius.current);
      const textRect = textReveal.getBoundingClientRect();
      const tx = lerped.current.x - textRect.left;
      const ty = lerped.current.y - textRect.top;
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
        targetRadius.current = 280;
      }
    };
    const onMouseEnter = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      lerped.current.x = e.clientX;
      lerped.current.y = e.clientY;
      targetRadius.current = 280;
    };
    const onMouseLeave = () => { targetRadius.current = 0; };

    rafId.current = requestAnimationFrame(tick);
    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseenter", onMouseEnter);
    section.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
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

      gsap.from(".cta-trust-card", {
        opacity: 0, y: 24, duration: 0.6, stagger: 0.08, ease: "expo.out", delay: 0.3,
        scrollTrigger: trigger,
      });

      trustStats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          delay: 0.5 + i * 0.08,
          onUpdate() { el.textContent = Math.round(obj.val) + stat.suffix; },
          scrollTrigger: trigger,
        });
      });
    },
    { scope: ref }
  );

  numberRefs.current = [];

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative overflow-hidden rounded-t-[2rem] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 px-5 py-20 md:px-10 md:py-28"
    >
      {/* Top separator line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)" }}
        aria-hidden="true"
      />

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
              Siap Bermitra dengan{" "}
              <span className="text-blue-200">Sumber Aneka Plastik dan Kemasan?</span>
            </h2>

            <p className="cta-sub mb-10 max-w-lg text-lg leading-relaxed text-blue-100">
              Konsultasikan kebutuhan plastik bisnis Anda sekarang. Tim kami siap
              memberikan penawaran terbaik dalam 1×24 jam kerja.
            </p>

            <div className="cta-buttons flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=Halo Sumber Aneka Plastik dan Kemasan, saya ingin konsultasi kebutuhan plastik dan kemasan untuk bisnis saya.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-xl bg-white px-7 py-4 text-base font-semibold text-blue-700 shadow-2xl shadow-blue-900/30 transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-blue-50 hover:shadow-blue-900/40 active:scale-[0.97] sm:w-auto"
              >
                <span
                  className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-blue-100/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden="true"
                />
                <span className="relative flex items-center justify-center gap-2">
                  <MessageCircle size={18} aria-hidden="true" />
                  Chat via WhatsApp
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="rounded-xl border border-white/25 bg-white/10 px-7 py-4 text-center text-base font-semibold text-white backdrop-blur-sm transition-[background-color,border-color,transform] duration-200 ease-out hover:border-white/40 hover:bg-white/20 active:scale-[0.97] sm:w-auto"
              >
                Kirim Email
              </a>
            </div>
          </div>

          {/* Right: trust stat cards 2×2 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {trustStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="cta-trust-card rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition-[border-color,background-color] duration-200 hover:border-white/25 hover:bg-white/15 sm:p-5"
                >
                  <div
                    className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white"
                    aria-hidden="true"
                  >
                    <Icon size={15} />
                  </div>
                  <span
                    ref={(el) => { numberRefs.current[i] = el; }}
                    className="mb-1 block text-2xl font-black text-white sm:text-3xl"
                    aria-label={`${stat.value}${stat.suffix}`}
                  >
                    0{stat.suffix}
                  </span>
                  <p className="text-xs leading-snug text-blue-200">{stat.label}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
