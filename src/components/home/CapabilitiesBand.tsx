import { getTranslations } from "next-intl/server";
import { ArrowRight, Sparkles } from "lucide-react";
import { ServiceIcon } from "@/components/home/ServiceIcon";
import { Link } from "@/i18n/navigation";
import type { Service } from "@/lib/supabase/types";

type Props = {
  services: Service[];
};

export async function CapabilitiesBand({ services }: Props) {
  const t = await getTranslations("HomePage");

  return (
    <section className="relative border-b border-[#0B2F6B]/50 bg-[#051329] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-[#D4AF37]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("capabilitiesLabel")}</span>
          </div>

          <h2 className="mb-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t("capabilitiesTitleBefore")}{" "}
            <br className="hidden sm:inline" />
            <span className="gold-gradient-text">
              {t("capabilitiesTitleAccent")}
            </span>
          </h2>

          <p className="text-base text-slate-300 sm:text-lg">
            {t("capabilitiesSupporting")}
          </p>
        </div>

        {services.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-white/15 bg-[#081B38]/50 px-4 py-12 text-center text-sm text-slate-400">
            {t("capabilitiesEmpty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const bullets = Array.isArray(service.bullets)
                ? service.bullets
                : [];

              return (
                <div
                  key={service.id}
                  className="group flex flex-col justify-between rounded-2xl border border-[#0B2F6B]/60 bg-[#081B38]/80 p-7 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50"
                >
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B2F6B] text-[#D4AF37] shadow-md transition-transform group-hover:scale-105">
                      <ServiceIcon name={service.icon} />
                    </div>

                    <h3 className="mb-2.5 text-xl font-bold tracking-tight text-white">
                      {service.title}
                    </h3>

                    <p className="mb-5 text-sm leading-relaxed text-slate-300">
                      {service.description}
                    </p>

                    {bullets.length > 0 ? (
                      <ul className="mb-6 space-y-2 border-t border-slate-800/80 pt-4">
                        {bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 text-xs text-slate-400"
                          >
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <Link
                    href="/services"
                    className="mt-2 inline-flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-[#D4AF37] transition-all group-hover:gap-2"
                  >
                    <span>{t("exploreCapability")}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 rounded-2xl border border-[#D4AF37]/30 bg-[#06162E] p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="mb-1 block font-mono text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                {t("regionLabel")}
              </span>
              <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">
                {t("regionTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {t("regionSupporting")}
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex shrink-0 self-start rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] px-6 py-3 text-xs font-bold tracking-wider text-slate-950 uppercase transition hover:shadow-lg lg:self-center"
            >
              {t("regionCta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
