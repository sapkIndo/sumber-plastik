export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: "-50%",
        width: "200%",
        height: "200%",
        zIndex: 9999,
        opacity: 0.22,
        pointerEvents: "none",
        mixBlendMode: "multiply",
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E\")",
        animation: "grain 0.5s steps(1) infinite",
      }}
    />
  );
}
