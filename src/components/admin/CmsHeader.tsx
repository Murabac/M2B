"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ExternalLink,
  FileStack,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Layers,
  Menu,
  Plus,
  Settings,
  Wrench,
  X,
} from "lucide-react";
import { useState } from "react";
import { EatClock } from "@/components/layout/EatClock";
import type { CmsNavKey } from "@/components/admin/CmsSidebar";

const titles: Record<CmsNavKey, string> = {
  dashboard: "Operations Command",
  projects: "Projects & Work",
  inquiries: "Inbound Leads / CRM",
  products: "Products Proof Stats",
  studio: "Studio & Leadership",
  settings: "System & Banners",
  services: "Services Catalog",
  content: "Home Content",
};

const mobilePrimary = [
  { key: "dashboard" as const, href: "/admin", icon: LayoutDashboard, label: "Command" },
  { key: "projects" as const, href: "/admin/projects", icon: FolderKanban, label: "Work" },
  { key: "inquiries" as const, href: "/admin/inquiries", icon: Inbox, label: "Leads" },
];

const moreItems = [
  { key: "products" as const, href: "/admin/products", icon: Layers, label: "Products" },
  { key: "services" as const, href: "/admin/services", icon: Wrench, label: "Services" },
  { key: "content" as const, href: "/admin/content", icon: FileStack, label: "Content" },
  { key: "studio" as const, href: "/admin/studio", icon: Building2, label: "Studio" },
  { key: "settings" as const, href: "/admin/settings", icon: Settings, label: "Settings" },
];

type Props = {
  active: CmsNavKey;
  newInquiriesCount?: number;
};

export function CmsHeader({ active, newInquiriesCount = 0 }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#0B2F6B]/60 bg-[#06152F]/95 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-1.5 font-mono text-[10px] text-slate-400 sm:px-6">
          <span className="inline-flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            STUDIO ONLINE
          </span>
          <span>
            HARGEISA <EatClock className="text-[#D4AF37]" />
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <div className="font-mono text-[10px] tracking-wider text-[#D4AF37] uppercase">
              {pathname}
            </div>
            <h1 className="text-lg font-black tracking-tight text-white sm:text-xl">
              {titles[active]}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {newInquiriesCount > 0 ? (
              <Link
                href="/admin/inquiries"
                className="hidden rounded-lg bg-[#D4AF37] px-2.5 py-1 font-mono text-[10px] font-bold text-slate-950 sm:inline-flex"
              >
                {newInquiriesCount} NEW LEADS
              </Link>
            ) : null}
            <Link
              href="/admin/projects?new=1"
              className="hidden items-center gap-1 rounded-xl bg-[#D4AF37] px-3 py-2 text-xs font-bold text-slate-950 sm:inline-flex"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Project
            </Link>
            <a
              href="/en"
              className="hidden items-center gap-1 rounded-xl border border-white/10 px-3 py-2 text-xs text-slate-300 hover:bg-white/5 md:inline-flex"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Public
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#0B2F6B]/80 bg-[#040D1D]/98 pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="mx-auto grid max-w-lg grid-cols-5 gap-1 px-2 py-2">
          {mobilePrimary.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-bold ${
                  isActive ? "text-[#D4AF37]" : "text-slate-400"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/admin/projects?new=1"
            className="-mt-4 flex flex-col items-center"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] text-slate-950 shadow-lg">
              <Plus className="h-6 w-6" />
            </span>
          </Link>
          {mobilePrimary.slice(2).map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-bold ${
                  isActive ? "text-[#D4AF37]" : "text-slate-400"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col items-center gap-0.5 rounded-xl py-2 text-[10px] font-bold text-slate-400"
          >
            <Menu className="h-5 w-5" />
            More
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border border-[#0B2F6B]/80 bg-[#06152F] p-4 pb-8">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-[#D4AF37]">MORE</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#081B38] px-3 py-3 text-sm font-semibold text-white"
                  >
                    <Icon className="h-4 w-4 text-[#D4AF37]" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
