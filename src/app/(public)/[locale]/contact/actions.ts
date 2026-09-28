"use server";

import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export type ContactInquiryInput = {
  projectType: string;
  estimatedAmountUsd: string;
  fullName: string;
  email: string;
  organization: string;
  phone: string;
  projectBrief: string;
  locale: string;
};

export type ContactInquiryResult =
  | { ok: true }
  | { ok: false; error: string };

function parseAmount(raw: string): number | null {
  const cleaned = raw.replace(/[$,\s]/g, "").trim();
  if (!cleaned) return null;
  const value = Number(cleaned);
  if (!Number.isFinite(value) || value <= 0) return null;
  return Math.round(value * 100) / 100;
}

export async function submitContactInquiry(
  input: ContactInquiryInput,
): Promise<ContactInquiryResult> {
  const fullName = input.fullName.trim();
  const email = input.email.trim().toLowerCase();
  const phone = input.phone.trim();
  const projectType = input.projectType.trim();
  const amount = parseAmount(input.estimatedAmountUsd);

  if (!fullName || !email || !phone || !projectType) {
    return { ok: false, error: "missing_fields" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "invalid_email" };
  }
  if (amount === null) {
    return { ok: false, error: "invalid_amount" };
  }

  if (!isSupabaseConfigured()) {
    return { ok: false, error: "not_configured" };
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("contact_inquiries").insert({
    project_type: projectType,
    estimated_amount_usd: amount,
    full_name: fullName,
    email,
    organization: input.organization.trim(),
    phone,
    project_brief: input.projectBrief.trim(),
    locale: input.locale || "en",
  });

  if (error) {
    console.error("contact_inquiries insert failed", error.message);
    return { ok: false, error: "submit_failed" };
  }

  return { ok: true };
}
