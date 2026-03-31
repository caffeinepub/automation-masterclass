import { Toaster } from "@/components/ui/sonner";
import {
  Bot,
  Brain,
  CheckCircle2,
  Clock,
  Cloud,
  Database,
  GitBranch,
  Link2Off,
  Menu,
  MousePointer2,
  RefreshCw,
  Shield,
  Ticket,
  TrendingDown,
  Users,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import BeforeAfterTable from "./components/BeforeAfterTable";
import CloudBackground from "./components/CloudBackground";
import CountdownTimer from "./components/CountdownTimer";
import HeroPipeline from "./components/HeroPipeline";
import IsometricDiagram from "./components/IsometricDiagram";
import LiveAutomationFeed from "./components/LiveAutomationFeed";
import TechOrbit from "./components/TechOrbit";
import WorkflowAnimation from "./components/WorkflowAnimation";
import { useRegister, useRemainingSeats } from "./hooks/useQueries";

const RAZORPAY_URL = "https://rzp.io/rzp/automationwebinar";

// ── helpers ──────────────────────────────────────────────────────────────
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

function useStickyBarHide() {
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const el = document.getElementById("register");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setHide(e.isIntersecting), {
      threshold: 0.05,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return hide;
}

function scrollToRegister() {
  document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
}

// ═══════════════════════════════════════════════════════════
// NAVBAR  (mobile-first: CTA left · date center · logo right)
// ═══════════════════════════════════════════════════════════
function Navbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "The Problem", href: "#problem" },
    { label: "What We Build", href: "#build" },
    { label: "Speakers", href: "#speakers" },
    { label: "Register", href: "#register" },
  ];

  return (
    <>
      <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
        {/* ── Mobile bar ── */}
        <div className="md:hidden h-14 flex items-center justify-between px-3 gap-2">
          {/* LEFT: Register CTA */}
          <button
            type="button"
            onClick={scrollToRegister}
            className="btn-amber flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-extrabold min-h-[44px]"
            data-ocid="nav.primary_button"
          >
            Register &#8377;196
          </button>

          {/* CENTER: date pill */}
          <span
            className="flex-1 text-center text-xs font-semibold px-2 py-1.5 rounded-full truncate hidden xs:block"
            style={{ background: "rgba(30,64,175,0.1)", color: "#1E40AF" }}
          >
            📅 Apr 12 · 7 PM IST
          </span>

          {/* RIGHT: logo + hamburger */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="https://caait.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.link"
              aria-label="Visit CAA IT official website"
            >
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-21-at-7.16.28-PM-1.jpeg"
                alt="CAA IT"
                className="h-9 w-auto object-contain rounded"
              />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="p-2 rounded-lg min-h-[44px] min-w-[44px] flex items-center justify-center"
              style={{ background: "rgba(30,64,175,0.07)", color: "#1E40AF" }}
              aria-label={open ? "Close menu" : "Open menu"}
              data-ocid="nav.toggle"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Desktop bar ── */}
        <div className="hidden md:flex h-16 items-center justify-between px-8 max-w-7xl mx-auto">
          {/* LEFT: Register CTA */}
          <button
            type="button"
            onClick={scrollToRegister}
            className="btn-amber px-5 py-2.5 rounded-lg text-sm font-bold min-h-[44px]"
            data-ocid="nav.primary_button"
            style={{ boxShadow: "0 0 16px rgba(245,158,11,0.35)" }}
          >
            Register Now · ₹196
          </button>

          {/* CENTER: nav links */}
          <div className="flex items-center gap-6">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-semibold transition-colors hover:text-blue-600"
                style={{ color: "#334155" }}
                data-ocid="nav.link"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* RIGHT: Logo + website link */}
          <a
            href="https://caait.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl"
            style={{
              background: "rgba(30,64,175,0.05)",
              border: "1px solid rgba(191,219,254,0.6)",
              boxShadow: "0 0 14px rgba(30,64,175,0.08)",
            }}
            data-ocid="nav.link"
          >
            <img
              src="/assets/uploads/WhatsApp-Image-2026-03-21-at-7.16.28-PM-1.jpeg"
              alt="CAA IT"
              className="h-9 w-auto object-contain rounded"
            />
            <span
              className="text-xs font-semibold"
              style={{ color: "#1E40AF" }}
            >
              &#8599; Visit our official website
            </span>
          </a>
        </div>

        {/* ── Mobile drawer ── */}
        {open && (
          <div
            className="nav-drawer md:hidden px-4 pb-4 pt-2 border-t"
            style={{
              background: "rgba(248,252,255,0.97)",
              borderColor: "rgba(191,219,254,0.6)",
            }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold"
                  style={{
                    color: "#1E40AF",
                    background: "rgba(30,64,175,0.05)",
                  }}
                  data-ocid="nav.link"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://caait.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl text-sm font-semibold mt-1"
                style={{ color: "#64748B" }}
              >
                &#8599; Visit our official IT website
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 1 - HERO
// ═══════════════════════════════════════════════════════════
const HERO_WORDS = [
  { word: "When", accent: false },
  { word: "AI", accent: true },
  { word: "Stops", accent: false },
  { word: "Real", accent: false },
  { word: "Automation", accent: true },
  { word: "Begins.", accent: false },
];

function HeroSection() {
  const { data: seats } = useRemainingSeats();
  const seatsLeft = seats ? Number(seats) : 43;
  return (
    <section
      className="pt-20 pb-16 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, #E8F4FD 0%, #C9E8F8 50%, #EEF7FE 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <CloudBackground />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: content */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ background: "rgba(30,64,175,0.9)", color: "white" }}
            >
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              Live Webinar · April 12, 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold leading-tight mb-6">
              {HERO_WORDS.map(({ word, accent }, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className={`inline-block mr-3 ${accent ? "grad-text" : ""}`}
                  style={accent ? {} : { color: "#0F172A" }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-lg sm:text-xl mb-8 leading-relaxed"
              style={{ color: "#334155" }}
            >
              No API? No problem.
              <br />
              If you can think it logically, step by step:
              <br />
              <strong style={{ color: "#0F172A" }}>
                we will automate it. Every time.
              </strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              className="flex flex-col gap-3 mb-8"
            >
              {[
                {
                  emoji: "📅",
                  text: "Sunday, April 12 · 7:00 PM IST · Live on Zoom",
                },
                {
                  emoji: "🎫",
                  text: `₹196 only · ${seatsLeft} seats left · First come, first served`,
                },
                {
                  emoji: "🎙️",
                  text: "Voice only by choice",
                },
                {
                  emoji: "🌍",
                  text: "Open globally · No course selling",
                },
              ].map((b) => (
                <span
                  key={b.text}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold w-fit sky-card"
                  style={{
                    color: "#1E3A5F",
                    border: "1.5px solid rgba(191,219,254,0.8)",
                  }}
                >
                  {b.emoji} {b.text}
                </span>
              ))}
            </motion.div>

            <div className="mb-8">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "#1E40AF" }}
              >
                Session starts in:
              </p>
              <CountdownTimer />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <button
                onClick={scrollToRegister}
                type="button"
                className="btn-amber w-full md:w-auto px-8 py-4 rounded-xl text-lg font-extrabold min-h-[56px]"
                data-ocid="hero.primary_button"
              >
                Reserve My Seat · ₹196 →
              </button>
              <p className="text-sm mt-3" style={{ color: "#64748B" }}>
                Instant confirmation via email + WhatsApp within 2 minutes of
                payment.
              </p>
            </motion.div>
          </div>

          {/* Right: Live Automation Feed + pipeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex flex-col gap-4 mt-6 lg:mt-0"
          >
            <LiveAutomationFeed />
            <div
              className="rounded-2xl p-5"
              style={{
                background: "rgba(248,252,255,0.85)",
                border: "1.5px solid rgba(191,219,254,0.7)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 30px rgba(30,64,175,0.07)",
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2"
                style={{ color: "#1E40AF" }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block"
                  style={{ boxShadow: "0 0 6px rgba(245,158,11,0.7)" }}
                />
                Live Automation Pipeline
              </p>
              <HeroPipeline />
              <p
                className="text-xs text-right mt-2"
                style={{ color: "#94A3B8" }}
              >
                example
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 2 - THE PROBLEM
// ═══════════════════════════════════════════════════════════
const PROBLEM_CARDS = [
  {
    Icon: Link2Off,
    badge: "No API",
    title: "Legacy systems with no API",
    body: "Your ERP from 2015. Your government portal. Your custom dashboard that cannot be integrated. AI tools stop here. We don't.",
  },
  {
    Icon: RefreshCw,
    badge: "Manual Loop",
    title: "Repetitive tasks done manually",
    body: "Invoice processing. Report generation. Data entry. Copy-paste between 6 systems. 3 hours a day. Every day. Forever.",
  },
  {
    Icon: MousePointer2,
    badge: "Screen-Only",
    title: "Processes that need a screen, not code",
    body: "If a human can do it on a screen a bot can do it faster. Without breaks. Without errors. Without salary.",
  },
];

function ProblemSection() {
  const titleRef = useReveal();
  const card0 = useReveal();
  const card1 = useReveal();
  const card2 = useReveal();
  const cardRefs = [card0, card1, card2];
  const tableRef = useReveal();
  const closingRef = useReveal();

  return (
    <section
      id="problem"
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: "#F8FCFF" }}
    >
      <CloudBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="reveal mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(30,64,175,0.1)",
              color: "#1E40AF",
              border: "1px solid rgba(30,64,175,0.2)",
            }}
          >
            The Gap Nobody Talks About
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display font-extrabold"
            style={{ color: "#0F172A" }}
          >
            AI can&apos;t do everything.
            <br />
            <span className="grad-text">
              Here&apos;s what it can&apos;t touch.
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {PROBLEM_CARDS.map(({ Icon, badge, title, body }, i) => (
            <div
              key={title}
              ref={cardRefs[i]}
              className={`reveal reveal-delay-${i + 1} card-lift sky-card rounded-2xl p-6`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "#EFF6FF" }}
              >
                <Icon size={22} style={{ color: "#1E40AF" }} />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-red-500 mb-2">
                ⛔ {badge}
              </span>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "#0F172A" }}
              >
                {title}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: "#475569" }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Before/After Table */}
        <div ref={tableRef} className="reveal mb-10">
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4 text-center"
            style={{ color: "#1E40AF" }}
          >
            The Real Cost of Doing It Manually
          </p>
          <BeforeAfterTable />
        </div>

        <div
          ref={closingRef}
          className="reveal sky-card rounded-2xl p-6 sm:p-8 text-center text-lg sm:text-xl font-semibold"
          style={{ borderLeft: "4px solid #F59E0B", color: "#0F172A" }}
        >
          &#8220;These aren&apos;t edge cases. This is{" "}
          <strong className="grad-text">70% of how businesses</strong> across
          India and the world still operate.&#8221;
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 3 - WHAT WE BUILD LIVE
// ═══════════════════════════════════════════════════════════
const LIVE_ITEMS = [
  {
    num: "01",
    title: "Live UiPath bot: built from scratch in front of you.",
    body: "We automate a real invoice or data entry process. Live. On screen. You watch every single step.",
    badge: "",
  },
  {
    num: "02",
    title: "Logic workflow: connecting 4 systems in real time.",
    body: "Zero code. Triggered live. Runs automatically the moment we switch it on.",
    badge: "Workflow automation · no coding required",
  },
  {
    num: "03",
    title: "Live Q&A: one real process from the audience.",
    body: "Describe your manual task in the chat. We map the full automation approach live on screen for everyone to see.",
    badge: "",
  },
];

function WhatWeBuildSection() {
  const titleRef = useReveal();
  const item0 = useReveal();
  const item1 = useReveal();
  const item2 = useReveal();
  const itemRefs = [item0, item1, item2];
  const calloutRef = useReveal();
  const flowRef = useReveal();

  return (
    <section
      id="build"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #E8F4FD 0%, #D6EDFB 100%)",
      }}
    >
      <CloudBackground />
      <div className="max-w-6xl mx-auto relative z-10">
        <div ref={titleRef} className="reveal mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(30,64,175,0.1)",
              color: "#1E40AF",
              border: "1px solid rgba(30,64,175,0.2)",
            }}
          >
            Live on April 12 &middot; 7 PM IST
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display font-extrabold"
            style={{ color: "#0F172A" }}
          >
            Not slides. Not theory.
            <br />
            <span className="grad-text">This is what we build live.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Steps */}
          <div className="flex flex-col gap-6">
            {LIVE_ITEMS.map(({ num, title, body, badge }, i) => (
              <div
                key={num}
                ref={itemRefs[i]}
                className={`reveal reveal-delay-${i + 1} flex gap-5 sky-card rounded-2xl p-6`}
              >
                <span
                  className="text-5xl font-extrabold leading-none flex-shrink-0 mt-1 select-none"
                  style={{ color: "#BFDBFE" }}
                >
                  {num}
                </span>
                <div>
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: "#0F172A" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="text-base leading-relaxed mb-3"
                    style={{ color: "#475569" }}
                  >
                    {body}
                  </p>
                  {badge && (
                    <span
                      className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                      style={{
                        background: "#EFF6FF",
                        color: "#1E40AF",
                        border: "1px solid #BFDBFE",
                      }}
                    >
                      {badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Animated workflow diagram */}
          <div ref={flowRef} className="reveal reveal-delay-2">
            <div className="sky-card rounded-2xl p-6">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-5 text-center"
                style={{ color: "#1E40AF" }}
              >
                📊 Live Decision Flow
              </p>
              <WorkflowAnimation />
            </div>
          </div>
        </div>

        {/* 3D Isometric Automation Diagram */}
        <div className="reveal mt-6">
          <div className="sky-card rounded-2xl p-6">
            <IsometricDiagram />
          </div>
        </div>

        <div
          ref={calloutRef}
          className="reveal sky-card rounded-2xl p-6 sm:p-8 text-center mt-4"
        >
          <p
            className="text-base sm:text-lg italic leading-relaxed"
            style={{ color: "#334155" }}
          >
            &#8220;This session is unrecorded. When it ends, this knowledge
            lives only in the people who were in this room.{" "}
            <strong style={{ color: "#0F172A" }}>
              That is exactly the point.
            </strong>
            &#8221;
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 4 - SPEAKERS
// ═══════════════════════════════════════════════════════════
function SpeakersSection() {
  const titleRef = useReveal();
  const card1 = useReveal();
  const card2 = useReveal();
  return (
    <section
      id="speakers"
      className="py-20 px-6"
      style={{ background: "#F8FCFF" }}
    >
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="reveal mb-12">
          <h2
            className="text-3xl sm:text-4xl font-display font-extrabold"
            style={{ color: "#0F172A" }}
          >
            The people <span className="grad-text">behind this session.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div
            ref={card1}
            className="reveal sky-card rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <img
              src="/assets/uploads/Parth-Speaker-photo-2.png"
              alt="Parth Kanodia"
              className="w-28 h-28 rounded-2xl object-cover mb-5 shadow-md"
              style={{ border: "2px solid #BFDBFE" }}
            />
            <h3
              className="text-xl font-extrabold mb-1"
              style={{ color: "#0F172A" }}
            >
              Parth Kanodia
            </h3>
            <p
              className="text-sm font-semibold mb-4"
              style={{ color: "#1E40AF" }}
            >
              Concept Creator
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "#475569" }}
            >
              An entrepreneur at heart, wired to spot what others overlook.
              Parth brings a rare blend of business psychology, marketing
              instinct, and the relentless ability to identify market gaps
              before they become obvious. He doesn&apos;t just build businesses.
              He architects thinking systems.
            </p>
          </div>

          <div
            ref={card2}
            className="reveal reveal-delay-2 sky-card rounded-2xl overflow-hidden"
          >
            <img
              src="/assets/uploads/automation_mahashri-019d308f-de00-7758-b7b6-f6ce8877e7c6-1.png"
              alt="The Automation Maharishi"
              className="w-full h-52 object-cover object-top"
            />
            <div className="p-8 text-center flex flex-col items-center">
              <h3
                className="text-2xl font-extrabold mb-4"
                style={{ color: "#0F172A" }}
              >
                The Automation Maharishi
              </h3>
              <div
                className="text-base leading-relaxed mb-5 text-left w-full"
                style={{ color: "#334155" }}
              >
                <p
                  className="mb-3 italic font-medium text-center"
                  style={{ color: "#1E40AF" }}
                >
                  When your IT team says
                  <br />
                  <span className="font-bold text-gray-800">
                    "this can't be automated"
                  </span>
                  <br />
                  he already has a bot running it.
                </p>
                <p className="mb-3">
                  30+ years building automation systems across banking,
                  logistics, healthcare, manufacturing, and enterprise
                  operations.
                </p>
                <p className="mb-3">
                  He won't show his face.
                  <br />
                  But on April 12 he will show you exactly what your business is
                  missing.
                </p>
                <p className="font-semibold" style={{ color: "#1E40AF" }}>
                  Joining live · voice only by choice
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-1">
                <span
                  className="inline-block text-xs font-bold px-4 py-2 rounded-full"
                  style={{
                    background: "#DCFCE7",
                    color: "#166534",
                    border: "2px solid #22C55E",
                    boxShadow: "0 0 8px rgba(34,197,94,0.4)",
                  }}
                >
                  ✅ No Course Selling
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 5 - WHO THIS IS FOR
// ═══════════════════════════════════════════════════════════
const FOR_ITEMS = [
  "You run a business with repetitive processes draining your team's time: store, agency, CA firm, startup, any industry, any country.",
  'You work in operations or IT and deal with legacy systems that "can\'t be automated."',
  "You want to see how RPA and Agentic AI actually work: not in theory, but live in front of you.",
  "You're based anywhere in the world: India, UAE, UK, US, Singapore, or anywhere else.",
  "You want a practical advantage your competitors haven't figured out yet.",
];
const NOT_FOR_ITEMS = [
  'People looking for a recorded course they\'ll watch "later."',
  "People not willing to think about their own processes.",
];

function WhoItIsForSection() {
  const titleRef = useReveal();
  const notRef = useReveal();
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #E8F4FD 0%, #D6EDFB 100%)",
      }}
    >
      <CloudBackground />
      <div className="max-w-3xl mx-auto relative z-10">
        <div ref={titleRef} className="reveal mb-10">
          <h2
            className="text-3xl sm:text-4xl font-display font-extrabold"
            style={{ color: "#0F172A" }}
          >
            This session is <span className="grad-text">for you if —</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 mb-10">
          {FOR_ITEMS.map((item) => (
            <div
              key={item.slice(0, 30)}
              className="flex items-start gap-4 sky-card rounded-2xl p-5"
            >
              <CheckCircle2
                size={22}
                className="flex-shrink-0 mt-0.5"
                style={{ color: "#1E40AF" }}
              />
              <p
                className="text-base leading-relaxed"
                style={{ color: "#0F172A" }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
        <hr style={{ borderColor: "#BFDBFE", marginBottom: "2rem" }} />
        <div
          ref={notRef}
          className="reveal rounded-2xl p-6"
          style={{ background: "#FFF7F7", border: "1.5px solid #FECACA" }}
        >
          <p
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{ color: "#DC2626" }}
          >
            Not for
          </p>
          {NOT_FOR_ITEMS.map((item) => (
            <div key={item} className="flex items-start gap-3 mb-3">
              <XCircle
                size={20}
                className="flex-shrink-0 mt-0.5"
                style={{ color: "#DC2626" }}
              />
              <p className="text-base" style={{ color: "#7F1D1D" }}>
                {item}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-6" style={{ color: "#64748B" }}>
          There is no replay. This session ends and it is gone.{" "}
          <strong>Forever.</strong>
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 6 - FOMO
// ═══════════════════════════════════════════════════════════
const FOMO_CARDS = [
  {
    Icon: Clock,
    border: "#F59E0B",
    bg: "rgba(255,251,235,0.8)",
    title: "No recording. No replay. No second session.",
    body: "What you learn stays only with the people in that room.",
  },
  {
    Icon: Ticket,
    border: "#1E40AF",
    bg: "rgba(239,246,255,0.8)",
    title: "Seats are first come, first served.",
    body: "When capacity is hit, registration closes. No exceptions.",
  },
  {
    Icon: Zap,
    border: "#DC2626",
    bg: "rgba(255,245,245,0.8)",
    title: "₹196 today.",
    body: "After this session, the same knowledge is individual consulting at ₹5,000/hr. This is the only time at this price.",
  },
];

function FOMOSection() {
  const titleRef = useReveal();
  const c0 = useReveal();
  const c1 = useReveal();
  const c2 = useReveal();
  const cardRefs = [c0, c1, c2];
  return (
    <section className="py-20 px-6" style={{ background: "#F8FCFF" }}>
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="reveal mb-12 text-center">
          <h2
            className="text-3xl sm:text-4xl font-display font-extrabold"
            style={{ color: "#1E3A5F" }}
          >
            This session happens once.
            <br />
            <span className="grad-text">Then it&apos;s gone.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-6 mb-12">
          {FOMO_CARDS.map(({ Icon, border, bg, title, body }, i) => (
            <div
              key={title}
              ref={cardRefs[i]}
              className={`reveal reveal-delay-${i + 1} rounded-2xl p-6 flex items-start gap-5 card-lift`}
              style={{
                background: bg,
                border: "1.5px solid rgba(191,219,254,0.6)",
                borderLeft: `4px solid ${border}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "white", border: `1.5px solid ${border}` }}
              >
                <Icon size={20} style={{ color: border }} />
              </div>
              <div>
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: "#0F172A" }}
                >
                  {title}
                </h3>
                <p className="text-base" style={{ color: "#475569" }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={scrollToRegister}
            type="button"
            className="btn-amber w-full md:w-auto px-10 py-4 rounded-xl text-lg font-extrabold min-h-[56px]"
            data-ocid="fomo.primary_button"
          >
            Secure My Seat · ₹196 →
          </button>
          <p className="text-sm mt-3" style={{ color: "#64748B" }}>
            Attendees joining from India, UAE, UK, USA, Singapore, Australia and
            20+ countries.
            <br />
            April 12 &middot; 7:00 PM IST
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 7 - REGISTRATION
// ═══════════════════════════════════════════════════════════
function RegistrationSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutateAsync: register, isPending } = useRegister();
  const { data: seats } = useRemainingSeats();

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!consent) e.consent = "You must consent before proceeding.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    try {
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        country: form.city.trim() || "Global",
      });
      toast.success("Registration saved! Redirecting to payment...");
      setTimeout(() => window.open(RAZORPAY_URL, "_blank"), 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.toLowerCase().includes("already")) {
        toast.error(
          "This email is already registered. Please check your inbox.",
        );
      } else {
        toast.success("Redirecting to payment...");
        window.open(RAZORPAY_URL, "_blank");
      }
    }
  }

  const inputStyle = (field: string) => ({
    border: errors[field] ? "1.5px solid #DC2626" : "1.5px solid #BFDBFE",
    background: "#F8FCFF",
    color: "#0F172A",
    outline: "none",
    width: "100%",
    padding: "12px 16px",
    borderRadius: 12,
    fontSize: 16,
    transition: "border-color 0.2s",
  });

  return (
    <section
      id="register"
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #E8F4FD 0%, #C9E8F8 100%)",
      }}
    >
      <CloudBackground />
      <div className="max-w-xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2
            className="text-3xl sm:text-4xl font-display font-extrabold mb-2"
            style={{ color: "#0F172A" }}
          >
            Reserve your seat.
          </h2>
          <p className="text-xl font-semibold" style={{ color: "#1E40AF" }}>
            Takes 60 seconds.
          </p>
          {seats !== undefined && (
            <p className="text-sm mt-2 font-bold" style={{ color: "#DC2626" }}>
              &#9888; Only {Number(seats)} seats remaining
            </p>
          )}
        </div>

        <div className="mb-6 space-y-3">
          <div className="flex items-start gap-3 rounded-xl border-2 border-amber-400 bg-amber-50 px-5 py-4">
            <span className="text-xl mt-0.5">⚠️</span>
            <p className="text-sm sm:text-base font-bold leading-snug text-amber-900">
              Don&apos;t close, refresh, or open a new tab/window during
              payment. After successful payment via Razorpay, you&apos;ll be
              automatically redirected to our WhatsApp group for updates &amp;
              the Zoom link.
            </p>
          </div>
          <div className="flex items-start gap-3 rounded-xl border-2 border-blue-400 bg-blue-50 px-5 py-4">
            <span className="text-xl mt-0.5">📩</span>
            <p className="text-sm sm:text-base font-bold leading-snug text-blue-900">
              Check your email (Inbox/Spam/Promotions) for confirmation.
            </p>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="sky-card rounded-2xl p-8"
          data-ocid="register.modal"
        >
          {(
            [
              {
                id: "reg-name",
                label: "Full Name *",
                field: "name",
                type: "text",
                auto: "name",
                ph: "Your full name",
              },
              {
                id: "reg-email",
                label: "Email Address *",
                field: "email",
                type: "email",
                auto: "email",
                ph: "you@example.com",
              },
              {
                id: "reg-phone",
                label: "Phone Number (with country code) *",
                field: "phone",
                type: "tel",
                auto: "tel",
                ph: "+91 98765 43210",
              },
              {
                id: "reg-city",
                label: "City (optional)",
                field: "city",
                type: "text",
                auto: "address-level2",
                ph: "e.g. Mumbai, Dubai, London",
              },
            ] as {
              id: string;
              label: string;
              field: keyof typeof form;
              type: string;
              auto: string;
              ph: string;
            }[]
          ).map(({ id, label, field, type, auto, ph }) => (
            <div className="mb-5" key={id}>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: "#0F172A" }}
                htmlFor={id}
              >
                {label}
              </label>
              <input
                id={id}
                type={type}
                autoComplete={auto}
                placeholder={ph}
                value={form[field]}
                onChange={(e) =>
                  setForm((p) => ({ ...p, [field]: e.target.value }))
                }
                style={inputStyle(field)}
                onFocus={(e) => {
                  e.target.style.borderColor = "#1E40AF";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors[field]
                    ? "#DC2626"
                    : "#BFDBFE";
                }}
                data-ocid="register.input"
              />
              {errors[field] && (
                <p
                  className="text-xs text-red-600 mt-1"
                  data-ocid="register.error_state"
                >
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          <div
            className="mb-7 p-4 rounded-xl"
            style={{
              background: "rgba(232,244,253,0.6)",
              border: "1.5px solid #BFDBFE",
            }}
          >
            <label className="flex gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="w-5 h-5 rounded mt-0.5 flex-shrink-0"
                style={{ accentColor: "#1E40AF" }}
                data-ocid="register.checkbox"
              />
              <span
                className="text-sm leading-relaxed"
                style={{ color: "#334155" }}
              >
                I consent to Company Avenue Advisory collecting my name, email,
                phone number, and city to confirm my webinar registration and
                send me event communications and future CAA product or event
                updates. My data will not be sold or transferred to any third
                party. I can withdraw consent at any time by emailing{" "}
                <a
                  href="mailto:connect@caatech.in"
                  className="underline"
                  style={{ color: "#1E40AF" }}
                >
                  connect@caatech.in
                </a>
                .{" "}
                <a
                  href="#privacy"
                  className="underline"
                  style={{ color: "#1E40AF" }}
                >
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.consent && (
              <p
                className="text-xs text-red-600 mt-2"
                data-ocid="register.error_state"
              >
                {errors.consent}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-amber w-full py-4 rounded-xl text-lg font-extrabold min-h-[56px] disabled:opacity-70 disabled:cursor-not-allowed"
            data-ocid="register.submit_button"
          >
            {isPending
              ? "Saving registration..."
              : "Proceed to Payment · ₹196 →"}
          </button>

          <p className="text-sm text-center mt-4" style={{ color: "#64748B" }}>
            Secure payment via Razorpay.
            <br />
            UPI &middot; Cards &middot; Netbanking &middot; Wallets.
            International cards accepted.
          </p>
        </form>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 8 - CREDIBILITY
// ═══════════════════════════════════════════════════════════
const STATS = [
  { target: 1200, suffix: "+", prefix: "", label: "Businesses Served" },
  { target: 19, suffix: "+", prefix: "", label: "Years CA + IT Expertise" },
  { target: 40, suffix: "+", prefix: "", label: "Industries Automated" },
  {
    target: 20,
    suffix: "L",
    prefix: "₹8–20",
    label: "Avg. Annual Savings / Client",
  },
];

function StatBox({
  target,
  suffix,
  prefix,
  label,
}: { target: number; suffix: string; prefix: string; label: string }) {
  const { ref, count } = useCountUp(target);
  return (
    <div ref={ref} className="sky-card rounded-2xl p-6 text-center card-lift">
      <div className="text-3xl sm:text-4xl font-extrabold mb-1 stat-number">
        {prefix || ""}
        {prefix ? "" : count.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm font-semibold" style={{ color: "#64748B" }}>
        {label}
      </div>
    </div>
  );
}

function CredibilitySection() {
  const titleRef = useReveal();
  return (
    <section className="py-20 px-6" style={{ background: "#F8FCFF" }}>
      <div className="max-w-4xl mx-auto">
        <div ref={titleRef} className="reveal mb-12 text-center">
          <h2
            className="text-3xl sm:text-4xl font-display font-extrabold"
            style={{ color: "#0F172A" }}
          >
            The team <span className="grad-text">behind this session.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {STATS.map((s) => (
            <StatBox key={s.label} {...s} />
          ))}
        </div>
        <p
          className="text-center max-w-2xl mx-auto text-base sm:text-lg leading-relaxed"
          style={{ color: "#475569" }}
        >
          This isn&apos;t a startup teaching a concept. This is a practitioner
          firm showing you exactly what we do for clients:{" "}
          <strong style={{ color: "#0F172A" }}>live, in 90 minutes.</strong>
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 9 - CAA SERVICES
// ═══════════════════════════════════════════════════════════
const SERVICES = [
  { Icon: Bot, label: "RPA & Intelligent Automation" },
  { Icon: Brain, label: "AI & Agentic Automation" },
  { Icon: GitBranch, label: "Logic Workflows & Integrations" },
  { Icon: Cloud, label: "Cloud Infrastructure" },
  { Icon: Users, label: "HRMS Implementation" },
  { Icon: Shield, label: "Cybersecurity & Compliance" },
  { Icon: Database, label: "Oracle ERP & SAP S4/HANA" },
  { Icon: TrendingDown, label: "IT Cost Optimization Audits" },
];

function ServicesSection() {
  const titleRef = useReveal();
  const orbitRef = useReveal();

  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(150deg, #E8F4FD 0%, #D6EDFB 100%)",
      }}
    >
      <CloudBackground />
      <div className="max-w-5xl mx-auto relative z-10">
        <div ref={titleRef} className="reveal mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4"
            style={{
              background: "rgba(30,64,175,0.1)",
              color: "#1E40AF",
              border: "1px solid rgba(30,64,175,0.2)",
            }}
          >
            Our Services
          </span>
          <h2
            className="text-3xl sm:text-4xl font-display font-extrabold mb-3"
            style={{ color: "#0F172A" }}
          >
            Everything you&apos;ll see automated tonight —
            <br />
            <span className="grad-text">
              we do this for businesses every day.
            </span>
          </h2>
          <p className="text-base" style={{ color: "#64748B" }}>
            Webinar attendees receive exclusive pricing on all CAA IT services.
            Only for people who attend this live session.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
          {/* Service tiles */}
          <div className="grid grid-cols-2 gap-4">
            {SERVICES.map(({ Icon, label }) => (
              <div
                key={label}
                className="sky-card rounded-xl p-5 flex flex-col items-center text-center gap-3 card-lift cursor-default"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "#EFF6FF" }}
                >
                  <Icon size={20} style={{ color: "#1E40AF" }} />
                </div>
                <p
                  className="text-sm font-semibold leading-snug"
                  style={{ color: "#0F172A" }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Tech orbit */}
          <div ref={orbitRef} className="reveal reveal-delay-2">
            <div className="sky-card rounded-2xl p-6">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4 text-center"
                style={{ color: "#1E40AF" }}
              >
                🚀 Technology Stack
              </p>
              <TechOrbit />
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <a
            href="https://caait.vercel.app/services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base min-h-[44px]"
            style={{
              border: "2px solid #1E40AF",
              color: "#1E40AF",
              background: "white",
            }}
            data-ocid="services.link"
          >
            Browse All 25+ Services &#8594;
          </a>
        </div>

        <p
          className="text-sm text-center max-w-lg mx-auto"
          style={{ color: "#64748B" }}
        >
          Interested in a structured beginner-to-advanced automation programme?
          Let us know at the session: if there&apos;s enough interest,
          we&apos;ll build it at the lowest price in the market.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// SECTION 10 - FINAL CTA
// ═══════════════════════════════════════════════════════════
function FinalCTASection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1E3A8A 0%, #1E40AF 60%, #0369A1 100%)",
      }}
    >
      {/* Subtle cloud silhouettes on dark bg */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          aria-hidden="true"
          className="cloud-drift-1 absolute"
          style={{ top: "5%", right: "5%", opacity: 0.08, width: 300 }}
          viewBox="0 0 280 100"
          fill="white"
        >
          <ellipse cx="120" cy="60" rx="120" ry="40" />
          <ellipse cx="160" cy="45" rx="80" ry="35" />
          <ellipse cx="80" cy="50" rx="70" ry="30" />
        </svg>
        <svg
          aria-hidden="true"
          className="cloud-drift-2 absolute"
          style={{ bottom: "8%", left: "2%", opacity: 0.06, width: 200 }}
          viewBox="0 0 220 80"
          fill="white"
        >
          <ellipse cx="90" cy="50" rx="90" ry="30" />
          <ellipse cx="130" cy="38" rx="60" ry="28" />
        </svg>
      </div>
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2
          className="text-3xl sm:text-5xl font-display font-extrabold mb-8 leading-tight"
          style={{ color: "white" }}
        >
          The seat you don&apos;t book today
          <br />
          <span style={{ color: "#FDE68A" }}>
            someone else is booking right now.
          </span>
        </h2>
        <button
          onClick={scrollToRegister}
          type="button"
          className="btn-amber w-full sm:w-auto px-12 py-5 rounded-2xl text-xl font-extrabold min-h-[60px] mb-6"
          data-ocid="finalcta.primary_button"
        >
          Reserve My Seat · ₹196 →
        </button>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
          April 12 &middot; 7:00 PM IST &middot; Live on Zoom
          <br />
          No recording &middot; No replay &middot; One shot.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════
function Footer() {
  const year = new Date().getFullYear();
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  const utmUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(host)}`;
  return (
    <footer className="py-12 px-6" style={{ background: "#0F172A" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-start gap-10 mb-10">
          <div className="flex-1">
            <a
              href="https://caait.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 mb-4"
            >
              <img
                src="/assets/uploads/WhatsApp-Image-2026-03-21-at-7.16.28-PM-1.jpeg"
                alt="CAA IT"
                className="h-9 w-auto object-contain rounded"
              />
              <span
                className="text-xs font-semibold"
                style={{ color: "#93C5FD" }}
              >
                &#8599; Visit our official IT website
              </span>
            </a>
            <p className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
              Company Avenue Advisory: Bridging expertise with automation.
            </p>
          </div>
          <div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "#64748B" }}
            >
              Contact
            </p>
            <div
              className="flex flex-col gap-2 text-sm"
              style={{ color: "#94A3B8" }}
            >
              <a href="mailto:connect@caatech.in" style={{ color: "#93C5FD" }}>
                connect@caatech.in
              </a>
              <a href="tel:+919319671133" style={{ color: "#93C5FD" }}>
                +91 9319671133
              </a>
              <p>
                209, Jaina Tower 1, District Center,
                <br />
                Janakpuri, New Delhi - 110058
              </p>
            </div>
          </div>
        </div>
        <div
          className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor: "#1E293B", color: "#64748B" }}
        >
          <span>
            &#169; {year} Company Avenue Advisory. All rights reserved. |{" "}
            <a href="#privacy" className="underline hover:text-white">
              Privacy Policy
            </a>
          </span>
          <a
            href={utmUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Built with &#10084;&#65039; using{" "}
            <span className="underline">caffeine.ai</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════
// STICKY MOBILE BAR
// ═══════════════════════════════════════════════════════════
function StickyMobileBar() {
  const hide = useStickyBarHide();
  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 transition-transform duration-300"
      style={{
        background: "#F59E0B",
        boxShadow: "0 -2px 20px rgba(0,0,0,0.15)",
        transform: hide ? "translateY(100%)" : "translateY(0)",
      }}
    >
      <button
        onClick={scrollToRegister}
        type="button"
        className="w-full py-4 rounded-xl text-base font-extrabold min-h-[56px]"
        style={{ color: "#0F172A", background: "transparent" }}
        data-ocid="sticky.primary_button"
      >
        Reserve My Seat · ₹196 →
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// APP ROOT
// ═══════════════════════════════════════════════════════════
export default function App() {
  return (
    <div className="font-body" style={{ color: "#0F172A" }}>
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <WhatWeBuildSection />
        <SpeakersSection />
        <WhoItIsForSection />
        <FOMOSection />
        <RegistrationSection />
        <CredibilitySection />
        <ServicesSection />
        <FinalCTASection />
      </main>
      <Footer />
      <StickyMobileBar />
    </div>
  );
}
