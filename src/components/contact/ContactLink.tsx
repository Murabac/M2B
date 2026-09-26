"use client";

import type { ContactChannel, ContactLocation } from "@/lib/analytics";
import { trackContactClick } from "@/lib/analytics";

type Props = {
  channel: ContactChannel;
  location: ContactLocation;
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

export function ContactLink({
  channel,
  location,
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: Props) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      target={channel === "whatsapp" ? "_blank" : undefined}
      rel={channel === "whatsapp" ? "noopener noreferrer" : undefined}
      onClick={() => trackContactClick(channel, location)}
    >
      {children}
    </a>
  );
}
