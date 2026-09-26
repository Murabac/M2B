"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

const STEP_KEYS = ["01", "02", "03", "04", "05"] as const;

export function ProcessOrbit() {
  const t = useTranslations("HomePage.process");
  const [activeStep, setActiveStep] = useState(0);
  const stepKey = STEP_KEYS[activeStep];
  const deliverables = t.raw(`steps.${stepKey}.deliverables`) as string[];

  return (
    <section className="relative overflow-hidden border-b border-[rgba(11,47,107,0.5)] bg-[#040D1D] py-20 text-white sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-dot-pattern-dark opacity-40" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-gold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("label")}</span>
          </div>
          <h2 className="mb-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t("titleBefore")}{" "}
            <span className="gold-gradient-text">{t("titleAccent")}</span>
          </h2>
          <p className="text-base text-slate-300 sm:text-lg">{t("supporting")}</p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {STEP_KEYS.map((key, idx) => {
            const selected = activeStep === idx;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`relative rounded-2xl border p-4 text-left transition-all ${
                  selected
                    ? "scale-[1.02] border-gold bg-[#081B38] shadow-lg shadow-gold/10"
                    : "border-white/10 bg-white/5 hover:border-gold/40"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`font-mono text-lg font-black ${
                      selected ? "text-gold" : "text-slate-400"
                    }`}
                  >
                    {key}
                  </span>
                  {selected ? (
                    <span className="h-2 w-2 animate-ping rounded-full bg-gold" />
                  ) : null}
                </div>
                <div className="truncate text-sm font-bold">
                  {t(`steps.${key}.title`)}
                </div>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-gold/30 bg-[#06152F] p-8 shadow-2xl sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-2 font-mono text-xs font-bold text-gold">
                {t("stageOf", { step: stepKey })}
              </div>
              <h3 className="mb-4 text-2xl font-black tracking-tight sm:text-3xl">
                {t(`steps.${stepKey}.title`)}
              </h3>
              <p className="mb-6 text-base leading-relaxed text-slate-300">
                {t(`steps.${stepKey}.description`)}
              </p>
              <span className="mb-2 block font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
                {t("deliverables")}
              </span>
              <div className="flex flex-wrap gap-2">
                {deliverables.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-[#081B38] px-3 py-1.5 font-mono text-xs font-semibold text-slate-200"
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-gold" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4">
              <Link
                href="/#contact"
                className="gold-gradient-bg group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold tracking-wider text-slate-950 uppercase transition hover:shadow-lg hover:shadow-gold/30"
              >
                <span>{t("cta")}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
