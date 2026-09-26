import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/home/Reveal";
import { getLocaleFromParams } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { getPublishedProjects } from "@/lib/supabase/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export default async function PortfolioPage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const t = await getTranslations("PortfolioPage");
  const tCat = await getTranslations("Categories");
  const projects = await getPublishedProjects();

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[#FAFBFD] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-dot-pattern opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("label")}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">{t("supporting")}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-navy/20 bg-[#FAFBFD] px-6 py-16 text-center text-slate-500">
              {t("empty")}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.04}>
                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold"
                  >
                    <div className="relative aspect-[16/10] bg-navy-deep">
                      {project.cover_image_url ? (
                        <Image
                          src={project.cover_image_url}
                          alt=""
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-dot-pattern-dark">
                          <span className="font-mono text-xs tracking-widest text-gold/70 uppercase">
                            {project.title}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <span className="mb-2 w-fit rounded-md bg-gold/20 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-gold uppercase">
                        {tCat(project.category)}
                      </span>
                      <h2 className="mb-2 text-xl font-extrabold tracking-tight transition-colors group-hover:text-gold">
                        {project.title}
                      </h2>
                      <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                        {project.tagline || project.description}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Link
              href="/#contact"
              className="gold-gradient-bg inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold tracking-wider text-slate-950 uppercase transition hover:shadow-lg hover:shadow-gold/30"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
