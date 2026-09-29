"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/navigation";

type Props = {
  className?: string;
  /** Dark cinematic chrome (header). */
  variant?: "light" | "dark";
};

export function BrandLogo({ className = "", variant = "dark" }: Props) {
  const t = useTranslations("Header");
  const isDark = variant === "dark";

  return (
    <Link
      href="/"
      className={`group flex shrink-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-xl p-1.5 ${
          isDark
            ? "border border-gold/25 bg-white shadow-sm"
            : "bg-transparent"
        }`}
      >
        <Image
          src={siteConfig.logos.markPng}
          alt=""
          width={52}
          height={52}
          priority
          unoptimized
          className="h-10 w-auto sm:h-11"
        />
      </span>      <span className="flex flex-col">
        <span className="flex items-center gap-1.5">
          <span
            className={`text-lg font-black tracking-widest ${
              isDark ? "text-white" : "text-navy"
            }`}
          >
            M<span className="text-gold">2</span>B
          </span>
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-gold"
            aria-hidden="true"
          />
        </span>
        <span
          className={`text-[9px] font-semibold tracking-[0.16em] uppercase ${
            isDark ? "text-blue-200/60" : "text-navy/70"
          }`}
        >
          {t("brandTagline")}
        </span>
      </span>
      <span className="sr-only">{siteConfig.name}</span>
    </Link>
  );
}
