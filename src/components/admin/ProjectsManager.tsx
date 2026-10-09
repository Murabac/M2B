"use client";

import { useMemo, useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import {
  deleteProject,
  saveProject,
  toggleProjectField,
  uploadProjectImage,
  deleteProjectImage,
  saveTestimonial,
  deleteTestimonial,
  type ProjectInput,
} from "@/lib/admin/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type {
  Project,
  ProjectCategory,
  ProjectImage,
  ProjectMetric,
  Testimonial,
  WorkCategory,
} from "@/lib/supabase/types";

const CATEGORIES: ProjectCategory[] = [
  "web_app",
  "mobile_app",
  "erp",
  "website_ecommerce",
];

const WORK_CATEGORIES: WorkCategory[] = [
  "government",
  "operations",
  "education",
  "faith",
  "commerce",
  "mobile",
  "websites",
];

const STATUSES = ["Live", "In Production", "Studio Product", "Coming Soon"];

type ProjectFull = Project & {
  project_images?: ProjectImage[];
  testimonials?: Testimonial[];
};

type Props = {
  projects: Project[];
  initialOpenNew?: boolean;
  detail?: ProjectFull | null;
};

const emptyForm = (): ProjectInput => ({
  title: "",
  slug: "",
  tagline: "",
  description: "",
  category: "web_app",
  work_category: "government",
  sector: "",
  status: "Live",
  outcome: "",
  problem: "",
  approach: "",
  highlights: [],
  stack: [],
  metrics: [],
  client_name: "",
  year: new Date().getFullYear(),
  live_url: "",
  app_store_url: "",
  play_store_url: "",
  cover_image_url: "",
  logo_url: "",
  mesh_preview: "dashboard",
  mesh_category: "",
  accent_color: "#D4AF37",
  stack_line: "",
  metric_label: "",
  show_in_hero: false,
  hero_sort_order: 0,
  show_in_bento: false,
  bento_sort_order: 0,
  is_published: false,
  is_featured: false,
  sort_order: 0,
});

