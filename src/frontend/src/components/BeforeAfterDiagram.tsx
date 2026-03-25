import { motion, useInView } from "motion/react";
import { useRef } from "react";

const BEFORE_ROWS = [
  { icon: "😓", label: "Manual Data Entry", detail: "3 hrs/day, error-prone" },
  { icon: "🔌", label: "Legacy System Access", detail: "No API, manual login" },
  { icon: "📋", label: "Multi-system Copy-Paste", detail: "6 apps, 1 person" },
  { icon: "⏰", label: "Report Generation", detail: "2 hrs every Monday" },
];

const AFTER_ROWS = [
  { icon: "🤖", label: "RPA Bot Handles It", detail: "Runs in minutes" },
  { icon: "🔗", label: "RPA Bridges the Gap", detail: "No API? No problem" },
  {
    icon: "🧠",
    label: "Agentic AI Decides",
    detail: "Smart routing, zero effort",
  },
  {
    icon: "✅",
    label: "Auto-Generated Report",
    detail: "Delivered to your inbox",
  },
];

export default function BeforeAfterDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="mt-12 rounded-2xl overflow-hidden"
      style={{ border: "1.5px solid oklch(0.88 0.04 240)" }}
    >
      {/* Header row */}
      <div className="grid grid-cols-2">
        <div
          className="py-4 px-6 text-center font-display text-sm font-bold uppercase tracking-widest"
          style={{
            background: "oklch(0.97 0.02 15)",
            color: "oklch(0.52 0.2 25)",
          }}
        >
          ❌ Before (Manual)
        </div>
        <div
          className="py-4 px-6 text-center font-display text-sm font-bold uppercase tracking-widest"
          style={{
            background: "oklch(0.95 0.04 160)",
            color: "oklch(0.42 0.16 155)",
          }}
        >
          ✅ After (Automated)
        </div>
      </div>

      {/* Rows */}
      {BEFORE_ROWS.map((before, i) => {
        const after = AFTER_ROWS[i];
        return (
          <motion.div
            key={before.label}
            className="grid grid-cols-2 border-t"
            style={{ borderColor: "oklch(0.90 0.04 240)" }}
            initial={{ opacity: 0, x: -16 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            {/* Before cell */}
            <div
              className="p-4 flex items-center gap-3"
              style={{ background: i % 2 === 0 ? "#fffaf9" : "#ffffff" }}
            >
              <span className="text-xl flex-shrink-0">{before.icon}</span>
              <div>
                <p
                  className="font-body text-sm font-semibold"
                  style={{ color: "oklch(0.42 0.1 25)" }}
                >
                  {before.label}
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "oklch(0.60 0.08 25)" }}
                >
                  {before.detail}
                </p>
              </div>
            </div>
            {/* After cell */}
            <div
              className="p-4 flex items-center gap-3"
              style={{ background: i % 2 === 0 ? "#f5fbf8" : "#ffffff" }}
            >
              <span className="text-xl flex-shrink-0">{after.icon}</span>
              <div>
                <p
                  className="font-body text-sm font-semibold"
                  style={{ color: "oklch(0.40 0.14 155)" }}
                >
                  {after.label}
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "oklch(0.55 0.1 155)" }}
                >
                  {after.detail}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Bottom summary */}
      <div
        className="grid grid-cols-2 border-t"
        style={{ borderColor: "oklch(0.88 0.04 240)" }}
      >
        <div
          className="py-4 px-6 text-center"
          style={{ background: "oklch(0.97 0.02 15)" }}
        >
          <p
            className="font-display text-sm font-bold"
            style={{ color: "oklch(0.52 0.2 25)" }}
          >
            ~30 hrs/week wasted
          </p>
        </div>
        <div
          className="py-4 px-6 text-center"
          style={{ background: "oklch(0.94 0.05 155)" }}
        >
          <p
            className="font-display text-sm font-bold"
            style={{ color: "oklch(0.40 0.16 155)" }}
          >
            ~2 hrs/week (oversight only)
          </p>
        </div>
      </div>
    </div>
  );
}
