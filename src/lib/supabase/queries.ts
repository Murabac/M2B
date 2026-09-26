import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  Project,
  ProjectCategory,
  ProjectImage,
  Service,
  Testimonial,
} from "@/lib/supabase/types";

export type ProjectWithRelations = Project & {
  project_images: ProjectImage[];
  testimonials: Testimonial[];
};

async function getServerClient() {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createClient();
}

export async function getPublishedServices(): Promise<Service[]> {
  const supabase = await getServerClient();
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

  return data ?? [];
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const supabase = await getServerClient();
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

export async function getPublishedProjects(
  category?: ProjectCategory,
): Promise<Project[]> {
  const supabase = await getServerClient();
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

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectWithRelations | null> {
  const supabase = await getServerClient();
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
  const supabase = await getServerClient();
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
