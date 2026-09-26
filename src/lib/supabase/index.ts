export { PROJECT_IMAGES_BUCKET, SUPABASE_SCHEMA } from "@/lib/supabase/constants";
export type {
  AdminUser,
  Database,
  Project,
  ProjectCategory,
  ProjectImage,
  Service,
  Testimonial,
} from "@/lib/supabase/types";

export { createClient as createBrowserClient } from "@/lib/supabase/client";
export { createClient as createServerClient } from "@/lib/supabase/server";
export { isSupabaseConfigured } from "@/lib/supabase/env";
export {
  getFeaturedProjects,
  getProjectBySlug,
  getPublishedProjectSlugs,
  getPublishedProjects,
  getPublishedServices,
  type ProjectWithRelations,
} from "@/lib/supabase/queries";
