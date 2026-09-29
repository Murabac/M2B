import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { 
  Settings, 
  Megaphone, 
  Database, 
  Download, 
  RotateCcw, 
  Save, 
  CheckCircle2, 
  Palette, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const SiteSettingsView: React.FC = () => {
  const { announcement, updateAnnouncement, exportDataJson, exportInquiriesCsv, resetToDefaults } = useCms();

  const [enabled, setEnabled] = useState(announcement.enabled);
  const [textEn, setTextEn] = useState(announcement.textEn);
  const [textSo, setTextSo] = useState(announcement.textSo);
  const [actionTextEn, setActionTextEn] = useState(announcement.actionTextEn);
  const [actionTextSo, setActionTextSo] = useState(announcement.actionTextSo);
  const [actionUrl, setActionUrl] = useState(announcement.actionUrl);
  const [tone, setTone] = useState(announcement.tone);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    updateAnnouncement({
      enabled,
      textEn,
      textSo,
      actionTextEn,
      actionTextSo,
      actionUrl,
      tone,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-extrabold text-xl text-white">
            System Settings & Public Announcement Bar
          </h2>
          <p className="text-xs text-blue-200/70 mt-0.5">
            Configure public site announcements, data backups, and brand assets
          </p>
        </div>

        {savedSuccess && (
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings saved!</span>
          </div>
        )}
      </div>

      {/* 1. Announcement Bar Form */}
      <form onSubmit={handleSaveBanner} className="p-6 rounded-3xl bg-[#06152F] border border-[#0B2F6B] space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#0B2F6B]/60">
          <div className="flex items-center gap-2.5">
            <Megaphone className="w-5 h-5 text-[#D4AF37]" />
            <span className="font-bold text-sm text-white uppercase tracking-wider">
              Top Headline Announcement Bar
            </span>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-[#D4AF37] focus:ring-0 border-[#0B2F6B] bg-[#081B38]"
            />
            <span className="text-xs font-bold text-white">
              {enabled ? 'Active on Public Site' : 'Disabled'}
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Banner Message (English)
            </label>
            <input
              type="text"
              value={textEn}
              onChange={(e) => setTextEn(e.target.value)}
              placeholder="e.g. Now accepting Q4 ministry & enterprise RFP briefs in Hargeisa."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
              Fariinta Ogeysiiska (Somali)
            </label>
            <input
              type="text"
              value={textSo}
              onChange={(e) => setTextSo(e.target.value)}
              placeholder="e.g. Waxaan qaadaneynaa mashaariicda nidaamyada dawladda ee Q4."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Action Button Text (EN)
            </label>
            <input
              type="text"
              value={actionTextEn}
              onChange={(e) => setActionTextEn(e.target.value)}
              placeholder="e.g. Schedule Briefing"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider mb-1.5">
              Badhanka Falcelinta (SO)
            </label>
            <input
              type="text"
              value={actionTextSo}
              onChange={(e) => setActionTextSo(e.target.value)}
              placeholder="e.g. Ballan Qabso"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Target Destination URL
            </label>
            <input
              type="text"
              value={actionUrl}
              onChange={(e) => setActionUrl(e.target.value)}
              placeholder="#contact"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#081B38] border border-[#0B2F6B] text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#B38D1C] text-slate-950 hover:brightness-110 active:scale-95 shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Update Announcement</span>
          </button>
        </div>
      </form>

      {/* 2. Official Brand Logo Asset Verification */}
      <div className="p-6 rounded-3xl bg-[#06152F] border border-[#0B2F6B] space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#0B2F6B]/60">
          <Palette className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-bold text-sm text-white uppercase tracking-wider">
            M2B Brand Authority & Real Logo Asset
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#040D1D] border border-[#0B2F6B]">
          <div className="p-3 rounded-2xl bg-white/5 border border-[#D4AF37]/30 shrink-0">
            <img 
              src="/assets/M2B.png" 
              alt="Official M2B Logo" 
              className="w-24 h-24 object-contain rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <h4 className="font-display font-bold text-white text-sm">
              Official M2B Multi-Modal Vector Asset
            </h4>
            <p className="text-slate-400 leading-relaxed">
              Featuring deep royal navy blue (<code className="text-[#4882DB]">#0B2F6B</code>), metallic gold (<code className="text-[#D4AF37]">#D4AF37</code>), orbital crescent arc, and ascending digital data block cluster.
            </p>
            <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-[#D4AF37]">
              <span>Active in Public Header</span>
              <span>·</span>
              <span>CMS Command Bar</span>
              <span>·</span>
              <span>Browser Favicon</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Data Export & Disaster Recovery */}
      <div className="p-6 rounded-3xl bg-[#06152F] border border-[#0B2F6B] space-y-4">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#0B2F6B]/60">
          <Database className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-bold text-sm text-white uppercase tracking-wider">
            Data Export & System Recovery
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          All changes made in this CMS portal are persisted securely in your browser storage. You can create full database snapshots or export your inbound leads at any time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <button
            onClick={exportDataJson}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#081E44] border border-[#0B2F6B] hover:border-[#D4AF37] text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-[#D4AF37]" />
            <span>Download Backup (JSON)</span>
          </button>

          <button
            onClick={exportInquiriesCsv}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#081E44] border border-[#0B2F6B] hover:border-[#D4AF37] text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4 text-[#D4AF37]" />
            <span>Export Leads (CSV)</span>
          </button>

          <button
            onClick={resetToDefaults}
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-red-950/40 border border-red-800/60 hover:bg-red-950/80 text-red-200 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4 text-red-400" />
            <span>Reset Demo Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
};
