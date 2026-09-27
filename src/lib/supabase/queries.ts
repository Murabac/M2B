import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  ProcessStep,
  Project,
  ProjectCategory,
  ProjectImage,
  Service,
  Testimonial,
  TrustSector,
} from "@/lib/supabase/types";

export type ProjectWithRelations = Project & {
  project_images: ProjectImage[];
  testimonials: Testimonial[];
};

function getPublicClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createPublicClient();
}

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normalizeProcessStep(
  row: ProcessStep & { deliverables?: unknown },
): ProcessStep {
  return { ...row, deliverables: normalizeStringArray(row.deliverables) };
}

function normalizeService(row: Service & { bullets?: unknown }): Service {
  return { ...row, bullets: normalizeStringArray(row.bullets) };
}

export async function getPublishedServices(): Promise<Service[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPublishedServices:", error.message);
    return [];
  }

  return (data ?? []).map((row) =>
    normalizeService(row as Service & { bullets?: unknown }),
  );
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getFeaturedProjects:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getHeroProjects(): Promise<Project[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .eq("show_in_hero", true)
    .order("hero_sort_order", { ascending: true });

  if (error) {
    console.error("getHeroProjects:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getBentoProjects(): Promise<Project[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .eq("show_in_bento", true)
    .order("bento_sort_order", { ascending: true });

  if (error) {
    console.error("getBentoProjects:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getPublishedProjects(
  category?: ProjectCategory,
): Promise<Project[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  let query = supabase
    .from("projects")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("getPublishedProjects:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getPublishedTrustSectors(): Promise<TrustSector[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("trust_sectors")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPublishedTrustSectors:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getPublishedProcessSteps(): Promise<ProcessStep[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("process_steps")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPublishedProcessSteps:", error.message);
    return [];
  }

  return (data ?? []).map((row) =>
    normalizeProcessStep(row as ProcessStep & { deliverables?: unknown }),
  );
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectWithRelations | null> {
  const supabase = getPublicClient();
  if (!supabase) return null;

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    console.error("getProjectBySlug:", error.message);
    return null;
  }

  if (!project) return null;

  const [{ data: images }, { data: testimonials }] = await Promise.all([
    supabase
      .from("project_images")
      .select("*")
      .eq("project_id", project.id)
      .order("sort_order", { ascending: true }),
    supabase
      .from("testimonials")
      .select("*")
      .eq("project_id", project.id)
      .eq("is_published", true)
      .order("sort_order", { ascending: true }),
  ]);

  return {
    ...project,
    project_images: images ?? [],
    testimonials: testimonials ?? [],
  };
}

export async function getPublishedProjectSlugs(): Promise<string[]> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("projects")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    console.error("getPublishedProjectSlugs:", error.message);
    return [];
  }

  return (data ?? []).map((row) => row.slug);
}
