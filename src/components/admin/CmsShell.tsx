import { CmsHeader } from "@/components/admin/CmsHeader";
import { CmsSidebar, type CmsNavKey } from "@/components/admin/CmsSidebar";

type Props = {
  active: CmsNavKey;
  children: React.ReactNode;
  newInquiriesCount?: number;
  projectCount?: number;
  founderName?: string;
  founderRole?: string;
};

export function CmsShell({
  active,
  children,
  newInquiriesCount = 0,
  projectCount = 0,
  founderName,
  founderRole,
}: Props) {
  return (
    <div className="flex min-h-screen bg-[#030914] font-sans text-white selection:bg-[#D4AF37] selection:text-slate-950">
      <CmsSidebar
        active={active}
        newInquiriesCount={newInquiriesCount}
        projectCount={projectCount}
        founderName={founderName}
        founderRole={founderRole}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <CmsHeader active={active} newInquiriesCount={newInquiriesCount} />
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 pb-28 sm:p-6 lg:p-8 lg:pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
