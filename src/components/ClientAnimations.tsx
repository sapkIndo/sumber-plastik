"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

const ConsoleEasterEgg = dynamic(() => import("@/components/ConsoleEasterEgg"), { ssr: false });
const InteractiveBg = dynamic(() => import("@/components/InteractiveBg"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const GSAPSmoothScroll = dynamic(() => import("@/components/GSAPSmoothScroll"), { ssr: false });

export default function ClientAnimations() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <ConsoleEasterEgg />
      <InteractiveBg />
      <CustomCursor />
      <GSAPSmoothScroll />
    </>
  );
}
