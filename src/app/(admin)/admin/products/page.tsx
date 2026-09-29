import Link from "next/link";
import { CmsShell } from "@/components/admin/CmsShell";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import {
  getSiteSettingsAdmin,
  listAllInquiries,
  listAllProjects,
} from "@/lib/supabase/admin-queries";

export default async function AdminProductsPage() {
  await requireAdmin();
  const [settings, inquiries, projects] = await Promise.all([
    getSiteSettingsAdmin(),
    listAllInquiries(),
    listAllProjects(),
  ]);

  if (!settings) {
    return (
      <CmsShell active="products">
        <p className="text-sm text-red-300">
          Run migration `20260927000008_admin_cms.sql` to create site_settings.
        </p>
      </CmsShell>
    );
  }

  const productProjects = projects.filter(
    (p) => p.show_in_bento || p.is_featured || p.is_published,
  );

  return (
    <CmsShell
      active="products"
      newInquiriesCount={inquiries.filter((i) => i.status === "new").length}
      projectCount={projects.length}
      founderName={settings.founder_name}
      founderRole={settings.founder_role}
    >
      <SiteSettingsForm settings={settings} mode="products" />
      <div className="mt-10">
        <h2 className="mb-4 font-bold text-[#D4AF37]">Published / bento projects</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productProjects.map((p) => (
            <Link
              key={p.id}
              href={`/admin/projects?edit=${p.id}`}
              className="rounded-2xl border border-slate-800 bg-[#081B38] p-4 hover:border-[#D4AF37]/40"
            >
              <div className="font-bold">{p.title}</div>
              <div className="text-xs text-slate-400">{p.status}</div>
            </Link>
          ))}
        </div>
      </div>
    </CmsShell>
  );
}
