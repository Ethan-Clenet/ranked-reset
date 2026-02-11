"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  percent: number;
  color: string;
}

export default function ProgressBar({ percent, color }: ProgressBarProps) {
  return (
    <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );
}
