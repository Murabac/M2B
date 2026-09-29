import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { CmsTab } from '../types';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Inbox, 
  MoreHorizontal, 
  Layers, 
  Building2, 
  Settings, 
  ExternalLink, 
  X, 
  Plus, 
  Sparkles,
  Download,
  RotateCcw
} from 'lucide-react';

interface CmsMobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onReturnToPublic: () => void;
  onOpenNewProject: () => void;
}

export const CmsMobileNav: React.FC<CmsMobileNavProps> = ({
  isOpen,
  onClose,
  onReturnToPublic,
  onOpenNewProject,
}) => {
  const { activeTab, setActiveTab, inquiries, projects, exportInquiriesCsv, exportDataJson, resetToDefaults } = useCms();
  const [showDrawer, setShowDrawer] = useState(false);

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  const handleSelectTab = (tab: CmsTab) => {
    setActiveTab(tab);
    setShowDrawer(false);
    onClose();
  };

  return (
    <>
      {/* 1. Mobile Fixed Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#040D1D]/95 backdrop-blur-xl border-t border-[#0B2F6B]/80 px-2 py-1 safe-area-pb">
        <div className="grid grid-cols-5 items-center max-w-lg mx-auto">
          {/* Dashboard Tab */}
          <button
            onClick={() => handleSelectTab('dashboard')}
            className={`flex flex-col items-center justify-center py-2 px-1 text-center transition-colors ${
              activeTab === 'dashboard' ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Command</span>
          </button>

          {/* Projects Tab */}
          <button
            onClick={() => handleSelectTab('projects')}
            className={`flex flex-col items-center justify-center py-2 px-1 text-center relative transition-colors ${
              activeTab === 'projects' ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FolderKanban className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Work</span>
            <span className="absolute top-1 right-2 px-1 py-0.2 rounded-full text-[9px] bg-[#0B2F6B] text-blue-200">
              {projects.length}
            </span>
          </button>

          {/* Center Floating Plus Action Button */}
          <div className="flex justify-center -translate-y-3">
            <button
              onClick={onOpenNewProject}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F5D77F] text-slate-950 flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 border-2 border-[#040D1D] active:scale-90 transition-transform"
              aria-label="Add New Project"
            >
              <Plus className="w-6 h-6 stroke-[3]" />
            </button>
          </div>

          {/* Inquiries / Leads Tab */}
          <button
            onClick={() => handleSelectTab('inquiries')}
            className={`flex flex-col items-center justify-center py-2 px-1 text-center relative transition-colors ${
              activeTab === 'inquiries' ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Inbox className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Leads</span>
            {newInquiriesCount > 0 && (
              <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-[#D4AF37] text-slate-950 text-[9px] font-bold flex items-center justify-center">
                {newInquiriesCount}
              </span>
            )}
          </button>

          {/* More Menu Drawer Trigger */}
          <button
            onClick={() => setShowDrawer(true)}
            className={`flex flex-col items-center justify-center py-2 px-1 text-center transition-colors ${
              showDrawer ? 'text-[#D4AF37]' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MoreHorizontal className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-semibold tracking-tight">Menu</span>
          </button>
        </div>
      </nav>

      {/* 2. Slide-up Drawer Menu for Mobile */}
      {(showDrawer || isOpen) && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => {
              setShowDrawer(false);
              onClose();
            }} 
          />

          {/* Drawer Sheet */}
          <div className="relative bg-[#06152F] border-t border-[#0B2F6B] rounded-t-3xl p-6 shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#0B2F6B]/60">
              <div className="flex items-center gap-2.5">
                <img 
                  src="/assets/M2B.png" 
                  alt="M2B Logo" 
                  className="w-7 h-7 rounded-lg object-contain" 
                  referrerPolicy="no-referrer" 
                />
                <div>
                  <h3 className="font-display font-bold text-white text-base">
                    M2B Control Console
                  </h3>
                  <p className="text-[10px] text-blue-200/70">
                    Hargeisa, Somaliland · Mobile Edition
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowDrawer(false);
                  onClose();
                }}
                className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Sections */}
            <div className="py-4 space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] px-2">
                Management Modules
              </div>

              <button
                onClick={() => handleSelectTab('dashboard')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'dashboard' ? 'bg-[#0B2F6B] text-white' : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" />
                  <span>Operations Command</span>
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('projects')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'projects' ? 'bg-[#0B2F6B] text-white' : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderKanban className="w-4 h-4 text-[#D4AF37]" />
                  <span>Projects & Case Studies</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white font-mono">
                  {projects.length}
                </span>
              </button>

              <button
                onClick={() => handleSelectTab('inquiries')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'inquiries' ? 'bg-[#0B2F6B] text-white' : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4 text-[#D4AF37]" />
                  <span>Inbound Leads / CRM</span>
                </div>
                {newInquiriesCount > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4AF37] text-slate-950 font-mono font-bold">
                    {newInquiriesCount} NEW
                  </span>
                )}
              </button>

              <button
                onClick={() => handleSelectTab('products')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'products' ? 'bg-[#0B2F6B] text-white' : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <span>Products Bento Grid</span>
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('studio')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'studio' ? 'bg-[#0B2F6B] text-white' : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Studio & Leadership</span>
                </div>
              </button>

              <button
                onClick={() => handleSelectTab('settings')}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === 'settings' ? 'bg-[#0B2F6B] text-white' : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4 text-[#D4AF37]" />
                  <span>System Settings & Banner</span>
                </div>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="pt-3 border-t border-[#0B2F6B]/60 space-y-2">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] px-2">
                Export & Site
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={exportInquiriesCsv}
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-xs font-semibold text-slate-200 hover:text-white"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Leads CSV</span>
                </button>
                <button
                  onClick={exportDataJson}
                  className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-xs font-semibold text-slate-200 hover:text-white"
                >
                  <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Full Backup</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setShowDrawer(false);
                  onReturnToPublic();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38D1C] text-slate-950 font-display font-bold text-xs uppercase tracking-wider mt-2"
              >
                <span>Switch to Live Public Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
