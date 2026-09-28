import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { getLocaleFromParams } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import {
  getProjectBySlug,
  getPublishedProjectSlugs,
} from "@/lib/supabase/queries";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const { slug } = await params;
  const t = await getTranslations("ProjectPage");
  const tCat = await getTranslations("Categories");
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const visual = project.cover_image_url || project.logo_url;

  return (
    <main className="bg-[#051329] text-white">
      <section className="border-b border-[#0B2F6B]/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#D4AF37] uppercase hover:underline"
          >
            ← {t("back")}
          </Link>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="mb-4 inline-block rounded-md bg-[#D4AF37]/20 px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-[#D4AF37] uppercase">
                {project.mesh_category || tCat(project.category)}
              </span>
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {project.title}
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-slate-300">
                {project.tagline}
              </p>
              <p className="mb-8 whitespace-pre-wrap text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.live_url ? (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] px-5 py-3 text-xs font-bold tracking-wider text-slate-950 uppercase"
                  >
                    {t("liveSite")}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D4AF37]/40 px-5 py-3 text-xs font-bold tracking-wider text-[#D4AF37] uppercase"
                >
                  {t("cta")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#081B38]">
                {visual ? (
                  <div className="relative aspect-[4/3] bg-[#051329]">
                    <Image
                      src={visual}
                      alt={project.title}
                      fill
                      className="object-contain p-8"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-dot-pattern-dark px-6 text-center">
                    <span className="font-mono text-xs tracking-widest text-[#D4AF37]/70 uppercase">
                      {project.mesh_preview || project.title}
                    </span>
                  </div>
                )}
                <div className="space-y-2 border-t border-slate-800 p-6 font-mono text-xs text-slate-400">
                  {project.client_name ? (
                    <div className="flex justify-between gap-4">
                      <span>{t("client")}</span>
                      <span className="font-bold text-slate-200">
                        {project.client_name}
                      </span>
                    </div>
                  ) : null}
                  {project.year ? (
                    <div className="flex justify-between gap-4">
                      <span>{t("year")}</span>
                      <span className="font-bold text-slate-200">
                        {project.year}
                      </span>
                    </div>
                  ) : null}
                  {project.stack_line ? (
                    <div className="flex justify-between gap-4">
                      <span>{t("stack")}</span>
                      <span className="text-end font-bold text-[#D4AF37]">
                        {project.stack_line}
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>

              {project.testimonials.length > 0 ? (
                <div className="mt-6 space-y-4">
                  <h2 className="font-mono text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
                    {t("testimonials")}
                  </h2>
                  {project.testimonials.map((item) => (
                    <blockquote
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-[#081B38] p-5"
                    >
                      <p className="mb-3 text-sm leading-relaxed text-slate-300">
                        “{item.quote}”
                      </p>
                      <footer className="font-mono text-xs text-slate-500">
                        <span className="font-bold text-slate-300">
                          {item.author_name}
                        </span>
                        {item.author_role ? ` · ${item.author_role}` : null}
                      </footer>
                    </blockquote>
                  ))}
                </div>
              ) : null}

              {project.project_images.length > 0 ? (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {project.project_images.map((image) => (
                    <div
                      key={image.id}
                      className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-[#081B38]"
                    >
                      <Image
                        src={image.image_url}
                        alt={image.alt_text || project.title}
                        fill
                        className="object-cover"
                        sizes="200px"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
