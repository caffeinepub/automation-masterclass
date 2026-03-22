import { useEffect, useRef, useState } from "react";

const ORBIT_NODES = [
  { id: "uipath", label: "UiPath", emoji: "🤖", color: "#1E40AF", angle: 270 },
  { id: "n8n", label: "N8N", emoji: "⚡", color: "#F59E0B", angle: 30 },
  { id: "ai", label: "Agentic AI", emoji: "🧠", color: "#7C3AED", angle: 150 },
];

const ORBIT_R = 110;
const ROTATION_SPEED = 18;
const CENTER_X = 200;
const CENTER_Y = 200;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

export default function TechOrbit() {
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (containerRef.current) obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      setRotation((elapsed / ROTATION_SPEED) * 360);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  useEffect(() => {
    let frame: number;
    const tick = (ts: number) => {
      setPulse(1 + Math.sin(ts / 900) * 0.04);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        style={{ maxWidth: 380, maxHeight: 380 }}
        role="img"
        aria-label="Technology orbit: UiPath, N8N, Agentic AI orbiting an Automation Engine hub"
      >
        {/* Orbit ring */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={ORBIT_R}
          fill="none"
          stroke="#DBEAFE"
          strokeWidth={1.5}
          strokeDasharray="6 4"
        />

        {/* Orbit connection lines */}
        {ORBIT_NODES.map((node, i) => {
          const angle = degToRad(node.angle + rotation);
          const nx = CENTER_X + ORBIT_R * Math.cos(angle);
          const ny = CENTER_Y + ORBIT_R * Math.sin(angle);
          return (
            <line
              key={node.id}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={nx}
              y2={ny}
              stroke={node.color}
              strokeWidth={1.5}
              opacity={0.4 + 0.3 * Math.sin(Date.now() / 600 + i * 2)}
              strokeDasharray="4 3"
            />
          );
        })}

        {/* Center hub */}
        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={56 * pulse}
          fill="url(#hubGrad)"
          stroke="#1E40AF"
          strokeWidth={2}
        />
        <text
          x={CENTER_X}
          y={CENTER_Y - 8}
          textAnchor="middle"
          fontSize={12}
          fontWeight="700"
          fill="white"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          Automation
        </text>
        <text
          x={CENTER_X}
          y={CENTER_Y + 9}
          textAnchor="middle"
          fontSize={12}
          fontWeight="700"
          fill="white"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          Engine
        </text>
        <text
          x={CENTER_X}
          y={CENTER_Y + 25}
          textAnchor="middle"
          fontSize={16}
          fill="white"
        >
          ⚙️
        </text>

        {/* Orbiting nodes */}
        {ORBIT_NODES.map((node) => {
          const angle = degToRad(node.angle + rotation);
          const nx = CENTER_X + ORBIT_R * Math.cos(angle);
          const ny = CENTER_Y + ORBIT_R * Math.sin(angle);
          return (
            <g key={node.id}>
              <circle
                cx={nx}
                cy={ny}
                r={36}
                fill="white"
                stroke={node.color}
                strokeWidth={2}
                style={{ filter: `drop-shadow(0 2px 8px ${node.color}40)` }}
              />
              <text x={nx} y={ny - 6} textAnchor="middle" fontSize={18}>
                {node.emoji}
              </text>
              <text
                x={nx}
                y={ny + 14}
                textAnchor="middle"
                fontSize={10}
                fontWeight="700"
                fill={node.color}
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <defs>
          <radialGradient id="hubGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </radialGradient>
        </defs>
      </svg>

      <div className="flex flex-wrap justify-center gap-4">
        {ORBIT_NODES.map((node) => (
          <span
            key={node.id}
            className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: `${node.color}14`,
              color: node.color,
              border: `1px solid ${node.color}40`,
            }}
          >
            {node.emoji} {node.label}
          </span>
        ))}
      </div>
    </div>
  );
}
