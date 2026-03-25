const TICK_ANGLES = Array.from(
  { length: 24 },
  (_, i) => (i / 24) * Math.PI * 2,
);
const DOT_ANGLES = Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2);
const RADIAL_ANGLES = Array.from(
  { length: 6 },
  (_, i) => (i / 6) * Math.PI * 2,
);

export default function HudGraphic() {
  return (
    <div
      className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center select-none"
      aria-hidden="true"
    >
      {/* Outer rotating ring */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: "1.5px dashed oklch(0.76 0.16 74 / 0.3)",
          animation: "ring-spin-slow 16s linear infinite",
        }}
      />
      {/* Tick marks on outer ring */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 384 384"
        style={{ animation: "ring-spin-slow 16s linear infinite" }}
      >
        {TICK_ANGLES.map((angle) => {
          const r1 = 188;
          const r2 = 180;
          const cx = 192;
          const cy = 192;
          return (
            <line
              key={`tick-${angle.toFixed(4)}`}
              x1={cx + Math.cos(angle) * r1}
              y1={cy + Math.sin(angle) * r1}
              x2={cx + Math.cos(angle) * r2}
              y2={cy + Math.sin(angle) * r2}
              stroke="oklch(0.76 0.16 74 / 0.6)"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      {/* Mid ring counter-rotating */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "32px",
          border: "1px solid oklch(0.76 0.16 74 / 0.25)",
          animation: "ring-spin-rev 10s linear infinite",
        }}
      />
      <svg
        aria-hidden="true"
        className="absolute"
        style={{
          inset: "32px",
          width: "calc(100% - 64px)",
          height: "calc(100% - 64px)",
          animation: "ring-spin-rev 10s linear infinite",
        }}
        viewBox="0 0 320 320"
      >
        {DOT_ANGLES.map((angle) => {
          const cx = 160;
          const cy = 160;
          const r = 156;
          return (
            <circle
              key={`dot-${angle.toFixed(4)}`}
              cx={cx + Math.cos(angle) * r}
              cy={cy + Math.sin(angle) * r}
              r="3"
              fill="oklch(0.76 0.16 74 / 0.8)"
            />
          );
        })}
      </svg>

      {/* Inner ring */}
      <div
        className="absolute rounded-full"
        style={{
          inset: "72px",
          border: "1.5px solid oklch(0.76 0.16 74 / 0.4)",
          animation: "ring-spin-slow 6s linear infinite",
          boxShadow: "0 0 20px oklch(0.76 0.16 74 / 0.15) inset",
        }}
      />

      {/* Radial lines */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 384 384"
      >
        {RADIAL_ANGLES.map((angle) => {
          const cx = 192;
          const cy = 192;
          return (
            <line
              key={`radial-${angle.toFixed(4)}`}
              x1={cx}
              y1={cy}
              x2={cx + Math.cos(angle) * 110}
              y2={cy + Math.sin(angle) * 110}
              stroke="oklch(0.76 0.16 74 / 0.15)"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Center pulsing dot */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center z-10"
        style={{
          background:
            "radial-gradient(circle, oklch(0.76 0.16 74 / 0.3) 0%, oklch(0.76 0.16 74 / 0.05) 70%)",
          border: "1.5px solid oklch(0.76 0.16 74 / 0.6)",
          animation: "pulse-amber 2s ease-in-out infinite",
          boxShadow: "0 0 32px oklch(0.76 0.16 74 / 0.4)",
        }}
      >
        <span
          className="text-xs font-mono font-bold"
          style={{ color: "oklch(0.76 0.16 74)" }}
        >
          RPA
        </span>
      </div>

      {/* Labels around the ring */}
      {[
        { label: "UiPath", angle: -0.4, r: 150 },
        { label: "AI Agent", angle: 1.2, r: 148 },
        { label: "RPA Core", angle: 2.7, r: 145 },
      ].map(({ label, angle, r }) => {
        const cx = 192;
        const cy = 192;
        return (
          <div
            key={label}
            className="absolute text-xs font-body font-semibold pointer-events-none"
            style={{
              color: "oklch(0.76 0.16 74 / 0.7)",
              left: `${cx + Math.cos(angle) * r - 20}px`,
              top: `${cy + Math.sin(angle) * r - 8}px`,
              letterSpacing: "0.05em",
            }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
