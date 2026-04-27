"use client";

import { useEffect } from "react";

export default function ConsoleEasterEgg() {
  useEffect(() => {
    console.log(
      "%c Sumber Aneka Plastik dan Kemasan ",
      "background: #f97316; color: #fff; font-size: 18px; font-weight: bold; padding: 6px 14px; border-radius: 4px;"
    );
    console.log(
      "%c Dibangun dengan Next.js 14, TypeScript, Tailwind CSS, dan GSAP.",
      "color: #a3a3a3; font-size: 12px; padding: 2px 0;"
    );
    console.log(
      "%c Tertarik bergabung atau berkolaborasi? → sapkindonesia@gmail.com",
      "color: #f97316; font-size: 12px; padding: 2px 0;"
    );
  }, []);

  return null;
}
