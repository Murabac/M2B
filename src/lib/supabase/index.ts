export { PROJECT_IMAGES_BUCKET, SUPABASE_SCHEMA } from "@/lib/supabase/constants";
export type {
  AdminUser,
  Database,
  ProcessStep,
  Project,
  ProjectCategory,
  ProjectImage,
  Service,
  Testimonial,
  TrustSector,
} from "@/lib/supabase/types";

export { createClient as createBrowserClient } from "@/lib/supabase/client";
export { createPublicClient } from "@/lib/supabase/public";
export { createClient as createServerClient } from "@/lib/supabase/server";
export { isSupabaseConfigured } from "@/lib/supabase/env";
export {
  getFeaturedProjects,
  getBentoProjects,
  getHeroProjects,
  getProjectBySlug,
  getPublishedProcessSteps,
  getPublishedProjectSlugs,
  getPublishedProjects,
  getPublishedServices,
  getPublishedTrustSectors,
  type ProjectWithRelations,
} from "@/lib/supabase/queries";
