import { createPublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import type {
  CapabilityPillar,
  CapabilityTech,
  ProcessStep,
  Project,
  ProjectCategory,
  ProjectImage,
  ProjectMetric,
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

function normalizeTechnologies(value: unknown): CapabilityTech[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as { name?: unknown; desc?: unknown };
      if (typeof row.name !== "string" || typeof row.desc !== "string") {
        return null;
      }
      return { name: row.name, desc: row.desc };
    })
    .filter((item): item is CapabilityTech => item !== null);
}

function normalizeCapabilityPillar(
  row: CapabilityPillar & { technologies?: unknown },
): CapabilityPillar {
  return {
    ...row,
    technologies: normalizeTechnologies(row.technologies),
  };
}

export async function getPublishedCapabilityPillars(): Promise<
  CapabilityPillar[]
> {
  const supabase = getPublicClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("capability_pillars")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getPublishedCapabilityPillars:", error.message);
    return [];
  }

  return (data ?? []).map((row) =>
    normalizeCapabilityPillar(
      row as CapabilityPillar & { technologies?: unknown },
    ),
  );
}

function normalizeMetrics(value: unknown): ProjectMetric[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as { label?: unknown; value?: unknown };
      if (typeof row.label !== "string" || typeof row.value !== "string") {
        return null;
      }
      return { label: row.label, value: row.value };
    })
    .filter((item): item is ProjectMetric => item !== null);
}

function normalizeProject(
  row: Project & { stack?: unknown; stack_line?: string; metrics?: unknown },
): Project {
  const stack = normalizeStringArray(row.stack);
  const fromLine =
    stack.length === 0 && row.stack_line
      ? row.stack_line
          .split(/[·|,]/)
          .map((part) => part.trim())
          .filter(Boolean)
      : stack;
  return {
    ...row,
    work_category: (row.work_category || "operations") as Project["work_category"],
    sector: row.sector || row.mesh_category || "",
    status: row.status || "Live",
    outcome: row.outcome || "",
    stack: fromLine,
    metrics: normalizeMetrics(row.metrics),
  };
}

function mapProjects(data: unknown[] | null): Project[] {
  return (data ?? []).map((row) =>
    normalizeProject(row as Project & { stack?: unknown }),
  );
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

  return mapProjects(data);
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

  return mapProjects(data);
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

  return mapProjects(data);
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

  return mapProjects(data);
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
    ...normalizeProject(project as Project & { stack?: unknown }),
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
