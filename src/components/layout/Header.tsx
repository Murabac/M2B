"use client";

import { useEffect, useId, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { IconClose, IconMenu } from "@/components/contact/icons";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Link, usePathname } from "@/i18n/navigation";

/** Design Ref header labels. */
const navItems = [
  { href: "/portfolio", key: "work" as const },
  { href: "/products", key: "products" as const },
  { href: "/services", key: "capabilities" as const },
  { href: "/studio", key: "studio" as const },
  { href: "/contact", key: "contact" as const },
];

export function Header() {
  const t = useTranslations("Header");
  const tNav = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuId = useId();

  if (menuPath !== pathname) {
    setMenuPath(pathname);
    if (open) setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(key: string) {
    if (key === "work") return pathname.startsWith("/portfolio");
    if (key === "products") return pathname.startsWith("/products");
    if (key === "capabilities") return pathname.startsWith("/services");
    if (key === "studio") return pathname.startsWith("/studio");
    if (key === "contact") return pathname.startsWith("/contact");
    return false;
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="border-b border-gold/20 bg-[#06152F]/95 text-white shadow-xl shadow-black/40 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <BrandLogo variant="dark" />

          <nav
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-20 items-center justify-center md:flex"
            aria-label={tNav("mainNavigation")}
          >
            <div className="pointer-events-auto flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const active = isActive(item.key);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                      active
                        ? "bg-white/5 font-bold text-gold"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                    {active ? (
                      <span
                        className="absolute inset-x-3.5 bottom-0 h-[2px] rounded-full bg-gold"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:block">
              <LanguageSwitcher variant="dark" />
            </div>

            <Link
              href="/contact"
              className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] px-5 py-2.5 text-xs font-bold tracking-wider text-slate-950 uppercase shadow-md transition-all hover:shadow-lg hover:shadow-gold/25 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:inline-flex"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{t("startProject")}</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span
                className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0"
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 text-white transition hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? tNav("closeMenu") : tNav("openMenu")}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <IconClose className="h-5 w-5" />
              ) : (
                <IconMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {open ? (
          <div
            id={menuId}
            className="border-t border-slate-800 bg-[#06152F] md:hidden"
          >
            <nav
              className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5 sm:px-6"
              aria-label={tNav("mainNavigation")}
            >
              {navItems.map((item) => {
                const active = isActive(item.key);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-bold transition ${
                      active
                        ? "bg-gold/15 text-gold"
                        : "text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {t(`nav.${item.key}`)}
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </Link>
                );
              })}
              <div className="mt-3 space-y-3 border-t border-slate-800 pt-4 sm:hidden">
                <LanguageSwitcher compact variant="dark" />
              </div>
              <Link
                href="/contact"
                className="mt-2 w-full rounded-xl bg-gold py-3 text-center text-sm font-bold text-slate-950 shadow-md"
              >
                {t("startProject")}
              </Link>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
}
