"use client";

import { useState, useTransition } from "react";
import {
  deleteCapabilityPillar,
  deleteProcessStep,
  deleteTrustSector,
  saveCapabilityPillar,
  saveProcessStep,
  saveTrustSector,
} from "@/lib/admin/actions";
import type {
  CapabilityPillar,
  ProcessStep,
  TrustSector,
} from "@/lib/supabase/types";

type Props = {
  trustSectors: TrustSector[];
  processSteps: ProcessStep[];
  pillars: CapabilityPillar[];
};

export function ContentManager({ trustSectors, processSteps, pillars }: Props) {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {message ? <p className="text-xs text-slate-400">{message}</p> : null}

      <section className="space-y-4">
        <h2 className="text-lg font-black text-[#D4AF37]">Trust sectors</h2>
        <div className="space-y-3">
          {trustSectors.map((row) => (
            <TrustRow
              key={row.id}
              row={row}
              pending={pending}
              onSave={(patch) =>
                startTransition(async () => {
                  const result = await saveTrustSector(row.id, {
                    slug: row.slug,
                    name: patch.name ?? row.name,
                    proof: patch.proof,
                    metric: patch.metric,
                    icon: patch.icon,
                    sort_order: patch.sort_order,
                    is_published: patch.is_published,
                  });
                  setMessage(result.ok ? "Trust sector saved." : result.error);
                  if (result.ok) window.location.reload();
                })
              }
              onDelete={() =>
                startTransition(async () => {
                  if (!confirm("Delete trust sector?")) return;
                  await deleteTrustSector(row.id);
                  window.location.reload();
                })
              }
            />
          ))}
        </div>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              const slug = `sector-${Date.now()}`;
              await saveTrustSector(null, {
                slug,
                name: "New sector",
                proof: "",
                metric: "",
                icon: "building",
                sort_order: trustSectors.length,
                is_published: false,
              });
              window.location.reload();
            })
          }
          className="rounded-xl border border-[#D4AF37]/40 px-3 py-2 text-xs font-bold text-[#D4AF37]"
        >
          + Add trust sector
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-[#D4AF37]">Process steps</h2>
        {processSteps.map((row) => (
          <ProcessRow
            key={row.id}
            row={row}
            pending={pending}
            onSave={(patch) =>
              startTransition(async () => {
                const result = await saveProcessStep(row.id, {
                  step_key: row.step_key,
                  title: patch.title ?? row.title,
                  description: patch.description,
                  deliverables: patch.deliverables,
                  sort_order: patch.sort_order,
                  is_published: patch.is_published,
                });
                setMessage(result.ok ? "Process step saved." : result.error);
                if (result.ok) window.location.reload();
              })
            }
            onDelete={() =>
              startTransition(async () => {
                if (!confirm("Delete process step?")) return;
                await deleteProcessStep(row.id);
                window.location.reload();
              })
            }
          />
        ))}
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await saveProcessStep(null, {
                step_key: `step-${Date.now()}`,
                title: "New step",
                description: "",
                deliverables: [],
                sort_order: processSteps.length,
                is_published: false,
              });
              window.location.reload();
            })
          }
          className="rounded-xl border border-[#D4AF37]/40 px-3 py-2 text-xs font-bold text-[#D4AF37]"
        >
          + Add process step
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-[#D4AF37]">Capability pillars</h2>
        {pillars.map((row) => (
          <PillarRow
            key={row.id}
            row={row}
            pending={pending}
            onSave={(patch) =>
              startTransition(async () => {
                const result = await saveCapabilityPillar(row.id, {
                  slug: row.slug,
                  title: patch.title ?? row.title,
                  tagline: patch.tagline,
                  icon: patch.icon,
                  technologies: patch.technologies,
                  sort_order: patch.sort_order,
                  is_published: patch.is_published,
                });
                setMessage(result.ok ? "Pillar saved." : result.error);
                if (result.ok) window.location.reload();
              })
            }
            onDelete={() =>
              startTransition(async () => {
                if (!confirm("Delete pillar?")) return;
                await deleteCapabilityPillar(row.id);
                window.location.reload();
              })
            }
          />
        ))}
      </section>
    </div>
  );
}

