"use client";

import { useState, useTransition } from "react";
import { deleteService, saveService } from "@/lib/admin/actions";
import type { Service } from "@/lib/supabase/types";

type Props = { services: Service[] };

export function ServicesManager({ services }: Props) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    icon: "code",
    bulletsText: "",
    sort_order: 0,
    is_published: false,
  });
  const [error, setError] = useState<string | null>(null);

  function openCreate() {
    setCreating(true);
    setEditing(null);
    setForm({
      slug: "",
      title: "",
      description: "",
      icon: "code",
      bulletsText: "",
      sort_order: services.length,
      is_published: false,
    });
  }

  function openEdit(service: Service) {
    setCreating(false);
    setEditing(service);
    setForm({
      slug: service.slug,
      title: service.title,
      description: service.description,
      icon: service.icon,
      bulletsText: (service.bullets ?? []).join("\n"),
      sort_order: service.sort_order,
      is_published: service.is_published,
    });
  }

  function onSave() {
    setError(null);
    startTransition(async () => {
      const result = await saveService(editing?.id ?? null, {
        slug: form.slug,
        title: form.title,
        description: form.description,
        icon: form.icon,
        bullets: form.bulletsText
          .split("\n")
          .map((b) => b.trim())
          .filter(Boolean),
        sort_order: form.sort_order,
        is_published: form.is_published,
      });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      window.location.reload();
    });
  }

  const showForm = creating || editing;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={openCreate}
        className="rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-slate-950"
      >
        + New service
      </button>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <div key={s.id} className="rounded-2xl border border-slate-800 bg-[#081B38] p-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-bold">{s.title}</h3>
              <span className="font-mono text-[10px] text-slate-400">
                {s.is_published ? "LIVE" : "DRAFT"}
              </span>
            </div>
            <p className="mb-3 line-clamp-2 text-sm text-slate-400">{s.description}</p>
            <ul className="mb-4 list-disc space-y-1 ps-4 text-xs text-slate-300">
              {(s.bullets ?? []).slice(0, 3).map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => openEdit(s)}
                className="rounded-lg bg-[#0B2F6B] px-2.5 py-1 text-[11px] font-bold text-[#D4AF37]"
              >
                Edit
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  if (!confirm(`Delete “${s.title}”?`)) return;
                  startTransition(async () => {
                    await deleteService(s.id);
                    window.location.reload();
                  });
                }}
                className="rounded-lg border border-red-500/30 px-2.5 py-1 text-[11px] font-bold text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-700 bg-[#06152F] p-6">
            <h2 className="mb-4 text-lg font-black">
              {editing ? "Edit service" : "New service"}
            </h2>
            <div className="space-y-3">
              <input className={inputClass} placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <input className={inputClass} placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              <input className={inputClass} placeholder="Icon key" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
              <textarea className={inputClass} rows={3} placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <textarea className={inputClass} rows={5} placeholder="Bullets (one per line)" value={form.bulletsText} onChange={(e) => setForm({ ...form, bulletsText: e.target.value })} />
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} />
                Published
              </label>
              {error ? <p className="text-xs text-red-300">{error}</p> : null}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => { setCreating(false); setEditing(null); }} className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold">Cancel</button>
                <button type="button" disabled={pending} onClick={onSave} className="rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-slate-950">Save</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#051329] px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none";
