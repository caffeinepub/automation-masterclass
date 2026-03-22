import { useEffect, useRef, useState } from "react";

const EVENTS = [
  {
    icon: "🤖",
    text: "UiPath Bot processed 127 invoices",
    time: "0.3s",
    color: "#1E40AF",
  },
  {
    icon: "⚡",
    text: "N8N workflow triggered: HR onboarding",
    time: "1.1s",
    color: "#7C3AED",
  },
  {
    icon: "📊",
    text: "ERP sync: 340 records updated",
    time: "0.8s",
    color: "#059669",
  },
  {
    icon: "🔄",
    text: "Agentic AI routed 58 support tickets",
    time: "2.0s",
    color: "#DC2626",
  },
  {
    icon: "📄",
    text: "Purchase orders auto-approved: 22",
    time: "0.5s",
    color: "#1E40AF",
  },
  {
    icon: "✅",
    text: "Compliance report generated automatically",
    time: "3.2s",
    color: "#059669",
  },
  {
    icon: "📧",
    text: "1,200 client emails categorised & filed",
    time: "1.4s",
    color: "#7C3AED",
  },
  {
    icon: "💰",
    text: "Invoice reconciliation saved ₹18,400",
    time: "0.6s",
    color: "#D97706",
  },
  {
    icon: "🏢",
    text: "Legacy ERP data migrated via RPA",
    time: "4.1s",
    color: "#1E40AF",
  },
  {
    icon: "🚀",
    text: "Onboarding flow: 0 human hours needed",
    time: "0.9s",
    color: "#059669",
  },
];

// Time wasted per second globally in manual work (conservative estimate)
// ~500M knowledge workers × 3h manual/day = 1.5B hrs/day = 17,361 hrs/s
const WASTE_PER_SEC = 17361;

function formatBigNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
}

export default function LiveAutomationFeed() {
  const [feed, setFeed] = useState(
    EVENTS.slice(0, 4).map((e, i) => ({
      ...e,
      id: i,
      ts: Date.now() - (3 - i) * 2000,
    })),
  );
  const [wastedHrs, setWastedHrs] = useState(0);
  const [sessionSec, setSessionSec] = useState(0);
  const nextId = useRef(EVENTS.length);
  const eventIdx = useRef(4);
  const startTime = useRef(Date.now());

  // Add a new fake event every ~2.5s
  useEffect(() => {
    const iv = setInterval(() => {
      const e = EVENTS[eventIdx.current % EVENTS.length];
      eventIdx.current += 1;
      setFeed((prev) => [
        { ...e, id: nextId.current++, ts: Date.now() },
        ...prev.slice(0, 5),
      ]);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  // Tick wasted hours counter
  useEffect(() => {
    const iv = setInterval(() => {
      const elapsed = (Date.now() - startTime.current) / 1000;
      setSessionSec(Math.floor(elapsed));
      setWastedHrs(Math.floor(elapsed * WASTE_PER_SEC));
    }, 200);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(248,252,255,0.85)",
        border: "1.5px solid rgba(191,219,254,0.7)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 0 40px rgba(30,64,175,0.08), 0 8px 32px rgba(30,64,175,0.06)",
      }}
    >
      {/* Header */}
      <div
        className="px-5 py-3.5 flex items-center justify-between"
        style={{
          background:
            "linear-gradient(90deg, rgba(30,64,175,0.06) 0%, rgba(124,58,237,0.04) 100%)",
          borderBottom: "1px solid rgba(191,219,254,0.5)",
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"
            style={{ boxShadow: "0 0 8px rgba(239,68,68,0.7)" }}
          />
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#1E40AF" }}
          >
            Live Bot Activity
          </span>
        </div>
        <span className="text-xs font-semibold" style={{ color: "#64748B" }}>
          Real-time
        </span>
      </div>

      {/* Wasted hours counter */}
      <div
        className="px-5 py-4 flex items-start gap-4"
        style={{ borderBottom: "1px solid rgba(191,219,254,0.4)" }}
      >
        <div className="flex-1">
          <p
            className="text-xs font-semibold mb-1"
            style={{ color: "#64748B" }}
          >
            Manual hours wasted globally
          </p>
          <div className="flex items-baseline gap-1.5">
            <span
              className="text-3xl font-extrabold font-display tabular-nums"
              style={{
                color: "#DC2626",
                textShadow: "0 0 20px rgba(220,38,38,0.25)",
              }}
            >
              {formatBigNum(wastedHrs)}
            </span>
            <span className="text-sm font-bold" style={{ color: "#DC2626" }}>
              hrs
            </span>
            <span className="text-xs ml-1" style={{ color: "#94A3B8" }}>
              since you opened this page
            </span>
          </div>
          <div
            className="mt-2 h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(220,38,38,0.1)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${Math.min((sessionSec / 120) * 100, 100)}%`,
                background: "linear-gradient(90deg, #FCA5A5, #DC2626)",
                boxShadow: "0 0 8px rgba(220,38,38,0.4)",
              }}
            />
          </div>
        </div>
        <div
          className="text-center px-3 py-2 rounded-xl"
          style={{
            background: "rgba(5,150,105,0.08)",
            border: "1px solid rgba(5,150,105,0.2)",
          }}
        >
          <p
            className="text-2xl font-extrabold"
            style={{
              color: "#059669",
              textShadow: "0 0 12px rgba(5,150,105,0.3)",
            }}
          >
            0
          </p>
          <p className="text-xs font-semibold" style={{ color: "#059669" }}>
            with automation
          </p>
        </div>
      </div>

      {/* Event feed */}
      <div className="px-4 py-3 space-y-2" style={{ minHeight: 200 }}>
        {feed.map((event, i) => (
          <div
            key={event.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
            style={{
              background: i === 0 ? `${event.color}08` : "transparent",
              border:
                i === 0
                  ? `1px solid ${event.color}25`
                  : "1px solid transparent",
              opacity: 1 - i * 0.15,
              transform: i === 0 ? "none" : undefined,
              transition: "all 0.4s ease",
              boxShadow: i === 0 ? `0 0 12px ${event.color}12` : "none",
            }}
          >
            <span className="text-base">{event.icon}</span>
            <span
              className="flex-1 text-xs font-semibold"
              style={{ color: "#1E3A5F" }}
            >
              {event.text}
            </span>
            <span
              className="text-xs font-mono px-1.5 py-0.5 rounded"
              style={{
                background: `${event.color}10`,
                color: event.color,
                fontSize: 10,
              }}
            >
              {event.time}
            </span>
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(191,219,254,0.4)" }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs" style={{ color: "#64748B" }}>
            Bots running 24/7
          </span>
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{
            background: "rgba(30,64,175,0.08)",
            color: "#1E40AF",
            boxShadow: "0 0 10px rgba(30,64,175,0.1)",
          }}
        >
          ⚡ See this live — April 12
        </span>
      </div>
    </div>
  );
}
