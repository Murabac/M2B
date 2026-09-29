export { PROJECT_IMAGES_BUCKET, SUPABASE_SCHEMA } from "@/lib/supabase/constants";
export type {
  AdminUser,
  ActivityLogItem,
  ActivityLogType,
  AnnouncementTone,
  CapabilityPillar,
  CapabilityTech,
  ContactInquiry,
  Database,
  InquiryPriority,
  InquiryStatus,
  ProcessStep,
  Project,
  ProjectCategory,
  ProjectImage,
  ProjectMetric,
  ProjectStatus,
  Service,
  SiteSettings,
  StudioTeamMember,
  Testimonial,
  TrustSector,
  WorkCategory,
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
  getPublishedCapabilityPillars,
  getPublishedProcessSteps,
  getPublishedProjectSlugs,
  getPublishedProjects,
  getPublishedServices,
  getPublishedTrustSectors,
  getSiteSettings,
  getPublishedStudioTeam,
  type ProjectWithRelations,
} from "@/lib/supabase/queries";
