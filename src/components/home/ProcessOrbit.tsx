"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import type { ProcessStep } from "@/lib/supabase/types";
import { Link } from "@/i18n/navigation";

type Props = {
  steps: ProcessStep[];
};

export function ProcessOrbit({ steps }: Props) {
  const t = useTranslations("HomePage.process");
  const [activeStep, setActiveStep] = useState(0);
  const active = steps[activeStep] ?? null;

  if (steps.length === 0 || !active) {
    return null;
  }

  const deliverables = Array.isArray(active.deliverables)
    ? active.deliverables
    : [];

  return (
    <section className="relative overflow-hidden border-b border-[#0B2F6B]/50 bg-[#051329] py-20 text-white sm:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3.5 py-1 font-mono text-xs font-bold tracking-wider text-[#D4AF37]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t("label")}</span>
          </div>

          <h2 className="mb-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {t("titleBefore")} <br />
            <span className="gold-gradient-text">{t("titleAccent")}</span>
          </h2>

          <p className="text-base text-slate-300 sm:text-lg">{t("supporting")}</p>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {steps.map((step, idx) => {
            const selected = activeStep === idx;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`relative rounded-2xl border p-4 text-left transition-all ${
                  selected
                    ? "scale-[1.02] border-[#D4AF37] bg-[#081B38] shadow-lg shadow-[#D4AF37]/10"
                    : "border-white/10 bg-white/5 hover:border-[#D4AF37]/40"
                }`}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span
                    className={`font-mono text-lg font-black ${
                      selected ? "text-[#D4AF37]" : "text-slate-400"
                    }`}
                  >
                    {step.step_key}
                  </span>
                  {selected ? (
                    <span className="h-2 w-2 animate-ping rounded-full bg-[#D4AF37]" />
                  ) : null}
                </div>
                <div className="truncate text-sm font-bold">{step.title}</div>
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#06152F] p-8 shadow-2xl sm:p-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold text-[#D4AF37]">
                <span>{t("stageOf", { step: active.step_key })}</span>
              </div>
              <h3 className="mb-4 text-2xl font-black tracking-tight sm:text-3xl">
                {active.title}
              </h3>
              <p className="mb-6 text-base leading-relaxed text-slate-300">
                {active.description}
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
                    <CheckCircle className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl bg-[#0B2F6B] p-6 text-center text-white shadow-xl lg:col-span-4">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#D4AF37] font-mono text-lg font-bold text-[#D4AF37]">
                {active.step_key}
              </div>
              <span className="mb-1 text-lg font-bold">{t("guaranteeTitle")}</span>
              <p className="mb-4 text-xs leading-relaxed text-blue-200/80">
                {t("guaranteeBody")}
              </p>
              <Link
                href="/#contact"
                className="w-full rounded-xl bg-[#D4AF37] py-2.5 text-center text-xs font-bold tracking-wider text-slate-950 uppercase transition-colors hover:bg-[#E5BE4A]"
              >
                {t("guaranteeCta")}
              </Link>
            </div>
          </div>
        </div>

        <div className="relative mt-16 overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#071C40] via-[#0B2F6B] to-[#0A3A7A] p-8 text-white shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full border border-[#D4AF37]/20" />

          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="mb-2 block font-mono text-xs font-bold tracking-widest text-[#D4AF37] uppercase">
                {t("collabLabel")}
              </span>
              <h3 className="text-2xl leading-tight font-extrabold tracking-tight sm:text-4xl">
                {t("collabTitle")}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-blue-200/90 sm:text-base">
                {t("collabSupporting")}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Link
                href="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] px-7 py-3.5 text-xs font-bold tracking-wider text-slate-950 uppercase transition-all hover:shadow-lg"
              >
                <span>{t("collabPrimary")}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 text-xs font-bold tracking-wider text-white uppercase transition-all hover:border-white"
              >
                {t("collabSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
