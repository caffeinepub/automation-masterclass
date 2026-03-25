import { useEffect, useRef, useState } from "react";

type NodeType = "rect" | "diamond" | "terminal";

interface WFNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  w: number;
  h: number;
  color?: string;
}

// Redesigned so all nodes fit within SVG_W=400, SVG_H=500
const NODES: WFNode[] = [
  {
    id: "trigger",
    label: "Trigger Event",
    type: "terminal",
    x: 130,
    y: 20,
    w: 140,
    h: 44,
    color: "#1E40AF",
  },
  {
    id: "logic",
    label: "Logic Check",
    type: "rect",
    x: 130,
    y: 110,
    w: 140,
    h: 44,
  },
  {
    id: "decision",
    label: "Automated?",
    type: "diamond",
    x: 100,
    y: 200,
    w: 200,
    h: 72,
  },
  {
    id: "actionA",
    label: "Bot — UiPath",
    type: "rect",
    x: 20,
    y: 328,
    w: 130,
    h: 44,
    color: "#1E40AF",
  },
  {
    id: "actionB",
    label: "Agentic AI Flow",
    type: "rect",
    x: 250,
    y: 328,
    w: 130,
    h: 44,
    color: "#7C3AED",
  },
  {
    id: "result",
    label: "✓ Result: Done",
    type: "terminal",
    x: 130,
    y: 430,
    w: 140,
    h: 44,
    color: "#059669",
  },
];

const EDGES: [string, string, string?, string?][] = [
  ["trigger", "logic", ""],
  ["logic", "decision", ""],
  ["decision", "actionA", "YES", "#059669"],
  ["decision", "actionB", "YES", "#059669"],
  ["actionA", "result", ""],
  ["actionB", "result", ""],
];

const SEQ = ["trigger", "logic", "decision", "actionA", "actionB", "result"];

function nodeCenter(n: WFNode) {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
}

function diamondPoints(n: WFNode) {
  const cx = n.x + n.w / 2;
  const cy = n.y + n.h / 2;
  return `${cx},${n.y} ${n.x + n.w},${cy} ${cx},${n.y + n.h} ${n.x},${cy}`;
}

const SVG_W = 400;
const SVG_H = 490;

