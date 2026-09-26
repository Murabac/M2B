import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { ServiceIcon } from "@/components/home/ServiceIcon";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/lib/supabase/types";

type Props = {
  services: Service[];
};

export async function CapabilitiesBand({ services }: Props) {
  const t = await getTranslations("HomePage");

  return (
    <section className="relative border-b border-slate-200 bg-white py-20 text-foreground sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("capabilitiesLabel")}</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t("capabilitiesTitleBefore")}{" "}
            <span className="gold-gradient-text">
              {t("capabilitiesTitleAccent")}
            </span>
          </h2>
          <p className="text-base text-slate-600 sm:text-lg">
            {t("capabilitiesSupporting")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 0.05}>
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/80 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-navy/30 hover:bg-white">
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold shadow-md transition-transform group-hover:scale-105">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3 className="mb-2.5 text-xl font-bold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed text-slate-600">
                    {service.description}
                  </p>
                </div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-gold uppercase opacity-0 transition group-hover:opacity-100"
                >
                  {t("viewAllServices")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl border border-navy/30 px-6 py-3 text-xs font-bold tracking-wider text-navy uppercase transition hover:bg-navy/5"
          >
            {t("viewAllServices")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
