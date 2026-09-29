"use client";

import { useMemo, useState, useTransition } from "react";
import { ExternalLink, Trash2 } from "lucide-react";
import { deleteInquiry, updateInquiry } from "@/lib/admin/actions";
import type {
  ContactInquiry,
  InquiryPriority,
  InquiryStatus,
} from "@/lib/supabase/types";

const STATUSES: InquiryStatus[] = [
  "new",
  "reviewing",
  "contacted",
  "proposal_sent",
  "won",
  "archived",
];

type Props = {
  inquiries: ContactInquiry[];
};

export function InquiriesManager({ inquiries }: Props) {
  const [pending, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ContactInquiry | null>(null);
  const [notes, setNotes] = useState("");

  const filtered = useMemo(() => {
    return inquiries.filter((inq) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        inq.full_name.toLowerCase().includes(q) ||
        inq.email.toLowerCase().includes(q) ||
        inq.organization.toLowerCase().includes(q) ||
        inq.project_type.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === "all" || inq.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [inquiries, query, statusFilter]);

  function openDetail(inq: ContactInquiry) {
    setSelected(inq);
    setNotes(inq.notes ?? "");
  }

  function exportCsv() {
    const headers = [
      "created_at",
      "full_name",
      "email",
      "phone",
      "organization",
      "project_type",
      "estimated_amount_usd",
      "status",
      "priority",
      "project_brief",
      "notes",
    ];
    const rows = filtered.map((i) =>
      headers
        .map((h) => {
          const val = String((i as Record<string, unknown>)[h] ?? "");
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(","),
    );
    const blob = new Blob([[headers.join(","), ...rows].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `m2b-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search leads…"
          className="w-full rounded-xl border border-white/10 bg-[#081B38] px-3 py-2.5 text-sm sm:max-w-sm"
        />
        <button
          type="button"
          onClick={exportCsv}
          className="rounded-xl border border-[#D4AF37]/40 px-4 py-2.5 text-xs font-bold text-[#D4AF37]"
        >
          Export CSV
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {["all", ...STATUSES].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg px-3 py-1.5 font-mono text-[11px] font-bold uppercase ${
              statusFilter === s
                ? "bg-[#D4AF37] text-slate-950"
                : "border border-white/10 text-slate-400"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#081B38] font-mono text-[11px] tracking-wider text-slate-400 uppercase">
            <tr>
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Budget</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((inq) => (
              <tr
                key={inq.id}
                className={`border-t border-slate-800 ${
                  inq.status === "new" ? "bg-[#D4AF37]/5" : ""
                }`}
              >
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => openDetail(inq)}
                    className="text-left"
                  >
                    <div className="font-bold">{inq.full_name}</div>
                    <div className="text-xs text-slate-400">
                      {inq.organization || inq.email}
                    </div>
                  </button>
                </td>
                <td className="px-4 py-3 text-xs">{inq.project_type}</td>
                <td className="px-4 py-3 font-mono text-xs text-[#D4AF37]">
                  ${Number(inq.estimated_amount_usd).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <select
                    disabled={pending}
                    value={inq.status}
                    onChange={(e) =>
                      startTransition(async () => {
                        await updateInquiry(inq.id, {
                          status: e.target.value as InquiryStatus,
                        });
                        window.location.reload();
                      })
                    }
                    className="rounded-lg border border-white/10 bg-[#051329] px-2 py-1 text-xs"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <select
                    disabled={pending}
                    value={inq.priority}
                    onChange={(e) =>
                      startTransition(async () => {
                        await updateInquiry(inq.id, {
                          priority: e.target.value as InquiryPriority,
                        });
                        window.location.reload();
                      })
                    }
                    className="rounded-lg border border-white/10 bg-[#051329] px-2 py-1 text-xs"
                  >
                    {(["high", "medium", "normal"] as InquiryPriority[]).map(
                      (p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ),
                    )}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${inq.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        if (!confirm("Delete this inquiry?")) return;
                        startTransition(async () => {
                          await deleteInquiry(inq.id);
                          window.location.reload();
                        });
                      }}
                      className="text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 ? (
          <p className="p-6 text-sm text-slate-400">No inquiries found.</p>
        ) : null}
      </div>

      {selected ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-700 bg-[#06152F] p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="font-mono text-[10px] text-[#D4AF37] uppercase">
                  {selected.status} · {selected.priority}
                </div>
                <h2 className="text-xl font-black">{selected.full_name}</h2>
                <p className="text-sm text-slate-400">{selected.organization}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-slate-400"
              >
                Close
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-slate-500">Email: </span>
                <a className="text-blue-300" href={`mailto:${selected.email}`}>
                  {selected.email}
                </a>
              </p>
              <p>
                <span className="text-slate-500">Phone: </span>
                {selected.phone}
              </p>
              <p>
                <span className="text-slate-500">Type: </span>
                {selected.project_type}
              </p>
              <p>
                <span className="text-slate-500">Budget: </span>$
                {Number(selected.estimated_amount_usd).toLocaleString()}
              </p>
              <p className="rounded-xl bg-[#051329] p-3 text-slate-300">
                {selected.project_brief || "No brief provided."}
              </p>
              <label className="block font-mono text-xs text-slate-400">
                Internal notes
              </label>
              <textarea
                className="w-full rounded-xl border border-white/10 bg-[#051329] p-3 text-sm"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <div className="flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      startTransition(async () => {
                        await updateInquiry(selected.id, { status: s });
                        window.location.reload();
                      })
                    }
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase ${
                      selected.status === s
                        ? "bg-[#D4AF37] text-slate-950"
                        : "border border-white/10"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  startTransition(async () => {
                    await updateInquiry(selected.id, { notes });
                    setSelected(null);
                    window.location.reload();
                  })
                }
                className="rounded-xl bg-[#D4AF37] px-4 py-2 text-xs font-bold text-slate-950"
              >
                Save notes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
