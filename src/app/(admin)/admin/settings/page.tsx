import { CmsShell } from "@/components/admin/CmsShell";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import {
  getSiteSettingsAdmin,
  listAllInquiries,
  listAllProjects,
} from "@/lib/supabase/admin-queries";

export default async function AdminSettingsPage() {
  await requireAdmin();
  const [settings, inquiries, projects] = await Promise.all([
    getSiteSettingsAdmin(),
    listAllInquiries(),
    listAllProjects(),
  ]);

  if (!settings) {
    return (
      <CmsShell active="settings">
        <p className="text-sm text-red-300">
          Run migration `20260927000008_admin_cms.sql` to create site_settings.
        </p>
      </CmsShell>
    );
  }

  return (
    <CmsShell
      active="settings"
      newInquiriesCount={inquiries.filter((i) => i.status === "new").length}
      projectCount={projects.length}
      founderName={settings.founder_name}
      founderRole={settings.founder_role}
    >
      <SiteSettingsForm settings={settings} mode="settings" />
    </CmsShell>
  );
}
