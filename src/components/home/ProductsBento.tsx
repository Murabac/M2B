import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/home/Reveal";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/lib/supabase/types";

type Props = {
  projects: Project[];
};

export async function ProductsBento({ projects }: Props) {
  const t = await getTranslations("HomePage");
  const tCat = await getTranslations("Categories");
  const items = projects.slice(0, 8);

  return (
    <section className="relative border-b border-slate-200 bg-[#FAFBFD] py-20 text-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-xs font-bold tracking-wider text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{t("bentoLabel")}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              {t("bentoTitleBefore")}{" "}
              <span className="gold-gradient-text">{t("bentoTitleAccent")}</span>
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

        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-navy/20 bg-white px-6 py-16 text-center text-slate-500">
            {t("portfolioEmpty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.04}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className={`group flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold ${
                    index === 0 ? "md:row-span-2" : ""
                  }`}
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-2">
                      <span className="rounded-md bg-gold/20 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-gold uppercase">
                        {tCat(project.category)}
                      </span>
                      {project.live_url ? (
                        <span className="font-mono text-xs font-bold text-emerald-500">
                          ● LIVE
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mb-2 text-2xl font-extrabold tracking-tight transition-colors group-hover:text-gold">
                      {project.title}
                    </h3>
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {project.tagline || project.description}
                    </p>
                  </div>
                  {project.cover_image_url ? (
                    <div className="relative mt-auto aspect-[16/10] overflow-hidden rounded-2xl bg-navy-deep">
                      <Image
                        src={project.cover_image_url}
                        alt=""
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="mt-auto flex aspect-[16/10] items-center justify-center rounded-2xl border border-gold/20 bg-navy-deep bg-dot-pattern-dark">
                      <span className="font-mono text-xs tracking-widest text-gold/70 uppercase">
                        {project.title}
                      </span>
                    </div>
                  )}
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
