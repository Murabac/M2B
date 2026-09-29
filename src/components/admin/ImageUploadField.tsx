"use client";

import { useRef, useState, useTransition } from "react";
import { uploadCmsAsset } from "@/lib/admin/actions";

type Props = {
  label: string;
  value: string;
  folder: string;
  onChange: (url: string) => void;
  hint?: string;
  aspect?: "square" | "wide";
};

export function ImageUploadField({
  label,
  value,
  folder,
  onChange,
  hint,
  aspect = "wide",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onFile(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    fd.set("folder", folder);
    startTransition(async () => {
      const result = await uploadCmsAsset(fd);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onChange(result.url);
      if (inputRef.current) inputRef.current.value = "";
    });
  }

  return (
    <div className="space-y-2">
      <label className="block font-mono text-xs text-slate-400">{label}</label>
      {value ? (
        <div
          className={`relative overflow-hidden rounded-xl border border-slate-700 bg-[#051329] ${
            aspect === "square" ? "aspect-square max-w-[140px]" : "aspect-video max-w-sm"
          }`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 rounded-lg bg-red-600/90 px-2 py-0.5 text-[10px] font-bold text-white"
          >
            Clear
          </button>
        </div>
      ) : (
        <div
          className={`flex items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#051329] text-xs text-slate-500 ${
            aspect === "square" ? "aspect-square max-w-[140px]" : "aspect-video max-w-sm"
          }`}
        >
          No image
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={pending}
          onClick={() => inputRef.current?.click()}
          className="rounded-xl bg-[#0B2F6B] px-3 py-2 text-xs font-bold text-[#D4AF37] disabled:opacity-60"
        >
          {pending ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => onFile(e.target.files)}
        />
      </div>
      <input
        className="w-full rounded-xl border border-white/10 bg-[#051329] px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
        placeholder="Or paste image URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hint ? <p className="text-[10px] text-slate-500">{hint}</p> : null}
      {error ? (
        <p className="text-xs text-red-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
