"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Project, WorkCategory } from "@/lib/supabase/types";

type FilterId = "all" | WorkCategory;

type Props = {
  projects: Project[];
};

const FILTER_KEYS: FilterId[] = [
  "all",
  "government",
  "operations",
  "education",
  "faith",
  "commerce",
  "mobile",
  "websites",
];

function statusClass(status: string): string {
  if (status === "Live") return "bg-emerald-500 text-slate-950";
  if (status === "In Production") return "bg-[#D4AF37] text-slate-950";
  return "bg-white/20 text-white";
}

export function WorkGrid({ projects }: Props) {
  const t = useTranslations("PortfolioPage");
  const [activeCategory, setActiveCategory] = useState<FilterId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.work_category === activeCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      const haystack = [
        project.title,
        project.client_name ?? "",
        project.sector,
        project.tagline,
        project.outcome,
        ...project.stack,
        project.stack_line,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <>
      <div className="mb-10 flex flex-col items-stretch justify-between gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-center">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {FILTER_KEYS.map((id) => {
            const selected = activeCategory === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveCategory(id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                  selected
                    ? "bg-[#D4AF37] font-bold text-slate-950 shadow-md shadow-[#D4AF37]/20"
                    : "border border-white/5 text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {t(`filters.${id}`)}
              </button>
            );
          })}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full rounded-xl border border-white/10 bg-[#081B38] py-2 ps-10 pe-4 text-xs text-white placeholder:text-slate-500 transition-all focus:border-[#D4AF37] focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-mono text-sm text-slate-500">
            {t("noMatches", { query: searchQuery || activeCategory })}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const stack = project.stack.slice(0, 4);
            const extra = Math.max(project.stack.length - 4, 0);

            return (
              <Link
                key={project.id}
                href={`/portfolio/${project.slug}`}
                className={`group flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 ${
                  project.is_featured
                    ? "bg-[#081B38] shadow-xl shadow-black/50 ring-1 ring-[#D4AF37]/30 border-[#D4AF37]/50"
                    : "border-white/10 bg-[#081B38]/70 shadow-md hover:border-[#D4AF37]/40"
                }`}
              >
                <div className="relative flex h-48 flex-col justify-between overflow-hidden bg-gradient-to-br from-[#071C40] to-[#0A3A7A] p-5 sm:h-52">
                  <div className="pointer-events-none absolute inset-0 bg-dot-pattern-dark opacity-30" />
                  <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full border border-white/10" />

                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider uppercase ${statusClass(project.status)}`}
                    >
                      {project.status}
                    </span>
                    {project.is_featured ? (
                      <span className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/20 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#D4AF37]">
                        {t("flagship")}
                      </span>
                    ) : null}
                  </div>

                  <div className="relative z-10">
                    <span className="block font-mono text-[11px] tracking-widest text-[#D4AF37] uppercase">
                      {project.sector || project.mesh_category}
                    </span>
                    <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white transition-colors group-hover:text-[#D4AF37]">
                      {project.title}
                    </h2>
                    <span className="mt-0.5 block font-mono text-xs text-blue-200/80">
                      {project.client_name ?? "M2B"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="mb-4 text-sm leading-relaxed text-slate-300">
                      {project.tagline}
                    </p>

                    {project.outcome ? (
                      <div className="mb-5 rounded-xl border border-slate-800/80 bg-[#051329] p-3">
                        <span className="mb-0.5 block font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                          {t("outcome")}
                        </span>
                        <p className="text-xs font-medium text-slate-200">
                          {project.outcome}
                        </p>
                      </div>
                    ) : null}

                    {stack.length > 0 ? (
                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-400"
                          >
                            {tech}
                          </span>
                        ))}
                        {extra > 0 ? (
                          <span className="rounded px-1.5 py-0.5 font-mono text-[11px] text-slate-400">
                            +{extra}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800 pt-4 font-mono text-xs">
                    {project.live_url ? (
                      <span
                        role="link"
                        tabIndex={0}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          window.open(
                            project.live_url!,
                            "_blank",
                            "noopener,noreferrer",
                          );
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            event.stopPropagation();
                            window.open(
                              project.live_url!,
                              "_blank",
                              "noopener,noreferrer",
                            );
                          }
                        }}
                        className="flex items-center gap-1 font-bold text-[#D4AF37] hover:underline"
                      >
                        <span>{t("visitLive")}</span>
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
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
