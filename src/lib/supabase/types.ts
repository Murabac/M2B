export type ProjectCategory =
  | "web_app"
  | "mobile_app"
  | "erp"
  | "website_ecommerce";

export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  client_name: string | null;
  year: number | null;
  live_url: string | null;
  app_store_url: string | null;
  play_store_url: string | null;
  cover_image_url: string | null;
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
  quote: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type AdminUser = {
  user_id: string;
  created_at: string;
};

export type Database = {
  m2b: {
    Tables: {
      admin_users: {
        Row: AdminUser;
        Insert: {
          user_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: Service;
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string;
          icon?: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          icon?: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: Project;
        Insert: {
          id?: string;
          slug: string;
          title: string;
          tagline?: string;
          description?: string;
          category: ProjectCategory;
          client_name?: string | null;
          year?: number | null;
          live_url?: string | null;
          app_store_url?: string | null;
          play_store_url?: string | null;
          cover_image_url?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          tagline?: string;
          description?: string;
          category?: ProjectCategory;
          client_name?: string | null;
          year?: number | null;
          live_url?: string | null;
          app_store_url?: string | null;
          play_store_url?: string | null;
          cover_image_url?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      project_images: {
        Row: ProjectImage;
        Insert: {
          id?: string;
          project_id: string;
          image_url: string;
          alt_text?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          image_url?: string;
          alt_text?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
      testimonials: {
        Row: Testimonial;
        Insert: {
          id?: string;
          project_id: string;
          author_name: string;
          author_role?: string;
          quote: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_id?: string;
          author_name?: string;
          author_role?: string;
          quote?: string;
          sort_order?: number;
          is_published?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "testimonials_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
    };
    Enums: {
      project_category: ProjectCategory;
    };
    CompositeTypes: Record<string, never>;
  };
};
