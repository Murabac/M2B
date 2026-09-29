import React from 'react';
import { useCms } from '../context/CmsContext';
import { 
  FolderKanban, 
  Inbox, 
  Activity, 
  ShieldCheck, 
  Plus, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Radio, 
  Layers, 
  Download,
  Sparkles,
  Server
} from 'lucide-react';

interface DashboardViewProps {
  onOpenNewProject: () => void;
  onSelectInquiry: (inquiry: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenNewProject,
  onSelectInquiry,
}) => {
  const { projects, inquiries, studioConfig, activityLog, setActiveTab, exportInquiriesCsv } = useCms();

  const newInquiries = inquiries.filter((i) => i.status === 'new');
  const activeProjectsCount = projects.filter((p) => p.status === 'Live' || p.status === 'In Production').length;
  const flagshipsCount = projects.filter((p) => p.isFlagship).length;

  return (
    <div className="space-y-6">
      {/* Top Banner Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#071F47] via-[#0B2F6B] to-[#081B38] border border-[#D4AF37]/30 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-black text-white text-base sm:text-lg">
                  M2B Studio Operations Command
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D4AF37] text-slate-950">
                  HARGEISA HQ
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-1 max-w-2xl leading-relaxed">
                Supervising national government registries, school ERPs, field inspections, and Flutter pipelines across Somaliland and international diaspora hubs.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenNewProject}
              className="px-4 py-2 rounded-xl text-xs font-display font-bold bg-[#D4AF37] hover:bg-[#E5BE4A] text-slate-950 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
            >
              View Inquiries ({inquiries.length})
            </button>
          </div>
        </div>
        {/* Subtle decorative gold streak */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#06152F] border border-[#0B2F6B] relative group hover:border-[#D4AF37]/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Active Platforms</span>
            <FolderKanban className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-display font-black text-2xl sm:text-3xl text-white">
            {projects.length}
          </div>
          <div className="text-[11px] text-blue-200/70 mt-1 flex items-center gap-1.5">
            <span className="text-emerald-400 font-semibold">{activeProjectsCount} in production</span>
            <span>·</span>
            <span>{flagshipsCount} flagships</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#06152F] border border-[#0B2F6B] relative group hover:border-[#D4AF37]/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Inbound RFPs</span>
            <Inbox className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-display font-black text-2xl sm:text-3xl text-white flex items-center gap-2">
            <span>{inquiries.length}</span>
            {newInquiries.length > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#D4AF37] text-slate-950 font-bold font-mono">
                +{newInquiries.length} NEW
              </span>
            )}
          </div>
          <div className="text-[11px] text-blue-200/70 mt-1">
            Across Ministry, ERP & Flutter
          </div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#06152F] border border-[#0B2F6B] relative group hover:border-[#D4AF37]/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Towers Audited</span>
            <Radio className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="font-display font-black text-2xl sm:text-3xl text-[#D4AF37]">
            {studioConfig.statsTowersInspected}
          </div>
          <div className="text-[11px] text-blue-200/70 mt-1">
            MoCIT Somaliland TowerLine Registry
          </div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#06152F] border border-[#0B2F6B] relative group hover:border-[#D4AF37]/40 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">System Availability</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400">
            99.98%
          </div>
          <div className="text-[11px] text-blue-200/70 mt-1">
            Cloudflare R2 + Fastly Horn CDN
          </div>
        </div>
      </div>

      {/* Main Grid: Urgent Leads Desk (Left) + System Health & Activity (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 spans): Urgent Inquiries Desk */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-extrabold text-base text-white">
                Urgent Inbound Leads & Proposals
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#081E44] text-blue-200 font-mono">
                {inquiries.length} total
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={exportInquiriesCsv}
                className="flex items-center gap-1 text-slate-300 hover:text-[#D4AF37] transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
              <button
                onClick={() => setActiveTab('inquiries')}
                className="text-[#D4AF37] hover:underline font-semibold"
              >
                Manage All →
              </button>
            </div>
          </div>

          {/* Inquiry Cards List */}
          <div className="space-y-3">
            {inquiries.slice(0, 4).map((inq) => {
              const isNew = inq.status === 'new';
              return (
                <div
                  key={inq.id}
                  onClick={() => onSelectInquiry(inq)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                    isNew
                      ? 'bg-[#081B38] border-[#D4AF37]/50 shadow-md shadow-[#D4AF37]/5 hover:border-[#D4AF37]'
                      : 'bg-[#06152F] border-[#0B2F6B] hover:bg-[#071A38]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-white text-sm group-hover:text-[#D4AF37] transition-colors">
                        {inq.organization || inq.clientName}
                      </span>
                      {isNew && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#D4AF37] text-slate-950">
                          NEW LEAD
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#040D1D] text-blue-200 border border-[#0B2F6B]">
                        {inq.budget}
                      </span>
                      <span className="text-slate-400">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                    {inq.message}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#0B2F6B]/40 text-[11px]">
                    <span className="text-blue-200/80 font-medium">
                      Scope: <strong className="text-white">{inq.projectType}</strong>
                    </span>

                    <span className="text-[#D4AF37] group-hover:translate-x-1 transition-transform font-bold flex items-center gap-1">
                      <span>Review Details</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (1 span): System Stack Status & Recent Logs */}
        <div className="space-y-6">
          {/* Tech Stack Health */}
          <div className="p-5 rounded-2xl bg-[#06152F] border border-[#0B2F6B]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#0B2F6B]/60">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Server className="w-4 h-4 text-[#D4AF37]" />
                <span>Horn Infrastructure Stack</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">ALL NOMINAL</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Laravel 11 / Filament v3</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">
                  v3.2 Production
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">PostGIS GIS Spatial Registry</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">
                  1,420 Masts
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Flutter Dual-App Pipeline</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">
                  iOS + Android
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">ZAAD / eDahab Webhooks</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">
                  100% Reconciled
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Cloudflare R2 Somali Audio</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px]">
                  &lt;200ms Latency
                </span>
              </div>
            </div>
          </div>

          {/* Activity Audit Log */}
          <div className="p-5 rounded-2xl bg-[#06152F] border border-[#0B2F6B]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#0B2F6B]/60">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#D4AF37]" />
                <span>Audit Activity Feed</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Live</span>
            </div>

            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {activityLog.map((log) => (
                <div key={log.id} className="text-xs">
                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                    <span className="font-semibold text-white truncate max-w-[180px]">
                      {log.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {log.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
