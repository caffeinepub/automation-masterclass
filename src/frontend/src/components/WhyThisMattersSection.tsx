import { Bot, Brain, Clock, GitBranch, Settings, User } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";

// ── local helpers (not exported from App.tsx) ─────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("visible");
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setCount(Math.floor(p * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { ref, count };
}

const scrollToRegister = () =>
  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });

// ── CORRECTION 1: New multi-line headline (replaces typewriter) ───────────
function NewHeadline() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <h2
        style={{
          fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 800,
          lineHeight: 1.25,
          margin: 0,
        }}
      >
        {/* Line 1 — bold white */}
        <span style={{ display: "block", color: "#ffffff" }}>
          AI can think.
        </span>
        {/* Line 2 — bold white */}
        <span
          style={{ display: "block", color: "#ffffff", marginTop: "0.15em" }}
        >
          Hyped AI tools and API workflows <br style={{ display: "none" }} />
          are already old news.
        </span>
        {/* Line 3 — bold electric blue, slightly larger */}
        <span
          style={{
            display: "block",
            color: "#3B82F6",
            fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
            marginTop: "0.2em",
          }}
        >
          Where APIs stop —
          <br />
          UiPath RPA begins.
        </span>
        {/* Line 4 — bold white */}
        <span
          style={{ display: "block", color: "#ffffff", marginTop: "0.2em" }}
        >
          The real game starts
          <br />
          beyond the API key.
        </span>
      </h2>
    </div>
  );
}

// ── Section Opener ────────────────────────────────────────────────────────
function SectionOpener() {
  const labelRef = useReveal();
  const subtextRef = useReveal();
  const lineRef = useReveal();

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "0 auto",
        textAlign: "center",
        padding: "clamp(40px, 6vw, 80px) 20px 0",
      }}
    >
      <div
        ref={labelRef}
        className="reveal"
        style={{
          color: "#00D9FF",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        The Truth Nobody Is Telling You
      </div>

      <NewHeadline />

      {/* CORRECTION 1: New subtext */}
      <div
        ref={subtextRef}
        className="reveal reveal-delay-2"
        style={{
          color: "rgba(255,255,255,0.75)",
          fontSize: "1.05rem",
          lineHeight: 1.7,
          marginTop: 28,
          marginBottom: 40,
        }}
      >
        <p style={{ margin: "0 0 16px 0" }}>
          Every tool you have heard about —<br />
          N8N, Zapier, ChatGPT agents,
          <br />
          API workflows — they all hit a wall
          <br />
          the moment an API key does not exist.
        </p>
        <p style={{ margin: "0 0 16px 0" }}>
          UiPath RPA does not need
          <br />
          permission from any system.
          <br />
          No API key. No integration.
          <br />
          No limit.
        </p>
        <p style={{ margin: 0 }}>
          If a human can see it on a screen —<br />
          UiPath can automate it.
        </p>
      </div>

      {/* Animated cyan line */}
      <div
        ref={lineRef}
        className="reveal line-draw-animate"
        style={{
          height: 2,
          background: "#00D9FF",
          margin: "0 auto",
          maxWidth: 480,
        }}
      />
    </div>
  );
}

// ── Tick row ──────────────────────────────────────────────────────────────
function TickRow({
  text,
  color,
  delay,
}: {
  text: string;
  color: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        fontSize: "0.9rem",
        color: "#ffffff",
        marginBottom: 8,
      }}
    >
      <span style={{ color, fontWeight: 700, fontSize: "1.1rem" }}>✓</span>
      <span>{text}</span>
    </div>
  );
}

