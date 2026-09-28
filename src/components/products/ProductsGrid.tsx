"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  ExternalLink,
  Monitor,
  Server,
  Smartphone,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/supabase/types";

type TabId = "all" | "live" | "mobile" | "ops";

type Props = {
  projects: Project[];
};

function statusClass(status: string): string {
  if (status === "Live") {
    return "bg-emerald-500 text-slate-950 animate-pulse";
  }
  if (status === "In Production") {
    return "bg-[#D4AF37] text-slate-950";
  }
  return "bg-[#0B2F6B] text-white";
}

function PedestalIcon({ project }: { project: Project }) {
  const className = "h-8 w-8";
  if (
    project.work_category === "mobile" ||
    project.stack.some((item) => item.toLowerCase().includes("flutter"))
  ) {
    return <Smartphone className={className} />;
  }
  if (project.work_category === "government") {
    return <Server className={className} />;
  }
  return <Monitor className={className} />;
}

export function ProductsGrid({ projects }: Props) {
  const t = useTranslations("ProductsPage");
  const [activeTab, setActiveTab] = useState<TabId>("all");

  const liveCount = projects.filter((p) => p.status === "Live").length;

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (activeTab === "live") return project.status === "Live";
      if (activeTab === "mobile") {
        return (
          project.work_category === "mobile" ||
          project.stack.some((item) => item.toLowerCase().includes("flutter"))
        );
      }
      if (activeTab === "ops") {
        return (
          project.work_category === "operations" ||
          project.work_category === "government"
        );
      }
      return true;
    });
  }, [projects, activeTab]);

  const tabs: { id: TabId; label: string }[] = [
    { id: "all", label: t("tabs.all", { count: projects.length }) },
    { id: "live", label: t("tabs.live", { count: liveCount }) },
    { id: "mobile", label: t("tabs.mobile") },
    { id: "ops", label: t("tabs.ops") },
  ];

  return (
    <>
      <div className="mb-12 flex items-center gap-2 overflow-x-auto border-b border-slate-800 pb-4">
        {tabs.map((tab) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                selected
                  ? "bg-[#D4AF37] font-bold text-slate-950 shadow-md"
                  : "bg-white/5 text-slate-300 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-3xl border border-dashed border-white/15 bg-[#081B38]/50 px-6 py-16 text-center text-sm text-slate-400">
          {t("emptyFilter")}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const metrics = item.metrics.slice(0, 2);

            return (
              <Link
                key={item.id}
                href={`/portfolio/${item.slug}`}
                className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-[#0B2F6B]/60 bg-[#081B38] p-7 shadow-2xl shadow-black/50 transition-all duration-300 hover:-translate-y-2 hover:border-[#D4AF37]"
              >
                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${statusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {item.sector || item.mesh_category}
                    </span>
                  </div>

                  <div className="relative my-4 rounded-2xl border border-blue-950 bg-gradient-to-b from-[#06152F] to-[#040D1D] p-5 text-center transition-shadow group-hover:shadow-inner">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0B2F6B] text-[#D4AF37] shadow-lg">
                      <PedestalIcon project={item} />
                    </div>
                    <h2 className="text-2xl font-extrabold tracking-tight">
                      {item.title}
                    </h2>
                    <span className="mt-0.5 block font-mono text-xs text-slate-400">
                      {item.client_name ?? "M2B"}
                    </span>

                    {metrics.length > 0 ? (
                      <div className="mt-3 flex justify-around border-t border-slate-800 pt-2 font-mono text-[10px] text-[#D4AF37]">
                        {metrics.map((metric) => (
                          <span key={`${metric.label}-${metric.value}`}>
                            {metric.label}:{" "}
                            <strong className="font-bold text-inherit">
                              {metric.value}
                            </strong>
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-slate-300">
                    {item.tagline}
                  </p>

                  {item.stack.length > 0 ? (
                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 pt-4 font-mono text-xs">
                  {item.live_url ? (
                    <span
                      role="link"
                      tabIndex={0}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        window.open(
                          item.live_url!,
                          "_blank",
                          "noopener,noreferrer",
                        );
                      }}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          event.stopPropagation();
                          window.open(
                            item.live_url!,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }
                      }}
                      className="flex items-center gap-1 font-bold text-[#D4AF37] hover:underline"
                    >
                      <span>{t("liveService")}</span>
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  ) : (
                    <span className="text-slate-400">{t("console")}</span>
                  )}

                  <span className="flex items-center gap-1 font-bold text-[#D4AF37] transition-transform group-hover:translate-x-1">
                    <span>{t("deepDive")}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
