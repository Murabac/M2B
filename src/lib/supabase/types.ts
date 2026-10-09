export type ProjectCategory =
  | "web_app"
  | "mobile_app"
  | "erp"
  | "website_ecommerce";

export type WorkCategory =
  | "government"
  | "operations"
  | "education"
  | "faith"
  | "commerce"
  | "mobile"
  | "websites";

export type ProjectStatus =
  | "Live"
  | "In Production"
  | "Studio Product"
  | "Coming Soon";

export type CapabilityTech = {
  name: string;
  desc: string;
};

export type CapabilityPillar = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  icon: string;
  technologies: CapabilityTech[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  work_category: WorkCategory;
  sector: string;
  status: ProjectStatus | string;
  outcome: string;
  problem: string;
  approach: string;
  highlights: string[];
  stack: string[];
  metrics: ProjectMetric[];
  client_name: string | null;
  year: number | null;
  live_url: string | null;
  app_store_url: string | null;
  play_store_url: string | null;
  cover_image_url: string | null;
  logo_url: string | null;
  mesh_preview: string;
  mesh_category: string;
  accent_color: string;
  stack_line: string;
  metric_label: string;
  show_in_hero: boolean;
  hero_sort_order: number;
  show_in_bento: boolean;
  bento_sort_order: number;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProjectImage = {
  id: string;
  project_id: string;
  image_url: string;
  alt_text: string;
  sort_order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  project_id: string;
  author_name: string;
  author_role: string;
  author_image_url: string | null;
  quote: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type TrustSector = {
  id: string;
  slug: string;
  name: string;
  proof: string;
  metric: string;
  icon: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProcessStep = {
  id: string;
  step_key: string;
  title: string;
  description: string;
  deliverables: string[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminUser = {
  user_id: string;
  created_at: string;
};

export type InquiryStatus =
  | "new"
  | "reviewing"
  | "contacted"
  | "proposal_sent"
  | "won"
  | "archived";

export type InquiryPriority = "high" | "medium" | "normal";

export type ContactInquiry = {
  id: string;
  project_type: string;
  estimated_amount_usd: number;
  full_name: string;
  email: string;
  organization: string;
  phone: string;
  project_brief: string;
  locale: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  notes: string;
  created_at: string;
};

export type AnnouncementTone = "gold" | "navy" | "emerald";

export type SiteSettings = {
  id: number;
  studio_name: string;
  company_legal_name: string;
  pillars: string;
  tagline: string;
  founder_name: string;
  founder_role: string;
  founder_bio: string;
  founder_experience_years: number;
  city: string;
  country: string;
  office_address: string;
  coordinates: string;
  email: string;
  phone_primary: string;
  phone_secondary: string;
  whatsapp: string;
  business_hours_weekdays: string;
  business_hours_friday: string;
  timezone: string;
  stats_towers_inspected: string;
  stats_listeners_count: string;
  stats_schools_managed: string;
  stats_mobile_money_processed: string;
  announcement_enabled: boolean;
  announcement_text_en: string;
  announcement_text_so: string;
  announcement_action_en: string;
  announcement_action_so: string;
  announcement_action_url: string;
  announcement_tone: AnnouncementTone;
  updated_at: string;
};

export type ActivityLogType = "project" | "inquiry" | "system" | "setting";

export type ActivityLogItem = {
  id: string;
  type: ActivityLogType;
  message: string;
  actor_id: string | null;
  created_at: string;
};

export type StudioTeamMember = {
  id: string;
  slug: string;
  initials: string;
  name: string;
  badge: string;
  role: string;
  bio: string;
  skills: string[];
  photo_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

type TableDef<Row, Insert, Update, Relationships = []> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: Relationships;
};

export type Database = {
  m2b: {
    Tables: {
      admin_users: TableDef<
        AdminUser,
        { user_id: string; created_at?: string },
        { user_id?: string; created_at?: string }
      >;
      services: TableDef<
        Service,
        {
          id?: string;
          slug: string;
          title: string;
          description?: string;
          icon?: string;
          bullets?: string[];
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        },
        Partial<Service>
      >;
      projects: TableDef<
        Project,
        {
          id?: string;
          slug: string;
          title: string;
          tagline?: string;
          description?: string;
          category: ProjectCategory;
          work_category?: WorkCategory | string;
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
          created_at?: string;
          updated_at?: string;
        },
        Partial<Project>
      >;
      project_images: TableDef<
        ProjectImage,
        {
          id?: string;
          project_id: string;
          image_url: string;
          alt_text?: string;
          sort_order?: number;
          created_at?: string;
        },
        Partial<ProjectImage>,
        [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ]
      >;
      testimonials: TableDef<
        Testimonial,
        {
          id?: string;
          project_id: string;
          author_name: string;
          author_role?: string;
          author_image_url?: string | null;
          quote: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        },
        Partial<Testimonial>,
        [
          {
            foreignKeyName: "testimonials_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ]
      >;
      trust_sectors: TableDef<
        TrustSector,
        {
          id?: string;
          slug: string;
          name: string;
          proof?: string;
          metric?: string;
          icon?: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        },
        Partial<TrustSector>
      >;
      process_steps: TableDef<
        ProcessStep,
        {
          id?: string;
          step_key: string;
          title: string;
          description?: string;
          deliverables?: string[];
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        },
        Partial<ProcessStep>
      >;
      capability_pillars: TableDef<
        CapabilityPillar,
        {
          id?: string;
          slug: string;
          title: string;
          tagline?: string;
          icon?: string;
          technologies?: CapabilityTech[];
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        },
        Partial<CapabilityPillar>
      >;
      contact_inquiries: TableDef<
        ContactInquiry,
        {
          id?: string;
          project_type: string;
          estimated_amount_usd: number;
          full_name: string;
          email: string;
          organization?: string;
          phone: string;
          project_brief?: string;
          locale?: string;
          status?: InquiryStatus;
          priority?: InquiryPriority;
          notes?: string;
          created_at?: string;
        },
        Partial<ContactInquiry>
      >;
      site_settings: TableDef<
        SiteSettings,
        Partial<SiteSettings> & { id?: number },
        Partial<SiteSettings>
      >;
      activity_log: TableDef<
        ActivityLogItem,
        {
          id?: string;
          type?: ActivityLogType;
          message: string;
          actor_id?: string | null;
          created_at?: string;
        },
        Partial<ActivityLogItem>
      >;
      studio_team: TableDef<
        StudioTeamMember,
        {
          id?: string;
          slug: string;
          initials?: string;
          name: string;
          badge?: string;
          role?: string;
          bio?: string;
          skills?: string[];
          photo_url?: string | null;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        },
        Partial<StudioTeamMember>
      >;
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
    };
    Enums: {
      project_category: ProjectCategory;
    };
    CompositeTypes: Record<string, never>;
  };
};
