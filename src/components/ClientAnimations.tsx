"use client";

import dynamic from "next/dynamic";

const ConsoleEasterEgg = dynamic(() => import("@/components/ConsoleEasterEgg"), { ssr: false });
const InteractiveBg = dynamic(() => import("@/components/InteractiveBg"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const GSAPSmoothScroll = dynamic(() => import("@/components/GSAPSmoothScroll"), { ssr: false });

export default function ClientAnimations() {
  return (
    <>
      <ConsoleEasterEgg />
      <InteractiveBg />
      <CustomCursor />
      <GSAPSmoothScroll />
    </>
  );
}