export function ProjectsManager({ projects, initialOpenNew, detail }: Props) {
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [editorOpen, setEditorOpen] = useState(Boolean(initialOpenNew) || Boolean(detail));
  const [editingId, setEditingId] = useState<string | null>(detail?.id ?? null);
  const [form, setForm] = useState<ProjectInput>(() =>
    detail
      ? {
          title: detail.title,
          slug: detail.slug,
          tagline: detail.tagline,
          description: detail.description,
          category: detail.category,
          work_category: detail.work_category as WorkCategory,
          sector: detail.sector,
          status: detail.status,
          outcome: detail.outcome,
          problem: detail.problem ?? "",
          approach: detail.approach ?? "",
          highlights: detail.highlights ?? [],
          stack: detail.stack ?? [],
          metrics: detail.metrics ?? [],
          client_name: detail.client_name,
          year: detail.year,
          live_url: detail.live_url,
          app_store_url: detail.app_store_url,
          play_store_url: detail.play_store_url,
          cover_image_url: detail.cover_image_url,
          logo_url: detail.logo_url,
          mesh_preview: detail.mesh_preview,
          mesh_category: detail.mesh_category,
          accent_color: detail.accent_color,
          stack_line: detail.stack_line,
          metric_label: detail.metric_label,
          is_published: detail.is_published,
          is_featured: detail.is_featured,
          show_in_hero: detail.show_in_hero,
          hero_sort_order: detail.hero_sort_order,
          show_in_bento: detail.show_in_bento,
          bento_sort_order: detail.bento_sort_order,
          sort_order: detail.sort_order,
        }
      : emptyForm(),
  );
  const [stackInput, setStackInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [images, setImages] = useState<ProjectImage[]>(detail?.project_images ?? []);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    detail?.testimonials ?? [],
  );
  const [testimonialDraft, setTestimonialDraft] = useState({
    author_name: "",
    author_role: "",
    author_image_url: "",
    quote: "",
  });

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client_name?.toLowerCase().includes(q) ||
        p.sector?.toLowerCase().includes(q);
      const matchesFilter =
        filter === "all" ||
        p.work_category === filter ||
        (filter === "published" && p.is_published) ||
        (filter === "draft" && !p.is_published);
      return matchesQuery && matchesFilter;
    });
  }, [projects, query, filter]);

  function openNew() {
    setEditingId(null);
    setForm(emptyForm());
    setImages([]);
    setTestimonials([]);
    setEditorOpen(true);
    setError(null);
  }

  function openEdit(project: Project) {
    window.location.href = `/admin/projects?edit=${project.id}`;
  }

  function onSave() {
    setError(null);
    startTransition(async () => {
      const result = await saveProject(editingId, form);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      const id = result.id ?? editingId;
      // Avoid hard navigation while the Server Action stream is still open
      // (that races and surfaces as "Error in input stream").
      if (!editingId && id) {
        setEditingId(id);
        window.history.replaceState(null, "", `/admin/projects?edit=${id}`);
      }
    });
  }

  function onUpload(fileList: FileList | null) {
    if (!editingId || !fileList?.length) return;
    const files = Array.from(fileList);
    startTransition(async () => {
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          setError(`“${file.name}” is over 5MB.`);
          return;
        }
        const fd = new FormData();
        fd.set("file", file);
        try {
          const result = await uploadProjectImage(editingId, fd);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          if (result.id && result.url) {
            setImages((prev) => [
              ...prev,
              {
                id: result.id!,
                project_id: editingId,
                image_url: result.url,
                alt_text: file.name,
                sort_order: prev.length,
                created_at: new Date().toISOString(),
              },
            ]);
          }
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : "Upload failed. Try a smaller image.",
          );
          return;
        }
      }
    });
  }

  function onDelete(id: string, title: string) {
    if (!confirm(`Delete “${title}”?`)) return;
    startTransition(async () => {
      await deleteProject(id);
      window.location.reload();
    });
  }

  function addStackTag() {
    const tag = stackInput.trim();
    if (!tag) return;
    setForm((f) => ({ ...f, stack: [...(f.stack ?? []), tag] }));
    setStackInput("");
  }

  function addMetric() {
    const metrics = form.metrics ?? [];
    if (metrics.length >= 4) return;
    setForm((f) => ({
      ...f,
      metrics: [...(f.metrics ?? []), { label: "", value: "" }],
    }));
  }

  function updateMetric(index: number, patch: Partial<ProjectMetric>) {
    setForm((f) => ({
      ...f,
      metrics: (f.metrics ?? []).map((m, i) => (i === index ? { ...m, ...patch } : m)),
    }));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects…"
          className="w-full rounded-xl border border-white/10 bg-[#081B38] px-3 py-2.5 text-sm text-white sm:max-w-sm"
        />
        <button
          type="button"
          onClick={openNew}
          className="rounded-xl bg-[#D4AF37] px-4 py-2.5 text-xs font-bold text-slate-950"
        >
          + New Project
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", "published", "draft", ...WORK_CATEGORIES].map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`rounded-lg px-3 py-1.5 font-mono text-[11px] font-bold uppercase ${
              filter === key
                ? "bg-[#D4AF37] text-slate-950"
                : "border border-white/10 text-slate-400 hover:border-[#D4AF37]/40"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="rounded-2xl border border-slate-800 bg-[#081B38] p-5"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div>
                <div className="font-mono text-[10px] text-[#D4AF37] uppercase">
                  {project.work_category} · {project.status}
                </div>
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-xs text-slate-400">{project.client_name}</p>
              </div>
              <span
                className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold ${
                  project.is_published
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {project.is_published ? "LIVE" : "DRAFT"}
              </span>
            </div>
            <p className="mb-4 line-clamp-2 text-sm text-slate-300">
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    await toggleProjectField(
                      project.id,
                      "is_published",
                      !project.is_published,
                    );
                    window.location.reload();
                  })
                }
                className="rounded-lg border border-white/10 px-2.5 py-1 text-[11px] font-bold"
              >
                {project.is_published ? "Unpublish" : "Publish"}
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    await toggleProjectField(
                      project.id,
                      "is_featured",
                      !project.is_featured,
                    );
                    window.location.reload();
                  })
                }
                className="rounded-lg border border-white/10 px-2.5 py-1 text-[11px] font-bold"
              >
                {project.is_featured ? "Unfeature" : "Feature"}
              </button>
              <button
                type="button"
                onClick={() => openEdit(project)}
                className="rounded-lg bg-[#0B2F6B] px-2.5 py-1 text-[11px] font-bold text-[#D4AF37]"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(project.id, project.title)}
                className="rounded-lg border border-red-500/30 px-2.5 py-1 text-[11px] font-bold text-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-slate-400">No projects match this filter.</p>
      ) : null}

      {editorOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 sm:items-center">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-700 bg-[#06152F] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-[#06152F] px-6 py-4">
              <div>
                <h2 className="text-lg font-black">
                  {editingId ? "Edit Project" : "New Project"}
                </h2>
                <p className="font-mono text-[10px] text-slate-500">
                  Full case-study fields · gallery · testimonials
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditorOpen(false);
                  if (detail || initialOpenNew) {
                    window.location.href = "/admin/projects";
                  }
                }}
                className="text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="space-y-6 p-6">
              <SectionTitle>Basics</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title *">
                  <input
                    className={inputClass}
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </Field>
                <Field label="Slug">
                  <input
                    className={inputClass}
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="auto from title if empty"
                  />
                </Field>
                <Field label="Client">
                  <input
                    className={inputClass}
                    value={form.client_name ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, client_name: e.target.value })
                    }
                  />
                </Field>
                <Field label="Sector">
                  <input
                    className={inputClass}
                    value={form.sector ?? ""}
                    onChange={(e) => setForm({ ...form, sector: e.target.value })}
                    placeholder="e.g. Telecom · Government"
                  />
                </Field>
                <Field label="Category">
                  <select
                    className={inputClass}
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value as ProjectCategory,
                      })
                    }
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Work category">
                  <select
                    className={inputClass}
                    value={form.work_category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        work_category: e.target.value as WorkCategory,
                      })
                    }
                  >
                    {WORK_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Status">
                  <select
                    className={inputClass}
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Year">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.year ?? ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        year: e.target.value ? Number(e.target.value) : null,
                      })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Case study story</SectionTitle>
              <Field label="Tagline (hero subhead)">
                <input
                  className={inputClass}
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                />
              </Field>
              <Field label="Full description / overview">
                <textarea
                  rows={6}
                  className={inputClass}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Detailed project story shown on the public case page…"
                />
              </Field>
              <Field label="Outcome (impact summary)">
                <textarea
                  rows={3}
                  className={inputClass}
                  value={form.outcome}
                  onChange={(e) => setForm({ ...form, outcome: e.target.value })}
                  placeholder="What changed after shipping…"
                />
              </Field>
              <Field label="The challenge (problem)">
                <textarea
                  rows={4}
                  className={inputClass}
                  value={form.problem ?? ""}
                  onChange={(e) => setForm({ ...form, problem: e.target.value })}
                  placeholder="What was broken / why this product exists…"
                />
              </Field>
              <Field label="How we built it (approach)">
                <textarea
                  rows={4}
                  className={inputClass}
                  value={form.approach ?? ""}
                  onChange={(e) => setForm({ ...form, approach: e.target.value })}
                  placeholder="How the idea was shaped and engineered…"
                />
              </Field>
              <Field label="Interesting points (one per line)">
                <textarea
                  rows={5}
                  className={inputClass}
                  value={(form.highlights ?? []).join("\n")}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      highlights: e.target.value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder={"3–6 shipped highlights…\nOne point per line"}
                />
              </Field>

              <SectionTitle>Links & stores</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Live URL">
                  <input
                    className={inputClass}
                    value={form.live_url ?? ""}
                    onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                  />
                </Field>
                <Field label="App Store URL">
                  <input
                    className={inputClass}
                    value={form.app_store_url ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, app_store_url: e.target.value })
                    }
                  />
                </Field>
                <Field label="Play Store URL">
                  <input
                    className={inputClass}
                    value={form.play_store_url ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, play_store_url: e.target.value })
                    }
                  />
                </Field>
              </div>

              <SectionTitle>Visuals</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-2">
                <ImageUploadField
                  label="Cover image"
                  value={form.cover_image_url ?? ""}
                  folder={editingId ? `projects/${editingId}/cover` : "projects/covers"}
                  onChange={(url) => setForm({ ...form, cover_image_url: url })}
                  hint="Hero / portfolio / product pedestal."
                />
                <ImageUploadField
                  label="Logo"
                  value={form.logo_url ?? ""}
                  folder={editingId ? `projects/${editingId}/logo` : "projects/logos"}
                  onChange={(url) => setForm({ ...form, logo_url: url })}
                  aspect="square"
                  hint="Square mark for constellation & thumbs."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Mesh preview key">
                  <input
                    className={inputClass}
                    value={form.mesh_preview ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, mesh_preview: e.target.value })
                    }
                    placeholder="dashboard | map | mobile…"
                  />
                </Field>
                <Field label="Mesh category label">
                  <input
                    className={inputClass}
                    value={form.mesh_category ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, mesh_category: e.target.value })
                    }
                  />
                </Field>
                <Field label="Accent color">
                  <input
                    className={inputClass}
                    value={form.accent_color ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, accent_color: e.target.value })
                    }
                    placeholder="#D4AF37"
                  />
                </Field>
              </div>

              <SectionTitle>Stack & metrics</SectionTitle>
              <Field label="Stack line (fallback text)">
                <input
                  className={inputClass}
                  value={form.stack_line ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, stack_line: e.target.value })
                  }
                  placeholder="Laravel · Filament · Flutter"
                />
              </Field>
              <div>
                <label className="mb-1 block font-mono text-xs text-slate-400">
                  Stack tags
                </label>
                <div className="mb-2 flex flex-wrap gap-2">
                  {(form.stack ?? []).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          stack: (form.stack ?? []).filter((t) => t !== tag),
                        })
                      }
                      className="rounded bg-slate-800 px-2 py-1 font-mono text-[11px]"
                    >
                      {tag} ×
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className={inputClass}
                    value={stackInput}
                    onChange={(e) => setStackInput(e.target.value)}
                    placeholder="Add stack tag"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addStackTag();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addStackTag}
                    className="rounded-xl bg-[#0B2F6B] px-3 text-xs font-bold text-[#D4AF37]"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="font-mono text-xs text-slate-400">
                    Metrics ribbon (max 4)
                  </label>
                  <button
                    type="button"
                    onClick={addMetric}
                    className="text-xs font-bold text-[#D4AF37]"
                  >
                    + Metric
                  </button>
                </div>
                <Field label="Metric label (optional caption)">
                  <input
                    className={inputClass}
                    value={form.metric_label ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, metric_label: e.target.value })
                    }
                  />
                </Field>
                <div className="mt-2 space-y-2">
                  {(form.metrics ?? []).map((m, i) => (
                    <div key={i} className="grid grid-cols-2 gap-2">
                      <input
                        className={inputClass}
                        placeholder="Label"
                        value={m.label}
                        onChange={(e) =>
                          updateMetric(i, { label: e.target.value })
                        }
                      />
                      <input
                        className={inputClass}
                        placeholder="Value"
                        value={m.value}
                        onChange={(e) =>
                          updateMetric(i, { value: e.target.value })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              <SectionTitle>Publishing</SectionTitle>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Sort order">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.sort_order ?? 0}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sort_order: Number(e.target.value) || 0,
                      })
                    }
                  />
                </Field>
                <Field label="Hero sort">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.hero_sort_order ?? 0}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        hero_sort_order: Number(e.target.value) || 0,
                      })
                    }
                  />
                </Field>
                <Field label="Bento sort">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.bento_sort_order ?? 0}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        bento_sort_order: Number(e.target.value) || 0,
                      })
                    }
                  />
                </Field>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                {(
                  [
                    ["is_published", "Published"],
                    ["is_featured", "Featured"],
                    ["show_in_hero", "Hero"],
                    ["show_in_bento", "Bento"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={Boolean(form[key])}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.checked })
                      }
                    />
                    {label}
                  </label>
                ))}
              </div>

              {editingId ? (
                <div className="space-y-4 rounded-2xl border border-slate-800 p-4">
                  <SectionTitle>Screenshot gallery</SectionTitle>
                  <p className="text-[11px] text-slate-500">
                    Upload multiple screenshots — they appear as a carousel on
                    the public project page.
                  </p>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#0B2F6B] px-3 py-2 text-xs font-bold text-[#D4AF37]">
                    {pending ? "Uploading…" : "Upload screenshots"}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      multiple
                      className="hidden"
                      disabled={pending}
                      onChange={(e) => onUpload(e.target.files)}
                    />
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {images.map((img) => (
                      <div key={img.id} className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.image_url}
                          alt={img.alt_text}
                          className="h-24 w-full rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 rounded bg-red-600 px-1.5 text-[10px] font-bold"
                          onClick={() =>
                            startTransition(async () => {
                              await deleteProjectImage(img.id);
                              setImages((prev) =>
                                prev.filter((i) => i.id !== img.id),
                              );
                            })
                          }
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  {images.length === 0 ? (
                    <p className="text-xs text-slate-500">No screenshots yet.</p>
                  ) : null}

                  <SectionTitle>Testimonials</SectionTitle>
                  <p className="text-[11px] text-slate-500">
                    Photo, name, title, and message on the public case page.
                    Leave empty to hide the section.
                  </p>
                  <div className="space-y-2">
                    {testimonials.map((t) => (
                      <div
                        key={t.id}
                        className="flex items-start justify-between gap-3 rounded-xl bg-[#051329] p-3 text-xs"
                      >
                        <div className="flex min-w-0 flex-1 gap-3">
                          {t.author_image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={t.author_image_url}
                              alt=""
                              className="h-10 w-10 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B2F6B] font-bold text-[#D4AF37]">
                              {t.author_name.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-bold">{t.author_name}</div>
                            {t.author_role ? (
                              <div className="text-[#D4AF37]">
                                {t.author_role}
                              </div>
                            ) : null}
                            <p className="mt-1 text-slate-400">{t.quote}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="shrink-0 text-red-300"
                          onClick={() =>
                            startTransition(async () => {
                              await deleteTestimonial(t.id);
                              setTestimonials((prev) =>
                                prev.filter((x) => x.id !== t.id),
                              );
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-2">
                    <ImageUploadField
                      label="Author photo"
                      value={testimonialDraft.author_image_url}
                      folder={`testimonials/${editingId}`}
                      aspect="square"
                      hint="Square headshot works best"
                      onChange={(url) =>
                        setTestimonialDraft({
                          ...testimonialDraft,
                          author_image_url: url,
                        })
                      }
                    />
                    <input
                      className={inputClass}
                      placeholder="Author name"
                      value={testimonialDraft.author_name}
                      onChange={(e) =>
                        setTestimonialDraft({
                          ...testimonialDraft,
                          author_name: e.target.value,
                        })
                      }
                    />
                    <input
                      className={inputClass}
                      placeholder="Title / role"
                      value={testimonialDraft.author_role}
                      onChange={(e) =>
                        setTestimonialDraft({
                          ...testimonialDraft,
                          author_role: e.target.value,
                        })
                      }
                    />
                    <textarea
                      className={inputClass}
                      placeholder="Message / quote"
                      rows={3}
                      value={testimonialDraft.quote}
                      onChange={(e) =>
                        setTestimonialDraft({
                          ...testimonialDraft,
                          quote: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      className="rounded-xl border border-[#D4AF37]/40 px-3 py-2 text-xs font-bold text-[#D4AF37]"
                      onClick={() =>
                        startTransition(async () => {
                          const result = await saveTestimonial(null, {
                            project_id: editingId,
                            author_name: testimonialDraft.author_name,
                            author_role: testimonialDraft.author_role,
                            author_image_url:
                              testimonialDraft.author_image_url || null,
                            quote: testimonialDraft.quote,
                            is_published: true,
                          });
                          if (!result.ok) {
                            setError(result.error);
                            return;
                          }
                          setTestimonials((prev) => [
                            ...prev,
                            {
                              id: result.id ?? crypto.randomUUID(),
                              project_id: editingId,
                              author_name: testimonialDraft.author_name,
                              author_role: testimonialDraft.author_role,
                              author_image_url:
                                testimonialDraft.author_image_url || null,
                              quote: testimonialDraft.quote,
                              sort_order: prev.length,
                              is_published: true,
                              created_at: new Date().toISOString(),
                            },
                          ]);
                          setTestimonialDraft({
                            author_name: "",
                            author_role: "",
                            author_image_url: "",
                            quote: "",
                          });
                        })
                      }
                    >
                      Add testimonial
                    </button>
                  </div>
                </div>
              ) : (
                <p className="rounded-xl border border-dashed border-slate-700 px-4 py-3 text-xs text-slate-500">
                  Save the project first — then upload screenshots and add
                  testimonials for the public case page.
                </p>
              )}

              {error ? (
                <p className="text-xs text-red-300" role="alert">
                  {error}
                </p>
              ) : null}
            </div>

            <div className="sticky bottom-0 flex justify-end gap-2 border-t border-slate-800 bg-[#06152F] px-6 py-4">
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={onSave}
                className="rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-slate-950 disabled:opacity-70"
              >
                {pending ? "Saving…" : "Save project"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {!editorOpen ? (
        <p className="text-xs text-slate-500">
          Tip: open{" "}
          <Link href="/admin/projects?new=1" className="text-[#D4AF37]">
            /admin/projects?new=1
          </Link>{" "}
          to create quickly.
        </p>
      ) : null}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1 block font-mono text-xs text-slate-400">{label}</label>
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="border-b border-slate-800 pb-2 font-mono text-[11px] font-bold tracking-[0.16em] text-[#D4AF37] uppercase">
      {children}
    </h3>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#051329] px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none";
