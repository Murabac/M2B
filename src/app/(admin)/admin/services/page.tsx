import { CmsShell } from "@/components/admin/CmsShell";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import {
  getSiteSettingsAdmin,
  listAllInquiries,
  listAllProjects,
  listAllServices,
} from "@/lib/supabase/admin-queries";

export default async function AdminServicesPage() {
  await requireAdmin();
  const [services, inquiries, projects, settings] = await Promise.all([
    listAllServices(),
    listAllInquiries(),
    listAllProjects(),
    getSiteSettingsAdmin(),
  ]);

  return (
    <CmsShell
      active="services"
      newInquiriesCount={inquiries.filter((i) => i.status === "new").length}
      projectCount={projects.length}
      founderName={settings?.founder_name}
      founderRole={settings?.founder_role}
    >
      <ServicesManager services={services} />
    </CmsShell>
  );
}
