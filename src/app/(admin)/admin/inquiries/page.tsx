import { CmsShell } from "@/components/admin/CmsShell";
import { InquiriesManager } from "@/components/admin/InquiriesManager";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import {
  getSiteSettingsAdmin,
  listAllInquiries,
  listAllProjects,
} from "@/lib/supabase/admin-queries";

export default async function AdminInquiriesPage() {
  await requireAdmin();
  const [inquiries, projects, settings] = await Promise.all([
    listAllInquiries(),
    listAllProjects(),
    getSiteSettingsAdmin(),
  ]);

  return (
    <CmsShell
      active="inquiries"
      newInquiriesCount={inquiries.filter((i) => i.status === "new").length}
      projectCount={projects.length}
      founderName={settings?.founder_name}
      founderRole={settings?.founder_role}
    >
      <InquiriesManager inquiries={inquiries} />
    </CmsShell>
  );
}
