import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/supabase/types";

type Props = {
  projects: Project[];
};

function cardLayoutClass(index: number): string {
  if (index === 0) return "md:row-span-2";
  if (index === 1) return "lg:col-span-2";
  return "";
}

export async function ProductsBento({ projects }: Props) {
  const t = await getTranslations("HomePage");

  const cardBase =
    "group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-[#081B38] p-7 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]";

  return (
    <section className="relative border-b border-[#0B2F6B]/50 bg-[#040D1D] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 font-mono text-xs font-bold tracking-wider text-[#D4AF37]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t("bentoLabel")}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              {t("bentoTitleBefore")}{" "}
              <br className="hidden sm:inline" />
              <span className="gold-gradient-text">{t("bentoTitleAccent")}</span>
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-[#D4AF37]/40 px-5 py-2.5 text-xs font-bold tracking-wider text-[#D4AF37] uppercase transition-all hover:bg-[#D4AF37]/10 md:self-auto"
          >
            <span>{t("bentoCta")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-white/15 bg-[#081B38]/50 px-6 py-16 text-center text-sm text-slate-400">
            {t("bentoEmpty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => {
              const visual = project.cover_image_url || project.logo_url;
              const tall = index === 0;

              return (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className={`${cardBase} ${cardLayoutClass(index)}`}
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-md bg-[#D4AF37]/20 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-[#D4AF37] uppercase">
                        {project.mesh_category || project.category}
                      </span>
                      {project.metric_label ? (
                        <span className="shrink-0 font-mono text-xs text-slate-400">
                          {project.metric_label === "LIVE" ? (
                            <span className="font-bold text-emerald-500">
                              ● LIVE
                            </span>
                          ) : (
                            project.metric_label
                          )}
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mb-2 text-2xl font-extrabold tracking-tight transition-colors group-hover:text-[#D4AF37]">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-slate-300">
                      {project.tagline}
                    </p>

                    {visual ? (
                      <div
                        className={`relative mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[#051329] ${
                          tall ? "min-h-[220px] flex-1" : "aspect-[16/10]"
                        }`}
                      >
                        <Image
                          src={visual}
                          alt={project.title}
                          fill
                          className="object-contain p-6"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    ) : project.mesh_preview ? (
                      <div className="mt-2 rounded-xl border border-blue-900/50 bg-[#051329] p-3.5 font-mono text-xs leading-relaxed text-slate-300">
                        {project.mesh_preview}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4 font-mono text-xs text-[#D4AF37]">
                    <span className="truncate pe-3">
                      {project.stack_line || project.mesh_preview}
                    </span>
                    <span className="shrink-0 transition-transform group-hover:translate-x-1">
                      {t("bentoViewCase")}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
