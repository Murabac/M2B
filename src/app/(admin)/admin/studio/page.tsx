import { CmsShell } from "@/components/admin/CmsShell";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { StudioTeamManager } from "@/components/admin/StudioTeamManager";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import {
  getSiteSettingsAdmin,
  listAllInquiries,
  listAllProjects,
  listAllStudioTeam,
} from "@/lib/supabase/admin-queries";

export default async function AdminStudioPage() {
  await requireAdmin();
  const [settings, inquiries, projects, team] = await Promise.all([
    getSiteSettingsAdmin(),
    listAllInquiries(),
    listAllProjects(),
    listAllStudioTeam(),
  ]);

  if (!settings) {
    return (
      <CmsShell active="studio">
        <p className="text-sm text-red-300">
          Run migration `20260927000008_admin_cms.sql` to create site_settings.
        </p>
      </CmsShell>
    );
  }

  return (
    <CmsShell
      active="studio"
      newInquiriesCount={inquiries.filter((i) => i.status === "new").length}
      projectCount={projects.length}
      founderName={settings.founder_name}
      founderRole={settings.founder_role}
    >
      <div className="space-y-10">
        <StudioTeamManager members={team} />
        <div>
          <h2 className="mb-4 font-bold text-[#D4AF37]">HQ & contact channels</h2>
          <SiteSettingsForm settings={settings} mode="studio" />
        </div>
      </div>
    </CmsShell>
  );
}
