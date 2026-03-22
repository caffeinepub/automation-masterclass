export default function CloudBackground({
  className = "",
}: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        aria-hidden="true"
        className="cloud-drift-1 absolute"
        style={{ top: "8%", left: "-5%", opacity: 0.15, width: 280 }}
        viewBox="0 0 280 100"
        fill="#93C5FD"
      >
        <ellipse cx="120" cy="60" rx="120" ry="40" />
        <ellipse cx="160" cy="45" rx="80" ry="35" />
        <ellipse cx="80" cy="50" rx="70" ry="30" />
      </svg>

      <svg
        aria-hidden="true"
        className="cloud-drift-2 absolute"
        style={{ top: "30%", right: "-4%", opacity: 0.12, width: 220 }}
        viewBox="0 0 220 80"
        fill="#BFDBFE"
      >
        <ellipse cx="90" cy="50" rx="90" ry="30" />
        <ellipse cx="130" cy="38" rx="60" ry="28" />
        <ellipse cx="55" cy="42" rx="55" ry="22" />
      </svg>

      <svg
        aria-hidden="true"
        className="cloud-drift-3 absolute"
        style={{ bottom: "10%", left: "15%", opacity: 0.1, width: 180 }}
        viewBox="0 0 180 70"
        fill="#DBEAFE"
      >
        <ellipse cx="75" cy="45" rx="75" ry="25" />
        <ellipse cx="110" cy="33" rx="50" ry="22" />
        <ellipse cx="45" cy="38" rx="45" ry="18" />
      </svg>
    </div>
  );
}
