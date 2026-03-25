import { useEffect, useRef, useState } from "react";

export default function IsometricDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full flex flex-col items-center py-2">
      <p
        className="text-xs font-bold uppercase tracking-widest mb-4 text-center"
        style={{ color: "#1E40AF" }}
      >
        🏗️ Automation Stack — 3 Layers
      </p>

      {/* Flat SVG isometric-style diagram */}
      <svg
        viewBox="0 0 460 220"
        className="w-full"
        style={{ maxWidth: 460 }}
        role="img"
        aria-label="3-layer automation stack: Legacy Systems, UiPath RPA and Agentic AI, Automated Output"
      >
        {/* Layer 1 — Bottom: Legacy Systems (widest) */}
        <rect
          x="10"
          y="140"
          width="440"
          height="64"
          rx="12"
          fill="rgba(239,246,255,0.97)"
          stroke="#BFDBFE"
          strokeWidth="1.5"
        />
        {visible && (
          <rect
            x="10"
            y="140"
            width="440"
            height="64"
            rx="12"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="1"
            style={{ animation: "iso-pulse-blue 3s ease-in-out infinite" }}
          />
        )}
        <text
          x="30"
          y="168"
          fontSize="11"
          fontWeight="800"
          fill="#1E40AF"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          Legacy Systems
        </text>
        <text
          x="30"
          y="185"
          fontSize="10"
          fill="#64748B"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          Manual Work
        </text>
        <text x="380" y="168" fontSize="18" textAnchor="middle">
          📋
        </text>
        <text x="415" y="168" fontSize="18" textAnchor="middle">
          🖥️
        </text>
        <text x="380" y="192" fontSize="18" textAnchor="middle">
          📂
        </text>
        <text x="415" y="192" fontSize="18" textAnchor="middle">
          ✍️
        </text>

        {/* Connector arrows */}
        <line
          x1="230"
          y1="140"
          x2="230"
          y2="120"
          stroke="#A78BFA"
          strokeWidth="2"
          markerEnd="url(#arrow-up)"
          strokeDasharray="4 3"
        />

        {/* Layer 2 — Middle: RPA + AI */}
        <rect
          x="30"
          y="52"
          width="400"
          height="64"
          rx="12"
          fill="rgba(237,233,254,0.97)"
          stroke="#C4B5FD"
          strokeWidth="1.5"
        />
        {visible && (
          <rect
            x="30"
            y="52"
            width="400"
            height="64"
            rx="12"
            fill="none"
            stroke="#A78BFA"
            strokeWidth="1"
            style={{
              animation: "iso-pulse-purple 3s ease-in-out infinite 0.5s",
            }}
          />
        )}
        {/* UiPath node */}
        <rect
          x="70"
          y="65"
          width="110"
          height="38"
          rx="8"
          fill="rgba(30,64,175,0.1)"
          stroke="rgba(30,64,175,0.3)"
          strokeWidth="1"
        />
        <text
          x="125"
          y="82"
          fontSize="10"
          fontWeight="700"
          fill="#1E40AF"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          🤖 UiPath RPA
        </text>
        <text
          x="125"
          y="96"
          fontSize="9"
          fill="#3B82F6"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          Bot Engine
        </text>
        {/* Animated dot */}
        {visible && (
          <circle r="4" fill="#A78BFA">
            <animateMotion
              dur="2s"
              repeatCount="indefinite"
              path="M180,84 L280,84"
            />
          </circle>
        )}
        {/* Agentic AI node */}
        <rect
          x="280"
          y="65"
          width="120"
          height="38"
          rx="8"
          fill="rgba(124,58,237,0.1)"
          stroke="rgba(124,58,237,0.3)"
          strokeWidth="1"
        />
        <text
          x="340"
          y="82"
          fontSize="10"
          fontWeight="700"
          fill="#7C3AED"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          🧠 Agentic AI
        </text>
        <text
          x="340"
          y="96"
          fontSize="9"
          fill="#8B5CF6"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          Decision Layer
        </text>
        <text
          x="230"
          y="108"
          fontSize="9"
          fontWeight="700"
          fill="#7C3AED"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          Automation Engine
        </text>

        {/* Connector arrow */}
        <line
          x1="230"
          y1="52"
          x2="230"
          y2="32"
          stroke="#86EFAC"
          strokeWidth="2"
          strokeDasharray="4 3"
        />

        {/* Layer 3 — Top: Automated Output */}
        <rect
          x="60"
          y="2"
          width="340"
          height="48"
          rx="12"
          fill="rgba(240,253,244,0.97)"
          stroke="#86EFAC"
          strokeWidth="1.5"
        />
        {visible && (
          <rect
            x="60"
            y="2"
            width="340"
            height="48"
            rx="12"
            fill="none"
            stroke="#4ADE80"
            strokeWidth="1"
            style={{ animation: "iso-pulse-green 3s ease-in-out infinite 1s" }}
          />
        )}
        <text
          x="230"
          y="22"
          fontSize="11"
          fontWeight="800"
          fill="#059669"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          ✅ Automated Output
        </text>
        <text
          x="230"
          y="38"
          fontSize="10"
          fill="#64748B"
          textAnchor="middle"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          Zero manual effort — reports, syncs, notifications
        </text>

        <defs>
          <marker
            id="arrow-up"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path
              d="M0,8 L4,0 L8,8"
              fill="none"
              stroke="#A78BFA"
              strokeWidth="1.5"
            />
          </marker>
        </defs>
      </svg>

      {/* Layer legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {[
          { label: "Legacy / Manual", color: "#1E40AF", bg: "#EFF6FF" },
          { label: "UiPath RPA + Agentic AI", color: "#7C3AED", bg: "#F5F3FF" },
          { label: "Automated Output", color: "#059669", bg: "#F0FFF4" },
        ].map((item) => (
          <span
            key={item.label}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: item.bg,
              color: item.color,
              border: `1px solid ${item.color}30`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: item.color }}
            />
            {item.label}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes iso-pulse-blue {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes iso-pulse-purple {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        @keyframes iso-pulse-green {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
