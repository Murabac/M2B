import { getTranslations, setRequestLocale } from "next-intl/server";
import { Sparkles } from "lucide-react";
import { ProductsGrid } from "@/components/products/ProductsGrid";
import { getLocaleFromParams } from "@/i18n/locale";
import { getPublishedProjects } from "@/lib/supabase/queries";

type Props = {
  params: Promise<{ locale: string }>;
};

export const revalidate = 60;

export default async function ProductsPage({ params }: Props) {
  const locale = await getLocaleFromParams(params);
  setRequestLocale(locale);

  const t = await getTranslations("ProductsPage");
  const projects = await getPublishedProjects();

  return (
    <main className="min-h-screen bg-[#051329] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-12 max-w-3xl">
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

        {projects.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-white/15 bg-[#081B38]/50 px-6 py-16 text-center text-sm text-slate-400">
            {t("empty")}
          </p>
        ) : (
          <ProductsGrid projects={projects} />
        )}
      </div>
    </main>
  );
}
