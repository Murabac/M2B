import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { ServiceIcon } from "@/components/home/ServiceIcon";
import { getLocaleFromParams } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { getPublishedServices } from "@/lib/supabase/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export default async function ServicesPage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const t = await getTranslations("ServicesPage");
  const services = await getPublishedServices();

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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.04}>
              <article className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-slate-50/80 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy/30 hover:bg-white">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold shadow-md transition-transform group-hover:scale-105">
                  <ServiceIcon name={service.icon} />
                </div>
                <h2 className="mb-2.5 text-xl font-bold tracking-tight text-foreground">
                  {service.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/#contact"
            className="gold-gradient-bg inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold tracking-wider text-slate-950 uppercase transition hover:shadow-lg hover:shadow-gold/30"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
