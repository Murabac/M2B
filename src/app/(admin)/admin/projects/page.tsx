import { CmsShell } from "@/components/admin/CmsShell";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import {
  getAdminProject,
  getSiteSettingsAdmin,
  listAllInquiries,
  listAllProjects,
} from "@/lib/supabase/admin-queries";

type Props = {
  searchParams: Promise<{ new?: string; edit?: string }>;
};

export default async function AdminProjectsPage({ searchParams }: Props) {
  await requireAdmin();
  const params = await searchParams;
  const [projects, inquiries, settings, detail] = await Promise.all([
    listAllProjects(),
    listAllInquiries(),
    getSiteSettingsAdmin(),
    params.edit ? getAdminProject(params.edit) : Promise.resolve(null),
  ]);

  return (
    <CmsShell
      active="projects"
      newInquiriesCount={inquiries.filter((i) => i.status === "new").length}
      projectCount={projects.length}
      founderName={settings?.founder_name}
      founderRole={settings?.founder_role}
    >
      <ProjectsManager
        projects={projects}
        initialOpenNew={params.new === "1"}
        detail={detail}
      />
    </CmsShell>
  );
}
