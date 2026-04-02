import { useEffect, useRef, useState } from "react";

const NODES = [
  { id: "invoice", label: "📄 Invoice", x: 20, y: 80 },
  { id: "bot", label: "🤖 Bot", x: 155, y: 80 },
  { id: "erp", label: "🏢 ERP", x: 290, y: 80 },
  { id: "report", label: "📊 Report", x: 425, y: 80 },
  { id: "done", label: "✓ Done", x: 560, y: 80 },
];

const EDGES = [
  { from: 0, to: 1 },
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
];

const NODE_W = 110;
const NODE_H = 46;
const CYCLE = 3200;
const VIEWBOX_W = 690;
const VIEWBOX_H = 200;

export default function HeroPipeline() {
  const [activeNode, setActiveNode] = useState(0);
  const [dotProgress, setDotProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) % (CYCLE * EDGES.length);
      const progress = elapsed / CYCLE;
      setDotProgress(progress);
      setActiveNode(
        Math.floor(progress) + 1 <= EDGES.length ? Math.floor(progress) + 1 : 0,
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const edgeIdx = Math.min(Math.floor(dotProgress), EDGES.length - 1);
  const edgeT = dotProgress - Math.floor(dotProgress);
  const fromNode = NODES[EDGES[edgeIdx].from];
  const toNode = NODES[EDGES[edgeIdx].to];
  const dotX =
    fromNode.x +
    NODE_W / 2 +
    (toNode.x + NODE_W / 2 - fromNode.x - NODE_W / 2) * edgeT;
  const dotY = VIEWBOX_H / 2;

  return (
    <div className="w-full" style={{ overflowX: "hidden" }}>
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        className="w-full h-auto"
        role="img"
        aria-label="Automation pipeline: Invoice to Bot to ERP to Report to Done"
      >
        <defs>
          <filter id="glow-amber">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connecting lines */}
        {EDGES.map((edge) => {
          const fromX = NODES[edge.from].x + NODE_W;
          const toX = NODES[edge.to].x;
          const y = VIEWBOX_H / 2;
          const key = `line-${edge.from}-${edge.to}`;
          return (
            <line
              key={key}
              x1={fromX}
              y1={y}
              x2={toX}
              y2={y}
              stroke={edge.from < edgeIdx ? "#1E40AF" : "#BFDBFE"}
              strokeWidth={2.5}
              strokeDasharray="6 4"
            />
          );
        })}

        {/* Arrowheads */}
        {EDGES.map((edge) => {
          const toX = NODES[edge.to].x - 2;
          const y = VIEWBOX_H / 2;
          const key = `arrow-${edge.from}-${edge.to}`;
          return (
            <polygon
              key={key}
              points={`${toX},${y - 6} ${toX + 10},${y} ${toX},${y + 6}`}
              fill={edge.from < edgeIdx ? "#1E40AF" : "#BFDBFE"}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isActive = i === activeNode;
          const isCompleted = i < activeNode;
          const cx = node.x + NODE_W / 2;
          const cy = VIEWBOX_H / 2;
          return (
            <g key={node.id}>
              {isActive && (
                <>
                  <rect
                    x={node.x - 8}
                    y={cy - NODE_H / 2 - 8}
                    width={NODE_W + 16}
                    height={NODE_H + 16}
                    rx={16}
                    ry={16}
                    fill="rgba(245,158,11,0.12)"
                    stroke="#F59E0B"
                    strokeWidth={1}
                    opacity={0.5}
                  />
                  <rect
                    x={node.x - 4}
                    y={cy - NODE_H / 2 - 4}
                    width={NODE_W + 8}
                    height={NODE_H + 8}
                    rx={14}
                    ry={14}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth={2}
                    opacity={0.9}
                    filter="url(#glow-amber)"
                  />
                </>
              )}
              <rect
                x={node.x}
                y={cy - NODE_H / 2}
                width={NODE_W}
                height={NODE_H}
                rx={10}
                ry={10}
                fill={
                  isActive ? "#FEF3C7" : isCompleted ? "#EFF6FF" : "#F8FCFF"
                }
                stroke={
                  isActive ? "#F59E0B" : isCompleted ? "#1E40AF" : "#BFDBFE"
                }
                strokeWidth={isActive ? 2.5 : 1.5}
                filter={isCompleted ? "url(#glow-blue)" : undefined}
              />
              <text
                x={cx}
                y={cy + 5}
                textAnchor="middle"
                fontSize={12}
                fontWeight={isActive ? "700" : "600"}
                fill={
                  isActive ? "#92400E" : isCompleted ? "#1E40AF" : "#334155"
                }
                fontFamily="Plus Jakarta Sans, system-ui, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}

        {/* Moving dot */}
        <circle
          cx={dotX}
          cy={dotY}
          r={7}
          fill="#F59E0B"
          stroke="white"
          strokeWidth={2}
          filter="url(#glow-amber)"
        />
      </svg>
    </div>
  );
}
