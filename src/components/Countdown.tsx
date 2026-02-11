"use client";

import { useEffect, useState } from "react";
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

interface CountdownProps {
  targetDate: string;
  label: string;
  color?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const now = new Date();
  if (now >= target) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = differenceInDays(target, now);
  const hours = differenceInHours(target, now) % 24;
  const minutes = differenceInMinutes(target, now) % 60;
  const seconds = differenceInSeconds(target, now) % 60;

  return { days, hours, minutes, seconds };
}

export default function Countdown({ targetDate, label, color = "#6366f1" }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate);
    setTimeLeft(getTimeLeft(target));

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex gap-2 items-center">
        <span className="text-xs text-zinc-500 uppercase tracking-wider">{label}</span>
        <div className="flex gap-1">
          {["--", "--", "--", "--"].map((v, i) => (
            <div key={i} className="bg-zinc-800/80 rounded-md px-2 py-1 min-w-[40px] text-center">
              <span className="text-sm font-mono font-bold text-zinc-400">{v}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isOver = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  if (isOver) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 uppercase tracking-wider">{label}</span>
        <span className="text-sm font-bold text-red-400">Terminé</span>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: "j" },
    { value: timeLeft.hours, label: "h" },
    { value: timeLeft.minutes, label: "m" },
    { value: timeLeft.seconds, label: "s" },
  ];

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-zinc-500 uppercase tracking-wider">{label}</span>
      <div className="flex gap-1">
        {units.map((unit, i) => (
          <div
            key={i}
            className="rounded-md px-2 py-1 min-w-[44px] text-center"
            style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
          >
            <span className="text-sm font-mono font-bold" style={{ color }}>
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-zinc-500 ml-0.5">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
