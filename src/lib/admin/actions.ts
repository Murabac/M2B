"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { PROJECT_IMAGES_BUCKET } from "@/lib/supabase/constants";
import type {
  ActivityLogType,
  CapabilityPillar,
  CapabilityTech,
  InquiryPriority,
  InquiryStatus,
  ProcessStep,
  Project,
  ProjectCategory,
  ProjectMetric,
  Service,
  SiteSettings,
  Testimonial,
  TrustSector,
  WorkCategory,
  StudioTeamMember,
} from "@/lib/supabase/types";

type ActionResult = { ok: true; id?: string; url?: string } | { ok: false; error: string };
type UploadResult = { ok: true; url: string; id?: string } | { ok: false; error: string };

const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function sanitizeStorageFolder(folder: string) {
  return folder
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/^\/+|\/+$/g, "")
    .slice(0, 80) || "uploads";
}

/** Turbopack / Server Action File instances may fail `instanceof File`. */
function asUploadFile(
  value: FormDataEntryValue | null,
): { name: string; type: string; size: number; arrayBuffer: () => Promise<ArrayBuffer> } | null {
  if (!value || typeof value === "string") return null;
  if (
    typeof value === "object" &&
    "arrayBuffer" in value &&
    typeof (value as File).arrayBuffer === "function" &&
    "size" in value
  ) {
    return value as File;
  }
  return null;
}

