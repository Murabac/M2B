"use client";

import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";

const switcherLocales = locales.filter((code) => code !== "so");

type Props = {
  compact?: boolean;
  /** Matches dark cinematic header chrome. */
  variant?: "light" | "dark";
};

export function LanguageSwitcher({
  compact = false,
  variant = "dark",
}: Props) {
  const t = useTranslations("Language");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const isDark = variant === "dark";

  const other =
    switcherLocales.find((code) => code !== locale) ?? switcherLocales[0];

  if (compact) {
    return (
      <div
        role="group"
        aria-label={t("label")}
        className="inline-flex w-full items-center gap-0.5"
      >
        {switcherLocales.map((code) => {
          const active = code === locale;
          return (
            <button
              key={code}
              type="button"
              aria-pressed={active}
              onClick={() => {
                if (code !== locale) {
                  router.replace(pathname, { locale: code });
                }
              }}
              className={`flex-1 rounded-lg px-2.5 py-2 text-xs font-bold tracking-wide transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                active
                  ? isDark
                    ? "bg-gold text-slate-950"
                    : "bg-navy text-white"
                  : isDark
                    ? "text-slate-300 hover:bg-white/5"
                    : "text-navy-mid hover:bg-background-muted"
              }`}
            >
              <span className="uppercase">{code}</span>
              <span className="sr-only"> — {t(code)}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`${t("label")}: ${t(locale)}. ${t("switchTo")} ${t(other)}`}
      onClick={() => {
        if (other !== locale) {
          router.replace(pathname, { locale: other });
        }
      }}
      className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
        isDark
          ? "border-gold/30 bg-[#081B38] text-slate-200 hover:border-gold"
          : "border-navy/15 bg-[#EEF3F9] text-navy hover:border-navy/40"
      }`}
    >
      <Globe className="h-3.5 w-3.5 text-gold" aria-hidden="true" />
      <span className="uppercase">{locale}</span>
      <span
        className={`text-[10px] ${isDark ? "text-slate-400" : "text-navy/50"}`}
      >
        ({other.toUpperCase()})
      </span>
    </button>
  );
}
