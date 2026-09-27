import { getTranslations } from "next-intl/server";
import {
  GraduationCap,
  HeartPulse,
  Landmark,
  Radio,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { TrustSector } from "@/lib/supabase/types";

const ICON_MAP: Record<string, LucideIcon> = {
  landmark: Landmark,
  "graduation-cap": GraduationCap,
  "heart-pulse": HeartPulse,
  "shopping-bag": ShoppingBag,
  radio: Radio,
  users: Users,
};

type Props = {
  sectors: TrustSector[];
};

export async function TrustStrip({ sectors }: Props) {
  const t = await getTranslations("HomePage.trust");

  return (
    <section className="border-b border-[#0B2F6B]/40 bg-[#040D1D] py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
              {t("label")}
            </span>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
              {t("title")}
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span>{t("proof")}</span>
          </div>
        </div>

        {sectors.length === 0 ? (
          <p className="rounded-xl border border-dashed border-white/15 bg-[#06152F]/50 px-4 py-10 text-center text-sm text-slate-400">
            {t("empty")}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {sectors.map((sector) => {
              const Icon = ICON_MAP[sector.icon] ?? Landmark;
              return (
                <div
                  key={sector.id}
                  className="group rounded-xl border border-white/10 bg-[#06152F]/70 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37]/50"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mb-1 text-sm font-bold tracking-tight text-white">
                    {sector.name}
                  </div>
                  <div className="mb-2 font-mono text-xs text-slate-400">
                    {sector.proof}
                  </div>
                  <div className="font-mono text-[10px] font-bold tracking-wider text-[#D4AF37]">
                    {sector.metric}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
