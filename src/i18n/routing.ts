import { defineRouting } from "next-intl/routing";

export const locales = ["en", "so", "ar"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
});

export function isRtlLocale(locale: string): boolean {
  return locale === "ar";
}
