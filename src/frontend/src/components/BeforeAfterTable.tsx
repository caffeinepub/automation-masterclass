const ROWS = [
  {
    id: "data-entry",
    before: {
      icon: "😓",
      title: "Manual Data Entry",
      sub: "3 hrs/day, error-prone",
    },
    after: {
      icon: "🤖",
      title: "RPA Bot Handles It",
      sub: "Runs in minutes, zero errors",
    },
  },
  {
    id: "legacy-access",
    before: {
      icon: "🔗",
      title: "Legacy System Access",
      sub: "No API, manual login every time",
    },
    after: {
      icon: "🔀",
      title: "RPA Bridges the Gap",
      sub: "No API? No problem — bot logs in",
    },
  },
  {
    id: "copy-paste",
    before: {
      icon: "📋",
      title: "Multi-system Copy-Paste",
      sub: "6 apps, 1 person, endless clicks",
    },
    after: {
      icon: "🧠",
      title: "Agentic AI Orchestrates",
      sub: "Smart decisions across all systems",
    },
  },
  {
    id: "report-gen",
    before: {
      icon: "⏰",
      title: "Report Generation",
      sub: "2 hrs every Monday, manually",
    },
    after: {
      icon: "✅",
      title: "Auto-Generated Report",
      sub: "Delivered to inbox, zero effort",
    },
  },
];

export default function BeforeAfterTable() {
  return (
    <div
      className="w-full overflow-x-auto rounded-2xl"
      style={{ border: "1.5px solid #E2E8F0", background: "white" }}
    >
      {/* Header row */}
      <div className="grid grid-cols-2">
        <div
          className="px-4 py-3 text-center font-extrabold text-sm tracking-wide rounded-tl-2xl"
          style={{ background: "#FEF2F2", color: "#DC2626" }}
        >
          ❌ BEFORE (MANUAL)
        </div>
        <div
          className="px-4 py-3 text-center font-extrabold text-sm tracking-wide rounded-tr-2xl"
          style={{ background: "#F0FFF4", color: "#059669" }}
        >
          ✅ AFTER (AUTOMATED)
        </div>
      </div>

      {/* Data rows */}
      {ROWS.map((row, i) => (
        <div key={row.id} className="grid grid-cols-2">
          <div
            className="px-4 py-4 flex items-start gap-3"
            style={{
              background: i % 2 === 0 ? "#FFF5F5" : "white",
              borderTop: "1px solid #E2E8F0",
              borderRight: "1px solid #E2E8F0",
            }}
          >
            <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
              {row.before.icon}
            </span>
            <div>
              <p className="font-bold text-sm" style={{ color: "#0F172A" }}>
                {row.before.title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
                {row.before.sub}
              </p>
            </div>
          </div>
          <div
            className="px-4 py-4 flex items-start gap-3"
            style={{
              background: i % 2 === 0 ? "#F0FFF9" : "white",
              borderTop: "1px solid #E2E8F0",
            }}
          >
            <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">
              {row.after.icon}
            </span>
            <div>
              <p className="font-bold text-sm" style={{ color: "#0F172A" }}>
                {row.after.title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>
                {row.after.sub}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Footer summary */}
      <div className="grid grid-cols-2">
        <div
          className="px-4 py-3 text-center font-extrabold text-sm rounded-bl-2xl"
          style={{
            background: "#FEE2E2",
            color: "#991B1B",
            borderTop: "2px solid #FCA5A5",
          }}
        >
          ~30 hrs/week wasted
        </div>
        <div
          className="px-4 py-3 text-center font-extrabold text-sm rounded-br-2xl"
          style={{
            background: "#DCFCE7",
            color: "#166534",
            borderTop: "2px solid #86EFAC",
          }}
        >
          ~2 hrs/week (oversight only)
        </div>
      </div>
    </div>
  );
}
