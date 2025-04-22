
import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { format } from "date-fns";

const SWEDEN_TIMEZONE_OFFSET = 2; // Swedish time is UTC+2 (CEST)

function getSwedishDate() {
  const now = new Date();
  // Get UTC, add Sweden's timezone offset in hours
  const swedenTime = new Date(now.getTime() + (now.getTimezoneOffset() + (SWEDEN_TIMEZONE_OFFSET * -60)) * 60000);
  return swedenTime;
}

function getSwedishTimeString(d: Date) {
  return format(d, "eee, MMM d, yyyy HH:mm");
}

export const TopNavbar: React.FC = () => {
  const [now, setNow] = useState<Date>(getSwedishDate());

  useEffect(() => {
    const interval = setInterval(() => setNow(getSwedishDate()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full z-50 flex items-center px-5 py-2 h-12
      glass-morphism border-b border-gray-200/70 dark:border-black/30
      bg-white/60 dark:bg-[#202442]/60 backdrop-blur-lg"
      style={{
        background: "rgba(255,255,255,0.46)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        WebkitBackdropFilter: "blur(18px)",
        backdropFilter: "blur(18px)"
      }}
    >
      <div className="flex-1 flex items-center">
        <span className="font-semibold text-sm tracking-wide text-gray-700 dark:text-gray-100">
          🍏 Portfolio Desktop
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-100 font-mono text-xs">
        <Clock className="w-4 h-4 mr-1 opacity-70" />
        {getSwedishTimeString(now)}&nbsp;CEST
      </div>
    </div>
  );
};

export default TopNavbar;
