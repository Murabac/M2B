"use client";

import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import {
  submitContactInquiry,
  type ContactInquiryResult,
} from "@/lib/contact/submit-inquiry";

const ERROR_KEYS = [
  "missing_fields",
  "invalid_email",
  "invalid_amount",
  "not_configured",
  "submit_failed",
] as const;

type ErrorKey = (typeof ERROR_KEYS)[number];

function isErrorKey(value: string): value is ErrorKey {
  return (ERROR_KEYS as readonly string[]).includes(value);
}

const PROJECT_TYPE_IDS = [
  "ministry",
  "erp",
  "school",
  "mobile",
  "commerce",
  "website",
] as const;

type ProjectTypeId = (typeof PROJECT_TYPE_IDS)[number];


const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#051329] p-3 text-xs text-white transition-all focus:border-[#D4AF37] focus:outline-none";

export function ContactInquiryForm() {
  const t = useTranslations("ContactPage");
  const locale = useLocale();
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState(false);
  const [errorKey, setErrorKey] = useState<ErrorKey | null>(null);
  const [projectType, setProjectType] = useState<ProjectTypeId>("ministry");
  const [amount, setAmount] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [brief, setBrief] = useState("");

  function resetForm() {
    setSubmitted(false);
    setErrorKey(null);
    setProjectType("ministry");
    setAmount("");
    setFullName("");
    setEmail("");
    setOrganization("");
    setPhone("");
    setBrief("");
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorKey(null);

    startTransition(async () => {
      const result: ContactInquiryResult = await submitContactInquiry({
        projectType: t(`projectTypes.${projectType}` as `projectTypes.${ProjectTypeId}`),
        estimatedAmountUsd: amount,
        fullName,
        email,
        organization,
        phone,
        projectBrief: brief,
        locale,
      });

      if (!result.ok) {
        setErrorKey(isErrorKey(result.error) ? result.error : "submit_failed");
        return;
      }
      setSubmitted(true);
    });
  }

  if (submitted) {
    return (
      <div className="space-y-4 py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold">{t("successTitle")}</h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-300">
          {t("successBody")}
        </p>
        <button
          type="button"
          onClick={resetForm}
          className="mt-4 rounded-xl bg-[#D4AF37] px-6 py-2.5 font-mono text-xs font-bold text-slate-950"
        >
          {t("successAgain")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div>
        <label className="mb-3 block font-mono text-xs font-bold tracking-wider text-slate-400 uppercase">
          {t("stepType")}
        </label>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {PROJECT_TYPE_IDS.map((id) => {
            const active = projectType === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setProjectType(id)}
                className={`rounded-xl border p-3 text-left text-xs font-semibold transition-all ${
                  active
                    ? "border-[#D4AF37] bg-[#0B2F6B] font-bold text-[#D4AF37] shadow-sm"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-[#D4AF37]/40"
                }`}
              >
                {t(`projectTypes.${id}` as `projectTypes.${ProjectTypeId}`)}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label
          htmlFor="estimated-amount"
          className="mb-3 block font-mono text-xs font-bold tracking-wider text-slate-400 uppercase"
        >
          {t("stepBudget")}
        </label>
        <div className="relative max-w-xs">
          <span className="pointer-events-none absolute inset-y-0 start-3 flex items-center font-mono text-xs font-bold text-[#D4AF37]">
            USD
          </span>
          <input
            id="estimated-amount"
            type="text"
            inputMode="decimal"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={t("amountPlaceholder")}
            className={`${inputClass} ps-14`}
            aria-describedby="amount-hint"
          />
        </div>
        <p id="amount-hint" className="mt-2 font-mono text-[11px] text-slate-500">
          {t("amountHint")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="full-name" className="mb-1 block font-mono text-xs font-semibold text-slate-400">
            {t("fullName")} *
          </label>
          <input
            id="full-name"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t("fullNamePlaceholder")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1 block font-mono text-xs font-semibold text-slate-400">
            {t("email")} *
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("emailPlaceholder")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="organization" className="mb-1 block font-mono text-xs font-semibold text-slate-400">
            {t("organization")}
          </label>
          <input
            id="organization"
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder={t("organizationPlaceholder")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block font-mono text-xs font-semibold text-slate-400">
            {t("phone")} *
          </label>
          <input
            id="phone"
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("phonePlaceholder")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="brief" className="mb-1 block font-mono text-xs font-semibold text-slate-400">
          {t("brief")}
        </label>
        <textarea
          id="brief"
          rows={4}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder={t("briefPlaceholder")}
          className={inputClass}
        />
      </div>

      {errorKey ? (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300" role="alert">
          {t(`errors.${errorKey}` as `errors.${ErrorKey}`)}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] py-4 text-xs font-bold tracking-wider text-slate-950 uppercase transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span>{pending ? t("submitting") : t("submit")}</span>
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
