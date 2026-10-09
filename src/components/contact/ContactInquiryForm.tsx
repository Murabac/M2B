"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { buildWhatsAppWebUrl } from "@/lib/contact/channels";

const PROJECT_TYPE_IDS = [
  "ministry",
  "erp",
  "school",
  "mobile",
  "commerce",
  "website",
] as const;

type ProjectTypeId = (typeof PROJECT_TYPE_IDS)[number];

type FieldError =
  | "missing_fields"
  | "invalid_name"
  | "invalid_email"
  | "invalid_phone"
  | "invalid_brief"
  | "no_whatsapp";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#051329] p-3 text-xs text-white transition-all focus:border-[#D4AF37] focus:outline-none";
const inputErrorClass =
  "w-full rounded-xl border border-red-500/50 bg-[#051329] p-3 text-xs text-white transition-all focus:border-red-400 focus:outline-none";

type Props = {
  whatsappDigits: string;
};

function isValidName(value: string) {
  // Letters (incl. Latin extended), spaces, apostrophe, hyphen — at least 2 letters
  if (value.length < 2 || value.length > 80) return false;
  if (!/[\p{L}]{2,}/u.test(value)) return false;
  if (/^\d+$/.test(value)) return false;
  return /^[\p{L}\p{M}\s'.-]+$/u.test(value);
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value) && value.length <= 120;
}

function isValidPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  // International-ish: 8–15 digits (E.164 max)
  return digits.length >= 8 && digits.length <= 15;
}

export function ContactInquiryForm({ whatsappDigits }: Props) {
  const t = useTranslations("ContactPage");
  const [submitted, setSubmitted] = useState(false);
  const [errorKey, setErrorKey] = useState<FieldError | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    brief?: boolean;
  }>({});
  const [projectType, setProjectType] = useState<ProjectTypeId>("ministry");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [brief, setBrief] = useState("");

  function resetForm() {
    setSubmitted(false);
    setErrorKey(null);
    setFieldErrors({});
    setProjectType("ministry");
    setFullName("");
    setEmail("");
    setOrganization("");
    setPhone("");
    setBrief("");
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorKey(null);

    const name = fullName.trim().replace(/\s+/g, " ");
    const mail = email.trim().toLowerCase();
    const tel = phone.trim();
    const org = organization.trim().slice(0, 120);
    const goals = brief.trim();
    const typeLabel = t(
      `projectTypes.${projectType}` as `projectTypes.${ProjectTypeId}`,
    );

    const nextFieldErrors: typeof fieldErrors = {};
    let nextError: FieldError | null = null;

    if (!name || !mail || !tel) {
      nextError = "missing_fields";
      if (!name) nextFieldErrors.fullName = true;
      if (!mail) nextFieldErrors.email = true;
      if (!tel) nextFieldErrors.phone = true;
    } else if (!isValidName(name)) {
      nextError = "invalid_name";
      nextFieldErrors.fullName = true;
    } else if (!isValidEmail(mail)) {
      nextError = "invalid_email";
      nextFieldErrors.email = true;
    } else if (!isValidPhone(tel)) {
      nextError = "invalid_phone";
      nextFieldErrors.phone = true;
    } else if (goals.length > 0 && goals.length < 12) {
      nextError = "invalid_brief";
      nextFieldErrors.brief = true;
    } else if (goals.length > 2000) {
      nextError = "invalid_brief";
      nextFieldErrors.brief = true;
    }

    if (nextError) {
      setFieldErrors(nextFieldErrors);
      setErrorKey(nextError);
      return;
    }

    const digits = whatsappDigits.replace(/\D/g, "");
    if (!digits) {
      setErrorKey("no_whatsapp");
      return;
    }

    setFieldErrors({});

    const lines = [
      "*New project inquiry*",
      "m2btek.com/contact",
      "────────────────",
      `*Type:* ${typeLabel}`,
      `*Name:* ${name}`,
      `*Email:* ${mail}`,
      `*Phone:* ${tel}`,
    ];
    if (org) lines.push(`*Org:* ${org}`);
    if (goals) {
      lines.push("────────────────", "*Brief:*", goals);
    }

    const href = buildWhatsAppWebUrl(digits, lines.join("\n"));
    window.location.assign(href);
    setSubmitted(true);
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
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="full-name"
            className="mb-1 block font-mono text-xs font-semibold text-slate-400"
          >
            {t("fullName")} *
          </label>
          <input
            id="full-name"
            type="text"
            autoComplete="name"
            maxLength={80}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setFieldErrors((f) => ({ ...f, fullName: false }));
            }}
            placeholder={t("fullNamePlaceholder")}
            className={fieldErrors.fullName ? inputErrorClass : inputClass}
            aria-invalid={fieldErrors.fullName || undefined}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block font-mono text-xs font-semibold text-slate-400"
          >
            {t("email")} *
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setFieldErrors((f) => ({ ...f, email: false }));
            }}
            placeholder={t("emailPlaceholder")}
            className={fieldErrors.email ? inputErrorClass : inputClass}
            aria-invalid={fieldErrors.email || undefined}
          />
        </div>
        <div>
          <label
            htmlFor="organization"
            className="mb-1 block font-mono text-xs font-semibold text-slate-400"
          >
            {t("organization")}
          </label>
          <input
            id="organization"
            type="text"
            autoComplete="organization"
            maxLength={120}
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder={t("organizationPlaceholder")}
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1 block font-mono text-xs font-semibold text-slate-400"
          >
            {t("phone")} *
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={20}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setFieldErrors((f) => ({ ...f, phone: false }));
            }}
            placeholder={t("phonePlaceholder")}
            className={fieldErrors.phone ? inputErrorClass : inputClass}
            aria-invalid={fieldErrors.phone || undefined}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="brief"
          className="mb-1 block font-mono text-xs font-semibold text-slate-400"
        >
          {t("brief")}
        </label>
        <textarea
          id="brief"
          rows={4}
          maxLength={2000}
          value={brief}
          onChange={(e) => {
            setBrief(e.target.value);
            setFieldErrors((f) => ({ ...f, brief: false }));
          }}
          placeholder={t("briefPlaceholder")}
          className={fieldErrors.brief ? inputErrorClass : inputClass}
          aria-invalid={fieldErrors.brief || undefined}
        />
      </div>

      {errorKey ? (
        <p
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300"
          role="alert"
        >
          {t(`errors.${errorKey}`)}
        </p>
      ) : null}

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] py-4 text-xs font-bold tracking-wider text-slate-950 uppercase transition-all hover:shadow-xl"
      >
        <span>{t("submit")}</span>
        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </form>
  );
}
