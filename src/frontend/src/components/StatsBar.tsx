import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 1200, suffix: "+", label: "Businesses Served" },
  { value: 40, suffix: "+", label: "Industries Covered" },
  { value: 196, prefix: "₹", suffix: "", label: "Investment Today" },
  { value: 90, suffix: " Min", label: "Live Session" },
];

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  active,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCurrent(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [active, value]);

  return (
    <span
      className="font-display text-3xl md:text-4xl font-bold"
      style={{ color: "oklch(0.50 0.15 245)" }}
    >
      {prefix}
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="stats-bar py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center px-6"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                borderRight:
                  i < STATS.length - 1
                    ? "1px solid oklch(0.90 0.04 240)"
                    : "none",
              }}
              data-ocid={`stats.item.${i + 1}`}
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                active={isInView}
              />
              <p
                className="text-sm font-body mt-1"
                style={{ color: "oklch(0.55 0.05 240)" }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
