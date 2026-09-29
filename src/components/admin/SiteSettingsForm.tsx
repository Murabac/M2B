"use client";

import { useState, useTransition } from "react";
import {
  resetSiteSettingsDefaults,
  updateSiteSettings,
} from "@/lib/admin/actions";
import type { SiteSettings } from "@/lib/supabase/types";

type Mode = "studio" | "products" | "settings";

type Props = {
  settings: SiteSettings;
  mode: Mode;
};

export function SiteSettingsForm({ settings, mode }: Props) {
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState(settings);
  const [message, setMessage] = useState<string | null>(null);

  function patch<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function save(partial?: Partial<SiteSettings>) {
    setMessage(null);
    startTransition(async () => {
      const result = await updateSiteSettings(partial ?? form);
      if (!result.ok) {
        setMessage(result.error);
        return;
      }
      setMessage("Saved.");
    });
  }

  if (mode === "products") {
    return (
      <div className="space-y-6">
        <p className="text-sm text-slate-400">
          Public proof stats shown on home / products marketing surfaces.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["stats_towers_inspected", "Towers inspected"],
              ["stats_listeners_count", "Listeners"],
              ["stats_schools_managed", "Schools managed"],
              ["stats_mobile_money_processed", "Mobile money processed"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block">
              <span className="mb-1 block font-mono text-xs text-slate-400">
                {label}
              </span>
              <input
                className={inputClass}
                value={form[key]}
                onChange={(e) => patch(key, e.target.value)}
              />
            </label>
          ))}
        </div>
        <SaveBar pending={pending} message={message} onSave={() => save({
          stats_towers_inspected: form.stats_towers_inspected,
          stats_listeners_count: form.stats_listeners_count,
          stats_schools_managed: form.stats_schools_managed,
          stats_mobile_money_processed: form.stats_mobile_money_processed,
        })} />
      </div>
    );
  }

  if (mode === "settings") {
    return (
      <div className="space-y-6">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.announcement_enabled}
            onChange={(e) => patch("announcement_enabled", e.target.checked)}
          />
          Enable announcement bar
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Text (EN)">
            <input
              className={inputClass}
              value={form.announcement_text_en}
              onChange={(e) => patch("announcement_text_en", e.target.value)}
            />
          </Field>
          <Field label="Text (SO)">
            <input
              className={inputClass}
              value={form.announcement_text_so}
              onChange={(e) => patch("announcement_text_so", e.target.value)}
            />
          </Field>
          <Field label="Action (EN)">
            <input
              className={inputClass}
              value={form.announcement_action_en}
              onChange={(e) => patch("announcement_action_en", e.target.value)}
            />
          </Field>
          <Field label="Action (SO)">
            <input
              className={inputClass}
              value={form.announcement_action_so}
              onChange={(e) => patch("announcement_action_so", e.target.value)}
            />
          </Field>
          <Field label="Action URL">
            <input
              className={inputClass}
              value={form.announcement_action_url}
              onChange={(e) => patch("announcement_action_url", e.target.value)}
            />
          </Field>
          <Field label="Tone">
            <select
              className={inputClass}
              value={form.announcement_tone}
              onChange={(e) =>
                patch(
                  "announcement_tone",
                  e.target.value as SiteSettings["announcement_tone"],
                )
              }
            >
              <option value="gold">gold</option>
              <option value="navy">navy</option>
              <option value="emerald">emerald</option>
            </select>
          </Field>
        </div>
        <SaveBar
          pending={pending}
          message={message}
          onSave={() =>
            save({
              announcement_enabled: form.announcement_enabled,
              announcement_text_en: form.announcement_text_en,
              announcement_text_so: form.announcement_text_so,
              announcement_action_en: form.announcement_action_en,
              announcement_action_so: form.announcement_action_so,
              announcement_action_url: form.announcement_action_url,
              announcement_tone: form.announcement_tone,
            })
          }
        />
        <div className="rounded-2xl border border-slate-800 p-4">
          <h3 className="mb-2 font-bold">Danger zone</h3>
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (!confirm("Reset site settings to defaults?")) return;
              startTransition(async () => {
                const result = await resetSiteSettingsDefaults();
                setMessage(result.ok ? "Reset to defaults." : result.error);
                if (result.ok) window.location.reload();
              });
            }}
            className="rounded-xl border border-red-500/40 px-4 py-2 text-xs font-bold text-red-300"
          >
            Reset defaults
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            const blob = new Blob([JSON.stringify(form, null, 2)], {
              type: "application/json",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "m2b-site-settings.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold"
        >
          Export JSON backup
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="space-y-4 rounded-2xl border border-slate-800 bg-[#081B38] p-6">
        <h2 className="font-bold text-[#D4AF37]">Founder / leadership</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <input className={inputClass} value={form.founder_name} onChange={(e) => patch("founder_name", e.target.value)} />
          </Field>
          <Field label="Role">
            <input className={inputClass} value={form.founder_role} onChange={(e) => patch("founder_role", e.target.value)} />
          </Field>
          <Field label="Experience years">
            <input
              type="number"
              className={inputClass}
              value={form.founder_experience_years}
              onChange={(e) =>
                patch("founder_experience_years", Number(e.target.value) || 0)
              }
            />
          </Field>
        </div>
        <Field label="Bio">
          <textarea
            rows={4}
            className={inputClass}
            value={form.founder_bio}
            onChange={(e) => patch("founder_bio", e.target.value)}
          />
        </Field>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-800 bg-[#081B38] p-6">
        <h2 className="font-bold text-[#D4AF37]">Headquarters</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City">
            <input className={inputClass} value={form.city} onChange={(e) => patch("city", e.target.value)} />
          </Field>
          <Field label="Country">
            <input className={inputClass} value={form.country} onChange={(e) => patch("country", e.target.value)} />
          </Field>
          <Field label="Office address">
            <input className={inputClass} value={form.office_address} onChange={(e) => patch("office_address", e.target.value)} />
          </Field>
          <Field label="Coordinates">
            <input className={inputClass} value={form.coordinates} onChange={(e) => patch("coordinates", e.target.value)} />
          </Field>
          <Field label="Weekday hours">
            <input className={inputClass} value={form.business_hours_weekdays} onChange={(e) => patch("business_hours_weekdays", e.target.value)} />
          </Field>
          <Field label="Friday hours">
            <input className={inputClass} value={form.business_hours_friday} onChange={(e) => patch("business_hours_friday", e.target.value)} />
          </Field>
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-slate-800 bg-[#081B38] p-6">
        <h2 className="font-bold text-[#D4AF37]">Contact channels</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email">
            <input className={inputClass} value={form.email} onChange={(e) => patch("email", e.target.value)} />
          </Field>
          <Field label="WhatsApp (digits)">
            <input className={inputClass} value={form.whatsapp} onChange={(e) => patch("whatsapp", e.target.value)} />
          </Field>
          <Field label="Phone primary">
            <input className={inputClass} value={form.phone_primary} onChange={(e) => patch("phone_primary", e.target.value)} />
          </Field>
          <Field label="Phone secondary">
            <input className={inputClass} value={form.phone_secondary} onChange={(e) => patch("phone_secondary", e.target.value)} />
          </Field>
        </div>
      </section>

      <SaveBar pending={pending} message={message} onSave={() => save()} />
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-mono text-xs text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function SaveBar({
  pending,
  message,
  onSave,
}: {
  pending: boolean;
  message: string | null;
  onSave: () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={pending}
        onClick={onSave}
        className="rounded-xl bg-[#D4AF37] px-5 py-2.5 text-xs font-bold text-slate-950 disabled:opacity-70"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
      {message ? <span className="text-xs text-slate-400">{message}</span> : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#051329] px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none";
