import { motion, useInView } from "motion/react";
import { useRef } from "react";

const TECHS = [
  {
    name: "UiPath RPA",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="12" fill="oklch(0.95 0.04 240)" />
        <rect
          x="8"
          y="14"
          width="32"
          height="5"
          rx="2.5"
          fill="oklch(0.50 0.15 245)"
        />
        <rect
          x="8"
          y="22"
          width="24"
          height="4"
          rx="2"
          fill="oklch(0.65 0.14 230)"
          opacity="0.8"
        />
        <rect
          x="8"
          y="29"
          width="18"
          height="4"
          rx="2"
          fill="oklch(0.65 0.14 230)"
          opacity="0.5"
        />
        <circle cx="38" cy="34" r="6" fill="oklch(0.50 0.15 245)" />
        <path
          d="M35.5 34l2 2 3-3"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    tagline: "Robotic Process Automation",
    description:
      "Automates repetitive UI-based tasks on any application — with or without APIs. Mimics human keystrokes, mouse clicks, and screen reading.",
    capabilities: [
      "Legacy system automation (no API needed)",
      "Invoice & data entry processing",
      "Multi-application workflows",
      "Runs 24/7 without breaks",
    ],
    color: "oklch(0.50 0.15 245)",
    lightColor: "oklch(0.94 0.04 245)",
  },
  {
    name: "N8N",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="12" fill="oklch(0.95 0.06 150)" />
        <circle cx="12" cy="24" r="4" fill="oklch(0.55 0.18 155)" />
        <circle cx="24" cy="14" r="4" fill="oklch(0.55 0.18 155)" />
        <circle cx="36" cy="24" r="4" fill="oklch(0.55 0.18 155)" />
        <circle cx="24" cy="34" r="4" fill="oklch(0.55 0.18 155)" />
        <line
          x1="16"
          y1="24"
          x2="20"
          y2="18"
          stroke="oklch(0.55 0.18 155)"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="28"
          y1="18"
          x2="32"
          y2="22"
          stroke="oklch(0.55 0.18 155)"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="32"
          y1="26"
          x2="28"
          y2="30"
          stroke="oklch(0.55 0.18 155)"
          strokeWidth="1.5"
          opacity="0.6"
        />
        <line
          x1="20"
          y1="30"
          x2="16"
          y2="26"
          stroke="oklch(0.55 0.18 155)"
          strokeWidth="1.5"
          opacity="0.6"
        />
      </svg>
    ),
    tagline: "Visual Workflow Automation",
    description:
      "Connect any apps and services with a visual drag-and-drop editor. Zero code required. Trigger workflows automatically when events happen.",
    capabilities: [
      "Connect 400+ apps and services",
      "Zero-code visual editor",
      "Real-time event triggers",
      "Custom logic with conditions",
    ],
    color: "oklch(0.55 0.18 155)",
    lightColor: "oklch(0.94 0.05 150)",
  },
  {
    name: "Agentic AI",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        className="w-12 h-12"
        aria-hidden="true"
      >
        <rect width="48" height="48" rx="12" fill="oklch(0.94 0.06 290)" />
        <circle
          cx="24"
          cy="20"
          r="7"
          stroke="oklch(0.52 0.18 290)"
          strokeWidth="1.5"
          fill="oklch(0.90 0.06 290)"
        />
        <path
          d="M24 13v-3M24 30v3M17 20h-3M34 20h3"
          stroke="oklch(0.52 0.18 290)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="20" r="2.5" fill="oklch(0.52 0.18 290)" />
        <path
          d="M18 35c0-3.3 2.7-6 6-6s6 2.7 6 6"
          stroke="oklch(0.52 0.18 290)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
    tagline: "Autonomous AI Decision-Making",
    description:
      "AI agents that don't just respond — they plan, decide, and act. They break complex goals into steps and execute them independently.",
    capabilities: [
      "Multi-step goal execution",
      "Dynamic decision-making",
      "Human-in-the-loop control",
      "Works with any LLM",
    ],
    color: "oklch(0.52 0.18 290)",
    lightColor: "oklch(0.94 0.05 290)",
  },
];

export default function TechStackSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 px-4" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="eyebrow-mark justify-center mb-3">
            The Technology Stack
          </p>
          <h2
            className="font-display text-3xl md:text-4xl font-bold uppercase"
            style={{ color: "oklch(0.22 0.05 255)" }}
          >
            Three tools.{" "}
            <span style={{ color: "oklch(0.50 0.15 245)" }}>
              Infinite automation.
            </span>
          </h2>
          <p
            className="mt-4 font-body text-base max-w-xl mx-auto"
            style={{ color: "oklch(0.42 0.05 240)" }}
          >
            Watch all three work together live — in a single seamless workflow
            built from scratch during the session.
          </p>
        </motion.div>

        {/* Cards + connector arrows */}
        <div className="relative flex flex-col md:flex-row gap-6 md:gap-0 items-stretch">
          {TECHS.map((tech, i) => (
            <div
              key={tech.name}
              className="flex md:flex-row items-center flex-1"
            >
              <motion.div
                className="tech-card flex-1 p-7"
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                data-ocid={`techstack.item.${i + 1}`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div>{tech.icon}</div>
                  <div>
                    <h3
                      className="font-display text-lg font-bold"
                      style={{ color: tech.color }}
                    >
                      {tech.name}
                    </h3>
                    <p
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: "oklch(0.62 0.05 235)" }}
                    >
                      {tech.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p
                  className="font-body text-sm leading-relaxed mb-5"
                  style={{ color: "oklch(0.40 0.05 240)" }}
                >
                  {tech.description}
                </p>

                {/* Capabilities */}
                <ul className="space-y-2">
                  {tech.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-center gap-2 text-sm font-body"
                      style={{ color: "oklch(0.42 0.05 240)" }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: tech.color }}
                      />
                      {cap}
                    </li>
                  ))}
                </ul>

                {/* Footer badge */}
                <div
                  className="mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ background: tech.lightColor, color: tech.color }}
                >
                  Live demo on April 12
                </div>
              </motion.div>

              {/* Connector arrow between cards */}
              {i < TECHS.length - 1 && (
                <div className="hidden md:flex flex-col items-center justify-center w-12 flex-shrink-0">
                  <svg
                    viewBox="0 0 40 24"
                    className="w-10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 12h28M28 6l8 6-8 6"
                      stroke="oklch(0.65 0.14 230)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-xs text-center font-body mt-1"
                    style={{ color: "oklch(0.65 0.05 235)" }}
                  >
                    feeds
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Combined power callout */}
        <motion.div
          className="mt-10 p-6 rounded-2xl text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.95 0.04 245), oklch(0.96 0.03 240))",
            border: "1.5px solid oklch(0.88 0.05 240)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p
            className="font-display text-base md:text-lg font-semibold"
            style={{ color: "oklch(0.28 0.08 248)" }}
          >
            🔗 Combined Power: UiPath handles the screens → N8N orchestrates the
            flow → AI makes the decisions.
            <span style={{ color: "oklch(0.50 0.15 245)" }}>
              {" "}
              One chain. Fully automated.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
