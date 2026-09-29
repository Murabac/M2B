import React from 'react';
import { useCms } from '../context/CmsContext';
import { CmsTab } from '../types';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Inbox, 
  Layers, 
  Building2, 
  Settings, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  MapPin
} from 'lucide-react';

interface CmsSidebarProps {
  onReturnToPublic: () => void;
  onOpenNewProject: () => void;
}

export const CmsSidebar: React.FC<CmsSidebarProps> = ({
  onReturnToPublic,
  onOpenNewProject,
}) => {
  const { activeTab, setActiveTab, inquiries, projects, studioConfig } = useCms();
  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const navItems: {
    id: CmsTab;
    label: string;
    labelSo: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    {
      id: 'dashboard',
      label: 'Operations Command',
      labelSo: 'Hoggaanka Hawlaha',
      icon: LayoutDashboard,
    },
    {
      id: 'projects',
      label: 'Projects & Work',
      labelSo: 'Mashaariicda & Nidaamyada',
      icon: FolderKanban,
      badge: projects.length,
      badgeColor: 'bg-[#0B2F6B] text-blue-200 border border-[#4882DB]/30',
    },
    {
      id: 'inquiries',
      label: 'Inbound Leads / CRM',
      labelSo: 'Fariimaha & Dalabaadka',
      icon: Inbox,
      badge: newInquiriesCount > 0 ? `${newInquiriesCount} NEW` : undefined,
      badgeColor: 'bg-[#D4AF37] text-slate-950 font-bold',
    },
    {
      id: 'products',
      label: 'Products Bento Grid',
      labelSo: 'Alaabta & Tusaalooyinka',
      icon: Layers,
    },
    {
      id: 'studio',
      label: 'Studio & Leadership',
      labelSo: 'Xafiiska & Hoggaanka',
      icon: Building2,
    },
    {
      id: 'settings',
      label: 'System & Banners',
      labelSo: 'Habaynta & Ogeysiisyada',
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-72 bg-[#040D1D] border-r border-[#0B2F6B]/80 text-white shrink-0 min-h-screen justify-between">
      {/* Top Brand Identity */}
      <div>
        <div className="p-6 border-b border-[#0B2F6B]/60">
          <div className="flex items-center gap-3.5 mb-2">
            <div className="relative group p-1.5 rounded-2xl bg-[#071A38] border border-[#D4AF37]/30 shadow-lg shadow-[#0B2F6B]/30">
              <img
                src="/assets/M2B.png"
                alt="M2B Technology Innovation Solutions"
                className="w-10 h-10 object-contain rounded-lg"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#D4AF37] ring-2 ring-[#040D1D]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-wider text-white">
                  M<span className="text-[#D4AF37]">2</span>B
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                  CMS v2.4
                </span>
              </div>
              <p className="text-[10px] text-blue-200/70 font-semibold tracking-wider uppercase mt-0.5">
                Technology · Innovation · Solutions
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#0B2F6B]/40 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3 h-3 text-[#D4AF37]" />
              <span>Hargeisa, Somaliland</span>
            </span>
            <span className="text-emerald-400 font-bold">● ONLINE</span>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-6 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono tracking-widest text-[#D4AF37]/80 uppercase font-semibold">
            Operations Console
          </div>

          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#0B2F6B] to-[#0A3A7A] text-white border border-[#D4AF37]/40 shadow-lg shadow-[#0B2F6B]/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconComponent
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#D4AF37]' : 'text-slate-400 group-hover:text-[#D4AF37]'
                    }`}
                  />
                  <div className="text-left">
                    <span className="block">{item.label}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Launch Card */}
        <div className="px-4 py-2">
          <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#081B38] to-[#06142A] border border-[#0B2F6B] relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Quick Deployment</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                Register a new national ministry platform or school ERP.
              </p>
              <button
                onClick={onOpenNewProject}
                className="w-full py-2 rounded-xl text-xs font-display font-bold bg-[#D4AF37] hover:bg-[#E5BE4A] text-slate-950 transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>+ Create Project</span>
              </button>
            </div>
            {/* Background gold orb */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#D4AF37]/5 blur-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Founder Profile Card */}
      <div className="p-4 border-t border-[#0B2F6B]/60 bg-[#030914]">
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#081B38]/60 border border-[#0B2F6B]/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0B2F6B] to-[#D4AF37] p-0.5 shrink-0">
              <div className="w-full h-full rounded-full bg-[#040D1D] flex items-center justify-center text-[11px] font-bold text-[#D4AF37]">
                AM
              </div>
            </div>
            <div className="truncate">
              <span className="block font-bold text-xs text-white truncate">
                {studioConfig.founderName}
              </span>
              <span className="block text-[10px] text-slate-400 truncate">
                Lead Architect (9+ yrs)
              </span>
            </div>
          </div>

          <button
            onClick={onReturnToPublic}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Switch to Public Website"
          >
            <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </aside>
  );
};