// ── Comparison columns ────────────────────────────────────────────────────
function ComparisonColumns() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const col1Ticks = ["Can think", "Can suggest", "Can write"];
  const col2Ticks = [
    "Can connect systems",
    "Can trigger automations",
    "Can move data",
  ];
  const col3Ticks = [
    "Works like a human on screen",
    "Clicks, types, reads, decides",
    "Needs ZERO API",
    "Works on government portals",
    "Works on banking systems",
    "Works on hospital software",
    "Works on ANY screen it can see",
  ];

  const weakCard: React.CSSProperties = {
    background: "#0d2040",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    position: "relative",
  };

  const dominantCard: React.CSSProperties = {
    background: "rgba(0, 40, 80, 0.9)",
    border: "2px solid #00D9FF",
    borderRadius: 16,
    padding: "32px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(32px)",
    position: "relative",
    boxShadow: "0 0 20px rgba(0,217,255,0.4), 0 0 40px rgba(0,217,255,0.1)",
    animation: "cyan-glow-pulse 2s ease-in-out infinite",
  };

  return (
    <div
      ref={containerRef}
      style={{ padding: "clamp(32px, 5vw, 60px) 20px 0" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
          maxWidth: 1100,
          margin: "0 auto",
          alignItems: "start",
        }}
      >
        {/* COLUMN 1 — AI TOOLS */}
        <div
          style={{
            ...weakCard,
            transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <Brain size={28} color="#6b7280" />
          </div>
          <div
            style={{
              color: "#6b7280",
              fontWeight: 800,
              letterSpacing: "0.12em",
              fontSize: "0.85rem",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            AI TOOLS
          </div>
          <div
            style={{ color: "#4b5563", fontSize: "0.8rem", marginBottom: 16 }}
          >
            ChatGPT · Gemini · Claude
          </div>
          {col1Ticks.map((t, i) => (
            <TickRow key={t} text={t} color="#22c55e" delay={i * 100} />
          ))}
          <div style={{ borderTop: "1px solid #dc2626", margin: "16px 0" }} />
          <div
            style={{
              background: "rgba(60,0,0,0.6)",
              borderRadius: 10,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                color: "#f87171",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Real Situation
            </div>
            <p
              style={{
                color: "#ffffff",
                fontSize: "0.87rem",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Your CA needs to file GST return. You ask ChatGPT. ChatGPT tells
              you the steps.
              <br />
              <br />
              You still have to do it yourself.
            </p>
          </div>
          {/* CORRECTION 2: Updated Column 1 bottom badge */}
          <div
            style={{
              marginTop: 14,
              background: "rgba(220,38,38,0.2)",
              border: "1px solid #dc2626",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: "0.8rem",
              color: "#fca5a5",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Tells you what to do.
            <br />
            Cannot do it for you.
            <br />
            Needs human to execute.
          </div>
        </div>

        {/* COLUMN 2 — N8N / API WORKFLOWS */}
        <div
          style={{
            ...weakCard,
            transition: "opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <GitBranch size={28} color="#6b7280" />
          </div>
          <div
            style={{
              color: "#6b7280",
              fontWeight: 800,
              letterSpacing: "0.12em",
              fontSize: "0.85rem",
              textTransform: "uppercase",
              marginBottom: 4,
            }}
          >
            N8N / API WORKFLOWS
          </div>
          <div
            style={{ color: "#4b5563", fontSize: "0.8rem", marginBottom: 16 }}
          >
            Zapier · Make · N8N · Pabbly
          </div>
          {col2Ticks.map((t, i) => (
            <TickRow key={t} text={t} color="#22c55e" delay={i * 100} />
          ))}
          <div style={{ borderTop: "1px solid #dc2626", margin: "16px 0" }} />
          <div
            style={{
              background: "rgba(60,0,0,0.6)",
              borderRadius: 10,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                color: "#f87171",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Real Situation
            </div>
            <p
              style={{
                color: "#ffffff",
                fontSize: "0.87rem",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              You want to automate your hospital's insurance portal.
              <br />
              <br />
              N8N checks. No API available.
              <br />
              <br />
              Workflow stops. Human takes over again.
            </p>
          </div>
          {/* CORRECTION 2: Updated Column 2 bottom badge */}
          <div
            style={{
              marginTop: 14,
              background: "rgba(220,38,38,0.2)",
              border: "1px solid #dc2626",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: "0.8rem",
              color: "#fca5a5",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Fully dependent on API keys.
            <br />
            No API = No automation.
            <br />
            Real businesses mostly have no API.
          </div>
        </div>

        {/* COLUMN 3 — UiPath RPA (DOMINANT) */}
        <div
          style={{
            ...dominantCard,
            transition: "opacity 0.6s ease 0.45s, transform 0.6s ease 0.45s",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <div style={{ position: "relative" }}>
              <Bot size={30} color="#00D9FF" />
              <Settings
                size={14}
                color="#00D9FF"
                style={{
                  position: "absolute",
                  bottom: -2,
                  right: -6,
                  background: "#001a3d",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>
          <div
            style={{
              color: "#00D9FF",
              fontWeight: 800,
              letterSpacing: "0.12em",
              fontSize: "0.95rem",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            UiPath RPA
          </div>
          <div
            style={{
              display: "inline-block",
              background: "#d97706",
              color: "#0f172a",
              fontWeight: 700,
              fontSize: "0.72rem",
              borderRadius: 20,
              padding: "4px 12px",
              letterSpacing: "0.04em",
              marginBottom: 18,
            }}
          >
            What The Maharishi Teaches Live
          </div>
          {col3Ticks.map((t, i) => (
            <TickRow key={t} text={t} color="#00D9FF" delay={i * 80} />
          ))}
          <div
            style={{
              borderTop: "1px solid #00D9FF",
              margin: "16px 0",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              background: "rgba(0,40,60,0.8)",
              border: "1px solid rgba(0,217,255,0.2)",
              borderRadius: 10,
              padding: "14px 16px",
            }}
          >
            <div
              style={{
                color: "#00D9FF",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Same Situation — UiPath
            </div>
            <p
              style={{
                color: "#ffffff",
                fontSize: "0.87rem",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Hospital needs to file insurance claim. No API exists.
              <br />
              <br />
              UiPath opens the portal. Logs in automatically. Reads the patient
              report. Fills every field. Submits the claim.
              <br />
              <br />
              Done in 3 minutes. Zero human involvement.
            </p>
          </div>
          {/* CORRECTION 2: Updated Column 3 bottom badge */}
          <div
            style={{
              marginTop: 14,
              background: "rgba(0,217,255,0.1)",
              border: "1px solid #00D9FF",
              borderRadius: 8,
              padding: "10px 12px",
              fontSize: "0.8rem",
              color: "#00D9FF",
              textAlign: "center",
              boxShadow: "0 0 12px rgba(0,217,255,0.2)",
              lineHeight: 1.6,
            }}
          >
            Zero API needed. Ever.
            <br />
            Works on any screen a human can see.
            <br />
            Where APIs stop — UiPath begins.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Aha Moment Box ────────────────────────────────────────────────────────
function AhaMomentBox() {
  const boxRef = useReveal();
  const textRef = useReveal();

  return (
    <div style={{ padding: "clamp(32px, 5vw, 60px) 20px 0" }}>
      <div
        ref={boxRef}
        className="reveal"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#000d1a",
          border: "2px solid rgba(0,217,255,0.4)",
          borderRadius: 20,
          padding: "40px 32px",
          animation: "cyan-glow-pulse 2s ease-in-out infinite",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* LEFT — Without RPA */}
          <div style={{ flex: "1 1 140px", textAlign: "center" }}>
            <div
              style={{
                color: "#ef4444",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Without RPA
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
                marginBottom: 12,
                height: 60,
                overflow: "hidden",
              }}
            >
              <div
                className="frantic-animation"
                style={{ display: "flex", alignItems: "center", gap: 4 }}
              >
                <User size={22} color="#ef4444" />
                <div style={{ display: "flex", gap: 3 }}>
                  {["w0", "w1", "w2", "w3", "w4"].map((id) => (
                    <div
                      key={id}
                      style={{
                        width: 18,
                        height: 14,
                        background: "rgba(239,68,68,0.25)",
                        border: "1px solid rgba(239,68,68,0.5)",
                        borderRadius: 2,
                        fontSize: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ef4444",
                      }}
                    >
                      ■
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Clock
                size={20}
                color="#ef4444"
                style={{ animation: "spin 0.5s linear infinite" }}
              />
            </div>
            <div
              style={{ color: "#ef4444", fontWeight: 700, fontSize: "0.9rem" }}
            >
              3 hours. Every day. Forever.
            </div>
          </div>

          {/* CENTER — Arrow + Date */}
          <div style={{ textAlign: "center", flex: "0 0 auto" }}>
            <div style={{ fontSize: "2.5rem", color: "rgba(255,255,255,0.5)" }}>
              →
            </div>
            <div
              style={{
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "1.1rem",
                fontFamily:
                  "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
              }}
            >
              April 12
            </div>
          </div>

          {/* RIGHT — With RPA */}
          <div style={{ flex: "1 1 140px", textAlign: "center" }}>
            <div
              style={{
                color: "#00D9FF",
                fontWeight: 700,
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              With RPA
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 12,
                height: 60,
              }}
            >
              <div className="calm-animation">
                <Bot size={28} color="#00D9FF" />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Clock
                size={20}
                color="#00D9FF"
                style={{ animation: "spin 10s linear infinite" }}
              />
            </div>
            <div
              style={{ color: "#00D9FF", fontWeight: 700, fontSize: "0.9rem" }}
            >
              3 minutes. Automatically.
              <br />
              While you do something else.
            </div>
          </div>
        </div>
      </div>

      <div
        ref={textRef}
        className="reveal reveal-delay-1"
        style={{ maxWidth: 700, margin: "40px auto 0", textAlign: "center" }}
      >
        <p
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
            lineHeight: 1.4,
            marginBottom: 12,
            fontFamily:
              "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
          }}
        >
          The bot does not get tired. Does not make errors. Does not ask for a
          salary raise.
        </p>
        <p style={{ color: "#00D9FF", fontSize: "0.9rem" }}>
          This is what 30 years of automation looks like in practice.
        </p>
      </div>
    </div>
  );
}

// ── Live Automation Demo ──────────────────────────────────────────────────
const DEMO_STEPS = [
  "Opens GST Portal",
  "Logs In Automatically",
  "Reads Invoice Data",
  "Fills Form Fields",
  "Submits Return",
  "Done in 3 Minutes",
];

function LiveAutomationDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const labelRef = useReveal();

  useEffect(() => {
    let step = 0;
    const timer = setInterval(
      () => {
        step = (step + 1) % DEMO_STEPS.length;
        setActiveStep(step);
      },
      Math.floor(5000 / DEMO_STEPS.length),
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: "clamp(32px, 5vw, 60px) 20px 0" }}>
      <div
        ref={labelRef}
        className="reveal"
        style={{ textAlign: "center", marginBottom: 24 }}
      >
        <p style={{ color: "#ffffff", fontSize: "0.9rem", marginBottom: 4 }}>
          This is what runs live on April 12.
        </p>
      </div>

      <div
        style={{
          maxWidth: 1000,
          margin: "0 auto",
          background: "#000d1a",
          borderRadius: 16,
          padding: "32px 20px",
          border: "1px solid rgba(0,217,255,0.2)",
        }}
      >
        <div
          className="why-live-demo-steps"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {DEMO_STEPS.map((step, i) => (
            <Fragment key={step}>
              <div
                style={{
                  borderRadius: 10,
                  padding: "12px 16px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  textAlign: "center",
                  minWidth: 120,
                  transition: "all 0.4s ease",
                  background:
                    activeStep === i
                      ? "rgba(0,217,255,0.15)"
                      : "rgba(255,255,255,0.05)",
                  border:
                    activeStep === i
                      ? "1px solid #00D9FF"
                      : "1px solid rgba(255,255,255,0.15)",
                  color: activeStep === i ? "#00D9FF" : "rgba(255,255,255,0.5)",
                  boxShadow:
                    activeStep === i ? "0 0 12px rgba(0,217,255,0.3)" : "none",
                  transform: activeStep === i ? "scale(1.05)" : "scale(1)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.65rem",
                    marginBottom: 4,
                    opacity: 0.7,
                    letterSpacing: "0.05em",
                  }}
                >
                  STEP {i + 1}
                </div>
                {step}
              </div>
              {i < DEMO_STEPS.length - 1 && (
                <div
                  className="why-live-demo-arrow"
                  style={{
                    color: activeStep > i ? "#00D9FF" : "rgba(255,255,255,0.2)",
                    fontSize: "1.2rem",
                    transition: "color 0.4s ease",
                    userSelect: "none",
                  }}
                >
                  →
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <p
          style={{
            textAlign: "right",
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.7rem",
            marginTop: 20,
            marginBottom: 0,
          }}
        >
          No API used. No human needed.
        </p>
      </div>
    </div>
  );
}

// ── Industry Grid ─────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    emoji: "🏦",
    label: "Banking",
    desc: "Loan approvals: Days \u2192 Minutes",
  },
  {
    emoji: "🏥",
    label: "Healthcare",
    desc: "Insurance claims filed automatically",
  },
  {
    emoji: "🛒",
    label: "E-commerce",
    desc: "Orders, returns, inventory \u2014 zero manual",
  },
  {
    emoji: "🏭",
    label: "Manufacturing",
    desc: "Supply chain and ERP \u2014 fully automated",
  },
  {
    emoji: "🧾",
    label: "Accounting & CA Firms",
    desc: "GST filing on govt portals \u2014 no API needed",
  },
  {
    emoji: "👥",
    label: "HR & Recruitment",
    desc: "Onboarding: 1 day \u2192 15 minutes",
  },
  {
    emoji: "🎧",
    label: "Customer Support",
    desc: "Tickets resolved without human hands",
  },
  {
    emoji: "🏛\ufe0f",
    label: "Government Sector",
    desc: "Forms processed from scans automatically",
  },
  {
    emoji: "\u2708\ufe0f",
    label: "Travel & Airlines",
    desc: "Refunds processed across legacy systems",
  },
  { emoji: "🎓", label: "Education", desc: "Admissions processed end to end" },
  {
    emoji: "🚚",
    label: "Logistics",
    desc: "Tracking and updates \u2014 fully automated",
  },
  {
    emoji: "🏪",
    label: "Retail & Offline Stores",
    desc: "Inventory synced across POS and online",
  },
];

function IndustryGrid() {
  const headlineRef = useReveal();
  const ctaRef = useReveal();

  return (
    <div style={{ padding: "clamp(32px, 5vw, 60px) 20px 0" }}>
      <div
        ref={headlineRef}
        className="reveal"
        style={{ textAlign: "center", marginBottom: 36 }}
      >
        <h3
          style={{
            fontFamily:
              "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.2,
            marginBottom: 12,
            whiteSpace: "pre-line",
          }}
        >
          {"Every industry.\nEvery role. One skill."}
        </h3>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "1rem",
            maxWidth: 500,
            margin: "0 auto",
          }}
        >
          Real automation is replacing manual work across every sector right
          now.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          maxWidth: 1100,
          margin: "0 auto",
        }}
        className="industry-grid-responsive"
      >
        {INDUSTRIES.map((ind, i) => (
          <div
            key={ind.label}
            className="industry-card"
            data-ocid={`industry.item.${i + 1}`}
            style={{ transitionDelay: `${(i % 4) * 0.07}s` }}
          >
            <div
              className="industry-icon"
              style={{ fontSize: "2rem", marginBottom: 8 }}
            >
              {ind.emoji}
            </div>
            <div
              style={{
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginBottom: 4,
              }}
            >
              {ind.label}
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.78rem",
                lineHeight: 1.4,
              }}
            >
              {ind.desc}
            </div>
          </div>
        ))}
      </div>

      <div
        ref={ctaRef}
        className="reveal reveal-delay-2"
        style={{ textAlign: "center", marginTop: 40 }}
      >
        <p
          style={{
            color: "#00D9FF",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            lineHeight: 1.5,
            whiteSpace: "pre-line",
          }}
        >
          {
            "Your industry is already here.\nThe only question is \u2014\nare you automating it\nor is your competitor?"
          }
        </p>
      </div>
    </div>
  );
}

// ── Pattern Reveal Box ────────────────────────────────────────────────────
const PATTERNS = [
  "If the work is repetitive \u2014 UiPath replaces it.",
  "If the work is rule-based \u2014 UiPath replaces it.",
  "If the work involves a screen \u2014 UiPath replaces it.",
];

function PatternRevealBox() {
  const boxRef = useReveal();
  const [visibleRows, setVisibleRows] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    PATTERNS.forEach((_, i) => {
      const el = rowRefs.current[i];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleRows((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 200);
            obs.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      obs.observe(el);
      return () => obs.disconnect();
    });
  }, []);

  return (
    <div style={{ padding: "clamp(32px, 5vw, 60px) 20px 0" }}>
      <div
        ref={boxRef}
        className="reveal"
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#000d1a",
          border: "2px solid rgba(0,217,255,0.4)",
          borderRadius: 20,
          padding: "clamp(24px, 4vw, 48px) clamp(18px, 4vw, 40px)",
          animation: "cyan-glow-pulse 2s ease-in-out infinite",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(0,50,100,0.3) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <h3
          style={{
            fontFamily:
              "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
            color: "#00D9FF",
            fontWeight: 800,
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            textAlign: "center",
            marginBottom: 36,
            position: "relative",
          }}
        >
          The Pattern Across All Industries
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
          }}
        >
          {PATTERNS.map((pattern, i) => (
            <div
              key={pattern}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                opacity: visibleRows[i] ? 1 : 0,
                transform: visibleRows[i]
                  ? "translateX(0)"
                  : "translateX(-20px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <span
                style={{
                  color: "#00D9FF",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  flexShrink: 0,
                  textShadow: "0 0 10px rgba(0,217,255,0.5)",
                  opacity: visibleRows[i] ? 1 : 0,
                  transform: visibleRows[i]
                    ? "translateX(0)"
                    : "translateX(-12px)",
                  transition: `opacity 0.4s ease ${i * 0.15}s, transform 0.4s ease ${i * 0.15}s`,
                }}
              >
                →
              </span>
              <span
                style={{ color: "#ffffff", fontSize: "1rem", lineHeight: 1.5 }}
              >
                {pattern}
              </span>
            </div>
          ))}
        </div>

        <p
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
            lineHeight: 1.6,
            marginTop: 32,
            textAlign: "center",
            whiteSpace: "pre-line",
            position: "relative",
          }}
        >
          {
            "It does not matter which industry you are in.\nIf humans are clicking, typing, and copying \u2014\nautomation is coming for that work.\nThe only question is\nwho controls the bot."
          }
        </p>
      </div>
    </div>
  );
}

// ── Counter Row ───────────────────────────────────────────────────────────
function CounterRow() {
  const stat1 = useCountUp(30, 2000);
  const stat2 = useCountUp(40, 2000);
  const stat3 = useCountUp(200, 2000);

  const stats = [
    {
      hook: stat1,
      suffix: "+",
      label: "Years of Automation",
      sub: "The Automation Maharishi",
    },
    {
      hook: stat2,
      suffix: "+",
      label: "Industries Automated",
      sub: "Across 3 continents",
    },
    {
      hook: stat3,
      suffix: "",
      label: "Seats Available",
      sub: "No replay. No recording.",
    },
  ];

  return (
    <div style={{ padding: "clamp(32px, 5vw, 60px) 20px 0" }}>
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {stats.map((stat, i) => (
          <Fragment key={stat.label}>
            <div
              ref={stat.hook.ref}
              style={{
                flex: "1 1 200px",
                textAlign: "center",
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  color: "#00D9FF",
                  fontWeight: 800,
                  fontSize: "clamp(2.8rem, 6vw, 4rem)",
                  fontFamily:
                    "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.hook.count}
                {stat.suffix}
              </div>
              <div
                style={{
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "1rem",
                  marginBottom: 4,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}
              >
                {stat.sub}
              </div>
            </div>
            {i < stats.length - 1 && (
              <div
                style={{
                  width: 1,
                  height: 60,
                  background: "rgba(0,217,255,0.4)",
                  flexShrink: 0,
                }}
                className="counter-divider"
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

// ── CORRECTION 3: Mic Drop Line (updated) ────────────────────────────────
function MicDropLine() {
  const line1Ref = useReveal();
  const line2Ref = useReveal();
  const line4Ref = useReveal();
  const subtextRef = useReveal();

  return (
    <div
      style={{
        padding: "clamp(40px, 6vw, 80px) 20px 0",
        textAlign: "center",
        background: "#001a3d",
      }}
    >
      {/* Line 1 — bold white */}
      <div
        ref={line1Ref}
        className="reveal"
        style={{
          fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          color: "#ffffff",
          marginBottom: 8,
        }}
      >
        ChatGPT can suggest.
      </div>
      {/* Line 2 — bold white */}
      <div
        ref={line2Ref}
        className="reveal reveal-delay-1"
        style={{
          fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          color: "#ffffff",
          marginBottom: 20,
        }}
      >
        N8N can connect — if the API exists.
      </div>
      {/* Line 4 — bold electric blue, very large */}
      <div
        ref={line4Ref}
        className="reveal reveal-delay-3"
        style={{
          fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
          color: "#3B82F6",
          marginBottom: 28,
          lineHeight: 1.2,
        }}
      >
        UiPath RPA replaces the human entirely.
      </div>
      {/* Bold cyan subtext */}
      <div
        ref={subtextRef}
        className="reveal reveal-delay-3"
        style={{
          color: "#00D9FF",
          fontWeight: 700,
          fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
          lineHeight: 1.7,
          maxWidth: 520,
          margin: "0 auto",
          whiteSpace: "pre-line",
        }}
      >
        {
          "No API needed. No permission needed.\nNo limit. The real automation\nstarts where everything else stops."
        }
      </div>
    </div>
  );
}

// ── Mini CTA ──────────────────────────────────────────────────────────────
function MiniCTA() {
  const ctaRef = useReveal();

  return (
    <div
      ref={ctaRef}
      className="reveal"
      style={{
        padding: "clamp(32px, 5vw, 60px) 20px clamp(40px, 6vw, 80px)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
          fontFamily: "'Bricolage Grotesque', 'Plus Jakarta Sans', sans-serif",
          marginBottom: 24,
        }}
      >
        See exactly what gets automated live.
      </p>
      <button
        type="button"
        className="btn-amber"
        onClick={scrollToRegister}
        data-ocid="why.primary_button"
        style={{
          padding: "16px 36px",
          fontSize: "1rem",
          borderRadius: 10,
          border: "none",
          cursor: "pointer",
          transition: "filter 0.3s ease, transform 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform =
            "scale(1.05)";
          (e.currentTarget as HTMLButtonElement).style.filter =
            "brightness(1.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
        }}
      >
        Explore the Full Session →
      </button>
      <p
        style={{
          color: "rgba(255,255,255,0.4)",
          fontSize: "0.82rem",
          marginTop: 14,
        }}
      >
        200 seats · April 12 · 7 PM IST · \u20b9196
      </p>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────
export default function WhyThisMattersSection() {
  return (
    <section
      style={{
        background: "#001a3d",
        color: "#ffffff",
        fontFamily: "'Plus Jakarta Sans', 'Satoshi', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SectionOpener />
      <ComparisonColumns />
      <AhaMomentBox />
      <LiveAutomationDemo />
      <IndustryGrid />
      <PatternRevealBox />
      <CounterRow />
      <MicDropLine />
      <MiniCTA />
    </section>
  );
}
