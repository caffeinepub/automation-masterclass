const nodes = [
  { id: "trigger", label: "TRIGGER", sub: "User Event", x: 60, y: 60 },
  { id: "uipath", label: "UiPath Bot", sub: "RPA Engine", x: 247, y: 60 },
  { id: "ai", label: "AI Agent", sub: "Decision", x: 434, y: 60 },
  { id: "output", label: "OUTPUT", sub: "Automated", x: 621, y: 60 },
];

const edges = [
  { from: 0, to: 1, key: "e0-1" },
  { from: 1, to: 2, key: "e1-2" },
  { from: 2, to: 3, key: "e2-3" },
];

export default function WorkflowDiagram() {
  return (
    <div className="w-full overflow-x-auto py-8">
      <svg
        aria-hidden="true"
        viewBox="0 0 780 120"
        className="w-full max-w-3xl mx-auto"
        style={{ minWidth: "400px" }}
      >
        {/* Animated connecting lines */}
        {edges.map(({ from, to, key }, i) => {
          const n1 = nodes[from];
          const n2 = nodes[to];
          const x1 = n1.x + 52;
          const x2 = n2.x - 8;
          const y = 62;
          return (
            <line
              key={key}
              x1={x1}
              y1={y}
              x2={x2}
              y2={y}
              stroke="oklch(0.65 0.14 230 / 0.7)"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              style={{
                animation: `dash-flow ${1.5 + i * 0.3}s linear infinite`,
                strokeDashoffset: 200,
              }}
            />
          );
        })}

        {/* Arrow heads */}
        {edges.map(({ to, key }) => {
          const n2 = nodes[to];
          const x = n2.x - 10;
          const y = 62;
          return (
            <polygon
              key={`arrow-${key}`}
              points={`${x},${y - 5} ${x + 10},${y} ${x},${y + 5}`}
              fill="oklch(0.50 0.15 245)"
              opacity="0.9"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y - 30}
              width="108"
              height="64"
              rx="8"
              fill="#ffffff"
              stroke="oklch(0.88 0.04 240)"
              strokeWidth="1.5"
            />
            <rect
              x={node.x}
              y={node.y - 30}
              width="108"
              height="64"
              rx="8"
              fill="none"
              stroke="oklch(0.50 0.15 245 / 0.5)"
              strokeWidth="1"
              style={{
                animation: `pulse-blue ${1.5 + i * 0.4}s ease-in-out infinite`,
              }}
            />
            <text
              x={node.x + 54}
              y={node.y + 3}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="oklch(0.50 0.15 245)"
              fontFamily="Satoshi, sans-serif"
              letterSpacing="0.05em"
            >
              {node.label}
            </text>
            <text
              x={node.x + 54}
              y={node.y + 20}
              textAnchor="middle"
              fontSize="9"
              fill="oklch(0.55 0.05 240)"
              fontFamily="Satoshi, sans-serif"
            >
              {node.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
