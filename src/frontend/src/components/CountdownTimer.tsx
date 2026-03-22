import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  // April 12 2026, 7:00 PM IST = UTC 13:30
  const target = new Date("2026-04-12T13:30:00Z");
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "DAYS", value: time.days },
    { label: "HOURS", value: time.hours },
    { label: "MINUTES", value: time.minutes },
    { label: "SECONDS", value: time.seconds },
  ];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center"
              style={{
                background: "white",
                border: "1.5px solid #DBEAFE",
                boxShadow: "0 2px 10px rgba(30,64,175,0.08)",
              }}
            >
              <span
                className="text-2xl font-extrabold tabular-nums"
                style={{ color: "#1E40AF" }}
              >
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span
              className="text-xs mt-1 tracking-widest font-bold"
              style={{ color: "#64748B" }}
            >
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              className="text-xl font-bold mb-5"
              style={{ color: "#1E40AF" }}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
