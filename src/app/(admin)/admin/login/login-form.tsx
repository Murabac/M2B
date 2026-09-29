"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { loginAdmin } from "@/app/(admin)/admin/login/actions";
import { siteConfig } from "@/config/site";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(() => {
    const code = searchParams.get("error");
    if (code === "unauthorized") return "This account is not authorized for the CMS.";
    if (code === "not_configured") return "Supabase is not configured.";
    return null;
  });

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    startTransition(async () => {
      const result = await loginAdmin(email, password);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.replace("/admin");
      router.refresh();
    });
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-[#0B2F6B]/60 bg-[#081B38] p-8 shadow-2xl">
      <div className="mb-8 flex flex-col items-center text-center">
        <span className="mb-4 inline-flex rounded-2xl border border-[#D4AF37]/30 bg-white p-3">
          <Image
            src={siteConfig.logos.markPng}
            alt=""
            width={48}
            height={48}
            unoptimized
            className="h-12 w-auto"
          />
        </span>
        <div className="mb-2 inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#D4AF37] uppercase">
          <ShieldCheck className="h-3.5 w-3.5" />
          Operations Console
        </div>
        <h1 className="text-2xl font-black tracking-tight text-white">
          M2B Admin Sign-in
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Single-admin access. Use your Supabase Auth credentials.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block font-mono text-xs text-slate-400">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#051329] px-3 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block font-mono text-xs text-slate-400">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#051329] px-3 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
          />
        </div>

        {error ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5BE4A] to-[#C9A227] py-3 text-sm font-bold text-slate-950 disabled:opacity-70"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
