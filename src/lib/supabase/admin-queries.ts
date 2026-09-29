import { createClient } from "@/lib/supabase/server";
import { PROJECT_IMAGES_BUCKET } from "@/lib/supabase/constants";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  ActivityLogItem,
  CapabilityPillar,
  ContactInquiry,
  ProcessStep,
  Project,
  ProjectImage,
  Service,
  SiteSettings,
  Testimonial,
  TrustSector,
  StudioTeamMember,
} from "@/lib/supabase/types";

async function adminClient() {
  if (!isSupabaseConfigured()) return null;
  return createClient();
}

export async function listAllProjects(): Promise<Project[]> {
  const supabase = await adminClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("listAllProjects:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getAdminProject(id: string): Promise<
  | (Project & { project_images: ProjectImage[]; testimonials: Testimonial[] })
  | null
> {
  const supabase = await adminClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("projects")
    .select("*, project_images(*), testimonials(*)")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getAdminProject:", error.message);
    return null;
  }
  if (!data) return null;
  const images = Array.isArray(data.project_images)
    ? [...data.project_images].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
      )
    : [];
  const testimonials = Array.isArray(data.testimonials)
    ? [...data.testimonials].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0),
      )
    : [];
  return { ...data, project_images: images, testimonials };
}

export async function listAllInquiries(): Promise<ContactInquiry[]> {
  const supabase = await adminClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("contact_inquiries")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listAllInquiries:", error.message);
    return [];
  }
  return data ?? [];
}

export async function listAllServices(): Promise<Service[]> {
  const supabase = await adminClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("listAllServices:", error.message);
    return [];
  }
  return (data ?? []).map((row) => ({
    ...row,
    bullets: Array.isArray(row.bullets) ? row.bullets : [],
  }));
}

export async function listAllTrustSectors(): Promise<TrustSector[]> {
  const supabase = await adminClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("trust_sectors")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("listAllTrustSectors:", error.message);
    return [];
  }
  return data ?? [];
}

export async function listAllProcessSteps(): Promise<ProcessStep[]> {
  const supabase = await adminClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("process_steps")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("listAllProcessSteps:", error.message);
    return [];
  }
  return (data ?? []).map((row) => ({
    ...row,
    deliverables: Array.isArray(row.deliverables) ? row.deliverables : [],
  }));
}

export async function listAllCapabilityPillars(): Promise<CapabilityPillar[]> {
  const supabase = await adminClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("capability_pillars")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("listAllCapabilityPillars:", error.message);
    return [];
  }
  return data ?? [];
}

export async function getSiteSettingsAdmin(): Promise<SiteSettings | null> {
  const supabase = await adminClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error) {
    console.error("getSiteSettingsAdmin:", error.message);
    return null;
  }
  return data;
}

export async function listActivityLog(limit = 30): Promise<ActivityLogItem[]> {
  const supabase = await adminClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("listActivityLog:", error.message);
    return [];
  }
  return data ?? [];
}

export async function listAllStudioTeam(): Promise<StudioTeamMember[]> {
  const supabase = await adminClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("studio_team")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("listAllStudioTeam:", error.message);
    return [];
  }
  return (data ?? []).map((row) => ({
    ...row,
    skills: Array.isArray(row.skills)
      ? row.skills.filter((s): s is string => typeof s === "string")
      : [],
  }));
}

export async function getDashboardStats() {
  const [projects, inquiries, settings, activity] = await Promise.all([
    listAllProjects(),
    listAllInquiries(),
    getSiteSettingsAdmin(),
    listActivityLog(20),
  ]);

  return {
    projectCount: projects.length,
    publishedCount: projects.filter((p) => p.is_published).length,
    featuredCount: projects.filter((p) => p.is_featured).length,
    newInquiryCount: inquiries.filter((i) => i.status === "new").length,
    inquiries: inquiries.slice(0, 8),
    projects,
    settings,
    activity,
  };
}

export { PROJECT_IMAGES_BUCKET };
