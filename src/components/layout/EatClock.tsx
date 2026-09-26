"use client";

import { useEffect, useState } from "react";

type Props = {
  className?: string;
  showSuffix?: boolean;
};

export function EatClock({ className, showSuffix = true }: Props) {
  const [eatTime, setEatTime] = useState("");

  useEffect(() => {
    const update = () => {
      setEatTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Africa/Mogadishu",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {eatTime || "—:—:—"}
      {showSuffix && eatTime ? " EAT" : null}
    </span>
  );
}
