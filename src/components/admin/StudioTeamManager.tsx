"use client";

import { useState, useTransition } from "react";
import {
  deleteStudioTeamMember,
  saveStudioTeamMember,
} from "@/lib/admin/actions";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { StudioTeamMember } from "@/lib/supabase/types";

type Props = {
  members: StudioTeamMember[];
};

const emptyForm = () => ({
  slug: "",
  initials: "",
  name: "",
  badge: "",
  role: "",
  bio: "",
  skillsText: "",
  photo_url: "",
  sort_order: 0,
  is_published: true,
});

export function StudioTeamManager({ members }: Props) {
  const [pending, startTransition] = useTransition();
  const [editing, setEditing] = useState<StudioTeamMember | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [error, setError] = useState<string | null>(null);

  function openCreate() {
    setCreating(true);
    setEditing(null);
    setForm({
      ...emptyForm(),
      sort_order: members.length,
    });
    setError(null);
  }

  function openEdit(member: StudioTeamMember) {
    setCreating(false);
    setEditing(member);
    setForm({
      slug: member.slug,
      initials: member.initials,
      name: member.name,
      badge: member.badge,
      role: member.role,
      bio: member.bio,
      skillsText: (member.skills ?? []).join("\n"),
      photo_url: member.photo_url ?? "",
      sort_order: member.sort_order,
      is_published: member.is_published,
    });
    setError(null);
  }

  function close() {
    setCreating(false);
    setEditing(null);
    setError(null);
  }

  function onSave() {
    setError(null);
    startTransition(async () => {
      const result = await saveStudioTeamMember(editing?.id ?? null, {
        slug: form.slug,
        initials: form.initials,
        name: form.name,
        badge: form.badge,
        role: form.role,
        bio: form.bio,
        skills: form.skillsText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        photo_url: form.photo_url || null,
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
    <section className="space-y-4 rounded-2xl border border-slate-800 bg-[#081B38] p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-bold text-[#D4AF37]">Studio team</h2>
          <p className="text-xs text-slate-400">
            Equal partners shown on the public /studio page. English CMS copy.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-slate-950"
        >
          + Add member
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl border border-slate-800 bg-[#051329] p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                {member.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo_url}
                    alt=""
                    className="h-12 w-12 rounded-xl object-cover object-[center_12%]"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#D4AF37]/40 bg-[#081B38] font-black text-[#D4AF37]">
                    {member.initials}
                  </div>
                )}
                <div>
                  <div className="font-bold">{member.name}</div>
                  <div className="font-mono text-[10px] text-[#D4AF37]">
                    {member.role}
                  </div>
                </div>
              </div>
              <span className="font-mono text-[10px] text-slate-500">
                {member.is_published ? "LIVE" : "DRAFT"}
              </span>
            </div>
            <p className="mb-3 line-clamp-3 text-xs text-slate-400">{member.bio}</p>
            <div className="mb-3 flex flex-wrap gap-1">
              {(member.skills ?? []).slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => openEdit(member)}
                className="rounded-lg bg-[#0B2F6B] px-2.5 py-1 text-[11px] font-bold text-[#D4AF37]"
              >
                Edit
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  if (!confirm(`Remove “${member.name}” from the studio team?`)) {
                    return;
                  }
                  startTransition(async () => {
                    await deleteStudioTeamMember(member.id);
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

      {members.length === 0 ? (
        <p className="text-sm text-slate-500">
          No team members yet. Run migration `20260927000009_studio_team.sql` or
          add members here.
        </p>
      ) : null}

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-slate-700 bg-[#06152F] p-6">
            <h3 className="mb-4 text-lg font-black">
              {editing ? "Edit team member" : "Add team member"}
            </h3>
            <div className="space-y-3">
              <ImageUploadField
                label="Photo"
                value={form.photo_url}
                folder={
                  editing
                    ? `team/${editing.slug || editing.id}`
                    : "team"
                }
                aspect="square"
                onChange={(url) => setForm({ ...form, photo_url: url })}
                hint="Shown on /studio. Falls back to initials if empty."
              />
              <input
                className={inputClass}
                placeholder="Name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className={inputClass}
                  placeholder="Initials (e.g. AM)"
                  value={form.initials}
                  onChange={(e) => setForm({ ...form, initials: e.target.value })}
                />
                <input
                  className={inputClass}
                  placeholder="Slug"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
              </div>
              <input
                className={inputClass}
                placeholder="Badge (e.g. Engineering)"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}
              />
              <input
                className={inputClass}
                placeholder="Role / focus (e.g. Engineering & Delivery)"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <textarea
                className={inputClass}
                rows={4}
                placeholder="Bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
              <textarea
                className={inputClass}
                rows={4}
                placeholder="Skills (one per line)"
                value={form.skillsText}
                onChange={(e) => setForm({ ...form, skillsText: e.target.value })}
              />
              <input
                type="number"
                className={inputClass}
                placeholder="Sort order"
                value={form.sort_order}
                onChange={(e) =>
                  setForm({ ...form, sort_order: Number(e.target.value) || 0 })
                }
              />
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={(e) =>
                    setForm({ ...form, is_published: e.target.checked })
                  }
                />
                Published on /studio
              </label>
              {error ? (
                <p className="text-xs text-red-300" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={close}
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
                  {pending ? "Saving…" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#051329] px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none";
