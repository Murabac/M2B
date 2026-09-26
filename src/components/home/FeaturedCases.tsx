import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/home/Reveal";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/supabase/types";

type Props = {
  projects: Project[];
};

export async function FeaturedCases({ projects }: Props) {
  const t = await getTranslations("HomePage");
  const tCat = await getTranslations("Categories");

  return (
    <section className="relative border-b border-slate-200 bg-[#FAFBFD] py-20 text-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-xs font-bold tracking-wider text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t("workLabel")}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {t("featuredTitleBefore")}{" "}
              <span className="gold-gradient-text">{t("featuredTitleAccent")}</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 self-start rounded-xl border border-navy/30 px-5 py-2.5 text-xs font-bold tracking-wider text-navy uppercase transition hover:bg-navy/5 md:self-auto"
          >
            <span>{t("portfolioCta")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-slate-500">
            {t("portfolioEmpty")}
          </p>
        ) : (
          <div className="space-y-10">
            {projects.slice(0, 3).map((project, index) => (
              <Reveal key={project.id} delay={index * 0.06}>
                <article className="overflow-hidden rounded-3xl border border-navy/15 bg-white shadow-xl shadow-navy/5 transition-all">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-6">
                      <div>
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-navy px-3 py-1 font-mono text-xs font-bold text-white">
                            {tCat(project.category)}
                          </span>
                          {project.client_name ? (
                            <span className="font-mono text-xs text-slate-500">
                              {project.client_name}
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mb-4 text-3xl font-black tracking-tight sm:text-4xl">
                          {project.title}
                        </h3>
                        <p className="mb-6 text-base leading-relaxed text-slate-600">
                          {project.tagline || project.description}
                        </p>
                      </div>
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:underline"
                      >
                        {t("caseDeepDive")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="relative min-h-[220px] bg-navy-deep lg:col-span-6 lg:min-h-[320px]">
                      {project.cover_image_url ? (
                        <Image
                          src={project.cover_image_url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-dot-pattern-dark">
                          <span className="font-mono text-sm tracking-widest text-gold/80 uppercase">
                            {project.title}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
