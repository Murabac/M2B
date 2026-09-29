import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  ExternalLink,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  Layers,
  LogOut,
  Settings,
  ShieldCheck,
  Wrench,
  FileStack,
} from "lucide-react";
import { logoutAdmin } from "@/app/(admin)/admin/login/actions";
import { siteConfig } from "@/config/site";

export type CmsNavKey =
  | "dashboard"
  | "projects"
  | "inquiries"
  | "products"
  | "studio"
  | "settings"
  | "services"
  | "content";

const navItems: {
  key: CmsNavKey;
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}[] = [
  { key: "dashboard", href: "/admin", label: "Operations Command", icon: LayoutDashboard },
  { key: "projects", href: "/admin/projects", label: "Projects & Work", icon: FolderKanban },
  { key: "inquiries", href: "/admin/inquiries", label: "Inbound Leads", icon: Inbox },
  { key: "products", href: "/admin/products", label: "Products Stats", icon: Layers },
  { key: "services", href: "/admin/services", label: "Services", icon: Wrench },
  { key: "content", href: "/admin/content", label: "Home Content", icon: FileStack },
  { key: "studio", href: "/admin/studio", label: "Studio & HQ", icon: Building2 },
  { key: "settings", href: "/admin/settings", label: "System & Banners", icon: Settings },
];

type Props = {
  active: CmsNavKey;
  newInquiriesCount?: number;
  projectCount?: number;
  founderName?: string;
  founderRole?: string;
};

export function CmsSidebar({
  active,
  newInquiriesCount = 0,
  projectCount = 0,
  founderName = "Admin",
  founderRole = "Studio Operator",
}: Props) {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 flex-col justify-between border-r border-[#0B2F6B]/80 bg-[#040D1D] text-white lg:flex">
      <div>
        <div className="border-b border-[#0B2F6B]/60 p-6">
          <div className="mb-2 flex items-center gap-3.5">
            <span className="relative inline-flex shrink-0 items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-white p-1.5 shadow-sm">
              <Image
                src={siteConfig.logos.markPng}
                alt="M2B"
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 object-contain"
              />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-[#D4AF37] ring-2 ring-[#040D1D]" />
            </span>
            <div>
              <div className="text-sm font-black tracking-widest">
                M<span className="text-[#D4AF37]">2</span>B
              </div>
              <div className="font-mono text-[10px] tracking-wider text-blue-200/70 uppercase">
                Operations Console
              </div>
            </div>
          </div>
          <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] font-bold text-emerald-400">
            <ShieldCheck className="h-3 w-3" />
            ONLINE · ADMIN
          </div>
        </div>

        <nav className="space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            const badge =
              item.key === "inquiries" && newInquiriesCount > 0
                ? `${newInquiriesCount} NEW`
                : item.key === "projects" && projectCount > 0
                  ? String(projectCount)
                  : null;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#0B2F6B] text-[#D4AF37]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </span>
                {badge ? (
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                      item.key === "inquiries"
                        ? "bg-[#D4AF37] text-slate-950"
                        : "border border-[#4882DB]/30 bg-[#0B2F6B] text-blue-200"
                    }`}
                  >
                    {badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-4">
          <Link
            href="/admin/projects?new=1"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] px-3 py-2.5 text-xs font-bold text-slate-950"
          >
            + Create Project
          </Link>
        </div>
      </div>

      <div className="space-y-3 border-t border-[#0B2F6B]/60 p-4">
        <div className="rounded-2xl border border-[#0B2F6B]/50 bg-[#071A38] p-3">
          <div className="text-sm font-bold">{founderName}</div>
          <div className="font-mono text-[10px] text-slate-400">{founderRole}</div>
        </div>
        <a
          href="/en"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Public site
        </a>
        <form action={logoutAdmin}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

export { navItems as cmsNavItems };