async function uploadImageFile(
  folder: string,
  file: {
    name: string;
    type: string;
    size: number;
    arrayBuffer: () => Promise<ArrayBuffer>;
  },
): Promise<UploadResult> {
  const { supabase } = await requireAdmin();
  if (file.size <= 0) return { ok: false, error: "No file provided." };
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, error: "Image must be under 5MB." };
  }
  if (file.type && !ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { ok: false, error: "Use JPEG, PNG, WebP, or GIF." };
  }

  const ext =
    file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
    "jpg";
  const safeFolder = sanitizeStorageFolder(folder);
  const path = `${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error: uploadError } = await supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .upload(path, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
  if (uploadError) return { ok: false, error: uploadError.message };

  const { data: publicUrl } = supabase.storage
    .from(PROJECT_IMAGES_BUCKET)
    .getPublicUrl(path);

  return { ok: true, url: publicUrl.publicUrl };
}

/** Upload any CMS image (cover, logo, team photo, etc.) and return its public URL. */
export async function uploadCmsAsset(formData: FormData): Promise<UploadResult> {
  const { user } = await requireAdmin();
  const file = asUploadFile(formData.get("file"));
  if (!file) return { ok: false, error: "No file provided." };
  const folder = String(formData.get("folder") || "uploads");
  const result = await uploadImageFile(folder, file);
  if (!result.ok) return result;
  await logActivity("setting", `Uploaded CMS asset (${folder})`, user.id);
  return result;
}

async function logActivity(
  type: ActivityLogType,
  message: string,
  actorId: string,
) {
  const { supabase } = await requireAdmin();
  await supabase.from("activity_log").insert({
    type,
    message,
    actor_id: actorId,
  });
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export type ProjectInput = {
  title: string;
  slug?: string;
  tagline?: string;
  description?: string;
  category: ProjectCategory;
  work_category?: WorkCategory;
  sector?: string;
  status?: string;
  outcome?: string;
  problem?: string;
  approach?: string;
  highlights?: string[];
  stack?: string[];
  metrics?: ProjectMetric[];
  client_name?: string | null;
  year?: number | null;
  live_url?: string | null;
  app_store_url?: string | null;
  play_store_url?: string | null;
  cover_image_url?: string | null;
  logo_url?: string | null;
  mesh_preview?: string;
  mesh_category?: string;
  accent_color?: string;
  stack_line?: string;
  metric_label?: string;
  show_in_hero?: boolean;
  hero_sort_order?: number;
  show_in_bento?: boolean;
  bento_sort_order?: number;
  is_featured?: boolean;
  is_published?: boolean;
  sort_order?: number;
};

export async function saveProject(
  id: string | null,
  input: ProjectInput,
): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const title = input.title.trim();
  if (!title) return { ok: false, error: "Title is required." };

  const slug = (input.slug?.trim() || slugify(title)) || `project-${Date.now()}`;
  const payload: Partial<Project> & {
    title: string;
    slug: string;
    category: ProjectCategory;
  } = {
    ...input,
    title,
    slug,
    tagline: input.tagline ?? "",
    description: input.description ?? "",
    problem: input.problem ?? "",
    approach: input.approach ?? "",
    highlights: input.highlights ?? [],
    stack: input.stack ?? [],
    metrics: input.metrics ?? [],
    work_category: (input.work_category as WorkCategory) || "government",
  };

  if (id) {
    const { error } = await supabase.from("projects").update(payload).eq("id", id);
    if (error) return { ok: false, error: error.message };
    await logActivity("project", `Updated project “${title}”`, user.id);
    revalidatePath("/admin/projects");
    revalidatePath("/");
    revalidatePath("/portfolio", "layout");
    revalidatePath("/products");
    return { ok: true, id };
  }

  const { data, error } = await supabase
    .from("projects")
    .insert(payload)
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  await logActivity("project", `Created project “${title}”`, user.id);
  revalidatePath("/admin/projects");
  return { ok: true, id: data.id };
}

export async function deleteProject(id: string): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const { data: row } = await supabase
    .from("projects")
    .select("title")
    .eq("id", id)
    .maybeSingle();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  await logActivity(
    "project",
    `Deleted project “${row?.title ?? id}”`,
    user.id,
  );
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { ok: true };
}

export async function toggleProjectField(
  id: string,
  field: "is_published" | "is_featured" | "show_in_hero" | "show_in_bento",
  value: boolean,
): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const patch: Partial<Project> = { [field]: value };
  const { error } = await supabase.from("projects").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  await logActivity("project", `Set ${field}=${value} on project`, user.id);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  return { ok: true };
}

export async function uploadProjectImage(
  projectId: string,
  formData: FormData,
): Promise<UploadResult> {
  const { supabase, user } = await requireAdmin();
  const file = asUploadFile(formData.get("file"));
  if (!file) return { ok: false, error: "No file provided." };

  const uploaded = await uploadImageFile(`projects/${projectId}`, file);
  if (!uploaded.ok) return uploaded;

  const { data: existing } = await supabase
    .from("project_images")
    .select("sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextOrder = (existing?.[0]?.sort_order ?? -1) + 1;
  const { data, error } = await supabase
    .from("project_images")
    .insert({
      project_id: projectId,
      image_url: uploaded.url,
      alt_text: file.name,
      sort_order: nextOrder,
    })
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };

  await logActivity("project", "Uploaded project gallery image", user.id);
  revalidatePath("/admin/projects");
  revalidatePath("/portfolio", "layout");
  return { ok: true, url: uploaded.url, id: data.id };
}

export async function deleteProjectImage(imageId: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("project_images")
    .delete()
    .eq("id", imageId);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/projects");
  return { ok: true };
}

export async function reorderProjectImages(
  projectId: string,
  orderedIds: string[],
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  for (let i = 0; i < orderedIds.length; i++) {
    const { error } = await supabase
      .from("project_images")
      .update({ sort_order: i })
      .eq("id", orderedIds[i])
      .eq("project_id", projectId);
    if (error) return { ok: false, error: error.message };
  }
  revalidatePath("/admin/projects");
  return { ok: true };
}

export async function saveTestimonial(
  id: string | null,
  input: {
    project_id: string;
    author_name: string;
    author_role?: string;
    author_image_url?: string | null;
    quote: string;
    sort_order?: number;
    is_published?: boolean;
  },
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (!input.author_name.trim() || !input.quote.trim()) {
    return { ok: false, error: "Author and quote are required." };
  }
  const payload = {
    ...input,
    author_image_url: input.author_image_url?.trim() || null,
  };
  if (id) {
    const { error } = await supabase
      .from("testimonials")
      .update(payload)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/admin/projects");
    revalidatePath("/[locale]/portfolio", "page");
    return { ok: true, id };
  }
  const { data, error } = await supabase
    .from("testimonials")
    .insert(payload)
    .select("id")
    .single();
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/[locale]/portfolio", "page");
  return { ok: true, id: data.id };
}

export async function deleteTestimonial(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/projects");
  revalidatePath("/[locale]/portfolio", "page");
  return { ok: true };
}

export async function updateInquiry(
  id: string,
  patch: {
    status?: InquiryStatus;
    priority?: InquiryPriority;
    notes?: string;
  },
): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const { error } = await supabase
    .from("contact_inquiries")
    .update(patch)
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  await logActivity("inquiry", `Updated inquiry ${id.slice(0, 8)}`, user.id);
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteInquiry(id: string): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const { error } = await supabase
    .from("contact_inquiries")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  await logActivity("inquiry", `Deleted inquiry ${id.slice(0, 8)}`, user.id);
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateSiteSettings(
  patch: Partial<SiteSettings>,
): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const { id: _id, updated_at: _u, ...rest } = patch;
  const { error } = await supabase
    .from("site_settings")
    .update(rest)
    .eq("id", 1);
  if (error) return { ok: false, error: error.message };
  await logActivity("setting", "Updated site settings", user.id);
  revalidatePath("/admin/studio");
  revalidatePath("/admin/settings");
  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/studio");
  revalidatePath("/contact");
  return { ok: true };
}

export async function resetSiteSettingsDefaults(): Promise<ActionResult> {
  return updateSiteSettings({
    studio_name: "M2B",
    company_legal_name: "M2B Technology Innovation Solutions",
    pillars: "Technology | Innovation | Solutions",
    tagline: "Connecting today, building tomorrow",
    founder_name: "Abdirahmaan Mire",
    founder_role: "Senior Software Developer & Project Manager",
    founder_bio: "",
    founder_experience_years: 9,
    city: "Worldwide",
    country: "",
    office_address: "",
    coordinates: "",
    email: "hello@example.com",
    phone_primary: "(252) 63-7744447",
    phone_secondary: "",
    whatsapp: "252637744447",
    business_hours_weekdays: "08:00 – 17:00 EAT",
    business_hours_friday: "Closed for prayer",
    timezone: "EAT · UTC+3",
    stats_towers_inspected: "120+",
    stats_listeners_count: "10k+",
    stats_schools_managed: "40+",
    stats_mobile_money_processed: "$2M+",
    announcement_enabled: false,
    announcement_text_en: "",
    announcement_text_so: "",
    announcement_action_en: "",
    announcement_action_so: "",
    announcement_action_url: "/contact",
    announcement_tone: "gold",
  });
}

export async function saveService(
  id: string | null,
  input: Partial<Service> & { slug: string; title: string },
): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  if (id) {
    const { error } = await supabase.from("services").update(input).eq("id", id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { data, error } = await supabase
      .from("services")
      .insert(input)
      .select("id")
      .single();
    if (error) return { ok: false, error: error.message };
    await logActivity("setting", `Created service “${input.title}”`, user.id);
    revalidatePath("/admin/services");
    revalidatePath("/services");
    return { ok: true, id: data.id };
  }
  await logActivity("setting", `Updated service “${input.title}”`, user.id);
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  return { ok: true, id: id ?? undefined };
}

export async function deleteService(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("services").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/services");
  return { ok: true };
}

export async function saveTrustSector(
  id: string | null,
  input: Partial<TrustSector> & { slug: string; name: string },
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (id) {
    const { error } = await supabase
      .from("trust_sectors")
      .update(input)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase.from("trust_sectors").insert(input);
    if (error) return { ok: false, error: error.message };
  }
  revalidatePath("/admin/content");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteTrustSector(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("trust_sectors").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/content");
  return { ok: true };
}

export async function saveProcessStep(
  id: string | null,
  input: Partial<ProcessStep> & { step_key: string; title: string },
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (id) {
    const { error } = await supabase
      .from("process_steps")
      .update(input)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase.from("process_steps").insert(input);
    if (error) return { ok: false, error: error.message };
  }
  revalidatePath("/admin/content");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteProcessStep(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("process_steps").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/content");
  return { ok: true };
}

export async function saveCapabilityPillar(
  id: string | null,
  input: Partial<CapabilityPillar> & {
    slug: string;
    title: string;
    technologies?: CapabilityTech[];
  },
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  if (id) {
    const { error } = await supabase
      .from("capability_pillars")
      .update(input)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase.from("capability_pillars").insert(input);
    if (error) return { ok: false, error: error.message };
  }
  revalidatePath("/admin/content");
  revalidatePath("/services");
  return { ok: true };
}

export async function deleteCapabilityPillar(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase
    .from("capability_pillars")
    .delete()
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/content");
  return { ok: true };
}

export async function saveStudioTeamMember(
  id: string | null,
  input: {
    slug: string;
    initials: string;
    name: string;
    badge: string;
    role: string;
    bio: string;
    skills: string[];
    photo_url?: string | null;
    sort_order?: number;
    is_published?: boolean;
  },
): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const slug = input.slug.trim() || slugify(input.name);
  if (!input.name.trim()) return { ok: false, error: "Name is required." };

  const payload = {
    slug,
    initials: input.initials.trim() || input.name.slice(0, 2).toUpperCase(),
    name: input.name.trim(),
    badge: input.badge.trim(),
    role: input.role.trim(),
    bio: input.bio.trim(),
    skills: input.skills,
    photo_url: input.photo_url?.trim() || null,
    sort_order: input.sort_order ?? 0,
    is_published: input.is_published ?? true,
  };

  if (id) {
    const { error } = await supabase
      .from("studio_team")
      .update(payload)
      .eq("id", id);
    if (error) return { ok: false, error: error.message };
    await logActivity("setting", `Updated team member “${payload.name}”`, user.id);
  } else {
    const { data, error } = await supabase
      .from("studio_team")
      .insert(payload)
      .select("id")
      .single();
    if (error) return { ok: false, error: error.message };
    await logActivity("setting", `Added team member “${payload.name}”`, user.id);
    revalidatePath("/admin/studio");
    revalidatePath("/studio");
    return { ok: true, id: data.id };
  }

  revalidatePath("/admin/studio");
  revalidatePath("/studio");
  return { ok: true, id: id ?? undefined };
}

export async function deleteStudioTeamMember(id: string): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const { data: row } = await supabase
    .from("studio_team")
    .select("name")
    .eq("id", id)
    .maybeSingle();
  const { error } = await supabase.from("studio_team").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  await logActivity(
    "setting",
    `Deleted team member “${row?.name ?? id}”`,
    user.id,
  );
  revalidatePath("/admin/studio");
  revalidatePath("/studio");
  return { ok: true };
}

export type { Project, StudioTeamMember };
