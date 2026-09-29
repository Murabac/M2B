import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  Quote,
  Sparkles,
} from "lucide-react";
import { ProjectGalleryCarousel } from "@/components/portfolio/ProjectGalleryCarousel";
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
  const stackTags =
    project.stack?.length > 0
      ? project.stack
      : project.stack_line
        ? project.stack_line.split(/[·|,]/).map((s) => s.trim()).filter(Boolean)
        : [];
  const metrics = (project.metrics ?? []).filter((m) => m.label || m.value);
  const storeLinks = [
    project.live_url
      ? { href: project.live_url, label: t("liveSite") }
      : null,
    project.app_store_url
      ? { href: project.app_store_url, label: t("appStore") }
      : null,
    project.play_store_url
      ? { href: project.play_store_url, label: t("playStore") }
      : null,
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <main className="bg-[#051329] text-white">
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-[#071C40] to-[#0A3A7A]">
        <div
          className="pointer-events-none absolute inset-0 bg-dot-pattern-dark opacity-30"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <Link
            href="/portfolio"
            className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#D4AF37] uppercase hover:underline"
          >
            ← {t("back")}
          </Link>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-[#D4AF37] uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {project.sector ||
                    project.mesh_category ||
                    tCat(project.category)}
                </span>
              </div>

              <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              {project.tagline ? (
                <p className="mb-6 max-w-2xl text-lg leading-relaxed text-blue-100 sm:text-xl">
                  {project.tagline}
                </p>
              ) : null}

              <div className="mb-8 flex flex-wrap gap-3">
                {storeLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] px-5 py-3 text-xs font-bold tracking-wider text-slate-950 uppercase"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-xs font-bold tracking-wider text-white uppercase backdrop-blur hover:border-[#D4AF37]/50"
                >
                  {t("cta")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-blue-200/80">
                {project.client_name ? (
                  <span>
                    {t("client")}:{" "}
                    <strong className="text-white">{project.client_name}</strong>
                  </span>
                ) : null}
                {project.year ? (
                  <span>
                    {t("year")}:{" "}
                    <strong className="text-white">{project.year}</strong>
                  </span>
                ) : null}
                {project.status ? (
                  <span>
                    {t("status")}:{" "}
                    <strong className="text-[#D4AF37]">{project.status}</strong>
                  </span>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#051329]/50 shadow-2xl backdrop-blur">
                {visual ? (
                  <div className="relative aspect-[4/3] bg-[#051329]">
                    <Image
                      src={visual}
                      alt={project.title}
                      fill
                      className="object-contain p-6 sm:p-8"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center bg-dot-pattern-dark px-6 text-center">
                    <span className="font-mono text-xs tracking-widest text-[#D4AF37]/70 uppercase">
                      {project.mesh_preview || project.title}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {metrics.length > 0 ? (
        <section className="border-b border-slate-800 bg-[#040D1D] py-8">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {metrics.map((metric) => (
              <div
                key={`${metric.label}-${metric.value}`}
                className="rounded-2xl border border-slate-800 bg-[#081B38]/60 p-5"
              >
                <div className="mb-1 text-2xl font-black text-[#D4AF37] sm:text-3xl">
                  {metric.value}
                </div>
                <div className="text-sm font-bold">{metric.label}</div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-b border-slate-800 py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-8 lg:col-span-7">
            {project.outcome ? (
              <div>
                <h2 className="mb-3 font-mono text-xs font-bold tracking-[0.18em] text-[#D4AF37] uppercase">
                  {t("outcome")}
                </h2>
                <p className="text-lg font-medium leading-relaxed text-slate-200">
                  {project.outcome}
                </p>
              </div>
            ) : null}

            {project.description ? (
              <div>
                <h2 className="mb-3 font-mono text-xs font-bold tracking-[0.18em] text-[#D4AF37] uppercase">
                  {t("overview")}
                </h2>
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                  {project.description}
                </p>
              </div>
            ) : null}

            {stackTags.length > 0 ? (
              <div>
                <h2 className="mb-3 font-mono text-xs font-bold tracking-[0.18em] text-[#D4AF37] uppercase">
                  {t("stack")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {stackTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-slate-700 bg-[#081B38] px-3 py-1.5 font-mono text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-800 bg-[#081B38] p-6 sm:p-8">
              <h2 className="mb-4 font-mono text-xs font-bold tracking-[0.18em] text-[#D4AF37] uppercase">
                {t("details")}
              </h2>
              <dl className="space-y-3 font-mono text-xs text-slate-400">
                {project.client_name ? (
                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                    <dt>{t("client")}</dt>
                    <dd className="text-end font-bold text-slate-200">
                      {project.client_name}
                    </dd>
                  </div>
                ) : null}
                {project.year ? (
                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                    <dt>{t("year")}</dt>
                    <dd className="text-end font-bold text-slate-200">
                      {project.year}
                    </dd>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                  <dt>{t("category")}</dt>
                  <dd className="text-end font-bold text-slate-200">
                    {tCat(project.category)}
                  </dd>
                </div>
                {project.status ? (
                  <div className="flex justify-between gap-4 border-b border-slate-800 pb-3">
                    <dt>{t("status")}</dt>
                    <dd className="text-end font-bold text-[#D4AF37]">
                      {project.status}
                    </dd>
                  </div>
                ) : null}
                {project.sector ? (
                  <div className="flex justify-between gap-4 pb-1">
                    <dt>{t("sector")}</dt>
                    <dd className="text-end font-bold text-slate-200">
                      {project.sector}
                    </dd>
                  </div>
                ) : null}
              </dl>

              {storeLinks.length > 0 ? (
                <div className="mt-6 space-y-2 border-t border-slate-800 pt-5">
                  {storeLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-[#051329] px-4 py-3 text-xs font-bold text-slate-200 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
                    >
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      {project.project_images.length > 0 ? (
        <section className="border-b border-slate-800 bg-[#040D1D] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProjectGalleryCarousel
              images={project.project_images}
              title={project.title}
              galleryLabel={t("gallery")}
              prevLabel={t("prevImage")}
              nextLabel={t("nextImage")}
            />
          </div>
        </section>
      ) : null}

      {project.testimonials.length > 0 ? (
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 font-mono text-xs font-bold tracking-[0.18em] text-[#D4AF37] uppercase">
              {t("testimonials")}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {project.testimonials.map((item) => (
                <blockquote
                  key={item.id}
                  className="relative overflow-hidden rounded-3xl border border-slate-800 bg-[#081B38] p-7 sm:p-8"
                >
                  <Quote
                    className="absolute top-5 end-5 h-8 w-8 text-[#D4AF37]/25"
                    aria-hidden
                  />
                  <p className="mb-6 text-base leading-relaxed text-slate-200 sm:text-lg">
                    “{item.quote}”
                  </p>
                  <footer className="border-t border-slate-800 pt-4 font-mono text-xs text-slate-500">
                    <div className="font-bold text-slate-200">
                      {item.author_name}
                    </div>
                    {item.author_role ? (
                      <div className="mt-0.5 text-[#D4AF37]">
                        {item.author_role}
                      </div>
                    ) : null}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-slate-800 bg-[#040D1D] py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <div className="font-mono text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
              {t("ctaLabel")}
            </div>
            <p className="mt-1 text-lg font-bold">{t("ctaTitle")}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] px-5 py-3 text-xs font-bold tracking-wider text-slate-950 uppercase"
          >
            {t("cta")}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
