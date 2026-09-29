import Link from "next/link";
import { CmsShell } from "@/components/admin/CmsShell";
import { requireAdmin } from "@/lib/supabase/admin-auth";
import { getDashboardStats } from "@/lib/supabase/admin-queries";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const stats = await getDashboardStats();

  return (
    <CmsShell
      active="dashboard"
      newInquiriesCount={stats.newInquiryCount}
      projectCount={stats.projectCount}
      founderName={stats.settings?.founder_name}
      founderRole={stats.settings?.founder_role}
    >
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Projects", value: String(stats.projectCount) },
          { label: "Published", value: String(stats.publishedCount) },
          { label: "Featured", value: String(stats.featuredCount) },
          { label: "New leads", value: String(stats.newInquiryCount) },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-800 bg-[#081B38] p-5"
          >
            <div className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
              {card.label}
            </div>
            <div className="mt-1 text-3xl font-black text-[#D4AF37]">
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 bg-[#081B38] p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold">Urgent leads</h2>
            <Link href="/admin/inquiries" className="text-xs text-[#D4AF37]">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {stats.inquiries
              .filter((i) => i.status === "new")
              .slice(0, 4)
              .map((inq) => (
                <Link
                  key={inq.id}
                  href="/admin/inquiries"
                  className="block rounded-xl border border-[#D4AF37]/20 bg-[#051329] p-3 hover:border-[#D4AF37]/50"
                >
                  <div className="font-bold">{inq.full_name}</div>
                  <div className="text-xs text-slate-400">
                    {inq.project_type} · $
                    {Number(inq.estimated_amount_usd).toLocaleString()}
                  </div>
                </Link>
              ))}
            {stats.inquiries.filter((i) => i.status === "new").length === 0 ? (
              <p className="text-sm text-slate-500">No new inquiries.</p>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#081B38] p-6">
          <h2 className="mb-4 font-bold">Activity</h2>
          <div className="space-y-2">
            {stats.activity.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-800 px-3 py-2 text-xs text-slate-300"
              >
                <span className="font-mono text-[10px] text-[#D4AF37] uppercase">
                  {item.type}
                </span>{" "}
                {item.message}
              </div>
            ))}
            {stats.activity.length === 0 ? (
              <p className="text-sm text-slate-500">No activity yet.</p>
            ) : null}
          </div>
        </section>
      </div>
    </CmsShell>
  );
}
