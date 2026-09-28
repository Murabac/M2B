import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Globe2,
  Layers,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { ServiceIcon } from "@/components/home/ServiceIcon";
import { getLocaleFromParams } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { getPublishedCapabilityPillars } from "@/lib/supabase/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export default async function ServicesPage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const t = await getTranslations("ServicesPage");
  const pillars = await getPublishedCapabilityPillars();

  const localItems = [
    {
      icon: CreditCard,
      title: t("local.items.money.title"),
      body: t("local.items.money.body"),
    },
    {
      icon: Globe2,
      title: t("local.items.typography.title"),
      body: t("local.items.typography.body"),
    },
    {
      icon: WifiOff,
      title: t("local.items.offline.title"),
      body: t("local.items.offline.body"),
    },
    {
      icon: Layers,
      title: t("local.items.calendar.title"),
      body: t("local.items.calendar.body"),
    },
  ];

  return (
    <main className="min-h-screen bg-[#051329] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-16 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-[#D4AF37]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("label")}</span>
          </div>

          <h1 className="mb-5 text-4xl font-extrabold tracking-tight sm:text-6xl">
            {t("titleBefore")} <br />
            <span className="gold-gradient-text">{t("titleAccent")}</span>
          </h1>

          <p className="text-lg leading-relaxed text-slate-300">
            {t("supporting")}
          </p>
        </div>

        {pillars.length === 0 ? (
          <p className="mb-16 rounded-3xl border border-dashed border-white/15 bg-[#081B38]/50 px-6 py-16 text-center text-sm text-slate-400">
            {t("empty")}
          </p>
        ) : (
          <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <article
                key={pillar.id}
                className="flex flex-col justify-between rounded-3xl border border-[#0B2F6B]/60 bg-[#081B38] p-8 shadow-xl shadow-black/40"
              >
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B2F6B] text-[#D4AF37] shadow-md">
                    <ServiceIcon name={pillar.icon} />
                  </div>

                  <h2 className="mb-3 text-3xl font-black tracking-tight">
                    {pillar.title}
                  </h2>
                  <p className="mb-8 text-sm leading-relaxed text-slate-300">
                    {pillar.tagline}
                  </p>

                  <div className="space-y-4">
                    {pillar.technologies.map((item) => (
                      <div
                        key={item.name}
                        className="border-t border-slate-800/80 pt-3"
                      >
                        <div className="flex items-center gap-1.5 text-sm font-bold text-slate-200">
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#D4AF37]" />
                          <span>{item.name}</span>
                        </div>
                        <p className="mt-1 ps-5 text-xs leading-relaxed text-slate-400">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-800 pt-4">
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37] py-3 text-xs font-bold tracking-wider text-[#D4AF37] uppercase transition-colors hover:bg-[#D4AF37] hover:text-slate-950"
                  >
                    <span>{t("commission", { pillar: pillar.title })}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#06152F] to-[#0A3A7A] p-8 text-white shadow-2xl sm:p-12">
          <div className="relative z-10 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/20 px-3 py-1 font-mono text-xs font-bold text-[#D4AF37]">
              <Globe2 className="h-3.5 w-3.5" />
              <span>{t("local.label")}</span>
            </div>

            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t("local.title")}
            </h2>
            <p className="mb-8 text-base leading-relaxed text-blue-200 sm:text-lg">
              {t("local.supporting")}
            </p>

            <div className="grid grid-cols-1 gap-4 font-mono text-xs sm:grid-cols-2">
              {localItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="mb-1 flex items-center gap-2 font-bold text-[#D4AF37]">
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-slate-300">{item.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
