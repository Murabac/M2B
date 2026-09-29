import { CmsShell } from "@/components/admin/CmsShell";
import { ContentManager } from "@/components/admin/ContentManager";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import {
  getSiteSettingsAdmin,
  listAllCapabilityPillars,
  listAllInquiries,
  listAllProcessSteps,
  listAllProjects,
  listAllTrustSectors,
} from "@/lib/supabase/admin-queries";

export default async function AdminContentPage() {
  await requireAdmin();
  const [trustSectors, processSteps, pillars, inquiries, projects, settings] =
    await Promise.all([
      listAllTrustSectors(),
      listAllProcessSteps(),
      listAllCapabilityPillars(),
      listAllInquiries(),
      listAllProjects(),
      getSiteSettingsAdmin(),
    ]);

  return (
    <CmsShell
      active="content"
      newInquiriesCount={inquiries.filter((i) => i.status === "new").length}
      projectCount={projects.length}
      founderName={settings?.founder_name}
      founderRole={settings?.founder_role}
    >
      <ContentManager
        trustSectors={trustSectors}
        processSteps={processSteps}
        pillars={pillars}
      />
    </CmsShell>
  );
}
