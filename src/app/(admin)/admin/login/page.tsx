import { Suspense } from "react";
import { LoginForm } from "@/app/(admin)/admin/login/login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#030914] px-4 py-16 text-white">
      <Suspense fallback={<div className="text-sm text-slate-400">Loading…</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