export default function WorkflowAnimation() {
  const [litNodes, setLitNodes] = useState<Set<string>>(new Set());
  const [litEdges, setLitEdges] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animateSequence();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function animateSequence() {
    SEQ.forEach((nodeId, i) => {
      setTimeout(() => {
        setLitNodes((prev) => new Set([...prev, nodeId]));
        for (const [from, to] of EDGES) {
          if (to === nodeId) {
            setTimeout(() => {
              setLitEdges((prev) => new Set([...prev, `${from}-${to}`]));
            }, 200);
          }
        }
      }, i * 600);
    });
  }

  const nodeMap = Object.fromEntries(NODES.map((n) => [n.id, n]));

  return (
    <div ref={containerRef} className="flex justify-center">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-auto"
        style={{ maxWidth: 400 }}
        role="img"
        aria-label="Automation workflow diagram showing trigger, logic check, decision, UiPath bot, Agentic AI flow and result"
      >
        <defs>
          <filter id="wf-glow-blue">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="wf-glow-green">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="wf-glow-purple">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {EDGES.map(([fromId, toId, label, edgeColor]) => {
          const from = nodeMap[fromId];
          const to = nodeMap[toId];
          const fc = nodeCenter(from);
          const tc = nodeCenter(to);
          const key = `edge-${fromId}-${toId}`;
          const lit = litEdges.has(`${fromId}-${toId}`);
          const col = lit ? edgeColor || "#1E40AF" : "#BFDBFE";

          let d = `M ${fc.x} ${from.y + from.h} L ${tc.x} ${to.y}`;

          if (fromId === "decision" && toId === "actionA") {
            // Left branch from diamond left vertex to actionA
            const leftX = from.x;
            const leftY = from.y + from.h / 2;
            const aTc = nodeCenter(to);
            d = `M ${leftX} ${leftY} L ${aTc.x} ${leftY} L ${aTc.x} ${to.y}`;
          } else if (fromId === "decision" && toId === "actionB") {
            // Right branch from diamond right vertex to actionB
            const rightX = from.x + from.w;
            const rightY = from.y + from.h / 2;
            const bTc = nodeCenter(to);
            d = `M ${rightX} ${rightY} L ${bTc.x} ${rightY} L ${bTc.x} ${to.y}`;
          } else if (fromId === "actionA" && toId === "result") {
            const rc = nodeCenter(nodeMap.result);
            const aTcx = fc.x;
            d = `M ${aTcx} ${from.y + from.h} L ${aTcx} ${rc.y - 22} L ${rc.x} ${rc.y - 22} L ${rc.x} ${nodeMap.result.y}`;
          } else if (fromId === "actionB" && toId === "result") {
            const rc = nodeCenter(nodeMap.result);
            const bTcx = fc.x;
            d = `M ${bTcx} ${from.y + from.h} L ${bTcx} ${rc.y - 22} L ${rc.x} ${rc.y - 22} L ${rc.x} ${nodeMap.result.y}`;
          }

          return (
            <g key={key}>
              <path
                d={d}
                stroke={col}
                strokeWidth={lit ? 2.5 : 1.5}
                fill="none"
                strokeDasharray={lit ? "none" : "5 4"}
                style={lit ? { filter: `drop-shadow(0 0 4px ${col}88)` } : {}}
              />
              {label && lit && (
                <text
                  x={(fc.x + tc.x) / 2 + 8}
                  y={(from.y + from.h + to.y) / 2 - 4}
                  fontSize={10}
                  fill={edgeColor || "#1E40AF"}
                  fontWeight="700"
                  fontFamily="Plus Jakarta Sans, sans-serif"
                >
                  {label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const lit = litNodes.has(node.id);
          const fill = lit
            ? node.color
              ? `${node.color}15`
              : "#EFF6FF"
            : "#F8FCFF";
          const stroke = lit ? node.color || "#1E40AF" : "#BFDBFE";
          const textFill = lit ? node.color || "#1E3A5F" : "#94A3B8";
          const cx = node.x + node.w / 2;
          const cy = node.y + node.h / 2;
          const glowFilter = lit
            ? node.color === "#059669"
              ? "url(#wf-glow-green)"
              : node.color === "#7C3AED"
                ? "url(#wf-glow-purple)"
                : "url(#wf-glow-blue)"
            : undefined;

          return (
            <g key={node.id}>
              {lit &&
                (node.type === "diamond" ? (
                  <polygon
                    points={`${cx},${node.y - 6} ${node.x + node.w + 6},${cy} ${cx},${node.y + node.h + 6} ${node.x - 6},${cy}`}
                    fill={`${node.color || "#1E40AF"}10`}
                    stroke={node.color || "#1E40AF"}
                    strokeWidth={1}
                    opacity={0.4}
                  />
                ) : (
                  <rect
                    x={node.x - 6}
                    y={node.y - 6}
                    width={node.w + 12}
                    height={node.h + 12}
                    rx={node.type === "terminal" ? 28 : 14}
                    fill={`${node.color || "#1E40AF"}08`}
                    stroke={node.color || "#1E40AF"}
                    strokeWidth={1}
                    opacity={0.3}
                  />
                ))}
              {node.type === "diamond" ? (
                <polygon
                  points={diamondPoints(node)}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={lit ? 2.5 : 1.5}
                  filter={glowFilter}
                />
              ) : node.type === "terminal" ? (
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={22}
                  ry={22}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={lit ? 2.5 : 1.5}
                  filter={glowFilter}
                />
              ) : (
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height={node.h}
                  rx={10}
                  ry={10}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={lit ? 2 : 1.5}
                  filter={glowFilter}
                />
              )}
              <text
                x={cx}
                y={cy + 5}
                textAnchor="middle"
                fontSize={11}
                fontWeight={lit ? "700" : "400"}
                fill={textFill}
                fontFamily="Plus Jakarta Sans, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
