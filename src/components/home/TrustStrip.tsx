import { getTranslations } from "next-intl/server";
import {
  GraduationCap,
  HeartPulse,
  Landmark,
  Radio,
  ShoppingBag,
  Users,
} from "lucide-react";

const SECTOR_KEYS = [
  "government",
  "education",
  "health",
  "commerce",
  "media",
  "community",
] as const;

const ICONS = {
  government: Landmark,
  education: GraduationCap,
  health: HeartPulse,
  commerce: ShoppingBag,
  media: Radio,
  community: Users,
} as const;

export async function TrustStrip() {
  const t = await getTranslations("HomePage.trust");

  return (
    <section className="border-b border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-gold uppercase">
              {t("label")}
            </span>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {t("title")}
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-slate-500">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
            <span>{t("proof")}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {SECTOR_KEYS.map((key) => {
            const Icon = ICONS[key];
            return (
              <div
                key={key}
                className="group rounded-xl border border-slate-200/80 bg-slate-50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/30 hover:bg-white"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-navy/10 text-navy">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mb-1 text-sm font-bold tracking-tight text-foreground">
                  {t(`sectors.${key}.name`)}
                </div>
                <div className="font-mono text-[10px] text-slate-500">
                  {t(`sectors.${key}.proof`)}
                </div>
                <div className="mt-2 text-[11px] font-semibold text-gold">
                  {t(`sectors.${key}.metric`)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