function TrustRow({
  row,
  pending,
  onSave,
  onDelete,
}: {
  row: TrustSector;
  pending: boolean;
  onSave: (patch: Partial<TrustSector>) => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(row.name);
  const [proof, setProof] = useState(row.proof);
  const [metric, setMetric] = useState(row.metric);
  const [published, setPublished] = useState(row.is_published);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#081B38] p-4 space-y-2">
      <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
      <input className={inputClass} value={proof} onChange={(e) => setProof(e.target.value)} placeholder="Proof" />
      <input className={inputClass} value={metric} onChange={(e) => setMetric(e.target.value)} placeholder="Metric" />
      <label className="inline-flex items-center gap-2 text-xs">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        Published
      </label>
      <div className="flex gap-2">
        <button type="button" disabled={pending} onClick={() => onSave({ name, proof, metric, is_published: published })} className="rounded-lg bg-[#D4AF37] px-3 py-1.5 text-[11px] font-bold text-slate-950">Save</button>
        <button type="button" disabled={pending} onClick={onDelete} className="rounded-lg border border-red-500/30 px-3 py-1.5 text-[11px] font-bold text-red-300">Delete</button>
      </div>
    </div>
  );
}

function ProcessRow({
  row,
  pending,
  onSave,
  onDelete,
}: {
  row: ProcessStep;
  pending: boolean;
  onSave: (patch: Partial<ProcessStep>) => void;
  onDelete: () => void;
}) {
  const [title, setTitle] = useState(row.title);
  const [description, setDescription] = useState(row.description);
  const [deliverablesText, setDeliverablesText] = useState(
    (row.deliverables ?? []).join("\n"),
  );
  const [published, setPublished] = useState(row.is_published);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#081B38] p-4 space-y-2">
      <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className={inputClass} rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      <textarea className={inputClass} rows={3} value={deliverablesText} onChange={(e) => setDeliverablesText(e.target.value)} placeholder="Deliverables (one per line)" />
      <label className="inline-flex items-center gap-2 text-xs">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        Published
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            onSave({
              title,
              description,
              deliverables: deliverablesText
                .split("\n")
                .map((d) => d.trim())
                .filter(Boolean),
              is_published: published,
            })
          }
          className="rounded-lg bg-[#D4AF37] px-3 py-1.5 text-[11px] font-bold text-slate-950"
        >
          Save
        </button>
        <button type="button" disabled={pending} onClick={onDelete} className="rounded-lg border border-red-500/30 px-3 py-1.5 text-[11px] font-bold text-red-300">Delete</button>
      </div>
    </div>
  );
}

function PillarRow({
  row,
  pending,
  onSave,
  onDelete,
}: {
  row: CapabilityPillar;
  pending: boolean;
  onSave: (patch: Partial<CapabilityPillar>) => void;
  onDelete: () => void;
}) {
  const [title, setTitle] = useState(row.title);
  const [tagline, setTagline] = useState(row.tagline);
  const [techText, setTechText] = useState(
    (row.technologies ?? []).map((t) => `${t.name}|${t.desc}`).join("\n"),
  );
  const [published, setPublished] = useState(row.is_published);

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#081B38] p-4 space-y-2">
      <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className={inputClass} value={tagline} onChange={(e) => setTagline(e.target.value)} />
      <textarea
        className={inputClass}
        rows={4}
        value={techText}
        onChange={(e) => setTechText(e.target.value)}
        placeholder="Technologies: Name|Description per line"
      />
      <label className="inline-flex items-center gap-2 text-xs">
        <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
        Published
      </label>
      <div className="flex gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            onSave({
              title,
              tagline,
              is_published: published,
              technologies: techText
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                  const [name, ...rest] = line.split("|");
                  return { name: name.trim(), desc: rest.join("|").trim() };
                })
                .filter((t) => t.name),
            })
          }
          className="rounded-lg bg-[#D4AF37] px-3 py-1.5 text-[11px] font-bold text-slate-950"
        >
          Save
        </button>
        <button type="button" disabled={pending} onClick={onDelete} className="rounded-lg border border-red-500/30 px-3 py-1.5 text-[11px] font-bold text-red-300">Delete</button>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#051329] px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none";
