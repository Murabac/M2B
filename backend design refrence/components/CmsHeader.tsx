import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Search, 
  Clock, 
  ExternalLink, 
  Bell, 
  Menu, 
  X, 
  Plus, 
  Radio, 
  Layers,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface CmsHeaderProps {
  onReturnToPublic: () => void;
  onOpenMobileMenu: () => void;
  onOpenNewProjectModal: () => void;
}

export const CmsHeader: React.FC<CmsHeaderProps> = ({
  onReturnToPublic,
  onOpenMobileMenu,
  onOpenNewProjectModal,
}) => {
  const { inquiries, projects, activeTab, setActiveTab, searchQuery, setSearchQuery } = useCms();
  const [eatTime, setEatTime] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState(false);

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const eatOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Mogadishu',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setEatTime(now.toLocaleTimeString('en-US', eatOptions));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const tabTitles: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Studio Operations Command', subtitle: 'Hargeisa Digital Infrastructure & Lead Pipeline' },
    projects: { title: 'Project Catalog & Case Studies', subtitle: `${projects.length} Platforms & Enterprise Systems` },
    inquiries: { title: 'Inbound Client Leads & RFPs', subtitle: `${inquiries.length} Submissions (${newInquiriesCount} New)` },
    products: { title: 'Products Bento & Showcase', subtitle: 'Featured public product cards & impact statistics' },
    studio: { title: 'Studio & Leadership Config', subtitle: 'Abdirahmaan Mire profile & Hargeisa office coordinates' },
    settings: { title: 'System Settings & Banners', subtitle: 'Announcement bar, bilingual strings, & data backups' },
  };

  const currentMeta = tabTitles[activeTab] || { title: 'CMS Control Center', subtitle: 'M2B Technology Innovation Solutions' };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#051329]/95 backdrop-blur-md border-b border-[#0B2F6B]/80 text-white">
      {/* Top micro bar */}
      <div className="hidden sm:flex items-center justify-between px-4 lg:px-8 py-1.5 bg-[#030B18] border-b border-[#0B2F6B]/40 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>M2B STUDIO CMS ACTIVE</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Clock className="w-3 h-3 text-[#D4AF37]" />
            <span>EAT / HARGEISA: <strong className="text-white font-mono">{eatTime || '11:42:00 AM'}</strong> (UTC+3)</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-[#D4AF37] tracking-wider">
            AUTHORITY: ABDIRAHMAAN MIRE (LEAD ARCHITECT)
          </span>
          <span className="text-slate-600">|</span>
          <button 
            onClick={onReturnToPublic}
            className="text-slate-300 hover:text-[#D4AF37] flex items-center gap-1 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu & Current Tab Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-[#081E44] border border-[#0B2F6B] text-slate-200 hover:text-white hover:border-[#D4AF37]"
            aria-label="Open CMS Menu"
          >
            <Menu className="w-5 h-5 text-[#D4AF37]" />
          </button>

          {/* Logo on small screens where sidebar is hidden */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <img 
              src="/assets/M2B.png" 
              alt="M2B Logo" 
              className="w-8 h-8 rounded-lg object-contain shadow-sm"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Fallback
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <span className="font-display font-black text-sm tracking-wider text-white">
              M<span className="text-[#D4AF37]">2</span>B <span className="text-[10px] text-blue-300 font-mono font-normal">CMS</span>
            </span>
          </div>

          <div className="hidden lg:block truncate">
            <h1 className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
              <span>{currentMeta.title}</span>
              {activeTab === 'inquiries' && newInquiriesCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-[#D4AF37] text-slate-950">
                  {newInquiriesCount} NEW
                </span>
              )}
            </h1>
            <p className="text-xs text-blue-200/70 truncate mt-0.5">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Search, Notifications & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <div className="relative hidden md:block w-48 lg:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, leads..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick New Project Button */}
          <button
            onClick={onOpenNewProjectModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-display font-bold bg-gradient-to-r from-[#D4AF37] to-[#B38D1C] text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#D4AF37]/10"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Add Project</span>
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-slate-300 hover:text-white hover:border-[#D4AF37]/50 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {newInquiriesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-slate-950 text-[10px] font-mono font-bold flex items-center justify-center">
                  {newInquiriesCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#06152F] border border-[#0B2F6B] shadow-2xl p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-[#0B2F6B]">
                  <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                    Inbound Activity
                  </span>
                  <span className="text-[10px] font-mono text-[#D4AF37]">
                    {newInquiriesCount} unread
                  </span>
                </div>
                <div className="divide-y divide-[#0B2F6B]/40 max-h-60 overflow-y-auto mt-2">
                  {inquiries.slice(0, 4).map((inq) => (
                    <div 
                      key={inq.id} 
                      onClick={() => {
                        setActiveTab('inquiries');
                        setShowNotifications(false);
                      }}
                      className="py-2.5 px-1 hover:bg-white/5 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white truncate max-w-[170px]">
                          {inq.organization || inq.clientName}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${
                          inq.status === 'new' ? 'bg-[#D4AF37] text-slate-950 font-bold' : 'text-slate-400'
                        }`}>
                          {inq.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 truncate mt-0.5">
                        {inq.projectType} · {inq.budget}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 mt-2 border-t border-[#0B2F6B] text-center">
                  <button
                    onClick={() => {
                      setActiveTab('inquiries');
                      setShowNotifications(false);
                    }}
                    className="text-xs text-[#D4AF37] hover:underline font-semibold"
                  >
                    View All Inquiries →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Return to Public Site */}
          <button
            onClick={onReturnToPublic}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#081E44] border border-[#0B2F6B] text-blue-200 hover:text-white hover:border-[#D4AF37] transition-all"
            title="Open Live Public Site"
          >
            <span className="hidden md:inline">Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
          </button>
        </div>
      </div>
    </header>
  );
};
