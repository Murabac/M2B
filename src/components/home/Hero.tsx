"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import type { Project } from "@/lib/supabase/types";
import { Link } from "@/i18n/navigation";

type Props = {
  projects: Project[];
};

export function Hero({ projects }: Props) {
  const t = useTranslations("HomePage");
  const [activeCard, setActiveCard] = useState(projects[0]?.id ?? "");

  if (projects.length === 0) {
    return (
      <section className="relative flex min-h-[60vh] items-center overflow-hidden border-b border-[#0B2F6B]/60 bg-[#051329] text-white">
        <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {t("headlineBefore")}
            <br />
            <span className="gold-gradient-text">{t("headlineAccent")}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-300">{t("supporting")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] px-6 py-3 text-sm font-bold tracking-wider text-slate-950 uppercase"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-[#0B2F6B] bg-[#06152F] px-6 py-3 text-sm font-bold tracking-wider text-slate-200 uppercase"
            >
              {t("ctaSecondary")}
              <ChevronRight className="h-4 w-4 opacity-60" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden border-b border-[#0B2F6B]/60 bg-[#051329] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-dot-pattern-dark opacity-60" />
        <div className="absolute -top-40 right-1/2 h-[600px] w-[600px] translate-x-1/2 rounded-full border-[1.5px] border-[#D4AF37]/15 sm:h-[900px] sm:w-[900px] md:translate-x-1/3" />
        <div
          className="absolute -top-32 right-1/2 h-[560px] w-[560px] translate-x-1/2 animate-spin rounded-full border-t-[2px] border-r-[2px] border-[#D4AF37]/40 sm:h-[840px] sm:w-[840px] md:translate-x-1/3"
          style={{ animationDuration: "120s" }}
        />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-[#0B2F6B]/30 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="z-10 flex flex-col items-start lg:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#081B38] px-3.5 py-1.5 text-xs font-semibold text-[#D4AF37]">
              <span className="h-2 w-2 animate-ping rounded-full bg-[#D4AF37]" />
              <span className="font-mono text-[11px] tracking-wider uppercase">
                {t("eyebrow")}
              </span>
              <span className="text-slate-400">|</span>
              <span className="text-[10px] text-slate-300">
                {t("eyebrowRegion")}
              </span>
            </div>

            <h1 className="mb-5 text-[2.125rem] leading-[1.1] font-extrabold tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {t("headlineBefore")}
              <br />
              <span className="gold-gradient-text">{t("headlineAccent")}</span>
            </h1>

            <p className="mb-7 max-w-2xl text-[1.0625rem] leading-relaxed text-slate-300 sm:text-lg">
              {t("supporting")}
            </p>

            <div className="mb-9 flex w-full flex-wrap items-center gap-3.5 sm:w-auto">
              <Link
                href="/portfolio"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] px-6 py-3.5 text-sm font-bold tracking-wider text-slate-950 uppercase transition-all hover:shadow-lg hover:shadow-[#D4AF37]/30 active:scale-95 sm:w-auto"
              >
                <span>{t("ctaPrimary")}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#0B2F6B] bg-[#06152F] px-6 py-3.5 text-sm font-bold tracking-wider text-slate-200 uppercase transition-all hover:border-[#D4AF37] hover:text-white sm:w-auto"
              >
                <span>{t("ctaSecondary")}</span>
                <ChevronRight className="h-4 w-4 opacity-60" />
              </Link>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2 border-t border-slate-800 pt-4 font-mono text-xs text-slate-400">
              <span className="font-bold text-[#D4AF37]">●</span>
              <span>Web</span>
              <span className="opacity-40">·</span>
              <span>Mobile (Flutter)</span>
              <span className="opacity-40">·</span>
              <span>Ops Platforms & ERPs</span>
              <span className="opacity-40">·</span>
              <span className="font-semibold text-slate-300">
                Bilingual EN / SO / AR
              </span>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center lg:col-span-5">
            <div className="relative w-full rounded-2xl border border-[#D4AF37]/25 bg-[#081B38]/90 p-5 shadow-2xl shadow-black/60 sm:p-6">
              <div className="mb-4 flex items-center justify-between border-b border-slate-800 pb-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  <span className="ml-2 font-mono text-[11px] font-bold text-slate-400">
                    {t("meshLabel")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#D4AF37]">
                  <Sparkles className="h-3 w-3" />
                  <span>
                    {projects.length} ACTIVE ENGINES
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {projects.map((project) => {
                  const isSelected = activeCard === project.id;
                  const logo = project.logo_url ?? project.cover_image_url;
                  const category =
                    project.mesh_category ||
                    project.category.replace(/_/g, " ");
                  const preview =
                    project.mesh_preview || project.tagline || project.description;
                  const accent = project.accent_color || "#0B2F6B";

                  return (
                    <div
                      key={project.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveCard(project.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveCard(project.id);
                        }
                      }}
                      className={`relative cursor-pointer rounded-xl border p-3.5 transition-all ${
                        isSelected
                          ? "scale-[1.02] border-[#D4AF37] bg-[#06152F] shadow-lg shadow-[#D4AF37]/10"
                          : "border-white/10 bg-white/5 hover:border-[#D4AF37]/40"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-sm ${
                              logo ? "bg-white p-1" : ""
                            }`}
                            style={logo ? undefined : { backgroundColor: accent }}
                          >
                            {logo ? (
                              <Image
                                src={logo}
                                alt=""
                                width={36}
                                height={36}
                                unoptimized
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <span className="font-mono text-[10px] font-bold text-white">
                                {project.title.slice(0, 2).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-sm font-bold tracking-tight">
                                {project.title}
                              </h2>
                              <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-medium text-slate-300">
                                {category}
                              </span>
                            </div>
                            <p className="mt-0.5 font-mono text-[11px] text-slate-400">
                              {project.client_name ?? "M2B"}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={`/portfolio/${project.slug}`}
                          className="flex items-center gap-1 self-center text-[11px] font-bold text-[#D4AF37] hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{t("caseLink")}</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      </div>

                      {isSelected ? (
                        <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-800/80 pt-2.5 text-xs">
                          <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                            <span>{preview}</span>
                          </span>
                          <Link
                            href={`/portfolio/${project.slug}`}
                            className="flex shrink-0 items-center gap-1 font-mono text-[10px] font-bold tracking-wider text-[#D4AF37] uppercase hover:text-[#E5BE4A]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {t("caseDeepDive")} →
                          </Link>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-slate-800 pt-3 text-center">
                <span className="font-mono text-[11px] text-slate-400">
                  {t("stackLine")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
