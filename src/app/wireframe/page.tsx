import type { Metadata } from "next";
import WireframePage from "./WireframePage";

export const metadata: Metadata = {
  title: "Wireframe Prototype — Sumber Plastik",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <WireframePage />;
}
